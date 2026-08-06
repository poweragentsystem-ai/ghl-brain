import FsraFooter from "@/components/FsraFooter";
import { isAgentAuthed } from "@/lib/session";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function Home() {
  if (isAgentAuthed()) redirect("/dashboard");
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-between px-5 py-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-teal">Autowrite</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight">
          Mortgage documents, without the chase.
        </h1>
        <p className="mt-4 text-lg text-navy/70">
          Your clients get one simple link. Autowrite figures out exactly which documents their
          situation needs, checks every upload, and nudges them when something's missing — so you
          don't have to.
        </p>

        <form action="/api/auth" method="post" className="mt-10 space-y-3">
          <label className="block text-sm font-semibold text-navy/80" htmlFor="pw">
            Agent sign-in
          </label>
          <input id="pw" name="password" type="password" required placeholder="Password" className="input" />
          <button className="btn-primary" type="submit">
            Open my dashboard
          </button>
        </form>

        <p className="mt-6 text-sm text-navy/60">
          Are you a client? Use the personal link your mortgage agent sent you — that's your secure
          door in.
        </p>
      </div>
      <FsraFooter />
    </main>
  );
}
