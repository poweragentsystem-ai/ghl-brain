---
tags:
  audience: [claude-code, claude-console, claude-app, future-runners]
  domain_expert: jordan-coo
  function: [cross-instance-coordination, one-ai-experience, brain-build]
  capabilities: [filesystem, vercel-api, intel-feed, telegram]
  style: [structural, unified-program]
  compliance: []
  tech: [filesystem, vercel-cron, command-center-api, intel-html]
related_to:
  projects: []
  memory_rules:
    - feedback_session_start_check_intel.md
    - feedback_save_immediately.md
  skills: []
  agents: []
  processes:
    - brain-architecture-v1.md
    - cross-claude-task-bus.md
    - cross-claude-inbox.md
    - visual-project-tracking.md
    - project-closeout-protocol.md
---

# CROSS-INSTANCE PROTOCOL — One AI experience across Code + Console + App

**Parent spec:** `brain-architecture-v1.md` (Layer 4)
**Goal:** Renée talks to any of the three Claude instances + the experience feels like one continuous brain.

---

## Why this exists

Renée 2026-05-19: *"i'm sick of talking to one and the other having no clue. it should be as if i am speaking to the same ai."*

Three instances don't share memory. The only way they stay in sync is **shared file reads + shared file writes against the same paths**. This protocol defines exactly which paths each instance reads + writes + when.

---

## The 3 shared surfaces

| Surface | Type | Path / URL | Read by | Written by |
|---|---|---|---|---|
| **Cross-instance task log** | File | `XpertVault/12-daily/cross-instance-task-log.md` | All 3 at session start | All 3 after meaningful actions |
| **Intel feed** | API + HTML | `xpert-command-center.vercel.app/api/intel` + `/intel.html` | All 3 at session start | Console + App primarily, Code secondarily |
| **Master build status** | File | `XpertVault/sprint/master-build-status.md` | All 3 at session start | All 3 on every meaningful change |

Plus the existing layers from `brain-graph-maintenance.md` (tagged files) and `visual-project-tracking.md` (Command Center `/api/projects`).

---

## Universal session-start sequence (every instance)

1. **Read** `XpertVault/12-daily/cross-instance-task-log.md` → last 20 lines tell you what the other instances just did
2. **Read** `XpertVault/sprint/master-build-status.md` → multi-phase state of every active track
3. **Fetch** `GET https://xpert-command-center.vercel.app/api/intel` → unprocessed CLAUDE-NOTE drops from other instances
4. **Fetch** `GET https://xpert-command-center.vercel.app/api/reminders` → Riley deferred-decision queue
5. **Read** active-task pointer (instance-specific path — see below)
6. **Read** the matching `00-rules/process/<process>.md` for the task type

Only then act on Renée's first message.

---

## Universal save-after-action discipline (every instance)

After every meaningful action (defined as: a decision, a deploy, a file write that ships, a workflow published, a project closeout, a credential change, a blocker encountered):

1. **Append** one line to `12-daily/cross-instance-task-log.md`:
   ```
   | 2026-MM-DD HH:MM ET | <instance> | <project-slug> | <action> | <status> | <link or ID> |
   ```
2. **Append** one line to `sprint/master-build-status.md`:
   ```
   - [2026-MM-DD HH:MM | <instance>] what just happened
   ```
3. **If artifact created** (memory rule / skill / agent / process / project README) → apply 7-dim tags + 4 rel arrays per `brain-graph-maintenance.md`
4. **If multi-phase project** → POST or PATCH `/api/projects` per `visual-project-tracking.md`

---

## Instance-specific entry points

### 🟦 Claude Code (this one, files + API)

**Active-task pointer:** `C:/Users/User/.claude/state/active-task.md`

**Native actions:**
- File writes (the primary path — Code is the only instance that writes files reliably)
- API calls (curl, fetch, MCP tools)
- Git operations
- Cron job builds
- Pilot project folder creation

