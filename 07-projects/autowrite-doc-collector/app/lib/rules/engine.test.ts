// Every branch Renée specified, asserted. These tests ARE the proof that the
// engine follows the "never dead-end a deal" law instead of hardcoded rejection.
import { describe, expect, it } from "vitest";
import { classifyPath, evaluate, neverDeadEnds, REVERSE_MIN_AGE } from "./engine";
import type { IntakeAnswers } from "./types";

const keys = (a: IntakeAnswers) => evaluate(a).requirements.map((r) => r.key);

describe("self-employed auto-populates the right documents", () => {
  it("asks for NOAs, T1s, business licence OR incorporation, business bank statements", () => {
    const k = keys({ goal: "equity", isHomeowner: true, employment: "self_employed", timeline: "months" });
    expect(k).toContain("noa_2yr");
    expect(k).toContain("t1_general_2yr");
    expect(k).toContain("business_licence_or_incorporation");
    expect(k).toContain("business_bank_6mo");
    expect(k).not.toContain("t4_2yr");
  });
});

describe("existing homeowner auto-populates property documents", () => {
  it("adds mortgage statement, property tax bill, home insurance", () => {
    const k = keys({ goal: "equity", isHomeowner: true, employment: "employed", timeline: "months" });
    expect(k).toEqual(expect.arrayContaining(["mortgage_statement", "property_tax_bill", "home_insurance"]));
  });
  it("non-homeowner purchase does not ask for homeowner docs", () => {
    const k = keys({ goal: "purchase", isHomeowner: false, employment: "employed", timeline: "months" });
    expect(k).not.toContain("mortgage_statement");
  });
});

describe("NEVER dead-end: unemployed homeowner keeps equity access", () => {
  const a: IntakeAnswers = {
    goal: "equity",
    isHomeowner: true,
    employment: "not_working",
    timeline: "months",
    propertyValue: 800000,
    mortgageBalance: 300000,
  };
  it("still produces a full requirement list (no rejection)", () => {
    expect(neverDeadEnds(a)).toBe(true);
  });
  it("asks for CPP/pension/bank statements instead of T4s", () => {
    const k = keys(a);
    expect(k).toEqual(expect.arrayContaining(["cpp_oas_statement", "pension_statement", "bank_3mo_income"]));
    expect(k).not.toContain("t4_2yr");
    expect(k).not.toContain("employment_letter");
  });
  it("tells the client it's good news, not a problem", () => {
    const r = evaluate(a);
    expect(r.notes.some((n) => n.tone === "good_news" && /equity/i.test(n.text))).toBe(true);
  });
});

describe("reverse mortgage age gate falls through to refinance", () => {
  it("55+ goes down the reverse path", () => {
    const { path } = classifyPath({ goal: "equity", age: 62, interestedInReverse: true });
    expect(path).toBe("reverse");
  });
  it(`under ${REVERSE_MIN_AGE} is routed to refinance WITH a you-can-still-move-forward prompt`, () => {
    const a: IntakeAnswers = { goal: "equity", age: 48, interestedInReverse: true, isHomeowner: true, employment: "employed" };
    const r = evaluate(a);
    expect(r.path).toBe("refinance");
    expect(r.notes.some((n) => n.audience === "client" && /still move forward/i.test(n.text))).toBe(true);
    expect(r.requirements.length).toBeGreaterThan(0);
  });
});

describe("private deal classification (Renée's definition)", () => {
  it("funding needed in days → private", () => {
    const { path } = classifyPath({ goal: "equity", timeline: "days", isHomeowner: true });
    expect(path).toBe("private");
  });
  it("quick-close purchase with 20%+ down → private", () => {
    const { path } = classifyPath({ goal: "purchase", timeline: "days", downPaymentPct: 20 });
    expect(path).toBe("private");
  });
  it("purchase with only 10% down on a quick close stays on the standard purchase path", () => {
    const { path } = classifyPath({ goal: "purchase", timeline: "days", downPaymentPct: 10 });
    expect(path).toBe("purchase");
  });
  it("every private deal must ask the exit plan", () => {
    const r = evaluate({ goal: "equity", timeline: "days", isHomeowner: true, employment: "employed" });
    expect(r.askNext).toContain("exitPlan");
  });
  it("exit plan, once given, is surfaced to the agent", () => {
    const r = evaluate({ goal: "equity", timeline: "days", isHomeowner: true, employment: "employed", exitPlan: "refinance" });
    expect(r.askNext).not.toContain("exitPlan");
    expect(r.notes.some((n) => n.audience === "agent" && /exit plan: refinance/.test(n.text))).toBe(true);
  });
});

