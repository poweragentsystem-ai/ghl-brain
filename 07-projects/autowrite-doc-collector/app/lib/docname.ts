// Canonical document naming — organized files instead of IMG_4821.jpg.
// Pattern: {Client-Name}_{Doc-Label}_{year|part}.{ext}
import { DOCS } from "./rules/documents";

const clean = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "") // é → e
    .replace(/[^a-zA-Z0-9 -]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export function canonicalDocName(input: {
  clientName: string;
  applicantName?: string | null;
  reqKey: string;
  part?: string | null;
  taxYear?: string | null;
  contentType: string;
}): string {
  const who = clean(input.applicantName || input.clientName);
  const label = clean((DOCS as any)[input.reqKey]?.label?.split("—")[0] ?? input.reqKey);
  const qualifier = input.taxYear ? clean(String(input.taxYear)) : input.part ? clean(input.part) : null;
  const ext = input.contentType === "application/pdf" ? "pdf" : (input.contentType.split("/")[1] ?? "bin").replace("jpeg", "jpg");
  return [who, label, qualifier].filter(Boolean).join("_") + "." + ext;
}
