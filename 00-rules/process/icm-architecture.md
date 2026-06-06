# ICM Architecture — Folder Structure as Enforcement

**Adopted:** 2026-06-03
**Authority:** This is the canonical agent + workflow architecture for Xpert Web Solutions.
**Based on:** Interpretable Context Methodology (ICM) by Jake Van Clief + David McDermott — published arxiv 2603.16021, MIT-licensed reference impl at github.com/RinDig/Interpreted-Context-Methdology.
**Why we adopted it:** the 50+ memory rules + 11 CLAUDE.md gates + 80 skills are all PROACTIVE-LOADED. They live in hope that Claude remembers to look at the right moment. They get skipped. ICM makes the rules STAGE-GATED — physically loaded at the moment the stage executes, with required Input files and required Output artifacts. Skipping a step becomes structurally impossible because the next stage's Inputs reference the prior stage's Output file. No file = no progress.

---

## The 5 Layers

| Layer | File | Question it answers | Size |
|---|---|---|---|
| 0 | `CLAUDE.md` (root of workspace) | "Where am I?" — workspace identity, what's here, where to find things | ~800 tokens |
| 1 | `CONTEXT.md` (root) | "Where do I go?" — routing: which stage handles this task, what shared resources exist | ~300 tokens |
| 2 | `stages/NN-name/CONTEXT.md` | "What do I do?" — stage contract: Inputs / Process / Outputs | ~200-500 tokens |
| 3 | `references/`, `_config/`, `shared/`, `skills/` | "What rules apply?" — voice, conventions, domain knowledge, established protocols | varies |
| 4 | `stages/NN-name/output/` | "What am I working with?" — artifacts produced by stages | varies |

Layer 3 is configured once and stable across runs. Layer 4 is produced and consumed during execution — it changes every run.

---

## Canonical workspace tree

```
<workspace>/
├── CLAUDE.md                          # Layer 0 — workspace identity
├── CONTEXT.md                         # Layer 1 — task router
├── stages/
│   ├── 01-<name>/
│   │   ├── CONTEXT.md                 # Layer 2 — Inputs/Process/Outputs
│   │   ├── references/                # Layer 3 — rules for this stage
│   │   └── output/                    # Layer 4 — artifacts produced here
│   ├── 02-<name>/...
│   └── NN-<name>/...
└── _config/                           # Layer 3 — voice, wins, losses, brand
    ├── wins.md
    ├── losses.md
    └── voice.md
```

---

## Stage CONTEXT.md contract — MANDATORY format

Every stage CONTEXT.md MUST have three sections in this order:

```markdown
# Stage NN: <Name>

## Inputs
- Layer 4 (working): ../<prior-stage>/output/<file>.md
- Layer 3 (reference): references/<file>.md
- Layer 3 (reference): ../../../_config/<file>.md
- Layer 3 (shared): ../../../../shared/<file>.md

## Process
1. <numbered step>
2. <numbered step>
3. <numbered step>

## Outputs
- output/<artifact-name>.md → consumed by stage NN+1
```

**Why this format is enforcement, not documentation:**
- Inputs table = the gate. You CANNOT execute the stage without loading these files. The table is your pre-flight checklist.
- Process = the playbook. No skipping steps.
- Outputs = the proof. If `output/<file>.md` doesn't exist, the stage is incomplete. The next stage has no input and physically can't run.

---

## Rules (non-negotiable)

1. **One stage, one job.** A stage that fetches data does not also filter it. If you find yourself doing two things, split into two stages.
2. **Numbered execution order.** `01-` runs before `02-`. Folder name = execution order. No exceptions.
3. **Plain text only.** Markdown for prompts/context. JSON/CSV for structured data. No binary formats, no database connections, no proprietary serialization. Plain text = universal interface = works in any LLM.
4. **Every output is an edit surface.** Humans can open `output/<file>.md` between stages, edit it, save it — the next stage picks up the edited version. Manual review gates are built in.
5. **Layered context loading.** Each stage loads ONLY what its Inputs table specifies. Prevents "lost in the middle" + keeps context windows tight.
6. **Layer 3 vs Layer 4 must be visually separated in Inputs table.** Mark each input as `(reference)` or `(working)` so the model knows which is the spec vs which is the data.

---

## Fractal application for Xpert (24 agents)

