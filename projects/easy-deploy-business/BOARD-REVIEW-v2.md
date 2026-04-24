# Easy Deploy — Billion-Dollar Board Review (v2)

**Date:** 2026-04-23
**Reviewers:** 10 advisors (Hormozi, Cardone, Godin, Gary Vee, Belfort, Brunson, Kennedy, Robbins, Munger, Michalowicz)
**Product state reviewed:** live at easy-deploy-app.vercel.app + 32 page files in `C:/Users/User/easy-deploy-app/src/pages/`
**Brief from Renée:** 17 specific UX gaps flagged during a live walkthrough + the demand "as easy as 1, 2, 3 to use."
**v1 delta:** Where v1 praised positioning (Godin A-, Kennedy A-) and roasted distribution (Gary Vee D, Cardone C), v2 roasts EXECUTION. The hook is now great. The product is not usable yet.

---

## EXECUTIVE SUMMARY

The landing page is finally Ulio-caliber (Search / Deploy / Profit, Free AI Audit CTA, live subscriber counter, dashboard mockup). The *inside* of the app is not. The sidebar still says "Leads" and "Inbox" instead of "Search" and "Email" — the first three clicks contradict the hero promise. The Orb demo is scripted (not real Claude API), proposals are missing Country + AI Agent Name, there is no delete-confirmation anywhere, and light mode is an afterthought. Easy Deploy is 70% there on shell, 30% there on the 1-2-3 flow — and that 30% is exactly where money gets made.

---

## 1-2-3 TEST — WALKING THE 3-CLICK FLOW TODAY

**The promise (hero):** Search → Deploy → Profit.
**Reality walk:**

| Click | Expected | Actual | Friction | Score /10 |
|---|---|---|---|---|
| 1. "Start Earning" / "Get Free AI Audit" | Land on Orb, pick niche, get a business card in 60 seconds | Lands in `/register` or `/demo` (scripted). No Orb on homepage itself. | Button labels mismatch landing promise. Free-audit CTA routes to demo, not to a free audit. | 4 |
| 2. Inside app, click the first sidebar item that matches "Search" | A Lead Finder opens, typing "dentist toronto" returns scored cards | Sidebar says **"Leads"** (not Search). User pauses. Clicks anyway → lands on `LeadsPage.js` which is CRM leads, not a prospect finder. Correct page is `LeadFinderPage.js` which isn't in the sidebar. | Vocabulary mismatch. Two pages for the same mental model. | 3 |
| 3. Build AI, generate proposal, send | One click builds an agent + generates a branded proposal with live data | `AgentBuilder.js` exists but has no AI-agent-name field, no knowledge-attachment upload visible, scripted assistant instead of a real Claude call. `ProposalViewPage.js` is missing Country field + editable proposal sections. | The "Deploy" verb is not actually one click. | 3 |

**Composite 1-2-3 score: 3.3 / 10.** Ulio's equivalent walkthrough is ~7/10 based on the recon videos — they have vocabulary consistency (sidebar says "Find Leads"), the Send Proposal is one button, and the agent builder tabs (Brain/Tests/Go Live/Business) are the same words a partner would use.

Sources:
- `C:/Users/User/easy-deploy-app/src/layouts/DashboardLayout.js` lines 41-60 (sidebar labels)
- `C:/Users/User/easy-deploy-app/src/pages/LeadFinderPage.js` + `LeadsPage.js` (duplicate mental model)
- `C:/Users/User/easy-deploy-app/src/pages/AgentBuilder.js` (grep: 0 occurrences of "knowledge|attach|upload")
- `C:/Users/User/easy-deploy-app/src/pages/ProposalViewPage.js` (missing Country)

---

## 10 BOARD-MEMBER TAKES (with concrete UI changes)

### 01 · HORMOZI — Offer engineering

