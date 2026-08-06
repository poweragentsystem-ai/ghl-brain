import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { isAgentAuthed } from "@/lib/session";
import { sendNudge } from "@/lib/nudge";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!isAgentAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const form = await req.formData();
  const clientName = String(form.get("clientName") ?? "").trim();
  const clientEmail = String(form.get("clientEmail") ?? "").trim();
  if (!clientName || !clientEmail.includes("@")) {
    return NextResponse.json({ error: "Name and a valid email are required." }, { status: 400 });
  }
  const store = getStore();
  const file = await store.createFile({ clientName, clientEmail });
  await store.audit({ fileId: file.id, actor: "agent", action: "file_created", detail: clientName });

  const link = `${req.nextUrl.origin}/c/${file.token}`;
  await sendNudge({
    fileId: file.id,
    to: clientEmail,
    subject: `${clientName}, your secure document link`,
    body: `Hi ${clientName},\n\nHere's your personal, secure link to get your mortgage documents in — it takes a few minutes and works great from your phone:\n\n${link}\n\n— The team`,
  });

  return NextResponse.redirect(new URL(`/dashboard/file/${file.id}`, req.url), 303);
}
