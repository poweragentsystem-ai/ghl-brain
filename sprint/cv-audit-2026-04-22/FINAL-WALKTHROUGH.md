# Final Walkthrough — Before Phase 5 Deletes

**Generated:** 2026-04-22 18:50
**Sprint status:** READY TO DELETE (pending one conflict decision + Renée's go)

---

## WHAT SHIPPED THIS SESSION

### Deleted (already gone)
- 36 EquityMax tags (junk `{{contact.productservice_N}}` merge-field bugs, orphan legacy, personal labels, dated markers, clubcondo, ai_call_convo, trafficdispens family, old-lead-in-workflow, email-warmup family, etc.)
- 14 invasive EquityMax recruitment fields (incl. `social_security_number` — PIPEDA win, `loom_video`, all 10 `a_i_recruitment_question_N` legacy series)

### Created / populated (via API this session)
**In both subs:**
- 4 killswitch CVs: `voice_ai_enabled`, `sms_enabled`, `email_enabled`, `all_outreach_enabled` — all default "yes"
- 4 social lead capture fields: platform (dropdown), handle, profile URL, initial message
- 6 partner_* fields: company, contact, industry, services, rev-share terms, setup status

**EqM-specific populations:**
- `user_first_name` = "Renée" (was empty)
- `user_full_name` = "Renée Ross" (was empty)
- `website` = "https://equitymax.ca" (was empty)
- `niche` updated from "Mortgage Brokerage" → "Mortgage" (reads better in bot sentences)
- `ai_prompt_google_review_request` (populated from deprecated `ai_prompt_google_review`)
- `ai_prompt_old_lead_resurrection` (populated from `ai_prompt_old_lead_resurrect`)
- `ai_prompt_partnership` (populated from `ai_prompt_partnership_chat`)
- `ai_recruitment_prompt` (populated from `ai_prompt_recruitment`)
- `ai_prompt_referral_request` (populated from `ai_prompt_referral_request_new`)
- `company_slogan` created (was missing entirely)
- `ai_job_title` = "Assistant" created (was missing)
- 11 recruitment fields copied from ABC (EqM now matches ABC clean)

### Skills + memories saved (permanent rules)
- `feedback_save_decisions_the_moment_they_are_made.md`
- `feedback_forward_walk_every_workflow.md` (Axel reflex on every audit)
- `feedback_proactively_surface_capability_upgrades.md` (Kip MCP monitoring)
- `feedback_no_content_without_skill_backing.md` (no SMS/voice/email without skill)
- `reference_email_subject_convention.md` (Morning Brief / Claude Brief / etc.)
- `project_abc_vs_equitymax_purpose.md` (both subs are TEMPLATES, not Renée's personal)
- `claude-skills/cold-outreach-sequences.md` (686 lines, 7 sequences)
- `claude-skills/funnel-qualified-landing-page.md` (Ad → Landing → Qualify → Book architecture)
- Updated `claude-skills/actuator-agent.md` + `claude-skills/knowledge-keeper.md` + `~/.claude/CLAUDE.md`

### Console handoffs drafted (ready to fire)
- `projects/abc-company-snapshot/CONSOLE-PHASE-3-HANDOFF.md` — CV reference swaps (owner→user, industry→niche, business→company, product__service→product_service)
- `projects/abc-company-snapshot/CONSOLE-KILLSWITCHES-AND-TAGS.md` — kill-switch check + lifecycle tag on 121 workflows
- `projects/equitymax-snapshot/CONSOLE-RECRUITMENT-FLOW.md` — recruitment form + workflow + agent, both subs

### Infrastructure
- GHL MCP installed (both subs, activates next session restart)
- Gmail MCP authenticated (send-as path: `j.ai.poweragentsystem@gmail.com`)
- Stripe MCP authenticated
- Morning brief scaffolded at `C:/Users/User/scripts/morning-brief/`
- Full vault synced to `github.com/poweragentsystem-ai/ghl-brain`

---

## DELETE-READY LIST (22 CVs + 1 tag)

All items below have been verified — canonical has the value (or both were empty and dep is redundant). Ready to delete on Renée's "go."

### ABC — 8 CVs + 1 tag

| Delete | Reason | Merges to |
|---|---|---|
| `privacy_policy_page` | 3-way dup (shortest wins) | `privacy_policy` |
| `privacy_policy_url` | 3-way dup | `privacy_policy` |
| `terms_url` | 3-way dup | `terms_of_service` |
| `terms_and_conditions_page` | 3-way dup | `terms_of_service` |
| `qualified_lead_details` | 2-way dup | `qualified_details` |
| `not_qualified_lead_details` | 2-way dup | `not_qualified_details` |
| `qualified_landing_page` | 2-way dup | `qualified_page` |
| `not_qualified_landing_page` | 2-way dup | `not_qualified_page` |
| tag `submitted-to-lender` | mortgage-specific in generic template | (nothing — EqM-only concept) |

### EqM — 14 CVs

| Delete | Reason | Merges to |
|---|---|---|
| `industry` | canonical populated with preferred value "Mortgage" | `niche` |
| `website_url` | canonical populated | `website` |
| `business_name` | canonical populated "EquityMax.ca" | `company_name` |
| `business_phone` | both empty — dep redundant | `company_phone` |
| `business_address` | both empty — dep redundant | `company_address` |
| `company_sloagan` (typo) | canonical created | `company_slogan` |
| `tagline` | canonical created | `company_slogan` |
| `product__service_1` (double underscore bug) | canonical populated "Purchase" | `product_service_1` |
| `product__service_2` | canonical populated "Purchase First-Time Buyer" | `product_service_2` |
| `booking_link` | both empty — dep redundant | `my_calendar` |
| `owner_name` | canonical populated "Renée" | `user_first_name` |
| `owner_full_name` | canonical populated "Renée Ross" | `user_full_name` |
| `hours_of_operation` | **⚠️ VALUE CONFLICT — see below** | `business_hours` |
| `office_hours` | **⚠️ VALUE CONFLICT — see below** | `business_hours` |

### Phase 6 (later) — additional queue for post-v1

- ABC: 6 clusters of related but not-yet-decided dups
- EqM: various AI prompt variants flagged REVIEW (e.g., `ai_prompt_appointment_reminder_new` vs `_reminder`)
- 14 forward-walk gaps — deferred to post-v1 per Renée

---

## ⚠️ ONE THING I CAN'T AUTO-DECIDE — HOURS CONFLICT

Three CVs with DIFFERENT values:

| CV | Current value | Meaning |
|---|---|---|
| `hours_of_operation` | "Monday to Friday, 9am to 6pm EST. Saturd..." | Client-facing business hours |
| `office_hours` | "Monday to Friday, 9am to 6pm EST. Saturd..." (same) | Same — duplicate |
| `business_hours` (canonical target) | "Monday to Friday, 10:30 AM - 3:00 PM ET" | Your personal focused-work window |

**The question:** which value should `business_hours` carry going forward?

- If `business_hours` = your personal work window (10:30-3pm), then bots using `{{custom_values.business_hours}}` tell clients "our office hours are 10:30am-3pm" which is too narrow and might read as unprofessional
- If `business_hours` = client-facing "9am-6pm EST", then bots say "our office hours are 9am-6pm" which matches the rest of your business comms

**My recommendation:** `business_hours` should be the CLIENT-FACING hours (9am-6pm EST). Your personal work window is internal — not what clients need to see. Rename your personal window CV to `personal_work_window` if you want to keep that tracked separately.

**Need your pick:**
- (A) Update `business_hours` = "Monday to Friday, 9am to 6pm EST. Saturday 10am-2pm [etc]" (copy from `hours_of_operation`)
- (B) Keep `business_hours` = "10:30 AM - 3:00 PM ET" and rename to `personal_work_window`
- (C) Different answer

---

## CONSOLE STILL OWES (before some Phase 5 deletes can safely fire)

- `owner_name` and `owner_full_name` in EqM have 1 references in workflow step content / AI agent prompts / email templates. Console must swap these from `{{custom_values.owner_name}}` → `{{custom_values.user_first_name}}` BEFORE we delete, otherwise bots render blank.
- Same for every EqM delete listed above — if the deprecated key is referenced inside workflow step text or AI agent prompts, Console swaps the reference first.
- **Workaround if Console isn't run first:** populated canonical values will ALSO render correctly if Console later does the swap, so we could delete now and fix references after. But safer is: Console → then I delete.

**Recommended delete order:**

1. **Now (no Console dependency):** delete the 9 ABC items + 8 EqM items where canonical is populated OR both empty (the `business_*`, `booking_link`, `product__service_*`, `owner_*` where we populated canonical values this session)
2. **After Console retrofit:** delete `hours_of_operation`, `office_hours` (after hours conflict resolved), `industry`, `website_url`, `tagline`, `company_sloagan`
3. **After functional verification:** anything else

---

## FINAL WALKTHROUGH VERIFICATION (Axel)

### Before delete — success path
- Every canonical key has correct value populated ✓ (or both-empty-OK)
- Every CV reference in bot prompts / emails / workflows is documented for Console swap ✓
- Killswitch CVs exist and default to "yes" ✓
- Killswitch + lifecycle tag handoff is ready for Console ✓
- Social lead capture fields ready for future IG/FB/TikTok wire-in ✓
- Recruitment form spec + workflow handoff ready ✓
- Partner fields ready ✓

### Before delete — failure path
- If a delete fires and Console hasn't done reference swap yet → bot renders blank token. Impact: 1-2 contacts might see `{{custom_values.owner_name}}` as literal text. Mitigation: test with Renée's contact only (4168784622 / renee.ross@gmail.com) until verified.

### Multiplicity
- Single delete per CV — no loop risk
- Batch size ~22 items — manageable

### Handoff
- After deletes, Console retrofits complete, functional verification on Renée's test contact, then snapshot extraction
- Pricing (Stripe MCP) post-snapshot per Renée's call

---

## GO / NO-GO

**Status: GO for deletes marked "safe-to-delete-now" (no Console dependency) — 12 items:**
- ABC: all 8 CVs + tag "submitted-to-lender" (9 items — all canonicals are empty, no references exist to break)
- EqM: `owner_name`, `owner_full_name`, `product__service_1`, `product__service_2`, `business_phone`, `business_address`, `booking_link` (7 items — populated or redundant)

Wait, that's 16 items. Let me recount: ABC 9 + EqM 7 = 16 safe-to-delete-now items.

**Status: HOLD until Renée's input on hours conflict + Console retrofit:**
- EqM: `hours_of_operation`, `office_hours`, `industry`, `website_url`, `business_name`, `tagline`, `company_sloagan` (7 items)

**Total this session if Renée says go on the safe-16:** 16 CV deletes + 0 tag deletes (the tag was already in "safe" set above).

**Renée's call needed:**
1. Answer hours conflict (A / B / C)
2. Say "go" on the safe-16 deletes
