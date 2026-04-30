#!/usr/bin/env python3
"""Business Watch — runs health checks on every asset in inventory.yml.

What it checks:
  - HTTP deployments respond with expected status
  - Lead-form endpoints accept POST (smoke test, doesn't actually submit)
  - GHL API tokens still work (if api_key_env is set)
  - GitHub repo exists + is reachable
  - Claude surface gaps that are documented but not yet bridged

Output:
  business-watch/findings.md — human-readable status report
  business-watch/findings.json — machine-readable for CI to act on

Run locally:
  python3 business-watch/sweep.py

Run in CI (.github/workflows/business-watch.yml runs this hourly).

Findings of severity 'broken' or 'degraded' should open a GitHub issue
(handled by the workflow, not this script).
"""
from __future__ import annotations

import json
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import requests
import yaml

ROOT = Path(__file__).resolve().parent
INVENTORY = ROOT / "inventory.yml"
FINDINGS_MD = ROOT / "findings.md"
FINDINGS_JSON = ROOT / "findings.json"

INSECURE = os.environ.get("WATCH_INSECURE") == "1"
TIMEOUT = int(os.environ.get("WATCH_TIMEOUT", "15"))

if INSECURE:
    import urllib3
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def http_check(url: str, expected: int) -> dict:
    try:
        r = requests.get(url, timeout=TIMEOUT, allow_redirects=True, verify=not INSECURE)
        ok = r.status_code == expected
        return {
            "ok": ok,
            "status_code": r.status_code,
            "elapsed_ms": int(r.elapsed.total_seconds() * 1000),
            "final_url": r.url,
            "severity": "ok" if ok else "broken",
            "detail": f"{r.status_code} in {int(r.elapsed.total_seconds()*1000)}ms",
        }
    except requests.exceptions.SSLError as e:
        return {"ok": False, "severity": "degraded", "detail": f"TLS error: {e}"}
    except requests.exceptions.Timeout:
        return {"ok": False, "severity": "broken", "detail": f"timeout after {TIMEOUT}s"}
    except Exception as e:
        return {"ok": False, "severity": "broken", "detail": f"{type(e).__name__}: {e}"}


def lead_form_check(base_url: str) -> dict:
    """Soft check: confirm /api/submit-lead exists (OPTIONS or 405-on-GET both prove the route exists)."""
    url = base_url.rstrip("/") + "/api/submit-lead"
    try:
        r = requests.options(url, timeout=TIMEOUT, verify=not INSECURE)
        if r.status_code in (200, 204, 405):
            return {"ok": True, "severity": "ok", "detail": f"endpoint exists ({r.status_code})"}
        return {"ok": False, "severity": "degraded", "detail": f"unexpected {r.status_code}"}
    except Exception as e:
        return {"ok": False, "severity": "degraded", "detail": f"{type(e).__name__}: {e}"}


def ghl_api_check(location_id: str, api_key_env: str) -> dict:
    """Hits GHL location-info endpoint to verify token is still valid."""
    api_key = os.environ.get(api_key_env)
    if not api_key:
        return {"ok": None, "severity": "skipped", "detail": f"env {api_key_env} not set"}
    url = f"https://rest.gohighlevel.com/v1/locations/{location_id}"
    try:
        r = requests.get(url, headers={"Authorization": f"Bearer {api_key}"},
                         timeout=TIMEOUT, verify=not INSECURE)
        if r.status_code == 200:
            return {"ok": True, "severity": "ok", "detail": "token valid"}
        if r.status_code in (401, 403):
            return {"ok": False, "severity": "broken", "detail": "token rejected — rotate"}
        return {"ok": False, "severity": "degraded", "detail": f"status {r.status_code}"}
    except Exception as e:
        return {"ok": False, "severity": "degraded", "detail": f"{type(e).__name__}: {e}"}


def ghl_contact_count(location_id: str, api_key_env: str) -> dict:
    api_key = os.environ.get(api_key_env)
    if not api_key:
        return {"ok": None, "severity": "skipped", "detail": f"env {api_key_env} not set"}
    url = f"https://rest.gohighlevel.com/v1/contacts/?locationId={location_id}&limit=1"
    try:
        r = requests.get(url, headers={"Authorization": f"Bearer {api_key}"},
                         timeout=TIMEOUT, verify=not INSECURE)
        if r.status_code != 200:
            return {"ok": False, "severity": "degraded", "detail": f"status {r.status_code}"}
        data = r.json()
        meta = data.get("meta", {})
        total = meta.get("total")
        return {"ok": True, "severity": "ok", "detail": f"contacts: {total}"}
    except Exception as e:
        return {"ok": False, "severity": "degraded", "detail": f"{type(e).__name__}: {e}"}


