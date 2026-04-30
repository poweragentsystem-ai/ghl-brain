# Business Watch — Findings

**Last run:** 2026-04-30T04:49:51.849568+00:00
**OK:** 0  **Degraded:** 3  **Broken:** 3  **Skipped:** 5

| Asset | Kind | Check | Status | Detail |
|---|---|---|---|---|
| `command-center` | deployment | http | [!!] broken | 403 in 645ms |
| `agency-site` | deployment | http | [!!] broken | 403 in 578ms |
| `agency-site` | deployment | lead-form | [~~] degraded | unexpected 403 |
| `easy-deploy` | deployment | http | [!!] broken | 403 in 297ms |
| `equitymax-site` | deployment | http | [--] skipped | no url (not deployed) |
| `abc` | ghl | token | [--] skipped | env GHL_ABC_API_KEY not set |
| `abc` | ghl | contact-count | [--] skipped | env GHL_ABC_API_KEY not set |
| `equitymax` | ghl | token | [--] skipped | env GHL_EQM_API_KEY not set |
| `equitymax` | ghl | contact-count | [--] skipped | env GHL_EQM_API_KEY not set |
| `ghl-brain` | repo | github | [~~] degraded | status 403 |
| `agency-site-repo` | repo | github | [~~] degraded | status 403 |

## What to do with this

- **Broken:** open a GitHub issue (workflow does this) and Code Claude triages on next run.
- **Degraded:** investigate at next session unless customer-facing — then now.
- **Skipped:** add the missing env var as a GitHub Action secret to enable.
