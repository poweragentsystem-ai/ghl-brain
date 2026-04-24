---
name: OLS Lender Matching Tool — Deal Checker for Mortgage Team
description: Skill for building + running a lender-matching tool for Ontario Lending Solutions team. Takes a client scenario + returns which lenders we work with can fund + likely rate + BPS + promo. Parked until higher-priority tasks finish. Research source = Renée's Outlook lender emails.
owner: Morgan (Mortgage Assistant) + Devon (Systems) + Ryan (Research)
type: skill
---

# OLS LENDER MATCHING TOOL

## Goal

OLS team (not Renée alone) types or checks off a client scenario → instantly sees which lenders we work with can do the deal + likely rate + BPS + any promo + buy-down option. Goal: make Renée + the OLS team look like rockstars on every client call.

Greeting: "Good morning OLS Team!" (not Renée personally).

Branding: **OLS = Blue + Gold**. Stick to it. Don't recycle Easy Deploy's cyan/lime.

---

## Input form — all fields

### Scenario type (primary choice)
- [ ] Homeowner refinancing
- [ ] Homeowner HELOC
- [ ] Homeowner private/2nd mortgage
- [ ] Buyer (purchase)
- [ ] Renewal / switch

### Property
- Property type (single select): Land · Detached · Townhouse · Semi · Condo · Multi 1-4 unit · Multi 5+ unit · Commercial
- Property value ($)
- City (free text — used for rural check)
- Province (dropdown: ON / BC / AB / QC / NS / NB / PE / NL / MB / SK / YT / NT / NU)
- Urban / Suburban / Rural (auto-inferred from city, overridable)
- Primary residence / Rental / Investment / Vacation / Mixed-use

### Ownership (homeowner path)
- Current mortgage balance ($)
- Current mortgage rate
- Renewal date
- Other property debts (second mortgage, HELOC, liens)

### Purchase (buyer path)
- Purchase price ($)
- Down payment ($)
- Down payment source (savings / gift / HELOC / RRSP Home Buyers Plan / sale-of-existing / other)
- Closing date

### Applicant(s)
- Full-time / Part-time / Self-employed / Retired / Not working
- Annual income ($)
- Income verifiable? (T4 / NOA / BFS / none)
- Credit score (optional — field range 300-900 or "unknown")
- Bankruptcy / consumer proposal in last 7 years?
- New to Canada (<5 years)?
- Second applicant? If yes → collect same fields for them

### Debts
- Monthly debt payments ($)
- TDS / GDS (optional — calculated from income + debts if not given)

### Loan
- Loan amount requested ($) — for refi/HELOC/private
- Loan purpose (debt consolidation / renovation / investment / buy-down-rate / other)

