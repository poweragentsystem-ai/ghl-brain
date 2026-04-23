// POST /api/calculate-pricing
// Sliding-scale pricing calculator. Takes Orb session state, returns a recommended tier +
// price with add-ons applied. Frontend pricing slider calls this live as user adjusts.

/**
 * REQUEST
 *   {
 *     session_state: { ... },   // full orb state
 *     overrides?: {             // optional — from pricing slider
 *       minutes_tier?: number,          // 500 | 1000 | 2500 | 4000 | 7000
 *       setup_complexity?: number,      // 1-5 (simple to complex)
 *       addons?: string[],              // ['cold_email','extra_bot','premium_research','white_label']
 *       annual_billing?: boolean
 *     }
 *   }
 *
 * RESPONSE
 *   {
 *     ok: boolean,
 *     tier_name: string,
 *     setup_fee: number,
 *     monthly: number,
 *     minutes_included: number,
 *     overage_per_min: number,
 *     addons: [{name, monthly_cost}],
 *     annual_discount_pct: number,
 *     total_year_1: number,
 *     total_month_1: number,
 *     bot_list: string[],
 *     niche_specific_bots: string[],
 *     recommendation_reason: string
 *   }
 */

// PRICING RULES (derived from CLAUDE.md tiers + Architecture doc)
const TIERS = {
  essentials:   { bots: [1,2],  minutes: 500,   monthly: 297, setup: 2997 },
  starter:      { bots: [2,3],  minutes: 1000,  monthly: 397, setup: 3997 },
  growth:       { bots: [3,5],  minutes: 2500,  monthly: 597, setup: 4997 },
  professional: { bots: [5,7],  minutes: 4000,  monthly: 797, setup: 6997 },
  scale:        { bots: [7,10], minutes: 7000,  monthly: 997, setup: 8997 },
};
const OVERAGE = 0.14;
const ADDONS = {
  cold_email: 197,      // monthly
  extra_bot: 47,        // monthly per bot
  white_label: 97,      // monthly
  premium_research: 497 // one-time
};
const ANNUAL_DISCOUNT = 0.1667; // 2 months free = 16.67% off

export default async function handler(req, res) {
  // TODO: implement
  // 1. From session_state determine recommended tier:
  //    - monthly_lead_volume → suggests minutes tier
  //    - team_size + ninety_day_goal → bias up or down
  //    - niche → mortgage/dental add niche-specific bots
  // 2. Apply overrides (user moved sliders)
  // 3. Calculate totals
  // 4. Build bot list (9 core + niche-specific)
  // 5. Write recommendation_reason — why this tier fits ("Based on 40 leads/month and goal of 24/7 coverage, Starter tier recommended")
  // 6. Return

  return res.status(501).json({ ok: false, error: 'not implemented — stub' });
}
