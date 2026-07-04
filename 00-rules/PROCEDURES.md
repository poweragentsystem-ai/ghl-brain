# ⚙️ PROCEDURES — how work gets done here (and what ENFORCES it)
*The single map: task type → owning agent → process → enforcement. Renée (2026-07-04): "I want procedures set up correctly and ENFORCED — delegate to the right agent — not something I remind you about." Every row below is backed by a hook or a gate, not memory.*

## THE ENFORCEMENT LAYER (all live + lint-clean, `~/.claude/hooks/`)
| Hook | Fires | What it enforces |
|---|---|---|
| `intel-check.js` | SessionStart | Pulls the intel feed, surfaces NEW drops before Renée asks. Inbox: `12-daily/intel-inbox.md` |
| `capture-session.js` | Every message | Logs every Renée message + auto-saves every URL she sends (`design-references/_captured-urls-inbox.md`) — nothing evaporates |
| `agent-routing.js` | Every message | Keyword-matches the task → injects the owning Agent (Title) + its workspace path. **Checks the filesystem LIVE** (never a stale table) |
| `check-credential-edit.js` | Before any file edit | Blocks credential-file damage |
| `verify-live-check.js` | Response end | A code/deploy claim MUST carry ✅ TESTED via [test] or ⚠️ NOT TESTED — blocked by [reason]. Only fires when code was actually touched this turn |
| `persona-walkthrough-check.js` | Response end | Shipping a user-facing surface requires the 🚶 end-to-end persona walkthrough |
| `design-review-check.js` | Response end | ANY visual ship needs 🎨 DESIGN REVIEW (Allan). A LANDING/SALES/FUNNEL page additionally needs the 🏛 EXPERT PANEL (Hormozi·Brunson·Vee·Allan) |

## TASK → AGENT → PROCESS (the routing contract)
| Task type | Owner | Process |
|---|---|---|
| Anything visual (page/UI/palette/brand) | **Allan (Creative)** | `04-agents/allan/CONTEXT.md`: swipe-file reference match → asset gen → build → Lex/Connor → verify. Landing pages: + stage `02-expert-panel-review/PROCESS.md` |
| GHL (workflows/subs/snapshots/fields) | **Gill (GHL)** | `04-agents/gill/`: consult GHL AI → verify → let GHL AI build → review → execute/escalate. GHL-native FIRST; generic `{{custom_values}}`, no niche hardcodes |
| Orchestration / multi-agent work | **Jordan (COO)** | `04-agents/jordan-coo/`: intake → decompose → [Renée gate on plan] → route → execute → report |
| Copy / messaging | **Lex (Copy)** | Human voice, no AI tics, no emojis in body. Public copy: Kai locks offer → Lex drafts → Mark picks → Board pressure-test |
| Offers / pricing / funnels (structure) | **Kai (Offers)** | Value equation, stack, guarantee, bonuses, urgency-with-reason. Never fake proof |
| Compliance (CASL/PIPEDA/FSRA/TCPA) | **Connor (Compliance)** | Reviews all regulated/public surfaces. Hard NOs: fake income proof, income guarantees, naming lenders, after-hours contact |
| Mortgage domain | **Morgan (Mortgage Assistant)** | Agent-not-broker; "our lending partners"; no promises; LTV rules |
| Research / external facts | **Ryan (Research)** | Authoritative sources, cited. Never guess |
| Everything else | Per `agent-routing.js` map | The routing line in every message names the owner. If it has a workspace → load its CONTEXT.md; else its `claude-skills/<agent>.md` |

## THE NON-NEGOTIABLE WORK LOOP (every substantive task)
1. **Route** (hook injects the owner) → load that agent's workspace/skill.
2. **Runbook check** — `runbooks/` + `SOLUTIONS.md` first; follow the winning path if one exists.
3. **Expert level** — find the skill → research → benchmark competitors → ~90% sure on the GOAL (ask MC questions only for genuine business gates) → execute the HOW autonomously.
4. **Build with tests inline** — verify each step as it's built, never batch to the end.
5. **Ship with the markers** — ✅ TESTED / 🚶 walkthrough / 🎨 design review / 🏛 panel (as applicable). The hooks physically block "done" without them.
6. **Sync the brain** — update `BRAIN-INDEX.md` + run `sprint/sync-to-github.sh` after meaningful state changes (keeps dispatch/mobile/Console current).
7. **Capture the win** — new proven path → `runbooks/`; solved problem → `SOLUTIONS.md`; lesson → memory.

## THE BRAIN (how every surface stays in sync)
- **Local source of truth:** the vault + `~/.claude` memory (this PC).
- **Entry point:** `BRAIN-INDEX.md` (session-start step 0; bookmarked "🧠 START HERE" in Obsidian).
- **Remote surfaces (dispatch/mobile/Console):** read `https://raw.githubusercontent.com/poweragentsystem-ai/ghl-brain/main/BRAIN-INDEX.md` (+ `MEMORY-INDEX.md`). Push = `sync-to-github.sh` (strips keys, excludes lead PII).
- **Obsidian:** the vault IS the Obsidian vault — `[[wikilinks]] `in memory/notes render natively; bookmarks pin the brain, swipe file, runbooks, audits.

## ESCALATE TO RENÉE ONLY FOR
Money (>$20/recurring) · credentials/2FA/logins · brand/identity · offer & pricing decisions · strategy/pivots · irreversible actions · compliance failures · genuine goal ambiguity. Everything else: decide, execute, show the result with the markers.
