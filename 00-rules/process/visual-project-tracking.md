# PROCESS — Visual Project Tracking (NON-SKIPPABLE)

**Rule established:** Renée 2026-05-13 — *"now that I can visually see what we are doing and what is involved with getting it done I feel better. Please always do this. Add it to the process folder that can't be skipped."*

---

## The rule

For ANY multi-phase work (3+ phases / spans more than one session / involves ≥3 categories of cleanup-and-build), Claude MUST:

1. **Create a Command Center project** via `POST https://xpert-command-center.vercel.app/api/projects` BEFORE starting execution
2. **Structure every phase as a step** with clear title (#. Action — outcome)
3. **Every step's notes must include:**
   - Current status (DONE / IN PROGRESS / PENDING / blocker)
   - Specific action required (decision needed from Renée, build to do, etc.)
   - **📁 RELATED folder paths** (XpertVault skill/agent folder, Drive doc, source spec)
   - **🔗 PROMPT link** if the step is GHL AI Build-with-AI executable
   - Cross-reference to related steps (e.g., "depends on step 4 calendar IDs")
4. **Update steps in real time** as phases complete (PATCH the project's steps array)
5. **Surface the project link in chat** so Renée can open it visually and confirm

## Why this is non-skippable

Renée's exact quote: *"now that I can visually see what we are doing and what is involved with getting it done I feel better."*

The PROBLEM this solves:
- TodoWrite is session-internal (dies when window closes)
- Memory rules are good but not graphical
- Renée flying blind on multi-week projects is the #1 failure pattern that brought Shay back
- Chat-only execution = nickel-and-dime back-and-forth on each phase

The SOLUTION this rule enforces:
- Persistent visible state ANY session can read
- Renée sees progress without asking
- Steps with embedded links = jump-to-action (no hunting for docs)
- Brain build improves because state is queryable + visible

## When this rule fires

ANY of these triggers it:
- Renée says "let's build X" where X has ≥3 phases
- A request spans more than one chat session
- A request involves ≥3 categories of work (e.g., customs + workflows + agents = 3)
- A snapshot, deploy, audit, rebuild, migration, or major refactor
- Multi-user / multi-stakeholder work

If unsure → DEFAULT TO CREATING A PROJECT. Cost is 1 minute of POST. Benefit is permanent visibility.

## Step-note format (mandatory)

Each step's `notes` field must include these blocks where applicable:

```
[Status line — what's done, what's pending, what decision is blocking]

📁 RELATED:
- XpertVault path: /06-skills/gill/skill.md (or wherever)
- Drive doc: <URL>
- Project source spec: /XpertVault/projects/<project>/<file>.md

🔗 PROMPT: <Drive doc URL with prompt section>

⚠️ DECISION NEEDED FROM RENÉE:
- Q1: <question>
- Q2: <question>
```

## Cross-reference

Related memory rules:
- `project_command_center_projects_endpoint.md` — the technical endpoint specs
- `feedback_read_process_md_first.md` — read process docs before starting work
- `feedback_invoke_skills_routinely.md` — load skill files routinely

This rule strengthens all three by making the multi-phase plan VISIBLE not just documented.

## How it relates to brain build

Command Center as visual state = the missing layer between:
- **Session memory** (TodoWrite — internal, forgotten)
- **File memory** (~/.claude/memory/ — persistent but text-only)
- **Brain build** (visible state any session reads via /api/projects)

The /api/projects endpoint becomes the "shared blackboard" for Renée + any Claude session + future automation runners (claude-runner, cron jobs, etc.). When the autonomous-runner gets built, it pulls /api/projects to know what's pending → executes → patches step done.

This rule plus the projects endpoint = the foundation for true overnight autonomy.

## Enforcement

If Claude starts a multi-phase task without creating a Command Center project first, the work is treated as incomplete regardless of execution quality. Renée can call this out by saying "where's the project?" and Claude must immediately create one before continuing.

Cross-instance scope:
- Claude Code desktop ✓
- Claude Code mobile ✓
- Console (when processing queued tasks) ✓
- Future autonomous runners ✓
