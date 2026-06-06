# Scroll-Effect Website Builder — Playbook

**Owner agents:** Allan (Creative Direction) + Devon (Systems) + Lex (Copy that survives scroll choreography)
**Last updated:** 2026-05-01
**When to load:** any "scroll site / cinematic scroll / scroll animation / parallax / Apple-style scroll / Stripe-style scroll / horizontal scroll / scroll story" task. Load BEFORE picking a stack or drafting copy — the scroll architecture decides what copy can survive on each section.

---

## Why this skill exists

Two prior failures it prevents:
- **AI-slop scroll site** — generic fade-in-on-scroll on every section, no choreography, no story arc. Looks like every Webflow template since 2019.
- **Wrong stack for the effect** — picking Framer Motion when the brief needed scroll-pinned video scrubbing (GSAP ScrollTrigger), or picking R3F when the brief was a 2D editorial scroll (overkill, kills LCP).

The skill is a decision tree, not a tutorial.

---

## DECISION TREE — what kind of scroll site is this?

Before writing code, classify the brief into ONE of these archetypes. Mismatch = rebuild.

| Archetype | What it looks like | Reference site | Stack to reach for |
|---|---|---|---|
| **Editorial fade-in** | Long-form copy + images, gentle reveal on scroll | Most Medium-tier brand sites | Framer Motion + Intersection Observer. 1 day. |
| **Sticky-section reveal** | Section pins, content swaps inside the pinned frame as you scroll | stripe.com, linear.app | GSAP ScrollTrigger + pin. 2-3 days. |
| **Horizontal scroll panel** | Vertical scroll drives horizontal motion through 3-5 panels | apple.com (older Mac pages), igloo.inc | GSAP ScrollTrigger horizontal section. 2-3 days. |
| **Scroll-scrubbed video/image-sequence** | Scrolling scrubs through a pre-rendered video or image sequence frame-by-frame | apple.com/iphone, applemvp scroll-scrubber demos | Image sequence + canvas + ScrollTrigger. 3-5 days. Use Apple's image-sequence trick, NOT a real video — 60 jpg frames at 1920px = smoother than mp4 scrub. |
| **3D scroll camera** | Scroll moves a camera through a 3D scene | bruno-simon.com, lusion.co | R3F + drei `<ScrollControls>` + GSAP. 5-10 days. Heavy. Only when 3D is the brand. |
| **Cinematic editorial** | Mix of pinned sections, parallax layers, scroll-driven type, video bg | igloo.inc, the-yard.studio | GSAP + Lenis + Framer Motion combo. 5-7 days. Most common premium ask. |
| **Scroll-snap + scroll-jacked story** | Discrete "slides" snap as you scroll | Many product launch microsites | CSS `scroll-snap-type` for simple, GSAP for complex transitions. 2 days. |
| **Scrollytelling data-viz** | Charts/maps update as you scroll | NYT Upshot, Pudding | Scrollama.js or in-house Intersection Observer + D3. 5-10 days. |

**Default for Renée's premium client work:** Cinematic editorial (row 6). Default for Renée's mortgage/real-estate landing pages: Sticky-section reveal (row 2). Default for snapshot landing pages: Editorial fade-in (row 1) — keep it lightweight.

---

## STACK — what to install (pinned versions, 2026-05)

### The core 3 libraries

```json
{
  "dependencies": {
    "gsap": "^3.12.5",
    "@gsap/react": "^2.1.1",
    "lenis": "^1.1.20",
    "framer-motion": "^11.18.2"
  }
}
```

- **GSAP 3.12+** — has free ScrollTrigger plugin. 3.13 alpha exists but ship on 3.12 stable.
- **@gsap/react** — official `useGSAP` hook. Replaces manual cleanup. Mandatory in React.
- **Lenis 1.1+** — smooth-scroll lib. Smaller + faster than Locomotive Scroll. Renamed from `@studio-freight/lenis` in 2024.
- **Framer Motion 11+** — for layout animations, AnimatePresence transitions, NOT for scroll-pinning (use GSAP).

### Optional add-ons by archetype

```json
{
  "@react-three/fiber": "^8.17.10",
  "@react-three/drei": "^9.122.0",
  "split-type": "^0.3.4"
}
```

- **R3F + drei (3D scroll camera only)** — pin to v8 / v9 for React 18 compat. v9/v10 of fiber wants React 19 and breaks silently. Burned on this 2026-04-29.
- **split-type** — splits text into chars/words/lines for staggered scroll-text reveals. Free, lightweight, replaces SplitText (paid GSAP plugin) for 80% of cases.

