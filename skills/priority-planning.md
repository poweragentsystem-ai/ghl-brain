---
name: Priority Planning
description: How Claude Code plans the day, picks what to work on first, parallelizes, and recovers from scope creep. Run this at the start of every session and every time new asks pile up.
type: skill
version: 1.0
updated: 2026-04-21
---

# Priority Planning — Claude's Skill

## When to use
- Start of every session
- Any time Renée drops 2+ new asks in a row
- When task list grows past 10 items
- When something's "in progress" for >2 hours with no ship
- When you feel scattered

## The 4-lane model

Every active task fits one lane. Triage into these lanes first, work in this order:

| Lane | Definition | Example | Order |
|---|---|---|---|
| 🔴 **PRESSING** | Client waiting / revenue blocked / live thing broken | Agency form broken, payment failing, client call tomorrow | 1st |
| 🟠 **SHIPPING** | Will move revenue in <24hrs if shipped | New landing page, pricing update, GHL snapshot export | 2nd |
| 🟡 **FOUNDATIONAL** | Unblocks future work, not today's money | Skill files, vault cleanup, new tool setup | 3rd |
| 🔵 **LEARNING** | Research, exploration, knowledge capture | Skool courses, Draftly study, competitor research | 4th (parallel) |

**Rule:** Never start a Foundational item while a Pressing item is open, unless it's a 5-minute sub-task that unblocks the Pressing.

## The 15-minute rule

Before starting any task, ask: **"Can I finish this in 15 minutes?"**
- **Yes** → do it right now, even if it's lower priority. Clearing small items frees focus.
- **No** → plan it properly (research → plan → build → test) or defer.

Small wins stack. 5 small ships in an hour beats 1 half-built big thing.

## Parallelize like a team

- **Background agents** for independent research (Skool extraction, competitor audits, doc generation). Launch with `Agent({run_in_background: true})`, keep working, reap results when they land.
- **Multiple Console tabs** for GHL browser work — Renée opens 2-3, paste prompts, they run in parallel while Claude Code does API work.
- **Separate terminals** for dev server + deploy + test. Don't serialize what can run at once.

**When NOT to parallelize:** when two agents would touch the same files. Never two writers on one codebase in the same sprint.

## Scope creep alarm

If Renée drops a new ask while 3+ tasks are already in progress:
1. **Stop.** Don't just absorb it silently.
2. Assess where the new ask fits in the 4-lane model.
3. Tell her honestly: "I've got A, B, C in flight. This new ask is [PRESSING/SHIPPING/etc]. Want me to: (a) pause one of those to do this, (b) queue this after them, or (c) send to a background agent?"
4. Her choice — but present it so she's deciding, not you quietly dropping things.

**Silent absorption = silent failure.** Something always falls off.

## Daily rhythm

### Session start (always, first 2 minutes)
1. Read `XpertVault/sprint/master-build-status.md` — where we left off
2. Read `/sprint/pending-saves-queue.md` — anything unfinished from last crash
3. Scan Command Center projects API (`/api/projects`) for "in_progress" items
4. Write a 3-item priority list for this session (Pressing first, then Shipping)

### Mid-session (every 30-45 min)
- Check `/cost` or token usage if expensive work
- Mark finished tasks complete via TaskUpdate
- If a task is stuck, switch to a different lane

### Session end
- Append 1-line log to `master-build-status.md`:
  `- [YYYY-MM-DD HH:MM | Claude-Code] shipped X / blocked on Y / in progress Z`
- Auto-sync vault to ghl-brain repo for mobile access
- Surface the 1 thing Renée should do next

## Time-box fail conditions

- **Stuck on same problem >2 hours with no forward motion** → stop. Write what you tried in `/sprint/master-build-status.md`. Switch tasks. Come back fresh.
- **3+ approaches failed** → the premise might be wrong. Step back, question the ask, propose an alternative path.
- **Browser automation keeps breaking selectors** → switch to API, switch to Console prompt for her, or just flag for her to do it manually. Don't thrash.

## Renée-specific accelerators

- **She's frustrated by setup friction.** Favor approaches that don't require her to click through dashboards. API > browser > "paste this into Console."
- **Her credit card is pay-as-you-go, manually loaded.** Never warn about accidental overspend. Flag cost estimates so she loads the card. Don't moralize.
- **She hates robotic copy.** Every user-facing message I write: human, short, specific. "Extra service" = instant red flag, rewrite.
- **She's on Windows 11 with limited dev tool appetite.** Lean into: Vercel CLI, gh CLI, Claude Code, gstack. Avoid: Docker, complex local environments.
- **Work window 10:30 AM – 3:00 PM Toronto.** Schedule long-running builds for off-hours, keep quick-interaction stuff for her active window.
- **She has multiple surfaces (Claude Code + Console + Mobile Claude).** Every project file lives in `XpertVault/projects/<slug>/` AND gets auto-synced to `poweragentsystem-ai/ghl-brain` public repo so every surface reads the same state.

## Immediate triage template (paste at session start)

```
🔴 Pressing right now: [1-3 items with revenue impact or blocker status]
🟠 Shipping today: [what will materially ship by EOD]
🟡 Foundational queue: [what to do after Shipping is clear]
🔵 Learning (background): [research running in parallel]

WHAT RENÉE NEEDS TO DO (if anything): [1 clear ask]
WHAT I NEED FROM HER (blockers): [creds, decisions, approvals]
```

## Why this matters

Renée said today: "I need to see all the things you plan on using inside the ghl account organized neatly. have you completed that yet?"

Translation: she's asked for clarity on what exists and what's being worked on. When Claude Code drifts into doing 10 things without finishing any, she loses the thread. Priority planning = respect for her time.

**Every session's ONE priority: what's the single thing that will produce revenue or unblock revenue today?** Everything else is secondary.
