---
name: Animation Mastery
description: How Claude Code builds $20k cinematic/animated websites. Six proven approaches + tool map + decision tree + reusable recipes.
type: skill
version: 1.0
updated: 2026-04-21
---

# Animation Mastery — Claude's Skill

## Mission
Build cinematic, animated, award-worthy websites that feel like $20k+ deliverables — reliably, without fighting version mismatches, and fast enough that a client ships in days not weeks.

## Decision tree — which approach to use

Answer in order. First yes wins.

1. **Client gave a concept/brand/mood and wants the fastest luxury ship?** → Approach A (Draftly AI)
2. **Need a single standout hero effect (glass orb, shader, kinetic text, grid)?** → Approach B (21st.dev import)
3. **Need a real 3D scene with interactivity (scroll, mouse, clickable objects)?** → Approach C (R3F + drei + PBR)
4. **Need a flyover/narrative scroll feel with real photography (not 3D look)?** → Approach D (Whisk → Flow → scrub frames)
5. **Need an iconic custom look nobody else has?** → Approach E (GLSL shader hand-written)
6. **Need a premium but quick-ship marketing page without 3D?** → Approach F (Framer Motion + CSS-only effects)

**Never default to hand-building 3D primitives in Three.js from scratch.** Result looks like a child's diorama every time. Always compose from: real 3D assets (GLB), HDRI environments, post-processing, OR AI-generated imagery/video.

---

## APPROACH A — Draftly AI (fastest luxury ship)

