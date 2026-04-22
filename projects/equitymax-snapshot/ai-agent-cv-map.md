# AI Agent Inventory + Required CV / Tag Map

Last refreshed: 2026-04-22 by Claude Code.

This maps every AI agent (voice + chat) in both sub-accounts to the canonical custom values and tags it MUST reference. Use this when building or auditing an agent in AI Studio: the prompt can only reference canonical keys from this list.

**Universality test:** every CV key below must work identically for a dentist, plumber, realtor, or mortgage pro. Mortgage-specific CVs are called out explicitly.

## Canonical CV set (generic — works for every niche)

| Key | Purpose | Must-populate for niche |
|---|---|---|
| `user_first_name` | Human owner/agent first name | All |
| `user_last_name` | Human owner/agent last name | All |
| `user_full_name` | "First Last" concatenation | All |
| `user_job_title` | Human's role (e.g. "Mortgage Agent Level 2") | All |
| `company_name` | Business name | All |
| `company_phone` | Main business phone | All |
| `company_address` | Business address | All |
| `company_website` | Company URL | All |
| `service_area` | City/region served | All |
| `niche` | Vertical (e.g. "mortgage", "dental") | All |
| `office_hours` | Business hours | All |
| `my_calendar` | **CANONICAL** booking link — supersedes `booking_link` | All |
| `ai_agent_name` | Name of the AI bot itself (e.g. "Jordan") | All |
| `ai_agent_persona` | Tone description | All |
| `ai_job_title` | AI bot's role (e.g. "assistant") — **CANONICAL** supersedes `ai_assistant_job_title` | All |
| `ai_inbound_call_number` | Phone number the voice bot answers | All with voice AI |
| `ai_outbound_caller_id` | Phone number shown on outbound calls | All with voice AI |
| `agency_voicemail_message` | Voicemail drop script | All with voice AI |
| `ai_conversation_notes` | Freeform internal note | All |
| `product_service_1` .. `product_service_9` | Products/services offered | All |

## Canonical prompt CVs (the big block — one per agent role)

| Key | Agent it powers |
|---|---|
| `ai_prompt_inbound` | Voice + Chat new lead entry |
| `ai_prompt_outbound_lead_call` | Voice outbound to new lead |
| `ai_prompt_1_general` | Chat general Q&A |
| `ai_prompt_2_booking` | Booking-focused chat/voice |
| `ai_prompt_pre_qualify_follow_up` | Post-prequalify nurture |
| `ai_prompt_booking_follow_up` | Post-booking reminder + prep |
| `ai_prompt_appointment_reminder` | 24h / 1h pre-appointment |
| `ai_prompt_no_show` | No-show recovery |
| `ai_prompt_application_follow_up` | Application chase (mortgage-specific) |
| `ai_prompt_application_reminder` | Application reminder (mortgage-specific) |
| `ai_prompt_document_reminder` | Doc chase (mortgage-specific) |
| `ai_prompt_renewal_countdown` | Renewal 120/90/60/30/14-day (mortgage-specific) |
| `ai_prompt_long_term_nurture` | Long-term nurture (all niches) |
| `ai_prompt_old_lead_resurrection` | Cold lead re-engagement |
| `ai_prompt_referral_request` | Referral ask post-close |
| `ai_prompt_google_review_request` | Google review ask |
| `ai_prompt_partnership` | B2B partnership chat |
| `ai_prompt_recruitment` → (verify name matches ABC `ai_recruitment_prompt`) | Recruitment inbound |
| `ai_prompt_not_qualified` | Not-qualified response script |
| `ai_prompt_welcome` | New account welcome |
| `ai_prompt_spam` | Spam filter |
| `ai_prompt_not_interested` | Opt-out handler |

## Mortgage-specific CVs (EquityMax-only — do NOT port to ABC)

| Key | Purpose |
|---|---|
| `license_number` | FSRA license (any licensed pro, actually — keep generic) |
| `application_link` | Scarlette / application portal URL |
| `65_ltv_landing` / `80_ltv_landing` / `95_ltv_landing` | LTV-tier landing pages |
| `ai_prompt_real_estate_buyer` | Real estate buyer chat |
| `ai_prompt_real_estate_seller` | Real estate seller chat |
| `lender_list_*` | Lender preferences (if CV-based) |

## Canonical tag set (generic — universal taxonomy)

**Source tags:**
- `source-website` / `source-phone-call` / `source-walk-in` / `source-referral` / `source-partner` / `source-ad`

**Lifecycle tags:**
- `new-lead` / `qualified` / `not-qualified` / `consultation-booked` / `consultation-completed` / `in-application` / `closed-won` / `closed-lost` / `nurture-longterm`

