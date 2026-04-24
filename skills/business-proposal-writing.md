# Business Proposal Writing — Easy Deploy

**Owner:** Lex (Copy), co-operated with Sam (Sales), Kai (Offers), Connor (Compliance), Lindsay (Legal), Ryan (Research)
**Used by:** Easy Deploy platform (auto-generated proposals via Claude API) AND Lex manually for high-touch deals.
**Use when:** A lead has been qualified (see `funnel-qualified-landing-page.md`) and we are sending a personalized written proposal before the closer's call OR as the on-call close document.
**Do NOT use for:** Cold outbound — see `cold-outreach-sequences.md`. Closing scripts — see `high-ticket-closer.md`. Legal language — see `easy-deploy-legal-disclaimer.md`.

---

## 1. THE PRINCIPLE

A proposal is **not** a brochure. It's a mirror. The prospect sees their own problem reflected back more clearly than they can articulate it themselves, then sees a specific path out. Price appears after fit is obvious.

Research base:
- **SPIN (Neil Rackham, *SPIN Selling*, 1988):** proposals that name Problem + Implication outperform feature-list proposals. Implication ("what happens if you keep ignoring this?") is what creates urgency.
- **Challenger (Dixon & Adamson, *The Challenger Sale*, 2011):** the "Teach" step of Teach-Tailor-Take-Control belongs in the proposal body — give them an insight about their own business they didn't have.
- **Straight Line (Jordan Belfort, *Way of the Wolf*, 2017):** three certainties must be built by the end of the document — certainty in the product, certainty in the company, certainty in the agent/person. Selectively applied — we use the structure, not the hype.
- **Alex Hormozi, *$100M Offers* (2021):** value equation = (dream outcome × perceived likelihood of achievement) / (time delay × effort & sacrifice). Every proposal reinforces numerator, reduces denominator.

---

## 2. PROPOSAL ANATOMY — 8 SECTIONS, IN THIS ORDER

| # | Section | What it does | Length |
|---|---|---|---|
| 1 | Greeting | Human open, names the business, references the call/form | 2-3 lines |
| 2 | Problem Mirror | Restate their pain in their own words + 1 insight | 3-5 lines |
| 3 | Why This Matters Now | Implication — cost of inaction in dollars or hours | 3-5 lines |
| 4 | Solution Fit | What we're recommending + why it fits **them specifically** | 5-8 lines |
| 5 | What You Get | Bot list, channel list, deliverables, timeline | Bullets |
| 6 | Investment | Pricing in plain English, no hype | 4-8 lines |
| 7 | Next Steps | ONE action — review, sign, pay | 2-3 lines |
| 8 | Legal Footer | Disclaimer block from `easy-deploy-legal-disclaimer.md` | Footer |

Total target length: **1.5 to 2.5 pages** (600-1000 words). Anything longer gets skimmed or ignored. Salesforce's *State of Sales Productivity 2023* reported proposals under 2,000 words close 1.4x more than longer ones — treat as directional, not a promise.

---

## 3. THE MASTER TEMPLATE (WITH TOKENS)

```
Hey {{contact.first_name}},

Following up on {{custom_values.interaction_context}} — this is the plan I'd recommend
for {{contact.company_name}}.

## WHAT YOU'RE DEALING WITH

{{custom_values.proposal_pain_mirror}}

From what I saw on {{custom_values.lead_website_url}} — {{custom_values.website_observation}}.
{{custom_values.gbp_observation}}

## WHY THIS IS COSTING YOU

{{custom_values.proposal_implication_block}}

Rough math on what that's worth to the business:
{{custom_values.cost_of_inaction_math}}

## WHAT I'D BUILD

For a {{custom_values.niche}} business in {{custom_values.city}}, the setup that fits
is the {{custom_values.recommended_tier}} package:

{{custom_values.bot_list_bullets}}

Channels active: {{custom_values.channels_list}}
Integrations: {{custom_values.integrations_list}}

Timeline: {{custom_values.timeline_plain}} (usually {{custom_values.typical_days}} days
from signed agreement to live system).

## INVESTMENT

- Setup: ${{custom_values.setup_fee}} — one-time, covers build, training data load,
  agent configuration, testing, and launch.
- Monthly: ${{custom_values.monthly_fee}} — includes {{custom_values.minutes_included}}
  minutes of voice AI usage. Overage is ${{custom_values.overage_rate}}/min after that.
- Minimum commitment: 3 months, then month-to-month. Cancel anytime after month 3
  with 30 days notice.

What's NOT in the price: your own ad spend (Google, Meta, whatever you already run),
phone number fees if you want a new local number ({{custom_values.phone_fee_range}}/mo),
and any third-party tools you already use.

## NEXT STEP

One link does everything — review the full agreement, sign, and pay the setup fee:
{{custom_values.proposal_signing_link}}

Once signed I'll reach out within one business day to kick off onboarding. If anything
in here feels off, just reply to this email and we'll adjust.

{{custom_values.user_first_name}}
{{custom_values.company_name}}
{{custom_values.user_phone}} | {{custom_values.user_email}}
{{custom_values.mailing_address}}

---

{{custom_values.proposal_legal_footer}}

Unsubscribe: {{custom_values.unsubscribe_link}}
```

