# HYPER-REALISM VISUAL SKILL
### For: Allan (Creative), Pixel (UX Auditor), any agent generating AI avatars or digital twins

---

## WHAT THIS SKILL IS

This skill defines the minimum quality standard for any AI-generated portrait, avatar, or digital twin created for Xpert Web Solutions or its clients. Generic AI portraits are not acceptable. Every image must be directed — not generated.

The difference: a generated image asks a tool to make something. A directed image tells the tool exactly what the light is touching, where the camera is positioned, and what the skin has been through. Remove any one control layer and the image collapses into generic. Keep all four and it stops looking like AI.

---

## THE FOUR CONTROL LAYERS (MANDATORY FOR EVERY IMAGE)

Every portrait, avatar, or digital twin prompt must control all four layers:

**Layer 1 — Skin Condition**
Tone, texture, surface state. Is the skin dry, oily, sweaty, flushed? What pores are visible? Are there freckles, stubble, under-eye folds, fine lines? What micro-texture is present? Generic prompts skip this. We never skip this.

**Layer 2 — Light Source**
Direction, quality, intensity, color temperature. Is it hard directional light from upper right creating dramatic split shadows? Soft diffused window light from upper left? Golden hour raking light showing every pore? The light must be named and intentional. No "good lighting" or "well lit." Every shadow has a source.

**Layer 3 — Camera Position**
Angle, tilt, distance, crop. Is the camera shooting upward from below face level? Ultra-tight crop on a single eye and nose bridge? Extreme macro proximity? Unconventional framing? The camera position must be specified. No "portrait shot" or "close up."

**Layer 4 — Emotional Register**
What has this face lived through? Cinematic gritty athletic intensity. Introspective melancholic contemplation. Peaceful intimate serene calm. Intense brooding masculine warmth. The emotional register must be named. It is not optional decoration — it is what makes the image feel real.

---

## QUALITY STANDARDS

**Minimum technical spec for all avatars and digital twins:**
- Hyper-realistic 8K macro detail
- Raw unretouched skin — no airbrushing, no smoothing
- Individual pores visible in close crop zones
- Subsurface scattering present in lit areas
- Photorealistic — never illustrated, painted, or CGI
- Hasselblad macro 8K lens reference for premium outputs
- Shallow depth of field with intentional bokeh where background exists

**Skin micro-texture requirements:**
- Visible pores appropriate to skin type
- Under-eye skin folds where anatomically present
- Fine skin creases and natural wrinkle texture
- Individual hair strands visible — eyebrows, stubble, lashes, peach fuzz
- Natural skin flushing, redness, or tone variation where appropriate
- Subsurface scattering visible on cheekbones and nose bridge in lit zones

**Light quality requirements:**
- Hard directional light: name the source direction, color temperature, and shadow behavior
- Soft diffused light: name the source, gradient behavior, and highlight placement
- Specular highlights must be intentional — on wet skin, sweat, oily surfaces, catchlights in eyes
- Color temperature must contrast with shadow zones — warm lit area vs cool shadow, or vice versa

**Eye detail requirements (when visible):**
- Iris: fibrous texture, color specificity, radial fiber detail
- Pupil: size and dilation noted
- Catchlight: shape, position, and source named (square window, circular lamp, etc.)
- Sclera: white sclera with or without visible red vessels noted
- Lashes: individual lower lash count and direction where macro crop allows

---

## NEGATIVE PROMPTS (ALWAYS INCLUDE FOR HIGH-REALISM OUTPUTS)

These must be excluded from every premium avatar and digital twin:

soft diffused lighting, no shadows, flat even light, smooth airbrushed skin, no pores, painted, illustration, CGI, plastic skin, studio strobes (unless intentional), bright white background (unless intentional), dramatic color grading (unless intentional), heavy orange tones (unless intentional)

---

## PROMPT CONSTRUCTION FORMULA

Build every avatar or digital twin prompt using this structure:

```
[Shot type + crop description]
[Camera angle and position]
[Subject description — age, ethnicity, gender, specific physical features]
[Skin condition — tone, texture, surface state, specific details]
[Eye detail — iris color and texture, catchlight, lashes, expression]
[Facial hair detail if present — individual strands, coverage, color]
[Light source — direction, quality, color temperature, shadow behavior]
[Background — depth of field, background description, mood]
[Emotional register — the feeling the image carries]
[Technical spec — 8K macro, photorealistic, Hasselblad, no retouching]
[Negative prompt — list all exclusions]
```

---

## AVATAR TYPES AND THEIR SPECIFIC REQUIREMENTS

### Professional AI Twin (business/brand avatar)
- Neutral to slight three-quarter angle
- Soft directional light — editorial beauty style
- Skin clean but with natural texture — no blemishes visible unless character-defining
- Sharp professional expression — confident, direct, warm
- Background: clean dark near-black or gradient grey
- No dramatic shadows — controlled cinematic lighting only

### Character AI Twin (personality/content creator avatar)
- Unconventional camera angle encouraged
- More expressive lighting — hard directional, split light, or golden hour
- Skin can carry more character — stubble, freckles, pores prominent
- Strong emotional register — whatever fits the brand personality
- Background: environment-appropriate or dark moody

### Hyper-Real Digital Human (maximum realism)
- All four control layers at maximum specificity
- Extreme macro crop — single eye, nose bridge, skin texture zones
- Every micro-detail named — sweat droplets, dust particles, pore depth
- Light source must produce specular highlights on skin surface
- Emotional register must be complex — layered, lived-in
- Always include negative prompt

---

## PROMPT FORMAT — JSON IS THE REQUIRED FORMAT

All image prompts must be structured as JSON objects — not plain text paragraphs. JSON format ensures every control layer is explicit, auditable, and reproducible.

