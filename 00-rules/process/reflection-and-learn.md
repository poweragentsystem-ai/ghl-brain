---
name: reflection-and-learn
description: "Renée 2026-05-31. Structured session-end reflection ritual that forces every Claude instance (Code / Console / App) to capture what was LEARNED — processes, wins, losses, rules, skills, patterns, open questions — at the end of every substantive session. Raw reflections collected to XpertVault/12-daily/reflections/. Consolidation pass routes processes → /00-rules/process/, rules → memory feedback files, skills → /06-skills/, wins/losses → brain ledgers. Cross-instance protocol with mandatory visible 🧠 REFLECTION marker."
metadata:
  type: process
  scope: cross-instance
  enforcement: session-end-blocking
  status: ACTIVE
  effective: 2026-05-31
---

# Reflection & Learn — Session-End Ritual

> Renée 2026-05-31. The forcing function that turns sessions into compounding learning. Without this, every session is amnesic — I only install rules when Renée points failures out. With this, every session captures what worked, what didn't, what to keep, what to drop.

## Renée's exact ask (2026-05-31)

> *"how do we get claude to learn? can we add an auto ask of 'did you learn processes? if so which ones. what are the steps involved. what are the must does, what are the donts? did you discover a win today? what positive things happened? did you discover losses ? what negative things happend ? di dyou learn any new rules? di dyou learn any new skills ?' then this info is collected then organized."*

## The ritual

At the end of every substantive session (any session with multiple substantive tasks, any build, any deploy, any decision worth keeping), each Claude instance writes a structured reflection BEFORE the session-log entry. The reflection lives in `XpertVault/12-daily/reflections/YYYY-MM-DD-<instance>-<short-id>.md`.

The reflection is NOT optional. It's a session-end gate. Skipping it = the session never happened from the brain's point of view.

## The schema

