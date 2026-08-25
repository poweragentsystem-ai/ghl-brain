# 🧠 XPERT BRAIN — START HERE (any surface: Code / Console / mobile / dispatch)
*Single current-state entry point. Synced to the public ghl-brain repo so remote surfaces can read it. NO PII or secrets in this file — safe to be public. Last updated: 2026-07-05 (mega-session).*

**Read this at:** `https://raw.githubusercontent.com/poweragentsystem-ai/ghl-brain/main/BRAIN-INDEX.md`

---

## 🏠 EQUITYMAX / MORTGAGE — READ THIS FIRST IF THE TOPIC IS THE WEBSITE FORM, WORKFLOWS, VOICE AI, OR FOLLOW UP
**Current state as of 2026-08-25 → [EQUITYMAX-CURRENT.md](EQUITYMAX-CURRENT.md)**
Raw: `https://raw.githubusercontent.com/poweragentsystem-ai/ghl-brain/main/EQUITYMAX-CURRENT.md`
Board: https://claude.ai/code/artifact/06d15bb0-37f0-47f6-a511-6f88278316f6
Headline: website form finished and live · 4 automations had no sending hours and were fixed · voice agents reviewed and 3 gaps closed · the chase follow up already exists but has NEVER fired (listens for the old form) · 2 decisions pending from Renée (call transfer destination, GHL billing card).

---

## WHO / WHAT
Xpert Web Solutions Inc. (Toronto). Owner/CEO: Renée Ross. AI automation agency. 3 lines: AI Consulting, SaaS (digital-product builder), Mortgage (EquityMax, FSRA). Brand name still placeholder.

## 🔴 CURRENT ACTIVE WORK (2026-07-04) — PIVOTED
**Product pivoted (Renée, after several iterations): the real low-ticket product is "THE CREATOR" — a TOOL, sold via a guide→tool funnel.**
- **The Creator tool** (the real product / upsell $47): **https://app-tau-two-63.vercel.app** — FULLY GENERATING + massively upgraded 2026-07-04/05 (all Renée-directed, all live-verified):
  - **Conversational intake** ("Start now" → Claude-style welcome → human-cadence chat, ≤3 code-capped follow-ups) → **live-researched 3–5 product ideas** with demand bars (1–100 + evidence, sorted) → tap → auto-generates product+sales+30 posts.
  - **Doctrines wired into the engine:** NICHE RULE (lived experience picks the niche; interest = tool, never beginner-taught topics) · MARKET-SIZE RULE (specific outcome × broad audience, no geo-narrowed titles) · PROVEN-FIRST (titles adapt real researched sellers; hooks locked to viral formula taxonomy) · HONESTY (no invented stats/averages/prices; personal results only as [your numbers] templates) · in-engine Kai/Vee offer-check per idea.
  - **Sell It Your Way:** user picks Stripe/Gumroad/Etsy/other → 3-step guide → pastes THEIR product link → sales-page CTA wires to it (E2E verified).
  - **Hardened:** per-IP rate limits (8/min suggest, 15/min generate), security headers, no key leakage (audited), error internals server-side only, structural self-healing (drift force-call, ↻ Try again resume). /terms live w/ methodology fine print.
  - **First ad creatives live:** /ads/ad-1..3.png (typographic tier, brand tokens, real hooks).
  - **Switches still Renée's:** real Stripe SECRET key (vault entry currently holds publishable — see active-task), GHL_TOKEN, visual-engine path (labs.google free vs fal.ai/Replicate paid) for avatar reels/photo ads.
  - Test ledger: `07-projects/product-creator-tool/app/test_result.md` (Emergent-loop protocol, adopted as standard: `00-rules/process/emergent-build-loop.md`).
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

**1b. Command Center v87 — LIVE (2026-07-06, ultracode 15-agent build):** GLANCE-FIRST revamp deployed + screenshot-verified at xpert-command-center.vercel.app. New: Projects view (step checklists, auto progress %, agent chips, filter chips), Content Line (8-stage assembly line Idea→…→Performance, compliance-gated approval queue, honest "Connect IG in GHL" stat chips, ideas backlog), Jordan intake wizard (+ New Project), mobile bottom tab bar (fixed v86's dead mobile nav). v86 preserved as rollback (src/command-center-v86-stitch.jsx + api-backups/). Data: /api/projects extended (?type=content → content.json; parse-throw guard added). Specs/recon: xpert-command-center/revamp/. Seeded: The Creator + v87 projects, 3 content cards. Polish list: mobile % clip, Renée phone pass, orb Groq-TTS upgrade next. VOICE DECISION (Renée 2026-07-06): stick with GHL native; Grok Voice research filed (11-learning/grok-voice-deep-dive.md) w/ Riley revisit conditions.

**1c. Easy Deploy REVISIT (2026-07-07):** plan delivered (07-projects/easy-deploy-revisit/). Emergent preview HIBERNATING — Renée must wake at app.emergent.sh (~5 min), then SAME HOUR: export code to GitHub (single-vendor risk) + full audit. Recommendation: finish on our stack; Emergent output = raw material. Path: wake/export → money spine (Stripe sk_live + lawyer disclaimer = critical path) → one canonical funnel → manual-first delivery → brand-gate name/domain. ⚠️ 2026-07-07 evening: GHL ACCOUNT LOCKED (failed payment) — blocks voice orb widget, IG/TikTok connects, all GHL work until Renée fixes card. Orb pivot: Claude-brain voice (Groq TTS, acts via our APIs) chosen over GHL widget — she wants an orb that DOES things.

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
- **⛔ GHL work = GHL-AI-FIRST protocol v2** (Ask AI/Workflow AI/AI Studios · its 2 blind spots + Drive customs lists to paste · HARD BAN on creating new customs): `00-rules/process/ghl-ai-as-senior-expert.md`. Console: this is standing law — no re-telling needed.
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
