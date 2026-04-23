# Easy Deploy — Architecture

**Goal:** beat Ulio.ai. Agency partners (or business owners directly) sign up → an ORB chat interviews them → builds a full AI-automation system tailored to their niche + city + brand → auto-proposal with sliding-scale pricing → sign + pay → deploy to GHL sub-account. Even a teenager could use it.

**Renée's requirements locked in (2026-04-23, updated after pricing + compliance + ownership corrections):**
- ORB on a standalone page asks leads the questions that shape the build
- Bots are niche-based + website-knowledge-based (ORB learns the niche during the chat)
- Pricing page with default setup fee + default-minutes sliding scale + **manual type-in**
- AI-generated proposal sent to contact after "I like this" click — **must be editable before send, not just read-only**
- Sign + pay flow with contract
- Legal disclaimer protecting us (user responsible for their country/state/province laws)
- Generic bot library (9 bots listed below)
- Cold email centre (to be added later)
- Post-purchase: client picks digital number + uploads pricing sheets + extras; platform does the rest
- GHL BYO caller ID wired so client shows their own business number on outbound
- **SEPARATE BUSINESS** from Xpert's mortgage work — Easy Deploy has its own brand, domain, positioning. FSRA does NOT apply to Easy Deploy. The mortgage niche template is just one option, not the core of the product.
- **GHL is backend only.** Subscribers never see GHL's interface. Easy Deploy has its own custom frontend. GHL provides the plumbing (sub-account, workflows, voice AI).
- **Subscribers own their accounts.** They're direct customers, not "clients of an affiliate." Easy Deploy makes money on subscription + minutes. No affiliate-owns-client middleman.

## PRICING — locked in (2026-04-23)

Three tiers with minute-based caps + overage + hard-stop budget guardrail.

| Tier | $/mo | Minutes Included | Overage | Who it's for |
|---|---|---|---|---|
| **Starter** | $97 | 250 | $0.25/min | Solo / testing |
| **Grow** | $197 | 1,000 | $0.25/min | Active small business |
| **Scale** | $397 | 3,000 | $0.25/min | Busy / multi-location |
| **Custom** | negotiated | custom | negotiated | enterprise |

**Setup fee (one-time):** slider from $497 (simple) to $2,497 (complex), default $997. Includes: niche research, 9 bots configured for their niche, voice selection + training, number provisioning, first 14 days hand-holding.

**Hard-stop budget guardrail:** in Settings → Billing, owner sets a monthly cap. When reached, voice AI pauses (SMS + email keep running). Prevents runaway bills. Required to activate account.

**Marketing hook for $47:** optional first-month promo ($47 Try Month) that auto-rolls into Starter $97 in month 2. Real cost recovery + marketing conversion win.

## COMPLIANCE — what Easy Deploy actually says

No FSRA claims. No mortgage-license positioning. Easy Deploy is a general SaaS.

What we say:
- **Uses GHL's built-in A2P 10DLC registration** for SMS compliance (US)
- **CASL-compliant email flows** (Canada) via GHL's consent mechanics
- **Honours DNC / opt-out lists** automatically (GHL-managed)
- **PIPEDA-aware data handling** (Canadian data residency where available)
- **GDPR data export / delete** available on request (not automated yet)

What we DON'T say:
- FSRA-compliant (that's mortgage-specific, doesn't apply to Easy Deploy)
- "Canadian compliance-first" (overclaim — GHL provides standard CA tooling, not a compliance moat)
- Anything implying a compliance-qualified person is reviewing each subscriber's configuration

**Legal disclaimer still applies:** subscribers are responsible for their own compliance with their jurisdiction (CASL, TCPA, GDPR, local privacy laws). We're providing tools, not legal protection.

## VOICE AI — Decision locked 2026-04-23

- **Target (when budget allows):** Assistable.ai — pay-per-minute, flat rate, production-grade
- **MVP / bootstrapped mode:** use **GHL native Voice AI** inside Renée's agency-level sub-account (NOT ABC or EqM — they're templates)
- When Easy Deploy deploys a client, voice calls route through Renée's agency voice AI pool until revenue supports Assistable migration
- Future migration path: add a "Voice Provider" setting per client (GHL native / Assistable / ElevenLabs) so clients can upgrade when they want

## TWO USER TYPES — SAME CODEBASE, DIFFERENT VIEWS

### User Type A — End Subscribers (pay Renée $97–$397/mo)
Small business owners who use Easy Deploy to run their own AI automation. They see everything in the "SUBSCRIBER PAGES" list below.

