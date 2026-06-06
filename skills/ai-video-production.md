---
name: AI Video Production
description: Skill for producing cinematic AI video for Renée's brands (Assistlet pivot, mortgage commercial, Faceless Page niche content, social ads). Built from public knowledge of AI video tooling. AIVB-specific frameworks queued for Console fill-in. Use when Renée says "make me a video" / "create the hero video" / "shoot an ad" / "generate a UGC clip."
---

# AI Video Production — Claude's Skill

## Mission

Reliably produce high-end AI video for Renée's brand assets without burning days. Output covers: hero background videos, social media ad creatives (UGC + product), faceless content reels, mortgage commercial assets, founder/avatar talking-head clips.

## When to use this skill

- Hero background video for a website (Approach G in `animation-mastery.md`)
- 8-15 second loops for landing-page heroes
- 30-90 second social ads (TikTok, IG Reels, YouTube Shorts)
- UGC-style product testimonials with AI avatars
- Faceless content (text-on-screen + B-roll + voiceover)
- Mortgage commercial / agency commercial video assets
- Founder talking-head clips when Renée doesn't want to film herself

## When NOT to use this skill

- Live-action video where Renée is the on-camera talent (use real video, not AI)
- Anything where IP/legal risk of AI-generated content is unacceptable (medical claims, legal advice)
- High-stakes brand work where "uncanny valley" risk could damage trust — use real footage

---

## THE 9 PHASES (matches AIVB curriculum architecture)

Each phase below describes the *what* and the *how* with public-knowledge techniques. AIVB-specific frameworks (their proprietary methods inside each phase) are flagged with `📋 AIVB GAP` — fill via Console scrape of the logged-in Skool session.

### PHASE 1 — Foundation + Tool Setup

**Goal:** know which tool to use for which job. Avoid wasting cycles on the wrong tool.

**Tool-to-job map (public knowledge, current as of April 2026):**

| Job | Best tool | Backup |
|---|---|---|
| Photoreal still image | Google Whisk (Nano Banana) | Midjourney v6 / DALL-E 3 |
| Image-to-video (cinematic) | Google Whisk (Veo) | Runway Gen-3 / Kling AI |
| Text-to-video (no still first) | Sora (when available) | Pika Labs |
| Voice clone | ElevenLabs (premium quality) | Murf / OpenVoice |
| AI avatar (talking head) | HeyGen | Synthesia / D-ID |
| Frame extraction (video → image sequence) | ezgif.com / sfero.ai | ffmpeg |
| Video editing | CapCut (free, fast) | Premiere Pro / DaVinci Resolve |
| Sound effects library | Epidemic Sound / Pixabay | Freesound.org |
| Music | Suno (AI-generated) | Epidemic Sound licensed |
| Subtitles / captions | CapCut auto-captions | Submagic |

**Pre-production checklist before generating ANY video:**
- [ ] Brand mood locked (palette + tone + reference frames pulled)
- [ ] Aspect ratio decided (9:16 social, 16:9 landing page, 1:1 IG feed)
- [ ] Duration target (8s loop / 15s social / 30s ad / 60s+ filmmaking)
- [ ] Audio plan (silent video w/ overlay text? voiceover? music? all three?)
- [ ] Final destination resolution (1080p web minimum, 4K for commercial-quality)

📋 **AIVB GAP:** their specific tool hierarchy + any tools they recommend that I don't know about.

---

### PHASE 2 — AI Image Generation

**Goal:** generate the still image that becomes the foundation of the video.

**Prompting structure (works across Whisk / Midjourney / DALL-E):**

```
[SUBJECT] + [SCENE/SETTING] + [LOCATION] + [TIME/LIGHTING] + [MOOD/STYLE] + [CAMERA/LENS] + [ASPECT RATIO if supported]
```

**Example:**
> "Aerial view of a suburban Toronto neighborhood, sunny mid-afternoon golden hour just starting, cinematic photoreal slight haze, wide-angle drone perspective with slight downward tilt, 16:9"

**Composition rules of thumb:**
- Rule of thirds — subject offset from center, eyes/horizon on the upper third line
- Leading lines — roads / shadows / architecture pulling the eye into the frame
- Depth via foreground/midground/background — flat compositions read AI-cheap
- Lighting is everything — golden hour > harsh midday > flat overcast for cinematic feel
- Real-world physics — shadow direction matches light source, reflections coherent

**Iteration workflow:**
1. Generate 4 variations on the same prompt
2. Pick the closest, refine via Whisk's "Edit" or Midjourney's "Vary (Subtle/Strong)"
3. Lock the still ONLY when composition + lighting + mood ALL hit
4. Save the locked still — this is the seed for video generation