**Closeout execution:**
- Code is the **final closeout runner**. When Console or App announce a project close via intel.html, Code runs the full 8-step closeout protocol from `project-closeout-protocol.md` against the file structure.

**Push protocol when Console-only work is needed:**
- POST to `/api/console-queue` per `cross-claude-task-bus.md`

**Heartbeats:**
- Use `~/.claude/bin/tg-ping "<message>"` per HEARTBEAT gate

---

### 🟪 Claude Console (browser, GHL-native)

**Active-task pointer:** Read from `cross-instance-task-log.md` last line where `instance = Claude Code` — that's the latest authoritative state.

**Native actions:**
- GHL Build-with-AI / Workflow AI / AI Agent Studio (PRIMARY — per `cross-claude-task-bus.md` rule: AI Agent before manual clicks)
- Browser-side workflow / form / agent edits
- Snapshot inspection
- Manual UI work where GHL AI can't help

**Standard prompt footer (paste this into every Console session prompt):**

```
SESSION START — read in order, then claim:
1. XpertVault/12-daily/cross-instance-task-log.md (ghl-brain repo, last 20 lines)
2. XpertVault/sprint/master-build-status.md
3. GET xpert-command-center.vercel.app/api/intel (unprocessed drops)
4. CLAIM: POST /api/console-queue {"claim":true,"claimedBy":"<worker>"}

🤖 GHL AI = SENIOR EXPERT — GHL AI BUILDS, CONSOLE REVIEWS (Renée 2026-05-30, bible-level)

The relationship: GHL AI builds → Console reviews / approves / verifies. NOT Console-builds-with-GHL-AI-as-tool.
Console-first when GHL AI could do it = BAD WORK. The car vs. bike framing applies to every task.

THE AI SURFACES — use them, don't go manual (UPDATED Renée 2026-06-29):
  ✅ "Ask AI" (top-right) = NOW TASK-CAPABLE. GHL upgraded it — it DOES tasks (build email
       sequences, create/edit fields, values, tags, answer account questions, etc.).
       Renée 2026-06-29 REVERSED the old "never use" rule. This is now a default doer for
       non-workflow tasks. (If it turns out this is a different button, flag to Renée.)
  ✅ "Build with AI" (open a workflow → button at top) = workflow builder. Use for creating/
       editing WORKFLOWS — the one thing Ask AI can't do.
  ✅ "Get Started" (Sub → AI Agent → Get Started) = account-aware agent surface — still valid.

  ⚠️ TWO LIMITS of "Ask AI" — work WITH them, don't abandon the AI over them:
    1. It CAN'T create workflows → switch to Build with AI inside a workflow for those.
    2. It CAN'T see all custom fields / custom values / tags → when a task needs them,
       COPY the real list (MCP cf_list / cv_list / tag_list) and PASTE it into the chat.

  ❌ DON'T build manually (the Console email-sequence mistake, 2026-06-29) when Ask AI or
     Build with AI could have done it. GHL AI is an EXPERT ASSET — use it FIRST, then I
     review / correct / finish manually only if it's wrong or genuinely can't do the task.

THE FLOW on EVERY GHL task:
  0. RESUME prior chat if one exists for this task (don't start fresh + lose context)
  1. OPEN the right AI: Ask AI (top-right) for general tasks · Build with AI for workflows ·
     Get Started for account-aware planning. Paste in fields/values/tags if the task needs them.
  2. ASK FOR PROPOSAL: "How would you approach <task>?" — GHL AI proposes a plan
  3. REVIEW + APPROVE: read the proposal, push back / refine / OK it (Console = REVIEWER, not commander)
  4. BUILD: let GHL AI execute the approved plan
  5. VERIFY: "Describe step by step what you just built"
  6. MCP CROSS-CHECK (only for specific things — see below)
  7. CORRECT discrepancies → re-verify
  8. WORKFLOW = Build with AI (Ask AI can't make workflows; still NOT manual)
  9. TRUE MANUAL = last resort only when no AI surface can do it

🔄 BIDIRECTIONAL ADVICE — even when YOU have an idea:
   "I was thinking <X> — does that make sense? Is there a better way?"
   GHL AI may surface a better approach you hadn't considered. ALWAYS bounce ideas off it before executing.

⚠️ MCP CROSS-CHECK — ONLY for these specific things (don't over-verify everything):
   • COUNT of tags / custom fields / custom values / workflows / forms / contacts
     (GHL AI sometimes reads partial data — saw 14 fields when 28)
   • "Does X already exist?" — verify with cf_find_by_name / cv_find_by_name / tag_list before creating
   • Duplicate detection — list + de-dupe via MCP, don't trust AI's count
   Everything else → trust GHL AI. Don't burn cycles MCP-verifying every detail.

   MCP tools: contact_search · cf_list / cf_find_by_name · cv_list / cv_find_by_name
              tag_list · workflow_list · form_list

   If MCP count differs from GHL AI count → work from MCP, tell AI "MCP shows N — work from N."

CLONE BEFORE BUILD: if a sibling artifact exists (reminder bot, welcome sequence, qualifier flow, no-show rebook, doc collection, status update, voice agent) → clone + rename + change 3-5 context fields. DON'T restructure. EXCEPTION: if Renée previously rejected the sibling, ASK which parts to keep before cloning.

🤔 ANYONE-USE TEST (Renée 2026-05-30) — RUN THIS BEFORE WRITING ANY LINE OF ARTIFACT TEXT

The snapshot ships to ANY business with ANY size, ANY niche, ANY config. Before typing ANY sentence into a workflow name / AI agent prompt / template / tag / custom field label / email body / SMS / opportunity stage — ask:

  ❓ "If a different business with different products, different size, different niche installed this — would this exact sentence still make sense?"

If NO → rewrite as generic / placeholder-driven / no-count.
If YES → fine.

WORKED FAILURES THIS TEST PREVENTS:
  ❌ "We have 10 services to offer..."        → another business has 3. BREAKS.
     ✅ Just reference {{custom_values.service_1}} ... service_10. Empty ones render empty.
        If service_4 is blank, nothing about service_4 appears. No count needed.
  ❌ "We've helped 500 clients since 2018"    → new business has neither. BREAKS.
     ✅ Use {{custom_values.years_in_business}} + {{custom_values.clients_helped}} or OMIT.
  ❌ "Our 5-person team will..."              → solo business breaks. BREAKS.
     ✅ "Our team" or "We" — no count.
  ❌ "Welcome to our mortgage office"         → dental business breaks. BREAKS.
     ✅ "Welcome to our {{custom_values.niche}} office"
  ❌ "Visit equitymax.ca to learn more"       → another business has different URL. BREAKS.
     ✅ "Visit {{custom_values.business_url}}"
  ❌ "Our top 3 most popular packages are..." → business with 1 package breaks. BREAKS.
     ✅ Reference {{custom_values.package_1}} ... package_N. Render naturally.

THE RULE OF NO-COUNTS:
Never type a number that describes business capacity (services / team / years / clients / packages / locations). The customs render empty if not filled, so the prompt naturally degrades. NO count needed. NO assumption needed.

Trust the {{custom_values}} system. If service_4 is blank, the sentence referencing service_4 should naturally degrade. Use conditional phrasing: "If you need help with {{custom_values.service_4}}, ..." — not "Service 4 is X."

🔓 NO HARDCODES — every business identifier MUST be {{custom_values.X}}, NEVER a literal.

BANNED literals (always {{custom_values.X}}):
  Company · owner name · title (Agent/Broker) · license # · brokerage · regulator (FSRA/BCFSA/etc.)
  URL · phone · email · address · logo · brand colors/hex
  Products & services · service area / city / state / province / country
  Timezone · business hours · years in business · team size · calendar link
  Specific lender names (Calvert/Equitable/B2B/MCAP/Scotia/TD/etc.) · specific rates / prices / tiers
  Test contact (4168784622 / renee.ross@gmail.com)

🔓 BANNED NICHE WORDS — Renée 2026-05-30 RE-ESCALATION (Console keeps doing this):
The snapshot is GENERIC. Mortgage is just the TEST environment — we sell this to other businesses.
NEVER type a niche word in workflow names, AI agent prompt body, custom field/value names, tags, templates, or any deployable artifact.
  ❌ mortgage / mortgages / mortgage broker / mortgage agent / lender / refi / HELOC / loan / down payment / borrower
  ❌ real estate / realtor / dental / dentist / restaurant / med spa / trades / contractor / any specific niche word
  ✅ Use {{custom_values.niche}} instead. Examples:
     "Mortgage Lead Qualifier" workflow      → "{{custom_values.niche}} Lead Qualifier"
     "Welcome to our mortgage office"        → "Welcome to our {{custom_values.niche}} office"
     "Help mortgage clients with X" (prompt) → "Help {{custom_values.niche}} clients with X"
     "mortgage_qualified" tag                → "{{custom_values.niche}}_qualified" tag

EXCEPTION: rule bodies / process docs that EXPLAIN the niche placeholder can name "mortgage" as the test case. Deployable artifacts cannot.

MANDATORY VISIBLE MARKERS in every PATCH result:
  🤖 GHL-AI-CONSULTED: <chat resumed Y/N · asked X · got Y · delegated Z · verified · MCP count>
  🔓 NO-HARDCODES: scanned for company/owner/title/license/URL/phone/email/products/service-area/timezone/hours/logo/hex/lender/rates/niche-words. Found: zero (or list).

AFTER every meaningful action:
1. PATCH /api/console-queue with status + result
2. Drop CLAUDE-NOTE at /intel.html: "from Console — [shipped] — [URLs/IDs] — [handoff for Code]"
3. Project closed? Add "PROJECT CLOSEOUT — see project-closeout-protocol.md" (Code writes the 5 notes files)
4. New workflow/agent/form/template? Flag the 7-dim tags in the drop

🧠 REFLECTION (Renée 2026-05-31) — REQUIRED at session end on every substantive session:
Drop a CLAUDE-NOTE at /intel.html with prefix "REFLECTION:" + answers to the 8 questions:
  1. Processes learned (name · steps · must-dos · don'ts · when to apply)
  2. Wins (what · why positive · how to replicate)
  3. Losses (what · why negative · root cause · fix forward)
  4. New rules learned (rule · why · when to apply)
  5. New skills learned (name · what it does · how to invoke)
  6. Intel learnings — anything interesting about: niche · tech · Claude · Google · GHL · GPT · competitors · Renée · business · Renée's LIKES (do more of) · tools
  7. Patterns noticed (meta-observations)
  8. Open questions (what's carrying forward)
Code files the raw reflection to XpertVault/12-daily/reflections/ next session.
Full schema: /00-rules/process/reflection-and-learn.md
Closing marker required:
  "🧠 REFLECTION dropped — P/W/L/R/S: <N>/<N>/<N>/<N>/<N> · Intel: <N> (domains) · pending review: <N>"

HARD RULES:
- Display plan in plain English before browser actions
- Checkpoint every 15-20 min via PATCH (status:in_progress)
- Boy-scout: fix any hardcode OR niche-word on sight, even outside scope
- "GHL is the car. Use the car not the bike."
- Burnout / limit approaching? PATCH final with "BURNOUT WARNING — resume point: <step>"

Full rules:
- /00-rules/process/ghl-ai-as-senior-expert.md
- /00-rules/process/ghl-build-workflow.md
```

