---
tags:
  audience: [claude-code, claude-console, claude-app]
  domain_expert: jordan-coo
  function: [project-folder-structure, brain-architecture]
  capabilities: [filesystem]
  style: [structural]
  compliance: []
  tech: [filesystem]
related_to:
  projects: []
  memory_rules: []
  skills: []
  agents: []
  processes:
    - brain-architecture-v1.md
    - project-closeout-protocol.md
    - brain-graph-maintenance.md
---

# PROJECT FOLDER TEMPLATE — Copy this structure for every project

**Parent spec:** `brain-architecture-v1.md` (Layer 3)
**Applies to:** `07-projects/<slug>/` and `08-areas/<slug>/`

---

## The exact 6-file structure

```
📁 <project-slug>/
├── README.md
├── notes-completed.md
├── notes-didnt-work.md
├── notes-preferences.md
├── notes-alternatives.md
├── notes-concerns.md
└── examples/
    ├── README.md
    └── <artifact-files>
```

Create all 6 (README + 5 notes + examples/README.md) when the project is created. Don't wait until completion.

---

## README.md template

```markdown
---
tags:
  audience: [who this is for — e.g., renee, end-customer, console-operator, lead]
  domain_expert: [who owns this — e.g., renee, morgan, gill, claude-code]
  function: [what this does — e.g., lead-qualification, snapshot-prep, brand-build]
  capabilities: [tech/AI involved — e.g., ghl-ai, voice-ai, vercel-deploy]
  style: [tone/personality — e.g., professional-warm, brand-locked-equitymax]
  compliance: [regulations — e.g., FSRA, CASL, PIPEDA, none]
  tech: [platforms — e.g., ghl, vercel, n8n, react, claude-api]
why: "ONE-LINE WHY — the trigger / situation / reason this project exists. Required field, not optional. Per feedback_why_is_required_on_every_file (2026-05-22)."
related_to:
  projects: [other project slugs from 07-projects/ or 08-areas/]
  memory_rules: [filenames in ~/.claude/projects/.../memory/]
  skills: [paths to 06-skills/]
  agents: [paths to 04-agents/]
  conversations: [date refs or session-log line numbers]
  processes: [00-rules/process/*.md files referenced]
status: active | parked | done | archived
created: 2026-05-DD
last_touched: 2026-05-DD
owner: renee | claude-code | console | shay
---

# <Project Title>

## Why this exists

[1-2 sentence purpose. The strategic reason this project is worth doing. Cite board lens or framework if relevant.]

## Current status

[1 sentence: what's the latest. Link to the active phase in the Command Center project if there is one.]

## What's in this folder

- `notes-completed.md` — what shipped (read when planning similar future work)
- `notes-didnt-work.md` — failures + why (read BEFORE trying anything new — don't repeat)
- `notes-preferences.md` — Renée's preferences for this project type
- `notes-alternatives.md` — other paths considered + why we didn't take them
- `notes-concerns.md` — open risks + things to monitor
- `examples/` — preserved successful artifacts

## Related work

[Auto-derived from `related_to` block above. Manually update if obvious siblings are missing.]

## Command Center project ID

[If POSTed to /api/projects, the project ID lives here so the visual tracker links back.]
```

---

## notes-completed.md template

```markdown
# Completed — <Project Title>

## What shipped

| Date | What | Where | Status |
|---|---|---|---|
| 2026-05-DD | [Concrete thing] | [URL or file path] | ✅ |

## Key decisions made

- **Decision:** [what was chosen]
  **Why:** [reasoning, including which board lens or framework drove it]
  **Date:** YYYY-MM-DD

## Final architecture

[1 paragraph + diagram if helpful. The "if someone reads only this, they understand what's running" version.]

## Cross-instance handoff notes

[Anything Console or App needs to know to maintain this. URLs, IDs, login paths, where to look for state.]
```

---

## notes-didnt-work.md template

```markdown
# Didn't Work — <Project Title>

## Failures + reasons

### [Failed approach 1]

- **What we tried:** [description]
- **Why it failed:** [root cause, not symptom]
- **Signal it was failing:** [what told us]
- **What we did instead:** [the pivot]
- **Don't repeat unless:** [condition that would make it viable]
- **Date:** YYYY-MM-DD

### [Failed approach 2]
...

## Anti-patterns to avoid for this project type

- [Pattern that consistently fails here, even if attempted differently each time]
```