```markdown
# 🧠 SESSION REFLECTION — <YYYY-MM-DD> · <instance> · <session-short-id>

**Top task this session:** <one sentence>
**Duration (approx):** <minutes>
**Outcome:** <shipped / partial / blocked / aborted>

---

## 📚 PROCESSES LEARNED
*A "process" = a repeatable sequence of steps for handling a recurring kind of task. If the process is reusable across future sessions, capture it here.*

For each process learned:
- **Name:** <what to call it — kebab-case>
- **Description:** <one sentence — what it does>
- **Steps:**
  1. <step>
  2. <step>
  3. ...
- **Must-dos:**
  - <thing that always has to happen>
- **Don'ts:**
  - <thing that always has to be avoided>
- **When to apply:** <trigger — what kind of task fires this process>
- **Promote to:** `00-rules/process/<name>.md` ✅ / draft only / keep here

---

## ✅ WINS — POSITIVE OUTCOMES
*Things that worked. Surprises that landed. Approaches that beat expectations.*

For each win:
- **What happened:** <fact>
- **Why it was a win:** <impact>
- **What enabled it:** <skill / tool / decision / partner / process>
- **How to replicate:** <how a future session can do this again>

---

## ⚠️ LOSSES — NEGATIVE OUTCOMES
*Things that broke. Mistakes I caught (or Renée caught). Wasted time. Wrong direction.*

For each loss:
- **What happened:** <fact>
- **Why it was negative:** <impact — cost / risk / time / trust>
- **Root cause:** <not the symptom — the actual upstream cause>
- **Fix going forward:** <structural change, not "I'll be more careful">
- **Promote to:** memory rule `feedback_<X>.md` ✅ / CLAUDE.md gate / fix this session / keep here

---

## 📋 NEW RULES LEARNED
*New behavioral rules from this session — usually triggered by a Renée correction or a self-caught pattern.*

For each rule:
- **Rule:** <one sentence, imperative voice>
- **Why:** <the reason — often a past failure>
- **When to apply:** <trigger>
- **Promote to:**
  - Memory `feedback_<X>.md` (default — non-blocking descriptive rule)
  - CLAUDE.md gate (only if violated 3+ times — blocking)
  - Vault process doc (if it's part of a larger process)

---

## 🛠️ NEW SKILLS LEARNED
*New capabilities I gained access to — new tools, new MCP surfaces, new techniques, new frameworks I read.*

For each skill:
- **Name:** <skill name>
- **What it does:** <capability>
- **How to invoke:** <command / tool / Read path>
- **Triggers:** <keywords in user message that should fire this skill>
- **Promote to:** `~/.claude/skills/<name>.md` ✅ / `XpertVault/06-skills/<name>/` / Renée install

---

## 🌐 INTERESTING LEARNINGS — INTEL CAPTURE
*Anything noticed / learned about specific domains this session that's worth remembering. Doesn't have to be a rule or a skill — just intel worth keeping.*

For each learning:
- **Domain:** <niche · tech · Claude · Google · GHL · GPT · competitors · Renée · business · Renée's likes · tools · other>
- **What I learned:** <one sentence — specific, concrete, factual>
- **Source:** <where it came from — Renée message, GHL changelog, Google search, MCP call, observation>
- **Why it matters:** <how it affects future decisions / approach / strategy>
- **Promote to:**

| Domain | Destination |
|---|---|
| **Niche** (mortgage / Canadian lending / AI consulting / SaaS) | `XpertVault/13-intel/learnings/niche.md` |
| **Tech** (general industry) | `XpertVault/13-intel/learnings/tech.md` |
| **Claude** (Anthropic / Claude Code / API / models) | `XpertVault/13-intel/learnings/claude.md` |
| **Google** (Search / Cloud / Workspace / Gemini) | `XpertVault/13-intel/learnings/google.md` |
| **GHL** (features / updates / quirks / AI Studio) | `XpertVault/13-intel/learnings/ghl.md` |
| **GPT** (OpenAI / models / behaviors) | `XpertVault/13-intel/learnings/gpt.md` |
| **Competitors** (Emergent / Lovable / Cursor / others) | `XpertVault/13-intel/competitors/<name>.md` |
| **About Renée** (her context, decisions, state, history) | `user_profile.md` memory update OR `XpertVault/01-renee/profile.md` |
| **Business** (Xpert state, revenue, partners, projects) | `XpertVault/03-business/state.md` |
| **Renée's likes** (things she SAID she likes — design, tools, phrases, approaches) | memory `feedback_renee_likes_<X>.md` (high precedence — do MORE of this) |
| **Tools** (new tools, changes to existing, integrations) | `XpertVault/13-intel/learnings/tools.md` |
| **Other** | `XpertVault/13-intel/learnings/misc.md` |

**Special handling — "Renée's likes":**
When Renée says "I like X" / "I love how Y does Z" / "this is great" / "keep doing this" — that's a POSITIVE preference, not a correction. Save as `feedback_renee_likes_<X>.md` so the next session does MORE of that. The corrections rules say what to stop. The likes rules say what to amplify.

---

## 🔍 PATTERNS NOTICED
*Meta-observations across the session. Things that connect across multiple tasks. The "huh, I keep doing X" insight.*

- <observation>
- <observation>

---

## ❓ OPEN QUESTIONS
*Things I don't know yet. Research to do. Decisions waiting on Renée. Knowledge gaps to fill.*

- <question> — owner: <Code / Console / App / Renée> — by: <when>

---

## 📊 BRAIN INDEX UPDATE
*One-liners for the daily roll-up.*

- Processes: <count>
- Wins: <count>
- Losses: <count>
- Rules: <count>
- Skills: <count>
- Intel learnings (by domain): <niche:N · tech:N · Claude:N · Google:N · GHL:N · GPT:N · competitors:N · Renée:N · business:N · likes:N · tools:N>
- Patterns: <count>
- Open Qs: <count>
```

## Per-instance protocol

### Claude Code (me — desktop / CLI)
**Session-end sequence:**
1. Write reflection file to `XpertVault/12-daily/reflections/YYYY-MM-DD-claude-code-<short-id>.md`
2. Promote any "Promote to: ✅" items to their destinations IMMEDIATELY in the same session
3. Append to `session-log.md` with reflection summary line
4. Drop Telegram summary with win/loss counts

**Session-start sequence (existing + new):**
1. Read prior session's reflection file
2. Check `master-build-status.md` for pending "Promote to:" items not yet promoted
3. Execute promotions before starting new work

