# Qualified Landing Page — Funnel Architecture Rule

## THE PRINCIPLE (Renée, 2026-04-22)

**A lead does NOT reach the booking calendar without being pre-qualified.** Every funnel we build follows this structure. No exceptions.

Ad / Social Post / Outbound / Referral
            ↓
    Landing Page (value prop)
            ↓
    QUALIFIED LANDING PAGE (pre-qualify form)
            ↓
        ┌───┴───┐
    Qualified   Not-Qualified
        ↓           ↓
    Booking     Nurture / Decline
```

## WHY

- Facebook Lead Ads have two modes: (a) auto-fills from FB profile — gathers leads fast but quality varies, (b) form that pre-qualifies before lead creation — higher quality, lower volume. Either way, a qualified landing page acts as the quality gate.
- If a lead gets to the booking calendar, it is **assumed they were pre-qualified**. Renée's time is not open to tire-kickers.
- Cuts no-shows. Cuts discovery-call waste. Keeps the calendar filled with serious prospects only.
- Creates clean data capture — the qualified landing page IS the data-intake form that populates `recruitment_*`, `pre_qualified_*`, `ltv_*`, etc. custom fields.

## WHAT A "QUALIFIED LANDING PAGE" IS

A scroll / multi-step form page that:

1. Reinforces the value prop from the ad/referring source
2. Asks the minimum qualifying questions for the specific offer (3-8 questions — NOT 25)
3. Uses conditional logic to route:
   - Meets criteria → book calendar (or thank-you with book CTA)
   - Doesn't meet criteria → polite decline + nurture-tag + resource offer ("here's a free guide for [their situation]")
4. Captures the data into the right custom fields (no orphan data — fields must be canonical per `ghl-master-list`)
5. Tags the contact with the source (`source-facebook-ad-[campaign-id]`, `source-google-ad-*`, `source-social-post-*`, etc.) so attribution works
6. Has a thank-you message that sounds human, not corporate

## STRUCTURE PER USE CASE

### Mortgage (EquityMax) — Qualified Landing Page
- Purchase / Refi / HELOC / Renewal / Reverse — one landing page per product OR one with branching
- Asks: product type → homeowner Y/N → LTV-determining questions (income, debts, property value) → timeline → consent → submit
- Qualified = meets LTV/timeline criteria → book 15-min consult
- Not qualified = timeline too far OR LTV too high → nurture with credit-repair / down-payment-savings content

### AI Consulting (Agency) — Qualified Landing Page
- Asks: business type → current monthly lead volume → what's the #1 broken thing → budget range → timeline → consent → submit
- Qualified = has budget ≥ $297/mo + has real lead volume + decision-maker → book strategy call
- Not qualified = too small / not decision maker → nurture with free resource ("The 5 Automations Every [Niche] Needs Guide")

### Recruitment — Qualified Landing Page
- Asks: position interested in → years experience → current brokerage (if any) → licensed in which province → availability → why join → submit
- Qualified = licensed mortgage pro + meets experience threshold + Ontario (or expansion states) + reasonable availability → book screening call
- Not qualified = unlicensed / wrong region → polite decline with "when you get licensed, come back" message + tag for future

### Social Lead Capture — Qualified Landing Page
- Triggered when a social DM or comment flows into GHL (future integration)
- Same pattern — the DM reply says "I'd love to help, here's a 60-second form so I can tailor the right answer" → link to qualified landing page

## RULES

1. **Never link an ad or social post directly to the booking calendar.** Always through the qualified landing page.
2. **Never ask for payment info on the qualified landing page.** Qualification first, payment after the consult closes.
3. **Never list 25 questions** — lose the lead. Minimum viable qualification = 3-8 questions max.
4. **Mobile-first layout.** Most traffic is mobile, especially from social ads.
5. **Every question is token-driven for the follow-up.** If we ask "what's your LTV?" we MUST store it in `ltv_tier` custom field so the follow-up bot can personalize.
6. **No dead ends.** Even not-qualified leads get a follow-up path (resource download, long-term nurture tag, decline-email with "come back when" trigger).
7. **Consent + CASL + privacy-policy link** always footer-visible. For US, TCPA equivalent.
8. **Thank-you page uses human tone** per `message-tone.md` — NOT "Thank you for your submission. Our team will contact you shortly." Use "Got it [name] — [next step specifically]".

## WHO OWNS WHAT

- **Sam (Sales):** defines the qualifying criteria per offer. What makes a lead qualified?
- **Lex (Copy):** writes the landing page headline / body / form labels.
- **Allan (Creative):** designs the visual + ensures mobile-first.
- **Gill (GHL):** builds the form + custom fields + conditional branching + pipeline routing.
- **Norm (n8n):** if any external integration (Facebook Lead Ads webhook, IG DM trigger), Norm wires it.
- **Connor (Compliance):** sign-off on CASL/CRTC/FSRA language before launch.
- **Quinn (QA):** walks the full lead journey — qualified path + not-qualified path + edge cases.
- **Axel (Actuator):** forward-walks ("what happens when a qualified lead doesn't book within 24 hrs?") — surface gaps BEFORE launch.

## STANDARD CHECKLIST BEFORE ANY FUNNEL GOES LIVE

- [ ] Ad/source → Landing page links correct (no direct-to-calendar bypass)
- [ ] Qualified landing page captures into canonical custom fields (no new one-off fields)
- [ ] Conditional routing tested: qualified path + not-qualified path + partial submit
- [ ] All form labels + thank-you + rejection messaging passes `message-tone.md` read-out-loud test
- [ ] Consent checkbox + privacy link present (CASL / TCPA)
- [ ] Source tag fires on submission for attribution
- [ ] Not-qualified path has a nurture destination (not a dead end)
- [ ] Mobile tested — form works on 320px width min
- [ ] Axel forward-walk signed off on Success / Failure / Multiplicity / Handoff
- [ ] Test contact (4168784622 / renee.ross@gmail.com) tested end-to-end

## WHAT THIS REPLACES

Funnels that link ads directly to "Book Now" calendar are **deprecated**. Any existing EquityMax, ABC, Agency, or client-sub-account funnel skipping the qualified landing page gets flagged in next dedup audit and rebuilt.
