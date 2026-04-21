# BROWSER FINISH PROMPT — Mortgage + Generic GHL Snapshots
### Paste this into your "Xpert — EquityMax GHL" Claude Project (or any Console session logged into GHL).

---

You are finishing the Canadian mortgage GHL snapshot (EquityMax) and the Generic Business snapshot (ABC) for Renée Ross's agency. Everything that could be done via API has already been done overnight by Claude Code. This prompt covers the browser-only work that GHL's API blocks.

## CONTEXT (read first, in order)

1. `https://raw.githubusercontent.com/poweragentsystem-ai/ghl-brain/main/sprint/mortgage-snapshot-spec.md` — full target state spec
2. `https://raw.githubusercontent.com/poweragentsystem-ai/ghl-brain/main/sprint/ghl-master-list.md` — live list of custom fields, values, tags (already created via API)
3. `https://raw.githubusercontent.com/poweragentsystem-ai/ghl-brain/main/sprint/master-build-status.md` — sprint state

## ACCOUNTS

- **EquityMax** (LIVE mortgage account): Location `OBmMdqdnPLZvVyHloFly`. Do NOT trigger workflows, send messages, or make calls. Read + edit drafts only.
- **ABC Company** (Generic snapshot template): Location `AKbAtRra4m908e2w2Kbo`. Safe — no real contacts.

## ALREADY DONE OVERNIGHT VIA API

