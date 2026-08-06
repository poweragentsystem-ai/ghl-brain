// Agent dashboard — the glance test: a brand-new licensee should read any file's
// state in 3 seconds. Dark theme (house rule for dashboards).
import { redirect } from "next/navigation";
import { isAgentAuthed } from "@/lib/session";
import { getStore } from "@/lib/store";
import { computeProgress } from "@/lib/progress";
import FsraFooter from "@/components/FsraFooter";
import Link from "next/link";

export const dynamic = "force-dynamic";

const PATH_LABEL: Record<string, string> = {
  purchase: "Purchase", refinance: "Refinance", heloc: "HELOC", renewal: "Renewal",
  private: "Private", reverse: "Reverse", triage: "Needs triage",
};

const WAITING: Record<string, { text: string; cls: string }> = {
  intake: { text: "Waiting: client intake", cls: "bg-slate-500/20 text-slate-300" },
  client: { text: "Waiting on client", cls: "bg-amber/20 text-amber" },
  agent: { text: "Waiting on YOU", cls: "bg-coral/20 text-coral" },
  done: { text: "Complete ✓", cls: "bg-teal/20 text-teal" },
};

export default async function Dashboard() {
  if (!isAgentAuthed()) redirect("/");
  const store = getStore();
  const files = await store.listFiles();
  const withProgress = await Promise.all(
    files.map(async (f) => ({ file: f, progress: computeProgress(f, await store.listDocs(f.id)) })),
  );
  const needsYou = withProgress.filter((x) => x.progress.waitingOn === "agent").length;

  return (
    <main className="dash min-h-screen">
      <div className="mx-auto max-w-3xl px-5 py-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal">Autowrite</p>
            <h1 className="mt-1 text-2xl font-bold text-white">Files</h1>
          </div>
          {needsYou > 0 && (
            <span className="rounded-full bg-coral/20 px-3 py-1 text-sm font-bold text-coral">
              {needsYou} need{needsYou === 1 ? "s" : ""} you
            </span>
          )}
        </div>

        <form action="/api/files" method="post" className="mt-6 grid grid-cols-1 gap-2 rounded-xl2 border border-white/10 bg-white/5 p-4 sm:grid-cols-[1fr_1fr_auto]">
          <input name="clientName" required placeholder="Client name" className="rounded-lg border border-white/10 bg-white/10 px-3 py-2.5 text-white placeholder:text-slate-400 outline-none focus:border-teal" />
          <input name="clientEmail" required type="email" placeholder="Client email" className="rounded-lg border border-white/10 bg-white/10 px-3 py-2.5 text-white placeholder:text-slate-400 outline-none focus:border-teal" />
          <button className="rounded-lg bg-teal px-5 py-2.5 font-semibold text-white">+ New file</button>
        </form>

        <div className="mt-6 space-y-3">
          {withProgress.length === 0 && (
            <p className="rounded-xl2 border border-white/10 bg-white/5 p-8 text-center text-slate-400">
              No files yet. Create one above — your client gets their secure link by email.
            </p>
          )}
          {withProgress.map(({ file, progress }) => {
            const w = WAITING[progress.waitingOn];
            return (
              <Link
                key={file.id}
                href={`/dashboard/file/${file.id}`}
                className="flex items-center gap-4 rounded-xl2 border border-white/10 bg-white/5 p-4 transition hover:border-teal/50"
              >
                <Ring pct={progress.pct} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-white">{file.clientName}</p>
                  <p className="mt-0.5 text-sm text-slate-400">
                    {file.path ? PATH_LABEL[file.path] : "Intake pending"} · {progress.verified}/{progress.total || "?"} documents in
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${w.cls}`}>{w.text}</span>
                  {progress.redCount > 0 && (
                    <span className="text-xs font-semibold text-coral">{progress.redCount} retake{progress.redCount > 1 ? "s" : ""} pending</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
        <FsraFooter dark />
      </div>
    </main>
  );
}

function Ring({ pct }: { pct: number }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  const color = pct === 100 ? "#2A9D8F" : pct >= 50 ? "#E9C46A" : "#E76F51";
  return (
    <div className="relative h-[52px] w-[52px] shrink-0">
      <svg width="52" height="52" viewBox="0 0 52 52" className="-rotate-90">
        <circle cx="26" cy="26" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
        <circle
          cx="26" cy="26" r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-white">
        {pct}%
      </span>
    </div>
  );
}
