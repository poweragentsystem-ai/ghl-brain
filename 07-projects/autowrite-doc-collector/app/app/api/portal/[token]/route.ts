import { NextRequest, NextResponse } from "next/server";
import { getStore, newId, newToken, type Applicant } from "@/lib/store";
import { evaluate } from "@/lib/rules/engine";
import type { IntakeAnswers } from "@/lib/rules/types";
import { rateLimit } from "@/lib/ratelimit";
import { resolveViewer, canAccess } from "@/lib/viewer";
import { isAgentAuthed } from "@/lib/session";
import { sendNudge } from "@/lib/nudge";
import { computeProgress } from "@/lib/progress";

export const dynamic = "force-dynamic";

/** GET — portal state, scoped to whoever this token belongs to. */
export async function GET(_req: NextRequest, { params }: { params: { token: string } }) {
  const store = getStore();
  const viewer = await resolveViewer(store, params.token);
  if (!viewer) return NextResponse.json({ error: "not found" }, { status: 404 });
  const { file } = viewer;
  const docs = await store.listDocs(file.id);
  const progress = computeProgress(file, docs);

  // Slots this viewer may see and act on.
  const visibleSlots = progress.slots.filter((s) => canAccess(viewer, s.applicantId));
  // Private co-applicants (primary viewer only): status summary, not content.
  const privateSummaries =
    viewer.type === "primary"
      ? (file.applicants ?? [])
          .filter((ap) => ap.mode === "self" && !ap.shareWithPrimary)
          .map((ap) => {
            const theirs = progress.slots.filter((s) => s.applicantId === ap.id);
            const done = theirs.filter((s) => s.doc && ["verified", "accepted"].includes(s.doc.status)).length;
            return { id: ap.id, name: ap.name, total: theirs.length, done };
          })
      : [];

  return NextResponse.json({
    clientName: file.clientName,
    viewer: { type: viewer.type, name: viewer.applicant?.name ?? file.clientName, shareWithPrimary: viewer.applicant?.shareWithPrimary ?? null },
    status: file.status,
    consentAt: file.consentAt ?? null,
    answers: viewer.type === "primary" ? (file.answers ?? null) : null,
    intakeDone: !!file.requirements?.length,
    path: file.path ?? null,
    requirements: file.requirements ?? [],
    notes: (file.notes ?? []).filter((n) => n.audience !== "agent"),
    slots: visibleSlots.map((s) => ({
      reqKey: s.reqKey,
      part: s.part,
      applicantId: s.applicantId,
      applicantName: s.applicantName,
      status: s.doc?.status ?? "missing",
      reason: s.doc?.reason ?? null,
    })),
    applicants: (file.applicants ?? []).map((ap) => ({ id: ap.id, name: ap.name, mode: ap.mode, shareWithPrimary: ap.shareWithPrimary })),
    privateSummaries,
  });
}

/** POST — consent, intake answers (client or agent-on-behalf), add applicant, share toggle. */
export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  if (!rateLimit(`portal:${ip}`, 30, 60_000)) {
    return NextResponse.json({ error: "Slow down a moment." }, { status: 429 });
  }
  const store = getStore();
  const viewer = await resolveViewer(store, params.token);
  if (!viewer) return NextResponse.json({ error: "not found" }, { status: 404 });
  const { file } = viewer;
  const body = await req.json();

  if (body.action === "consent") {
    await store.updateFile(file.id, { consentAt: new Date().toISOString() });
    await store.audit({ fileId: file.id, actor: "client", action: "consent_given" });
    return NextResponse.json({ ok: true });
  }

  if (body.action === "answers") {
    const answers = body.answers as IntakeAnswers;
    const byAgent = answers.completedBy === "agent";
    if (byAgent) {
      // The broker filling in the picture for the client — needs agent auth.
      if (!isAgentAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    } else {
      if (viewer.type !== "primary") return NextResponse.json({ error: "primary applicant only" }, { status: 403 });
      if (!file.consentAt) return NextResponse.json({ error: "consent required" }, { status: 403 });
      answers.completedBy = "client";
    }
    const result = evaluate(answers);
    await store.updateFile(file.id, {
      answers,
      path: result.path,
      requirements: result.requirements,
      notes: result.notes,
      status: "collecting",
    });
    await store.audit({
      fileId: file.id,
      actor: byAgent ? "agent" : "client",
      action: "intake_completed",
      detail: `by=${byAgent ? "agent" : "client"}, path=${result.path}, ${result.requirements.length} documents`,
    });
    return NextResponse.json({ ok: true, path: result.path });
  }

  if (body.action === "addApplicant") {
    if (viewer.type !== "primary") return NextResponse.json({ error: "primary applicant only" }, { status: 403 });
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const mode = body.mode === "delegated" ? "delegated" : "self";
    if (!name || !email.includes("@")) return NextResponse.json({ error: "Name and a valid email, please." }, { status: 400 });
    const ap: Applicant = { id: newId(), name, email, token: newToken(), mode, shareWithPrimary: mode === "delegated" };
    await store.updateFile(file.id, { applicants: [...(file.applicants ?? []), ap] });
    await store.audit({ fileId: file.id, actor: "client", action: "applicant_added", detail: `${name} (${mode})` });
    if (mode === "self") {
      const link = `${req.nextUrl.origin}/c/${ap.token}`;
      await sendNudge({
        fileId: file.id,
        to: email,
        subject: `${name}, your documents are needed for a mortgage application`,
        body: `Hi ${name.split(" ")[0]},\n\nYou've been added as a co-applicant on ${file.clientName}'s mortgage file. Here's your own private, secure link to upload your documents — nobody else sees them unless you choose to share:\n\n${link}\n\n— The team`,
      });
    }
    return NextResponse.json({ ok: true });
  }

  if (body.action === "toggleShare") {
    if (viewer.type !== "applicant" || !viewer.applicant) {
      return NextResponse.json({ error: "co-applicant only — sharing is their choice" }, { status: 403 });
    }
    const applicants = (file.applicants ?? []).map((ap) =>
      ap.id === viewer.applicant!.id ? { ...ap, shareWithPrimary: !!body.share } : ap,
    );
    await store.updateFile(file.id, { applicants });
    await store.audit({
      fileId: file.id,
      actor: "client",
      action: body.share ? "applicant_sharing_on" : "applicant_sharing_off",
      detail: viewer.applicant.name,
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
