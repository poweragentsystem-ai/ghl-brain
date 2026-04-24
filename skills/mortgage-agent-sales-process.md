# Mortgage Agent Sales Process — Canada & USA

## PURPOSE
Understand the complete mortgage professional's workflow so automations have zero gaps. This is what a mortgage agent actually does day-to-day, and every stage must be covered by the GHL system.

---

## CANADIAN MORTGAGE AGENT SALES CYCLE

### Stage 1: Lead Generation
- Sources: referrals, online ads, social media, website forms, open houses, realtor partnerships, brokerage leads, Zillow/Ratehub/etc.
- Lead enters CRM with source tag
- FSRA compliance: all advertising must include Renée's name, title (Mortgage Agent Level 2), brokerage (Ontario Lending Solutions), licence number

### Stage 2: New Lead / First Contact
- Speed matters — first response within 5 minutes
- Welcome email + SMS (automated 24/7)
- Business hours: attempt to engage via SMS, email, voice AI
- Goal: get them to fill out a PRE-QUALIFICATION form
- Pre-qual form collects: property type, value, balance, employment type, income, self-employed Y/N, purpose (purchase/refi/equity), timeline, credit score range, down payment (if purchase)

### Stage 3: Pre-Qualification
- LTV calculation: balance / value
- 80% LTV = standard max for most A/B lenders (April 2026)
- 78% LTV = usually not doable (factor ~5% fees)
- 90% LTV available from select lenders = advertising opportunity + helps borderline cases
- Under 30 days to close = PRIVATE mortgage (equity-based, no income/credit qualification)
- Self-employed = different doc requirements + fewer lender options
- Not qualified: polite decline + nurture (never burn bridges)
- Rate shoppers: no quotes without a complete application. Hold the line.

### Stage 4: Booking / Consultation
- Qualified lead books a consultation (phone or video)
- Confirmation email + SMS
- Reminders: 24hr, 1hr before
- Voice AI: call to confirm, warm transfer if phone meeting
- No-show handling: 3 rebook attempts then nurture

### Stage 5: Application
- Agent sends APPLICATION LINK (Scarlette, Velocity, Newton, Lendesk, Finmo — varies by brokerage)
- Application is a detailed financial disclosure: income, debts, assets, property details, employer info
- Application platforms have their own APIs — some can webhook back when complete
- Agent cannot proceed without a COMPLETE application
- Follow-up sequence if not completed

### Stage 6: Document Collection
- Once application complete, agent requests DOCUMENTS
- Document list depends on product type:
  - **Salaried homeowner:** 2 years T4, recent pay stubs, letter of employment, ID, mortgage statement, property tax bill
  - **Self-employed:** 2 years T1 General + NOA, business financials, articles of incorporation, bank statements
  - **Purchase:** everything above + agreement of purchase and sale (APS), deposit receipts, MLS listing
  - **Commercial:** business plan, rent rolls, environmental reports, appraisal, corporate docs
  - **Private:** mainly equity-based — property appraisal, ID, proof of ownership, exit strategy documentation
- Scarlette and similar platforms can auto-package the doc request list by product type
- Follow-up if docs not received: Day 2, Day 4, Day 7

### Stage 7: Underwriting / Lender Submission
- Agent (or underwriter like Cheryl) packages the file
- Submits to one or more lenders based on deal fit
- Morgan's lender intel helps match: lender appetite, rate range, decline patterns, turnaround
- Track which lender(s) submitted to + dates
- Internal stage — no automation to the lead unless "we've submitted your file"

### Stage 8: Approval / Conditions
- Lender approves (clean or with conditions)
- If conditions: agent collects additional docs, re-submits
- Common conditions: appraisal, employment verification, credit re-pull, insurance
- Notify lead of approval or conditions needed

### Stage 9: Closing / Funding
- Lawyer/notary handles closing
- Funds disbursed
- Agent gets paid (commission from lender or brokerage split)
- Deal amount + close date tracked
- Lead moves to CLIENT

### Stage 10: Client / Post-Close
- Welcome email
- Google review request (7 days)
- Referral request (14 days)
- RENEWAL TRACKING: save mortgage term + maturity date
  - 120 days before maturity: start renewal outreach
  - "Your mortgage is up for renewal in X months — let's review your options"
- Annual check-in: rate environment update, life changes, equity position
- Birthday / anniversary touchpoints
- PIPEDA compliance: no keeping client info beyond legal minimum after relationship ends

### SPECIAL: Private Mortgage Workflow
- Used when: client needs funds in <30 days, bad credit, self-employed with no provable income, bridge financing
- Equity-based: LTV is what matters, not income/credit
- EXIT STRATEGY MANDATORY: how will the client pay off the private? (sell, refinance to conventional, income improvement)
- Terms: typically 3, 6, 12 months (some lenders do 24)
- Higher rates + lender fees
- Goal: use private as a tool, then graduate to A/B lender

---

## AMERICAN MORTGAGE AGENT (LOAN OFFICER) SALES CYCLE

### Key Differences from Canada:
- **Regulatory:** NMLS licensing (not FSRA), TRID/RESPA disclosures, state-by-state rules
- **Products:** 30-year fixed is standard (Canada doesn't have this), FHA, VA, USDA, jumbo, ARM
- **LTV:** FHA allows 96.5%, VA allows 100%, conventional 80% standard, jumbo varies
- **Credit scoring:** FICO-based, 3-bureau pull (Equifax, Experian, TransUnion). Minimum varies by product (580 FHA, 620 conventional)
- **DTI:** Debt-to-income ratio is the key qualifier (typically max 43-50%)
- **Pre-approval letter:** standard in US — agents issue them, required for offers in competitive markets
- **Appraisal:** almost always required, ordered after contract
- **Closing:** escrow/title company handles it, 30-45 day typical close
- **Servicing:** loan may be sold to a servicer after closing (client's payment goes elsewhere)
- **No stress test** like Canada has
- **PMI:** required below 80% LTV on conventional (similar to CMHC insurance in Canada)

### US Pipeline Stages:
1. Lead → 2. Pre-Qualification → 3. Pre-Approval (issue letter) → 4. Under Contract (APS received) → 5. Application Submitted → 6. Processing → 7. Underwriting → 8. Clear to Close → 9. Closing/Funding → 10. Client/Post-Close

### US-Specific Custom Fields:
- NMLS number, state(s) licensed, FHA/VA eligibility, FICO score, DTI ratio, PMI required (Y/N), pre-approval amount, pre-approval expiry, escrow company, title company

---

## TAGS BOTH COUNTRIES NEED
new-lead, contacted, responded, pre-qualified, not-qualified, booked, no-show, appointment-complete, application-sent, application-complete, documents-requested, documents-complete, submitted-to-lender, approved, conditional-approval, conditions-met, closing, funded, client, nurture, not-interested, referral-given, referral-received, rate-shopper, over-leveraged, private-mortgage, self-employed, purchase, refinance, equity-takeout, commercial, renewal-due

---

## WHAT MORTGAGE AGENTS NEED IN THEIR BUSINESS (for GHL setup)
1. Pre-qualification form with LTV calculator
2. Application link integration (custom value — not hardcoded to one platform)
3. Document request templates by product type
4. Lender submission tracking
5. Approval/conditions workflow
6. Renewal tracking + auto-outreach
7. Compliance footers on all public materials
8. Rate update distribution to nurture list
9. Referral partner pipeline
10. Recruitment pipeline (grow their team)