---

## 4. VARIABLE MAP — WHAT FEEDS WHAT

| Token | Source | Example |
|---|---|---|
| `{{contact.first_name}}` | Intake form | "Dave" |
| `{{contact.company_name}}` | Intake form / GBP scrape | "Maple Smile Dental" |
| `{{custom_values.niche}}` | Intake form (dropdown) | "dental" |
| `{{custom_values.city}}` | Intake form / GBP scrape | "Toronto" |
| `{{custom_values.interaction_context}}` | Whatever happened before (call, form, referral) | "our call yesterday about your after-hours intake" |
| `{{custom_values.lead_website_url}}` | Intake form | "maplesmile.ca" |
| `{{custom_values.website_observation}}` | Website scrape + Claude summary | "your booking button sends to a Google Calendar that only covers 9-5 weekdays" |
| `{{custom_values.gbp_observation}}` | Google Business Profile API | "your 4.7-star profile has 184 reviews — the newest ones from March mention 'couldn't get through on the phone' twice" |
| `{{custom_values.proposal_pain_mirror}}` | Lex-generated from call notes + form | See §6.1 per niche |
| `{{custom_values.proposal_implication_block}}` | Lex + Anna math | See §6.2 |
| `{{custom_values.cost_of_inaction_math}}` | Anna (calc per niche avg deal) | See §6.3 |
| `{{custom_values.recommended_tier}}` | Kai/Sam pick from 5 tiers | "Starter" |
| `{{custom_values.bot_list_bullets}}` | Kai — builds per niche | See §7 |
| `{{custom_values.channels_list}}` | Kai | "Voice AI inbound + SMS follow-up + Email nurture" |
| `{{custom_values.integrations_list}}` | Kai | "Your existing Jane App for booking, Stripe for deposits" |
| `{{custom_values.timeline_plain}}` | Devon | "Kickoff call within 1 business day, live in 10-14 days" |
| `{{custom_values.setup_fee}}` | Sliding scale — see §8 | "997" |
| `{{custom_values.monthly_fee}}` | Sliding scale — see §8 | "297" |
| `{{custom_values.minutes_included}}` | Maps to tier | "500" |
| `{{custom_values.overage_rate}}` | Maps to tier | "0.14" |
| `{{custom_values.proposal_signing_link}}` | Stripe + e-sign combined | See §9 |
| `{{custom_values.proposal_legal_footer}}` | Pulled from `easy-deploy-legal-disclaimer.md` | Full block |

---

## 5. TONE RULES

Read every draft out loud before sending. If it sounds like a law firm wrote it, rewrite it.

