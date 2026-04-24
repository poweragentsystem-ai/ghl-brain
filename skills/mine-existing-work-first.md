---
name: Mine Existing Work First
description: Before writing any AI prompt, email template, workflow, or copy for Renée — find and read what she's already built. Her tested versions win unless she explicitly said she hates them.
type: skill
version: 1.0
updated: 2026-04-21
---

# Mine Existing Work First

## The rule
Before I write anything that already exists in some form, I **read hers first**. She has a year of real testing, industry knowledge, and user feedback baked into her prompts, scripts, emails, and workflows. My blank-page version starts with LESS context than hers.

## When this applies
- AI agent prompts (voice + chat)
- Email templates
- SMS templates
- Workflow logic
- Website copy
- Proposal / quote text
- Any script or automation that interacts with leads

## Process (run before writing anything in those categories)

### Step 1 — find what she has
Check in this order, stop when found:
1. **GHL AI Studio agents** — existing prompts live inside each agent (browser: AI Studio → click agent → prompt field). Ask Console to extract via "explain this automation" if I can't reach directly.
2. **GHL custom values** — search for `ai_prompt_*`, `welcome_*`, `nurture_*` keys with `curl` + API.
3. **GHL workflow email/SMS nodes** — the text lives inside workflow action nodes. Console can list via "explain this workflow."
4. **Google Drive** (`poweragentsystem@gmail.com`) — she has a folder/doc with tested prompts. Ask her for the folder name if unclear, or search via Drive MCP for keywords like "voice AI prompt", "mortgage bot", "welcome email."
5. **XpertVault** — check `claude-memory/`, `operating-system/`, `projects/` for past saved prompts.
6. **Previous Claude Code sessions** — check daily session logs for her pasted prompts.

### Step 2 — compare before writing
- Read her version end to end.
- Note what works: tone patterns, specific phrasing that flows, objection rebuttals she's tested, closing CTAs that convert.
- Note what's outdated (AI tech improvements, new products, compliance changes).
- Note gaps (missing tokens, not conversion-optimized, too long).

### Step 3 — improve, don't replace
- Keep her winning patterns (tone, closing lines, objection handling).
- Layer in upgrades (tokenization, new structure, missing coverage).
- Her voice > my voice unless she's explicitly told me otherwise.

### Step 4 — flag if something's wrong
If her prompt has actual errors (hardcoded names not in tokens, broken logic, outdated products) — don't silently "fix." Flag: *"I see X in your current prompt — was that intentional or should I update it?"* Get her answer.

## What "better" looks like (the upgrade goal)
- Same tested tone + objection handling
- Fully tokenized (`{{custom_values.*}}` + `{{contact.*}}`)
- Aligned with current playbook (AI-voice/chat attribution, 10-min stage delays, etc.)
- Leaner where possible (cut filler, keep the proven lines)
- Consistent structure across all prompts in the set

## Anti-patterns to avoid
1. **Blank page syndrome** — starting from scratch when she has tested material. I did this tonight on the AI prompts. Wasted her year of testing.
2. **Silent replacement** — overwriting her work without telling her, so she can't correct if I missed something.
3. **Generic upgrades** — "I made it more modern" ≠ better. Specific improvements only, each justified.
4. **Ignoring her phrasing** — if she says "the bots answer good with THIS line," that line goes in mine verbatim.

## Integration with other skills
- **`push-back-when-needed.md`** — if I can't find her previous version, STOP and ask where it is before writing.
- **`console-handoff.md`** — when Console builds agents, the handoff prompt must include "read Renée's existing prompts first" instruction.
- **`priority-planning.md`** — mining-first adds 5-15 min per prompt. Bake it into the time estimate.

## The cost of not doing this
- Rewriting prompts loses a year of conversion tuning.
- Renée has to re-test everything we ship.
- She has to correct me mid-sprint instead of shipping.
- She loses trust that I'm actually leveraging her domain expertise.

The cost of doing this: 10 minutes per prompt, once. Worth it every time.
