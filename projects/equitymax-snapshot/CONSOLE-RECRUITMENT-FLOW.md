# Console Handoff — Recruitment Follow Up Flow

**Source:** Renée 2026-04-22. Both subs need a recruitment flow. Both are templates (EqM = Canadian mortgage pros recruiting agents; ABC = any niche recruiting staff). This handoff covers building it in BOTH subs.

Claude Code has already created/verified all recruitment custom fields + the `recruitment-lead` tag in both subs. Your job: build the form + workflow + AI agent.

## Pre-requisites (Claude Code already did)

✅ 11 recruitment custom fields in ABC (existed) + 11 copied to EqM (2026-04-22):
- recruitment_first_name / last_name / email / phone / city
- recruitment_position_title (position interested in)
- recruitment_experience_years (numerical)
- recruitment_experience_level (dropdown: No exp / <1yr / 1-3 / 3-5 / 5+)
- recruitment_availability (dropdown: Immediate / 2wk / 1mo / 1-3mo / Just exploring)
- recruitment_why_join (long text)
- recruitment_linkedin_or_resume (text)

✅ Tag `recruitment-lead` exists in both subs

## BUILD SCOPE (3 pieces per sub)

### 1) Recruitment Form

Fields (in this order, all REQUIRED except where noted):
1. First Name → maps to `recruitment_first_name`
2. Last Name → maps to `recruitment_last_name`
3. Email → maps to `recruitment_email`
4. Phone → maps to `recruitment_phone`
5. City → maps to `recruitment_city`
6. Position Interested In → maps to `recruitment_position_title` (TEXT field — in EqM default options: Mortgage Agent Level 1, Mortgage Agent Level 2, Team Lead, Underwriter, Operations. In ABC: free-text)
7. Years of Experience → maps to `recruitment_experience_years` (numerical)
8. Experience Level → maps to `recruitment_experience_level` (dropdown)
9. Availability (when can you start?) → maps to `recruitment_availability` (dropdown)
10. Why do you want to join us? → maps to `recruitment_why_join` (long text, optional)
11. LinkedIn URL or Resume link → maps to `recruitment_linkedin_or_resume` (text, optional)

**Form settings:**
- CASL consent checkbox (required) at bottom — "I agree to be contacted about this role."
- Privacy policy link in footer → `{{custom_values.privacy_policy}}`
- On submit → create/update contact → apply tag `recruitment-lead` → enter Recruitment Pipeline → fire Recruitment Follow Up workflow
- Thank you message (human tone — see `claude-skills/message-tone.md`): "Got it {{contact.first_name}} — we'll review and be in touch within 24 hours. If it's a fit, you'll get a calendar link to book a quick chat."

