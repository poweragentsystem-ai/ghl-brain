// POST /api/create-payment-link
// Creates a Stripe Payment Link for the proposal's setup fee + first month
// + auto-creates subscription after successful payment.

/**
 * REQUEST
 *   {
 *     session_id: string,
 *     setup_fee: number,
 *     monthly: number,
 *     minutes_included: number,
 *     client_email: string,
 *     client_business_name: string,
 *     addons: [{name, monthly_cost}]
 *   }
 *
 * RESPONSE
 *   {
 *     ok: boolean,
 *     payment_link_url: string,   // public Stripe checkout URL
 *     customer_id: string,         // Stripe customer (new or matched)
 *     error: string | null
 *   }
 */

export default async function handler(req, res) {
  // TODO: implement via Stripe MCP (or stripe npm package)
  // 1. Create or match Stripe customer by email
  // 2. Create setup_fee product + one-time price
  // 3. Create monthly subscription product + recurring price (per tier)
  // 4. Create add-on products + prices (cold_email, extra_bot, etc.)
  // 5. Create Payment Link that charges setup_fee once + starts subscription
  //    - metadata: session_id (so webhook can match)
  //    - after_completion: redirect to /orb/success?session_id=...
  // 6. Return payment_link_url
  //
  // SUCCESS FLOW
  //   Payment Link paid → Stripe webhook → /api/deploy-client with session_id

  return res.status(501).json({ ok: false, error: 'not implemented — stub' });
}
