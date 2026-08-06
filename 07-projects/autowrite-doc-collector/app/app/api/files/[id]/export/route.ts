import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { isAgentAuthed } from "@/lib/session";
import { computeProgress } from "@/lib/progress";
import { computeRatios } from "@/lib/mortgage-math";

export const dynamic = "force-dynamic";

/**
 * Application export package — structured JSON shaped for downstream systems.
 *
 * v1 delivery paths:
 *  - Velocity: request an API key inside Velocity (Add-Ons → Velocity API →
 *    "Request API Key"), then POST this payload via their API IN. Until the key
 *    exists, the JSON doubles as a copy-paste-ready field summary.
 *  - Finmo (Lendesk): partner API — same payload, adapter to their schema.
 *  - Scarlett: PIN-gated, no unattended API — use this package for fast manual
 *    entry + upload the verified documents from storage.
 *
 * SIN policy holds here too: extracted data was scrubbed at ingest, so no SIN
 * or card number can appear in any export.
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAgentAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const store = getStore();
  const file = await store.getFile(params.id);
  if (!file) return NextResponse.json({ error: "not found" }, { status: 404 });
  const docs = await store.listDocs(file.id);
  const progress = computeProgress(file, docs);
  const a = file.answers ?? ({} as any);
  const loanAmount = (a.mortgageBalance ?? 0) + (a.cashNeeded ?? 0);
  const ratios = computeRatios({ annualIncome: a.annualIncome, monthlyDebts: a.monthlyDebts, loanAmount });

  const pkg = {
    generatedAt: new Date().toISOString(),
    generator: "autowrite v1.1",
    disclaimer: "Indicative package assembled from client-provided answers and AI-read documents. Verify before submission. Contains no SIN or card numbers by design.",
    applicant: {
      name: file.clientName,
      email: file.clientEmail,
      employment: a.employment ?? null,
      annualIncome: a.annualIncome ?? null,
      monthlyDebts: a.monthlyDebts ?? null,
      bankruptcyLast7yr: a.hadBankruptcy ?? null,
      coApplicant: a.hasCoApplicant ?? null,
      clientStatedGoal: a.clientNote ?? null,
    },
    deal: {
      path: file.path ?? null,
      goal: a.goal ?? null,
      timeline: a.timeline ?? null,
      exitPlan: a.exitPlan ?? null,
      property: {
        address: a.propertyAddress ?? null,
        estimatedValue: a.propertyValue ?? null,
        mortgageBalance: a.mortgageBalance ?? null,
        requestedFunds: a.cashNeeded ?? null,
      },
      purchase: a.goal === "purchase" ? { price: a.purchasePrice ?? null, downPaymentPct: a.downPaymentPct ?? null, downPaymentSource: a.downPaymentSource ?? null } : null,
      ratiosIndicative: ratios,
    },
    documents: progress.slots.map((s) => ({
      requirement: s.label,
      filename: s.doc?.displayName ?? null,
      part: s.part,
      status: s.doc?.status ?? "missing",
      extracted: s.doc?.extracted ?? null,
      sinDetectedAndMasked: s.doc?.sinDetected ?? false,
    })),
    completeness: { pct: progress.pct, verified: progress.verified, total: progress.total },
    agentNotes: file.agentNotes ?? null,
  };

  await store.audit({ fileId: file.id, actor: "agent", action: "package_exported" });
  return new NextResponse(JSON.stringify(pkg, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${file.clientName.replace(/\s+/g, "-").toLowerCase()}-application-package.json"`,
    },
  });
}
