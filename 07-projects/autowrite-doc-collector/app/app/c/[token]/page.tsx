import ClientPortal from "@/components/ClientPortal";
import FsraFooter from "@/components/FsraFooter";
import { getStore } from "@/lib/store";
import { resolveViewer } from "@/lib/viewer";
import { isAgentAuthed } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function ClientPage({
  params,
  searchParams,
}: {
  params: { token: string };
  searchParams: { as?: string };
}) {
  const viewer = await resolveViewer(getStore(), params.token);
  if (!viewer) {
    return (
      <main className="mx-auto max-w-md px-5 py-16 text-center">
        <h1 className="text-2xl font-bold">Hmm, this link isn't active</h1>
        <p className="mt-3 text-navy/60">
          Ask your mortgage agent to send you a fresh link — it only takes them a second.
        </p>
      </main>
    );
  }
  const asAgent = searchParams.as === "agent" && isAgentAuthed() && viewer.type === "primary";
  return (
    <>
      <ClientPortal token={params.token} asAgent={asAgent} />
      <FsraFooter />
    </>
  );
}
