# Cold Outreach Sequences — Multichannel Playbook

**Owner:** Sam (Sales), co-operated with Lex (Copy), Eve (Email), Connor (Compliance), Quinn (QA)
**Scope:** Xpert Web Solutions Inc. — AI Consulting, SaaS, and Mortgage (EquityMax) verticals.
**Use when:** Any new outbound or re-engagement campaign is being designed for any niche.
**Do NOT use for:** Existing sales process — see `../claude-skills/sam.md`. Tone rules — see `../claude-skills/message-tone.md`. Voice opener — see `../XpertVault/projects/equitymax-snapshot/voice-bot-inspiration/canadian-outbound-prequalify.md`. Chat prequalify — see `../XpertVault/projects/equitymax-snapshot/voice-bot-inspiration/mortgage-chat-bot-cad.md`. Universal sales AI rules — see `../XpertVault/projects/equitymax-snapshot/voice-bot-inspiration/power-agent-voice-ai-rules.md`.

---

## 1. FOUNDATIONS

### 1.1 Frameworks this skill pulls from

- **SPIN (Rackham):** Situation → Problem → Implication → Need-payoff. Used inside discovery; for cold outreach we open at Problem/Implication because we haven't earned Situation yet.
- **Challenger (Dixon/Adamson):** Teach-Tailor-Take Control. Lead with a reframe or an insight the prospect hasn't heard. Best for B2B AI Consulting opens.
- **Sandler "Pain Funnel":** surface → business → personal pain. We don't get to personal pain in cold — we aim for business pain in message 2-3.
- **3x3 / Apollo / Lemlist / Instantly patterns:** short (under 75 words), one ask, one CTA, plain text, no images, personalized first line, second-line pattern interrupt.
- **Power Agent Voice AI Rules (Universal):** pain-first / price-last, paint-picture questions, max 3 name-uses, don't dump features, show outcomes not specs. All templates inherit these — see file above.

### 1.2 Channel choice — when to use what

| Channel | Use when | Avoid when |
|---|---|---|
| Email | B2B always. Longer value statements OK. Deliverability-controllable. | B2C high-urgency (too slow). |
| SMS | Opt-in leads only. 24-48h after form fill for mortgage. Booked-meeting nudges. | Cold purchased lists (CRTC + CASL violation). |
| Voice AI (outbound call) | Explicit opt-in leads, <72h from form fill. B2B warm leads with prior signal. | No consent. DNC-registered numbers without express consent override. |
| Voicemail drop (RVM) | Reached voicemail from a live AI call — leave 15-20s message. | Proactive RVM without call attempt = CRTC grey zone in Canada. |
| LinkedIn DM | B2B cold. Recruitment (mortgage agents). | B2C mortgage (platform rules). |
| Paid re-target (Meta/Google) | Form-fill abandon; post-call nurture. | Cold list upload without hashed consent match. |

### 1.3 Cadence principle — the 7-Touch / 3-Channel Rule

Industry data (Salesloft, Apollo, Gong 2024-2025 reports):
- 1-touch reply rate on cold B2B email: **1-2%**
- 5-touch multichannel: **8-12%**
- 7-touch multichannel with a pattern interrupt: **12-18%**
- Reply rate drops sharply past touch 9 — diminishing returns, rising spam-flag risk.

**Rule:** 7 touches, across 3 channels, over 14-21 days, then exit gracefully. Re-enter only after a cooldown (90 days) with a new angle.

---

## 2. CANADIAN COMPLIANCE TRIPWIRES — NON-NEGOTIABLE

### 2.1 CASL (Canada Anti-Spam Legislation)

- **Express consent required** before any Commercial Electronic Message (CEM) to an email, SMS, or messaging app. Form submission counts as express consent only if the opt-in is clearly worded and the purpose is disclosed.
- **Implied consent** is allowed for 2 years after a business inquiry, 6 months after an existing customer relationship, or indefinitely for published business email addresses that do not display an opt-out notice AND where the message is relevant to the role of the recipient.
- **Mandatory in every CEM:**
  1. Sender identification (business legal name)
  2. Mailing address
  3. One other contact method (phone, email, or URL)
  4. A working unsubscribe link — honored within **10 business days**