**Required structure:**
```json
{
  "shot": "extreme macro, tight crop from mid-forehead to chin",
  "camera": "straight-on, slight downward tilt, ultra-close proximity",
  "subject": "41-year-old South Asian woman, oval face, strong brow, defined jaw",
  "skin": "warm medium tone, natural oiliness on T-zone, visible pores on nose and cheeks, fine lines at eye corners",
  "eyes": "dark brown iris, fibrous radial texture, square window catchlight, full lower lashes",
  "hair": "dark brown, subtle brow hairs individually visible",
  "light": "soft diffused window light from upper left, warm 5000K, gradient shadow falling right, highlight on left cheekbone",
  "background": "near-black charcoal, shallow depth of field, soft bokeh",
  "emotion": "quiet authority — composed, direct, self-assured",
  "tech": "hyper-realistic 8K macro, raw unretouched skin, subsurface scattering, Hasselblad macro lens, no airbrushing",
  "negative": "smooth skin, no pores, airbrushed, painted, illustration, CGI, plastic, flat lighting, heavy orange tones"
}
```

Never output a prompt as a plain paragraph. Always JSON. This makes prompts reusable and comparable across sessions.

---

## AI TWIN WORKFLOW — STEP-BY-STEP PROTOCOL

When asked to create an AI twin (digital replica of a real person):

**Step 1 — Before generating anything, ask:**
- "How many images do you need? (1, 3, 5, or custom batch)"
- "What angles do you want? Options: straight-on, three-quarter left, three-quarter right, profile, low angle, high angle, extreme macro detail"
- "What is this twin being used for — brand avatar, content, professional profile, or character?"

Do not generate until these three questions are answered.

**Step 2 — Build the JSON prompt set**
Build one JSON prompt per angle requested. All prompts share the same subject, skin, and tech blocks. Only shot, camera, light, and emotion change per image.

**Step 3 — After delivery, quality gate:**
Ask Renée: *"Quality check — does this need to be resent? Check: (1) skin texture real or airbrushed? (2) eyes have depth or flat? (3) lighting directional or generic? If any fail, flag which and I'll revise the prompt."*

**Step 4 — Resend protocol:**
If an image is rejected, do not just regenerate. Identify which control layer failed (skin, light, camera, or emotion), revise only that layer in the JSON, and explain the change before resubmitting.

---

## SKIN REALISM — MAXIMUM STANDARD FOR AVATARS

Skin is where AI images fail. For all avatars and digital twins, the following are non-negotiable:

**Texture requirements (add to every prompt):**
- "individual pores visible on nose, cheeks, and forehead"
- "fine skin creases at eye corners and nasolabial folds"
- "natural skin flushing or tone variation in lit areas"
- "subsurface scattering visible on cheekbones and nose tip"
- "peach fuzz or vellus hair catching the light"

**For oily/active/athletic skin:**
- "natural sheen on T-zone, specular highlights on nose bridge and brow"
- "slight sweat gathering at hairline"

**For mature skin (35+):**
- "visible fine lines at eye corners and forehead"
- "natural under-eye fold and soft crow's feet"
- "slight skin laxity along jaw — not sagging, natural"

**Absolute prohibitions:**
- Never use "smooth skin" — that is airbrushed skin
- Never use "flawless" — that is plastic skin
- Never use "perfect complexion" — that is a filter
- Always pair "raw unretouched skin" + "no airbrushing" in the negative prompt

---

## PROJECT STORAGE — FILE PLACEMENT RULES

Every image creation project must be filed correctly. Before generating anything, identify which storage location applies:

| Project type | Storage location |
|---|---|
| Renée's AI twin / personal brand avatar | `C:\Users\User\Documents\XpertVault\assets\renee-twin\` |
| Client AI twin or avatar | `C:\Users\User\Documents\XpertVault\clients\[ClientName]\assets\` |
| Brand assets, logos, visual identity | `C:\Users\User\Documents\XpertVault\assets\brand\` |
| Test images and rejected drafts | `C:\Users\User\Documents\XpertVault\assets\drafts\` |
| Agent portraits (Allan, Jordan, etc.) | `C:\Users\User\Documents\XpertVault\assets\agents\` |

**Before saving any file:**
1. Confirm which folder applies from the table above
2. Name the file: `[subject]-[angle]-[version].png` — e.g., `renee-threequarter-v1.png`
3. Never save to Desktop, Downloads, or project root
4. If a folder doesn't exist, create it — do not place content in the wrong folder as a shortcut

**After delivery, log the project in the session notes with:** subject, angles generated, files saved, quality gate result, and any revision notes.

---

## WHAT ALLAN DOES WITH THIS SKILL

When asked to create an avatar or digital twin:
1. Ask the three AI twin questions (image count, angles, use case) — do not skip
2. Identify which avatar type is needed (professional, character, or hyper-real)
3. Collect subject details — age, ethnicity, gender, personality, brand vibe
4. Build JSON prompts — one per angle — using all four control layers + skin realism requirements
5. Include technical spec and negative prompt in every JSON block
6. Confirm file storage location before delivering
7. Run the quality gate after delivery — ask explicitly, do not assume approved

When reviewing an existing avatar or AI twin:
1. Check all four control layers are present in the original prompt
2. Flag which layer is causing generic results if the image looks like AI
3. Recommend specific JSON additions to each weak layer
4. Never accept "it looks good enough" — the standard is photorealistic and indistinguishable from a directed photograph

---

## THE STANDARD IN ONE SENTENCE

Every AI portrait or digital twin we produce must look like it was shot by a photographer who knew exactly what they wanted before they pressed the shutter — not like a tool was asked to make something.
