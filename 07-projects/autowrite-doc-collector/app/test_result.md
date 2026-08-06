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

## Known limits / untested (honest list)

- **SupabaseStore untested** — no Supabase project/keys in this environment. Code complete; needs a live smoke test when Renée creates the ca-central-1 project (SQL in README).
- **Real Claude vision reading untested** — no ANTHROPIC_API_KEY here; simulator exercised the full pipeline. Same JSON contract.
- **Resend sending untested** — logged-only mode verified; non-prod forced-recipient guard is code-reviewed + unit-logic simple, but first live send should target renee.ross@gmail.com deliberately.
- Multi-applicant UI: engine marks docs perApplicant; portal v1 shows one set (co-applicant flag captured for the agent). Phase 2.
- 🎨/🏛 design + expert-panel review: self-review done in-session (screenshots); formal panel pass still owed before client-facing go-live.
