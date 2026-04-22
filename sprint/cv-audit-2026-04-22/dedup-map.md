# Dedup Map — 2026-04-22

Canonical source: ABC Company sub-account (`AKbAtRra4m908e2w2Kbo`).
Live account being normalized: EquityMax (`OBmMdqdnPLZvVyHloFly`).

Orphan detection caveat: the workflow JSON provided is metadata only (name + ID), not action bodies. "Likely-orphan" is therefore a best-effort flag based on whether the CV/tag name or key appears in a workflow name, plus whether an obvious canonical equivalent exists. Actual action-body reference checks require exporting workflow definitions (not in scope today).

---

## Summary counts

- **ABC CVs:** 179 | **EqM CVs:** 170 | **Overlap by MEANING:** ~95
- **ABC tags:** 115 | **EqM tags:** 172 | **Overlap by MEANING:** ~38
- **EqM CVs flagged:**
  - KEEP: 59
  - MERGE-INTO-CANONICAL: 34
  - DELETE-DEPRECATED: 7
  - DELETE-ORPHAN: 8
  - MORTGAGE-KEEP: 48
  - REVIEW: 14
- **EqM tags flagged:**
  - KEEP: 38
  - MERGE-INTO-CANONICAL: 42
  - DELETE-DEPRECATED: 2
  - DELETE-ORPHAN: 32
  - MORTGAGE-KEEP: 20
  - REVIEW: 38

---

## EquityMax CVs — Action table

