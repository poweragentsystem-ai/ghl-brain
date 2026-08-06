// File detail — per-doc statuses with reasons, masked extracted fields,
// manual override (the human is always in charge), nudge button, audit trail.
import { notFound, redirect } from "next/navigation";
import { isAgentAuthed } from "@/lib/session";
import { getStore } from "@/lib/store";
import { computeProgress } from "@/lib/progress";
import Link from "next/link";

export const dynamic = "force-dynamic";

const STATUS: Record<string, { label: string; cls: string }> = {
  verified: { label: "✓ Verified", cls: "bg-teal/20 text-teal" },
  accepted: { label: "✓ Accepted by you", cls: "bg-teal/20 text-teal" },
  processing: { label: "Checking…", cls: "bg-slate-500/20 text-slate-300" },
  needs_review: { label: "⚠ Your review needed", cls: "bg-amber/20 text-amber" },
  needs_reupload: { label: "↻ Client re-uploading", cls: "bg-coral/20 text-coral" },
  rejected: { label: "✗ Rejected by you", cls: "bg-coral/20 text-coral" },
};

export default async function FileDetail({ params }: { params: { id: string } }) {
  if (!isAgentAuthed()) redirect("/");
  const store = getStore();
  const file = await store.getFile(params.id);
  if (!file) notFound();
  const docs = await store.listDocs(file.id);
  const progress = computeProgress(file, docs);
  const audit = (await store.listAudit(file.id)).slice(-25).reverse();
  const agentNotes = (file.notes ?? []).filter((n) => n.audience !== "client");
  const missingLabels = progress.slots.filter((s) => !s.doc).map((s) => s.label + (s.part ? ` (${s.part})` : ""));

  return (
    <main className="dash min-h-screen">
      <div className="mx-auto max-w-3xl px-5 py-8">
        <Link href="/dashboard" className="text-sm text-slate-400 hover:text-teal">← All files</Link>

        <div className="mt-3 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{file.clientName}</h1>
            <p className="mt-1 text-sm text-slate-400">
              {file.clientEmail} · {file.path ? `Path: ${file.path}` : "intake pending"}
              {file.answers?.exitPlan ? ` · Exit plan: ${file.answers.exitPlan}` : ""}
            </p>
            <p className="mt-1 break-all text-xs text-slate-500">
              Client link: /c/{file.token}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-extrabold text-white">{progress.pct}%</p>
            <p className="text-xs text-slate-400">{progress.verified}/{progress.total} verified</p>
          </div>
        </div>

        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-teal transition-all" style={{ width: `${Math.max(progress.pct, 2)}%` }} />
        </div>

        {agentNotes.length > 0 && (
          <div className="mt-4 space-y-2">
            {agentNotes.map((n, i) => (
              <p key={i} className={`rounded-xl2 border p-3 text-sm ${n.tone === "attention" ? "border-amber/40 bg-amber/10 text-amber" : "border-white/10 bg-white/5 text-slate-300"}`}>
                {n.tone === "attention" ? "⚠ " : "ℹ︎ "}{n.text}
              </p>
            ))}
          </div>
        )}

        {missingLabels.length > 0 && file.requirements?.length ? (
          <form action={`/api/files/${file.id}/nudge`} method="post" className="mt-4">
            <button className="w-full rounded-xl2 border border-teal/40 bg-teal/10 px-4 py-3 text-sm font-semibold text-teal transition hover:bg-teal/20">
              📨 Nudge client — {missingLabels.length} document{missingLabels.length > 1 ? "s" : ""} still missing
            </button>
          </form>
        ) : null}

        <h2 className="mt-8 text-sm font-bold uppercase tracking-wide text-slate-400">Documents</h2>
        <div className="mt-3 space-y-3">
          {progress.slots.length === 0 && (
            <p className="rounded-xl2 border border-white/10 bg-white/5 p-6 text-center text-slate-400">
              The client hasn't finished intake yet — their checklist appears here the moment they do.
            </p>
          )}
          {progress.slots.map((slot) => {
            const d = slot.doc;
            const meta = d ? STATUS[d.status] : { label: "— Not uploaded", cls: "bg-white/5 text-slate-400" };
            return (
              <div key={`${slot.reqKey}-${slot.part ?? "s"}`} className="rounded-xl2 border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-white">
                    {slot.label}
                    {slot.part && <span className="text-slate-400"> — {slot.part}</span>}
                  </p>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${meta.cls}`}>{meta.label}</span>
                </div>
                {d?.reason && <p className="mt-2 text-sm text-slate-300">{d.reason}</p>}
                {d?.sinDetected && (
                  <p className="mt-2 text-xs font-semibold text-teal">🔒 SIN detected on document — masked everywhere, never stored.</p>
                )}
                {d?.extracted && Object.keys(d.extracted).length > 0 && (
                  <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    {Object.entries(d.extracted).map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs text-slate-500">{k}</dt>
                        <dd className="text-slate-200">{v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {d && (
                  <div className="mt-3 flex gap-2">
                    <OverrideButton docId={d.id} action="accept" current={d.status} />
                    <OverrideButton docId={d.id} action="reject" current={d.status} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <h2 className="mt-8 text-sm font-bold uppercase tracking-wide text-slate-400">Activity</h2>
        <ul className="mt-3 space-y-1.5 text-sm">
          {audit.map((e, i) => (
            <li key={i} className="flex gap-3 text-slate-400">
              <span className="shrink-0 font-mono text-xs text-slate-500">{e.ts.slice(5, 16).replace("T", " ")}</span>
              <span><b className="text-slate-300">{e.actor}</b> {e.action.replace(/_/g, " ")}{e.detail ? ` — ${e.detail}` : ""}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

function OverrideButton({ docId, action, current }: { docId: string; action: "accept" | "reject"; current: string }) {
  const isAccept = action === "accept";
  const active = (isAccept && current === "accepted") || (!isAccept && current === "rejected");
  return (
    <form action={`/api/docs/${docId}/decision`} method="post">
      <input type="hidden" name="decision" value={action} />
      <button
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
          active
            ? isAccept ? "bg-teal text-white" : "bg-coral text-white"
            : "bg-white/10 text-slate-300 hover:bg-white/20"
        }`}
      >
        {isAccept ? "Accept" : "Reject → client retakes"}
      </button>
    </form>
  );
}