**DO NOT:**
- Do not include `recruitment_candidate_*` old duplicate fields (those are legacy in ABC — leave untouched but don't wire them here)
- Do not include `social_security_number` or equivalent (deleted from EqM; Canadian recruiting doesn't collect SSN/SIN via form)
- Do not ask for loom video, salary expectations, or invasive personal info at this stage

### 2) Recruitment Follow Up Workflow

**Trigger:**
- Tag `recruitment-lead` added, OR
- Contact submits Recruitment Form, OR
- Contact manually moved into Recruitment Pipeline > New Application stage

**First action (per killswitch + workflow-tag pattern from `CONSOLE-KILLSWITCHES-AND-TAGS.md`):**
1. Check `{{custom_values.all_outreach_enabled}} = "yes"` — if not, end workflow
2. Add tag `lead currently in workflow`

**Step-by-step sequence** (fires `ai_prompt_recruitment` for messaging):

**Touch 1 — Immediate SMS** (within 5 minutes of form submit):
- Check `{{custom_values.sms_enabled}} = "yes"`
- "Hey {{contact.first_name}} — thanks for your interest in the {{contact.recruitment_position_title}} role at {{custom_values.company_name}} 👋 Just reviewing your application. If it's a fit, I'll send over a quick 15-min call link. Talk soon."

**Touch 2 — Email** (30 minutes after Touch 1):
- Check `{{custom_values.email_enabled}} = "yes"`
- Subject: "Quick look at your application — {{contact.recruitment_position_title}}"
- Body: human-tone confirmation + brief overview of next step + "If you've got any questions in the meantime, reply here."
- Uses `ai_prompt_recruitment` for dynamic personalization

**Touch 3 — Qualification check** (runs after Touch 2):
- If `recruitment_experience_level` matches role threshold (e.g. Mortgage Agent Level 2 requires ≥ 3 years) AND `recruitment_availability` is "Immediately" / "2 weeks" / "1 month":
  → Move to "Qualified Candidate" pipeline stage
  → Send SMS: "Hey {{contact.first_name}} — you look like a fit! Here's a 15-min call link to chat with {{custom_values.user_first_name}}: {{custom_values.recruitment_calendar_booking_link}}"
  → Internal notification to business owner: "Qualified candidate: {{contact.recruitment_first_name}} {{contact.recruitment_last_name}} for {{contact.recruitment_position_title}}. Book link sent."
- If NOT qualified:
  → Move to "Future Consideration" stage
  → Send human-tone rejection: "Hey {{contact.first_name}} — thanks for the application. You're not quite the fit we're looking for right now, but we'll keep your info on file. If anything changes (new role, more experience), we'll reach out. All the best!"
  → Tag: `recruitment-future-consideration`

**Touch 4 — Voice AI follow-up** (24 hours after Touch 1 IF qualified AND not booked):
- Check `{{custom_values.voice_ai_enabled}} = "yes"`
- Outbound call using `ai_prompt_recruitment` for context
- If booked → move to "Interview Booked" stage
- If no answer → voicemail drop + SMS reminder

**Touch 5 — Final SMS nudge** (48 hours after Touch 4 IF still not booked):
- "Hey {{contact.first_name}} — didn't hear back. If you're no longer interested, no worries — just reply 'not a fit' and I'll remove you. Otherwise the link is still open: {{custom_values.recruitment_calendar_booking_link}}"

**Exit paths** (every path removes `lead currently in workflow` tag before end):
- Interview booked → tag `recruitment-interview-booked` → move to Interview Booked stage → end
- Not qualified → tag `recruitment-not-qualified` → move to Future Consideration → end
- Declined by candidate → tag `recruitment-declined` → end
- Silent after Touch 5 → tag `recruitment-ghost` → move to Long Term Nurture → end

**NEVER book without qualification** (per `claude-skills/funnel-qualified-landing-page.md`):
The form IS the qualifying step. Only qualified candidates get a booking link.

### 3) Recruitment AI Agent Prompt

Use existing `ai_prompt_recruitment` custom value. Content (canonical version, universal for both subs):

```
You are {{custom_values.ai_agent_name}}, a recruiter for {{custom_values.company_name}}. Your job is to engage candidates who submitted the recruitment form, answer their questions about the role, and help qualified ones book a 15-minute screening call with {{custom_values.user_first_name}}.

Identity:
- Warm, not salesy. Sound like a friendly recruiter texting, not HR reading from a script.
- Short sentences. Contractions. Hit the point in 2-3 sentences.
- Never say "We will be in touch" — instead "I'll text you in the next day."
- Max 3 first-name uses per conversation (per sales psychology rules).

Goal:
- If contact has `recruitment-lead` tag and completed form: engage, answer questions, qualify, book if fit.
- Qualification criteria:
  - EquityMax (mortgage pros): must be FSRA licensed OR actively pursuing licensing. Province should be in scope (Ontario + any expansion provinces we've opened).
  - ABC (any niche): depends on business niche — ask about relevant certifications/experience.
- If qualified: book via {{custom_values.recruitment_calendar_booking_link}}
- If NOT qualified: polite decline + future-consideration tag + "reach back when situation changes"

Rules:
- Never promise a specific salary, commission structure, or start date — those are {{custom_values.user_first_name}}'s call on the screening call.
- Never ask for SIN/SSN, banking, or personal financial info. Never.
- Never discriminate based on protected characteristics (ECOA/CHRA).
- If candidate asks about compensation: "{{custom_values.user_first_name}} will walk you through the full comp structure on the call — it's tailored based on experience and role."
- If candidate asks about company culture: answer with 1-2 specific things + "the call is the best place to see if it's a mutual fit."

Knowledge:
- Available roles: check `{{custom_values.recruitment_open_roles}}` — if empty, say "I'll check with {{custom_values.user_first_name}} on current openings and get back to you."
- Training provided: yes, mentorship-based (general — specific programs discussed on screening call).
- Remote/hybrid/in-office: {{custom_values.recruitment_work_mode}}

Flow:
1. Greet warmly using first name (ONE time max on greet).
2. Acknowledge their specific application (position + experience).
3. If qualified: "You look like a strong fit. Want to grab 15 minutes with {{custom_values.user_first_name}}? Here's the link: {{custom_values.recruitment_calendar_booking_link}}"
4. If unclear: ask ONE clarifying question before qualifying.
5. If NOT qualified: polite decline with reason + future-consideration language.

Compliance:
- CASL: they opted-in via the form, you can text/email freely.
- If they say "stop" / "remove me" / "not interested": acknowledge immediately, tag `recruitment-opted-out`, end conversation.
```

## PROCESS PER SUB

### EqM (mortgage pro recruiting scenario)
1. AI Studio → Agent Studio → Create New Agent
2. Name: "Recruitment Follow Up"
3. Build with AI → paste the agent prompt above + "Build a recruitment agent that engages candidates who applied for mortgage roles. Uses the canonical recruitment custom fields. Follows the workflow sequence above."
4. Save DRAFT (do NOT publish — test contact only)
5. Create the Recruitment Form (same spec, mortgage-specific position dropdown)
6. Automation → Workflows → Build using AI → paste the workflow sequence above
7. Test with Renée's contact (4168784622 / renee.ross@gmail.com) end-to-end
8. If clean, flag for Claude Code Phase 4 verification

### ABC (generic niche recruiting template)
1. Same 1-7 steps but: position field = FREE TEXT (any niche), agent prompt slightly more generic (drop mortgage-specific language)
2. Rename any copied EqM content to not reference mortgage/FSRA
3. Save DRAFT

## AFTER YOU FINISH

Append to master-build-status.md:
`- [YYYY-MM-DD HH:MM | Console] Built Recruitment Follow Up in [ABC|EqM]: form, workflow, agent. Draft. Tested on Renée's contact end-to-end: PASS|FAIL.`

## DO NOT

- ❌ Do not publish anything live
- ❌ Do not send messages to any contact other than renee.ross@gmail.com / 4168784622
- ❌ Do not hardcode Renée, EquityMax, OLS, any personal info — use custom values only
- ❌ Do not create new recruitment custom fields — all 11 already exist in both subs
- ❌ Do not use the legacy `recruitment_candidate_*` fields — those are duplicates flagged for Phase 5 delete
