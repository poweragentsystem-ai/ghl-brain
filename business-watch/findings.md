# Business Watch — Findings

**Last run:** 2026-04-30T04:51:13.719801+00:00
**OK:** 6  **Degraded:** 0  **Broken:** 0  **Skipped:** 5

| Asset | Kind | Check | Status | Detail |
|---|---|---|---|---|
| `command-center` | deployment | http | [OK] ok | 200 in 140ms |
| `agency-site` | deployment | http | [OK] ok | 200 in 113ms |
| `agency-site` | deployment | lead-form | [OK] ok | endpoint exists (200) |
| `easy-deploy` | deployment | http | [OK] ok | 200 in 189ms |
| `equitymax-site` | deployment | http | [--] skipped | no url (not deployed) |
| `abc` | ghl | token | [--] skipped | env GHL_ABC_API_KEY not set |
| `abc` | ghl | contact-count | [--] skipped | env GHL_ABC_API_KEY not set |
| `equitymax` | ghl | token | [--] skipped | env GHL_EQM_API_KEY not set |
| `equitymax` | ghl | contact-count | [--] skipped | env GHL_EQM_API_KEY not set |
| `ghl-brain` | repo | github | [OK] ok | pushed 2026-04-30, default main |
| `agency-site-repo` | repo | github | [OK] ok | pushed 2026-04-20, default main |

## What to do with this

- **Broken:** open a GitHub issue (workflow does this) and Code Claude triages on next run.
- **Degraded:** investigate at next session unless customer-facing — then now.
- **Skipped:** add the missing env var as a GitHub Action secret to enable.
