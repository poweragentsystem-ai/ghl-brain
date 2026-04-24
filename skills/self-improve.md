# Self-Improve Skill — Continuous Gap-Finding & System Evolution

**Owner:** Jordan (COO) runs this continuously. Allan and Devon assist on visual/technical gaps. Ryan researches solutions.

## PURPOSE

Most AI assistants degrade over time because they don't inspect their own output, don't ask "could this be better," and don't close the loop by implementing improvements. This skill makes that loop explicit.

## THE FIVE-STEP LOOP

**1. Inspect.** At the end of each major deliverable, ask three questions out loud (silently — internal check):
- Did I produce the output at the quality bar the user expected, or did I settle?
- What did the user correct / push back on mid-session?
- What tool/capability did I notice was missing?

**2. Categorize the gap.** Classify into:
- **Capability gap** — a tool/MCP/API/SDK is missing (e.g. image gen, 3D, OCR)
- **Process gap** — a behavior or delegation pattern is wrong (e.g. asked Renée instead of Ryan)
- **Quality gap** — output was accepted but fell short of "holy shit, done" bar
- **Knowledge gap** — lacked a fact that Ryan could have retrieved
- **Structural gap** — the system (CLAUDE.md, memory, skills) lacks a durable fix

**3. Research the fix.** Ryan (Research) investigates: what tool would solve this, what does it cost, what's the install/signup path, are there free alternatives, is there a better way entirely.

**4. Propose or implement.**
- **Small fixes (internal memory, skill file edits, CSS tweaks, task list updates):** implement directly, flag briefly.
- **Medium fixes (new skill file, new rule in CLAUDE.md, new agent):** implement, summarize change.
- **Big changes (new MCP install, paid subscription, architectural rewrite, spending money):** STOP and ask Renée for approval with: what it unlocks, cost, alternatives considered, recommendation.

**5. Verify.** After any improvement, confirm: does the output next time meet the new bar? If not, loop again.

## TRIGGERS — WHEN TO RUN THIS LOOP

- End of every major deliverable
- Any time Renée says "this sucks," "this is cartoon," "this is lacidasical," "not proactive," or any explicit quality complaint
- Any time a tool fails or is missing
- Any time Renée has to repeat herself
- Weekly on-demand review: scan recent memory/feedback files for recurring patterns

## DON'T DO THIS

- Don't ask permission for small fixes that are inside the existing system boundaries (edit a file, add a memory, update a skill, fix a typo in CLAUDE.md). Just do it.
- Don't silently make big changes that cost money, break working behavior, or change how Renée interacts with the system.
- Don't add features Renée didn't ask for just because you can. Fix gaps, don't scope-creep.
- Don't write improvement proposals as essays. One paragraph: what's broken, what's the fix, what does it cost.

## CURRENT KNOWN GAPS (ROLLING LIST — UPDATED BY JORDAN)

- **Image generation (capability)** — no MCP loaded. Unlock via Gemini API key (free signup, pennies/image). Task t19 surfaced to Renée.
- **3D hyperreal scenes (capability)** — no Spline MCP or Three.js pipeline. Allan to propose Spline free tier.
- **Private GitHub repo reads (capability)** — gh CLI not installed. Task t17 surfaced to Renée.
- **Microsoft 365 / Outlook auth (capability)** — MCP installed, OAuth not completed. Task t18 surfaced to Renée.
- **Daily brief email (infra)** — needs n8n workflow built by Norm. Spec complete at XpertVault/operating-system/daily-brief-n8n-build.md.
- **Command Center visual clarity (structural)** — Projects view + Renée-task filter + mobile + agency colors all in progress via v83 edits.
- **Jordan chat actually talks (capability)** — sticky FAB is UI only; backend Claude API call not wired. Devon to build.
- **Scarlette browser automation (capability)** — no Playwright workflow established; ToS review needed before building.

## FEEDBACK MEMORIES ALREADY LIVE

- `feedback_proactive_not_lackadaisical.md` — delegate to agents, don't wait on Renée
- `feedback_flag_missing_capabilities_immediately.md` — name tool gaps upfront
- `feedback_batch_messages_save_tokens.md` — correct Renée on fragmented messages
- `feedback_build_and_test.md` — test after every meaningful block
- `feedback_dont_fix_whats_not_broken.md` — audit before building
- `feedback_save_immediately.md` — save prompts/content the moment shared
- `feedback_api_first.md` — research automated paths before browser work

These memories ARE the accumulated self-improvements. New ones get added each time a gap recurs.

## HOW RENÉE INVOKES THIS

Just saying "what could be better" or "review the session" triggers this loop. Jordan runs the 5 steps and reports back with a prioritized gap list.
