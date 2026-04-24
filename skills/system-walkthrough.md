# System Walkthrough Skill — Universal Logic Check

## PURPOSE
Before declaring ANY system done — GHL automations, apps, websites, onboarding flows, payment systems, integrations — walk through it as the actual user would. Every click, every path, every "what if." If something doesn't make sense logistically, it's not done.

---

## THE BUILD → TEST → VERIFY CYCLE (Emergent-style)

Before building anything, the agent must go through this cycle. Not at the end — DURING the build, at every step.

### PHASE 1: UNDERSTAND
- What is the product/service? Know it deeply — not surface level.
- Research examples of what this should look like in the real world. If building for a dental practice, look at how top dental practices run their funnels. If mortgage, know the full Canadian mortgage cycle.
- Why does the user want this? What's the end goal? What does success look like for their client?
- What tools/platforms does this niche typically use?

### PHASE 2: PLAN
- Map the entire system back-to-front: start at the desired result and work backwards to step 1
- List every component needed: forms, workflows, agents, pages, emails, voice scripts, tags, custom fields
- Identify what already exists (AUDIT FIRST) vs what needs to be built
- Plan the build order — typically backend/data first, then logic, then user-facing

### PHASE 3: BUILD + TEST EACH STEP
- Build ONE component at a time
- After each component: test it immediately. Does it do what it should?
- Check: does the data flow correctly? Does the tag fire? Does the email send? Does the form save to the right fields?
- If it fails: fix it NOW, not later. Never move to the next step with a broken one behind you.
- Use AI builders (Build with AI in GHL AI Studio, Build using AI in Automation) — don't manually build what AI can generate. Let AI do 80%, review and refine the 20%.

### PHASE 4: SCRUTINIZE
After each step passes its own test, scrutinize it:
- Does it make logical sense? Would a real person using this understand what's happening?
- Is the message tone human? (see message-tone.md)
- Are custom values used everywhere? Zero hardcoded info?
- Is it mobile-friendly?
- Did you test it properly? (not just "it didn't error" but "it actually did the right thing")
- Does it connect correctly to the previous step and the next step?

### PHASE 5: END-TO-END WALKTHROUGH
Only after all components pass individual tests, walk the entire system end-to-end using the 5 perspectives below.

## WHEN TO RUN THE FULL WALKTHROUGH
- Before launching ANY build (app, automation, website, form, funnel)
- Before snapshotting a GHL account
- Before showing a client
- After making changes to an existing system
- When Renée says "is this done?" — run this before answering yes

---

## THE WALKTHROUGH — 5 PERSPECTIVES

### 1. WALK AS THE END USER (the lead/client/customer)
Put yourself in their shoes. Start from zero — they've never seen this before.

- [ ] How do they find this? (ad, search, referral, direct link)
- [ ] First impression — does the landing page make sense in 3 seconds?
- [ ] Is the CTA obvious? Do they know what to click?
- [ ] Form — is it short enough? Do they know why each field is needed? Does it work on mobile?
- [ ] After form submit — what happens? Confirmation page? Email? SMS? Or nothing (dead end)?
- [ ] Booking — is the calendar link right? Does it show availability? Can they pick a time?
- [ ] Confirmation — did they get an email + SMS confirming? Is the info correct?
- [ ] Reminders — are they getting reminded at the right times? Not too many, not too few?
- [ ] Meeting — can they join? Is the link/phone number correct? What if they're late?
- [ ] After meeting — do they hear from the business? Or silence?
- [ ] Payment — is the link right? Does checkout work? Confirmation email?
- [ ] Onboarding — do they know what to do next? Is there a welcome sequence?
- [ ] Ongoing — are they getting value? Reviews requested? Referrals asked? Renewals tracked?
- [ ] Exit — if they want to leave, can they? Is opt-out respected? Data cleaned per privacy law?

### 2. WALK AS THE BUSINESS OWNER (the user of our system)
They just got the snapshot deployed. Can they actually use it?

- [ ] Onboarding form — does it collect everything needed to configure their account?
- [ ] Custom values — do they auto-populate from the onboarding form?
- [ ] Calendar — is it connected? Does booking work?
- [ ] Phone number — is it purchased and connected?
- [ ] Email — is the sending domain authenticated? SPF/DKIM/DMARC?
- [ ] Dashboard — can they see their leads, pipeline, revenue?
- [ ] Notifications — do they get alerted for hot leads, no-shows, complaints?
- [ ] Can they use the snippets easily? Are all links correct?
- [ ] Do they know how to turn automations on/off? Is voice AI toggleable independently?
- [ ] Reporting — can they see before/after metrics?
- [ ] Billing — is Stripe connected? Do invoices work?
- [ ] Support — if something breaks, what do they do?

