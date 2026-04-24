# Daily Brief — n8n Build Spec (Norm Executes)

**Decision made:** n8n is the executor. Claude API called only for narrative synthesis. No "schedule skill" needed.
**Owner:** Norm (n8n)
**Schedule:** Every day at 7:00 AM Toronto (`0 7 * * *` in n8n cron node)
**Deliverables:** (1) Email to renee.ross@gmail.com, (2) Webhook POST to Command Center dashboard

---

## WORKFLOW DESIGN (n8n nodes, in order)

1. **Schedule Trigger** — 7:00 AM daily (America/Toronto TZ)

2. **HTTP Request — Bank of Canada rate**
   - GET: https://www.bankofcanada.ca/valet/observations/V122530/json?recent=5
   - Parse current overnight rate + last change date

3. **HTTP Request — wowa.ca best rates**
   - GET + parse the mortgage rates page
   - Extract: best 5yr fixed insured, 5yr fixed uninsured, 5yr variable, 3yr fixed, prime

4. **HTTP Request — GHL mortgage sub-account**
   - API: new leads last 24h, leads cold >48h, applications waiting on docs, contacts in each pipeline stage
   - Uses: GHL API key from memory `reference_ghl_api_keys.md`

5. **Microsoft Graph — Outlook scan**
   - Query inbox: overnight messages from lenders, Cheryl Dieken, anything compliance-sensitive
   - Categorize: lender updates, underwriter insight, client issues, other

6. **HTTP Request — Stripe (when wired)**
   - MTD revenue pull for mortgage line
   - Placeholder for now

7. **Claude API — Narrative synthesizer**
   - Model: claude-haiku-4-5-20251001 (cost-efficient for daily summaries)
   - System prompt: the 9-section spec from `daily-brief-spec.md` + MyClaw tone rules
   - Input: JSON bundle of all gathered data
   - Output: formatted markdown + subject line
   - Prompt caching: YES (cache the system prompt, 5-min TTL fits fine since this fires once daily but subsequent same-day runs stay warm)

8. **HTML email formatter**
   - Convert markdown → mobile-responsive HTML
   - Inline CSS, minimum 16px body, gold accent for numbers
   - Dark-mode compatible

9. **Send Email node (Gmail or MS Graph)**
   - From: poweragentsystem@gmail.com (or OLS email if MS365 authed)
   - To: renee.ross@gmail.com
   - Subject: the generated one (format: `☀️ Daily Brief — [Date] — [punchy summary]`)

10. **Webhook POST → Command Center**
    - Endpoint: TBD on Command Center backend (new endpoint `/api/daily-brief`)
    - Payload: markdown + metadata + timestamp
    - Command Center renders latest brief in a new "Daily Brief" tab OR as a Jordan-orb morning bubble

11. **Error handling**
    - On any node fail: send fallback email "Brief failed — check n8n" to Renée + log to error-log.txt

---

## COMMAND CENTER INTEGRATION (Devon + Renée to confirm)

Option A: New tab "Daily Brief" with scrollable history of past briefs
Option B: Jordan (COO) orb shows a morning bubble with the brief summary, click-to-expand
Option C: Top banner when Renée logs into Command Center in the morning

**Recommendation: Option B.** Jordan owns morning briefings narratively; it fits the orb metaphor; one-click access without leaving the main view.

**Build step for Devon:** add `/api/daily-brief` POST endpoint (stores latest brief in localStorage or lightweight DB), add brief-bubble component to Jordan orb.

---

## COST ESTIMATE

- n8n execution: already paid (cloud plan)
- BoC API: free
- wowa.ca scrape: free (light load, once/day)
- GHL API: already paid
- MS Graph: OAuth, free
- **Claude API call:** ~1500 tokens in + 600 tokens out = ~$0.003 per call with Haiku 4.5. Monthly: ~$0.10. Negligible.
- **Total daily brief cost: effectively zero** on top of existing infrastructure.

---

## BUILD SEQUENCE

1. Norm builds n8n workflow (data gathering nodes first, test each individually per build-and-test protocol)
2. Devon adds Command Center endpoint + Jordan orb morning bubble
3. Renée runs `/mcp` to auth MS365 (unlocks Outlook scanning)
4. First live send at next 7:00 AM
5. Tune narrative output for first 3 days, adjust tone/length based on Renée feedback

---

## OPEN ITEMS NORM AND DEVON WILL HANDLE WITHOUT RENÉE

- n8n workflow skeleton (Norm)
- BoC + wowa.ca scrape test (Norm)
- GHL API query formulation (Norm + Gill)
- Command Center endpoint (Devon)
- Jordan orb bubble UI (Devon + Allan for design)

## OPEN ITEMS THAT GENUINELY NEED RENÉE

- `/mcp` authentication for MS365 (no way around this — OAuth browser flow)
- Final sign-off on Option B (Jordan orb bubble) vs A or C for Command Center display