### Banned for Renée's stack

- **Locomotive Scroll** — abandoned-ish, replaced by Lenis. Don't propose.
- **AOS (Animate On Scroll)** — too generic, looks like a 2017 portfolio site.
- **ScrollMagic** — old GSAP wrapper, ScrollTrigger is the modern path.
- **react-spring** — fine library, but redundant with Framer Motion in our stack. Pick one.

---

## VERSION-DISCIPLINE GOTCHAS — burned on these, never again

| Gotcha | What breaks | Fix |
|---|---|---|
| GSAP 3.13 alpha + ScrollTrigger | Pin events fire twice in StrictMode | Stay on 3.12.5 stable |
| @react-three/fiber v9 + React 18 | Silent crash, blank canvas | Pin fiber@^8.17.10 and drei@^9.122.0. Burned on Assistlet hero 2026-04-29 |
| Lenis + window.scrollTo() | `scrollTo` jumps, breaking smooth-scroll | Use `lenis.scrollTo(target)` instead, never `window.scrollTo` |
| GSAP ScrollTrigger + React 18 StrictMode | Triggers register twice in dev | Use `useGSAP({ scope })` from @gsap/react, NEVER raw useEffect |
| iOS momentum scroll + Lenis | Janky on iOS Safari | `lerp: 0.1` minimum, test on real device, fall back to native scroll on iOS if jank persists |
| Pinned section + `position: sticky` | They fight each other | Pick ONE per section. GSAP pin OR CSS sticky, never both. |
| ScrollTrigger inside Next.js App Router | SSR mismatch | `'use client'` directive + dynamic import the component |
| Image sequence > 120 frames | LCP collapses | Cap at 60 frames at 1920px wide, JPEG quality 70. The Apple iPhone page uses ~120 but they preload — most builds shouldn't. |

---

## CHOREOGRAPHY PATTERNS — copy-paste starting points

### Pattern 1: Sticky-section reveal (most common)

Use case: hero section pins, headlines swap as you scroll, then unpins to next section.

```jsx
'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StickyReveal() {
  const root = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.pin-wrap',
        start: 'top top',
        end: '+=2000',
        pin: true,
        scrub: 1,
      }
    });
    tl.to('.h1', { opacity: 0, y: -40 })
      .from('.h2', { opacity: 0, y: 40 })
      .to('.h2', { opacity: 0, y: -40 })
      .from('.h3', { opacity: 0, y: 40 });
  }, { scope: root });

  return (
    <section ref={root}>
      <div className="pin-wrap min-h-screen flex items-center justify-center">
        <h1 className="h1 absolute">First message</h1>
        <h1 className="h2 absolute">Second message</h1>
        <h1 className="h3 absolute">Third message</h1>
      </div>
    </section>
  );
}
```

### Pattern 2: Horizontal scroll panel

Use case: 3-5 product/feature panels scroll horizontally, driven by vertical scroll.

```jsx
useGSAP(() => {
  const panels = gsap.utils.toArray('.panel');
  gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.h-scroll',
      pin: true,
      scrub: 1,
      end: () => '+=' + document.querySelector('.h-scroll').offsetWidth,
    }
  });
}, { scope: root });
```

### Pattern 3: Scroll-scrubbed image sequence (Apple-style)

Use case: hero scrubs through 60-120 frames as user scrolls, no real video.

```jsx
const canvas = useRef();
const totalFrames = 60;
const images = [];

useEffect(() => {
  for (let i = 1; i <= totalFrames; i++) {
    const img = new Image();
    img.src = `/seq/frame-${String(i).padStart(3, '0')}.jpg`;
    images.push(img);
  }
}, []);

useGSAP(() => {
  const obj = { frame: 0 };
  gsap.to(obj, {
    frame: totalFrames - 1,
    snap: 'frame',
    scrollTrigger: {
      trigger: canvas.current,
      start: 'top top',
      end: '+=3000',
      scrub: 0.5,
      pin: true,
    },
    onUpdate: () => render(obj.frame),
  });
});

function render(frame) {
  const ctx = canvas.current.getContext('2d');
  ctx.drawImage(images[Math.floor(frame)], 0, 0);
}
```

### Pattern 4: Lenis smooth scroll wrapper

Mount once at app root. Everything else inherits smooth scroll.

```jsx
'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
  return children;
}
```

Then in `_app.jsx` or `layout.jsx`:
```jsx
<SmoothScroll>{children}</SmoothScroll>
```

