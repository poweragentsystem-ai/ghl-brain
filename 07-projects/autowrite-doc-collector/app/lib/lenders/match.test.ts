import { describe, expect, it } from "vitest";
import { matchLenders } from "./match";
import type { ClientFile } from "../store";

const file = (over: Partial<ClientFile["answers"]> & { path?: any }): ClientFile => ({
  id: "f1", token: "t", clientName: "Test", clientEmail: "t@t.ca",
  createdAt: "", status: "collecting", path: over.path ?? "refinance",
  answers: { goal: "equity", isHomeowner: true, propertyValue: 800000, mortgageBalance: 300000, cashNeeded: 50000, employment: "employed", timeline: "months", ...over } as any,
});

describe("lender matching — ranked best-first, promos highlighted", () => {
  it("standard refi: fits sorted by rate ascending; all best-rate ties marked best", () => {
    const { fits } = matchLenders(file({}));
    expect(fits.length).toBeGreaterThan(2);
    const rates = fits.map((m) => m.lender.rate5yrFixedPct);
    expect([...rates].sort((a, b) => a - b)).toEqual(rates);
    const best = fits.filter((m) => m.best);
    expect(best.length).toBeGreaterThanOrEqual(1);
    expect(new Set(best.map((m) => m.lender.rate5yrFixedPct)).size).toBe(1);
  });

  it("urgent (days) → only quick-close lenders fit; privates surface", () => {
    const { fits, nonFits } = matchLenders(file({ timeline: "days", path: "private" }));
    expect(fits.every((m) => m.lender.quickCloseDays <= 7)).toBe(true);
    expect(fits.some((m) => m.lender.tier === "private")).toBe(true);
    expect(nonFits.some((m) => m.reasons.join(" ").includes("close in days"))).toBe(true);
  });

  it("self-employed → T4-only lenders listed as non-fits with the reason", () => {
    const { nonFits } = matchLenders(file({ employment: "self_employed" }));
    expect(nonFits.some((m) => m.reasons.join(" ").includes("not BFS-friendly"))).toBe(true);
  });

  it("unemployed homeowner still gets fits (non-traditional income lenders)", () => {
    const { fits } = matchLenders(file({ employment: "not_working" }));
    expect(fits.length).toBeGreaterThan(0);
    expect(fits.every((m) => m.lender.acceptsNonTraditionalIncome)).toBe(true);
  });

  it("over-cap LTV knocks lenders out with the specific reason", () => {
    const { nonFits } = matchLenders(file({ mortgageBalance: 600000, cashNeeded: 100000 }));
    expect(nonFits.some((m) => m.reasons.join(" ").match(/LTV 88% over/))).toBe(true);
  });

  it("bankruptcy → declining lenders excluded, accepting ones remain", () => {
    const { fits, nonFits } = matchLenders(file({ hadBankruptcy: true }));
    expect(fits.every((m) => m.lender.acceptsRecentBankruptcy)).toBe(true);
    expect(nonFits.some((m) => m.reasons.join(" ").includes("bankruptcy"))).toBe(true);
  });
});
