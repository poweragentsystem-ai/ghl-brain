# Console Handoff — Channel Killswitches + "Currently In Workflow" Tag Enforcement

**Source:** Renée, 2026-04-22. Two cross-cutting architectural rules that apply to EVERY workflow in both ABC + EquityMax.

This handoff covers three things:
1. **Channel killswitches** — ability to silence voice AI / SMS / email / all-outreach independently without deleting anything
2. **"Currently in workflow" tag enforcement** — every workflow adds this tag on entry, removes on exit, so we always know who's active
3. **Canonical updates** — apply these to voice AI workflows + existing workflows during this pass

Claude Code has already created the killswitch custom values via API (both subs). Your job: wire them into every relevant workflow.

---

## PART 1 — CHANNEL KILLSWITCHES (Axel's isolation pattern)

### Custom Values created (Claude Code did this via API)

Both ABC + EquityMax now have these CVs, all defaulted to `"yes"`:

| CV key | Purpose | When to toggle to "no" |
|---|---|---|
| `voice_ai_enabled` | Silence all voice AI calls (inbound + outbound bots) | Voice provider outage, billing issue, compliance audit, rate-limit trouble |
| `sms_enabled` | Silence all SMS | CRTC issue, A2P registration problem, quiet hours breach, deliverability drop |
| `email_enabled` | Silence all email sends | Domain blacklist, CASL complaint, DMARC failure |
| `all_outreach_enabled` | Master panic stop — kills EVERYTHING | Full system pause (e.g., client emergency, data breach) |

### The pattern to add to every workflow (per channel)

**Voice AI workflows** — add this as the FIRST action step:

```
IF custom_value.voice_ai_enabled != "yes"
   → End Workflow (with internal note: "Exited — voice AI killswitch ON")
ELSE
   → Continue to next step
```

Also check the master:
```
IF custom_value.all_outreach_enabled != "yes"
   → End Workflow (with internal note: "Exited — master killswitch ON")
```

**SMS workflows** — add at first SMS-sending step:
```
IF custom_value.sms_enabled != "yes" OR custom_value.all_outreach_enabled != "yes"
   → Skip SMS action (but continue workflow)
```

**Email workflows** — add at first email-sending step:
```
IF custom_value.email_enabled != "yes" OR custom_value.all_outreach_enabled != "yes"
   → Skip email action (but continue workflow)
```

### Create two killswitch-toggle workflows

**CANONICAL NAMING (Renée, 2026-04-23):** Use `Master Voice AI Shut Off` as the display name for the disable workflow. Same naming convention across both subs.

**Workflow A: "Master Voice AI Shut Off"** (rename existing ABC draft `KILLSWITCH — Disable Voice AI` → `Master Voice AI Shut Off`)
- Trigger: Manual (fired by clicking "Run Workflow" on a contact) OR by tagging any contact with `admin-disable-voice-ai`
- Action 1: Update custom value `voice_ai_enabled` → `"no"`
- Action 2: Send internal notification email to owner: "Voice AI has been DISABLED. SMS + Email still active. Re-enable with 'Master Voice AI Turn On' workflow."
- Action 3: Create task: "Re-enable voice AI when resolved"

**Workflow B: "Master Voice AI Turn On"** (rename existing ABC draft `KILLSWITCH — Enable Voice AI` → `Master Voice AI Turn On`)
- Trigger: Same manual pattern OR tag `admin-enable-voice-ai`
- Action 1: Update custom value `voice_ai_enabled` → `"yes"`
- Action 2: Send internal notification: "Voice AI RE-ENABLED."

**Repeat the same pattern for SMS, Email, and All-Outreach:**
- "Master SMS Shut Off" / "Master SMS Turn On"
- "Master Email Shut Off" / "Master Email Turn On"
- "Master All Outreach Shut Off" / "Master All Outreach Turn On"

**EqM status (2026-04-23 API pull):** no killswitch workflows exist yet. Build the full 8-workflow set in EqM using the same naming.

**ABC status (2026-04-23 API pull):** 2 draft workflows present (`KILLSWITCH — Disable Voice AI`, `KILLSWITCH — Enable Voice AI`). Rename in browser + build the remaining 6 (SMS pair, Email pair, All Outreach pair).

### Universal precondition ON ACTIONS (not just workflow start)

Actions that SEND (SMS, Email, Voice Call) need the conditional baked in even on workflows that already passed the top check — a workflow might run for hours, and the switch could flip mid-run. Wrap every sending action in the `_enabled` check.

---

## PART 2 — "CURRENTLY IN WORKFLOW" TAG ENFORCEMENT

### The rule (Renée, 2026-04-22)

**Every lead who is actively running through a workflow MUST have the `lead currently in workflow` tag.** It comes OFF when they exit (completion, drop-off, moved to a different workflow).

Same rule for `old lead currently in workflow` on resurrection/nurture workflows.

### Why it matters

- Instantly answers "is this contact already being worked?" (prevents double-conversations)
- Blocks cold outreach from re-engaging an already-active lead
- Shows in dashboards as an operational metric (active workflow load)
- Enables other workflows to filter "only target contacts NOT currently in a workflow"

### The pattern to add to EVERY non-killswitch workflow

**First action after trigger:**
```
Add tag "lead currently in workflow" (or "old lead currently in workflow" for resurrection flows)
```

**Final action before End Workflow (every exit path):**
```
Remove tag "lead currently in workflow"
```

**Every branch that ends the workflow** (not-qualified exit, DND exit, completed exit, timeout exit) MUST remove the tag before terminating. Otherwise stale tags accumulate.

### Which tag for which workflow type

