import FsraFooter from "@/components/FsraFooter";

export default function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-10">
      <h1 className="text-3xl font-bold">Privacy — the plain-English version first</h1>
      <p className="mt-3 text-lg text-navy/70">
        You're trusting us with the paperwork behind the biggest purchase of your life. Here's
        exactly how we treat it.
      </p>

      <div className="card mt-6 space-y-2">
        <p>🔒 <b>We never ask for your Social Insurance Number.</b> Not in any form, ever. Where a SIN is printed on a document you upload (like a T4 or Notice of Assessment), our system detects it and hides it from view. The number itself is never saved as data.</p>
        <p>🇨🇦 <b>Stored in Canada.</b> Your documents are encrypted and held in a Canadian data centre.</p>
        <p>👀 <b>Only two people can see them:</b> you and your mortgage agent. Every view is logged.</p>
        <p>🤖 <b>AI reading, disclosed.</b> A secure AI reading service checks each document (is it the right one, is it readable, is anything missing) so you find out immediately instead of days later. It processes the document to do this check; results are stored, the reading service keeps nothing.</p>
        <p>🗑 <b>Deletion.</b> Ask your agent to delete your documents any time before your application is submitted. After submission, mortgage records are kept for the period Ontario regulation requires (typically 7 years), then destroyed.</p>
      </div>

      <h2 className="mt-10 text-xl font-bold">The formal part (PIPEDA)</h2>
      <div className="mt-3 space-y-3 text-navy/80">
        <p><b>What we collect:</b> the answers you give about your situation, the documents you upload, and technical logs needed to keep the service secure. We collect only what your mortgage application actually requires — this is why your checklist is built from your answers instead of being one long generic list.</p>
        <p><b>Why we collect it:</b> to assemble and verify the document package for the mortgage application you asked your agent to arrange. We don't use it for anything else. No marketing, no resale, no profiling.</p>
        <p><b>Consent:</b> you consent when you start the checklist, and you can withdraw it by contacting your agent (contact details in the footer). Withdrawing before submission means we delete your uploads.</p>
        <p><b>Where it lives:</b> encrypted at rest in Canada. Document checking is performed by a secure AI processing service; where processing occurs outside Canada it is protected by contract and encryption in transit, and no sensitive numbers (SIN, card numbers) are ever retained as extracted data anywhere.</p>
        <p><b>Access &amp; correction:</b> you can ask for a copy of the personal information we hold, and have it corrected, by contacting your agent.</p>
        <p><b>If something goes wrong:</b> we maintain a breach-response process; where a breach creates a real risk of significant harm you will be notified, as will the Privacy Commissioner of Canada.</p>
      </div>
      <FsraFooter />
    </main>
  );
}
