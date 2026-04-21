# CANADIAN MORTGAGE GHL SNAPSHOT — Catalog + Target Spec
### Auto-generated 2026-04-20 from live EquityMax API
Shows everything that exists now (CURRENT) and the clean target state (TARGET) for a universal Canadian mortgage snapshot. Renée approves → I execute the cleanup.

---

## LIVE COUNTS (EquityMax today)

| Item | Count | Target | Action |
|---|---|---|---|
| Workflows | 93 (54 pub, 39 draft) | ~25 | Retire duplicates, port to AI Studio |
| Custom Fields | 389 | ~90 | Dedupe + generify |
| Custom Values | 170 | ~80 | Dedupe + generify |
| Tags | 115 | ~50 | Add AI-voice/chat variants + dynamic product tags |
| Pipelines | 7 | 3 (Mortgage, Partnership, Recruitment) | Retire Realtor + Sales |
| Calendars | 5 | 4 (Personal, Follow-up, Partnership, Recruitment) | Rename + dedupe |
| Forms | 10 | ~5 | Dedupe + rename |
| Snippets | API 404 | 5 (calendar, app, prequalify, recruitment-book, partnership-book) | Browser build |
| Email templates | API 404 | ~8 (welcome, booked, reminder, app-sent, doc-req, funded, renewal, not-qualified) | Browser build |

---

## TAGS

### CURRENT (115)

- `1770411789818x729503551179194400`
- `1770411937731x786716738265284600`
- `6/8/2024_call_ended`
- `ai-chat-booked`
- `ai_call_answered`
- `ai_call_convo`
- `ai_sms_call_complete`
- `ai_sms_call_not_complete`
- `ai_sms_not_qualified`
- `ai_sms_qualified`
- `ai_voice_call_complete`
- `ai_voice_call_not_complete`
- `ai_voice_not_qualified`
- `ai_voice_prequalified`
- `ai_voice_qualified`
- `application`
- `appointment confirmation call`
- `appointment_booked`
- `appointment_fail`
- `appointment`
- `buyers`
- `call_trigger_failed`
- `client`
- `clubcondo`
- `cold`
- `commercial`
- `completed pre qual form`
- `dnc`
- `dnd`
- `equitymax website`
- `fb lead form`
- `follow up`
- `follow-up`
- `funded`
- `generic`
- `high priority`
- `john lead`
- `kijiji`
- `lead currently in workflow sms`
- `lead currently in workflow`
- `lead paid`
- `long term nurture sms`
- `long term nurture`
- `manual_workflow_add`
- `meeting-link-clicked`
- `meeting-link-not-clicked`
- `mike lead`
- `mortgage form started`
- `mortgage lead`
- `mortgage test`
- `mortgage_demo_call`
- `name via lookup`
- `new lead no response`
- `new lead`
- `nikki lead`
- `no mass communication sms`
- `no mass communication`
- `not interested`
- `not qualified`
- `not_interested`
- `old lead currently in workflow`
- `old lead sms`
- `old lead`
- `partnership`
- `phone verified`
- `pre-qual-complete`
- `pre-qual-form-needed`
- `private`
- `productservice_10`
- `productservice_1`
- `productservice_2`
- `productservice_3`
- `productservice_4`
- `productservice_5`
- `productservice_6`
- `productservice_7`
- `productservice_8`
- `productservice_9`
- `purchase `
- `purchase`
- `qualified`
- `realtor`
- `recruitment`
- `referral`
- `referred a client`
- `refinance`
- `renee lead`
- `renee`
- `renewal`
- `renovation`
- `resend_construction`
- `resend_generic`
- `resend_private`
- `resend_purchase`
- `resend_reverse`
- `reverse`
- `second`
- `sellers`
- `send_application_link`
- `sheh`
- `trafficdispenser`
- `trafficdispensor`
- `uninterested`
- `working`
- `wrong number`
- `{{contact.productservice_10}}`
- `{{contact.productservice_1}}`
- `{{contact.productservice_2}}`
- `{{contact.productservice_3}}`
- `{{contact.productservice_4}}`
- `{{contact.productservice_5}}`
- `{{contact.productservice_6}}`
- `{{contact.productservice_7}}`
- `{{contact.productservice_8}}`
- `{{contact.productservice_9}}`