- **Penalty:** up to $10M per violation (business), $1M (individual).
- **Purchased lists without consent = illegal.** Do not load them.

### 2.2 CRTC — Unsolicited Telecommunications / National DNC

- Before any outbound cold dial or RVM: **scrub against the National DNC List** (lnnte-dncl.gc.ca). Renée's DNC subscriber login lives in the Command Center API vault.
- Existing Business Relationship (EBR) exemption: 18 months from last transaction; 6 months from inquiry.
- Time-of-day restriction: **9:00 AM - 9:30 PM local time** weekdays; 10:00 AM - 6:00 PM weekends.
- Caller ID must show the business's valid callback number.
- Keep internal DNC list for 3 years after opt-out.

### 2.3 PIPEDA

- Collect only what's needed. Store securely. Purpose-limited.
- If scraping public data (e.g., LinkedIn, business directories) → personal work email in a professional context is generally permissible for professional outreach, but the message must be relevant to that role.
- Right of access and correction — if asked, produce or delete within 30 days.

### 2.4 FSRA (Mortgage advertising — Ontario)

- Every mortgage-outreach asset (email, SMS, voicemail) must include:
  - Agent name as licensed
  - "Mortgage Agent Level 2" or appropriate title
  - Brokerage name (Ontario Lending Solutions)
  - FSRA licence number (`{{custom_values.license_number}}`)
- Never quote a specific rate in cold outreach.
- Never guarantee approval.

### 2.5 Connor's pre-flight checklist (run before every campaign)

- [ ] Consent source documented for each recipient (form, EBR, implied B2B)
- [ ] Sender identity block drafted and attached to template
- [ ] Unsubscribe mechanism live and tested
- [ ] DNC scrub run within the last 31 days (CRTC requires monthly refresh)
- [ ] FSRA disclosures present on every mortgage asset
- [ ] Quinn has QA'd the sequence end-to-end on Renée's test contact only
- [ ] Campaign logged in GHL with consent timestamps per recipient

Connor signs off in writing before Norm/Gill activate the sequence.

---

## 3. SEQUENCE TEMPLATES

Every sequence uses these conventions:

- Tokens: `{{contact.first_name}}`, `{{contact.email}}`, `{{contact.phone}}`, `{{custom_values.user_first_name}}`, `{{custom_values.company_name}}`, `{{custom_values.niche}}`, `{{custom_values.booking_link}}`, `{{custom_values.unsubscribe_link}}`, `{{custom_values.mailing_address}}`, `{{custom_values.license_number}}` (mortgage only), `{{custom_values.ai_agent_name}}`, `{{custom_values.ai_inbound_call_number}}`.
- Email sender block and unsubscribe link attached by default (Eve's footer template).
- Mortgage templates include FSRA disclosure block (handled by GHL email signature custom value).
- Every SMS ends a sequence branch, not a thread — no "reply YES/NO" prompts.
- Tone inherits `../claude-skills/message-tone.md`: texting a friend you respect.

---

### 3A. SEQUENCE — AI Consulting Cold B2B New Prospect (7-touch)

**Use for:** dental practices, realtors, trades, mortgage brokers, any service business.
**Consent basis:** CASL implied consent (published business email relevant to their role) OR express (form fill / LinkedIn connect accepted).
**Duration:** 18 days.
**Goal:** Book a 15-minute discovery call with Renée.

**Cadence:**

| # | Day | Channel | Trigger |
|---|---|---|---|
| 1 | 0 | Email | Sequence start |
| 2 | 2 | SMS | If email opened OR clicked, NOT if bounced |
| 3 | 5 | Email | No reply from #1 |
| 4 | 8 | Voice AI call | Business hours local time |
| 5 | 10 | SMS | Reference voicemail or missed call |
| 6 | 14 | Email | Value / case study |
| 7 | 18 | Email | Breakup / exit |

---

**Touch 1 — Email: "the 3am booking problem"**

- **Subject:** quick question about {{custom_values.niche}} after-hours
- **Variables:** niche, user_first_name, company_name, booking_link
- **Body:**

```
Hey {{contact.first_name}},

Quick question — when a lead hits your site at 11pm on a Sunday, what happens?

We build AI agents that qualify and book {{custom_values.niche}} leads 24/7 — voice and SMS — so nothing gets dropped after hours. Most of our clients see the first booking come through in the first 72 hours.

Worth a 15-minute look? {{custom_values.booking_link}}

{{custom_values.user_first_name}}
{{custom_values.company_name}}
{{custom_values.mailing_address}}
Unsubscribe: {{custom_values.unsubscribe_link}}
```

- **Expected response handling:**
  - Reply "yes/interested" → Sam takes over, move to Proposal stage.
  - Reply "send info" → send 1-pager + calendar link, keep sequence running.
  - Reply "not interested" → tag `not-interested`, pause 90 days → sequence 3G.
  - Hard bounce → remove from sequence, flag to Eve for list hygiene.

---

**Touch 2 — SMS: soft bump**

- **Trigger:** email opened but no reply.
- **Body:**

```
Hey {{contact.first_name}} — sent you a note earlier about after-hours lead capture for {{custom_values.niche}}. Did it land in your inbox? No pressure either way.
```

- **Response handling:**
  - "who is this" → reply with name + company in plain language, offer to send info.
  - "stop" / "unsubscribe" → honor immediately, tag `sms-optout`, never SMS again.

---

**Touch 3 — Email: Challenger reframe**

- **Subject:** most {{custom_values.niche}} owners are answering the wrong way
- **Body:**

```
{{contact.first_name}},

Real talk — the benchmark for converting a web lead drops 80% after the first 5 minutes. Most {{custom_values.niche}} offices can't staff that. Nobody can.

That's the entire reason AI agents exist. Not to replace your front desk — to cover the 16 hours your front desk isn't open.

If you want to see what this looks like for a {{custom_values.niche}} business, grab 15 min here: {{custom_values.booking_link}}

{{custom_values.user_first_name}}
```

---

**Touch 4 — Voice AI call**

- Use the outbound script pattern from `canadian-outbound-prequalify.md`, adapted: identity → reason for call → one qualifying question → book or exit.
- **Opening (first 10 seconds — must pass the human test):**

```
"Hey, is this {{contact.first_name}}?"
[wait]
"Hey {{contact.first_name}}, it's {{custom_values.ai_agent_name}} from {{custom_values.company_name}}. I'm the AI assistant {{custom_values.user_first_name}} has helping out — not a telemarketer, promise. You've got a sec?"
```

- If no → "Totally fair. Want me to text you a link instead?" → hang up, trigger Touch 5.
- If yes → one question only: "Quick one — how are you handling leads that come in outside business hours right now?" Then pivot to book.

---

**Touch 5 — SMS: voicemail/missed-call reference**

- **Body:**

```
{{contact.first_name}} — just tried you. Totally get it, bad timing. If easier, here's a link to pick a 15-min slot that works: {{custom_values.booking_link}}
```

---

**Touch 6 — Email: social proof / case study**

- **Subject:** how a {{custom_values.niche}} shop booked 14 consults in week one
- **Body:** 2-sentence specific result from another client in same niche (Lex writes the actual copy per niche), 1-line CTA.

---

**Touch 7 — Email: breakup**

- **Subject:** closing your file
- **Body:**

```
{{contact.first_name}},

I've reached out a few times and haven't connected — totally understand, this isn't the right moment. I'm closing your file on my end so I stop cluttering your inbox.

If timing changes, the link's always here: {{custom_values.booking_link}}

{{custom_values.user_first_name}}
```

Breakup emails reliably outperform follow-ups 4-6 in reply rate (Lemlist 2024 data: ~3x). Do not skip this touch.

---

### 3B. SEQUENCE — Mortgage Cold B2C New Lead (form fill, 5-touch)

**Use for:** inbound mortgage leads from EquityMax or any licensed mortgage client.
**Consent basis:** Express — form submission with clear opt-in disclosure.
**Duration:** 7 days.
**Goal:** Pre-qualify + book consultation with `{{custom_values.user_first_name}}`.
**Compliance:** FSRA block on every email. No specific rate quoted. No approval guaranteed.

**Cadence:**

| # | Minutes/Days | Channel | Trigger |
|---|---|---|---|
| 1 | T+2 min | SMS | Form submit |
| 2 | T+5 min | Voice AI call | Form submit, business hours |
| 3 | T+1 hr | Email | If no call pickup |
| 4 | T+1 day | SMS | If no booking yet |
| 5 | T+4 days | Email | Re-engage value |

---

**Touch 1 — SMS (2 min after form fill)**

```
Hey {{contact.first_name}} — it's {{custom_values.ai_agent_name}} from {{custom_values.company_name}}. Got your inquiry about {{contact.service_type}}. {{custom_values.user_first_name}} is gonna ring you in a couple minutes, totally casual, just a few questions. If now's bad, text me back a better time 👋
```

---

**Touch 2 — Voice AI call (5 min after form fill)**

Use the full script in `canadian-outbound-prequalify.md`. Do not re-write here.

---

**Touch 3 — Email (1 hr after, if no pickup)**

- **Subject:** couldn't catch you — quick note on your {{contact.service_type}} question
- **Body:**

```
Hey {{contact.first_name}},

Tried you a little earlier about your {{contact.service_type}} inquiry — looks like bad timing.

{{custom_values.user_first_name}} works with everything from first-time buyers to self-employed to private lending, so there's usually an angle that fits. No obligation, no pressure — just a 15-minute call to see what you're working with.

Book a slot that works for you: {{custom_values.booking_link}}

{{custom_values.user_first_name}}, Mortgage Agent Level 2
{{custom_values.company_name}} — Licence #{{custom_values.license_number}}
{{custom_values.mailing_address}}
Unsubscribe: {{custom_values.unsubscribe_link}}
```

---

**Touch 4 — SMS (24 hrs)**

```
{{contact.first_name}} — still want to chat about your {{contact.service_type}}? Here's {{custom_values.user_first_name}}'s calendar if easier than a call: {{custom_values.booking_link}}
```

---

**Touch 5 — Email (4 days)**

- **Subject:** one thing most people don't know about {{contact.service_type}}
- **Body:** one sharp insight tied to their service type (e.g., stress test math, HELOC vs refi trade-off, B-lender option). Written by Lex, niche-specific. End with calendar link.

After Touch 5 with no engagement → move to long-term nurture pipeline (monthly value email from Eve), not another cold push.

---

### 3C. SEQUENCE — Old Lead Resurrection (4-touch, B2B or B2C)

**Use for:** any lead silent 90+ days with a prior inquiry on file (implied consent still valid under CASL 2-year window).
**Duration:** 10 days.
**Tone:** apologetic, curious, low pressure. "Saw this and thought of you."
**Goal:** reopen the conversation with a new angle.

**Cadence:**

| # | Day | Channel |
|---|---|---|
| 1 | 0 | Email — pattern interrupt |
| 2 | 3 | SMS — curious check-in |
| 3 | 7 | Email — new angle / new offer |
| 4 | 10 | Email — graceful exit |

---

**Touch 1 — Email: pattern interrupt**

- **Subject:** did I drop the ball?
- **Body:**

```
Hey {{contact.first_name}},

We talked a while back about {{contact.last_inquiry_topic}} and then I went quiet on you. That's on me.

Quick check — is this still something you're working on, or did you figure it out? Either answer is fine.

{{custom_values.user_first_name}}
{{custom_values.company_name}}
Unsubscribe: {{custom_values.unsubscribe_link}}
```

The "did I drop the ball" opener has been a top-performing reactivation pattern for years (consistently 15-25% reply in reported Apollo/Lemlist data) because it reverses posture — the seller is accountable, not the lead.

---

**Touch 2 — SMS: casual check-in**

```
{{contact.first_name}} — hey, it's {{custom_values.user_first_name}}. Saw your name come up and realized I never circled back. Still need help with {{contact.last_inquiry_topic}}?
```

---

**Touch 3 — Email: new angle**

- **Subject:** something changed since we last talked
- **Body:** 1-sentence new thing (new product, new lender, new AI capability, new price, new case study). 1-line CTA.

```
{{contact.first_name}},

Since we last spoke, {{custom_values.new_angle_one_liner}}. Thought it might be relevant to what you were trying to sort out.

Worth a 15-min catch-up? {{custom_values.booking_link}}

{{custom_values.user_first_name}}
```

---

**Touch 4 — Email: graceful exit**

- **Subject:** closing the loop
- **Body:**

```
{{contact.first_name}},

I'll stop nudging. If anything changes, you know where to find me.

{{custom_values.user_first_name}}
```

Keep it under 25 words. Breakup reactivations often reply here specifically because the pressure drops to zero.

---

### 3D. SEQUENCE — Recruitment Cold Outreach (3-touch)

**Use for:** licensed mortgage agents in Ontario who might switch brokerages. Data source: FSRA public licensee registry (public record, PIPEDA-compliant for professional outreach).
**Consent basis:** Implied — published professional role-relevant contact.
**Duration:** 9 days.
**Tone:** peer-to-peer, not recruiter-y. No "exciting opportunity" language.
**Goal:** 20-min intro call with Renée / brokerage recruiter.

**Cadence:**

| # | Day | Channel |
|---|---|---|
| 1 | 0 | Email |
| 2 | 4 | LinkedIn DM (if connected) or SMS (if opt-in exists) |
| 3 | 9 | Email exit |

---

**Touch 1 — Email: peer-to-peer**

- **Subject:** coffee chat?
- **Body:**

```
Hey {{contact.first_name}},

Saw you're with {{contact.current_brokerage}} — not pitching you to switch, just wanted to connect agent-to-agent.

I'm with {{custom_values.company_name}} and we've been building out some AI tools on the backend (lead intake, document collection, follow-up) that are honestly changing how we close deals. A few of the agents here have doubled their volume this year.

If you're open to a 20-min coffee chat — virtual or in person — I'd love to compare notes. No sales pitch, promise.

{{custom_values.user_first_name}}, Mortgage Agent Level 2
{{custom_values.company_name}} — Licence #{{custom_values.license_number}}
{{custom_values.mailing_address}}
Unsubscribe: {{custom_values.unsubscribe_link}}
```

---

**Touch 2 — LinkedIn DM or SMS**

LinkedIn (preferred — professional context):

```
Hey {{contact.first_name}}, sent you a note earlier — just looking to connect with other Ontario agents. No agenda. Open to a quick chat?
```

---

**Touch 3 — Email exit**

- **Subject:** last note
- **Body:**

```
{{contact.first_name}},

Not going to keep bugging you. If you ever want to swap notes on how the business is changing, I'm here.

{{custom_values.user_first_name}}
```

---

### 3E. VOICE AI COLD CALL OPENER (first 10 seconds, universal)

Used at the top of every outbound voice call. Generalizable across AI Consulting and Mortgage.

```
[Line rings, prospect answers]

"Hey, is this {{contact.first_name}}?"
[WAIT for yes]

"Hey {{contact.first_name}} — it's {{custom_values.ai_agent_name}}, the AI assistant working with {{custom_values.user_first_name}} over at {{custom_values.company_name}}. Quick heads up, I'm not a human — but I am the one who picks things up after hours. You got a sec?"
[WAIT]
```

**Why this opener works:**
- Confirms identity first (Sandler-style pattern interrupt)
- Discloses AI voluntarily — builds trust, differentiates from spam callers, and stays on the right side of CRTC Telecom Regulatory Policy 2023-150 guidance on AI-generated voice.
- Uses `{{custom_values.user_first_name}}` to anchor to a real human the prospect recognizes (or can look up).
- Asks for permission — "you got a sec" — not assumptive.
- Zero script-y language. No "I hope you're doing well today."

**If they say no:** "Totally fair — want me to shoot you a text with a link instead?"
**If they say yes:** Go directly to ONE qualifying question. Don't launch a pitch. Pain-first. Inherit `power-agent-voice-ai-rules.md` — max 3 name uses total for the whole call.

---

### 3F. VOICEMAIL DROP (15-20 seconds)

Fires when the voice AI call routes to voicemail.

**Universal template:**

```
"Hey {{contact.first_name}}, it's {{custom_values.ai_agent_name}} on behalf of {{custom_values.user_first_name}} at {{custom_values.company_name}}. You'd inquired about {{contact.service_type}} — I'll send a text right after this with a link so you can grab a time that works. No rush. Talk soon."
```

- Keep it under 20 seconds — longer drops get deleted.
- Always pair with an SMS fired 30 seconds later referencing the voicemail ("just left you a voicemail, here's the link…"). Pair lift: 2-3x vs voicemail alone.
- Never include a rate, price, or guarantee.
- For mortgage: swap the business line to include licence disclosure: "{{custom_values.user_first_name}} is a Mortgage Agent Level 2 with {{custom_values.company_name}}, Licence {{custom_values.license_number}}."

---

### 3G. RE-ENGAGEMENT AFTER "NOT INTERESTED" (30 / 90 / 180 day)

**Trigger:** contact tagged `not-interested` in any prior sequence.
**Rule:** never re-engage before 30 days. Never more than 3 times total (30, 90, 180).

---

**Touch at Day 30 — Email: low-pressure**

- **Subject:** not selling — just curious
- **Body:**

```
Hey {{contact.first_name}},

Totally respected the "not interested" last time. Not pitching you today.

Just curious — what ended up being the real reason? Wrong timing, wrong fit, or something specific about what we offered? Doesn't change anything on my end, I just learn a lot from honest answers.

{{custom_values.user_first_name}}
Unsubscribe: {{custom_values.unsubscribe_link}}
```

Reply rate on this specific pattern is historically strong because it's genuinely not selling — and the ones who reply often re-qualify themselves.

---

**Touch at Day 90 — Email: new angle**

- **Subject:** {{custom_values.new_feature_or_case_study_short}}
- **Body:** 3 sentences. New capability, new result, new angle. Soft CTA.

---

**Touch at Day 180 — Email: clean-out**

- **Subject:** keeping your inbox clean
- **Body:**

```
{{contact.first_name}},

Been a while since we've connected. I'll take you off my list unless you'd like to stay in the loop on what we're building for {{custom_values.niche}} businesses.

Stay on the list: {{custom_values.stay_on_list_link}}
Clean me out: {{custom_values.unsubscribe_link}}

No hard feelings either way.

{{custom_values.user_first_name}}
```

After Day 180 with no response, auto-unsubscribe and tag `archived-no-response`. CASL best practice — don't hold CEM consent indefinitely without engagement.

---

## 4. OBJECTION HANDLING — COLD CHANNEL SPECIFIC

These are different from Sam's discovery objections — these happen before any conversation exists.

**"How did you get my info?"**
> "Totally fair question. I found you through {{source — public business listing / LinkedIn / form you filled out}}. If you'd rather I not reach out again, just let me know and you're off the list immediately."

**"I never agreed to this."**
> "You're right to push back. I'll take you off my list right now — you won't hear from me again. Sorry for the interruption."
> Then: tag `complaint`, unsubscribe within seconds, log the incident for Connor. If this happens more than twice in a week, Connor pauses the campaign.

**"Take me off your list."**
> CASL requires honoring within 10 business days — we do it immediately. Auto-unsubscribe, tag `sms-optout` or `email-optout` or `call-optout`, confirm with one SMS: "You're off the list. Sorry for the trouble."
> Never argue. Never try to save. Never send a "are you sure" confirm prompt.

**"Not interested but…"**
> Hook for re-qualification. Whatever's after the "but" is the actual objection.
> Response: "Got it. What's the 'but' — timing, price, already have something? I'll stop pitching, just curious."

**"Is this a bot/AI?"**
> Disclose immediately. "Yeah — I'm the AI assistant {{custom_values.user_first_name}} has handling follow-ups. {{custom_values.user_first_name}} reads everything I send though, and if you want to talk to them directly I can get that booked in 30 seconds."
> Lying about being human = CRTC violation risk + trust-killing. Always disclose.

**"I already work with someone."**
> Not an invitation to attack the competitor. "That's great — curious, are they covering 24/7 follow-up, or just business hours?" (pain-first) → exit if no opening.

**"What's this about?"**
> One sentence. Answer. No pitch. "You filled out a form about {{contact.service_type}} / I saw you're running a {{custom_values.niche}} practice and wanted to ask one question about after-hours lead handling."

---

## 5. SALES PSYCHOLOGY — BAKED INTO EVERY TEMPLATE

Inherited from `power-agent-voice-ai-rules.md`. Non-negotiable:

1. **Paint-picture questions.** "When a lead hits your site at 11pm on a Sunday, what happens?" makes them SEE the gap. Better than "do you have after-hours coverage?"
2. **Pain first, price last.** Never lead with a price. Never attach a price to a cold touch. Price comes on the call, after fit is confirmed.
3. **Max 3 name-uses per conversation.** Count them. Over-use = salesman. Under-use = cold.
4. **Features once, benefits once.** Don't stack them. Mention once when positioning; only repeat if asked.
5. **Confirm fit before listing features.** Get a "yeah, that's a problem" nod before you solve it.
6. **Don't dump info.** One ask, one hook, one CTA per message. If the email is over 75 words, cut it.
7. **Frame price as investment.** When price inevitably comes up: "only an investment of {{custom_values.package_price}}/mo plus ad spend." Not "it costs."
8. **Outcomes over specs.** "Books 14 consults in week one" beats "supports multi-turn conversation with sentiment analysis."
9. **Paint the contrast.** Current state vs state-with-our-system. Make the gap obvious.
10. **Ask about current spend.** Then show the math. "You said you spend $3K/mo on Google Ads — how many of those leads convert?" Then compare to AI cost.

---

## 6. METRICS, BENCHMARKS, TUNING

### 6.1 Expected benchmarks per channel

Benchmarks drawn from Salesloft State of Sales 2024, Apollo 2024 outbound report, Gong Reality of Sales 2024, and Lemlist 2024 public performance data. Treat as starting targets, not promises.

| Channel | Open rate | Reply rate | Book rate | Notes |
|---|---|---|---|---|
| Cold email (B2B) | 35-55% | 2-5% (per touch), 8-15% (per sequence) | 1-3% | Plain-text outperforms HTML. Subject <5 words. |
| Warm email (opt-in B2C mortgage) | 55-75% | 8-15% (per touch), 20-35% (per sequence) | 5-12% | First 10 minutes matter — speed-to-lead wins. |
| SMS (opt-in) | ~98% delivered | 10-25% | 3-8% | Single short sentence. Never two in a row. |
| Voice AI outbound (opt-in B2C) | n/a | Pickup 25-40%, engage 50%+ of pickups | 8-18% of pickups | Call within 5 min of form submit = 4-10x pickup vs 1 hour later. |
| Voicemail drop | n/a | 2-5% callback | 0.5-2% | Always pair with SMS. |
| LinkedIn DM (B2B) | ~60% read | 8-20% | 1-3% | 2nd-degree connects reply at ~2x rate of cold. |

### 6.2 When to adjust cadence

- **Reply rate below 2% on a B2B sequence after 50+ sends:** pause. Rewrite subject lines and Touch 1 body with Lex. Do not increase volume.
- **Unsubscribe rate above 0.5% per touch:** pause. Connor reviews consent basis. Eve reviews list hygiene.
- **Spam complaint rate above 0.1%:** stop immediately. Deliverability damage compounds. Eve reviews domain health, warm-up, SPF/DKIM/DMARC alignment.
- **Open rate below 20% on B2B:** deliverability problem, not copy problem. Eve diagnoses before we touch the body.
- **Book rate below benchmark but reply rate on target:** CTA or offer problem. Kai reviews the offer, Lex reviews the close.

### 6.3 A/B testing — simple rules

- Test ONE variable per test: subject line, first line, CTA, or send time. Never multiple at once.
- Minimum sample: 200 sends per arm for email, 50 for SMS. Anything less is noise.
- Keep the winner for 2 weeks before testing the next variable — watch for decay.
- Never A/B test compliance language. That's Connor's, not a test variable.

---

## 7. INTEGRATION — WHO DOES WHAT

| Agent | Owns |
|---|---|
| **Sam** | Overall sales process, the cadence strategy, objection handling on live conversations, pipeline stage management. Sam references this skill; Sam does not write copy. |
| **Lex** | Every subject line, hook, first line, CTA. Sam calls Lex with context ("B2B cold, dental niche, pain = after-hours"), Lex writes the actual text. |
| **Eve** | Email deliverability — SPF/DKIM/DMARC, warm-up, domain reputation, sender rotation, list hygiene, unsubscribe plumbing. No campaign fires until Eve signs off on domain health. |
| **Connor** | Compliance sign-off on every campaign before activation. CASL consent audit, CRTC DNC scrub, FSRA disclosures. Pulls the kill switch if any complaint threshold trips. |
| **Quinn** | End-to-end QA on Renée's test contact only (4168784622 / renee.ross@gmail.com). Walks the full sequence, checks tokens render, links work, unsubscribe honors, voicemail drops fire, SMS doesn't double-send. Produces READY/NOT READY verdict before Norm/Gill activate. |
| **Norm** | n8n wiring for any cross-platform automation (CRM sync, list scrub, DNC check, LinkedIn enrichment). |
| **Gill** | GHL workflows, AI Agent Studio config, SMS/Voice AI orchestration, custom values. |
| **Ryan** | Any factual claim in copy (stats, regulations, benchmarks) goes through Ryan first. No fabricated numbers. |
| **Hawk** | Audits every sent sequence post-launch for compliance drift, tone drift, benchmark miss. |

---

## 8. LEAD-JOURNEY WALKTHROUGH — MANDATORY BEFORE ACTIVATION

Every sequence passes through `../claude-skills/lead-journey-walkthrough.md` before it fires. Walk:

- Positive path: all replies, all bookings, all happy outcomes → does the sequence stop cleanly?
- Negative path: hard bounce, soft bounce, unsubscribe, "wrong number", "stop", spam complaint → does each one get handled and tagged?
- Edge cases: reply to a token-broken email; SMS sent to a landline; voicemail drop on a busy signal; contact replies AFTER the sequence ended.
- Compliance: does every touch still include CASL footer / FSRA disclosure? Does the unsubscribe link work from touch 1 through touch 7?
- Timing: does any touch fire outside the CRTC 9am-9:30pm window for the recipient's local timezone?

If any of the above fails, the sequence does not ship. Fix first.

---

## 9. RED LINES — DO NOT CROSS

1. Never send to a contact without documented consent basis.
2. Never call a DNC-registered number without an active EBR exemption or express consent.
3. Never quote a specific mortgage rate in a cold message.
4. Never guarantee approval, outcome, or result.
5. Never impersonate a human when asked if it's AI. Disclose.
6. Never ignore an opt-out. Honor within seconds, not 10 business days.
7. Never buy a list. Ever.
8. Never use Renée's real contact info in a live campaign — only for testing with Quinn.
9. Never launch a campaign without Connor's written sign-off and Quinn's READY verdict.
10. Never skip the breakup/exit email. It protects deliverability and often converts best.

---

*Last updated: 2026-04-22 — initial build. Owner: Sam. Co-owners: Lex, Eve, Connor, Quinn.*
