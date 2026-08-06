// The document-requirements engine.
//
// Thinks like a mortgage professional: classifies the deal path from the client's
// answers, computes the exact document set, and NEVER dead-ends —
// every failed gate emits the alternative route (Renée's design law #1).
//
// Product rules sourced from skills/morgan-mortgage.md + validated on wowa.ca:
//   refinance hard ceiling 80% LTV, practical ~75% (invisible costs ~5%);
//   reverse mortgage 55+ (CHIP/Equitable), else refinance path;
//   private = homeowner under 80% LTV, or purchase w/ 20%+ down needing quick close,
//   or funding needed in days; FTB down tiers 5% / 10% / 20%.

import { DOCS, type DocKey } from "./documents";
import type { DealPath, DocRequirement, EngineResult, IntakeAnswers, PathNote } from "./types";

export const REVERSE_MIN_AGE = 55;
export const LTV_HARD_CEILING = 0.8;
export const LTV_PRACTICAL_CEILING = 0.75;

function req(keys: DocKey[]): DocRequirement[] {
  return keys.map((k) => DOCS[k]);
}

function idDocs(a: IntakeAnswers): DocRequirement[] {
  // Renée's exact ID rules: DL = front AND back; passport = picture page only;
  // credit card as the second piece either way.
  const primary = a.primaryIdType === "passport" ? DOCS.id_passport : DOCS.id_drivers_licence;
  return [primary, DOCS.id_credit_card];
}

function incomeDocs(a: IntakeAnswers, notes: PathNote[]): DocRequirement[] {
  switch (a.employment) {
    case "self_employed":
      return req(["noa_2yr", "t1_general_2yr", "business_licence_or_incorporation", "business_bank_6mo"]);
    case "retired":
      return req(["cpp_oas_statement", "pension_statement", "bank_3mo_income"]);
    case "not_working":
      // THE rule: an unemployed homeowner still has access to their equity.
      // Ask for whatever income streams exist — never treat "no job" as "no deal".
      notes.push({
        audience: "client",
        tone: "good_news",
        text: "Not working right now? No problem — your home's equity is what matters here. We'll just collect proof of any income you do receive.",
      });
      return req(["cpp_oas_statement", "pension_statement", "bank_3mo_income"]);
    case "employed":
    default:
      return req(["t4_2yr", "noa_2yr", "paystub_recent", "employment_letter"]);
  }
}

function homeownerDocs(): DocRequirement[] {
  return req(["mortgage_statement", "property_tax_bill", "home_insurance"]);
}

function purchaseDocs(a: IntakeAnswers): DocRequirement[] {
  const docs = req(["purchase_agreement", "mls_listing", "down_payment_90day"]);
  if (a.downPaymentSource === "gift") docs.push(DOCS.gift_letter);
  if (a.downPaymentSource === "rrsp_hbp") docs.push(DOCS.rrsp_hbp);
  return docs;
}

function computeLtv(a: IntakeAnswers) {
  if (!a.propertyValue || a.propertyValue <= 0) return undefined;
  const owed = (a.mortgageBalance ?? 0) + (a.otherSecuredDebts ?? 0) + (a.cashNeeded ?? 0);
  const ratio = owed / a.propertyValue;
  return {
    ratio: Math.round(ratio * 1000) / 1000,
    practicalCeiling: LTV_PRACTICAL_CEILING,
    hardCeiling: LTV_HARD_CEILING,
    tight: ratio > LTV_PRACTICAL_CEILING,
  };
}

