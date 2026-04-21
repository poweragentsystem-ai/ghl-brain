# Mortgage Workflow Playbook — The Exact Lead Journey
### Renée walked this through 2026-04-21. This is the blueprint every AI Studio agent and workflow in the snapshot follows.

---

## GOLDEN RULES (apply everywhere)

1. **Never email, SMS, and call at the same time.** Send email first → SMS → 5 min later voice AI calls.
2. **Every stage except "New Lead" has a 10-minute entry delay** before any automation fires. Gives the user a window to correct mis-placed leads without firing the wrong workflow.
3. **Tag hygiene:**
   - Remove stage-transition tags when the lead moves (e.g., `warm-lead` → `hot-lead` swap)
   - Keep context tags (product/service like `refinance`, source like `source-meta`) across all stages
4. **Bot attribution cumulative:** if SMS bot booked AND voice AI rebooked after no-show, BOTH tags stay on the contact — `ai-chat-booked` + `ai-voice-rebooked` co-exist. This is how we measure each bot.
5. **All messaging uses `{{custom_values.*}}` tokens.** No hardcoded names, brands, services.

---

## STAGE 1 — NEW LEAD (24/7, fires immediately)

**Trigger:** contact created with `new-business-lead` tag (any source).

**Timing:** no delay. Run any time of day, any day.

**Actions (in order):**
1. **Email:** Welcome template (branded, uses `{{user_full_name}}`, `{{company_name}}`, `{{niche}}`, `{{product_service_N}}` tokens, FSRA footer via individual license CVs)
2. **SMS (immediately after email):**
   > Hi {{contact.first_name}}. Welcome to {{company_name}}. I'm {{user_full_name}} — excited to help with your {{niche}} needs. Check your email for some details. We'll give you a call soon.
3. **No voice call in Stage 1.** Voice AI enters in Stage 2.

**What this stage does NOT do:** qualify, book, call. That's Stage 2.

---

## STAGE 2 — BUSINESS HOURS ENGAGEMENT (pre-qualify + route)

**Trigger:** `new-business-lead` tag AND within business hours.

Two versions of this stage, determined by interaction type:

### 2A — INBOUND (lead called in or replied)
- **Voice AI reception bot** answers call
- Greets, asks what they need help with
- Runs pre-qualify script
- Routes per qualification result (see Routing below)

### 2B — OUTBOUND (AI initiates the call)
- **Voice AI outbound bot** calls the lead 5 min after SMS sent in Stage 1
- Depending on ad source (from `{{source-*}}` tag), AI is either:
  - In outbound-dialing mode (Meta/Google/YouTube/TikTok ads = proactive call)
  - In callback-ready mode (event/referral = wait for inbound)
- Greets, pre-qualifies, routes

### Routing (both 2A and 2B use the same router)
- **QUALIFIED** → tag `warm-lead` or `hot-lead` (depending on intent level) → book in `{{user_calendar_booking_link}}` → move to "Meeting Booked" stage → confirmation email + SMS
- **NOT QUALIFIED** → tag `not-qualified` → apologize gracefully:
  > Totally appreciate you reaching out — based on what you've shared, we won't be able to help you right now. If anything changes, come back any time. Take care.
  Move to "Not Qualified" stage → DND.
- **GREY AREA** → tag `needs-human-review` → notify user (email + SMS + internal GHL notification) → create task for user to manually review → lead waits in "Pending Review" stage until user acts

---

## STAGE 3 — NO-SHOW RESCHEDULE

**Trigger:** appointment status = no-show OR user manually places lead in "No Show" stage (10-min delay on stage entry).

**Actions (5 days of escalating attempts):**

| Day | Touch |
|---|---|
| Day 1 | Email → SMS → (5 min later) voice AI call to reschedule |
| Day 2 | SMS → (5 min later) voice AI call |
| Day 4 | Email → voice AI call |
| Day 5 | Final SMS + voice AI call |

After Day 5 with no response → move to **Long-Term Nurture**. Tag remains `no-show` for reporting.

**If rebook succeeds:**
- Tag `ai-voice-rebooked` OR `ai-chat-rebooked` (depending on which bot closed the rebook)
- `no-show` tag stays (for reporting — "we saved this one")
- Lead moves back to "Meeting Booked" stage

---

## STAGE 4 — APPLICATION PENDING

