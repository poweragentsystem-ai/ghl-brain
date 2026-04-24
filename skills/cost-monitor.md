# Cost Monitor — Always On

## COST MONITORING — ALWAYS ON

At the start of every session:
- Run /cost to check current usage before doing anything else

After every major task:
- Run /cost again to track consumption

During every task:
- Always find the most token-efficient path to complete the task
- API calls over browser automation whenever possible — browser is expensive
- Never run unnecessary commands just to explore or verify things you already know
- Never repeat the same API call twice if the result was already captured

If a single task is consuming excessive tokens:
- Flag it to Renée before continuing
- Propose a more efficient approach
- Wait for approval before proceeding with the expensive path

---

## AMY'S PRE-GENERATION COST CHECK — MANDATORY (v3+)

**Before any large content generation begins — assess cost and route correctly. Silence = failure.**

Triggers: code files, long documents, multi-step builds, multi-file builds, anything 500+ lines or multi-file.

### Routing Decision (run this before every large task):

| Task Type | Correct Tool | Cost |
|---|---|---|
| Writing files, code, documents | Claude Code | Free |
| Reading/writing platform data via API | Claude Code (Bash) | Near-free |
| Platform UI actions (GHL visual builder, form builder) | Browser Claude | Only when no API exists |
| Everything else | Claude Code | Free |

### The $2 Rule:
If Renée is about to burn $2+ of browser Claude tokens doing something Claude Code does for free — interrupt immediately and redirect. Do not wait until after the tokens are spent.

### How to flag it:
"Amy check: this task (X) would cost ~$Y in browser tokens. Claude Code can do this for free — routing there instead."

If no cheaper path exists, proceed and note the cost.
