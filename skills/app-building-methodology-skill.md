# APP BUILDING METHODOLOGY SKILL
### For: Devon (Systems), Gill (GHL), Norm (n8n), any agent involved in building or scoping apps

---

## WHAT THIS SKILL IS

This skill defines how Xpert Web Solutions approaches building any app, platform, or digital product — from first idea to launch. It prevents the most common mistake: jumping straight to building without planning. Every app we build follows this 10-phase sequence. No phase is skipped.

---

## THE GOLDEN RULE

Never say "build me an app." Always define the idea, users, problem, platform, and skill level first. Weak input produces weak output. Every build starts with a complete brief.

## PROFESSIONAL BASICS — BUILT INTO EVERY BUILD, NEVER ASKED FOR
These are non-negotiable on every build. If any is missing, it's a failure:
- **Mobile-first** — design for phone screens first, desktop second. Most users are on mobile.
- **Human tone** — all user-facing text sounds like a person, not a system (see message-tone.md)
- **Dark theme** — default on all dashboards and internal tools
- **Fast loading** — no bloated images, lazy load where possible, optimize for 3G
- **Accessible** — min 44px tap targets, readable contrast, logical tab order
- **Error states** — every form has clear error messages, every API call has a fallback
- **Empty states** — show helpful guidance when a section has no data, not just "No data"
- **Loading states** — skeleton screens or spinners, never a frozen UI
- **Security** — no API keys in frontend code, no user data in URLs, no XSS opportunities
- **Custom values over hardcoded** — every client-specific text is a variable, not typed in
- **Compliance** — CASL, PIPEDA, FSRA where applicable. Privacy policy + terms links.
- **Feedback** — user knows when an action succeeded or failed (toast notifications, color changes)
- **Don't block, do remind** — if user is missing Stripe, business registration, or compliance setup, show reminders/nudges but let them keep using the system. Our T&C covers us. Never gatekeep progress behind setup they might not have yet.
- **Onboarding nudges** — settings page checklists, tooltips, and gentle banners guide setup without forcing it

After every major planning output, add:
"Now improve this for a real production app. Be more specific, more opinionated, and show tradeoffs."

That single line upgrades output quality significantly.

---

## THE 10-PHASE BUILD SEQUENCE

### PHASE 1 — App Plan
Before any design or code, produce a complete app plan covering:
- Core features vs nice-to-have features
- User flow from signup to main action
- Recommended tech stack
- Backend needs
- APIs required
- Monetization options
- MVP scope for version 1
- What to avoid building at the start

Role: Senior mobile product manager + staff mobile engineer. Keep it practical, lean, and beginner-friendly.

---

### PHASE 2 — Screen Design (Before Coding)
Map every screen before writing a single line of code. For each screen:
- Screen name and purpose
- UI elements needed
- Actions the user can take
- Empty states
- Error states
- Recommended navigation pattern
- Microcopy for buttons, placeholders, and alerts

Also define how to keep the UI clean, modern, and easy for first-time users.

Role: Senior mobile UX designer.

---

### PHASE 3 — Full User Flow
Map the complete end-to-end user journey including:
- First-time user flow
- Onboarding flow
- Signup/login flow
- Main task flow
- Returning user flow
- Notification re-entry flow
- Upgrade/paywall flow if relevant
- Drop-off risks at each stage
- Suggestions to reduce friction

Output as a step-by-step flow usable directly in product design and development.

Role: Senior mobile UX strategist.

---

### PHASE 4 — Technical Architecture
Before coding, define the architecture for long-term scalability:
- Folder structure
- State management choice
- Navigation setup
- API layer structure
- Auth handling
- Local storage strategy
- Environment config
- Error handling
- Analytics hooks
- Testing structure

Explain why each choice is appropriate for a real-world production app.

Role: Senior mobile architect.

---

### PHASE 5 — Product Requirements Document (PRD)
Write a concise but high-quality PRD covering:
- Product summary
- User persona
- Problem statement
- Goals and non-goals
- Key features
- User stories
- Functional requirements
- Edge cases
- Success metrics
- Launch risks
- MVP definition

