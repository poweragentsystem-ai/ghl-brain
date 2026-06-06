# Remotion — Pro-Level Skill

> Code skill for building cinematic videos in React + converting them into scroll-driven web experiences. Saved 2026-06-02 from official docs at remotion.dev. Updated when Remotion ships major versions.

---

## Core mental model (the part everything else hangs off)

**Remotion inverts traditional video editing.** Instead of timeline tracks + keyframes, **a video is a pure function of frame number → image.** You write a React component. It reads `useCurrentFrame()`. The frame number is the only input that changes between frames. Same frame = same image, always (this is what makes server rendering deterministic).

```tsx
import { useCurrentFrame, useVideoConfig } from 'remotion';

export const MyVideo: React.FC = () => {
  const frame = useCurrentFrame();        // 0, 1, 2, ... up to durationInFrames-1
  const { fps, durationInFrames, width, height } = useVideoConfig();
  return <div>frame {frame}</div>;
};
```

**The render loop:** Remotion spawns a headless Chromium, navigates to your bundle, takes a screenshot per frame, then stitches them into the output format. That's it. No video timeline data structure — just React components rendered at frame N.

---

## Project structure

```
my-remotion-project/
├── src/
│   ├── Root.tsx                ← registers all compositions
│   ├── index.ts                ← entry: registerRoot(RemotionRoot)
│   └── compositions/
│       ├── MyVideo.tsx
│       ├── AnotherVideo.tsx
│       └── assets/
│           ├── voice.mp3
│           └── logo.png
├── remotion.config.ts          ← codec, concurrency, browser flags
├── package.json
└── tsconfig.json
```

**Entry pattern:**

```tsx
// src/index.ts
import { registerRoot } from 'remotion';
import { RemotionRoot } from './Root';
registerRoot(RemotionRoot);

// src/Root.tsx
import { Composition } from 'remotion';
import { MyVideo } from './compositions/MyVideo';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="MyVideo"                  // unique, alphanumeric + hyphens only
      component={MyVideo}
      durationInFrames={150}        // 5 sec @ 30fps
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ title: 'Hello' }}
    />
  </>
);
```

---

## Animation primitives (the core 4)

### 1. `useCurrentFrame()` — required driver

```tsx
const frame = useCurrentFrame();   // returns 0 to durationInFrames-1
```