**Common AI-image tells to avoid:**
- Generic flat lighting → specify direction + time
- Hands with wrong fingers → crop hands out OR use "hands not visible"
- Over-saturated colors → request "muted natural color grading"
- Symmetric/centered everything → invoke rule of thirds explicitly
- Floating subjects → request "feet planted on ground, weight visible"
- Text in image (always garbled in AI) → never include readable text in prompt

📋 **AIVB GAP:** AIVB likely teaches a proprietary prompting structure or "ASPECT-style" framework. Need their specific method for higher-success-rate prompts.

---

### PHASE 3 — Image-to-Video (Cinematic)

**Goal:** turn the locked still into 8-15 seconds of cinematic motion.

**Whisk Veo workflow (verified per Renée 2026-04-28):**
1. Type detailed first-frame description → Whisk renders the still
2. Click "Edit" to refine the still (iterate on color, composition, subject details)
3. Click "Video" → describe the motion in detail:
   - **Camera move:** slow forward push / dolly back / pan right / orbit / rise
   - **Subject motion:** trees sway / water ripples / hair drifts / fog rolls / people walk
   - **Speed:** real-time / slight slow-motion (0.7x feel) / time-lapse
   - **Duration feel:** "8-second loop returning to start frame" or "linear forward narrative"
4. Veo renders the video → download