### TARGET — ~50 clean tags organized by category

**Product tags (dynamic via `{{custom_values.product__service_N}}` tokens):**
- purchase, purchase-ftb, refinance, renewal, heloc, reverse (55+, 65% LTV), commercial, flip, private

**AI attribution — action/outcome tags split into voice + chat:**
- `ai-voice-booked` / `ai-chat-booked`
- `ai-voice-qualified` / `ai-chat-qualified`
- `ai-voice-unqualified` / `ai-chat-unqualified`
- `ai-voice-not-interested` / `ai-chat-not-interested`
- `ai-voice-transferred` / `ai-chat-transferred`
- `ai-voice-needs-review` / `ai-chat-needs-review`
- `ai-voice-rebooked` / `ai-chat-rebooked`
- `ai-voice-app-sent` / `ai-chat-app-sent`
- `ai-voice-form-started` / `ai-chat-form-started`
- `ai-voice-form-completed` / `ai-chat-form-completed`

**Voice-only:** `ai-voice-voicemail-left`, `ai-voice-hangup`, `ai-voice-no-answer`, `ai-voice-call-failed`
**Chat-only:** `ai-chat-abandoned`, `ai-chat-response-delayed`

**Lifecycle:** `hot-lead`, `cold-lead`, `old-lead`, `new-client`, `existing-client`, `client-funded`, `pre-qualify-started`, `pre-qualify-complete`, `application-sent`, `application-complete`, `documents-requested`, `documents-complete`, `submitted-to-lender`, `approved`, `conditional-approval`, `funded`, `closed`, `no-show`, `partnership-lead`, `recruitment-lead`, `referral-lead`

**Renewal stages:** `renewal-120-days`, `renewal-90-days`, `renewal-60-days`, `renewal-30-days`, `renewal-14-days`

**Compliance:** `dnd`, `spam`, `no-mass-comm`, `not-interested`

**Source:** `source-website`, `source-facebook`, `source-google`, `source-referral`, `source-kijiji`

---

## CUSTOM FIELDS

### CURRENT (389)

Full JSON in eqm_cf_live.json. Summary by first-word prefix:

- **ai** (57) — sample: A.I. Question 7 (Answer) | AI Knowledge Link 1
- **a** (21) — sample: A. I. Partnership Question 4 | A. I. Partnership Question 2 (Answer )
- **how** (18) — sample: How Much Is Your Home Currently Worth? | How will your home be used ?
- **call** (14) — sample: Call Outcome | Call Pick Ups
- **what** (13) — sample: What Type Of Property Do You Have | What Type of Business
- **business** (12) — sample: Business Document | Business Primary Hex Code Colour Number (optional )
- **property** (12) — sample: Property Type | Property Value
- **other** (11) — sample:  Product/Service 8 |  Do you prefer a man or woman AI voice ?
- **mortgage** (11) — sample: Mortgage | Mortgage Term (Years)
- **total** (11) — sample: Total Car Debt | Total Credit Card Debts
- **are** (9) — sample: Are you available full-time? | Are You A Buyer or Seller
- **qualified** (6) — sample: Qualified Criteria | Qualified / Not Qualified
- **do** (6) — sample: Do you have a second mortgage or a home equity line of credit on this property? | Do you qualify for VA loans?
- **ltv** (6) — sample: LTV | LTV (Website)
- **user** (5) — sample: User Calendar Link | User Application Link
- **loan** (5) — sample: Loan Type | Loan Purpose
- **not** (5) — sample: Not Qualified Recruitment Details | Not Qualified Landing Page
- **type** (4) — sample: Type of Property  | Type Of Property
- **purchase** (4) — sample: Purchase Timeline (website) | Purchase Loan Amount
- **follow** (4) — sample: Follow Up Date | Follow Up Date
- **have** (4) — sample: Have you had a foreclosure, short sale or bankruptcy in the last 7 years? | Have you already been prequalified for a mortgage ?
- **whats** (3) — sample: What’s the balance of a loan you want to refinance? | What’s your current monthly revenue?
- **select** (3) — sample: Select Your Type Of Mortgage | Select your credit score?
- **referral** (3) — sample: Referral Form Link | Referral Link
- **if** (3) — sample: If Yes How Much Were You Pre Approved For? | If Yes How Much Were You Pre Approved For?

