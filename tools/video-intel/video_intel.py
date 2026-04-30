#!/usr/bin/env python3
"""
video-intel: pull a video URL apart for design/copy intelligence.

Usage:
  python3 video_intel.py <url> [--frames N] [--out DIR]

Handles: Instagram reels, TikTok, YouTube (incl. Shorts), Twitter/X, Facebook,
and any other site yt-dlp supports.

Output:
  output/<slug>/
    video.mp4           — original
    frames/             — N evenly-spaced keyframes (default 8)
    transcript.txt      — Whisper transcript if ANTHROPIC_API_KEY is set,
                          else empty (audio.mp3 left for downstream transcription)
    audio.mp3           — extracted audio
    metadata.json       — title, uploader, duration, view count, description, hashtags
    intel.md            — structured brief: copy + layout + visual cues +
                          frame manifest (paths Claude can read with vision)

Wire this into the Telegram bot by:
  1. Detecting URLs in incoming messages
  2. Spawning: python3 video_intel.py <url>
  3. Reading output/<slug>/intel.md and replying with it
  4. Optionally feeding frames to Claude vision for deeper analysis
"""
import argparse
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path


def slugify(s: str, max_len: int = 60) -> str:
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    return s[:max_len] or "video"


def run(cmd: list, check: bool = True, capture: bool = False) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, check=check, capture_output=capture, text=True)


YT_FLAGS = (["--no-check-certificates"] if os.environ.get("YT_DLP_INSECURE") == "1" else [])


def fetch_metadata(url: str) -> dict:
    result = run(["yt-dlp", *YT_FLAGS, "-J", "--no-warnings", url], capture=True)
    return json.loads(result.stdout)


def download_video(url: str, out_dir: Path) -> Path:
    template = str(out_dir / "video.%(ext)s")
    run([
        "yt-dlp",
        *YT_FLAGS,
        "-f", "best[ext=mp4]/best",
        "--no-warnings",
        "-o", template,
        url,
    ])
    for f in out_dir.iterdir():
        if f.stem == "video" and f.suffix in {".mp4", ".webm", ".mkv", ".mov"}:
            if f.suffix != ".mp4":
                mp4 = out_dir / "video.mp4"
                run(["ffmpeg", "-y", "-i", str(f), "-c", "copy", str(mp4)], check=False)
                if mp4.exists():
                    f.unlink()
                    return mp4
            return f
    raise RuntimeError("video download failed")


def extract_frames(video: Path, frames_dir: Path, n: int, duration: float) -> list:
    frames_dir.mkdir(exist_ok=True)
    if duration <= 0:
        duration = 1
    step = max(duration / (n + 1), 0.5)
    paths = []
    for i in range(n):
        t = step * (i + 1)
        out = frames_dir / f"frame_{i+1:02d}.jpg"
        run([
            "ffmpeg", "-y", "-ss", f"{t:.2f}", "-i", str(video),
            "-frames:v", "1", "-q:v", "2", str(out),
        ], check=False, capture=True)
        if out.exists():
            paths.append(out)
    return paths


def extract_audio(video: Path, audio: Path) -> bool:
    res = run([
        "ffmpeg", "-y", "-i", str(video),
        "-vn", "-acodec", "libmp3lame", "-q:a", "4", str(audio),
    ], check=False, capture=True)
    return audio.exists()


def transcribe(audio: Path) -> str:
    """Optional: transcribe via OpenAI Whisper API if OPENAI_API_KEY is set,
    or via local whisper if installed. Returns empty string otherwise."""
    api_key = os.environ.get("OPENAI_API_KEY")
    if api_key:
        try:
            import urllib.request
            import urllib.error
            boundary = "----videointel" + os.urandom(8).hex()
            with open(audio, "rb") as f:
                audio_bytes = f.read()
            body = (
                f"--{boundary}\r\n"
                f'Content-Disposition: form-data; name="model"\r\n\r\n'
                f"whisper-1\r\n"
                f"--{boundary}\r\n"
                f'Content-Disposition: form-data; name="file"; filename="audio.mp3"\r\n'
                f"Content-Type: audio/mpeg\r\n\r\n"
            ).encode() + audio_bytes + f"\r\n--{boundary}--\r\n".encode()
            req = urllib.request.Request(
                "https://api.openai.com/v1/audio/transcriptions",
                data=body,
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": f"multipart/form-data; boundary={boundary}",
                },
            )
            with urllib.request.urlopen(req, timeout=120) as resp:
                return json.loads(resp.read()).get("text", "")
        except Exception as e:
            print(f"[transcribe] OpenAI Whisper failed: {e}", file=sys.stderr)
    if shutil.which("whisper"):
        out_dir = audio.parent
        run(["whisper", str(audio), "--model", "base", "--output_dir", str(out_dir),
             "--output_format", "txt"], check=False, capture=True)
        txt = out_dir / (audio.stem + ".txt")
        if txt.exists():
            return txt.read_text()
    return ""


