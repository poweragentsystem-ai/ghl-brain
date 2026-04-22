# ACTIVE SPRINT — Build Spec
### Current sprint goal lives here. Replace when sprint changes. Archive old specs in /archive/.

---

## SPRINT: GHL Dedup + Universality Pass (ABC + EquityMax)
**Started:** 2026-04-22
**Status:** IN PROGRESS — paused at Phase 2 (Renée decisions needed)

---

## GOAL
Make both sub-accounts flawless: every CV and tag is canonical + universal + actively used. Every AI agent passes the forward-walk test (Success / Failure / Multiplicity / Handoff). ABC becomes the snapshot-ready generic template, EquityMax carries it plus mortgage-specific additions. Deletes happen LAST, only after functional verification.

---

## PHASES

### ✅ PHASE 1 — Audit (DONE)
- Full API pull: CVs, custom fields, tags, workflows from both subs → `sprint/cv-audit-2026-04-22/`
- Semantic dedup map → `sprint/cv-audit-2026-04-22/dedup-map.md`
- Google Drive mortgage voice/chat scripts → `projects/equitymax-snapshot/voice-bot-inspiration/`
- AI agent inventory + canonical CV/tag map → `projects/equitymax-snapshot/ai-agent-cv-map.md`
- Forward-walk gap report (11 agents, 14 critical gaps) → `projects/equitymax-snapshot/forward-walk-gap-report.md`
- Live dashboard deployed: https://xpert-command-center.vercel.app/ghl-dedup.html

### 🟡 PHASE 2 — Renée decisions (BLOCKING)
Renée reviews the dedup dashboard + gap report + deferred-decisions and answers:
1. Booking-link canonical: `my_calendar` vs `booking_link`?
2. AI role title canonical: `ai_job_title` vs `ai_assistant_job_title`?
3. ABC 3-way internal dups: pick shortest key as canonical?
4. ABC tag standardization: spaced → hyphenated?
5. 14 forward-walk gaps: build-now / defer / accept per gap?
6. Pre-Qualifier #11 vs New Lead Prequalify #9: which one stays?

### ⏳ PHASE 3 — Execute swaps (after Phase 2)
- Populate empty canonical CVs in EquityMax via API (user_first_name = "Renée", user_full_name = "Renée Ross", and all other MERGE targets)
- Swap CV references in API-reachable places (workflow metadata, email templates where possible)
- Console prompt prepared for voice bot + workflow step text that's UI-only
- Hand Console → execute UI swaps

### ⏳ PHASE 4 — Functional verification (after Phase 3)
- Fire test contact through each pipeline entry point
- Confirm no broken `{{custom_values.*}}` tokens in voice/chat/email
- Confirm tags fire correctly
- Renée confirms functional

### ⏳ PHASE 5 — Delete (LAST — gated on Renée's functional confirmation)
- Delete approved REVIEW-bucket items via API
- Delete deprecated CVs (`owner_name`, `owner_full_name`, etc.)
- Delete orphan tags (including 10 broken `{{contact.productservice_N}}` junk tags)

---

## KEY DECISIONS LOCKED

1. **Canonical = ABC minus mortgage-specific.** EquityMax must align to ABC naming for anything generic; mortgage-only CVs/tags stay EqM-only.
2. **Checkmark-first approach.** Mark what we KEEP/USE. Everything else = REVIEW. Deletes LAST.
3. **Universality test:** every generic CV must work for any niche (dentist, plumber, realtor, mortgage pro). If a CV only makes sense for one business type, it's mortgage-specific or wrong.
4. **No hardcoded info:** CV VALUES must come from onboarding form, not baked into the CV itself.
5. **Forward-walk reflex is ALWAYS ON:** every workflow/agent touched gets walked (Success/Failure/Multiplicity/Handoff). Axel owns this. Codified in `feedback_forward_walk_every_workflow.md` + `actuator-agent.md` + CLAUDE.md.

---

## FILES TO OPEN FIRST NEXT SESSION

1. https://xpert-command-center.vercel.app/ghl-dedup.html — the dedup dashboard (what to review)
2. `XpertVault/projects/equitymax-snapshot/forward-walk-gap-report.md` — 14 gaps to decide
3. `XpertVault/riley/deferred-decisions.md` — the pending questions table
4. `XpertVault/sprint/cv-audit-2026-04-22/dedup-map.md` — source-of-truth action tables

---

*When this sprint is complete, archive this file and create a new active-build-spec.md.*
