# CONSOLE 1 — EQUITYMAX AUDIT (AI STUDIO FIRST, THEN WORKFLOWS)
### Paste this entire message into a fresh Browser Claude (Console) session.
### Console must be connected to GHL via MCP, already logged into the PowerAgent agency account.

---

You are working in the **EquityMax** sub-account (Location ID: `OBmMdqdnPLZvVyHloFly`). This is Renée's LIVE mortgage account — real leads, real clients. **DO NOT delete, activate, publish, or trigger anything until Renée confirms. Audit and report only.**

## CONTEXT — READ FIRST (in this order)
1. `XpertVault/sprint/master-build-status.md` — current sprint state
2. `XpertVault/sprint/ghl-master-list.md` — **the live list of all custom fields, custom values, and tags in ABC and EquityMax**. Before creating ANYTHING, check this first. Reuse what exists. Never duplicate.
3. `XpertVault/operating-system/claude-project-brief-ghl.md` — overall GHL build spec

**Rule:** If you add or modify a custom field / value / tag during this session, append it to the change log at the bottom of `ghl-master-list.md` with format: `- YYYY-MM-DD · Console-1 · ADDED <type>: <name> (<key>) — <reason>`

## THE END GOAL (do not forget this)

Everything should live in **AI Agents → Agent Studio** as AI-built agents, NOT in the old Automation → Workflows area. Old workflows are legacy — the target state is that every active automation is an AI Studio agent, built with Build with AI, human-sounding, custom-value-driven.

**Therefore, for every workflow in Automation → Workflows, the default action is: COPY IT INTO AI STUDIO AS AN AGENT** using Build with AI. Only pure tag-mover / stage-mover micro-automations with no messaging can stay in the old Workflows area as infrastructure.

## APPROACH (per Renée, 2026-04-20)

1. Start inside **AI Agents → Agent Studio → Generic Business Automation folder**. Audit the 10 agents there — are they set up properly, do emails sound human, is the voice bot connected?
2. Then go to **Automation → Workflows** (92 workflows). For each, decide: does this duplicate an AI Studio agent already in the Generic Business folder? Or is it unique and needs to be ported into AI Studio as a new agent?
3. Report back. Renée reviews. Then execute the ports.

## YOUR JOB — 3 PHASES

### PHASE 1 — AUDIT AI STUDIO "GENERIC BUSINESS AUTOMATION" FOLDER

Open GHL → **AI Agents → Agent Studio → Generic Business Automation** folder. 10 agents should be there (all Published):

```
1. Inbound Everything
2. Follow Up Automation
3. Renewal
4. Not Interested
5. Spam
6. Documents Reminder
7. Application Reminder
8. Appointment Confirmation & Reminder
9. New Lead Prequalify & Book
10. Google Review
```

Plus outside the folder:
```
11. EquityMax Mortgage Pre-Qualifier (created 2026-04-15)
```

**For each agent, do this in order:**

**Step A — High-level audit (Build with AI):**
Click the agent → open Build with AI panel → paste:
> "Explain in detail step by step this automation and what it does. And if it is missing information."

Record the answer.

**Step B — Deep inspection (manual, inside the agent):**
- **Email quality** — open every email node. Is the copy human-sounding (contractions, short, specific) or robotic (corporate, "Please be advised", "Hello [Name]")? Flag any template that reads like AI auto-generated fluff.
- **SMS quality** — same check. Short, specific, conversational? Or scripted?
- **Voice bot connection** — if the agent has a voice step, is an actual voice bot selected (not "None" or empty)? Is it the right bot for the role (inbound vs outbound vs reminder)?
- **Custom values used** — any hardcoded "Renée", "EquityMax", "GTA", "Power Agent"? Should be `{{custom_values.*}}` tokens only.
- **Tags applied** — does the agent tag leads correctly at the right stages?
- **Pipeline stage moves** — does the agent move the lead through stages at the right moments?

**Step C — Record result:**

For each agent, append a row to `XpertVault/sprint/equitymax-aistudio-audit.md`:

| Agent | Build with AI summary | Email quality | Voice bot connected | Hardcoded info | Tags/stages correct | Action |
|---|---|---|---|---|---|---|
| Inbound Everything | (AI summary) | HUMAN / NEEDS REWRITE | YES bot:X / MISSING | NONE / found: "Renée" | CORRECT / WRONG | KEEP / REBUILD / FIX EMAILS / ADD VOICE BOT |

