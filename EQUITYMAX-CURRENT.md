# 🏠 EQUITYMAX — CURRENT STATE (updated 2026-08-25)
*Safe-to-be-public status file so mobile / dispatch / any remote Claude can pick up cold. No PII, no IDs, no credentials. Detail lives in the private vault.*

**Live checklist board:** https://claude.ai/code/artifact/06d15bb0-37f0-47f6-a511-6f88278316f6

---

## STANDING RULES (do not violate)
- NEVER message any existing lead while building. Default behaviour, not something Renée should have to ask for.
- Testing uses Renée's own contact details only.
- No dashes as punctuation in anything lead facing or in messages to Renée.
- Never build a duplicate of something that already exists. Consult GHL Ask AI first (her chat "Mortgage CRM Setup and Workflow Review").
- Never name a specific lender to a lead. Lender pricing tiers are internal only and must never appear in public website code.

## DONE AND VERIFIED (do not redo)
**Website form (equitymax.ca, built in GHL AI Studio, not a separate tool).** Complete, published, walked end to end live.
- Deal verdict is now honest: green "Qualifies" only when the price is at or under the maximum allowable offer. Everything else shows an amber "Let's Review Options" with Renée's wording about other programs including low down payment options, and still continues to contact capture and booking.
- Two hidden dead ends removed: a low down payment (5 percent) on a house deal, and a deal where price plus renovations exceeded 70 percent of the after repair value. Both previously showed a "we cannot assist you" screen. The land path keeps its own separate down payment rule.
- City population threshold stays at 5,000. Renée's lender confirmed this in a meeting.
- One lender's calculator is guidance only, never a gate, and was removed from the website code entirely (it would also have exposed internal pricing publicly).
- Profit is labelled as being before financing costs. Booking creates real calendar appointments.

**AI brain (shared conversation + voice context).** Updated and live: 5,000 population, lender tiers demoted to a silent sanity check, tight deals get "a few programs that could fit, including low down payment options" plus a non gating question about holding as a rental or energy efficient upgrades, and always proceed to booking.

**Sending hours.** GHL has no global quiet hours; it is per workflow. Four published automations had no time window at all and could have fired at any hour (nurture drip, lost deal follow up, client check ins, partner long term sequence). All four now send 8am to 5pm weekdays in each contact's own timezone. Seven others verified already correct. Appointment reminders deliberately left unrestricted because they must fire relative to the meeting time.

**Voice AI.** 15 agents wired and accounted for. Shared architecture means one edit to the common speech rules improves every agent at once. Already strong: filler sounds, verbal nods, one question at a time, contractions, interruption and mishearing handling, empathy protocol for sensitive personal news, contact notes, lead signal reading, follow up timing judgment, nurture track, rate and credit rebuttals. Three gaps closed 2026-08-25 (originals backed up first, content appended not rewritten): reading email and phone back to the caller, an honest answer when asked whether they are a real person, and a human handoff protocol that never promises a live transfer that is not wired.

## ⚠️ BIGGEST OPEN ITEM
The chase follow up for people who fill the form but do not book **already exists and is fully built** (email, two texts, a two day wait, a voice call, a final email, stops the moment they book; cadence 30 minutes, 2 hours, next day, max three nudges then nurture). **It has never run once. Zero leads have ever entered it.**
Cause: it listens for submissions of the older GHL form. The AI Studio website submits as an external form instead, so the trigger never fires.
Capture itself works fine, website leads do land in the CRM with their answers saved. They are simply never followed up.
Fix, not yet applied on purpose: have the website stamp a marker on submit and have the chase trigger on that marker, wired so it can only ever pick up new website submissions and never sweep in existing contacts. A broad trigger here would start messaging real people, which is why it was not rushed.

## DECISIONS ONLY RENÉE CAN MAKE
1. **Live call transfer.** The inbound voice agent can book but cannot put a caller through to a human. Needs: where should those calls ring, and during what hours.
2. **GHL billing.** The account is on a payment hold. Only she can update the card.

## QUICK WIN SITTING IDLE
The content agent prompt is genuinely strong (per platform native content, a rule against repeating the same content type, video structure and hooks, license aware). Its Agent Studio agent is in draft, as is the social comment responder. Both built, neither switched on.

## NEXT UP, IN ORDER
1. Wire the chase trigger safely, test with Renée's own contact only.
2. Live voice test call to Renée's number only.
3. Switch on the content and social comment agents.
4. Qualified / not qualified auto tagging after AI conversations.
5. Custom value documentation refresh, then snapshot export.
6. Later, her idea: a landing page per service (debt consolidation, self employed, homeowners, private no income no credit). Verdict was go small, after the core is finished.
7. Later: Google listing cleanup (a duplicate "temporarily closed" listing, and the category says broker instead of agent).