### Console (browser-based inside GHL)
**At end of every claimed task:**
1. PATCH /api/console-queue with task result
2. Also POST /api/reflection-save with the reflection JSON (Console's PATCH bus gives it a session-id)
3. Drop CLAUDE-NOTE at /intel.html with prefix `REFLECTION:` + summary
4. Claude Code (next session) parses + files

### App / Mobile (chat surface)
**When Renée wraps a phone session:**
1. App drops CLAUDE-NOTE at /intel.html: `REFLECTION (from App): <Renée's observation / win / loss / rule / skill>`
2. Claude Code files it on next session

## Storage convention

```
XpertVault/12-daily/reflections/
├── README.md                          ← convention + index
├── 2026-05-31-claude-code-abc123.md   ← raw reflection
├── 2026-05-31-console-def456.md
├── 2026-05-31-app-ghi789.md
├── weekly/
│   └── 2026-W22.md                    ← weekly roll-up
└── monthly/
    └── 2026-05.md                     ← monthly roll-up
```

## Consolidation pass (v2 — design)

When raw reflections accumulate (target: 1 week of data), build a consolidation cron that:

1. Reads all reflection files for the period
2. For each "Promote to: ✅" item:
   - Process → check if process doc exists, if not draft to `00-rules/process/proposed-<name>.md` (Renée reviews + promotes)
   - Rule → check memory rules, if not present draft `feedback_proposed_<name>.md` (Renée reviews + promotes to `feedback_<name>.md`)
   - Skill → check `~/claude-skills/`, if not present draft to `proposed/<name>.md`
   - Win → append to `brain/wins-ledger.md`
   - Loss → append to `brain/losses-ledger.md` + cross-link to `10-self-correction/`
3. Roll up weekly → `weekly/YYYY-WW.md`
4. Roll up monthly → `monthly/YYYY-MM.md`
5. Update Command Center `/reflections.html` page for click-from-mobile review

For now (MVP): raw reflections only. Consolidation pass deferred.

## Mandatory visible marker

Every session-end response from any instance includes:

```
🧠 REFLECTION: written to XpertVault/12-daily/reflections/<file>.
   Processes: <N> · Wins: <N> · Losses: <N> · Rules: <N> · Skills: <N>
   Intel learnings: <total N> (domains: <niche/tech/Claude/Google/GHL/GPT/competitors/Renée/business/likes/tools>)
   Auto-promoted this session: <N>
   Pending for review: <N>
```

If session ends without this line → reflection skipped → Hawk fails the session.

## What counts as "substantive" (when reflection IS required)

- Any session with 30+ minutes of work
- Any session that shipped a build / deploy / artifact
- Any session with a Renée correction
- Any session that touched memory rules, skill files, CLAUDE.md, vault process docs
- Any session that surfaced a new pattern / win / loss worth keeping

## What counts as "non-substantive" (when reflection can be skipped)

- A single-tool ack (one Read, one Grep, one heartbeat reply)
- A Telegram chat reply that doesn't trigger any work
- Sub-30-minute sessions with no shipping / no corrections / no learning

When in doubt → write it. The cost of a 5-minute reflection on a small session is low; the cost of skipping it on a learning session is the same compounding-loss failure that produced 21 violated memory rules across April 2026.

## Why this rule exists

Without this ritual, the brain doesn't compound. Every session has the same starting context as the last one. Renée's corrections install rules; everything else evaporates. The reflection ritual captures the "everything else" — the wins, the partial insights, the new approaches that worked, the questions I'm carrying — so the next session can pick up where the last one ended.

It's the difference between:
- **Without ritual:** "I keep making the same mistakes" / "Why don't you remember?"
- **With ritual:** "I picked up on the pattern from yesterday's reflection and avoided the failure."

## Cross-references

- Parent: `XpertVault/CLAUDE.md` session-end sequence
- Sibling: `feedback_session_end_learning_ritual.md` (memory rule)
- Sibling: `feedback_proactive_save_rhythm` (20-min rule, complements this)
- Sibling: `brain-architecture-v1.md` (4-layer brain — this ritual feeds Layer 4)
- Storage: `XpertVault/12-daily/reflections/`
- API (v2): `/api/reflection-save` + `/api/reflection-list` + cron consolidation
