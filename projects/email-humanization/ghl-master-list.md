# GHL MASTER LIST — Custom Fields · Custom Values · Tags
### The single source of truth for every GHL AI agent.
**Auto-pulled from live GHL APIs on 2026-04-20.** Re-run Claude Code to refresh.

---

## HOW AI AGENTS USE THIS FILE

Before building or updating any workflow/agent in ABC or EquityMax, the AI agent (Console Claude using Build with AI in GHL) must:

1. **Read this file** to know what custom fields, custom values, and tags already exist
2. **Reuse existing** fields/values/tags whenever possible — do NOT create duplicates
3. **If a new one is truly needed**, create it via GHL API, then append it to the appropriate section below with a note: `ADDED YYYY-MM-DD by <who> — <reason>`
4. Custom values in messaging always use token form: `{{custom_values.field_key}}`
5. Custom fields in messaging: `{{contact.field_key}}`

**NEVER hardcode** names, brands, cities, products, or any niche info into copy — use tokens.

---

## TAG NAMING CONVENTION — AI VOICE vs AI CHAT ATTRIBUTION

**Why this matters:** Renée needs to know which AI bot did the action so we can measure which is converting better, and when a lead goes bad, diagnose the specific bot's prompt that caused it.

**Rule — split into voice/chat variants for ACTION/OUTCOME tags only:**

| Action tag | Voice variant | Chat variant |
|---|---|---|
| booked | `ai-voice-booked` | `ai-chat-booked` |
| qualified | `ai-voice-qualified` | `ai-chat-qualified` |
| unqualified | `ai-voice-unqualified` | `ai-chat-unqualified` |
| not-interested | `ai-voice-not-interested` | `ai-chat-not-interested` |
| transferred to human | `ai-voice-transferred` | `ai-chat-transferred` |
| needs human review | `ai-voice-needs-review` | `ai-chat-needs-review` |
| rebooked (no-show) | `ai-voice-rebooked` | `ai-chat-rebooked` |
| application-link-sent | `ai-voice-app-sent` | `ai-chat-app-sent` |
| form started | `ai-voice-form-started` | `ai-chat-form-started` |
| form completed | `ai-voice-form-completed` | `ai-chat-form-completed` |

