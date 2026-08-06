// Lender matching — ranked best-first for the AGENT.
// Ranking: fits only, sorted by rate (then faster close). Everything tied with
// the best rate is coded "best" (green). Promos/incentives are highlighted.
// Non-fits are listed with the specific reason, so the team learns the patterns.

import type { ClientFile } from "../store";
import { LENDERS, type LenderRule } from "./data";

export interface LenderMatch {
  lender: LenderRule;
  fit: boolean;
  best: boolean;
  reasons: string[]; // why it fits (fit) or why not (non-fit)
}

function fileLtv(file: ClientFile): number | null {
  const a = file.answers;
  if (!a?.propertyValue) return null;
  const owed = (a.mortgageBalance ?? 0) + (a.otherSecuredDebts ?? 0) + (a.cashNeeded ?? 0);
  return owed / a.propertyValue;
}

export function matchLenders(file: ClientFile): { fits: LenderMatch[]; nonFits: LenderMatch[] } {
  const a = file.answers ?? ({} as NonNullable<ClientFile["answers"]>);
  const path = file.path ?? "triage";
  const ltv = fileLtv(file);
  const urgentDays = a.timeline === "days";

  const evaluated: LenderMatch[] = LENDERS.map((lender) => {
    const why: string[] = [];
    const against: string[] = [];

    // Product fit
    const product = path === "heloc" ? "heloc" : path;
    if (!lender.products.includes(product === "triage" ? "refinance" : product)) {
      against.push(`No ${path} product`);
    }
    // LTV
    if (ltv != null) {
      if (ltv > lender.maxLtv) against.push(`LTV ${(ltv * 100).toFixed(0)}% over their ${(lender.maxLtv * 100).toFixed(0)}% cap`);
      else why.push(`LTV ${(ltv * 100).toFixed(0)}% within ${(lender.maxLtv * 100).toFixed(0)}% cap`);
    }
    // Income type
    if (a.employment === "self_employed" && !lender.acceptsSelfEmployedBfs) {
      against.push("Full T4/NOA income only — not BFS-friendly");
    }
    if ((a.employment === "retired" || a.employment === "not_working") && !lender.acceptsNonTraditionalIncome) {
      against.push("Requires traditional employment income");
    } else if (a.employment && ["retired", "not_working"].includes(a.employment) && lender.acceptsNonTraditionalIncome) {
      why.push("Accepts pension/non-traditional income");
    }
    // Bankruptcy
    if (a.hadBankruptcy && !lender.acceptsRecentBankruptcy) {
      against.push("Declines recent bankruptcy/consumer proposal");
    }
    // Urgency
    if (urgentDays) {
      if (lender.quickCloseDays > 7) against.push(`Can't close in days (~${lender.quickCloseDays}d typical)`);
      else why.push(`Fast close (~${lender.quickCloseDays} days)`);
    }

    return { lender, fit: against.length === 0, best: false, reasons: against.length ? against : why };
  });

  const fits = evaluated
    .filter((m) => m.fit)
    .sort((x, y) => x.lender.rate5yrFixedPct - y.lender.rate5yrFixedPct || x.lender.quickCloseDays - y.lender.quickCloseDays);
  if (fits.length) {
    const bestRate = fits[0].lender.rate5yrFixedPct;
    for (const m of fits) m.best = m.lender.rate5yrFixedPct === bestRate;
  }
  const nonFits = evaluated.filter((m) => !m.fit);
  return { fits, nonFits };
}
