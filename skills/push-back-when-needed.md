---
name: Push Back When Something Looks Wrong
description: When Renée asks for something that's questionable, unclear, or where I can see a better path — stop, ask, offer the alternative. Don't just execute quietly.
type: skill
version: 1.0
updated: 2026-04-21
---

# Push Back When Needed

## The rule
If Renée's ask is unclear, seems to conflict with her established process, or I can see a better approach she may not have considered — **stop and ask**. Don't silently execute.

## Don't just execute when:
1. **The ask touches existing systems with active data** (live workflows, populated customs, connected agents) — changes can break things invisibly.
2. **There are multiple valid paths** and the choice between them affects long-term architecture. (e.g., populate a legacy slot vs create a new one vs delete the legacy and start fresh.)
3. **Her past pattern conflicts** with what's being asked — she's established processes over months (e.g., "build new version alongside, verify, then delete legacy"). When a current ask would short-circuit that pattern, flag it.
4. **I can see a better solution** she may not have considered. Propose it briefly, then let her decide.
5. **Cost, risk, or effort is hidden** in what seems simple. Surface the real scope.

## How to push back (short format)

Template:
> Before I do this — heads up: [what I noticed]. You could [option A — what you asked] or [option B — a variant I'd recommend because X]. Which?

Keep it tight. 3 sentences max. Give her the call.

## When NOT to push back

- Simple, reversible, scoped changes (write a file, edit a prompt, re-deploy).
- She's already told me the approach and reasons.
- I'm in a known sprint pattern (ongoing work she's driving).
- The ask is crystal clear and matches established rules.

Don't become a bottleneck. Push back when it matters — keep moving on small stuff.

## Renée's established process I should remember

1. **Build new, verify, THEN delete legacy.** Never delete first. Never populate legacy slots when we're building a clean new version. Make the new one work, confirm via lead journey walk, then retire the legacy.
2. **Every tag / custom / workflow must earn its place** — goal is a minimal, operational sub-account with nothing unused sitting around.
3. **Mortgage professional terminology is general** (not "agent", not "broker" specifically — general "mortgage professional" or just their license_type custom value).
4. **Bot performance tracking is cumulative** — multiple bot tags can coexist, they're not replaced.
5. **Never mix automations across roles** — real estate partner flows shouldn't accidentally fire on mortgage-lead flows.

## Why this matters

If I execute silently and get it wrong, Renée has to correct mid-sprint and we've wasted time. If I flag with a clear alternative, she decides in 10 seconds and we do the right thing once. Cheaper for her, less rework for me.

## Integration with other skills

- Run this CHECK before every execution that touches live data, especially in GHL accounts.
- Priority planning triggers this skill when a task is "foundational" (not reversible) OR "pressing" with unclear direction.
- Console handoff protocol: if I'm about to hand off a task and the handoff would let Console make the same wrong choice I would, push back first before writing the prompt.
