# GHL MASTER CONSOLE FINISH PROMPT (2026-04-23)

Paste this into Claude Console (the browser Claude running inside GHL) to finish all remaining GHL browser work across ABC and EquityMax. Execute in order. Every phase ends with a save line to `XpertVault/sprint/master-build-status.md`.

---

## CONTEXT (read first)

You are working across two GHL sub-accounts:
- **ABC** — Generic universal snapshot template (Location ID `AKbAtRra4m908e2w2Kbo`)
- **EquityMax** — Mortgage snapshot template (Location ID `OBmMdqdnPLZvVyHloFly`)

Both are snapshot TEMPLATES that will be deployed to client sub-accounts. No content should be hard-coded to Renée personally. Use `{{custom_values.*}}` tokens everywhere.

All killswitch custom values exist already in both subs (`Voice AI Enabled`, `SMS Enabled`, `Email Enabled`, `All Outreach Enabled` — all default `"yes"`).

After every phase, append a one-liner to `XpertVault/sprint/master-build-status.md` in the format:
`- [YYYY-MM-DD HH:MM | Claude-Console] <what just happened>`

If you learn something Claude Code needs to know, drop a note at `xpert-command-center.vercel.app/intel.html` starting with `CLAUDE-NOTE:`.

---

## PHASE 1 — KILLSWITCH WORKFLOWS (both subs)

Canonical naming: `Master <Channel> Shut Off` / `Master <Channel> Turn On`.

### ABC
Two drafts exist and need to be renamed + published:
- `KILLSWITCH — Disable Voice AI` (id `c7584001-a2da-4675-af3f-9a42a0d3a9aa`) → rename to **Master Voice AI Shut Off**
- `KILLSWITCH — Enable Voice AI` (id `6b2a4c17-8893-4111-9db2-fe0cbbe2cccd`) → rename to **Master Voice AI Turn On**

Then build the other 6:
- Master SMS Shut Off / Master SMS Turn On
- Master Email Shut Off / Master Email Turn On
- Master All Outreach Shut Off / Master All Outreach Turn On

### EquityMax
Build all 8 workflows from scratch (same 4 pairs as ABC).

### Workflow body (identical across both subs, vary only the custom value key)

**Shut Off trigger:** Manual run OR contact tagged `admin-disable-<channel>`
**Shut Off actions:**
1. Update custom value `<channel>_enabled` → `"no"`
2. Internal notification email to `{{custom_values.business_email}}`: "<Channel> has been DISABLED. Re-enable with 'Master <Channel> Turn On'."
3. Create task "Re-enable <channel> when resolved" assigned to `{{user.id}}`

**Turn On trigger:** Manual run OR contact tagged `admin-enable-<channel>`
**Turn On actions:**
1. Update custom value `<channel>_enabled` → `"yes"`
2. Internal notification: "<Channel> RE-ENABLED."

### Universal precondition (every sending workflow in both subs)

On every SMS / email / voice-call action, wrap in:
`IF custom_value.<channel>_enabled == "yes" AND custom_value.all_outreach_enabled == "yes" → send, else skip`

Then publish all 16 workflows.

**Save line when done:** `Killswitch workflows 16/16 built + published across ABC + EqM. Naming = Master <Channel> Shut Off / Turn On.`

---

## PHASE 2 — PHASE 3 REFERENCE SWAPS (EquityMax only)

Inside every EqM workflow step body, AI agent prompt, email template, and SMS template — find-and-replace:

| Old token | New token |
|---|---|
| `{{custom_values.owner_name}}` | `{{custom_values.user_first_name}}` |
| `{{custom_values.owner_full_name}}` | `{{custom_values.user_full_name}}` |
| `{{custom_values.industry}}` | `{{custom_values.niche}}` |
| `{{custom_values.business_name}}` | `{{custom_values.company_name}}` |
| `{{custom_values.business_phone}}` | `{{custom_values.company_phone}}` |
| `{{custom_values.business_address}}` | `{{custom_values.company_address}}` |
| `{{custom_values.product__service_1}}` (double underscore) | `{{custom_values.product_service_1}}` (single) |
| `{{custom_values.product__service_2}}` | `{{custom_values.product_service_2}}` |
| `{{custom_values.hours_of_operation}}` | `{{custom_values.business_hours}}` |
| `{{custom_values.office_hours}}` | `{{custom_values.business_hours}}` |
| `{{custom_values.booking_link}}` | `{{custom_values.my_calendar}}` |
| `{{custom_values.ai_assistant_job_title}}` | `{{custom_values.ai_job_title}}` |

Repeat in every location inside AI Agent Studio and Workflows. Save and publish each touched workflow.

