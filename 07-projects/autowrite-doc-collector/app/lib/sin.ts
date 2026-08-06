// SIN handling — the PIPEDA answer, in code.
//
// Policy (OPC-grounded):
//  1. The app NEVER asks for a SIN. No field, anywhere.
//  2. Uploaded docs (T4s, NOAs) have the SIN printed on them. We DETECT it,
//     record only `sinDetected: true`, and MASK it in every preview and every
//     piece of extracted text. The raw number is never persisted or logged.
//  3. Credit card numbers get the same treatment (13–19 digits, Luhn-checked).

/** Canadian SINs are 9 digits and pass the Luhn checksum. */
export function isValidSin(digits: string): boolean {
  // Privacy-first: anything 9-digit and Luhn-valid gets masked, including
  // leading-zero SINs (CRA's own example 046-454-286 starts with 0).
  const d = digits.replace(/\D/g, "");
  if (d.length !== 9 || d === "000000000") return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let n = parseInt(d[i], 10);
    if (i % 2 === 1) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
  }
  return sum % 10 === 0;
}

function luhnValid(digits: string): boolean {
  let sum = 0;
  let dbl = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (dbl) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    dbl = !dbl;
  }
  return sum % 10 === 0;
}

const SIN_PATTERN = /\b(\d{3})[\s-]?(\d{3})[\s-]?(\d{3})\b/g;
const CARD_PATTERN = /\b(?:\d[\s-]?){13,19}\b/g;

export interface ScrubResult {
  text: string;
  sinDetected: boolean;
  cardDetected: boolean;
}

/**
 * Scrub sensitive numbers out of any extracted text before it is stored,
 * displayed, or sent anywhere. SIN → "***-***-***", card → "**** **** **** ****".
 */
export function scrubSensitive(input: string): ScrubResult {
  let sinDetected = false;
  let cardDetected = false;

  let text = input.replace(SIN_PATTERN, (match, a, b, c) => {
    if (isValidSin(`${a}${b}${c}`)) {
      sinDetected = true;
      return "***-***-***";
    }
    return match;
  });

  text = text.replace(CARD_PATTERN, (match) => {
    const digits = match.replace(/\D/g, "");
    if (digits.length >= 13 && digits.length <= 19 && luhnValid(digits)) {
      cardDetected = true;
      return "**** **** **** ****";
    }
    return match;
  });

  return { text, sinDetected, cardDetected };
}
