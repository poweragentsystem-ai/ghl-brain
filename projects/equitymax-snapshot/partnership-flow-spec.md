# Partnership Flow Spec — Decided 2026-04-22

Renée's architecture (her words): "Partnership if booked and conversation had and user wants to work with them they just place them in the correct stage for now. the ideas is to be able to run ads or automate lead flow for the partner so best to just know their info for now and internal notification and task made to set up partner (then partner name)."

## Flow

```
Inbound partnership inquiry (form / referral / DM)
        ↓
Partnership Pipeline → "New Partner Inquiry" stage
        ↓
Partnership Bot engages (ai_prompt_partnership)
        ↓
Pre-qualifies + books partnership conversation in partnership calendar
        ↓
Business owner conducts partnership conversation
        ↓
Decision: do we want to work with them?
        ↓
    ┌───┴───┐
    YES     NO
     ↓       ↓
Move to "Active Partner" stage    Move to "Declined" stage
     ↓                                      ↓
Trigger partner-setup workflow:      Polite follow-up + future-nurture tag
  1. Internal notification to business owner (SMS/email/Telegram)
  2. Task created: "Set up partner [partner name]"
  3. Partner info retained for future automation (ads for them / lead flow to them)
```

## What's in scope NOW (v1)

- Partnership pipeline with stages: New Partner Inquiry → Conversation Booked → Active Partner / Declined
- Partnership bot that engages, pre-qualifies, books partnership conversation
- Internal notification + task creation on "Active Partner" stage move
- Custom fields capturing partner info: `partner_company_name`, `partner_contact_name`, `partner_industry`, `partner_revenue_share_terms` (text), `partner_services_offered`

## What's out of scope for v1 (Renée: "for now")

- Running ads for the partner
- Automating lead flow TO the partner (referral capture + routing)
- Per-partner revenue share tracking (in Stripe or otherwise)
- Partner onboarding sequence (welcome email, resources, etc.)
- Multi-partner coexistence if one contact is a partner for multiple verticals

These belong in a v2 once the first couple partners actually exist. Riley tracks.

## Rules

- Partner contacts go into the **Partnership Pipeline** — NEVER the Sales or Client pipeline
- Partner bot prompts NEVER pitch consulting or mortgage services — the pitch is mutual referral / JV / ad co-management
- Partnership conversation is owner-led (Renée or Brian for strategy) — the bot does NOT close the partnership, only books it
- Internal notification on "Active Partner" stage move = SMS to Renée + Telegram ping (once wired) + task in Command Center

## Forward-walk — Axel

- **Success:** partner qualified + moved to Active Partner → notification + task fire → business owner sets up partner manually → partnership live. ⚠️ GAP: no automated "partner onboarding" yet (v2).
- **Failure:** partner declined → moved to Declined stage → polite email + tag for 180-day re-engagement. ✓ OK.
- **Multiplicity:** same partner inquires for multiple verticals (e.g., wants to partner on AI consulting AND mortgage referrals) → one contact, two opportunities? ⚠️ GAP: needs opportunity-per-vertical tracking if it happens. For v1: use a single opportunity + notes field.
- **Handoff:** from bot → owner (Renée) → manual setup. Clean handoff via task creation. ✓ OK.

## Custom fields to create (ABC + EqM)

- `partner_company_name` (TEXT)
- `partner_contact_name` (TEXT)
- `partner_industry` (TEXT — free text; not the canonical `niche` CV which is OUR niche)
- `partner_services_offered` (LARGE_TEXT)
- `partner_revenue_share_terms` (TEXT — e.g., "15% of JV deals, 90 days")
- `partner_setup_status` (SINGLE_OPTIONS: Not Started / In Progress / Complete)

To be created after Renée confirms this spec.
