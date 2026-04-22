# Forward-Walk Gap Report — EquityMax AI Agents

Run by Axel (Actuator) on 2026-04-22 per the expanded trigger (audit time, not just pre-launch). Covers all 11 known AI agents in EquityMax AI Studio. For each agent, the 4 forward-walk questions — Success path / Failure path / Multiplicity / Handoff — and every GAP that surfaces.

**How to use:** walk each agent below. Any GAP is a missing workflow, missing notification, missing data track, or missing follow-up. After Renée decides yes/no/defer on each, the gaps become Phase 3 build items (before the snapshot exports).

---

## 1. Inbound Everything

**What it does (assumed):** Catches every inbound contact path that doesn't fit a more specific bot. Generic greeter + triage + route.

**Success path — they reach a human / book / get answer → THEN WHAT?**
- ✓ Normal: moves to "New Lead" + triggers prequalify chat
- ⚠️ GAP: If the inbound is a returning client (not a new lead), does it route differently? Or does it lump them in with new leads?
- ⚠️ GAP: If they ask about a specific product (commercial, private, wholesale), is there a sub-route to the right specialist?

**Failure path — can't identify, rude, spam, wrong number → THEN WHAT?**
- ✓ Spam → handed to Spam agent
- ⚠️ GAP: Wrong number / misdial — does it politely disengage and tag `wrong-number-do-not-contact`?
- ⚠️ GAP: Lead too confused / bot can't understand — does it escalate to human with a task?

**Multiplicity — same lead inbounds twice in a day → THEN WHAT?**
- ⚠️ GAP: Is there a dedup check? Or do they get two separate conversations?

**Handoff — who takes over?**
- Should hand to: Prequalify & Book (new leads) / Follow Up (existing) / Not Interested / Spam
- ⚠️ GAP: Is there an "Appointment Already Booked" handoff? If they call and already have a consult scheduled, the bot should NOT try to re-book.

---

## 2. Follow Up Automation

**Success path — lead responds → THEN WHAT?**
- ⚠️ GAP: Does response move them out of follow-up and back into an active qualification flow? Or do they stay in follow-up?
- ⚠️ GAP: If they respond "book me," does it auto-route to booking, or does it just tag and wait?

**Failure path — lead ghosts after N attempts → THEN WHAT?**
- ⚠️ GAP: What's N? After 3 attempts? 5? Then does it go to long-term nurture or does it die?
- ⚠️ GAP: Does a no-response after follow-up ever trigger a notification to the business owner ("lost opportunity")? Or is it silent?

**Multiplicity — lead is in follow-up for multiple concerns (refi + renewal overlap) → THEN WHAT?**
- ⚠️ GAP: Does the bot know which concern it's following up on? Or does it send a generic "still there?" message that ignores context?

**Handoff — who takes over?**
- If qualified → back to prequalify + book
- If not interested → Not Interested agent
- If silent forever → long-term nurture
- ⚠️ GAP: Handoff to Renée / human for high-value / commercial leads?

---

## 3. Renewal

**Success path — renewal client agrees to re-apply → THEN WHAT?**
- ⚠️ GAP: Does it automatically pull their existing mortgage details or does it re-ask everything?
- ⚠️ GAP: Does it trigger a lender rate-shopping task for Renée?

**Failure path — renewal client renews with current lender (lost) → THEN WHAT?**
- ⚠️ GAP: Is there a "lost to current lender" tag + reason capture?
- ⚠️ GAP: Do they get removed from renewal countdown OR stay in a post-lost nurture for the NEXT renewal cycle (5 years out)?
- ⚠️ GAP: Does Renée get notified so she can manually reach out before accepting loss?

**Multiplicity — client has two properties up for renewal at different times → THEN WHAT?**
- ⚠️ GAP: Is this tracked per property or per contact? If per contact, two renewals collide. Needs an opportunity or deal record per property.

**Handoff — who takes over?**
- Success → Application + Document agents
- ⚠️ GAP: Is the handoff to Scarlette / application portal automatic with pre-filled data, or do they start from scratch?

---

## 4. Not Interested

