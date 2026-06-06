---
tags:
  audience: [claude-code, claude-console, claude-app]
  domain_expert: jordan-coo
  function: [project-completion, brain-build, quality-gate]
  capabilities: [filesystem, audit]
  style: [structural, non-negotiable]
  compliance: []
  tech: [filesystem]
related_to:
  projects: []
  memory_rules:
    - feedback_save_immediately.md
    - feedback_session_summary.md
  skills:
    - 06-skills/session-summary/skill.md
    - 06-skills/client-delivery-checklist/skill.md
  agents:
    - 04-agents/hawk/
  processes:
    - brain-architecture-v1.md
    - project-folder-template.md
---

# PROJECT CLOSEOUT PROTOCOL — Fires at every "done" event

**Parent spec:** `brain-architecture-v1.md` (Layer 3 enforcement)
**Applies to:** Any project closing — Claude Code, Console, App, or runner.

---

## When this protocol fires

Trigger any of these → run the full closeout:

- Renée says "this is done / shipped / wrapped"
- A `/ship` workflow completes
- A Command Center project flips all phases to ✅
- A Console task is marked PATCH `status: done` AND it represents a project (not a single CRUD action)
- A workflow / agent / snapshot ships to production
- A client delivery completes

**Skip closeout for:**
- One-line answers
- Single CRUD actions (tagged contact, sent SMS — those go to cross-instance task log only)
- Internal tool tweaks that don't ship anything

---

## The 8-step closeout checklist

### Step 1 — Verify folder + 6 files exist

```
07-projects/<slug>/  OR  08-areas/<slug>/
├── README.md
├── notes-completed.md
├── notes-didnt-work.md
├── notes-preferences.md
├── notes-alternatives.md
├── notes-concerns.md
└── examples/README.md
```

If folder doesn't exist → CREATE from template before anything else.

### Step 2 — Fill `notes-completed.md`

- Add row to "What shipped" table (date, what, where, status)
- Document key decisions with WHY
- Write the "final architecture" paragraph
- Add cross-instance handoff notes

### Step 3 — Fill `notes-didnt-work.md`

For every failed approach during this project:
- What was tried
- Why it failed (root cause)
- What signal told us
- The pivot we made
- The "don't repeat unless" condition

**If nothing failed during the project, write that explicitly:** *"No failures recorded in this build. Smooth path."* — but verify with a session-log walk-back. Most projects have at least 1 failed approach worth capturing.

### Step 4 — Fill `notes-preferences.md`

Pull from this session + memory rules:
- What Renée chose this time + WHY
- Any preference she stated in chat or Telegram
- Defaults safe to use without asking next time
- Things to keep escalating per DECIDE-AND-EXECUTE gate

### Step 5 — Fill `notes-alternatives.md`

- Option A (PICKED) with reasoning
- Option B / C / D (NOT PICKED) with reasoning
- Better-faster-cheaper sweep table
- Watch list for re-evaluation conditions

**If only one option was considered, that's a flag.** Use the board lens — Munger (invert: what would guarantee failure?) — to backfill at least one alternative + why it was wrong.

### Step 6 — Fill `notes-concerns.md`

- Open risks (likelihood × impact)
- Compliance flags
- Open questions still unresolved
- Conditional triggers — push to Riley if any

### Step 7 — Populate `examples/`

- Add concrete successful artifacts
- Update `examples/README.md` with what's there + why each is preserved

### Step 8 — Update cross-instance task log

Append to `12-daily/cross-instance-task-log.md`:

```
| 2026-MM-DD HH:MM | <instance> | <project-slug> | CLOSED — see /07-projects/<slug>/notes-completed.md | ✅ | <project URL or path> |
```

Also: PATCH the Command Center project to status `completed` if one exists.

---

## Frontmatter validation (Step 1.5 — auto-run)

Before marking closeout complete, verify the README's frontmatter:

- ✅ All 7 tag dimensions present (audience / domain_expert / function / capabilities / style / compliance / tech). Skip any that don't apply by writing `[]` — but don't omit the key.
- ✅ All 4 relationship arrays present (projects / memory_rules / skills / agents) — at least one each if the project touched any of those domains
- ✅ `status: done` set
- ✅ `last_touched: YYYY-MM-DD` updated to today

If frontmatter is incomplete → closeout is incomplete. Fix before announcing done.

---

## Board lens during closeout

Before announcing done to Renée, pull at least 1 board lens to pressure-test the closeout itself:

- **Munger (invert):** What's missing that would guarantee this fails 6 months from now?
- **Kennedy (discipline):** Were the 5 notes filled with WHYs or just facts?
- **Brunson (value ladder):** Does this project's `related_to` array surface the right sibling projects for next-time retrieval?
- **Rams (less but better):** Are the notes terse + scannable, or padded with prose?

Pick whichever fits + cite in the closeout announcement.

---

## Announcement format to Renée

```
✅ <Project Name> closed.

📁 Notes captured at: /07-projects/<slug>/
🔗 Live at: <URL>
🎯 Stakes were: HIGH | MEDIUM | LOW — <reason>
🏛 Board lens applied at closeout: <lens + insight>

What shipped: <1 sentence>
Key decision + why: <1 sentence>
What didn't work: <1 sentence — pull the loudest failure>
Concern flagged: <1 sentence — if any>

Next-time defaults locked in notes-preferences.md.
```

This is the human-voice version per Telegram-human-voice memory rule. The structured notes live in the files.

---

## Cron audit interaction

The daily brain audit (`/api/morning-brief?brain_audit=1`) scans all project folders. Any project with `status: done` in README frontmatter but missing notes files → fails the audit + appears in morning brief.

This makes closeout structurally enforced — can't claim done without the notes.

---

## Anti-patterns banned at closeout

- ❌ Empty notes files (token-padding)
- ❌ Notes without WHYs (the WHY is the whole point — drops capture value to zero)
- ❌ Skipping `notes-alternatives.md` because "only one option was considered" — always write at least one alternative + why it was wrong
- ❌ Announcing done before the cross-instance log line is appended
- ❌ Marking `status: done` in README without filling all 5 notes
- ❌ Closing a project + immediately starting the next one without the announcement to Renée

---

## What other instances do

- **Console** — when its task represents a project close (snapshot exported, workflow set published, etc.), it appends to cross-instance task log and pings Claude Code via intel.html with closeout details. Claude Code (or next session) runs the full 8-step closeout protocol on the files.
- **Claude App** — same: drops a CLAUDE-NOTE at intel.html with closeout details. Claude Code completes the file-side closeout.

Closeout is **always** finished on the Claude Code side because file writes are its native action. Console + App provide the data, Code completes the structure.

---

*See `brain-architecture-v1.md` for the broader 4-layer system. See `project-folder-template.md` for the exact file templates.*
