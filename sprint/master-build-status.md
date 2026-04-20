# MASTER BUILD STATUS — Single Source of Truth
### READ THIS FIRST every session. UPDATE IT when anything changes. Every Claude writes here.

**Last updated:** 2026-04-20 (auto by Claude Code)
**Active sprint:** GHL Universal Snapshot (ABC) + Mortgage Snapshot (EquityMax) + EquityMax 3D website

---

## HOW THIS FILE WORKS

1. Every Claude (Code, Console, Mobile) reads this file at session start
2. Every Claude appends a one-line status update after each meaningful change (no waiting for session end)
3. Format: `- [YYYY-MM-DD HH:MM | Claude-X] what just happened`
4. When a phase flips status, update the phase table
5. Never delete history — only append

---

## CURRENT STATE — LIVE STATUS

### TRACK 1 — ABC COMPANY (Generic Universal Snapshot)
**Location ID:** `AKbAtRra4m908e2w2Kbo` | **API key:** `{{ABC_API_KEY}}`
**Status:** 85% — ready to finalize

| Item | Count | State | Notes |
|---|---|---|---|
| Pipelines | 5 | ✅ Clean | Client, Partnership, Recruitment, Sales, Outbound AI |
| Custom fields | 145 | ✅ Clean | All generic, 106 duplicates deleted Apr 18 |
| Custom values | ~178 | ✅ Clean | All tokens correct (user_first_name, niche, etc.) |
| Calendars | 8 | ✅ Clean | Generic names |
| Tags | ~34 | ✅ Clean | 21 new voice/app/doc tags added |
| AI agents | 10 | ✅ Published | General Business Automation folder |
| Workflows | 25 | 17 pub / 8 draft | Need review + publish |
| Forms | 10 | 9 clean / 1 delete | Agency Onboarding Form must go |
| Email templates | 14 | Need quality pass | 4 generic + 10 US mortgage (delete US) |
| Voice AI bots | 0 | ❌ Not built | Needs Build with AI in AI Studio |

**Pending to finish snapshot:**
- [ ] Publish 4 draft workflows (6-Step Sales Follow-Up, Inbound Universal Handler, Long Term Nurture, No Show SMS)
- [ ] Build GHL native voice bots (Inbound + Outbound) — Use Build with AI
- [ ] Humanize all email templates (remove corporate language, remove "reply YES/NO")
- [ ] Delete Agency Onboarding Form (`jJ86LL2pW7lqVWVXXCT2`)
- [ ] Delete "Form 6" (`YNtnV9wjknDd1FkxOVT7`) — unknown usage
- [ ] Review Generic Business Intake Survey (`gGi1LdUCND7Yjec63DnW`)
- [ ] Recruitment form custom fields (see spec below)
- [ ] Delete American mortgage email folder (10 templates)
- [ ] Export snapshot from Agency dashboard

---

### TRACK 2 — EQUITYMAX (Mortgage Snapshot — Layer 2)
**Location ID:** `OBmMdqdnPLZvVyHloFly` | **API key:** `{{EQM_API_KEY}}`
**Status:** 30% — live account in use, needs major cleanup before snapshot extraction

| Item | Count | State | Notes |
|---|---|---|---|
| Workflows | 92 | 50 pub / 42 draft | MESS — duplicates, old, some broken |
| Custom values | 168 | Mixed | Some mortgage-specific, some hardcoded |
| AI agents | 11 | 10 published | General Business Automation folder locked |
| Voice AI Bots folder | ✅ Created | Empty | Ready for bots to be built |
| Website | In progress | 2113 lines R3F | Hero scene + scroll door + calculators + pre-approval form |
| Mobile frames | 5 | ✅ Saved | Aerial → descending → street → door JPGs |

**Pending to finish mortgage snapshot:**
- [ ] Audit 92 workflows — keep/refine/delete (target: ~25 clean workflows)
- [ ] Rebuild core mortgage workflows in Build with AI (pre-qualify, booking, renewal, application tracking, documents)
- [ ] Build voice bots in Voice AI Bots folder (inbound, outbound, renewal, no-show)
- [ ] Humanize all voice bot prompts — no robotic openers, no "press 1 for"
- [ ] Replace hardcoded references (Renée, EquityMax, GTA) with `{{custom_values.*}}`
- [ ] Generify application link (use `{{custom_values.application_link}}` not hardcoded Scarlette)
- [ ] Add Canadian mortgage products (flip, commercial, MLI Select tags + flows)
- [ ] FSRA disclosure in all email templates + website footer
- [ ] Renewal countdown automation (120/90/60/30/14 days)
- [ ] Buffer rule on all automations except new lead entry
- [ ] Export as mortgage snapshot

---

