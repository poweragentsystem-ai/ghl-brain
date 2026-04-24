# Lead Journey Walkthrough Skill — Mandatory Before Any Workflow Ships

## PURPOSE
Walk every workflow, agent, and automation through EVERY real-world scenario — positive and negative — before declaring it done. If a real human would do something in that situation, the automation must handle it too.

---

## THE WALKTHROUGH — RUN THIS ON EVERY BUILD

### STEP 1: Map the Full Sales Cycle
Before checking anything, write out the complete journey:
- How does the lead enter? (form, call, ad, referral, walk-in, website, social)
- What's the first touchpoint? (SMS, email, call, voicemail, chat)
- What qualifies them? What disqualifies them?
- Where do they go if qualified? (stage, calendar, agent handoff)
- Where do they go if NOT qualified? (nurture, decline, DND)
- What happens after they book? (confirmation, reminder, prep)
- What happens after the appointment? (follow-up, proposal, close)
- What happens if they ghost? (no-show sequence, re-engagement)
- What happens after they close? (onboarding, review request, referral ask)
- What happens if they cancel/churn? (save sequence, exit survey)

### STEP 2: Positive Path Scenarios (everything goes right)
Walk through as the lead:
- [ ] Lead fills out form → correct tag applied?
- [ ] Custom fields populated correctly?
- [ ] Correct workflow fires?
- [ ] Lead enters correct pipeline stage?
- [ ] Correct calendar offered for booking?
- [ ] Confirmation SMS/email sent?
- [ ] Reminder sent at right intervals (24hr, 1hr)?
- [ ] Post-appointment follow-up fires?
- [ ] Qualified lead gets proposal/next step?
- [ ] Won/closed lead gets onboarding sequence?
- [ ] Google review request sent at right milestone?
- [ ] Referral request sent at right milestone?

### STEP 3: Negative Path Scenarios (things go wrong)
This is where most automations FAIL. Check every one:
- [ ] **Call dropped/disconnected** → does it attempt callback? Tag "call dropped"? Note what happened?
- [ ] **Lead hangs up on purpose** → different handling than accidental drop? DND check?
- [ ] **Voicemail** → leave a message? Schedule retry? How many retries before stopping?
- [ ] **No answer** → how many attempts? At what intervals? After final attempt?
- [ ] **Lead says "not interested"** → DND set? Removed from active sequences? Added to long-term nurture?
- [ ] **Lead says "call me later"** → task created? Reminder set? Follow-up scheduled?
- [ ] **Lead is spam/scam** → DND all channels? Tagged? Removed from pipeline?
- [ ] **Lead no-shows appointment** → how many reschedule attempts? What tone? When to stop?
- [ ] **Lead goes silent mid-conversation** → timeout handling? Follow-up sequence?
- [ ] **Lead asks question the bot can't answer** → escalation to human? Task created?
- [ ] **Lead is over-leveraged / unqualifiable** → polite decline? Nurture sequence? Stay in good books?
- [ ] **Lead asks for rates without application** → hold the line? Push for application?
- [ ] **Wrong product selected** → auto-correct? Route to right specialist?
- [ ] **Duplicate lead** → merge? Dedup? Alert?

### STEP 4: Automation Handoff Checks
- [ ] Does the current automation STOP when the lead moves to the next stage?
- [ ] Does the NEW automation START when the lead enters the new stage?
- [ ] Are there any gaps between automations where the lead sits in limbo?
- [ ] Are there any overlaps where TWO automations fire on the same lead?
- [ ] If a lead moves backward (reschedule, re-qualify), do the automations handle it?

### STEP 5: Business Logic — No Money Left on the Table
- [ ] Do we have lead capture from EVERY channel? Website, ads, social media DMs, comments, referrals, walk-ins? If any channel is missing automation, flag it.
- [ ] Social media: do we auto-reply to IG DMs, FB Messenger, TikTok comments? If not = money on the table.
- [ ] Smart CTA: are emails using the right CTA for the context? (Ad/campaign leads → "complete our 60-sec form first" before booking. Nurture leads → softer "reply if interested".)
- [ ] Is every sales opportunity being captured at each stage?
- [ ] Online leads are like sheep — they need constant guiding. If you lose the pulse, they go to a competitor. Keep close until they land in: CLIENT, NURTURE, or NOT INTERESTED.
- [ ] NOT INTERESTED is valuable data, not a loss. It tells us who NOT to spend time on. Getting ANY response is a win — we want to know which path they're going down.
- [ ] EVERY lead must end up somewhere: client (revenue), nurture (future revenue), or not interested (stop spending resources). No lead sits in limbo.