**When:** 24-hour turnaround, client has a mood but not specifics.
**Cost:** $200/mo Premium tier (Renée's plan).
**Effort:** 60–90 min per site.

**Process:**
1. Log into draftly.space (Gmail OAuth via poweragentsystem@gmail.com)
2. Start onboarding → pick Sites for clients → Agency/Studio → volume
3. **First message (describes the WEBSITE):** brand name, audience, nav labels, hero headline + subline, CTAs, each section below the scroll. This drives HTML copy + layout.
4. **Second message (describes the BACKGROUND only):** lighting, lens, mood, setting, motion feel (16:9). No logos or button copy. Pure atmosphere.
5. **Select stack chips:** Three.js / React Three Fiber / Spline / Babylon / OGL / Liquid Cursor — whichever matches the aesthetic.
6. Lock the still (first→last frame mode is paid but worth it for scroll narrative).
7. Motion + optional chain — multiple video clips stitched for scroll (timeline ≈ clips × clip length, frames ≈ timeline × FPS slider 10–40).
8. Website build — Draftly extracts frames, generates HTML, shows 10–50s "Preparing preview" overlay.
9. Review in fullscreen. Chat iterates small edits. ZIP export when plan allows.

**When to use over R3F:** you don't need interactivity — just a cinematic look that converts. Most client marketing sites = Draftly wins.

---

## APPROACH B — 21st.dev component import

**When:** you want one specific standout hero/section with proven code.
**Cost:** free (community components, MIT).
**Effort:** 10–20 min per component.

**Top components to remember:**
- `aliimam/glsl-hills` — GLSL shader flowing hills (premium, shadcn install). Deps: `three`.
- `easemize/cinematic-landing-hero` — GSAP kinetic text animation. Deps: `gsap`.
- `Kain0127/flickering-grid-hero` — dark tech grid feel.
- `easemize/hero-with-video` — for cinematic video heroes.
- `magicui/sparkles-text` — sparkle animation on text.

**Process:**
1. Browse `https://21st.dev/community/components/s/hero` (or `/s/pricing-section`, `/s/call-to-action`, etc.)
2. Click a component → preview + "Copy prompt" / "Copy code" / "View code" buttons
3. Install via shadcn CLI: `npx shadcn@latest add https://21st.dev/r/<author>/<slug>`
4. **If project is not shadcn-init'd yet:** `npx shadcn@latest init` first (takes a minute, adds tailwind + components.json)
5. **If project is Vite + inline styles (no shadcn):** click "View code", copy the component source, save to `src/components/`, install the npm deps manually (`npm install <deps> --legacy-peer-deps`).
6. Import + use the component. Props documented on the component page.

**Shortlist file:** `XpertVault/design-library/21st-dev-shortlist.md` — rescored every sprint.

---

## APPROACH C — R3F + drei + PBR (real 3D with interactivity)

**When:** the site needs mouse/scroll-driven interaction with real 3D objects.
**Cost:** free (MIT libraries).
**Effort:** 2–4 hours first time, 30 min reusing pattern.

**Version discipline (most failures come from version mismatch):**
- Pin these together: `@react-three/fiber@^9.x` + `@react-three/drei@^10.x` + `three@^0.175.x`.
- Never mix `drei@9.x` with `three@0.180+` — drei's `MeshTransmissionMaterial` breaks with "Cannot read properties of undefined (reading 'S')".
- `@react-three/postprocessing` often lags behind three versions. When in doubt, skip postprocessing + compensate with CSS radial-gradient halos.

**Reusable recipe — glass orb hero:**
```jsx
import { Canvas } from '@react-three/fiber'
import { Environment, Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// Use built-in MeshPhysicalMaterial with transmission (not drei's MeshTransmissionMaterial — version-safer)
<Canvas dpr={[1,2]} camera={{position:[0,0,4.5], fov:38}}
  gl={{antialias:true, alpha:true, toneMapping:THREE.ACESFilmicToneMapping, toneMappingExposure:1.15}}>
  <ambientLight intensity={0.35}/>
  <directionalLight position={[3,3,3]} intensity={2.2} color="#F5E6C0"/>
  <Environment preset="city" background={false}/>
  <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.85}>
    <mesh scale={1.55}>
      <icosahedronGeometry args={[1,8]}/>
      <meshPhysicalMaterial transmission={1} thickness={1.4} roughness={0} ior={1.6}
        attenuationColor={'#F5E6C0'} attenuationDistance={1.6} clearcoat={1}
        iridescence={0.6} iridescenceIOR={1.3}/>
    </mesh>
  </Float>
  <ContactShadows position={[0,-1.8,0]} opacity={0.4} scale={6} blur={2.6} far={3}/>
</Canvas>
```

**Wrap in ErrorBoundary** that falls back to a CSS orb so a WebGL crash never shows a blank page.

**HDRI environments to remember:** `'city'`, `'sunset'`, `'studio'`, `'warehouse'`, `'forest'`, `'apartment'`. For full custom HDRI, download from polyhaven.com and host locally.

**Never hand-build 3D scenes from boxes/spheres/cylinders with flat colors.** Renée calls this "cartoon" every time. Always: imported GLB model OR transmission/physical materials OR shader material.

---

## APPROACH D — Whisk → Flow → scrub frames (photoreal scroll narrative)

**When:** client wants a real-world feel (aerial → approach → door → interior) not a 3D synthetic look.
**Cost:** Whisk + Flow paid tiers (varies).
**Effort:** 2–3 hours generation + 30 min wiring.

**Process:**
1. **Google Whisk** (`labs.google/fx/tools/whisk`) — generate the START and END still frames with high consistency. Key inputs: subject + scene + style reference. Keep lighting, season, time-of-day identical across start/end.
2. **Google Flow** (`labs.google/fx/tools/flow`) — "frames to video", upload both stills. AI generates motion in between. Typical 8s video.
3. **ezgif.com** or **sfero.ai** — upload the video, set 30 fps, export all frames as ZIP.
4. Drop frames into project: `public/frames/frame-0001.jpg` through `frame-0240.jpg`.
5. Use scroll-scrub component (pattern from `equitymax-website/src/components/MobileHeroScene.jsx`) — preload all frames, canvas draws current frame based on scroll progress.

**Renée's specific pipeline notes:**
- Whisk → Flow workflow is her primary weapon for $20k+ sites.
- She wants consistency across 5+ frames = generate them in the same session, same seed/reference.
- Flag on review: "would a viewer think this was a real video, or a 3D render?" Only "real video" ships.

---

## APPROACH E — GLSL shader (iconic custom look)

**When:** the visual IS the product. You need something no stock component matches.
**Cost:** free, but time-expensive.
**Effort:** 4–8 hours minimum.

**Process:**
1. Reference shadertoy.com — pick a shader that matches the mood.
2. Port to Three.js: `RawShaderMaterial` with vertex + fragment shaders as GLSL strings.
3. Wire uniforms for time + mouse + resolution + custom color picker.
4. Mount on a full-screen plane with orthographic camera.
5. Test on low-end device — shaders burn GPU; add quality scaler if needed.

**Reference shaders to remember:**
- `aliimam/glsl-hills` (21st.dev) — flowing ribbons of noise-based hills.
- Noise-based fog: Perlin 3D over time.
- Caustics: Voronoi distance + time offset.

**When NOT to write from scratch:** if a 21st.dev component already does the look, import it (Approach B). Only write shaders when you literally can't find the look elsewhere.

---

## APPROACH G — Premium Automated (motionsites.ai + Claude Design + Whisk Nano Banana + Veo)

**When:** client wants $20k+ cinematic feel WITHOUT writing animations from scratch. Renée's preferred workflow as of 2026-04-28.

**Cost:** motionsites.ai (free templates) + Claude Design (free / Pro) + Whisk (Google paid tier, Nano Banana + Veo).

**Effort:** 90-180 min per site. Output is genuinely cinematic.

### The 5-step recipe

**Step 1 — Pick template at motionsites.ai**
- Browse motionsites.ai for premium animated templates.
- **Filter for FREE pages** (not all are free — pay attention).
- Pick one matching the brand mood (dark premium, tech, agency, etc.).
- Note the template's structural rhythm (hero → 3-step → comparison → CTA).

**Step 2 — Claude Design + replace placeholder content**
- Open Claude Design (claude.ai/design or via the design-mode chat).
- "Start new project" with the chosen template as the starting point.
- Paste the project brief (what the brand is, audience, goal, voice/tone, hero copy, sections).
- Claude Design replaces placeholder content with the brand-specific content while preserving template animations + structure.

**Step 3 — Generate animated hero video via Google Whisk**

CORRECT Whisk UI flow (verified by Renée 2026-04-28):
- Open Google Whisk (`labs.google/fx/tools/whisk`).
- **Type a detailed text description** of the FIRST FRAME of the video (the still image Whisk should render). The more specific, the better:
  - Subject + scene: *aerial view of a suburban town*
  - Location + setting: *Toronto, Ontario*
  - Time + lighting: *sunny mid-afternoon, soft golden hour just starting*
  - Mood + style: *cinematic, photoreal, slight haze*
  - Camera/lens: *wide angle, slight downward tilt, drone perspective*
- Whisk renders the image (Nano Banana under the hood).
- Two paths from here:
  - **Click "Edit"** → refine the still image with another text description (color shift, add/remove element, adjust composition). Iterate until the still is right.
  - **Click "Video"** → describe how you want the motion. Be specific:
    - Camera move: *slow forward push, gentle drift right, subtle pan up*
    - Subject motion: *trees sway slightly, light haze drifting, slow cloud movement*
    - Speed: *real-time / slow-motion / time-lapse*
    - Duration feel: *8-second loop that returns to start frame*
- Whisk (Veo under the hood) renders the cinematic video.
- Download the video file when ready.

Reference inputs (optional but powerful):
- Upload an existing image as a STYLE reference (Whisk pulls mood/lighting from it)
- Upload a SUBJECT reference (Whisk uses it as the anchor identity in the generated frame)
- Combine references for better consistency across multiple generations

**Step 4 — Back to Claude Design — integrate the video**
- Return to the Claude Design project.
- Upload the downloaded Whisk video.
- Instruction: "Replace the hero background with this video. Keep the same style. Finish the rest of the page in the same visual language."
- Claude Design rewrites the hero section with the video as a fullscreen background-video element + appropriate overlay/dimming for text contrast. Then propagates the visual style (color palette pulled from the video, motion timing, type weight) through the rest of the page.

**Step 5 — Export code + deploy**
- Use Claude Design's "Export" or "Get code" feature.
- Drop the exported HTML/React/Vite bundle into the project repo.
- Verify the video file is hosted somewhere (Vercel public assets, Cloudflare R2, or self-hosted) — large MP4s should be served from a CDN, not bundled in JS.
- Deploy to Vercel.
- 3-layer test: code parses, user walkthrough, lead-journey end-to-end.

### Why this beats hand-coding

- Whisk + Veo produce video that looks photoreal — not synthetic 3D, not CSS-animated, real cinematic motion.
- motionsites.ai templates already have the scroll/parallax/reveal rhythm baked in.
- Claude Design preserves the template's animation choreography while injecting brand content — no fighting framer-motion timings manually.
- Total time-to-cinematic-deploy: 2-3 hours vs days of hand-built animation.

### Common pitfalls

1. **Picking a paid motionsites template by accident** — filter for FREE first, otherwise export is locked.
2. **Whisk video too long** — keep to 8s loop. Longer = slow page load.
3. **Video file too large** — encode to H.264 + AAC, under 5MB. Use HandBrake or ffmpeg if needed.
4. **No fallback poster image** — always set `poster="..."` on the `<video>` so slow connections see a still.
5. **Skip the lead-journey QA** — same rule as every deploy. Layer 1 + 2 + 3 testing.

### Renée's specific preferences (per project briefs)

- **Brand tokens:** navy `#0A1628`, mid-navy `#132541`, gold `#C9A84C` / `#E8C97A` / `#F5E6C0`, muted text `#8FA3BF`.
- **Type:** Space Grotesk for headlines (-0.02em tracking), Inter for body, generous vertical pad `clamp(60px, 8vw, 100px)`.
- **Restraint over flash** — peachworlds-style high-contrast monochrome more than Apple-style aggressive parallax.
- **Real video > 3D synthetic** — rule from Approach D applies. "Would a viewer think this was a real video?" Only "yes" ships.

---

## APPROACH F — Framer Motion + CSS-only (premium but fast-ship)

**When:** marketing page needs to feel polished but doesn't need 3D.
**Cost:** free (Framer Motion is MIT).
**Effort:** 30–60 min.

**Reusable kit:**
- **Reveal on scroll:** `whileInView={{ opacity: 1, y: 0 }}` with `initial={{ opacity: 0, y: 30 }}` + `viewport={{ once: true }}`.
- **Hover lift:** `whileHover={{ y: -4 }}` on cards.
- **Gradient text:** `background: linear-gradient(135deg, #E8C97A, #C9A84C)` + `-webkit-background-clip: text` + `color: transparent`.
- **Glass panel:** `backdrop-filter: blur(18px) saturate(140%)` + semi-transparent bg + inset-1px-white-shadow.
- **Gold-glow button:** gradient bg + layered box-shadow (`0 8px 24px gold-alpha-35% + inset 0 1px 0 white-alpha-40%`).
- **Floating orb (no WebGL):** layered radial-gradients + `@keyframes orbFloat` + conic-gradient spinning overlay for caustics.

**Renée's brand tokens:**
- Navy dark: `#0A1628`
- Navy mid: `#132541`
- Gold: `#C9A84C`
- Gold light: `#E8C97A`
- Gold pale: `#F5E6C0`
- Muted text: `#8FA3BF`
- Section pad: `clamp(60px, 8vw, 100px)` vertical.
- H1: `clamp(32px, 6vw, 58px)` 800 weight -0.02em letter-spacing.

---

## COMMON MISTAKES (from actual failures)

1. **Shipping without testing in a real browser.** Always `/qa` end-to-end — click the button, check console, verify network. Easy-Deploy broken login slipped through because nobody clicked. Never again.
2. **Hand-composing Three.js from primitives.** Always "cartoon" to Renée. Use HDRI, PBR, imported models, or AI-generated frames.
3. **Postprocessing library version mismatch.** `@react-three/postprocessing` often breaks first. Ship without it + compensate with CSS radial glow behind canvas.
4. **Forgetting ErrorBoundary around 3D.** WebGL fails silently → blank page. Always wrap `<Canvas>` with `OrbErrorBoundary` (pattern in `agency-site/src/components/OrbErrorBoundary.jsx`).
5. **Drei version mismatch.** `drei@10.x` expects specific `three@0.175.x`. `drei@9.x` expects `three@0.166.x`. Wrong combo = `.S of undefined`. Pin versions explicitly.
6. **Framer Motion `AnimatePresence` wrappers.** Always wrap conditionally-rendered animations; orphaned exit animations crash.
7. **Images without explicit dimensions.** Layout shift kills "premium" feel instantly. Every `<img>` gets width + height OR aspect-ratio CSS.

---

## TOOL MAP

| Tool | Role | Cost | When |
|---|---|---|---|
| Google Whisk | Generate still frames | Paid tier | Photoreal hero stills |
| Google Flow | Frames → video | Paid | Motion between stills |
| ezgif / sfero | Video → frame ZIP | Free | Extract frames for scroll |
| Draftly | Full AI site generator | $200/mo | Fast luxury ship |
| 21st.dev | Component marketplace | Free | Drop in proven heroes |
| Three.js + R3F + drei | 3D in React | Free | Interactive 3D scenes |
| @react-three/postprocessing | Bloom, DOF, etc | Free (fragile) | Last resort |
| Framer Motion | UI animation | Free | Scroll reveals, hover |
| GSAP | Kinetic text/scroll | Free tier | Complex timelines |
| Spline | 3D design → export | Freemium | Non-coder 3D |
| polyhaven.com | HDRI + textures | Free | Real-world lighting |
| shadertoy.com | Shader reference | Free | Custom GLSL inspiration |
| 21st.dev/magic | AI components via MCP | Paid | When premium tier wired |

---

## HOW TO USE THIS SKILL

Every time a client or Renée asks for a cinematic/animated site:
1. Read the ask. Match to approach A–F via the decision tree above.
2. Execute the matching recipe.
3. `/qa` end-to-end before claiming done.
4. If a new technique comes up not in here — add it to this file. The skill gets sharper every project.

**Adjacent skills:**
- `design-and-build-process.md` — full pipeline from research → ship
- `think-before-building.md` — research + plan before touching code
- `hyper-realism-visual-skill.md` — Whisk/Flow prompting for photoreal output
