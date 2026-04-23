# Easy Deploy — API Stubs

Minimal interface stubs for the 7 backend serverless functions. These define the shape of the contract between frontend ↔ backend so both sides can be built in parallel. Deploy to Vercel at `/api/<name>.js` (or Cloud Run if Python).

**Status:** STUBS ONLY. Each file returns a mock response. Real implementation comes after architecture approval + video insights are in.

## The 7 endpoints

| Endpoint | Purpose | Called by |
|---|---|---|
| `POST /api/orb` | Run ORB interview chat — Claude API with orb system prompt | Orb chat page |
| `POST /api/fetch-website` | Scrape lead's website — extract services, tone, team | Orb (background tool) |
| `POST /api/lookup-gbp` | Google Business Profile lookup — rating, reviews, hours | Orb (background tool) |
| `POST /api/calculate-pricing` | Sliding-scale price calc from Orb session state | Orb + pricing page |
| `POST /api/generate-proposal` | Claude API with proposal-writing skill → PDF + preview HTML | Pricing page "Generate proposal" |
| `POST /api/create-payment-link` | Stripe payment link + contract URL | Proposal "Sign & Pay" |
| `POST /api/deploy-client` | GHL snapshot clone + CV populate + phone provision | Stripe webhook on successful payment |

## Session state shape (passed between Orb calls)

```json
{
  "session_id": "uuid",
  "business_name": "",
  "niche": "",
  "country": "",
  "city": "",
  "province_or_state": "",
  "website_url": "",
  "primary_offer": "",
  "product_service_1": "", ...,  "product_service_9": "",
  "lead_sources": [],
  "monthly_lead_volume": 0,
  "followup_pain": "",
  "team_size": "",
  "phone_preference": "keep|new",
  "existing_phone_number": "",
  "ninety_day_goal": "",
  "license_number": "",
  "scorecard": {
    "website_snippet": "",
    "brand_tone": "",
    "services_detected": [],
    "gbp_rating": 0,
    "gbp_reviews": 0,
    "gbp_hours": "",
    "competitor_density": "",
    "domain_age_years": 0,
    "notes": []
  },
  "pricing": {
    "tier": "essentials|starter|growth|professional|scale|custom",
    "setup_fee": 0,
    "monthly": 0,
    "minutes_included": 0,
    "addons": [],
    "annual_discount": false,
    "total_year_1": 0
  },
  "proposal_id": "",
  "status": "interviewing|pricing|proposal|signed|paid|deployed"
}
```

Stored in Vercel KV keyed by `session_id`. TTL 7 days for abandoned sessions.
