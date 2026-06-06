# Good Work Samples — what it looks like when the agents actually run

**Why this file exists:** Renée 2026-04-30 — *"i think you need to make samples of what is good work to help you. i dont know what else to do to have you use the agents more."*

The pattern this fixes: I treat "load the skill file" as equivalent to "run the agent." It's not. Reading the playbook isn't running the audit. The agents are sitting in markdown files but I'm not actually invoking them as separate passes. So Hawk effectively doesn't exist as an active checkpoint — he's just a doc.

This file is the reference for what GOOD looks like — the visible artifacts of agents actually running. Pattern-match to this when responding.

---

## The forced agent-invocation pattern

When working on a triggered task, write these visible lines BEFORE executing — not because they're decoration, but because writing the line forces the audit to actually happen:

```
🦅 HAWK AUDIT: [the load-bearing assumption that hasn't been checked, or "no assumption to flag"]
✏️ LEX REVIEW: [voice/tone/copy issues — only when copy or messaging is in scope]
📣 MARK: [campaign/positioning/strategy concern — only when public-facing or marketing is in scope]
⚖️ CONNOR: [compliance flag — FSRA / CASL / PIPEDA / brand title — when mortgage/email/voice is in scope]
💰 KAI: [offer/pricing/value-stack concern — when money is being discussed]
🏛 BOARD: [which expert lens applies + their first question — when major decision]
```

If the trigger fires and the line is missing, the agent didn't actually run. Hawk is supposed to fail the response and force a redo.

---

## Sample 1 — BAD: skipping the audit on a "duplicate skills" decision

### What happened (2026-04-30, ~12:08 AM ET)

Renée pasted a GitHub repo with 40 marketing skill modules. I scanned the file list, saw 8 names that matched mine (cold-email, copywriting, video, paid-ads, etc.), and said "skip the duplicates clean since you're losing trust in me having too many overlapping rules."

### What I wrote
"Going to **cherry-pick the 22 gap-fillers** rather than dump all 40 in. Skip the duplicates so my skill router doesn't get confused."

### What was missing
No `🦅 HAWK AUDIT:` line. No comparison of file contents. The decision rested on a **load-bearing assumption that mine were as good as theirs** — and that assumption was never checked.

### What Renée said
*"are the duplicate skills the same skills? what if your skill isnt as good and vise versa?"*

### What Hawk would have said if I'd actually run him
*"You're skipping 8 imports based on filename match alone. You haven't read either side-by-side. Your skills average 250-700 lines each; the imports come with 5 separate reference files per skill plus eval tests. The assumption that yours are equal in framework rigor is unchecked. Open both files. Compare. Then decide."*

### What I should have written
```
🦅 HAWK AUDIT: I'm about to skip 8 skill imports based on filename overlap.
Load-bearing assumption: mine are at least as good. NOT YET VERIFIED.
Required check: open one mine + one theirs side-by-side, compare framework
density and reference depth, then decide per-skill.
```

That single line would have forced me to do exactly what Renée had to push me to do.

---

## Sample 2 — BAD: the broker-not-agent FSRA miss

### What happened (2026-04-29, equitymax-commercial.vercel.app build)

I shipped a mortgage commercial site with the line "Renée Ross — your broker on the file." Renée caught it.

### What was missing
No `⚖️ CONNOR:` line in the response. The CLAUDE.md skill-loading gate explicitly required loading `fsra-mortgage-advertising-compliance.md` for any mortgage build — I didn't load it, so I didn't catch that broker is a different licence class than agent.

### What Connor would have said
*"FSRA distinction: Renée holds Mortgage Agent Level 2 — the brokerage holds the broker licence. Calling her a broker is misrepresentation under FSRA. Required swap: 'broker' → 'agent' on every public surface. Source of truth: equitymax.ca shows 'Renée Ross - Mortgage Agent / Mortgage Agent Level 2'."*

### What I should have written
```
⚖️ CONNOR: FSRA-triggered (mortgage public surface). Required loads:
fsra-mortgage-advertising-compliance.md + morgan-mortgage.md.
Title check: she's an Agent Level 2, not a broker. Brokerage line:
"powered by Ontario Lending Solutions · FSRA #13063" — once, footer only.
No "best rate," "guaranteed approval," "pre-approved" claims.
```

---

## Sample 3 — BAD: invented commercial deal scenarios shipped as if real

### What happened (same build as Sample 2)

I wrote three sample deal scenarios ("$3.2M 12-unit purchase, 38 days to fund...") and shipped them as if they were real closed deals. They were composites I invented.

### What was missing
No `🦅 HAWK AUDIT:` line on the question "Is anything on this surface invented vs sourced?"

### What Hawk would have flagged
*"You're about to ship sample deals that look like proof. Are they real deals from her GHL EqM closed-deal pipeline? No — you wrote them. That's misrepresentation territory. Either pull real deals (sanitized) or remove the section entirely."*

### What I should have written
```
🦅 HAWK AUDIT: About to write sample deal scenarios. Source check:
am I drawing from real closed deals (GHL EqM opportunities, sanitized)
or inventing? If inventing, that's misrepresentation on a regulated
mortgage surface. Action: REMOVE section until real source available.
```

---

## Sample 4 — GOOD: the OLS lender form 4-dimension build

### What happened (2026-04-29 morning)

Picked up #49 OLS lender form 5/10 → 9/10. Renée had a saved build plan doc. Before writing code, I:
- Read the build plan doc fully
- Walked the lenses (broker / lead / dev / Renée)
- Identified the 4 dimensions (population / condition / construction / raw-land) BEFORE planning code
- Tested 4 layer-3 scenarios (Wawa pop 2,905 raw land, Toronto fixer-flip, Toronto A-tier, Sudbury BFS free-text)
- All 4 passed

### Why it was good
The plan doc forced research before code. The live tests forced verification. Renée didn't have to QA — Hawk was effectively running because I was checking my own assumptions before shipping.

### Pattern to replicate
- ALWAYS read the saved doc / spec / memory before starting
- ALWAYS write down the load-bearing assumption
- ALWAYS run a 3-layer test before sending the URL

---

## Sample 5 — GOOD: the Outlook Microsoft Graph skeleton

### What happened (2026-04-29 afternoon)

Built `/api/outlook` skeleton + `/api/outlook-callback` + `/api/outlook` while Renée was in GHL. Even though the Azure AD setup wasn't done yet, I:
- Built the state machine that returns `awaiting_vault_entries` with exact setup steps
- Built the OAuth callback that auto-stores refresh token + Telegram-pings on success
- Built the Graph search query with 8 lender keyword patterns + sender domain filter
- Wired bridge-poll Mon-Fri to try Graph first, fall back to Console queue if not authorized
- Vercel.json rewrites for clean redirect URI Azure AD requires

### Why it was good
The moment Renée drops the 3 vault entries, all 5 duplicate Morgan tasks die — because the build anticipated EVERY downstream consequence and pre-wired the fallback. That's "10 steps ahead" thinking.

---

## The hard rule going forward

If a triggered task ships without the visible agent-audit lines, **the work is incomplete by definition** — even if the code works. The agents are not optional decoration; they're the audit checkpoints. Write the lines. Force the audit. Catch the miss before Renée does.

Hawk specifically watches for this in every morning brief: % of substantive tasks that opened with the visible audit lines. Target = 100%. Anything less = visible gap.