Format for sharing with designers, developers, or investors.

Role: Senior product manager.

---

### PHASE 6 — Component System
Break every screen into reusable components. For each component:
- Component name
- Where it is used
- Props or inputs
- States
- Validation needs
- Accessibility notes
- Animation ideas
- Common mistakes to avoid

Organize into a reusable design system for fast development.

Role: Senior mobile UI engineer.

---

### PHASE 7 — Starter Code
Generate clean, production-ready starter code with:
- Clean and modular structure
- Production-style folder organization
- Comments only where helpful
- Reusable components
- Loading, empty, and error states
- Mock data for preview and testing
- Good naming conventions
- Easy to extend

After code output: explain how each file works and what to build next.

Role: Senior mobile engineer.

---

### PHASE 8 — Backend and API Plan
Create a backend plan optimized for mobile including:
- Database entities and relationships
- Auth system
- API endpoints with request/response examples
- File upload handling
- Push notification flow
- Subscription/payment logic if needed
- Admin panel needs
- Security best practices
- Scalable hosting options

Keep structure simple but real-world ready.

Role: Senior backend architect for mobile apps.

---

### PHASE 9 — Debugging Protocol
When a bug is reported, always provide:
- Root cause identification
- Bug explanation in plain English
- Exact fix with rewritten code
- Prevention strategy
- Quick tests to run after the fix

Never just say "try this." Show the exact fix and explain why it works.

Role: Senior mobile debugging expert.

---

### PHASE 10 — Launch Checklist
Before any app goes live, produce a pre-launch checklist covering:
- Performance checks
- Crash monitoring setup
- Analytics events
- Onboarding review
- Subscription/paywall checks
- App Store / Play Store asset checklist
- App description draft
- Screenshot ideas
- Privacy policy needs
- QA scenarios
- Post-launch metrics to track in week 1

Detailed enough to use as the official launch document.

Role: Senior mobile launch strategist.

---

## HOW AGENTS USE THIS SKILL

**When scoping a new app or digital product:**
Run through Phases 1–5 before any building begins. Present the plan to Renée for approval before Phase 6 onwards.

**When building:**
Phases 6–8 are the build phases. Never skip architecture (Phase 4) to get to code faster. Bad architecture costs double — once to build wrong, once to rebuild.

**When something breaks:**
Phase 9 protocol applies. Always identify root cause before fixing. Never apply a patch without understanding why the bug occurred.

**Before launch:**
Phase 10 is mandatory. Quinn runs the checklist. Nothing ships without it.

---

## BUILD-AND-TEST CHECKPOINTS — MANDATORY

Testing happens during the build, not after. After each phase gate:

| Gate | What to test before moving on |
|---|---|
| After Phase 1 (Plan) | Verify: no missing dependencies, no tech stack conflicts, no scope gaps |
| After Phase 4 (Architecture) | Verify: folder structure exists, state management wired up, no circular dependencies |
| After Phase 7 (Starter Code) | Run build — must be clean. Check every screen renders without errors. Test empty/error states. |
| After Phase 8 (Backend/API) | Test each endpoint manually. Confirm auth, data shape, and error responses work before wiring to frontend. |
| After each new component | Compile check. Does it render? Does it accept props without crashing? Edge cases handled? |
| After each bug fix | Re-run the exact failing scenario to confirm the fix works. |

**Rule:** A failing build or broken logic stops all forward progress. Fix in place, then continue. Never carry known bugs forward.

**For the Digital Product Builder SaaS specifically:**
This entire 10-phase system IS the build methodology for the platform. The platform itself should guide clients through a simplified version of Phases 1, 2, 3, and 10 — the AI handles the rest automatically.

---

## QUALITY STANDARD

Every app or digital product built under Xpert Web Solutions must meet this bar:
- Production-style code — not tutorial code
- Every screen has empty state, error state, and loading state handled
- Mobile-first always
- Dark theme on dashboards, clean light theme on client-facing products
- No placeholder text in anything that ships
- Quinn signs off before anything goes live
- Pixel audits the user journey before launch
