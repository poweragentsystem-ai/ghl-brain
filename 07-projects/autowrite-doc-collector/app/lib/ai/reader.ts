// AI document reader: classify → quality-gate → extract → scrub.
//
// With ANTHROPIC_API_KEY set, pages go to Claude vision with a strict JSON
// contract. Without it (local demo / tests), a deterministic simulator runs so
// the whole product is walkable end-to-end: filenames steer outcomes
// ("blurry" → retake, "old"/"expired" → outdated, "wrongdoc" → mismatch).
//
// Language rule: quality flags say "review suggested" in plain English —
// the app NEVER labels a client document "fraud". The agent judges; we assist.

import { scrubSensitive } from "../sin";
import { DOCS } from "../rules/documents";

export interface ReadOutcome {
  status: "verified" | "needs_reupload" | "needs_review";
  /** Plain-English reason, client-friendly when status is needs_reupload. */
  reason?: string;
  extracted: Record<string, string>;
  sinDetected: boolean;
  cardDetected: boolean;
  flags: string[];
}

const EXTRACTION_HINTS: Record<string, string> = {
  t4_2yr: "employer name, tax year, box 14 employment income",
  noa_2yr: "tax year, line 15000 total income, balance owing",
  t1_general_2yr: "tax year, total income, business income (T2125)",
  paystub_recent: "employer, pay date, gross pay, YTD gross",
  employment_letter: "employer, role, start date, salary",
  id_drivers_licence: "full name, licence expiry date, address",
  id_passport: "full name, passport expiry date",
  mortgage_statement: "lender, balance, payment, maturity date",
  property_tax_bill: "property address, annual tax amount, year",
  purchase_agreement: "property address, purchase price, closing date",
  renewal_statement: "lender, renewal date, balance, offered rate",
};

function claudePrompt(reqKey: string, expectedLabel: string): string {
  return `You are a meticulous Canadian mortgage document checker. Look at this document image.

Expected document: "${expectedLabel}" (slot: ${reqKey}).
Extract: ${EXTRACTION_HINTS[reqKey] ?? "the key identifying fields"}.

Return ONLY JSON:
{
 "matchesExpected": boolean,      // is this actually a ${expectedLabel}?
 "actualType": string,            // what it appears to be
 "legible": boolean,              // readable? not blurry/cropped/dark?
 "complete": boolean,             // no missing pages/sections for this doc type
 "expiryDate": string|null,       // YYYY-MM-DD if the doc has one
 "taxYear": number|null,          // if a tax document
 "fullName": string|null,
 "fields": { ... },               // extracted fields as flat strings
 "concerns": string[]             // anything worth a second look: edits, font inconsistencies, mismatched data. Neutral wording.
}`;
}

async function callClaude(reqKey: string, label: string, image: Buffer, contentType: string): Promise<any> {
  const media = contentType === "application/pdf" ? "document" : "image";
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.READER_MODEL || "claude-sonnet-5",
      max_tokens: 1200,
      messages: [
        {
          role: "user",
          content: [
            {
              type: media,
              source: { type: "base64", media_type: contentType, data: image.toString("base64") },
            },
            { type: "text", text: claudePrompt(reqKey, label) },
          ],
        },
      ],
    }),
  });
  if (!res.ok) throw new Error(`claude ${res.status}: ${await res.text()}`);
  const json = await res.json();
  const text = json.content?.[0]?.text ?? "{}";
  const match = text.match(/\{[\s\S]*\}/);
  return match ? JSON.parse(match[0]) : {};
}

