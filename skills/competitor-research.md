---
name: Competitor Research
description: Skill for deep competitor analysis across content, ads, funnels, pricing, positioning, hooks. Inputs are niche + 2-5 competitor names. Outputs are: competitor matrix, gap analysis, hook patterns to swipe, positioning angle to win. Use when Renée says "research competitors for X" / "what is [competitor] doing differently" / "how do we differentiate." Owner Ryan (Research) + Scout (Intel).
---

# Competitor Research — Claude's Skill

The thing that separates pros from beginners across marketing, product, sales: pros do competitor research BEFORE writing copy / building offers / launching ads. Beginners write blind.

This skill is the systematic way to extract everything useful from competitors — without becoming a clone.

---

## The 6 dimensions to analyze per competitor

For every competitor, capture all 6:

### 1. Positioning + Headlines
- What's their hero headline? (their primary positioning bet)
- Sub-headline? (their secondary clarification)
- Tagline / boilerplate? (what they say in every footer)
- "Who it's for" callouts? (their ICP definition)
- "Different from X" claims? (how they distinguish)

### 2. Offer architecture
- Lead magnet? (what's free)
- Tripwire? (sub-$100 entry)
- Core offer? (the main money-maker, with price if visible)
- High-ticket? (call-required tier)
- Continuity / subscription? (recurring revenue model)

### 3. Pricing + Stacking
- Visible prices vs hidden ("call for quote")
- What's stacked into each tier (deliverables list)
- Discount strategy (annual save, bundle, founding-member)
- Risk reversal (refund / guarantee / trial language)
- Urgency / scarcity claims (real or manufactured)

### 4. Content + Hooks
- Posting cadence per platform (daily / weekly)
- Hook archetypes used (per `viral-hooks.md`)
- Top 5 viral pieces (last 90 days, sort by views)
- Content pillar mix (educational / entertaining / inspirational / promotional ratio)
- Comments + community quality

### 5. Paid Ads (if running)
- Meta Ads Library — search competitor's page name
- Google Ads — search their primary keyword + check who's bidding
- TikTok Ads Library — search by name
- Note ad creative style, hook patterns, offer angles, audience segmentation hints

### 6. Funnel + Tech Stack
- What landing-page builder? (often visible from URL pattern + page source)
- What CRM? (Calendly = HubSpot/SF/GHL signal; Stripe checkout = independent)
- What email tool? (open an email, check sender headers)
- What chat / voice AI? (look for Intercom, Drift, Tidio, custom)
- Pixel detection (Meta Pixel Helper, Tag Assistant, etc.)

---

## Tools per dimension

| Dimension | Tools |
|---|---|
| Positioning | Direct site visit, archive.org for evolution |
| Offer | Their pricing page, their checkout flow (where legal) |
| Pricing | SimilarWeb, BuiltWith, OS-level pricing scrape |
| Content | TubeBuddy, ViewStats, IG/TikTok native sort |
| Ads | Meta Ads Library, TikTok Ads Library, SpyFu, AdSpy |
| Tech stack | BuiltWith, Wappalyzer, view source, network tab |

For Renée specifically: most of these have free tiers sufficient for 5-competitor research.

---

## The competitor matrix (deliverable format)

For every project, produce this matrix as a vault doc:

```markdown
# [Niche] Competitor Matrix — [date]

## Competitors analyzed
1. [Name] — [URL] — [follower count / size signal]
2. [Name] — [URL] — [size]
3. [Name] — [URL] — [size]
4. [Name] — [URL] — [size]
5. [Name] — [URL] — [size]

## Comparison

| Dimension | Comp 1 | Comp 2 | Comp 3 | Comp 4 | Comp 5 | OUR ANGLE |
|---|---|---|---|---|---|---|
| Hero headline | ... | ... | ... | ... | ... | ... |
| Sub | ... | ... | ... | ... | ... | ... |
| Lead magnet | ... | ... | ... | ... | ... | ... |
| Tripwire | $X | $Y | none | $Z | $W | ... |
| Core | $X/m | $Y/m | $Z/m | call | $W/m | ... |
| High-ticket | call | $5K | call | $10K | call | ... |
| Risk reversal | 30d MBG | none | 90d MBG | none | ... | ... |
| Hook archetype dominant | Stat | POV | Pain | Curiosity | Contrarian | ... |
| Posting cadence | daily | 3x | weekly | daily | 2x | ... |
| Top performer | [URL] | ... | ... | ... | ... | n/a |
| Tech stack | GHL | HubSpot | Kajabi | custom | Webflow | ... |

## Gap Analysis

### What everyone offers (commodity territory)
- ...
- ...

### What 1-2 competitors offer (differentiation possible)
- ...
- ...

### What NO competitor offers (white space — our angle)
- ...
- ...

## Hooks to study (top performers)

[Comp 1 viral piece URL — hook transcribed verbatim — archetype]
[Comp 2 viral piece URL — hook transcribed verbatim — archetype]
[etc., 10-15 examples]

## Positioning recommendation

The competitive landscape says: [summary of where most are]
The white space is: [where we should plant our flag]
Our hero headline should: [tested claim direction]
Our offer differentiation should: [tested mechanism direction]

## Tools competitor uses we should consider

[List of tools shared across 2+ competitors — likely industry-standard, low risk to adopt]

## Tools competitor uses we should AVOID

[Tools associated with low-quality / churn-heavy operations]
```

This becomes a living doc — update quarterly as competitors evolve.

---

## "Borrow vs Steal vs Avoid" rule

Competitor research is for INSPIRATION + GAP-FINDING, not for cloning.

- **Borrow:** structural ideas (offer architecture, funnel stages, content cadence). Universal patterns are not protected.
- **Steal (with credit / re-frame):** specific frameworks named publicly (Brunson's value ladder, Hormozi's value equation, Gary's content pyramid). Use the concept, attribute when relevant.
- **Avoid (legal + brand):** verbatim copy / paste of headlines, visual identity, product names, taglines. That's trademark / passing-off territory.

For ads specifically: Meta Ads Library shows what ad creatives competitors run, but you're studying STRUCTURE not copying CONTENT. Always rewrite with your own voice / angle / product.

---

## Tactical research scripts (when Renée gives a target)

### "Research [competitor name]"

1. Visit their homepage → screenshot hero + capture headline + sub
2. Visit their pricing / packages page → capture tier structure
3. Search [competitor name] in Meta Ads Library → review last 30 days of ads
4. Sort their TikTok / IG by views (90 days) → note top 5
5. BuiltWith [competitor URL] → tech stack
6. Check archive.org for site evolution (what changed in last 12 months — signals what worked)
7. Subscribe to their email list with a throwaway → capture welcome sequence
8. (If accessible) Trigger their lead magnet → capture exact delivery flow
9. Write up findings in the matrix template above

Output: one vault doc per competitor at `XpertVault/intel/competitors/[name]-[date].md`

### "Map the [niche] landscape"

1. Search the niche on Google → top 10 organic + top 10 paid
2. Search the niche on Meta Ads Library by category → top 10 by impressions
3. Search niche-specific TikTok hashtag → top 20 creators
4. Cross-reference: who shows up in 2+ lists = real competitor (not noise)
5. Pick the 5 most-prominent competitors → run "Research [competitor]" on each
6. Build the comparison matrix
7. Identify the white space → recommend positioning

Output: the niche matrix doc. Becomes the foundation for the offer + funnel + content plan.

---

## Frequency: when to re-run

- **At project start** — always, for any new niche or campaign
- **Quarterly** — for established business niches (lender + agency + e-commerce shifts every 3-6 months)
- **When ad performance drops** — competitors may have shifted, refresh research
- **Pre-launch of major new product** — spot the response space competitors will fill

---

## Renée-specific competitor sets (saved for fast pickup)

### EquityMax / mortgage agent
- nesto.ca
- True North Mortgage
- Mortgage Architects (any individual broker)
- Verico Financial
- Centum Financial network agents

### Easy Deploy / AI Consulting
- Ulio.ai (already in `reference_ulio_ai_competitor.md`)
- Cassidy AI
- Lindy
- Tasklet
- Sintra

### Real estate (for if Aaron wants RE-specific play)
- Royal LePage
- RE/MAX agents
- Sutton
- Independent top-producer agents in Toronto

### Med spa
- Project Skin MD (Toronto)
- SkinClub
- LaserAway

### Mortgage Commercial
- CMLS Commercial
- First National Commercial
- Dorr Capital
- Romspen (already in lender DB)

For each set: a saved competitor matrix at `XpertVault/intel/competitors/[niche]-matrix-[date].md` updated quarterly.

---

## CONNECTED SKILLS

- `viral-hooks.md` — hooks to study from competitor content
- `viral-video-production.md` — content shape patterns
- `offer-design.md` — competitor offer structure as gap-finding input
- `funnel-building-master.md` — competitor funnel architecture
- `paid-ads-platforms.md` — competitor ad analysis methods
- `niche-sales-cycle-analysis.md` — niche-level dynamics
- `ryan.md` — Ryan agent owns research execution
- `scout.md` — Scout agent owns real-time intel monitoring

## RENÉE'S BRAND DEFAULTS

- **No verbatim copying** of any competitor copy / visual / product name (trademark exposure — see `feedback_brand_name_validation_complete.md`)
- **Cite sources** in any deliverable that uses external research (Drift, HBR, named studies)
- **Save findings as intel** via `/api/morning-brief?intel=1` so they persist across sessions
- **Update quarterly** — competitor matrices go stale fast
