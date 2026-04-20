# Email Humanization + Recruitment Form — Project Folder

This folder contains everything a Claude (Console browser Claude or Claude Code) needs to work on humanizing email/SMS copy across ABC and EquityMax, plus wiring the recruitment form.

## FILES IN THIS FOLDER (read in this order)

1. **`CLAUDE-PROMPT.md`** — The full task brief. Paste into a new Console session or load into a Claude Project.
2. **`ghl-master-list.md`** — Live list of all custom fields, custom values, and tags in ABC + EquityMax. Use existing tokens in your rewrites. Do not invent new tokens without checking first.

## ALSO READ (from elsewhere in the vault)

- `XpertVault/sprint/master-build-status.md` — overall sprint state
- Message tone rules embedded in `CLAUDE-PROMPT.md`

## WHAT THIS PROJECT DOES

Three things:
1. Humanize every email template in ABC and EquityMax — remove corporate "Hello [Name]," / "Please be advised" / robotic "REPLY YES" phrasing. Keep good reply CTAs like "reply with the days that work."
2. Delete the 10 US mortgage email templates (Canadian snapshot only).
3. Wire the recruitment form using the 17 recruitment custom fields already created in ABC — 5 contact fields, 2 dropdowns, 2 short-answer, plus pre-existing candidate fields.

## CRITICAL RULES

- Marketing/nurture emails need prominent unsubscribe footer (CASL compliance). Transactional emails can have minimal or no unsubscribe.
- Image HTML templates = marketing = needs prominent unsubscribe. Plain-text conversational emails = subtle footer unsubscribe.
- No hardcoded "Renée", "EquityMax", "GTA" — all `{{custom_values.*}}`

## WHEN DONE

Append one line to `XpertVault/sprint/master-build-status.md` with what you accomplished.