**Intent/quality tags:**
- `cold-lead` / `warm-lead` / `hot-lead` / `not-interested` / `spam`

**AI attribution tags (voice vs chat split — see memory `project_ghl_ai_tag_convention`):**
- `ai-voice-inbound-inquiry` / `ai-voice-booked` / `ai-voice-no-answer` / `ai-voice-voicemail-left` / `ai-voice-not-qualified`
- `ai-chat-inbound-inquiry` / `ai-chat-booked` / `ai-chat-prequalified` / `ai-chat-not-qualified`

**Compliance tags:**
- `casl-consented` / `casl-withdrawn` / `do-not-contact` / `opted-out-sms` / `opted-out-email`

**Recruitment tags (if recruitment pipeline active):**
- `recruitment-inquiry` / `recruitment-qualified` / `recruitment-hired` / `recruitment-passed`

## Mortgage-specific tags (EquityMax only)

- `mortgage-purchase` / `mortgage-refinance` / `mortgage-renewal` / `mortgage-heloc` / `mortgage-private` / `mortgage-reverse` / `mortgage-wholesale` / `mortgage-commercial`
- `ltv-under-65` / `ltv-65-80` / `ltv-80-95`
- `product-service-1` ... `product-service-9` (the 9 mortgage products)
- `renewal-120d` / `renewal-90d` / `renewal-60d` / `renewal-30d` / `renewal-14d` / `renewal-due` (countdown)

## EquityMax AI Agent Inventory (from memory — verify in UI)

**Folder: "General Business Automation" (DO NOT TOUCH — 10 agents, published)**
| # | Agent name | Uses these CVs | Uses these tags |
|---|---|---|---|
| 1 | Inbound Everything | `ai_prompt_inbound`, `ai_agent_name`, `company_name`, `user_first_name` | `ai-chat-inbound-inquiry` |
| 2 | Follow Up Automation | `ai_prompt_follow_up`, full canonical set | `ai-chat-nurture` |
| 3 | Renewal | `ai_prompt_renewal_countdown`, `user_first_name`, `my_calendar` | mortgage-renewal tags |
| 4 | Not Interested | `ai_prompt_not_interested` | `not-interested` |
| 5 | Spam | `ai_prompt_spam` | `spam` |
| 6 | Documents Reminder | `ai_prompt_document_reminder`, `application_link` | `document-requested` |
| 7 | Application Reminder | `ai_prompt_application_reminder`, `application_link` | `application-in-progress` |
| 8 | Appointment Confirmation & Reminder | `ai_prompt_appointment_reminder` | `consultation-booked` |
| 9 | New Lead Prequalify & Book | `ai_prompt_inbound`, `ai_prompt_pre_qualify_follow_up`, `ai_prompt_2_booking`, full canonical set | `ai-chat-prequalified`, `qualified`, `consultation-booked` |
| 10 | Google Review | `ai_prompt_google_review_request`, `user_first_name` | `google-review-sent` |

**Outside folder:**
- `EquityMax Mortgage Pre-Qualifier` (published 2026-04-15) — needs audit: flagged to have `owner_name` / `Renée` hardcoded. Must migrate to canonical `user_first_name`.

**Voice AI Bots folder: EMPTY.**

## Required Voice Bots to Build (based on Drive scripts)

| Bot name | Script source | Required CVs |
|---|---|---|
| Voice — Inbound Generic | `voice-bot-inspiration/canadian-inbound-generic.md` | ai_agent_name, company_name, ai_job_title, user_first_name, my_calendar, license_number, office_hours, ai_inbound_call_number |
| Voice — Outbound New Lead Pre-Qualify | `voice-bot-inspiration/canadian-outbound-prequalify.md` | same + agency_voicemail_message, ai_outbound_caller_id |
| Voice — Renewal Countdown | *to build — adapt from outbound script* | + ai_prompt_renewal_countdown, mortgage renewal CVs |
| Voice — No-Show Recovery | *to build* | ai_prompt_no_show, my_calendar |

## ABC AI Agent Inventory (should mirror EqM minus mortgage-specific)

ABC has a parallel "General Business Automation" folder with 10 agents. Same structure. Verified via memory `project_equitymax_agent_inventory.md`. Content alignment check needed once EqM canonical is locked.

## Action list (drives the Phase 3 work)

When the dedup map is approved and CV swaps happen, each AI agent above must be re-verified in AI Studio to confirm:
1. Every token in its prompt uses the canonical key (not the deprecated duplicate)
2. Tags it applies are from the canonical taxonomy
3. No hardcoded personal names / brokerage names / cities
4. It survives the universality test (could port to ABC for a dentist to use)
