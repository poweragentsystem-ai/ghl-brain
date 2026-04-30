# OPEN REQUESTS — what Renée has asked for that isn't done yet

**Every Claude (Code, Console, Mobile, Telegram) reads this file at session start.**
**Every Claude appends here when Renée makes a request that won't be resolved in-session.**
**Every Claude marks DONE (with date) when it actually ships — and only then.**

If an item has been open more than 3 days, the next Claude that sees it
escalates: ship it, or write a 1-line blocker explaining what is needed.

Format: `- [STATUS] YYYY-MM-DD | surface-asked-on | request | owner | last-touched`

STATUS values:
- `OPEN` — nothing built yet
- `WIP` — in progress, has movement
- `BLOCKED` — needs Renée or external input (state what is needed)
- `DONE` — shipped + verified, keep for 7 days then archive

---

## OPEN

- [DONE] 2026-04-30 | code | Telegram bot can't extract Instagram videos — gap closed via tools/video-intel (yt-dlp pipeline). NEEDS WIRING into actual Telegram bot runtime — see BLOCKED below. | Code | 2026-04-30
- [BLOCKED] 2026-04-30 | code | Wire video-intel into Telegram bot runtime. Blocker: location of Telegram bot code is unknown to Code Claude — is it Anthropic-hosted Claude in Telegram (no code access) or a custom bot? Renée to clarify, or any Claude with that context appends here. | Renée | 2026-04-30
- [OPEN] 2026-04-30 | code | Cross-surface communication: Mobile / Telegram / Console / Code Claudes don't share memory. Renée has had to repeat asks. Audit layer being built now (this file + capability-gaps.md). | Code | 2026-04-30
- [OPEN] ~2026-04-20 | code | Command Center scroll blank bug (page goes white below fold) — sticky-sidebar / grid layout issue, multiple attempts, root cause not nailed | Code | 2026-04-21
- [OPEN] ~2026-04-20 | code | Jordan API on Vercel — needs serverless function path; Express still in the way | Code | 2026-04-21
- [OPEN] ~2026-04-20 | code | Easy-Deploy source NOT pushed to GitHub repo — deployed via Vercel CLI only. Next session must commit + push. | Code | 2026-04-20
- [OPEN] ~2026-04-21 | code | Agency landing page form → GHL webhook wiring (currently logs to console only — wait, actually shipped 04-21 04:30. Mark DONE if confirmed.) | Code | 2026-04-21

---

## DONE (last 7 days — auto-archive after)

- [DONE] 2026-04-21 | code | Agency lead capture serverless function /api/submit-lead → GHL ABC contact (end-to-end tested) | Code | 2026-04-21
- [DONE] 2026-04-20 | code | Easy-Deploy purple-theme bug fix + navy+gold rebrand + Vercel deploy | Code | 2026-04-20
- [DONE] 2026-04-20 | code | EquityMax website FSRA fix ("broker" wording removed from hero, "bruised credit" removed from pre-approval) | Code | 2026-04-20

---

## RULES

1. **Append-only.** Don't delete; mark DONE.
2. **One line per request.** Detail goes in linked spec files.
3. **If you see an item open >3 days and you can ship it, ship it.** Don't ask.
4. **If you can't ship it, write the blocker.** "Need API key" / "Need design choice from Renée X" / "Need access to Y repo."
5. **Renée should never have to ask twice.** If she does, that's a failure of this list, not of her memory.