### 3. WALK AS THE ADMIN (Renée / agency operator)
Deploying this to a new client. Does the process work?

- [ ] Snapshot export — does it include everything needed?
- [ ] Snapshot import — does it deploy cleanly to a new sub-account?
- [ ] Onboarding — does the form auto-configure the account?
- [ ] What manual steps remain after snapshot? (buy number, connect calendar, domain, socials)
- [ ] Are those manual steps documented clearly for the client?
- [ ] Can you onboard 10 clients using this same snapshot without custom work?
- [ ] Is there anything niche-specific that would break for a different business type?

### 4. WALK THE BUSINESS LOGIC (no money left on the table)

Technical functionality is not enough. The system must make BUSINESS sense.

- [ ] Is there a clear path through the workflow from start to finish for EACH product/service the business offers?
- [ ] Does where each lead ends up make sense based on the user's actual business needs? (not just our automation logic)
- [ ] Is every sales opportunity being captured? Every cross-sell? Every upsell? Every referral ask?
- [ ] Is client retention being actively managed? (renewals, check-ins, review requests, referral requests on schedule)
- [ ] When a lead says "no" or "can't afford it" — is the AI trained to professionally explore alternatives? ("Do you have access to other resources?", "Would a payment plan work?", "What if we started with just X?")
- [ ] When a lead says "not now" — are they going to nurture with a timed re-engagement, not just forgotten?
- [ ] Is every objection handled with a rebuttal? (not interested, too expensive, need to think, already have someone, just browsing)
- [ ] Are we asking enough qualifying questions upfront to route leads correctly — or are good leads falling through because we didn't ask?
- [ ] Is the business owner getting notified of HIGH-VALUE opportunities (commercial deals, large accounts, VIP referrals)?
- [ ] Could a competitor's system do something ours doesn't? What are we missing?

### 5. WALK EVERY NEGATIVE PATH
Things go wrong. Is the system prepared?

- [ ] User fills form wrong — does it validate? Error message clear?
- [ ] User abandons mid-form — is there a follow-up to bring them back?
- [ ] Email bounces — does the system know? Does it try another channel?
- [ ] SMS fails (wrong number) — is there a fallback?
- [ ] Voice call drops — callback attempted?
- [ ] User says "not interested" — DND set? Removed from sequences?
- [ ] User goes silent — nurture sequence kicks in?
- [ ] No-show — rebook attempts? Eventually nurture?
- [ ] Payment fails — retry? Notification to business owner?
- [ ] User complains — escalation path? Task created?
- [ ] Duplicate lead — merge? Dedup? Alert?
- [ ] Spam/scam — quarantined? DND all channels?
- [ ] API goes down — does the system degrade gracefully or crash?
- [ ] Integration disconnects — is someone notified?

### 6. WALK THE DATA FLOW
Where does data go at each step? Is anything lost?

- [ ] Lead enters → which pipeline? Which stage? Which tags?
- [ ] Form data → which custom fields? Are they correct (fields vs values)?
- [ ] Stage change → which automation fires? Does the old one stop?
- [ ] Tag added → which workflow triggers? Any conflicts with other tag triggers?
- [ ] Appointment booked → which calendar? Confirmation sent? Pipeline updated?
- [ ] Deal closed → custom fields updated? Revenue tracked? Stage moved?
- [ ] Data retention → what's kept? What's deleted? When? (PIPEDA compliance)

---

## RED FLAGS

If any of these are true, the system is not done:
- A user can reach a dead end where nothing happens next
- A stage exists with no automation attached to it
- Two automations can fire on the same lead at the same time (overlap)
- An automation fires but the previous one didn't stop (stacking)
- A message sounds robotic
- A form asks for too much too soon
- A page doesn't work on mobile
- An error state shows nothing useful
- A link points to a hardcoded URL instead of a custom value
- A business owner can't understand how to use it without calling you

---

## OUTPUT FORMAT

After running the walkthrough, produce:

```
SYSTEM WALKTHROUGH: [name]
DATE: [date]

PASSED:
- [list everything that works]

FAILED:
- [list everything broken, with specific fix needed]

GAPS:
- [list paths with no coverage — dead ends]

RECOMMENDATIONS:
- [list improvements that aren't broken but could be better]

VERDICT: READY / NOT READY
```

---

## WHO RUNS IT
- Quinn (QA) runs it on every build
- Jordan ensures it ran before anything ships
- Hawk audits that it was actually done (not just checkboxes ticked)
- Axel (Actuator) reviews the architecture decisions
- Anyone building anything should self-check with this before declaring done
