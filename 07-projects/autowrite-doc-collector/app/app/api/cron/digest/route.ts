import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { computeProgress } from "@/lib/progress";
import { missingDocsEmail, sendNudge } from "@/lib/nudge";

export const dynamic = "force-dynamic";

// Daily digest cron (wire in vercel.json): for every collecting file with gaps,
// nudge the client. Cadence guard: skip files nudged in the last 3 days
// (mortgage-workflow-playbook: every-3-days rhythm, not daily spam).
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const store = getStore();
  const files = await store.listFiles();
  let nudged = 0;

  for (const file of files) {
    if (file.status !== "collecting") continue;
    const progress = computeProgress(file, await store.listDocs(file.id));
    if (progress.waitingOn !== "client") continue;

    const events = await store.listAudit(file.id);
    const lastNudge = [...events].reverse().find((e) => e.action.startsWith("nudge_"));
    if (lastNudge && Date.now() - new Date(lastNudge.ts).getTime() < 3 * 24 * 3600_000) continue;

    const missing = progress.slots
      .filter((s) => !s.doc || ["needs_reupload", "rejected"].includes(s.doc.status))
      .map((s) => s.label + (s.part ? ` (${s.part})` : ""));
    if (!missing.length) continue;

    const link = `${req.nextUrl.origin}/c/${file.token}`;
    const mail = missingDocsEmail(file.clientName.split(" ")[0], missing, link);
    await sendNudge({ fileId: file.id, to: file.clientEmail, ...mail });
    nudged++;
  }

  return NextResponse.json({ ok: true, filesChecked: files.length, nudged });
}
