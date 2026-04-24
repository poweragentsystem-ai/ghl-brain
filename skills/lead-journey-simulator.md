# Lead Journey Simulator — Mandatory Pre-Launch Review

## LEAD JOURNEY SIMULATOR — MANDATORY PRE-LAUNCH REVIEW

Run this before any workflow, funnel, automation, or agent goes live. Run this before any snapshot is exported. No exceptions.

Walk through every scenario below step by step. Confirm every touchpoint is covered with no gaps before issuing a GO verdict.

---

## SIMULATE THESE EXACT JOURNEYS

### 1. QUALIFIED LEAD — INBOUND
A lead finds the business, fills out the form or calls in. They answer all questions correctly and are fully qualified.

Confirm:
- [ ] Voice AI answers if they call in
- [ ] AI introduces itself correctly with business name and purpose
- [ ] Prequalification questions are asked in the right order
- [ ] Lead is tagged: Qualified + Appointment Booked
- [ ] Pipeline stage updated to: Booked
- [ ] Appointment Confirmation sent immediately after booking
- [ ] Reminder sequence fires before appointment
- [ ] If lead shows up → pipeline moves to Won or next stage
- [ ] Google Review request fires after service/close
- [ ] No duplicate messages sent at any point

---

### 2. QUALIFIED LEAD — OUTBOUND
A lead is contacted via outbound call or message. They engage and qualify.

Confirm:
- [ ] Outbound sequence initiates correctly from the right trigger
- [ ] Lead engages and passes qualification
- [ ] Handoff to human flagged if needed
- [ ] Tags applied: Qualified, Appointment Booked
- [ ] Pipeline stage updated: Booked
- [ ] Confirmation and reminder sequences fire
- [ ] No double-messaging between outbound sequence and other active workflows

---

### 3. UNQUALIFIED LEAD
A lead comes in but does not meet qualification criteria (wrong budget, wrong business type, not a decision maker, etc.).

Confirm:
- [ ] Lead is tagged: Unqualified
- [ ] Pipeline stage updated: Not Qualified
- [ ] DND is NOT set (unqualified ≠ opt-out — they may qualify later)
- [ ] Lead is enrolled in Long Term Nurture Sequence
- [ ] No aggressive follow-up sequences continue firing
- [ ] Nurture content is generic enough to remain relevant over time
- [ ] There is a path back in when they re-engage or qualify later

---

### 4. NOT READY — NURTURE
A lead is interested but not ready now ("call me in 3 months", "budget next quarter", etc.).

Confirm:
- [ ] Lead is tagged: Not Ready
- [ ] Pipeline stage updated: Nurture
- [ ] Enrolled in Long Term Nurture Sequence
- [ ] Nurture content has a clear CTA in each message
- [ ] Referral request fires after 90 days in nurture
- [ ] There is a re-entry trigger if they respond or book at any point
- [ ] Sequence does not spam — spacing between messages is appropriate
- [ ] End of nurture sequence is defined — lead doesn't just fall off

---

### 5. STOP — OPT OUT
A lead replies STOP, NOT INTERESTED, REMOVE ME, UNSUBSCRIBE, or any variation.

Confirm:
- [ ] DND is set immediately — no delay
- [ ] All active sequences stop immediately
- [ ] Tag applied: DND or Opt-Out
- [ ] Pipeline stage updated: DND / Lost
- [ ] No further SMS, email, or call attempts ever
- [ ] GHL SMS STOP keyword auto-DND is active
- [ ] Manual opt-out variations also trigger DND (NOT INTERESTED, REMOVE ME, etc.)
- [ ] CASL compliant: unsubscribe is honoured immediately, no re-opt-in attempts without consent
- [ ] CRTC compliant: DNC list respected, no re-contact after opt-out

---

### 6. INBOUND CALL — VOICE AI
A lead calls the business phone number directly.

