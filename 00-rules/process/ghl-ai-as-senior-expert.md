---
name: ghl-ai-as-senior-expert
description: "BIBLE-LEVEL operational protocol — Renée 2026-05-30. Every GHL task across Claude Code, Console, App, and future runners MUST consult GHL's AI Agent (Sub → AI Agent → Get Started) FIRST. Includes the 6-step protocol + mandatory count cross-check + visible marker requirement."
metadata:
  type: process
  scope: cross-instance
  precedence: highest-for-GHL-tasks
  enforcement: visible-marker-mandatory
  status: ACTIVE
  effective: 2026-05-30
---

# GHL AI Is the Senior Expert — Operational Protocol

> Bible rule. Applies to every GHL task, every instance, every project. Renée 2026-05-30.

## ⚠️ CRITICAL — THREE DIFFERENT GHL AIs (Renée 2026-05-30)

| AI surface | Location | Account-aware? | Use for |
|---|---|---|---|
| ❌ **"Ask AI"** | top-right corner | NO — generic | Generic concepts only. NEVER for account-specific work. |
| ✅ **"Get Started" AI** | Sub → AI Agent → **Get Started** button | YES — knows the sub | DEFAULT for every account-specific task |
| ✅ **"Build with AI" inside workflow** | Open a workflow → **Build with AI** button | Workflow specialist | When Get Started says it can't build workflows |

**Fallback chain:**
1. Get Started → consult first
2. If Get Started can't build a workflow → open a new workflow + click Build with AI → describe outcome → let it build (the two AIs don't communicate with each other, so this is the workaround)
3. True manual click-by-click ONLY when both AIs can't

**Never use "Ask AI" top-right.** Wrong tool, no account context, restart from Get Started if opened by mistake.

---

## The relationship (Renée 2026-05-30 enhancement)

**GHL AI BUILDS. Console reviews / approves / verifies.** Not the other way around. Console-first when GHL AI could do it = bad work.

## The flow (mandatory order)

```
0. CONTEXT-PRESERVE → check for a RECENT chat about this task before opening a new one.
   If one exists → RESUME IT. Chat memory = context preserved.
1. OPEN  → Sub → AI Agent → Get Started button (or resume chat from Step 0)
2. ASK FOR PROPOSAL → "How would you approach <task>?"
   → GHL AI proposes a plan. Don't just delegate — get the plan FIRST.
3. REVIEW + APPROVE → read the proposal, push back / refine / OK it.
   → Console = REVIEWER, not commander.
4. BUILD → let GHL AI execute the approved plan.
5. VERIFY → "Describe step by step what you just built."
6. MCP CROSS-CHECK → only for counts / duplicates / existence (see scoping below).
7. CORRECT → if discrepancies, ask it to review against the goal + fix → re-verify.
8. WORKFLOW FALLBACK → If Get Started says it can't build the workflow:
   → Open a new workflow → click "Build with AI" button → describe outcome → let it build.
   → Still NOT manual — a different GHL AI surface.
9. TRUE MANUAL → Last resort only when both AIs can't, OR GHL says API-blocked.
```

## Bidirectional advice — even when YOU have an idea

Don't skip GHL AI just because you think you know the answer. Ask:

> *"I was thinking <my idea>. Does that make sense? Is there a better way you'd recommend?"*

GHL AI knows the account natively. It may surface approaches you hadn't considered. The proposal-review-approve pattern works both ways:
- GHL AI proposes → you review → approve → GHL AI builds
- You propose → GHL AI critiques + suggests better → you adjust → GHL AI builds

In both flows, **GHL AI is the builder.** You are the editorial layer.

## Workflow-specific override

When building a workflow:
- Always click the **Build with AI** button inside the workflow builder
- Describe the outcome in plain English
- Never manually drag/configure steps when Build with AI can construct the workflow from intent

## MCP cross-check — SCOPED (Renée 2026-05-30 clarification)

⚠️ Known issue: GHL's AI sometimes reads only partial account data (Renée caught it reading 14 custom fields when there were 28). So cross-check via MCP — **but only for these specific things, not everything:**

| When to MCP-verify | Tools |
|---|---|
| COUNT of inventory (tags / fields / values / workflows / forms / contacts) | tag_list / cf_list / cv_list / workflow_list / form_list / contact_search |
| "Does X already exist?" before creating a new one | cf_find_by_name / cv_find_by_name / tag_list (search) |
| Duplicate detection — list + de-dupe | cf_list / cv_list / tag_list |

**Everything else → trust GHL AI.** Don't burn cycles MCP-verifying every detail. Counts, duplicates, existence — that's where the partial-read bug surfaces. The rest of the time, GHL AI is reliable.

If MCP count differs from GHL AI's count → work from MCP, tell GHL AI: *"MCP shows N — you may not be seeing all. Work from N."*

