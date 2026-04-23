# Cross-Claude Inbox — How the 3 Claudes Talk to Each Other

Renée works across three Claude surfaces: **Claude Code** (this one, files + APIs), **Claude Console** (browser, works inside GHL), **Claude app** (mobile/desktop chat). They don't share memory. They stay in sync through two mechanisms:

1. **`XpertVault/sprint/master-build-status.md`** — the shared log. Every Claude writes one-liners here after meaningful work. This is pulled into the `ghl-brain` public GitHub repo so Console and app Claude can read it from their Projects.

2. **Intel Drop** at `xpert-command-center.vercel.app/intel.html` — the shared inbox. Console and app Claude drop notes here whenever they learn something Claude Code needs to know (a rename, a decision, a bug spotted, a question that came up).

---

## The CLAUDE-NOTE protocol

If you are **Claude Console** or **Claude app** and you discover something Renée's Claude Code needs to pick up, drop a note at:

**https://xpert-command-center.vercel.app/intel.html**

- Start the note with `CLAUDE-NOTE:` so it gets flagged visually
- Keep it to one or two sentences
- Include any IDs, names, or specifics Claude Code will need
- Include timestamp + which Claude surface ("from Console" / "from app")

### Example drops

```
CLAUDE-NOTE (from Console): Renamed ABC workflow c7584001 to "Master Voice AI Shut Off" + published. "Master Voice AI Turn On" also renamed + published. Still need to build the 6 SMS/Email/All-Outreach pairs.

CLAUDE-NOTE (from Console): Renée added a new niche to Easy Deploy Orb — "Home Renovators (kitchen/bath specialists)". Needs a branch in ORB-SYSTEM-PROMPT.md.

CLAUDE-NOTE (from app): Renée said during call with Aaron — rebrand decision is locked on "ARA AI" (not PowerBolt). Act on it.
```

---

## How Claude Code picks them up

Claude Code reads Intel Drop at:

1. Session start (part of the daily-briefing skill)
2. Any time Renée says "check inbox" or "anything from Console?"
3. After any major pivot that might have been discussed elsewhere

Notes prefixed with `CLAUDE-NOTE:` get a purple border in the Intel Drop UI so Renée can see at a glance how many are waiting.

---

## Rules of the inbox

- **Console + app Claudes drop, Claude Code consumes.** One-directional. Claude Code doesn't drop back — it writes to `master-build-status.md` instead, which Console + app read via ghl-brain.
- **Renée is the default audience.** The inbox is for her eyes too — she can look at intel.html anytime.
- **No sensitive data.** API keys, tokens, client PII never go in Intel Drop. If one of those needs to cross Claudes, drop a pointer ("check `credentials/ghl-keys.md` for new EqM key") not the value itself.
- **Mark as processed.** Once Claude Code has acted on a CLAUDE-NOTE, she can archive it from Intel Drop or it stays there as a trail. No "read receipt" needed.
