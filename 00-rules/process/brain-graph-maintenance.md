# PROCESS — Brain Graph Maintenance (NON-SKIPPABLE, ALL CLAUDES)

**Rule established:** Renée 2026-05-13 — *"so are you setting it up to always update the brain? did you add that to your process so you never forget? not just you but Console too."*

**Applies to:** Claude Code · Console · Mobile · Future autonomous runners. All instances.

---

## The rule

Every time you create or significantly update any of these artifacts, the brain MUST be updated:

| Artifact created/updated | Must include |
|---|---|
| New Command Center project | 7-dim `relatesTo` block (audience / domain_expert / function / capabilities / style / compliance / tech + related_projects + related_memory_rules + related_skills_and_agents) |
| New memory rule (`/memory/*.md`) | Frontmatter `tags` array with relevant dimensions |
| New skill file (`/XpertVault/06-skills/*/skill.md`) | Frontmatter `tags` + `related_to` |
| New agent file (`/XpertVault/04-agents/*/skill.md`) | Frontmatter `tags` + `related_to` |
| New process file (`/XpertVault/00-rules/process/*.md`) | Tags + cross-references |
| Significant edit to Renée's profile | Re-validate the `relatesTo` block at top of profile.md is current |

**No tags = the artifact doesn't exist in the brain graph.** The graph aggregator literally can't surface it. So if you skip tagging, you've created an orphan that will never link to anything.

## The 7-dimension tagging standard

Every artifact uses this YAML/frontmatter shape:

```yaml
tags:
  audience: [who this is for]
  domain_expert: who built/owns this
  function: [what it does in the business]
  capabilities: [tech/AI involved]
  style: [tone/personality attributes]
  compliance: [regulations that apply]
  tech: [platforms used]
related_to:
  projects: [project IDs from Command Center]
  memory_rules: [filenames in /memory/]
  skills: [paths to /XpertVault/06-skills/]
  agents: [paths to /XpertVault/04-agents/]
```

Skip dimensions that don't apply. Don't fake them.

## Cross-instance enforcement

### Claude Code
- This rule lives in `/XpertVault/00-rules/process/` and `/00-rules/CLAUDE.md` references it
- Every new file save triggers a mental check: did I tag it?
- If a multi-phase project is created without a `relatesTo` block, Hawk fails the response

### Console
- Renée's standard Console save-instruction footer (currently appends master-build-status.md + session-log.md) should ALSO include: "If you created/edited a memory rule, skill, agent, or project, add the 7-dim tags + related_to block. See `/XpertVault/00-rules/process/brain-graph-maintenance.md`."
- This rule reference goes into `/00-rules/cross-claude-task-bus.md` so every Console session reads it

### Mobile
- Same rule. Mobile typically creates fewer artifacts but when it does, same standard.

### Future autonomous runners
- The `/api/claude-runner` endpoint (when built) reads `/api/brain-graph` to know what's pending. Runners must update tags after completing work.

## What triggers a re-aggregation of the brain graph

When built, the `/api/brain-graph` endpoint re-aggregates on:
1. Scheduled poll (every 30 min) — picks up new files added since last poll
2. Manual refresh button on Brain page
3. POST to `/api/brain-graph?refresh=1` from any process that creates new artifacts

Until the endpoint is built, the tags accumulate in their files passively — ready for retrieval whenever the brain page goes live.

## Renée as central node — special rule

Renée's profile (`/XpertVault/01-renee/profile.md`) is the canonical source for her node. Treat it as:
- The LARGEST node in the graph (max weight)
- Auto-connects to: every project where she's the domain_expert, every memory rule that references her preferences, every skill file that mentions her style
- NEVER let her node weight drop (she is always the central operator)

If a graph view ever shows another node bigger than Renée, the aggregator has a bug — Renée's weight is by definition equal to or greater than the sum of her connected nodes' top-level weight.

## Anti-patterns banned

- ❌ Creating a project without `relatesTo` ("I'll add tags later" — no, you won't)
- ❌ Saving a memory rule with only `name / description / type` frontmatter (incomplete)
- ❌ Tagging in inconsistent dimensions ("audience" in one file, "users" in another — pick one)
- ❌ Console session that creates a workflow/agent/template without flagging which dimensions it touches

## Backfill plan for existing artifacts

There are existing memory rules and skill files WITHOUT the 7-dim tags. They still work, but they're orphans in the graph.

**Backfill triggers:**
1. When the brain graph aggregator is first built, it runs a one-time scan + flags untagged artifacts
2. Renée can request backfill on a category ("tag all memory rules" / "tag all skills")
3. Whenever an existing artifact is edited substantively, add the tags as part of the edit

**Priority for backfill:** files referenced by active projects > files referenced by the snapshot prep work > everything else.

## Sources

- Parent rule: `feedback_bidirectional_relationship_graph.md` (memory)
- Parent rule: `feedback_visual_project_tracking_mandatory.md` (memory)
- Profile source: `/XpertVault/01-renee/profile.md`
- Brain graph project: `p_mp2w5fbv_4fr0` (Brain Knowledge Graph)

## Enforcement audit

Once the brain graph is live, the dashboard should show:
- Total artifacts: X
- Tagged: Y
- Untagged orphans: Z
- Renée node weight: W

If untagged orphans > 10% of total artifacts, the brain build is degrading. Backfill triggered automatically.
