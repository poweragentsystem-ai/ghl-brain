# MASTER BUILD STATUS — Single Source of Truth
### READ THIS FIRST every session. UPDATE IT when anything changes. Every Claude writes here.

**Last updated:** 2026-04-20 (auto by Claude Code)
**Active sprint:** GHL Universal Snapshot (ABC) + Mortgage Snapshot (EquityMax) + EquityMax 3D website

---

## HOW THIS FILE WORKS

1. Every Claude (Code, Console, Mobile) reads this file at session start
2. Every Claude appends a one-line status update after each meaningful change (no waiting for session end)
3. Format: `- [YYYY-MM-DD HH:MM | Claude-X] what just happened`
4. When a phase flips status, update the phase table
5. Never delete history — only append

---

## CURRENT STATE — LIVE STATUS

### TRACK 1 — ABC COMPANY (Generic Universal Snapshot)
**Location ID:** `AKbAtRra4m908e2w2Kbo` | **API key:** `{{ABC_API_KEY}}`
**Status:** 85% — ready to finalize

| Item | Count | State | Notes |
|---|---|---|---|
| Pipelines | 5 | ✅ Clean | Client, Partnership, Recruitment, Sales, Outbound AI |
| Custom fields | 145 | ✅ Clean | All generic, 106 duplicates deleted Apr 18 |
| Custom values | ~178 | ✅ Clean | All tokens correct (user_first_name, niche, etc.) |
| Calendars | 8 | ✅ Clean | Generic names |
| Tags | ~34 | ✅ Clean | 21 new voice/app/doc tags added |
| AI agents | 10 | ✅ Published | General Business Automation folder |
| Workflows | 25 | 17 pub / 8 draft | Need review + publish |
| Forms | 10 | 9 clean / 1 delete | Agency Onboarding Form must go |
| Email templates | 14 | Need quality pass | 4 generic + 10 US mortgage (delete US) |
| Voice AI bots | 0 | ❌ Not built | Needs Build with AI in AI Studio |

**Pending to finish snapshot:**
- [ ] Publish 4 draft workflows (6-Step Sales Follow-Up, Inbound Universal Handler, Long Term Nurture, No Show SMS)
- [ ] Build GHL native voice bots (Inbound + Outbound) — Use Build with AI
- [ ] Humanize all email templates (remove corporate language, remove "reply YES/NO")
- [ ] Delete Agency Onboarding Form (`jJ86LL2pW7lqVWVXXCT2`)
- [ ] Delete "Form 6" (`YNtnV9wjknDd1FkxOVT7`) — unknown usage
- [ ] Review Generic Business Intake Survey (`gGi1LdUCND7Yjec63DnW`)
- [ ] Recruitment form custom fields (see spec below)
- [ ] Delete American mortgage email folder (10 templates)
- [ ] Export snapshot from Agency dashboard

---

### TRACK 2 — EQUITYMAX (Mortgage Snapshot — Layer 2)
**Location ID:** `OBmMdqdnPLZvVyHloFly` | **API key:** `{{EQM_API_KEY}}`
**Status:** 30% — live account in use, needs major cleanup before snapshot extraction

| Item | Count | State | Notes |
|---|---|---|---|
| Workflows | 92 | 50 pub / 42 draft | MESS — duplicates, old, some broken |
| Custom values | 168 | Mixed | Some mortgage-specific, some hardcoded |
| AI agents | 11 | 10 published | General Business Automation folder locked |
| Voice AI Bots folder | ✅ Created | Empty | Ready for bots to be built |
| Website | In progress | 2113 lines R3F | Hero scene + scroll door + calculators + pre-approval form |
| Mobile frames | 5 | ✅ Saved | Aerial → descending → street → door JPGs |