**Do:**
- Use contractions ("we'll", "you're", "I'd")
- Say dollar amounts plainly: "$997 one-time" not "an investment of nine hundred and ninety-seven dollars"
- Reference specific things from their site / GBP / call — the word "specifically" is earned, not claimed
- Sign with the rep's first name, not "The Team"
- Keep paragraphs 3 lines max, break with subheaders (## markdown renders in GHL email + PDF)

**Don't:**
- Use "synergies", "leverage", "turnkey", "world-class", "seamless", "game-changing", "revolutionize"
- Use hype exclamation points ("Incredible results!!")
- Add emojis to a formal proposal (different rule than SMS — see `message-tone.md`)
- Paste a feature list without tying each feature to their specific pain
- Pad length to look important — 2 pages of specifics beats 10 pages of filler

---

## 6. PROBLEM MIRROR PATTERNS — PER NICHE

The Problem Mirror is the single most important paragraph. It must sound like the prospect wrote it. It's built from: (a) what they said on the call or form, (b) what we see on their website, (c) what's in their GBP reviews.

### 6.1 Sample Problem Mirrors

**Dental:**
> "You told me your front desk is slammed — phone rings during cleanings, leads hit voicemail, and by the time Jenny gets back to them they've already booked with the office down the street. And the ones who do fill out the web form don't hear back till the next morning. That gap is the entire business problem."

**Plumbing:**
> "Every hour your phone rings and nobody picks up, you're handing a job to the next plumber in the Google search results. Your GBP shows a 4.6 with 91 reviews — great rating, but the last 3 one-stars all mention the same thing: 'nobody called me back.' That's not a rating problem. That's a phone problem."

**Real Estate (realtor):**
> "The lead hits Zillow or your site on a Saturday night, and by Monday morning it's dead — Redfin already routed it, or they're talking to the neighborhood's other agent. Speed-to-first-contact is the whole game, and right now you're losing it to the people who are willing to be online at 11pm. You shouldn't have to be."

**Mortgage (agent/broker):**
> "Renewals are coming at you 90-120 days out and every one of them is getting poached — the big banks text their customer at day 120, you see the file at day 30, and by then the decision's already made. The tool problem is: you don't have a system that talks to your book of business every 30 days. You have a calendar reminder." *(Mortgage proposals must also carry FSRA block — see §11)*

**HVAC / Trades (general):**
> "Summer hits, phones go off the wall, jobs get dropped because the person who answered was also the person running a truck. Winter kicks in and it's the same story in reverse. Your problem isn't demand — it's that demand and dispatch are bottlenecked through the same human."

### 6.2 Implication block — the "cost of inaction"

Every proposal includes 3-5 lines that put a dollar figure on the pain. Anna supplies niche-specific math. Examples:

**Dental (new patient LTV ~$1,200, close ~25%):**
> "Let's say you get 40 web/phone leads a month and 30% go unanswered after-hours or during appointments. That's 12 leads / month × $1,200 LTV × 25% close = **$3,600/month walking away**. That's the ceiling of what this system has to recover to justify itself. In our experience, it recovers 3-6x that in the first 90 days."

**Plumbing (avg service ticket ~$450, emergency ~$900):**
> "A typical plumbing shop misses 15-25 calls a week. At an average ticket of ~$450 and a call-to-job close of 60%, that's ~$5,400 - $9,000 of revenue per week leaking out of missed calls. This system catches it."

**Realtor (avg commission per closed side ~$12,000 Toronto):**
> "Real estate math is brutal — one extra closed side per year from faster follow-up is ~$12K. This system costs $3,564/year total. Everything beyond one incremental close is pure profit."

**Mortgage (avg deal commission ~$3,000 Ontario, varies):**
> "If this system saves you one renewal a quarter from being poached by a bank, the math is done. Four saved renewals a year is ~$12K in commission you keep instead of lose."

Ryan (Research) validates these averages quarterly. Any number used in a live proposal must have a source in Ryan's database or get re-validated before sending.

### 6.3 Cost-of-inaction math

One line, plain math. Formula:

```
[Monthly lost leads] × [avg customer value $] × [close rate %] = $ recovered per month
```

Show the number. Don't hide behind ranges unless the niche truly is unknowable.

---

## 7. BOT LIST — WHAT A NICHE GETS

Kai (Offers) builds these from the ABC snapshot. Default structure:

**Essentials ($297/mo):**
- Voice AI receptionist (inbound) — qualifies + books
- SMS follow-up agent — nurtures missed calls, form abandons

**Starter ($397/mo):**
- Everything in Essentials
- Review request agent — texts happy clients post-service for Google reviews
- Dead-lead revival agent (re-engages 90+ day silent leads)

**Growth ($597/mo):**
- Everything in Starter
- Outbound voice AI (opt-in only, no cold calls to DNC)
- Calendar conflict resolver — reschedules when provider cancels

**Professional ($797/mo):**
- Everything in Growth
- Custom agent for one niche-specific workflow (e.g., insurance pre-auth for dental)
- Reporting dashboard — weekly email of bookings, calls, conversion

**Scale ($997/mo):**
- Everything in Professional
- Two custom agents
- White-label mobile notification app for owner
- Priority support — 4-hour response SLA in business hours

Niche overrides (ask Kai):
- **Mortgage** swaps in: renewal tracker, pre-qual collector, document chaser
- **Real estate** swaps in: listing alert agent, open-house nurture, past-client check-in
- **Dental** swaps in: recall campaign agent, insurance renewal nudge

---

## 8. PRICING — SLIDING SCALE

Default Easy Deploy pricing (see `CLAUDE.md` for platform table):

| Tier | Setup | Monthly | Minutes | Overage |
|---|---|---|---|---|
| Essentials | $997 | $297 | 500 | $0.14/min |
| Starter | $1,497 | $397 | 1,000 | $0.13/min |
| Growth | $1,997 | $597 | 2,500 | $0.11/min |
| Professional | $2,497 | $797 | 4,000 | $0.10/min |
| Scale | $2,997 | $997 | 7,000 | $0.09/min |

**Sliding-scale range — Easy Deploy allows $497-$2,497 setup and $197-$997/mo depending on complexity.** The closer or platform auto-prices based on:
- Niche complexity (plumbing ≤ dental ≤ real estate ≤ mortgage)
- Integration count (standalone vs stacked with 3+ tools)
- Volume expectation (minutes needed)
- Geography (local vs multi-city)

Contract minimum: **3 months**, then month-to-month. Cancel with 30 days notice after month 3.

Kai (Offers) can build a one-off custom quote — but never below $497 setup / $197/mo. Floor exists for margin preservation.

---

## 9. THE SIGNING LINK — ONE CTA

Every proposal has ONE action button/link. Never three links, never "reply if interested".

The link does:
1. Display the agreement (Lindsay-approved template — see `easy-deploy-legal-disclaimer.md`)
2. Collect the signature (e-sign field)
3. Collect payment info (Stripe payment link for setup fee + subscribe for monthly)
4. Triggers onboarding workflow in GHL on successful payment

Built as a Stripe Checkout Session with `metadata.contract_id` or as a custom page that combines DocuSign/Documenso + Stripe. Devon or Norm wires this.

---

## 10. WHAT TO NEVER PUT IN A PROPOSAL

These will trigger FTC / Competition Bureau / CASL / FSRA / FINTRAC scrutiny or just lose trust:

1. **Revenue guarantees.** "You'll make $10K/mo" — illegal and untrue.
2. **Specific appointment or lead guarantees.** "You'll book 20 consults a week" — unless contractually fulfillable, it's a violation.
3. **Compliance promises the client must own.** "We handle all your CASL compliance" — no. The CLIENT is responsible for their own list consent. We provide the tool.
4. **Medical / financial / legal outcome promises.** Never. Route through Connor + Lindsay if in doubt.
5. **Mortgage rate quotes.** FSRA red line — no rates in any material. Never.
6. **"AI replaces your staff."** Wrong framing, scary, often untrue. Use "covers the 16 hours your staff isn't open."
7. **Competitor name-calling.** We don't shit on Ulio, Vapi, or anyone else in a proposal. We out-ship them.
8. **Testimonials without documented permission.** PIPEDA + basic ethics. Every testimonial needs a signed release on file.
9. **Urgency lies.** "Last spot this week" — only if true. False urgency erodes trust and gets flagged by Competition Bureau.
10. **Outcomes expressed as certainties.** "Will" becomes "can" or "typically" — e.g., "typically books first appointment in the first 72 hours" with a caveat that results vary.

---

## 11. NICHE-SPECIFIC COMPLIANCE OVERLAYS

### Mortgage (FSRA Ontario)
Every mortgage-targeted proposal adds:
- Agent full licensed name
- "Mortgage Agent Level 2" (or Level 1 / Broker — match reality)
- Brokerage name (e.g., "Ontario Lending Solutions")
- FSRA licence number from `{{custom_values.license_number}}`
- No rate quotes, no approval guarantees — see `fsra-mortgage-advertising-compliance.md`

### Medical / Dental (PHIPA in Ontario, HIPAA in US)
- No patient data examples in proposal
- Note that any PHI/PII flowing through the system requires a BAA (US) or PHIPA agreement (Ontario) — flag for Lindsay

### Financial Services (securities, insurance)
- Flag for Lindsay before sending. Different provincial + federal regs apply.

### Real Estate (RECO Ontario)
- Agent name, brokerage, designation
- No representation of property-value outcomes

### US clients
- TCPA applies (written consent for SMS / voice to cell)
- State privacy laws vary (California CCPA, Colorado CPA, etc.) — client owns compliance
- Explicitly bake this into the disclaimer block

---

## 12. AUTOMATED PROPOSAL GENERATION — HOW EASY DEPLOY BUILDS ONE

When a lead qualifies on the Easy Deploy platform, the system:

1. **Reads intake form data** into a Claude API call
2. **Scrapes lead's website** (Rex — one page, homepage + contact page) and pulls: headline, booking flow, contact method, hours, stated services
3. **Scrapes Google Business Profile** (Rex or Google Places API) and pulls: rating, review count, 3 newest reviews, hours, phone, address
4. **Pipes all of it into Claude** with the template in §3 as the output shape and the niche-specific overlays from §6-§7
5. **Claude returns a filled proposal** with flagged uncertainties in `{{custom_values.*}}` where data is missing
6. **Lex (or the partner) reviews** — auto-send is disabled by default; partner approves before send
7. **Proposal sent** via email from the partner's sender identity (their domain, not Easy Deploy's)
8. **Stripe + e-sign link fires** on "sign now" click

