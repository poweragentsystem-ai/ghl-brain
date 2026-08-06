import { redirect } from "next/navigation";
import { isAgentAuthed } from "@/lib/session";
import { getProfile } from "@/lib/profile";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Settings({ searchParams }: { searchParams: { saved?: string } }) {
  if (!isAgentAuthed()) redirect("/");
  const p = await getProfile();
  const input = "w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2.5 text-white placeholder:text-slate-400 outline-none focus:border-teal";
  return (
    <main className="dash min-h-screen">
      <div className="mx-auto max-w-xl px-5 py-8">
        <Link href="/dashboard" className="text-sm text-slate-400 hover:text-teal">← Dashboard</Link>
        <h1 className="mt-3 text-2xl font-bold text-white">Your branding</h1>
        <p className="mt-1 text-sm text-slate-400">
          Shown to clients on their portal — logo up top, you and your credentials at the bottom. Trust sells.
        </p>
        {searchParams.saved && <p className="mt-3 rounded-lg bg-teal/20 px-3 py-2 text-sm font-semibold text-teal">Saved ✓ — live on every client link.</p>}

        <form action="/api/settings" method="post" encType="multipart/form-data" className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="mb-1 block font-semibold text-slate-300">Your name</span>
            <input name="agentName" defaultValue={p.agentName ?? ""} placeholder="Renée Ross" className={input} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-semibold text-slate-300">Professional credentials</span>
            <input name="credentials" defaultValue={p.credentials ?? ""} placeholder="Mortgage Agent, Level 2 · Licence #M2xxxxxxx" className={input} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-semibold text-slate-300">Company / brokerage</span>
            <input name="companyName" defaultValue={p.companyName ?? ""} placeholder="Ontario Lending Solutions — Lic #13063" className={input} />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-sm">
              <span className="mb-1 block font-semibold text-slate-300">Company logo</span>
              {p.logoDataUrl && <img src={p.logoDataUrl} alt="logo" className="mb-2 h-10 rounded bg-white/90 p-1" />}
              <input type="file" name="logo" accept="image/*" className="text-xs text-slate-400" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-semibold text-slate-300">Headshot (optional)</span>
              {p.headshotDataUrl && <img src={p.headshotDataUrl} alt="headshot" className="mb-2 h-14 w-14 rounded-full object-cover" />}
              <input type="file" name="headshot" accept="image/*" className="text-xs text-slate-400" />
            </label>
          </div>
          <button className="rounded-lg bg-teal px-5 py-2.5 font-semibold text-white">Save branding</button>
        </form>
      </div>
    </main>
  );
}