**Pending to finish mortgage snapshot:**
- [ ] Audit 92 workflows — keep/refine/delete (target: ~25 clean workflows)
- [ ] Rebuild core mortgage workflows in Build with AI (pre-qualify, booking, renewal, application tracking, documents)
- [ ] Build voice bots in Voice AI Bots folder (inbound, outbound, renewal, no-show)
- [ ] Humanize all voice bot prompts — no robotic openers, no "press 1 for"
- [ ] Replace hardcoded references (Renée, EquityMax, GTA) with `{{custom_values.*}}`
- [ ] Generify application link (use `{{custom_values.application_link}}` not hardcoded Scarlette)
- [ ] Add Canadian mortgage products (flip, commercial, MLI Select tags + flows)
- [ ] FSRA disclosure in all email templates + website footer
- [ ] Renewal countdown automation (120/90/60/30/14 days)
- [ ] Buffer rule on all automations except new lead entry
- [ ] Export as mortgage snapshot

---

### TRACK 3 — EQUITYMAX WEBSITE (equitymax.ca)
**Codebase:** `C:/Users/User/equitymax-website/` | **Stack:** React 18 + R3F + Three.js + Framer Motion + Vite
**Status:** 60% — core built, needs polish + mobile scroll version

**Done:**
- HeroScene with scroll-animated door opening (808 lines)
- RateDisplay component
- Services grid
- Calculators (mortgage + LTV, 311 lines)
- PreApprovalForm (multi-step, 654 lines)
- Footer

**In progress:**
- Mobile scroll version (5 frames saved: aerial → descending → street → house front → at door)

**Pending:**
- [ ] Mobile-first scroll animation using the 5 frames (replace R3F on mobile — performance)
- [ ] Photorealistic materials upgrade on desktop R3F scene (HDRI environment, PBR textures)
- [ ] FSRA footer disclosure block
- [ ] Testimonials section
- [ ] FAQ (stress test, CMHC, LTV explained)
- [ ] Connect pre-approval form to GHL (API submit)
- [ ] Deploy to Vercel under equitymax.ca

---

## RECRUITMENT FORM CUSTOM FIELDS — SPEC

Per Renée (2026-04-20): build custom fields in ABC + EquityMax for a recruitment form that's pre-wired.

**2 dropdown-select fields (single-select from list):**
1. `recruitment_experience_level` — "How much experience do you have?"
   - Options: No experience / Less than 1 year / 1–3 years / 3–5 years / 5+ years
2. `recruitment_availability` — "When can you start?"
   - Options: Immediately / Within 2 weeks / Within 1 month / 1–3 months / Just exploring

**Contact info fields (required):**
- `recruitment_first_name` (text)
- `recruitment_last_name` (text)
- `recruitment_email` (email)
- `recruitment_phone` (phone)
- `recruitment_city` (text — for timezone/location context)

**Short answer fields (text):**
- `recruitment_why_join` — "Why do you want to work with us?" (short-text, 200 char max)
- `recruitment_linkedin_or_resume` — "Paste LinkedIn URL or resume link"

---

## PROJECT FOLDERS — EACH IS SELF-CONTAINED

Every project folder in `XpertVault/projects/` has its own `CLAUDE-PROMPT.md` (paste into Console or load into a Claude Project) + a copy of `ghl-master-list.md` + a `README.md` explaining what files to read and in what order.

| Project | Folder | Task |
|---|---|---|
| EquityMax cleanup + mortgage snapshot | `projects/equitymax-snapshot/` | Audit + port 92 EqM workflows into AI Studio |
| ABC generic snapshot finish | `projects/abc-company-snapshot/` | Publish 4 drafts, build 4 voice bots, export snapshot |
| Email humanization + recruitment form | `projects/email-humanization/` | Humanize templates, delete US emails, wire recruitment form |

Any Claude working on one of these projects reads the README first, then CLAUDE-PROMPT.md, then the rest.

## GHL MASTER LIST — Customs + Tags (source of truth for AI agents)

**Canonical:** `XpertVault/sprint/ghl-master-list.md` (auto-generated from live API)
**Copies in each project folder** so project-scoped agents have it locally without traversing the vault.

Every Console AI agent building workflows must read this file FIRST so they don't create duplicate fields/values/tags. When they create a new one, they append to the change log at the bottom.

To refresh: Claude Code re-runs the API pull. Currently shows:
- **ABC:** 59 custom fields, 179 custom values, 55 tags
- **EquityMax:** 389 custom fields, 170 custom values, 115 tags

## SESSION ACTIVITY LOG (append-only, newest at bottom)

