import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { isAgentAuthed } from "@/lib/session";

export const dynamic = "force-dynamic";

/** Save the broker's back-end notes for a file. Agent-only, never client-visible. */
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAgentAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const form = await req.formData();
  const agentNotes = String(form.get("agentNotes") ?? "").slice(0, 5000);
  const store = getStore();
  await store.updateFile(params.id, { agentNotes });
  await store.audit({ fileId: params.id, actor: "agent", action: "notes_updated" });
  return NextResponse.redirect(new URL(`/dashboard/file/${params.id}`, req.url), 303);
}
