import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { evaluate } from "@/lib/rules/engine";
import type { IntakeAnswers } from "@/lib/rules/types";
import { rateLimit } from "@/lib/ratelimit";

export const dynamic = "force-dynamic";

/** GET — portal state: file (client-safe fields), requirements, docs. */
export async function GET(_req: NextRequest, { params }: { params: { token: string } }) {
  const store = getStore();
  const file = await store.getFileByToken(params.token);
  if (!file) return NextResponse.json({ error: "not found" }, { status: 404 });
  const docs = await store.listDocs(file.id);
  return NextResponse.json({
    clientName: file.clientName,
    status: file.status,
    consentAt: file.consentAt ?? null,
    answers: file.answers ?? null,
    path: file.path ?? null,
    requirements: file.requirements ?? [],
    notes: (file.notes ?? []).filter((n) => n.audience !== "agent"),
    docs: docs.map((d) => ({
      id: d.id,
      reqKey: d.reqKey,
      part: d.part ?? null,
      status: d.status,
      reason: d.reason ?? null,
      uploadedAt: d.uploadedAt,
    })),
  });
}

/** POST — consent or intake answers. Runs the rules engine and stores the checklist. */
export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  if (!rateLimit(`portal:${ip}`, 30, 60_000)) {
    return NextResponse.json({ error: "Slow down a moment." }, { status: 429 });
  }
  const store = getStore();
  const file = await store.getFileByToken(params.token);
  if (!file) return NextResponse.json({ error: "not found" }, { status: 404 });

  const body = await req.json();

  if (body.action === "consent") {
    await store.updateFile(file.id, { consentAt: new Date().toISOString() });
    await store.audit({ fileId: file.id, actor: "client", action: "consent_given" });
    return NextResponse.json({ ok: true });
  }

  if (body.action === "answers") {
    if (!file.consentAt) return NextResponse.json({ error: "consent required" }, { status: 403 });
    const answers = body.answers as IntakeAnswers;
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
      actor: "client",
      action: "intake_completed",
      detail: `path=${result.path}, ${result.requirements.length} documents required`,
    });
    return NextResponse.json({
      ok: true,
      path: result.path,
      requirements: result.requirements,
      notes: result.notes.filter((n) => n.audience !== "agent"),
    });
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
