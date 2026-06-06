---
name: Paid Ads Platforms — Master
description: Platform-by-platform paid ads playbook. Covers Meta (FB+IG), Google, YouTube, TikTok, TikTok Shop, Snapchat, LinkedIn, X. Inputs are niche + offer + budget + funnel stage. Outputs are: campaign structure, ad formats, audience targeting, creative specs, KPI benchmarks. Use when Renée says "set up ads for X" / "what platform should I run on" / "build the Meta campaign." Owner Mark (Marketing).
---

# Paid Ads Platforms — Claude's Skill

Comprehensive reference for the 8 platforms Renée's businesses + her clients run on. Each section gives platform mechanics, ad formats, audience targeting, creative specs, KPI benchmarks, and Renée-specific notes.

This skill complements `ad-management-master.md` (which covers the cross-platform CAMPAIGN management workflow — ad rotation, scaling, bid optimization).

## Picking the right platform first

| Goal | Best platform | Why |
|---|---|---|
| B2B services / agency leads | LinkedIn + Google search | Decision-maker targeting + intent |
| Local service business leads | Meta + Google Local | Geo-precision + intent |
| E-commerce direct response | Meta + TikTok Shop | Visual feed + impulse buy |
| Brand awareness | YouTube + Meta | Reach + storytelling time |
| Mortgage / financial leads | Google search + Meta | Intent + retargeting |
| Real estate buyers / sellers | Meta + Google + IG | Local lookalike + visual listings |
| Med spa / beauty leads | Meta + IG + TikTok | Visual transformation focus |
| Course / digital product | Meta + YouTube | Long-form persuasion + retargeting |

Don't run on every platform. Pick 1-2 that match the buyer's actual feed habits + the offer's complexity.

---

## META ADS (Facebook + Instagram)

### Account structure
```
Business Manager
├── Ad Account (one per business / sub-account)
│   ├── Campaigns (one per OBJECTIVE)
│   │   ├── Ad Sets (one per AUDIENCE)
│   │   │   └── Ads (3-5 creative variants)
```

Always 3-5 creatives per ad set for testing. Meta's algorithm needs variants.

### Campaign objectives (when to use which)
- **Sales / Conversions** — when pixel + funnel are working, drives paid actions
- **Leads** — instant forms or Messenger leads (lower friction, lower quality)
- **Traffic** — cheap clicks, used for retargeting buildup
- **Engagement** — for warming cold audiences before retargeting (skip unless brand new)
- **Awareness / Reach** — only for established brands with budget

### Ad formats
- **Single image** — fastest to test, baseline format
- **Carousel** — 2-10 images with separate headlines, great for product showcases / multi-feature
- **Single video** — 5-15 seconds for cold, 15-30s for warm, 60-90s for VSL retargeting
- **Reels (9:16 vertical)** — Meta is heavily prioritizing Reels in 2026
- **Collection** — mobile-only, e-commerce showcase
- **Lead form (instant form)** — native form on Meta, no external page