**⚠️ Iron law:** if your animation isn't driven by `useCurrentFrame()`, you'll get flicker during render (headless Chrome renders frames out-of-order in parallel chunks — `useState`/timers don't persist). NEVER use `setTimeout`, `setInterval`, `requestAnimationFrame`, or `useState`-as-time for animation. Frame → value, always pure.

### 2. `interpolate()` — map frame ranges to value ranges

```tsx
import { interpolate, Easing } from 'remotion';

const opacity = interpolate(
  frame,                            // input
  [0, 30],                          // input range
  [0, 1],                           // output range
  {
    extrapolateLeft: 'clamp',       // 'clamp' | 'extend' | 'identity'
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),  // Material easing
  }
);
```

**Extrapolation:**
- `clamp` — pin output at boundary (default before/after = output range edges)
- `extend` — keep linear extrapolation (overshoots)
- `identity` — return input value unchanged

**Multi-stop interpolation (3+ keyframes):**

```tsx
const x = interpolate(frame, [0, 30, 60, 90], [0, 500, 500, 0]);
// frame 0→0px, 30→500px, 60→500px (hold), 90→0px
```

**Color interpolation — use `interpolateColors`:**

```tsx
import { interpolateColors } from 'remotion';
const bg = interpolateColors(frame, [0, 60], ['#ff0000', '#0000ff']);
```

### 3. `spring()` — physics-based motion

```tsx
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

const { fps } = useVideoConfig();
const scale = spring({
  fps,
  frame,                            // current frame
  from: 0,                          // start value (default 0)
  to: 1,                            // end value (default 1)
  config: {
    mass: 1,                        // higher = slower
    damping: 10,                    // higher = less bounce
    stiffness: 100,                 // higher = faster
    overshootClamping: false,       // true = no overshoot
  },
  durationInFrames: 30,             // optional cap on spring duration
  delay: 10,                        // wait N frames before starting
});
```

**Spring presets:** Material-ish defaults are great; only touch config if the motion feels off. Lower stiffness + higher damping = slow, heavy, professional. Higher stiffness + low damping = bouncy, playful, kid-tech.

### 4. `useVideoConfig()` — composition metadata

```tsx
const { fps, durationInFrames, width, height } = useVideoConfig();
```

Always pull `fps` from here, never hardcode — it lets the same component render at different framerates without breaking timing.

---

## `<Composition>` — the registration

| Prop | What it does |
|---|---|
| `id` | Unique slug, alphanumeric + `-` only. Shows in Studio sidebar + render CLI. |
| `component` | The React component to render (or `lazyComponent` for code-splitting) |
| `durationInFrames` | Total frames. Integer. |
| `fps` | Frame rate (24, 30, 60 are common). |
| `width` + `height` | Output pixels. 1920×1080 for landscape, 1080×1920 for vertical reels, 1080×1080 for square. |
| `defaultProps` | Initial prop values. **Must be JSON-serializable** (plus `Date`, `Map`, `Set`, `staticFile()`). |
| `schema` | Optional Zod schema → validates defaults + enables visual prop editing in Studio. |
| `calculateMetadata` | Async function to compute fps/duration/props at render time (see Data Fetching below). |

**Multiple compositions in one project:** put many `<Composition>` tags inside `<RemotionRoot>`. Each renders independently. Group them with `<Folder name="...">` for sidebar organization.

---

## `<Sequence>` — timing composition

Used to delay, trim, or layer content within a composition.

```tsx
import { Sequence } from 'remotion';

<Sequence from={30} durationInFrames={60}>
  <MyContent />     {/* mounts at parent frame 30, unmounts at parent frame 90 */}
</Sequence>
```

**Key behavior:** inside a `<Sequence from={X}>`, children's `useCurrentFrame()` returns `parentFrame - X`. So children think frame 0 starts when the sequence starts. This makes child components reusable across compositions without changing their internal animation timing.

**Common patterns:**

```tsx
// Delay (start at frame 30, child thinks frame 0)
<Sequence from={30}><Intro /></Sequence>

// Trim beginning (start at frame 0, but child skips its first 15 frames)
<Sequence from={-15}><Hero /></Sequence>

// Layer multiple elements at different times
<>
  <Sequence durationInFrames={60}><Bg /></Sequence>
  <Sequence from={30} durationInFrames={30}><Title /></Sequence>
  <Sequence from={45} durationInFrames={15}><CTA /></Sequence>
</>

// layout="none" disables auto absolute-fill positioning
<Sequence from={30} layout="none"><CustomPositioned /></Sequence>
```

### `<Series>` — sequential scenes without frame math

```tsx
import { Series } from 'remotion';

<Series>
  <Series.Sequence durationInFrames={60}><Scene1 /></Series.Sequence>
  <Series.Sequence durationInFrames={90}><Scene2 /></Series.Sequence>
  <Series.Sequence durationInFrames={60}><Scene3 /></Series.Sequence>
</Series>
```

Series auto-calculates `from` for each child. Scene2 starts at frame 60, Scene3 at 150. Use this for cuts-between-scenes; use Sequence for overlaps.

### `<Loop>` — repeat a child

```tsx
import { Loop } from 'remotion';

<Loop durationInFrames={30} times={5}>
  <Pulse />     {/* renders 5 times, each 30 frames */}
</Loop>
```

---

## `@remotion/transitions` — scene-to-scene effects

```tsx
import { TransitionSeries, linearTiming, springTiming } from '@remotion/transitions';
import { fade, slide, wipe, flip, clockWipe } from '@remotion/transitions/fade'; // etc

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}><Scene1 /></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 30 })} />
  <TransitionSeries.Sequence durationInFrames={60}><Scene2 /></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={slide({ direction: 'from-right' })} timing={springTiming({ config: { damping: 20 } })} />
  <TransitionSeries.Sequence durationInFrames={60}><Scene3 /></TransitionSeries.Sequence>
</TransitionSeries>
```

**Available presets:** `fade` · `slide` · `wipe` · `flip` · `clockWipe` · `iris` · `cube` · `none`.
**Timing:** `linearTiming({ durationInFrames })` for hard cuts, `springTiming({ config })` for elastic.
**Custom:** roll your own by implementing the TransitionPresentation interface.

---

## `<Audio>` and `<Video>` — media

```tsx
import { Audio, Video, staticFile } from 'remotion';

// Audio
<Audio src={staticFile('voice.mp3')} volume={0.8} />
<Audio src="https://cdn.example.com/music.mp3" startFrom={30} endAt={120} volume={(f) => Math.min(1, f / 30)} />
//   ^ trim audio + fade-in by frame

// Video (existing MP4 as element in composition)
<Video src={staticFile('background.mp4')} startFrom={0} endAt={150} muted />
```

**Volume can be a function** `(frame) => number 0–1` for per-frame ducking / fade-in / fade-out. Useful for ducking background music under voiceover.

**`@remotion/media-utils`:** preprocess audio with `visualizeAudio()`, `getAudioDurationInSeconds()`, `extractAudioFromVideo()` — useful for waveform visualizations and dynamic-duration videos that match TTS clip length.

---

## Data fetching — the right way (`calculateMetadata`)

**The right pattern:** fetch BEFORE render kicks off, on the composition.

```tsx
<Composition
  id="DynamicVideo"
  component={DynamicVideo}
  durationInFrames={1}      // placeholder — overridden below
  fps={30}
  width={1920}
  height={1080}
  defaultProps={{ userId: '' }}
  calculateMetadata={async ({ props, abortSignal }) => {
    const response = await fetch(`https://api.example.com/users/${props.userId}`, { signal: abortSignal });
    const data = await response.json();
    return {
      props: { ...props, data },         // pass data into component
      durationInFrames: data.script.length * 30,   // dynamic duration
      fps: 30,
    };
  }}
