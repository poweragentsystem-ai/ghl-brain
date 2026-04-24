# TOKEN EFFICIENCY RULES
### Xpert Web Solutions Inc. — Claude Usage Protocol
**Version:** 1.0 | **Owner:** Renée Ross | **Enforced by:** Amy (Accountant) + Jordan (COO)

---

## WHY THIS EXISTS

Every token spent in browser Claude costs money. Every task that could run in Claude Code but runs in browser Claude instead is waste. This file defines how Renée's team uses Claude tools so that sessions are short, focused, and nothing gets repeated unnecessarily.

---

## RULE 1 — ALL CODE TASKS GO TO CLAUDE CODE

**Never write, edit, debug, or refactor code in browser Claude.**

Claude Code is free for code tasks. Browser Claude charges per token. If it touches a file, it goes to Claude Code.

| Task | Where it goes |
|---|---|
| Writing or editing any .jsx, .js, .ts, .css, .json file | Claude Code |
| Debugging errors, fixing bugs, patching components | Claude Code |
| Building React components, dashboards, landing pages | Claude Code |
| Running npm, vercel, node, or any CLI command | Claude Code |
| Reading or searching files | Claude Code |
| Writing skill files, memory files, CLAUDE.md updates | Claude Code |
| API integrations, webhook code, automation scripts | Claude Code |
| Anything that produces output that gets saved to disk | Claude Code |

**If you catch yourself pasting code into browser Claude to fix it — stop. Switch to Claude Code.**

---

## RULE 2 — BROWSER CLAUDE HANDLES PLATFORM ACTIONS, AGENT MANAGEMENT, AND STRATEGY ONLY

Browser Claude is for things that require judgment, platform access, or strategic thinking — not file editing.

| Task | Where it goes |
|---|---|
| Managing agents on platform.claude.com | Browser Claude |
| GHL workflow logic, AI Studio agent prompting | Browser Claude |
| Strategy decisions, offer design, positioning | Browser Claude |
| Reviewing copy, messaging, or brand direction | Browser Claude |
| Talking through business decisions with Jordan | Browser Claude |
| Research, competitor analysis, market intel | Browser Claude |
| n8n workflow logic (not the code — the logic) | Browser Claude |
| Reading meeting notes, summarizing transcripts | Browser Claude |

**Browser Claude does not write files. It makes decisions and hands off to Claude Code.**

---

## RULE 3 — KEEP CONVERSATIONS SHORT

Long back-and-forth debugging sessions in browser Claude are expensive and slow. The rule:

- **One clear ask per message.** Don't chain 5 questions into one message and expect a clean answer.
- **No iterative debugging in browser Claude.** If the first fix doesn't work, move it to Claude Code.
- **Cap debugging rounds at 2.** If something isn't fixed after 2 exchanges, hand it to Claude Code with full context.
- **Front-load context.** State the problem, the file, the error, and what you've already tried — in the first message. Don't drip-feed information across 10 messages.
- **No "what do you think?" conversations about code.** Those belong in Claude Code where the file can be read directly.

---

## RULE 4 — AMY FLAGS TOKEN WASTE BEFORE IT HAPPENS

Amy's job: **before any large generation begins, assess whether browser Claude is the right tool.**

Amy speaks up immediately if:
- A browser Claude session is about to write or edit code
- A debugging loop has gone past 2 rounds and Claude Code could take over
- A task involves generating large amounts of content that will be saved to files (skill files, PRDs, docs)
- The same context is being re-explained for the third time in a session

**Amy's flag format:**
> ⚠️ TOKEN CHECK: This task (describe task) should go to Claude Code. Estimated token cost if done here: HIGH/MEDIUM. Recommend: hand off to Claude Code with this prompt: [suggested handoff prompt].

Amy does not stay silent. Silence when tokens are being wasted is failure.

---

## RULE 5 — USE CLAUDE PROJECTS TO STORE CONTEXT

Never re-explain the business at the start of a session. That's wasted tokens every time.

**What goes in Claude Projects:**
- This file (token-efficiency.md)
- CLAUDE.md (the full operating manual)
- MCP Master Brief (business context, agents, tech stack)
- Agent skill files (as needed per session focus)
- Any active build specs or PRDs for the current sprint

**How to use it:**
- Upload updated context files to the Project at the start of any new sprint or major change
- Reference the Project at the start of each session instead of re-typing context
- When a file changes significantly (CLAUDE.md, a skill file), re-upload it to the Project

**What does NOT go in Projects:**
- Conversation logs (too long, too noisy)
- Old build specs for finished projects
- Duplicate versions of the same file

---

## RULE 6 — COMPRESS CONVERSATION HISTORY REGULARLY

Long conversations drift. Old context confuses new answers. Stale messages waste tokens on irrelevant context.

**Compression rules:**
- If a conversation has gone past 20 exchanges, summarize and restart
- At the start of each new session, Claude Code writes a session summary to session-log.txt — this replaces the need to scroll back
- When context is compacted by Claude automatically, verify that the summary includes: current task status, files changed, decisions made, and next steps
- Do not rely on conversation memory across sessions — write it to disk (Claude Code) or to the Project (browser Claude)

**Compression prompt to use when needed:**
> "Summarize this conversation into: (1) what we built, (2) what files changed, (3) what decisions were made, (4) what's next. Then we'll start fresh."

---

## QUICK REFERENCE — WHICH CLAUDE DOES WHAT

```
BROWSER CLAUDE                    CLAUDE CODE
─────────────────                 ──────────────────────
Strategy & decisions              All file reads & writes
Agent management                  All code tasks
Platform actions (GHL, n8n)       CLI commands (npm, vercel)
Copy review & approval            Debugging & bug fixes
Business conversations            Memory & skill file updates
Research & analysis               Building dashboards & UIs
Short, high-judgment tasks        Anything saved to disk
```

---

## ENFORCEMENT

- Jordan enforces Rules 1 and 2 at the start of every session
- Amy enforces Rule 4 before any large generation
- Renée enforces Rule 3 by keeping her own messages concise
- This file is reviewed and updated at the start of each new sprint

---

*Last updated: April 2026 | Upload this file to Claude Projects as a reference doc*