### Audience targeting (in priority order)
1. **Custom audience — past buyers** (foundation for lookalikes)
2. **Custom audience — website visitors (90-180 days)** (warm retargeting)
3. **Custom audience — engagers (page + IG, 365 days)** (warmer than cold)
4. **Lookalike — past buyers** (1% for tight match, 5-10% for scale)
5. **Lookalike — high-LTV customers** (extra layer of quality)
6. **Interest-based** (last resort cold targeting)
7. **Broad** (Meta's algo picks — works in 2026 with strong creative)

### Creative specs
- **Feed / square:** 1080x1080
- **Stories / Reels:** 1080x1920 (9:16)
- **Right column:** 1200x628 (rare, low priority)
- **Video duration:** under 15s for feed, under 60s for Reels
- **Aspect ratio rule:** ship the 9:16 first, others second

### KPI benchmarks (2026, directional)
- CTR: 1.5-3% (cold), 4-8% (retargeting)
- CPC: $0.80-$2.50 (cold), $0.30-$1.20 (retargeting)
- CPM: $8-$25 (cold), $4-$12 (retargeting)
- ROAS: 2x (acceptable), 3x (good), 5x+ (great)

### Renée-specific notes
- Meta lead form for **mortgage leads** — collect name + email + phone + 1 qualifier (rate type / refi vs purchase)
- Meta retargeting **+ Google search retargeting combined** for "rate shoppers"
- Avoid lookalikes for **brokerage owners** — too narrow audience; use job-title targeting on LinkedIn instead

---

## GOOGLE ADS

### Campaign types
- **Search** — text ads on search results (intent-based, high quality)
- **Performance Max** — Google's algo manages all placements (set goal + creative + audience signals, Google does the rest)
- **Display** — banner ads on Google's network (cheap traffic, lower quality)
- **YouTube** — video ads on YouTube
- **Shopping** — product feed ads (e-commerce only)
- **Discovery / Demand Gen** — feed-based ads on Discover / YouTube home / Gmail

### Search campaign structure
```
Campaign (geographic + budget)
├── Ad groups (each = a tightly-scoped intent)
│   ├── Keywords (5-15 per group, single match-type)
│   └── Ads (3 RSAs minimum)
```

### Match types
- **Exact** `[mortgage broker toronto]` — only triggers on exact + close variants
- **Phrase** `"mortgage broker toronto"` — must include the phrase
- **Broad** `mortgage broker toronto` — broadest interpretation (use sparingly)

### Negative keywords (CRITICAL)
- Always add: jobs, careers, free, salary, login, training, course
- Niche-specific negatives: for mortgage — calculator (low intent), simulator, study, news

### Quality Score levers (3 inputs)
1. Expected CTR — your historical click rate vs competitors
2. Ad relevance — how closely the ad matches the keyword
3. Landing page experience — speed, mobile, content match

Higher Quality Score = lower CPC + better ad rank.

### Creative (Responsive Search Ads / RSA)
- 15 headlines × 4 descriptions
- Pin headline 1 to specific position to control message
- Use sitelinks (4-6), callouts, structured snippets

### KPI benchmarks (2026)
- CTR: 5-15% (search, on-target)
- CPC: $1-$15 depending on niche (mortgage runs high)
- Quality Score: 7+ target
- Conv. rate: 3-12% on landing page
- ROAS: 4x+ for direct-response

### Renée-specific notes
- Mortgage CPCs are HIGH ($8-$25 in Toronto). Tight negative keywords + landing page quality are critical for ROI
- Use Performance Max as a SUPPLEMENT to Search, not a replacement (PMax can cannibalize if not bounded)
- Service-business clients: "near me" + city + niche keyword combos work well

---

## YOUTUBE ADS

### Ad formats
- **Skippable in-stream** (5-second skip button) — most common, charged per view (>30s) or click
- **Non-skippable in-stream** (15-30s, can't skip) — premium placement
- **Bumper ads** (6s, can't skip) — awareness only
- **In-feed video ads** — show in search + Home / Watch Next sidebars
- **Shorts ads** — vertical video in Shorts feed (TikTok-equivalent on YT)

### Targeting on YouTube
- **Custom intent** — based on Google search history (most powerful)
- **Affinity** — broad interest categories
- **In-market** — actively researching purchase
- **Customer Match** — upload email lists
- **Topics + Placements** — show on specific channels or video topics

### Creative pattern that works (2026)
1. **0-5 sec hook** — pattern interrupt before they hit Skip
2. **5-30 sec body** — story + benefit + proof
3. **30-60 sec close** — offer + CTA + URL
4. **End screen** — branded close with subscribe + watch-next

### KPI benchmarks
- View-rate: 25-45%
- CTR: 1-3%
- CPV (cost per view): $0.05-$0.30
- VTR (view-through rate, completed views): 25%+

---

## TIKTOK ADS

### Ad formats
- **In-feed** — vertical 9:16 video in For You feed, autoplay
- **Spark Ads** — boost an organic post with paid spend (highest-performing format in 2026)
- **TopView** — premium first-impression placement (expensive)
- **Branded Effects** — custom AR filters (brand-awareness only)
- **Collection / TikTok Shop** — product-feed-driven (see TikTok Shop section)

### Spark Ads — the winning move
1. Build organic content first (50+ posts)
2. Find one that organically gets >5K views with high engagement
3. Promote that exact post via Spark Ads
4. CPC + CTR are 30-60% better than from-scratch ads because the post already proved itself

### Targeting
- Interest categories
- Hashtag targeting
- Behavioral (engagement patterns)
- Lookalike from custom audience (similar to Meta)
- Location + age + gender

### Creative specs
- 9:16 vertical, 1080x1920
- 9-15 sec for cold, 15-60s for retargeting
- Hook in first 1-2 seconds (TikTok skip-rate is brutal)
- Native feel (no studio production — handheld looks, captions burned in)

### KPI benchmarks
- CTR: 1-3% (better with Spark Ads)
- CPC: $0.50-$2
- CPM: $6-$15
- ROAS: 1.5-4x

---

## TIKTOK SHOP (separate from TikTok Ads)

### What it is
Native e-commerce inside TikTok. Buy without leaving the app. Heavy creator-driven (affiliate + influencer).

### Sales mechanics
- **Live Shopping** — creator does live demo, products tagged inline
- **Shoppable videos** — products tagged in regular videos
- **Affiliate program** — creators earn commission on sales

### Creator-led model
- Brand uploads product
- Affiliates make videos
- Brand pays commission ONLY on sales (CPA model)

### KPI benchmarks
- Conv rate: 1-4% (organic shop traffic)
- AOV: lower than Shopify (impulse buys at $15-$80)
- ROAS via paid promotion: 2-5x

### Renée notes
- TikTok Shop is currently **US + UK + SE Asia** — not in Canada as of 2026
- For Canadian e-commerce clients: TikTok Shop is irrelevant; use TikTok Ads + Shopify instead

---

## INSTAGRAM ADS (separate considerations from Meta combined)

Same Meta Ads Manager but creative + placement differ.

### IG-specific placements
- **Feed** — square + vertical
- **Stories** — full screen 9:16, 5-15s slides
- **Reels** — autoplay 9:16
- **Explore** — browse feed
- **Shopping ads** — product-tagged feed

### IG Creative pattern
- More aesthetic / lifestyle than TikTok
- Production value matters more than TikTok
- Captions burned in for sound-off viewers
- Hashtag strategy: 3-5 niche hashtags > 30 generic

---

## SNAPCHAT ADS

### When to use
- Audience: 13-34, heavy in lifestyle / fashion / beauty / dating / fast food
- E-commerce that targets Gen Z + young Millennials
- App install campaigns

### Ad formats
- Single image / video (5-60s, full-screen)
- Story Ads (sequence within Discover)
- Collection (e-commerce)
- Filters / Lenses (AR, brand awareness)

### KPI benchmarks
- CTR: 0.5-1.5%
- CPC: $0.30-$1
- CPM: $3-$8

### Renée notes
- Lower priority unless client serves Gen Z directly
- Skip for B2B / mortgage / real estate / agency

---

## LINKEDIN ADS

### When to use
- B2B lead gen
- High-ticket service sales
- Talent acquisition / executive recruitment
- Professional development / courses

### Ad formats
- **Sponsored Content** — feed posts (single image / video / carousel / document)
- **Message Ads** — direct in inbox (high open rate, expensive)
- **Lead Gen Forms** — pre-filled with LinkedIn profile data (no friction)
- **Conversation Ads** — branching message flows
- **Dynamic Ads** — personalized creative

### Targeting (LinkedIn's superpower)
- Job title (CEO, Mortgage Broker, etc.)
- Company size + industry
- Seniority (C-level, VP, etc.)
- Years of experience
- Skills (HubSpot, Salesforce, Python, etc.)
- Group membership

### KPI benchmarks
- CTR: 0.4-1.2% (low — LinkedIn isn't browse-heavy)
- CPC: $5-$15 (high — quality of audience)
- CPM: $30-$100 (high)
- Lead form conv: 5-15% (very high relative to other platforms)

### Renée notes
- **Brokerage owners** as ICP for Easy Deploy = LinkedIn-perfect (job-title targeting on "Mortgage Broker" + 5+ years experience)
- Pair with cold email outreach to same audience for compound effect
- Lead Gen Forms > external landing pages on LinkedIn

---

## X / TWITTER ADS

### Status (2026)
Volatile platform. Reach is unpredictable. Lower priority for paid spend than Meta / Google / TikTok.

### When to use
- Real-time / news-driven campaigns
- Crypto / finance / tech audiences
- B2B SaaS founder personas

### Skip for
- Most service businesses
- Most e-commerce
- Local / geo-targeted offers (X targeting weak)

---

## CROSS-PLATFORM CHEAT SHEET

| Platform | Best for | Avg CPC | Setup time | Skill ceiling |
|---|---|---|---|---|
| Meta | DR + retargeting + lookalikes | $1-$3 | 2-3 hrs initial | Medium |
| Google Search | High-intent leads | $1-$15 | 4-6 hrs initial | High |
| YouTube | Persuasion + warming | $0.05-$0.30 (CPV) | 2-3 hrs | Medium |
| TikTok | Awareness + viral content | $0.50-$2 | 1-2 hrs | Medium (creative-heavy) |
| TikTok Shop | E-commerce in US/UK/SEA | (CPA model) | 4-8 hrs | High (creator program) |
| Instagram | Visual brand + Meta lookalikes | $1-$3 | inherits Meta | Medium |
| LinkedIn | B2B + high-ticket | $5-$15 | 2-3 hrs | Medium |
| Snapchat | Gen Z lifestyle | $0.30-$1 | 2-3 hrs | Low |
| X | Niche / news / SaaS | $1-$5 | 1-2 hrs | Low (volatile) |

---

## CONNECTED SKILLS

- `viral-hooks.md` — hook patterns for ad creative
- `viral-video-production.md` — production specs per platform
- `offer-design.md` — what the ad sells
- `funnel-building-master.md` — where the ad traffic goes
- `ad-management-master.md` — campaign management workflow (rotation / scaling / pausing)
- `mark.md` — Mark agent owns paid strategy
- `cold-outreach-sequences.md` — pairs with paid ads for compound reach
- `business-proposal-writing.md` — proposal sent to closed-from-ad leads

## RENÉE'S BRAND DEFAULTS

- **No mortgage rate quotes** in any ad creative (FSRA — see `fsra-mortgage-advertising-compliance.md`)
- **CASL / TCPA compliance** on every lead form (consent capture explicit)
- **No fake urgency / scarcity** — Competition Bureau scrutiny
- **No outcome guarantees** ("close 3x more deals" only if contractually fulfillable)
- **Test on Renée's contact only** before going live with any audience
