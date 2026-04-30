"""Test the local-processing parts of video_intel.py with a synthetic mp4.

Skips the yt-dlp download step (network-dependent) and verifies frame
extraction, audio extraction, and intel.md rendering work end-to-end.
"""
import json
import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from video_intel import build_intel, extract_audio, extract_frames

TEST_VIDEO = Path("/tmp/test.mp4")
OUT = Path(__file__).parent / "output" / "test-synthetic"

if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir(parents=True)

video = OUT / "video.mp4"
shutil.copy(TEST_VIDEO, video)

frames = extract_frames(video, OUT / "frames", n=4, duration=10.0)
assert len(frames) == 4, f"expected 4 frames, got {len(frames)}"
print(f"OK frames: {[f.name for f in frames]}")

audio = OUT / "audio.mp3"
assert extract_audio(video, audio), "audio extraction failed"
print(f"OK audio: {audio.stat().st_size} bytes")

fake_meta = {
    "title": "Test Reel — Synthetic",
    "uploader": "test",
    "duration": 10,
    "view_count": 12345,
    "like_count": 678,
    "description": "Hook line. #design #copy #cta",
    "webpage_url": "https://example.com/test",
    "extractor_key": "Synthetic",
}
build_intel(fake_meta, frames, "this is a sample transcript", OUT / "intel.md")
print(f"OK intel.md: {(OUT / 'intel.md').stat().st_size} bytes")
print(f"\nOutput: {OUT}")
