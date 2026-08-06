import { describe, expect, it } from "vitest";
import { computeRatios, monthlyPayment, ratioVerdict } from "./mortgage-math";

describe("GDS/TDS math", () => {
  it("monthly payment sanity: $400k @ 5.25%/25yr ≈ $2,384", () => {
    expect(monthlyPayment(400000, 5.25)).toBeGreaterThan(2350);
    expect(monthlyPayment(400000, 5.25)).toBeLessThan(2420);
  });

  it("computes GDS/TDS with stated income and debts", () => {
    const r = computeRatios({ annualIncome: 120000, monthlyDebts: 800, loanAmount: 400000 });
    expect(r.gds).not.toBeNull();
    expect(r.tds).toBeGreaterThan(r.gds!);
    expect(r.assumptions.length).toBeGreaterThan(0);
  });

  it("no income → ratios null, payment still computed (never a crash)", () => {
    const r = computeRatios({ loanAmount: 400000 });
    expect(r.gds).toBeNull();
    expect(r.paymentMonthly).toBeGreaterThan(0);
  });

  it("verdict colours: prime-fit green, B-space amber, beyond red", () => {
    expect(ratioVerdict(35, "gds")).toBe("green");
    expect(ratioVerdict(45, "gds")).toBe("amber");
    expect(ratioVerdict(60, "gds")).toBe("red");
    expect(ratioVerdict(null, "gds")).toBe("unknown");
  });
});
