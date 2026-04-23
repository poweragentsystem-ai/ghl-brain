// POST /api/deploy-client
// Fires after Stripe webhook confirms payment. Clones the ABC snapshot in GHL
// into a new sub-account for this client, populates custom values from Orb
// session state, provisions phone, sends onboarding email.
//
// Triggered by Stripe webhook on successful checkout.

/**
 * REQUEST (from Stripe webhook after checkout.session.completed)
 *   {
 *     session_id: string,   // our orb session id, passed via Stripe metadata
 *     stripe_customer_id: string,
 *     amount_paid: number
 *   }
 *
 * RESPONSE
 *   {
 *     ok: boolean,
 *     new_location_id: string,        // new GHL sub-account ID
 *     dashboard_url: string,           // direct link to client's new dashboard
 *     onboarding_email_sent: boolean,
 *     error: string | null
 *   }
 */

export default async function handler(req, res) {
  // TODO: implement via GHL MCP
  // 1. Load session_state from KV by session_id
  // 2. Verify Stripe payment actually succeeded (webhook signature check)
  // 3. Call GHL Agency API: POST /locations (create new sub-account)
  //    - name: session_state.business_name
  //    - country: session_state.country
  //    - timezone: inferred from city
  // 4. Import snapshot: POST /snapshots/{snapshot_id}/import into new location
  //    - snapshot_id: ABC snapshot (mortgage snapshot ONLY if niche=mortgage)
  // 5. Wait for snapshot import to complete
  // 6. Populate canonical custom values from session_state:
  //    - user_first_name, user_full_name, company_name, website, niche,
  //      primary_offer, product_service_1-9, city, service_area, my_calendar,
  //      ai_agent_name, company_phone, business_hours, license_number (if mortgage), etc.
  // 7. Provision phone number:
  //    - if phone_preference = 'new': buy Twilio number via GHL API
  //    - if phone_preference = 'keep': set up Verified Caller ID using existing_phone_number
  // 8. Apply branding (logo, colors) from client upload
  // 9. Send onboarding email via Gmail MCP:
  //    - FROM: j.ai.poweragentsystem@gmail.com
  //    - SUBJECT: 'Claude Ship — Your Easy Deploy system is live!'
  //    - content: dashboard URL + next steps (upload pricing sheets, review bots, etc.)
  // 10. Update session state: status = 'deployed', new_location_id saved
  // 11. Notify Renée via internal alert (Telegram/email)
  //
  // ENV VARS REQUIRED
  //   GHL_AGENCY_API_KEY (for snapshot import + sub-account creation)
  //   GHL_ABC_SNAPSHOT_ID
  //   GHL_EQM_SNAPSHOT_ID (for mortgage niche only)
  //   STRIPE_WEBHOOK_SECRET

  return res.status(501).json({ ok: false, error: 'not implemented — stub' });
}
