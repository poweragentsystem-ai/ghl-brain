// Resolve who is behind a portal token: the primary applicant or a co-applicant.
// Co-applicants get their own tokens so the app can chase their documents
// directly — and their documents stay private from the primary unless they
// turn sharing on (or asked the primary to upload for them).
import type { Applicant, ClientFile, Store } from "./store";

export interface Viewer {
  file: ClientFile;
  type: "primary" | "applicant";
  applicant: Applicant | null;
  /** The applicantId this viewer's own documents live under. */
  ownId: string;
}

export async function resolveViewer(store: Store, token: string): Promise<Viewer | null> {
  const direct = await store.getFileByToken(token);
  if (direct) return { file: direct, type: "primary", applicant: null, ownId: "primary" };
  // Co-applicant token: scan files (fine at v1 volume; index it in the DB later).
  for (const file of await store.listFiles()) {
    const ap = (file.applicants ?? []).find((x) => x.token === token);
    if (ap) return { file, type: "applicant", applicant: ap, ownId: ap.id };
  }
  return null;
}

/** May this viewer see/upload documents belonging to `applicantId`? */
export function canAccess(viewer: Viewer, applicantId: string): boolean {
  if (viewer.type === "applicant") return applicantId === viewer.ownId;
  if (applicantId === "primary") return true;
  const ap = (viewer.file.applicants ?? []).find((x) => x.id === applicantId);
  return !!ap && (ap.mode === "delegated" || ap.shareWithPrimary);
}
