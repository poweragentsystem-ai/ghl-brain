# Image Generation — What We Have, What We Need

## Current state (as of 2026-04-14)
**NO image-generation tool is loaded in this Claude Code session.** Not Gemini, not DALL-E, not Imagen, not Flux, not Midjourney. The only way to produce visuals in this environment is:
- HTML + CSS (limited — CSS can't do photoreal)
- Unsplash / Pexels direct photo URLs (real photos, free, copyright-clear — this is what v2 of the OLS landing now uses)
- External asset files Renée provides

## What's available if wired up

### 1. Gemini 2.5 Flash Image (aka "Nano Banana")
- Provider: Google (AI Studio / Vertex AI)
- Access: Google AI Studio API key or Vertex AI
- Cost: ~$0.039 per image generated (Vertex)
- JSON prompt schema: supports structured prompts with fields for subject, style, composition, lighting, camera, aspect ratio, negative prompt — delivers more consistent output than plain prompts. Renée heard correctly.
- How to wire: install Gemini MCP OR call via curl with Google AI Studio API key (`curl https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent -X POST -d @prompt.json`)
- **Cost to unlock: $0 + usage-based. Sign up at aistudio.google.com for a key.**

### 2. Imagen 3 (Google)
- Higher fidelity than Flash Image; slower.
- Access: Vertex AI (requires GCP project + billing).
- Best for: photoreal product/marketing imagery at max quality.

### 3. Flux (Black Forest Labs)
- Provider: fal.ai, Replicate, or self-host
- Strengths: photorealism, consistent style across series, strong text rendering
- Cost: ~$0.03–0.06/image on fal.ai
- Best for: premium marketing imagery

### 4. Midjourney
- Provider: Midjourney
- Access: Discord-based; no official API, only unofficial proxies
- Cost: $10–60/month
- Strengths: best-in-class artistic output
- Weaknesses: harder to automate, no official API

### 5. DALL-E 3
- Provider: OpenAI
- Access: OpenAI API
- Cost: ~$0.04–0.08/image
- Strengths: good text in images, prompt-following
- Weaknesses: less photoreal than Flux / Imagen for architectural scenes

## Recommendation

**Today:** Use real photography via Unsplash/Pexels for any hero imagery that needs to look real. This is the v2 OLS landing approach.

**This week, if budget permits:** Unlock **Gemini 2.5 Flash Image** via Google AI Studio. It's free to start, pay-as-you-go, fits Renée's billing model, and covers 90% of image generation needs for ads, avatars, social posts, landing hero art. Flux on fal.ai as a backup for when Gemini quality falls short.

**For true 3D scenes (street flyover, parallax homes):** Spline (free tier). Designer builds scene, embed into landing page. Allan (Creative) owns.

---

## Structured JSON Prompt — Example for "Hyperrealistic Canadian Detached Homes on a Sunny Street"

Renée heard that JSON prompts produce better images. She's right for Gemini and some other models. Here's a template:

```json
{
  "prompt": {
    "subject": "A residential street in a Canadian suburban neighborhood, with modern detached homes on both sides",
    "style": "hyperrealistic, photojournalistic, architectural photography",
    "composition": "low-angle street-level perspective, homes receding into distance on both sides, convergence toward vanishing point",
    "lighting": "golden hour, late afternoon sun, warm side-light casting long shadows",
    "weather": "clear blue sky, a few scattered cirrus clouds",
    "details": [
      "well-manicured green front lawns",
      "mature trees lining the sidewalk",
      "gas lamp street lights, lit",
      "paved asphalt road with clean lane markings",
      "variety of two-story detached homes in earthy tones (beige, warm grey, brick red)",
      "driveways with clean concrete",
      "no people visible",
      "no cars parked"
    ],
    "camera": "35mm full-frame, f/5.6, ISO 200, shot at eye level",
    "aspect_ratio": "16:9",
    "negative_prompt": "cartoon, illustration, CGI, video game, Pixar, low-poly, flat colors, text overlays, logos, watermarks"
  }
}
```

## Plain-text version (for Midjourney / Flux / most models)

> Hyperrealistic architectural photography of a Canadian suburban residential street, golden hour, late-afternoon sunlight casting long warm shadows. Modern two-story detached homes line both sides, earthy tones (beige, warm grey, brick red), well-manicured green lawns, mature trees, clean concrete driveways. Paved asphalt road with clean lane markings, gas lamp streetlights lit. Clear blue sky with scattered cirrus clouds. 35mm full-frame at f/5.6, eye-level, 16:9 aspect ratio. Photojournalistic, no people, no cars. --style raw --ar 16:9 --v 6

## What Renée should do next
1. Sign up at https://aistudio.google.com → get Gemini API key (free)
2. Paste key into Command Center API Vault
3. Tell Claude "Gemini key is loaded" → Claude calls it via curl + JSON for future images
4. Gemini output goes into landing pages, ads, social, everywhere

Total cost to unlock: $0 to sign up, pennies per image.