**EquityMax:**
- 51 new custom values created (all AI prompts humanized + conversion-focused, FSRA compliance footer, booking links, product routing 1–9 filled with 9 mortgage products, business identity pre-populated with Renée's info)
- 64 new tags created (AI-voice/chat attribution + lifecycle + renewal stages + source tracking)

**ABC Company:**
- 28 new custom values created (same AI prompts pattern, generic-business tone)
- 51 new tags created (same AI-voice/chat attribution, lifecycle-agnostic-niche)
- 7 new custom fields (Lead Source Detail, Best Time, Product Interest dropdown linked to product_service_N, Qualified Status, Last AI Bot Used, Last AI Interaction, Preferred Contact Method)

## WHAT YOU NEED TO DO IN THE BROWSER

### PHASE A — EquityMax cleanup (delete what API can't)

GHL's API returns 401/404 for these deletes — they require manual browser:

**Delete these 8 junk draft workflows** (Automation → Workflows → three-dot menu → Delete):
- Copy - 2- Form Completed Next Steps (id: 3023fd69)
- Copy - No-Show (id: 37a4cd74)
- Buyer (Draft) Main Workflow After Form Filled Out (id: 5e54a751)
- Buyer new lead workflow (id: 02d10a6d)
- New Lead Flow (id: 2b6e9d59)
- seller new lead workflow (id: ff9e2c44)
- Nurture With AI Call (draft) (id: d5f9fbae)
- Not Book an appointment (id: 1351c3ab)

**Delete these extra pipelines** (Opportunities → Pipelines → three-dot → Delete):
- Realtor Pipeline Buyer
- Realtor Pipeline Sellers
- Realtor Mortgage Pipeline
- Sales
- Underwriting Pipeline

**Delete these junk forms** (Sites → Forms → three-dot → Delete):
- Form 13, Form 14, Form 16
- Generic Form (Redo into dropdown serviceoffer field)
- Duplicate "Type Of Mortgage Form To LTV Survey" (keep only one — the Google variant if unsure)
- Lovable->GHL workflow

**Delete this calendar** (Calendars → Settings → Delete):
- Hemza Q's Personal Calendar (unknown ownership, likely ex-contractor)

### 📖 THE DEFINITIVE WORKFLOW PLAYBOOK + AI AGENT BUILD PLAN (read BOTH before building)

1. `https://raw.githubusercontent.com/poweragentsystem-ai/ghl-brain/main/sprint/mortgage-workflow-playbook.md` — the exact lead journey, timing, tags
2. `https://raw.githubusercontent.com/poweragentsystem-ai/ghl-brain/main/sprint/ai-agent-build-plan.md` — how to build the AI agents in Build-with-AI (prompt→agent mapping, KB content plan, per-agent settings, build order, success criteria)

This document contains the exact lead journey Renée walked through. Every automation, every stage, every timing rule, every tag, every compliance boundary. Build workflows from THIS document, not from assumptions.

Key rules it specifies:
- Never email + SMS + call simultaneously. Email → SMS → 5 min → voice AI.
- 10-min delay on every stage entry except "New Lead" (user correction window).
- Bot performance tracking is cumulative (both `ai-chat-booked` AND `ai-voice-rebooked` can co-exist on one contact).
- Partnership workflows use `{{partner.niche}}` + `{{partner.service_N}}` tokens — generic across real estate / legal / financial planning / construction / any partner type.
- Voice call outcome handling has 5 distinct states (success / not-answered / hung-up / call-failed / voicemail) — each with different callback logic.
- Application chat bot can collect data; final submission goes through user's registered application platform (Scarlette / Velocity / Lendesk / Finmo).

### ⚠️ CORRECTIONS RENÉE ADDED 2026-04-21 — apply these during all phases below

**Lifecycle tags — every workflow uses these progressively:**
- `new-business-lead` applied at lead creation (via source router)
- `warm-lead` applied when lead replies OR opens pre-qualify
- `hot-lead` applied when qualified + booked OR in application
- `cold-lead` applied after 3 no-response touches
- `old-lead` applied at 90 days silent

**FSRA footer must use INDIVIDUAL customs (no composite):**
In every email + website footer, compose the footer inline:
```
{{custom_values.user_full_name}} — {{custom_values.license_type}} · License {{custom_values.license_number}}
Brokered through {{custom_values.brokerage_name}} · FSRA Regulated
Not intended to solicit clients currently under contract with another mortgage professional · O.A.C.
```
Do NOT use `{{custom_values.fsra_footer_full}}` — that composite custom value has been removed.

**Real Estate partner flow is a CORE feature — add AI Studio folder "Real Estate" with:**
1. Real Estate Buyer Intake + Qualify workflow (collects buying criteria, books partner's calendar via `{{custom_values.real_estate_partner_calendar_link}}`, tags `real-estate-buyer` + `real-estate-qualified`)
2. Real Estate Seller Intake + Qualify workflow (same, seller side)
3. Real Estate Partner Notification workflow (alerts partner's email `{{custom_values.partner_email}}` when a qualified lead books)

**Real Estate ONE landing page** (not three) — single page with "I'm buying / I'm selling / Just exploring" selector at top. Form branches accordingly.

**Partner is NOT always a real estate agent** — `{{custom_values.partner_type}}` is a dropdown: Real Estate Agent / Lawyer / Financial Advisor / Builder / Other. The real estate flow is the highest-value example but partnership workflows must be generic enough to work with any partner type.

**Folder structure (apply during AI Studio work):**
1. Mortgage
2. Partnership (generic B2B — all partner types)
3. Recruitment
4. **Real Estate** (NEW — buyer + seller flows)
5. Voice AI Bots
6. Conversational AI
7. Miscellaneous (spam, source router, reply handling)

**Tag hygiene:**
- Use `source-meta` (not `source-facebook`) in all new/edited workflows
- Single `no-show` tag is sufficient — DO NOT use deprecated `no-show-rebooked` or `no-show-final`

**Webhooks to wire:**
- `{{custom_values.lead_webhook_url}}` — external landing pages post leads here
- `{{custom_values.application_webhook_url}}` — application platform (Scarlette/Lendesk/Velocity) callback
- `{{custom_values.payment_webhook_url}}` — Stripe payment confirmation

**Do NOT use these (deprecated):** `mortgage_agent_full_name`, `mortgage_agent_license_type`, `mortgage_agent_license_number`, `fsra_footer_full`, `doc_upload_link`, `industry`.

---

### PHASE B — EquityMax AI Studio audit + rebuild

Go to **AI Agents → Agent Studio → General Business Automation folder** (10 agents). For each:

1. Click agent → **Build with AI** panel → paste: `"Explain in detail step by step this automation and what it does. And if it is missing information."`
2. Based on the answer, decide: KEEP AS-IS / FIX EMAILS / ADD VOICE BOT / REBUILD
3. Every message inside must use `{{custom_values.*}}` tokens — no hardcoded "Renée", "EquityMax", "GTA"
4. Swap any remaining personal references for tokens
5. Use the humanized AI prompts that were populated via API (they're in custom values: `ai_prompt_inbound`, `ai_prompt_pre_qualify_follow_up`, `ai_prompt_booking_follow_up`, `ai_prompt_no_show_rebook`, `ai_prompt_renewal_countdown`, `ai_prompt_application_reminder`, `ai_prompt_document_reminder`, `ai_prompt_referral_request`, `ai_prompt_partnership`, `ai_prompt_recruitment`, `ai_prompt_google_review_request`, `ai_prompt_long_term_nurture`)

### PHASE C — Build Voice AI Bots folder (6 bots)

Create folder **"Voice AI Bots"** in AI Studio. Use Build with AI to generate:

1. **Inbound Voice Reception** — use `{{custom_values.ai_prompt_inbound}}` as the base prompt
2. **Outbound Pre-Qualify Follow-Up** — use `{{custom_values.ai_prompt_pre_qualify_follow_up}}`
3. **Outbound Booking Follow-Up** — use `{{custom_values.ai_prompt_booking_follow_up}}`
4. **No-Show Rebooker** — use `{{custom_values.ai_prompt_no_show_rebook}}`
5. **Renewal Outreach** — use `{{custom_values.ai_prompt_renewal_countdown}}`
6. **Document Collection** — use `{{custom_values.ai_prompt_document_reminder}}`

### PHASE D — Build 4 Conversational AI (Chat) agents

Create folder **"Conversational AI"**:
1. Inbound Chat — web chat + SMS for new inbound
2. Pre-Qualify Chat Assistant — helps fill the form
3. Product Explainer Chat — covers all 9 mortgage products (purchase, purchase-ftb, refinance, renewal, heloc, reverse, commercial, flip, private)
4. Partnership / Recruitment Chat — routes B2B + candidate inquiries

### PHASE E — Build 5 snippets (Conversations → Snippets)

1. **User Calendar Link** — "Grab a time here: {{custom_values.user_calendar_booking_link}}"
2. **Application Link** — "Your application link: {{custom_values.application_link}}"
3. **Pre-Qualify Link** — "Takes ~2 min: {{custom_values.pre_qualify_form_link}}"
4. **Recruitment Link** — "Interview slot: {{custom_values.recruitment_calendar_booking_link}}"
5. **Partnership Link** — "Partner intro call: {{custom_values.partnership_calendar_booking_link}}"

### PHASE F — Build 8 email templates (Marketing → Emails → Templates)

Use the humanized prompts + FSRA footer (`{{custom_values.fsra_footer_full}}`):
1. Welcome
2. Booked (confirmation)
3. Reminder (24h before)
4. Application Sent
5. Documents Requested (list per product type)
6. Funded / Closing
7. Renewal Countdown (variants for 120/90/60/30/14 days)
8. Not Qualified / Needs Review (warm, never dead-ends)

**Tone rules (important):** human, contractions, NO "Please be advised," NO robotic "Reply YES/NO". Good CTAs: "Reply with the days that work for you." Every marketing email footer includes `{{custom_values.fsra_footer_full}}`.

### PHASE G — Build Pre-Qualify Form (Form Builder v2)

Single form with conditional branching based on `mortgage_product` selection. Fields always visible:
- First name, last name, email, phone, city, province
- `mortgage_product` dropdown (required) — 9 products
- Property type, rough mortgage amount, property value, employment type, annual income, credit score range
- CASL consent checkbox (text from `{{custom_values.casl_consent_text}}`)

Conditional per product:
- **Reverse**: age (55+ required), LTV note
- **Flip**: ARV, reno budget, timeline weeks, flip experience
- **Commercial**: property subtype, num units, NOI monthly, owner occupied
- **Renewal**: renewal date, current lender, current rate
- **Refinance/HELOC**: current mortgage balance, debts to consolidate
- **Purchase/FTB**: down payment amount, target close date

On submit → tag with the selected product (from `{{custom_values.product_service_N}}`) + pre-qualify-complete → trigger new-lead welcome.

### PHASE H — Publish draft workflows (browser toggle only)

In ABC Company, publish these 4 drafts after confirming they look right:
- 6-Step Sales Follow-Up (id: b57186f8)
- Inbound Universal Handler (id: 63c5b881)
- Long Term Nurture Sequence (id: deaf6dbb)
- No Show SMS Reminder Sequence (id: a14cc290)

### PHASE I — Export snapshots from Agency Dashboard

When above phases done:
1. Agency Dashboard → Snapshots → Create Snapshot → from EquityMax → name "Canadian Mortgage Professional Snapshot v1"
2. Agency Dashboard → Snapshots → Create Snapshot → from ABC → name "Generic Business Snapshot v1"

## STOP CONDITIONS — halt and ask Renée, don't guess

Call back before continuing if ANY of these happen:
- A delete fails because the item is referenced by a live workflow (may break real leads)
- The API returns 403/401 consistently (creds may have rotated)
- GHL Build-with-AI explanation flags a workflow as having hardcoded personal info you can't attribute to Renée's info vs something else (she may want to keep it)
- You're about to publish a workflow that contains an outbound message trigger (risk of firing at real contacts)
- Any workflow shows "Schedule Appointment" modal overlays blocking Playwright clicks (known iframe issue — need Renée's manual approval)

## DONE CRITERIA — how you report success

Append one line to `XpertVault/sprint/master-build-status.md` via the API:
```
- [YYYY-MM-DD HH:MM | Console] Mortgage snapshot phases A–I complete. X junk deleted, Y agents built/audited, Z emails humanized, W snippets created. Snapshots exported: "Canadian Mortgage Professional Snapshot v1", "Generic Business Snapshot v1".
```

Then reply to Renée with:
- **Counts:** exact numbers for workflows deleted, agents built, emails humanized, forms cleaned
- **URLs:** direct links to the 2 exported snapshots in the Agency dashboard
- **Blockers:** anything that couldn't finish + why
- **Next session hand-off:** 1 specific sentence on what Renée should do next (purchase phone numbers, connect calendars, etc.)

## RULES (must obey)

Read these skill files before starting:
- `C:/Users/User/claude-skills/message-tone.md` — human tone, no robotic phrases
- `C:/Users/User/claude-skills/lead-journey-walkthrough.md` — verify every path before declaring done
- `C:/Users/User/claude-skills/system-walkthrough.md` — test as end user + business owner + admin
- `C:/Users/User/claude-skills/console-handoff.md` — the handoff protocol you're executing

**Safety rules (non-negotiable):**
- Never send messages, emails, or calls to any lead or contact in any sub-account
- Testing only uses Renée's contact: phone 4168784622 / email renee.ross@gmail.com
- Canadian compliance always applies: CASL (consent), PIPEDA (data handling), CRTC (voice), FSRA (mortgage ads)
- Draft-only on EquityMax workflows — DO NOT toggle to Published until Renée reviews
- On ABC, publish only the 4 specific draft workflows listed in Phase H

**Tone rules (every email + voice bot + snippet):**
- Human, warm, contractions, short sentences
- Never "Please be advised" / "Hello [Name]," / "Reply YES/NO"
- Good reply CTAs like "Reply with the days that work for you" are encouraged
- Every marketing/nurture email includes `{{custom_values.fsra_footer_full}}` footer
- Never hardcoded names — all `{{custom_values.*}}` tokens

**When in doubt:** STOP. Use one of the stop conditions above. Do NOT improvise on live data.
