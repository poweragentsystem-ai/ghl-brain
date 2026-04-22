# Console Phase 3 Handoff — EquityMax CV Reference Swaps

**Context for Console agent:** Claude Code has completed Phase 1 (audit) and the unambiguous Phase 3 API writes (populating canonical CV values). Your job is the UI-only reference swaps that the GHL public API cannot reach: workflow action step text, email body content, SMS body content, and AI agent prompts in AI Studio. After you're done, Claude Code runs Phase 4 functional verification and Phase 5 deletes.

**Scope:** This prompt covers ONLY the "already-decided" MERGE cases from the dedup map — the ones that don't depend on Renée's pending canonical ambiguity decisions. When she answers the 4 ambiguities in Riley, a separate follow-up prompt will be issued.

---

## BEFORE YOU START — READ THESE

1. `XpertVault/projects/equitymax-snapshot/console-rules.md` — no real contact messaging, canonical CV keys, message tone rules
2. `XpertVault/sprint/cv-audit-2026-04-22/dedup-map.md` — action tables
3. `XpertVault/projects/equitymax-snapshot/ai-agent-cv-map.md` — required CVs per agent
4. `XpertVault/projects/equitymax-snapshot/forward-walk-gap-report.md` — 14 gaps (for context on what's broken — do NOT fix gaps in this pass, just swaps)

---

## WHAT CLAUDE CODE ALREADY DID (so you don't duplicate)

✅ Populated in EquityMax via API (value verified correct UTF-8):
- `user_first_name` = "Renée"  (ID `8nzyXz0A4iuoEl8f5Ekr`)
- `user_full_name` = "Renée Ross"  (ID `wGOURYvckccqHTsQyokI`)
- `website` = "https://equitymax.ca"  (ID `op634PZzqSZvnYAEdRI8`)

`user_last_name` was already "Ross". `niche` already = "Mortgage Brokerage".

⏳ Did NOT delete deprecated keys yet (`owner_name`, `owner_full_name`, etc.). That's Phase 5, after you finish the swaps and Renée confirms functional.

---

## YOUR JOB — 3 SEARCH-AND-REPLACE PASSES IN EQUITYMAX ONLY

### PASS 1 — Person name references (already-decided)

Everywhere in EquityMax where you see these token strings, swap them:

| Replace this | With this |
|---|---|
| `{{custom_values.owner_name}}` | `{{custom_values.user_first_name}}` |
| `{{custom_values.owner_full_name}}` | `{{custom_values.user_full_name}}` |

Places to search:
- Every workflow action that has a SMS Body, Email Body, Internal Note, or Add Contact Note step
- Every AI agent prompt in AI Studio (General Business Automation folder + any voice bots + Mortgage Pre-Qualifier)
- Every email template (including the 4 generic + 10 US mortgage ones flagged for deletion — still fix so the count is accurate)
- Every form description / confirmation text
- Every SMS/email snippet in the snippet library
- Any voice bot outbound caller-ID script or voicemail drop script

### PASS 2 — Niche + website + business→company references (already-decided)

| Replace this | With this |
|---|---|
| `{{custom_values.industry}}` | `{{custom_values.niche}}` |
| `{{custom_values.website_url}}` | `{{custom_values.website}}` |
| `{{custom_values.business_name}}` | `{{custom_values.company_name}}` |
| `{{custom_values.business_phone}}` | `{{custom_values.company_phone}}` |
| `{{custom_values.business_address}}` | `{{custom_values.company_address}}` |
| `{{custom_values.company_sloagan}}` | `{{custom_values.company_slogan}}` |
| `{{custom_values.tagline}}` | `{{custom_values.company_slogan}}` |

### PASS 3 — Double-underscore bug (already-decided)

| Replace this | With this |
|---|---|
| `{{custom_values.product__service_1}}` (two underscores before service) | `{{custom_values.product_service_1}}` |
| `{{custom_values.product__service_2}}` (same) | `{{custom_values.product_service_2}}` |

---

## PROCESS PER AGENT (use Build with AI wherever possible)

For each AI agent in AI Studio:
1. Click the agent → Build with AI
2. Type: "Scan this agent's prompt and all its steps. Find every occurrence of `{{custom_values.owner_name}}`, `{{custom_values.owner_full_name}}`, `{{custom_values.industry}}`, `{{custom_values.website_url}}`, `{{custom_values.business_name}}`, `{{custom_values.business_phone}}`, `{{custom_values.business_address}}`, `{{custom_values.company_sloagan}}`, `{{custom_values.tagline}}`, `{{custom_values.product__service_1}}`, `{{custom_values.product__service_2}}`. Replace each with the canonical key per the replacement table. Keep all other content identical."
3. Verify the diff Build with AI shows before saving
4. Save the agent (DRAFT — do NOT publish yet)

For each workflow (Automation → Workflows):
1. Click the workflow → Build using AI
2. Same instruction — scan step bodies, replace tokens
3. Save DRAFT

For email templates:
1. Open each template in Email builder
2. Use the built-in Find & Replace (if available) or manual edit
3. Save

For forms: check the "Thank You" message + any confirmation text

---

## WHAT TO LOG

Every time you swap an occurrence, append to `XpertVault/sprint/master-build-status.md`:

```
- [YYYY-MM-DD HH:MM | Console] Swapped {{custom_values.<OLD>}} → {{custom_values.<NEW>}} in [workflow / agent / email / form name]. Count: N occurrences.
```

If you hit a token that's NOT in the replacement table but looks deprecated (e.g., something referencing a key that's not canonical per `ai-agent-cv-map.md`), STOP and append a NOTE to master-build-status — don't guess. Claude Code + Renée will review.

---

## AFTER YOU FINISH

1. Final append to master-build-status: `Phase 3 Pass 1-3 complete. N total swaps across M agents/workflows/emails. Ready for Phase 4 verification.`
2. Return to Claude Code session. Claude Code runs the functional verification (test contact through each pipeline), then flags for Renée's final approval on Phase 5 deletes.

## DO NOT DO

- ❌ Do not publish any workflow or agent. Save as draft only.
- ❌ Do not send any test SMS/email to real contacts. Use renee.ross@gmail.com / 4168784622 only, if at all.
- ❌ Do not address the 14 gaps in `forward-walk-gap-report.md` in this pass. Those need Renée's decisions first.
- ❌ Do not touch the 4 canonical ambiguities (my_calendar vs booking_link, ai_job_title vs ai_assistant_job_title, ABC 3-way dups, ABC tag standardization). Those are pending in Riley.
- ❌ Do not delete anything. Deletes are Phase 5, via API, after Renée approves.
- ❌ Do not touch ABC sub-account. This pass is EquityMax-only.
