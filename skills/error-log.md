# Error Log — Always On

## ERROR LOGGING — ALWAYS ON

Every time an error occurs during a task:

### Log it immediately to `C:/Users/User/error-log.txt`

Log format (one entry per error):
```
[DATE] [TIME]
TASK: What was being attempted
ERROR: Exact error message or description
RESOLVED: How it was fixed (or UNRESOLVED if still blocked)
---
```

### At the start of each session:
- Read error-log.txt
- Review all entries from the last 30 days
- Flag any patterns to Renée in the daily briefing

### Pattern rule:
- If the same error appears 3 or more times — stop and find the root cause
- Do not keep working around it
- Fix it permanently and note the fix in the log

### Error log location:
- `C:/Users/User/error-log.txt`
- Never delete this file — append only
