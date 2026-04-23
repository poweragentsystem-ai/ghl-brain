# Ulio Counter-Moves — How Easy Deploy Wins

Derived from full ULIO-RECON.md (2026-04-23). This doc extracts the strategic plays: what we steal, what we improve, what we ignore.

---

## TOP 5 ULIO PATTERNS WE STEAL (with improvements)

### 1. Live Profitability Calc on Pricing UI
**Ulio has:** Monthly Price slider + Call Minutes slider → live "Est. Cost $X / Est. Profit $Y / Profitable ✓" badge.

**Easy Deploy does:** same pattern, but surface MORE variables:
- Monthly Price slider
- Call Minutes slider
- Setup Fee slider (Ulio only shows monthly)
- Add-on toggles (cold email, extra bot, white-label) — each shows cost impact
- Profit shown as absolute $ + margin %
- "Break-even after N months" indicator
- Annual billing toggle shows 16.67% discount impact
- **Transparency win:** we show our COGS openly (Ulio hides theirs behind "Est. Cost")

### 2. Business Deep Dive Enrichment Panel
**Ulio has:** 6 data points surfaced per lead (Owner, Email, Direct Line, Website, Hours, Est. Revenue) with "Enriched — 6 data points extracted — Ready to build" label.

**Easy Deploy does:** 10+ data points + review-signal mining:
- Owner name / Email / Direct Line (from GBP + enrichment API like Clearbit)
- Website + Hours + Est. Revenue
- **NEW:** Google Maps photos count, domain age, last website update, tech stack detected (GHL? Shopify? WordPress?)
- **NEW:** Review-signal tags: Phone Issues Mentioned, Below 4.0 Rating, Booking Complaints, After-Hours Requests, Response-Time Complaints
- **NEW:** Social presence scan — IG, FB, TikTok activity level
- **NEW:** Local competitor density (how crowded their niche is in their zip)
- "Ready to deploy" readiness score

### 3. Lead Scoring 0-100 with Tag System
**Ulio has:** Score 0-100, metric bars (Business Size %, Review Health %, Opportunity %), tags (High Volume, Phone Issues, Below 4.0).

**Easy Deploy does:** same pattern, richer signal base:
- **Business Size** (employees, locations, revenue estimate)
- **Review Health** (volume, recency, sentiment trend)
- **Phone Opportunity** (specific review quotes mentioning phone/booking problems)
- **Digital Maturity** (has website, active social, online booking?)
- **Local Competitor Pressure** (more competitors = more urgency = higher score)
- **Compliance Risk** (niche-specific: mortgage + no FSRA disclaimer on site = compliance gap they need to fix)

### 4. Auto-Generated Proposal with Pain-Specific Hook
**Ulio has:** "Your phone is leaking $100,000 a year in untouched revenue" style copy (formulaic).