### Pattern 5: Scroll-linked text reveal (split-type + GSAP)

```jsx
import SplitType from 'split-type';

useGSAP(() => {
  const split = new SplitType('.headline', { types: 'words,chars' });
  gsap.from(split.chars, {
    yPercent: 100,
    opacity: 0,
    stagger: 0.02,
    scrollTrigger: { trigger: '.headline', start: 'top 80%' }
  });
}, { scope: root });
```

---

## REFERENCE TIER LIST — what to study before drafting

Pattern-match to the brief, then study the corresponding reference. Don't propose anything I haven't checked the reference for.

### Tasteful editorial (lowest tier — Renée's snapshot landing pages)
- mochi.health (clean type + parallax)
- linear.app (sticky section reveal, restrained)
- Most Stripe sub-pages (gentle scroll triggers, the gold standard for "premium without trying too hard")

### Cinematic premium (most common Renée brief)
- igloo.inc (every page, world-class scroll choreography)
- the-yard.studio (cinematic editorial)
- studiofeixen.ch (editorial type + scroll)
- 14islands.com (sticky-section storytelling)

### Scroll-scrubbed video/sequence
- apple.com/iphone (the canonical reference — 120-frame sequence)
- applemvp scroll-scrubber demos on CodePen
- bose.com/qc-ultra (recent 2024-2025 Apple-clone)

### 3D scroll camera (heavy — only when justified)
- bruno-simon.com (his portfolio)
- lusion.co (agency site)
- gucci.com/equilibrium (rare, but exemplary)

### Horizontal scroll
- monopo.london
- Older apple.com/mac pages (they pulled back from this in 2024)

**Rule:** before quoting a price or an ETA, name the reference tier. "Cinematic premium, igloo-tier" sets a real expectation. "Premium scroll site" sets none.

---

## BUILD-TIER MATRIX — what each tier costs in time

| Tier | Time | Tools | Stack |
|---|---|---|---|
| Tasteful editorial | 1-2 days | Framer Motion + Intersection Observer | React + Tailwind |
| Sticky-section reveal | 2-3 days | GSAP ScrollTrigger + Lenis | React + Tailwind |
| Horizontal scroll | 2-3 days | GSAP ScrollTrigger pin | React + Tailwind |
| Scroll-scrubbed sequence | 3-5 days | GSAP + image sequence + canvas | + asset gen for sequence (Whisk/Veo or Blender) |
| Cinematic editorial | 5-7 days | GSAP + Lenis + Framer Motion + split-type | + Whisk/Veo for bg video |
| 3D scroll camera | 5-10 days | R3F + drei `<ScrollControls>` + GSAP | + 3D asset prep |
| Scrollytelling data-viz | 5-10 days | Scrollama + D3 | + data pipeline |

Add 1-2 days for copy + 1 day for compliance review (if Renée brief).

---

## COPY THAT SURVIVES SCROLL CHOREOGRAPHY

Lex rule: scroll choreography eats short copy and chokes on long copy.

- **Pinned sticky-reveal sections** → 1 headline + 1 sub (2 lines max each). Choreography is the show; copy is the caption.
- **Horizontal panels** → 1 headline + 3 bullets per panel max. Reader is moving sideways, can't dwell.
- **Scroll-scrubbed sequence** → headline OVER the sequence, body copy AFTER it ends. Don't compete with motion.
- **Editorial fade-in** → full body copy fine, but break paragraphs into 2-3 sentence blocks. Walls of text on scroll = abandoned.
- **3D scroll camera** → label-only copy (1-3 words per beat). The 3D is the message.

If the copy doesn't fit those rules, the choreography is wrong for the message OR the message is wrong for the choreography. Stop. Pick one and rebuild around it.

---

## COMPLIANCE GOTCHAS (Renée-specific)

- **FSRA mortgage scroll sites** → every regulated claim must be visible WITHOUT scrolling on at least one section (FSRA "prominent disclosure" rule). Don't bury licence number / brokerage name in a 7th-section scroll-reveal.
- **CASL email captures on scroll sites** → consent checkbox must be visible at the moment of capture, NOT scrolled past. The scroll-pinned form pattern works ONLY if the consent line lives inside the pinned frame.
- **Performance** → premium scroll sites kill LCP. Renée's leads see "AI consultant with broken site" if hero takes 4s. Cap LCP at 2.5s by lazy-loading sequence frames + Lenis below the fold.

---