| Workflow type | Tag |
|---|---|
| New lead intake, qualify, book, follow-up | `lead currently in workflow` |
| Appointment confirmation, reminder | `lead currently in workflow` |
| Application/document chase | `lead currently in workflow` |
| No-show rebook | `lead currently in workflow` |
| Long-term nurture (gone silent 30+ days) | `old lead currently in workflow` |
| Old lead resurrection (90+ days) | `old lead currently in workflow` |
| Renewal countdown (mortgage-specific, 120/90/60/30/14-day) | `lead currently in workflow` |
| Internal utility (killswitches, admin workflows) | NO tag — utilities don't count as lead engagement |
| Post-close onboarding | `lead currently in workflow` |

### Audit across all workflows (scope)

- ABC has 25 workflows
- EquityMax has 96 workflows

For each one:
1. Open in Workflow builder
2. Click "Build using AI"
3. Paste: *"Audit this workflow. Confirm the FIRST action adds tag `lead currently in workflow` (or `old lead currently in workflow` for resurrection/nurture flows). Confirm EVERY exit path (end workflow, goal reached, timeout, branch end) removes the tag. If any are missing, add them. Then explain what you changed."*
4. Review the diff, save DRAFT (do NOT publish)
5. Log to master-build-status with the count of additions

---

## PART 3 — VOICE AI WORKFLOW RETROFIT

While you're auditing workflows for the tag enforcement, add the Voice AI killswitch check to every voice AI workflow. These are the known voice workflows (verify in UI):

- Any workflow in the "Voice AI Bots" folder (EquityMax has this folder — currently empty, but populate as built)
- Any workflow with an "AI Voice Call" action
- Any workflow triggered by an inbound call

For each voice workflow, add BEFORE the voice-call action:
```
IF custom_value.voice_ai_enabled != "yes" OR custom_value.all_outreach_enabled != "yes"
   → End Workflow (with internal note: "Voice AI killswitch active — call not placed")
```

---

## PROCESS — USE BUILD WITH AI FOR EVERY WORKFLOW

Don't manually drag nodes. For each of the 121 total workflows:

1. Open workflow → Build using AI
2. Paste the combined audit prompt:

```
Audit and update this workflow with two rules:

RULE 1 — LIFECYCLE TAGS:
- FIRST action must add the tag "lead currently in workflow" 
  (use "old lead currently in workflow" for resurrection/nurture flows only)
- EVERY exit path must remove the tag before End Workflow

RULE 2 — CHANNEL KILLSWITCHES:
- Before any SMS-sending action: check `{{custom_values.sms_enabled}} = "yes"` AND `{{custom_values.all_outreach_enabled}} = "yes"`
- Before any Email-sending action: check `{{custom_values.email_enabled}} = "yes"` AND `{{custom_values.all_outreach_enabled}} = "yes"`
- Before any AI Voice Call action: check `{{custom_values.voice_ai_enabled}} = "yes"` AND `{{custom_values.all_outreach_enabled}} = "yes"`
- If any check fails, skip the action but continue workflow (don't end)

Then explain what you added and list every change.
```

3. Save as DRAFT only — do NOT publish
4. Append to master-build-status:  
   `- [YYYY-MM-DD HH:MM | Console] Retrofit workflow "[name]" with killswitch + lifecycle tag pattern. N actions added.`

After all workflows are done, Claude Code runs a functional verification pass and flags anything missing.

---

## FORWARD-WALK (Axel)

### Killswitch design
- **Success:** voice_ai_enabled flipped to "no" → all voice workflows exit at first check → no calls fire → SMS + email still working. Business owner can pause voice for hours/days without losing SMS or email momentum. ✓
- **Failure:** CV update fails → retry. Or: admin forgot to flip it back on → internal task reminds them. ✓
- **Multiplicity:** can disable multiple channels simultaneously (voice + SMS) without touching email. ✓
- **Handoff:** when re-enabled, pending workflows resume naturally (they were blocked at the check, not terminated). Most will have timed out or retry triggers will fire them again. ⚠️ GAP: long-paused contacts may sit in a workflow until retry — Quinn should QA that re-enable doesn't cause flood.

### Currently-in-workflow tag
- **Success:** every active lead = tagged. Every inactive lead = untagged. Cold outreach filters on NOT-tagged. ✓
- **Failure:** workflow crashes mid-run without reaching the "remove tag" action → stale tag stays on. Blocks future engagement. ⚠️ GAP: need a weekly cleanup workflow that removes the tag from contacts who haven't had activity in 48 hours (as safety net).
- **Multiplicity:** contact in TWO workflows simultaneously (e.g., pre-qualify + appointment reminder) → tag only added once (GHL dedups), but removal from ONE workflow removes it even though they're still in the OTHER. ⚠️ GAP: consider counter-based tagging (`workflow-count: N`) instead of on/off.
- **Handoff:** tag is a shared resource across all workflows. If any workflow violates the rule, it pollutes for everyone.

### Recommended safety net

Create a workflow **"Utility — Cleanup Stale Workflow Tags"**:
- Runs daily at 3 AM
- Searches contacts with `lead currently in workflow` AND no activity in past 48 hours
- Removes the tag + adds internal note "Stale workflow tag cleaned up"
- Prevents the pollution failure mode

---

## DO NOT

- ❌ Do not publish any workflow changes. Save as draft only.
- ❌ Do not manually rebuild workflows — use Build with AI for all changes
- ❌ Do not skip any of the 121 workflows — ALL need the retrofit
- ❌ Do not touch AI agent prompts in AI Studio in this pass — separate Console handoff covers that
- ❌ Do not send any test messages. Renée's test contact only.

## AFTER YOU FINISH

Append one line to master-build-status.md with total workflow retrofit count. Claude Code will fire a test contact through one of each workflow type for verification.
