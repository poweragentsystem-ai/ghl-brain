import { describe, expect, it } from "vitest";
import { canonicalDocName } from "./docname";

describe("auto-renaming for organization", () => {
  it("T4 with tax year", () => {
    expect(canonicalDocName({ clientName: "Renée Ross", reqKey: "t4_2yr", taxYear: "2025", contentType: "application/pdf" }))
      .toBe("Renee-Ross_T4-slips_2025.pdf");
  });
  it("driver's licence part + jpeg→jpg + accents cleaned", () => {
    expect(canonicalDocName({ clientName: "Renée Ross", reqKey: "id_drivers_licence", part: "Front", contentType: "image/jpeg" }))
      .toBe("Renee-Ross_Drivers-licence_Front.jpg");
  });
  it("co-applicant uses their own name", () => {
    expect(canonicalDocName({ clientName: "Renée Ross", applicantName: "Co Signer", reqKey: "cpp_oas_statement", contentType: "image/png" }))
      .toBe("Co-Signer_CPP-OAS-statement.png");
  });
});