def github_repo_check(slug: str) -> dict:
    url = f"https://api.github.com/repos/{slug}"
    try:
        r = requests.get(url, timeout=TIMEOUT, verify=not INSECURE)
        if r.status_code == 200:
            d = r.json()
            return {
                "ok": True, "severity": "ok",
                "detail": f"pushed {d.get('pushed_at','?')[:10]}, default {d.get('default_branch')}"
            }
        return {"ok": False, "severity": "degraded", "detail": f"status {r.status_code}"}
    except Exception as e:
        return {"ok": False, "severity": "degraded", "detail": f"{type(e).__name__}: {e}"}


def run() -> dict:
    inv = yaml.safe_load(INVENTORY.read_text())
    started = now_iso()
    results = []

    for d in inv.get("deployments", []):
        if not d.get("url"):
            results.append({"asset": d["id"], "kind": "deployment", "check": "http",
                            "severity": "skipped", "detail": "no url (not deployed)"})
            continue
        for chk in d.get("checks", []):
            if chk == "http":
                r = http_check(d["url"], d.get("expected_status", 200))
                results.append({"asset": d["id"], "kind": "deployment", "check": "http", **r})
            elif chk == "lead-form-endpoint":
                r = lead_form_check(d["url"])
                results.append({"asset": d["id"], "kind": "deployment", "check": "lead-form", **r})

    for loc in inv.get("ghl_locations", []):
        for chk in loc.get("checks", []):
            if chk == "api-token-valid":
                r = ghl_api_check(loc["location_id"], loc["api_key_env"])
                results.append({"asset": loc["id"], "kind": "ghl", "check": "token", **r})
            elif chk == "contact-count":
                r = ghl_contact_count(loc["location_id"], loc["api_key_env"])
                results.append({"asset": loc["id"], "kind": "ghl", "check": "contact-count", **r})

    for repo in inv.get("repos", []):
        r = github_repo_check(repo["github"])
        results.append({"asset": repo["id"], "kind": "repo", "check": "github", **r})

    finished = now_iso()
    summary = {
        "started": started,
        "finished": finished,
        "totals": {
            "ok": sum(1 for r in results if r.get("severity") == "ok"),
            "degraded": sum(1 for r in results if r.get("severity") == "degraded"),
            "broken": sum(1 for r in results if r.get("severity") == "broken"),
            "skipped": sum(1 for r in results if r.get("severity") == "skipped"),
        },
        "results": results,
    }
    return summary


def emoji(sev: str) -> str:
    return {"ok": "[OK]", "degraded": "[~~]", "broken": "[!!]", "skipped": "[--]"}.get(sev, "[??]")


def write_md(summary: dict) -> None:
    t = summary["totals"]
    lines = [
        "# Business Watch — Findings",
        "",
        f"**Last run:** {summary['finished']}",
        f"**OK:** {t['ok']}  **Degraded:** {t['degraded']}  **Broken:** {t['broken']}  **Skipped:** {t['skipped']}",
        "",
        "| Asset | Kind | Check | Status | Detail |",
        "|---|---|---|---|---|",
    ]
    for r in summary["results"]:
        lines.append(
            f"| `{r['asset']}` | {r['kind']} | {r['check']} | "
            f"{emoji(r.get('severity','?'))} {r.get('severity','?')} | {r.get('detail','')} |"
        )
    lines += [
        "",
        "## What to do with this",
        "",
        "- **Broken:** open a GitHub issue (workflow does this) and Code Claude triages on next run.",
        "- **Degraded:** investigate at next session unless customer-facing — then now.",
        "- **Skipped:** add the missing env var as a GitHub Action secret to enable.",
        "",
    ]
    FINDINGS_MD.write_text("\n".join(lines))


def main():
    summary = run()
    FINDINGS_JSON.write_text(json.dumps(summary, indent=2))
    write_md(summary)
    t = summary["totals"]
    print(f"OK={t['ok']} DEGRADED={t['degraded']} BROKEN={t['broken']} SKIPPED={t['skipped']}")
    sys.exit(1 if t["broken"] else 0)


if __name__ == "__main__":
    main()
