# XPERT VAULT — TASK ROUTER (Layer 1)

**Purpose:** route incoming tasks to the right agent. This file is the orchestrator — it routes and frames, it does not do the work itself.

**Authority:** [ICM Architecture](00-rules/process/icm-architecture.md) — Layer 1 routing.

**How to use:** when a task arrives, find the matching section below, route to the named agent's workspace at `04-agents/<agent>/`. Then read that agent's own `CONTEXT.md` (Layer 1 inside the agent) to find which stage handles the current state.

---

## Routing by task type

### Projects / dispatch / "manage this for me" / multi-agent coordination
**Primary:** `04-agents/jordan-coo/` — full ICM workspace (CLAUDE.md → CONTEXT.md → 5 stages: intake → decompose → [GATE: Renée approves plan] → route → execute → report)
Jordan (COO) is the dispatcher. Any multi-step project, or any task that needs routing to the right agent, starts here. Jordan reads/writes the central brain at `/api/brain` (single task store — 261 tasks, consolidated 2026-06-04). Single operational tasks can be created directly in the brain; full PROJECTS run the 01→05 pipeline so Renée sees the plan before execution.

### Mortgage tasks (FSRA / lender / Scarlette / OLS / equitymax)
**Primary:** `04-agents/morgan-mortgage/`
**Backup audits:** `04-agents/connor-compliance/` (FSRA compliance pass before publish)
**Source of truth for current skill content (pre-ICM-migration):** `C:/Users/User/claude-skills/morgan-mortgage.md`

### GHL tasks (sub-accounts, snapshots, workflows, AI agents, custom values, forms, voice)
**Primary:** `04-agents/gill/` — full ICM workspace (CLAUDE.md → CONTEXT.md → 5 stages)
**Hard rule:** ALWAYS starts at `stages/01-consult-ghl-ai/`. No exceptions. Build manually only at stage 05 with documented justification.

### Marketing tasks (campaigns, ads, positioning, social)
**Primary:** `04-agents/mark/`
**Copy review:** `04-agents/lex/` (every public surface)
**Visual review:** `04-agents/allan/` (brand-touching visual)
**Compliance pass:** `04-agents/connor/` (regulated copy)

### Email / SMS sequences (cold outbound, lifecycle, nurture)
**Primary:** `04-agents/eve/`
**Copy review:** `04-agents/lex/`

### Voice AI / call flows / phone agents
**Primary:** `04-agents/vick/`
**Copy review:** `04-agents/lex/`
**Compliance:** `04-agents/connor/`

### Compliance / legal / regulated copy (FSRA / CASL / PIPEDA / CRTC)
**Primary:** `04-agents/connor/` (compliance)
**Contracts / IP / legal docs:** `04-agents/lindsay/`

### Research (regulations, lender rules, market data, competitor moves)
**Primary:** `04-agents/ryan/` — FIRST stop, never guess facts
**Use when:** any factual claim needs grounding. Cite source.

### Sales / closing / objection handling / pipeline
**Primary:** `04-agents/sam/`
**Setter / outbound qualification:** `04-agents/casey/`
**High-ticket scripts:** load `claude-skills/high-ticket-setter-outbound.md` + `high-ticket-closer.md`

### Offer design / pricing / value stacks
**Primary:** `04-agents/kai/`
**Board lens:** Hormozi + Kennedy + Michalowicz (load `claude-skills/billion-dollar-board.md`)

### Branding / visual identity / design systems
**Primary:** `04-agents/allan/`
**Skill stack:** load `claude-skills/redesign-existing-projects.md` + relevant Taste Skills

### Copy / landing pages / ad copy / AI scripts
**Primary:** `04-agents/lex/`
**Tone guide:** `shared/voice-and-tone.md` (vault-wide) + agent-specific `_config/voice.md`

### Decisions / pros-cons / strategy / "should we do X vs Y"
**Business strategy:** `04-agents/brian/`
**Operational decisions / orchestration:** `04-agents/jordan-coo/`
**Always load:** `claude-skills/billion-dollar-board.md` for board lens

### n8n / cross-platform automations
**Primary:** `04-agents/norm/`
**Hard rule:** only when GHL can't handle it natively. Check Gill (GHL) stage 01 first.

### Claude infrastructure / Claude API / agent architecture / deployments
**Primary:** `04-agents/devon/`

### Command Center / the dashboard / "build X in the Command Center" / voice or chat to Claude in the dashboard
**Primary:** `04-agents/devon/` (Systems — Claude Code owns the Command Center React app)
**What it is:** [00-rules/command-center-reference.md](00-rules/command-center-reference.md) — read FIRST if you don't know what "the Command Center" is.
**Hard rule:** the Command Center is a frontend React app on Vercel (`command-center-v86-stitch.jsx`, https://xpert-command-center.vercel.app), NOT inside GHL. Features "in the Command Center" = Claude Code tasks, NOT Console tasks. Console works inside GHL only.

### QA / testing / pre-launch
**Primary:** `04-agents/quinn/`
**Live audit:** `04-agents/hawk-auditor/` (post-ship)

### Web scraping / data extraction / list building
**Primary:** `04-agents/rex/`

### Accounting / invoicing / HST / financial
**Primary:** `04-agents/amy/`

### Data analysis / dashboards / KPI reporting
**Primary:** `04-agents/anna/`

### Ideation / new product ideas
**Primary:** `04-agents/ian/`

### Real-time lead intel / competitor monitoring
**Primary:** `04-agents/scout/`

### Deferred decisions / time-based reminders
**Primary:** `04-agents/riley-state/`

### Agent auditing / catching mistakes / scorecards
**Primary:** `04-agents/hawk-auditor/` — runs after every deliverable

### Forward-walking workflows / bots / forms during audit or build
**Primary:** `04-agents/actuator-agent/` (Axel)

---

## Shared resources (Layer 3, used by every agent)

- `shared/workspace-manifest.md` — what every agent workspace must contain
- `shared/resource-ledger.md` — every external asset, indexed by source + asset name
- `shared/wins.md` — cross-agent patterns that worked
- `shared/losses.md` — cross-agent anti-patterns to never repeat
- `XpertVault/CLAUDE.md` — vault identity (Layer 0)
- `XpertVault/00-rules/command-center-reference.md` — what the Command Center (Renée's dashboard) is + its endpoints; read before any task mentioning it
- `XpertVault/operating-system/claude-office-handbook.md` — deep context on the office
- `claude-skills/billion-dollar-board.md` — 10-lens decision pressure-test

---

## Routing rules

1. **One task = one primary agent.** Multiple agents can be involved (backup / audit / review), but ONE owns the deliverable.
2. **If you can't find the right agent:** route to Jordan (COO) for triage. Jordan decides ownership.
3. **If the task spans multiple domains:** name the primary agent and list collaborators. Jordan (COO) coordinates.
4. **Update this router when adding new agents** — keep it current.

---

## Status: post-ICM-adoption (2026-06-03)

| Agent | ICM workspace built | Notes |
|---|---|---|
| Gill (GHL) | ✅ 2026-06-03 pilot | Full 5-stage workspace |
| Morgan (Mortgage Assistant) | ⏳ next | Most complex — biggest revenue |
| All other 22 agents | ⏳ pending | 3-4 per session migration cadence |

Until each agent has its ICM workspace built, fall back to `claude-skills/<agent>.md` as the temporary source of truth.
