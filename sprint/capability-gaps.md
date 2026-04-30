# CAPABILITY GAPS — what each Claude surface CAN'T do

**Every Claude reads this at session start so we stop saying "I'll have to check my tools" mid-conversation with Renée.**
**When a Claude hits a gap, it writes it here. When a gap is closed, it gets marked CLOSED with the date + how.**

---

## Surfaces in the stack

| Surface | Where it runs | Has code access | Has GHL API access | Has filesystem access |
|---|---|---|---|---|
| **Code Claude** | Sandboxed Linux, syncs to `ghl-brain` repo | Yes (this repo only — not user's local machine) | Via env vars / API keys in repo | Yes (sandbox only) |
| **Console Claude** | Browser, on Renée's laptop | No code, just browser DOM | Yes via logged-in GHL session | No |
| **Mobile Claude** | Anthropic Claude iOS/Android app | No | Only what Renée pastes | No |
| **Telegram Claude** | Anthropic Claude in Telegram | No | Only what Renée pastes | No |

---

## Known gaps

### Telegram Claude
- **Cannot extract Instagram / TikTok / YouTube / X video content directly.** Anthropic-hosted Claude in Telegram has no `yt-dlp` equivalent.
  - Workaround built 2026-04-30: `tools/video-intel/` in this repo — yt-dlp pipeline produces frames + transcript + intel.md.
  - Next step: stand up that pipeline as an HTTP service so Telegram Claude can WebFetch results. Until then, Code Claude has to run it manually.
- **Cannot access this repo directly.** Renée must paste content or ask Code Claude to read on her behalf.
- **No persistent memory between conversations.** Every Telegram conversation starts blank.

### Mobile Claude
- Same as Telegram Claude: no code access, no filesystem, no persistent memory.
- Can WebFetch but most app/site auth walls block it.

### Console Claude
- Cannot run scripts on Renée's machine outside the browser.
- Cannot persist anything to this repo without Renée pasting it back to Code Claude.

### Code Claude (this surface)
- **Cannot reach Renée's local machine** (`C:/Users/User/equitymax-website/`, Easy-Deploy source, Command Center source). Only sees `ghl-brain` repo.
- **Sandbox network restrictions** can block outbound calls (e.g. yt-dlp downloads in this specific sandbox).
- **No memory between sessions.** Reads `master-build-status.md` + `open-requests.md` + this file at start, but won't remember a chat from yesterday unless it was written down.

---

## Cross-surface communication gap (the meta-issue)

**Today:** Renée tells Mobile-Claude something, Mobile-Claude doesn't write it down, next day Code-Claude has no idea, Renée repeats herself.

**Fix in progress:**
1. `sprint/open-requests.md` — every ask written here at the moment Renée raises it (any Claude that hears it).
2. `sprint/capability-gaps.md` (this file) — known limits per surface.
3. `CLAUDE.md` instruction enforcing "read these first" on session start.
4. **Pending:** Telegram & Mobile Claudes need to be told to write back to this repo when Renée asks something. Today they can't (no GitHub access from Anthropic apps). Workaround: Renée can copy/paste asks into Code Claude, or we ship a tiny "log this ask" web form Mobile/Telegram can hit.

---

## CLOSED (kept 30 days for reference)

- (none yet)
