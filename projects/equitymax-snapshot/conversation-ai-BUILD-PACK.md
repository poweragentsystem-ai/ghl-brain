# EquityMax — Conversation AI BUILD PACK (grounded, ready to build)
Built 2026-06-11 (autonomous /goal run). Sub-account: EquityMax `OBmMdqdnPLZvVyHloFly`. Build in **Conversation AI Copilot / Build-with-AI + Flow Builder**, **Suggestive mode**, test on **user contact only** (416-878-4622 / renee.ross@gmail.com). Use GHL **Workflow AI + Agent "Get Started" AI** to build AND to check the work. Custom values everywhere; "user" not a personal name. DO NOT touch the protected prequalify & book workflow or the AI Studio form (notes only).

> The account is already heavily built (tags, pipelines, workflows, qualification rules, calendar links, and an `ai_prompt_*` custom-value library all exist). These bots PLUG INTO that — they don't recreate it.

---
## A. GROUND TRUTH (use these exact assets — don't create duplicates)

**Identity custom values:** `{{custom_values.brokerage_name}}`=Ontario Lending Solutions · `{{custom_values.license_type}}`=Mortgage Agent Level 2 · `{{custom_values.license_number}}`=13063 · `{{custom_values.agent_bio}}` · `{{custom_values.ai_rules}}`="Never make specific promises about pricing or outcomes. Always honour DND. Flag edge cases to human review."