Claude prompt skeleton (pseudo):

```
You are writing a business proposal for {{niche}} business {{company_name}} in {{city}}.

Intake data: {{form_json}}
Website summary: {{website_summary}}
GBP data: {{gbp_json}}
Call notes (if any): {{call_notes}}

Write a proposal using the section order in /skill/business-proposal-writing §2.
Use the Problem Mirror pattern from §6.1 for this niche.
Use the implication math from §6.2 for this niche — Ryan-verified numbers only.
Bot list: {{tier}} package from §7.
Tone: direct, human, contractions, no corporate jargon. Pass the read-out-loud test.
Legal footer: pull from /skill/easy-deploy-legal-disclaimer full block.
NEVER include: {{see §10}}.
```

---

## 13. QA — BEFORE ANY PROPOSAL GOES OUT

Quinn runs this checklist:

- [ ] All `{{tokens}}` rendered — no literal `{{` in final copy
- [ ] Specific pain mirror references the lead's actual site / GBP / call notes
- [ ] Pricing matches tier selected
- [ ] No banned phrases from §10
- [ ] Legal footer present (see `easy-deploy-legal-disclaimer.md`)
- [ ] Signing link works end-to-end (test Stripe + e-sign flow on Renée's test contact only)
- [ ] Unsubscribe link active (CASL)
- [ ] Niche overlay applied (FSRA if mortgage, PHIPA if medical, etc.)
- [ ] Read-out-loud test passes (Lex or Hawk final sign-off)

---

## 14. SEE ALSO

- `cold-outreach-sequences.md` — what happens before the proposal
- `high-ticket-setter-outbound.md` — how the lead got qualified in the first place
- `high-ticket-closer.md` — the call that lands alongside or after the proposal
- `easy-deploy-legal-disclaimer.md` — the legal block every proposal ends with
- `funnel-qualified-landing-page.md` — the qualification gate
- `message-tone.md` — tone rules inherited by every template above
- `sam.md` — Sam's discovery + close framework
- `lex.md` — Lex's copy principles
- `fsra-mortgage-advertising-compliance.md` — when niche = mortgage

---

*Last updated: 2026-04-22 — initial build. Owner: Lex. Co-owners: Sam, Kai, Connor, Lindsay, Ryan.*