### TARGET — ~90 clean mortgage fields

**Contact basics:** first_name, last_name, email, phone, address, city, province, postal_code, dob (GHL standard)

**Mortgage qualification:**
- mortgage_product (dropdown: 9 products)
- mortgage_amount, property_value, ltv (calc), down_payment, down_payment_pct
- amortization_years (25/30/35), term_length (1/2/3/4/5/7/10-yr), rate_type (fixed/variable/adjustable)
- credit_score_range, annual_income, self_employed (y/n), employment_type, total_debt
- property_type, first_time_buyer (y/n)
- renewal_date (CRITICAL — drives countdown), current_lender, current_rate
- age (for reverse mortgage 55+)

**Flip-specific:** arv, reno_budget, timeline_weeks, flip_experience

**Commercial-specific:** property_subtype, num_units, noi_monthly, owner_occupied

**Documents tracked:** t4_received, noa_received, bank_statements_received, employment_letter_received, purchase_contract_received, appraisal_received, property_tax_received

**Application platform:** application_platform (Scarlette/Velocity/Lendesk/Finmo/Newton/Other)

**Voice AI / chat attribution:** ai_bot_id_inbound_voice, ai_bot_id_outbound_voice, ai_bot_id_renewal, ai_bot_id_no_show, ai_bot_id_chat, last_ai_interaction, last_ai_bot_used

**Recruitment (17 fields already created):** keep as-is

---

## CUSTOM VALUES

### CURRENT (170)

Full JSON in eqm_cv_live.json.

### TARGET — ~80 clean values (all filled during onboarding)

**Business identity:** user_first_name, user_last_name, user_full_name, user_email, user_phone, user_headshot_url, company_name, company_address, company_city, company_province, website_url, service_area, brand_color_primary, brand_color_secondary, brand_color_accent, logo_url

**FSRA compliance (required on every site + ad):**
- mortgage_agent_full_name, mortgage_agent_license_type, mortgage_agent_license_number
- brokerage_name, brokerage_license_number, principal_broker_name
- **fsra_footer_full** — computed combined text for drop-in use. Example: "Renée Ross — Mortgage Agent Level 2 #13063 · Brokered through Ontario Lending Solutions · FSRA Regulated · Not intended to solicit clients under contract with another agent or broker"

**Application platform:** application_platform_name, application_api_key, application_link, doc_upload_link

**Booking links (also surface as snippets):** user_calendar_booking_link, follow_up_calendar_booking_link, partnership_calendar_booking_link, recruitment_calendar_booking_link, pre_qualify_form_link, ltv_calculator_link, rate_request_form_link

**AI agent config:** ai_agent_name, ai_agent_persona, ai_goals, ai_rules, qualified_lead_details, not_qualified_lead_details

**AI prompts (one per role):** ai_prompt_inbound, ai_prompt_pre_qualify_follow_up, ai_prompt_booking_follow_up, ai_prompt_no_show_rebook, ai_prompt_old_lead_resurrect, ai_prompt_referral_request, ai_prompt_partnership, ai_prompt_recruitment, ai_prompt_renewal_countdown, ai_prompt_application_reminder, ai_prompt_document_reminder, ai_prompt_google_review_request, ai_prompt_long_term_nurture

**Product tag routing:**
- product__service_1 = "Purchase" (double underscore — GHL bug)
- product__service_2 = "Purchase First-Time Buyer" (double underscore)
- product_service_3 = "Refinance"
- product_service_4 = "Renewal"
- product_service_5 = "HELOC"
- product_service_6 = "Reverse Mortgage"
- product_service_7 = "Commercial"
- product_service_8 = "Flip / Wholesale"
- product_service_9 = "Private"

**Regulatory / disclaimers:** casl_consent_text, privacy_policy_url, terms_url

---

## SNIPPETS (build in browser — API 404)

**Target — 5 essential snippets:**
1. User Calendar Booking Link — wraps {{custom_values.user_calendar_booking_link}} with a warm CTA
2. Application Link — {{custom_values.application_link}} with one-line context
3. Pre-Qualifying Link — {{custom_values.pre_qualify_form_link}}
4. Recruitment Booking Link — {{custom_values.recruitment_calendar_booking_link}}
5. Partnership Booking Link — {{custom_values.partnership_calendar_booking_link}}