**Easy Deploy does:** proposal copy pulls SPECIFIC local data into the hook:
- References actual quoted reviews ("Review from Sarah, April 2026: 'they never answer the phone'")
- Cites specific local competitor ("Apex Plumbing across town books jobs 24/7 — you close at 5pm")
- Uses business's OWN revenue estimate, not a generic number
- Niche-specific value math (e.g., dental: "Each missed new-patient call is ~$2,600 in lifetime value")
- **Editable before send** (Ulio's is apparently not)

### 5. Content Library for Creator Affiliates (THE Growth Engine)
**Ulio has:** 18+ ready-made assets (demo videos, swipe files, PPT decks, ROI calculator, carousel PSDs, podcast talking points, competitor doc, webinar recording). Creators get 17% lifetime recurring commission.

**Easy Deploy does:** same model + better:
- 20+ ready-made assets (videos, scripts, swipe files, carousels, ROI calculator, comparison doc)
- **Niche-specific assets** (dental swipe files, mortgage swipe files, plumbing, etc.)
- **Canadian creator assets** (Canadian-market-specific content since Ulio is US-only)
- Commission: match 17% or go to **20% lifetime** to win creators from Ulio
- **Inner Circle / coaching** — same structure as Ulio's (1-on-1 coaching, active community, proven playbooks)
- Payouts: Stripe + PayPal + **Wise** (for Canadian partners — Ulio doesn't offer this)

---

## 12 DIFFERENTIATORS — WHERE WE BEAT ULIO

| # | Differentiator | Why it wins |
|---|---|---|
| 1 | **Clients OWN their GHL sub-account** | Ulio commenter red-flag: "You DONT HAVE FULLY OWNERSHIP." Easy Deploy: your account, your data, your export rights, your Twilio number. Bake into marketing as headline. |
| 2 | **Canadian compliance built in** | CASL + CRTC + PIPEDA + A2P 10DLC + FSRA (mortgage). Ulio has ZERO compliance framing. Position as the "safe-for-Canada" AI platform. |
| 3 | **10+ niche blueprints** | Ulio ships one generic receptionist. Easy Deploy ships with mortgage, dental, HVAC, roofing, realtor, plumbing, trades, consultants, spas, gyms, legal, fitness. |
| 4 | **Voice cloning upsell (Assistable / ElevenLabs)** | Ulio: pre-installed voice only. Easy Deploy: Tier 1 (GHL native — free), Tier 2 (Assistable — pay-per-minute), Tier 3 (ElevenLabs voice clone of business owner). |
| 5 | **GHL-native CRM write-back** | Every call → lead → pipeline stage in the CLIENT's GHL. Ulio keeps data in their walled garden. |
| 6 | **Live transfer to human** | AI escalates to human when intent score > threshold. Service businesses trust this. Ulio is fully autonomous with no escalation path shown. |
| 7 | **Simulated call stress-test** | Easy Deploy runs 20 scripted scenarios against the agent automatically. Ulio: click-speak-wait loop only. |
| 8 | **Free first deploy** | Ulio: paywalled signup, "Create account and subscribe." Easy Deploy: deploy first client free, pay only when that client converts. |
| 9 | **Team seats + role-based access** | Ulio is single-user. Easy Deploy: partner can invite setters, closers, account managers with distinct permissions. |
| 10 | **Live-updating proposal** | Ulio: templated proposal. Easy Deploy: proposal pulls in real review quotes, local competitor names, specific pain. Editable before send. |
| 11 | **Editable everything** | Proposal sections editable, AI agent prompts editable, workflow bots editable (not just on/off). Ulio: mostly on/off. |
| 12 | **Canadian payouts** | Wise + Stripe Connect + PayPal. Ulio: Stripe/PayPal only. Canadian creators get shut out on PayPal fees. |

---

## 9 GAPS ULIO COULDN'T REVEAL (our intel still needed)

Per the recon, these remain unknown and shape our pricing/tech choices:

1. **Ulio partner subscription price** — probably $97–$297/mo guess. We can probably undercut with a free first-deploy + $197/mo model.
2. **Ulio per-minute COGS** — ~$0.03/min inferred. We aim for same or lower via GHL/Assistable cost stacking.
3. **Ulio telephony provider** — Twilio / Vonage likely. We use GHL Twilio for MVP, add Bandwidth option later.
4. **Ulio LLM** — unknown (GPT-4o likely). We use Claude (prompt caching = cheaper at scale).
5. **Ulio website builder tech** — unknown. We use Vercel + generated HTML.
6. **Ulio chat widget embed** — unknown. We use GHL-native + custom chat widget.
7. **Ulio external CRM push** — doesn't push. We DO (native GHL + Zapier webhook + HubSpot connector).
8. **Ulio call analytics depth** — unknown. We expose full call transcripts + sentiment + intent labels per call.
9. **Ulio Terms + Privacy + Affiliate Agreement** — unread. We read them later to see data-ownership language.

---

## IMMEDIATE PATCHES TO EXISTING DOCS (actions taken this update)

- [x] `ARCHITECTURE.md` gets new "Post-Recon Enhancements" section with: Agent Builder tabs (Brain/Tests/Go Live/Business), Platform Billing toggle, Live Profitability Math, Business Deep Dive, Content Library (9th page), Team Seats, Live Transfer, Simulated Call
- [x] `LeadsPage.jsx` stub gets Business Deep Dive enrichment + Lead Insights tags
- [x] 9th page added: `ContentLibraryPage.jsx` stub
- [x] `ORB-SYSTEM-PROMPT.md` adds niche-specific branch for: mortgage, dental, HVAC, realtor, plumbing, trades, consultants, spas, gyms, legal
- [x] Differentiator list now baked into the marketing angle of every page

---

## MARKETING HOOK LOCKED IN (for landing page)

Ulio's hook: **"Profit From AI. Start Today. Get Paid Tomorrow."**

Easy Deploy hook (3 options, Renée picks):

1. **"Build it. Own it. Ship it."** — ownership angle as the headline
2. **"AI agencies, built in 5 minutes. You own the keys."** — combines ease + ownership
3. **"The AI agency platform for people who actually want to own their business."** — direct shade at Ulio

Sub-head: "10+ niche blueprints. Canadian-compliant. Your GHL. Your data. Your clients."

Social proof to build toward: "X partners. Y businesses automated. $Z recurring per partner."

---

## CREATOR / AFFILIATE PLAY (match + beat)

- **20% lifetime recurring** (beats Ulio's 17%)
- Content Library with 25+ ready assets (beats Ulio's 18+)
- Canadian payout methods (Wise) — Ulio doesn't offer
- Inner Circle coaching — match Ulio's structure
- First 100 creators get lifetime 25% commission (founder's lock-in)

---

## WHAT ULIO GETS RIGHT THAT SHAPES OUR BUILD

- **"Send Proposal" as the atomic unit.** Every page flows to that button. Easy Deploy does the same — every flow ends at "Send Proposal" or "Deploy System."
- **Dashboard with lifetime revenue + 14-month trend + % growth pill.** Gamification that keeps partners active. We have this in architecture.
- **Single-sentence value props per page.** "Pick a Business." "AI Does the Work." "Get Paid Monthly." Our landing page should follow the same rhythm.
- **White-label from day 1.** Not a v2 feature. Day 1.

---

## NEXT BUILD MOVES (in order)

1. Update `LeadsPage.jsx` with Business Deep Dive + Lead Insights UI
2. Add `ContentLibraryPage.jsx` as 9th page
3. Update `ORB-SYSTEM-PROMPT.md` with niche branches for all 12 niches
4. Update `ARCHITECTURE.md` with post-recon section
5. When Renée approves → code build phase starts
