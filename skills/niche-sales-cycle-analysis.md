# Niche Sales Cycle Analysis — Universal Skill

## PURPOSE
Before building automations for ANY business niche, the agent must understand that niche's specific sales cycle, terminology, compliance requirements, and typical pain points. This skill provides the framework to analyze any niche and build the right GHL system for it.

---

## STEP 1: IDENTIFY THE NICHE BASICS

Answer these before touching GHL:
- What does this business sell? (product, service, subscription, one-time, recurring)
- Who is the buyer? (B2C consumer, B2B business, B2G government)
- What is the average deal value? ($50 vs $5,000 vs $500,000 changes everything)
- What is the typical sales cycle length? (same-day vs 30 days vs 6 months)
- Is it appointment-based? (dental, consulting, real estate — yes. E-commerce — no.)
- Is there a licensing or compliance requirement? (mortgage, legal, medical, financial — yes)
- Is there seasonality? (tax, HVAC, landscaping, real estate)

---

## STEP 2: MAP THE SALES PIPELINE STAGES

Every niche follows some version of this:

| Generic Stage | Questions to Ask |
|---|---|
| Lead Generation | Where do their leads come from? (ads, referrals, walk-ins, website, social, directories, marketplaces) |
| First Contact | How fast must they respond? (5 min for home services, same day for B2B, immediate for e-commerce) |
| Qualification | What makes a lead qualified? (budget, timeline, decision-maker, need, location, eligibility) |
| Booking / Consultation | Do they book appointments? In-person, phone, video? How far out? |
| Proposal / Quote | Do they send proposals, quotes, estimates? Formal or informal? |
| Decision / Negotiation | Is there back-and-forth? Competitors being compared? |
| Close / Purchase | How do they close? (contract, invoice, POS, online checkout, handshake) |
| Fulfillment / Delivery | What happens after the sale? (service delivery, shipping, onboarding, installation) |
| Follow-Up / Retention | How do they keep clients? (reviews, referrals, repeat service, subscription renewal) |
| Exit | When/how does the relationship end? What data must be deleted? (PIPEDA, GDPR) |

---

## STEP 3: IDENTIFY NICHE-SPECIFIC NEEDS

### Communication Preferences
- Does this niche's customer prefer SMS, email, phone, or in-person?
- Are there times when contact is inappropriate? (medical: not after hours for non-emergencies)
- Legal restrictions on outreach? (TCPA in US, CASL in Canada, CRTC)

### Forms & Data Collection
- What information must be collected upfront?
- Are there industry-specific forms? (medical intake, mortgage application, insurance questionnaire)
- Are there third-party platforms the form feeds into? (Scarlette for mortgage, PMS for dental, MLS for real estate)

### Documents & Compliance
- What documents does the business need from the client?
- What documents does the business send to the client? (contracts, disclosures, receipts)
- What regulatory body governs them? (FSRA, state bar, medical board, OSHA)
- What must appear on public-facing materials? (license numbers, disclaimers, disclosures)

### Pricing & Payments
- How do they price? (flat rate, hourly, commission, subscription, package)
- When do they collect payment? (upfront, milestone, on completion, monthly)
- Do they use deposits? Retainers? Payment plans?

### Team Structure
- Solo operator or team?
- Do they need to route leads to specific team members?
- Do they have support staff, assistants, technicians?
- Do they recruit? (partnership and recruitment pipelines needed?)

### Competitive Landscape
- Who are their competitors?
- What differentiates them?
- Are they competing on price, speed, quality, relationship, specialization?

---

## STEP 4: BUILD THE GHL SYSTEM TO MATCH

Once the niche is understood, map to GHL components:

