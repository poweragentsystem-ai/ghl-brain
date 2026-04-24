---
name: Console Handoff Protocol
description: The rules for handing any task off to browser Console (or mobile Claude) when Claude Code can't finish it. No lazy handoffs. Console must receive complete context so it ships without calling back for clarification.
type: skill
version: 1.0
updated: 2026-04-21
---

# Console Handoff Protocol

## The problem this solves
Claude Code hits tasks it can't finish from files + API (browser-only GHL ops, paid-tool logins, dashboards without APIs). The lazy move is: "Console has to do this." That dumps Renée's time into re-explaining.

**The rule: when I hand off, I hand off COMPLETE.** Console gets everything it needs to finish the task as if it were in the original conversation.

## The 4 ingredients every handoff must contain

| Layer | What it is | Where it lives |
|---|---|---|
| **1. Conversation state** | What we just decided, why, what's already tried | `XpertVault/sprint/master-build-status.md` (most recent activity log entries) |
| **2. Knowledge** | Domain facts: business info, tech stack, GHL accounts, custom fields, pricing, compliance rules | `XpertVault/operating-system/*` + `XpertVault/sprint/ghl-master-list.md` + `XpertVault/claude-memory/*` |
| **3. Prompt** | Step-by-step task brief — exactly what Console does, in order, with success criteria | A single `CLAUDE-PROMPT.md` per project at `projects/<slug>/CLAUDE-PROMPT.md` |
| **4. Skills** | Tone rules, pattern libraries, protocols Console must follow | `claude-skills/*` relevant files — referenced in the prompt by name |

A handoff that skips any of these is broken. Don't ship it.

## The handoff checklist (run this before giving Renée any "paste this into Console" link)

- [ ] Conversation state captured in `master-build-status.md` with today's timestamp
- [ ] Knowledge synced: vault + ghl-brain repo up-to-date (`bash sync-to-github.sh`)
- [ ] Prompt file exists and references the exact files Console should read in order
- [ ] Skills referenced by file path, not just by name (`claude-skills/message-tone.md`, not "the tone skill")
- [ ] Prompt has explicit **STOP conditions** — when to ask Renée vs keep going
- [ ] Prompt has explicit **DONE criteria** — what Console logs back when finished
- [ ] Prompt URL is public and stripped of secrets
- [ ] Sensitive values passed via placeholder tokens (`{{ABC_API_KEY}}`) not literal secrets

## The prompt template

Every Console prompt file follows this shape:

```markdown
# <PROJECT NAME> — Console Task
### Copy this entire message as-is into a Console session that has GHL MCP (or whatever tool is needed).

---

## READ FIRST (in this order)
1. <url-or-path> — overall sprint state
2. <url-or-path> — domain data (custom fields, tags, pricing, etc.)
3. <url-or-path> — task-specific spec

## CONTEXT (1 paragraph)
<What we've already done, what's been decided. Why this task matters. Who the user is.>

## YOUR JOB (phased)
### PHASE A — <tight verb noun>
<step-by-step with specific selectors / API endpoints / data>

### PHASE B — ...
...

## STOP CONDITIONS — ask Renée, don't guess
- If <specific failure mode> → report back with details, don't improvise
- If <external system change> → halt, flag, wait

## DONE CRITERIA — how Console reports success
Append one line to `XpertVault/sprint/master-build-status.md` via API:
`- [YYYY-MM-DD HH:MM | Console] <what shipped> / <counts> / <blockers if any>`

Reply to Renée with: <specific facts — counts, URLs, remaining items>.

## RULES (must obey)
- <Tone: from claude-skills/message-tone.md — no "REPLY YES", no "Please be advised">
- <Safety: no messages to live contacts>
- <Compliance: FSRA/CASL/PIPEDA applicable?>
- <Scope: never X, always Y>
```

## The sign-off loop

Console MUST loop back with a status. If it ghosts, the handoff failed. Build in:
1. A specific deliverable ("table with columns X Y Z") or URL to report back
2. An append to `master-build-status.md` (or the intel endpoint if Console has it)
3. A structured "did / blocked / next" summary

If Renée has to chase Console for status, I failed to close the handoff loop.

## Anti-patterns (things I've done that broke this)

1. **"Console can handle this" with no prompt.** Lazy hand-wave. Never acceptable. Write the prompt.
2. **Prompt that references skill names without paths.** Console can't find them. Always full path or URL.
3. **Prompt with literal API keys.** Security breach. Always placeholder + separate cred pass.
4. **No success criteria.** Console doesn't know when to stop. Always "DONE when X".
5. **No STOP conditions.** Console improvises through failures. Always list failure modes that warrant a halt.
6. **Prompt not pushed to ghl-brain public repo.** Renée has to open a local file or copy-paste. Always push so the public raw URL works.
7. **Handoff without re-synced vault.** Console reads stale state. Always `sync-to-github.sh` right before handoff.

## When to use which surface

| Surface | When | How handoff works |
|---|---|---|
| Browser Console (claude.ai) | GHL UI, AI Studio, Build with AI, paid tool dashboards | Prompt URL → she pastes ONE line telling it to read the URL + execute |
| Claude Project (claude.ai persistent) | Long-running project where she'll open many times | Project instructions hardcode the README URL fetch |
| Mobile Claude | Quick checks, tasks while away from laptop | Same Project as desktop — mobile fetches same URL |
| Claude Code (this session) | Files, API, local dev, codebase | Do it directly |

## Integration with priority-planning skill

When priority-planning hits a **browser-required task**:
1. Don't stall. Run THIS handoff protocol.
2. Prep the prompt. Push to repo. Verify URL loads.
3. Hand Renée the ONE line to paste.
4. Move to the next priority item immediately.

Parallel Consoles = fine. Launch 3 at once if workload supports.

## Reviewing this skill

Every session that involves a handoff, ask:
- Did Console succeed without needing a follow-up from Renée? If not — what in the handoff was missing?
- Update this skill's anti-patterns list when a new failure mode appears.

**The skill gets sharper with every sprint.**
