# REI DealFlow Wholesale App — Master Skill File

## SESSION START CHECKLIST (do these 5 things BEFORE writing a single line of code)
1. **Confirm GitHub is accessible** — open `github.dev/poweragentsystem-ai/Wholesale-App-Reidealflow` and verify you can see the repo
2. **Check what's already built** — read the features list below, do NOT rebuild anything marked as done
3. **Walk the user journey** — mentally walk through as each user type (Master → Admin → Wholesaler → Buyer) before touching anything
4. **Confirm free path exists** — ask "Is there a free way to do this?" before spending ANY resource
5. **Confirm no backend logic changes** — never change backend unless explicitly told to

---

## WHO THIS IS FOR

**Owner:** Renée Ross — Xpert Web Solutions Inc., Toronto
**Business partner:** Fitzroy Lee / Jon Ortiz / Jeff Ortiz (coaching group ~30k wholesalers)
**Revenue model:** Renée gets 25% of subscription revenue + JV cut on closed deals
**Repo:** github.com/poweragentsystem-ai/Wholesale-App-Reidealflow

---

## WHAT THE APP IS

Two-sided wholesale real estate marketplace. Wholesalers find off-market properties, calculate MAO, submit deals. Buyers pay to access deal flow. Admins take a JV cut on closed deals.

**Tech stack:** FastAPI + MongoDB + React/Tailwind
**Design rules:** Gold/black/white theme. No "Emergent" anywhere. NEVER show seller info to buyers. NEVER show address until wholesaler explicitly reveals it.

---

## 4 USER TYPES — COMPLETE JOURNEYS

### Master (Renée)
- Sees all admins, all users, full pipeline across the platform
- Downloads CSVs
- Manages packages/pricing from backend
- Watches JV payouts

### Admin
- Manages their wholesalers and buyers
- Reviews/approves deals
- Uploads documents (like POS CAN)
- Views archive of deleted deals (audit trail)
- Sees closing rates and buyer ratings
- Manages their pipeline

### Wholesaler
- Enters property → AI calculates MAO
- Uploads images + signed documents
- Submits deal for admin approval
- Tracks deal through pipeline
- Sees buyer interest notifications
- Locks in buyer
- Has internal private notes AND public listing notes
- **Starter plan ($19/mo): CANNOT submit to buyers** — greyed out button says "Want to connect with our buyer community?" linking to a calendar booking with Renée (NOT Stripe — this is her high-ticket close opportunity)

### Buyer
- Creates a buy box (criteria for what they want)
- Gets notified of matching properties
- Clicks "interested" → chat opens with wholesaler
- Sees property info but **NOT the address** until wholesaler reveals it
- **NEVER sees seller contact info**
- Closes deals

---

## THE UPSELL PSYCHOLOGY

- **Starter ($19/mo):** Calculator + deal tracking only. Cannot post to buyers. Sees a LIVE "buyers online" counter that fluctuates between 429–861, never goes below 429. This is intentional — makes them want to upgrade.
- **Submit button greyed out** with "Want to connect with our buyer community?" → books a call with Renée (calendar link). NOT a payment page — this is Renée's close opportunity.
- **Professional ($0 for elite inner circle / $47/mo community):** Full buyer group access.
- **Team ($97/mo):** 3 seats, everything in Pro.

---

## CRITICAL RULES — HARDCODED

### NEVER USE EMERGENT
Claude used Emergent chat credits by messaging agents when the user said work in GitHub directly. This burned ALL credits. **Claude must NEVER message Emergent agents. Ever.** Always use GitHub (github.dev) directly — it's free, the repo is accessible, no credits needed.

### COST-FIRST THINKING
Before spending ANY resource: "Is there a free way to do this?" If yes, use it. If no, flag the cost and get approval. Check if a cost-saving agent (Amy) should weigh in.

### ADDRESS MASKING IS SACRED
- Buyers NEVER see the property address until the wholesaler explicitly reveals it
- Buyers NEVER see seller contact info under any circumstance
- This is a legal and business-critical rule, not a nice-to-have

### SUBMIT PROTECTION
- $1,000 minimum fee required
- Image + document upload required
- MAO calculation must pass blocks before submission

---

## FEATURES BUILT (DO NOT REBUILD)

- **MasterDashboard.js** (443 lines) — 3 tabs: Overview, Pipeline, All Users with CSV download
- **Backend endpoints:** `/api/master/users` and `/api/master/pipeline` (confirmed working)

---

## FEATURES TO BUILD (priority order)

1. **WholesalerDashboard** — Launchpad tab (step-by-step guide), buyers-online counter, video course section
2. **LandingPage** — full overhaul (new headline, iPhone+laptop mockup, split how-it-works, new pricing, social proof popup, Sign In button, no free trial, no "Emergent")
3. **AdminDashboard** — stats, closing rate, buyer ratings, document upload, archive audit trail, package management, bulk delete
4. **Buyer profile system** — blurred marketplace listing, ratings, closing rate
5. **PropertyDetail** — blurred address, reveal button, internal + public notes, interested → chat unlock
6. **PropertyForm** — submit protection ($1,000 min fee, image + doc required, MAO blocks)
7. **Marketplace** — buyer search, favorites, lock-in buyer, repost flow
8. **Messaging** — chat with property mini-image in header, profile reveal on open

---

## CREDENTIALS

| Key | Value |
|---|---|
| GitHub | poweragentsystem-ai/Wholesale-App-Reidealflow |
| Work method | github.dev ONLY (free, no credits) |
| Admin login | poweragentsystem@gmail.com / admin123 |
| RESEND_API_KEY | re_RhwBFyqj_6KRz7MhdSWs2NxMQfDbhrr5z |
| GHL_API_KEY | pit-a93f2d07-84c4-423f-8731-ce3bfd8902ae |

---

## WHAT CLAUDE SHOULD ALWAYS DO

1. Walk through the app as each user type before suggesting or building anything — spot broken flows, missing steps, dead ends
2. Think in terms of user experience AND business outcomes (does this help close more deals? does this help the upsell? does this help Renée get paid?)
3. Never change backend logic unless explicitly told to
4. Always push changes to GitHub directly — never leave code only inside Emergent
5. Flag anything that seems off, missing, or could be improved proactively — Renée said "these are things you should have suggested, you are to be in my best interest"
6. Remind Renée to update Code memory periodically so Claude stays sharp
7. Before spending ANY resource, ask: "Is there a free way to do this?"