**Closeout execution by Console:**
- Console does NOT write the 5 notes files (file-system access limited).
- Console drops a closeout note at intel.html with full closeout data → Claude Code consumes + writes the files.

---

### 🟧 Claude App / Mobile (chat surface, no file system)

**Active-task pointer:** Read by Renée asking "what's the top task?" — App pulls from cross-instance-task-log.md (via ghl-brain repo) or asks Code via Telegram.

**Native actions:**
- Conversational strategy (Renée talks through ideas)
- Quick decisions Renée surfaces while away from desktop
- Capturing field notes (call summaries, things spotted on social, deals coming in)
- Voice notes Renée transcribes mid-conversation

**Standard rule for App / Mobile:**

```
When Renée tells me something that needs Claude Code to act on (a decision, a new spec,
a credential, a brand call, a project close), I drop a CLAUDE-NOTE at
https://xpert-command-center.vercel.app/intel.html:

"CLAUDE-NOTE (from App): <one or two sentences, with IDs/names/specifics> — 2026-MM-DD HH:MM ET"

I do NOT pretend to be able to write to the file system. I do NOT make decisions for Renée
on irreversible things. I capture, drop, and let Code execute.

When Renée tells me something has shipped or a project closed (e.g., she announces a delivery
from her phone), I drop a closeout note:

"CLAUDE-NOTE (from App): PROJECT CLOSEOUT — <project-slug> — <what shipped> — <URLs>"

Claude Code picks this up next session and completes the 5-notes write.

At session start, I tell Renée: "Pulling intel feed for what Code + Console did since we last talked."
```