---

## EMAIL TEMPLATES (build in browser — API 404)

**Target — ~8 humanized templates:**
1. Welcome — first lead touch
2. Booked — appointment confirmation
3. Reminder — 24h before meeting
4. Application Sent — next step after qualification
5. Documents Requested — product-specific doc list
6. Funded / Closing — congrats + review ask
7. Renewal Countdown — 120/90/60/30-day variants
8. Not Qualified (human review) — warm, never dead-ends

**Tone:** human, contractions, no "Please be advised", no robotic "Reply YES/NO". Good CTAs encouraged: "Reply with the days that work for you."
**Footer:** FSRA compliance block from {{custom_values.fsra_footer_full}}.

---

## CALENDARS

### CURRENT (5)

- `Partnership Meeting` — id: OYMBvHVfshCj
- `Mortgage Meeting` — id: RtnedDGtOkOv
- `Recruitment Calendar` — id: cugxAxWLxLAl
- `Follow up Document Bot` — id: jQUfGonYPvwi
- `Hemza Q's Personal Calendar` — id: nmJhNfdzwRL1

### TARGET — 4 calendars

1. Personal Meeting (main booking, 30 min)
2. Follow-Up (post-app doc collection)
3. Partnership Meeting
4. Recruitment Calendar

**Delete:** "Hemza Q Personal Calendar" (unclear ownership — prior contractor)

---

## FORMS

### CURRENT (10)

- `Form 16` — id: lgv9oLIHiLWV
- `Generic Form (Redo into dropdown serviceoffer field)` — id: 7pAYCe9Kwzd0
- `Form 14` — id: zwXTC14Xnhyi
- `Form 13` — id: efNvVyUgvfDu
- `Referral Form(missing terms&cond link)` — id: mS0im1lsQ1au
- `80% LTV Form` — id: QtYgxMxHC7IB
- `Type Of Mortgage Form To LTV Survey (Google)` — id: Xk37VNtjJ0jl
- `Type Of Mortgage Form To LTV Survey` — id: rwOLfsNFQt8K
- `65% LTV Form` — id: 3V03fsFKgNvk
- `Type Of Mortgage Pre-Qualifying Form Kijiji` — id: IwK586Db62Du

### TARGET — 5 clean forms

1. Pre-Qualify Form — full intake, conditional branching by mortgage_product
2. LTV Calculator — property value + mortgage amount → LTV%
3. Rate Request Form — quick capture
4. Referral Partner Form — for real estate agents
5. Document Submission Form — post-approval doc upload

**Delete:** Form 16, Form 14, Form 13 (placeholder names), duplicate LTV surveys, Generic Form (Redo...), Lovable

---

## PIPELINES

### CURRENT (7)

- `Mortgage Pipeline` — 27 stages
- `Partnership Pipeline` — 7 stages
- `Realtor Pipeline Buyer` — 12 stages
- `Realtor Pipeline Sellers` — 12 stages
- `Realtor's Mortgage Pipeline` — 9 stages
- `Sales` — 10 stages
- `Underwriting Pipeline` — 14 stages

### TARGET — 3 pipelines

**1. Mortgage Pipeline** (keep existing 27 stages — comprehensive):
New Lead → Responded → Prequalified Form Pending → PreQualified Form Complete → Meeting Not Booked → Meeting Booked → No Show → Application Sent → Application Complete → Documents Requested → Documents Complete → Appraisal Request → Appraisal Complete → Lender Submitted → Approved → Broker Complete → Signed At Lawyers → Funded/Client → Referred Out → Long Term Nurture → 1 Month Renewal → 2-3 Month Renewal → 6 Month Renewal → 12 Month Renewal → Not Qualified → Not Interested → Cold Outreach

**2. Partnership Pipeline** (keep existing):
Lead → Responded → Meeting Booked → No Show → Meeting Completed → Partnership Accepted → Not Interested

**3. Recruitment Pipeline** (new, replace fragmented):
Lead → Responded → Interview Booked → No Show → Interview Completed → Offer Extended → Accepted → Onboarded → Not a Fit

