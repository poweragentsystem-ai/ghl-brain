// POST /api/lookup-gbp
// Google Business Profile lookup via Google Places API.
// Returns rating, review count, hours, price level, photos — feeds proposal personalization.

/**
 * REQUEST
 *   { business_name: string, city: string, country?: string }
 *
 * RESPONSE
 *   {
 *     ok: boolean,
 *     found: boolean,
 *     place_id: string | null,
 *     name: string,
 *     rating: number | null,
 *     user_ratings_total: number | null,
 *     opening_hours: string | null,
 *     price_level: number | null,     // 0-4
 *     types: string[],                // ['dentist','health']
 *     formatted_address: string,
 *     phone: string | null,
 *     website: string | null,
 *     photos_count: number,
 *     reviews_snippets: string[],     // top 3 review excerpts for proposal color
 *     competitor_density: 'high'|'medium'|'low',  // based on nearby places in same type
 *     error: string | null
 *   }
 */

export default async function handler(req, res) {
  // TODO: implement
  // 1. Validate request
  // 2. Google Places Text Search: "{business_name} in {city} {country}"
  // 3. Take first result's place_id
  // 4. Google Places Details API for full data
  // 5. Nearby Search on same type within 5km radius → count = competitor_density signal
  //    (>15 = high, 5-15 = medium, <5 = low)
  // 6. Return structured
  //
  // ENV VARS REQUIRED
  //   GOOGLE_PLACES_API_KEY
  //
  // COSTS: ~$0.02 per full lookup. Cache results in KV by place_id for 30 days.

  return res.status(501).json({ ok: false, error: 'not implemented — stub' });
}