**Closeout execution by App:**
- Same as Console — App drops the closeout note, Code completes the file structure.

---

## What "feel like one AI" looks like in practice

| Renée's move | What happens behind the scenes |
|---|---|
| Tells App on phone: "Aaron and I agreed on ARA AI as brand name" | App drops CLAUDE-NOTE at intel.html. Code reads at next session, writes to `03-business/brand/notes-completed.md`, updates frontmatter on every existing project's `tech` array. |
| Console finishes renaming 9 GHL workflows | Console PATCHes /api/console-queue done. Console drops CLAUDE-NOTE summarizing the renames + tags touched. Code reads, appends cross-instance-task-log row, updates the snapshot project README. |
| Code ships a new endpoint | Code appends cross-instance-task-log + master-build-status + drops a heartbeat. App + Console reading those at start know the endpoint exists. |
| Renée asks Code "what did Console do yesterday?" | Code reads cross-instance-task-log filtered by instance=Console + date → answers in 1 read. |

Same brain. Different fingers.

---

## Cron job that enforces compliance

Daily at 12:00 UTC, `morning-brief.js` runs `?brain_audit=1` which:

1. Reads `cross-instance-task-log.md` — verifies each instance wrote in last 24 hrs (drift detection)
2. Reads `master-build-status.md` — verifies each instance updated since last cron
3. Reads project folders — verifies 5 notes files exist for projects with `status: done`
4. Pings Telegram if any instance is silent > 24 hrs OR compliance < 90%

If Console hasn't written in 36 hrs: alert reads *"Console drifted — last activity 36 hrs ago. Likely Renée hasn't opened Console. Riley reminder set."*

---

## Anti-patterns banned

- ❌ Any instance executing without the session-start reads
- ❌ Any instance closing a project without dropping the closeout note (or running closeout if Code)
- ❌ Same project name typed differently across instances (use the exact `<project-slug>` from the folder name)
- ❌ Drift > 24 hrs on cross-instance task log (the cron catches this — fix proactively)
- ❌ Console saying "I'll write the notes" — Console drops, Code writes

---

## Source rules + cross-references

- `cross-claude-task-bus.md` — Console queue endpoint + Build-with-AI rule (still authoritative)
- `cross-claude-inbox.md` — intel.html drop pattern (still authoritative)
- `brain-architecture-v1.md` — the 4-layer system this is part of
- `brain-graph-maintenance.md` — Layer 1 (tagging)
- `visual-project-tracking.md` — Layer 2 (visual tracking)
- `project-folder-template.md` + `project-closeout-protocol.md` — Layer 3 (notes discipline)

---

*This protocol is the "operating manual all three instances share." When Renée says "you guys" — this is what she's talking to.*
