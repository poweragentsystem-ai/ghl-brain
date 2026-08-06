import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { isAgentAuthed } from "@/lib/session";
import { reuploadEmail, sendNudge } from "@/lib/nudge";
import { DOCS } from "@/lib/rules/documents";

export const dynamic = "force-dynamic";

/** Agent override: accept or reject a document. Human judgment always wins. */
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAgentAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const form = await req.formData();
  const decision = String(form.get("decision") ?? "");
  if (decision !== "accept" && decision !== "reject") {
    return NextResponse.json({ error: "bad decision" }, { status: 400 });
  }

  const store = getStore();
  const status = decision === "accept" ? "accepted" : "rejected";
  const reason = decision === "reject" ? "Your agent asked for a better copy of this one." : undefined;
  const doc = await store.updateDoc(params.id, { status, ...(reason ? { reason } : {}) });
  await store.audit({ fileId: doc.fileId, actor: "agent", action: `doc_${status}`, detail: doc.reqKey });

  if (decision === "reject") {
    const file = await store.getFile(doc.fileId);
    if (file) {
      const label = (DOCS as any)[doc.reqKey]?.label ?? doc.reqKey;
      const link = `${req.nextUrl.origin}/c/${file.token}`;
      const mail = reuploadEmail(file.clientName.split(" ")[0], label, reason!, link);
      await sendNudge({ fileId: file.id, to: file.clientEmail, ...mail });
    }
  }

  return NextResponse.redirect(new URL(`/dashboard/file/${doc.fileId}`, req.url), 303);
}