/>
```

**Why this matters:** Remotion renders frames IN PARALLEL across multiple headless browser tabs. If you fetch INSIDE a component via `useEffect`, you re-fetch the same data for every tab → rate limits, slow renders, costs.

**`calculateMetadata` runs ONCE** before all rendering tabs spawn. The result is serialized and passed to every render worker. Data fetched once, used by all frames.

### Legacy / asset-fetching: `delayRender` + `continueRender`

For non-JSON assets (custom fonts, dynamic images) inside a component:

```tsx
import { delayRender, continueRender, cancelRender } from 'remotion';

const MyComp = () => {
  const [data, setData] = useState(null);
  const [handle] = useState(() => delayRender('Fetching data'));

  useEffect(() => {
    fetch('/api/data')
      .then(r => r.json())
      .then(d => { setData(d); continueRender(handle); })
      .catch(e => cancelRender(e));
  }, []);

  if (!data) return null;
  return <div>{data.message}</div>;
};
```

**Default 30s timeout per `delayRender`.** Pass second arg to label which fetch is stuck if you hit timeouts.

---

## Rendering — the four paths

### 1. Studio (interactive)

```bash
npx remotion studio
```

Opens a browser dev environment. Edit code → hot reload → scrub timeline → click render. Best for development + small one-off renders.

### 2. CLI (one-off render)

```bash
# Video render
npx remotion render MyVideo                    # uses composition id, prompts for path
npx remotion render MyVideo out.mp4
npx remotion render MyVideo out.mp4 --codec=h264 --crf=18

# Single still
npx remotion still MyVideo frame.png --frame=42

# PNG sequence (KEY for video-to-scroll work — see below)
npx remotion render MyVideo --sequence
npx remotion render MyVideo out_folder --sequence --image-format=jpeg
```

**Codecs:** `h264` (default, broad compat) · `h265` (smaller, less compat) · `vp8` · `vp9` (web-friendly, transparent supported) · `gif` · `prores` (high quality for editing) · `png-sequence` (lossless frame export).

### 3. Server-Side Rendering (programmatic, Node.js)

```ts
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import path from 'path';

const bundleLocation = await bundle({
  entryPoint: path.resolve('./src/index.ts'),
  webpackOverride: (config) => config,
});

const inputProps = { title: 'Hello from server' };

