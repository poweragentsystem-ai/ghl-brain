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

## ⛔ READ FIRST — THE #1 RULE CONSOLE KEEPS FORGETTING: NEVER HARDCODE INFO IN A WORKFLOW

This snapshot is GENERIC. We sell it to OTHER mortgage professionals. The mortgage account is only the TEST environment. So BEFORE typing ANY value into a workflow, agent prompt, tag, template, email, SMS, opportunity stage, or field — STOP and ask: "Would this still be correct for a DIFFERENT mortgage pro who installs this snapshot?"

If the value names a specific person, brokerage, lender, rate, phone, email, license number, city, or a count of anything — it MUST be a `{{custom_values.X}}` placeholder, NOT the real value. Empty custom values render empty and degrade gracefully; hardcoded values break every other business that installs this.

**When you ask Workflow AI / GHL AI to build or update, TELL IT EVERY TIME:** "This is a generic snapshot sold to other businesses — use `{{custom_values.X}}` for anything business-specific, never hardcode real info." The AI will hardcode by default unless you say this.

**If Console (or anyone, including the GHL AI) suggests putting Renée's real info into a workflow — that is WRONG.** It is the #1 recurring mistake. The correct response is: "No — that's a custom value, not a hardcoded value." This rule is non-negotiable: CLAUDE.md critical rule #9 + `feedback_hardcode_prevention_rule` + `feedback_anyone_use_test`. Banned niche words in any deployable artifact: mortgage / lender / refi / HELOC / loan / [any niche] → use `{{custom_values.niche}}`.

## ⛔ THE #2 RULE CONSOLE KEEPS FORGETTING: NEVER MANUALLY REVIEW A WORKFLOW'S STEPS YOURSELF

Opening a workflow and reading/clicking through its steps one by one is BANNED as the first move — it is slow, error-prone, and exactly what the workflow's own AI exists to prevent. Confirmed failure 2026-07-05: Console opened a workflow and started manually reviewing it instead of asking the AI.

**The ONLY correct sequence when you need to know what a workflow does or change it:**
1. Open the workflow → click **Workflow AI / Build with AI**.
2. First message: *"Give me a DETAILED BREAKDOWN of this workflow — every trigger, step, condition, and what each one does."*
3. THEN ask it about the specific thing you're doing (the custom behavior, the change, the bug).
4. Only touch steps manually if the Workflow AI genuinely cannot do it — and say so explicitly ("Workflow AI couldn't X, doing it manually").

Self-check before ANY workflow action: "Did I ask the Workflow AI first?" If no → stop and ask it. Manual review without a captured Workflow-AI failure = protocol violation.

## ⛔ THE #3 RULE: BUILD WITH AI SILENTLY REWRITES MESSAGE COPY — FORBID IT EVERY TIME

Build with AI / Workflow AI "helpfully" rephrases and grammatically polishes existing message text (SMS, emails, agent prompts, templates) while making unrelated changes. Renée's messaging is deliberate — its tone, wording, and imperfections are chosen. Confirmed recurring problem (Renée, 2026-07-06).

**Every single instruction you give Build with AI / Workflow AI must end with this line, verbatim:**
"Do NOT rewrite, rephrase, shorten, or grammatically correct any existing message text, email copy, SMS copy, or agent prompt wording. Preserve all existing messaging EXACTLY as written, character for character. Only change what I explicitly asked you to change."

**And after every Build-with-AI edit:** ask it "list every message/text field you touched" — then spot-check that untouched messages are still verbatim. If it altered copy it wasn't asked to touch, tell it to restore the original wording exactly.

---


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

---

## STANDARD: inside a workflow, ask Workflow AI to UPDATE the customs — never piecemeal on its own (Renee 2026-06-05)

When custom values or custom fields need updating while a workflow is open, the STANDARD is to ASK the Workflow AI (the Build-with-AI button inside that workflow) to update ALL of the customs in one request. Do NOT have the GHL AI, Console, or Claude update customs one at a time on their own.

