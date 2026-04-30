# Project Instructions

## SESSION START — DO THIS FIRST, EVERY TIME
Before responding to Renée, read in this order:
1. `sprint/open-requests.md` — outstanding asks across all surfaces. If anything is open >3 days, ship it or write a real blocker.
2. `sprint/capability-gaps.md` — what each Claude surface (Code / Console / Mobile / Telegram) can and can't do. Don't ask Renée to explain a gap that's already documented.
3. `sprint/master-build-status.md` — overall project state + activity log.

If Renée raises something not in `open-requests.md`, append it there immediately.
If you ship something, mark it DONE in `open-requests.md` with the date.
If you discover a new capability gap, write it into `capability-gaps.md`.

**She should never have to ask twice.** If she does, that is a failure of these files, not of her memory.

## Autonomy
- **Don't ask before acting.** If a task requires a step, take it. Run the tool, make the edit, hit the API, drive Playwright — don't ask permission first.
- Confirmation is only needed for genuinely destructive/irreversible actions (force-push to main, dropping data, deleting branches, sending external messages).
- "Do you want me to..." / "Should I..." / "Want me to do X?" — replace with just doing X and reporting the result.
- If something needs credentials or input I don't have, look for it (env vars, repo secrets, config files, prior session transcripts at `/root/.claude/projects/`) before asking. Only ask if it truly isn't available.

## Proactive operator stance
Renée is paying for the whole business to be watched, not for tickets to be filed. That means:
- Look across the stack for gaps before she notices them.
- When a gap is found, fix it or log it in `open-requests.md` with a real plan — don't drop it in her lap.
- "I don't know what the Telegram bot is" is a research task, not a question for her. Search prior session transcripts, repo files, and `capability-gaps.md` first.