### STEP 5B: Trigger Coverage — Every Way a Lead Can Move
Every automation must fire from ALL three trigger types:
- [ ] **Tag added** (e.g., "no-show" tag)
- [ ] **Status changed** (e.g., appointment marked as no-show)
- [ ] **Pipeline stage moved** (e.g., lead dragged to No Show stage by user)

Users will drag-and-drop leads between stages manually. If the automation only triggers on a tag, the drag-and-drop gets missed and nothing fires. That's a silent failure — the lead sits in limbo and the user doesn't know.

Check EVERY workflow: does it fire if the user manually drags the lead into that stage? If not, add the pipeline stage trigger.

### STEP 5C: Automation Timing — Research-Based, Not Made Up
- [ ] Every timing decision (when to SMS, when to email, when to call) must be based on what actually converts in this niche — NOT arbitrary spacing
- [ ] General principle: hit ALL channels quickly while lead is warm (same day), then reduce frequency over days
- [ ] No-show: wait 1 hour after no-show status (gives them a chance to show up late), then hit all channels same day
- [ ] New lead: respond within 5 minutes. First hour is critical. Multi-channel on day 1.
- [ ] Follow-up: don't spread one message per week — cluster outreach then space out
- [ ] Before setting any timing: ask "what would a top-performing salesperson in this niche do?"
- [ ] When lead says "I can't afford it" → is AI trained to explore alternatives professionally? ("Would a payment plan work?", "What if we started smaller?", "Do you have access to other resources like equity, savings, or a co-signer?")
- [ ] When lead says "not now" → timed re-engagement, not permanent loss
- [ ] When lead says "just browsing" → still capture contact, add to nurture
- [ ] After service delivery → review request, referral request, upsell/cross-sell — all scheduled automatically
- [ ] When lead mentions someone else who might need help → referral capture triggered
- [ ] Is the business owner notified of high-value opportunities?
- [ ] For mortgage specifically: if not qualified for conventional, did we explore private? If private isn't viable, did we check equity? If timeline is flexible, did we suggest waiting and nurturing?

### STEP 6: Communication Quality (see message-tone.md for full rules)
- [ ] Read every SMS out loud — does it sound like a human texting or a robot? If robot, rewrite.
- [ ] Read every email — would a real person write this? No "Hello", no "We haven't heard back", no "reply YES/NO"
- [ ] Voice AI scripts — short turns, contractions, match caller energy, never read paragraphs
- [ ] Are messages short, human, professional? (Never long paragraphs — reads as AI)
- [ ] Are there basic rebuttals for common objections? If not, add generic ones until the user provides custom ones:
  - "I'm not interested" → warm acknowledgment + nurture
  - "How much does it cost?" → redirect to qualification/application
  - "I need to think about it" → set follow-up + value reminder
  - "Can you call me later?" → schedule callback + confirm time
  - "I already have someone" → respect + differentiate + nurture
  - "Send me more info" → send collateral + follow up in 24hr
- [ ] Does the bot know when to STOP talking and hand off to a human?
- [ ] Is there a "human review" stage for edge cases?

### STEP 6: Notification & Visibility
- [ ] Is Renée (or the business owner) notified when something important happens?
- [ ] Commercial/MLI Select/complex deals → special notification?
- [ ] Hot lead books → instant alert?
- [ ] Lead complaint or escalation → immediate flag?
- [ ] Are updates flowing to Command Center or wherever the owner checks?

### STEP 7: Edge Cases Specific to Voice AI
- [ ] Call dropped → attempt callback (if they didn't hang up on purpose)
- [ ] Call dropped → tag "call dropped" + internal note with what was discussed
- [ ] Background noise / can't understand → polite "I didn't catch that" + retry
- [ ] Lead speaks a different language → graceful handoff or language detection
- [ ] Call exceeds time limit → graceful wrap-up + schedule continuation
- [ ] Simultaneous calls → queue handling?

---

## WHEN TO RUN THIS

- **PLANNING PHASE — before building anything** — walk the scenarios on paper first so the build accounts for every path from the start, not patched after
- **DURING BUILD** — check each scenario as nodes are added, not at the end
- **Before publishing ANY agent or workflow** — final validation pass
- **Before exporting a snapshot** — walk the entire snapshot end-to-end
- **After editing an existing workflow** — re-walk the affected path
- **When Renée reports a gap** — find the gap, fix it, re-walk

## WHO RUNS IT

- Quinn (QA) owns the walkthrough execution
- Jordan ensures it ran before anything ships
- Hawk audits that Quinn actually did the walkthrough (not just checked boxes)

---

## THE RULE

**If a real human would do something in that situation, the automation must handle it too.**

A dropped call? A real person calls back. So must the bot.
A confused lead? A real person clarifies. So must the bot.
A rude lead? A real person stays professional. So must the bot.
No response after 3 days? A real person follows up. So must the bot.

If the automation doesn't handle it, it's not done.
