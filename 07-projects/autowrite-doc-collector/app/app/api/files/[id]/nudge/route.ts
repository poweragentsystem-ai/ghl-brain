import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { isAgentAuthed } from "@/lib/session";
import { computeProgress } from "@/lib/progress";
import { missingDocsEmail, sendNudge } from "@/lib/nudge";

export const dynamic = "force-dynamic";

/** One-tap "nudge the client for whatever is still missing". */
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAgentAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const store = getStore();
  const file = await store.getFile(params.id);
  if (!file) return NextResponse.json({ error: "not found" }, { status: 404 });

  const progress = computeProgress(file, await store.listDocs(file.id));
  const missing = progress.slots
    .filter((s) => !s.doc || ["needs_reupload", "rejected"].includes(s.doc.status))
    .map((s) => s.label + (s.part ? ` (${s.part})` : ""));

  if (missing.length) {
    const link = `${req.nextUrl.origin}/c/${file.token}`;
    const mail = missingDocsEmail(file.clientName.split(" ")[0], missing, link);
    await sendNudge({ fileId: file.id, to: file.clientEmail, ...mail });
  }
  return NextResponse.redirect(new URL(`/dashboard/file/${file.id}`, req.url), 303);
}