**Success path — they confirm not interested → THEN WHAT?**
- ✓ DND set on all channels
- ⚠️ GAP: Is there a reason captured? (too expensive / wrong timing / already has solution / don't like us) — needed for future nurture decisions
- ⚠️ GAP: Timed re-engagement after 30/90/180 days? Or permanent pause?

**Failure path — they weren't actually not interested, just frustrated → THEN WHAT?**
- ⚠️ GAP: Is there a "sorry, I changed my mind" recovery path if they reach back out?
- ⚠️ GAP: If DND is set too aggressively, legitimate re-engagement is blocked. Do we have a "soft DND" vs "hard DND" distinction?

**Multiplicity — "not interested" for THIS product but maybe interested in another → THEN WHAT?**
- ⚠️ GAP: Is "not interested" product-specific or blanket? A lead who says no to refi might still want HELOC.

**Handoff — who takes over?**
- → long-term nurture (if soft) or permanent pause (if hard)
- ⚠️ GAP: No notification to Renée if a high-value deal is lost?

---

## 5. Spam

**Success path — correctly identified spam → THEN WHAT?**
- ✓ DND all channels, tagged spam, removed from pipeline
- ⚠️ GAP: Is spam data deleted or retained? (PIPEDA — retention policy)

**Failure path — legitimate lead mistakenly flagged as spam → THEN WHAT?**
- ⚠️ GAP: Is there a Renée-reviewable "suspected spam" queue, or does it go straight to hard-delete?
- ⚠️ GAP: If a spam-flagged contact reaches out later and is legit, is there a recovery path?

**Multiplicity — repeat spammer → THEN WHAT?**
- ⚠️ GAP: Is there a blocklist at the phone number / email level that catches repeat attempts before they even enter the pipeline?

**Handoff — none needed, terminal state.**

---

## 6. Documents Reminder (mortgage-specific)

**Success path — docs received → THEN WHAT?**
- ⚠️ GAP: Does the workflow detect that docs have been uploaded? Via Scarlette webhook? Manual tag from Renée? If manual, there's a delay window where reminders keep firing.
- ⚠️ GAP: Once all docs received, does it tag `docs-complete` and move to underwriting stage?

**Failure path — lead stalls on docs → THEN WHAT?**
- ⚠️ GAP: What's the max number of reminders before escalating to a human call?
- ⚠️ GAP: If a lead never submits, do they fall out of the pipeline silently, or get moved to "stalled application" for Renée review?

**Multiplicity — lead has multiple applications in flight (primary + investment property) → THEN WHAT?**
- ⚠️ GAP: Docs needed per application, not per contact. Current model likely lumps them.

**Handoff — who takes over?**
- Docs complete → application processing / underwriting
- Docs abandoned → nurture or stalled bucket
- ⚠️ GAP: Is there a handoff to Cheryl (OLS underwriter)?

---

## 7. Application Reminder (mortgage-specific)

**Success path — application complete → THEN WHAT?**
- ⚠️ GAP: Confirmation to lead + notification to Renée?
- ⚠️ GAP: Moves to lender submission stage?

**Failure path — lead abandons application halfway → THEN WHAT?**
- ⚠️ GAP: Partial save? Resume link? Or start over?
- ⚠️ GAP: How many reminders before declaring them stalled?

**Multiplicity — same issue as Documents (multiple applications per contact)**
- ⚠️ GAP.

**Handoff — who takes over?**
- Complete → Documents Reminder (request missing docs)
- Abandoned → Follow Up (gentler tone)

---

## 8. Appointment Confirmation & Reminder

**Success path — they confirm + attend → THEN WHAT?**
- ⚠️ GAP: Post-appointment follow-up triggered? (this is where most conversions happen)
- ⚠️ GAP: Outcome-tagging — did they say yes? No? Need more info?

**Failure path — no-show → THEN WHAT?**
- Hands to No Show Rebook logic
- ⚠️ GAP: Hard rule — max 2 rebook attempts before long-term nurture?
- ⚠️ GAP: Is Renée notified of no-shows so she can call personally if high-value?

**Multiplicity — lead books then reschedules → THEN WHAT?**
- ⚠️ GAP: Does the old reminder cancel? Or does the lead get confused reminders for both the old + new time?

**Handoff — who takes over?**
- Attended → Follow Up or close sequence
- No-show → No Show agent
- ⚠️ GAP: If they reschedule through the calendar link, does the system see it?

---

## 9. New Lead Prequalify & Book

**This is the flagship bot. Most scrutiny here.**

**Success path — qualified + booked → THEN WHAT?**
- ✓ Hands to Appointment Confirmation
- ⚠️ GAP: Is the pre-qualification data (LTV tier, product interest, timeline) passed to Renée before the call? Or does she walk in blind?
- ⚠️ GAP: Is lead scored (hot/warm/cold) and surfaced in the Command Center?

**Failure path — qualified but refused to book / not qualified / private route → THEN WHAT?**
- ⚠️ GAP: "Qualified but didn't book" — nurture with what cadence? Script tone?
- ⚠️ GAP: "Not qualified for conventional but qualifies for private" — is the AI re-framing the pitch or just giving up?
- ⚠️ GAP: "Doesn't qualify for anything" — polite decline + long-term nurture OR removal?

**Multiplicity — lead inquires for refi AND a purchase simultaneously → THEN WHAT?**
- ⚠️ GAP: One contact = one conversation. But they have TWO mortgage products in flight. Need separate opportunity records.

**Handoff — who takes over?**
- Booked → Appointment Confirmation
- Qualified-not-booked → Follow Up
- Not qualified → Not Interested or nurture
- ⚠️ GAP: Is there a "commercial / complex deal" escalation direct to Renée without the generic qualifier flow? (per memory, commercial goes to Tom)

---

## 10. Google Review

**Success path — review posted → THEN WHAT?**
- ⚠️ GAP: Does the system DETECT the review got posted? Or does it just send the request and hope?
- ⚠️ GAP: Thank-you follow-up for posting?
- ⚠️ GAP: Referral ask now that they're a happy client?

**Failure path — they ignore the review request → THEN WHAT?**
- ⚠️ GAP: Max attempts? Then stop? Or escalate to Renée for a personal ask?

**Multiplicity — client closes multiple deals (refi + purchase) → THEN WHAT?**
- ⚠️ GAP: One review ask per deal, or one per client? Current likely: per deal = spammy.

**Handoff — none — terminal milestone.**

---

## 11. EquityMax Mortgage Pre-Qualifier (outside folder, published 2026-04-15)

**Already flagged in memory (`project_equitymax_agent_inventory.md`) — needs audit: has `owner_name` / "Renée" hardcoded.**

**Success path — same as #9, but this is the older/duplicate version.** Likely superseded by #9. Should be deprecated once #9 is verified complete.

**GAP:** This agent existing alongside #9 creates risk of double-firing on new leads. One must be turned off.

---

## PARTNERSHIP BOT — SPECIAL CALLOUT (Renée's example)

I didn't list a "Partnership" agent above because the 10 known agents in General Business Automation don't include one by that name. BUT the dedup map has `ai_prompt_partnership` and `ai_prompt_partnership_chat` CVs, meaning a Partnership chat agent exists or is planned. Running the forward-walk regardless:

**Success path — partner qualified as good fit → THEN WHAT?**
- 🔴 MAJOR GAP: Is there a Partner Setup workflow? What does "setup" even mean here — JV agreement? Revenue share config? Lender intro? Pipeline creation for the partner's referrals?
- 🔴 MAJOR GAP: Does the qualified partner get tracked as a CONTACT in the main pipeline, or as a separate PARTNER record? If contact, they'll get mixed into lead flows. They need their own pipeline (Partnership pipeline exists in ABC per master-build-status — but is it wired?)
- 🔴 MAJOR GAP: Does Renée (or Brian for strategy) get an instant notification of a qualified partner? High-value event — needs a ping.
- 🔴 MAJOR GAP: Onboarding sequence for the partner — welcome email, docs, rev-share terms, referral form / tracking link?

**Failure path — partner not a fit → THEN WHAT?**
- ⚠️ GAP: Polite decline + reason captured? Nurture for future fit (maybe they'll be a fit in 6 months)?

**Multiplicity — can a business have multiple partners? — Renée's exact question**
- 🔴 MAJOR GAP: Yes, of course — and the system must support it. Needs: partner role tags (e.g. `partner-realtor`, `partner-accountant`, `partner-lawyer`), per-partner referral tracking link, per-partner rev-share config. None of this is in the current CV/tag set.

**Handoff — who takes over?**
- 🔴 MAJOR GAP: There's no documented handoff from "partnership bot qualifies them" to "partner onboarding happens." The entire post-qualify flow is undefined.

---

## SUMMARY OF CRITICAL GAPS

**High priority — block snapshot export until resolved:**
1. Partnership post-qualify flow — entire journey undefined (multiple partner support, onboarding, tracking)
2. Pre-Qualifier duplicate (#11) creates double-fire risk with #9 New Lead Prequalify & Book
3. Per-product opportunity tracking — contacts with multiple products in flight (refi + purchase, primary + investment) are lumped into one conversation
4. Renewal per-property tracking — same problem
5. No Renée notifications for high-value lost leads / no-shows / commercial deals

**Medium priority — fix before full launch:**
6. Documents Reminder — no auto-detection of doc receipt (manual Renée tag creates delay window)
7. Google Review agent doesn't detect review posted → keeps firing
8. Commercial / complex deal escalation to Tom / Cheryl missing
9. DND soft vs hard distinction missing (blocks legitimate re-engagement)
10. Spam agent has no reviewable queue before hard-delete

**Low priority — nice-to-have:**
11. Post-appointment outcome tagging (did the call convert?)
12. Wrong-number / misdial detection + tag
13. Reason capture on Not Interested (for future nurture targeting)
14. Per-deal review requests vs per-client (avoid spammy asks)

---

## VERDICT

**Not ready for snapshot export.** The dedup/cleanup work we're doing this session is necessary but not sufficient — these 14 gaps are orthogonal to CV/tag hygiene and all need decisions before the snapshot becomes a defensible deploy-ready asset.

**Renée decides:** which of the 14 gaps get built now (Phase 3 scope), which get deferred (Riley tracks with condition), which are "good enough for v1 launch" and get closed as accepted risk.
