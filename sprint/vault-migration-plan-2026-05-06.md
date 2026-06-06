# Vault Reorganization — Migration Plan

**Decided:** 2026-05-06
**Decided by:** Renée Ross + Jordan
**Status:** LOCKED — execute next session
**Risk:** Medium (470+ files moving, some referenced from code/CLAUDE.md)

---

## Why this is happening

Current state: 3 separate roots (`~/.claude/`, `~/claude-skills/`, `~/Documents/XpertVault/`), 2 CLAUDE.md files, 2 memory folders with 187 files each (sync-duplicated), no unified "about Renée" file, no consolidated tools/systems guide, no self-correction system, no proactive watchlist.

Renée's framing (2026-05-06): *"i was told [organization is] one of the most important things... maybe a proactive folder, media folder, intel folder, rules folder, legal/compliance folder."*

Research-backed structure synthesizes:
1. **MindStudio Agentic OS pattern** — rules / context / skills (with inline learnings) / outputs
2. **PARA method (Tiago Forte)** — Projects / Areas / Resources / Archives
3. **Renée's specific list** — about Renée, about Jordan, tools+systems, agents, skills, learning, self-correction, proactive, media, intel, rules, legal/compliance

---

## Final folder structure (LOCKED)

```
XpertVault/
├── 00-rules/                 ← operating rules + 13 gates as individual files
│   ├── CLAUDE.md             ← thin master entry
│   ├── gates/                ← one file per gate
│   ├── operating-principles.md
│   ├── communication-rules.md
│   └── workflow-rules.md
│
├── 01-renee/                 ← about Renée: profile, goals, work style, decisions history
├── 02-jordan/                ← about me: identity, tone, cadence, how-i-tackle, what-i-own
├── 03-business/              ← AI Consulting / EquityMax / SaaS state + brand voice + financials
├── 04-agents/                ← roster + one .md per agent + activity log
├── 05-tools-systems/         ← MCP / GHL AI / browser / Vercel / KV — how to use + lessons
│
├── 06-skills/                ← each skill is a FOLDER (skill.md + examples.md + learnings.md)
│
├── 07-projects/              ← active short-term work
├── 08-areas/                 ← ongoing responsibilities (lender mgmt, content, recruitment)
├── 09-resources/             ← reference docs (FSRA rules, lender DB, design system)
│
├── 10-self-correction/       ← mistake patterns + strike counter + recovery + drift log
├── 11-learning/              ← what's coming IN (research queue, recent-learnings, courses)
├── 12-daily/                 ← session logs + recent-activities (kills short-term-memory feel)
├── 13-intel/                 ← external finds (IG/YouTube/screenshots/articles/competitors)
├── 14-outputs/               ← finished artifacts (drafts/approved/published)
├── 15-proactive/             ← active scanning loop (watchlist + findings + persistent reminders)
├── 16-media/                 ← raw media library (images/videos/audio/design files)
├── 17-legal-compliance/      ← FSRA / CASL / PIPEDA / contracts / policies
│
└── 99-archive/               ← old / inactive
```

---

## Migration steps (per ⛔ MIGRATION DISCIPLINE GATE)

### 1. SNAPSHOT (before anything moves)
- Inventory every file in current locations: `~/.claude/`, `~/claude-skills/`, `~/Documents/XpertVault/`
- Write inventory to `migration-manifest-2026-05-XX.md`
- Backup full current state to `99-archive/pre-migration-2026-05-XX/`
- Confirm rollback path exists

### 2. DEDUPE the two memory folders
- Diff `~/.claude/projects/.../memory/` against `~/Documents/XpertVault/claude-memory/`
- Identify canonical version per file (likely `.claude/...memory/` is canonical, vault is sync mirror)
- Keep canonical, remove duplicate after backup verified

### 3. MIGRATE in this order (smallest+lowest-risk first)
1. **00-rules** — split CLAUDE.md gates into individual files, build entry index
2. **01-renee** — extract Renée context from scattered places, write profile
3. **02-jordan** — write identity/tone/cadence/responsibilities (currently mostly empty)
4. **04-agents** — migrate `XpertVault/agents/` + each agent skill from `~/claude-skills/`
5. **05-tools-systems** — extract tool guides from scattered memory rules + build new files
6. **06-skills** — convert each `~/claude-skills/<x>.md` into folder `06-skills/<x>/skill.md` + add empty `examples.md` + `learnings.md`
7. **17-legal-compliance** — pull FSRA/CASL content from skill files + memory + connor.md
8. **10-self-correction** — build from existing pieces (gates promotion log + Hawk + drift)
9. **15-proactive** — create watch-list + persistent-reminders structure
10. **16-media** — absorb current `design-library/`, organize the rest
11. **13-intel** — restructure existing `intel/` per new schema
12. **11-learning** — consolidate from `jordan/learning.md` + courses-research
13. **03-business** — extract from CLAUDE.md context + memory
14. **07-projects, 08-areas, 09-resources** — categorize from current `XpertVault/projects/`
15. **12-daily** — rename, add recent-activities.md
16. **14-outputs** — new folder

