# 001 — Add GHL API keys as GitHub Action secrets

**Created:** 2026-04-30 by Code Claude
**Surface:** Console (browser)
**Estimated time:** 3 min
**Priority:** unblocks `business-watch` GHL token + contact-count checks

## Why
The hourly business watcher (`business-watch/sweep.py`) is live and watching every site/repo, but the GHL API checks for ABC + EquityMax show as `[--] skipped` because the GitHub Actions runner doesn't have the API keys. Once these secrets are added, the watcher confirms every hour that:
- The GHL tokens are still valid (no surprise auth failures)
- Contacts are still landing in both locations (no broken pipeline)

## Steps

### A. Find the API keys

Try Vercel first — the ABC key was already stored there per `sprint/master-build-status.md` (line 165):

1. Go to https://vercel.com/dashboard
2. Open the **agency-site** project → **Settings** → **Environment Variables**
3. Find `GHL_ABC_API_KEY`. Click the eye icon to reveal. Copy the value.
4. If not there, open the GHL ABC location (https://app.gohighlevel.com — switch to ABC sub-account) → **Settings** → **Business Profile** → scroll to **API Key**. Copy.

For EquityMax:
1. In GHL, switch to the EquityMax sub-account (location id `OBmMdqdnPLZvVyHloFly`)
2. **Settings** → **Business Profile** → **API Key**. Copy.

### B. Add them to GitHub

1. Go to https://github.com/poweragentsystem-ai/ghl-brain/settings/secrets/actions
2. Click **New repository secret**
3. Name: `GHL_ABC_API_KEY` — Secret: paste the ABC key — **Add secret**
4. Click **New repository secret** again
5. Name: `GHL_EQM_API_KEY` — Secret: paste the EquityMax key — **Add secret**

### C. Verify the watcher picks them up

1. Go to https://github.com/poweragentsystem-ai/ghl-brain/actions
2. Open the **Business Watch** workflow
3. Click **Run workflow** → **Run workflow** (manually trigger to test now instead of waiting for the hourly cron)
4. Wait for it to complete (~30 sec)
5. Open `business-watch/findings.md` in the repo. The GHL rows should now show `[OK] ok — token valid` and `[OK] ok — contacts: <number>` instead of `[--] skipped`.

## Expected outcome

- Two secrets added to ghl-brain repo: `GHL_ABC_API_KEY`, `GHL_EQM_API_KEY`
- `business-watch/findings.md` shows GHL checks as OK (or BROKEN if a key is wrong — in which case rotate)
- Mark this task DONE by moving it to `console-queue/done/` and append a result block.

## Inputs needed from Renée

**None.** Console is already logged into Vercel + GHL + GitHub on Renée's laptop. Do NOT ask her for the keys — pull them yourself:
- ABC key: in Vercel under agency-site env vars, OR copyable from GHL ABC sub-account → Settings → Business Profile → API Key
- EQM key: copyable from GHL EquityMax sub-account → Settings → Business Profile → API Key

If you genuinely cannot find a key after checking both Vercel and GHL settings (e.g. the location is locked, or the API Key field is blank), THEN write the blocker into this file and leave it in `pending/`. Don't interrupt Renée with a "where is it?" message.

## When done

1. Move this file to `console-queue/done/001-add-github-action-secrets.md`
2. Append at the bottom:
   ```
   ## Result (YYYY-MM-DD HH:MM)
   - ABC key source: Vercel | GHL settings | Renée pasted
   - EQM key source: Vercel | GHL settings | Renée pasted
   - Workflow run: <link to the Actions run>
   - findings.md status: OK / BROKEN (paste the GHL rows)
   ```
3. Update `sprint/open-requests.md` — mark the BLOCKED row about GHL secrets as DONE.
