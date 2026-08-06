import { describe, expect, it } from "vitest";
import { isValidSin, scrubSensitive } from "./sin";

// 046-454-286 is the CRA's published example SIN (valid Luhn).
describe("SIN detection + masking", () => {
  it("validates a Luhn-correct SIN and rejects a wrong one", () => {
    expect(isValidSin("046454286")).toBe(true);
    expect(isValidSin("046454287")).toBe(false);
    expect(isValidSin("123456789")).toBe(false);
  });

  it("masks a SIN in extracted text and reports detection", () => {
    const r = scrubSensitive("Employee SIN: 046-454-286 Total income 84,000");
    expect(r.sinDetected).toBe(true);
    expect(r.text).not.toContain("046");
    expect(r.text).toContain("***-***-***");
  });

  it("leaves ordinary 9-digit numbers that fail Luhn alone", () => {
    const r = scrubSensitive("Reference no 123-456-789 on file");
    expect(r.sinDetected).toBe(false);
    expect(r.text).toContain("123-456-789");
  });

  it("masks a valid credit card number", () => {
    const r = scrubSensitive("Card: 4111 1111 1111 1111 exp 09/27");
    expect(r.cardDetected).toBe(true);
    expect(r.text).toContain("**** **** **** ****");
    expect(r.text).not.toContain("4111");
  });

  it("never lets a raw SIN through even unformatted", () => {
    const r = scrubSensitive("sin 046454286 shown");
    expect(r.sinDetected).toBe(true);
    expect(r.text).not.toContain("046454286");
  });
});
