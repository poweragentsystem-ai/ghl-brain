# Design & Build Process — Websites, Apps, Landing Pages

## PURPOSE
Structured process for building any website, app, landing page, or digital product with premium design quality. Uses free tools, AI generation, and a research-first approach.

---

## PHASE 1: RESEARCH & INSPIRATION (before touching any code)

### Understand the Project
- What is the product/service? Know it deeply.
- Who is the target user? Age, tech comfort, device (phone vs desktop), what they care about.
- What's the goal? (lead capture, sales, booking, information, portfolio)
- What's the brand? (colors, fonts, tone, existing logo/assets)
- Does the client have an existing site? → review it, note what works vs what doesn't

### Gather Inspiration
- **Google Stitch** — paste a prompt describing the design you want + color scheme + reference URL if available. Get multiple variations.
- **21st.dev** — browse component library for pre-built React UI components
- **p.superdesign.dev/library** — copy design prompts for animated backgrounds, hero sections, effects
- **v0.dev** — generate UI from prompts (free tier)
- **Dribbble / Behance** — search for the niche (e.g., "mortgage landing page", "dental website") to see what top designers are doing
- **Competitor sites** — Ryan (Research) pulls the top 10 sites in the client's niche

### Gather Visual Assets (free tools)
- **Gemini (via Gmail)** — generate photorealistic images. Prompt structure:
  - "Create a 3D hyper-realistic photo of [subject] on a [background], shot from [angle]. Cinematic lighting, 8K quality."
  - Generate 5 angles: front, side, slight up view, slight down view, back
  - Use for: hero images, product shots, team photos, background textures
- **OpenArt.ai** — stylized images, Flux/SDXL quality, free tier
- **Remove.bg** — remove backgrounds from images (free)
- **Photopea.com** — free Photoshop alternative for editing images in browser

---

## PHASE 1B: PLAN (after research, before design)

### Map the System Back-to-Front
- Start at the desired end result → work backwards to step 1
- For each user type (admin, business owner, lead/client), map their unique journey
- Identify every decision point: what happens at each fork?

### Backend Architecture
- What data needs to flow where?
- Which workflows connect to which forms, tags, pipelines?
- Which integrations are needed? (Stripe, calendar, email, voice AI, CRM)
- How does each user type interact with the backend differently?

