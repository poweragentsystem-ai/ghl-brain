import { describe, expect, it } from "vitest";
import { applyCrossDocRules, PRIOR_EMPLOYMENT_DOC } from "./crossdoc";
import type { DocRecord } from "../store";

const letter = (startDate: string, status = "verified"): DocRecord => ({
  id: "d1", fileId: "f1", reqKey: "employment_letter", filename: "letter.pdf",
  contentType: "application/pdf", storagePath: "x", uploadedAt: new Date().toISOString(),
  status: status as DocRecord["status"], extracted: { "Start date": startDate, "Name on document": "Renée Test" },
});

describe("Renée's rule: employment letter under 1 year → 2-year history", () => {
  const now = new Date("2026-08-06");

  it("start date 6 months ago → previous-employment proof auto-added, friendly note", () => {
    const r = applyCrossDocRules([letter("2026-02-01")], [], now);
    expect(r.addRequirements.map((d) => d.key)).toContain("prior_employment_proof");
    expect(r.notes.some((n) => n.audience === "client" && /2-year picture/i.test(n.text))).toBe(true);
    expect(r.notes.some((n) => n.audience === "agent" && /<12 months/.test(n.text))).toBe(true);
  });

  it("start date 3 years ago → nothing added", () => {
    const r = applyCrossDocRules([letter("2023-04-01")], [], now);
    expect(r.addRequirements).toHaveLength(0);
  });

  it("exactly 12+ months → nothing added (boundary)", () => {
    const r = applyCrossDocRules([letter("2025-08-01")], [], now);
    expect(r.addRequirements).toHaveLength(0);
  });

  it("does not double-add when the requirement already exists", () => {
    const r = applyCrossDocRules([letter("2026-02-01")], [PRIOR_EMPLOYMENT_DOC], now);
    expect(r.addRequirements).toHaveLength(0);
  });

  it("unparseable start date → no crash, no add", () => {
    const r = applyCrossDocRules([letter("employed since spring")], [], now);
    expect(r.addRequirements).toHaveLength(0);
  });
});

describe("name-variant heads-up (neutral, never 'fraud')", () => {
  it("two different names across verified docs → agent attention note", () => {
    const a = letter("2023-04-01");
    const b: DocRecord = { ...a, id: "d2", reqKey: "noa_2yr", extracted: { "Name on document": "R. Tester" } };
    const r = applyCrossDocRules([a, b], []);
    const note = r.notes.find((n) => n.audience === "agent");
    expect(note?.text).toMatch(/more than one name/i);
    expect(note?.text).not.toMatch(/fraud/i);
  });
});
