import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { readDocument } from "@/lib/ai/reader";
import { rateLimit } from "@/lib/ratelimit";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_BYTES = 15 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/heic", "application/pdf"];

export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  if (!rateLimit(`upload:${ip}`, 20, 60_000)) {
    return NextResponse.json({ error: "Slow down a moment." }, { status: 429 });
  }
  const store = getStore();
  const file = await store.getFileByToken(params.token);
  if (!file) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (!file.consentAt) return NextResponse.json({ error: "consent required" }, { status: 403 });

  const form = await req.formData();
  const reqKey = String(form.get("reqKey") ?? "");
  const part = form.get("part") ? String(form.get("part")) : undefined;
  const upload = form.get("file") as File | null;

  if (!upload || !reqKey) return NextResponse.json({ error: "missing file or slot" }, { status: 400 });
  if (upload.size > MAX_BYTES) {
    return NextResponse.json({ error: "That file is over 15 MB — a phone photo or standard PDF works best." }, { status: 400 });
  }
  const contentType = upload.type || "application/octet-stream";
  if (!ALLOWED.includes(contentType)) {
    return NextResponse.json({ error: "Please upload a photo (JPG/PNG) or a PDF." }, { status: 400 });
  }
  if (!(file.requirements ?? []).some((r) => r.key === reqKey)) {
    return NextResponse.json({ error: "unknown document slot" }, { status: 400 });
  }

  const data = Buffer.from(await upload.arrayBuffer());
  const ext = contentType === "application/pdf" ? "pdf" : contentType.split("/")[1];
  const storagePath = `${file.id}/${reqKey}${part ? `-${part.toLowerCase().replace(/\s+/g, "_")}` : ""}-${Date.now()}.${ext}`;
  await store.putBlob(storagePath, data, contentType);

  const doc = await store.createDoc({
    fileId: file.id,
    reqKey,
    part,
    filename: upload.name,
    contentType,
    storagePath,
    uploadedAt: new Date().toISOString(),
    status: "processing",
  });
  await store.audit({ fileId: file.id, actor: "client", action: "doc_uploaded", detail: `${reqKey}${part ? ` (${part})` : ""}` });

  // Read + quality-check inline (serverless-friendly; no queue needed at v1 volume).
  let outcome;
  try {
    outcome = await readDocument({ reqKey, part, filename: upload.name, contentType, data });
  } catch (err) {
    // Reader down ≠ client blocked: keep the doc, let the agent review manually.
    outcome = {
      status: "needs_review" as const,
      reason: "Automatic check unavailable — your agent will review this one personally.",
      extracted: {},
      sinDetected: false,
      cardDetected: false,
      flags: ["reader_error"],
    };
  }

  const updated = await store.updateDoc(doc.id, {
    status: outcome.status,
    reason: outcome.reason,
    extracted: outcome.extracted,
    sinDetected: outcome.sinDetected,
    cardDetected: outcome.cardDetected,
    flags: outcome.flags,
  });
  await store.audit({
    fileId: file.id,
    actor: "system",
    action: `doc_${outcome.status}`,
    detail: `${reqKey}${outcome.reason ? ` — ${outcome.reason}` : ""}${outcome.sinDetected ? " [SIN detected → masked]" : ""}`,
  });

  return NextResponse.json({
    id: updated.id,
    status: updated.status,
    reason: updated.reason ?? null,
  });
}