---

## notes-preferences.md template

```markdown
# Preferences — <Project Title>

## How Renée likes this

### [Aspect 1 — e.g., copy tone]

- **Preference:** [what she wants]
- **Why:** [her reasoning, often a past experience or value she holds]
- **Counter-example:** [the kind of output she'd reject + why]
- **Captured:** YYYY-MM-DD from [chat / Telegram / Console drop]

### [Aspect 2 — e.g., color palette]
...

## Defaults to use without asking

- [Concrete choice 1] — because [reason]
- [Concrete choice 2] — because [reason]

## Things to always check WITH her

- [Decision type that's strategic enough to escalate per DECIDE-AND-EXECUTE gate]
```

---

## notes-alternatives.md template

```markdown
# Alternatives — <Project Title>

## Options considered

### Option A — [name] ✅ PICKED

- **What:** [description]
- **Cost:** [$ or time]
- **Speed:** [time-to-ship]
- **Pros:** [list]
- **Cons:** [list]
- **Why picked:** [the reasoning that won]

### Option B — [name] ❌ NOT PICKED

- **What:** [description]
- **Cost:** [$ or time]
- **Speed:** [time-to-ship]
- **Pros:** [list]
- **Cons:** [list]
- **Why rejected:** [reasoning]
- **Revisit if:** [condition that would make it viable]

### Option C — [name] ❌ NOT PICKED
...

## Better / faster / cheaper sweep

| Dimension | Current pick | Better option | Faster option | Cheaper option |
|---|---|---|---|---|
| Tool | [current] | [if exists] | [if exists] | [if exists] |
| Approach | [current] | [if exists] | [if exists] | [if exists] |
| Vendor | [current] | [if exists] | [if exists] | [if exists] |

## Watch list — re-evaluate if these change

- [Condition 1 that would shift the pick]
- [Condition 2]
```

---

## notes-concerns.md template

```markdown
# Concerns — <Project Title>

## Open risks

### Risk 1 — [name]

- **What could go wrong:** [description]
- **Likelihood:** low | medium | high
- **Impact if it happens:** [scope + cost]
- **Mitigation in place:** [what we built to prevent it]
- **Monitor by:** [signal to watch for]
- **Trigger to act:** [the threshold]

### Risk 2 — [name]
...

## Compliance flags

- [FSRA / CASL / PIPEDA / CRTC / other — what to keep in line]

## Open questions

- [Unresolved question 1] — needs decision from [Renée / Connor / Morgan]
- [Unresolved question 2]

## Revisit triggers (push to Riley if conditional)

- "When [condition X], do [Y]" → pushed to Riley `YYYY-MM-DD`
```

---

## examples/README.md template

```markdown
# Examples — <Project Title>

Curated successful artifacts. Each one preserved because it represents work worth replicating.

| File | What it is | Why preserved | Date |
|---|---|---|---|
| `hero-final.png` | Approved hero copy + layout | Renée approved 2026-05-DD after 4 rounds | 2026-05-DD |
| `outbound-sequence-final.md` | Working email sequence | 31% open rate, 8% reply | 2026-05-DD |
| `voice-script-v3.md` | Voice agent prompt that won | Booking rate ↑ 2.3x vs v1 | 2026-05-DD |

## Read pattern

When starting a similar project, read this folder FIRST. Don't reinvent — adapt.
```

---

## Naming conventions

- Slug: kebab-case, descriptive, stable (don't rename — kills links). Example: `equitymax-snapshot-prep`
- Date format: `YYYY-MM-DD` everywhere
- File names: lowercase, hyphens, `.md` for notes, raw extensions for examples
- Project folder lives under `07-projects/` (short-term build) OR `08-areas/` (ongoing responsibility)

---

## When in doubt

Create the folder + 6 files at project start with placeholders. Fill them as work happens. The closeout protocol (`project-closeout-protocol.md`) verifies they're complete before marking the project done.
