// POST /api/generate-proposal
// Calls Claude API with business-proposal-writing.md as system prompt + session state as context.
// Returns proposal HTML (preview) + PDF URL (for email attach + contract).
// Saves proposal_id to session state.

/**
 * REQUEST
 *   { session_id: string }
 *
 * RESPONSE
 *   {
 *     ok: boolean,
 *     proposal_id: string,
 *     preview_html: string,          // rendered in the sign+pay page
 *     pdf_url: string,                // public URL for download
 *     contract_url: string,           // signature request link (PandaDoc/HelloSign)
 *     stripe_payment_link: string,    // created separately via /api/create-payment-link
 *     error: string | null
 *   }
 */

export default async function handler(req, res) {
  // TODO: implement
  // 1. Load session_state from KV by session_id
  // 2. Load business-proposal-writing.md as system prompt
  // 3. Claude API call:
  //    - system: proposal-writing skill content (cached)
  //    - user: session_state JSON + "generate proposal"
  //    - cache_control: ephemeral on system
  // 4. Parse response into structured sections (greeting, problem-mirror, solution-fit, investment, timeline, next-steps, legal)
  // 5. Render HTML via template (Tailwind, mobile-first, branded)
  // 6. Render PDF via react-pdf or puppeteer
  // 7. Upload PDF to Vercel Blob / S3 → get public URL
  // 8. Create PandaDoc/HelloSign signature request → get contract_url
  // 9. Call /api/create-payment-link → get stripe_payment_link
  // 10. Save proposal_id + all URLs to session state
  // 11. Return
  //
  // ENV VARS REQUIRED
  //   ANTHROPIC_API_KEY
  //   PANDADOC_API_KEY (or HELLOSIGN_API_KEY)
  //   STRIPE_API_KEY
  //   BLOB_READ_WRITE_TOKEN (Vercel Blob)

  return res.status(501).json({ ok: false, error: 'not implemented — stub' });
}