const composition = await selectComposition({
  serveUrl: bundleLocation,
  id: 'MyVideo',
  inputProps,
});

await renderMedia({
  composition,
  serveUrl: bundleLocation,
  codec: 'h264',
  outputLocation: './out.mp4',
  inputProps,
});
```

Run in Express / Next.js API route / Cloud Run / Vercel Sandbox. Heavy CPU but no AWS dependency.

### 4. AWS Lambda (cloud rendering at scale)

```ts
import { renderMediaOnLambda, getRenderProgress } from '@remotion/lambda/client';

const { renderId, bucketName } = await renderMediaOnLambda({
  region: 'us-east-1',
  functionName: 'remotion-render-XYZ',     // deployed via npx remotion lambda functions deploy
  serveUrl: 'https://s3.../remotion-bundle-ABC',   // deployed via npx remotion lambda sites create
  composition: 'MyVideo',
  inputProps: { title: 'Hello' },
  codec: 'h264',
  framesPerLambda: 20,                     // parallelism: more = faster + more cost
});

// Poll progress
const progress = await getRenderProgress({ renderId, bucketName, functionName: '...', region: 'us-east-1' });
// progress.overallProgress (0–1), progress.outputFile when done
```

**Lambda render constraints:**
- Max 80 min @ 1080p (15-min AWS limit per worker; parallel split handles longer)
- Max ~5GB output (S3 chunk stitching limit)
- No AV1 codec
- 1000 concurrent Lambdas default region cap
- ~$0.05–$0.20 per minute of video, depending on resolution + memory

### 5. Player — embed in a web app (not a render path, runtime playback)

```tsx
import { Player } from '@remotion/player';
import { MyVideo } from './MyVideo';

<Player
  component={MyVideo}
  durationInFrames={150}
  fps={30}
  compositionWidth={1920}
  compositionHeight={1080}
  inputProps={{ title: 'Live preview' }}
  controls
  autoPlay={false}
  loop
  style={{ width: 800, height: 450 }}
/>
```

**Player vs Studio vs rendered MP4:**
- **Studio:** dev environment, scrub + render to file.
- **Rendered MP4:** static file, plays in `<video>`, immutable.
- **Player:** React component, plays the composition LIVE in the user's browser. Props are interactive — user can change `inputProps` and the video updates in real time. Use for editor UIs, customizable templates, live previews.

---

## 🎬 THE VIDEO-TO-SCROLL PATTERN (the Apple/Stripe trick)

This is the killer use of Remotion for landing pages. **Make a cinematic sequence in Remotion → export as PNG frames → drive the frame number by scroll position on the web page.**

### Step 1 — Build the scene in Remotion

```tsx
// src/compositions/ScrollHero.tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';

export const ScrollHero: React.FC = () => {
  const frame = useCurrentFrame();

  // 0–60: product rotates in
  const rotation = interpolate(frame, [0, 60], [180, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });
  // 60–120: text fades in
  const textOpacity = interpolate(frame, [60, 120], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  // 120–180: zoom in
  const scale = interpolate(frame, [120, 180], [1, 1.4], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: `rotate(${rotation}deg) scale(${scale})` }}>
        <img src="/product.png" />
      </div>
      <h1 style={{ opacity: textOpacity, color: 'white', position: 'absolute', bottom: 100 }}>
        Built different.
      </h1>
    </AbsoluteFill>
  );
};
```

Register it as a Composition with `durationInFrames={180}` @ 30fps = 6 seconds → 180 frames.

### Step 2 — Export as PNG sequence

```bash
npx remotion render ScrollHero out/scroll-hero --sequence --image-format=jpeg
# outputs: out/scroll-hero/0001.jpeg, 0002.jpeg, ... 0180.jpeg
```

**Choose 180 frames? 90? 60?** Tradeoff:
- More frames = smoother scroll but heavier preload
- Apple uses ~150 frames for a 4-sec product reveal
- For a typical hero: 90–150 frames is the sweet spot
- Use JPEG (smaller) unless transparency required → PNG

### Step 3 — Drive frame-by-scroll on the web page

```html
<!-- index.html -->
<div id="hero-container" style="height: 300vh;">      <!-- 3x viewport = scroll runway -->
  <canvas id="hero-canvas" style="position: sticky; top: 0; width: 100vw; height: 100vh;"></canvas>
