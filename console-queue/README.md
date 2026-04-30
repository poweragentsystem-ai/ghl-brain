# Console Queue

**Tasks for Console Claude (the browser-driving surface).** Code Claude writes specs here when something needs browser hands — adding GitHub secrets, deleting GHL workflows, building voice bots in AI Studio, anything that's click-not-API.

## Protocol

```
console-queue/
  pending/   ← tasks waiting for Console to execute
  done/      ← completed tasks, with notes from Console on what happened
```

### When Code Claude finds work that needs browser:
1. Drop a numbered markdown spec in `pending/` (e.g. `002-delete-form-6.md`).
2. Note it in `sprint/open-requests.md` with the queue file path.
3. Hand Renée a one-liner she can paste into Console: *"Read ghl-brain/console-queue/pending/ and execute the lowest-numbered task."*

### When Console Claude executes:
1. Read everything in `pending/` (lowest number first).
2. Run the steps in the browser.
3. Move the file to `done/` with a timestamped result block at the bottom (what worked, what didn't, screenshots if useful).
4. If blocked on a credential or decision Renée needs to make, write the blocker into the file and stay in `pending/`.

### Spec file format

```markdown
# NNN — Task title

**Created:** YYYY-MM-DD by Code Claude
**Surface:** Console (browser)
**Estimated time:** X min

## Why
One sentence on why this needs to happen.

## Steps
1. Open <URL>
2. Click <button>
3. Paste <value> from <source>

## Expected outcome
What success looks like.

## Inputs needed from Renée
List anything Console will need to ask her for (API keys, choices, confirmations).
```

## Why this exists

So Code Claude can dispatch browser tasks instead of asking Renée to do them. Console reads this queue at session start. Renée's job is to start a Console session — not to be the project manager of all four Claudes.
