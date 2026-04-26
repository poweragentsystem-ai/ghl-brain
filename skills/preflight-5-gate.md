# Pre-Flight 5-Gate — MANDATORY before every task

**Status:** LIVE as of 2026-04-25. Approved by Renée. Cannot be skipped.

This skill runs at the **start of every new task**, no exceptions, including small ones. The gates take ~30 seconds total. The cost of skipping is hours of drift.

---

## Gate 1 — Memory Sweep

Search `C:\Users\User\.claude\projects\C--Users-User\memory\` for any feedback, project, or reference memory matching the task domain.

Use `Grep` or `Glob` against the memory directory. Look for:
- Domain keywords (GHL, mortgage, EquityMax, ABC, Easy Deploy, etc.)
- Pattern keywords (rename, delete, audit, sweep, build, deploy)
- Agent names (Gill, Morgan, Connor, etc.)

If any match, READ the matching memory file before proceeding. Memory tells me what Renée has already taught me about this domain.

**This catches:** EquityMax.ca-style misses (intent already documented, I just didn't read).

---

## Gate 2 — Skill File Read

Per CLAUDE.md (the global instructions), every task type has a relevant agent skill file at `C:\Users\User\claude-skills\`.

If the task touches:
- GHL → read `gill.md`
- Mortgage → read `morgan-mortgage.md`
- FSRA / mortgage advertising → read `fsra-mortgage-advertising-compliance.md`
- n8n → read `norm.md`
- Voice AI → read `vick.md`
- Marketing → read `mark.md`
- Email → read `eve.md`
- Compliance → read `connor.md`
- Sales process → read `sam.md`
- Strategy → read `brian.md`
- (etc. — see CLAUDE.md skill matrix)

For multi-domain tasks, read all relevant skill files.

**This catches:** Acting without domain context.

---

## Gate 3 — Ranked Plan

State plan as **P0 / P1 / P2** — not a flat list.

| Tier | What it means |
|---|---|
| **P0** | Decision-blocking. Can't proceed without Renée's call. Max 2-3 questions. |
| **P1** | Important but I can default if I have to. Lead with my best guess + flag for override. |
| **P2** | Stylistic / cosmetic / cleanup. I decide. Don't bother Renée. |

Bad: "I have 7 questions for you" (overwhelms, no priority signal).
Good: "P0: 2 questions that need your call. P1: I'll default to X unless you say otherwise. P2: I'll handle."

**This catches:** Asking too many questions, in wrong order, with no priority.

---

## Gate 4 — Confirm Before Destroy

Before any action that:
- Renames a populated field, file, or config
- Deletes a record, contact, workflow, or file Renée could have set with intent
- Overwrites an env var, API key, or credential
- Force-pushes, resets, or reverts work
- Modifies a CLAUDE.md or skill file's IMMUTABLE section

… pause and ask one sentence: "About to change X to Y because Z — confirm?"

If the action is reversible AND in my own scratch space → don't bother her, just do it.
If the action touches HER data (GHL, vault, config) → always confirm.

**This catches:** The CV rename incident. EquityMax.ca → EquityMax was destructive (overwrote her intentional value). Should have stopped.

---

## Gate 5 — End-of-Task Audit

After the task completes, append to `C:\Users\User\Documents\XpertVault\daily\process-audit.md`:

```
## [YYYY-MM-DD HH:MM] — [task subject]

- Gate 1 (memory): ran / skipped / partial — [memories read]
- Gate 2 (skill files): ran / skipped / partial — [files read]
- Gate 3 (ranked plan): ran / skipped — [P0 count, P1 count, P2 count]
- Gate 4 (confirm): triggered? / no destructive ops
- Gate 5 (this entry): always

DRIFT: [where did I deviate from the plan? was it justified?]
LESSON: [what would tighten this next time?]
```

Hawk reads this log daily as part of his learning-warden duties.

**This catches:** The same drift repeating across tasks because I never look back.

---

## When this skill BLOCKS execution

If Gate 1 surfaces a memory that says "do not do X" and I'm about to do X → STOP. Tell Renée: "Memory says X is forbidden because Y. Should I override or pivot?"

If Gate 4 confirms I'm about to do something destructive AND Renée hasn't authorized → STOP. Confirm.

Otherwise the gates are non-blocking — they're context, not friction.

---

## What this skill does NOT do

- It doesn't slow down trivial work (small file edits, reads, lookups). Gate 1 is fast (one Grep). Gate 2 only fires for domain-touching tasks.
- It doesn't override Renée's explicit instructions. If she says "just do X, no questions," gates 3 and 4 stand down — but gate 1 (memory) still runs silently.
- It doesn't replace existing always-on skills (cost-monitor, version-control, proactive, etc.) — it sequences them at task start.

---

**Cost of running:** ~30 seconds per task, plus a few hundred tokens for the memory sweep. Cheaper than one drift-correction.

**Owner:** Self. Hawk audits the audit log for compliance.
