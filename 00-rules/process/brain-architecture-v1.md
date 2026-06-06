---
tags:
  audience: [claude-code, claude-console, claude-app, future-runners]
  domain_expert: jordan-coo
  function: [memory-architecture, cross-instance-coordination, brain-build]
  capabilities: [file-system, tagging-graph, cron-audit, multi-instance]
  style: [structural, non-negotiable]
  compliance: []
  tech: [filesystem, vercel-cron, telegram, command-center-api]
related_to:
  projects: [p_mp2w5fbv_4fr0]
  memory_rules:
    - feedback_bidirectional_relationship_graph.md
    - feedback_visual_project_tracking_mandatory.md
    - feedback_session_start_check_intel.md
    - feedback_save_immediately.md
  skills:
    - 06-skills/proactive/skill.md
    - 06-skills/error-log/skill.md
    - 06-skills/session-summary/skill.md
  agents:
    - 04-agents/jordan/skill.md
    - 04-agents/riley-state/
    - 04-agents/hawk/
---

# BRAIN ARCHITECTURE v1 — Cross-Instance Memory Foundation

**Established:** 2026-05-19 by Renée directive
**Status:** Foundation spec — Phase 1 active
**Scope:** Claude Code · Claude Console · Claude App/Mobile · future autonomous runners

---

## The directive that produced this

Renée 2026-05-19: *"everything we do is strategic. you never just do anything. you understand why we are doing something, ask questions, research and use billionaire counsel, check for skills and check if we have done a similar successful project. when organizing the files also place examples of successful work, and folder for how it relates to other tasks and projects and conversations we have had, and skills, and knowledge. ... when complete a project make notes. if we found something doesnt work make note of that and why. if there is a particular way i like something make notes of that and why. if there is a better and faster and cheaper way to do something make note of the top options. if there is a potential concern make note of this. ... also make notes of last tasks from console, claude, app. ... cron set to regularly update this. it needs to go around to all claudes and make sure they are saving things on the folder. ... it should be as if i am speaking to the same ai."*

The brain that produces "one AI experience" across three instances is the deliverable.

---

## The four layers

| Layer | What it is | Status | Spec doc |
|---|---|---|---|
| **1. Artifact tagging** | 7-dim frontmatter on every memory/skill/agent/process file + 4 relationship arrays | EXISTING | `brain-graph-maintenance.md` |
| **2. Visual project tracking** | Command Center `/api/projects` POST for any multi-phase work | EXISTING | `visual-project-tracking.md` |
| **3. Project notes discipline** | 5 notes files + `examples/` folder per project | **NEW (this spec)** | `project-folder-template.md` + `project-closeout-protocol.md` |
| **4. Cross-instance task log** | Single shared ledger every instance writes to | **NEW (this spec)** | `cross-instance-protocol.md` |

All four layers fire together. Skipping any one = brain has a hole. Cron audit catches the holes.

---

## Layer 3 — Project Notes Discipline (the new rule)

### Every project folder structure

Every project under `07-projects/<slug>/` or `08-areas/<slug>/` carries exactly this:

```
📁 <project-slug>/
├── README.md                  ← one-pager: why, status, related (7-dim tags + 4 rel arrays in frontmatter)
├── notes-completed.md         ← what shipped + final state + key decisions + date
├── notes-didnt-work.md        ← failures + WHY + what to never repeat
├── notes-preferences.md       ← how Renée likes it + WHY she wants it this way
├── notes-alternatives.md      ← faster/cheaper/better options considered + WHY we picked this one
├── notes-concerns.md          ← potential concerns + risks + things to monitor + open questions
└── examples/                  ← successful artifacts (screenshots, copy approved, code samples, links)
    ├── README.md              ← index of what's in examples/ and why each is preserved
    └── <artifact-files>
```

**The 5 notes files are mandatory.** Missing one = the project is incomplete in the brain. Cron audit flags it daily.

### What goes in each notes file

| File | Content | Pattern |
|---|---|---|
| `notes-completed.md` | What shipped (URLs, file paths, dates). Final architecture decision. Why that path won. | "Shipped X on DATE. Key decision: Y because Z." |
| `notes-didnt-work.md` | Approaches tried that failed + WHY they failed + what signal told us they failed. | "Tried X. Failed because Y. Signal: Z. Don't repeat unless Y changes." |
| `notes-preferences.md` | Renée's stated preferences for this kind of work. WHY she prefers it. | "Renée likes A over B because [her reasoning]. Defaults: …" |
| `notes-alternatives.md` | Other paths considered. Ranked: faster / cheaper / better. WHY we didn't take them. | "Option B = 50% cheaper, 30% slower, less brand control. Picked A because [reason]." |
| `notes-concerns.md` | Risks. Open questions. Things to monitor post-ship. Triggers to revisit. | "Concern: X may break if Y happens. Monitor by Z. Revisit if W." |

### What goes in `examples/`

- Screenshots of approved final state (UI)
- Approved final copy (hero, email, ad, voice script)
- Code samples that worked + that are reusable in similar projects
- Links to live URLs of the shipped work
- `README.md` indexing what's there + why each example is preserved

Anti-pattern: dumping every screenshot. `examples/` is curated successes only.

---

## Layer 4 — Cross-Instance Task Log (the new rule)

### The shared ledger

Single file: `XpertVault/12-daily/cross-instance-task-log.md`