</div>

<script>
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
const container = document.getElementById('hero-container');
const frameCount = 180;
const images = [];
let currentFrame = 0;

// Preload all frames
const preload = async () => {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = `/scroll-hero/${String(i).padStart(4, '0')}.jpeg`;
    images.push(img);
  }
  await Promise.all(images.map(img => new Promise(r => img.onload = r)));
  draw(0);
};

// Resize canvas
const setSize = () => {
  canvas.width = canvas.offsetWidth * devicePixelRatio;
  canvas.height = canvas.offsetHeight * devicePixelRatio;
  draw(currentFrame);
};

const draw = (frameNum) => {
  const img = images[Math.floor(frameNum)];
  if (img && img.complete) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

// Bind to scroll
const onScroll = () => {
  const rect = container.getBoundingClientRect();
  const scrollProgress = Math.max(0, Math.min(1, -rect.top / (container.offsetHeight - window.innerHeight)));
  currentFrame = scrollProgress * (frameCount - 1);
  requestAnimationFrame(() => draw(currentFrame));
};

window.addEventListener('resize', setSize);
window.addEventListener('scroll', onScroll, { passive: true });
preload().then(setSize);
</script>
```

### Step 4 — Polish with GSAP ScrollTrigger (recommended for production)

```tsx
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ctx = canvas.getContext('2d');
const obj = { frame: 0 };

ScrollTrigger.create({
  trigger: '#hero-container',
  start: 'top top',
  end: '+=200%',                          // 2x viewport scroll runway
  scrub: 0.5,                             // smoothing — 0 = instant, higher = laggier/smoother
  pin: true,
  onUpdate: ({ progress }) => {
    obj.frame = Math.floor(progress * (frameCount - 1));
    const img = images[obj.frame];
    if (img?.complete) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  },
});
```

`scrub` is the magic prop — gives Apple-grade smoothness with motion blur natural to the eye.

### Alternative — MP4 + currentTime scroll

```tsx
const video = document.getElementById('hero-video');
video.muted = true;
video.playsInline = true;

ScrollTrigger.create({
  trigger: '#hero-container',
  start: 'top top',
  end: '+=200%',
  scrub: 0.5,
  pin: true,
  onUpdate: ({ progress }) => {
    video.currentTime = progress * video.duration;
  },
});
```

**Tradeoffs:**
- MP4 = ~10× smaller file than PNG sequence
- BUT video codec decode stutters on weak CPUs
- iOS Safari requires `playsInline` + `muted` for autoplay; scroll-scrub still works but can be janky
- **For premium feel → PNG sequence + canvas. For lighter pages → MP4 + currentTime.**

---

## Common gotchas

| Symptom | Cause | Fix |
|---|---|---|
| **Flickering during render** | Animation driven by `useState` / `setTimeout` / `requestAnimationFrame` | Refactor to `useCurrentFrame()` + pure interpolate |
| **Audio missing in render** | Audio src is a remote URL not allowed by CORS | Host audio at same origin or set chromium CORS flag |
| **Render timeout 30s** | `delayRender` not closing or slow fetch | Increase `timeoutInMilliseconds` in render config OR move to `calculateMetadata` |
| **Lambda render fails silently** | Output > 5GB OR > 80 min | Split into chunks OR drop bitrate/resolution |
| **Composition shows blank in Studio** | Component throwing error → React boundary swallows | Open browser devtools in Studio, check console |
| **Player stutters in browser** | Heavy compositions @ high fps | Lower fps to 24 OR add `useMemo` to expensive children |
| **Hot reload not working** | TypeScript error blocking compile | Check terminal output of `npx remotion studio` |
| **`defaultProps` not updating in Studio** | Hot reload cached | Restart Studio process |
| **Image sequence missing frames** | Render crash mid-way | Check disk space; rerun with `--continue` flag |
| **Spring overshoots when you don't want it to** | Default config has overshoot | `overshootClamping: true` in config OR use `interpolate` instead |

---

## Performance tips

- **Lower fps when possible.** 24fps for cinematic feel saves 20% render time vs 30fps and is more film-like.
- **Concurrency:** `npx remotion render --concurrency=8` (default = CPU cores). Cloud Lambda: tune `framesPerLambda` (lower = more parallelism = faster + costlier).
- **Lazy-load heavy components** via `lazyComponent` prop on `<Composition>`.
- **Memoize derived values** that don't depend on frame: `const colors = useMemo(() => computeColors(), [])`.
- **Pre-render assets:** generate fonts/images/data in `calculateMetadata`, not per-frame.
- **Avoid `staticFile()` calls in render path** — call once at top of component.

---

## AI integration patterns

### TTS (text-to-speech) narration → video

```ts
// 1. In calculateMetadata, fetch TTS audio + transcript timing
calculateMetadata={async ({ props }) => {
  const tts = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST', headers: { Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({ model: 'tts-1', voice: 'nova', input: props.script }),
  });
  const audioBuffer = await tts.arrayBuffer();
  const audioUrl = await uploadToS3(audioBuffer);
  const wordTimings = await alignAudioToTranscript(audioBuffer, props.script);
  return {
    props: { ...props, audioUrl, wordTimings },
    durationInFrames: Math.ceil(audioBuffer.byteLength / 16000 / 4 * 30),
  };
}}