| Niche Need | GHL Component |
|---|---|
| Lead capture | Forms, landing pages, website widgets |
| First contact speed | Inbound agent in AI Studio (instant response) |
| Qualification | Pre-qualify form + conditional logic + tags |
| Booking | Calendars (event-based, round-robin, class-booking) |
| Reminders | Workflows: email + SMS + voice AI at timed intervals |
| Proposals/Quotes | Email templates + document builder |
| Payments | Stripe integration, invoices, payment links |
| Document collection | Forms with file upload, doc request email templates |
| Nurture | Long-term email sequences, re-engagement at intervals |
| Reviews | Google review request automation post-delivery |
| Referrals | Referral request automation + referral tracking tag |
| Renewal/Repeat | Date-based triggers for renewals, annual check-ins |
| Compliance | Footers, disclosures, DND rules, data retention policies |
| Recruitment | Recruitment pipeline + interview booking + offer workflow |
| Partnership | Partnership pipeline + exclusive outreach + agreement tracking |

---

## STEP 5: WALK THE LEAD JOURNEY

Before declaring done, walk EVERY path:
- Happy path (qualified → booked → close → client)
- Not qualified (decline → nurture)
- No-show (rebook attempts → nurture)
- Rate/price shopper (hold line → push for application/consultation)
- Not interested (DND → long-term nurture only)
- Ghosting mid-process (follow-up sequence → eventual nurture)
- Referral in (track source, reward referrer)
- Complaint (escalation path, save the relationship)
- Repeat client (re-engagement, loyalty, upsell)

Use the lead-journey-walkthrough skill for the full checklist.

---

## EXAMPLE NICHES AND THEIR KEY DIFFERENCES

| Niche | Unique Needs |
|---|---|
| **Mortgage (Canada)** | FSRA compliance, LTV calculator, stress test, Scarlette/app link integration, renewal tracking, private mortgage workflow |
| **Mortgage (USA)** | NMLS, TRID/RESPA, FHA/VA/USDA products, pre-approval letters, escrow/title, PMI, 30-year fixed |
| **Dental** | Patient intake form, insurance verification, treatment plan approval, appointment-heavy, recall system (6-month cleanings) |
| **Real Estate Agent** | MLS integration, showing scheduling, offer management, dual-agency disclosure, transaction coordinator workflow |
| **HVAC/Trades** | Emergency vs scheduled, dispatch routing, estimate → approval → scheduling → completion, seasonal demand |
| **Legal** | Retainer agreement, conflict check, case management, trust accounting, billable hours |
| **Insurance** | Quote comparison, application, underwriting, policy issuance, renewal, claims |
| **SaaS** | Free trial → conversion, onboarding, usage tracking, churn prediction, upsell, annual renewal |
| **Coaching/Consulting** | Discovery call, proposal, contract, session scheduling, progress tracking, testimonial collection |
| **E-commerce** | Cart abandonment, order confirmation, shipping updates, returns, review requests, repeat purchase |

---

## PROFESSIONAL BASICS — EVERY NICHE, EVERY BUILD
When building for any niche, these are automatic — never wait to be asked:
- All messages (SMS, email, voice) sound human and conversational — not robotic
- All forms are short, mobile-friendly, and don't ask for info you don't need yet
- Follow-up cadence is natural — email+SMS first, voice 5 min later, spaced over days not hours
- Opt-out is respected immediately — DND set, sequences stopped
- Compliance for the niche is researched and applied (FSRA for mortgage, HIPAA for dental, etc.)
- Every lead path has coverage — no dead ends where a lead sits with nothing happening
- Landing pages load fast, are mobile-first, and have one clear CTA
- The user (business owner) gets notified of important events — hot leads, complaints, no-shows
- Re-engagement happens on a schedule — no lead is forgotten forever
- Before/after tracking exists — client can see the value of the service

## WHEN TO USE THIS SKILL
- Before building ANY new GHL sub-account or snapshot for a client
- During the ABC Company onboarding form design (the form should collect enough info to identify the niche and auto-configure)
- When Renée signs a new consulting client — run the niche analysis FIRST before building
- When adding a new industry-specific snapshot to the catalog
