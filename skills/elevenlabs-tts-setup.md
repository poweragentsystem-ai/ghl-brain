# ElevenLabs TTS — Setup + Usage Skill

**Purpose:** Add natural-sounding voice to anywhere we need TTS in Xpert (Command Center orb, voice AI agents, voice samples, demos).

**Status:** Wired into Command Center orb 2026-04-25. Pay-per-use API key in vault. Renée approved $5/mo Starter plan upgrade — pending account upgrade.

---

## Account + Key

- **Account:** poweragentsystem@gmail.com
- **API Key:** `sk_cb344c804b615ed7104a232bb8cb276eeb2e0e7800223427` (saved in `reference_ghl_api_keys.md`)
- **Mode:** pay-per-use (current). Upgrade to **Starter $5/mo** when first client onboards (30K char/month included).
- **Console:** elevenlabs.io/app/sign-in

---

## Where it's wired

| Location | What it does |
|---|---|
| `xpert-command-center/api/morning-brief.js` (chat handler) | Takes Jordan's text reply → returns `audio_base64` field with MP3 audio when `?voice=eleven` is set |
| `xpert-command-center/src/command-center-v85.jsx` (orb) | Receives `audio_base64` → plays via `Audio` element. Falls back to Web Speech API if audio fails. |

Vercel env: `ELEVENLABS_API_KEY` (added 2026-04-25 to xpert-command-center production).

---

## API quick reference

**Endpoint:** `POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}`

**Headers:**
```
xi-api-key: <key>
Content-Type: application/json
Accept: audio/mpeg
```

**Body:**
```json
{
  "text": "What you want spoken",
  "model_id": "eleven_turbo_v2_5",
  "voice_settings": {
    "stability": 0.5,
    "similarity_boost": 0.75,
    "style": 0.3
  }
}
```

**Response:** Binary `audio/mpeg` stream. We base64-encode it server-side and ship as JSON.

---

## Models — pick by use case

| Model | Latency | Quality | Cost (per 1K chars) | Use for |
|---|---|---|---|---|
| `eleven_turbo_v2_5` | ~400ms | Good | 0.5 credits | Real-time orb chat, demos |
| `eleven_multilingual_v2` | ~1.5s | Best | 1 credit | Recorded voice content (samples, social) |
| `eleven_english_v1` | ~600ms | Good | 0.5 credits | English-only fallback |

Right now we use `eleven_turbo_v2_5` for the orb (low latency matters more than perfect quality).

---

## Voice IDs we use

| Voice | ID | When |
|---|---|---|
| Bella (default — friendly female) | `EXAVITQu4vr4xnSDxMaL` | Command Center orb (Jordan COO voice) |
| Rachel (calm professional female) | `21m00Tcm4TlvDq8ikWAM` | Mortgage AI voice agents |
| Domi (confident female) | `AZnzlk1XvdvUeBnXmlld` | Sales scripts |

**To browse + test more voices:** elevenlabs.io/app/voice-library

**To clone Renée's voice** (when she approves): elevenlabs.io/app/voice-lab → Instant Voice Clone → upload 1-3 min of clean audio. Then use the cloned voice ID in Command Center for Jordan to "sound like" her if she wants.

---

## Cost monitoring

ElevenLabs gives a `subscription` endpoint that returns char usage:

```
GET https://api.elevenlabs.io/v1/user/subscription
Header: xi-api-key
```

Returns `{ character_count, character_limit, ... }`. Add this to Amy's cost brief in the morning brief once we want to track ElevenLabs spend per day.

---

## Failure handling

The orb falls back to Web Speech API if:
- ElevenLabs returns non-200 (rate limit, key invalid, char limit hit)
- Audio fails to play in browser (CORS, codec issue)
- Network failure on the audio fetch

The fallback is INVISIBLE to the user — they still hear a voice (just the robot one).

---

## Renée's preferences

- Female voice
- Natural, conversational tone (not robotic)
- Should sound like a real assistant, not a phone tree
- Renée approved upgrade to $5/mo Starter when first AI Consulting client onboards
- 2026-04-25: $5/mo plan approved for orb upgrade test phase

---

## Files

- API endpoint: `xpert-command-center/api/morning-brief.js` (chat handler with `?voice=eleven`)
- Orb client: `xpert-command-center/src/command-center-v85.jsx` (`speak()` + `jordanRespondAsync()`)
- This skill file: `claude-skills/elevenlabs-tts-setup.md`
- Vault: `reference_ghl_api_keys.md` has the key (memory)
