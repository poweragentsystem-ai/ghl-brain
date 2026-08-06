// File-completeness math shared by dashboard views.
// perApplicant requirements produce one slot per applicant (primary + each
// co-applicant); shared requirements produce a single slot.
import type { ClientFile, DocRecord } from "./store";

export interface Slot {
  reqKey: string;
  label: string;
  part: string | null;
  /** "primary" or a co-applicant id. */
  applicantId: string;
  /** Display name for non-primary applicants. */
  applicantName: string | null;
  doc: DocRecord | null;
}

export interface FileProgress {
  slots: Slot[];
  total: number;
  inGood: number; // verified / accepted / processing / needs_review — "in the door"
  verified: number;
  redCount: number; // needs_reupload / rejected — client action needed
  reviewCount: number; // needs_review — AGENT action needed
  pct: number;
  waitingOn: "client" | "agent" | "done" | "intake";
}

export function computeProgress(file: ClientFile, docs: DocRecord[]): FileProgress {
  const slots: Slot[] = [];
  const applicantIds: Array<{ id: string; name: string | null }> = [
    { id: "primary", name: null },
    ...(file.applicants ?? []).map((ap) => ({ id: ap.id, name: ap.name })),
  ];
  for (const req of file.requirements ?? []) {
    const owners = req.perApplicant ? applicantIds : [applicantIds[0]];
    for (const owner of owners) {
      const parts = req.parts?.length ? req.parts : [null];
      for (const part of parts) {
        const matches = docs
          .filter(
            (d) =>
              d.reqKey === req.key &&
              (d.applicantId ?? "primary") === owner.id &&
              (part ? d.part === part : true),
          )
          .sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1));
        slots.push({
          reqKey: req.key,
          label: req.label,
          part,
          applicantId: owner.id,
          applicantName: owner.name,
          doc: matches[0] ?? null,
        });
      }
    }
  }
  const total = slots.length;
  const has = (statuses: string[]) => slots.filter((s) => s.doc && statuses.includes(s.doc.status)).length;
  const verified = has(["verified", "accepted"]);
  const inGood = has(["verified", "accepted", "processing", "needs_review"]);
  const redCount = has(["needs_reupload", "rejected"]);
  const reviewCount = has(["needs_review"]);
  const pct = total ? Math.round((verified / total) * 100) : 0;

  let waitingOn: FileProgress["waitingOn"];
  if (!file.requirements?.length) waitingOn = "intake";
  else if (verified === total) waitingOn = "done";
  else if (reviewCount > 0) waitingOn = "agent";
  else waitingOn = "client";

  return { slots, total, inGood, verified, redCount, reviewCount, pct, waitingOn };
}
