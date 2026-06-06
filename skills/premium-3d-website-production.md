---
name: Premium 3D + AI-Twin Website Production
description: How to ship $20K+ feeling websites — 3D scroll, AI twins / avatars, photoreal hero video, parallax depth, premium interaction. Use when Renée says "make this site cinematic" / "I want a 3D scroll" / "build me an AI twin." Owner Allan (Creative) + Devon (Systems).
---

# Premium 3D + AI-Twin Website Production — Claude's Skill

Extends `animation-mastery.md`. This is the end-to-end skill for shipping the visual TIER that Renée wants: not framer-motion-fades-and-shadows, but actual 3D-scroll, photoreal video heroes, and AI-twin presenters.

---

## The 4 production tiers (pick what the project needs)

| Tier | Visual feel | Tool stack | Time cost | When to use |
|---|---|---|---|---|
| **Tier 1 — Tasteful** | Restraint + depth, no 3D | Framer Motion + CSS + Lenis | 2-4 hrs | MVP / fast-ship marketing |
| **Tier 2 — Cinematic** | Photoreal video bg, smooth scroll | Whisk Veo + Approach G | 4-8 hrs | High-ticket landing pages |
| **Tier 3 — 3D Interactive** | Real 3D scenes, mouse-track, scroll-driven | R3F + drei + Three.js | 12-30 hrs | Flagship product / hero-grade |
| **Tier 4 — AI Twin** | Photoreal AI avatar of founder presenting | HeyGen + Whisk + 3D scene | 20-50 hrs | Personal-brand product / course / agency |

**Default:** Tier 2 (Whisk Veo cinematic) for most landing pages. Tier 3+ only when the visual IS the product or when the brand needs to LOOK $20K+.

---

## Tier 2 — Cinematic (Whisk Veo) — the workhorse

Already covered in `animation-mastery.md` Approach G. Quick refresh:

1. Pick template baseline at motionsites.ai (filter free)
2. Claude Design starts new project from that template, paste brand brief
3. Whisk: detailed first-frame text description → render still → click "Edit" to refine OR click "Video" to add motion description → Veo generates → download
4. Claude Design integrates the video as hero bg + propagates style
5. Export code, deploy to Vercel
6. 3-layer test (per `feedback_live_test_after_every_deploy.md`)

---

## Tier 3 — 3D Interactive (real 3D scene)

When you need scroll-driven 3D with mouse interaction.

### Stack discipline (most builds fail here)

```
react-three-fiber (R3F)  @^9.x
@react-three/drei         @^10.x
three                     @^0.175.x
```

NEVER mix `drei@9.x` with `three@0.180+` — `MeshTransmissionMaterial` breaks with cryptic errors. Pin versions explicitly in package.json.

### The recipe — glass orb hero (reusable)

```jsx
import { Canvas } from '@react-three/fiber'
import { Environment, Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

<Canvas
  dpr={[1, 2]}
  camera={{ position: [0, 0, 4.5], fov: 38 }}
  gl={{
    antialias: true,
    alpha: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 1.15,
  }}
>
  <ambientLight intensity={0.35} />
  <directionalLight position={[3, 3, 3]} intensity={2.2} color="#F5E6C0" />
  <Environment preset="city" background={false} />
  <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.85}>
    <mesh scale={1.55}>
      <icosahedronGeometry args={[1, 8]} />
      <meshPhysicalMaterial
        transmission={1}
        thickness={1.4}
        roughness={0}
        ior={1.6}
        attenuationColor={'#F5E6C0'}
        attenuationDistance={1.6}
        clearcoat={1}
        iridescence={0.6}
        iridescenceIOR={1.3}
      />
    </mesh>
  </Float>
  <ContactShadows position={[0, -1.8, 0]} opacity={0.4} scale={6} blur={2.6} far={3} />
</Canvas>
```

### Wrap in error boundary

WebGL crashes silently. Always wrap `<Canvas>` in an `OrbErrorBoundary` that falls back to a CSS-only orb so a crash doesn't show a blank page.

### Scroll-driven 3D rotation

Combine R3F with framer-motion's `useScroll`:

```jsx
import { useScroll, useTransform } from 'framer-motion'

const { scrollYProgress } = useScroll({ target: ref })
const rotation = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2])
// Pass rotation to mesh's rotation.y
```

