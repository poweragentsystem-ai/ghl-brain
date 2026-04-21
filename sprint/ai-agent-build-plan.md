# AI Agent Build Plan — Mortgage Snapshot
### Everything Console needs to build the agents in Build-with-AI. Written 2026-04-21.

---

## CURRENT STATE (2026-04-21)

**What exists:**
- 24 AI prompt custom values fully populated with playbook-aligned text (all tokenized)
- 11 AI Studio agents pre-existing (10 in General Business Automation folder + 1 Mortgage Pre-Qualifier) — NEED audit via Build-with-AI "explain this"
- `{{custom_values.qualified_lead_details}}` and `{{custom_values.not_qualified_lead_details}}` custom values exist — Renée should fill these in during onboarding (per-business criteria)

**What's missing:**
- Agents not yet built per the playbook (voice + chat + background agents)
- Knowledge Base content — 0% populated (FAQs, rate sheets, compliance docs)
- Per-agent settings (business hours filter, DND, stop-on-reply) not configured

---

## PROMPT → AGENT MAPPING

Each prompt custom value is designed to be the SYSTEM PROMPT for one specific agent. When building in Build-with-AI, paste `{{custom_values.ai_prompt_<name>}}` as the agent's system prompt so it pulls the current tokenized version automatically.

| Agent Role | Prompt Token | Folder |
|---|---|---|
| Welcome / 24/7 Auto-Reply | `{{custom_values.ai_prompt_1_general}}` | Mortgage |
| Inbound Voice Reception | `{{custom_values.ai_prompt_inbound}}` | Voice AI Bots |
| Outbound New-Lead Caller | `{{custom_values.ai_prompt_outbound_new_lead}}` | Voice AI Bots |
| Pre-Qualify Follow-Up | `{{custom_values.ai_prompt_pre_qualify_follow_up}}` | Mortgage |
| Booking Follow-Up | `{{custom_values.ai_prompt_2_booking}}` | Mortgage |
| Appointment Reminder Agent | `{{custom_values.ai_prompt_appointment_reminder}}` | Mortgage |
| No-Show Rebooker (Voice) | `{{custom_values.ai_prompt_no_show}}` | Voice AI Bots |
| Application Reminder | `{{custom_values.ai_prompt_application_reminder}}` | Mortgage |
| Document Collection (Voice) | `{{custom_values.ai_prompt_document_reminder}}` | Voice AI Bots |
| Renewal Outreach (Voice) | `{{custom_values.ai_prompt_renewal_countdown}}` | Voice AI Bots |
| Partnership Chat | `{{custom_values.ai_prompt_partnership}}` | Partnership |
| Recruitment Chat | `{{custom_values.ai_prompt_recruitment}}` | Recruitment |
| Referral Request | `{{custom_values.ai_prompt_referral_request}}` | Mortgage |
| Google Review Request | `{{custom_values.ai_prompt_google_review_request}}` | Mortgage |
| Old Lead Resurrection | `{{custom_values.ai_prompt_old_lead_resurrection}}` | Mortgage |
| Long-Term Nurture Generator | `{{custom_values.ai_prompt_long_term_nurture}}` | Mortgage |
| Real Estate Buyer Intake | `{{custom_values.ai_prompt_buyer}}` | Real Estate |
| Real Estate Seller Intake | `{{custom_values.ai_prompt_seller}}` | Real Estate |
| Generic Follow-Up | `{{custom_values.ai_prompt_follow_up}}` | Miscellaneous |

---

## KNOWLEDGE BASE — what each agent needs uploaded

**Uploaded per-agent via AI Studio → Agent → Knowledge → Upload documents or paste URLs.** Without this, agents guess at Canadian mortgage specifics.

### Shared KB (upload to every mortgage agent)
1. **Canadian Mortgage Products Reference** — 1-pager: purchase, refinance, renewal, HELOC, reverse, commercial, flip, private, first-time-buyer. LTV rules per product. Insured (CMHC/Sagen/Canada Guaranty) vs conventional.
2. **Stress Test Rules** — current qualifying rate formula (contract + 2% or 5.25%, whichever higher).
3. **Canadian Mortgage Glossary** — amortization, term, fixed vs variable vs adjustable, stress test, CMHC, LTV, GDS/TDS ratios, closing costs, land transfer tax.
4. **FSRA Compliance Do's / Don'ts** — what ads/messages must include, what they can't promise.
5. **Common Objection Rebuttals** — "my bank's cheaper" / "bad credit" / "self-employed" / "just browsing" → scripted responses the agent learns from.

### Role-specific KB

**Inbound/Outbound Voice Agents:**
- Voice script examples (tone guide)
- Objection scripts
- "If the caller asks for rates" protocol

**Renewal Outreach:**
- Current rate environment snapshot (update monthly)
- Lender comparison sheet (anonymized)

**Real Estate Buyer/Seller:**
- Typical house-hunting timeline
- Down payment sources accepted
- Buyer/seller agent partner intro scripts

