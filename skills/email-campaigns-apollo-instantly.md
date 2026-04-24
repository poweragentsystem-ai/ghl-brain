---
name: Email Campaigns (Apollo/Instantly-style)
description: Build + run cold email campaigns with contact enrichment, AI personalization, deliverability rotation, reply detection. For outbound SDR-style sequences, not transactional email.
owner: Eve (Email) + Lex (Copy) + Devon (Systems)
type: skill
---

# EMAIL CAMPAIGNS — Apollo / Instantly Pattern

## When to use this skill
- Building cold outbound sequences (Apollo, Instantly, Lemlist, Smartlead pattern)
- Any request for "email campaigns," "cold email," "outbound sequences," "email warming," "inbox rotation"
- Not for: transactional (password reset, receipt), nurture sequences for already-engaged leads (that's `eve.md`), newsletter broadcasts

## Core architecture — what a real Apollo/Instantly clone needs

### 1. Contact enrichment
Before a sequence sends, every contact record gets enriched. Sources in priority order:
- **Email → domain → Clearbit/Apollo API** (company name, industry, headcount, tech stack, funding)
- **LinkedIn scrape** (role, tenure, recent posts, mutual connections) — Rex (Scraper) owns this
- **Domain scrape** (about page, team page, services, pricing, recent blog posts) — Rex
- **Google News API** (last 30 days of company mentions)
- **GHL custom fields** (if contact exists in client's GHL, pull existing data first)

Output enriched record: `first_name, last_name, role, company, company_size, industry, tech_stack, last_funding, recent_news, linkedin_url, company_pain_signals[]`.

### 2. Campaign builder
Subscriber creates a campaign with:
- **Audience** — CSV upload OR saved filter from Search (ex: "Dentists in Toronto, 2-10 employees, reviewed 4.0+ stars, no website booking")
- **Sequence** — 3-7 touches, each with delay, channel (email | LinkedIn DM | SMS), and trigger (send | skip if replied | branch on open)
- **Variant testing** — up to 3 subject lines + body variants per touch, auto-stop losers after 50 sends
- **Sending window** — days of week + hours (respect recipient timezone)
- **Inbox rotation** — pool of connected sender inboxes, round-robin with daily limits per inbox

### 3. Personalization engine
NOT mail-merge. Mail-merge = "Hi {{first_name}}, I noticed {{company}} is in {{industry}}." That reads as spam.

Real personalization = Claude API generates a unique opener per contact using enriched data. System prompt:
```
You are writing the OPENING LINE of a cold email to a stranger.
Context about recipient: {enriched_record_json}
Context about sender: {subscriber_context}
Subject of email: {subject}

Write ONE sentence that:
- References ONE specific thing from their company (recent news, website copy, open role, LinkedIn post)
- Is observational, not praise ("Saw you just hired your 4th SDR" beats "Great work on your SDR team")
- Is 10-18 words
- Doesn't use the words "noticed," "impressed," "congrats," "synergy"
- Sounds like a human who actually looked, not AI

Return the opening sentence only. No quotes, no preamble.
```

Cache the result per contact. Don't regenerate unless enrichment updates.

### 4. Deliverability — inbox rotation + warming
- Each subscriber connects 3+ sending inboxes (Google Workspace accounts on separate domains — Instantly pattern)
- Daily send limit per inbox: 30-40 first week, ramp to 100 over 4 weeks
- Auto-warming: before a new inbox sends campaigns, it exchanges 10-20 conversational emails/day with a warming network (other subscribers' inboxes + AI-responder accounts) for 2-4 weeks
- SPF / DKIM / DMARC check before any inbox goes live — fail = refuse to send
- Rotate sending inbox per contact (not per campaign) so the same recipient doesn't get sequential emails from different addresses

### 5. Reply detection + routing
- IMAP poll every 5 min per connected inbox
- Classify each reply: positive, negative, out-of-office, auto-reply, question, unsubscribe
- Classifier = Claude Haiku with the reply body + original thread
- **Positive → pause sequence + notify subscriber + create GHL contact + assign follow-up task**
- **Negative/unsubscribe → pause sequence + add to global suppression list (permanent)**
- **Out-of-office → pause sequence 7 days, resume**
- **Question → pause sequence + route to human + draft AI reply in subscriber inbox for approval**
- **Auto-reply (non-OOO) → continue sequence**

### 6. Unsubscribe + compliance
- Every email has a plain-text unsubscribe link in the footer (CAN-SPAM + CASL requirement)
- CASL: include sender physical address in footer (CASL mandatory). Subscriber's business address is the source of truth.
- One-click unsubscribe = instant global suppression, no confirmation page
- Suppression list is permanent + shared across all subscriber's campaigns
- PECR/GDPR for UK/EU recipients — extra: explicit opt-in required for marketing (our cold email model is B2B legitimate-interest which is OK under GDPR IF we include easy opt-out + clear sender identity)

## Stack — Vercel serverless path
- **Enrichment** — Clearbit API ($99/mo starter) + Rex (internal scraper) + Google News API. Store enriched records in Upstash Redis keyed by email hash, TTL 30 days.
- **Send queue** — Upstash QStash (delayed message scheduling). Each touch = a QStash message scheduled at send time.
- **Sending** — Nodemailer via connected Gmail accounts (OAuth) for Google Workspace inboxes. Microsoft Graph for Outlook.
- **Reply polling** — Vercel cron (every 5 min) hitting each connected inbox via IMAP.
- **Classification** — Claude Haiku API (cheap, fast).
- **UI** — React drag-drop sequence builder (existing ColdEmailPage.js in easy-deploy-app is the starting point, needs upgrade).

## Canadian compliance — non-negotiable
- **CASL** = "commercial electronic message" rules. Cold B2B email to business addresses is allowed IF:
  - Identified sender (real name + business name + physical address in footer)
  - Clear unsubscribe (1-click, honored within 10 business days)
  - Content is business-relevant to recipient's role
- **PIPEDA** = data handling. Enriched records must have: source documented, retention period defined (default 2 years), deletion on request within 30 days.
- **CRTC DNC Registry** does NOT apply to email (only telecom). Ignore.
- **FSRA** — if email is about mortgage products, add Renée's Mortgage Agent Level 2 + license number in footer. This is per her FSRA advertising compliance skill.

## Copy rules — Lex owns
- Subject line: 3-7 words. Lowercase. No "Re:" unless genuine reply. No emoji unless brand allows.
- Body: 50-90 words max. One clear ask. No double CTAs.
- Opening line: AI-generated per contact (see §3).
- Value prop: ONE sentence, outcome not feature ("book 3 demos/week on autopilot" not "AI-powered calendar scheduling").
- CTA: time-bound + low-friction ("worth a 12-min call next Tuesday?" not "let me know if you'd like to chat")
- PS line: OPTIONAL. If used, it's where the real hook goes — most recipients read PS before body.
- NEVER use: "I hope this finds you well," "synergy," "circling back," "touching base," "just checking in," "leverage" as verb, "reach out."

## Metrics to expose in UI
- Open rate (per inbox, per subject variant, per campaign) — pixel tracked, opt-outable
- Reply rate (positive + negative + OOO separately)
- Positive reply rate — THE metric, everything else is vanity
- Meeting booked rate (if calendar link in email, track bookings back)
- Bounce rate (hard bounce = remove from list immediately, soft = retry 1x)
- Unsubscribe rate
- Sender reputation (per inbox: spam rate, bounce rate, reply rate) — throttle inboxes that degrade

## Axel forward-walk — every campaign before launch
1. **Success path** — recipient opens → clicks → books meeting. Calendar slot available? Meeting confirmation sends? Meeting lands in Renée's calendar? Contact tagged in GHL as `sequence-booked`?
2. **Failure path** — recipient marks as spam. Inbox reputation drops. Do we auto-detect + throttle + alert?
3. **Multiplicity** — same contact is on 2 different campaigns. Do we dedupe? (YES — one contact, one sequence at a time.)
4. **Handoff** — positive reply lands. Who responds? Within what SLA? Is a draft reply auto-prepared?

## Gaps vs Apollo / Instantly (to acknowledge, not pretend we have)
- Apollo has a 200M+ B2B contact database. We don't — we enrich what the subscriber uploads.
- Instantly has a shared warming network with 200k+ inboxes. We start from zero — need partner warming or 3rd-party warming API (Mailreach / Warmup Inbox) in Phase 1.
- Lemlist has mid-sequence LinkedIn automation. We skip this in v1 (LinkedIn TOS risk).

## Phase order for Easy Deploy build
1. **v1 (Phase B-C)** — CSV upload → manual personalization via token editor → send via connected Gmail → basic reply detection → unsubscribe handling. No enrichment, no warming. Ships in 1 week.
2. **v2 (Phase D)** — Clearbit enrichment + AI opener generator + 3-touch sequences + subject variant testing. Adds 2-3 weeks.
3. **v3 (Phase E)** — Inbox rotation + warming integration + IMAP reply classification + campaign analytics. Adds 3-4 weeks.

---

**Related skills:** eve.md (email strategy + deliverability) · lex.md (copy rules) · rex.md (scraping) · cold-outreach-sequences.md (sequence templates) · message-tone.md (human voice)
