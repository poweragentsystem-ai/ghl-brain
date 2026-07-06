# ⚙️ THE EMERGENT-STYLE BUILD LOOP — how every build runs from now on
*Adopted 2026-07-04 per Renée: "deep study Emergent — it builds like a human: checks if it's working, tweaks design it doesn't like, suggests what users would want, constantly checks for broken backend." Distilled from Emergent's leaked E1 system prompt + tool definitions + official E3 architecture post + 6 hands-on reviews. Full findings with sources: `13-intel/emergent-build-behavior-study.md`.*

## THE CORE INSIGHT
Emergent's "human-like" building is not magic — it's **verification as a tool called after every unit of work**, a **test ledger file** carrying state across the whole build, and **design critique as a written checklist** (not vibes). Its tester is literally curl + Playwright driven by an agent — tools we already have.

## THE LOOP (follow in order, every build)

1. **CLARIFY-OR-STOP (once, up front).** Resolve ambiguity, API keys, and phase-3 landmines (billing, auth, platform) before code. Never start unclear.
2. **NUMBERED PHASES, one approval, then autonomous.** Each phase's definition of done = "tested and passed," never just "built."
3. **TEST LEDGER** — create `test_result.md` in the project at start. Read before every test cycle, append findings after. Carries verified/broken/mocked state so no test is blind and nothing regresses silently.
4. **FRONTEND FIRST ON MOCK DATA** — full clickable UI as a "teaser" before any backend. Write `contracts.md`: every API contract + every mock = the backend to-do list and mock→real migration map. Say out loud what is mocked.
5. **INNER LOOP — after EVERY meaningful change (not at phase end):**
   a. Read build/dev logs first (cheapest signal).
   b. Playwright-screenshot the changed surface and LOOK at it.
   c. Function pass: rendered? console errors? interactions wired?
   d. **Design pass against the written checklist:** padding/alignment/spacing · text contrast · no broken images/placeholder junk · whitespace generous (2–3x comfortable — cramped looks cheap) · no default AI purple gradients, none on text, ≤20% viewport · every interaction has hover/transition · icons never emoji · nothing shipped on a failing surface.
   e. Fail → fix → re-screenshot. Never build the next feature on a broken one.
6. **BACKEND: curl EVERY endpoint** (real request, status + shape + error path) + read deploy/runtime logs after each change. Backend passes before wiring.
7. **WIRE-UP: replace mocks one contract at a time**, re-running the loop per swap. Ledger tracks each.
8. **PHASE-END E2E "HUMAN PASS":** Playwright the deployed URL as a real user — every nav, every form (test contact only), happy + failure + edge, **with realistic messy inputs, 3 timed runs on latency-sensitive paths, worst run needs 20% headroom vs platform limits** (the teacher-input lesson). Failures route back to the inner loop; fix-without-retest is banned.
9. **REPORT LIKE MISSION CONTROL:** terse per-phase card — built / tested / PASSED or FAILED — plus explicit "X is still mocked." Never claim success without certainty. Stop-and-ask only at strategic gates.
10. **DELIVER = results + live URL + a proactive next-steps menu** (2–4 things the end user would want next, drawn from what was mocked/deferred) — never just "done." **Includes the Emergent reflex: if the user could ever wonder "is it working?", build the feedback state (spinner/progress/status) without being asked.**
11. **BUDGET:** this loop costs ~30% more tokens than build-only. That is the price of nothing arriving broken — pre-approved by Renée's directive.

## TRIGGER-POINT SUMMARY
logs → after every change · screenshot + design checklist → after every visual change · curl → after every endpoint change · full E2E persona walk → end of every phase · ledger read/write → around every test invocation.

## WHERE EMERGENT'S LOOP BREAKS (so ours doesn't)
Third-party OAuth flows it can't drive itself (it made the human click) — flag these honestly as "needs your click." Mature codebases (regressions in untouched code) — our ledger + re-running prior phase tests covers this. No post-deploy monitoring daemon — ours is the canary/verify-live gates.

## ADDENDUM (Renée 2026-07-05) — independent design reviewer
Phase-end UI review (step 5d/8) should be run by a FRESH-CONTEXT design-review subagent when the surface is customer-facing: hand it the live URL + screenshot + the written checklist; it grades sizing, colors, spacing, relevance, and what to tweak — independent eyes, not self-review. (Self-review remains the inner-loop default for internal surfaces/speed.) Also load `ui-ux-pro-max`/`impeccable` on customer-facing visual builds per the standing UI/UX rule.