**Delete:** Realtor Pipeline Buyer, Realtor Pipeline Sellers, Realtor Mortgage Pipeline, Sales, Underwriting Pipeline

---

## WORKFLOWS — organized into folders

### CURRENT — 93 workflows (messy, many duplicates)

Grouped by intended folder:

**newLead** (11):
- ⚪ `01 - New Lead Entry — 24/7 Welcome (All Sources)`
- 🟢 `1-New-Facebook & Google 24/7 Assigned User (Split)`
- 🟢 `1.1 New Mortgage Lead 24/7 Notification`
- 🟢 `1.A BUYER- New Lead To AI Booking Bot (Welcome Added)`
- 🟢 `2- Form Completed Next Steps - New Lead Did Not Complete Pre Qualify Form  & Booking Follow Up ( Missing Form  For Trgger )`
- ⚪ `Buyer new lead workflow`
- ⚪ `Copy - 2- Form Completed Next Steps - New Lead Did Not Complete Pre Qualify Form  & Booking Follow Up ( Missing Form  For Trgger )`
- ⚪ `EquityMax — New Lead Complete Journey`
- ⚪ `New Lead Flow`
- ⚪ `New Lead Internal Notification & Welcome 24/7`
- ⚪ `seller new lead workflow`

**buyer** (6):
- 🟢 `3.Buyer Booked Appointment & Notifications`
- ⚪ `BUYER Main Workflow After Form Filled Out Form ( AI Voice Pending)`
- ⚪ `Buyer (Draft) Main Workflow After Form Filled Out To Book Appt ( AI Voice Pending)`
- ⚪ `Buyer Booked Appointment Nurture Automation`
- 🟢 `Buyer Lead Campaign`
- ⚪ `Pre Con Buyer Form Submitted Notification`

**seller** (4):
- 🟢 `1. SELLER- Main Workflow After Form Filled Out To Book Appt ( AI Voice Pending)`
- ⚪ `6. Long Term Nurture Seller 12 Emails`
- ⚪ `Seller Form Notification & Pipeline Stage & Booking Attempt`
- ⚪ `Seller Lead Replied Notification (add replied or appointment condition)`

**partnership** (4):
- 🟢 `Partnership Appointment Notification & Call Transfer`
- ⚪ `Partnership Pipeline`
- ⚪ `Real Estate Partnership Inquiry`
- 🟢 `Reply Not Interested Partnership`

**recruitment** (14):
- 🟢 `1. New Recruitment Lead`
- 🟢 `1. New Recruitment Lead (ADD FB LEAD FORM)`
- 🟢 `1.1 New Recruitment Lead 24/7 Notification`
- 🟢 `2. Recruitment Appointment Booked`
- 🟢 `2. Recruitment Appointment Booked Notification & Call Transfer`
- 🟢 `3. Recruitment No Show`
- 🟢 `4. Offer Extended & Joining Team Notification`
- ⚪ `4. Offer Extended & Joining Team Notification (missing onboard form in welcome email )`
- 🟢 `5.New Team Member Onboarding Automation Set Up Notification`
- ⚪ `New Recruitment Lead- Cold Outreach`
- ⚪ `New Team Member Onboarding Automation Set Up`
- 🟢 `New Team Member Onboarding Automation Set Up Notification`
- ⚪ `Recruitment Pipeline`
- 🟢 `Recruitment Tag`

**aiVoice** (1):
- ⚪ `Nurture With AI Call ( draft)`

**appDoc** (6):
- ⚪ `4. Documents Requested Reminders ( Listing Agreement Stage 2 days reminders)`
- 🟢 `5.Application Reminders (30 Days) Then Long Term`
- 🟢 `6.Documents Requested Reminders 14 Days`
- ⚪ `Manual Resend To Mortgage Welcome Email w/ Application & Follow Ups Automation`
- ⚪ `Mortgage Welcome Email w/ Application Type Tags  & Follow Ups Automation`
- ⚪ `Underwriter Notification ( App & Docs Complete)`

**renewal** (2):
- 🟢 `Client Renewal Date Notification`
- ⚪ `Renewal Countdown`