### User Type B — Master (Renée)
Sees every subscriber page (she can view-as-subscriber to support) PLUS a Master Dashboard with:
- **Her AI consulting leads** (high-ticket prospects she's working)
- **Her AI Employees** — her own outbound calling agents used to find consulting clients
- **My SaaS Subscribers section** — list of paying Easy Deploy customers, MRR, usage (minutes consumed this month), churn risk flags, support ticket queue, new-signups feed

## SUBSCRIBER PAGES (10 — the actual product)

| Page | URL path | Purpose |
|---|---|---|
| **Main / Orb** | `/` | Hero page. Orb in the middle. Below the fold: scroll to a form (same questions Orb asks, visitor picks tap-Orb OR type-form). |
| **Build Preview** | `/build-preview` | After Orb/form done. Shows how many bots they need, estimated minutes, **sample voice button** (listen to how their bot would sound). |
| **Pricing** | `/pricing` | Tier sliders + **manual type-in** for monthly + setup. Shows budget guardrail setting. |
| **Proposal** | `/proposal/:id` | AI-generated, **editable before send**. Email via one click + contract + payment link in the email. |
| **Payment** | `/pay/:proposalId` | Stripe checkout + e-sign + T&Cs (5 mandatory checkboxes). |
| **Launch Pad** | `/launch` | **Onboarding wizard** after payment. Step-by-step: 1) pick phone number (new or BYO via GHL Verified Caller ID), 2) upload pricing sheets, 3) connect email, 4) connect calendar, 5) review bot voices, 6) go-live checklist. Progress tracker. |
| **Dashboard** | `/dashboard` | Their leads + today's calls + pipeline snapshot + minutes-used-this-month. |
| **Search** | `/search` | Lead Finder — search businesses by niche/city/country (Google Places API backend). Used for cold outbound campaigns. |
| **AI Employees** | `/employees` | The bot library — 9 core bots + niche-specific. Enable / disable / configure each. Per-bot live transfer toggle. |
| **Pipeline** | `/pipeline` | Kanban view of their deal flow — same as GHL pipelines but on Easy Deploy UI. |
| **Email + Calendar** | `/inbox` | Connect their Gmail + Google Calendar. Read emails from prospects, see calendar availability for demo bookings. Two-way sync via Gmail MCP + Google Calendar MCP. |
| **Settings** | `/settings` | Business config, default pricing for their own clients, payment integration, calendar integration, email integration, voice settings, branding, team seats. **Hard-stop budget cap** lives here too. |

## MASTER PAGES (Renée only — on top of all subscriber pages)

| Page | URL path | Purpose |
|---|---|---|
| **Master Dashboard** | `/master` | Consulting leads + SaaS subscribers in two panels. MRR, churn, support tickets, active usage. |
| **My SaaS Subscribers** | `/master/subscribers` | Subscriber list. Click in → view-as-subscriber, impersonate for support, see their usage, issue refunds, reset settings. |
| **Content Library** | `/library` | Creator/affiliate growth engine. 20% lifetime recurring. Niche kits. Accessible to affiliates Renée invites. |
| **Analytics** | `/master/analytics` | Platform-wide metrics — subscriber growth, average minutes, churn, cohort revenue. |

## AGENT BUILDER — Brain / Tests / Go Live / Business (Ulio pattern, improved)

When a partner clicks into a specific deployed bot to configure it, they see 4 tabs:

| Tab | What's in it |
|---|---|
| **Brain** | AI Greeting + Behavior + Knowledge Base (URL import + file upload) + Tone + Max-3-name-uses rule + Compliance disclosure auto-inserted |
| **Tests** | Real-time chat + voice test with transcript. **PLUS simulated-call button that runs 20 scripted scenarios automatically** (angry caller / wrong number / long-winded / silent / DND request / voicemail / etc.) |
| **Go Live** | Phone number assignment, live/pause toggle, schedule (hours), escalation rules (when to transfer to human), fallback voicemail |
| **Business** | The client business info — editable in-page so you don't have to bounce to Settings |

## POST-RECON ENHANCEMENTS (2026-04-23)

