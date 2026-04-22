# Voice Bot Inspiration — Mortgage (Canadian)

Source: Renée's Google Drive `01 - Mortgage Professional (CAN)` folder + master prompt library. Pulled 2026-04-22 for Morgan (Mortgage Assistant) voice bot build in EquityMax AI Studio.

**Universality test before using any of these:** Can every Canadian mortgage professional drop this into their own brokerage with zero code edits — just custom value swaps? If no, make it so.

## Files in this folder
- `power-agent-voice-ai-rules.md` — universal voice AI behavior rules (no hardcoding, sales psychology, rebuttals)
- `canadian-inbound-generic.md` — [INBOUND] greet/answer/book script — CAN mortgage — uses canonical CVs
- `canadian-outbound-prequalify.md` — [OUTBOUND] cold/warm pre-qualify — CAN mortgage
- `canadian-prequalifying-questions.md` — full prequalifying question set per product (Purchase / Refi / HELOC / Private / Reverse / Renewal / Wholesale)

## Canonical CVs these scripts reference (must exist in EquityMax + ABC)
| Key | Purpose |
|---|---|
| `ai_agent_name` | Voice bot's own name (e.g. "Morgan") |
| `company_name` | Brokerage name |
| `ai_assistant_job_title` | e.g. "mortgage assistant" |
| `agent_first_name` | Human mortgage agent (Renée) |
| `booking_link` | Calendar URL *(conflicts with `my_calendar` — see dedup map)* |
| `license_number` | FSRA license |
| `office_hours` | Business hours |
| `ai_inbound_call_number` | Inbound phone |
| `agency_voicemail_message` | Voicemail drop script |
| `application_link` | Scarlette / application portal URL |

## Additional scripts available in Drive (not yet pulled)
- `1wtIOmqadTWMf6Klk7J-Zo0E8YZaTv2o2Pa_Go2FX8y0` — [INBOUND] CAN — New Lead Pre-Qualify
- `1j6RSClSMQVmNy9iiQHnfDsRrUtbGNQjPyfJVJPaidxA` — **VOICE-Mortgage (original seed)
- `1zWcLCFV_isyxi-Ncl1pGwbQPeGcxDecZaS85QWYg5IU` — VoiceBot-Power-Full April 14 (18k — master)
- `1xhFomX2nFML7GQprkEnlSkvlcOx6U6Q3T2oDk0r9Olg` — Power Agent Voice Sales Skills
- `19id_jAcit3Z3EsJg49790-IPRobHJ7ldRqNmIPHmIQs` — Roleplay scenarios
- `1y1oHAsWENzsmn5FlUgpEe_MEuaptu1WU81QcRm-eS2w` — Canadian Mortgage Info (knowledge base)
- `1D3-SvzxwlBQr-dqeZR7tadwhm3MOPUZoqd6FI5-vAxc` — Mortgage LTV Info
- `1DvUEwo4D3rbYB_egvbz6qNsm4iSAbNtHBiW3E1elyA0` — Mortgage (CAD) SMS Bot

Pull any of these with Google Drive MCP when building specific flows.
