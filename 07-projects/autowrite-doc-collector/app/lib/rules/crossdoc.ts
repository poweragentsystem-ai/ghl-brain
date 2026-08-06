// Cross-document rules — things a pro notices AFTER reading a document.
// Same law as the main engine: findings ADD requirements or notes, never reject.
//
// Rule 1 (Renée): employment letter shows less than 1 year at the current job →
// lenders want 2 years of employment history → auto-add proof of previous
// employment and tell the client why in a friendly way.

import type { DocRecord } from "../store";
import type { DocRequirement, PathNote } from "./types";

export const PRIOR_EMPLOYMENT_DOC: DocRequirement = {
  key: "prior_employment_proof",
  label: "Previous employment proof (2-year history)",
  category: "income",
  howToGet:
    "You're newer at your current job — lenders like to see 2 years of history. A T4 or employment letter from your previous job works.",
  perApplicant: true,
};

export interface CrossDocFinding {
  addRequirements: DocRequirement[];
  notes: PathNote[];
}

function parseDate(value: string | undefined): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Months between a date and now (floor). */
function monthsSince(d: Date, now = new Date()): number {
  return (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
}

export function applyCrossDocRules(
  docs: DocRecord[],
  existingRequirements: DocRequirement[],
  now = new Date(),
): CrossDocFinding {
  const addRequirements: DocRequirement[] = [];
  const notes: PathNote[] = [];
  const has = (key: string) => existingRequirements.some((r) => r.key === key);

  // --- Rule 1: short tenure on the employment letter → 2-year history ---
  const letter = docs.find(
    (d) => d.reqKey === "employment_letter" && ["verified", "accepted", "needs_review"].includes(d.status),
  );
  const startRaw = letter?.extracted?.["Start date"] ?? letter?.extracted?.["start_date"];
  const start = parseDate(startRaw);
  if (letter && start && monthsSince(start, now) < 12 && !has(PRIOR_EMPLOYMENT_DOC.key)) {
    addRequirements.push(PRIOR_EMPLOYMENT_DOC);
    notes.push({
      audience: "client",
      tone: "info",
      text: "Since you've been at your current job under a year, we've added one more item: proof of your previous employment. Totally normal — lenders just like to see a 2-year picture.",
    });
    notes.push({
      audience: "agent",
      tone: "attention",
      text: `Employment letter shows start date ${startRaw} (<12 months tenure) — 2-year history requirement auto-added.`,
    });
  }

  // --- Rule 2: name mismatch across verified docs → agent heads-up (never "fraud") ---
  const names = new Set(
    docs
      .filter((d) => ["verified", "accepted"].includes(d.status))
      .map((d) => d.extracted?.["Name on document"]?.trim().toLowerCase())
      .filter((n): n is string => !!n),
  );
  if (names.size > 1) {
    notes.push({
      audience: "agent",
      tone: "attention",
      text: `Documents show more than one name variant (${Array.from(names).join(" / ")}) — worth a quick look. Could be a maiden name or middle initial.`,
    });
  }

  return { addRequirements, notes };
}
