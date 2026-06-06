---
name: Ad Management Master — 10+ Year Veteran Level
description: Cross-platform ad campaign management. Inputs are platform + budget + creative pool + KPI targets. Outputs are: rotation schedules, scaling rules, kill-criteria, attribution setup, weekly reporting structure. Use when Renée says "manage the ads" / "scale this campaign" / "why are these ads tanking." Owner Mark (Marketing).
---

# Ad Management Master — Claude's Skill

What separates a 10-year ad manager from a beginner: it's not creative talent — it's **discipline at scale**. Same campaign can return 5x or burn $10K depending on management rigor. This skill captures the operational rituals that drive ROAS.

Pairs with `paid-ads-platforms.md` (which covers platform mechanics). This is the cross-platform CAMPAIGN management workflow.

---

## The 4-week setup-to-scale cycle

### Week 1 — TEST
**Goal:** find what works. Spend small, generate data.

- Build 5-10 ad sets across audience hypotheses
- 3-5 creatives per set
- Equal budget per ad set ($20-$50/day depending on scale)
- DO NOT touch anything for 5-7 days unless egregious failure
- End of week: identify the 1-3 winning combinations

### Week 2 — VALIDATE
**Goal:** confirm winners are real, not luck.

- Pause everything below 50% of best ROAS
- Increase budget on winners by 20-30% MAX (don't break learning phase)
- Add 1-2 fresh creative variants to fight ad fatigue
- Add retargeting ad sets for everyone who clicked but didn't convert
- End of week: confirm winners hold their ROAS at higher spend

### Week 3 — SCALE
**Goal:** push winners harder, gradually.

- 30-50% budget increases on validated winners (every 2-3 days max)
- Vertical scale: more spend on same audience
- Horizontal scale: same creative, lookalikes 2-5%, 5-10%
- Add 1-3 NEW audience hypotheses based on what worked (e.g., if mortgage-CRO works, try real-estate-CRO)
- End of week: spend should be 2-4x week 1 with maintained or improved ROAS

### Week 4 — STABILIZE + PROBE
**Goal:** lock in scale, look for next-tier opportunities.

- Settle daily budget at the level where ROAS is acceptable
- Add fresh creative weekly to fight fatigue
- Probe new platforms (if Meta is winning, test Google for the same offer)
- Audit: kill any ad set with ROAS below threshold for 2+ weeks
- End of week: predictable daily spend with predictable returns

---

## Daily ritual (15-30 min/account)

Every morning, every account:

1. **Spend check** — did each campaign hit its budget? If under-pacing, why?
2. **CPA / ROAS check** — vs target. Anything 2x off target needs investigation TODAY.
3. **Frequency check** — anyone above 3.5 frequency = audience burnout, refresh creative or pause
4. **CTR drift** — week-over-week. Falling CTR = creative fatigue, refresh
5. **Comments + DMs** — answer or moderate. Negative comments tank algo if not handled.
6. **Pixel events firing** — test purchase flow weekly to confirm tracking isn't broken

**The "if X then Y" rule book** (memorize):
- Frequency >3.5 + CTR dropping → REFRESH creative within 48 hours
- ROAS 50% below target for 7 days → KILL the ad set
- ROAS 200% above target for 3+ days → SCALE budget +30%
- Cost per result rising 25%+ in 7 days → ROTATE creative immediately
- New ad set hits target ROAS in <72 hours → DUPLICATE with 2x budget
- Multiple ad sets in same campaign at 80%+ overlap audience → CONSOLIDATE

---

## Creative rotation — fighting ad fatigue

Ad fatigue is the #1 killer of profitable campaigns. Rotation rhythm:

- **Every 5-7 days** at scale: introduce 1-2 fresh creative variants per winning ad set
- **Every 2 weeks**: replace ANY single creative with frequency >5
- **Every 30 days**: do a full creative refresh (new hooks, new angles, new format mix)
- **Quarterly**: brand-level visual evolution (new color treatment, new music style, new opener style)

**Creative variant types to cycle through:**
1. UGC-style (handheld, selfie-cam, real-person feel)
2. Studio-style (clean lighting, brand colors, premium feel)
3. Testimonial-driven (real customer talking)
4. Founder-driven (Renée or client speaking)
5. Demo-driven (product/service in action, no face)
6. Lifestyle (the *after* state, no hard sell)
7. Comparison (before vs after / us vs competitor)
8. Stat-driven (numbers + minimal visuals)

Always test cross-format — a UGC version of the same offer often outperforms a studio version 2:1.

---

## Audience strategy — concentric circles

Build audiences in this order:

1. **Past customers / clients** — foundation
2. **Email list (uploaded)** — warm
3. **Website visitors (90/180/365 day windows separated)** — cooling-warm
4. **Engagers (Page + IG followers, last 365 days)** — cool-warm
5. **Lookalikes 1% of past customers** — warm cold
6. **Lookalikes 1% of high-LTV customers** — quality cold
7. **Lookalikes 5-10% for scale** — cold
8. **Interest stack** (3-5 interests in same ad set, AND'd or OR'd) — coldest
9. **Broad** (no targeting beyond geo + age + gender) — algo's choice

**Targeting hygiene:**
- Exclude past customers from cold campaigns (you're paying to reach who already bought)
- Exclude website visitors from cold (they're warm — own ad set)
- Exclude employees / Renée's team from all campaigns

---

## Attribution — what's actually working

Default attribution settings lie. Set up properly:

### Meta
- Default: 7-day click + 1-day view
- Better for cold-conversion: 7-day click + 0-day view (kills view-through inflation)
- Set up Conversions API (CAPI) for iOS 14.5+ accuracy — server-side events, not just pixel

### Google
- Default: Last-click attribution (undervalues display + YouTube assists)
- Better: Data-driven attribution (Google's ML model) once threshold met
- Use UTM tags religiously (`utm_source` `utm_medium` `utm_campaign` `utm_content`)

### Cross-platform truth
- Always pair platform attribution with **post-purchase survey** ("How did you hear about us?")
- Self-reported attribution often catches what platforms miss (word-of-mouth, organic, podcast mentions)
- Triangulate: if Meta says 70% credit + survey says 50% credit, Meta is over-claiming

---

## KPI hierarchy — what to optimize at each stage

| Stage | Primary KPI | Secondary | What to ignore |
|---|---|---|---|
| Pre-launch (1st week) | CTR (does the creative work?) | Cost per landing-page view | ROAS too early to trust |
| Validation (week 2) | Cost per lead / acquisition | CTR, frequency | CPM (platform's problem) |
| Scale (week 3+) | ROAS | Customer LTV | Anything besides revenue |
| Maintenance | Blended ROAS (all platforms together) | LTV/CAC | Platform-specific noise |

The **mistake** beginners make: optimizing for CPM, CPC, or even CTR when ROAS is the only thing that pays bills.

The **mistake** advanced people make: optimizing for ROAS without watching for declining LTV (which often happens when scaling — quality drops at the margin).

---

## Weekly reporting structure

Every Monday morning, every account:

```
=== WEEK ENDING [date] — [account name] ===

SPEND
- Total: $X (vs $Y last week, +/-Z%)
- By platform: Meta $A, Google $B, etc.

REVENUE / LEADS
- Total: [X] vs target
- By platform breakdown

ROAS
- Blended: X.Xx (target: Y.Yx)
- By campaign: top + bottom

WINS
- Best ad set: [name] @ ROAS [X], scaled +Y%
- Best creative: [name] @ CTR [Z%]

LOSSES
- Killed: [ad set] @ ROAS [X], reason
- Pausing: [creative] frequency [Y], next refresh date

THIS WEEK
- New tests launching: [list]
- Creative refresh: [list]
- Budget changes: [list]

FLAGS
- [anything Renée needs to know about — pixel issues, account status, compliance]
```

15-min read for Renée. No fluff.

---

## Scaling principles — how the pros 10x without crashing

### Vertical scaling (more $ on same target)
- 20-30% increase per move (Meta), every 2-3 days
- 50% increase OK if you're rebuilding learning phase + creative is fresh
- 100%+ increase = high crash risk, only do for proven-stable winners

### Horizontal scaling (same $ on broader targets)
- Lookalikes: 1% → 2% → 5% → 10%, one tier per week
- New geographies: same offer, same creative, new market
- New age brackets: if 25-44 works, try 45-54 separately
- New genders: if female-heavy ad set converts, test male separately

### Creative scaling
- Take winning creative, produce 5-10 variants:
  - Different opener (same body)
  - Different CTA
  - Different proof point
  - Different platform format (Reel → square)
  - Different language (English → French in QC)

### Geographic scaling for Renée's businesses
- Mortgage / EquityMax: ON first, then BC + AB (similar regulatory framework)
- Easy Deploy: Toronto first, then Vancouver + Montreal
- Faceless Page: borderless from day 1 (US + CA + UK)

---

## Killing ad sets — the discipline

Most ad managers don't kill fast enough. Discipline:

**Kill criteria:**
- ROAS <50% of target for 7 days at sustained spend
- CPA 2x target for 7 days
- Frequency >5 with no creative refresh planned
- Audience exhausted (Meta tells you in delivery insights)
- Negative feedback rate >0.5% (Meta) or >2% (TikTok)

**Don't kill:**
- In learning phase (first $50 spend)
- During platform-wide events (algo unstable)
- Right after creative refresh (give 3 days)
- During obvious external factors (holidays, news cycles)

---

## Compliance + brand safety

### Banned phrases / tactics
- "Guaranteed [income/results/leads]" — Competition Bureau / FTC issue
- Before/after images of medical/cosmetic transformations without disclaimer
- Cryptocurrency / get-rich-quick framing
- Fake countdown timers (real ones are fine)
- "Doctors hate this trick" (banned on Meta)

### Renée-specific compliance
- **No mortgage rate quotes** anywhere (FSRA)
- **CASL/CRTC** on every Canadian-targeted ad with lead form
- **TCPA** for any US lead form requesting phone
- **Medical claims** for med spa work require Connor sign-off
- **Real estate outcome claims** require RECO compliance language

---

## Account hygiene checklist (monthly)

- [ ] Pixel firing on all conversion events (test live)
- [ ] CAPI / server-side tracking up to date
- [ ] Domain verified on Meta
- [ ] Aggregated event measurement priorities set (Meta)
- [ ] All UTM tags consistent across campaigns
- [ ] Negative keyword lists current (Google)
- [ ] Audience exclusions current (no buyer in cold)
- [ ] Brand safety inclusion / exclusion lists current
- [ ] Backup payment method on file
- [ ] Account spend limit set (avoid surprise charges)

---

## CONNECTED SKILLS

- `paid-ads-platforms.md` — platform mechanics
- `viral-hooks.md` — creative hook patterns
- `viral-video-production.md` — video creative production
- `offer-design.md` — the offer being advertised
- `funnel-building-master.md` — where ad traffic flows
- `mark.md` — Mark agent owns paid strategy
- `anna.md` — Anna agent owns analytics + reporting
- `connor.md` — Connor agent owns compliance review

## RENÉE'S BRAND DEFAULTS

- **Pay-as-you-go billing** on all ad accounts (no surprise overspend)
- **$20 single-decision threshold** for budget changes she needs to approve (per `feedback_decide_and_execute_promoted_to_gate.md` — anything below I decide solo)
- **Weekly Monday report** to Telegram (per heartbeat protocol — `✅ Done: weekly ad report. URL: ...`)
- **Killed ad sets** logged to `XpertVault/projects/ads-killed/` with reason — pattern recognition over time