**Action values:**
- **KEEP** — everything clean, no changes
- **FIX EMAILS** — rewrite templates using Build with AI
- **ADD VOICE BOT** — voice step exists but no bot assigned
- **SWAP HARDCODED** — replace names/brands with custom values
- **REBUILD** — so broken it needs to be rebuilt in Build with AI from scratch

### PHASE 2 — AUDIT AUTOMATIONS OUTSIDE AI STUDIO (Automation → Workflows)

Open **Automation → Workflows**. 92 workflows exist. For each:

**Step A — Same Build with AI explain** — paste the same prompt, get the summary.

**Step B — Decide fit:**
- Does this workflow already exist as an AI Studio agent in the Generic Business folder? → DUPLICATE — flag for retirement once the AI Studio version is confirmed working
- Does this workflow do something the AI Studio agents DON'T do? → CANDIDATE to port into AI Studio (rebuild as an agent using Build with AI)
- Is this workflow mortgage-specific (not generic business)? → BELONGS in a separate Mortgage folder in AI Studio, not Generic Business
- Is this a pure tag/stage-mover with no messaging? → Can stay in Workflows (low-level infrastructure)

**Step C — Record result:**

Append to `XpertVault/sprint/equitymax-workflows-audit.md`:

| ID | Name | Status | Build with AI summary | Fit | Action |
|---|---|---|---|---|---|
| 9fec74c4 | 01 - New Lead Entry — 24/7 Welcome | draft | (summary) | DUPLICATES "New Lead Prequalify & Book" agent | RETIRE after AI version verified |

**Default action = PORT TO AI STUDIO** (rebuild as an agent using Build with AI in Agent Studio). Only pure tag/stage infrastructure with no messaging stays in old Workflows. Action values:

- **PORT TO AI STUDIO** (default) — rebuild as an AI Studio agent with Build with AI, using human-sounding copy and correct custom values. The old workflow is retired once the AI Studio version is live and verified.
- **RETIRE** — already duplicated by an AI Studio agent that works; delete old workflow once Renée confirms.
- **KEEP IN WORKFLOWS** — low-level tag/stage/pipeline-mover with no messaging (edge case only).
- **NEEDS REVIEW** — unclear, flag for Renée.

### PHASE 3 — SUMMARY REPORT

At the end, produce one summary section in your final reply:

```
AI STUDIO GENERIC BUSINESS FOLDER — 10 AGENTS
- Clean (KEEP): X
- Need email rewrites: Y
- Missing voice bot connection: Z
- Hardcoded info to swap: N
- Broken/rebuild: M

OUTSIDE WORKFLOWS — 92 TOTAL (goal: port to AI Studio)
- Already duplicated by AI Studio agent (RETIRE): X
- Port to AI Studio as new agent: Y
- Pure infrastructure (tag/stage-mover only, keep): Z
- Needs Renée review: N

TOP 5 PRIORITY PORTS (which old workflows become AI Studio agents first, ranked)
1. ...
2. ...
```

### PHASE 4 — PORT PLAN

For the top-priority ports, draft the Build with AI prompt you would paste to rebuild each one as an AI Studio agent. Save the drafts to `XpertVault/sprint/equitymax-port-prompts.md` — one per old workflow. Renée reviews the prompts before you paste them into Build with AI.

## IMPORTANT RULES

- **NO deletions until Renée approves** the audit table
- **NO publishing or activating** anything
- **No edits to EquityMax live workflows** until audit is complete and Renée has reviewed
- Build with AI is the primary tool — use it on EVERY item
- Log every meaningful finding to `XpertVault/sprint/master-build-status.md` as you go (don't wait until the end)

## WHEN DONE

Append to `XpertVault/sprint/master-build-status.md`:
```
- [YYYY-MM-DD HH:MM | Console-1] EqM audit complete. AI Studio: X clean, Y need fixes. Workflows: Z to retire, W to port. Table saved to equitymax-aistudio-audit.md + equitymax-workflows-audit.md.
```

And one CHECKPOINT line to `XpertVault/daily/session-log.md`.

Report back to Renée with the summary report and priority fixes list.
