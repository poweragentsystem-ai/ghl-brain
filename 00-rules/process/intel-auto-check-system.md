---
name: intel-auto-check-system
description: "Autonomous operation foundation — Renée 2026-05-26. Polls /api/intel on a schedule, filters CLAUDE-NOTE entries, queues each for next Claude Code session via Console queue, logs to KV mirrors, sends Telegram heartbeat, marks drop processed. Architecture details + how to monitor + how to bump polling to 15-min."
metadata:
  type: process
  scope: autonomous-operation
  status: LIVE
  deployed: 2026-05-26
---

# Intel Drop Auto-Check System

## What it does

Every time the cron fires:
1. Fetches all intel drops from `https://xpert-command-center.vercel.app/api/intel`
2. Filters: drops where `note` starts with "CLAUDE-NOTE:" AND `processed` is `false`
3. For each new CLAUDE-NOTE drop, performs 6 actions:
   - Logs the drop to KV `intel:auto-log` list (capped at 500 entries)
   - Logs to KV `master-build-status:auto-log` (synced to local md by Claude Code)
   - Logs to KV `session-log:auto`
   - Queues a Console task in `queue:tasks:v2` (high priority) so the next Claude Code session picks it up
   - Sends Telegram heartbeat to Renée with the note preview
   - PATCHes `/api/intel` to mark the drop `processed: true` (idempotency — won't re-fire)
4. Returns a summary JSON

## Architecture

**Handler:** `handleIntelAuto` in `xpert-command-center/api/morning-brief.js`
**Endpoint:** `https://xpert-command-center.vercel.app/api/intel-auto` (rewrite to `?intel_auto=1`)
**Vercel cron:** `0 12 * * *` (daily at 12 UTC — Hobby plan max)
**External cron** (for 15-min polling): cron-job.org → GET the endpoint URL

## KV mirrors (Claude Code reads these to sync local md files)

| KV list | Purpose | Cap |
|---|---|---|
| `intel:auto-log` | Compact action log per drop | 500 entries |
| `master-build-status:auto-log` | Mirror of master-build-status entries | 1000 entries |
| `session-log:auto` | Mirror of session-log entries | 1000 entries |

To read in next Claude Code session:
```bash
curl -X POST '${KV_URL}/lrange/intel:auto-log/0/49' -H "Authorization: Bearer ${KV_TOKEN}"
```

## Console task queue

Each actioned drop creates a task `t_intelauto_<drop_id>` in `queue:tasks:v2` with:
- `from: 'intel-auto-cron'`
- `priority: 'high'`
- `task: "INTEL AUTO — process this CLAUDE-NOTE from intel drop <id>: <full_note>"`

Next Claude Code session reads the queue + executes each pending task.

## Bumping to true 15-minute polling

Vercel Hobby plan caps crons at DAILY frequency. To get 15-min polling:

1. Go to **cron-job.org** (free, 1-min resolution, no sign-up to test)
2. Sign up with `poweragentsystem@gmail.com`
3. Create a new cron job:
   - **Title:** "Intel Auto-Check"
   - **URL:** `https://xpert-command-center.vercel.app/api/intel-auto`
   - **HTTP Method:** GET
   - **Schedule:** every 15 minutes
   - **Timezone:** America/Toronto
   - **Notifications:** failures only
4. Save + enable
5. Verify it fires by checking the cron-job.org dashboard "Last execution" status

The Vercel daily cron remains as a safety net in case the external one fails silently.

## Monitoring

| Where to look | What you see |
|---|---|
| Telegram | Real-time heartbeat per processed CLAUDE-NOTE |
| https://xpert-command-center.vercel.app/api/intel-auto (manual trigger) | Returns JSON summary of current cycle |
| Command Center dashboard intel page | Drops show `processed: true` after action |
| KV `intel:auto-log` | Full audit trail |
| Console queue | Pending tasks per actioned drop |

## What to do when you want to action a CLAUDE-NOTE

Just create an intel drop with `note` starting with "CLAUDE-NOTE:":

```
POST https://xpert-command-center.vercel.app/api/intel
Body: { "note": "CLAUDE-NOTE: <your instruction>", "links": [...], "files": [...] }
```

Or via the mobile.html Intel Drop UI. Within the next polling cycle (daily on Vercel, 15-min on cron-job.org), the system picks it up.

## Testing

Manually trigger:
```bash
curl 'https://xpert-command-center.vercel.app/api/intel-auto'
```

Should return `{ ok: true, drops_scanned, claude_notes_total, new_actioned, actions[], errors[] }`.

If `new_actioned: 0` and there are unprocessed CLAUDE-NOTE drops, something's broken — check the `errors[]` array.

## Cross-references

- Source: Renée's request 2026-05-26 — autonomous operation foundation
- Handler code: `xpert-command-center/api/morning-brief.js` `handleIntelAuto`
- Cron config: `xpert-command-center/vercel.json` crons block
- Rewrite: `/api/intel-auto` → `/api/morning-brief?intel_auto=1`
- Intel storage: `https://github.com/poweragentsystem-ai/intel-store/blob/main/drops.json`
- Session-start protocol: `feedback_session_start_check_intel.md` — Claude Code reads intel at session start