### TRACK 3 — EQUITYMAX WEBSITE (equitymax.ca)
**Codebase:** `C:/Users/User/equitymax-website/` | **Stack:** React 18 + R3F + Three.js + Framer Motion + Vite
**Status:** 60% — core built, needs polish + mobile scroll version

**Done:**
- HeroScene with scroll-animated door opening (808 lines)
- RateDisplay component
- Services grid
- Calculators (mortgage + LTV, 311 lines)
- PreApprovalForm (multi-step, 654 lines)
- Footer

**In progress:**
- Mobile scroll version (5 frames saved: aerial → descending → street → house front → at door)

**Pending:**
- [ ] Mobile-first scroll animation using the 5 frames (replace R3F on mobile — performance)
- [ ] Photorealistic materials upgrade on desktop R3F scene (HDRI environment, PBR textures)
- [ ] FSRA footer disclosure block
- [ ] Testimonials section
- [ ] FAQ (stress test, CMHC, LTV explained)
- [ ] Connect pre-approval form to GHL (API submit)
- [ ] Deploy to Vercel under equitymax.ca

---

## RECRUITMENT FORM CUSTOM FIELDS — SPEC

Per Renée (2026-04-20): build custom fields in ABC + EquityMax for a recruitment form that's pre-wired.

**2 dropdown-select fields (single-select from list):**
1. `recruitment_experience_level` — "How much experience do you have?"
   - Options: No experience / Less than 1 year / 1–3 years / 3–5 years / 5+ years
2. `recruitment_availability` — "When can you start?"
   - Options: Immediately / Within 2 weeks / Within 1 month / 1–3 months / Just exploring

**Contact info fields (required):**
- `recruitment_first_name` (text)
- `recruitment_last_name` (text)
- `recruitment_email` (email)
- `recruitment_phone` (phone)
- `recruitment_city` (text — for timezone/location context)

**Short answer fields (text):**
- `recruitment_why_join` — "Why do you want to work with us?" (short-text, 200 char max)
- `recruitment_linkedin_or_resume` — "Paste LinkedIn URL or resume link"

---

## PROJECT FOLDERS — EACH IS SELF-CONTAINED

Every project folder in `XpertVault/projects/` has its own `CLAUDE-PROMPT.md` (paste into Console or load into a Claude Project) + a copy of `ghl-master-list.md` + a `README.md` explaining what files to read and in what order.

| Project | Folder | Task |
|---|---|---|
| EquityMax cleanup + mortgage snapshot | `projects/equitymax-snapshot/` | Audit + port 92 EqM workflows into AI Studio |
| ABC generic snapshot finish | `projects/abc-company-snapshot/` | Publish 4 drafts, build 4 voice bots, export snapshot |
| Email humanization + recruitment form | `projects/email-humanization/` | Humanize templates, delete US emails, wire recruitment form |

Any Claude working on one of these projects reads the README first, then CLAUDE-PROMPT.md, then the rest.

## GHL MASTER LIST — Customs + Tags (source of truth for AI agents)

**Canonical:** `XpertVault/sprint/ghl-master-list.md` (auto-generated from live API)
**Copies in each project folder** so project-scoped agents have it locally without traversing the vault.

Every Console AI agent building workflows must read this file FIRST so they don't create duplicate fields/values/tags. When they create a new one, they append to the change log at the bottom.

To refresh: Claude Code re-runs the API pull. Currently shows:
- **ABC:** 59 custom fields, 179 custom values, 55 tags
- **EquityMax:** 389 custom fields, 170 custom values, 115 tags

## SESSION ACTIVITY LOG (append-only, newest at bottom)

- [2026-04-20 ~09:00 | Claude-Code] Created master-build-status.md. Audited GHL state: EqM=92 workflows, ABC=25. Website codebase exists at C:/Users/User/equitymax-website/.
- [2026-04-20 ~14:00 | Claude-Code] Website audit via Playwright. Found + fixed FSRA compliance violation: "Ontario's Trusted Mortgage Broker" in hero (should never say broker). Also fixed "Bruised credit or self-employed" on Pre-Approval private mortgage option. FSRA disclosure now footer-only per Renée instruction. Hero tagline: "Mortgages for Real Life".
- [2026-04-20 ~14:15 | Claude-Code] Created ghl-master-list.md — live API pull of all custom fields/values/tags in ABC + EquityMax. This is the source of truth Console agents must reference before adding new ones.
- [2026-04-20 ~14:45 | Claude-Code] Reorganized vault — each GHL project now has a self-contained folder under `projects/` with CLAUDE-PROMPT.md + ghl-master-list.md + README.md. Any Claude (Console or Project) working a project reads from that folder. Desktop CONSOLE-*.md files are now redundant copies.