We have more layers than Jake's single-workspace examples. Our fractal:

- **Vault** = meta-workspace (Layer 0 = vault CLAUDE.md, Layer 1 = vault CONTEXT.md routing to agents)
- **Each agent** = mini-workspace (its own CLAUDE.md, CONTEXT.md, stages/, _config/)
- **Stages within agent** = the actual execution units

Routing has 2 hops:
1. Vault CONTEXT.md → which agent owns this task
2. Agent CONTEXT.md → which stage within that agent handles this state

---

## The 4 mandatory mechanisms (from Renée's 2026-06-03 requirements)

Every agent workspace MUST contain:

### 1. Workspace manifest (vault-wide)
**File:** `shared/workspace-manifest.md`
**Purpose:** declares what every agent workspace must contain. Hawk (Performance Auditor) audits daily — reports missing files in morning brief.

### 2. Wins + losses (per agent + vault-wide)
**Files:**
- `agents/<name>/_config/wins.md` — concrete examples of what worked (copy from these)
- `agents/<name>/_config/losses.md` — concrete anti-patterns (never repeat these)
- `shared/wins.md` — vault-wide cross-agent patterns
- `shared/losses.md` — vault-wide cross-agent anti-patterns

Wins/losses get loaded as Layer 3 references in every stage's Inputs table → they're literally in front of Claude before any action.

### 3. Resource ledger (vault-wide)
**File:** `shared/resource-ledger.md`
**Purpose:** append-only log of every resource received from any source. Indexed by **both source-person/account AND asset name/tags** so "that yellow boat picture from John Smith" and "yellow boat" both find the entry. Every agent that receives an external resource writes a row.

### 4. Verification gate before commit (Gill (GHL) pattern, generalizable)
**Pattern:** for any agent whose primary tool is an AI subsystem (Gill (GHL) → GHL AI, Eve (Email) → AI Email Generator, etc.), stages must include:
- "ASK FIRST" stage (consult the AI, get a proposal — don't tell it to build yet)
- "VERIFY DIRECTION" stage (ask 2-3 clarifying questions BEFORE telling AI to commit time)
- "REVIEW OUTPUT" stage (AI makes mistakes — always review what it produced)

---

## How this fixes the skip problem (the actual reason we adopted it)

**Before ICM:**
- Rule lives in CLAUDE.md (loaded once, scrolls past attention)
- Rule lives in memory (loaded if I think to look)
- Rule lives in a skill file (loaded if I invoke the skill)
- Net result: rule exists, doesn't fire at decision moment, gets skipped

**After ICM:**
- Rule lives in `stages/NN-name/references/rule.md`
- Stage CONTEXT.md `## Inputs` table lists it
- Cannot execute stage without loading Inputs
- Rule fires at the exact decision moment, every time

**Worked example — Gill (GHL):**

| Today | After ICM |
|---|---|
| "Use GHL AI first" is a memory rule | "Use GHL AI first" is the literal name of stage 01 — `01-consult-ghl-ai/` |
| Claude can skip it | Stage 02 Input table requires `../01-consult-ghl-ai/output/proposal.md`. No file → stage 02 errors out. |
| "Ask GHL AI to verify after" is a maybe | Stage 04 `04-review-ghl-ai-output/` is mandatory — its Output is the review verdict |

---

## Migration plan

| Phase | Scope | Status |
|---|---|---|
| 1 | Foundation files (this doc + vault CONTEXT.md + shared/ + CLAUDE.md gate) | 2026-06-03 — in progress |
| 2 | Pilot: Gill (GHL) full ICM workspace + 5 stages | 2026-06-03 — in progress |
| 3 | Renée signs off on Gill (GHL) structure | TBD |
| 4 | Migrate Morgan (Mortgage Assistant) — most complex agent | next session |
| 5 | Migrate remaining 22 agents @ 3-4 per session | following sessions |
| 6 | Hawk (Performance Auditor) automated manifest check job | after migration complete |

---

## Sources

- Paper: https://arxiv.org/abs/2603.16021
- HTML render: https://arxiv.org/html/2603.16021v2
- Reference impl: https://github.com/RinDig/Interpreted-Context-Methdology
- Author video: https://www.youtube.com/watch?v=MkN-ss2Nl10
- Skool community: https://www.skool.com/cliefnotes