// 2. In the component, use audio + render captions at word timings
<Audio src={props.audioUrl} />
{props.wordTimings.map(({ word, frame, durationFrames }) => (
  <Sequence key={word} from={frame} durationInFrames={durationFrames}>
    <h2>{word}</h2>
  </Sequence>
))}
```

### AI-generated B-roll (Veo / Sora / Runway)

```ts
calculateMetadata={async ({ props }) => {
  const broll = await fetch('https://api.runwayml.com/...', { ... });
  return { props: { ...props, brollUrl: broll.url } };
}}
// then <Video src={props.brollUrl} /> in the component
```

### Use Cases for Renée's business

- **Faceless: Mothers content shorts** — script → TTS → Remotion auto-renders → upload. Pipeline doesn't need a human.
- **Client landing page hero videos** — generate brand-specific cinematic on a per-client basis from a template Composition + Lambda.
- **EquityMax mortgage explainer** — Renée's voiceover + animated diagrams of payments/equity/refinance flows.
- **Digital product builder previews** — auto-generate a 30-sec "your funnel in action" video per buyer.

---

## When to use Remotion vs alternatives

| Use case | Best tool |
|---|---|
| Programmatic + dynamic video per user | **Remotion** — React + props + Lambda |
| Cinematic landing-page hero scroll | **Remotion (PNG export) + canvas scroll OR GSAP ScrollTrigger + MP4** |
| Hand-edited brand video | Premiere / FCP / DaVinci |
| Simple scroll animations (no video) | GSAP ScrollTrigger + CSS / Framer Motion |
| 3D scenes in browser | Three.js / R3F / Spline (not Remotion) |
| Live streaming | OBS + WebRTC (not Remotion) |
| Quick TikTok / Reels with templates | CapCut / Canva |
| Bulk video output from JSON (e.g. 1000 product videos) | **Remotion + Lambda — exactly the killer use case** |

---

## Trigger keywords (load this skill when user says)

- Remotion · React video · programmatic video · automated video · video templates
- Cinematic scroll · Apple-style scroll · scrollytelling · scroll-driven video · PNG sequence scroll
- TTS narration + visuals · AI video pipeline · faceless content automation
- Per-customer video · dynamic video · video at scale · serverless video render

## Cross-references

- Sibling skill: `scroll-effect-website-builder.md` (GSAP + Lenis + ScrollTrigger patterns — pair with this for the scroll layer)
- Sibling skill: `animation-mastery.md` (motion principles, easing, timing)
- Sibling skill: `premium-3d-website-production.md` (R3F + Three.js for non-video 3D)
- Memory rule: `feedback_design_first_workflow.md` (design brief BEFORE code on UI work)

---

*Skill source: Official Remotion docs (remotion.dev) fetched 2026-06-02. Update when v5 ships or major API changes.*
