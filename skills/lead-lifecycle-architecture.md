---
name: Lead Lifecycle Architecture — Canonical 12-Stage Blueprint
description: The complete sales architecture for Xpert mortgage + consulting + partner business. Every stage, every tag, every automation, every script template. Single source of truth for any platform audit / new build / deployment.
owner: Morgan (Mortgage) + Sam (Sales) + Gill (GHL) + Norm (n8n) + Connor (Compliance)
type: skill
---

# LEAD LIFECYCLE — CANONICAL 12-STAGE ARCHITECTURE

**Source:** Renée directive 2026-04-24. This is THE blueprint. Every platform audit, every new deployment, every automation build must map to this.

**Hard rule for all 12 stages:**
- Always check lead's jurisdiction (province / state) before any outbound contact
- Apply CRTC (Canada) or TCPA (US) contact window — never contact outside legal hours
- All scripts sound human + low-pressure (see `mortgage-sales-writing.md` for dangle-without-promise craft)

---

## CONTACT WINDOW COMPLIANCE (applies to all outbound stages)

### Canada — CRTC rules
- **Telemarketing (voice):** Mon–Fri 9 AM – 9:30 PM, Sat 10 AM – 6 PM, Sun 10 AM – 6 PM — **local time of recipient**
- **SMS / commercial email (CASL):** anytime if valid consent + unsubscribe link in every message
- **DNC (National Do Not Call Registry):** check every voice number before calling (rules don't apply to existing customer relationships within 18 months)

### US — TCPA rules
- **Voice + SMS telemarketing:** 8 AM – 9 PM **local time of recipient**
- Some states stricter: TN + FL = 8 AM – 8 PM
- Express written consent required for ANY auto-dialed or AI voice call. Softer rule for existing customer relationships — still safer to have consent.
- DNC registry check required for any non-customer call

### Implementation
- Lead's `state_province` custom field drives the window check
- Every outbound workflow has a time-check gate: **IF current time in recipient's timezone is outside window → delay until window opens**
- Voice AI greeting always includes CRTC disclosure: *"This call may be recorded and handled by an AI assistant. You can say stop at any time to end the call."*

---

## STAGE 1 — NEW LEAD INTAKE

### Sources (each gets a tag)

| Source | Tag |
|---|---|
| Facebook | `source-fb` |
| Instagram | `source-ig` |
| YouTube | `source-youtube` |
| TikTok | `source-tiktok` |
| Snapchat | `source-snapchat` |
| Kijiji | `source-kijiji` |
| Google (search / display / local) | `source-google` |
| Event / trade show | `source-event` |
| Referral (partner or client) | `source-referral` |
| Webinar | `source-webinar` |
| Old list / CSV upload | `source-old-list` |
| Direct website (Lovable form) | `source-website` |

### Intent tags (based on form selection — Lovable maps automatically)
- `purchase-lead`
- `refi-lead`
- `renewal-lead`
- `heloc-lead`
- `private-lead`
- `preapproval-lead`
- `debt-consolidation-lead`
- `general-inquiry` (fallback if no intent detected)

### Form source mapping
Ads on FB / IG / TikTok may have the product selection built into the ad form. The ad platform's form-field-to-custom-field mapping must route:
- `ad_purpose` / `interested_in` / `product` → matched to one of the intent tags above via webhook logic

### Immediate actions on new lead landing
1. **Welcome email template** (human tone, see `message-tone.md` + `mortgage-sales-writing.md`)
2. **Welcome SMS 24/7** (short, first-name, contraction-heavy, no formal opener)
3. Apply source tag + intent tag
4. Add `lead-currently-in-workflow` tag
5. Route to Stage 2 after welcome sequence fires

### Welcome SMS template (24/7 — lands immediately regardless of hour)
> "Hey {{first_name}} — thanks for reaching out to {{custom_values.company_name}}. I'm {{custom_values.user_first_name}}. I'll call or text you during business hours to walk through your options. If it's urgent, reply here anytime."

### Welcome email template (subject + body)
*Subject:* Got you, {{first_name}} — here's what's next
> Hi {{first_name}},
>
> Thanks for coming through — I've got your info.
>
> Quick rundown of how this works:
> 1. I'll look over what you submitted and see which lenders fit your scenario
> 2. We'll jump on a 10–15 min call to walk through your options
> 3. If things look good, we move to pre-approval — no surprises along the way
>
> I'll reach out during normal hours (weekdays 9–6 {{custom_values.business_timezone}}). If you need me sooner, text this number.
>
> Talk soon,
> {{custom_values.user_first_name}}
> {{custom_values.brokerage_name}} · Lic. {{custom_values.brokerage_license_number}}

---

## STAGE 2 — CONVERSATIONAL PRE-QUALIFY (inside contact window)

**Goal:** get the lead to respond via email, SMS, or voice AI and move them to pre-qualified.

### Tools
- **SMS / chat conversational AI agent** — script source: `projects/equitymax-snapshot/voice-bot-inspiration/` + Google Drive scripts
- **Voice AI agent (inbound + outbound)** — mortgage-specific script from Google Drive
- **Email drip** — 3–5 touches over first 7 days, cadence per lead behaviour

### Possible outcomes → tags

| Outcome | Tag | Next action |
|---|---|---|
| Not interested | `not-interested` (DND flag) | Stop automation; STAGE 10 |
| Busy — follow up next day | `follow-up-next-day` | Schedule next touch 24h out |
| Busy — specific day/time | `follow-up-{{date}}` | Schedule exact follow-up |
| Pre-qualified | `pre-qualified` | STAGE 3 (book meeting) |
| Not qualified | `not-qualified` | STAGE 9 (nurture) |

### AI agent knowledge base reads from
- `projects/equitymax-snapshot/mortgage-rebuttals-library.md` (being built — task t_mod70nvoo6dt)
- `claude-skills/mortgage-sales-writing.md` (dangle-without-promise craft)
- Lead's current notes + history (AI must reference recent notes if on-topic)

---

## STAGE 3 — QUALIFIED → BOOK MEETING

**If qualified but hasn't booked yet:**
- Follow-up aggressively — this is potential money
- Cadence: legacy account has the specific day intervals — use those. **Minimum 2-week aggressive push.**
- Across SMS + email + voice AI, spaced so it doesn't feel like harassment
- Each touch must add value (not just "hey you still there")

### If no response after aggressive window → move to nurture (Stage 9) + remove `pre-qualified`, add `nurture-from-qualified`

### Book confirmation
On booking:
- Immediate booking confirmation email + SMS
- 24-hour reminder
- 1-hour reminder
- Calendar invite with {{custom_values.user_full_name}} as host

---

## STAGE 4 — NO SHOW

**Trigger:** scheduled meeting passed without the call connecting.

**Actions:**
1. Move contact to `no-show` stage
2. Attempt rebook via SMS (immediately after no-show detected)
3. Attempt rebook via email (within 24h)
4. Attempt rebook via voice AI outbound (next-day during contact window)
5. If no response after 2 weeks of rebook attempts → nurture (Stage 9), tag `no-show-to-nurture`

### No-show SMS template
> "Hey {{first_name}}, we missed each other today — no worries. Here's my calendar if you want to grab a new slot: {{custom_values.my_calendar}}. Or just reply with a time that works and I'll book it for you."

---

## STAGE 5 — APPLICATION SENT

**Trigger:** user manually moves contact to "Application Sent" stage (they made the decision to move forward with this lead).

**Actions:**
1. Fire application reminder sequence
2. Cadence: every few days for a few weeks
3. **IF lead specifies a completion date** → PAUSE sequence until that date, then resume if still not complete

### Application reminder (Day 3, Day 7, Day 10, Day 14 sample)
> "Hey {{first_name}}, just circling back — did you get a chance to finish the application? Happy to jump on a 10-min call and walk through it together if anything's tripping you up."

### If lead responds with specific date
Agent captures date → sets custom value `application_resume_date` → workflow pauses reminders until that date.

---

## STAGE 6 — DOCUMENTS REQUESTED

**Trigger:** application complete (manually moved by user OR auto-detected via user's personal application-form API if available).

**Actions:**
1. Move contact to `documents-requested` stage
2. Fire documents reminder sequence
3. **AI reads user's notes on contact** — if notes say "still waiting for clearer driver's license", AI references that in follow-up
4. Cadence: every few days, progressively helpful

### Reminder SMS with notes reference
> "Hey {{first_name}}, quick check — {{dynamic_based_on_notes: 'I'm just waiting on that clearer copy of your DL' | 'just waiting on the last few documents'}}. Need a hand pulling anything?"

### Auto-advance conditions (if user's form API is wired)
- All docs received → move to Stage 7 (Submitted)
- Application complete + no docs needed → move to Stage 7
- Else → manual advance by user

---

## STAGE 7 — SUBMITTED / APPROVED

**No automation.** This is quiet time — the file is with the lender, user is the point of contact.

---

## STAGE 8 — CLIENT (FUNDED)

**Trigger:** deal funded + user moves contact to Client stage.

**Actions:**
1. **Wait 1 hour** (human delay, not robotic instant)
2. Send thank-you email with 1–5 satisfaction rating
3. **IF rating 4–5:** ask for Google review. Follow up 5 days later if not completed.
4. **IF rating 1–3:** send appreciation message, flag internally for user follow-up. *"Thank you for your feedback — our team takes every client's opinion seriously. We use it to make the business better."*
5. Tag `client` + `client-{{funding-year}}` + intent tag stays so we remember their product

### Thank-you email with rating
Needs a form to capture rating + optional comment. Form fields:
- Rating: 1-5 stars
- "What did we do well?" (optional)
- "What could we improve?" (optional)

Form submission → triggers next step based on rating.

### Google review request (if 4-5)
> "Hey {{first_name}}, so glad to hear you had a good experience. Would you mind leaving us a Google review? Takes 60 seconds and it helps us massively: {{custom_values.google_review_link}}. Appreciate you!"

### Client contact cadence going forward
**2x per year max.** Mortgage renewal check (around 12–18 month mark) + annual holiday / anniversary touch. No more — clients aren't a pipeline, they're relationships.

---

## STAGE 9 — NURTURE

**Trigger:** lead fell out of active pipeline (not qualified, aged-out of follow-up, no-show-to-nurture).

**Content cadence:** monthly — one email per month, on-topic, interesting, easy read.

### Content types
- Market updates (rate moves, Bank of Canada announcements)
- Homeownership tips (renovation financing, HELOC vs refi)
- Seasonal (spring market, year-end mortgage planning)
- Case studies (anonymized — "how we helped a self-employed couple in Toronto")

### CTA rule
**Never direct-to-book.** Nurture leads aren't pre-qualified — link MUST route to the pre-qualify form first.

> "Want to see if any of this applies to you? Quick 2-min pre-qualify form: {{custom_values.prequalify_form}}"

---

## STAGE 10 — NOT INTERESTED / DND

**Triggers:** any of these words from the lead (SMS, email, voice AI) →
- "stop"
- "stop calling me"
- "no"
- "not interested"
- "fuck off" / profanity
- "unsubscribe"
- "remove me"

**Actions:**
1. Tag `not-interested` + `dnd-global`
2. Halt ALL active automations
3. Add to internal DND list — never contact again via any channel
4. Log the opt-out with timestamp + channel + trigger phrase (CASL / TCPA compliance trail)

---

## STAGE 11 — SPAM

**Triggers:** patterns suggesting the "lead" is actually spam / phishing / bot —
- Meta admin password reset phishing messages
- Mass generic replies from the same IP burst
- Subject lines like "Your domain is expiring"
- Unsubscribe-list-farming attempts

**Actions:**
1. Tag `spam`
2. Remove from all lists + automations
3. Block sender where possible
4. Quarterly review by user to confirm

---

## STAGE 12 — REFERRAL CAMPAIGNS

### Leads + past clients
**Frequency:** quarterly for non-clients, **2x per year for clients**

### Flow
1. Start with small-talk message: "Hey {{first_name}}, how's things been?"
2. If they respond warmly → ask for referral
3. If they have one → send referral form (capture their contact + the referred person's info)
4. Thank them regardless of outcome

### Referral request template
> "Hey {{first_name}}, I know it's been a bit since we chatted. Things have been busy on this end — lots of {{current_market_note: 'refinances with rates moving' | 'first-time-buyer activity' | 'renewal shopping'}}.
>
> Was just thinking: if anyone in your circle is looking at a mortgage right now — purchase, refi, whatever — I'd appreciate the intro. I treat referrals like gold.
>
> Either way, good to stay in touch — talk soon.
> {{custom_values.user_first_name}}"

---

## PARTNERSHIP FLOW — SAME SHAPE, DIFFERENT TONE

**Principle:** less aggressive. Tone conveys *"we have other people lined up, this is an opportunity for YOU"* — without ever saying that out loud.

### Partnership opener (outbound first touch)
> "Hi {{first_name}}, I saw what you're doing online and {{custom_values.user_first_name}} asked me to give you a call to see if you were interested — we're possibly looking for new partners. Did you have the capacity to take on more clients?"

Renée's craft note: *"You see how I didn't promise any clients but I dangled the carrot?"* — the phrasing "possibly looking" + "capacity to take on more clients" creates opportunity-feel without commitment.

### If they ask "do you have a client for me?"
> "Well, it's a partnership so it's best to book a chat with {{custom_values.user_first_name}} to see if you have good synergy. Are you free mostly during the day or does evening work best?"

Renée's craft note: *"You see how I did that?"* — deflects the transactional ask, reframes as relationship-fit, and controls the next step (booking).

### If they're hedging / hard to pin down / cold
> "Look, {{first_name}}, it seems like you might be too busy and that's okay. If anything, we can keep in touch to see if our stars align later. Sounds fair?"

Renée's craft note: *"You see how I'm politely giving them the impression I don't have time to waste and we have other options without actually saying it?"* — uses a graceful exit that preserves the relationship AND signals scarcity of your time without claiming it.

### Partnership stages (mirror lead stages, lighter touch)
1. Intake (same source + product tagging pattern)
2. Conversational pre-qualify (is this a fit, do they have capacity, complementary niche?)
3. Qualified → book chat with user (not a pre-qualify call — a partnership intro call)
4. No show → rebook (same as leads)
5. Agreement sent / signed → partner onboarding
6. Active partner → they send referrals, which enter the main lead pipeline with `source-referral` + partner's ID in custom field

### Partner-specific emails (already built — task t_mod5c2sovlzg)
- Partner Welcome
- Partner Booking Confirmation
- Partner Check-In Reminder

---

## RECRUITMENT FLOW — SAME SHAPE AGAIN

Mirrors lead stages but for hiring:
1. Form submission (intake — tagged `source-recruitment`)
2. Follow-up email + SMS during contact hours
3. Book first interview with user
4. No-show → rebook sequence
5. Interview done → user decides hire/no-hire
6. Hired → onboarding workflow
7. Not hired → tag + nurture (may become partner or refer someone later)

---

## IMPLEMENTATION CHECKLIST (for the platform audit task)

For each of these 12 stages, verify in BOTH EqM + ABC:

- [ ] Stage has its own pipeline column / workflow status
- [ ] Triggers are cleanly defined
- [ ] Contact-window compliance check is wired (not just "send immediately")
- [ ] Tags applied correctly on entry + exit
- [ ] AI agents reference the right knowledge base section
- [ ] Scripts use `mortgage-sales-writing.md` + `message-tone.md` tone rules
- [ ] No hardcoded "Renée" / "EquityMax" — everything via custom values
- [ ] Nurture CTA links to pre-qualify form, never direct-to-book
- [ ] DND enforcement across ALL channels when `not-interested` or `dnd-global` is applied
- [ ] Partnership flow uses lighter-touch scripts (per above)

---

## KEY DIRECTIVE FROM RENÉE

> "As you can see, other than DND our main sales account is always moving. This is key."

The pipeline is never idle. Every lead either advances, gets paused for a valid reason (application date, pre-qualified follow-up), or is moved to nurture / DND. Nothing sits untagged without follow-up. Nothing gets forgotten.

Every platform deployment gets audited against this doc.

---

## RELATED SKILLS

- `mortgage-sales-writing.md` — dangle-without-promise copy craft
- `message-tone.md` — general human-voice rules
- `fsra-mortgage-advertising-compliance.md` — FSRA disclosure rules
- `mortgage-agent-sales-process.md` — CA + US mortgage workflow details
- `morgan-mortgage.md` — Morgan (Mortgage Assistant) agent
- `sam.md` — Sam (Sales) agent
- `high-ticket-setter-outbound.md` — cold outbound playbook
- `high-ticket-closer.md` — closing playbook

---

**Authored:** 2026-04-24 (Renée directive — full 12-stage brief + partnership craft notes)
**Review cadence:** Every quarter, verify actual platform state matches this architecture.