**Motion prompting principles:**
- Match motion to mood — slow drift = premium, fast cuts = energetic
- Specify ONE primary camera move + ONE subject motion (don't stack)
- Avoid abrupt direction changes mid-clip — Veo struggles, looks janky
- Loop-friendly motion = subtle drift in one direction, not dramatic move

**Loop construction (for hero backgrounds):**
- Generate clip with motion that returns toward starting state in last 1s
- OR use ping-pong loop (forward → reverse → forward) via CapCut or ffmpeg
- Cross-fade last 0.5s with first 0.5s for seamless web loop

**Quality check before downloading:**
- [ ] No flickering / morphing artifacts (faces, hands, text)
- [ ] Motion physics coherent (water flows down, not up)
- [ ] No subject duplication mid-frame
- [ ] Color grading consistent throughout
- [ ] Sharp at full resolution (not soft / blurry from upscaling)

📋 **AIVB GAP:** AIVB's specific motion-prompting framework + their tested loop-construction method.

---

### PHASE 4 — Sound Effects + Editing

**Goal:** layer audio that makes the video feel cinematic instead of "muted AI clip."

**Audio layer stack (premium video):**
1. **Music bed** — instrumental, mood-matched, ducked to -18dB under VO
2. **Voiceover** — primary -6dB, compressed, EQ'd (low cut at 80Hz, slight boost 3-5kHz)
3. **Sound effects** — ambient (room tone, wind, traffic) + accent (whoosh on cuts, click on text-pop)
4. **Foley** — footstep, paper rustle, button click — adds realism

**Tool stack:**
- CapCut for fast assembly + auto-ducking + auto-captions
- Audacity (free) for VO cleanup
- Suno for AI-generated music tracks
- ElevenLabs for AI voiceover (Bella voice = Renée's brand default)

**CapCut workflow (fast-ship):**
1. Drop video clip on track 1
2. Drop ElevenLabs VO on track 2 (auto-ducks music)
3. Drop Suno music on track 3
4. Drop SFX on track 4 (whooshes, accents)
5. Auto-caption (review for accuracy, fix names/numbers)
6. Export 1080p H.264 MP4

**Common audio mistakes:**
- VO too loud, music too loud, both fighting — duck music when VO speaks
- Compression set too hard on VO — sounds robotic / squashed
- No room tone fill — silence between VO sentences feels dead, add 3dB ambient
- Music starts/ends abruptly — fade in 1s, fade out 2s
- Forgetting to normalize loudness to -14 LUFS (TikTok/IG standard) or -16 LUFS (YouTube)

📋 **AIVB GAP:** AIVB's specific sound effect library recommendations + their compression/EQ presets.

---

### PHASE 5 — Character Consistency

**Goal:** keep the same person/avatar visually consistent across multiple shots.

**Why it matters:** AI image generators have no concept of "this is the same person across two frames." Without consistency tooling, you get a different face every shot.

**Consistency tooling (current as of April 2026):**

1. **Whisk reference upload** — upload an anchor image of the person; Whisk uses it as identity baseline across new generations
2. **Midjourney `--cref` (character reference)** — paste a URL to your character image; new generations preserve features
3. **HeyGen avatar** — train a custom avatar from 2-5 minutes of real video; generate unlimited shots that look identical
4. **Stable Diffusion + LoRA** — train a small model on 10-20 photos of the person; produces highly consistent output (advanced; requires GPU)
5. **D-ID / Synthesia** — pre-trained avatar library OR custom-trained from a few photos

**Workflow for "Renée appears in 5 different scenes":**
- Option A (cheapest): photograph Renée from 5 different angles → use each as a reference for one scene
- Option B (most consistent): train a HeyGen avatar from a 2-min video of Renée → generate any number of shots
- Option C (most cinematic): real footage of Renée + AI-generated environment composited behind via DaVinci Resolve / After Effects

**Consistency rules:**
- Same lighting direction across all shots in a sequence
- Same outfit / hairstyle / accessories — change clothes between scenes is jarring
- Same color grading applied to all clips in post
- Same camera lens feel (wide / 50mm / 85mm) — mixing lens looks reads "AI-cobbled"

📋 **AIVB GAP:** AIVB likely has specific HeyGen/Synthesia training recipes + their "best practices" for Sora character consistency.

---

### PHASE 6 — AI Video Ads (UGC + Product)

**Goal:** produce social-ready ad creatives — UGC-style testimonials + product showcases — at scale.

**UGC ad architecture (15-30 sec):**

```
[HOOK 0-3s] → [PROBLEM 3-6s] → [PRODUCT REVEAL 6-12s] → [SOCIAL PROOF 12-18s] → [CTA 18-30s]
```

**UGC-style production:**
- AI avatar (HeyGen) speaking direct-to-camera, vertical 9:16
- Imperfect framing, slight handheld feel (CapCut "shake" preset minimal)
- Iphone-quality lighting feel, not studio
- Casual outfit, not corporate
- B-roll cuts every 2-3 seconds to keep retention
- Auto-captions burned in, large font, high contrast (TikTok/IG default)

**Product showcase architecture (30-60 sec):**

```
[CINEMATIC ESTABLISH 0-5s] → [FEATURE BEATS 5-25s] → [TRANSFORMATION 25-45s] → [CTA + URL 45-60s]
```

**Hook patterns that retain in 2026:**
- Pattern interrupt: visual oddity in first frame
- Question hook: *"Why are you still..."*
- Stat hook: *"87% of [audience] never know..."*
- POV hook: *"When [audience] realizes..."*
- Direct callout: *"If you're a [audience], stop scrolling."*

**Platform aspect/duration optimization:**
| Platform | Aspect | Optimal duration |
|---|---|---|
| TikTok | 9:16 | 15-60s |
| IG Reels | 9:16 | 15-30s |
| IG Feed | 1:1 | 15-30s |
| YouTube Shorts | 9:16 | 30-60s |
| YouTube long | 16:9 | 5-15min |
| LinkedIn | 1:1 or 16:9 | 30-90s |

📋 **AIVB GAP:** AIVB's specific UGC scripting framework + their tested hook templates.

---

### PHASE 7 — Social Media AI Content

**Goal:** produce 5-10 social posts per week per brand, at AI-leveraged speed.

**Content pillar architecture (Gary Vee's content pyramid + AI execution):**

1. ONE pillar piece per week (Renée records 5-10 min talking-head OR I generate AI lecture/explainer)
2. Cut into 10-30 micro pieces (CapCut auto-clips + AI subtitle highlight)
3. Distribute across TikTok / IG Reels / YouTube Shorts / LinkedIn / X

**Per-platform optimization:**

**TikTok:**
- Trending audio overlay (CapCut trending tab)
- Native captions (TikTok's auto-captions are now default expected)
- 1-3 hashtags max, niche > generic
- Post 1-3x daily for growth phase

**Instagram Reels:**
- Cover image must be readable in feed (text on cover)
- Loop-friendly endings (last frame = first frame)
- Don't repost TikTok with watermark — IG demotes it

**YouTube Shorts:**
- Hook in 3 seconds or it's dead
- Vertical only (9:16)
- Auto-translate to other languages = massive reach gain in 2026

**LinkedIn:**
- Square (1:1) > vertical for feed performance
- Native upload (don't link to YouTube)
- Caption 1-3 paragraphs, not 1 line
- Post 2-3x per week max (LinkedIn punishes daily spam)

📋 **AIVB GAP:** AIVB's specific content pyramid + their tool stack for batch production.

---

### PHASE 8 — AI Filmmaking (Long-form + Dialogue)

**Goal:** produce 5-15 minute narrative content with multiple scenes, dialogue, character consistency.

**Long-form architecture:**

1. **Outline first** — 3-act structure, beats per minute
2. **Storyboard frame-by-frame** — generate each scene's anchor still in Whisk
3. **Lock character look** (Phase 5)
4. **Generate clips per scene** (Phase 3)
5. **Voice-over + dialogue** (ElevenLabs character voices)
6. **Edit in Premiere or DaVinci** — proper NLE for long-form, not CapCut
7. **Color grade across all clips** — consistency = production value
8. **Music score** (Suno generates per-scene mood)
9. **Sound design** — ambient / foley / accent SFX
10. **Final mix + mastering**

**Time estimate:**
- 5-min faceless explainer: 8-12 hours
- 10-min branded story: 20-30 hours
- 15-min ad-funnel pre-sell: 30-50 hours

**Quality bar (per Renée's standards):**
- "Would a viewer think this was AI-generated, or could it pass for traditional video?" Only "could pass" ships.

📋 **AIVB GAP:** AIVB's specific long-form workflow + their dialogue-generation methods.

---

### PHASE 9 — Cloning + Automation (Scaling)

**Goal:** scale video production from "one video at a time" to "10+ videos per week per brand."

**Cloning techniques:**
- Voice clone: ElevenLabs Professional Voice Clone (5-10 min training audio)
- Face clone: HeyGen Studio Avatar (2-min training video)
- Style clone: Stable Diffusion LoRA (advanced; 20+ training images)

**Automation pipelines:**
1. **Script → Video pipeline:** Claude writes script → ElevenLabs generates VO → HeyGen generates avatar reading the VO → output 1080p MP4
2. **Trend → Video pipeline:** Trending audio detection → AI generates matching content concepts → batch produce 5 variations → Render
3. **Newsletter → Video pipeline:** Each week's newsletter post → auto-converted to social videos via script-to-video

**Tools for automation:**
- N8n workflows orchestrating the pipeline (HTTP requests to each AI service)
- Claude API as the brain (prompting + script-writing)
- Make.com / Zapier as no-code alternative
- Custom Node.js scripts for fully bespoke pipelines

**Scaling rules:**
- Templates first, originals second — define 3-5 video templates, swap content
- Approval queue — generate batch, Renée reviews + approves before publish
- Brand QA pass — check every video against brand-color-palette + tone-consistency rules
- Performance tracking — log which video styles drive engagement, double-down

📋 **AIVB GAP:** AIVB's specific cloning + automation pipeline architecture + their N8n templates.

---

## RENÉE'S BRAND DEFAULTS (apply to every video unless specified otherwise)

- **Voice:** ElevenLabs "Bella" (warm friendly female, Canadian-neutral accent)
- **Color palette:** deep navy `#0A1628` + gold `#C9A84C` / `#E8C97A` + accent aurora cyan `#22D3EE`
- **Type for any text overlay:** Inter (body) + Space Grotesk (headlines)
- **Music mood:** restrained cinematic, NOT pop / NOT dramatic-trailer
- **Captions:** burn-in for social, optional for landing-page hero (usually no caption on hero)
- **Aspect ratio defaults:** 9:16 social, 16:9 landing-page hero, 1:1 IG feed
- **Duration defaults:** 8s landing-page hero loop, 15-30s social, 30-60s ad

## STANDING WORKFLOW FOR "MAKE ME A VIDEO"

When Renée says "make me a video [for X purpose]":

1. **Clarify the brief in 3 questions:**
   - Where does it live? (landing page / TikTok / IG / etc.)
   - Duration?
   - Goal? (book a call / sign up / awareness / retention)
2. **Pull the matching architecture** from Phases 6/7/8 above
3. **Whisk Veo for cinematic visuals** (Phase 3 workflow)
4. **ElevenLabs for VO** (if needed)
5. **CapCut for assembly** + auto-captions + brand colors
6. **3-layer test** before declaring done (per `feedback_live_test_after_every_deploy.md`)
7. **Deliver MP4 + URL** + brief on what to test

## CONTINUOUS LEARNING

Every project teaches new prompting tricks. Append discovered patterns to this file under the relevant phase. Especially capture:
- Prompts that produced unexpectedly great results (paste verbatim with credit to the project)
- Prompts that failed (so we don't repeat)
- New tools as they launch
- Renée's specific feedback ("more like X less like Y")

## CONNECTED MEMORIES + SKILLS

- `animation-mastery.md` — Approach G uses Phases 2 + 3 of this skill
- `feedback_marketing_team_first_on_public_copy.md` — copy/script writing comes from Lex/Mark/Kai/Board, not me alone
- `feedback_live_test_after_every_deploy.md` — every video gets the 3-layer test
- `feedback_complete_not_partial.md` — don't ship a "good enough" video; iterate until it could-pass-for-real

## AIVB-SPECIFIC GAPS — Console scrape pickup

When this picks up via Console with Renée's logged-in Skool session, fill these specific gaps in the file:

1. AIVB's prompting framework (Phase 2)
2. AIVB's motion-prompting framework (Phase 3)
3. AIVB's sound design presets (Phase 4)
4. AIVB's HeyGen/Synthesia training recipes (Phase 5)
5. AIVB's UGC script templates (Phase 6)
6. AIVB's content pyramid + batch tools (Phase 7)
7. AIVB's long-form + dialogue methods (Phase 8)
8. AIVB's automation pipeline architecture (Phase 9)

For each, paraphrase in my own words — never reproduce verbatim lesson text or transcripts.
