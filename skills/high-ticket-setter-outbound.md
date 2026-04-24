# High-Ticket Setter Outbound — $1K+ Deals

**Owner:** Sam (Sales), co-operated with Lex (Copy), Eve (Email), Connor (Compliance), Quinn (QA), Scout (Intel)
**Use when:** Running a setter-role outbound motion for any offer with setup fee ≥ $1,000 OR monthly ≥ $300. Covers Easy Deploy partner acquisition, AI consulting direct outbound, and mortgage-pro recruitment at the OLS brokerage.
**Do NOT use for:** Inbound qualified leads — see `funnel-qualified-landing-page.md`. Closer scripts (on the booked call) — see `high-ticket-closer.md`. Generic cold email templates — see `cold-outreach-sequences.md` (this skill is setter-specific; outreach sequences are the copy library). Mortgage B2C inbound — see `cold-outreach-sequences.md` §3B.

---

## 1. WHAT A SETTER IS (AND ISN'T)

**A setter books. A closer sells.** They are two jobs.

The setter's entire mission:
1. Find the decision-maker
2. Get past the gatekeeper
3. Verify basic fit (4 qualifiers — see §5)
4. Book a calendar slot with the closer
5. Hand over a clean briefing

The setter **never** quotes price, never demos the product, never handles objections about the offer. If the prospect asks "how much?", the setter answers with a redirect (see §9).

Why split the role:
- Setters can be AI or junior staff (lower cost per touch)
- Closers spend 100% of their time on qualified calls (higher close rate per hour)
- Role-splitting this way is the Predictable Revenue model (Aaron Ross, 2011) that built $100M+ of revenue at Salesforce.com and was later adopted as standard across B2B SaaS.

Research base:
- **Aaron Ross & Marylou Tyler, *Predictable Revenue* (2011):** setter / closer separation, named "Cold Calling 2.0"
- **Jeb Blount, *Fanatical Prospecting* (2015):** 30-day / 90-day prospecting cadences, family of 4 — phone, email, social, text
- **Y Combinator sales playbook (public, *yc.co/blog* + Jared Friedman / Tyler Bosmeny talks):** founder-led sales patterns, the "ask for 20 minutes" open
- **Gong Labs 2023-2024 outbound data:** cold call connect rates, best-times-to-call, voicemail vs no-voicemail outcomes
- **Salesloft State of Sales 2024:** touch counts and reply-rate curves

---

## 2. CANADIAN COMPLIANCE — THE SETTER'S CAGE

Setters operate inside CASL + CRTC + PIPEDA. Getting this wrong ends campaigns.

### 2.1 CASL for cold outreach

