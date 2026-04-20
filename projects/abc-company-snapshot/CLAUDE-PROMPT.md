# CONSOLE 2 — ABC COMPANY SNAPSHOT FINISH + VOICE BOTS
### Paste this entire message into a second fresh Browser Claude (Console) session.
### Runs in parallel with Console 1 (different sub-account, no conflict).

---

You are working in **ABC Company** (Location ID: `AKbAtRra4m908e2w2Kbo`). This is the universal generic snapshot that will be deployed to new AI consulting clients. No real contacts — safe to build/test.

## CONTEXT — READ FIRST (in this order)
1. `XpertVault/sprint/master-build-status.md` — current sprint state
2. `XpertVault/sprint/ghl-master-list.md` — **the live list of all custom fields, custom values, and tags in ABC and EquityMax**. Before creating ANYTHING, check this first. Reuse what exists. Never duplicate.
3. `XpertVault/operating-system/claude-project-brief-ghl.md` — overall GHL build spec

**Rule:** If you add or modify a custom field / value / tag during this session, append it to the change log at the bottom of `ghl-master-list.md` with format: `- YYYY-MM-DD · Console-2 · ADDED <type>: <name> (<key>) — <reason>`

ABC is at 85%. 25 workflows in Automation → Workflows, 17 published, 8 drafts.

## THE END GOAL (do not forget this)

Everything should live in **AI Agents → Agent Studio** as AI-built agents, NOT in the old Automation → Workflows area. Old workflows are legacy. The snapshot target state is: every automation is an AI Studio agent built with Build with AI, human copy, custom-value-driven. Only pure tag/stage-mover micro-automations without messaging stay in old Workflows.

So: for every workflow in Automation → Workflows below, the default action is **COPY IT INTO AI STUDIO AS AN AGENT** using Build with AI. Audit first, report to Renée, then execute ports.

## YOUR JOB — 4 PHASES

### PHASE 1 — AUDIT OLD WORKFLOWS (same Build with AI method as EquityMax)

Open each workflow in Automation → Workflows. For each:

1. Click workflow → Build with AI → paste:
   > "Explain in detail step by step this automation and what it does. And if it is missing information."
2. Open every email node — check if copy sounds human or corporate. Flag for rewrite.
3. Check voice bot nodes — is an actual bot selected or empty?
4. Decide: PORT TO AI STUDIO (default) / RETIRE (duplicate of existing AI agent) / KEEP (pure infrastructure).

Record each to `XpertVault/sprint/abc-workflows-audit.md`:

| ID | Name | Status | Purpose | Email quality | Voice connected | Action |
|---|---|---|---|---|---|---|

Workflows:
```
b57186f8  6-Step Sales Follow-Up (draft)
63c5b881  Inbound Universal Handler (draft)
deaf6dbb  Long Term Nurture Sequence (draft)
a14cc290  No Show SMS Reminder Sequence (draft)
          Monthly Email Nurture Loop (draft)
          Monthly Nurture Email Sequence (published)
          Agency Client Onboarding Automation (draft)
          Webinar Workflow (draft)
          Type Of Service / Product Tag (draft)
          Copy - 2-Form Completed Next Steps... (draft)
          1. Business New Lead-Facebook & Google... (draft)
          Appointment Completion Follow-up (published)
          Appointment Confirmation + Reminder (published)
          Google Review Request Follow-Up (published)
          Long-Term Nurture SMS Sequence (published)
          Mark Spam - Set DND (published)
          New Client Onboarding Email Sequence (published)
          New Client SMS Onboarding Sequence (published)
          No Show SMS Reminder Sequence (published)
          Pending Review Notification & Task (published)
          Referral Request SMS Follow-Up (published)
          Service Type Tag and Pipeline Update (published)
          Tech Support To Do List Notifications (published)
          Tech support Form Completed Help Requested Notification (published)
          Universal Inbound Message Handler (published)
          Unqualified Contact Nurture (published)
          Unqualified Tag DND & Pipeline Remove (published)
```

### PHASE 1.5 — AUDIT AI STUDIO ABC (what already exists there)

Open **AI Agents → Agent Studio** in ABC. 10 agents are already there (General Business Automation folder or individual). Run the same Build with AI audit on each. Record to `XpertVault/sprint/abc-aistudio-audit.md`. Flag: clean / needs email rewrite / missing voice bot / hardcoded info.

### PHASE 2 — BUILD VOICE AI BOTS (GHL native — using Build with AI)

