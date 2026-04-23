// POST /api/fetch-website
// Scrapes a lead's website. Returns structured info Orb uses to personalize
// the proposal + pricing calibration.

/**
 * REQUEST
 *   { url: string }
 *
 * RESPONSE
 *   {
 *     ok: boolean,
 *     title: string,
 *     h1: string[],
 *     h2: string[],
 *     services_detected: string[],
 *     contact_phone: string | null,
 *     contact_email: string | null,
 *     address: string | null,
 *     team_mentions: string[],
 *     brand_tone: 'friendly' | 'formal' | 'aggressive' | 'neutral',
 *     tech_signals: string[],   // e.g. 'uses GHL', 'Shopify', 'Squarespace'
 *     domain_age_years: number | null,
 *     error: string | null
 *   }
 */

export default async function handler(req, res) {
  // TODO: implement
  // 1. Validate URL (https only, no private IPs, timeout 10s)
  // 2. Fetch with a browser-like UA
  // 3. Parse with Cheerio — extract title, H1/H2, meta description
  // 4. Phone/email/address regex + Schema.org LocalBusiness JSON-LD if present
  // 5. Service detection: keyword matching against niche dictionary
  // 6. Brand tone: simple classifier on copy (casual vs formal signals)
  // 7. Tech signals: look for GHL iframe, Shopify meta, Squarespace script tags, etc.
  // 8. Domain age via WHOIS API (optional — skip if slow)
  // 9. Return structured

  return res.status(501).json({ ok: false, error: 'not implemented — stub' });
}