## QA CHECKLIST — run before declaring scroll site done

| Check | Why |
|---|---|
| Real iPhone test | iOS momentum scroll fights Lenis. Has to feel native. |
| Real Android test | Different jank profile than iOS. |
| Slow 3G throttle in Chrome DevTools | Premium scroll sites = giant assets. Test the worst case. |
| Reduced motion on (`prefers-reduced-motion: reduce`) | Required for accessibility. Scroll-scrubbing should fall back to static. |
| Keyboard navigation | Tab through every CTA. Pinned sections often trap keyboard focus. |
| Refresh mid-scroll | Lenis + ScrollTrigger sometimes desync after refresh. Should self-correct. |
| Resize during scroll | ScrollTrigger.refresh() must run on window resize, or pin offsets drift. |
| Fast scroll (mash trackpad) | Animations should skip-to-end gracefully, not get stuck mid-tween. |
| Full-page screenshot test | Visual regression catch — easy to break a section while polishing another. |
| Lighthouse score | LCP < 2.5s, CLS < 0.1, INP < 200ms. Below those = not premium. |

---

## "BUILD WITHOUT WRITING IT" SHORTCUTS

When the brief is "make it look like X" and X is a known reference, these shortcuts cut 60-80% of the work:

1. **motionsites.ai** — paste the reference URL, get a Tailwind + GSAP starting template. ~$29/template. Saves 1-2 days. Use this BEFORE writing scroll code from scratch.
2. **Claude Design** (claude.ai/design or via API) — feed the motionsites template + Renée's brand brief, get a customized design in your colors/copy. ~30 min.
3. **Whisk + Veo** (Google's image+video gen) — for cinematic editorial bg videos when you can't shoot. ~10 min per scene.
4. **GSAP CodePen scroll patterns** — every pattern in this file has 5+ working CodePens. Search "GSAP ScrollTrigger [pattern]" before writing from scratch.
5. **react-bits.dev / hover.dev** — copy-paste scroll components, MIT licensed. Drop into Tailwind project as-is.
6. **drei `<ScrollControls>`** for 3D scroll camera — saves writing 200 lines of scroll-camera math.

The Approach G recipe (motionsites → Claude Design → Whisk → integration → deploy) covered in `animation-mastery.md` is the canonical path for cinematic premium briefs. 90-180 min vs 5-7 days hand-coded.

---

## RED FLAGS — when the brief is wrong

If the brief contains any of these, push back before building:

- "Make it like apple.com but in 2 days" → impossible, image-sequence prep alone is 2 days. Negotiate scope down to sticky-reveal.
- "Add scroll animations to existing site" → retro-fitting Lenis + ScrollTrigger to a built site = often more work than starting fresh. Quote accordingly.
- "Same as competitor X" without naming the choreography pattern → ask which section of X they mean. "Scroll site" = 8 different things.
- "Premium feel, $500 budget" → cinematic editorial doesn't exist at that budget. Tasteful editorial is the answer; reset expectations.
- "Make it match our brand" but the brand has zero motion identity yet → motion brand has to come FIRST, scroll choreography second. Loop in Allan.
- "Should work on IE11" → no. IE is dead, nobody uses it, refuse.

---

## FUTURE-WATCH — what's coming

- **CSS Scroll-Driven Animations** (`animation-timeline: scroll()`) — landed in Chrome 115, Firefox 137. Replaces ~30% of GSAP ScrollTrigger work for simple cases. Watch for Safari support, then partial-replace.
- **CSS View Transitions API** for page transitions — landing 2025-2026, will replace Framer Motion `<AnimatePresence>` for page changes.
- **WebGPU + R3F** — 3D scroll cameras getting cheaper to render. Watch drei v10 for stable WebGPU support.
- **HTML `popover` + `anchor()`** — kills 50% of `position: absolute` math for scroll-anchored UI.

Re-check this section every 6 months. If 3 things shipped to all browsers, rewrite the stack section.

---

## WHEN TO LOAD THIS SKILL

- "Scroll site / cinematic site / parallax site / Apple-style scroll / Stripe-style"
- Any premium agency client brief
- Mortgage commercial redesign (saved hero spec)
- Any AI-twin landing page tier
- Any Whisk/Veo video integration
- Whenever Allan's design refs include words "cinematic / editorial / immersive / scroll / pinned / horizontal / scrubbed"

When loaded, write a `🎯 STAKES` line, classify the archetype from the decision tree FIRST, name the reference site, name the stack, name the time tier — THEN start the design or code.