| CV name | EqM key | EqM ID | EqM value | Action | Merge-into (ABC key) | Reason |
|---|---|---|---|---|---|---|
| 65%LTV | 65_landing | o569r0Q4DpsFjEO3YQ4V | "" | MORTGAGE-KEEP | — | LTV-tier landing page pointer (mortgage-only). Referenced by workflow "Form 65%". Suggest rename to `landing_65_ltv` for readability. |
| 80%LTV | 80ltv | 9TMTlP9PqS33h3J9Tri8 | "" | MORTGAGE-KEEP | — | LTV-tier landing page pointer. Referenced by workflow "Form 80%". |
| 95%LTV | 95ltv | NCCjIsXegrwqpiDJOIeI | "" | MORTGAGE-KEEP | — | LTV-tier landing page pointer. Referenced by workflow "Form 95%". |
| A.I. Agent name | ai_agent_name | Q58KHS7IhtLf6VVO7ruw | "Jordan" | KEEP | ai_agent_name | Canonical match to ABC. |
| AI Agent Persona | ai_agent_persona | wcN8bpm6AFxJfymVXxl4 | "Friendly..." | KEEP | ai_agent_persona | Canonical match to ABC. |
| A.I. Job Title | ai_assistant_job_title | iCzKG7rR5hMcoaikvoHf | "Assistant" | MERGE-INTO-CANONICAL | ai_job_title | ABC uses `ai_job_title`. Rename key. |
| A.I. Agent Model ID | ai_call_confirmation_id | BswvyrfFR0sOqkui69vY | "" | MERGE-INTO-CANONICAL | ai_agent_model_id | Name says model ID, key wrongly says confirmation ID. ABC canonical is `ai_agent_model_id`. |
| A.I. Calling Api Key | ai_calling_api_key | AuRFi7pmcahFq2UmeWLj | "" | KEEP | ai_calling_api_key | Canonical match. |
| Ai Conversation Notes | ai_conversation_notes | TOIlHPk5UTzOSiGZEEGf | "" | KEEP | ai_conversation_notes | Canonical match. |
| AI Goals | ai_goals | RmiBWmeKr70zu0CXg7kr | "Qualify leads..." | KEEP | ai_goals | Canonical match. |
| A.I. Inbound Call Number | ai_inbound_call_number | rDoHEKtq0j1ZYVVtCd9K | "" | KEEP | ai_inbound_call_number | Canonical match. |
| Ai Prompt 1 General | ai_prompt_1_general | 5cF44jntXtIMTNDoeoeP | "" | KEEP | ai_prompt_1_general | Canonical match. |
| Ai Prompt 2 Booking | ai_prompt_2_booking | im9HNCXvGeDW8tZI8CFD | "" | KEEP | ai_prompt_2_booking | Canonical match. |
| Ai Prompt Application Follow Up | ai_prompt_application_follow_up | Mo8P0qb61tIHvfyOXtam | "" | KEEP | ai_prompt_application_follow_up | Canonical match. |
| AI Prompt Application Reminder | ai_prompt_application_reminder | s3UxnkH74k3yTKyLJIOD | "You are..." | MORTGAGE-KEEP | — | Mortgage-specific reminder prompt. No ABC equivalent. Keep. |
| Ai Prompt Appointment Reminder | ai_prompt_appointment_reminder | ea3F3jW211Dj1KQDqljs | "" | REVIEW | — | Empty. Duplicated by `ai_prompt_appointment_reminder_new`. Consolidate: keep `_new` content, rename `_new` to drop the suffix, delete this empty shell. |
| AI Prompt Appointment Reminder New | ai_prompt_appointment_reminder_new | kMeb1uMJouKbGn9Gb8dD | "You are..." | REVIEW | — | Active version of appointment reminder. Should become canonical `ai_prompt_appointment_reminder` (no ABC equivalent yet — propose adding to ABC). |
| AI Prompt Booking Follow Up | ai_prompt_booking_follow_up | RSccxDneTbvpTEY3tj8D | "You are..." | KEEP | ai_prompt_booking_follow_up | Canonical match. |
| AI Prompt Buyer | ai_prompt_buyer | QBZhorfsIlj44Jr8xAkZ | "" | REVIEW | — | Empty and duplicated by `ai_prompt_real_estate_buyer`. Delete this one, keep real-estate version. |
| Ai Prompt Document Follow Up | ai_prompt_document_follow_up | gb9hIm3UtHfQI8oTYNmv | "" | REVIEW | — | Empty. Duplicate of `ai_prompt_document_reminder`. Delete, keep reminder. |
| AI Prompt Document Reminder | ai_prompt_document_reminder | RmamgyrgQWyJCn1dhnJv | "You are..." | MORTGAGE-KEEP | — | Mortgage-specific document chase prompt. Keep. |
| Ai Prompt Follow Up | ai_prompt_follow_up | NOdwYuZ622FWfqGE42o4 | "" | KEEP | ai_prompt_follow_up | Canonical match. Empty — should be populated from ABC default. |
| AI Prompt Google Review | ai_prompt_google_review | v0O8T5LbExLJregMBYwm | "You are..." | MERGE-INTO-CANONICAL | ai_prompt_google_review_request | Duplicate of `ai_prompt_google_review_request`. Keep populated value, rename to match ABC key. |
| Ai Prompt Google Review Request | ai_prompt_google_review_request | tJOk7jBIRxwwfRoNdnlI | "" | KEEP | ai_prompt_google_review_request | Canonical key, but empty. Copy value from `ai_prompt_google_review` then delete that one. |
| Ai Prompt Inbound | ai_prompt_inbound | QpDSkDteG1hS1JMVN2G7 | "" | KEEP | ai_prompt_inbound | Canonical match. Populate from ABC default. |
| AI Prompt Inbound Reception | ai_prompt_inbound_reception | RxW6LHq0jBrJpNFVgEGI | "You are..." | REVIEW | — | Variant of ai_prompt_inbound for reception bot. No ABC equivalent. Consider consolidating into `ai_prompt_inbound` or proposing as new canonical. |
| AI Prompt Long Term Nurture | ai_prompt_long_term_nurture | 85R6g1y7OphmhHkHxAh5 | "You are..." | KEEP | ai_prompt_long_term_nurture | Canonical match. |
| Ai Prompt No Show | ai_prompt_no_show | YqDb1wa40gDqUUyNX6b0 | "" | KEEP | ai_prompt_no_show | Canonical match. Empty — populate from ABC. |
| AI Prompt No Show Rebook | ai_prompt_no_show_rebook | 4PnPIx4vgOkNyDNoTbc7 | "You are..." | REVIEW | — | Variant of no_show. Consider merging content into `ai_prompt_no_show`. |
| AI Prompt Old Lead Resurrect | ai_prompt_old_lead_resurrect | 8zcjCkQI9j9N3rDT9JKM | "You are..." | MERGE-INTO-CANONICAL | ai_prompt_old_lead_resurrection | Duplicate of ABC `ai_prompt_old_lead_resurrection`. Move value to canonical key, delete this. |
| Ai Prompt Old Lead Resurrection | ai_prompt_old_lead_resurrection | 3p0xzAF6HhJiHTCF7P66 | "" | KEEP | ai_prompt_old_lead_resurrection | Canonical key. Copy populated value from `ai_prompt_old_lead_resurrect`. |
| AI Prompt Outbound Lead Call | ai_prompt_outbound_lead_call | 3PXmOmKzvniCTc79NdTN | "You are..." | REVIEW | — | Voice-specific outbound variant. No ABC equivalent. Propose adding to ABC. |
| Ai Prompt Outbound New Lead | ai_prompt_outbound_new_lead | TA5Ls1kdWhYzQrJpvHUi | "" | REVIEW | — | Empty. Likely duplicate of `ai_prompt_outbound_lead_call`. Delete. |
| Ai Prompt Partnership | ai_prompt_partnership | knnSendZArAFlw3xGt2x | "" | KEEP | ai_prompt_partnership | Canonical match. |
| AI Prompt Partnership Chat | ai_prompt_partnership_chat | 8vAJ7320vTSZ6LJr3n78 | "You are..." | MERGE-INTO-CANONICAL | ai_prompt_partnership | Copy value into `ai_prompt_partnership`, delete the `_chat` variant. |
| A.I. Prompt Pre Qualify | ai_prompt_pre_qualify | fKzZTIa2EHfgK0JsILKm | "" | REVIEW | — | Empty. Overlaps with `ai_prompt_pre_qualify_follow_up` (which has content) and ABC `ai_prompt_pre_qualify_follow_up`. Delete or repurpose. |
| AI Prompt Pre Qualify Follow Up | ai_prompt_pre_qualify_follow_up | 38Y6owp8AX57viClyeln | "You are..." | KEEP | ai_prompt_pre_qualify_follow_up | Canonical match. |
| AI Prompt Real Estate Buyer | ai_prompt_real_estate_buyer | rZjKe3deaveMGN94JyFp | "You are..." | MORTGAGE-KEEP | — | Mortgage/real-estate-specific. Keep. |
| AI Prompt Real Estate Seller | ai_prompt_real_estate_seller | AvGejJ3DMsBZ4mr2YTMo | "You are..." | MORTGAGE-KEEP | — | Mortgage/real-estate-specific. Keep. |
| AI Prompt Recruitment | ai_prompt_recruitment | ooj25iCfZOXBIAWyFVUi | "You are..." | MERGE-INTO-CANONICAL | ai_recruitment_prompt | ABC canonical is `ai_recruitment_prompt`. Move content there. |
| Ai Prompt Referral Request | ai_prompt_referral_request | q6yJogLs1FOEvNJtmPAY | "" | KEEP | ai_prompt_referral_request | Canonical match. |
| AI Prompt Referral Request New | ai_prompt_referral_request_new | MwlgDGJVsE0rMYye7XBZ | "You are..." | MERGE-INTO-CANONICAL | ai_prompt_referral_request | Move content to canonical key, delete. |
| AI Prompt Renewal Countdown | ai_prompt_renewal_countdown | pWI4xfSoKhsdEjqCh1Lu | "You are..." | MORTGAGE-KEEP | — | Mortgage renewal-specific prompt. Keep. |
| Ai Prompt Seller | ai_prompt_seller | BVMBzTYBoG0kNrzdCawx | "" | REVIEW | — | Empty. Duplicated by `ai_prompt_real_estate_seller`. Delete. |
| AI Prompt Welcome | ai_prompt_welcome | LZOHxI9qCWR0c45k1PDc | "You are..." | REVIEW | — | No ABC equivalent. Used by welcome workflows. Propose adding to ABC as canonical. |
| A.I. Question 1 | ai_question_1 | g5EMrWbJJaSxrQJ04QzJ | "" | KEEP | ai_question_1 | Canonical match. |
| A.I. Question 1 Answer | ai_question_1_answer | suUHEu97XhxYtusZfV91 | "" | KEEP | ai_question_1_answer | Canonical match. |
| A.I. Question 10 | ai_question_10 | JxZJ870476963rpcLQrE | "" | KEEP | ai_question_10 | Canonical match. |
| A.I. Question 10 Answer | ai_question_10_answer | smSm3NZClVXK65Ak6lVJ | "" | KEEP | ai_question_10_answer | Canonical match. |
| A.I. Question 2 | ai_question_2 | S13O8DIaH2XHvCt0nAHB | "" | KEEP | ai_question_2 | Canonical match. |
| A.I. Question 2 Answer | ai_question_2_answer | zqGDdA1mCBtJszzGCa9Q | "" | KEEP | ai_question_2_answer | Canonical match. |
| A.I. Question 3 | ai_question_3 | C64Yd5CLtM4BtTYk9rUu | "" | KEEP | ai_question_3 | Canonical match. |
| A.I. Question 3 Answer | ai_question_3_answer | 6SndM37Pp7LWoPjNWocm | "" | KEEP | ai_question_3_answer | Canonical match. |
| A.I. Question 4 | ai_question_4 | 5pOBZiCwVhCMnbPZsJph | "" | KEEP | ai_question_4 | Canonical match. |
| A.I. Question 4 Answer | ai_question_4_answer | onbRVBjhzddGvq4y17Kt | "" | KEEP | ai_question_4_answer | Canonical match. |
| A.I. Question 5 | ai_question_5 | ScieTxEoxgBMphbf9vmA | "" | KEEP | ai_question_5 | Canonical match. |
| A.I. Question 5 Answer | ai_question_5_answer | TvHJW8kNgzO1KGASjx4q | "" | KEEP | ai_question_5_answer | Canonical match. |
| A.I. Question 6 | ai_question_6 | jrhIqXQmWxO1w7hx9Ekl | "" | KEEP | ai_question_6 | Canonical match. |
| A.I. Question 6 Answer | ai_question_6_answer | C12ALGXVoxmzv5Nq5o17 | "" | KEEP | ai_question_6_answer | Canonical match. |
| A.I. Question 7 | ai_question_7 | NFdlyHrkzGhdDgRbURK8 | "" | KEEP | ai_question_7 | Canonical match. |
| A.I. Question 7 Answer | ai_question_7_answer | WfcrcDoHakvRXxLGNpHq | "" | KEEP | ai_question_7_answer | Canonical match. |
| A.I. Question 8 | ai_question_8 | Drixl499RIYqKZjJAxMI | "" | KEEP | ai_question_8 | Canonical match. |
| A.I. Question 8 Answer | ai_question_8_answer | JrqWysN7JGDBH04zVTyT | "" | KEEP | ai_question_8_answer | Canonical match. |
| A.I. Question 9 | ai_question_9 | T7PuN9hwkl8DXu6eHFXA | "" | KEEP | ai_question_9 | Canonical match. |
| A.I. Question 9 Answer | ai_question_9_answer | T8cOyEMWoDwOuK4jH1Rp | "" | KEEP | ai_question_9_answer | Canonical match. |
| AI Recruitment Prompt | ai_recruitment_prompt | PProcFjuBIPBKPTBGhkc | "" | KEEP | ai_recruitment_prompt | Canonical match. Populate from `ai_prompt_recruitment` content during merge. |
| AI Rules | ai_rules | F91oFTO7K4Sa3JyFo2LL | "Never promise..." | KEEP | ai_rules | Canonical match. |
| Application API Key | application_api_key | tB5owWzEOAh5WgHyoHVG | "" | MORTGAGE-KEEP | — | Scarlette API integration key. No ABC equivalent. |
| Application Link | application_link | xLFVl85TgUcStee3WZI1 | "" | KEEP | application_link | Canonical match. |
| Application Platform Name | application_platform_name | RSfqfFE2T9IHp2GEoWoY | "Scarlette" | MORTGAGE-KEEP | — | Platform-name CV (Scarlette). Mortgage-specific. |
| Application Reminder Bot | application_reminder_bot | a3e6hdyLcMCJYygYXKaf | "" | MERGE-INTO-CANONICAL | outbound_application_reminder_bot | ABC canonical uses `outbound_application_reminder_bot`. Rename. |
| Application Webhook URL | application_webhook_url | 4NToK6XKJ6vKjn0lwSBz | "" | MORTGAGE-KEEP | — | Scarlette webhook. No ABC equivalent. |
| Approval Status | approval_status | 4XinLBHiAFI6CI3lvZJA | "" | MORTGAGE-KEEP | — | Mortgage-specific deal status. Keep. |
| Billing Email | billing | FSmfFJGIzR75TdOgAZI4 | "" | MERGE-INTO-CANONICAL | billing_email | Key is truncated ("billing"). ABC canonical is `billing_email`. Rename. |
| Billing Phone Number | billing_phone_number | WUkPRyCNdkzBWxuyBUCb | "" | KEEP | billing_phone_number | Canonical match. |
| Booking Link | booking_link | p16iA1PcFzSKLN0OmBUq | "" | MERGE-INTO-CANONICAL | my_calendar | Generic booking link duplicates `my_calendar`. Consolidate to `my_calendar`. |
| Brand Color Accent | brand_color_accent | nvH9yvZ6HJ7ANn8ZQJ1V | "#E8C97A" | KEEP | brand_color_accent | Canonical match. |
| Brand Color Accent (Hex) w/ # | brand_color_accent_hex_w_ | O5Yf2GK6NVG7VUCKd1YX | "" | DELETE-ORPHAN | — | Weirdly-keyed duplicate of `brand_color_accent`. Empty, no obvious referrer. |
| Brand Color Primary | brand_color_primary | T6Wz2fI78j45xXt39g7u | "#0A1628" | KEEP | brand_color_primary | Canonical match. |
| Brand Color Secondary | brand_color_secondary | 0HQLWRaZhyzSLiqv1y7W | "#C9A84C" | KEEP | brand_color_secondary | Canonical match. |
| Brand Color Secondary (Hex) w/ # | brand_color_secondary_hex_w_ | zdaT7JV9w48XBkzFkW2C | "" | DELETE-ORPHAN | — | Weirdly-keyed duplicate. Empty. |
| Brokerage License Number | brokerage_license_number | BDHfa4DWWVoMB4ELTKN1 | "" | MORTGAGE-KEEP | — | FSRA-mandated brokerage licence. Keep. |
| Brokerage Name | brokerage_name | 0UiDLUTX6LYECZHZ1qh4 | "Ontario Lending Solutions" | MORTGAGE-KEEP | — | FSRA-mandated brokerage name. Keep. |
| Business Address | business_address | F1ik2IYPjlNk1MSa3s3F | "" | MERGE-INTO-CANONICAL | company_address | ABC uses `company_address`. Consolidate. |
| Business Hours | business_hours | gx1Vw1dyKsoAbm9qavMr | "Monday..." | KEEP | business_hours | Canonical match. Note: duplicates `hours_of_operation` and `office_hours` — see those rows. |
| Business Name | business_name | dD8n6EWZCqeHxMWX1euz | "" | MERGE-INTO-CANONICAL | company_name | ABC has both `business_name` and `company_name`; `company_name` is populated in EqM. Consolidate on `company_name`, delete `business_name`. |
| Business Phone | business_phone | vwI0W9Z07cCH4kY6Ur5p | "" | MERGE-INTO-CANONICAL | company_phone | Consolidate with `company_phone`. |
| Calendar ID | calendar_id | ozA5YTYUxrkovc8k2laW | "" | KEEP | calendar_id | Canonical match. |
| Calendar Page Link (Include Https://) | calendar_page_link_include_https | WdhgVLEd3XowVBGjRb3G | "" | MERGE-INTO-CANONICAL | my_calendar | Duplicates `my_calendar`. Consolidate. |
| CASL Consent Text | casl_consent_text | WkfV1IyLDyut609TrcYb | "By submitting..." | KEEP | casl_consent_text | Canonical match. |
| City | city | QZAG9LAaL0RMOr12Ot24 | "" | KEEP | city | Canonical match. |
| Client Onboarding Funnel | client_onboarding_funnel | jbymAvsPVYGaHZcs7Ra9 | "" | KEEP | client_onboarding_funnel | Canonical match. |
| Close Date | close_date | PSW6GzZ78iJgE5wqrK9D | "" | MORTGAGE-KEEP | — | Deal close date, mortgage-specific. |
| Color Code (Hex) w/ # | color_code | iUiJUVdVLIb94o7d7ek7 | "" | MERGE-INTO-CANONICAL | color_code_hex | ABC canonical is `color_code_hex`. Rename. |
| Company Address | company_address | SgmMHeNggj6tK358TmLq | "" | KEEP | company_address | Canonical match. |
| Company City | company_city | OLnhi9SV69lPuEDDpYUR | "Toronto" | KEEP | company_city | Canonical match. |
| Company Logo | company_logo | V2mBiKe9UORqeLuBfJ7T | "" | KEEP | company_logo | Canonical match. |
| Company Name | company_name | b8iMtygODb9EUo8tWKfH | "EquityMax.ca" | KEEP | company_name | Canonical match. |
| Company Phone | company_phone | KZ7x5ZG7sIpxtiWkM6Rn | "" | KEEP | company_phone | Canonical match. |
| Company Province | company_province | sfON7Ib1uU5ODLTxzQLb | "Ontario" | KEEP | company_province | Canonical match. |
| Company Sloagan | company_sloagan | GrpNY3l9ROJxDNBfLcjU | "" | MERGE-INTO-CANONICAL | company_slogan | Typo in key ("Sloagan"). ABC canonical is `company_slogan`. Rename. |
| Compliance Disclaimer | compliance_disclaimer | Vw9TnOaRmEs16FdXdnNK | "" | KEEP | compliance_disclaimer | Canonical match. |
| Conditions List | conditions_list | F3WYWQkw3RxaPV1zvh1p | "" | MORTGAGE-KEEP | — | Lender approval conditions list. Mortgage-specific. |
| Country | country | IZFTdnczJdlgV09mMDOB | "" | KEEP | country | Canonical match. |
| Credit Score | credit_score | Ew2t438GxGBRfcAqI0C1 | "" | MORTGAGE-KEEP | — | Mortgage-specific. |
| Deal Amount | deal_amount | UAyHHz9932X3Vc5ElhZt | "" | MORTGAGE-KEEP | — | Mortgage-specific. |
| Digital Phone Number | digital_phone_number | R4rTDdMlnJOPA9yG8TsP | "" | KEEP | digital_phone_number | Canonical match. |
| Doc Upload Link | doc_upload_link | x9fV7goXk6gLsx8C5UEz | "" | MORTGAGE-KEEP | — | Document portal link. Mortgage-specific. |
| Down Payment | down_payment | v5aSe9RNDBWxYU6x9MFp | "" | MORTGAGE-KEEP | — | Mortgage-specific. |
| Email Signature | email_signature | cnFdIsaAd5kDB5bPTpHf | "" | KEEP | email_signature | Canonical match. |
| Follow Up Calendar Booking Link | follow_up_calendar_booking_link | IJO0g9I9AgLEr120KBMO | "" | KEEP | follow_up_calendar_booking_link | Canonical match. |
| Follow up Document Bot | follow_up_document_bot | yHBGsspt1WyfIxx0ZIBL | "" | MERGE-INTO-CANONICAL | outbound_document_reminder_bot | ABC canonical uses `outbound_document_reminder_bot`. |
| FSRA Footer Full | fsra_footer_full | lxorkGX2BszyvHUX6r4d | "Renée Ross..." | MORTGAGE-KEEP | — | FSRA-mandated advertising footer. Mortgage-only. |
| Google Review Link | google_review_link | Up6eIYcYfm1LfCjtK2qe | "" | KEEP | google_review_link | Canonical match. |
| Headshot | headshot | WgJ7vFU5AH998PMuncbM | "" | KEEP | headshot | Canonical match. |
| Hours Of Operation | hours_of_operation | LExIzM5geNKWYFafZAuL | "Monday to Friday..." | MERGE-INTO-CANONICAL | business_hours | Duplicate of `business_hours`. Consolidate. |
| Income | income | KPlSwZTtGS5BKX68e7zV | "" | MORTGAGE-KEEP | — | Applicant income. Mortgage-specific. |
| Industry | industry | r1rqVBMvdxuiTLDneZCn | "Financial Services - Mortgage" | MERGE-INTO-CANONICAL | niche | Per console-rules, canonical is `niche` not `industry`. Both exist in EqM — consolidate on `niche`. |
| Internal Notification Email | internal_notification_email | Oegkot1zxlAHwzD531L0 | "renee.ross@gmail.com" | KEEP | internal_notification_email | Canonical match. |
| Appointment Confirmation Bot | introductory_bot_appointment_confirmation | wessojTYlTsBbms2BDwU | "" | MERGE-INTO-CANONICAL | ai_id_appointment_confirmation_bot | ABC canonical uses `ai_id_appointment_confirmation_bot`. Rename. |
| Knowledge Link 1 | knowledge_link_1 | Z9pdGYYD3FEldlXHX672 | "" | KEEP | knowledge_link_1 | Canonical match. |
| Knowledge Link 2 | knowledge_link_2 | q14HPReS90IOdqtIUG0g | "" | KEEP | knowledge_link_2 | Canonical match. |
| Knowledge Link 3 | knowledge_link_3 | ZILwvbzcmcFmiHhyqgA6 | "" | KEEP | knowledge_link_3 | Canonical match. |
| Knowledge Link 4 | knowledge_link_4 | sNiEVvwGu1xqyGnSnd5y | "" | KEEP | knowledge_link_4 | Canonical match. |
| Lead Webhook URL | lead_webhook_url | Ijym8E29K0wEyprYl4Ew | "" | KEEP | lead_webhook_url | Canonical match. |
| Lender Name | lender_name | BCboJyodbt8eu4dMULcX | "" | MORTGAGE-KEEP | — | Mortgage-specific. |
| Lender Submitted Date | lender_submitted_date | SO2V9XPCscMZrGviYa4v | "" | MORTGAGE-KEEP | — | Mortgage-specific. |
| License Number | license_number | v5bajk2p49y6ryqcwBsd | "" | KEEP | license_number | Canonical match. |
| License Type | license_type | aqake01n1NZgBMxeGcLD | "Mortgage Agent Level 2" | MORTGAGE-KEEP | — | FSRA licence tier. Mortgage-specific; no ABC equivalent. |
| Logo URL | logo_url | 1BAT1HP6u2HOgoMiK1VQ | "" | KEEP | logo_url | Canonical match. |
| LTV Calculator Link | ltv_calculator_link | ZvZgCjG1VM7wT8jkSAjn | "" | MORTGAGE-KEEP | — | Mortgage-specific. |
| LTV (Loan to Value) | ltv_loan_to_value | 8ciDB0frut63X6KDNwcj | "" | MORTGAGE-KEEP | — | Mortgage-specific. |
| Main Landing Page | main_landing_page | olMRHzYZNHfbWYAXKkYm | "" | KEEP | main_landing_page | Canonical match. |
| Maturity Date | maturity_date | WyD9qhvaR6tVpWSKHnIw | "" | MORTGAGE-KEEP | — | Mortgage-specific. |
| Max LTV | max_ltv | MfY06s24dA6lGihcHiMz | "" | MORTGAGE-KEEP | — | Mortgage-specific. |
| Min Credit Score | min_credit_score | 1WkSvE4VrSud0rpca5jJ | "" | MORTGAGE-KEEP | — | Mortgage-specific. |
| Mortgage Agent Full Name | mortgage_agent_full_name | wh056ZJszrROh7m8ujwU | "Renée Ross" | MORTGAGE-KEEP | — | FSRA-required; also duplicates `user_full_name`. Keep because FSRA compliance text uses this exact naming; prefer referencing `user_full_name` for generic use. |
| Mortgage Agent License Number | mortgage_agent_license_number | Xvp1gGAmSDy86fc6Uq4y | "#13063" | MORTGAGE-KEEP | — | FSRA-mandated. Keep. |
| Mortgage Agent License Type | mortgage_agent_license_type | hfGUiDMwJOH49kLwU3IA | "Mortgage Agent Level 2" | MORTGAGE-KEEP | — | FSRA-mandated. Keep (duplicates `license_type` but is the FSRA-compliant key). |
| Mortgage Amount | mortgage_amount | vLQJlNEKhC9SNFhtJ2Uy | "" | MORTGAGE-KEEP | — | Mortgage-specific. |
| Prequalify Bot | mortgage_bot | b6DcBZLHWHdsXzexRbvL | "" | MERGE-INTO-CANONICAL | ai_id_pre_qualification_bot | ABC canonical is `ai_id_pre_qualification_bot`. Rename. |
| Qualified Booking Link | mortgage_form_qualified_trigger_to_booking_link | FqxIWVW14dkAVhs5JVcR | "" | MERGE-INTO-CANONICAL | qualified_booking_link | Unwieldy key — ABC canonical is `qualified_booking_link`. Rename. |
| Mortgage Type | mortgage_type | IiaAokdoS4lwNfZREqhd | "" | MORTGAGE-KEEP | — | Mortgage-specific. |
| My Calendar | my_calendar | xeonaRnKs4TRml9pgkxV | "" | KEEP | my_calendar | Canonical match. |
| New Team Member Onboarding Form Link | new_team_member_onboarding_form_link | wnjPnjyo8zeL2PRR8MQo | "" | MERGE-INTO-CANONICAL | team_onboarding_survey | ABC uses `team_onboarding_survey` / `team_onboarding_funnel`. Consolidate. |
| niche | niche | X6RZPdeGOOkuA1doOFxI | "Mortgage Brokerage" | KEEP | niche | Canonical match (per console-rules). |
| Not Qualified Details | not_qualified_details | 8AOgcv5RQPKFrO3OHO0y | "" | KEEP | not_qualified_details | Canonical match. |
| NOT Qualified Landing Page Link | not_qualified_landing_page_link | QlJnuj5W5ubrb1BkRgja | "" | MERGE-INTO-CANONICAL | not_qualified_landing_page | ABC canonical is `not_qualified_landing_page`. Rename. |
| Not Qualified Lead Description | not_qualified_lead_description | O5kp5UAr7wq28dwoXshb | "" | MERGE-INTO-CANONICAL | not_qualified_lead_details | ABC canonical is `not_qualified_lead_details`. Rename. |
| Not Qualified Lead Details | not_qualified_lead_details | DNSIspiH4uh2ihOJnyLL | "Outside Canada..." | KEEP | not_qualified_lead_details | Canonical match. |
| office_hours | office_hours | EOU8N6aft6TsM5QrppDX | "Monday to Friday..." | MERGE-INTO-CANONICAL | business_hours | Third duplicate of business_hours. Consolidate. |
| OpenAI Prompt | openai_prompt | hKKgHTBXo8qZc1E57Gar | "" | KEEP | openai_prompt | Canonical match. Likely unused legacy placeholder. |
| Owner Full Name | owner_full_name | suzuwpay2wYXSLDq4Uz2 | "Renée Ross" | DELETE-DEPRECATED | user_full_name | Console-rules explicitly forbids `owner_*`. Already flagged. |
| Owner Name | owner_name | JG74b0UFQRYpm85IEctN | "Renée" | DELETE-DEPRECATED | user_first_name | Console-rules explicitly forbids `owner_*`. Already flagged. |
| Partner Email | partner_email | lFsC56BC26fjfxu42fza | "" | KEEP | partner_email | Canonical match. |
| Partner Name | partner_name | iZPAOuNhPjbzCM8o2hNd | "" | KEEP | partner_name | Canonical match. |
| Partner Phone | partner_phone | alQWBqi3cvjdeT7WDMmT | "" | KEEP | partner_phone | Canonical match. |
| Partner Type | partner_type | JbOvhj6aElor9Y1r1N7N | "" | KEEP | partner_type | Canonical match. |
| Partnership Calendar Booking Link | partnership_calendar_booking_link | nEZoNe5lCKLivcisdKP1 | "" | KEEP | partnership_calendar_booking_link | Canonical match. |
| Partnership Calendar Link | partnership_calendar_link | snrJhIqhVJIJQTNexMUs | "" | KEEP | partnership_calendar_link | Canonical match. |
| Payment Webhook URL | payment_webhook_url | e8XuiUJxVKMTrSompgfX | "" | KEEP | payment_webhook_url | Canonical match. |
| Pre Qualify Buyer Form Link | pre_qualify_buyer_link | Rg3Zc6uepYv6PinS0ePE | "" | MORTGAGE-KEEP | — | Real-estate buyer form. Mortgage-specific. |
| Pre Qualify Form Link | pre_qualify_form_link | FkwrXZmEtjRZhZKot3Pv | "" | KEEP | pre_qualify_form_link | Canonical match. |
| Pre Qualify Seller Form Link | pre_qualify_seller_link | P0h2qySQFSs6WY7f33Gv | "" | MORTGAGE-KEEP | — | Real-estate seller form. Mortgage-specific. |
| Pre Qualifying Form Link | pre_qualifying_form_link | oDBNFzm0xHRzvh5slPI7 | "" | MERGE-INTO-CANONICAL | prequalifying_form_link | ABC uses `prequalifying_form_link` (no underscore). Choose one; ABC already has both `pre_qualify_form_link` and `prequalifying_form_link`, so keep `pre_qualify_form_link` and delete this. |
| Primary Hex Color | primary_hex_color | LDRVjWceCt5NfoeCHY5E | "" | MERGE-INTO-CANONICAL | company_primary_hex_color | ABC canonical is `company_primary_hex_color`. Rename. |
| Principal Broker Name | principal_broker_name | 5MzpHvqJCXg1O9qV4oBF | "" | MORTGAGE-KEEP | — | FSRA-mandated principal broker. Mortgage-specific. |
| Privacy Policy | privacy_policy | K4SuepMuNbhi3i0ndSWp | "" | KEEP | privacy_policy | Canonical match. |
| Privacy Policy URL | privacy_policy_url | 0hiVaHGJANHJ5QMGR5M0 | "" | KEEP | privacy_policy_url | Canonical match. |
| product / service 1 | product__service_1 | GNn6siokE1CH5mLk3Ch3 | "" | DELETE-DEPRECATED | product_service_1 | Double-underscore bug. Already flagged in memory. Delete, use `product_service_1`. |
| product / service 2 | product__service_2 | SolfXSERvQqavB0YFlQm | "" | DELETE-DEPRECATED | product_service_2 | Double-underscore bug. Delete. |
| Product Service 1 | product_service_1 | 91SgM0RTS18VjWRxqnTR | "Purchase" | KEEP | product_service_1 | Canonical match. |
| product/ service 10 | product_service_10 | PmWPbTnCRfSwIjpda3mW | "" | KEEP | product_service_10 | Canonical key (name is ugly but key matches). Clean up display name. |
| Product Service 2 | product_service_2 | mUFhX6V7fpT0n4eIixzt | "Purchase First-Time Buyer" | KEEP | product_service_2 | Canonical match. |
| product/ service 3 | product_service_3 | 027l41jmq8k2nRX2lJpY | "" | KEEP | product_service_3 | Canonical match. |
| product/ service 4 | product_service_4 | ghwartbI71SqlwXtQUzI | "" | KEEP | product_service_4 | Canonical match. |
| product/ service 5 | product_service_5 | 4BJgWO89L4NE4vcryNXt | "" | KEEP | product_service_5 | Canonical match. |
| product/ service 6 | product_service_6 | 1dQY8Fz275hsa3QIunWO | "" | KEEP | product_service_6 | Canonical match. |
| product/ service 7 | product_service_7 | cKocslbGworJQVX5H2Vj | "" | KEEP | product_service_7 | Canonical match. |
| product/ service 8 | product_service_8 | zCw3btq9NaHuzcGuPqHi | "" | KEEP | product_service_8 | Canonical match. |
| product/ service 9 | product_service_9 | RCY6euwNalnEG32gxSar | "" | KEEP | product_service_9 | Canonical match. |
| Property Type | property_type | 441zGftjFRyVlGF6DplT | "" | MORTGAGE-KEEP | — | Mortgage-specific. |
| Property Value | property_value | Bdt5cuMCHHbLMb28IPTl | "" | MORTGAGE-KEEP | — | Mortgage-specific. |
| Province Or State | province_or_state | JPsyQJIJlMfGspk1UEsE | "" | KEEP | province_or_state | Canonical match. |
| Purpose | purpose | kl64Zd6WboR7tyYux7Nm | "" | REVIEW | — | Ambiguous — likely mortgage purpose (purchase/refi/renewal). Rename to `mortgage_purpose` for clarity. |
| Qualified Details | qualified_details | IaKo6SwtLu2EoUtiheAy | "" | KEEP | qualified_details | Canonical match. |
| Qualified Landing Page | qualified_landing_page | Axymv1B2Mc84He6OcSb5 | "" | KEEP | qualified_landing_page | Canonical match. |
| Qualified Lead Description | qualified_lead_description | Kz5YNxwXMBmTRDCEJEIk | "" | MERGE-INTO-CANONICAL | qualified_lead_details | ABC canonical is `qualified_lead_details`. Rename. |
| Qualified Lead Details | qualified_lead_details | EACks6cdYP4E73LXvz3K | "Canadian resident..." | KEEP | qualified_lead_details | Canonical match. |
| Rate Request Form Link | rate_request_form_link | DsOae5rY7s02cuTWoUIz | "" | MORTGAGE-KEEP | — | Mortgage-specific. |
| Real Estate Buyer Form Link | real_estate_buyer_form_link | nBUoNw1Xinilg3AzOkRa | "" | MORTGAGE-KEEP | — | Partnership vertical. Keep. |
| Real Estate Landing Page URL | real_estate_landing_page_url | o7ps3XeYIlWho4VdkqbH | "" | MORTGAGE-KEEP | — | Partnership vertical. Keep. |
| Real Estate Partner Calendar Link | real_estate_partner_calendar_link | Q3QQ3n2ozh2MDLmYFiA0 | "" | MORTGAGE-KEEP | — | Partnership vertical. Keep. |
| Real Estate Seller Form Link | real_estate_seller_form_link | j2qKRQb5hdq2Bdc3eS7l | "" | MORTGAGE-KEEP | — | Partnership vertical. Keep. |
| Recruitment Calendar | recruitment_calendar | nAd31zr3GzvWFQRZ4cfp | "" | KEEP | recruitment_calendar | Canonical match. |
| Recruitment Calendar Booking Link | recruitment_calendar_booking_link | KMhCdLYEQZc9rdVjRbIo | "" | KEEP | recruitment_calendar_booking_link | Canonical match. |
| Recruitment Landing Page | recruitment_landing_page | KuYpzRoXq1jEu4ikNW5M | "" | KEEP | recruitment_landing_page | Canonical match. |
| Recruitment Link | recruitment_link | 4xxKbpFtqxh3F1197Xh4 | "" | KEEP | recruitment_link | Canonical match. |
| Referral Link | referral_link | gNIezRknUILSbhkqN7wE | "" | KEEP | referral_link | Canonical match. |
| Renewal Date | renewal_date | 5dQ4WE7zaq1ldROoTj5B | "" | MORTGAGE-KEEP | — | Mortgage-specific. |
| Robot Webhook | robot_webhook | J1ZOstyFZEuWVfMRVOQ8 | "" | REVIEW | — | Generic name, unclear purpose. Not in ABC. Either rename descriptively or delete if not referenced. |
| Robot Webhook - Nonbooking | robot_webhook__nonbooking | u07h9WkjFIxTUQGWOMPr | "" | REVIEW | — | Double-underscore + unclear purpose. Rename or delete. |
| Sales Email | sales_email | ouIqPPSXAKRtaU8OLAiw | "" | KEEP | sales_email | Canonical match. |
| Sales Phone | sales_phone | NnsAZ1sQKw5pnLuTTnJn | "" | KEEP | sales_phone | Canonical match. |
| Secondary Hex Color | secondary_hex_color | mPckz0zFoMFE837JKSYH | "" | MERGE-INTO-CANONICAL | company_secondary_hex_color | ABC canonical is `company_secondary_hex_color`. Rename. |
| Self Employed | self_employed | uK2gZrqlpHXZ0lL4HH9x | "" | MORTGAGE-KEEP | — | Mortgage qualifier. |
| Seller Calendar | seller_calendar | LGjT4jEZOGc1uuILJS1E | "" | MORTGAGE-KEEP | — | Real-estate partnership. Keep. |
| Service Area | service_area | Y2eoBmAn9rEO5M7FmuhP | "" | KEEP | service_area | Canonical match. |
| service_description | service_description | yDBQ2TuhhoLNf4VjyhMb | "Residential and commercial..." | REVIEW | — | No ABC equivalent. Overlaps with `user_business_description`. Consider renaming to `user_business_description` and merging. |
| Services | services | mhd5m3DX9KYjMJiwZNZe | "" | REVIEW | — | Empty. Overlaps with `product_service_1..10`. Likely orphan. |
| Short Address | short_address | rJ4yD1bZuYucOw2QhTnw | "" | KEEP | short_address | Canonical match. |
| Specialties | specialties | i7OTkoLjAv2QGrBwZgi7 | "" | REVIEW | — | No ABC equivalent; empty. Likely orphan or roll into `product_service_*`. |
| Support Phone | support | YdvSm5FFRVU6u7IKs2ze | "" | MERGE-INTO-CANONICAL | support_phone | Key is truncated. ABC canonical is `support_phone`. Rename. |
| Support Email | support_email | mjUeAxE3NMIPdHMPK58V | "" | KEEP | support_email | Canonical match. |
| Tagline | tagline | uwJP3Wx850hlXkRHneqE | "" | MERGE-INTO-CANONICAL | company_slogan | Duplicates `company_slogan`. Consolidate. |
| Target Market | target_market | jFTUbU07ofUQ9jsVftez | "" | KEEP | target_market | Canonical match. |
| Team Onboarding Funnel | team_onboarding_funnel | 7tueGGElxOpfuR3wUZCQ | "" | KEEP | team_onboarding_funnel | Canonical match. |
| Team Onboarding Survey | team_onboarding_survey | tYuYqgPH0ya9LCac0dAU | "" | KEEP | team_onboarding_survey | Canonical match. |
| Term | term | 5C1g5T9D7wVPLsWoKkSP | "" | MORTGAGE-KEEP | — | Mortgage term length. |
| Terms of Service | terms_of_service | 9mToBPLCgdM554Qng7QT | "" | KEEP | terms_of_service | Canonical match. |
| Terms URL | terms_url | 8gJPnZ5yDvsATA3cLWiv | "" | KEEP | terms_url | Canonical match. |
| Timeline | timeline | y3SIX7OXdP0SNt7xxcYo | "" | MORTGAGE-KEEP | — | Deal timeline. Mortgage-specific. |
| Timezone | timezone | 2OCOSDwHDrnlvaFj4grG | "" | KEEP | timezone | Canonical match. |
| Total Debt | total_debt | 7BHmq9tTm1sWGoNSrCie | "" | MORTGAGE-KEEP | — | Mortgage-specific. |
| Transfer Phone Number | transfer_phone_number | ULzOoJUYhybyPJHeVoDi | "+14168784622" | KEEP | transfer_phone_number | Canonical match. |
| User About Paragraph | user_about_paragraph | G60aYEH5eNQcpK5rRwt0 | "" | KEEP | user_about_paragraph | Canonical match. |
| User Calendar Booking Link | user_calendar_booking_link | qdyZrFpZ4HYVAqMJacTF | "" | KEEP | user_calendar_booking_link | Canonical match. |
| User Email | user_email | JGyL3PQvDdn0JarlbpSl | "" | KEEP | user_email | Canonical match. |
| User First Name | user_first_name | 8nzyXz0A4iuoEl8f5Ekr | "" | KEEP | user_first_name | Canonical match. Populate from `owner_name` before deleting that. |
| User Full Name | user_full_name | wGOURYvckccqHTsQyokI | "" | KEEP | user_full_name | Canonical match. Populate from `owner_full_name` before deleting that. |
| User Headshot URL | user_headshot_url | IUwQK7EIFJbiJeMp1rv4 | "" | KEEP | user_headshot_url | Canonical match. |
| User Job Title | user_job_title | 96Ho80OXBEvpWY23alft | "" | KEEP | user_job_title | Canonical match. |
| User Last Name | user_last_name | gG2XDhAOYpsJLRH0o5Iy | "Ross" | KEEP | user_last_name | Canonical match. |
| User Phone | user_phone | SAjfpVtT8b3lmWFusqkw | "+14168784622" | KEEP | user_phone | Canonical match. |
| user sms signature | user_sms_signature | zF6fD5W10SfK55UY1rAO | "" | KEEP | user_sms_signature | Canonical match. Fix display name capitalization. |
| Voice Bot ID | voice_bot_id | 1sExbarKpckgkhwoaxpZ | "" | REVIEW | — | Generic voice bot ID. ABC has role-specific IDs (`ai_id_*`). Rename to match role it serves. |
| Webinar Date | webinar_date | AN5XyZbbGPn34FHkJ3VJ | "" | KEEP | webinar_date | Canonical match. |
| Webinar Link | webinar_link | n6szd5L1EvQm3qKvBbXY | "" | KEEP | webinar_link | Canonical match. |
| Webinar Time | webinar_time | RkHxHoWj5PXca2Txh5OI | "" | KEEP | webinar_time | Canonical match. |
| User Website | website | op634PZzqSZvnYAEdRI8 | "" | KEEP | website | Canonical per console-rules. Display name `User Website` is misleading; rename name to `Website`. |
| Website URL | website_url | ColU0peIZWjkn4vRcbz9 | "https://equitymax.ca" | MERGE-INTO-CANONICAL | website | Per console-rules, canonical is `website`. Consolidate. |
| Years In Business | years_in_business | 3MJiC9HoqRnbmBkf1fXR | "" | REVIEW | — | No ABC equivalent. If needed for prompts, propose adding to ABC canonical; otherwise delete. |

---

## ABC CVs — Action table (internal duplicates only)

| CV name | ABC key | ABC ID | Action | Merge-into | Reason |
|---|---|---|---|---|---|
| Privacy Policy | privacy_policy | YrW8mUnnDGu454zQHsdT | REVIEW | privacy_policy_url | ABC has three privacy keys: `privacy_policy`, `privacy_policy_page`, `privacy_policy_url`. Pick one canonical (recommend `privacy_policy_url`) and retire the other two. |
| Privacy Policy Page | privacy_policy_page | 1rGxJZgWMtcNgAyxRy6G | REVIEW | privacy_policy_url | See above. |
| Qualified Page | qualified_page | GrQjfXfbKDLg9DXSrrJi | REVIEW | qualified_landing_page | ABC has both `qualified_landing_page` and `qualified_page`. Consolidate on `qualified_landing_page`. |
| Not Qualified Page | not_qualified_page | 0diy5jCENcW3lUiNcHMx | REVIEW | not_qualified_landing_page | ABC has both; consolidate on `not_qualified_landing_page`. |
| not_qualified_landing_page | not_qualified_landing_page | 7L56TTm70q2pzVARR34g | KEEP | — | Canonical. |
| Not Qualified Lead Details | not_qualified_lead_details | YtrmFUQyNH3xsxjMf2XQ | KEEP | — | Canonical. Retire `not_qualified_details` (same concept) via REVIEW. |
| Not Qualified Details | not_qualified_details | lD90ESGnSH11UK8eG6q1 | REVIEW | not_qualified_lead_details | Duplicate. Consolidate. |
| Qualified Details | qualified_details | PO0ZpvJ8WNXksHbLKlwS | REVIEW | qualified_lead_details | Duplicate. Consolidate. |
| Qualified Lead Details | qualified_lead_details | OfW07ObK19YJI5ZWYYTb | KEEP | — | Canonical. |
| Terms and Conditions Page | terms_and_conditions_page | pIsA7OgWxZ28o170KWmC | REVIEW | terms_url | ABC has three terms keys: `terms_and_conditions_page`, `terms_of_service`, `terms_url`. Consolidate on `terms_url`. |
| Terms of Service | terms_of_service | Q2cMtmCTtbUSRfxt6au3 | REVIEW | terms_url | See above. |
| Recruitment Link | recruitment_link | NbT5CUKTprczii95bYon | KEEP | — | Canonical. |
| Recruitment Landing Page | recruitment_landing_page | BDLLjAHWZDztJezyk9sp | REVIEW | recruitment_link | Possible duplicate — clarify which one is "the link you send" vs "the page it lands on". |
| Recruitment Page | recruitment_page | 4J6EZracz2b3gdM5fEek | REVIEW | recruitment_landing_page | Duplicate of recruitment_landing_page. |
| Company Phone | company_phone | eVtgTA2hYMripkAPKEwA | KEEP | — | Canonical. Consolidate with `digital_phone_number`, `digital_phone_number_alt` if they overlap in purpose. |
| Follow Up Calendar Booking Link | follow_up_calendar_booking_link | LIsusckGrp4SGWe06A1r | KEEP | — | Canonical. |
| Follow Up Calendar Link | follow_up_calendar_link | sKBXlPEO0k5pPCQOtUFz | REVIEW | follow_up_calendar_booking_link | Duplicate of follow_up_calendar_booking_link. |
| Partnership Calendar Link | partnership_calendar_link | NvHGrGuEu0b0g9fzTaQH | REVIEW | partnership_calendar_booking_link | Duplicate. |
| Calendar ID Follow Up | calendar_id_follow_up | 5lxpJcJX7CCvoEmHBtCe | REVIEW | — | Orphan-risk; ABC has 6 calendar_id_* CVs with no clear consumers. Audit usage before retaining all. |
| Pre Qualify Form Link | pre_qualify_form_link | kIpqsHnedULa4n1bgrR0 | KEEP | — | Canonical. |
| Prequalifying Form Link | prequalifying_form_link | a1XUTZXWWbyd8NdhzoVd | REVIEW | pre_qualify_form_link | Duplicate. |
| Main Landing Page Link | main_landing_page_link | 4eVqrdx4TSRWiuOW7q4m | REVIEW | main_landing_page | Duplicate of main_landing_page. |

---

## Tags — EquityMax

| Tag name | Action | Merge-into | Reason |
|---|---|---|---|
| 1770411789818x729503551179194400 | DELETE-ORPHAN | — | Looks like a stray Bubble/Lovable or external ID. Not a meaningful tag. |
| 1770411937731x786716738265284600 | DELETE-ORPHAN | — | Same as above. |
| 6/8/2024_call_ended | DELETE-ORPHAN | — | Date-stamped one-off tag. Delete. |
| ai-chat-abandoned | KEEP | — | Matches ABC canonical split convention. |
| ai-chat-app-sent | KEEP | — | Canonical. |
| ai-chat-booked | KEEP | — | Canonical. |
| ai-chat-form-completed | KEEP | — | Canonical. |
| ai-chat-form-started | KEEP | — | Canonical. |
| ai-chat-needs-review | KEEP | — | Canonical. |
| ai-chat-not-interested | KEEP | — | Canonical. |
| ai-chat-qualified | KEEP | — | Canonical. |
| ai-chat-real-estate-booked | MORTGAGE-KEEP | — | Real-estate vertical split. Propose adding to ABC as optional. |
| ai-chat-rebooked | KEEP | — | Canonical. |
| ai-chat-response-delayed | KEEP | — | Canonical. |
| ai-chat-transferred | KEEP | — | Canonical. |
| ai-chat-unqualified | KEEP | — | Canonical. |
| ai-voice-app-sent | KEEP | — | Canonical. |
| ai-voice-booked | KEEP | — | Canonical. |
| ai-voice-call-booked | MERGE-INTO-CANONICAL | ai-voice-booked | Duplicate of ai-voice-booked. |
| ai-voice-call-failed | KEEP | — | Canonical. |
| ai-voice-form-completed | KEEP | — | Canonical. |
| ai-voice-form-started | KEEP | — | Canonical. |
| ai-voice-hangup | KEEP | — | Canonical. |
| ai-voice-needs-review | KEEP | — | Canonical. |
| ai-voice-no-answer | KEEP | — | Canonical. |
| ai-voice-not-interested | KEEP | — | Canonical. |
| ai-voice-qualified | KEEP | — | Canonical. |
| ai-voice-real-estate-booked | MORTGAGE-KEEP | — | Real-estate vertical split. |
| ai-voice-rebooked | KEEP | — | Canonical. |
| ai-voice-transferred | KEEP | — | Canonical. |
| ai-voice-unqualified | KEEP | — | Canonical. |
| ai-voice-voicemail-left | KEEP | — | Canonical. |
| ai_call_answered | MERGE-INTO-CANONICAL | ai-voice-call-complete | Legacy underscore convention. Migrate. |
| ai_call_convo | DELETE-ORPHAN | — | Ambiguous legacy tag. |
| ai_sms_call_complete | MERGE-INTO-CANONICAL | ai-chat-transferred | Unclear semantics; likely means chat-to-call handoff completed. Either merge into ai-chat-transferred or delete. |
| ai_sms_call_not_complete | DELETE-DEPRECATED | — | Legacy. |
| ai_sms_not_qualified | MERGE-INTO-CANONICAL | ai-chat-unqualified | Legacy underscore. |
| ai_sms_qualified | MERGE-INTO-CANONICAL | ai-chat-qualified | Legacy underscore. |
| ai_voice_call_complete | MERGE-INTO-CANONICAL | voice-call-complete | ABC canonical is `voice-call-complete`. |
| ai_voice_call_not_complete | DELETE-DEPRECATED | — | Legacy. |
| ai_voice_not_qualified | MERGE-INTO-CANONICAL | ai-voice-unqualified | Legacy underscore. |
| ai_voice_prequalified | MERGE-INTO-CANONICAL | pre-qualified | Legacy. |
| ai_voice_qualified | MERGE-INTO-CANONICAL | ai-voice-qualified | Legacy underscore. |
| application | MERGE-INTO-CANONICAL | application-sent | Too vague alone. |
| application-complete | KEEP | — | Canonical. |
| application-sent | KEEP | — | Canonical. |
| appointment | MERGE-INTO-CANONICAL | appointment booked | Too vague alone. |
| appointment confirmation call | DELETE-ORPHAN | — | Likely legacy/unused. |
| appointment_booked | MERGE-INTO-CANONICAL | appointment booked | Underscore duplicate. |
| appointment_fail | DELETE-DEPRECATED | — | Legacy. |
| approved | KEEP | — | Canonical. |
| buyers | MORTGAGE-KEEP | — | Real-estate vertical. |
| call_trigger_failed | MERGE-INTO-CANONICAL | call-transfer-failed | Legacy underscore; semantics overlap. |
| client | MERGE-INTO-CANONICAL | active client | Ambiguous alone. |
| client-funded | MERGE-INTO-CANONICAL | funded | Duplicate. |
| closed | MERGE-INTO-CANONICAL | closing | Either duplicate of closing or of funded. Clarify. |
| clubcondo | DELETE-ORPHAN | — | Campaign-specific legacy. |
| cold | MERGE-INTO-CANONICAL | cold-lead | Legacy short form. |
| cold-lead | KEEP | — | Canonical. |
| commercial | MORTGAGE-KEEP | — | Mortgage product category. |
| completed pre qual form | MERGE-INTO-CANONICAL | pre-qualify-complete | Spaces variant. |
| conditional-approval | KEEP | — | Canonical. |
| dnc | DELETE-DEPRECATED | — | Non-standard. Use `dnd`. |
| dnd | KEEP | — | Canonical. |
| documents-complete | KEEP | — | Canonical. |
| documents-requested | KEEP | — | Canonical. |
| email-warmup | DELETE-ORPHAN | — | One-off campaign tag. |
| email-warmup-maxequity | DELETE-ORPHAN | — | One-off campaign tag. |
| equitymax website | MERGE-INTO-CANONICAL | source-website | Legacy source tag. |
| existing-client | KEEP | — | Canonical. |
| fb lead form | MERGE-INTO-CANONICAL | source-facebook | Legacy source label. |
| flip | MORTGAGE-KEEP | — | Mortgage product category. |
| follow up | MERGE-INTO-CANONICAL | sales-follow-up | Underscore/spacing variant. |
| follow-up | MERGE-INTO-CANONICAL | sales-follow-up | Duplicate. |
| funded | KEEP | — | Canonical. |
| generic | DELETE-ORPHAN | — | Not meaningful. |
| heloc | MORTGAGE-KEEP | — | Mortgage product. |
| high priority | REVIEW | — | ABC has no equivalent. Propose as canonical or delete. |
| hot-lead | KEEP | — | Canonical. |
| john lead | DELETE-ORPHAN | — | Personal labeling. |
| kijiji | MERGE-INTO-CANONICAL | source-kijiji | Legacy source label. |
| lead currently in workflow | DELETE-ORPHAN | — | Workflow-state tag, should be pipeline stage. |
| lead currently in workflow sms | DELETE-ORPHAN | — | Same. |
| lead paid | MERGE-INTO-CANONICAL | client-paid | ABC canonical is `client-paid`. |
| long term nurture | MERGE-INTO-CANONICAL | long-term-nurture | Spacing variant. |
| long term nurture sms | MERGE-INTO-CANONICAL | long-term-nurture | Bot-channel split not needed here. |
| manual_workflow_add | DELETE-ORPHAN | — | Not meaningful as permanent tag. |
| meeting-link-clicked | REVIEW | — | Not in ABC. Useful engagement tag — propose adding to ABC. |
| meeting-link-not-clicked | REVIEW | — | Same. |
| mike lead | DELETE-ORPHAN | — | Personal labeling. |
| mortgage form started | MERGE-INTO-CANONICAL | pre-qualify-started | Spacing variant; mortgage-flavored. |
| mortgage lead | MORTGAGE-KEEP | — | Vertical qualifier. |
| mortgage test | DELETE-ORPHAN | — | Test artifact. |
| mortgage_demo_call | DELETE-ORPHAN | — | Legacy demo tag. |
| name via lookup | DELETE-ORPHAN | — | Data-provenance tag, not meaningful. |
| new lead | KEEP | — | Canonical. |
| new lead no response | MERGE-INTO-CANONICAL | unresponsive | Spacing variant. |
| new-business-lead | KEEP | — | Canonical. |
| new-client | KEEP | — | Canonical. |
| nikki lead | DELETE-ORPHAN | — | Personal labeling. |
| no mass communication | MERGE-INTO-CANONICAL | no-mass-comm | Spacing variant. |
| no mass communication sms | MERGE-INTO-CANONICAL | no-mass-comm | Spacing variant. |
| no-mass-comm | KEEP | — | Canonical. |
| no-show | KEEP | — | Canonical. |
| not interested | MERGE-INTO-CANONICAL | not-interested | Spacing variant. |
| not qualified | MERGE-INTO-CANONICAL | not-interested | Spacing variant; also ABC has `not qualified` with space. |
| not-interested | KEEP | — | Canonical. |
| not_interested | MERGE-INTO-CANONICAL | not-interested | Underscore variant. |
| old lead | MERGE-INTO-CANONICAL | old-lead | Spacing variant. |
| old lead currently in workflow | DELETE-ORPHAN | — | Workflow-state. |
| old lead sms | MERGE-INTO-CANONICAL | old-lead | Channel-split not needed here. |
| old-lead | KEEP | — | Canonical. |
| partner-assigned | KEEP | — | Canonical. |
| partner-lead | KEEP | — | Canonical. |
| partnership | MERGE-INTO-CANONICAL | partnership-lead | ABC canonical is `partnership-lead`. |
| partnership-lead | KEEP | — | Canonical. |
| phone verified | REVIEW | — | Not in ABC. Useful for voice workflow — propose adding. |
| pre-qual-complete | MERGE-INTO-CANONICAL | pre-qualify-complete | Duplicate. |
| pre-qual-form-needed | REVIEW | — | Not in ABC. Propose adding or delete. |
| pre-qualify-complete | KEEP | — | Canonical. |
| pre-qualify-started | KEEP | — | Canonical. |
| private | MORTGAGE-KEEP | — | Private mortgage product. |
| productservice_1 | DELETE-DEPRECATED | — | Missing underscore. Replaced by proper product_service tags. |
| productservice_10 | DELETE-DEPRECATED | — | Same. |
| productservice_2 | DELETE-DEPRECATED | — | Same. |
| productservice_3 | DELETE-DEPRECATED | — | Same. |
| productservice_4 | DELETE-DEPRECATED | — | Same. |
| productservice_5 | DELETE-DEPRECATED | — | Same. |
| productservice_6 | DELETE-DEPRECATED | — | Same. |
| productservice_7 | DELETE-DEPRECATED | — | Same. |
| productservice_8 | DELETE-DEPRECATED | — | Same. |
| productservice_9 | DELETE-DEPRECATED | — | Same. |
| purchase | MORTGAGE-KEEP | — | Mortgage product. |
| purchase  | DELETE-DEPRECATED | purchase | Trailing-space duplicate. |
| purchase-ftb | MORTGAGE-KEEP | — | Purchase — first-time buyer. |
| qualified | KEEP | — | Canonical. |
| real-estate-booked | MORTGAGE-KEEP | — | Partnership vertical. |
| real-estate-buyer | MORTGAGE-KEEP | — | Partnership vertical. |
| real-estate-qualified | MORTGAGE-KEEP | — | Partnership vertical. |
| real-estate-seller | MORTGAGE-KEEP | — | Partnership vertical. |
| realtor | MORTGAGE-KEEP | — | Partnership role. |
| recruitment | MERGE-INTO-CANONICAL | recruitment-lead | ABC canonical is `recruitment-lead`. |
| recruitment-lead | KEEP | — | Canonical. |
| referral | MERGE-INTO-CANONICAL | referral-lead | ABC canonical is `referral-lead`. |
| referral-lead | KEEP | — | Canonical. |
| referred a client | MERGE-INTO-CANONICAL | referral given | ABC canonical is `referral given`. |
| refinance | MORTGAGE-KEEP | — | Mortgage product. |
| renee | DELETE-DEPRECATED | — | Personal labeling. |
| renee lead | DELETE-DEPRECATED | — | Personal labeling. |
| renewal | MORTGAGE-KEEP | — | Mortgage product. |
| renewal-120-days | MORTGAGE-KEEP | — | Mortgage renewal countdown. |
| renewal-14-days | MORTGAGE-KEEP | — | Same. |
| renewal-30-days | MORTGAGE-KEEP | — | Same. |
| renewal-60-days | MORTGAGE-KEEP | — | Same. |
| renewal-90-days | MORTGAGE-KEEP | — | Same. |
| renovation | MORTGAGE-KEEP | — | Mortgage product. |
| resend_construction | DELETE-ORPHAN | — | Legacy email-resend tag. |
| resend_generic | DELETE-ORPHAN | — | Legacy. |
| resend_private | DELETE-ORPHAN | — | Legacy. |
| resend_purchase | DELETE-ORPHAN | — | Legacy. |
| resend_reverse | DELETE-ORPHAN | — | Legacy. |
| reverse | MORTGAGE-KEEP | — | Reverse mortgage product. |
| second | MORTGAGE-KEEP | — | Second mortgage product. |
| sellers | MORTGAGE-KEEP | — | Real-estate vertical. |
| send_application_link | REVIEW | — | Action-trigger tag; valid if still used by workflow. |
| sheh | DELETE-ORPHAN | — | Personal labeling. |
| source-event | KEEP | — | Canonical. |
| source-facebook | KEEP | — | Canonical. |
| source-google | KEEP | — | Canonical. |
| source-kijiji | KEEP | — | Canonical. |
| source-linkedin | KEEP | — | Canonical. |
| source-meta | KEEP | — | Canonical. |
| source-referral | KEEP | — | Canonical. |
| source-tiktok | KEEP | — | Canonical. |
| source-website | KEEP | — | Canonical. |
| source-youtube | KEEP | — | Canonical. |
| spam | KEEP | — | Canonical. |
| submitted-to-lender | KEEP | — | Canonical. |
| trafficdispenser | DELETE-ORPHAN | — | Typo-variant legacy source. |
| trafficdispensor | DELETE-ORPHAN | — | Misspelled legacy source. |
| uninterested | MERGE-INTO-CANONICAL | not-interested | Synonym. |
| warm-lead | KEEP | — | Canonical. |
| working | DELETE-ORPHAN | — | Workflow-state, not a meaningful contact tag. |
| wrong number | REVIEW | — | Not in ABC. Valid voice outcome — propose adding. |
| {{contact.productservice_1}} | DELETE-ORPHAN | — | Un-rendered merge field saved as literal tag. Bug cleanup. |
| {{contact.productservice_10}} | DELETE-ORPHAN | — | Same. |
| {{contact.productservice_2}} | DELETE-ORPHAN | — | Same. |
| {{contact.productservice_3}} | DELETE-ORPHAN | — | Same. |
| {{contact.productservice_4}} | DELETE-ORPHAN | — | Same. |
| {{contact.productservice_5}} | DELETE-ORPHAN | — | Same. |
| {{contact.productservice_6}} | DELETE-ORPHAN | — | Same. |
| {{contact.productservice_7}} | DELETE-ORPHAN | — | Same. |
| {{contact.productservice_8}} | DELETE-ORPHAN | — | Same. |
| {{contact.productservice_9}} | DELETE-ORPHAN | — | Same. |

---

## Tags — ABC (action rows only)

| Tag name | Action | Merge-into | Reason |
|---|---|---|---|
| cold lead | REVIEW | cold-lead | ABC has both spaced and hyphenated. Consolidate. |
| hot lead | REVIEW | hot-lead | Same. |
| warm lead | REVIEW | warm-lead | Same. |
| new lead | REVIEW | — | Both `new lead` and `new-business-lead`/`new-client` exist; clarify. |
| no show | REVIEW | no-show | Spacing variant. |
| appointment booked | REVIEW | — | ABC also has `no show` with space. Standardize on hyphens for all outcome tags. |
| source: cold outreach / source: event / source: facebook / source: google ads / source: instagram / source: linkedin / source: other / source: referral / source: tiktok / source: twitter/x / source: website / source: youtube | REVIEW | source-<name> | ABC has BOTH `source: x` AND `source-x` variants. Consolidate on hyphenated form. |
| intake started | REVIEW | pre-qualify-started | Synonym. |
| review requested | REVIEW | — | Not obvious duplicate; consider moving to hyphenated convention. |
| pending review | REVIEW | — | ABC has only `pending review` with space; fine but standardize spacing. |
| referral given | REVIEW | — | Keep canonical but standardize with hyphens. |
| onboarding complete | REVIEW | — | Space variant; standardize. |
| proposal sent | REVIEW | proposal-sent | ABC has both. Consolidate on hyphenated. |

---

## Mortgage-specific CVs to KEEP in EqM (not in ABC)

- `65_landing`, `80ltv`, `95ltv` — LTV-tier landing pages
- `ai_prompt_application_reminder`, `ai_prompt_document_reminder`, `ai_prompt_real_estate_buyer`, `ai_prompt_real_estate_seller`, `ai_prompt_renewal_countdown` — mortgage-specific prompts
- `application_api_key`, `application_platform_name`, `application_webhook_url` — Scarlette integration
- `approval_status`, `close_date`, `conditions_list`, `credit_score`, `deal_amount`, `doc_upload_link`, `down_payment`, `income`, `lender_name`, `lender_submitted_date`, `license_type`, `ltv_calculator_link`, `ltv_loan_to_value`, `maturity_date`, `max_ltv`, `min_credit_score`, `mortgage_amount`, `mortgage_type`, `property_type`, `property_value`, `renewal_date`, `self_employed`, `term`, `timeline`, `total_debt` — mortgage deal data fields
- `brokerage_license_number`, `brokerage_name`, `mortgage_agent_full_name`, `mortgage_agent_license_number`, `mortgage_agent_license_type`, `principal_broker_name`, `fsra_footer_full` — FSRA advertising-compliance CVs
- `pre_qualify_buyer_link`, `pre_qualify_seller_link`, `rate_request_form_link`, `real_estate_buyer_form_link`, `real_estate_landing_page_url`, `real_estate_partner_calendar_link`, `real_estate_seller_form_link`, `seller_calendar` — real-estate partnership vertical

## Mortgage-specific tags to KEEP in EqM (not in ABC)

- `ai-chat-real-estate-booked`, `ai-voice-real-estate-booked`
- `buyers`, `sellers`, `realtor`
- `commercial`, `flip`, `heloc`, `private`, `purchase`, `purchase-ftb`, `refinance`, `renewal`, `renovation`, `reverse`, `second`
- `renewal-14-days`, `renewal-30-days`, `renewal-60-days`, `renewal-90-days`, `renewal-120-days`
- `mortgage lead`
- `real-estate-booked`, `real-estate-buyer`, `real-estate-qualified`, `real-estate-seller`

---

## Likely-orphan CVs (no obvious referrer; action = DELETE-ORPHAN)

| Name | Key | ID |
|---|---|---|
| Brand Color Accent (Hex) w/ # | brand_color_accent_hex_w_ | O5Yf2GK6NVG7VUCKd1YX |
| Brand Color Secondary (Hex) w/ # | brand_color_secondary_hex_w_ | zdaT7JV9w48XBkzFkW2C |
| Services (empty, overlaps with product_service_*) | services | mhd5m3DX9KYjMJiwZNZe |
| Specialties (empty) | specialties | i7OTkoLjAv2QGrBwZgi7 |
| Years In Business (empty, unused) | years_in_business | 3MJiC9HoqRnbmBkf1fXR |
| Robot Webhook (purpose unclear) | robot_webhook | J1ZOstyFZEuWVfMRVOQ8 |
| Robot Webhook - Nonbooking | robot_webhook__nonbooking | u07h9WkjFIxTUQGWOMPr |
| Voice Bot ID (generic, should be role-specific) | voice_bot_id | 1sExbarKpckgkhwoaxpZ |

Note: verification of orphan status requires exporting full workflow action bodies and scanning for `{{custom_values.<key>}}` — pending follow-up task.

## Likely-orphan tags

- `1770411789818x729503551179194400`
- `1770411937731x786716738265284600`
- `6/8/2024_call_ended`
- `ai_call_convo`
- `appointment confirmation call`
- `clubcondo`
- `email-warmup`, `email-warmup-maxequity`
- `generic`
- `john lead`, `mike lead`, `nikki lead`, `sheh`, `renee`, `renee lead` (personal labels)
- `lead currently in workflow`, `lead currently in workflow sms`, `old lead currently in workflow`
- `manual_workflow_add`
- `mortgage test`, `mortgage_demo_call`
- `name via lookup`
- `resend_construction`, `resend_generic`, `resend_private`, `resend_purchase`, `resend_reverse`
- `trafficdispenser`, `trafficdispensor`
- `working`
- `{{contact.productservice_1}}` through `{{contact.productservice_10}}` — merge-field-literal bug