**nurture** (3):
- ⚪ `Demo Booked Appointment Nurture Automation`
- 🟢 `Long Term Nurture 12 Months Emails`
- 🟢 `Old Lead Tag Try To Connect Then Long Term Nurture`

**funded** (5):
- ⚪ `5.Client Thank You & Referrals & Google Reviews & Quarterly Internal Notification ( set up google review)`
- 🟢 `7.Client Funded Thank You & 40 Days Later Follow Up & Call`
- 🟢 `8.Quarterly Referral Request W/ Vacation Incentive`
- 🟢 `Referral For Tag`
- 🟢 `Referral Form Notification & Stage (form missing)`

**spam** (2):
- 🟢 `8. SPAM`
- 🟢 `Spam`

**reply** (4):
- ⚪ `7. Not Interested/ DND`
- 🟢 `Reply Not Interested`
- 🟢 `Reply Not Interested`
- 🟢 `Responded Workflow Turn Off Automation`

**tag** (10):
- 🟢 `3. Quiz Completed Tag`
- ⚪ `AI - Apply Chat Booked Tag`
- ⚪ `Client Pipeline Stage Tag`
- 🟢 `Google Lead Tag`
- 🟢 `Meta Lead Tag`
- 🟢 `No Mass Communication Tag`
- 🟢 `Type Of Mortgage Tag Add To Contact (missing Mortgage Form)`
- ⚪ `Type Of Service / Product Tag ( Type Of Form Missing )`
- 🟢 `Website Lead Tag`
- 🟢 `Workflow Type Of Mortgage Form Started Tag`

**other** (21):
- 🟢 `2-FB Form Completed Next Steps - Did Not Complete Pre Qualify Form  & Booking Follow Up`
- ⚪ `2. Appointment Confirmation + Reminders`
- 🟢 `2. Not a Good Fit`
- ⚪ `3. No-Show Reschedule`
- 🟢 `4.Mortgage Appointment Booked Notification & Call Transfer`
- ⚪ `Appointment Conducted`
- 🟢 `Appointment Confirmation + Reminder`
- ⚪ `Appointment Reminder`
- 🟢 `Call Cancelled (By Prospect) Automation`
- ⚪ `Copy - No-Show`
- 🟢 `Demo But Did Not Buy Automation`
- ⚪ `EquityMax.ca Outbound Pre Qualify`
- 🟢 `Form 65%`
- 🟢 `Form 80%`
- 🟢 `Form 95%`
- 🟢 `Lead Replied Turn Off Auto Flow`
- 🟢 `Lovable->GHL`
- 🟢 `No-Show Automation`
- 🟢 `No-Show Automation Mortgage`
- ⚪ `Not Book an appointment`
- 🟢 `Tech Support Booked Appointment`

### TARGET — ~25 workflows in 6 folders

**Folder 1: NEW LEAD** (5)
- `01-new-lead-24-7-welcome` — instant welcome email + SMS (SMS respects business hours), round-robin assign
- `02-pre-qualify-follow-up` — if form not completed after 30 min, nurture sequence (SMS → email → voice AI call)
- `03-booking-follow-up` — form completed but no meeting → different sequence
- `04-appointment-confirmation-reminders` — confirms, reminds at 24h + 1h, voice AI call 5 min before
- `05-no-show-rebook` — gentle rebook, max 2 attempts

**Folder 2: APPLICATION + DOCUMENTS** (4)
- `10-application-sent` — triggered on pipeline move, 30-day then long-term reminder
- `11-application-completed` — triggers doc request
- `12-document-reminders` — 14-day drip
- `13-underwriter-notification` — internal notify when app+docs complete

**Folder 3: FUNDED + NURTURE** (5)
- `20-funded-thank-you-review` — congrats + Google review 7 days later
- `21-client-referral-quarterly` — quarterly referral ask
- `22-renewal-countdown` — fires at 120/90/60/30/14 days before renewal_date
- `23-long-term-nurture-12mo` — monthly value content
- `24-old-lead-resurrect` — 90-day re-engagement

**Folder 4: PARTNERSHIP** (3)
- `30-partnership-new-lead`, `31-partnership-booked`, `32-partnership-not-interested`