- **Platform Billing toggle** — Ulio pattern. "We handle payments from this business" — Stripe Connect for split billing. Partner gets margin, Easy Deploy takes COGS + platform fee.
- **Live Profitability Math** — sliders + real-time Est. Cost / Est. Profit / Profitable badge on pricing page.
- **Business Deep Dive** enrichment panel on every lead card.
- **Lead Insights tags** — Phone Issues / Below 4.0 / Booking Complaints / High Volume / Service Issues / etc.
- **Content Library** as 9th page (creator/affiliate growth engine — beats Ulio's 17% with 20% lifetime).
- **Team seats + role-based access** on Settings.
- **Live transfer / human escalation** option per bot.
- **Simulated call stress-test** on Voice Settings.
- **Marketing hook locked:** "Build it. Own it. Ship it." — ownership-first angle (Ulio's weak spot per red-flag comment).

See `ULIO-COUNTER-MOVES.md` for the full strategic breakdown of what we steal, improve, and ignore.

---

## THE TOP-LEVEL FLOW

```
VISITOR (public landing page)
   │
   ▼
ORB CHAT (standalone page, like the Jordan orb in Command Center)
   │  Interviews: niche, city/region, website, business name,
   │  current lead volume, pain points, products/services, team size
   ▼
LIVE BUILD PREVIEW (as ORB asks, the preview panel fills in)
   │  Shows: bot list being assembled, pricing tier being calculated,
   │  setup fee being computed
   ▼
SLIDING-SCALE PRICING PAGE
   │  User can tune: minutes tier (500/1k/2.5k/4k/7k),
   │  setup fee (simple → complex: $497/$997/$1,497/$1,997/$2,497),
   │  add-ons (cold email centre, extra bots, premium niche research)
   ▼
"GENERATE MY PROPOSAL" BUTTON
   │
   ▼
AI-GENERATED PROPOSAL PDF/EMAIL
   │  Claude API + Google Business scrape + website knowledge +
   │  niche-specific language + legal disclaimer baked in
   ▼
LEAD CLICKS "I'M IN"
   │
   ▼
CONTRACT SIGN + PAYMENT
   │  Stripe payment link, e-signature (PandaDoc, HelloSign, or Stripe's built-in)
   ▼
ONBOARDING — 3 ITEMS FROM CLIENT
   │  1. Pick digital phone number (or BYO via GHL Verified Caller ID)
   │  2. Upload pricing sheet(s) / service menus
   │  3. Any extras they want (logo, brand colors, specific SMS signature)
   ▼
AUTOMATIC DEPLOY
   │  GHL MCP clones ABC snapshot → populates custom values from ORB data →
   │  custom fields, tags, pipelines, AI prompts all niche-tailored →
   │  Twilio / GHL phone provisions the number → sub-account is live
   ▼
CLIENT DASHBOARD (their GHL sub-account, white-labeled)
   │
   ▼
RENÉE/PARTNER EARNS RECURRING
```

---

## THE ORB — STANDALONE CHAT PAGE

Separate from the main SaaS dashboard. Public URL like `easy-deploy-business.vercel.app/orb` (or `build.easydeploy.com`). Designed for a cold visitor to start a build in 5 minutes.

### Visual
- Fullscreen dark background (navy + gold — matches Xpert brand)
- Animated Jordan-style orb (3D sphere with pulsing glow)
- Chat bubbles appear as the orb "speaks"
- Right side panel: live build preview (updates as ORB learns)
- Mobile-first

### ORB's interview script (pseudo-flow — refined by ORB prompt)

Every question is outcome-framed, friendly, one at a time.

1. **Opener:** "Hey! I'm going to build you a full AI automation system in about 4 minutes. You ready? Tell me, what's your business called?"
2. **Niche:** "Nice — and what do you do? (dentist, plumber, realtor, mortgage, etc.)"
3. **Location:** "What city + country are you in? (So we know local context)"
4. **Website:** "Drop your website URL here — I'll read it so we can match the voice + know what you sell."
5. **Primary offer:** "What's the ONE product/service you want more of? (Pick the high-ticket one)"
6. **Other services:** "Got other services too? List up to 8 — I'll prep bots for each."
7. **Lead sources:** "Where do most of your leads come from today? (Google, Facebook, referrals, walk-ins, none yet)"
8. **Monthly volume:** "About how many leads hit you each month?"
9. **Follow-up pain:** "What happens when you can't call a lead back in time? (Pick: they ghost / they go to a competitor / I lose a few / not sure)"
10. **Team:** "How many people are on your team right now — just you, 2-5, or 5+?"
11. **Phone situation:** "Got a business phone number you want to keep, or need a new one?"
12. **Ambition:** "In 90 days, where do you want to be? More leads / Better follow-up / 24/7 coverage / Scale / All of it?"

→ (ORB may branch deeper based on niche — e.g. mortgage → "purchase, refi, HELOC, renewal?" / dental → "general, cosmetic, ortho, peds?")

### During the chat
- ORB scrapes the website in the background (fetch + extract headings, services, location data)
- ORB scrapes Google Business Profile if city + business name match
- Scorecard fills in: quality estimate, market size, competitor density, ticket size estimate
- Live build preview updates: bot list growing, pricing calibrating

### End of interview
- ORB summarizes: "Here's what I built for you..." → shows the bot list + pricing sliders pre-set
- CTA: "Want to see your proposal?" → generates it live

---

## PRICING ENGINE — SLIDING SCALE

Default tiers (from Renée's existing CLAUDE.md):

| Tier | Bots | Minutes | Monthly | Setup Fee |
|---|---|---|---|---|
| Essentials | 1–2 | 500 | $297 | $2,997 |
| Starter | 2–3 | 1,000 | $397 | $3,997 |
| Growth | 3–5 | 2,500 | $597 | $4,997 |
| Professional | 5–7 | 4,000 | $797 | $6,997 |
| Scale | 7–10 | 7,000 | $997 | $8,997 |
| Custom | 10+ | custom | negotiated | custom |

**Sliding scale on top:**
- **Setup fee slider:** Simple ($997) ← → Complex ($2,997). Slider affects number of custom bot configs + niche research depth.
- **Minutes slider:** 500 / 1,000 / 2,500 / 4,000 / 7,000 / custom. Affects monthly $.
- **Add-ons (checkboxes):**
  - Cold Email Centre — +$197/mo
  - Extra bot slot — +$47/mo each
  - Premium niche research (deep competitor + local market report) — +$497 one-time
  - White-label dashboard — +$97/mo
- **Annual billing discount:** 16.6% off (pay for 10 months, get 12) — toggle

**Overage:** $0.14/min above included tier

**Contract:** 3-month minimum, month-to-month after

**Price live-calculates as user slides** — no reload, no "contact sales" for standard configs

---

## THE BOT LIBRARY (per client deploy — niche-tailored)

Every client gets these **9 core bots** (branded to their niche):

1. **Inbound Reception** — answers inbound calls 24/7, routes by intent, books if qualified
2. **Outbound New Lead** — cold/warm outbound pre-qualify within 5 min of form submit
3. **Booking Reminder** — 24h + 1h appointment reminders (SMS + email, voice optional)
4. **No-Show Rebook** — triggers 1h after missed appointment, tries to rebook before nurturing
5. **Thank You** — post-close gratitude + next-step hand-off
6. **Follow Up** — general multi-touch follow-up for leads gone quiet
7. **Referral Request** — after positive outcome, triggers referral ask with tracking link
8. **High-Ticket Setter Outbound** — for businesses selling $1K+ services; cold reach to decision-makers
9. **High-Ticket Closer** — discovery call handler for $1K+ deals, value-stacking, objection-handling

**Plus niche-specific bots** auto-added when the niche is:
- **Mortgage:** Application Reminder, Document Chaser, Renewal Countdown (120/90/60/30/14-day)
- **Dental:** Recall reminder (6-month), Treatment Plan Followup
- **Realtor:** Listing Alert, Open-House Followup
- (More niches → more bot templates as Renée builds)

All bots:
- Use `{{custom_values.*}}` tokens — nothing hardcoded
- Follow `cold-outreach-sequences.md` cadences
- Obey the Killswitch pattern (voice/sms/email/master CVs)
- Write with human tone (message-tone.md rules)
- Respect CASL/TCPA/CRTC/PIPEDA/FSRA (Connor reviews)

---

## LEGAL — DISCLAIMER COVERAGE

Every proposal + contract + onboarding email includes the disclaimer (full version in `claude-skills/easy-deploy-legal-disclaimer.md` — sub-agent building now). Short version:

> Xpert Web Solutions Inc. provides the Easy Deploy platform and its AI automation templates. Clients are solely responsible for compliance with all telecom, privacy, advertising, and industry laws applicable to their country, state, province, and business. This includes but is not limited to CASL (Canada), TCPA (US), CRTC / DNC lists, GDPR (EU), PIPEDA, FSRA (for mortgage professionals), state-level privacy statutes, and AI-voice disclosure rules. Client is responsible for obtaining valid consent from their own leads before outreach. No guarantee of revenue, leads, or conversion outcomes is provided. Client indemnifies Xpert against claims arising from their misuse.

Lindsay (Legal agent) reviews quarterly + before any major change. **This is a template for an actual lawyer to approve before first paying client** — not legal advice.

---

## TECH STACK

| Component | Tool |
|---|---|
| Frontend (marketing + ORB chat + dashboard) | React + Tailwind + Framer Motion + existing navy/gold theme |
| ORB 3D animation | React Three Fiber (matches Jordan orb in Command Center) |
| Backend API | Vercel serverless functions (Node) OR Cloud Run (Python) |
| AI (ORB, proposal gen) | Claude API with prompt caching |
| Database | Vercel KV or Firebase (existing KPI Master pattern) |
| Website/GBP scraping | Cheerio + Google Places API |
| CRM (deployed per client) | GHL sub-account cloned from ABC snapshot |
| Phone | GHL Twilio + Verified Caller ID (BYO number) |
| Voice AI | GHL native AI Voice OR ElevenLabs fallback |
| Payment | Stripe (MCP authenticated) + payment links |
| E-signature | PandaDoc, HelloSign, or Stripe Tax/Contract |
| Email delivery | Gmail MCP (onboarding) + SendGrid (volume) |
| Hosting | Vercel |
| Auth | Clerk or Vercel auth (simple) |

---

## CRITICAL PATH TO FIRST DOLLAR

### Week 1 — Foundation (this week)
1. ✅ ABC snapshot finalized (Console running now)
2. Skills sub-agent delivers: proposal-writing + high-ticket setter + high-ticket closer + legal-disclaimer (running now)
3. Video sub-agent delivers: Ulio recon full doc (running now)
4. Renée reviews architecture (this doc) + approves

### Week 2 — Backend
5. Build `/api/orb` endpoint — Claude API chat with system prompt embedded + tool-use for website scrape + GBP lookup
6. Build `/api/generate-proposal` endpoint — uses `business-proposal-writing.md` as system prompt, outputs PDF + preview HTML
7. Wire Stripe payment link creation in `/api/create-payment-link`
8. Wire GHL snapshot clone in `/api/deploy-client` — GHL MCP call to clone ABC → populate CVs from ORB data → assign phone number

### Week 3 — Frontend
9. Build the ORB chat page (`/orb`)
10. Build the pricing slider page (`/pricing`)
11. Build the proposal preview + sign + pay flow (`/proposal/:id`)
12. Build the partner dashboard (8-section layout matching Ulio's baseline: Dashboard / Businesses / Find Leads / Analytics / Branding / Resources / Support / Settings)

### Week 4 — Polish + Ship
13. Legal review (Lindsay + actual lawyer)
14. QA pass (Quinn)
15. First test client — Renée herself or trusted pilot partner
16. First paying client → onboard
17. Feedback → iterate

---

## DIFFERENTIATORS VS ULIO

| Feature | Ulio | Easy Deploy |
|---|---|---|
| Onboarding | Partner signup → manual lead hunting | **ORB chat** — lead describes business, system builds itself |
| Lead Finder | Partners use their UI to find businesses | Same, PLUS ORB scrapes lead's website + GBP automatically |
| Bots deployed | Receptionist + chatbot + website | **9 core bots + niche-specific** (mortgage, dental, realtor, etc.) |
| Pricing | Fixed tiers | **Sliding scale** — matches client's situation |
| Proposal | Auto-generated, template | Auto-generated, **niche + city + website-aware** |
| Compliance | US-first | **Canadian-first + US + EU aware**, CASL/CRTC/PIPEDA/FSRA built in |
| Killswitch | Not documented | **4-channel killswitch** (voice / SMS / email / master) |
| Cold email | None | **Cold Email Centre** (future add-on) |
| Customization | Shallow | **Deep** — ABC snapshot → client-specific data → custom branding |
| White-label | Yes | **Yes + deeper** — orb / dashboard / emails all re-brandable |

---

## RENÉE'S RULES FOR THIS BUILD

- **Teenager-friendly** — if a 16-year-old can't run it, it's too complex
- **5-minute ORB** — no longer or they lose interest
- **No dead ends** — every qualified lead either buys, gets a "come back later" tag, or gets a human review
- **Legal baked in** — no client ships without seeing the disclaimer
- **Canadian compliance first** — US comes along for the ride; EU handled if asked
- **Mortgage is optional vertical** — available when client picks mortgage niche, otherwise invisible
- **ORB gets smarter over time** — track which questions convert, iterate prompts monthly
