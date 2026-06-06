---
tags:
  audience: [claude-code, claude-console, claude-app, renee]
  domain_expert: connor-compliance
  function: [account-health-check, pre-ship-verification, red-yellow-flagging, emergent-style-build-test]
  capabilities: [filesystem, vercel-api, ghl-mcp, upstash-kv, telegram]
  style: [reversible-blocks, fail-loud-on-critical, verify-before-claim]
  compliance: [FSRA, CASL, CRTC, TCPA, PIPEDA]
  tech: [vercel, upstash-kv, ghl, command-center, telegram]
related_to:
  projects: [brain-architecture-v1, command-center, easy-deploy, equitymax]
  memory_rules:
    - feedback_account_health_red_yellow_critical.md
    - feedback_screenshot_ui_changes_before_verified.md
    - feedback_telegram_human_voice_and_push.md
    - project_never_name_specific_lenders.md
    - feedback_agent_not_broker_fsra.md
  skills:
    - 06-skills/client-delivery-checklist/
  agents:
    - 04-agents/connor/
    - 04-agents/hawk/
  processes:
    - 00-rules/process/brain-architecture-v1.md
    - 00-rules/process/cross-instance-protocol.md
---

# ACCOUNT PROVISIONING HEALTH CHECK — Red/Yellow/Critical configuration audit

**Established:** Renée 2026-05-19
**Applies to:** Every client account (AI Consulting) + every subscriber account (Easy Deploy) + every internal sub-account (EquityMax, ABC, future)
**Cross-instance:** Claude Code · Console · App · runners

---

## The discipline

Every account gets a real-time configuration health record stored in Upstash KV under `account-health:<account-id>` with:

```json
{
  "account_id": "...",
  "type": "ai-consulting | easy-deploy-subscriber | internal",
  "name": "<account or company name>",
  "last_checked": "2026-05-19T17:30:00Z",
  "status": "green | yellow | red | unchecked",
  "red_flags": [
    { "check": "voice_bot_timezone_mismatch", "detail": "...", "severity": "critical", "fix_url": "..." }
  ],
  "yellow_flags": [
    { "check": "auto_posting_off", "detail": "...", "severity": "optional", "fix_url": "..." }
  ],
  "green_checks": [ "phone_present", "email_verified", ... ],
  "compliance_flags": [ "fsra_disclosure_missing", ... ]
}
```

---

## The check list (live)

### 🔴 RED — critical, blocks account from being "ready"

| Check ID | What it verifies | How to verify | Fix path |
|---|---|---|---|
| `phone_present` | Account has a phone number set | GHL contact / location query | Set in account settings |
| `phone_verified` | Phone number is verified (BYO caller ID confirmed) | GHL phone settings → verified caller ID | Verify caller ID in GHL |
| `email_present` | Account has email | GHL contact / location | Set in settings |
| `email_verified` | Sender domain DKIM/SPF/DMARC passing | DNS lookup + Resend domain status | DNS records in Cloudflare/registrar |
| `business_name_set` | Not "test" / "untitled" / placeholder | Custom value `company_name` | Set in account settings |
| `niche_set` | Custom value `niche` populated | Custom value query | Set during orb interview / signup |
| `country_set` | Custom value `country` set | Custom value query | Set during signup |
| `state_province_set` | Custom value `state` or `province` set | Custom value query | Set during signup |
| `voice_bot_connected` | Voice bot is wired to a workflow trigger, not orphaned | GHL workflow scan for Voice AI Outbound action references | Wire voice bot in workflow |
| `voice_bot_caller_id` | Voice bot has verified caller ID assigned | GHL Voice AI agent config | Verify caller ID in GHL |
| `voice_bot_timezone` | Voice bot timezone matches account country/region | Compare timezone field vs country | Update voice bot timezone |
| `voice_bot_legal_stage` | Voice bot legal stage set (CRTC for Canada / TCPA for US) | GHL Voice AI agent config | Set legal stage in GHL |
| `voice_bot_disclosure` | Opening line contains required disclosure (FSRA / CRTC / niche-specific) | Read voice bot prompt for required phrases | Update opening line |
| `voice_bot_fallback` | Voice bot has fallback handoff (human or queue) | GHL workflow downstream nodes | Add fallback path in workflow |
| `voice_bot_tokens` | Voice bot prompts use {{custom_values.*}} not hardcoded | Read voice bot prompt for hardcoded names/numbers | Tokenize prompt |
| `unsubscribe_link` | All email templates have unsubscribe link (CASL) | Scan templates for `{{unsubscribe_url}}` token | Add to templates |
| `privacy_policy_url` | Privacy policy URL set in custom value | Custom value `privacy_policy_url` | Set value |
| `terms_of_service_url` | T&C URL set in custom value | Custom value `terms_of_service_url` | Set value |

**Mortgage-specific reds (EquityMax + clones):**

| Check ID | What it verifies | How to verify |
|---|---|---|
| `fsra_disclosure_footer` | Public surfaces have FSRA disclosure | Scan public HTML + email templates |
| `no_broker_wording` | "broker" / "your broker" not in public copy | Grep public surfaces for "broker" |
| `brokerage_license_set` | Custom value `brokerage_license_number` populated | Custom value query |
| `agent_license_level_set` | Custom value `agent_license_level` = "Mortgage Agent Level 2" | Custom value query |
| `no_lender_names_public` | "Calvert" / "Equitable" / "B2B" etc. not in customer-facing copy | Grep public surfaces |

