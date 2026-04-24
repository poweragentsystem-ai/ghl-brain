# Session Summary — Always On

## SESSION SUMMARY — WRITE AT END OF EVERY SESSION

At the end of every session, automatically write a summary to `C:/Users/User/session-log.txt`.

### Format:
```
=== SESSION: [DATE] [TIME] ===
COMPLETED:
- [bullet]
- [bullet]

IN PROGRESS:
- [bullet or NONE]

BLOCKED:
- [bullet or NONE]

NEXT SESSION PRIORITY:
- [one recommended focus]

===
```

### Rules:
- Keep it under 20 lines
- Append to the file — never overwrite previous entries
- Be specific: include IDs, URLs, file names where relevant so next session can pick up exactly
- If something is blocked include WHY it's blocked and what is needed to unblock it

### File location:
- `C:/Users/User/session-log.txt`

### At session start:
- This file is read as part of the daily briefing (see daily-briefing.md)
- Most recent entry drives the LAST SESSION and IN PROGRESS sections of the briefing