**Folder 5: RECRUITMENT** (4)
- `40-recruitment-new-lead`, `41-recruitment-interview-booked`, `42-recruitment-offer-extended`, `43-recruitment-onboarding`

**Folder 6: MISCELLANEOUS (spam + infra)** (4)
- `90-spam-set-dnd`, `91-not-interested-dnd`, `92-lead-replied-stop-auto`, `93-source-tag-router`

---

## AI STUDIO — AGENTS + VOICE BOTS

### TARGET — 12 agents organized in 3 folders

**Folder: Voice AI Bots** (6 bots)
1. Inbound Voice Reception — answers calls, qualifies, routes
2. Outbound Pre-Qualify Follow-Up — calls leads who did not complete form
3. Outbound Booking Follow-Up — calls pre-qualified leads who did not book
4. No-Show Rebooker — gentle rebook calls
5. Renewal Outreach — calls leads nearing renewal
6. Document Collection — calls leads missing docs

**Folder: Conversational AI (Chat + SMS)** (4)
1. Inbound Chat — web chat + SMS for new inbound
2. Pre-Qualify Chat Assistant — helps fill the form
3. Product Explainer Chat — education across all 9 mortgage products
4. Partnership / Recruitment Chat — routes B2B + candidate inquiries

**Folder: Background Agents** (2)
1. Product Tag Auto-Correct — detects product from form answers
2. Long-Term Nurture Content Generator — drafts monthly emails based on rate environment

---

## PRE-QUALIFY FORM — FIELD SPEC (9 products, dynamic)

Single form with conditional branching based on mortgage_product selection.

**Always-shown:** first_name, last_name, email, phone, city, province, mortgage_product (dropdown), property_type, mortgage_amount, property_value, employment_type, annual_income, credit_score_range, CASL consent

**Conditional by product:**
- **Reverse Mortgage:** age (55+ required), LTV limit note
- **Flip / Wholesale:** arv, reno_budget, timeline_weeks, flip_experience
- **Commercial:** property_subtype, num_units, noi_monthly, owner_occupied
- **Renewal:** renewal_date, current_lender, current_rate
- **Refinance / HELOC:** current_mortgage_balance, debts_to_consolidate
- **Purchase / First-Time Buyer:** down_payment_amount, target_close_date

**On submit:** tag with product__service_N value → tag pre-qualify-complete → trigger new-lead welcome → route by product.

---

## FSRA FOOTER — on every site + ad

From {{custom_values.fsra_footer_full}}:

> **Renée Ross — Mortgage Agent Level 2 · Licence #13063**
> Brokered through Ontario Lending Solutions · FSRA Regulated
> Not intended to solicit clients currently under contract with another mortgage agent or broker · O.A.C.

Appears on: website footer, paid ads (FB/IG/Google), email signatures, social media bios.

---

## ACTION PLAN — phased execution

| # | Action | Tool | Owner |
|---|---|---|---|
| 1 | Delete ~65 redundant workflows | GHL API DELETE (fallback browser) | Claude Code |
| 2 | Delete ~300 excess custom fields | GHL API DELETE | Claude Code |
| 3 | Delete ~90 redundant custom values | GHL API DELETE | Claude Code |
| 4 | Delete ~65 redundant tags | GHL API DELETE | Claude Code |
| 5 | Delete 4 extra pipelines | GHL API DELETE | Claude Code |
| 6 | Rename forms, delete junk | GHL API | Claude Code |
| 7 | Create 5 snippets | Browser (Conversations → Snippets) | Console |
| 8 | Build 8 email templates | Browser (Marketing → Templates) | Console |
| 9 | Rebuild 25 workflows via Build with AI | Browser (AI Agent Studio) | Console |
| 10 | Build 6 voice bots with humanized prompts | Browser (Voice AI Bots folder) | Console |
| 11 | Build 4 chat agents | Browser (Conversational AI folder) | Console |
| 12 | Build pre-qualify form with conditional branching | Browser (Form Builder v2) | Console |
| 13 | Export snapshot from Agency dashboard | Browser | Console/Renée |

Renée approves this spec → execution begins. Per-phase status updates in the change log below.

---

## CHANGE LOG (append-only)

- 2026-04-20 | Claude-Code | Initial catalog + target spec drafted. Awaiting Renée review before execution.