describe("ID rules — exactly as specified", () => {
  it("driver's licence requires front AND back, plus credit card second piece", () => {
    const r = evaluate({ goal: "renewal", primaryIdType: "drivers_licence" });
    const dl = r.requirements.find((d) => d.key === "id_drivers_licence");
    expect(dl?.parts).toEqual(["Front", "Back"]);
    expect(r.requirements.some((d) => d.key === "id_credit_card")).toBe(true);
  });
  it("passport requires the picture page only", () => {
    const r = evaluate({ goal: "renewal", primaryIdType: "passport" });
    const pp = r.requirements.find((d) => d.key === "id_passport");
    expect(pp?.parts).toEqual(["Picture page"]);
    expect(r.requirements.some((d) => d.key === "id_drivers_licence")).toBe(false);
  });
});

describe("purchase extras", () => {
  it("gifted down payment adds the gift letter", () => {
    const k = keys({ goal: "purchase", employment: "employed", timeline: "months", downPaymentSource: "gift" });
    expect(k).toContain("gift_letter");
  });
  it("RRSP HBP adds the RRSP statement", () => {
    const k = keys({ goal: "purchase", employment: "employed", timeline: "months", downPaymentSource: "rrsp_hbp" });
    expect(k).toContain("rrsp_hbp");
  });
});

describe("LTV math is silent guidance, never rejection", () => {
  it("tight LTV (>75%) warns the AGENT and suggests a lower cash ask", () => {
    const r = evaluate({
      goal: "equity", isHomeowner: true, employment: "employed", timeline: "months",
      propertyValue: 500000, mortgageBalance: 350000, cashNeeded: 50000,
    });
    expect(r.ltv?.tight).toBe(true);
    const warn = r.notes.find((n) => n.audience === "agent" && n.tone === "attention");
    expect(warn?.text).toMatch(/lower cash amount/i);
    expect(r.requirements.length).toBeGreaterThan(0); // still no dead-end
  });
});

describe("start-screen product choice wins (v1.2)", () => {
  it("explicit private → private path, exit plan required", () => {
    const r = evaluate({ goal: "equity", productChoice: "private", isHomeowner: true, employment: "employed" });
    expect(r.path).toBe("private");
    expect(r.askNext).toContain("exitPlan");
  });
  it("explicit reverse at 60 → reverse; at 45 → refinance with still-move-forward note", () => {
    expect(classifyPath({ goal: "equity", productChoice: "reverse", age: 60 }).path).toBe("reverse");
    const r = classifyPath({ goal: "equity", productChoice: "reverse", age: 45 });
    expect(r.path).toBe("refinance");
    expect(r.notes.some((n) => /still move forward/i.test(n.text))).toBe(true);
  });
  it("explicit refinance but needs funds in days → private with agent note", () => {
    const r = classifyPath({ goal: "equity", productChoice: "refinance", timeline: "days" });
    expect(r.path).toBe("private");
    expect(r.notes.some((n) => n.audience === "agent" && /refinance as the exit/.test(n.text))).toBe(true);
  });
  it("explicit renewal / other route directly", () => {
    expect(classifyPath({ goal: "renewal", productChoice: "renewal" }).path).toBe("renewal");
    expect(classifyPath({ goal: "unsure", productChoice: "other" }).path).toBe("triage");
  });
});

describe("the universal invariant: NO combination of answers dead-ends", () => {
  it("fuzz across the whole answer space", () => {
    const goals = ["purchase", "equity", "renewal", "unsure"] as const;
    const emps = ["employed", "self_employed", "retired", "not_working", undefined] as const;
    const times = ["days", "weeks", "months", undefined] as const;
    for (const goal of goals)
      for (const employment of emps)
        for (const timeline of times)
          for (const isHomeowner of [true, false, undefined])
            for (const age of [30, 55, 70, undefined])
              expect(
                neverDeadEnds({ goal, employment, timeline, isHomeowner, age, interestedInReverse: goal === "equity" }),
              ).toBe(true);
  });
});
