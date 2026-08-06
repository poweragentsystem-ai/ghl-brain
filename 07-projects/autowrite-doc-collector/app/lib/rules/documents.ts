// The document catalogue. Every requirement the engine can ask for lives here,
// with a light "how to get it" line (Renée: present but not word-heavy).
import type { DocRequirement } from "./types";

export const DOCS = {
  // ---- Identity (rules Renée specified exactly) ----
  id_drivers_licence: {
    key: "id_drivers_licence",
    label: "Driver's licence",
    category: "identity",
    howToGet: "Snap a photo of the front AND the back.",
    parts: ["Front", "Back"],
    perApplicant: true,
  },
  id_passport: {
    key: "id_passport",
    label: "Passport",
    category: "identity",
    howToGet: "Photo of the picture page only.",
    parts: ["Picture page"],
    perApplicant: true,
  },
  id_credit_card: {
    key: "id_credit_card",
    label: "Credit card (second piece of ID)",
    category: "identity",
    howToGet: "Front of the card is fine — we automatically blur the number.",
    perApplicant: true,
  },

  // ---- Income: employed ----
  t4_2yr: {
    key: "t4_2yr",
    label: "T4 slips — last 2 years",
    category: "income",
    howToGet: "From your employer, or CRA My Account → Tax slips.",
    perApplicant: true,
    containsSin: true,
  },
  noa_2yr: {
    key: "noa_2yr",
    label: "Notices of Assessment — last 2 years",
    category: "income",
    howToGet: "CRA My Account → Tax returns → Notice of Assessment.",
    perApplicant: true,
    containsSin: true,
  },
  paystub_recent: {
    key: "paystub_recent",
    label: "Recent paystub",
    category: "income",
    howToGet: "Your most recent one (within 30 days).",
    perApplicant: true,
  },
  employment_letter: {
    key: "employment_letter",
    label: "Employment letter",
    category: "income",
    howToGet: "Ask HR — it states your role, start date and salary.",
    perApplicant: true,
  },

  // ---- Income: self-employed ----
  t1_general_2yr: {
    key: "t1_general_2yr",
    label: "T1 General tax returns — last 2 years",
    category: "income",
    howToGet: "From your accountant or tax software (full return incl. T2125).",
    perApplicant: true,
    containsSin: true,
  },
  business_licence_or_incorporation: {
    key: "business_licence_or_incorporation",
    label: "Master business licence OR articles of incorporation",
    category: "income",
    howToGet: "Business licence: provincial registry. Incorporated? Send your articles/letter of incorporation instead.",
  },
  business_bank_6mo: {
    key: "business_bank_6mo",
    label: "Business bank statements — last 6 months",
    category: "income",
    howToGet: "Download PDFs from your online banking.",
  },

  // ---- Income: retired / alternative (the never-dead-end set) ----
  cpp_oas_statement: {
    key: "cpp_oas_statement",
    label: "CPP / OAS statement",
    category: "income",
    howToGet: "Service Canada account → benefit statements, or your T4A(P)/T4A(OAS).",
    perApplicant: true,
  },
  pension_statement: {
    key: "pension_statement",
    label: "Pension or investment income statement",
    category: "income",
    howToGet: "From your pension provider or investment platform.",
    perApplicant: true,
  },
  bank_3mo_income: {
    key: "bank_3mo_income",
    label: "Bank statements — last 3 months",
    category: "income",
    howToGet: "Shows deposits — download PDFs from online banking.",
    perApplicant: true,
  },

  // ---- Property (homeowner) ----
  mortgage_statement: {
    key: "mortgage_statement",
    label: "Current mortgage statement",
    category: "property",
    howToGet: "Latest annual or monthly statement from your lender.",
  },
  property_tax_bill: {
    key: "property_tax_bill",
    label: "Property tax bill",
    category: "property",
    howToGet: "Most recent bill from your city or town.",
  },
  home_insurance: {
    key: "home_insurance",
    label: "Home insurance binder",
    category: "property",
    howToGet: "Ask your insurance provider for your policy summary page.",
  },

  // ---- Purchase ----
  purchase_agreement: {
    key: "purchase_agreement",
    label: "Purchase agreement",
    category: "deal",
    howToGet: "Your realtor sends this after your offer is accepted.",
  },
  mls_listing: {
    key: "mls_listing",
    label: "MLS listing",
    category: "deal",
    howToGet: "Your realtor can send the full listing sheet.",
  },
  down_payment_90day: {
    key: "down_payment_90day",
    label: "Down payment proof — 90 days of statements",
    category: "deal",
    howToGet: "Bank/investment statements covering the last 90 days.",
  },
  gift_letter: {
    key: "gift_letter",
    label: "Gift letter",
    category: "deal",
    howToGet: "We'll send a one-page template for the gift-giver to sign.",
  },
  rrsp_hbp: {
    key: "rrsp_hbp",
    label: "RRSP statement (Home Buyers' Plan)",
    category: "deal",
    howToGet: "90-day RRSP statement from your bank or platform.",
  },

  // ---- Universal ----
  void_cheque: {
    key: "void_cheque",
    label: "Void cheque or direct-deposit form",
    category: "other",
    howToGet: "From your online banking → account details → void cheque PDF.",
  },
  renewal_statement: {
    key: "renewal_statement",
    label: "Mortgage renewal letter",
    category: "deal",
    howToGet: "The renewal offer your current lender mailed or emailed you.",
  },
} as const satisfies Record<string, DocRequirement>;

export type DocKey = keyof typeof DOCS;
