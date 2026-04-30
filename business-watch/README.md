# Business Watch

**The office overseer.** Runs every hour. Knows about every asset under the business — deployments, repos, GHL locations, Claude surfaces — and surfaces broken or degraded things *before* Renée notices.

## What it watches

Defined in `inventory.yml`:

- **Deployments** — Vercel sites (Command Center, Agency, Easy-Deploy, EquityMax). HTTP status + lead-form endpoint smoke tests.
- **Repos** — every GitHub repo we own. Reachable, last push date, default branch.
- **GHL locations** — ABC + EquityMax. API token still valid, contact count not stuck.
- **AI agents** — count by location/folder, status (logged for inventory; checks pluggable).
- **Claude surfaces** — Code/Console/Mobile/Telegram. What each can/can't do.

## How it runs

`.github/workflows/business-watch.yml` runs `sweep.py` every hour on a GitHub Actions runner (full network, no sandbox restrictions). It:

1. Reads `inventory.yml`
2. Runs every check
3. Writes `findings.md` (human) + `findings.json` (machine)
4. Commits the findings back to the repo so any Claude can read them
5. **Opens a GitHub issue tagged `business-watch` for every BROKEN asset** — Code Claude triages on next session by reading those issues.

## Required secrets

Set these in **Settings → Secrets and variables → Actions** for full coverage:

| Secret | Enables |
|---|---|
| `GHL_ABC_API_KEY` | ABC location token + contact-count checks |
| `GHL_EQM_API_KEY` | EquityMax location token + contact-count checks |

Without these, GHL checks show as `[--] skipped` — not a failure, just unverified.

## Running locally

```bash
python3 business-watch/sweep.py
```

In a sandboxed env with TLS interception, set `WATCH_INSECURE=1`. **Don't** set this in CI.

## Adding a new asset

When something new ships, append to `inventory.yml`. Example:

```yaml
deployments:
  - id: my-new-thing
    name: My New Thing
    url: https://my-new-thing.vercel.app
    expected_status: 200
    owner: code
    notes: "What it does."
    checks: [http]
```

The next sweep picks it up.

## Adding a new check type

Edit `sweep.py`:
1. Write a `def my_check(...)` returning `{"ok": bool, "severity": "ok|degraded|broken|skipped", "detail": str}`.
2. Wire it into the dispatcher in `run()` with a new `check` keyword.
3. Reference it from `inventory.yml` in the asset's `checks: [...]` list.

## Severity meanings

| Level | When | Action |
|---|---|---|
| `ok` | Check passed | Nothing |
| `degraded` | Soft fail (TLS, rate-limit, unexpected status) | Investigate next session |
| `broken` | Hard fail (timeout, 5xx, auth rejected) | Issue auto-opened; ship a fix |
| `skipped` | Missing config (env var, no URL) | Add the missing config |

## Why this exists

So Renée doesn't have to be the monitoring system. Filed under: "she should never have to ask twice."