**Save line when done:** `EqM Phase 3 reference swaps complete across N workflows + M AI agent prompts.`

---

## PHASE 3 — RECRUITMENT FOLLOW UP FLOW (both subs)

Spec already built and synced in:
`projects/equitymax-snapshot/CONSOLE-RECRUITMENT-FLOW.md` (load this into the Project).

Build once in EquityMax, then port to ABC. Uses canonical `recruitment_*` fields which now exist identically in both subs (11 fields: first/last/email/phone/city/experience/availability/why_join/linkedin_or_resume plus 2 more).

**Save line when done:** `Recruitment Follow Up flow built + published in both subs. Tested with Renée's contact.`

---

## PHASE 4 — PRE-QUALIFIER SPLIT (EquityMax)

Two existing Pre-Qualifier workflows:
- `#9` — keep as universal pre-qualifier (partner leads + non-mortgage leads)
- `#11` — keep for mortgage leads. Rename to drop EquityMax branding. Strip hardcoded personal info (Renée Ross, specific phone, etc.) — use `{{custom_values.*}}` tokens.

Then split triggers so they do not double-fire:
- `#9` trigger: lead created without mortgage-specific tag
- `#11` trigger: lead created WITH `mortgage-lead` tag OR came through the Lovable form (tag `lovable-form-submission`)

Port `#9` to ABC so ABC has a generic pre-qualifier too.

**Save line when done:** `Pre-Qualifier #11 renamed + cleaned. Triggers split. #9 ported to ABC.`

---

## PHASE 5 — LOVABLE FORM WEBHOOK URL (EquityMax)

Claude Code already built and deployed a webhook at:

**`https://xpert-command-center.vercel.app/api/equitymax-lead`**

The Lovable EquityMax form needs to POST its submissions to this URL as JSON. Action for you (Console):
1. Open the Lovable form editor
2. Point the form's submit action at the URL above (POST, application/json)
3. Confirm the field names in the Lovable form match the keys the webhook expects (see mapping list at bottom of this prompt)
4. Submit one test using Renée's contact (email `renee.ross@gmail.com`, phone `4168784622`)
5. Confirm in EqM that the contact is updated with all mapped fields AND tagged `lovable-form-submission` + `website-lead` + `lead-currently-in-workflow`

### Expected Lovable form field names (snake_case preferred)

Identity: `first_name` · `last_name` · `email` · `phone`
Property: `property_value` · `property_type` · `property_province` · `property_zip_code` · `home_use` · `home_type`
LTV / equity: `ltv` · `max_ltv` · `down_payment`
Financials: `total_debts` · `annual_income` · `household_income` · `credit_score` · `car_debt` · `credit_card_debt` · `student_loan` · `other_debts`
Mortgage: `mortgage_amount` · `mortgage_balance` · `purchase_price` · `purchase_loan_amount` · `interest_rate` · `term` · `amortization` · `loan_purpose` · `mortgage_type` · `renewal_date` · `already_prequalified` · `preapproved_amount`
Segment: `residential_or_commercial` · `loan_type`
Timeline: `purchase_timeline` · `how_soon`

If Lovable uses different names, drop a `CLAUDE-NOTE:` with the real field names so Claude Code can update the webhook mapping.

**Save line when done:** `Lovable form pointed at webhook. Test submission verified in EqM. Fields mapped: N/M.`

---

## PHASE 6 — FINAL VERIFICATION

Walk through this checklist contact-free (no live sends):

- [ ] ABC: 16 killswitch workflows exist + published (8 Shut Off, 8 Turn On across 4 channels)
- [ ] EqM: 16 killswitch workflows exist + published
- [ ] Every sending workflow in both subs has the killswitch precondition wrapped around SMS/email/voice actions
- [ ] EqM Phase 3 reference swaps complete — no `owner_*`, `industry`, `business_*`, `product__service_*`, `hours_of_operation`, `office_hours`, `booking_link`, `ai_assistant_job_title` references remain
- [ ] Recruitment Follow Up flow built + published in both subs
- [ ] Pre-Qualifier #9 and #11 split clean, triggers do not overlap
- [ ] Lovable form submits to webhook, contact lands in EqM with expected fields + tags

**Save line when done:** `GHL browser finish verified end-to-end. Ready for snapshot export.`

---

## REMINDERS

- Save-as-draft first, publish only after Renée does a final walkthrough
- Do not send to any real contacts — only Renée's (email `renee.ross@gmail.com`, phone `4168784622`)
- Every agent prompt + email + SMS must sound human. Use `message-tone.md` skill for voice
- Every workflow uses the Axel forward-walk reflex: Success path, Failure path, Multiplicity, Handoff — answer each or flag the gap
- Append one-liners to master-build-status.md as you go, not at the end
