# What the Command Center Is — read this before any task that mentions it

**Plain answer for any Claude (Code, Console, App) that doesn't know what "the Command Center" is:**

The Command Center is **Renée's private dashboard** — her daily operating system. It is a React web app, **not** customer-facing, and **not** inside GHL.

- **Live URL:** https://xpert-command-center.vercel.app
- **Source file:** `command-center-v86-stitch.jsx` (built + deployed by Claude Code on Vercel)
- **Who owns it:** Claude Code (build/backend) — Devon (Systems) is the agent. Console works *inside GHL* and does **not** build the Command Center.
- **Who uses it:** Renée, on desktop and phone (mobile-first, dark theme).

## What's on it
- **Jordan (COO) orb** — chat with the AI; ask it to do things, see status.
- **Tasks board** — reads the central brain live at `/api/brain?op=board` (To Do / In Progress / Blocked / Done, with the agent on each card). This is the one shared task store across all instances.
- **24 agents**, Kanban, revenue charts, API vault, skills vault, social cards, AI course, intel feed, projects.

## Key endpoints (the dashboard's backend, all on the same Vercel app)
- `GET /api/brain?op=board` — the live task board (single source of truth, 261 tasks consolidated 2026-06-04).
- `GET /api/intel` — the intel feed (CLAUDE-NOTE drops Renée leaves for Claude).
- `GET /api/reminders` — Riley deferred-decision reminders.
- `GET /api/morning-brief` — the morning brief + sub-tools (brand-name check, vault status, etc.).
- `POST /api/projects` — multi-phase project tracking.

## If Renée asks for something to be built "in the Command Center"
That is a **frontend feature in the React app** → it is a **Claude Code task, not a Console task.** Examples: a voice/Whisper mic on the orb chat so she can talk instead of type, a new panel, a chart, a button. Console cannot build these — route to Claude Code (Devon, Systems).

## Cross-instance note
All three Claudes coordinate through the central brain (`/api/brain`) + the vault (mirrored to the `ghl-brain` GitHub repo for Console). The Command Center is where Renée *sees* that shared state. When in doubt about "what is X" — this file and `CONTEXT.md` (the Layer-1 router) are the place to look first.

## Protocol correction — 2026-07-03: all 3 surfaces can POST to intel
App/Chat Claude **CAN POST to the intel feed directly** via `POST https://xpert-command-center.vercel.app/api/intel` with body `{"note":"CLAUDE-NOTE: ..."}` — confirmed **HTTP 200**. The old "read-only" rule (that App/Chat could only read intel) is **outdated**. All 3 surfaces (Claude Code, Console, App/Chat) can drop CLAUDE-NOTE items programmatically. Use this for cross-instance handoffs instead of routing everything through one surface.