**Qualification brain (reference, don't rewrite):** `{{custom_values.qualified_lead_details}}` (homeowner required for non-purchase; LTV: refi/HELOC/private/2nd ≤80%, REI/flip/wholesale ≤75% as-is, commercial ≤75% DSCR≥1.2, reverse ≤65% age 55+; purchase first-time ≥5% down (10% over $500K), non-first-time ≥20%; no min loan) · `{{custom_values.not_qualified_lead_details}}`.

**Booking links (custom values):** Mortgage → `{{custom_values.user_calendar_booking_link}}` (set: book-mortgage-meeting) · Recruitment → `{{custom_values.recruitment_calendar_booking_link}}` (set) · Partnership → `{{custom_values.partnership_calendar_link}}` ⚠️ PLACEHOLDER (gap).

**Pipelines (move via outcome workflows, not the bot directly):** Mortgage `MYbF8Sm4Q07xLdI0cQKC` (Leads→Responded→Prequalified Form Pending→PreQualified Form Complete→Meeting Not Booked→Meeting Booked Introduction→No Show→Follow Up→Application…→Renewals→Not Qualified→Not Interested→Cold Outreach) · Partnership `N4Ff4ynNFqZ4gY3L2Hnh` (Lead→Responded→Meeting Booked→No Show→Meeting Completed→Partnership Accepted→Not Interested) · Recruitment `0iKaphwMpQrrl6iyxejB` (New Applicant→Screening→Proposal Interview Booked→Interview Complete→No-Show→Offer Sent→Hired→Not a Fit).

**Tags (apply these EXISTING tags — chat-vs-voice-vs-user tracking already built):**
- Mortgage chat: `ai-chat-responded`, `prequalified-chat-ai`, `ai-chat-qualified`, `ai-chat-not-qualified`, `ai-chat-booked`, `ai-chat-rebooked`, `ai-chat-follow-up`, `ai-chat-needs-human-review`, `ai-chat-no-response`, `ai-chat-not-interested`, `ai-chat-opted-out` + product type `product-{purchase|refinance|heloc|renewal|reverse|private|commercial|flip|wholesale}` + `cold-lead-resurrect`/`old-lead-re-engagement`.
- Partnership: `partner-new-lead`, `partner-qualified`, `partner-not-qualified`, `partner-not-interested`, `old-partner-re-engagement`.
- Recruitment: `recruit-new-lead`, `recruit-qualified`, `recruit-not-qualified`, `recruit-not-interested`, `old-recruit-re-engagement`.

**Existing outcome workflows the bots feed (apply tag / book → these fire):** "AI - Apply Chat Booked Tag", "Human Review Request Tag Task Notifcation", "Prequalification Tag Aggregator", "3. Pre-Qualify Form Completed Tag", "4. Appointment Booked - Confirmation & Reminders", "No-Show - Rebook Appointment Automation", "5.Client Thank You & Referrals & Google Reviews", "8. Referral Request - Quarterly with Incentive", "9. Client Renewal - Countdown & Reminders", "11. Old Lead Re-Engagement", Partnership/Recruitment booked+no-show+follow-up workflows. → Bots mainly APPLY TAGS + BOOK; existing workflows do the rest.

---
## B. CROSS-CUTTING RAILS (all 3 bots)
**Tone:** professional, warm, helpful, concise, one question at a time, mirror the lead, never rude, no emojis unless the lead uses them.
**AI disclosure:** if asked, confirm it's an AI assistant and offer a human.
**Compliance (FSRA/CASL + `ai_rules`):** never name specific lenders/banks ("our lending partners") · never promise/imply approval · no specific rates without "subject to approval (OAC)" · honour DND/STOP · route licensed-advice questions to the booked meeting/human · hand off on complaints.
**Alluding sales (lead them down the path — don't show all cards):**
- "We've helped clients in similar situations — I'm confident you're in the right place."
- On competitiveness: "Because we do so much volume, our lending partners often give us promotional rates we pass on to clients."
- On rate asks: "I'd be happy to get you your actual rate options once we have a full application."
- Never give the product/strategy/lender away (that's the business — they'd take free info elsewhere).
**Borderline → human:** if qualification is unclear/borderline, apply `ai-chat-needs-human-review` (fires the human-review task) instead of rejecting or over-promising.
**Relationship memory:** as it learns, save to the contact (birthday, spouse/kids names, anniversary, address; keep name/email/phone current). Positive event (pregnancy/marriage) → congratulate. Negative event (e.g. death) → condolences ONCE, then be gently supportive later ("how have you been holding up?") and don't keep re-raising. Update notes when things resolve (e.g. blurry doc replaced → note "clear copy received", stop asking). [Map to existing contact custom fields — Console/Gill confirms keys; don't duplicate.]
**Custom values everywhere; never hardcode the user's name** — use `{{custom_values...}}` / "your specialist".

---
## C. BOT 1 — MORTGAGE (main)  ·  Channels: SMS + Web Chat first  ·  Mode: Suggestive
**Copilot prompt (paste into "Build with AI" / Conversation AI Copilot):**
> Build a Conversation AI agent for a licensed mortgage business. It greets new leads warmly, prequalifies them by asking the qualifying questions ONE at a time, books a call on the mortgage calendar when they qualify, rebooks no-shows, answers questions with confident but compliant "alluding" sales language, follows up on applications and documents, requests Google reviews from happy clients, asks for referrals, watches renewal dates as new opportunities, and re-engages old leads. It must never name lenders or quote rates, never promise approval, and route anything needing licensed advice to the booked meeting. Train it on the business's qualification rules and brand voice. Enable on SMS and Web Chat in Suggestive mode.

**Bot Goals / Flow paths:**
1. **Greet** → tag `ai-chat-responded`.
2. **Prequalify (Capture & Qualify)** — mirror the existing prequalify form's questions exactly (mortgage type → branch-specific questions → contact). Judge against `{{custom_values.qualified_lead_details}}`. Tag `prequalified-chat-ai` + `product-{type}`.
3. **Qualified** → tag `ai-chat-qualified` → **Book** `{{custom_values.user_calendar_booking_link}}` → tag `ai-chat-booked`.
4. **Not qualified** → reference `{{custom_values.not_qualified_lead_details}}`, polite close → tag `ai-chat-not-qualified`.
5. **Borderline** → tag `ai-chat-needs-human-review`.
6. **No-show / rebook** → tag `ai-chat-rebooked`.
7. **Application/document follow-up** → chase missing/blurry docs; on resolution update the note + stop asking.
8. **Reviews** → after a good outcome, if happy, send `{{custom_values.google_review_link}}` ⚠️(placeholder — fill).
9. **Referrals** → small talk first, then ask (quarterly cadence handled by existing workflow).
10. **Renewal** → as renewal nears, re-engage as a fresh opportunity.
11. **Resurrection** → warm, act as if we have their file, apologise for not reaching out sooner, ask if they still need help → tag `cold-lead-resurrect`/`old-lead-re-engagement`.
**Additional Instructions:** obey `{{custom_values.ai_rules}}`; one question at a time; never reveal product/strategy/lenders; identify as `{{custom_values.brokerage_name}}` work; brokerage/license identification lives on site/forms per FSRA.

---
## D. BOT 2 — RECRUITMENT  ·  Channel: SMS (+ Web Chat)  ·  Mode: Suggestive
We are HIRING licensed, experienced mortgage brokers/agents — self-starters who do their own deals (we have an underwriter, but no babysitting). The bot is welcoming but screens for quality.
**Copilot prompt:**
> Build a Conversation AI recruitment agent for a mortgage brokerage hiring licensed mortgage agents/brokers. Warmly welcome them ("glad you connected — we're looking for the right people to join our team"), then screen: Are you a licensed mortgage agent or broker? How many years of experience / how many deals have you closed? What was your funded volume last year (or the year before if there's a good reason last year was lighter)? Are you comfortable running your own deals end-to-end? We want experienced self-starters who know what they're doing and want fuel for their fire — not people who need babysitting. If they're a strong fit, book them on the recruitment calendar. If not licensed/experienced, politely close. Enable on SMS in Suggestive mode.
**Goals/tags:** new → `recruit-new-lead`; qualified (licensed + experienced + solid volume + self-sufficient) → `recruit-qualified` → **Book** `{{custom_values.recruitment_calendar_booking_link}}`; not a fit → `recruit-not-qualified`; not interested → `recruit-not-interested`; re-engage → `old-recruit-re-engagement`. Pipeline `0iKaphwMpQrrl6iyxejB` (New Applicant→Screening→Proposal Interview Booked…). Tone: confident, peer-to-peer, not desperate.

---
## E. BOT 3 — PARTNERSHIP  ·  Channel: SMS (+ Web Chat)  ·  Mode: Suggestive
Light touch — the real pitch happens in the user's meeting. We want SUCCESSFUL businesses who want to add AI to streamline, gain an edge, and make more money. We only work with the right partners.
**Copilot prompt:**
> Build a Conversation AI partnership agent for a tech-forward mortgage company exploring partnerships with successful local businesses. Keep it brief and professional — the real discussion happens on a call. Frame it as a mutual opportunity ("we thought there might be some synergy"). Gently confirm they run an established business and have the capacity to take on more clients, and gauge interest in adding AI to streamline and grow. If they ask whether we have clients for them, answer without promising anything: "We're a tech-forward company so there's quite the opportunity — but we don't even know yet if we'd be a good fit, so it's best to meet for a quick chat." If they're a fit and interested, book them on the partnership calendar. If they're not interested or come across as arrogant/difficult, politely move on — we only work with the right partners. Enable on SMS in Suggestive mode.
**Goals/tags:** new → `partner-new-lead`; capacity+interested+good-fit → `partner-qualified` → **Book** `{{custom_values.partnership_calendar_link}}` ⚠️(placeholder — fill); not interested/arrogant → `partner-not-interested`/`partner-not-qualified`; re-engage → `old-partner-re-engagement`. Pipeline `N4Ff4ynNFqZ4gY3L2Hnh`. Never oversell; no promises.

---
## F. GAPS / NOTES (need user — make notes, not changes)
1. ⚠️ `{{custom_values.google_review_link}}` = "Your Google Review URL" (placeholder) → need the real Google review link.
2. ⚠️ `{{custom_values.partnership_calendar_link}}` = "YOUR_PARTNERSHIP_CALENDAR_LINK_HERE" (placeholder) → need the partnership calendar link.
3. ⚠️ `{{custom_values.calendar_id}}` empty; duplicate placeholder `{{custom_values.recruitment_calendar}}`="Your Recruitment Calendar URL" (the SET one is `recruitment_calendar_booking_link`) → recommend consolidating to avoid confusion (note only).
4. **Wholesale Flip 10,000→5,000 population:** lives in the AI Studio FORM logic (not reachable via API). Needs an AI Studio/Console edit. Not touched. (Note: `qualified_lead_details` doesn't store the population rule, so no API change available.)
5. **Referral link:** no obvious `referral_form`/`referral_link` custom value found in the scan — confirm the referral snippet name in GHL; bot references it once provided.
6. Existing `ai_prompt_*` custom values are the user's drafts — NOT overwritten. These finished prompts can be pasted into the Copilot or into those custom values by the user/Console if desired.

## G. BUILD STEPS (Console / in-GHL — browser)
1. AI Agents → Conversation AI → Build with AI / Copilot → paste each bot's Copilot prompt → review the generated Flow → set channels + Suggestive mode.
2. Map prequalify questions to the SAME existing custom fields the form uses (don't duplicate).
3. Confirm each bot applies the EXISTING tags above and books the right calendar link.
4. Fill the 2 placeholder custom values (review link, partnership calendar) once provided.
5. Test each bot's full path on the user's contact only; screenshot each branch.
6. User approves wording → flip to Auto-Pilot.
7. Use Workflow AI + Get Started AI to build and to sanity-check each bot.

---
## H. ARCHITECTURE (per Renée) + the clutter problem
- **Build the MORTGAGE bot PERFECTLY first, then DUPLICATE it** for Partnership and Recruitment — change ONLY: the greeting/new-lead intake + screening questions, the calendar link, the tags (`partner-*` / `recruit-*`), and the pipeline. **Delete paths/stages not relevant** to that line. (Clone-and-adjust.)
- **FOCUS = the Claude folders only:** "Claude Business Folder" (mortgage = master), then "Claude Partnership Folder" + "Claude Recruitment Folder" (duplicates). EquityMax has lots of LEGACY tags/customs/workflows being cleaned — IGNORE the old clutter; build only in the Claude folders and reference only the confirmed-good assets in §A. (Folders aren't visible via API — confirm/select them in the GHL UI.)
- **Recruitment screen (final, per Renée):** licensed mortgage broker/agent? · years of experience? · # of deals closed? · funded volume last year (or the year before if a good reason last year was lighter)? · comfortable running your own deals end-to-end (we have an underwriter, but no babysitting)? → we want experienced self-starters who want "fuel for their fire."
- **Partnership screen (final, per Renée):** established/successful business? · capacity to take on more clients? · interested in adding AI to streamline / gain an edge / make more money? Keep it LIGHT — the real pitch is in the meeting. Disqualify the uninterested OR the arrogant ("we only work with the right partners"). If asked "do you have clients for us?" → the alluding line (no promises).

## I. STATUS (2026-06-11 autonomous run)
- ✅ Built (ready to paste): all 3 bot Copilot prompts + goals/tags/calendars/pipelines/compliance/alluding-sales, grounded in real EquityMax assets. Console handoff at `Desktop/New — Pending Prompts/paste-to-console-conversation-ai-3-bots.html`.
- ⛔ Could NOT build live in GHL: Conversation AI bots have no create-API, and the GHL UI needs a logged-in session (2FA) I can't reach autonomously. The live creation happens via the GHL UI / Console using the handoff above.
- 🙋 Needs Renée: (1) Google review link, (2) partnership calendar link, (3) confirm Claude folder names, (4) the AI Studio form 10k→5k edit (browser-only). Everything else is teed up.

## J. MORTGAGE BOT — Additional Instructions (prequalify + new-lead aggression)
The Ask AI Copilot trains on profile/brand voice/past convos — it does NOT read the AI Studio form. To make the bot prequalify like the form: (a) ATTACH the prequalify form walkthrough (the Lovable script) as a Knowledge Base doc on the bot, and (b) paste this into the bot's Additional Instructions:
```
PREQUALIFY: Ask the qualifying questions ONE at a time following the EquityMax prequalify form. First ask the mortgage type (Purchase / Refinance / HELOC-Second / Private / Reverse / Renewal / Wholesale Flip / Commercial-Construction), then ask ONLY that type's questions and apply its stop/qualify rules (see the attached prequalify form Knowledge Base doc). Judge against {{custom_values.qualified_lead_details}}. Map answers to the SAME existing custom fields the form uses — never create new ones. If borderline, tag ai-chat-needs-human-review (don't reject or over-promise).

NEW-LEAD AGGRESSION: For NEW leads in the main Mortgage Pipeline (Leads / Responded stages), be proactive and persistent — drive quickly to prequalify and book, lead them down the path with confident alluding language, and follow up promptly if they stall. Be warmer and lower-pressure for nurture / later-stage / renewal contacts.
```
Note: the bot does NOT auto-know the form's questions or to push harder on new leads — both must be supplied as above.
