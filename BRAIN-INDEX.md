# 🧠 XPERT BRAIN — START HERE (any surface: Code / Console / mobile / dispatch)
*Single current-state entry point. Synced to the public ghl-brain repo so remote surfaces can read it. NO PII or secrets in this file — safe to be public. Last updated: 2026-07-03.*

**Read this at:** `https://raw.githubusercontent.com/poweragentsystem-ai/ghl-brain/main/BRAIN-INDEX.md`

---

## WHO / WHAT
Xpert Web Solutions Inc. (Toronto). Owner/CEO: Renée Ross. AI automation agency. 3 lines: AI Consulting, SaaS (digital-product builder), Mortgage (EquityMax, FSRA). Brand name still placeholder.

## 🔴 CURRENT ACTIVE WORK (2026-07-04) — PIVOTED
**Product pivoted (Renée, after several iterations): the real low-ticket product is "THE CREATOR" — a TOOL, sold via a guide→tool funnel.**
- **The Creator tool** (the real product / upsell $47): niche in → AI-generated digital product + sales page + 30-day content + GHL post-scheduling. LIVE + **FULLY GENERATING**: **https://app-tau-two-63.vercel.app** ✅ UNBLOCKED 2026-07-04: ANTHROPIC_API_KEY pulled from the Command Center vault (it was there all along) → Vercel env. v1 monolithic call hit Vercel's 60s timeout → rebuilt as 3 parallel part-calls (product=Sonnet 4.6, sales=Sonnet 4.6, posts=Haiku 4.5), frontend renders each part as it lands. End-to-end verified live via browser: real 8-section guide + sales page + 30 posts generated for a test niche. Still optional: GHL_TOKEN (auto-post), STRIPE (charge). Code: `07-projects/product-creator-tool/app/`.
- **$17 front-end guide** ("How to Create & Sell a Digital Product with AI" — teaches the manual version, bridges to the tool): `07-projects/product-creator-tool/guide/`. Built.
- **Funnel** (guide → tool upsell): DONE + verified LIVE at **https://funnel-two-kappa.vercel.app** — "The Creator's Playbook" $17 → +$9 bump → +$47 The Creator app upsell → delivery. One cohesive warm-editorial brand with the tool. Panel self-check 9/9/8/9. Placeholders remaining: "look inside" video + guide download links (Renée's go-live). Shell: `07-projects/faceless-finance-offer/funnel/`.
- Prior explorations (budget spreadsheet, mom-AI info-product) archived/superseded — do NOT resume; the tool is the product.

**(archived) Faceless Finance Low-Ticket Offer** (superseded by the pivot above)
- Niche: personal finance / budget spreadsheets (research-selected). Working brand "Money Reset" (placeholder — needs brand-name gate).
- Offer: $17 budget spreadsheet core → +$9 bill/subscription tracker order bump → +$37 Financial Freedom System upsell.
- Products BUILT + verified: `07-projects/faceless-finance-offer/product/` (2 real .xlsx w/ formulas, 30-day workbook, mini-course).
- Funnel LIVE + public: **https://funnel-two-kappa.vercel.app** (sales → checkout+bump → upsell → delivery). REBUILT 2026-07-03 per expert panel (Hormozi/Brunson/Vee/Allan) — all 24 fixes applied (real spreadsheet hero, founder story, value stack $161→$17, named guarantee, bonuses, urgency, researched palette, thank-you ascension, mobile sticky CTA). Verified live. NOT YET SELLABLE (needs Stripe key + real sheet screenshots + real testimonials).
- Content engine BUILT: `07-projects/faceless-finance-offer/content/CONTENT-PACK.md` (10 templates + 12 posts, "RESET" auto-DM keyword).
- Layer 2 (staged, trigger = 1st sale): a ~$47 product/platform teaching others to do this / build their own — Renée's SaaS line.

**2. Infrastructure hardening — SETUP REVIEW COMPLETE (2026-07-04, on Fable 5)**
- 7 hooks live + lint-clean: intel auto-check (SessionStart) · capture + agent-routing (every message) · credential guard (pre-edit) · verify-live + persona-walkthrough + design-review/expert-panel (response end).
- ✅ **ALL 24 agents now have ICM workspaces** (batch-scaffolded 2026-07-04) — routing hook checks the filesystem LIVE, no stale tables. Jordan consolidated → `jordan-coo/`.
- **`00-rules/PROCEDURES.md`** = the canonical task→agent→process→enforcement map. Session-start step 0 = this file (BRAIN-INDEX).
- Obsidian: vault configured; BRAIN-INDEX bookmarked "🧠 START HERE" + swipe file/runbooks/audits pinned.
- MEMORY.md under load cap; REI contradiction fixed (PAUSED everywhere).

## ⏳ WAITING ON RENÉE (the switches only she can flip)
1. **Stripe key** → add STRIPE_SECRET_KEY + STRIPE_PUBLISHABLE_KEY in Vercel env → funnel can charge.
2. **Instagram connect** in GHL → content can auto-post.
3. **Command Center revenue source** → Stripe or GHL? (business-line revenue currently hardcoded $0).
4. **Funnel design** → owes a RESEARCHED color reskin (colors were a default, flagged).
5. Real download links + real testimonials on funnel before paid traffic. Brand-name validation.

## KEY POINTERS
- **⚙️ HOW WORK GETS DONE (procedures + enforcement):** `00-rules/PROCEDURES.md` — task→agent→process→hook map. Read this to know who owns what and which gate enforces it.
- Full offer spec: `07-projects/faceless-finance-offer/OFFER-SPEC.md`
- Audits (2026-07-03): `12-daily/audits/` (systemic gaps, intel triage, command-center findings)
- Design references + quality bar: `design-references/design-swipe-file.md`
- Rules/gates: `00-rules/CLAUDE.md` (authoritative) + `CLAUDE.md` (global, ~/.claude)
- ⚠️ REAL LEAD PII (never sync public, never send): `07-projects/mortgage-crm/leads/` — excluded from sync.

## HOW SURFACES SHARE THIS BRAIN
- **Code** (this PC): local vault + `~/.claude` memory = source of truth.
- **Console / mobile / dispatch** (remote): read the public ghl-brain repo raw URLs. This file is the index.
- Sync: `bash 'C:/Users/User/Documents/XpertVault/sprint/sync-to-github.sh'` pushes vault→repo, strips API keys, EXCLUDES lead PII.
