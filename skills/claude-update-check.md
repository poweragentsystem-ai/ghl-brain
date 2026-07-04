# Claude Update Check — the self-refreshing Claude/Anthropic knowledge engine

> **Purpose:** Anthropic ships Claude / Claude Code / API features faster than any single session's awareness. Renée's worry (2026-06-10): "if I don't see the email, will there be key info I missed that you're not going to utilize?" This engine makes sure I catch and ACTUALLY USE new Claude capabilities, not just know about them. Mirror of `ghl-update-check.md`.

---

## When this runs
1. **Session-start staleness gate** — `session-start.md` Step 7.6 checks `~/.claude/state/claude-last-checked.md`. If `last_checked` >7 days ago, run this before responding (silent unless something changes how I should work, then surface it).
2. **On demand** — Renée says "check Claude updates / what's new in Claude / Anthropic updates."
3. **When I hit a wall** a new feature might solve (e.g., "I wish I could schedule X" → check if Claude now can).

## The procedure
1. **Read baseline** — `~/.claude/state/claude-last-checked.md` (known-feature list + last date).
2. **Authoritative first: load the `claude-api` skill** (Skill tool) — it carries the current model table, params, tools, Managed Agents, caching, etc., cached recently. This is the trusted source; web blogs are leads to verify, not facts.
3. **Pull recent sources** (WebSearch + WebFetch):
   - `https://code.claude.com/docs/en/changelog` (Claude Code)
   - `https://platform.claude.com/docs/en/release-notes/overview` (API/platform)
   - `https://support.claude.com/en/articles/12138966-release-notes` (Claude apps)
   - WebSearch: `Claude Code changelog <month year>`, `Anthropic release notes <month year>`
   - ⚠️ Model-name discipline: a blog claiming a new model that the `claude-api` skill / `models.md` doesn't list = UNVERIFIED. Do not act on it or quote it as real. Anthropic's own docs win. (e.g. a 2026-06 search claimed "Fable 5 / Mythos" — not in authoritative sources → ignored.)
4. **Diff vs baseline** — only deltas matter.
5. **Classify by "does this change how I WORK FOR Renée?":**
   - 🟢 **ADOPT** — a tool/feature/model that improves how I build, research, automate, or verify for her → start using it + note where.
   - 🟡 **WATCH** — useful later.
   - ⚪ **IGNORE** — dev-API plumbing irrelevant to our use.
6. **Update where I operate** — if a new Claude Code capability (skill/subagent/hook/MCP/Workflow/scheduled-agent/model/effort setting) changes the right way to do a recurring task, update the relevant runbook / skill / CLAUDE.md note so future sessions use it. (MIGRATION DISCIPLINE — additive; note what changed.)
7. **Write outputs** — brief → `XpertVault/12-daily/claude-updates/<YYYY-MM-DD>-claude-update-brief.md` (plain English: what's new, what I'll START doing differently, what I changed). Surface 🟢 ADOPT items to Renée.
8. **Stamp** — bump `last_checked`, append new features to baseline.

## Guardrails
- ❌ Never quote a model name/limit/price without the `claude-api` skill or Anthropic docs confirming it.
- ❌ Never treat a blog's "new model/feature" as real if authoritative sources don't list it.
- ✅ The deliverable is ADOPTION, not awareness — every 🟢 item must land as a concrete change to how I work, or a logged reason it can't yet.

## Cross-references
- `claude-api` skill — the authoritative Claude/API reference (load it first every run)
- `ghl-update-check.md` — the sibling engine for GHL
- memory `stay-current-on-claude` — the rule this operationalizes
- `session-start.md` Step 7.6 — the gate that fires this