Confirm:
- [ ] Voice AI picks up (not voicemail, not missed)
- [ ] AI introduces itself with correct business name and purpose
- [ ] AI can answer FAQs about the business (services, pricing, process)
- [ ] AI can book an appointment end-to-end without human help
- [ ] AI handles common objections (too busy, not sure yet, need to think)
- [ ] AI escalates to human if situation is outside its scope
- [ ] Call is logged in GHL contact record
- [ ] Contact record is created or updated after the call
- [ ] Tags and pipeline stage are updated based on call outcome
- [ ] If appointment booked on call → Confirmation + Reminder sequences fire

---

### 7. MISSED CALL
A lead calls but the voice AI or human misses it.

Confirm:
- [ ] Missed call SMS fires immediately (within 1 minute)
- [ ] SMS message introduces the business and offers to help
- [ ] A follow-up call attempt is scheduled
- [ ] Lead does not fall through the cracks if they don't respond to SMS
- [ ] Re-engagement sequence kicks in after defined number of days with no response
- [ ] Contact record is created even if call was missed

---

### 8. LEAD GOES SILENT
A lead engages initially (responds to first message, fills out form, etc.) then stops responding.

Confirm:
- [ ] Re-engagement sequence triggers after defined number of days (confirm what that number is)
- [ ] Re-engagement has a defined number of attempts before ending
- [ ] Sequence has a clear end point — does not run forever
- [ ] After sequence ends with no response: lead moves to Long Term Nurture
- [ ] After Long Term Nurture ends with no response: lead is tagged Inactive or closed out
- [ ] No point in the sequence where the lead is in limbo with nothing firing

---

### 9. SPAM OR FAKE LEAD
A lead submits fake information or displays spam behavior (gibberish name, fake phone, bot-like responses).

Confirm:
- [ ] Spam detection triggers (Spam AI Agent)
- [ ] DND is set immediately
- [ ] Tag applied: Spam
- [ ] Lead is moved out of active pipeline
- [ ] No sequences fire after spam tag is set
- [ ] No outbound messages are ever sent to a spam contact
- [ ] Real leads are not caught by spam detection accidentally

---

### 10. HUMAN REVIEW NEEDED
A lead comes in but the AI cannot handle their situation (complex question, legal issue, upset client, escalation request, etc.).

Confirm:
- [ ] Tag applied: Human Review Needed (or equivalent)
- [ ] Notification sent to Renée (or assigned team member) immediately
- [ ] Lead placed in correct pipeline stage: Pending Human Review
- [ ] AI stops messaging the lead while awaiting human
- [ ] There is a defined SLA — how long before human must respond?
- [ ] If human does not respond within SLA — escalation or reminder fires
- [ ] After human handles it — lead re-enters the correct automation path

---

## AFTER SIMULATING ALL JOURNEYS

### GAPS REPORT
List any touchpoints that have no automation, no response, or no coverage. A gap is any moment where a lead could be left waiting with nothing happening.

### CONFLICTS REPORT
List any scenarios where two automations could fire simultaneously and send duplicate or contradictory messages to the same lead.

### COMPLIANCE REPORT
Flag anything that could violate:
- **CASL** — commercial electronic messages require express or implied consent
- **PIPEDA** — personal information must be collected, used, and stored with consent
- **CRTC** — telemarketing rules, DNC list compliance, calling hour restrictions (8am–9pm local time)
- **FSRA** — if mortgage or financial services content is involved

### VERDICT

**GO** — All 10 journeys confirmed, no gaps, no conflicts, no compliance risks. Clear to launch.

**NO GO** — Issues found. List every item that must be fixed before launch. Do not export snapshot or go live until all NO GO items are resolved.

---

## NOTES
- Always test using Renée's contact only: phone 4168784622 / email renee.ross@gmail.com
- Never trigger real lead sequences during testing
- Document the simulation results so Quinn can sign off on the pre-launch checklist
