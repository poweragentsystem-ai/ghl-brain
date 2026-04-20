# EquityMax Snapshot — Project Folder

This folder contains everything a Claude (Console browser Claude or Claude Code) needs to work on the EquityMax GHL cleanup + mortgage snapshot build.

## FILES IN THIS FOLDER (read in this order)

1. **`CLAUDE-PROMPT.md`** — Paste this into a new Console session, OR give its content as the task to a Claude Project agent. This is the full task brief.
2. **`ghl-master-list.md`** — Live list of all custom fields, custom values, and tags in ABC + EquityMax. Read BEFORE creating anything new. Never duplicate.

## ALSO READ (from elsewhere in the vault)

- `XpertVault/sprint/master-build-status.md` — overall sprint state, cross-project status
- `XpertVault/operating-system/claude-project-brief-ghl.md` — full GHL build spec with Canadian mortgage context

## WHAT THIS PROJECT DOES

Audit and clean up the live EquityMax GHL account (Location ID `OBmMdqdnPLZvVyHloFly`). 92 workflows need to be triaged using Build with AI's "Explain this automation" method, then the useful ones get ported into AI Studio as proper AI agents. End state: clean mortgage snapshot ready to deploy to other Canadian mortgage professionals.

## CRITICAL RULES

- EquityMax is LIVE with real leads and clients — do NOT trigger workflows, send messages, or make calls
- Audit first, report to Renée, delete only after approval
- Use AI-voice-* / ai-chat-* tag convention (see ghl-master-list.md section on tag convention)
- Use `{{custom_values.product__service_N}}` tokens for product tags — never hardcode "refinance" etc.

## WHEN DONE

Append one line to `XpertVault/sprint/master-build-status.md` with what you accomplished.