Every instance (Claude Code, Console, App) appends one line per meaningful action:

```markdown
| Timestamp ET | Instance | Project | Action | Status | Link |
|---|---|---|---|---|---|
| 2026-05-19 11:32 | Claude Code | Brain Architecture v1 | Wrote master spec | ✅ done | /00-rules/process/brain-architecture-v1.md |
| 2026-05-19 11:45 | Console | EquityMax snapshot | Renamed 3 workflows | ✅ done | (console session id) |
| 2026-05-19 12:01 | Claude App | Brand decision | Confirmed ARA AI direction | 📝 logged | intel.html drop #847 |
```

### Why a single file beats multiple logs

`master-build-status.md` exists already but is more of a chronological diff. The new ledger is **purpose-built for the "what did the other instance just do" question** — one read, latest 20 lines, answer.

### Read pattern

- Every instance reads the latest 20-30 lines at session start
- Every instance appends after every meaningful action (same trigger as save-rhythm 20-min rule)
- The cron audit job summarizes daily activity from this file into the morning brief

---

## Cron audit job — daily compliance scan

### Where it runs

Folds into the existing `morning-brief.js` Vercel function (Hobby plan 12-function cap means we add a sub-action, not a new endpoint).

`GET /api/morning-brief?brain_audit=1`

### What it scans

1. **Project folders** — `07-projects/*/` and `08-areas/*/` — verify 6 files exist (README + 5 notes + examples/)
2. **Frontmatter** — every README has 7-dim tags + 4 rel arrays
3. **Cross-instance log** — `12-daily/cross-instance-task-log.md` exists + has entries from last 7 days
4. **Orphan tags** — files with no inbound references from any other file

### Output format

```
🧠 BRAIN AUDIT — 2026-05-19 12:00 UTC
═══════════════════════════════════════════
Projects scanned: 47
Complete (6/6 files): 12 (26%)
Incomplete: 35 (74%)
  - Missing notes-didnt-work.md: 28
  - Missing notes-preferences.md: 31
  - Missing notes-alternatives.md: 33
  - Missing notes-concerns.md: 29
  - Missing examples/: 18
Orphan tags: 14
Cross-instance log: ✅ active (last entry 23 min ago)

Top 3 projects needing backfill (highest value):
1. EquityMax snapshot prep
2. Command Center dashboard
3. Easy Deploy SaaS
```

### Telegram alert rules

- Compliance < 90% → daily ping with summary
- Compliance < 50% → urgent ping
- Cross-instance log silent > 24 hrs → urgent ping ("instances drifting apart")

---

## Backfill plan — how we catch up

Sweep priority (highest value first):

1. **Active projects in `07-projects/`** — backfill notes from session-log + memory rules. Done first.
2. **3 main business lines** — EquityMax, Command Center, Easy Deploy. Each gets full pilot template treatment.
3. **Recent shipped work (last 30 days)** — walk `12-daily/session-log.md` back, identify projects, reconstruct notes.
4. **Memory rules with `project_*` prefix** — each one names a project; extract what worked + concerns into project folders.
5. **`99-archive/pre-migration-2026-05-06/snapshot/`** — mine lessons from forgotten projects.

Backfill is multi-session. Tracked in `15-proactive/backfill-progress.md` with row per project + status.

---

## How this delivers "feel like one AI"

| Renée's pain | What this fixes |
|---|---|
| Talks to Console, Code has no clue | Cross-instance task log = ≤1 read to see what Console did |
| Talks to Code, App has no clue | Same log, App reads it at session start |
| Past project lessons forgotten | 5 notes files = permanent capture of what worked + why + concerns |
| Same mistake repeated | `notes-didnt-work.md` keeps every failure on the shelf |
| Renée preferences re-asked | `notes-preferences.md` keeps her style locked per project |
| "Better way" never explored | `notes-alternatives.md` proves we considered options |
| Renée caught a concern late | `notes-concerns.md` flags risks at project start |
| Amateur defaults shipped | Board consultation + skill load is BAKED into closeout protocol |

---

## Anti-patterns banned

- ❌ Closing a project without writing the 5 notes files ("I'll do it later" — no, you won't)
- ❌ Empty notes files (token-padding for compliance, not real capture)
- ❌ Notes that don't include WHY (the WHY is the whole point — facts without reasoning don't transfer to future projects)
- ❌ Skipping the cross-instance log entry because the action felt small
- ❌ Console/App writing custom notes structure that doesn't match the template

---

## Source rules + cross-references

- Parent memory: `feedback_bidirectional_relationship_graph.md`
- Parent memory: `feedback_visual_project_tracking_mandatory.md`
- Parent process: `brain-graph-maintenance.md` (Layer 1 spec)
- Parent process: `visual-project-tracking.md` (Layer 2 spec)
- Sibling: `project-folder-template.md` (the exact file template)
- Sibling: `project-closeout-protocol.md` (the closing checklist)
- Sibling: `cross-instance-protocol.md` (the 3-instance program)

---

## Enforcement

Hawk audits daily compliance %. Below 90% triggers Telegram ping + appears in morning brief. Below 50% urgent.

This rule is **non-skippable** — same enforcement class as the visual-project-tracking and brain-graph-maintenance rules above it.

---

*Renée's central node (`01-renee/profile.md`) remains the largest in the graph. Every project README links back to her node via `domain_expert: renee` when she's the owner.*