function simulate(reqKey: string, filename: string): any {
  const f = filename.toLowerCase();
  const currentYear = new Date().getFullYear();
  const base = {
    matchesExpected: !f.includes("wrongdoc"),
    actualType: f.includes("wrongdoc") ? "utility bill" : (DOCS as any)[reqKey]?.label ?? reqKey,
    legible: !f.includes("blurry"),
    complete: !f.includes("partial"),
    expiryDate: f.includes("expired") ? "2024-01-01" : reqKey.startsWith("id_") ? `${currentYear + 3}-05-01` : null,
    taxYear: reqKey.includes("noa") || reqKey.includes("t4") || reqKey.includes("t1")
      ? f.includes("old") ? currentYear - 4 : currentYear - 1
      : null,
    fullName: "Renée Test",
    fields:
      reqKey === "noa_2yr"
        ? { "Tax year": String(f.includes("old") ? currentYear - 4 : currentYear - 1), "Line 15000 total income": "$84,000", "SIN on document": "046-454-286" }
        : reqKey === "t4_2yr"
          ? { Employer: "Acme Corp", "Box 14": "$82,500", "Employee SIN": "046454286" }
          : { Name: "Renée Test" },
    concerns: f.includes("edited") ? ["Font weight differs on the income line — review suggested"] : [],
  };
  return base;
}

export async function readDocument(input: {
  reqKey: string;
  part?: string;
  filename: string;
  contentType: string;
  data: Buffer;
}): Promise<ReadOutcome> {
  const label = (DOCS as any)[input.reqKey]?.label ?? input.reqKey;
  let raw: any;
  if (process.env.ANTHROPIC_API_KEY) {
    raw = await callClaude(input.reqKey, label, input.data, input.contentType);
  } else {
    raw = simulate(input.reqKey, input.filename);
  }

  // Scrub EVERY extracted string before anything is stored or shown.
  let sinDetected = false;
  let cardDetected = false;
  const extracted: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw.fields ?? {})) {
    const scrubbed = scrubSensitive(String(v));
    sinDetected ||= scrubbed.sinDetected;
    cardDetected ||= scrubbed.cardDetected;
    // Drop fields that are ONLY a sensitive number — nothing useful remains.
    if (scrubbed.sinDetected && scrubbed.text.trim() === "***-***-***") continue;
    if (scrubbed.cardDetected && scrubbed.text.trim() === "**** **** **** ****") continue;
    extracted[k] = scrubbed.text;
  }
  if (raw.fullName) extracted["Name on document"] = scrubSensitive(String(raw.fullName)).text;
  if (raw.taxYear) extracted["Tax year"] = String(raw.taxYear);
  if (raw.expiryDate) extracted["Expiry"] = String(raw.expiryDate);

  const flags: string[] = [...(raw.concerns ?? [])];

  // Quality gates → client-friendly re-upload reasons.
  if (!raw.matchesExpected) {
    return {
      status: "needs_reupload",
      reason: `This looks like a ${raw.actualType ?? "different document"} — we need your ${label}. Mind uploading that one?`,
      extracted, sinDetected, cardDetected, flags,
    };
  }
  if (!raw.legible) {
    return {
      status: "needs_reupload",
      reason: "The photo is a little blurry — retake it in good light with the whole page in frame.",
      extracted, sinDetected, cardDetected, flags,
    };
  }
  if (!raw.complete) {
    return {
      status: "needs_reupload",
      reason: `A page looks missing — please upload the complete ${label}.`,
      extracted, sinDetected, cardDetected, flags,
    };
  }
  if (raw.expiryDate && new Date(raw.expiryDate) < new Date()) {
    return {
      status: "needs_reupload",
      reason: `This one is expired (${raw.expiryDate}). Please upload a current ${label}.`,
      extracted, sinDetected, cardDetected, flags,
    };
  }
  if (raw.taxYear && new Date().getFullYear() - raw.taxYear > 2) {
    return {
      status: "needs_reupload",
      reason: `We need a more recent year — this is from ${raw.taxYear}. The last two tax years work best.`,
      extracted, sinDetected, cardDetected, flags,
    };
  }
  if (flags.length > 0) {
    return { status: "needs_review", reason: flags[0], extracted, sinDetected, cardDetected, flags };
  }
  return { status: "verified", extracted, sinDetected, cardDetected, flags };
}