/** Classify the deal path the way a pro would triage the file. */
export function classifyPath(a: IntakeAnswers): { path: DealPath; notes: PathNote[] } {
  const notes: PathNote[] = [];

  if (a.goal === "renewal") return { path: "renewal", notes };

  if (a.goal === "purchase") {
    // Purchase needing funds in days with 20%+ down → private (quick close).
    if (a.timeline === "days" && (a.downPaymentPct ?? 0) >= 20) {
      notes.push({
        audience: "agent",
        tone: "info",
        text: "Quick-close purchase with 20%+ down — routed to the private path.",
      });
      return { path: "private", notes };
    }
    return { path: "purchase", notes };
  }

  if (a.goal === "equity") {
    // Reverse interest but under 55 → NEVER stop them; refinance path instead.
    if (a.interestedInReverse) {
      if ((a.age ?? 0) >= REVERSE_MIN_AGE) {
        return { path: "reverse", notes };
      }
      notes.push({
        audience: "client",
        tone: "good_news",
        text: "A reverse mortgage needs you to be 55+, but good news — you can still move forward today. We'll set you up on the refinance route, which gets you the same access to your equity.",
      });
      return { path: "refinance", notes };
    }
    // Funding needed in days → obviously a private deal.
    if (a.timeline === "days") return { path: "private", notes };
    return { path: "refinance", notes };
  }

  return { path: "triage", notes };
}

export function evaluate(a: IntakeAnswers): EngineResult {
  const { path, notes } = classifyPath(a);
  const askNext: string[] = [];
  const requirements: DocRequirement[] = [...idDocs(a)];

  // Income docs for every path except reverse (equity-driven, income-light)
  if (path !== "reverse") requirements.push(...incomeDocs(a, notes));

  if (a.isHomeowner) requirements.push(...homeownerDocs());

  switch (path) {
    case "purchase":
      requirements.push(...purchaseDocs(a));
      if (!a.downPaymentSource) askNext.push("downPaymentSource");
      break;
    case "private":
      if (a.goal === "purchase") requirements.push(...purchaseDocs(a));
      // Mandatory on every private deal: what's the exit plan?
      if (!a.exitPlan) {
        askNext.push("exitPlan");
      } else {
        notes.push({
          audience: "agent",
          tone: "info",
          text: `Private deal — client's exit plan: ${a.exitPlan}.`,
        });
      }
      break;
    case "renewal":
      requirements.push(DOCS.renewal_statement);
      break;
    case "reverse":
      notes.push({
        audience: "client",
        tone: "info",
        text: "Reverse mortgages are based on your home, not your income — so the paperwork is lighter.",
      });
      break;
    case "triage":
      notes.push({
        audience: "client",
        tone: "info",
        text: "No stress — upload the basics below and we'll figure out the best route together.",
      });
      break;
  }

  requirements.push(DOCS.void_cheque);

  // Silent LTV math (Morgan's rule: calculate in your head, deliver the answer).
  const ltv = a.isHomeowner ? computeLtv(a) : undefined;
  if (ltv?.tight) {
    notes.push({
      audience: "agent",
      tone: "attention",
      text: `LTV ${(ltv.ratio * 100).toFixed(1)}% is above the ~75% practical ceiling (invisible costs ≈5%). Consider suggesting a lower cash amount — honestly, not gamed.`,
    });
  }

  // Dedup by key while preserving order
  const seen = new Set<string>();
  const deduped = requirements.filter((d) => (seen.has(d.key) ? false : (seen.add(d.key), true)));

  // Missing-answer follow-ups that drive the wizard
  if (a.isHomeowner === undefined) askNext.unshift("isHomeowner");
  if (!a.employment && path !== "reverse") askNext.push("employment");
  if (!a.timeline && (a.goal === "equity" || a.goal === "purchase")) askNext.push("timeline");
  if (a.hasCoApplicant === undefined) askNext.push("hasCoApplicant");

  return { path, requirements: deduped, notes, askNext, ltv };
}

/**
 * The no-dead-end guarantee, as an executable invariant:
 * for ANY answers, the engine returns a non-empty requirement list and never throws.
 */
export function neverDeadEnds(a: IntakeAnswers): boolean {
  const r = evaluate(a);
  return r.requirements.length > 0;
}
