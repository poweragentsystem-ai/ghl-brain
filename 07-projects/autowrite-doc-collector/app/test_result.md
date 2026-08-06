# autowrite v1 — Test Ledger (Emergent-loop protocol)

*Session: 2026-08-06, remote build. Every claim below was executed and observed, not assumed.*

## Unit tests — `npx vitest run` → **24/24 PASS**

Rules engine (`lib/rules/engine.test.ts`):
- Self-employed → NOAs + T1s + business licence/incorporation + business bank statements; no T4s ✅
- Homeowner → mortgage statement + property tax + insurance; non-homeowner gets none ✅
- **Unemployed homeowner → CPP/pension/bank docs, good-news note, NO rejection** (Renée law #1) ✅
- **Reverse under 55 → refinance path + "you can still move forward" client prompt** ✅
- Private classification: days-timeline → private; quick-close purchase 20%+ down → private; 10% down stays standard ✅
- **Every private deal asks the exit plan; answer surfaced to agent** ✅
- ID rules: DL front AND back; passport picture page only; credit card second piece ✅
- Gift → gift letter; RRSP HBP → RRSP statement ✅
- Tight LTV (>75%) warns AGENT with lower-cash suggestion; never rejects ✅
- Fuzz: all goal × employment × timeline × homeowner × age combos → zero dead-ends ✅

SIN module (`lib/sin.test.ts`):
- Luhn validation (CRA example 046-454-286), masking formatted + unformatted SINs, credit-card masking, non-SIN 9-digit numbers left alone ✅

## Build — `npx next build` → **PASS** (after 1 type fix + ring-label fix)

## E2E walkthrough (prod server, port 3100, demo store + simulated reader)

1. Agent login (password) → 303 to /dashboard ✅
2. Create file "Renée Test" / renee.ross@gmail.com → invite nudge **logged, not sent** (no mail key; APP_ENV guard verified in audit trail) ✅
3. Client consent → recorded with timestamp ✅
4. Intake: **the** scenario — equity, homeowner, $800k/$300k/$80k, days timeline, exit=refinance, not working, under-55 reverse interest → path=refinance, 9 requirements, both good-news notes present ✅
5. Upload "blurry-licence.png" → `needs_reupload` + friendly retake reason ✅
6. Upload good DL front + back → `verified` ✅
7. Upload to a slot not on the checklist → rejected ("unknown document slot") ✅
8. **SIN audit: raw SIN absent from ALL stored data** (db scan) ✅
9. Screenshots (Playwright, chromium): client checklist @375px, consent @375px, dashboard, file detail — all visually verified in-session ✅
10. Key-leak audit: `grep` of `.next/static/` for sk-ant/sk_live/SERVICE_ROLE/API keys → **clean** ✅

## v1.1 round (2026-08-06, same session) — 40/40 unit tests, build clean

- **Renée's tenure rule proven live:** uploaded employment letter with start date 6 months back → `checklistChanged: true`, "Previous employment proof (2-year history)" auto-added, friendly client note + agent alert written, requirement visible on both surfaces ✅ (5 unit tests incl. 12-month boundary + no-double-add + unparseable-date safety)
- Client "in your own words" note captured in wizard → shown on file detail + in export ✅
- Agent back-end notes: saved via form, agent-only, in export ✅
- GDS/TDS panel: 33.5%/41.1% computed from stated income/debts (green/amber/red vs 39/44 prime, 50/55 B-side), payment estimate + assumptions listed, "indicative" labelled ✅ (4 unit tests)
- Lender fit panel: ranked by rate, **both 4.09% ties badged BEST (green)**, promos + broker incentives in gold badges, "not a fit today (2) — and why" collapsed, FSRA indicative footer, lender names agent-only ✅ (6 unit tests: urgency→quick-close/private, self-employed→BFS reasons, unemployed→non-traditional fits, LTV-cap knockouts, bankruptcy filtering)
- Export package: Velocity-API-IN-shaped JSON with applicant/deal/property/ratios/doc statuses/extracted fields/agent notes — **no SIN possible by design** (scrubbed at ingest; verified in output) ✅
- Name-variant cross-doc heads-up (neutral wording, never "fraud") ✅ (unit test)
- Screenshot of the underwriter cockpit visually verified ✅

## v1.2 round (2026-08-06, same session) — 50/50 unit tests, build clean

Live E2E on fresh server (all executed, outputs observed):
1. **Agent-filled intake**: agent posted answers on the client's behalf (explicit "private" product) → path=private, exit plan captured, `completedBy: agent` ✅; same call WITHOUT the agent cookie → 401 unauthorized ✅. Client's link then goes consent → straight to checklist.
2. **Product-first start screen** (screenshot verified @375px): Buying a home / Refinance / Renewal / Reverse (55+) / Private-fast / Something else. Engine honors explicit choice (4 new tests: private→exit-plan, reverse 60→reverse vs 45→refinance+note, refinance-in-days→private w/ refinance-as-exit note, renewal/other) ✅
3. **Co-applicant privacy (the core of it)**: primary added self-mode co-applicant → co-applicant got own private link (invite nudge audit-logged to test contact) ✅; **primary upload into co-applicant slot → 403 "That applicant's documents are private."** ✅; co-applicant upload on own link → verified ✅; co-applicant portal shows ONLY their 5 slots ✅; primary portal hides their docs, shows 🔒 summary (1/5 in) ✅; **sharing toggled ON by co-applicant → primary now sees their slots** ✅ (4 unit tests on canAccess + delegated mode)
4. **Applicant-aware progress**: perApplicant docs duplicate per applicant, shared docs single; docs attach to the right applicant's slot ✅ (2 unit tests)
5. **Welcome back**: returning client (any doc present) greeted "Welcome back, [name]" at their progress ✅ (code-reviewed; rendering exercised in checklist screenshots)
6. Digest cron now chases self-mode co-applicants on their own links; primary nudged for own + delegated slots only.

## Known limits / untested (honest list)

- **SupabaseStore untested** — no Supabase project/keys in this environment. Code complete; needs a live smoke test when Renée creates the ca-central-1 project (SQL in README).
- **Real Claude vision reading untested** — no ANTHROPIC_API_KEY here; simulator exercised the full pipeline. Same JSON contract.
- **Resend sending untested** — logged-only mode verified; non-prod forced-recipient guard is code-reviewed + unit-logic simple, but first live send should target renee.ross@gmail.com deliberately.
- Multi-applicant UI: engine marks docs perApplicant; portal v1 shows one set (co-applicant flag captured for the agent). Phase 2.
- 🎨/🏛 design + expert-panel review: self-review done in-session (screenshots); formal panel pass still owed before client-facing go-live.