### Performance rules
- DPR cap at `[1, 2]` (don't render at native retina — kills FPS)
- Mobile: drop to single mesh, lower polygon count, no postprocessing
- Frame budget: 16ms per frame at 60fps. Profile early.

---

## Tier 4 — AI Twin (photoreal avatar of founder)

This is what makes a personal-brand site feel like the founder is talking to YOU.

### Stack
- **HeyGen Studio Avatar** — train custom avatar from 2-min video of Renée
- **ElevenLabs Voice Clone** — Renée's voice from 5-10 min training audio
- **Whisk + Veo** — environments / B-roll behind the avatar
- **Custom React component** — overlays the avatar video on the hero

### Production workflow

#### Step 1 — Train the avatar
- HeyGen Studio: upload 2-3 minutes of clean front-facing video of Renée
- Background: solid color, even lighting, looking at camera
- HeyGen processes: 24-48 hrs to train
- Output: avatar that can speak ANY text in Renée's voice

#### Step 2 — Train the voice
- ElevenLabs: upload 5-10 min of Renée's voice (clean, no music, multiple emotions)
- Process: 5-15 min
- Output: voice ID that matches Renée

#### Step 3 — Generate the talking head
- Write script (per `lex.md` voice rules — Renée's actual cadence)
- HeyGen: paste script → render avatar speaking it (in Renée's voice via ElevenLabs integration)
- Export 1080p mp4 with transparent background (chroma-keyable)

#### Step 4 — Generate the environment
- Whisk: describe the scene that goes BEHIND Renée (her office, a city skyline, a luxurious space)
- Render still → animate to video
- Compose Renée over the environment in CapCut / DaVinci

#### Step 5 — Compose into hero component
```jsx
<section className="hero">
  <video src="/whisk-environment.mp4" autoPlay loop muted className="bg" />
  <video src="/heygen-renee-avatar.mp4" autoPlay loop muted className="avatar" />
  <div className="copy">
    <h1>{renee_speaks_to_you}</h1>
  </div>
</section>
```

### Avatar quality tells

What makes an AI twin feel REAL vs uncanny:

- **Eye contact** — avatar must look at camera, not slightly off
- **Micro-expressions** — HeyGen Pro tier produces these; standard tier looks dead
- **Hand gestures** — natural movement, not stiff arms
- **Voice intonation** — ElevenLabs voice settings: stability 0.5, similarity 0.8, style 0.3
- **Lip sync** — must match audio exactly; bad lip sync is the biggest tell

### Quality bar (Renée's standard)
**"Would a viewer think this is a real video of Renée, or could they tell it's AI?"** Only "could pass for real" ships.

If anything looks robotic, regenerate. AI twin done badly is worse than no AI twin.

---

## When to use each tier

| Project | Recommended tier | Why |
|---|---|---|
| Mortgage agent landing page | Tier 2 (cinematic Whisk video) | Compliance-heavy, video bg sets premium feel without uncanny risk |
| Real estate listing site | Tier 2 + walkthrough video | Buyers want to see the property, not a 3D abstraction |
| AI agency homepage (Assistlet pivot) | Tier 3 (3D orb you talk to) | Visual IS the product |
| Renée's personal brand site | Tier 4 (AI twin) | Personal connection sells coaching / consulting |
| Mortgage Commercial site | Tier 2 (saved hero spec already) | Premium dark with raw video |
| Faceless content brand | Tier 1 (simple) | Faceless = no AI twin contradiction |

---

## Production cost ceiling per tier

Approx hours from kickoff to deploy:

| Tier | Hours | Tools cost |
|---|---|---|
| Tier 1 | 2-4 | $0 (all free) |
| Tier 2 | 4-8 | $200-400/mo (Whisk + motionsites baseline) |
| Tier 3 | 12-30 | $0 (libraries free, DEV time is the cost) |
| Tier 4 | 20-50 | $39-99/mo (HeyGen) + $22-99/mo (ElevenLabs) + Whisk |

For a $5K-$15K client site, Tier 2 is the sweet spot. For Renée's flagship surfaces, Tier 3-4 justified.

---

## QA checklist before deploying any premium site

- [ ] All routes return 200 (test 5 random paths)
- [ ] Inline JS parses cleanly (`new Function(<script>)` test)
- [ ] WebGL canvas wrapped in error boundary (3D tier only)
- [ ] Video assets compressed to <5MB H.264 + AAC
- [ ] Poster image set on every video tag (slow connection fallback)
- [ ] Mobile viewport tested (most premium animations need mobile-specific tweaks)
- [ ] Text readable over video bg (overlay or text shadow)
- [ ] LCP under 2.5s (large bg video pre-buffered)
- [ ] No layout shift on video load (CLS < 0.1)
- [ ] Lighthouse mobile score >85

---

## Connected skills

- `animation-mastery.md` — full motion / 3D recipe library
- `ai-video-production.md` — Whisk + ElevenLabs + HeyGen pipeline
- `design-and-build-process.md` — full pipeline (research → design → build → ship)
- `allan.md` — Allan owns visual direction
- `devon.md` — Devon owns implementation
- `mark.md` — Mark on copy direction
- `feedback_live_test_after_every_deploy.md` — 3-layer test before "done"

## Renée's saved design specs (existing references)

- **Mortgage Commercial hero** — `XpertVault/projects/mortgage-commercial-website/hero-design-spec.md` (Inter + liquid-glass + AnimatedHeading + raw video bg + glass tag card). Tier 2.
- **Stitch Command Center** — `XpertVault/projects/command-center/stitch-export-2026-04-29/` (11 screens awaiting Console fetch). Tier 1 + 2 mix.
- **Assistlet.ai (current)** — Tier 1 with iframe orb. Pickup task #51 = upgrade to Tier 3 with 3D orb + Whisk video bg.
