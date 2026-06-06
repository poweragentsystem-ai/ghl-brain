---
tags:
  audience: [claude-code, claude-console, claude-app]
  domain_expert: gill-ghl
  function: [ghl-workflow-build, ghl-agent-build, clone-and-adapt, ai-build-with-prompts]
  capabilities: [ghl-build-with-ai, ghl-workflow-ai, ghl-ai-agent-studio, ghl-mcp-clone]
  style: [efficient, sibling-first, ai-native]
  compliance: []
  tech: [ghl, ghl-build-with-ai]
related_to:
  projects: []
  memory_rules:
    - feedback_use_ghl_build_with_ai.md
    - feedback_check_ghl_native_before_building.md
    - feedback_easy_way_first.md
    - project_ghl_voice_agent_correct_actions.md
  skills:
    - 06-skills/gill/
  agents:
    - 04-agents/gill/
  processes:
    - 00-rules/process/parallel-skills-design-function.md
    - 00-rules/process/cross-instance-protocol.md
    - 00-rules/process/visual-project-tracking.md
---

# GHL BUILD WORKFLOW — 3-step check before any build

> **⛔ STOP. Before reading this 3-step check, the BIBLE-LEVEL rule applies first:** [`ghl-ai-as-senior-expert.md`](./ghl-ai-as-senior-expert.md) — Renée 2026-05-30. Every GHL task starts at **Sub → AI Agent → Get Started**, consult GHL's AI as senior expert, ALWAYS cross-check counts via MCP because GHL AI sometimes reads partial data (saw 14 fields when 28). The 6-step protocol there supersedes everything below.

The 3-step check below remains useful but runs INSIDE the consultation — ask GHL's AI "are there siblings I can clone? does Build with AI fit?" first, don't decide unilaterally.

---

**Established:** Renée 2026-05-19 — *"how do we get the ghl activities to always utilize the ai to prompt to do the work for us. also if there is work already done that is acceptable to check it for ideas or to copy it and adjust to make things easier. example the document reminder bot could be made by copying the application reminder bot then just making changes to it. this is common sense. it makes it easier but just changes a few of the context."*

**Applies to:** EVERY GHL build — workflows, AI agents, voice agents, forms, snapshots, templates, custom values/fields, automations.

**Cross-instance:** Claude Code · Console · App · future runners. All instances follow the same 3-step check.

---

## The 3-step check (run before ANY GHL build)

### Step 1 — Does GHL's own AI handle this?

GHL has three AI entry points that **build the actual artifact for us** when given a plain-English prompt:

| Surface | Entry point | What it builds |
|---|---|---|
| **AI Agent Studio** | Sub → AI Agent → **Get Started** button (NOT "Ask AI" top-right) → "Build with AI" | Voice AI / chat AI agents with prompts + tools + fields, account-aware, CRM-action capable |
| **Workflow AI** | Open any workflow → **Workflow AI** button → describe outcome | Adds / edits / connects workflow steps in-place |
| **Build with AI snapshot** | Sub-account dashboard → snapshot install → "Build with AI" flow | Generates entire workflow sets + agent stacks from one prompt |

**Rule:** If the work is "build an X in GHL" and GHL's AI can produce X — use GHL's AI. **Don't** write step-by-step manual click instructions. **Don't** hand-craft prompts and tell Renée to paste them. Give Renée the ONE plain-English description to type into GHL's AI; GHL builds the rest.

Verbatim from memory rule `feedback_use_ghl_build_with_ai.md`: *"GHL is the car. Use the car not the bike."*

### Step 2 — Is there a sibling artifact we can clone + adapt?

Even when Step 1 isn't a clean fit (e.g., the AI gets close but not exact), check for an EXISTING similar artifact before building net-new.

**⚠️ NOT-EVERY-SIBLING-SHOULD-BE-CLONED — the rejection branch:**

If the sibling was previously REJECTED by Renée ("I don't like this one" / "redo it" / "this isn't right" / similar), DO NOT default-clone. The sibling failed her test for a reason — cloning it brings the same problem forward.

Instead, ASK before building:

> *"I see we have <sibling name> doing similar work, but you didn't like that one. Are there parts of it you want to keep, or should we build fresh? Specifically — is the [trigger / copy tone / outcome / sequence / personality] something you want carried over, or rebuilt from scratch?"*