- **Express consent** is ideal — the prospect opted into something first (newsletter, form fill, LinkedIn connect accepted).
- **Implied consent** is allowed when:
  - Published business contact info (e.g., the prospect's business website lists an email) AND
  - The message relates to the recipient's role AND
  - No opt-out statement is posted near the contact info

- **Existing Business Relationship (EBR):** 6 months after inquiry, 2 years after purchase — implied consent covers this.
- **Every commercial electronic message** (CEM — email, SMS, DM) needs:
  1. Sender legal name
  2. Mailing address
  3. Working unsubscribe
  4. One other contact method (phone / email / URL)

- Purchased lists without documented consent = illegal. Never.
- Max penalty: **$10M per violation (business), $1M (individual)**. (Government of Canada, `fightspam.gc.ca`.)

### 2.2 CRTC / Unsolicited Telecom Rules

- **National DNC scrub required** before any outbound dial. Refresh every 31 days.
- Time window: **9:00 AM – 9:30 PM weekdays local, 10:00 AM – 6:00 PM weekends.**
- Caller ID must show the real business number.
- Keep internal DNC list 3 years post-opt-out.
- **Implied consent exemption for B2B calls:** business-to-business cold calls are permitted BUT the business must maintain DNC internally and honor opt-outs.

### 2.3 PIPEDA

- Business contact info used for a role-relevant purpose is generally fine. Personal info (home cell, personal email) is not.
- Keep only what you need. Delete on request within 30 days.

### 2.4 Connor's pre-flight for any setter campaign

Before a single touch goes out:
- [ ] Consent basis documented per record (express / implied / EBR)
- [ ] Sender identity block attached to templates
- [ ] Unsubscribe mechanism tested
- [ ] DNC scrub within last 31 days
- [ ] Campaign logged in GHL with consent timestamps
- [ ] Quinn QA'd on Renée's test contact only

Connor signs off in writing. No exceptions.

---

## 3. THE CHANNEL CADENCE — 7 TOUCHES, 3 CHANNELS, 14-21 DAYS

Industry data consistently shows multichannel cadences outperform single-channel:
- 1-touch reply rate on B2B cold email: **1-2%** (Salesloft 2024)
- 5-touch multichannel: **8-12%**
- 7-touch multichannel with pattern interrupt: **12-18%**
- Reply rate decays past touch 9; spam-flag risk rises. Exit at touch 7.

### Default sequence (adapt per niche):

| # | Day | Channel | Purpose |
|---|---|---|---|
| 1 | 0 | LinkedIn connect request w/ note | Warm the channel |
| 2 | 2 | Email — short hook | First real touch |
| 3 | 4 | Voicemail drop (if opt-in path allows) OR SMS (opt-in only) | Voice identity |
| 4 | 7 | Email — reframe / insight | Challenger teach |
| 5 | 10 | LinkedIn DM if connected, else email | Mid-cycle bump |
| 6 | 14 | Phone call (live — human or AI) | Live voice attempt |
| 7 | 18-21 | Email — breakup | Graceful exit |

Copy for each touch type lives in `cold-outreach-sequences.md`. This skill governs **which touches**, **in which order**, **at what intervals** for the setter role specifically. Lex writes the actual copy per niche.

### Why this order

- LinkedIn first = free warm-up. The prospect sees your face and name before your email lands — raises open rates 15-25% (LinkedIn Sales Solutions 2023 benchmark report).
- Email second = scalable, non-intrusive, CASL-compliant when implied consent applies.
- Voicemail drop / SMS third = voice identity + personality. Skipped in some niches.
- Reframe email fourth = Challenger "teach" step — the insight they didn't have.
- LinkedIn DM fifth = warmer now that they've seen multiple touches.
- Phone call sixth = live conversation attempt at peak familiarity.
- Breakup seventh = Lemlist/Apollo data: breakup emails reply at 2-3x touches 4-6.

---

## 4. PER-CHANNEL TIMING — WHEN TO FIRE

Peak connect-rate data (Gong Labs 2023 outbound report, RingDNA / InsideSales / Outreach 2024):

| Channel | Best window (prospect's local time) |
|---|---|
| Email | Tuesday–Thursday, 8-10am or 2-4pm |
| Phone call | Tuesday-Thursday, 10-11am and 4-5pm |
| LinkedIn DM | Tuesday-Thursday, 8am or 5-7pm |
| SMS (opt-in) | Weekday midday 11am-2pm, never before 9am or after 8pm |
| Voicemail drop | After business-hours call attempt, same rule as phone |

Avoid Monday mornings (inbox flood) and Friday afternoons (disengaged). Saturdays — B2C only and with explicit opt-in. Sundays — never.

---

## 5. THE FOUR QUALIFIERS — THE SETTER'S ONLY JOB

Before booking, the setter must verify 4 facts. These map to the classic BANT + Sandler Pain funnel hybrid:

| # | Qualifier | Sample setter question |
|---|---|---|
| 1 | **Budget** — can they afford ≥ $1K setup / $300 monthly? | "For context — most businesses we help invest somewhere between $300 and $1,000 a month once this is live. Is that in the zone you were thinking, or are you exploring before you know?" |
| 2 | **Authority** — are they the decision-maker? | "Just to make sure I'm not wasting your time — are you the one making the call on something like this, or would a partner / spouse / business partner be in the loop?" |
| 3 | **Need** — is there a real pain, not just curiosity? | "What made this land on your radar right now? Something specific happen, or more of a general 'should look into this'?" |
| 4 | **Timeline** — are they in the next 30-60 days, or "someday"? | "If this clicked and made sense on a 20-minute call, are you in a spot to get started in the next month or two, or more like Q3 / next year?" |

**Rule:** 3 out of 4 yeses = book. 2 or fewer = nurture, don't book. "Someday/no budget/not DM" wastes the closer's calendar and tanks close rate.

---

## 6. OPENERS — SETTER SCRIPTS BY CHANNEL

### 6.1 LinkedIn connect request (max 300 chars)

**Generic B2B service business:**
```
Hey {{first_name}} — saw {{company_name}}, impressed with {{specific_observation_from_their_profile_or_site}}. Not pitching you, just looking to connect with people running {{niche}} businesses in {{city}}. Open to connecting?
```

**Agency-to-agency (Easy Deploy partner):**
```
Hey {{first_name}} — fellow agency owner in {{city}}. We just shipped a platform that lets agencies deploy AI automation for their local-business clients in a click. Wondering if your shop is offering this yet. Open to connecting?
```

**Observation rule:** `{{specific_observation}}` must be real. Scout or Rex pulls it from LinkedIn or the company site. Don't fake this — prospects smell it.

### 6.2 First email — the 50-word open

```
Subject: quick one about {{company_name}}

Hey {{first_name}},

Reaching out because {{specific_observation}}. I help {{niche}} owners {{specific_outcome_in_plain_language}} — curious if that's something you're thinking about right now, or not even on the radar?

Worth a 15-min call? {{booking_link}}

{{user_first_name}}
{{company_name}}
{{mailing_address}}
Unsubscribe: {{unsubscribe_link}}
```

Max 75 words total including footer. Plain text. One CTA.

### 6.3 Second email — Challenger reframe

```
Subject: most {{niche}} owners get this wrong

{{first_name}},

Real talk — most {{niche}} shops are losing leads to the gap between "inquiry lands" and "someone calls back". Industry standard is 4-24 hours. Top 10% respond in under 5 min. That alone is a 3-8x close-rate difference (Harvard Business Review / InsideSales).

We build the "under 5 min" side of that — voice and SMS AI that qualifies and books in real-time.

15 min? {{booking_link}}

{{user_first_name}}
```

Research citation: the Harvard Business Review / InsideSales.com 2011 study ("The Short Life of Online Sales Leads") is the standard reference — Ryan has it catalogued. Numbers are conservative, repeatedly reproduced in Gong 2023 and Drift 2022 studies.

### 6.4 Phone call open (15-20 seconds)

```
[Line rings, prospect picks up]
"Hey, is this {{first_name}}?"
[Wait for yes]
"Hey {{first_name}} — it's {{user_first_name}} from {{company_name}}. Not a telemarketer call, promise. You got 30 seconds?"
[Wait]
"Reason I'm calling — we help {{niche}} owners cover the 16 hours a day their phone isn't staffed. Takes a 15-min call to see if it fits. I'm not selling you on this call — just seeing if it's worth a real conversation. Worth putting 15 on the calendar?"
```

### 6.5 Voicemail drop (15-20 sec max)

```
"Hey {{first_name}}, it's {{user_first_name}} from {{company_name}}. Sending you a quick text right after this with a link to grab 15 minutes if you want to talk about AI answering and booking for {{niche}}. No pressure. Talk soon."
```

Pair with an SMS 30 seconds later referencing the voicemail. Pair lift: 2-3x vs voicemail alone.

### 6.6 Breakup email (touch 7)

```
Subject: closing your file

{{first_name}},

Reached out a few times and haven't heard back — that's fine, timing doesn't line up for everyone. I'm closing your file on my end so I stop cluttering your inbox.

If it changes, the link's here: {{booking_link}}

{{user_first_name}}
```

Keep under 50 words. Don't over-apologize. Don't try to re-sell. The breakup works because the pressure drops to zero.

---

## 7. GATEKEEPER HANDLING

The gatekeeper is usually: front desk, assistant, partner, or receptionist. They're paid to filter.

**Rules:**
1. Never lie about who you are or why you're calling. It kills trust the moment the decision-maker finds out.
2. Be friendly, not subservient.
3. Name the decision-maker if you know them. Vague = gatekeeper blocks harder.
4. Ask for help, not access.

**Scripts:**

**Gatekeeper answers — DM's name known:**
```
"Hey — is {{first_name}} around? It's {{user_first_name}} from {{company_name}}, she reached out on LinkedIn last week and I wanted to circle back. If she's busy, no problem — what's the best way to get her on the phone for 10 minutes this week?"
```

**Gatekeeper answers — DM's name unknown:**
```
"Hey — who handles marketing / new business / operations over there? I'm calling from {{company_name}} about AI automation for {{niche}} shops. Looking for the right person, not trying to spam the office."
```

**"What's this in regards to?"**
```
"We help {{niche}} businesses handle after-hours leads with AI voice — I'd love 15 minutes with {{dm_name}} to see if it's even a fit. Can I leave a callback or email to schedule it?"
```

**"Send me an email, I'll pass it along":**
```
"Yeah, happy to. What's the best email to reach {{dm_name}} directly? I'll cc you on it so nothing falls through."
```
This extracts the DM's direct email ~30% of the time.

---

## 8. THE BOOKING — ALWAYS 2-SLOT CLOSE

Never offer 3 or more time options. Cognitive load drops response rate (Jam Study, Iyengar 2000 — choice paradox). Always:

> "Two times work on my end — Tuesday at 10am or Thursday at 2pm. Which works better?"

If neither: "No problem, reply with 2 windows that work and I'll make one of them happen."

If they counter-propose: accept immediately, don't negotiate.

**Send calendar invite within 60 seconds of the yes.** Include:
- Zoom / Meet link
- Call purpose (1 sentence)
- Closer's name + photo + short bio (Kai's resource)
- Expected call length (20 minutes)
- What the prospect needs to have ready (1-2 items max)

**Confirmation SMS 24 hours before:**
```
Hey {{first_name}} — quick reminder, we're chatting tomorrow at {{appointment_time}} with {{closer_name}}. Here's the link: {{zoom_link}}. Talk then.
```

**Same-day SMS 1 hour before:**
```
{{first_name}} — {{closer_name}} is jumping on in 1 hour. Looking forward to it. {{zoom_link}}
```

No-show rate with this 2-touch confirm pattern: typically under 20%. Without it: 35-45% (Calendly 2023 benchmark, directional).

---

## 9. OBJECTION HANDLING — SETTER-SPECIFIC

These are the objections that happen BEFORE the call, not on it. Keep them short. Setter's job is to redirect to the call, not to win the argument.

### "How much does it cost?"
```
"Fair question — and I could throw a range at you, but honestly it depends on your setup. Our cheapest is a few hundred a month, the custom tier can run into the thousands. The 15-min call is literally about figuring out what fits you. No pitch if it doesn't, I promise."
```

Never quote a specific number on a setter touch. Ever. Price discussions are closer work.

### "Why should I talk to you?"
```
"Honest answer — because {{specific_observation}}, and we've built this specifically for {{niche}} in {{region}}. If what I said doesn't land in 3 minutes on the call, you hang up. 15 minutes tops, no homework."
```

### "We already have something."
```
"Awesome. Quick one — does it cover voice AI during off-hours, or just business hours? Most of the 'something' we hear about is chat on the site, not phones. If you've got a system running 24/7 on phones already, I'll get off your back."
```

Pain-first probe. If they have true 24/7 voice coverage, they're either a competitor's customer or uniquely well-served. Exit gracefully.

### "Send me more info."
```
"Happy to send a 1-pager. But candidly — the info-in-the-inbox path converts pretty poorly because it's generic. The 15-min call is where we actually look at YOUR setup. If after the call you still want materials, I'll send everything. Worth a shot?"
```

If they insist on info-only: send a concise 1-pager (Lex has a template) and tag `info-sent-no-call`, put in a 14-day nurture that comes back to the call ask.

### "Call me in 3 months."
```
"Can do. Two quick things — what's happening in 3 months that makes it better? And — want me to ping you on the exact date, or pre-schedule a spot now so it doesn't get lost?"
```

The "pre-schedule" often converts. Riley (Reminder Agent) owns the callback date if they defer.

### "I'm not the decision maker."
```
"Fair enough. Who should I be talking to — you want to intro me, or share the right name + email?"
```

Extract the real DM's info. Don't re-pitch the non-DM.

### "Is this AI / a bot?"
Always disclose. Never lie.
```
"Yeah — I'm the AI assistant handling follow-ups for {{user_first_name}} over at {{company_name}}. If you'd rather talk to {{user_first_name}} directly I can book that in 30 seconds. What works?"
```

Lying about being AI = CRTC violation risk (Telecom Regulatory Policy 2023-150 guidance) + instant trust death.

### "Take me off your list."
```
"You got it — done right now. Sorry for the interruption."
```
Honor immediately. Tag `do-not-contact`. Log for Connor. Never argue, never "are you sure?".

---

## 10. HANDOFF TO CLOSER — THE BRIEFING NOTE

The moment a call is booked, the setter creates a briefing note in GHL (or the closer's CRM). This is **non-negotiable**. A closer walking into a call blind loses deals.

### Briefing template

```
## CALL BRIEFING — {{first_name}} {{last_name}} @ {{company_name}}
**Scheduled:** {{appointment_time}} — {{zoom_link}}
**Closer:** {{closer_name}}
**Source:** {{source — LinkedIn cold / email cold / referral / ad}}
**Niche:** {{niche}} | **City:** {{city}} | **Website:** {{url}}

### WHAT I LEARNED
- **Pain (in their words):** "{{pain_quote}}"
- **Current stack:** {{what_they_use_now}}
- **Budget signal:** {{budget_signal}}
- **DM status:** {{sole_DM / needs_partner / other}}
- **Timeline:** {{now / 30d / 60d / Q3 / unclear}}

### QUALIFIERS (4/4 or 3/4?)
- Budget: ✅/❌ — {{notes}}
- Authority: ✅/❌ — {{notes}}
- Need: ✅/❌ — {{notes}}
- Timeline: ✅/❌ — {{notes}}

### RED FLAGS
{{any concerns — not really interested, price-shopping, competitor spy, etc.}}

### RECOMMENDED OPEN
Based on what they said, suggested first question: {{specific_question}}

### ARTIFACTS
- LinkedIn: {{linkedin_url}}
- GBP: {{gbp_url}}
- Website: {{website_url}}
- Relevant review/post observation: {{observation}}
```

Closer reads this in the 5 minutes before the call. Sam (Sales) enforces it.

---

## 11. METRICS — WHAT TO MEASURE

Setter KPIs (adapt floor/target by niche and season):

| Metric | Starting target | Red flag |
|---|---|---|
| Touches per day (multichannel) | 80-120 | Under 50 |
| Connect rate (reach a human) | 8-15% | Under 5% |
| Qualifying call completion rate | 40-60% of connects | Under 30% |
| Qualified-to-booked rate | 50-70% | Under 40% |
| Booked-to-show rate | 70-85% | Under 60% |
| Show-to-close rate (closer's job) | 20-40% | *(not a setter metric)* |

Gong / Salesloft / Outreach 2024 benchmarks hover in this range for B2B services outbound. Adjust per vertical with Anna (Analyst).

### When to adjust

- Connect rate below 5% → bad number data (Scout re-enriches) OR bad times (Anna reruns)
- Qualified-to-booked below 40% → setter is over-qualifying OR pitch is off (Sam rides calls)
- Booked-to-show below 60% → confirm sequence broken OR closer is low-trust (Quinn audits)

---

## 12. NICHE ADAPTATIONS

### Generic B2B service (dental, plumbing, HVAC, realtor)
- Default cadence above works
- Specific observation from GBP reviews > LinkedIn profile
- Phone-first: these owners are on phones more than email

### Agency-to-agency (Easy Deploy partner acquisition)
- LinkedIn-heavy — agency owners live there
- Lead with "white-label platform" not "AI agents" — they already sell AI
- Budget qualifier is softer — they buy for markup, not direct use

### Mortgage-pro recruitment (for OLS brokerage)
- LinkedIn + email only — no cold call to another licensed agent (optics)
- Consent basis: published FSRA licensee registry (public record, PIPEDA-permissible for role-relevant contact)
- Tone: peer-to-peer, never "exciting opportunity"
- FSRA disclosure still required in every message (see `fsra-mortgage-advertising-compliance.md`)

### High-ticket coaching / mastermind (not Xpert's current line but supported)
- Longer cadence: 21-30 days
- More personalization per touch — the prospect can smell template at this tier
- Video DM on LinkedIn works well (Loom or BombBomb)

---

## 13. SEE ALSO

- `cold-outreach-sequences.md` — copy library for every touch
- `high-ticket-closer.md` — what happens when the call actually happens
- `business-proposal-writing.md` — what's sent after the closer call
- `easy-deploy-legal-disclaimer.md` — legal footer every CEM inherits
- `funnel-qualified-landing-page.md` — inbound counterpart to outbound setter motion
- `sam.md` — Sam's discovery / close framework
- `message-tone.md` — tone rules for every template

---

## 14. RED LINES — DO NOT CROSS

1. Never quote price on a setter touch
2. Never lie about being human when asked if AI
3. Never buy a list
4. Never send to a DNC-registered number without documented exemption
5. Never skip the 24hr + 1hr confirmation SMS — no-show rate tanks the closer
6. Never book an unqualified prospect "just to fill the calendar" — wastes the closer + inflates no-show
7. Never use `{{fake_specific_observation}}` — if the observation isn't real, don't use the "specifically" framing
8. Never argue an opt-out — honor instantly
9. Never call before 9am or after 9:30pm local time
10. Never skip Connor's pre-flight or Quinn's QA

---

*Last updated: 2026-04-22 — initial build. Owner: Sam. Co-owners: Lex, Eve, Connor, Quinn, Scout.*