def build_intel(meta: dict, frames: list, transcript: str, out_md: Path) -> None:
    title = meta.get("title") or meta.get("description", "")[:80] or "Untitled"
    uploader = meta.get("uploader") or meta.get("channel") or "unknown"
    duration = meta.get("duration") or 0
    views = meta.get("view_count")
    likes = meta.get("like_count")
    description = (meta.get("description") or "").strip()
    hashtags = re.findall(r"#\w+", description)

    lines = [
        f"# Video Intel: {title}",
        "",
        f"**Source:** {meta.get('webpage_url', meta.get('original_url',''))}",
        f"**Platform:** {meta.get('extractor_key', 'unknown')}",
        f"**Uploader:** {uploader}",
        f"**Duration:** {duration}s",
    ]
    if views is not None:
        lines.append(f"**Views:** {views:,}")
    if likes is not None:
        lines.append(f"**Likes:** {likes:,}")
    lines += ["", "## Caption / Copy", "", description or "_(none)_", ""]
    if hashtags:
        lines += ["## Hashtags", "", " ".join(hashtags), ""]
    lines += ["## Frames extracted", ""]
    for f in frames:
        lines.append(f"- `{f.relative_to(out_md.parent)}`")
    lines += ["", "## Transcript", "", transcript.strip() or "_(no transcript — add OPENAI_API_KEY or install whisper to enable)_", ""]
    lines += [
        "## Next step (for Claude)",
        "",
        "Read the frames above with vision. Extract:",
        "1. **Hook** — first 1.5s text/visual.",
        "2. **Layout pattern** — composition, where text sits, visual hierarchy.",
        "3. **Color palette** — dominant colors per frame.",
        "4. **Copy structure** — caption arc (problem → promise → CTA?).",
        "5. **CTA** — what action does it push (link in bio, comment, save)?",
        "6. **Reusable elements** — which patterns transfer to the brand we're building.",
        "",
    ]
    out_md.write_text("\n".join(lines))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("url")
    ap.add_argument("--frames", type=int, default=8)
    ap.add_argument("--out", default=str(Path(__file__).parent / "output"))
    args = ap.parse_args()

    print(f"[1/5] fetching metadata from {args.url}", file=sys.stderr)
    meta = fetch_metadata(args.url)
    title_for_slug = meta.get("title") or meta.get("id") or "video"
    slug = slugify(f"{meta.get('extractor_key','')}-{title_for_slug}")
    out_dir = Path(args.out) / slug
    out_dir.mkdir(parents=True, exist_ok=True)

    print(f"[2/5] downloading video → {out_dir}", file=sys.stderr)
    video = download_video(args.url, out_dir)

    print(f"[3/5] extracting {args.frames} frames", file=sys.stderr)
    frames = extract_frames(video, out_dir / "frames", args.frames, meta.get("duration") or 0)

    print(f"[4/5] extracting audio + transcribing", file=sys.stderr)
    audio = out_dir / "audio.mp3"
    extract_audio(video, audio)
    transcript = transcribe(audio)
    (out_dir / "transcript.txt").write_text(transcript)

    print(f"[5/5] writing intel.md", file=sys.stderr)
    (out_dir / "metadata.json").write_text(json.dumps({
        "title": meta.get("title"),
        "uploader": meta.get("uploader"),
        "duration": meta.get("duration"),
        "view_count": meta.get("view_count"),
        "like_count": meta.get("like_count"),
        "description": meta.get("description"),
        "url": meta.get("webpage_url"),
        "extractor": meta.get("extractor_key"),
    }, indent=2))
    build_intel(meta, frames, transcript, out_dir / "intel.md")

    print(str(out_dir))


if __name__ == "__main__":
    main()