**Medium-specific — only ONE variant (no split, because the other medium can't do it):**
- `ai-voice-voicemail-left` (voice only)
- `ai-voice-hangup` (voice only)
- `ai-voice-no-answer` (voice only)
- `ai-voice-call-failed` (voice only)
- `ai-chat-abandoned` (chat only — user left mid-conversation)
- `ai-chat-response-delayed` (chat only — slow reply by lead)

**DO NOT split — these tag types stay single (regardless of niche):**
- **ANY product/service tag** — whatever the business sells. For mortgages that's refinance/purchase/renewal/heloc/private, for a dentist it's cleaning/whitening/implants, for a plumber it's leak-repair/install/emergency. Product tags describe WHAT the lead wants, not WHICH bot did something — so attribution doesn't apply.
- Lead quality: `hot-lead`, `cold-lead`, `old-lead`
- Lifecycle: `new-client`, `existing-client`, `client-funded`
- Time-based stage: `renewal-coming-up`, `renewal-90-days`, etc.
- Compliance: `spam`, `dnd`, `no-mass-comm`

**CRITICAL — product/service tags should be DYNAMIC, not hardcoded:**

The snapshot is generic. Each business onboards by filling in Product/Service 1–10 in the intake form. Those answers populate custom values:

- `{{custom_values.product__service_1}}` (double underscore — known bug to standardize)
- `{{custom_values.product__service_2}}` (double underscore)
- `{{custom_values.product_service_3}}` through `{{custom_values.product_service_10}}` (single underscore)

**Workflows + voice bots must tag using these tokens**, not hardcoded words. Example:

- ❌ WRONG: workflow's "Add Tag" action = `refinance` (hardcoded — only works for mortgages)
- ✅ RIGHT: workflow's "Add Tag" action = `{{custom_values.product__service_2}}` (resolves to "refinance" for mortgages, "deep-cleaning" for a cleaning business, "root-canal" for a dentist, etc.)

This is how the ABC snapshot stays universal. When the AI detects which product the lead wants during qualification, it applies the corresponding `product__service_N` token as the tag.

**Application for Console agents:** 
- Outcome tags (booking, qualified, etc.) → always `ai-voice-*` or `ai-chat-*` variant
- Product/service tags → always use `{{custom_values.product__service_N}}` token, never hardcode
- Lifecycle/quality/compliance → stay single

**Analytics use case:** Dashboards filter on `ai-voice-*` vs `ai-chat-*` to compare booking/qualification/conversion rates per bot type. If `ai-voice-not-interested` is spiking, that specific voice prompt needs work.

---

# ABC COMPANY (Generic Snapshot — Layer 1)
**Location ID:** `AKbAtRra4m908e2w2Kbo`  
**API key:** `pit-6ec8f479-5a81-4a7b-99c0-72eb8644e80a`

## ABC — Custom Fields (59)

| Name | Key | Type | Options |
|---|---|---|---|
| A. I. Question 9  | `contact.a_i_question_9` | TEXT |  |
| Additional Comments | `contact.additional_comments` | LARGE_TEXT |  |
| Bot Stop Reason | `contact.bot_stop_reason` | TEXT |  |
| Business Primary Hex Code Colour Number (optional ) | `contact.contactbusiness_primary_hex_code_colour_number_optional_` | TEXT |  |
| Company | `contact.company` | TEXT |  |
| Date | `contact.date` | DATE |  |
| Describe your business/audience | `contact.describe_your_business_audience` | TEXT |  |
| Disqualifying Criteria | `contact.disqualifying_criteria` | LARGE_TEXT |  |
| How Many Team Members | `contact.how_many_team_members` | NUMERICAL |  |
| Issue | `contact.issue` | LARGE_TEXT |  |
| Last Call Duration | `contact.last_call_duration` | TEXT |  |
| Last Call Outcome | `contact.last_call_outcome` | TEXT |  |
| LinkedIn or Resume URL | `contact.linked_in_or_resume_url` | TEXT |  |
| Message Body | `contact.message_body` | LARGE_TEXT |  |
| NOT Qualified Lead details | `contact.not_qualified_lead_details` | LARGE_TEXT |  |
| Offer | `contact.offer` | SINGLE_OPTIONS | Mortgage / Buyer / Seller / Insurance / Solar |
| Partner Commission Rate | `contact.partner_commission_rate` | TEXT |  |
| Partner Company Name | `contact.partner_company_name` | TEXT |  |
| Partner Contact Email | `contact.partner_contact_email` | TEXT |  |
| Partner Contact Name | `contact.partner_contact_name` | TEXT |  |
| Partner Contact Phone | `contact.partner_contact_phone` | PHONE |  |
| Partner Industry | `contact.partner_industry` | TEXT |  |
| Partner Notes | `contact.partner_notes` | LARGE_TEXT |  |
| Partner Type | `contact.partner_type` | SINGLE_OPTIONS | Referral Partner / Affiliate / Vendor / Co-Marketing / Strategic Alliance |
| Qualification Status | `contact.qualification_status` | SINGLE_OPTIONS | Qualified / Not Qualified / Needs Review |
| Qualified Lead Details | `contact.qualified_lead_details` | LARGE_TEXT |  |
| Qualifying Criteria | `contact.qualifying_criteria` | LARGE_TEXT |  |
| Question Conditions  | `contact.question_conditions` | LARGE_TEXT |  |
| Reason | `contact.reason` | SINGLE_OPTIONS | Automations / Designs / Ads / Voice Assistant |
| Recruitment Availability | `contact.recruitment_availability` | SINGLE_OPTIONS | Immediately / Within 2 weeks / Within 1 month / 1-3 months / Just exploring |
| Recruitment Calendar | `contact.recruitment_calendar` | TEXT |  |
| Recruitment Candidate Email | `contact.recruitment_candidate_email` | TEXT |  |
| Recruitment Candidate Name | `contact.recruitment_candidate_name` | TEXT |  |
| Recruitment Candidate Phone | `contact.recruitment_candidate_phone` | PHONE |  |
| Recruitment City | `contact.recruitment_city` | TEXT |  |
| Recruitment Department | `contact.recruitment_department` | TEXT |  |
| Recruitment Email | `contact.recruitment_email` | TEXT |  |
| Recruitment Experience Level | `contact.recruitment_experience_level` | SINGLE_OPTIONS | No experience / Less than 1 year / 1-3 years / 3-5 years / 5+ years |
| Recruitment Experience Years | `contact.recruitment_experience_years` | NUMERICAL |  |
| Recruitment First Name | `contact.recruitment_first_name` | TEXT |  |
| Recruitment Last Name | `contact.recruitment_last_name` | TEXT |  |
| Recruitment LinkedIn or Resume | `contact.recruitment_linkedin_or_resume` | TEXT |  |
| Recruitment Notes | `contact.recruitment_notes` | LARGE_TEXT |  |
| Recruitment Phone | `contact.recruitment_phone` | PHONE |  |
| Recruitment Position Title | `contact.recruitment_position_title` | TEXT |  |
| Recruitment Why Join | `contact.recruitment_why_join` | LARGE_TEXT |  |
| Response | `contact.response` | TEXT |  |
| Response Channel | `contact.response_channel` | SINGLE_OPTIONS | Human / Voice / SMS / FB / IG / GMB / Email / WhatsApp / Live Chat |
| Selected Product / Service | `contact.selected_product__service` | TEXT |  |
| Service Are | `contact.contactservice_are` | TEXT |  |
| State/Province | `contact.stateprovince` | TEXT |  |
| Total | `contact.score_total` | NUMERICAL |  |
| Upload File (if needed )  | `contact.upload_file_if_needed_` | FILE_UPLOAD |  |
| Upload ID  | `contact.upload_id` | FILE_UPLOAD | .pdf / .png / .jpeg / .jpg / .docx / .doc |
| What service are you looking for? | `contact.what_service_are_you_looking_for` | TEXT |  |
| What type of partnership? | `contact.what_type_of_partnership` | TEXT |  |
| What's your availability? | `contact.whats_your_availability` | TEXT |  |
| Who referred you? | `contact.who_referred_you` | TEXT |  |
| Why do you want to work with us? | `contact.why_do_you_want_to_work_with_us` | TEXT |  |

## ABC — Custom Values (179)

| Name | Token | Value (truncated) |
|---|---|---|
| A.I. Agent Model ID | `{{{{ custom_values.ai_agent_model_id }}}}` |  |
| A.I. Agent Name | `{{{{ custom_values.ai_agent_name }}}}` |  |
| A.I. Calling Api Key | `{{{{ custom_values.ai_calling_api_key }}}}` |  |
| A.I. Inbound Call Number | `{{{{ custom_values.ai_inbound_call_number }}}}` |  |
| A.I. Job Title | `{{{{ custom_values.ai_job_title }}}}` |  |
| A.I. Question 1 | `{{{{ custom_values.ai_question_1 }}}}` |  |
| A.I. Question 1 Answer | `{{{{ custom_values.ai_question_1_answer }}}}` |  |
| A.I. Question 10 | `{{{{ custom_values.ai_question_10 }}}}` |  |
| A.I. Question 10 Answer | `{{{{ custom_values.ai_question_10_answer }}}}` |  |
| A.I. Question 2 | `{{{{ custom_values.ai_question_2 }}}}` |  |
| A.I. Question 2 Answer | `{{{{ custom_values.ai_question_2_answer }}}}` |  |
| A.I. Question 3 | `{{{{ custom_values.ai_question_3 }}}}` |  |
| A.I. Question 3 Answer | `{{{{ custom_values.ai_question_3_answer }}}}` |  |
| A.I. Question 4 | `{{{{ custom_values.ai_question_4 }}}}` |  |
| A.I. Question 4 Answer | `{{{{ custom_values.ai_question_4_answer }}}}` |  |
| A.I. Question 5 | `{{{{ custom_values.ai_question_5 }}}}` |  |
| A.I. Question 5 Answer | `{{{{ custom_values.ai_question_5_answer }}}}` |  |
| A.I. Question 6 | `{{{{ custom_values.ai_question_6 }}}}` |  |
| A.I. Question 6 Answer | `{{{{ custom_values.ai_question_6_answer }}}}` |  |
| A.I. Question 7 | `{{{{ custom_values.ai_question_7 }}}}` |  |
| A.I. Question 7 Answer | `{{{{ custom_values.ai_question_7_answer }}}}` |  |
| A.I. Question 8 | `{{{{ custom_values.ai_question_8 }}}}` |  |
| A.I. Question 8 Answer | `{{{{ custom_values.ai_question_8_answer }}}}` |  |
| A.I. Question 9 | `{{{{ custom_values.ai_question_9 }}}}` |  |
| A.I. Question 9 Answer | `{{{{ custom_values.ai_question_9_answer }}}}` |  |
| Agent Email | `{{{{ custom_values.agent_email }}}}` |  |
| Ai Conversation Notes | `{{{{ custom_values.ai_conversation_notes }}}}` |  |
| AI Email Nurture Prompt | `{{{{ custom_values.ai_email_nurture_prompt }}}}` | Your job is to generate engaging monthly emails for the user's business. Conside |
| AI Intro Message | `{{{{ custom_values.ai_intro_message }}}}` |  |
| AI Personality | `{{{{ custom_values.ai_personality }}}}` |  |
| Ai Prompt 2 Booking | `{{{{ custom_values.ai_prompt_2_booking }}}}` | You are {{custom_values.a_i_agent_name}}. A warm lead needs to be booked. This i |
| AI Prompt Booking Alt | `{{{{ custom_values.ai_prompt_booking_alt }}}}` |  |
| Ai Prompt Follow Up | `{{{{ custom_values.ai_prompt_follow_up }}}}` | You are {{custom_values.a_i_agent_name}}. This lead has not responded. You are n |
| Ai Prompt Inbound | `{{{{ custom_values.ai_prompt_inbound }}}}` | You are {{custom_values.a_i_agent_name}}, AI assistant for {{location.name}}. Yo |
| Ai Prompt Partnership | `{{{{ custom_values.ai_prompt_partnership }}}}` | You are {{custom_values.a_i_agent_name}}, reaching out about a potential partner |
| AI Special Skills | `{{{{ custom_values.ai_special_skills }}}}` |  |
| AI Status | `{{{{ custom_values.ai_status }}}}` |  |
| AI Tone | `{{{{ custom_values.ai_tone }}}}` |  |
| AI Voice Preference | `{{{{ custom_values.ai_voice_preference }}}}` |  |
| ai_goals | `{{{{ custom_values.ai_goals }}}}` | PRIMARY GOAL: Qualify leads and book discovery calls. SECONDARY GOAL: Nurture un |
| ai_id_after_hours_bot | `{{{{ custom_values.ai_id_after_hours_bot }}}}` |  |
| ai_id_appointment_confirmation_bot | `{{{{ custom_values.ai_id_appointment_confirmation_bot }}}}` |  |
| ai_id_follow_up_bot | `{{{{ custom_values.ai_id_follow_up_bot }}}}` |  |
| ai_id_missed_call_text_back | `{{{{ custom_values.ai_id_missed_call_text_back }}}}` |  |
| ai_id_new_lead_bot | `{{{{ custom_values.ai_id_new_lead_bot }}}}` |  |
| ai_id_no_show_bot | `{{{{ custom_values.ai_id_no_show_bot }}}}` |  |
| ai_id_objection_handler_bot | `{{{{ custom_values.ai_id_objection_handler_bot }}}}` |  |
| ai_id_partnership_bot | `{{{{ custom_values.ai_id_partnership_bot }}}}` |  |
| ai_id_personal_assistant_bot | `{{{{ custom_values.ai_id_personal_assistant_bot }}}}` |  |
| ai_id_pre_qualification_bot | `{{{{ custom_values.ai_id_pre_qualification_bot }}}}` |  |
| ai_id_reactivation_bot | `{{{{ custom_values.ai_id_reactivation_bot }}}}` |  |
| ai_id_recruitment_bot | `{{{{ custom_values.ai_id_recruitment_bot }}}}` |  |
| ai_id_review_request_bot | `{{{{ custom_values.ai_id_review_request_bot }}}}` |  |
| ai_id_web_chat_bot | `{{{{ custom_values.ai_id_web_chat_bot }}}}` |  |
| ai_rules | `{{{{ custom_values.ai_rules }}}}` | 1. Always address leads by first name. 2. Never send more than 5 follow-up messa |
| Application Link | `{{{{ custom_values.application_link }}}}` |  |
| Area | `{{{{ custom_values.area }}}}` |  |
| Billing Email | `{{{{ custom_values.billing_email }}}}` |  |
| Billing Phone Number | `{{{{ custom_values.billing_phone_number }}}}` |  |
| Business Name | `{{{{ custom_values.business_name }}}}` |  |
| Business Niche | `{{{{ custom_values.business_niche }}}}` |  |
| Business Registration Number | `{{{{ custom_values.business_registration_number }}}}` |  |
| Business Registration Type | `{{{{ custom_values.business_registration_type }}}}` |  |
| Calendar ID | `{{{{ custom_values.calendar_id }}}}` | 2vzlktJN4NF20ebWC91r |
| Calendar ID Follow Up | `{{{{ custom_values.calendar_id_follow_up }}}}` |  |
| Calendar ID Partnership | `{{{{ custom_values.calendar_id_partnership }}}}` |  |
| Calendar ID Personal | `{{{{ custom_values.calendar_id_personal }}}}` |  |
| Calendar ID Recruitment | `{{{{ custom_values.calendar_id_recruitment }}}}` |  |
| Calendar ID Team | `{{{{ custom_values.calendar_id_team }}}}` |  |
| calendar_follow_up_link | `{{{{ custom_values.calendar_follow_up_link }}}}` |  |
| City | `{{{{ custom_values.city }}}}` |  |
| Client Onboarding Funnel | `{{{{ custom_values.client_onboarding_funnel }}}}` |  |
| Color Code (Hex) | `{{{{ custom_values.color_code_hex }}}}` |  |
| Company Address | `{{{{ custom_values.company_address }}}}` |  |
| Company Logo | `{{{{ custom_values.company_logo }}}}` |  |
| Company Logo Alt | `{{{{ custom_values.company_logo_alt }}}}` |  |
| Company Name | `{{{{ custom_values.company_name }}}}` |  |
| Company Phone | `{{{{ custom_values.company_phone }}}}` |  |
| Company Primary Hex Color | `{{{{ custom_values.company_primary_hex_color }}}}` |  |
| Company Secondary Hex Color | `{{{{ custom_values.company_secondary_hex_color }}}}` |  |
| Company Slogan | `{{{{ custom_values.company_slogan }}}}` |  |
| Compliance Disclaimer | `{{{{ custom_values.compliance_disclaimer }}}}` |  |
| Country | `{{{{ custom_values.country }}}}` |  |
| Digital Phone Number | `{{{{ custom_values.digital_phone_number }}}}` |  |
| Digital Phone Number Alt | `{{{{ custom_values.digital_phone_number_alt }}}}` |  |
| ElevenLabs Upgrade Path | `{{{{ custom_values.elevenlabs_upgrade_path }}}}` | ELEVENLABS PREMIUM VOICE UPGRADE PATH: When client upgrades to ElevenLabs premiu |
| Email Signature | `{{{{ custom_values.email_signature }}}}` |  |
| Event Page | `{{{{ custom_values.event_page }}}}` |  |
| Follow Up Calendar Link | `{{{{ custom_values.follow_up_calendar_link }}}}` |  |
| General | `{{{{ custom_values.ai_prompt_1_general }}}}` | You are {{custom_values.a_i_agent_name}}, AI assistant for {{location.name}}.  R |
| Google Review Link | `{{{{ custom_values.google_review_link }}}}` |  |
| Headshot | `{{{{ custom_values.headshot }}}}` |  |
| Inbound Assistant | `{{{{ custom_values.inbound_assistant }}}}` |  |
| Inbound Prequalify Bot | `{{{{ custom_values.inbound_prequalify_bot }}}}` |  |
| Inbound Reception Bot | `{{{{ custom_values.inbound_reception_bot }}}}` |  |
| Intro Message | `{{{{ custom_values.intro_message }}}}` |  |
| Knowledge Link 1 | `{{{{ custom_values.knowledge_link_1 }}}}` |  |
| Knowledge Link 2 | `{{{{ custom_values.knowledge_link_2 }}}}` |  |
| Knowledge Link 3 | `{{{{ custom_values.knowledge_link_3 }}}}` |  |
| Knowledge Link 4 | `{{{{ custom_values.knowledge_link_4 }}}}` |  |
| License Number | `{{{{ custom_values.license_number }}}}` |  |
| Main Landing Page | `{{{{ custom_values.main_landing_page }}}}` |  |
| Main Landing Page Link | `{{{{ custom_values.main_landing_page_link }}}}` |  |
| My Calendar | `{{{{ custom_values.my_calendar }}}}` |  |
| Niche | `{{{{ custom_values.niche }}}}` |  |
| No Show | `{{{{ custom_values.ai_prompt_no_show }}}}` | You are {{custom_values.a_i_agent_name}}. A lead booked an appointment but did n |
| Not Qualified Details | `{{{{ custom_values.not_qualified_details }}}}` |  |
| Not Qualified Page | `{{{{ custom_values.not_qualified_page }}}}` |  |
| not_qualified_landing_page | `{{{{ custom_values.not_qualified_landing_page }}}}` |  |
| Old Lead Resurrection | `{{{{ custom_values.ai_prompt_old_lead_resurrection }}}}` | You are {{custom_values.a_i_agent_name}}. This is a cold lead. Resurrect the rel |
| OpenAI Prompt | `{{{{ custom_values.openai_prompt }}}}` |  |
| Outbound Application Reminder Bot | `{{{{ custom_values.outbound_application_reminder_bot }}}}` |  |
| Outbound Assistant | `{{{{ custom_values.outbound_assistant }}}}` |  |
| Outbound Booking Reminder Bot | `{{{{ custom_values.outbound_booking_reminder_bot }}}}` |  |
| Outbound Document Reminder Bot | `{{{{ custom_values.outbound_document_reminder_bot }}}}` |  |
| Outbound New Client Bot | `{{{{ custom_values.outbound_new_client_bot }}}}` |  |
| Outbound Pre Qualify Bot | `{{{{ custom_values.outbound_pre_qualify_bot }}}}` |  |
| Outbound Rebook Bot | `{{{{ custom_values.outbound_rebook_bot }}}}` |  |
| Outbound Referral Request Bot | `{{{{ custom_values.outbound_referral_request_bot }}}}` |  |
| Outbound Review Request Bot | `{{{{ custom_values.outbound_review_request_bot }}}}` |  |
| Partnership Calendar Link | `{{{{ custom_values.partnership_calendar_link }}}}` |  |
| Payment Page | `{{{{ custom_values.payment_page }}}}` |  |
| Prequalifying Form Link | `{{{{ custom_values.prequalifying_form_link }}}}` |  |
| Privacy Policy | `{{{{ custom_values.privacy_policy }}}}` |  |
| Privacy Policy Page | `{{{{ custom_values.privacy_policy_page }}}}` |  |
| Product Service 1 | `{{{{ custom_values.product_service_1 }}}}` |  |
| Product Service 10 | `{{{{ custom_values.product_service_10 }}}}` |  |
| Product Service 2 | `{{{{ custom_values.product_service_2 }}}}` |  |
| Product Service 3 | `{{{{ custom_values.product_service_3 }}}}` |  |
| Product Service 4 | `{{{{ custom_values.product_service_4 }}}}` |  |
| Product Service 5 | `{{{{ custom_values.product_service_5 }}}}` |  |
| Product Service 6 | `{{{{ custom_values.product_service_6 }}}}` |  |
| Product Service 7 | `{{{{ custom_values.product_service_7 }}}}` |  |
| Product Service 8 | `{{{{ custom_values.product_service_8 }}}}` |  |
| Product Service 9 | `{{{{ custom_values.product_service_9 }}}}` |  |
| Proposal Follow Up | `{{{{ custom_values.ai_prompt_application_follow_up }}}}` | You are {{custom_values.a_i_agent_name}}. A proposal has been sent. They have no |
| Province or State | `{{{{ custom_values.province_or_state }}}}` |  |
| Qualified Booking Link | `{{{{ custom_values.qualified_booking_link }}}}` |  |
| Qualified Details | `{{{{ custom_values.qualified_details }}}}` |  |
| Qualified Landing Page | `{{{{ custom_values.qualified_landing_page }}}}` |  |
| Qualified Page | `{{{{ custom_values.qualified_page }}}}` |  |
| Reactivation Message | `{{{{ custom_values.reactivation_message }}}}` | Hey {{contact.first_name}} - it has been a while! I wanted to check in and see i |
| Recruitment | `{{{{ custom_values.ai_recruitment_prompt }}}}` | You are {{custom_values.a_i_agent_name}}, handling recruitment for {{location.na |
| Recruitment Calendar | `{{{{ custom_values.recruitment_calendar }}}}` |  |
| Recruitment Form Link | `{{{{ custom_values.recruitment_form_link }}}}` |  |
| Recruitment Landing Page | `{{{{ custom_values.recruitment_landing_page }}}}` |  |
| Recruitment Link | `{{{{ custom_values.recruitment_link }}}}` |  |
| Recruitment Page | `{{{{ custom_values.recruitment_page }}}}` |  |
| Referral Form Link | `{{{{ custom_values.referral_form_link }}}}` |  |
| Referral Incentive Details | `{{{{ custom_values.referral_incentive_details }}}}` |  |
| Referral Link | `{{{{ custom_values.referral_link }}}}` |  |
| Referral Request | `{{{{ custom_values.ai_prompt_referral_request }}}}` | You are {{custom_values.a_i_agent_name}}. This contact is a past client or warm  |
| Review Request | `{{{{ custom_values.ai_prompt_google_review_request }}}}` | You are {{custom_values.a_i_agent_name}}. This contact is a happy client. Ask th |
| Sales Email | `{{{{ custom_values.sales_email }}}}` |  |
| Sales Phone | `{{{{ custom_values.sales_phone }}}}` |  |
| Scorecard Interview Calendar | `{{{{ custom_values.scorecard_interview }}}}` |  |
| Service Area | `{{{{ custom_values.service_area }}}}` |  |
| Short Address | `{{{{ custom_values.short_address }}}}` |  |
| Support Email | `{{{{ custom_values.support_email }}}}` |  |
| Support Phone | `{{{{ custom_values.support_phone }}}}` |  |
| Target Market | `{{{{ custom_values.target_market }}}}` |  |
| Team Onboarding Funnel | `{{{{ custom_values.team_onboarding_funnel }}}}` |  |
| Team Onboarding Survey | `{{{{ custom_values.team_onboarding_survey }}}}` |  |
| Terms and Conditions Page | `{{{{ custom_values.terms_and_conditions_page }}}}` |  |
| Terms of Service | `{{{{ custom_values.terms_of_service }}}}` |  |
| timezone | `{{{{ custom_values.timezone }}}}` |  |
| User About Paragraph | `{{{{ custom_values.user_about_paragraph }}}}` |  |
| User Business Description | `{{{{ custom_values.user_business_description }}}}` |  |
| User Email | `{{{{ custom_values.user_email }}}}` |  |
| User First Name | `{{{{ custom_values.user_first_name }}}}` |  |
| User Full Name | `{{{{ custom_values.user_full_name }}}}` |  |
| User Job Title | `{{{{ custom_values.user_job_title }}}}` |  |
| User Job Title Display | `{{{{ custom_values.user_job_title_display }}}}` |  |
| User SMS Signature | `{{{{ custom_values.user_sms_signature }}}}` |  |
| User Website | `{{{{ custom_values.user_website }}}}` |  |
| Webinar Date | `{{{{ custom_values.webinar_date }}}}` |  |
| Webinar Link | `{{{{ custom_values.webinar_link }}}}` |  |
| Webinar Name | `{{{{ custom_values.webinar_name }}}}` |  |
| Webinar Time | `{{{{ custom_values.webinar_time }}}}` |  |

## ABC — Tags (55)

- `active client`
- `application-complete`
- `application-sent`
- `appointment booked`
- `approved`
- `call-dropped`
- `call-transfer-failed`
- `call-transfer-success`
- `closing`
- `cold lead`
- `conditional-approval`
- `contacted`
- `documents-complete`
- `documents-requested`
- `funded`
- `hot lead`
- `intake started`
- `long-term-nurture`
- `new client`
- `new lead`
- `no show`
- `no-show-3-attempts`
- `not qualified`
- `nurture-no-booking`
- `nurture-no-form`
- `onboarding complete`
- `past client`
- `pending review`
- `pre-qualified`
- `proposal sent`
- `qualified`
- `re-engaged`
- `referral given`
- `referral-received`
- `review requested`
- `sales-follow-up`
- `source: cold outreach`
- `source: event`
- `source: facebook`
- `source: google ads`
- `source: instagram`
- `source: linkedin`
- `source: other`
- `source: referral`
- `source: tiktok`
- `source: twitter/x`
- `source: website`
- `source: youtube`
- `spam`
- `submitted-to-lender`
- `unresponsive`
- `vip client`
- `voice-call-complete`
- `voice-call-needed`
- `warm lead`

---

# EQUITYMAX (Live Mortgage Account — Layer 2 source)
**Location ID:** `OBmMdqdnPLZvVyHloFly`  
**API key:** `pit-80be1184-3cbd-4dfb-b25d-6fdb8298c8ae`  
**⚠️ LIVE — do not trigger workflows. Read/copy only.**

## EqM — Custom Fields (389)

| Name | Key | Type | Options |
|---|---|---|---|
|  Do you have a name you would like us to call them ? | `contact.do_you_have_a_name_you_would_like_us_to_call_them_` | TEXT |  |
|  Do you prefer a man or woman AI voice ? | `contact.do_you_prefer_a_man_or_woman_ai_voice_` | TEXT |  |
|  Is there anything extra you think we should know  | `contact.is_there_anything_extra_you_think_we_should_know` | LARGE_TEXT |  |
|  Product/Service 10 | `contact.productservice_10` | TEXT |  |
|  Product/Service 3 | `contact.productservice_3` | TEXT |  |
|  Product/Service 4 | `contact.productservice_4` | TEXT |  |
|  Product/Service 5 | `contact.productservice_5` | TEXT |  |
|  Product/Service 6 | `contact.productservice_6` | TEXT |  |
|  Product/Service 7 | `contact.productservice_7` | TEXT |  |
|  Product/Service 8 | `contact.productservice_8` | TEXT |  |
|  Product/Service 9 | `contact.productservice_9` | TEXT |  |
| (OPTIONAL) Lastly, please create a loom video walking through why you're a good fit for this position. | `contact.optional_lastly_please_create_a_loom_video_walking_through_why_youre_a_good_fit_for_this_position` | LARGE_TEXT |  |
| A. I. Partnership Question 1 | `contact.a_i_partnership_question_1` | TEXT |  |
| A. I. Partnership Question 1 (Answer ) | `contact.a_i_partnership_question_1_answer_` | TEXT |  |
| A. I. Partnership Question 2 | `contact.a_i_partnership_question_2` | TEXT |  |
| A. I. Partnership Question 2 (Answer ) | `contact.a_i_partnership_question_2_answer_` | TEXT |  |
| A. I. Partnership Question 3 | `contact.a_i_partnership_question_3` | TEXT |  |
| A. I. Partnership Question 3 ( Answer ) | `contact.a_i_partnership_question_3__answer_` | TEXT |  |
| A. I. Partnership Question 4 | `contact.a_i_partnership_question_4` | TEXT |  |
| A. I. Partnership Question 4 ( Answer ) | `contact.a_i_partnership_question_4__answer_` | TEXT |  |
| A. I. Partnership Question 5 | `contact.a_i_partnership_question_5` | TEXT |  |
| A. I. Partnership Question 5 (Answer ) | `contact.a_i_partnership_question_5_answer_` | TEXT |  |
| A. I. Question 9  | `contact.a_i_question_9` | TEXT |  |
| A. I. Recruitment Question 1 | `contact.a_i_recruitment_question_1` | TEXT |  |
| A. I. Recruitment Question 1 (Answer ) | `contact.a_i_recruitment_question_1_answer_` | TEXT |  |
| A. I. Recruitment Question 2 | `contact.a_i_recruitment_question_2` | TEXT |  |
| A. I. Recruitment Question 2 (Answer) | `contact.a_i_recruitment_question_2_answer` | TEXT |  |
| A. I. Recruitment Question 3 | `contact.a_i_recruitment_question_3` | TEXT |  |
| A. I. Recruitment Question 3 ( Answer ) | `contact.a_i_recruitment_question_3__answer_` | TEXT |  |
| A. I. Recruitment Question 4 | `contact.a_i_recruitment_question_4` | TEXT |  |
| A. I. Recruitment Question 4 (Answer ) | `contact.a_i_recruitment_question_4_answer_` | TEXT |  |
| A. I. Recruitment Question 5 | `contact.a_i_recruitment_question_5` | TEXT |  |
| A. I. Recruitment Question 5 (Answer ) | `contact.a_i_recruitment_question_5_answer_` | TEXT |  |
| A.I Question 6 ( Answer) | `contact.ai_question_6__answer` | TEXT |  |
| A.I Tone | `contact.ai_tone` | RADIO | Upbeat (higher pitched ) / Professional (confident ) / calm ( smooth ) / casual |
| A.I. Intro | `contact.ai_intro` | TEXT |  |
| A.I. Job Title | `contact.ai_job_title` | TEXT |  |
| A.I. Name | `contact.ai_name` | TEXT |  |
| A.I. Notes | `contact.ai_notes` | LARGE_TEXT |  |
| A.I. Question 1 | `contact.ai_question_1` | TEXT |  |
| A.I. Question 1 - (Answer) | `contact.ai_question_1__answer` | TEXT |  |
| A.I. Question 10 | `contact.ai_question_10` | TEXT |  |
| A.I. Question 10 (Answer) | `contact.ai_question_10_answer` | TEXT |  |
| A.I. Question 2 | `contact.ai_question_2` | TEXT |  |
| A.I. Question 2 - (Answer) | `contact.ai_question_2__answer` | TEXT |  |
| A.I. Question 3 | `contact.ai_question_3` | TEXT |  |
| A.I. Question 3 - (Answer) | `contact.ai_question_3__answer` | TEXT |  |
| A.I. Question 4 | `contact.ai_question_4` | TEXT |  |
| A.I. Question 4 - (Answer) | `contact.ai_question_4__answer` | TEXT |  |
| A.I. Question 5 | `contact.ai_question_5` | TEXT |  |
| A.I. Question 5 - (Answer) | `contact.ai_question_5__answer` | TEXT |  |
| A.I. Question 6 | `contact.ai_question_6` | TEXT |  |
| A.I. Question 7  | `contact.ai_question_7` | TEXT |  |
| A.I. Question 7 (Answer) | `contact.ai_question_7_answer` | TEXT |  |
| A.I. Question 8 | `contact.ai_question_8` | TEXT |  |
| A.I. Question 8 - (Answer) | `contact.ai_question_8__answer` | TEXT |  |
| A.I. Question 9 - ( Answer) | `contact.ai_question_9___answer` | TEXT |  |
| A.I. Special Skills (optional ) | `contact.ai_special_skills_optional_` | LARGE_TEXT |  |
| Additional Comments | `contact.additional_comments` | LARGE_TEXT |  |
| Agent ID | `contact.agent_id` | TEXT |  |
| ai appointment reminder | `contact.ai_appointment_reminder` | LARGE_TEXT |  |
| Ai Booking Inbound | `contact.ai_booking_inbound` | LARGE_TEXT |  |
| ai follow up | `contact.ai_follow_up` | LARGE_TEXT |  |
| AI Goals | `contact.ai_goals` | LARGE_TEXT |  |
| AI Human Verified | `contact.ai_human_verified` | CHECKBOX | Yes |
| AI ID - Application Reminder | `contact.ai_id__application_reminder` | TEXT |  |
| AI ID - Appointment Book | `contact.ai_id__appointment_book` | TEXT |  |
| AI ID - Client | `contact.ai_id__client` | TEXT |  |
| AI ID - Document Reminder | `contact.ai_id__document_reminder` | TEXT |  |
| AI ID - Follow Up | `contact.ai_id__follow_up` | TEXT |  |
| AI ID - Google Review | `contact.ai_id__google_review` | TEXT |  |
| AI ID - Inbound New Lead | `contact.ai_id__inbound_new_lead` | TEXT |  |
| AI ID - No Show Rebook | `contact.ai_id__no_show_rebook` | TEXT |  |
| AI ID - Outbound New Lead | `contact.ai_id__outbound_new_lead` | TEXT |  |
| AI ID - Partnership | `contact.ai_id__partnership` | TEXT |  |
| AI ID - Personal Assistant | `contact.ai_id__personal_assistant` | TEXT |  |
| AI ID - Recruitment | `contact.ai_id__recruitment` | TEXT |  |
| AI ID - Referral Request | `contact.ai_id__referral_request` | TEXT |  |
| AI ID - Reminder | `contact.ai_id__reminder` | TEXT |  |
| Ai Inbound | `contact.ai_inbound` | LARGE_TEXT |  |
| AI Knowledge Link 1 | `contact.ai_knowledge_link_1` | TEXT |  |
| AI Knowledge Link 2 | `contact.ai_knowledge_link_2` | TEXT |  |
| AI Knowledge Link 3 | `contact.ai_knowledge_link_3` | TEXT |  |
| AI Knowledge Link 4 | `contact.ai_knowledge_link_4` | TEXT |  |
| AI Knowledge Link 5 | `contact.ai_knowledge_link_5` | TEXT |  |
| Ai partnership | `contact.ai_partnership` | LARGE_TEXT |  |
| AI Prompt Customer Service | `contact.ai_prompt_customer_service` | LARGE_TEXT |  |
| AI Prompt Prequalify | `contact.ai_prompt_prequalify` | LARGE_TEXT |  |
| ai referral request | `contact.ai_referral_request` | LARGE_TEXT |  |
| AI Rules | `contact.ai_rules` | LARGE_TEXT |  |
| AI Status | `contact.bot_status` | SINGLE_OPTIONS | AI On / AI Off |
| AI. Personality | `contact.ai_personality` | SINGLE_OPTIONS | highly focused, professional , and efficient / friendly & knowledgeable expert / upbeat, energetic, and knowledgeable / friendly and casual (uses emojis ) |
| Amortization | `contact.amortization` | NUMERICAL |  |
| Annual Income: | `contact.annual_income` | NUMERICAL |  |
| Annual Salary (Website) | `contact.annual_salary_website` | MONETORY |  |
| Any Other Debts? What is The Total ? | `contact.any_other_debts_what_is_the_total_` | MONETORY |  |
| Application API Key | `contact.application_api_key` | TEXT |  |
| Application Link | `contact.application_link` | TEXT |  |
| Approval Amount | `contact.approval_amount` | MONETORY |  |
| Approval Status | `contact.approval_status` | TEXT |  |
| Approved LTV | `contact.approved_ltv` | NUMERICAL |  |
| Are you 100% able to show up at the time you selected? (We do NOT offer reschedules - if you no show then our internal system automatically blocks your IP address from being able to rebook) | `contact.are_you_100_able_to_show_up_at_the_time_you_selected_we_do_not_offer_reschedules__if_you_no_show_then_our_internal_system_automatically_blocks_your_ip_address_from_being_able_to_rebook` | RADIO | Yes I will 100% show up / No I will not show and I don't want to book again |
| Are You A Buyer or Seller | `contact.are_you_a_buyer_or_seller` | RADIO | Yes / No |
| Are you a first time buyer ? | `contact.are_you_a_first_time_buyer_` | SINGLE_OPTIONS | Yes / No |
| Are you A first time buyer? | `contact.are_you_a_first_time_buyer` | RADIO | Yes / No |
| Are you available full-time? | `contact.are_you_available_fulltime` | LARGE_TEXT |  |
| Are you currently licensed ? | `contact.are_you_currently_licensed_` | SINGLE_OPTIONS | No / Yes / n/a |
| Are you looking for more information on joining our company and using new innovated tools to grow your business? | `contact.are_you_looking_for_more_information_on_joining_our_company_and_using_new_innovated_tools_to_grow_your_business` | SINGLE_OPTIONS | No / Yes |
| Are you self-employed? | `contact.are_you_self_employed` | RADIO | Yes / No |
| Are you sure there’s no other debts to calculate? | `contact.are_you_sure_theres_no_other_debts_to_calculate` | SINGLE_OPTIONS | Yes / No |
| Average Talk Time Per Call | `contact.average_talk_time_per_call` | NUMERICAL |  |
| Bankruptcy, Consumer Proposal OR Foreclosure In The Last 7 Years: | `contact.bankruptcy_consumer_proposal_or_foreclosure_in_the_last_7_years` | CHECKBOX | No / Bankruptcy / Consumer Proposal / Foreclosure |
| Bath | `contact.bath` | NUMERICAL |  |
| Bathroom | `contact.bathroom` | SINGLE_OPTIONS | 1 Bath / 1.5 Bath / 2 Bath / 2.5 Bath / 3 Bath … |
| Bathrooms (Website) | `contact.bathrooms_website` | TEXT |  |
| Bed | `contact.bed` | NUMERICAL |  |
| Bedroom | `contact.bedroom` | CHECKBOX | Bachlor / 1 Bed / 1 Bed + Den / 2 Bed / 2 Bed + Den … |
| Bedrooms | `contact.bedrooms` | MULTIPLE_OPTIONS | Bachlor / 1 Bed / 1 Bed + Den / 2 Bed / 2 Bed + Den … |
| Bedrooms (Website) | `contact.bedrooms_website` | TEXT |  |
| Best Time To Call | `contact.best_time_to_call` | TEXT |  |
| Birthday | `contact.birthday` | DATE |  |
| Budget (Website) | `contact.budget_website` | MONETORY |  |
| Business Digital Phone Number  | `contact.business_digital_phone_number` | TEXT |  |
| Business Document | `contact.business_document` | FILE_UPLOAD |  |
| Business Headshot | `contact.business_headshot` | FILE_UPLOAD |  |
| Business Hex Colour Code Secondary  Number  (optional) | `contact.business_hex_colour_code_secondary_number_optional` | TEXT |  |
| Business Logo | `contact.business_logo` | FILE_UPLOAD |  |
| Business Name | `contact.business_name` | TEXT |  |
| Business Niche | `contact.business_niche` | TEXT |  |
| Business Offer | `contact.offer` | TEXT |  |
| Business Primary Hex Code Colour Number (optional ) | `contact.business_primary_hex_code_colour_number_optional_` | TEXT |  |
| Business Registration ID Type | `contact.business_registration_id_type` | SINGLE_OPTIONS | EIN / CCN |
| Business Registration Number (EIN/CCN) | `contact.business_registration_number` | NUMERICAL |  |
| Business Revenue | `contact.business_revenue` | TEXT |  |
| Buyer Or Seller | `contact.buyer_or_seller` | MULTIPLE_OPTIONS | Buyer / Seller |
| Buyer or Seller ? | `contact.buyer_or_seller_` | SINGLE_OPTIONS | Buyer / Seller |
| Calendar ID | `contact.calendar_id` | TEXT |  |
| Calendar Link | `contact.calendar_link` | TEXT |  |
| Call Appointment Booked | `contact.appointment_booked` | SINGLE_OPTIONS | Yes / No |
| Call Attempts | `contact.call_attempts` | NUMERICAL |  |
| Call Duration | `contact.call_duration` | NUMERICAL |  |
| Call How Soon Need Funding | `contact.call_how_soon_need_funding` | MULTIPLE_OPTIONS | now / 1 to 2 months / 3 to 6 months / 6 to 8 months / 12 months … |
| Call Inbound Options Call | `contact.inbound_call` | SINGLE_OPTIONS | New Lead To Qualify / Appointment Booked / Appointment Reminder / Appointment Call Transfer / Referral Inquiry … |
| Call Loan To Value | `contact.call_loan_to_value` | NUMERICAL |  |
| Call Mortgage Amount Requested | `contact.call_mortgage_amount_requested` | MONETORY |  |
| Call Outcome | `contact.call_outcome` | TEXT |  |
| Call Pick Ups | `contact.call_pick_ups` | NUMERICAL |  |
| Call Qualified | `contact.call_qualified` | SINGLE_OPTIONS | Yes / No |
| Call Recording | `contact.call_recording` | TEXT |  |
| Call Success | `contact.call_success` | SINGLE_OPTIONS | Yes / No |
| Call Summary | `contact.call_summary` | LARGE_TEXT |  |
| Call Type of Property | `contact.call_type_of_property` | MULTIPLE_OPTIONS | condo / townhouse / detached / commercial building |
| Campaign | `contact.campaign` | TEXT |  |
| Cash Requested | `contact.cash_requested` | MONETORY |  |
| Choose how your home is being used | `contact.choose_how_your_home_is_being_used` | RADIO | Primary Residence / Vacation Home / Investment Property |
| City Of Property | `contact.city_of_property` | TEXT |  |
| Client Notes | `contact.client_notes` | LARGE_TEXT |  |
| Close Date | `contact.close_date` | DATE |  |
| Closing Date | `contact.loan_closing` | DATE |  |
| Comments | `contact.comments` | LARGE_TEXT |  |
| Comments: | `contact.commentsornotes` | LARGE_TEXT |  |
| Company Website (put "na" if none) | `contact.company_website_put_na_if_none` | TEXT |  |
| Conditions List | `contact.conditions_list` | LARGE_TEXT |  |
| Condo Project Name | `contact.condo_project_name` | TEXT |  |
| Credit Card | `credit_card_amount_in_us_type_a_number_please` | MONETORY |  |
| Credit Score | `contact.credit_score` | CHECKBOX | Needs Work ( Below 600) / Fair (600-659) / Good (660-719) / Very Good (720-779) / Excellent (more than 780) |
| Credit Score Range | `contact.credit_score_range` | TEXT |  |
| Current Interest Rate | `contact.contactcurrent_interest_rate` | NUMERICAL |  |
| Date | `contact.date` | DATE |  |
| Desired Loan Amount: | `contact.desired_loan_amount` | TEXT |  |
| Do you have a second mortgage or a home equity line of credit on this property? | `contact.do_you_have_a_second_mortgage_or_a_home_equity_line_of_credit_on_this_property` | RADIO | Yes / No |
| Do you have any Car loan ? | `contact.do_you_have_any_car_loan_` | SINGLE_OPTIONS | Yes / No |
| Do you have any Credit Card Debts ? | `contact.do_you_have_any_credit_card_loan_` | SINGLE_OPTIONS | Yes / No |
| Do you have any debts like mortgage ? | `contact.do_you_have_any_debts_like_mortgage_` | SINGLE_OPTIONS | Yes / No |
| Do you qualify for a VA loan? | `contact.do_you_qualify_for_a_va_loan` | RADIO | Yes / No |
| Do you qualify for VA loans? | `contact.do_you_qualify_for_va_loans` | RADIO | Yes / No |
| Down Payment (Website) | `contact.down_payment_website` | MONETORY |  |
| Down Payment Amount: | `contact.down_payment_amount` | NUMERICAL |  |
| Employment Status (Website) | `contact.employment_status_website` | TEXT |  |
| Estimated property value  | `contact.estimated_property_value` | MONETORY |  |
| Estimated value of your home | `contact.estimated_value_of_your_home` | MONETORY |  |
| Features | `contact.features` | TEXT |  |
| First time buyer ? | `contact.first_time_buyer` | RADIO | Yes / No |
| Follow Up Calendar Link | `contact.follow_up_calendar_link` | TEXT |  |
| Follow Up Date | `contact.follow_up_date` | DATE |  |
| Follow Up Date | `contact.follow_up_dates` | DATE |  |
| Follow Up Reason | `contact.follow_up_reason` | TEXT |  |
| Google Review Link | `contact.google_review_link` | TEXT |  |
| Have A Mortgage On This Property | `contact.have_a_mortgage_on_this_property` | CHECKBOX | 1 Mortgage / 2 Mortgages / 3 Mortgages |
| Have you already been prequalified for a mortgage ? | `contact.have_you_already_been_prequalified_for_a_mortgage_` | SINGLE_OPTIONS | Yes / No |
| Have You Been Pre Approved For A Mortgage? | `contact.have_you_been_pre_approved_for_a_mortgage` | MULTIPLE_OPTIONS | No, I need help getting intouch with a mortgage professional / Yes, I have |
| Have you had a foreclosure, short sale or bankruptcy in the last 7 years? | `contact.have_you_had_a_foreclosure_short_sale_or_bankruptcy_in_the_last_7_years` | RADIO | Yes / No |
| Headshot | `contact.headshot` | FILE_UPLOAD |  |
| Home Worth | `contact.home_worth` | CHECKBOX | $300,001-$600,000 / $600,000-$700,000 / $700,000-$800,000 / $800,000-$900,000 / $900,000-$1,000,000 … |
| Household Income | `contact.house_income` | MONETORY |  |
| How Many Baths ? | `contact.how_many_baths` | MULTIPLE_OPTIONS | 1 / 1.5 / 2 / 2.5 / 3 … |
| How Many Bedrooms ? | `contact.how_many_bedrooms` | MULTIPLE_OPTIONS | Bachlor / 1 Bedroom / 1 +Den / 2 Bedroom / 2 + Den … |
| How Many Calls Per Day ? | `contact.how_many_calls_per_day_` | NUMERICAL |  |
| How Much Equity Are You Requesting? | `contact.how_much_equity_are_you_requesting` | MONETORY |  |
| How Much Have You Closed Last Year ? | `contact.how_much_have_you_closed_last_year_` | SINGLE_OPTIONS | 0-$100,000 / $100,000- $300,000 / $300,000- $500,000 / $500,000-$1,000,000 / $1,000,000-$2,000,000 … |
| How Much Is Home Worth ? | `contact.how_much_is_home_worth` | NUMERICAL |  |
| How Much Is Your Home Currently Worth? | `contact.how_much_is_your_home_currently_worth` | MONETORY |  |
| How Much Is Your Home Worth? | `contact.how_much_is_your_home_worth` | MONETORY |  |
| How Much Money Do You Want To Borrow | `contact.how_much_money_do_you_want_to_borrow` | CHECKBOX | $100,000 / $200,000 / $300,000 / $400,000 / $500,000 … |
| How much would you like to borrow? | `contact.how_much_would_you_like_to_borrow` | NUMERICAL |  |
| How soon are you looking to get access to funds ? | `contact.how_soon_are_you_looking_to_get_access_to_funds_` | SINGLE_OPTIONS | Inside a month / Inside 3 months / Inside 6 months / Inside an year |
| How Soon Are You Thinking About Selling ? | `contact.how_soon_are_you_thinking_about_selling` | CHECKBOX | Now / 1-3 Months / 3-6 Months / 6-9 Months / 12 Months … |
| How Soon Are You Thinking To Purchase? | `contact.how_soon_are_you_thinking_to_purchase` | RADIO | Now / 1-3 Months / 3-6 Months / 6-9 Months / 9-12 Months … |
| How Soon Do You Need Financing ? | `contact.how_soon_do_you_need_financing_` | CHECKBOX | Immediately / Within 1-3 Months / Within 3-6 Months / Within 6-9 Months / Within 12 Months |
| How Soon Do You Need Funding ? | `contact.how_soon_do_you_need_funding_` | MULTIPLE_OPTIONS | Now / In  A Few Weeks / 1 Month / 1-3 Months / 3-6 Months … |
| How Soon Do You Need Funding? | `contact.how_soon_do_you_need_funding` | CHECKBOX | Now/Immediately / 2 Weeks / 30 Days / 60 Days |
| How Soon Were You Thinking about joining ? | `contact.how_soon_were_you_thinking_about_joining_` | SINGLE_OPTIONS | Just looking around / immediately / 1-3 months / 3-6 months |
| How will your home be used ? | `contact.how_will_your_home_be_used` | SINGLE_OPTIONS | Primary Residence / Vacation Home / Investment Property |
| If accepted, how soon can you get started? | `contact.if_accepted_how_soon_can_you_get_started` | LARGE_TEXT |  |
| If Yes How Much Were You Pre Approved For? | `if_yes_how_much_were_you_pre_approved_for` | NUMERICAL |  |
| If Yes How Much Were You Pre Approved For? | `contact.if_yes_how_much_were_you_pre_approved_for` | NUMERICAL |  |
| Interest Rate | `contact.interestrate` | NUMERICAL |  |
| Interest Rate | `contact.rate` | NUMERICAL |  |
| Interest Rate | `contact.interest_rate` | NUMERICAL |  |
| Intro Message | `contact.intro_message` | LARGE_TEXT |  |
| Is lead Wiling To Sign Seller / Buyer Agreement ? | `contact.is_lead_wiling_to_sign_seller_buyer_agreement` | CHECKBOX | Yes / No ( not qualified) |
| Is this your first home purchase? | `contact.is_this_your_first_home_purchase` | RADIO | Yes / No |
| Issue | `contact.issue` | LARGE_TEXT |  |
| Job Title | `contact.job_title` | TEXT |  |
| Lender | `contact.lender` | TEXT |  |
| Lender Name | `contact.lender_name` | TEXT |  |
| Lender Submitted Date | `contact.lender_submitted_date` | DATE |  |
| Lender's Name | `contact.lenders_name` | TEXT |  |
| License Number (optional ) | `contact.license_number_optional_` | TEXT |  |
| Loan Amount | `contact.loan_amount` | NUMERICAL |  |
| Loan Amount Requested | `contact.loan_amount_requested` | MONETORY |  |
| Loan Purpose | `contact.loanpurpose` | TEXT |  |
| Loan Purpose | `contact.loan_purpose` | TEXT |  |
| Loan Type | `contact.loan_type` | CHECKBOX | Purchase / Refinance / Private / Reverse / Commercial … |
| LTV | `contact.ltv` | NUMERICAL |  |
| LTV (Website) | `contact.ltv_website` | NUMERICAL |  |
| LTV % | `contact.ltv_` | NUMERICAL |  |
| LTV Math | `contact.score_ltv_math` | NUMERICAL |  |
| LTV Percentage | `contact.ltv_percentage` | NUMERICAL |  |
| LTV Percentage (Website) | `contact.ltv_percentage_website` | NUMERICAL |  |
| Maturity Date | `contact.maturity_date` | DATE |  |
| Max LTV (Website) | `contact.max_ltv_website` | NUMERICAL |  |
| Message Body | `contact.message_body` | LARGE_TEXT |  |
| Mortgage | `mortgage_amount_in_us_type_a_number_please` | MONETORY |  |
| Mortgage | `contact.mortgage` | MONETORY |  |
| Mortgage Amount | `contact.mortgage_amount` | MONETORY |  |
| Mortgage Balance | `contact.contactmortgage_balance` | MONETORY |  |
| Mortgage Balance | `contact.mortgage_balance` | MONETORY |  |
| Mortgage Purpose | `contact.mortgage_purpose` | TEXT |  |
| Mortgage Purpose (Purchase/Refi/etc) | `contact.mortgage_purpose_purchaserefietc` | TEXT |  |
| Mortgage Renewal Date | `contact.mortgage_renewal_date` | DATE |  |
| Mortgage Term (Years) | `contact.mortgage_term_years` | TEXT |  |
| Mortgage Term (Years) | `contact.contactmortgage_term` | NUMERICAL |  |
| Mortgage Type (Fixed/Variable) | `contact.mortgage_type_fixedvariable` | TEXT |  |
| Name Of Lender | `contact.name_of_lender` | TEXT |  |
| Need Cash ? How Much ? | `contact.need_extra_cash__how_much_` | MONETORY |  |
| NMLS# | `contact.nmls` | TEXT |  |
| Not Qualified | `contact.not_qualified` | LARGE_TEXT |  |
| Not Qualified Landing Page | `contact.not_qualified_landing_page` | TEXT |  |
| NOT Qualified Lead details | `contact.not_qualified_lead_details` | LARGE_TEXT |  |
| Not Qualified Partnership Lead Details   | `contact.not_qualified_partnership_lead_details` | LARGE_TEXT |  |
| Not Qualified Recruitment Details | `contact.not_qualified_recruitment_details` | LARGE_TEXT |  |
| Offer Calendar Link | `contact.offer_calendar` | TEXT |  |
| OpenAI Prompt | `contact.openai_prompt` | LARGE_TEXT |  |
| Outside Of Paying Debts Do You Want Extra Cash? | `contact.outside_of_paying_debts_do_you_want_extra_cash` | MONETORY |  |
| Over the age of 55 ? | `contact.if_they_are_over_the_age_of_55_` | SINGLE_OPTIONS | Yes / No |
| Partnership Calendar Link | `contact.partnership_calendar_link` | TEXT |  |
| Please walk me through your last 3 jobs or the past 5 years of your career. Please start with the third most recent and work your way to today. | `contact.please_walk_me_through_your_last_3_jobs_or_the_past_5_years_of_your_career_please_start_with_the_third_most_recent_and_work_your_way_to_today` | LARGE_TEXT |  |
| policy link | `contact.policy_link` | TEXT |  |
| Pre Qualified | `contact.pre_qualified` | MULTIPLE_OPTIONS | Yes / No |
| Pre Qualify Form Link | `contact.pre_qualify_form_link` | TEXT |  |
| Preferred Contact Method: | `contact.preferred_contact_method` | MULTIPLE_OPTIONS | Phone / Email / SMS |
| Product/Service 1 | `contact.productservice_1` | TEXT |  |
| Product/Service 2 | `contact.productservice_2` | TEXT |  |
| Product/Service Types Offered | `contact.service_types_offered` | CHECKBOX | {{contact.productservice_1}} / {{contact.productservice_2}} / {{contact.productservice_3}} / {{contact.productservice_4}} / {{contact.productservice_5 }} … |
| Products | `contact.products` | MULTIPLE_OPTIONS | Bruised Credit / Low Income / Self Employed ( low tax claims ) / Renovations / Fast emergency equity cash … |
| Property Address | `contact.property_address` | TEXT |  |
| Property Province | `contact.property_province` | TEXT |  |
| Property Purchase Price | `contact.property_purchase_price` | MONETORY |  |
| Property Type | `contact.property_type` | SINGLE_OPTIONS | Condo / Townhouse / Detached Home / Commercial |
| Property Type | `contact.what_type_of_property` | MULTIPLE_OPTIONS | Condo / Single Family / Multi-Family / Commercial |
| Property Type (Website) | `contact.property_type_website` | TEXT |  |
| Property Value | `home_price_amount_in_us_type_a_number_please` | MONETORY |  |
| Property Value | `contact.contactproperty_value` | MONETORY |  |
| Property Value | `contact.property_values` | MONETORY |  |
| Property Value | `contact.property_value` | MONETORY |  |
| Property Value (Website) | `contact.property_value_website` | MONETORY |  |
| Property Zip Code | `contact.property_zip_code` | TEXT |  |
| Province / State | `contact.province__state` | TEXT |  |
| Purchase Loan Amount | `contact.purchase_loan_amount` | MONETORY |  |
| Purchase Price | `contact.purchase_price` | NUMERICAL |  |
| Purchase Quiz Score | `contact.score_purchase_quiz_score` | NUMERICAL |  |
| Purchase Timeline (website) | `contact.purchase_timeline` | TEXT |  |
| Purchased Price | `contact.purchased_price` | MONETORY |  |
| Purchased Price (How Much You Want To Buy) | `contact.purchased_price_how_much_you_want_to_buy` | MONETORY |  |
| Purchased Price of Property | `contact.purchased_price_of_property` | MONETORY |  |
| Qualified / Not Qualified | `contact.qualified__not_qualified` | SINGLE_OPTIONS | Qualified / Not Qualified |
| Qualified Criteria | `contact.qualified_criteria` | LARGE_TEXT |  |
| Qualified Landing Page | `contact.qualified_landing_page` | TEXT |  |
| Qualified Lead Details | `contact.qualified_lead_details` | LARGE_TEXT |  |
| Qualified Partnership Lead Details  | `contact.qualified_partnership_lead_details` | LARGE_TEXT |  |
| Qualified Recruitment Details | `contact.qualified_recruitment_details` | LARGE_TEXT |  |
| Qualifies (Website) | `contact.qualifies_website` | TEXT |  |
| Question Conditions  | `contact.question_conditions` | LARGE_TEXT |  |
| Rate | `contact.rates` | NUMERICAL |  |
| Recruitment Calendar Link | `contact.recruitment_calendar_link` | TEXT |  |
| ref | `contact.ref` | TEXT |  |
| Referral Form Link | `contact.referral_form_link` | TEXT |  |
| Referral Incentive Details | `contact.referral_incentive_details` | LARGE_TEXT |  |
| Referral Link | `contact.referral_link` | TEXT |  |
| Registered Business Address | `contact.registered_business_address` | TEXT |  |
| Registered Business Number (optional now but will need for sms automation) | `contact.registered_business_number_optional_now_but_will_need_for_sms_automation` | TEXT |  |
| Registered Type Of Business Number (optional now but will need for sms automatons ) | `contact.registered_type_of_business_number_optional_now_but_will_need_for_sms_automatons_` | SINGLE_OPTIONS | EIN (American ) / HST (Canadian ) |
| Remarks | `contact.remarks` | TEXT |  |
| Renewal Date | `contact.renewal_date` | DATE |  |
| Renewal Date (Deal) | `contact.renewal_date_deal` | DATE |  |
| Residential or Commercial ? | `contact.residential_or_commercial_` | MULTIPLE_OPTIONS | Residential / Commercial |
| Response | `contact.response` | TEXT |  |
| Response Channel | `contact.response_channel` | SINGLE_OPTIONS | SMS / FB / IG / GMB / Email … |
| Select your credit score? | `contact.select_your_credit_score` | RADIO | Excellent (≥740) / Good (680 - 739) / Fair (620 - 679) / Needs Help (≤ 619) |
| Select Your Option (US) | `contact.select_your_option` | RADIO | Purchase / Refinance / Refinance Cash Out |
| Select Your Type Of Mortgage | `contact.select_your_type_of_mortgage` | RADIO | Purchase / Refinance / Refinance Cash Out |
| Selected Product / Service | `contact.selected_product__service` | TEXT |  |
| Seller or Buyer ? | `contact.seller_or_buyer_` | MULTIPLE_OPTIONS | Buyer / Seller |
| Service Are | `contact.service_are` | TEXT |  |
| Services Type  | `contact.services_type` | SINGLE_OPTIONS | Purchase / Refinance / Second Mortgage / Private Mortgages / Commercial Mortgages |
| Social Security Number: | `contact.social_security_number` | NUMERICAL |  |
| Sources | `contact.sources` | SINGLE_OPTIONS | Fb Form / Instagram / Google / TikTok / Youtube … |
| Start Date | `contact.start_date` | DATE |  |
| Street Address Expanded | `contact.street_address_expanded` | TEXT |  |
| Student Loan | `contact.student_loan` | MONETORY |  |
| Student Loan | `car_loan_amount_in_us_type_a_number_please` | MONETORY |  |
| Term | `contact.terms` | NUMERICAL |  |
| Term | `contact.term` | NUMERICAL |  |
| terms of service link | `contact.terms_of_service_link` | TEXT |  |
| There is a financial investment to join our industry changing team that helps start your success. Will you have access to funds if we find you are a good fit for our team ? | `contact.there_is_a_financial_investment_to_join_our_industry_changing_team_that_helps_start_your_success_will_you_have_access_to_funds_if_we_find_you_are_a_good_fit_for_our_team_` | SINGLE_OPTIONS | No / Yes |
| This Industry Changing System Involves A Financial Investment. Will You Have The Means If We Find You Are A Good Fit For The System? | `contact.this_industry_changing_system_involves_a_financial_investment_will_you_have_the_means_if_we_find_you_are_a_good_fit_for_the_system` | SINGLE_OPTIONS | No, I do not have funds currently / Yes, I want to implement AI into my business and have access to resources to get started / Yes, I want to automate a growing high volume business & have access to funding / I have a high volume business and have enterprise level needs and access to funding |
| Timeline | `contact.timeline` | TEXT |  |
| Timeline To Get Funded | `contact.timeline_to_get_funded` | TEXT |  |
| Total Auto Loan(s) Balance | `contact.total_auto_loans_balance` | MONETORY |  |
| Total Car Debt | `contact.total_car_debt` | MONETORY |  |
| Total Credit Card Debts | `contact.total_credit_card_debts` | MONETORY |  |
| Total Debt Amount? | `contact.total_debt_amount` | MONETORY |  |
| Total Debts | `contact.total_debts` | MONETORY |  |
| Total Debts | `contact.total_debt` | MONETORY |  |
| Total Debts (Website) | `contact.total_debts_website` | MONETORY |  |
| total Household Income | `contact.total_household_income` | MONETORY |  |
| Total Other Debts | `contact.total_other_debts` | MONETORY |  |
| Total Student Loans | `contact.total_student_loans` | MONETORY |  |
| Total Tax Debts | `contact.total_tax_debts` | MONETORY |  |
| Type Of Mortgage | `contact.type_of_mortgage` | RADIO | Purchase / Refinance / Refinance Cash Out |
| Type Of Property | `contact.type_of_property` | SINGLE_OPTIONS | Condo / Townhouse / Detached / Commercial |
| Type of Property  | `contact.type_of_property_1` | SINGLE_OPTIONS | condo / townhouse / detached / commercial |
| Type Of Service Offer (US & CAN) | `contact.type_of_service_offer` | CHECKBOX | Purchase Pre Approval / Refinance / Renewal / Debt Consolidation / Private Mortgage … |
| Types of loan USA | `contact.types_of_loan` | MULTIPLE_OPTIONS | Purchase / Conventional / Refi / Heloc / DCSR … |
| Types of Services | `contact.types_of_services` | MULTIPLE_OPTIONS | Purchase / Refinance / Second Mortgage / Private Mortgages / Commercial Mortgages … |
| Upload File (if needed )  | `contact.upload_file_if_needed` | FILE_UPLOAD |  |
| Upload ID  | `contact.upload_id` | FILE_UPLOAD | .pdf / .png / .jpeg / .jpg / .docx … |
| User Application Link | `contact.user_application_link` | TEXT |  |
| User Business Description | `contact.user_business_description` | LARGE_TEXT |  |
| User Calendar Link | `contact.user_calendar_link` | TEXT |  |
| User First Name | `contact.user_first_name` | TEXT |  |
| User Full Name | `contact.user_full_name` | TEXT |  |
| Using This Loan For | `contact.using_this_loan_for` | CHECKBOX | Refinance/ Renewal / Investment Purposes / Debt Consolidation / Renovations / Retirement ( Reverse Mortgage ) |
| Voice Bot ID | `contact.voice_bot_id` | TEXT |  |
| We Require A Signed Buyers Agreement.Is That Ok? | `contact.we_require_a_signed_buyers_agreement_is_that_ok` | SINGLE_OPTIONS | No (please do not submit form) / Yes |
| Webinar Date | `contact.webinar_date` | DATE |  |
| Webinar Name | `contact.webinar_name` | TEXT |  |
| Webinar Time | `contact.webinar_time` | TEXT |  |
| What about this opportunity interests you? | `contact.what_about_this_opportunity_interests_you` | LARGE_TEXT |  |
| What experience do you have that best relates to this role? | `contact.what_experience_do_you_have_that_best_relates_to_this_role` | LARGE_TEXT |  |
| What is pushing you to want to make a career switch? | `contact.what_is_pushing_you_to_want_to_make_a_career_switch` | LARGE_TEXT |  |
| What is the balance of a loan you want to refinance ? | `contact.what_is_the_balance_of_a_loan_you_want_to_refinance` | NUMERICAL |  |
| What is the type of home you currently own? | `contact.what_is_the_type_of_home_you_currently_own` | RADIO | Single Family / Condo / Multi-Family / Commercial |
| What is the type of property you are looking for? | `contact.what_is_the_type_of_home_you_are_looking_for` | RADIO | Single Family / Condo / Multi-Family / Commercial |
| What is your credit score? | `contact.what_is_your_credit_score` | RADIO | Excellent (≥740) / Good (680 - 739) / Fair (620 - 679) / Poor (≤ 619) |
| What Type of Business | `contact.what_type_of_business` | SINGLE_OPTIONS | Mortgage / Real Estate / Solar / Lawyer / Insurance … |
| What type of business do you run? | `contact.what_type_of_business_do_you_run` | TEXT |  |
| What Type Of Loan Do You Need ? | `contact.what_type_of_loan_do_you_need_` | MULTIPLE_OPTIONS | Pre Approved For Purchase / Refinance / Second / Private / Renewal … |
| What type of mortgage are you looking for?  | `contact.what_type_of_mortgage_are_you_looking_for` | SINGLE_OPTIONS | Purchase / Purchase (First time buyer) / Renewal / Refinance / Private (1st,2nd,3rd) … |
| What Type Of Property ? | `contact.what_type_of_property_` | MULTIPLE_OPTIONS | Condo / Townhouse / Detached / Multi Family |
| What Type Of Property Do You Have | `contact.what_type_of_property_do_you_have` | CHECKBOX | Condo / Townhouse / DetachedHome |
| What're your goals? Both income goals and non-income goals. What is your deeper motivation to become the best? | `contact.whatre_your_goals_both_income_goals_and_nonincome_goals_what_is_your_deeper_motivation_to_become_the_best` | LARGE_TEXT |  |
| What’s the balance of a loan you want to refinance? | `contact.whats_the_balance_of_a_loan_you_want_to_refinance` | MONETORY |  |
| What’s your current monthly revenue? | `contact.whats_your_current_monthly_revenue` | RADIO | 0 - $10k/m (Please do not book. Your call will be automatically cancelled) / $10k - $50k/m / $50k - $100k/m / $100k - $250k/m / $250k - $500k/m+ |
| Whats your balance of your current loan? | `contact.whats_your_balance_of_your_current_loan` | NUMERICAL |  |
| Which Do you prefer a man or woman AI voice ? | `contact.which_do_you_prefer_a_man_or_woman_ai_voice_` | SINGLE_OPTIONS | Male / Female / N/A |
| Who were your last 2-3 bosses? How would they rate or describe you when we speak to them? | `contact.who_were_your_last_23_bosses_how_would_they_rate_or_describe_you_when_we_speak_to_them` | LARGE_TEXT |  |
| Your Timezone | `contact.your_timezone` | TEXT |  |

## EqM — Custom Values (170)

| Name | Token | Value (truncated) |
|---|---|---|
| 65%LTV | `{{{{ custom_values.65_landing }}}}` |  |
| 80%LTV | `{{{{ custom_values.80ltv }}}}` |  |
| 95%LTV | `{{{{ custom_values.95ltv }}}}` |  |
| A.I. Agent Model ID | `{{{{ custom_values.ai_call_confirmation_id }}}}` |  |
| A.I. Agent name | `{{{{ custom_values.ai_agent_name }}}}` | Jordan |
| A.I. Calling Api Key | `{{{{ custom_values.ai_calling_api_key }}}}` |  |
| A.I. Inbound Call Number | `{{{{ custom_values.ai_inbound_call_number }}}}` |  |
| A.I. Job Title | `{{{{ custom_values.ai_assistant_job_title }}}}` | Assistant |
| A.I. Prompt Pre Qualify | `{{{{ custom_values.ai_prompt_pre_qualify }}}}` |  |
| A.I. Question 1 | `{{{{ custom_values.ai_question_1 }}}}` |  |
| A.I. Question 1 Answer | `{{{{ custom_values.ai_question_1_answer }}}}` |  |
| A.I. Question 10 | `{{{{ custom_values.ai_question_10 }}}}` |  |
| A.I. Question 10 Answer | `{{{{ custom_values.ai_question_10_answer }}}}` |  |
| A.I. Question 2 | `{{{{ custom_values.ai_question_2 }}}}` |  |
| A.I. Question 2 Answer | `{{{{ custom_values.ai_question_2_answer }}}}` |  |
| A.I. Question 3 | `{{{{ custom_values.ai_question_3 }}}}` |  |
| A.I. Question 3 Answer | `{{{{ custom_values.ai_question_3_answer }}}}` |  |
| A.I. Question 4 | `{{{{ custom_values.ai_question_4 }}}}` |  |
| A.I. Question 4 Answer | `{{{{ custom_values.ai_question_4_answer }}}}` |  |
| A.I. Question 5 | `{{{{ custom_values.ai_question_5 }}}}` |  |
| A.I. Question 5 Answer | `{{{{ custom_values.ai_question_5_answer }}}}` |  |
| A.I. Question 6 | `{{{{ custom_values.ai_question_6 }}}}` |  |
| A.I. Question 6 Answer | `{{{{ custom_values.ai_question_6_answer }}}}` |  |
| A.I. Question 7 | `{{{{ custom_values.ai_question_7 }}}}` |  |
| A.I. Question 7 Answer | `{{{{ custom_values.ai_question_7_answer }}}}` |  |
| A.I. Question 8 | `{{{{ custom_values.ai_question_8 }}}}` |  |
| A.I. Question 8 Answer | `{{{{ custom_values.ai_question_8_answer }}}}` |  |
| A.I. Question 9 | `{{{{ custom_values.ai_question_9 }}}}` |  |
| A.I. Question 9 Answer | `{{{{ custom_values.ai_question_9_answer }}}}` |  |
| Ai Conversation Notes | `{{{{ custom_values.ai_conversation_notes }}}}` |  |
| Ai Prompt 1 General | `{{{{ custom_values.ai_prompt_1_general }}}}` |  |
| Ai Prompt 2 Booking | `{{{{ custom_values.ai_prompt_2_booking }}}}` |  |
| Ai Prompt Application Follow Up | `{{{{ custom_values.ai_prompt_application_follow_up }}}}` |  |
| Ai Prompt Appointment Reminder | `{{{{ custom_values.ai_prompt_appointment_reminder }}}}` |  |
| AI Prompt Buyer | `{{{{ custom_values.ai_prompt_buyer }}}}` |  |
| Ai Prompt Document Follow Up | `{{{{ custom_values.ai_prompt_document_follow_up }}}}` |  |
| Ai Prompt Follow Up | `{{{{ custom_values.ai_prompt_follow_up }}}}` |  |
| Ai Prompt Google Review Request | `{{{{ custom_values.ai_prompt_google_review_request }}}}` |  |
| Ai Prompt Inbound | `{{{{ custom_values.ai_prompt_inbound }}}}` |  |
| Ai Prompt No Show | `{{{{ custom_values.ai_prompt_no_show }}}}` |  |
| Ai Prompt Old Lead Resurrection | `{{{{ custom_values.ai_prompt_old_lead_resurrection }}}}` |  |
| Ai Prompt Outbound New Lead | `{{{{ custom_values.ai_prompt_outbound_new_lead }}}}` |  |
| Ai Prompt Partnership | `{{{{ custom_values.ai_prompt_partnership }}}}` |  |
| Ai Prompt Referral Request | `{{{{ custom_values.ai_prompt_referral_request }}}}` |  |
| Ai Prompt Seller | `{{{{ custom_values.ai_prompt_seller }}}}` |  |
| AI Recruitment Prompt | `{{{{ custom_values.ai_recruitment_prompt }}}}` |  |
| Application Link | `{{{{ custom_values.application_link }}}}` |  |
| Application Reminder Bot | `{{{{ custom_values.application_reminder_bot }}}}` |  |
| Appointment Confirmation Bot | `{{{{ custom_values.introductory_bot_appointment_confirmation }}}}` |  |
| Approval Status | `{{{{ custom_values.approval_status }}}}` |  |
| Billing Email | `{{{{ custom_values.billing }}}}` |  |
| Billing Phone Number | `{{{{ custom_values.billing_phone_number }}}}` |  |
| Booking Link | `{{{{ custom_values.booking_link }}}}` |  |
| Brand Color Accent (Hex) w/ # | `{{{{ custom_values.brand_color_accent_hex_w_ }}}}` |  |
| Brand Color Secondary (Hex) w/ # | `{{{{ custom_values.brand_color_secondary_hex_w_ }}}}` |  |
| Business Address | `{{{{ custom_values.business_address }}}}` |  |
| Business Name | `{{{{ custom_values.business_name }}}}` |  |
| Business Phone | `{{{{ custom_values.business_phone }}}}` |  |
| Calendar ID | `{{{{ custom_values.calendar_id }}}}` |  |
| Calendar Page Link (Include Https://) | `{{{{ custom_values.calendar_page_link_include_https }}}}` |  |
| City | `{{{{ custom_values.city }}}}` |  |
| Client Onboarding Funnel | `{{{{ custom_values.client_onboarding_funnel }}}}` |  |
| Close Date | `{{{{ custom_values.close_date }}}}` |  |
| Color Code (Hex) w/ # | `{{{{ custom_values.color_code }}}}` |  |
| Company Logo | `{{{{ custom_values.company_logo }}}}` |  |
| Company Name | `{{{{ custom_values.company_name }}}}` | EquityMax.ca |
| Company Phone | `{{{{ custom_values.company_phone }}}}` |  |
| Company Sloagan | `{{{{ custom_values.company_sloagan }}}}` |  |
| Compliance Disclaimer | `{{{{ custom_values.compliance_disclaimer }}}}` |  |
| Conditions List | `{{{{ custom_values.conditions_list }}}}` |  |
| Country | `{{{{ custom_values.country }}}}` |  |
| Credit Score | `{{{{ custom_values.credit_score }}}}` |  |
| Deal Amount | `{{{{ custom_values.deal_amount }}}}` |  |
| Digital Phone Number | `{{{{ custom_values.digital_phone_number }}}}` |  |
| Down Payment | `{{{{ custom_values.down_payment }}}}` |  |
| Email Signature | `{{{{ custom_values.email_signature }}}}` |  |
| Follow up Document Bot | `{{{{ custom_values.follow_up_document_bot }}}}` |  |
| Google Review Link | `{{{{ custom_values.google_review_link }}}}` |  |
| Headshot | `{{{{ custom_values.headshot }}}}` |  |
| Hours Of Operation | `{{{{ custom_values.hours_of_operation }}}}` | Monday to Friday, 9am to 6pm EST. Saturday 10am to 2pm EST. Closed Sundays. |
| Income | `{{{{ custom_values.income }}}}` |  |
| Knowledge Link 1 | `{{{{ custom_values.knowledge_link_1 }}}}` |  |
| Knowledge Link 2 | `{{{{ custom_values.knowledge_link_2 }}}}` |  |
| Knowledge Link 3 | `{{{{ custom_values.knowledge_link_3 }}}}` |  |
| Knowledge Link 4 | `{{{{ custom_values.knowledge_link_4 }}}}` |  |
| Lender Name | `{{{{ custom_values.lender_name }}}}` |  |
| Lender Submitted Date | `{{{{ custom_values.lender_submitted_date }}}}` |  |
| License Number | `{{{{ custom_values.license_number }}}}` |  |
| LTV (Loan to Value) | `{{{{ custom_values.ltv_loan_to_value }}}}` |  |
| Main Landing Page | `{{{{ custom_values.main_landing_page }}}}` |  |
| Maturity Date | `{{{{ custom_values.maturity_date }}}}` |  |
| Max LTV | `{{{{ custom_values.max_ltv }}}}` |  |
| Min Credit Score | `{{{{ custom_values.min_credit_score }}}}` |  |
| Mortgage Amount | `{{{{ custom_values.mortgage_amount }}}}` |  |
| Mortgage Type | `{{{{ custom_values.mortgage_type }}}}` |  |
| My Calendar | `{{{{ custom_values.my_calendar }}}}` |  |
| New Team Member Onboarding Form Link | `{{{{ custom_values.new_team_member_onboarding_form_link }}}}` |  |
| niche | `{{{{ custom_values.niche }}}}` | Mortgage Brokerage |
| Not Qualified Details | `{{{{ custom_values.not_qualified_details }}}}` |  |
| NOT Qualified Landing Page Link | `{{{{ custom_values.not_qualified_landing_page_link }}}}` |  |
| Not Qualified Lead Description | `{{{{ custom_values.not_qualified_lead_description }}}}` |  |
| office_hours | `{{{{ custom_values.office_hours }}}}` | Monday to Friday, 9am to 6pm EST. Saturday 10am to 2pm EST. Closed Sundays. |
| OpenAI Prompt | `{{{{ custom_values.openai_prompt }}}}` |  |
| Owner Full Name | `{{{{ custom_values.owner_full_name }}}}` | Renée Ross |
| Owner Name | `{{{{ custom_values.owner_name }}}}` | Renée |
| Partnership Calendar Link | `{{{{ custom_values.partnership_calendar_link }}}}` |  |
| Pre Qualify Buyer Form Link | `{{{{ custom_values.pre_qualify_buyer_link }}}}` |  |
| Pre Qualify Seller Form Link | `{{{{ custom_values.pre_qualify_seller_link }}}}` |  |
| Pre Qualifying Form Link | `{{{{ custom_values.pre_qualifying_form_link }}}}` |  |
| Prequalify Bot | `{{{{ custom_values.mortgage_bot }}}}` |  |
| Primary Hex Color | `{{{{ custom_values.primary_hex_color }}}}` |  |
| Privacy Policy | `{{{{ custom_values.privacy_policy }}}}` |  |
| product / service 1 | `{{{{ custom_values.product__service_1 }}}}` |  |
| product / service 2 | `{{{{ custom_values.product__service_2 }}}}` |  |
| product/ service 10 | `{{{{ custom_values.product_service_10 }}}}` |  |
| product/ service 3 | `{{{{ custom_values.product_service_3 }}}}` |  |
| product/ service 4 | `{{{{ custom_values.product_service_4 }}}}` |  |
| product/ service 5 | `{{{{ custom_values.product_service_5 }}}}` |  |
| product/ service 6 | `{{{{ custom_values.product_service_6 }}}}` |  |
| product/ service 7 | `{{{{ custom_values.product_service_7 }}}}` |  |
| product/ service 8 | `{{{{ custom_values.product_service_8 }}}}` |  |
| product/ service 9 | `{{{{ custom_values.product_service_9 }}}}` |  |
| Property Type | `{{{{ custom_values.property_type }}}}` |  |
| Property Value | `{{{{ custom_values.property_value }}}}` |  |
| Province Or State | `{{{{ custom_values.province_or_state }}}}` |  |
| Purpose | `{{{{ custom_values.purpose }}}}` |  |
| Qualified Booking Link | `{{{{ custom_values.mortgage_form_qualified_trigger_to_booking_link }}}}` |  |
| Qualified Details | `{{{{ custom_values.qualified_details }}}}` |  |
| Qualified Landing Page | `{{{{ custom_values.qualified_landing_page }}}}` |  |
| Qualified Lead Description | `{{{{ custom_values.qualified_lead_description }}}}` |  |
| Recruitment Calendar | `{{{{ custom_values.recruitment_calendar }}}}` |  |
| Recruitment Landing Page | `{{{{ custom_values.recruitment_landing_page }}}}` |  |
| Recruitment Link | `{{{{ custom_values.recruitment_link }}}}` |  |
| Referral Link | `{{{{ custom_values.referral_link }}}}` |  |
| Renewal Date | `{{{{ custom_values.renewal_date }}}}` |  |
| Robot Webhook | `{{{{ custom_values.robot_webhook }}}}` |  |
| Robot Webhook - Nonbooking | `{{{{ custom_values.robot_webhook__nonbooking }}}}` |  |
| Sales Email | `{{{{ custom_values.sales_email }}}}` |  |
| Sales Phone | `{{{{ custom_values.sales_phone }}}}` |  |
| Secondary Hex Color | `{{{{ custom_values.secondary_hex_color }}}}` |  |
| Self Employed | `{{{{ custom_values.self_employed }}}}` |  |
| Seller Calendar | `{{{{ custom_values.seller_calendar }}}}` |  |
| Service Area | `{{{{ custom_values.service_area }}}}` |  |
| service_description | `{{{{ custom_values.service_description }}}}` | Residential and commercial mortgage financing, refinancing, renewals, private le |
| Services | `{{{{ custom_values.services }}}}` |  |
| Short Address | `{{{{ custom_values.short_address }}}}` |  |
| Specialties | `{{{{ custom_values.specialties }}}}` |  |
| Support Email | `{{{{ custom_values.support_email }}}}` |  |
| Support Phone | `{{{{ custom_values.support }}}}` |  |
| Tagline | `{{{{ custom_values.tagline }}}}` |  |
| Target Market | `{{{{ custom_values.target_market }}}}` |  |
| Team Onboarding Funnel | `{{{{ custom_values.team_onboarding_funnel }}}}` |  |
| Team Onboarding Survey | `{{{{ custom_values.team_onboarding_survey }}}}` |  |
| Term | `{{{{ custom_values.term }}}}` |  |
| Terms of Service | `{{{{ custom_values.terms_of_service }}}}` |  |
| Timeline | `{{{{ custom_values.timeline }}}}` |  |
| Timezone | `{{{{ custom_values.timezone }}}}` |  |
| Total Debt | `{{{{ custom_values.total_debt }}}}` |  |
| User About Paragraph | `{{{{ custom_values.user_about_paragraph }}}}` |  |
| User Email | `{{{{ custom_values.user_email }}}}` |  |
| User First Name | `{{{{ custom_values.user_first_name }}}}` |  |
| User Full Name | `{{{{ custom_values.user_full_name }}}}` |  |
| User Job Title | `{{{{ custom_values.user_job_title }}}}` |  |
| user sms signature | `{{{{ custom_values.user_sms_signature }}}}` |  |
| User Website | `{{{{ custom_values.website }}}}` |  |
| Voice Bot ID | `{{{{ custom_values.voice_bot_id }}}}` |  |
| Webinar Date | `{{{{ custom_values.webinar_date }}}}` |  |
| Webinar Link | `{{{{ custom_values.webinar_link }}}}` |  |
| Webinar Time | `{{{{ custom_values.webinar_time }}}}` |  |
| Years In Business | `{{{{ custom_values.years_in_business }}}}` |  |

## EqM — Tags (115)

- `{{contact.productservice_1}}`
- `{{contact.productservice_10}}`
- `{{contact.productservice_2}}`
- `{{contact.productservice_3}}`
- `{{contact.productservice_4}}`
- `{{contact.productservice_5}}`
- `{{contact.productservice_6}}`
- `{{contact.productservice_7}}`
- `{{contact.productservice_8}}`
- `{{contact.productservice_9}}`
- `1770411789818x729503551179194400`
- `1770411937731x786716738265284600`
- `6/8/2024_call_ended`
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
- `ai-chat-booked`
- `application`
- `appointment`
- `appointment confirmation call`
- `appointment_booked`
- `appointment_fail`
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
- `lead currently in workflow`
- `lead currently in workflow sms`
- `lead paid`
- `long term nurture`
- `long term nurture sms`
- `manual_workflow_add`
- `meeting-link-clicked`
- `meeting-link-not-clicked`
- `mike lead`
- `mortgage form started`
- `mortgage lead`
- `mortgage test`
- `mortgage_demo_call`
- `name via lookup`
- `new lead`
- `new lead no response`
- `nikki lead`
- `no mass communication`
- `no mass communication sms`
- `not interested`
- `not qualified`
- `not_interested`
- `old lead`
- `old lead currently in workflow`
- `old lead sms`
- `partnership`
- `phone verified`
- `pre-qual-complete`
- `pre-qual-form-needed`
- `private`
- `productservice_1`
- `productservice_10`
- `productservice_2`
- `productservice_3`
- `productservice_4`
- `productservice_5`
- `productservice_6`
- `productservice_7`
- `productservice_8`
- `productservice_9`
- `purchase`
- `purchase `
- `qualified`
- `realtor`
- `recruitment`
- `referral`
- `referred a client`
- `refinance`
- `renee`
- `renee lead`
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

---

## CHANGE LOG (append-only — Claude + Console append here)

- 2026-04-20 · Claude-Code · Initial auto-pull. ABC: 59 CF / 179 CV / 55 tags. EqM: 389 CF / 170 CV / 115 tags.