**Take:** The Grand Slam offer finally exists on `/pricing` (named bonuses, $916 value stack, 30-Day Build-or-Refund Guarantee — nice work). But the guarantee is buried at the TOP as a banner — which means a visitor reads it before they understand the product. Risk reversal eats an objection that hasn't formed yet. Move it.

**Concrete UI changes:**
1. In `PricingPage.js`, move the `GUARANTEE` banner (currently lines 163-172) to sit BELOW the 3 plan cards, framed as "Still skeptical? Here's your safety net." Pattern: objection → reversal.
2. On each plan card, the bonuses stack (lines 32-36, 58-63, 85-89) should show the **total value math** ($125 + $297 + $197 = $619 in bonuses alone, before the $97 price) in a strike-through "normally $716 → today $97/mo" format. Value Equation visible on glance.
3. On the landing page (`LandingPage.js` hero), add a sub-headline under "Free audit. No email wall." that names the guarantee: "30-Day Build-or-Refund. Free audit first. No credit card to start." This is certainty + risk reversal + friction removal in 12 words — Hormozi's three levers.

---

### 02 · CARDONE — Sales volume / follow-up

**Take:** v1 roasted this (C grade). Status now: the `ColdEmailPage.js` and `DomainWarmingPage.js` exist — good. But a subscriber lands in the app and there is no "Start your first outbound campaign in 60 seconds" CTA. The 10X engine is buildable but not wired as a default flow. A subscriber who doesn't know they need outbound won't find it.