**Trigger — two ways in:**
- **Auto:** a workflow sent the lead the `{{application_link}}` → auto-move to this stage
- **Manual:** user drags the lead into "Application Pending" stage

**Actions (reminder drip):**
- Day 1: Email with application link
- Day 2: SMS + voice AI call
- Day 3: Email
- Day 5: SMS + voice AI call
- Day 7, 10, 14: emails
- Day 30: final nudge, then move to Long-Term Nurture if still pending

**If API with application platform:** the platform callback auto-moves lead to "Application Complete" when they finish — reminder stops automatically.

---

## STAGE 5 — APPLICATION COMPLETE

**Trigger:** application platform callback OR user manually drags lead here.

**Actions for the lead: NONE.** Do not send anything.

**Actions for the user (internal only):**
- **Day 5 after entering this stage:** internal notification + task:
  > Lead {{contact.first_name}} {{contact.last_name}} has been in Application Complete for 5 days with no automation running. Move to Documents Pending?
- **Loops every 5 days** until user acts.

---

## STAGE 6 — DOCUMENTS PENDING

**Trigger:** user moves lead here (from Application Complete) OR app platform callback.

**Actions (document reminder drip):**
- Week 1: reminders every 3 days (Day 1, Day 4, Day 7) — email → SMS → voice AI
- Weeks 2-4: one reminder per week
- After 4 weeks no documents received → notify user, move to Long-Term Nurture

**If API with application platform:** platform reports which specific docs are missing → workflow sends specific requests ("we still need your T4 and bank statements"). Without API, generic reminder.

---

## STAGE 7 — DOCUMENTS COMPLETE → SUBMITTED TO LENDER

**Trigger:** user moves lead OR API callback.

**If API with application platform auto-submits:**
- Lender status = submitted → auto-move to "Submitted to Lender"
- Lender status = approved → auto-move to "Approved"
- Lender status = declined → notify user + stay in Submitted, manual route

**Without API:** user manually manages these stages.

---

## STAGE 8 — APPROVED / CONDITIONAL APPROVAL

**Actions:** congratulations email + SMS (if fully approved) OR email listing conditions (if conditional). Move to appropriate downstream stage (Signed, Funded, Closing).

---

## STAGE 9 — CLOSED / FUNDED / CLIENT

**Trigger:** lead enters "Funded/Client" stage.

**Actions (same day):**
1. Thank-you email:
   > Thanks for letting us help with your {{product_service}} needs. On a scale of 1 to 5, how was your experience with us? Just reply with a number — we read every one.
2. Wait for response.

**If reply = 4.5 or higher:**
- Tag `positive-review-candidate`
- Follow-up email asking for Google review with direct link (`{{google_review_link}}`)
- Tag `google-review-requested`

**If reply < 4.5 OR no number:** internal notification to user to follow up personally. No automated review ask.

---

## STAGE 10 — LONG-TERM NURTURE

**Actions:** monthly engaging email with ONE soft CTA (not pushy). AI auto-generates based on current rate environment + client's product type.

Email tone: *"Rates shifted this week — here's what it means for renewals. Reply if you want me to run numbers for you."* (Soft. Not "BUY NOW.")

---

## STAGE 11 — NOT INTERESTED

**Trigger:** lead explicitly says not interested OR explicitly opts out.

**10-min delay, then:**
- Tag `dnd` + `not-interested`
- Stop all active automations
- Quarterly newsletter only (one email per quarter, high-value content, easy unsubscribe)

---

## MISCELLANEOUS WORKFLOWS

### Spam handling
Spam phone calls / SMS / social → auto-detect (short keyword list + length checks) → tag `spam` → DND → move to quarantine stage. Do NOT reply.

### Source router
On new lead creation, based on UTM/source → tag appropriate `source-*` → route to right workflow variant (Meta ads get different opener than referrals).

### Reply interrupt
Any time a lead replies to an active SMS/email sequence → pause the sequence → notify user → wait for user decision before resuming.

---

## VOICE CALL OUTCOME HANDLING

Every voice AI call logs an outcome:

| Outcome | Meaning | Next action |
|---|---|---|
| **Success** | Call connected, conversation completed | Proceed per conversation result (booked / not qualified / human review) |
| **Not answered** | Rang out, no pickup | Schedule callback for next day same time |
| **Hung up** | Lead answered, indicated negative intent, disconnected | Tag `ai-voice-hangup` + `cold-lead`. Don't auto-callback today — wait 2 days, 1 retry, then nurture |
| **Call failed** | Technical disconnection (signal drop), no negative indicator | Tag `ai-voice-call-failed`. Retry in a few minutes, then daily for 5 days |
| **Voicemail** | Hit voicemail | Tag `ai-voice-voicemail-left`. Leave a short message. Retry next day |

Callback frequency:
- **Not answered / call failed:** daily for 5 days, then wait 5 days, then nurture
- **Hung up:** wait 2 days, one more try, then cold-nurture

**Known GHL limit:** GHL native voice typically caps concurrent calls at 1-5 and daily volume at 100-200/sub-account. For scale → migrate to ElevenLabs Conversational AI or Assistable.ai (no hard daily cap). Flagged for post-launch when first high-volume client onboards.

---

## BOT PERFORMANCE TRACKING (cumulative tagging)

**Critical:** both bots can win, both should be credited.

- SMS bot booked lead → `ai-chat-booked`
- Lead no-showed → `no-show` added
- Voice AI rebooked after no-show → `ai-voice-rebooked` added (does NOT remove `ai-chat-booked`)

End result: contact has `ai-chat-booked` + `no-show` + `ai-voice-rebooked`. We can filter and see: "SMS got the first booking, voice recovered the no-show." Both bots were useful.

Dashboards count these separately:
- "Initial bookings by bot type" → one tag per contact
- "Rebook success by bot type" → second tag per contact

---

## COMPLIANCE BOUNDARIES

- **CASL (Canada Anti-Spam):** every marketing email/SMS includes unsubscribe + company info. Express consent captured at lead intake (CASL consent checkbox).
- **PIPEDA:** all data stored in GHL (SOC 2 compliant). No sensitive data in URLs, chat logs, or unencrypted webhooks.
- **CRTC:** voice AI calls respect DND, identify the caller ("This is an AI assistant from {{company_name}}"), and offer a way to opt out verbally.
- **FSRA:** every client-facing asset (website, email, ad) includes the mortgage professional's license info via `{{license_number}}` + `{{license_type}}` + `{{brokerage_name}}` + `{{brokerage_license_number}}` + principal broker.
- **Application data:** chat bot can COLLECT; lender submission must go through the user's registered application platform (Scarlette / Velocity / Lendesk / Finmo).

---

## WHAT CONSOLE MUST BUILD (mapping this playbook to AI Studio folders)

**Mortgage folder** (primary):
- 01 - New Lead 24/7 Welcome (Stage 1)
- 02 - Business Hours Inbound Reception (Stage 2A — voice AI)
- 03 - Business Hours Outbound Call (Stage 2B — voice AI)
- 04 - Pre-Qualify Follow-Up (form not completed nurture)
- 05 - Booking Follow-Up (qualified but not booked)
- 06 - Appointment Confirmation + Reminder
- 07 - No-Show Reschedule (Stage 3)
- 10 - Application Sent + Reminders (Stage 4)
- 11 - Application Complete (internal 5-day loop — Stage 5)
- 12 - Documents Pending Reminder (Stage 6)
- 13 - Submitted → Approved handling (Stage 7/8)
- 20 - Funded + Review Request (Stage 9)
- 21 - Positive Review → Google Review Ask
- 22 - Renewal Countdown (120/90/60/30/14 days)
- 23 - Long-Term Nurture Monthly Email (Stage 10)
- 24 - Not Interested / DND (Stage 11)
- 90 - Spam handler
- 91 - Reply interrupt
- 93 - Source router

**Partnership folder** (generic for any partner type — real estate, lawyer, financial advisor, builder):
- 30 - Partner-Referred Lead Intake
- 31 - Partner-Referred Lead Qualify + Book
- 32 - Partner Notification (alerts partner when qualified lead books their calendar)

**Recruitment folder:**
- 40-43 — per existing spec

**Voice AI Bots folder (6 bots):**
- Inbound Reception, Outbound Pre-Qualify Follow-Up, Outbound Booking Follow-Up, No-Show Rebooker, Renewal Outreach, Document Collection

**Conversational AI folder (4):**
- Inbound Chat, Pre-Qualify Chat Assistant, Application Intake Chat (collects data, pushes to user's application platform API), Partnership / Recruitment Chat

**Miscellaneous folder:**
- Spam, Source Router, Reply Interrupt, DND handler
