# video-intel — Telegram bot capability

**Purpose:** when the user pastes a video URL (Instagram reel, TikTok, YouTube
Short, X post, FB reel, etc.), pull it apart and return a design/copy intel
brief. Closes the gap where Telegram-Claude says "I'm not wired for Instagram
video extraction right now."

## What it does

Given any video URL supported by `yt-dlp` (1500+ sites including IG / TikTok
/ YT / X / FB / Reddit):

1. Pulls metadata (title, caption, hashtags, view + like counts, uploader)
2. Downloads the video (mp4)
3. Extracts N evenly-spaced keyframes (default 8) as JPGs — these are what
   Claude reads with vision to analyze layout, color, on-screen text, hooks
4. Extracts the audio track to mp3
5. Transcribes (optional — needs `OPENAI_API_KEY` env var or local `whisper`)
6. Renders `intel.md` — structured brief ready to paste back to the user

## Requirements

- `yt-dlp` (Python) — `pip install yt-dlp`
- `ffmpeg` (system) — `apt-get install ffmpeg`
- Python 3.9+

Optional:
- `OPENAI_API_KEY` env var → enables Whisper transcription via OpenAI API
- Or local `whisper` binary → falls back to local model

## Run

```bash
python3 video_intel.py <url> [--frames N] [--out DIR]
```

Example:
```bash
python3 video_intel.py "https://www.instagram.com/reel/abc123/" --frames 10
```

Outputs to `output/<slug>/` containing:
- `video.mp4`
- `frames/frame_01.jpg` … `frame_NN.jpg`
- `audio.mp3`
- `transcript.txt`
- `metadata.json`
- `intel.md` ← this is what the bot replies with

## Env vars

| Var | Purpose |
|---|---|
| `OPENAI_API_KEY` | Enables Whisper transcription via OpenAI API |
| `YT_DLP_INSECURE=1` | Adds `--no-check-certificates` to yt-dlp (sandboxes / TLS-intercepting proxies). **Do NOT enable in production.** |

## Wiring into the Telegram bot

In whichever runtime the Telegram bot lives (Node, Python, n8n, etc.):

```python
import re, subprocess, json
from pathlib import Path

URL_RE = re.compile(r"https?://\S+")

def handle_message(text: str) -> str:
    urls = URL_RE.findall(text)
    if not urls:
        return ""  # not a video request
    url = urls[0]
    out_dir = subprocess.check_output(
        ["python3", "/path/to/video_intel.py", url],
        text=True
    ).strip()
    intel = (Path(out_dir) / "intel.md").read_text()
    # Optionally: feed frames to Claude vision for deeper analysis here
    return intel
```

For deeper analysis after extraction, send the frame JPGs to Claude
vision with a prompt like:
> Analyze these frames from an Instagram reel. Extract: hook, layout
> pattern, color palette, on-screen copy, CTA, transferable patterns.

## Failure modes

- **Instagram private/login-required reels** — yt-dlp may need cookies. Pass
  `--cookies cookies.txt` (export from a logged-in browser session).
- **Rate-limit / 429** — IG and TikTok aggressively rate-limit. Add a
  retry/backoff layer or rotate IPs at the bot level.
- **Geo-blocked content** — needs a VPN/proxy at the bot host level.

## Tested

- Synthetic 10s video: frames + audio + intel.md generation all pass
  (`python3 test_pipeline.py`).
- Live yt-dlp download path is network-dependent — verify in production
  environment with unrestricted egress.