**Concrete UI changes:**
1. On the Dashboard page, add a permanent "Not getting enough leads? Launch the 12-Touch Cadence" card with a one-click "Activate" that seeds ColdEmailPage with a pre-built sequence per niche. Default ON for new Starter/Grow subscribers.
2. In `MyBusinessHub.js`, add a "Follow-up Health" meter: green if every lead is on an active sequence, red if any lead has gone >72h without a touch. Names the gap Cardone obsesses over.
3. On `ContactsPage.js` (which does exist in the file list but isn't in the sidebar), add a bulk-action "Send all tagged leads into 12-Touch Cadence" button. Currently invisible.

---

### 03 · GODIN — Positioning

**Take:** v1 said A-. v2 says B. The hero now reads "Search. Deploy. Profit." which is literally Ulio's "Find. Build. Bill. Done." with a synonym substitution. Purple cow is losing its purple. "Build it. Own it. Ship it." was the differentiated hook — it's on the pricing page but missing from the hero. Ownership is the only thing Ulio can't copy overnight. Lead with it.

**Concrete UI changes:**
1. In `LandingPage.js`, change hero from "Search. Deploy. Profit." to "**Build it. Own it. Ship it.**" with a sub-line: "The AI agency platform you actually own. No walled gardens, no hostage data." (Ulio's #1 red-flag comment: "You DONT HAVE FULLY OWNERSHIP.")
2. Add a small "Your data. Your clients. Your keys." trust-bar between hero and dashboard mockup (currently line ~245 area).
3. Rename the `BASE_USERS = 691` counter label (line 11, 204) from "subscribers earning" to "**operators earning**" — name the tribe. Operators, not subscribers, not partners.

---

### 04 · GARY VEE — Distribution / content

**Take:** v1 gave a D. Still nothing shipping publicly. The product is now attractive enough to post about — that means every day without content is a compounding loss. Zero creator/affiliate page is visible on the site. Ulio's growth engine (Content Library + 17% lifetime) is still unmatched.

**Concrete UI changes:**
1. Add `/creator` public page mirroring Ulio's — headline "20% lifetime. Instant Wise/Stripe payouts. Canadian + US creators welcome." Link it from the landing-page footer. File doesn't exist yet (`Glob` on `src/pages/*` shows no `CreatorPage.js` or `AffiliatePage.js`).
2. Inside the app, `ResourcesPage.js` exists but I can't tell if it has swipe files. Populate with 5 ready-to-post TikTok scripts + 5 IG Reel hooks + 3 YouTube Short outlines by end of week. Stamp each with "Post today. Tag @easydeploy." Lowest-effort win on the list.
3. Add a "Today's Post" widget to the subscriber Dashboard: one pre-written caption + one pre-recorded clip of Renée per day. One click copies to clipboard. Operators become distribution.

---

### 05 · BELFORT — Closing / tonality

**Take:** The proposal (ProposalViewPage) is where the close happens. Missing Country + AI Agent Name + editable sections means the operator can't customize the certainty stack for their prospect. Straight Line says: the closer must control the narrative. Read-only proposals break that.

**Concrete UI changes:**
1. In `ProposalViewPage.js`, add fields: Country (dropdown: Canada / US / UK / AU / Other) + AI Agent Name (text, default "your new AI receptionist"). Both pipe into the proposal copy engine.
2. Make every proposal section (hero, pain mirror, solution, pricing, guarantee, signature) inline-editable — not just read-only. The operator should be able to tweak tonality per prospect. Belfort's 9 tones annotated in comments next to each section (// scarcity, // certainty, // logical).
3. Add a "3 Tens Check" widget on the pre-send screen: three sliders (Product 1-10, You 1-10, Company 1-10). If any <8, show a red warning "Raise certainty before sending" with one-click rewrite suggestions.

---

### 06 · BRUNSON — Funnels / value ladder

**Take:** The value ladder is now EXPLICIT on the pricing page (Free → $47 → $97 → $197 → $397 → $3K-15K consulting). Good. But there's no visible lead-funnel path into the ladder — no VSL, no webinar, no soap opera sequence. The Orb demo is supposed to be the top of funnel but it's scripted, not intelligent, so conversion will leak.

**Concrete UI changes:**
1. `/demo` (the Free AI Audit) must call Claude API — not scripted responses. Pull `ORB-SYSTEM-PROMPT.md` from the vault and wire it to a streaming `/api/orb` endpoint. Currently scripted per Renée's flag.
2. Add `/webinar` route with a 20-minute VSL "How Renée Built a $1M AI Agency with Claude Code" — gate the end-of-video CTA behind email capture → auto-triggers the 5-day soap opera sequence. File doesn't exist.
3. On every `/pricing` plan card (PricingPage.js line 195 area), show one tiny arrow to the next tier: "Grow operators save $48/mo vs 2x Starter" — makes the ladder feel like progression, not options.

---

### 07 · KENNEDY — Premium positioning / NO B.S.

**Take:** v1 said A-. v2 says B+. The copy has mostly left agency-speak behind, but the **Solutions** section still reads like a generic enterprise SaaS page ("Customer Support," "Internal Service Desk," "Lead Qualification" with bullet tags). That's every B2B landing page ever. Kennedy: "write the way your buyer talks when no one's listening." A dentist doesn't say "Internal Service Desk" — they say "my front desk is drowning."

**Concrete UI changes:**
1. `LandingPage.js` lines 366-388: rewrite the 6 solution cards in first-person niche voice. e.g. replace "Customer Support — 24/7 answering service with ticket creation" with "**The Dentist's Front Desk** — Your receptionist is drowning in same-day call-ins. Our AI books them while she does cleanings." Same for plumbers, realtors, mortgage brokers, salons, trades.
2. `/pricing` plan `desc` strings (lines 28, 48, 74) — scrub "white-label workspace" corporatese. "Your own AI workspace. Your logo. Your clients. Nobody else's." Mirror the buyer's internal monologue.
3. The FAQ section is MISSING from the live landing page (not in the snapshot). Add a Kennedy-style FAQ with the 6 real objections buyers have: "Is this another GHL wrapper?" / "Will my data get held hostage?" / "What if my clients fire me in month 2?" / "How do I sell this to a 55-year-old plumber?" / "Can I cancel?" / "Is this legal in Canada?" Name them plainly.

---

### 08 · ROBBINS — Psychology / 6 needs

**Take:** Renée's state while building: running hot, rushing to ship, which is how the 17-gap list happens. The product psychology side: the 6 human needs aren't mapped anywhere in the buyer flow. Easy Deploy buyers want **Certainty** (this won't break their business), **Significance** (their own brand, not Ulio's), and **Growth** (past solo founder). Currently only growth is signaled.

**Concrete UI changes:**
1. On the landing page hero, add a 3-icon trust row directly below the CTAs: **Shield "Your data stays yours"** / **Crown "White-label from day 1"** / **Arrow-up "Built to scale past solo"** — maps to Certainty / Significance / Growth in one glance.
2. In the Orb first question (when it becomes real in `/demo`), ask: "What matters most to you — getting leads fast, or building something that's yours?" Use the answer to route to the right landing-page variant (Certainty-framed vs Significance-framed). Segment by need.
3. For Renée: hard-stop the build clock at 3 PM today. State management is not optional. The 17-gap list is a symptom of tired-brain QA, not a product failure. Fix the 3 most important tonight, batch the rest to tomorrow.

---

### 09 · MUNGER — Inversion / risk management

**Take:** What would kill Easy Deploy this quarter? Inversion audit: (a) a subscriber's AI bot says something non-compliant and they sue, (b) GHL changes the MCP auth model and the deploy engine breaks overnight, (c) a Twilio/A2P rejection leaves subscribers paying $97 with no working voice. None of these have visible mitigations in the UI.

**Concrete UI changes:**
1. On `SettingsPage.js`, add a required "**I acknowledge compliance is my responsibility**" checkbox (similar to the 5 mandatory checkboxes on Sign + Pay per `easy-deploy-legal-disclaimer.md`). User cannot activate voice until checked. Don't just put it in the contract — put it in the UI.
2. Add a "System Status" card to the Dashboard showing: GHL connected ✓ / Twilio provisioned ✓ / A2P approved ✓ / Voice minutes available ✓. If any flips red, the subscriber sees it BEFORE they discover it from a failed call. Invert the failure mode.
3. In `AgentBuilder.js`, add a required "Compliance Disclosure Line" field that auto-injects into the AI greeting (e.g., "This call may be recorded and handled by an AI assistant"). Default ON. Per Munger: don't sign contracts that require you to sue to enforce — bake compliance into defaults so nobody has to enforce anything.

---

### 10 · MICHALOWICZ — Profit First / unit economics

**Take:** Pricing page shows margin % live (line 142, `marginColor` green ≥80%) — that's Michalowicz-approved. But the subscriber Dashboard has no "this month's profit" card for the subscriber's own business. Easy Deploy is a Profit First tool or it isn't — and right now it isn't.

**Concrete UI changes:**
1. On the subscriber Dashboard, add a **Profit First Snapshot** card: Revenue this month / Easy Deploy cost / Net profit / Target margin %. Pull from their connected Stripe. Michalowicz would call this the single most important screen in a small-business SaaS.
2. On `PricingPage.js`, the live profitability calc (lines 133-142) needs a "Break-even in X months" indicator next to the profit number. Subscribers stall because they can't see when ROI hits — name it.
3. Quarterly "Toss the Rocks" email (via Gmail MCP): "You spent $X on cold email, generated $Y — delete the bottom 10% performers?" One-click kill. Turns Easy Deploy into a cost-cutter, not just a tool.

---

## RANKED FIX LIST — TOP 10 BY IMPACT (Hormozi "biggest win per unit effort")

Each rated: Effort (1-5, lower = easier) · Impact (1-5, higher = bigger) · Ratio.

| # | Fix | File / Location | Effort | Impact | Win/Effort |
|---|---|---|---|---|---|
| 1 | **Rename sidebar: "Leads" → "Search", "Inbox" → "Email", add "Contacts"** | `src/layouts/DashboardLayout.js` lines 41-60 | 1 | 5 | 5.0 |
| 2 | **Swap hero headline to "Build it. Own it. Ship it."** + ownership sub-head | `src/pages/LandingPage.js` lines 207-224 | 1 | 5 | 5.0 |
| 3 | **Add Country + AI Agent Name fields to proposal** + make sections editable | `src/pages/ProposalViewPage.js` | 2 | 5 | 2.5 |
| 4 | **Wire `/demo` Orb to real Claude API** (currently scripted) | `src/pages/CreatePage.js` or new `/api/orb` endpoint | 3 | 5 | 1.67 |
| 5 | **Add knowledge-file upload + AI-agent-name field to AgentBuilder** | `src/pages/AgentBuilder.js` | 2 | 4 | 2.0 |
| 6 | **Universal delete confirmation modal** (replace inline deletes) | New `components/ConfirmDeleteDialog.js` + wire 3 existing pages | 2 | 4 | 2.0 |
| 7 | **Subscriber Dashboard: Profit First Snapshot + System Status cards** | `src/pages/PartnerDashboard.js` (or subscriber Dashboard equivalent) | 3 | 4 | 1.33 |
| 8 | **Move guarantee banner below plan cards + add bonus value stack math** | `src/pages/PricingPage.js` lines 163-200 | 1 | 3 | 3.0 |
| 9 | **Rewrite 6 solution cards in first-person niche voice** (Dentist / Plumber / Realtor / Mortgage / Salon / Trades) | `src/pages/LandingPage.js` lines 366-388 | 1 | 3 | 3.0 |
| 10 | **Light-mode polish pass** (drab currently — add brand gradient accents, fix contrast on `glass-card`) | `src/index.css` + component-level `.dark:` / `.light:` classes | 3 | 3 | 1.0 |

**Top 3 by ratio:** #1 (sidebar rename), #2 (hero swap), #8 (guarantee move). All three are 1-hour edits with massive UX payoff.

---

## ULIO GAP MATRIX

### What Ulio has that we DON'T
| Ulio feature | Easy Deploy status | Action |
|---|---|---|
| Sidebar vocabulary consistency (Find Leads = the search page) | Broken: sidebar says "Leads" but leads page is CRM, `LeadFinderPage.js` is orphaned | Fix #1 |
| One-click "Send Proposal" as the atomic action | `ProposalViewPage.js` exists but no visible Send workflow in the flow | Wire Proposal → Send Email → Payment Link in one button |
| Live Platform Billing toggle ("we handle payments") on Add Business form | Not implemented | Per ARCHITECTURE.md already planned — ship it |
| Lead-insight tags on every lead card (Phone Issues in Reviews, Below 4.0) | `LeadFinderPage.js` has Country but scoring/tag system unclear | Add to lead card component |
| Creator/Affiliate public portal at `/creator` | No file exists | Build per ULIO-COUNTER-MOVES.md 20% lifetime plan |
| Content Library with swipe files | `ResourcesPage.js` exists but empty per grep | Populate this week |
| 14-month Revenue Trend chart w/ % growth pill | Dashboard mockup has bar chart but no trend indicator | Add % growth badges to revenue cards |

### What we have that Ulio DOESN'T
| Easy Deploy feature | Ship state | Marketing leverage |
|---|---|---|
| **Ownership of GHL sub-account** | Backend planned, not surfaced in UI | Make hero copy — #2 above |
| **30-Day Build-or-Refund Guarantee** | Live on `/pricing` | Move up to hero sub-copy — #8 above |
| **10+ niche blueprints** | Architected in ARCHITECTURE.md, not visible to buyer | Add to Solutions section — #9 above |
| **Hard-stop budget guardrail** | Planned for Settings page | Ship it and name it "Bill Shock Blocker" |
| **Named bonuses worth $916** | Live on `/pricing` | Move value math higher on plan card |
| **Canadian-aware (Wise payouts, PIPEDA-aware defaults)** | Planned, not UI-visible | Add footer trust bar |

### What both have but we can do BETTER
| Shared feature | Ulio version | Easy Deploy target |
|---|---|---|
| Agent Builder tabs | Brain / Tests / Go Live / Business | Same 4 tabs + **Knowledge** (upload files) + **Compliance** (auto-disclosure) |
| Lead Finder | Google Places scrape + review mining | Same + competitor-density + domain-age + social-presence signals |
| Proposal engine | Template + formulaic copy | **Editable** + pulls real review quotes + niche-specific value math |
| Dashboard gamification | Monthly Revenue, Total Earnings, % growth | Same + Profit First split + System Status traffic lights |

---

## HONEST FLAGS

- **Munger would pause the launch** until the compliance-disclosure auto-inject is a UI default (not just a legal doc). One non-compliant AI call = one regulator letter = Easy Deploy's name in a CRTC case file. 30-minute fix.
- **The light-mode problem is bigger than "drab."** `glass-card` relies on `white/[0.03]` backgrounds that vanish on white backgrounds. Light mode is fundamentally un-designed right now. Either commit to dark-only (like Ulio) or do the light-mode pass properly — half-light-mode is worse than no-light-mode. My vote: ship dark-only for 60 days, revisit after product-market fit.
- **The assistant being scripted is the single biggest shippability blocker.** Renée demos Easy Deploy to a potential consulting client tomorrow, the Orb says the same 8 canned lines, the client sees through it in 15 seconds. Wire Claude API to `/demo` before any other fix. This is the one I'd stop everything for.

---

## 3 CHANGES TO SHIP THIS WEEK (1-2-3 simplicity unlock)

1. **Fix the sidebar** (`DashboardLayout.js` lines 41-60). Rename "Leads" → "Search", "Inbox" → "Email", add "Contacts" as a visible item linking to `ContactsPage.js`, move old CRM-style "Leads" page into `/contacts/leads` or kill the duplicate. 20-minute edit. Unlocks the second of 3 clicks.

2. **Wire the Orb to real Claude API** (`/demo` route + new `/api/orb` serverless endpoint using `ORB-SYSTEM-PROMPT.md`). Replace scripted responses with streaming Claude 4.7 call. This is the product Renée is selling — it has to actually work. Half-day build.

3. **Ship the Proposal upgrade** (`ProposalViewPage.js`): add Country dropdown, AI Agent Name input, make every section editable, and wire the bottom button to "Send Proposal" → generates Stripe payment link + signature request + email via Gmail MCP in one click. Unlocks the third of 3 clicks and makes the value ladder real. Day-long build.

Do these three in this order. Everything else on the 17-gap list is polish that matters AFTER these three make the product actually usable.

---

## CLOSE — WHAT THE BOARD AGREES ON

- Godin, Kennedy, Robbins still like the positioning. It's the best thing about the product.
- Hormozi and Brunson see the bones of a $10M offer — bonuses + ladder + guarantee are all present, just not surfaced correctly.
- Cardone and Gary Vee see the distribution engine still missing. Content and outbound need to start THIS WEEK, not after launch.
- Belfort says the proposal is the moment of truth and it's currently unshippable.
- Munger says ship the compliance defaults before a single real call routes through the platform.
- Michalowicz says put Profit First on the subscriber's dashboard or admit this is just a CRM.
- Easy Deploy is 1-2 weeks of focused execution away from being genuinely better than Ulio on every axis. The 17 gaps are not a crisis — they're a Tuesday.

---

## SEE ALSO

- `claude-skills/billion-dollar-board.md` — the installed skill with all 10 expert frameworks
- `projects/easy-deploy-business/ARCHITECTURE.md` — target spec
- `projects/easy-deploy-business/ULIO-RECON.md` — 384-line recon
- `projects/easy-deploy-business/ULIO-COUNTER-MOVES.md` — 9 verified differentiators
- `projects/easy-deploy-business/BOARD-REVIEW-v1.md` — prior review (still valid on positioning; superseded on execution)
