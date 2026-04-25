---
name: Build With Rigor — Test-As-You-Go Pattern (Emergent-style)
description: For every multi-step build (workflow, automation, page, integration), follow this rigor — research → plan logic + design + journeys → display each step → execute one task → test → next. No batch-then-test-at-end. Renée 2026-04-25.
type: skill
---

**The pattern Renée wants me to follow on every non-trivial build.** Modeled after how Emergent builds platforms — they catch mistakes faster because they test as they go.

# THE RIGOR

## 1. Understand
Before writing code or pushing tasks, ask:
- What is the user actually trying to accomplish (not just literally what they asked)?
- What's the success outcome from THEIR side?
- What edge cases would break this?
- If I'm unclear on anything — ASK FOR AN EXAMPLE before guessing.

**Asking for an example is cheaper than building the wrong thing.** When the request is ambiguous (new feature, new flow, naming uncertainty), say:
> "Quick example check before I build — would [scenario A] or [scenario B] match what you mean? Or paste me a 3-line example of what good looks like."

## 2. Research
- What already exists in the codebase / vault that solves part of this?
- Is there a legacy version that worked? Open it. Read it. Mirror what worked.
- Are there existing patterns to copy-adapt instead of write-from-scratch?
- For mortgage/sales work: cross-check against `mortgage-sales-writing.md` + `lead-lifecycle-architecture.md`.

## 3. Plan
For every build, produce three artifacts BEFORE coding:

**(a) Logic plan**
- Triggers: what fires this?
- Conditions: what gates each path?
- Actions: what happens at each step?
- Exit conditions: when does it stop?

**(b) Design plan** (when UI is involved)
- Visual hierarchy
- User flow per role (visitor / subscriber / master admin)
- Empty states + error states
- Mobile-first

**(c) Journey plan**
- Walk it as the LEAD: what do they see, feel, click?
- Walk it as the OPERATOR: what do they configure, watch, intervene on?
- Walk it as the SYSTEM: what tags get applied, what data flows, what notifications fire?

## 4. Display the plan
Show the plan to Renée BEFORE executing. Format:
> "Plan for [task]: [step 1], [step 2], [step 3]. Wait for go before executing."

This catches misalignment cheaply. Renée can redirect a sentence faster than a built feature.

## 5. Execute one task at a time
- Pick the first plan step
- Build it
- Verify it works (see step 6)
- THEN move to step 2

Never build all 6 steps then test the whole thing. Test each step before the next.

## 6. Test as you go
For each step:
- Visual: does the rendered output look right? (screenshot if possible)
- Logical: does the data flow correctly? (test with sample input)
- Edge: what if the input is empty / weird / missing?
- Permission: can the right role see/do this?

If a step fails the test, FIX BEFORE MOVING ON. Don't accumulate broken steps.

## 7. Surface progress visibly
Update the master-build-status + the live queue dashboard every meaningful step. Renée should be able to watch progress in real time without having to ask.

## 8. Honest reporting
After completing or failing:
- Say what shipped (concrete + verifiable)
- Say what didn't ship + why
- Say what's blocked + what unblocks it
- Don't gloss over partial completion

## ANTI-PATTERNS TO AVOID

❌ **Plan once → build everything → test at end** (too late to catch errors cheaply)
❌ **Guess instead of asking for an example** (cost: wrong thing built, time wasted)
❌ **Queue tasks for Console without testing the foundation first** (Console will fail on broken inputs)
❌ **Skip "display plan first"** to save time (this protocol is the rigor itself)
❌ **Mark a task done because the code wrote** (done = tested + verified working)
❌ **Wait silently while building** (Renée can't redirect what she can't see)
❌ **Use jargon Renée doesn't use** ("canonical", "atomic", "schema", etc. — see `feedback_plain_english_no_jargon.md`)

## REFERENCES

- `feedback_plain_english_no_jargon.md` — vocabulary rules
- `feedback_morning_brief_actionable.md` — auto-resolve context
- `feedback_token_consolidation_rule.md` — never delete a token from a sentence
- `feedback_never_say_cant.md` — always lead with "I can absolutely do this — here's how"
- `feedback_time_awareness.md` — Toronto time, work window, late-night = execute fast