Why: Workflow AI sees the entire workflow at once, so it updates every custom correctly and together. Manual, one-by-one editing is slower, misses references, and is exactly what Renee does not want. If the AI starts trying to update things itself, stop it and route the whole update to Workflow AI instead.

How: open the workflow -> click Workflow AI -> say plainly what the customs should become, e.g. "Update all of the custom values/fields used in this workflow to [the new values/structure]." Let it apply them all. Then verify with the describe technique + MCP counts.

This is the companion to the DESCRIBE rule above: Workflow AI DESCRIBES the workflow so you understand it -> Workflow AI UPDATES the customs so the change is correct and complete. Two reflexes, same principle: the Workflow AI is the specialist inside a workflow; let it do the work.

---

## STANDARD: ask Workflow AI to LIST all tags + customs in a workflow for review (Renee 2026-06-05)

When reviewing a workflow, ask the Workflow AI (Build-with-AI inside it) to LIST every tag and every custom value/field used anywhere in that workflow. Review the single list it produces instead of opening each action/automation one at a time.

Why: opening every action by hand to see what tags/customs it touches is slow and easy to miss. Workflow AI reads the whole workflow and gives you the complete list at once.

How: open the workflow -> Workflow AI -> "List all tags and all custom values/fields used in this workflow." Use that list to review/audit.

## THE THREE WORKFLOW-AI REFLEXES (use the AI, never do it piecemeal)
Inside any workflow, the Workflow AI is the specialist. Three standard reflexes, all 2026-06-05:
1. DESCRIBE — ask it to describe the whole workflow in detail before you touch anything.
2. LIST — ask it to list all tags + customs in the workflow so you can review in one place.
3. UPDATE — ask it to update all the customs at once; never update them one-by-one on your own.
If the AI (or Console, or Claude) starts editing/inspecting things one at a time manually, stop and route the whole job to Workflow AI.

## ⛔ THE GHL-AI OPERATING PROTOCOL v2 (Renée 2026-07-05 — drilled so she never has to repeat it)

**Principle: GHL has trained AI built in. USE IT. If you see an AI tool, use it — common sense. The AI builds faster and better than manual clicking; you DIRECT it.**

### The surfaces and what each is for
- **Ask AI** — chat about the OVERALL sub-account; it can ACTION the AI agents. Your conversational entry point for account-wide questions and agent operations.
- **Workflow AI / Build with AI (inside a workflow)** — THE way to read and build workflows.
- **AI Studios** — builds landing pages, funnels, and APPS. Use it for those; do not hand-build.

### The two blind spots (and the exact compensation)
1. **Ask AI CANNOT see all custom values/fields.** When you need its opinion on anything touching customs: PASTE THE FULL LIST into the chat first. The canonical lists live in Google Drive (Renée maintains them — actively being cleaned):
   - Custom VALUES: https://docs.google.com/document/d/1pCtVFFTjdRaGhsmeyPCP9xaDQYoTvsWCy9hbq1DBEWM
   - Custom FIELDS: https://docs.google.com/document/d/1rCHL1beEqKqR1ubIstt0pvIhBnN_zolRr_Sc98rzm2U
2. **Ask AI CANNOT see inside workflows.** To know what a workflow does: OPEN the workflow → click Build with AI / Workflow AI → ask for a DETAILED BREAKDOWN of the whole workflow FIRST → then instruct changes. Provide the customs list here too if the work touches customs.

### ⛔ HARD BAN — DO NOT CREATE NEW CUSTOM VALUES OR FIELDS
Cleanup of broken/unneeded customs is IN PROGRESS. Console's habit of creating new ones made the mess bigger. Creating ANY new custom value/field requires explicit Renée approval, and the Drive list must be updated in the same breath. Reuse existing customs; if none fits, ASK.

### The relationship
GHL AI is the GHL expert (trained on the platform). Console/Claude is the XPERT-business expert (generic snapshots, {{custom_values}} placeholders, no niche hardcodes, never message real leads, our offer/compliance rules). These can disagree — PUSH BACK and negotiate: let GHL AI do GHL things its way, but overrule it when it conflicts with our business rules, and say why.
