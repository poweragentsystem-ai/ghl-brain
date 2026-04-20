# ABC Company Snapshot — Project Folder

This folder contains everything a Claude (Console browser Claude or Claude Code) needs to work on the ABC Company generic GHL snapshot — the universal template that deploys to any new AI consulting client.

## FILES IN THIS FOLDER (read in this order)

1. **`CLAUDE-PROMPT.md`** — The full task brief. Paste into a new Console session or load into a Claude Project.
2. **`claude.md`** + **`context.md`** — How to behave on this project, what good looks like, what to avoid.
3. **`console-rules.md`** — Specific rules for any Console Claude working this project.
4. **`references.md`** — Existing items in the account (pipelines, calendars, forms, etc.) as they were last known.
5. **`ghl-master-list.md`** — Live list of all custom fields, custom values, and tags in ABC + EquityMax. Read BEFORE creating anything new. Never duplicate.

## ALSO READ (from elsewhere in the vault)

- `XpertVault/sprint/master-build-status.md` — overall sprint state
- `XpertVault/operating-system/claude-project-brief-ghl.md` — full GHL build spec

## WHAT THIS PROJECT DOES

Finish the ABC Company generic GHL snapshot: publish the 4 remaining draft workflows, build 4 humanized voice AI bots, delete the Agency Onboarding Form (which belongs in the Agency account, not ABC), and prepare for snapshot export. End state: one-click deployable sub-account that works for any service business niche.

## CRITICAL RULES

- ABC uses GENERIC tokens everywhere. No "Renée", "EquityMax", "mortgage", "GTA" — all through `{{custom_values.*}}`
- Voice bots go in a "Voice AI Bots" folder in AI Studio, separate from email/SMS agents
- Reply CTAs can be conversational ("reply with the days that work") — avoid robotic ("REPLY YES")
- Product tags use `{{custom_values.product__service_N}}` tokens, never hardcoded

## WHEN DONE

Append one line to `XpertVault/sprint/master-build-status.md` with what you accomplished.
