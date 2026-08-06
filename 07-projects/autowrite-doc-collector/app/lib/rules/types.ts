// Core domain types for the document-requirements engine.
//
// DESIGN LAW #1 (Renée): never dead-end a deal. The engine never returns
// "cannot proceed" — a gate that fails must emit an alternative path instead.

export type Goal = "purchase" | "equity" | "renewal" | "unsure";

export type Employment =
  | "employed"
  | "self_employed"
  | "retired"
  | "not_working";

export type Timeline = "days" | "weeks" | "months";

export type ExitPlan = "sell" | "refinance" | "cash" | "other";

export type DownPaymentSource = "savings" | "gift" | "rrsp_hbp" | "sale_of_home" | "other";

export type IdType = "drivers_licence" | "passport";

export interface IntakeAnswers {
  goal: Goal;
  isHomeowner?: boolean;
  propertyValue?: number;
  mortgageBalance?: number;
  otherSecuredDebts?: number;
  cashNeeded?: number;
  timeline?: Timeline;
  exitPlan?: ExitPlan;
  employment?: Employment;
  /** Alternative income streams for retired / not-working applicants */
  otherIncome?: Array<"cpp" | "oas" | "pension" | "investment" | "rental" | "spousal" | "none">;
  age?: number;
  interestedInReverse?: boolean;
  purchasePrice?: number;
  downPaymentPct?: number;
  downPaymentSource?: DownPaymentSource;
  firstTimeBuyer?: boolean;
  hasCoApplicant?: boolean;
  primaryIdType?: IdType;
}

/** Which product path the engine has classified the file into. */
export type DealPath =
  | "purchase"
  | "refinance"
  | "heloc"
  | "renewal"
  | "private"
  | "reverse"
  | "triage"; // "unsure" — agent follows up; portal still collects universal docs

export type DocCategory = "identity" | "income" | "property" | "deal" | "other";

export interface DocRequirement {
  /** Stable key, e.g. "noa_2yr" */
  key: string;
  label: string;
  category: DocCategory;
  /** Short, friendly, NOT word-heavy — how the client gets this document. */
  howToGet: string;
  /** e.g. driver's licence needs front AND back */
  parts?: string[];
  /** Applies to co-applicant too when file has one */
  perApplicant?: boolean;
  /** Docs where a printed SIN is expected — reader masks it in previews. */
  containsSin?: boolean;
}

/** A friendly notice shown to the client and/or agent — guidance, never a wall. */
export interface PathNote {
  audience: "client" | "agent" | "both";
  tone: "info" | "good_news" | "attention";
  text: string;
}

export interface EngineResult {
  path: DealPath;
  requirements: DocRequirement[];
  notes: PathNote[];
  /** Follow-up questions the wizard should still ask (drives dynamic flow). */
  askNext: string[];
  /** Silent agent-side math — never used to reject, only to inform. */
  ltv?: { ratio: number; practicalCeiling: number; hardCeiling: number; tight: boolean };
}
