// POST /api/orb
// Runs the Orb interview. Calls Claude API with the Orb system prompt
// (from projects/easy-deploy-business/ORB-SYSTEM-PROMPT.md) + chat history
// + current session state. Streams response back to frontend.
//
// Uses prompt caching so the massive system prompt is cached after first call.

/**
 * REQUEST
 *   {
 *     session_id: string,
 *     user_message: string,
 *     chat_history: Array<{role: 'user'|'assistant', content: string}>
 *   }
 *
 * RESPONSE (streamed)
 *   - Content-Type: text/event-stream
 *   - Each event: { delta: string } OR { tool_use: {...} } OR { state_update: {...} } OR { done: true }
 *
 * TOOLS THE ORB CAN CALL
 *   - fetch_website(url) → calls /api/fetch-website
 *   - lookup_gbp(business_name, city) → calls /api/lookup-gbp
 *   - calculate_pricing(session_state) → calls /api/calculate-pricing
 *   - save_session_state(session_id, updates) → writes to Vercel KV
 */

export default async function handler(req, res) {
  // TODO: implement
  // 1. Validate request
  // 2. Load session state from KV (key: session_id)
  // 3. Read ORB-SYSTEM-PROMPT.md and build Claude API request
  //    - cache_control: ephemeral on system prompt
  //    - tools: [fetch_website, lookup_gbp, calculate_pricing, save_session_state]
  //    - messages: chat_history + { role: 'user', content: user_message }
  // 4. Stream Claude response to client
  // 5. On tool use, execute tool server-side, append tool_result to chat, continue
  // 6. On turn end, save updated session state to KV

  return res.status(501).json({ ok: false, error: 'not implemented — stub' });
}