## Mandatory visible marker

Every GHL-task response from any instance must open with:

```
🤖 GHL-AI-CONSULTED: <what I asked | their guidance | what I delegated | verification | MCP count cross-check>
```

Missing this line on a GHL task = incomplete. Hawk audits + fails.

## Per-instance rules

### Claude Code (me — desktop/CLI)
- Read this rule at session start (indexed in MEMORY.md)
- Run the 6-step protocol on every GHL task
- Show 🤖 GHL-AI-CONSULTED line on every GHL task response
- Cross-check counts via GHL MCP before acting on numbers

### Console (browser-based inside GHL)
Standard prompt footer additions (in cross-instance-protocol.md):
- On every task: open AI Agent → Get Started FIRST
- Ask GHL AI to do it, then ask it to describe back what it built
- Inside workflow builder: always Build with AI
- Cross-check contact/custom-field/custom-value counts independently
- Only fall back to manual when GHL AI explicitly says API-blocked

### App / Mobile (Renée's phone)
- When Renée describes a GHL task from phone, App drops CLAUDE-NOTE: "GHL TASK — consult GHL AI first per ghl-ai-as-senior-expert rule. Get senior-expert guidance before planning."

### Scheduled / autonomous (intel-auto-check + future crons)
- Any queued task touching GHL gets prefixed: "GHL TASK — apply ghl-ai-as-senior-expert protocol. Consult AI Agent → Get Started FIRST."
- Cron-fired Console tasks include this line in the task body

## Banned defaults — kill on sight

- ❌ Default to manual click-through when GHL's AI could do it
- ❌ Writing 30-step click instructions for any human/Console when AI Agent → Get Started exists
- ❌ Accepting GHL AI count of any inventory without MCP cross-check
- ❌ Trusting "done" without asking GHL AI to describe back
- ❌ Going straight to my own plan without bouncing it off GHL's AI
- ❌ Building workflows step-by-step manually when Build with AI exists

## Replace with

- ✅ "Open EquityMax sub → AI Agent → Get Started → Tell it: '<single plain-English description of outcome>'. Then ask: 'Describe what you just built.'"
- ✅ "I'll consult GHL's AI on this — here's the question I'm asking, here's what they recommended, here's what I asked them to build, here's the verification."
- ✅ "Cross-checked count via mcp__ghl-mcp__cf_list — actual N — using that, not what AI said."

## Worked failures this rule prevents

| Failure | Missing step | What rule catches |
|---|---|---|
| 270-line REST API code for sub-account creation | Step 1: never consulted AI Agent | GHL SaaS Mode does this natively |
| 30-step manual workflow click instructions | Step 1 + workflow override | Build with AI does it from one paragraph |
| Trusted GHL AI's "14 custom fields" count | Count verification | MCP confirms 28 — partial read |
| My ad-hoc plan when GHL AI knew better way | Step 2 ("does this make sense?") | Senior expert often surfaces better approach |
| Voice agent built in Eliza instead of Voice AI Studio | Step 1 | Native check would have caught it |

## Promotion path

This rule supersedes earlier GHL guidance for default behavior. If violated:
- 1st violation per instance: log + visible flag in next response
- 2nd violation: Hawk surfaces in morning brief
- 3rd violation: CLAUDE.md gate promotion (visible marker requirement enforced as session-start check)

## Cross-references

- Parent memory: `feedback_ghl_ai_is_senior_expert.md`
- Sibling rules: `feedback_use_ghl_build_with_ai`, `feedback_check_ghl_native_before_building`, `feedback_stay_current_on_ghl`
- Process docs: `ghl-build-workflow.md` (needs update to lead with consultation), `cross-instance-protocol.md` (Console footer update target)
- CLAUDE.md gate: GHL-NATIVE-FIRST (this rule deepens it)
- Verbatim source: Renée chat 2026-05-30

---

## UNDERSTAND-BEFORE-YOU-TOUCH: ask Workflow AI to DESCRIBE the workflow (Renée 2026-06-05)

Before editing, auditing, fixing, or reasoning about ANY existing workflow, do NOT guess what it does from its name or a quick glance. Open the workflow and ask **Workflow AI** (the Build-with-AI / Workflow AI button inside the workflow) to **describe the workflow in detail** — every trigger, every action, every condition, every branch, in plain English.

Why: the AI reads the actual live config, so its description is the source of truth. Guessing from the name is how steps get missed and good config gets broken.

How: open the workflow → click Workflow AI → ask: "Describe this workflow in detail — every trigger, action, condition and branch, and what a contact experiences going through it." Read that back before making any change. Same technique works on AI Agents ("explain this agent") and forms.

This pairs with DUPLICATE-FIRST (clone before editing) and the GHL-AI build→Console-review loop: understand (Workflow AI describes) → plan → build (GHL AI) → verify (describe again + MCP counts).
