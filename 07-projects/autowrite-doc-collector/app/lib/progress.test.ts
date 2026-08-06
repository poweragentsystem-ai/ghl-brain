import { describe, expect, it } from "vitest";
import { computeProgress } from "./progress";
import { canAccess } from "./viewer";
import type { ClientFile } from "./store";
import { DOCS } from "./rules/documents";

const base: ClientFile = {
  id: "f1", token: "tok-primary", clientName: "Prime Test", clientEmail: "p@t.ca",
  createdAt: "", status: "collecting",
  requirements: [DOCS.id_passport, DOCS.t4_2yr, DOCS.mortgage_statement],
  applicants: [
    { id: "ap2", name: "Co Test", email: "c@t.ca", token: "tok-co", mode: "self", shareWithPrimary: false },
  ],
};

describe("applicant-aware slots (v1.2)", () => {
  it("perApplicant docs duplicate per applicant; shared docs stay single", () => {
    const p = computeProgress(base, []);
    const passportSlots = p.slots.filter((s) => s.reqKey === "id_passport");
    const t4Slots = p.slots.filter((s) => s.reqKey === "t4_2yr");
    const mortgageSlots = p.slots.filter((s) => s.reqKey === "mortgage_statement");
    expect(passportSlots.map((s) => s.applicantId).sort()).toEqual(["ap2", "primary"]);
    expect(t4Slots).toHaveLength(2);
    expect(mortgageSlots).toHaveLength(1);
    expect(mortgageSlots[0].applicantId).toBe("primary");
  });

  it("documents attach to the right applicant's slot", () => {
    const doc = {
      id: "d1", fileId: "f1", reqKey: "t4_2yr", applicantId: "ap2", filename: "t4.pdf",
      contentType: "application/pdf", storagePath: "x", uploadedAt: "2026-08-06", status: "verified" as const,
    };
    const p = computeProgress(base, [doc]);
    const coT4 = p.slots.find((s) => s.reqKey === "t4_2yr" && s.applicantId === "ap2");
    const primeT4 = p.slots.find((s) => s.reqKey === "t4_2yr" && s.applicantId === "primary");
    expect(coT4?.doc?.id).toBe("d1");
    expect(primeT4?.doc).toBeNull();
  });
});

describe("privacy: co-applicant documents are theirs by default", () => {
  const viewerPrimary = { file: base, type: "primary" as const, applicant: null, ownId: "primary" };
  const viewerCo = { file: base, type: "applicant" as const, applicant: base.applicants![0], ownId: "ap2" };

  it("primary CANNOT access a self-mode, non-sharing co-applicant's docs", () => {
    expect(canAccess(viewerPrimary, "ap2")).toBe(false);
  });
  it("co-applicant accesses only their own", () => {
    expect(canAccess(viewerCo, "ap2")).toBe(true);
    expect(canAccess(viewerCo, "primary")).toBe(false);
  });
  it("sharing ON opens access to the primary", () => {
    const shared: ClientFile = { ...base, applicants: [{ ...base.applicants![0], shareWithPrimary: true }] };
    expect(canAccess({ ...viewerPrimary, file: shared }, "ap2")).toBe(true);
  });
  it("delegated mode gives the primary access (they upload on their behalf)", () => {
    const delegated: ClientFile = { ...base, applicants: [{ ...base.applicants![0], mode: "delegated" }] };
    expect(canAccess({ ...viewerPrimary, file: delegated }, "ap2")).toBe(true);
  });
});