### Preferences (optional)
- Area they want to buy in (if purchase)
- Preferred lender (if they've expressed one)

---

## Output — lender match grid

For each lender that can fund the deal:

| Element | Display |
|---|---|
| Logo | Top-left of card |
| Lender name | Bold, top |
| Likely rate | BIG — the primary number |
| BPS (vs prime or benchmark) | Secondary line |
| Product type | Fixed / Variable / HELOC / Private |
| Term (if relevant) | 1/2/3/4/5 yr |
| Promo badge (if any) | Small badge top-right, yellow/gold |
| Buy-down option | **Small font** under rate — "Buy down to 4.79% for 15 BPS" pattern |
| Why this lender fits | 1 sentence — "Accepts 5+ unit multi in ON urban, up to 75% LTV, self-employed BFS OK" |
| Red flags | 1 sentence — "Requires full T4 — not BFS-friendly" (shown only if partial fit) |

Lenders that CAN'T do the deal — listed separately in a collapsed "Not a fit today" section with the specific reason (so the team can learn patterns).

---

## Free-form chat input (alternative path)

Option 2 on the same page: a single textarea where the team types the scenario in natural language.

Example: *"Homeowner in Mississauga, 680 credit, self-employed 3 years, detached SFH, property worth $1.2M, mortgage owing $650k, wants $150k HELOC for debt consolidation."*

The tool parses → runs the matching → responds conversationally with lender options + rates + notes.

---

## Matching logic — the brain

The tool needs a lender rules engine. For each lender we work with, encode:

- **Geographic fit:** provinces accepted, urban/suburban/rural rules (some lenders decline rural), min population if relevant
- **Property type fit:** which types they fund (land? multi 5+? commercial?)
- **LTV caps:** by property type + purpose (e.g. max 80% on primary, 65% on rental, 50% on rural)
- **Credit floor:** min credit score, exceptions for strong files
- **Income requirements:** T4 only? BFS accepted? Stated-income? New-to-Canada programs?
- **Debt ratios:** TDS/GDS caps
- **Loan size:** min + max (critical for the under-$50k flag)
- **Product matrix:** fixed / variable / HELOC / private / 2nd mortgage
- **Rate sheet:** current rate by term + BPS markup / markdown
- **Buy-down allowed:** yes/no + price per BPS
- **Active promos:** what + expires-when
- **Turnaround:** SLA for approval (nice-to-have)
- **Red flags:** bankruptcies, consumer proposals, stated income quirks

---

## Data source — Renée's Outlook lender emails

**Lenders send rate sheets via email.** CIMBC list + others. Three equally valid paths to ingest them, ordered from "ship it today" to "long-term ideal":

### Path A — TODAY: Browser automation with Renée's cookies (zero new credentials)

- Renée is already logged into outlook.office.com in her Chrome on her work machine
- Use `setup-browser-cookies` skill to import those Outlook cookies into the browse session (or Playwright)
- Scripted run opens outlook.office.com, navigates to Inbox, filters by known lender senders + "rate" in subject, extracts the newest email per lender
- Parses the rate sheet (HTML or PDF attachment)
- Updates lender rules JSON
- **Scheduled weekly via /schedule skill (remote agent on CronCreate)** — runs in the cloud with the imported session, no need for her to be at her desk
- **Zero new credentials required. Zero exposure of teammates' emails.** The browser only sees what she can see.
- Works because John/Sandra don't have to do anything — Renée is already authorized as a team member

### Path B — Gmail forward rule (5-minute setup for Renée, cleaner separation)

- In Outlook, Renée sets a rule: every email from known lender domains → forward to `lenders@poweragentsystem.com` alias (or any Gmail she controls)
- We read that inbox via Gmail MCP — already wired, zero new setup on our end
- Benefit: lender mail cleanly separated from personal. No privacy concern since only lender mail hits the alias
- Keeps working even if Microsoft changes Outlook's DOM

### Path C — IDEAL: Scoped Outlook API key from John/Sandra (once they see value)

- An Outlook app-registration API key scoped to JUST lender-email ingestion (not full inbox read) — Microsoft supports scoped OAuth apps
- Why hesitant now: if asked for a plain "API key for Outlook," it sounds like full-tenant access which would expose the whole OLS team's inboxes. Legitimate privacy concern.
- Pitch after 30 days of the tool running on Path A or B: "Here's what we're producing weekly. We want to scope an app-registration token (not my personal account) so it runs unattended and the data is cleaner. Zero access to your or anyone else's mail — only lender rate-sheet senders." Proven value + scoped ask = easier yes.

**Recommendation:** ship on Path A. Propose Path B to Renée as an optional cleanup if she wants cleaner separation. Revisit Path C conversation after 30 days of live use.

---

## Weekly rate update cron

Once built, a Vercel cron job runs weekly:
- Pulls newest email from each lender (per whichever integration path is live)
- Diffs against stored rate sheet
- Updates lender rules JSON
- Logs changes to Command Center
- Alerts Renée if criteria tightened (e.g. LTV cap dropped from 80% to 75%)

Promo emails often show one headline rate (e.g. "4.99% special!") but the lender's FULL rate sheet has multiple products. Always click through to the lender's newest rate sheet — don't use the promo rate as the only input.

---

## UI — clean chat-style page

Look + feel: ChatGPT / Claude — minimal, clean, breathing room.

Layout:
- Left rail: Recent scenarios checked by OLS team (history)
- Center: Either the structured form OR the free-text chat entry (toggle)
- Right rail: Quick-reference panel showing today's rate shifts + active promos

Color palette:
- Deep OLS navy background
- Gold accent for CTAs + primary numbers
- White primary text, muted gray secondary
- Subtle gold dividers, not hard lines

Greeting: "Good morning OLS Team! 12 scenarios checked yesterday, 8 funded. Top match lender this week: [X] with 4.89% on 5-year fixed."

Not "Good morning Renée."

---

## Canadian compliance + FSRA

- Rate outputs are **indicative, not binding**. Footer on every result: "Rates shown are indicative based on the scenario provided. Final approval + rate are subject to the lender's underwriting."
- FSRA disclosure: Renée's name, Mortgage Agent Level 2, brokerage (Ontario Lending Solutions), License #13063 — appear in footer (pulled from custom values per her FSRA skill).
- Never store SIN, full credit bureau report, or bank statements in this tool. Inputs stay in Upstash with 7-day TTL unless the team explicitly saves a scenario.

---

## Implementation phases

### Phase 1 — skill + spec (this file)
Done by this commit. Reference.

### Phase 2 — lender rules JSON
Without Outlook access, manually build from: CIMBC website + public lender rate sheets + whatever Renée can paste in. First pass: 10 major Canadian lenders (TD, RBC, Scotia, CIBC, BMO, MCAP, First National, Home Trust, Equitable, Haventree).

### Phase 3 — UI shell
Build `/lender-tool/` page on a new Vercel deployment (or subroute on xpert-command-center). OLS blue+gold theme. Form + chat input paths.

### Phase 4 — matching engine
Node endpoint `/api/lender-match` — takes scenario JSON → returns ranked lender matches + rates. Uses the lender rules JSON.

### Phase 5 — weekly rate cron
Once a mail-ingest path is established, set up the cron.

### Phase 6 — chat-style natural language input
Wire Claude API to parse free-text scenarios → structured form values → matching engine.

---

## Priority signal

Renée 2026-04-24: **"this is not top priority. i want the other tasks done first before we use tokens on this."** Park until flagged live again. Skill file is the placeholder — the build waits.

---

**Related skills:** `morgan-mortgage.md` · `fsra-mortgage-advertising-compliance.md` · `niche-sales-cycle-analysis.md` · `mortgage-agent-sales-process.md`