Then build from her answer:
- Parts she explicitly likes → carry forward (mini-clone of just those parts)
- Everything else → fresh per current direction

The rejection branch fires when ANY of these are true:
- She used language like "I don't like X" / "redo X" / "X isn't right" / "X feels off" about the sibling
- She specifically asked for a "different approach" or "fresh start" on this kind of work
- The sibling has been visibly parked / deprioritized / archived
- Her tone signaled the sibling was a miss (e.g., short replies, no enthusiasm, moved on quickly)

When unsure if a sibling was rejected — ASK. Cheap question, expensive mistake.

**Renée's example (the canonical case):**
> *"The document reminder bot could be made by copying the application reminder bot then just making changes to it."*

Both bots have:
- Same trigger pattern (timer + condition check)
- Same recipient pattern (lead with active deal)
- Same delivery pattern (SMS + email)
- Same closing pattern (mark task done)

What differs:
- The CONTEXT fields (what's being requested)
- The COPY tone (urgency wording)
- The OUTCOME condition (what marks it complete)

So: clone application-reminder workflow → save as document-reminder → swap 3-4 context-aware fields → ship.

**80% of work saved. Same proven pattern. Lower bug risk.**

### Step 3 — Only if both miss, build new via Build-with-AI prompt

If GHL's AI can't do it directly AND no sibling exists, build new — but STILL use Build-with-AI as the construction surface. Don't hand-build manually.

The deliverable is a **single plain-English description for Renée to type into GHL's AI**, not a 30-step manual checklist.

### Step 4 — VERIFICATION (Renée 2026-05-22 — non-skippable)

Every GHL AI build is followed by a verification step. The AI is fast but makes mistakes — verification catches them.

**Three touchpoints:**

1. **BEFORE the AI builds** — tell it the goal + WHY in plain English. Not just "build X" — "build X because [reason], customer journey is [journey], goal is [measurable outcome]."

2. **AFTER the AI builds** — ask it: *"Describe what you just built, step by step. What does each action do?"* Then: *"I was trying to achieve [goal]. Does what you built actually do that?"* The AI's self-description catches its own gaps.

3. **AFTER any manual edits** (by Console or Renée) — re-ask the AI: *"Describe what's currently in the workflow now. My goal is [original goal]. Does the current state still achieve that?"* Catches manual edits that broke upstream branches.

**Full pattern in:** `06-skills/gill/ghl-ai-verification-pattern.md`

Banned: accepting AI's "done!" without asking it to describe back. Same character as the test-inline-same-response rule for code work.

---

## How each instance follows this

### Claude Code (me)

When Renée says "build a GHL X" or "we need a new GHL Y" — BEFORE planning:

1. **Inventory check** — what GHL artifacts exist for similar use cases? Pull from `08-areas/ghl-artifact-inventory/` (to be built) or query GHL MCP for similar workflow names.
2. **Sibling identified?** → Recommend clone-and-adapt. Tell Renée: *"I see we already have X workflow doing 80% of this. Suggest cloning it, swapping the [N] context fields. Faster + safer than building new."*
3. **No sibling?** → Recommend Step 1 (GHL AI). Tell Renée: *"Open [sub] → AI Agent → Get Started → Build with AI. Tell it: '[single plain-English description]'. GHL builds it."*
4. **Both miss?** → I prepare a Build-with-AI prompt + Renée pastes once.

NEVER hand-write a 30-step manual click instruction without first checking Steps 1 + 2.

### Console (browser, GHL-native)

Standard prompt footer addition:

```
BEFORE any GHL build task:

1. Use GHL AI Agent → Get Started (NOT Ask AI). Describe the outcome in plain English.
2. If AI doesn't fit cleanly — check for SIBLING workflows/agents/forms already built.
   Look in the workflow list for similar names/triggers. Clone the sibling, swap context.
3. Only build truly new if both miss. Then use Workflow AI / Build-with-AI inside GHL,
   never manual clicks for net-new construction.

You are NEVER permitted to walk Renée through manual click sequences for builds
GHL's own AI can produce. That's bike-vs-car. Use the car.
```

### App (mobile)

Drop a CLAUDE-NOTE at intel.html when Renée describes a GHL build idea on her phone:

```
CLAUDE-NOTE (from App): Renée wants <X> in GHL. Before Code builds, check (1) GHL AI fit,
(2) sibling artifact to clone, (3) only then build new. Per ghl-build-workflow.md.
```

---

## The clone-and-adapt pattern — practical playbook

When sibling identified, follow this sequence:

### 1. Find the sibling
- Search GHL workflow list for similar trigger / action / outcome
- Search GHL AI Agent list for similar prompt structure
- Search GHL form list for similar field shape
- If multiple siblings exist, pick the one most recently maintained (fewest patches needed)

### 2. Clone it
- GHL Workflow: right-click workflow → Clone → rename to new descriptive name
- GHL AI Agent: duplicate via AI Agent menu → rename
- GHL Form: clone via Forms menu → rename
- GHL Snapshot: export sibling → re-import with rename

### 3. Identify the 3-5 things that need to change
- Workflow NAME (every build)
- Trigger condition (what fires THIS one)
- Specific COPY (subject lines, SMS body, email body, AI prompt context)
- The OUTCOME tag/action (what marks completion)
- Sometimes: a custom value reference (different field for different bot)

### 4. Make ONLY those changes
- Don't restructure
- Don't "improve" the sibling — keep what works
- Update names + copy + outcome tag
- Save + test

### 5. Document the clone relationship
- Add to the new artifact's notes: *"Cloned from <sibling name> on YYYY-MM-DD. Changes: [list]. Sibling lessons preserved."*
- Cross-reference in cross-instance task log

---

## Common sibling families to know about (starter inventory)

This is starter material for the broader `ghl-artifact-inventory` build. Populate as I (and Renée + Console) discover patterns.

| Pattern | Existing siblings (when inventory is built) | Things that typically differ |
|---|---|---|
| **Reminder bots** | Application reminder, Document reminder, Booking reminder, Renewal reminder | Trigger condition, copy tone, outcome tag |
| **Welcome sequences** | New lead welcome, Existing client welcome, Partner welcome, Referral welcome | Source tag check, first message, sequence length |
| **Qualifier flows** | Mortgage qualifier, Wholesale qualifier, Refi qualifier | Qualifying questions, score threshold, escalation path |
| **No-show rebooks** | Discovery no-show, Application no-show, Closing no-show | Urgency level, reschedule offer, second-touch timing |
| **Document collection** | Income docs, ID docs, Property docs, Insurance docs | Document type, reminder cadence, completion check |
| **Status updates** | Application status, Funding status, Closing status | Update trigger, recipient, frequency |
| **AI agents (voice)** | Inbound greeter, Outbound booker, Booking confirmer, Document reminder | Opening line, qualification questions, handoff trigger |

---

## Anti-patterns banned

- ❌ Walking Renée through manual GHL clicks for a build GHL's AI can produce
- ❌ Building from scratch when a sibling exists (without checking inventory first)
- ❌ **Cloning a sibling Renée previously rejected, without asking what parts she liked**
- ❌ Restructuring + "improving" the sibling — keep what works
- ❌ Forgetting to document the clone relationship in the new artifact's notes
- ❌ Console writing a 30-step instruction sequence for Renée instead of giving her the ONE Build-with-AI prompt
- ❌ Claiming "GHL doesn't have AI for this" without actually testing Build-with-AI on the request first

---

## Sources

- Renée chat 2026-05-19 (clone-and-adapt directive)
- Memory rule: `feedback_use_ghl_build_with_ai.md` (Renée 2026-05-17)
- Memory rule: `feedback_check_ghl_native_before_building.md` (Renée 2026-05-11)
- Memory rule: `feedback_easy_way_first.md` (Renée 2026-05-06)
- CLAUDE.md gate: **GHL-NATIVE-FIRST GATE**
- Existing process: `cross-instance-protocol.md` (Console footer is where this rule operationalizes)

## Related

- `brain-architecture-v1.md` — clone-and-adapt is a Layer 3 application (project notes capture which artifacts were cloned from which)
- `08-areas/ghl-artifact-inventory/` (to be built) — the live inventory of sibling families
- `04-agents/gill/` — Gill (GHL agent) owns this rule's day-to-day enforcement

---

*Cron audit will check: any new GHL artifact created without documenting a sibling-or-AI-build reasoning trail = flagged as orphan.*