### UX Decision Framework
Before building any interface element, ask:
- Should this be a **button** (one-time action, important, visible)?
- Should this be a **dropdown** (selection from list, saves space)?
- Should this be on a **separate page** (complex, needs focus, has its own workflow)?
- Should this be a **modal** (quick action without leaving context)?
- Should this be **inline** (small edit, no disruption)?
- Should this **auto-populate** (data we already have, don't ask twice)?

### Competitor Remix
- Ryan (Research) pulls 5-10 competitor/similar sites in the same niche
- For each: what do they do well? What's missing? What's annoying?
- Take the BEST elements from each, combine into something better
- Never copy — remix and improve

### Layout Principles
- Not cramped — generous whitespace, breathing room between sections
- Clear visual hierarchy — most important info biggest/boldest, supporting info smaller
- One primary CTA per page/screen — don't confuse with 5 buttons
- Mobile-first — design for 375px width first, then scale up
- Scannable — user should understand the page in 3 seconds without reading

## PHASE 2: DESIGN (before writing code)

### Create the Design
1. Take inspiration + assets to **Google Stitch**
2. Provide Stitch with:
   - Description of what the site/page should do
   - Color scheme (hex codes if available, or describe the mood)
   - Reference URL to copy layout from (if client has existing site or competitor to reference)
   - Upload generated images if relevant
   - Font preferences (or let Stitch recommend)
3. Get the HTML/CSS output from Stitch
4. Review in browser — is it mobile-friendly? Does the CTA stand out? Is it scannable?

### For 3D Scrolling Websites (premium feel)
1. **Generate the hero image sequence:**
   - Use Gemini to create the start frame: "3D hyper-realistic [subject], front view, cinematic lighting, 8K"
   - Create the end frame: same subject, different angle/state
   - Generate 10-30 intermediate frames at progressive angles between start and end
   - Each frame slightly rotates/moves the camera

2. **Implement the scroll animation:**
   - Load all frames as an image sequence
   - On scroll: swap frames based on scroll position (like Apple product pages)
   - Use `IntersectionObserver` or scroll event listeners
   - Example: car website → Maybach rotates 360° as user scrolls
   - Libraries: GSAP ScrollTrigger (free), Lenis for smooth scroll

3. **Alternative: CSS/Three.js 3D objects**
   - Use Three.js for interactive 3D models
   - Design components available: Tubes Interactive, Parallax Stars, Gradient Blinds (in XpertVault/design-library/)
   - Spline (spline.design) for visual 3D scene building → export to React

### For GHL Websites/Funnels
1. Build the design externally first (Stitch, v0, Claude artifact)
2. Recreate in GHL's page builder — or use custom code sections to paste HTML/CSS
3. Ensure GHL forms are connected to the right workflows
4. All text uses custom values: {{custom_values.company_name}}, {{custom_values.user_full_name}}, etc.
5. Mobile-responsive check — GHL has a mobile preview toggle, USE IT

---

## PHASE 3: BUILD (code it)

### Build Order
1. **Backend/data first** — custom fields, values, API connections, database
2. **Logic second** — workflows, automations, conditionals, routing
3. **Frontend third** — pages, forms, UI components
4. **Content last** — copy, images, videos

### Build + Test Each Step (Emergent-style)
- Build ONE component → test it immediately → confirm it works → move on
- Never build 10 things and test at the end
- After each component:
  - Does the data flow correctly?
  - Does it render on mobile?
  - Does the CTA work?
  - Is the custom value resolving?
  - Would a real user understand this?

### Use AI Builders First
- GHL AI Studio → Build with AI for agents/automations
- v0.dev for React UI generation
- Stitch for full page designs
- Claude Code for React/Tailwind components
- Let AI do 80%, review and refine 20%

---

## PHASE 4: IMAGE & VIDEO EDITING (free tools)

### When You Need to Edit Images
- **Photopea.com** — full Photoshop alternative, free, runs in browser
- **Remove.bg** — background removal
- **Upscayl** — AI upscaling (if image is low resolution)
- **Gemini** — regenerate with adjustments if the original isn't right

### When You Need Video
- **Gemini / Veo** — video generation from prompts (when available)
- **CapCut (free tier)** — video editing
- **Canva (free tier)** — quick video/image templates
- **For 3D scroll effect:** image sequence + scroll-triggered frame swap (no video needed)

---

## PHASE 5: REVIEW & QA

### Design QA Checklist
- [ ] Mobile-first: looks great on phone (test at 375px width)
- [ ] CTA above the fold — user doesn't have to scroll to find the action
- [ ] Loading speed: no images over 500KB, lazy load below-fold content
- [ ] Text is readable: min 16px body, sufficient contrast
- [ ] Forms are short: only ask what's needed at this stage
- [ ] Brand consistency: colors, fonts, tone match across all pages
- [ ] Custom values: zero hardcoded names/companies/niches
- [ ] Compliance footer: FSRA/CASL where applicable
- [ ] Links work: every button/link goes somewhere real
- [ ] 404 page: exists and is helpful, not default
- [ ] Favicon: set, not default GHL/browser icon
- [ ] Open Graph meta: share preview looks right on social media
- [ ] Analytics: Google Analytics or GHL tracking connected

### Use the System Walkthrough (system-walkthrough.md)
Walk the full 5-perspective check before declaring done.

---

## PHASE 6: DEPLOY

### Vercel (React apps, dashboards, Command Center)
- `npm run build` → `npx vercel --prod`
- Alias to canonical URL
- Test the live URL on phone

### GHL (funnels, landing pages, client sites)
- Publish in GHL funnel/website builder
- Connect custom domain
- Test all forms submit correctly
- Test on mobile

### GitHub (wholesale app, other repos)
- Push to main branch
- Deploy via Vercel or Render connected to repo
- Test the deployed URL

---

## TOOLS REFERENCE (all free)

| Tool | What For | URL |
|---|---|---|
| Google Stitch | Full page design from prompt | stitch.withgoogle.com |
| 21st.dev | Pre-built React components | 21st.dev |
| SuperDesign | Design prompt library | p.superdesign.dev/library |
| v0.dev | UI generation from prompts | v0.dev |
| Gemini | Photorealistic image generation | gemini.google.com |
| OpenArt.ai | Stylized image generation | openart.ai |
| Photopea | Image editing (Photoshop alternative) | photopea.com |
| Remove.bg | Background removal | remove.bg |
| Canva | Quick templates, video | canva.com |
| GSAP ScrollTrigger | Scroll animations | gsap.com |
| Spline | 3D scene building | spline.design |
| Three.js | 3D rendering in browser | threejs.org |
| Figma (free) | UI design/prototyping | figma.com |

---

## AGENTS INVOLVED

| Agent | Role in this process |
|---|---|
| Allan (Creative) | Visual direction, brand consistency, design review |
| Lex (Copy) | All text content — headlines, CTAs, body copy, email copy |
| Finley (Funnels) | Landing page strategy, conversion optimization, CTA psychology |
| Devon (Systems) | Technical build, deployment, integrations |
| Gill (GHL) | GHL page builder, form connections, funnel setup |
| Ryan (Research) | Competitor site analysis, niche inspiration |
| Quinn (QA) | Design QA checklist, mobile testing, link testing |
| Mark (Marketing) | Campaign strategy, ad creative direction |
