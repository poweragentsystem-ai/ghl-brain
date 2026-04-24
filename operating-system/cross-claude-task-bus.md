# Cross-Claude Task Bus — Protocol

**Status:** LIVE as of 2026-04-24
**Endpoint:** `https://xpert-command-center.vercel.app/api/console-queue`
**Purpose:** Eliminate the Renée-as-middleman copy-paste loop between Claude Code and Console.

**Persistence:** Upstash Redis via Vercel Marketplace. If env vars `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` are NOT set, bus falls back to in-memory (lost on cold start). Enable at Vercel → xpert-command-center → Storage tab → Create Database → Upstash Redis.

---

## How it works

1. **Claude Code** pushes tasks to the queue via POST.
2. **Console** (browser Claude inside GHL) pulls pending tasks via GET at session start.
3. Console executes each task, then PATCHes back with status `done` or `failed` + result payload.
4. Renée's Command Center shows a live "🔔 N tasks waiting for Console" pill; she opens Console, says "sync queue," Console drains it autonomously.

---

## Endpoint reference

### `GET /api/console-queue`
Lists **pending** tasks by default.

Optional: `?status=all | done | failed | pending`.

Returns `{ count, pending, done, failed, tasks: [...] }`.

### `POST /api/console-queue`
Push a new task.

Body:
```json
{
  "from": "claude-code",
  "task": "Short human-readable instruction",
  "priority": "low | normal | high | urgent",
  "context": { "anyKey": "anyValue — optional metadata, IDs, previous results" }
}
```

Returns the created task with `id`.

### `PATCH /api/console-queue`
Update task status after execution.

Body:
```json
{
  "id": "t_xxxxx",
  "status": "done | failed | in_progress",
  "result": "free-text summary of what happened or error",
  "by": "console"
}
```

---

## Console session-start protocol — CLAIM-FIRST (concurrency-safe)

At the beginning of every Console session, paste this into Console's system prompt:

```
You are connected to the cross-Claude task bus. You may be one of several Console tabs
running in parallel. To avoid duplicate work:

AT SESSION START + BETWEEN TASKS:

1. Pick your worker ID: use "console-{random 4 chars}" so parallel tabs are distinct.

2. Claim the next task atomically:
   POST https://xpert-command-center.vercel.app/api/console-queue
   Body: {"claim": true, "claimedBy": "<your worker id>"}
   
   Response is either:
   - {"ok":true, "task": {...}, "lease_expires_at": "..."} → you own it for 15 minutes
   - {"ok":true, "task": null, "reason": "no pending tasks"} → queue is empty, stop

3. You now own the task. Read `task` + `context`. **BEFORE EXECUTING ANY BROWSER ACTION, DISPLAY THE PLAN IN PLAIN ENGLISH:**
   
   "Claimed task <id> priority <urgent|high|normal|low>: <one-line restatement>.
    My plan: [step 1], [step 2], [step 3]. Proceeding."
   
   Renée wants visibility into what you're about to do before you do it. If the plan is wrong she can interrupt. No silent execution — announce every task's plan first, then execute.

4. If work will take >10 min, send a heartbeat every 10 min:
   PATCH /api/console-queue
   Body: {"id": "<task id>", "status": "in_progress", "by": "<your worker id>"}
   (This extends your lease another 15 min)

5. On completion:
   PATCH /api/console-queue
   Body: {"id": "<task id>", "status": "done", "result": "<summary of what happened>", "by": "<your worker id>"}

6. On failure:
   PATCH /api/console-queue
   Body: {"id": "<task id>", "status": "failed", "result": "<error + what you tried>", "by": "<your worker id>"}

7. Loop back to step 2 until the claim endpoint returns task:null.

8. When drained, report to Renée: "✅ Executed N tasks from Claude Code. M failed."

CONCURRENCY GUARANTEES:
- Two Console tabs will NEVER get the same task — claim is atomic.
- If a Console tab crashes mid-work, its task auto-releases after 15 min of silence.
- If Renée has 3 Console windows open, they'll process tasks in parallel with no collisions.
- Priority order: urgent → high → normal → low, FIFO within each priority.

NEVER:
- PATCH a task you don't own (status "in_progress" with a different claimedBy will 409).
- Skip the claim step and just modify a task directly.
- Leave a task as "in_progress" forever — heartbeat every 10 min or it'll be reassigned.
```

## Claude Code push protocol

When Claude Code needs something Console-only (browser, GHL AI Agent Studio, workflow edits inside GHL UI):

```bash
curl -X POST https://xpert-command-center.vercel.app/api/console-queue \
  -H "Content-Type: application/json" \
  -d '{
    "from": "claude-code",
    "task": "Rename the 2 draft killswitches in ABC to Master Voice AI Shut Off / Turn On. IDs in context.",
    "priority": "high",
    "context": {
      "sub": "ABC",
      "location_id": "AKbAtRra4m908e2w2Kbo",
      "workflow_ids": ["c7584001-a2da-4675-af3f-9a42a0d3a9aa", "6b2a4c17-8893-4111-9db2-fe0cbbe2cccd"],
      "new_names": ["Master Voice AI Shut Off", "Master Voice AI Turn On"]
    }
  }'
```

---

## Priorities

| Priority | Meaning | Console behavior |
|---|---|---|
| `urgent` | Blocker for Renée right now | Stop whatever Console is doing, handle first |
| `high` | Time-sensitive, same-session | Handle before session ends |
| `normal` | Standard queued work | Handle in order received |
| `low` | Nice-to-have, can wait | Handle when idle |

---

## Notification surface (Command Center)

The Command Center dashboard (xpert-command-center.vercel.app) will display:
- A pill showing pending task count (updates via GET /api/console-queue every 60s)
- Color: green = 0 pending, amber = 1-5, red = 6+ or any urgent
- Click → opens task detail modal

---

## What goes on the bus (decision tree)

**Put on bus:** Anything that requires Console's GHL-inside-browser actions — AI Agent Studio prompt edits, workflow step body edits, manual form UI work, anything that GHL public API can't do (form deletes, workflow deletes, AI agent edits).

**Don't put on bus:** Anything Claude Code can do via API directly — CV/CF/tag CRUD, contact upsert, conversation send, snapshot-file downloads. If API works, use API.

---

## Failure handling

If Console PATCHes a task with `status: failed`, Claude Code:
1. Reads the error in `result`
2. Retries with adjusted instruction if recoverable
3. If not recoverable, surfaces to Renée with context

---

## Inspection

To see the current queue state at any moment:
- `https://xpert-command-center.vercel.app/api/console-queue?status=all` — full history
- `https://xpert-command-center.vercel.app/api/console-queue` — pending only

---

**Related:** `operating-system/cross-claude-inbox.md` (passive notes channel via intel.html — kept for ad-hoc CLAUDE-NOTE drops, different use case)
