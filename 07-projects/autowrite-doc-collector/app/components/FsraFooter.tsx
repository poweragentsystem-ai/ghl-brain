// FSRA/MBLAA disclosure — required clearly and prominently on every page.
// Values come from env so the app stays generic for other agents (anyone-use test).
export default function FsraFooter({ dark = false }: { dark?: boolean }) {
  const name = process.env.NEXT_PUBLIC_AGENT_NAME || "Renée Ross";
  const title = process.env.NEXT_PUBLIC_AGENT_TITLE || "Mortgage Agent, Level 2";
  const brokerage = process.env.NEXT_PUBLIC_BROKERAGE || "Ontario Lending Solutions";
  const licence = process.env.NEXT_PUBLIC_BROKERAGE_LICENCE || "13063";
  return (
    <footer
      className={`mt-10 border-t px-5 py-6 text-center text-sm ${
        dark ? "border-white/10 text-slate-300" : "border-navy/10 text-navy/70"
      }`}
    >
      <p className="font-medium">
        {name}, {title}
      </p>
      <p>
        {brokerage} — Brokerage Licence #{licence}
      </p>
      <p className="mt-2">
        <a href="/privacy" className="underline">
          Privacy &amp; how we protect your documents
        </a>
      </p>
    </footer>
  );
}
