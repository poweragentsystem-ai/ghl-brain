# GHL Brain — Xpert Web Solutions

Shared knowledge base for every Claude working on GHL projects (Claude Code, browser Console Claude, Mobile Claude). Auto-synced from the local XpertVault by Claude Code.

## How to use this in a Console session

Just tell Console one line:

> Read `https://raw.githubusercontent.com/poweragentsystem-ai/ghl-brain/main/projects/equitymax-snapshot/README.md` then read every file it references and execute the task.

(Swap in `abc-company-snapshot` or `email-humanization` for other projects.)

Console fetches the current version every time — no copy-paste, no upload, no stale data.

## Projects

- **[EquityMax Snapshot](projects/equitymax-snapshot/README.md)** — Audit + port 92 EquityMax workflows into AI Studio
- **[ABC Company Snapshot](projects/abc-company-snapshot/README.md)** — Finish generic snapshot, build voice bots, export
- **[Email Humanization](projects/email-humanization/README.md)** — Humanize templates, wire recruitment form

## Cross-project reference

- **[Master Build Status](sprint/master-build-status.md)** — overall sprint state, activity log
- **[GHL Master List](sprint/ghl-master-list.md)** — live custom fields, custom values, tags + AI-voice/chat tag convention

## Auto-sync rule

Whenever Claude Code pulls fresh GHL API data or refines a prompt, this repo is updated automatically. Renée doesn't have to ask.