(These are separate from the workflow audit above. Voice bots go into a `Voice AI Bots` folder in AI Studio, kept distinct from email/SMS agents so Renée can toggle them independently.)


Go to **AI Agents → Agent Studio → Create New → Build with AI** and build these 4 voice bots. Save them into a folder called "Voice AI Bots" (create the folder if it doesn't exist).

**BOT 1: Inbound Voice Receptionist**
Prompt to paste into Build with AI:
> Build an inbound voice AI agent that answers incoming calls for {{custom_values.company_name}}, a {{custom_values.niche}} business. The agent sounds like a real human receptionist — warm, casual, helpful, zero robotic phrasing. No "press 1 for", no "greetings", no corporate formality. Use contractions. The agent: greets the caller by asking how they can help, detects intent (new lead, existing client, not interested, spam), qualifies the lead using {{custom_values.qualified_lead_details}} criteria, books into calendar {{custom_values.qualified_lead_booking_calendar}} if qualified, offers to take a message and notify {{custom_values.user_first_name}} if not qualified or unsure. Always has a rebuttal for objections: "just browsing", "too busy", "not interested yet". Never dead-ends — always offers a next step. If it can't handle the situation, tags `needs:human-review` and notifies the business owner.

**BOT 2: Outbound Follow-Up**
> Build an outbound voice AI agent that calls leads for {{custom_values.company_name}} who completed the pre-qualify form but didn't book. Tone: friendly, casual, like a real person calling. No scripts, no monotone. Opens with "Hey {{contact.first_name}}, it's {{custom_values.ai_agent_name}} from {{custom_values.company_name}} — quick call" — NOT "Hello, this is an automated call." Qualifies lead using {{custom_values.qualified_lead_details}}, books them into {{custom_values.qualified_lead_booking_calendar}}. Handles "not a good time" with a quick rebook offer. Never hard-sells. If voicemail, leaves a 10-second message max.

**BOT 3: No-Show Rebooker**
> Outbound voice AI that calls leads who no-showed a booked appointment. Tone: not accusatory, assumes they got busy. "Hey {{contact.first_name}} — we missed you at {{appointment.time}}, wanted to rebook you for another spot that works better." Offers 3 new time slots. Tags `no-show-rebooked` if successful, `no-show-final` after 2 failed attempts. Never makes the lead feel guilty.

**BOT 4: Qualification Transfer**
> Inbound bot that qualifies the caller fully, then warm-transfers to {{custom_values.transfer_number}} if qualified. Says: "You're a great fit — let me connect you to {{custom_values.user_first_name}} right now." Plays hold music or says one sentence of context, then transfers. Tags `call_transferred_success` or `call_transferred_failed`.

### PHASE 3 — PORT PLAN (after audit)

For every workflow flagged PORT TO AI STUDIO in Phase 1, draft the Build with AI prompt you would paste to rebuild it as an AI Studio agent. Save the drafts to `XpertVault/sprint/abc-port-prompts.md` — one per workflow. Renée reviews before you paste them into Build with AI.

Each prompt should include:
- What the agent does (trigger → steps → outcome)
- Which custom values to use ({{custom_values.user_first_name}}, {{custom_values.niche}}, etc.)
- Which tags to apply and pipeline stages to move leads through
- Tone rules: human, conversational, no robotic "Reply YES/NO", good reply CTAs like "Reply back with the days that work for you"
- Any voice bot that should be connected

### PHASE 4 — CLEANUP

After Renée approves the ports and they're live in AI Studio:
- Delete form `jJ86LL2pW7lqVWVXXCT2` (Agency Onboarding Form — belongs in Agency account, not ABC)
- Delete `YNtnV9wjknDd1FkxOVT7` (Form 6) if inspection confirms it's unused
- Retire the old workflows once their AI Studio replacements are verified working

### SUCCESS CRITERIA

- Every old workflow audited with Build with AI
- AI Studio agents audited for email quality + voice connection
- Port plan drafted for every workflow targeted for migration
- 4 voice bots built (humanized) in Voice AI Bots folder
- Agency Onboarding Form deleted
- ABC ready for snapshot export once ports are complete

### WHEN DONE

Append to `XpertVault/sprint/master-build-status.md`:
```
- [YYYY-MM-DD HH:MM | Console-2] ABC audit complete. X workflows to port, Y to retire, Z to keep as infrastructure. Voice bots built. Port prompts saved for review.
```