**Commercial / Flip:**
- Calvert Mortgages contact + flip lending criteria
- CMHC MLI Select criteria for multi-unit

**Application / Document Agents:**
- Typical document checklist per product (T4/NOA/bank statements/employment letter/purchase contract/appraisal)
- Self-employed alternative docs (2 years NOA + business financials)

**NOTE:** Knowledge base uploads happen in the browser in AI Studio. Cannot be done via API — Console task.

---

## PER-AGENT SETTINGS (beyond the prompt)

Every agent has a settings panel in Build-with-AI. Configure:

### Voice AI Bots
| Setting | Value | Reason |
|---|---|---|
| Voice (ElevenLabs) | Pick one warm, professional voice (not robotic) | Brand feel |
| Business hours | 9 AM – 6 PM local (user's timezone) | Don't call at 3 AM |
| DND respect | ON | Legal (CRTC) |
| Stop on contact reply | ON (if they reply to SMS, don't also call) | Per playbook rule: never email + SMS + call simultaneously |
| Max retry attempts | 5 (daily for 5 days, then nurture) | Per playbook |
| Voicemail handling | Leave short message (use prompt's voicemail section) | Respectful |
| Call recording | ON (with disclosure) | Compliance + training |
| Concurrent calls | 1–5 (GHL plan limit) | Known ceiling |

### Chat Agents (Conversational AI)
| Setting | Value | Reason |
|---|---|---|
| Operating hours | 24/7 (chat is async — always on) | Lead expectations |
| Response delay | 15–45 seconds (human-feel delay) | Not instant = less robotic |
| Max conversation turns before human escalation | 8–10 | Long conversations = confusion |
| Stop on "human please" / "speak to a person" | ON → route to needs-human-review | Respect preference |
| Transfer number | `{{custom_values.transfer_phone_number}}` | Hot transfers |

### All Agents
- **Model:** pick the best available in Build-with-AI (often GPT-4 class) — speed over absolute best quality for calls; quality over speed for written content
- **Tone calibration slider:** warm / professional mix
- **Fallback behavior:** if the agent can't answer → tag `needs-human-review`, notify user, graceful handoff to human
- **Logging:** every conversation logged to contact timeline (GHL default, confirm ON)

---

## BUILD ORDER (Console does this in sequence)

**Phase 1: Audit existing (30 min)**
For each of the 11 pre-existing agents in General Business Automation folder:
1. Click the agent → Build-with-AI → paste: "Explain in detail step by step this automation and what it does. Is it using all the right custom values? Does it sound human or robotic?"
2. Based on answer, decide: KEEP AS-IS / FIX EMAILS / SWAP TO NEW PROMPT / RETIRE

**Phase 2: Build Voice AI Bots folder (90 min — 6 bots)**
For each voice bot in the mapping table:
1. Create new agent → Build-with-AI
2. System prompt: paste `{{custom_values.ai_prompt_<name>}}` (the TOKEN, not the literal text — this way it auto-updates when Claude Code changes the prompt)
3. Configure settings per the table above
4. Attach Knowledge Base: shared KB + role-specific KB
5. Save as DRAFT (do not publish until lead journey walk passes)

**Phase 3: Build Conversational AI folder (60 min — 4 chat agents)**
Same pattern. These handle web chat + SMS.

**Phase 4: Build Real Estate folder (45 min — 2 agents: Buyer + Seller)**
Same pattern. Uses `{{custom_values.partner_*}}` tokens for partner handoff.

**Phase 5: Connect agents to workflows**
In each workflow that has an "AI Call" or "AI Chat" action, select the matching agent from the dropdown.

**Phase 6: Lead journey walk (30 min)**
Use `claude-skills/lead-journey-walkthrough.md` protocol. Walk every path. Fix any agent that misbehaves. GO / NO-GO verdict before publishing.

**Phase 7: Publish (10 min)**
Toggle each draft agent to published once walk passes.

---

## SUCCESS CRITERIA

After Phase 7:
- Every agent uses `{{custom_values.*}}` tokens — zero hardcoded names or products
- Every mortgage agent has the shared KB attached
- Role-specific KB attached where relevant
- Business hours + DND + stop-on-reply configured per table
- Lead journey walk passed with no blind spots
- Dashboard: agents organized in 7 folders (Mortgage / Partnership / Recruitment / Real Estate / Voice AI Bots / Conversational AI / Miscellaneous)

---

## OPEN QUESTIONS FOR RENÉE (not blocking build)

1. Which ElevenLabs voice for the voice bots? (Pick 1 preferred voice from her ElevenLabs account when she's set it up.) — default: any warm professional voice.
2. What's her qualified-lead-details text look like? (She'll fill `{{custom_values.qualified_lead_details}}` during onboarding — default placeholder is in the custom value today.)
3. What's her exact Google review link? — she adds during onboarding.
4. How to handle recorded-call disclosure? Canadian law requires consent — the voice bot should announce "this call may be recorded for quality" at start. Add to each voice bot's opening line.

Get her feedback on these; not blocking agent build.