### 4. UPDATE REFERENCES (critical — code reads paths)
- `~/.claude/CLAUDE.md` — rewrite path references
- `XpertVault/CLAUDE.md` — rewrite or merge into `00-rules/CLAUDE.md`
- `api/morning-brief.js` — rewrite any vault path references (Vault inspect endpoint, console_brief, brain_sync)
- Skill files that cross-reference each other
- `MEMORY.md` index file pointers

### 5. VERIFY (per ⛔ VERIFY-LIVE GATE)
- After EACH folder migration: read 5 random files from new location, confirm content intact
- After ALL migrations: run morning-brief endpoint to confirm it still loads vault context
- Run brain_sync test to confirm KV mirror still works
- Open Command Center to confirm UI hasn't broken
- ✅ VERIFIED line on each step

### 6. ROLLBACK PATH
- Full snapshot in `99-archive/pre-migration-2026-05-XX/` retained 30 days
- If any test fails, restore from snapshot, diagnose what broke, retry
- Never delete original until 30-day verification window passes

---

## What gets created vs migrated

| Folder | Action |
|---|---|
| 00-rules | NEW (split from existing CLAUDE.md) |
| 01-renee | NEW (extract from scattered) |
| 02-jordan | NEW (mostly empty currently) |
| 03-business | NEW (extract from CLAUDE.md + memory) |
| 04-agents | MIGRATE existing `agents/` + per-agent skills |
| 05-tools-systems | NEW (extract from scattered memory rules) |
| 06-skills | MIGRATE `~/claude-skills/` → restructure as folders |
| 07-projects | MIGRATE existing |
| 08-areas | NEW |
| 09-resources | NEW (consolidate refs) |
| 10-self-correction | NEW |
| 11-learning | MIGRATE jordan/learning.md + new |
| 12-daily | MIGRATE existing daily/ |
| 13-intel | RESTRUCTURE existing intel/ |
| 14-outputs | NEW |
| 15-proactive | NEW |
| 16-media | MIGRATE design-library/ + new structure |
| 17-legal-compliance | NEW (extract FSRA/CASL/PIPEDA from scattered) |
| 99-archive | MIGRATE existing archive/ + new pre-migration backup |

---

## Estimated scope

- ~470 files moving / restructuring
- ~3-4 hours of careful work
- Risk: medium — must update path references in code AND docs

## Cannot run until

- Next session (NOT this session — credits tight + tired = error-prone)
- Confirmation that no critical builds in progress when migration starts

## On execution day

1. Renée signals "go"
2. Jordan runs migration step-by-step with ✅ VERIFIED at each
3. Final diff report sent to Renée showing every file's old path → new path
4. Renée approves final state OR rolls back via the snapshot

---

## Open questions (none currently — all resolved this session)

Renée approved structure (2026-05-06). No more architectural decisions required.

---

## Sources backing the structure

- MindStudio "Agentic Operating System File Structure" (2026)
- Tiago Forte's PARA Method (Building a Second Brain)
- MindStudio "Build AI Second Brain with Claude Code and Obsidian"
- MachineLearningMastery "6 Best AI Agent Memory Frameworks 2026"

---

## ADDENDUM (Renée 2026-05-06): Session-Start Brief — every surface reads same context

**The problem:** Console, Telegram, Mobile, Claude Code all start blank. Renée has to re-explain context every time. Tired of "constant reteaching."

**The fix:** One unified `session_start_brief` endpoint. Every Claude surface auto-calls it on first user message. Same JSON shape, same source folders, same context across all surfaces.

### Brief contents
```
{
  "recent_activity": [...],          ← last 7 days summary (from 12-daily/recent-activities.md)
  "active_task": "...",              ← from ~/.claude/state/active-task.md
  "pending_after": [...],            ← queue behind active
  "recent_corrections": [...],       ← last 10 corrections (from 10-self-correction/) — DO NOT REPEAT
  "current_state": {                 ← from 03-business/
     "ai_consulting": {...},
     "equitymax": {...},
     "saas": {...}
  },
  "how_renee_likes_things": [...],   ← preferences from 01-renee/work-style-and-preferences.md
  "persistent_reminders": [...],     ← from 15-proactive/persistent-reminders.md (stay until done)
  "currently_working_on": "..."      ← last activity from 12-daily/session-log.md
}
```

### Surface implementation

| Surface | Read trigger | Where to wire |
|---|---|---|
| Claude Code | First user message of session | Memory rule + auto-call to `/api/morning-brief?session_start_brief=1` |
| Browser Console | Already does — just extend brief content | Existing `console_brief=1` endpoint, extend response shape |
| Telegram bot | First message after >1hr gap | Add brief-load to `api/telegram-webhook.js` handler |
| Mobile Claude | Session start | Memory rule (already inherited if memory syncs work) |

### Build steps (after folder migration)

1. Extend `/api/morning-brief?session_start_brief=1` endpoint to read from all the new folder locations
2. Update `console_brief=1` to return same shape (consolidate)
3. Add brief-load to Telegram webhook handler
4. Test: start fresh session in each surface, verify knows context without re-explanation
5. ✅ VERIFIED line on each surface confirming brief loads and contents are correct

### Why this matters structurally

The folder reorganization is necessary BUT not sufficient. Without the session-start brief reading from those folders, the same memory loss happens. The brief is the read-side; folders are the storage side. Both required.

This addendum saved 2026-05-06 after Renée called out the gap mid-planning.