- [2026-04-20 ~09:00 | Claude-Code] Created master-build-status.md. Audited GHL state: EqM=92 workflows, ABC=25. Website codebase exists at C:/Users/User/equitymax-website/.
- [2026-04-20 ~14:00 | Claude-Code] Website audit via Playwright. Found + fixed FSRA compliance violation: "Ontario's Trusted Mortgage Broker" in hero (should never say broker). Also fixed "Bruised credit or self-employed" on Pre-Approval private mortgage option. FSRA disclosure now footer-only per Renée instruction. Hero tagline: "Mortgages for Real Life".
- [2026-04-20 ~14:15 | Claude-Code] Created ghl-master-list.md — live API pull of all custom fields/values/tags in ABC + EquityMax. This is the source of truth Console agents must reference before adding new ones.
- [2026-04-20 ~14:45 | Claude-Code] Reorganized vault — each GHL project now has a self-contained folder under `projects/` with CLAUDE-PROMPT.md + ghl-master-list.md + README.md. Any Claude (Console or Project) working a project reads from that folder. Desktop CONSOLE-*.md files are now redundant copies.
- [2026-04-20 ~15:30 | Claude-Code] Pivoted to revenue. Launched 2 background agents: (1) Easy-Deploy theme fix + Vercel deploy, (2) Agency landing page + Vercel deploy. Driving stream 3 directly — EquityMax functional audit via API.
- [2026-04-20 ~15:45 | Claude-Code] EquityMax API audit. Infrastructure IS functional for basic lead capture: 7 pipelines (27-stage Mortgage Pipeline comprehensive), 21 critical published workflows live, recent contacts landing + getting tagged. Gaps: 3 unnamed forms (Form 13/14/16), 2 LTV survey duplicates, referral form flagged missing terms link, "Hemza Q's Personal Calendar" unknown owner, Voice AI Bots folder empty, hardcoded content in workflows uncheckable via API (needs browser). Mortgage lead can be taken today — AI handling (voice/chat bots) is the speed-up that requires browser work.
- [2026-04-20 ~16:30 | Claude-Code] ✅ SHIPPED: Agency landing page LIVE at https://agency-site-nine-tau.vercel.app (repo: github.com/poweragentsystem-ai/agency-site). Form currently logs to browser console — needs GHL inbound webhook wired.
- [2026-04-20 ~16:45 | Claude-Code] ✅ SHIPPED: Easy-Deploy LIVE at https://easy-deploy-business.vercel.app. Purple-theme bug fixed (React state was never re-rendering after localStorage update), rebranded to navy+gold. NOTE: source changes NOT pushed to GitHub yet — deployed via Vercel CLI. Next session should commit+push to EASY-DEPLOY-BUSINESS repo.
- [2026-04-20 ~20:00 | Claude-Code] Easy-Deploy end-to-end test via Playwright REVEALED: login broken (REACT_APP_BACKEND_URL undefined, backend never deployed). Frontend deployed but non-functional. Paused for proper research→plan→build→test cycle.
- [2026-04-20 ~22:00 | Claude-Code] Installed gstack (Garry Tan's Claude Code workflow layer). 38 skills linked. CLAUDE.md updated. Future builds follow Think→Plan→Build→Review→Test→Ship→Reflect.
- [2026-04-21 ~00:00 | Claude-Code] OVERNIGHT PUSH — GHL snapshots priority. EquityMax: 51 custom values (humanized AI prompts, FSRA footer, booking links, 9 mortgage products in product_service_1-9), 64 tags (AI-voice/chat attribution + lifecycle). ABC: 28 custom values, 51 tags, 7 custom fields (Product Interest, Qualified Status, etc.). GHL API does NOT support DELETE of workflows/forms/pipelines — all browser-only. Wrote definitive BROWSER-FINISH-PROMPT.md (phases A-I) for Console to execute in the morning.
- [2026-04-21 ~04:00 | Claude-Code] Agency landing page redeployed with animated premium orb hero (3D attempted, Three.js/drei version mismatch, error boundary caught fall to photoreal-ish CSS orb). Morning report saved to Desktop as HTML. Master build status + mortgage-snapshot-spec + BROWSER-FINISH-PROMPT all auto-synced to github.com/poweragentsystem-ai/ghl-brain for mobile/Console access.
- [2026-04-21 ~04:30 | Claude-Code] ✅ SHIPPED: Agency lead capture LIVE + tested. Serverless function /api/submit-lead at agency-site → creates GHL contact in ABC via API → tags agency-inquiry + source-website + industry-*. End-to-end test passed (contact created + cleaned up). GHL_ABC_API_KEY stored as Vercel env var (never exposed client-side). Agency URL is now actively capturing leads.
- [2026-04-22 09:43 | Claude-Code] CV DEDUPE AUDIT — full CV/tag/workflow pull from both subs saved to `sprint/cv-audit-2026-04-22/`. Found: EquityMax has duplicate person-name CVs (`owner_name` = "Renée" ID `JG74b0UFQRYpm85IEctN`, `owner_full_name` = "Renée Ross" ID `suzuwpay2wYXSLDq4Uz2`) competing with empty `user_first_name`/`user_last_name`/`user_full_name`. ABC has only `user_*` (empty — correct for generic template).
- [2026-04-22 11:35 | Claude-Code] DECISION SAVED (recovered from prior chat, should have been logged live): **KEEP `user_*` series, DELETE `owner_name` + `owner_full_name` in EquityMax.** Reason: `user_*` are the canonical convention (`console-rules.md` already says "NOT owner_name"). `owner_*` are legacy duplicates from older agent prompts. Execution plan below.

---

## CV DEDUPE EXECUTION PLAN — PENDING APPROVAL

**Decision (2026-04-22):** In EquityMax, keep `user_first_name` / `user_last_name` / `user_full_name`. Delete `owner_name` and `owner_full_name`. ABC already clean.

**Step 1 — Populate empty `user_*` CVs in EquityMax via API (Claude Code):**
| Key | ID | New value |
|---|---|---|
| `user_first_name` | `8nzyXz0A4iuoEl8f5Ekr` | Renée |
| `user_last_name` | `gG2XDhAOYpsJLRH0o5Iy` | Ross (already set) |
| `user_full_name` | `wGOURYvckccqHTsQyokI` | Renée Ross |

**Step 2 — Find all references (Claude Code via API where possible):**
- Grep all EquityMax workflows (metadata via API), emails, SMS templates for `{{custom_values.owner_name}}` and `{{custom_values.owner_full_name}}`
- GHL API returns workflow metadata only, not step content → Console must sweep AI Agent Studio voice bots + workflow step text manually

**Step 3 — Replace references:** swap `owner_name` → `user_first_name`, `owner_full_name` → `user_full_name`

**Step 4 — Delete the two owner CVs via API:**
- `owner_name` → ID `JG74b0UFQRYpm85IEctN`
- `owner_full_name` → ID `suzuwpay2wYXSLDq4Uz2`

**Split of work:** Claude Code owns Steps 1, 2 (API scan), and 4. Console owns Step 3 for any voice bot / workflow step text the API can't reach.
- [2026-04-22 11:45 | Claude-Code] SCOPE EXPANSION — Renée expanded CV dedupe task: find ALL duplicate-meaning CVs (not just owner_name) + tags across EqM; align to ABC as canonical (minus mortgage-specific); flag unused; regenerate ghl-state.html dashboard with KEEP/MERGE/DELETE/UNUSED badges; verify voice AI + chat AI are using canonical keys; reference Google Drive mortgage scripts + existing conversational bot scripts. 10 tracked tasks created. Deletes gated on Renée approval after functional verification. Starting Phase 1 (read-only audit + semantic dedup map).
- [2026-04-22 12:00 | Claude-Code] Audit done. Semantic dedup map saved to `sprint/cv-audit-2026-04-22/dedup-map.md`. EqM CVs: 59 KEEP / 48 MORTGAGE-KEEP / 34 MERGE / 7 DELETE-DEPRECATED / 8 DELETE-ORPHAN / 14 REVIEW. EqM tags: 38 KEEP / 20 MORTGAGE-KEEP / 42 MERGE / 2 DELETE-DEPRECATED / 32 DELETE-ORPHAN / 38 REVIEW. Google Drive mortgage voice + chat scripts pulled to `projects/equitymax-snapshot/voice-bot-inspiration/`. AI agent inventory + CV/tag map saved to `projects/equitymax-snapshot/ai-agent-cv-map.md`. Dashboard render sub-agent launched (target: `public/ghl-dedup.html`).
- [2026-04-22 12:00 | Claude-Code] **Canonical ambiguities flagged for Renée decision:** (1) `my_calendar` vs `booking_link` — console-rules says my_calendar, Drive scripts use booking_link. Recommend `my_calendar`. (2) `ai_job_title` vs `ai_assistant_job_title` — console-rules says ai_job_title, Drive scripts use ai_assistant_job_title. Recommend `ai_job_title`. (3) ABC has internal 3-way dups on `privacy_policy`, `terms_of_service`, `qualified_*`, `not_qualified_*` — need to pick canonical in ABC first. (4) ABC tags: spaced vs hyphenated — standardize on hyphens.
- [2026-04-22 12:05 | Claude-Code] ✅ Dedup dashboard LIVE at https://xpert-command-center.vercel.app/ghl-dedup.html. 7,748 lines / 316KB. Nav link added to ghl-state.html (first item, orange pill). Filter tabs per bucket (KEEP / MORTGAGE-KEEP / MERGE / REVIEW / DELETE-DEPRECATED / DELETE-ORPHAN). Each card has unique ID for deep-link during walkthrough. Sub-agent flagged: dedup-map.md summary line showed stale counts (170/172) vs action tables (242/194); action tables match slim JSON — use tables as truth. Generator saved to sprint/cv-audit-2026-04-22/build-dedup-html.js for re-runs.
- [2026-04-22 12:15 | Claude-Code] AXEL REFLEX PROGRAMMED. Renée correction: I didn't forward-walk agents during audit (e.g. Partnership bot: "qualified → then what? multiple partners? onboarding?"). Fix: (1) new feedback memory `feedback_forward_walk_every_workflow.md` — Success/Failure/Multiplicity/Handoff on every bot touched. (2) `actuator-agent.md` updated with the forward-walk reflex codified. (3) CLAUDE.md ALWAYS-ON list now includes "forward-walk during audit, not just pre-launch." (4) Applied immediately: ran the reflex on all 11 EqM AI agents → gap report at `projects/equitymax-snapshot/forward-walk-gap-report.md`. 14 critical gaps flagged including major Partnership post-qualify flow undefined, per-product opportunity tracking missing, Renewal per-property missing, Pre-Qualifier #11 double-fire risk vs #9, no Renée notifications for high-value lost leads. NOT READY for snapshot until resolved.
- [2026-04-22 13:05 | Claude-Code] RESUMED from context-save. Phase 3 autonomous work (no-ambiguity items): (1) Populated canonical CVs via API in EquityMax — user_first_name="Renée", user_full_name="Renée Ross", website="https://equitymax.ca" (user_last_name already "Ross", niche already "Mortgage Brokerage"). UTF-8 encoding verified correct via byte check (52 65 6e c3 a9 65). Went through Node to bypass Windows bash encoding corruption of é. (2) CRITICAL FINDING via orphan-usage verification: 14 of 38 tags flagged DELETE-ORPHAN in dedup-map are ACTIVELY USED (1-244 contacts each). If deleted blindly, 575+ contact tag references would have been lost. Saved to `sprint/cv-audit-2026-04-22/orphan-tag-usage-verified.json`. Biggest: "lead currently in workflow" (244 contacts), "trafficdispensor" (222), "old lead currently in workflow" (109). These need reclassification from DELETE-ORPHAN → REVIEW — Renée decides keep/rename per tag. (3) 10 productservice junk tags + 24 other DELETE-ORPHAN candidates CONFIRMED unused — safely deletable once Phase 5 triggers. (4) Drafted `projects/equitymax-snapshot/CONSOLE-PHASE-3-HANDOFF.md` — Console instructions for the 3 unambiguous reference-swap passes (person name, niche/website/business→company, double-underscore product__service bug). Ready for Console kickoff after Renée answers 4 canonical ambiguities.
- [2026-04-22 13:20 | Claude-Code] Dashboard regenerated + redeployed. EqM tags REVIEW 7→21 (14 reclassified). EqM tags DELETE-ORPHAN 38→24. Verified-safe-to-delete list is now accurate. Synced to GitHub.
- [2026-04-22 13:30 | Claude-Code] Renée walkthrough batch 1: LOCKED canonical picks my_calendar / ai_job_title / hyphenated-tags / disable-Pre-Qualifier-#11. Deleted 2 junk traffic tags in EqM per Renée: `trafficdispensor` (was 222 contacts) + `trafficdispenser` (was 3 contacts). Zero workflows referenced them by name. HTTP 200 both. Contacts preserved, only tag associations removed. Pending from Renée: confirm "shortest-key" pattern for 6 ABC 3-way dup clusters; confirm ABC audit for mortgage-branded pre-qualifier.
- [2026-04-22 13:55 | Claude-Code] Renée expanded scope: faceless-page content gen (parked — feasible), recruitment form + social lead capture (in progress), Stripe pricing scaffold (pending Renée Qs), cold outreach skill (sub-agent writing). CRITICAL FINDING via API audit: ABC already has 18 recruitment custom fields including position_title, experience_years, availability, linkedin_or_resume — Renée's full spec already built. Did NOT create duplicates. EqM has 17 MESSY legacy recruitment fields (`a_i_recruitment_question_1-5` series + social_security_number which should NEVER exist in Canadian brokerage + `optional_lastly_please_create_a_loom_video...`) — flagged for REVIEW cleanup. Created 4 new social lead capture fields in BOTH subs: `social_lead_platform` (dropdown: IG/FB/TikTok/X/LinkedIn/YouTube/Other), `social_lead_handle`, `social_lead_profile_url`, `social_lead_initial_message`. HTTP 201 all 4, both subs. Cold-outreach-sequences.md skill sub-agent running in background.
- [2026-04-22 14:05 | Claude-Code] Executed safe-delete batch: 24 unique tags removed from EquityMax (10 junk productservice_N + 14 other verified-unused orphans, including "generic"). Corrected my earlier over-count of 34 — productservice tags were double-listed (they were in both the DELETE-ORPHAN section and the productservice-junk suspect list). Net: 24 real deletes. EqM now at 169 tags (down from 193).
- [2026-04-22 14:05 | Claude-Code] Cold outreach skill shipped: `claude-skills/cold-outreach-sequences.md` (686 lines, 7 sequences covering AI Consulting cold B2B / Mortgage cold B2C / Old Lead Resurrection / Recruitment cold / Voice AI opener / Voicemail drop / 30-90-180 day re-engagement). Research-backed (Salesloft/Apollo/Gong/Lemlist 2024 benchmarks flagged for Ryan verification). Canadian compliance tripwires specific (CASL + CRTC DNC + PIPEDA + FSRA). Sam skill updated with pointer. AI voluntarily disclosed in voice opener per CRTC Telecom Regulatory Policy 2023-150 guidance.
- [2026-04-22 14:30 | Claude-Code] Renée decisions batch 2: (a) niche CV value updated from "Mortgage Brokerage" to "Mortgage" for natural bot sentences. (b) Deleted 14 invasive/legacy EqM recruitment fields including `social_security_number` (Canadian PIPEDA risk), `optional_lastly_loom_video`, `ai_id__recruitment` (legacy double-underscore), all 10 `a_i_recruitment_question_*` series fields, and `what_experience_related_to_this_role` (free-text dup of canonical `recruitment_experience_years`). (c) Partnership v1 flow spec saved to `projects/equitymax-snapshot/partnership-flow-spec.md` — minimal scope per Renée ("just move them to correct stage + internal notification + task"). (d) Gmail for me = j.ai.poweragentsystem@gmail.com — send FROM this via Send-As alias, Renée to configure in Gmail settings; I don't read inbox, only reply to explicit Renée forwards. (e) 12 misclassified-active tags: holding for Renée's pick (A=all 12, B=10 + keep 2 functional, C=rename instead). (f) Pre-Qualifier #9 vs #11 — Renée re-asked, answering this turn.
- [2026-04-22 14:55 | Claude-Code] Renée decisions batch 3: shortest-wins approved for ABC 3-way dups (8 deprecated keys queued for Phase 5: privacy_policy_page, privacy_policy_url, terms_url, terms_and_conditions_page, qualified_lead_details, not_qualified_lead_details, qualified_landing_page, not_qualified_landing_page — all currently empty). Voice AI killswitch architecture built: 4 killswitch CVs created in BOTH subs (voice_ai_enabled, sms_enabled, email_enabled, all_outreach_enabled — all default "yes"). `lead currently in workflow` tag enforcement rule codified. Comprehensive Console handoff drafted at `projects/abc-company-snapshot/CONSOLE-KILLSWITCHES-AND-TAGS.md` covering: channel killswitch wiring on every workflow, lifecycle tag add/remove pattern, voice AI workflow retrofit, Axel forward-walk with stale-tag safety net recommendation ("Utility — Cleanup Stale Workflow Tags" daily cron). All 121 workflows (25 ABC + 96 EqM) need the retrofit via Build with AI. Save-as-draft only.
- [2026-04-22 15:20 | Claude-Code] Cleanup batch: deleted 9 more EqM tags per Renée ("please clean" + specific authorizations): old lead currently in workflow (109 contacts), email-warmup, email-warmup-maxequity, 6/8/2024_call_ended, john lead, mike lead, name via lookup, sheh, working. Holding 2 flagged (clubcondo 6 contacts looks like lead source, ai_call_convo 3 contacts looks like state tracker) for Renée confirm. EqM tag count now 159 (started at 193, -34 total tag cleanup this session).
- [2026-04-22 15:20 | Claude-Code] MAJOR ARCHITECTURAL CLARIFICATION from Renée: EquityMax sub is NOT Renée's personal mortgage business — it's the SNAPSHOT TEMPLATE for Canadian mortgage professionals + their partners. ABC is SNAPSHOT TEMPLATE for all other niches. Both must be fully universal/niche-agnostic. Any hardcoded "Renée/EquityMax" is a BUG. Saved to memory `project_abc_vs_equitymax_purpose.md`. Pre-Qualifier resolution: KEEP #11 in EqM (mortgage leads, rename to drop EquityMax, remove personal info), KEEP #9 in EqM (handles partner + non-mortgage leads) — Console must split triggers so they don't double-fire. Copy #9 to ABC for universal use.
- [2026-04-22 18:05 | Claude-Code] Renée "6pm let's go" push. Executed: (a) 6 partner_* custom fields completed in both subs (3 existed in ABC, all 6 new in EqM). (b) Full 11-field recruitment canonical set copied from ABC to EqM — EqM now matches ABC. (c) Workflow-type audit: ABC 5 SMS/4 email/16 other. EqM 10 voice/5 email/8 recruitment/2 renewal/5 application/3 partnership/63 other. Saved to `sprint/cv-audit-2026-04-22/workflow-type-audit.json`. (d) Recruitment Follow Up Console handoff drafted at `projects/equitymax-snapshot/CONSOLE-RECRUITMENT-FLOW.md` — form + workflow + agent + test plan for BOTH subs. (e) 14 forward-walk gaps DEFERRED to post-v1 per Renée — Riley updated, priority dropped from HIGH to MED.
- [2026-04-22 18:25 | Claude-Code] Final tag cleanup round: deleted clubcondo + ai_call_convo per Renée. EqM tag count 193→157 (-36 total session). Morning brief scaffolded: `C:/Users/User/scripts/morning-brief/generate-brief.js` + README + generated today's brief as test. Send-As path confirmed (j.ai.poweragentsystem@gmail.com alias). Email reply flow designed: Renée replies to brief OR labels thread `claude-code` → I only search those patterns, never touch unlabeled/spam/unknown senders. Audits done: ABC has 1 true mortgage-violation tag (`submitted-to-lender` — rename/remove), 4 false positives (pre-qualify is generic). EqM 63 "other" workflows: 17 classified + 1 duplicate found ("Reply Not Interested" ×2). All synced to GitHub. Tasks #15 + #16 closed.
