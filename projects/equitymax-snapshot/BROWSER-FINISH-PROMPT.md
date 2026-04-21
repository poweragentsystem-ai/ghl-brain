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

## AT THE END

Append to `XpertVault/sprint/master-build-status.md` a status log line:
`- [YYYY-MM-DD HH:MM | Console] Mortgage snapshot phases A–I complete. X agents built, Y workflows cleaned, Z emails humanized. Snapshot exported.`
