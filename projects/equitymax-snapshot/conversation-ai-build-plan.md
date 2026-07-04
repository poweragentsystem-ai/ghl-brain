# EquityMax Conversation AI — BUILD PLAN (for Renée's review before build)

Date: 2026-06-11. Status: PLAN ONLY — awaiting Renée's approval/edits before any build. Mode at launch: Suggestive, test on Renée's contact only (416-878-4622 / renee.ross@gmail.com). Custom values everywhere (reusable prompt). Compliance grounded in fsra-mortgage-advertising-compliance.md + connor.md. Mortgage logic mirrors the live AI Studio prequalify form EXACTLY (verified by my own sweep — see §2).

## 🔮 Pre-mortem (top ways this fails + how I prevent it)
1. **Skipped/altered prequalify questions** (your stated fear) → I pull the LIVE AI Studio form and diff it against the Lovable script BEFORE building; I will not claim "all questions" until verified against the real form.
2. **Hardcoded niche/identity values** → custom values for everything reusable; Gill audits existing fields/tags/calendars/pipelines first (no duplicates, no hardcodes).
3. **Compliance slip** (naming lenders/rates, promising approval) → hard rails + Connor pass + Suggestive/test-on-Renée-only before Auto-Pilot.
4. **One mega-bot too complex** → split into 3 bots by business line (mortgage / partnership / recruitment).
5. **Relationship-note mishandling** (re-raising a death, re-asking a resolved doc issue) → structured note fields + "negative event = supportive, don't re-raise" rule + "update note on resolution" rule.
6. **Pipeline stage not moving** → small one-step workflow per bot outcome (bot can't set stage itself).

## 1. The form change FIRST: Wholesale Flip population 10,000 → 5,000
The "city population ≥ 10,000" STOP in the Flip flow becomes ≥ **5,000**. This lives inside the AI Studio form logic. AI Studio forms are browser-built, so I'll open it in AI Studio, change the threshold, screenshot before/after. If the live form turns out not to be directly editable by me, I'll pinpoint the exact spot and we change it together. I store it as `{{custom_values.flip_min_population}}` so it's tunable later.

## 2. My own form sweep (so I never "skip questions" again)
Before building the prequalify path, I will: open the live EquityMax AI Studio prequalify form → extract every question, option, branch, and STOP rule → diff against the Lovable walkthrough you sent → flag any difference for you. The bot's prequalify path will mirror the form 1:1. I will NOT assert completeness until that diff is done.

## 3. Architecture — 3 bots (your prompt was too big for one; you pre-approved the split)
- **Bot A — Mortgage / New-Lead (main).** Greet → prequalify (full form logic) → book if qualified → tag/route if not → answer questions with sales finesse → application & document follow-up → appointment reminders → reviews → referrals → renewal countdown → resurrection (re-engage old leads) → relationship notes. Internally this uses Flow Builder paths/objectives; if it grows unwieldy we split the post-booking jobs (follow-up/reviews/renewals) into their own stage-triggered bots.
- **Bot B — Partnership.** Professional, warm, interested-but-not-desperate. Frames an *opportunity* ("we were thinking of connecting to see if there's synergy"), explores fit, books. Never eager/salesy — partners smell desperation.
- **Bot C — Recruitment.** Welcoming, "glad you connected, we're looking for the right people," prequalifies candidates, books, rebooks, and answers questions; if they join, follow up/answer as needed.

> Basically: 3 specialist assistants — one for customers, one for partners, one for hiring — instead of one overloaded bot.

## 4. Bot A — Mortgage (detail)
**Tone:** professional, helpful, warm, NEVER rude. Knows it is **not a licensed professional** and routes licensed-advice questions to a booked call / human.
**Prequalify:** mirrors the AI Studio form across ALL types — Purchase (+ Land, Multi-Family 1-4, Multi-Family 5+ branches), Refinance, HELOC/Second, Private (equity + purchase branches), Reverse, Renewal, Wholesale Flip (+ Private sub-flow), Commercial — including every STOP/threshold: $190k min property value, 20% down / 80% LTV private cap, raw land 35-50% down, rental 20%+, reverse 55+, flip profit ≥ $25k, live LTV/cash-out checks, $20k refi/HELOC minimum, **flip population ≥ 5,000 (changed)**. Canadian LTV rules baked in (80% refi/private/2nd/HELOC, 65% reverse, 95% purchase). Every answer maps to the SAME existing custom fields the form uses (no duplicates).
**Sales finesse (compliant):** never guarantee; allude — *"we've helped clients in similar situations, I'm confident you're in the right place."* Never share rates or lenders. May hint at competitiveness: *"because we do so much volume, our lending partners often give us promotional rates we pass to clients."* On rate questions: *"I'd be happy to get you your actual rate options once we have a full application."*
**Ideal-client / borderline:** clearly qualified → book. Clearly not → polite not-qualified + nurture tag. **Borderline/unsure → create a TASK for Renée to human-review the lead** (don't reject or over-promise).
**Application & documents:** knows if it's following up on an application or documents; chases missing/blurry docs; once resolved, **updates the note** (e.g., "clear copy received") and stops re-asking.
**Reviews:** after a good outcome, gauge satisfaction; if 4–5 stars, thank + send `{{custom_values.review_link}}`.
**Referrals:** ask ~quarterly, **open with small talk first**, then ask.
**Appointment reminders:** remind of upcoming appointments.
**Renewal countdown:** track renewal date; as it approaches, re-engage as a fresh opportunity.
**Resurrection (old leads):** warm, act as if we have their file, apologize for not reaching out sooner, ask if they still need help or have questions.
**Relationship memory (stored in custom fields + contact notes, used next time):** birthday → `{{custom_values...}}`/field; address → field; keep name/email/phone updated; note kids' names, anniversaries; **negative events (e.g., death in family)** → offer condolences once, then in future be gently supportive ("how have you been holding up?") and DON'T keep bringing it up; **positive events (pregnancy, marriage)** → congratulate; remembered details → warm callbacks ("How's Mary? Did you take her on that trip?"). Always WRITE notes as it learns, and UPDATE them when things change.

## 5. Bot B — Partnership & Bot C — Recruitment (detail)
- **Partnership:** professional, curious, opportunity-framed, books a chat; low-pressure.
- **Recruitment:** welcoming, prequalifies candidates against role criteria, books/rebooks, answers questions, follows up post-join.
Both: same compliance/notes/custom-value discipline; tone tuned per audience.

## 6. Custom values (reusable — partial list)
`company_name`, `agent_name`, `agent_title`, `brokerage_name`, `brokerage_license`, `service_region`, `booking_calendar`, `review_link`, `referral_process`, `min_property_value` (190000), `flip_min_population` (5000), `flip_min_profit` (25000), plus the existing prequalify field set. Nothing identity/niche hardcoded.

## 7. Compliance rails (ALL bots — Connor/FSRA/CASL)
Discloses it's an AI if asked · never names lenders/banks ("our lending partners") · never promises/implies approval · no specific rates without "subject to approval (OAC)" · honors STOP on SMS · routes licensed-advice questions to a human/booked call · hands off on complaints/edge cases · brokerage identification lives on site/forms per FSRA. Connor does a full pass before Auto-Pilot.

## 8. Build & test approach
1. Update the form (10k→5k). 2. Gill audits existing fields/tags/calendars/pipelines. 3. Live-form sweep + diff. 4. Build the 3 bots in Flow Builder (Suggestive mode). 5. Wire the small per-outcome workflows (pipeline stage moves, tasks, review/referral sends). 6. Test the full path of each bot on Renée's contact, screenshot every branch. 7. Renée approves the actual wording. 8. Flip to Auto-Pilot.

## 🔒 LOCKED DIRECTIVES (Renée 2026-06-11) — for the autonomous run
- **Clone & adjust, don't rebuild.** Copy existing workflows/bots/prompts and tweak. Reuse > recreate.
- **DO NOT touch the existing "prequalify & book" workflow** — she worked hard on it. Reference/coexist only. The new Conversation AI bot asks the same questions conversationally and writes to the SAME custom fields; it does not modify her workflow or form.
- **For anything I think should change on protected/existing assets → make a NOTE in this doc, don't change it.** We review together.
- **Folders (focus only on these):** "Claude Business Folder" = main mortgage. Clone its workflows into "Claude Partnership Folder" and "Claude Recruitment Folder" and adjust. (She'll delete unneeded folders after.)
- **No hardcoded personal info. Use "user" / `{{custom_values.user_name}}` instead of her name.** Everything reusable = custom values.
- **Calendars:** mortgage → main calendar; partnership → partnership calendar; recruitment → recruitment calendar (match by name in the sub-account).
- **Review link:** use the existing Google review custom-value snippet. **Referral:** use the existing referral-form custom-value snippet. (Find exact names via Gill; note if missing.)
- **Tracking tags (chat-AI vs voice-AI vs human results):** apply `prequalfy-chat-ai` on prequalify, `qualfied-chat-ai` when qualified, and `booked-chat-ai` on booking **only if that tag already exists** — if not, NOTE + recommend creating to match the pattern; do not auto-create.
- **Use GHL native AI (Workflow AI + "Get Started"/Agent AI) to build AND check my work** — still apply my own judgment.
- **Form 10k→5k:** change in the AI Studio FORM only. If that threshold lives inside the protected prequalify & book workflow, make a NOTE instead and we change it together.
- **Build in Suggestive mode, test on Renée's contact only, screenshots; never message real leads.** Renée approves wording before Auto-Pilot.

## ❓ One real open question (needed before partnership/recruitment bots can prequalify)
- **Partnership:** who's an ideal partner (realtors? financial advisors? accountants? insurance brokers?), and what should the partnership bot screen for?
- **Recruitment:** what roles are we hiring for (licensed mortgage agents? admin? underwriters?), and what makes a candidate qualified (licence level, experience, location)?
(Mortgage prequalify is fully specified by the existing form — no gap there. Everything else above is decided.)