### 🟡 YELLOW — optional, doesn't block ready

| Check ID | What it verifies |
|---|---|
| `auto_posting_configured` | Social media auto-posting workflow enabled |
| `long_term_nurture_on` | Long-term nurture sequence active |
| `partner_referral_flow_on` | Partner referral intake workflow live |
| `birthday_touchpoint_on` | Birthday automation enabled |
| `renewal_countdown_on` | Renewal countdown automation active (mortgage) |
| `webinar_sequence_on` | Webinar/event-specific post-sequence enabled |
| `home_anniversary_on` | 1-year home anniversary touchpoint (mortgage) |
| `funded_client_check_in_on` | Annual funded-client check-in (mortgage) |

### 🟢 GREEN — all reds clear

Account is shippable. Yellow flags still surface but don't block.

### ⚪ UNCHECKED — verification not run yet

New account or one that hasn't had the daily cron pass.

---

## When the check runs

1. **On account create** (Easy Deploy subscription completed via provision-subscriber.js) — fires checker immediately, surfaces in Command Center
2. **On any account update** — webhook from GHL → checker re-runs (incremental)
3. **Daily cron at 13:00 UTC** — full sweep of all accounts (folds into morning-brief.js as `?account_health_audit=1`)
4. **On-demand from Command Center** — Renée clicks "Re-check" on any account

---

## Build-test-verify discipline (Emergent-style)

Renée 2026-05-19: *"as you build client and subscriber accounts you need to build and test like how emergent does and never waiver from this."*

For every account being provisioned:

1. **Build** — provision the account (GHL sub-account create + snapshot install via SaaS Mode)
2. **Health check** — run the red/yellow checker
3. **Visual verify** — take a screenshot of the deployed account's key pages (use /browse or Claude_in_Chrome MCP)
4. **Functional test** — fake a lead through the entry workflow, verify voice bot fires, verify SMS lands, verify booking renders
5. **If any test fails OR any red flag** — fix in place, re-test, re-screenshot
6. **Only when 0 reds + all tests green** — claim "ready"
7. **Post the screenshots + test results to the account's project folder** under `examples/`

If steps 3-5 aren't run, the account is NOT ready. No exceptions.

---

## Surface in Command Center

The `/brain` page (to be built) shows:

```
ACCOUNTS HEALTH OVERVIEW
═════════════════════════════════════════

🟢 GREEN — 3 accounts ready
🟡 YELLOW — 2 accounts have optional gaps
🔴 RED — 1 account critical (BLOCKED FROM READY)
⚪ UNCHECKED — 0 accounts

────── RED ACCOUNTS ──────
Easy Deploy subscriber #042 (Acme Dental)
  🔴 voice_bot_timezone_mismatch — set to UTC, should be America/New_York
  🔴 voice_bot_disclosure_missing — opening line has no TCPA notice
  Fix at: xpert-command-center.vercel.app/accounts/042

────── YELLOW ACCOUNTS ──────
EquityMax (internal)
  🟡 auto_posting_off — social media auto-post disabled
  🟡 home_anniversary_off — no 1-year touchpoint

────── GREEN ACCOUNTS ──────
ABC (test sub) ✅
Easy Deploy subscriber #041 ✅
EquityMax client #007 ✅
```

Each row clickable → drilldown shows full check list + fix paths.

---

## Telegram alerts

**Red flag** — immediate ping via `tg-msg`:

> *"Renée — Easy Deploy subscriber #042 (Acme Dental) is missing voice bot timezone + disclosure. Won't fire correctly + TCPA exposure. Fix at xpert-command-center.vercel.app/accounts/042"*

**Yellow flag** — silent. Surfaces in daily morning brief.

**Compliance flag** (FSRA / CASL / CRTC / TCPA / PIPEDA) — immediate ping even if yellow:

> *"Renée — flagged compliance issue on EquityMax: FSRA disclosure missing on the new partner referral page. Fix at xpert-command-center.vercel.app/equitymax"*

---

## Anti-patterns banned

- ❌ Claiming an account is "ready" without running the checker
- ❌ Claiming an account is "ready" with 1+ red flags
- ❌ Skipping the visual screenshot step (Emergent-style discipline)
- ❌ Hand-checking accounts via human eyeballs only — must be automated
- ❌ Hiding yellow flags from morning brief (they're a real signal of drift)
- ❌ Auto-fixing red flags without alerting Renée (some need her decision)

---

## Sources

- Renée chat 2026-05-19
- Memory rule: `feedback_account_health_red_yellow_critical.md`
- CLAUDE.md gates: VERIFY-LIVE + SCREENSHOT-UI-VERIFY
- Connor agent owns enforcement at the audit layer

## Related

- `brain-architecture-v1.md` — health checker is the operational arm of Layer 3 + 4
- `cross-instance-protocol.md` — Console reads + reports red flags
- `command-center` — `/brain` page surfaces the dashboard
- `easy-deploy` — first real test case for subscriber provisioning + health check
