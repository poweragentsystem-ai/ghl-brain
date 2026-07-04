# One-time paste: make Console / Claude app auto-read the brain

**Where to paste (once):** claude.ai → your Project (e.g. the Xpert project Console uses) → **Project instructions** (Settings/Customize). Every new chat in that project then auto-follows it — no more typing the URL.

**Paste exactly this:**

---
At the start of EVERY conversation, before responding, fetch and read:
https://raw.githubusercontent.com/poweragentsystem-ai/ghl-brain/main/BRAIN-INDEX.md
That file is the live current-state brain for Xpert Web Solutions (current builds, blockers, owners). If the task needs standing rules or agent ownership, also fetch MEMORY-INDEX.md and PROCEDURES.md from the same location (same URL, swap the filename).
To leave a note for Claude Code, POST to https://xpert-command-center.vercel.app/api/intel with body {"note":"CLAUDE-NOTE: ..."}.
Never message real leads/contacts; test contact is Renée only. Canadian compliance (CASL/PIPEDA/FSRA) always. Refer to agents as AgentName (Title).
---

**Notes:**
- For the **Claude mobile/desktop app** outside a Project: tell Claude once "remember to always fetch [the URL] at the start of our chats" — app memory usually carries it, but the Project instructions route is the reliable one.
- For **dispatch/cloud Claude Code sessions**: no paste needed — sessions opened on the `ghl-brain` repo auto-read `CLAUDE.md` → `BRAIN-INDEX.md` (already live).
- This PC: automatic (session-start step 0 + hooks).
