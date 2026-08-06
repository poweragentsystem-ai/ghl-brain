// Lender rules + INDICATIVE rate sheet.
//
// ⚠️ Rates here are placeholder-indicative for ranking demonstration — the live
// numbers come from lender rate-sheet emails in Renée's Outlook (weekly ingest,
// Paths A/B/C in skills/lender-matching-ols.md). Update `asOf` on every refresh.
// Output is ALWAYS displayed with the FSRA "indicative, not binding" footer.
//
// Lender names are shown to the AGENT ONLY — never to clients (standing rule:
// never name the lender before a formal offer).

export type LenderTier = "A" | "B" | "private";

export interface LenderRule {
  id: string;
  name: string;
  tier: LenderTier;
  maxLtv: number; // primary residence refi/purchase cap
  minCredit: number | null;
  acceptsSelfEmployedBfs: boolean; // bank-statement/stated-style income programs
  acceptsNonTraditionalIncome: boolean; // CPP/pension/rental-driven files
  acceptsRecentBankruptcy: boolean;
  quickCloseDays: number; // realistic fastest close
  products: string[];
  rate5yrFixedPct: number; // indicative
  promo?: string; // active special/incentive — highlighted for the broker
  brokerIncentive?: string; // e.g. elevated BPS this quarter
  notes?: string;
}

export const RATE_SHEET_AS_OF = "2026-08-06 (indicative seed — wire weekly Outlook ingest)";

export const LENDERS: LenderRule[] = [
  { id: "big6_a", name: "Major Bank A", tier: "A", maxLtv: 0.8, minCredit: 680, acceptsSelfEmployedBfs: false, acceptsNonTraditionalIncome: false, acceptsRecentBankruptcy: false, quickCloseDays: 21, products: ["purchase", "refinance", "renewal", "heloc"], rate5yrFixedPct: 4.19 },
  { id: "big6_b", name: "Major Bank B", tier: "A", maxLtv: 0.8, minCredit: 680, acceptsSelfEmployedBfs: false, acceptsNonTraditionalIncome: false, acceptsRecentBankruptcy: false, quickCloseDays: 21, products: ["purchase", "refinance", "renewal"], rate5yrFixedPct: 4.24, promo: "120-day rate hold special", },
  { id: "mono_a", name: "Monoline A", tier: "A", maxLtv: 0.8, minCredit: 650, acceptsSelfEmployedBfs: false, acceptsNonTraditionalIncome: false, acceptsRecentBankruptcy: false, quickCloseDays: 14, products: ["purchase", "refinance", "renewal"], rate5yrFixedPct: 4.09, brokerIncentive: "+10 BPS volume bonus this quarter" },
  { id: "mono_b", name: "Monoline B", tier: "A", maxLtv: 0.8, minCredit: 650, acceptsSelfEmployedBfs: false, acceptsNonTraditionalIncome: true, acceptsRecentBankruptcy: false, quickCloseDays: 14, products: ["purchase", "refinance", "renewal"], rate5yrFixedPct: 4.09 },
  { id: "alt_a", name: "Alt Lender A", tier: "B", maxLtv: 0.8, minCredit: 600, acceptsSelfEmployedBfs: true, acceptsNonTraditionalIncome: true, acceptsRecentBankruptcy: false, quickCloseDays: 10, products: ["purchase", "refinance"], rate5yrFixedPct: 5.34, promo: "Self-employed program — 12-mo bank statements" },
  { id: "alt_b", name: "Alt Lender B", tier: "B", maxLtv: 0.8, minCredit: 580, acceptsSelfEmployedBfs: true, acceptsNonTraditionalIncome: true, acceptsRecentBankruptcy: true, quickCloseDays: 10, products: ["purchase", "refinance"], rate5yrFixedPct: 5.49 },
  { id: "priv_a", name: "Private Fund A", tier: "private", maxLtv: 0.75, minCredit: null, acceptsSelfEmployedBfs: true, acceptsNonTraditionalIncome: true, acceptsRecentBankruptcy: true, quickCloseDays: 3, products: ["private", "refinance"], rate5yrFixedPct: 8.99, notes: "1st/2nd positions, equity-driven" },
  { id: "priv_b", name: "Private Fund B", tier: "private", maxLtv: 0.7, minCredit: null, acceptsSelfEmployedBfs: true, acceptsNonTraditionalIncome: true, acceptsRecentBankruptcy: true, quickCloseDays: 5, products: ["private"], rate5yrFixedPct: 9.49, promo: "Reduced lender fee on deals >$300k" },
  { id: "rev_a", name: "Reverse Lender A", tier: "A", maxLtv: 0.55, minCredit: null, acceptsSelfEmployedBfs: true, acceptsNonTraditionalIncome: true, acceptsRecentBankruptcy: true, quickCloseDays: 30, products: ["reverse"], rate5yrFixedPct: 6.69, notes: "55+, min home value $250k" },
];
