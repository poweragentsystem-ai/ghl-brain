// GDS/TDS + payment math — indicative, always labelled as such.
// Benchmarks: insured/prime guideline GDS 39 / TDS 44; B-space commonly ~50/55;
// private lending is equity-driven (LTV first, ratios secondary).

export const BENCHMARKS = {
  prime: { gds: 39, tds: 44 },
  bSide: { gds: 50, tds: 55 },
};

/** Monthly payment for a standard Canadian amortized mortgage. */
export function monthlyPayment(principal: number, annualRatePct: number, years = 25): number {
  if (principal <= 0) return 0;
  const i = annualRatePct / 100 / 12;
  const n = years * 12;
  if (i === 0) return principal / n;
  return (principal * i) / (1 - Math.pow(1 + i, -n));
}

export interface RatioInput {
  annualIncome?: number;
  monthlyDebts?: number;
  loanAmount?: number; // proposed total mortgage (balance + new funds, or purchase mortgage)
  ratePct?: number; // qualifying rate assumption
  propertyTaxAnnual?: number;
  heatMonthly?: number;
}

export interface RatioResult {
  gds: number | null;
  tds: number | null;
  paymentMonthly: number;
  qualifyingRate: number;
  assumptions: string[];
}

export function computeRatios(input: RatioInput): RatioResult {
  const rate = input.ratePct ?? 5.25; // stress-test style qualifying assumption
  const payment = monthlyPayment(input.loanAmount ?? 0, rate);
  const taxes = (input.propertyTaxAnnual ?? (input.loanAmount ? input.loanAmount * 0.008 : 0)) / 12;
  const heat = input.heatMonthly ?? 125;
  const assumptions = [
    `Qualifying rate ${rate.toFixed(2)}%, 25-yr amortization`,
    input.propertyTaxAnnual ? "Property tax from file" : "Property tax estimated at 0.8%/yr",
    `Heat estimated $${heat}/mo`,
  ];

  const monthlyIncome = input.annualIncome ? input.annualIncome / 12 : null;
  if (!monthlyIncome || monthlyIncome <= 0) {
    return { gds: null, tds: null, paymentMonthly: payment, qualifyingRate: rate, assumptions };
  }
  const housing = payment + taxes + heat;
  const gds = (housing / monthlyIncome) * 100;
  const tds = ((housing + (input.monthlyDebts ?? 0)) / monthlyIncome) * 100;
  return {
    gds: Math.round(gds * 10) / 10,
    tds: Math.round(tds * 10) / 10,
    paymentMonthly: Math.round(payment),
    qualifyingRate: rate,
    assumptions,
  };
}

export function ratioVerdict(value: number | null, kind: "gds" | "tds"): "green" | "amber" | "red" | "unknown" {
  if (value == null) return "unknown";
  if (value <= BENCHMARKS.prime[kind]) return "green";
  if (value <= BENCHMARKS.bSide[kind]) return "amber";
  return "red";
}
