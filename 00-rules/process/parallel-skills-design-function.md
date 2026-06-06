# PROCESS — Parallel Skills (Design + Function Always Together) + Council Departments

**Rule established:** Renée 2026-05-13 — *"anytime you build anything you need to look at your design skills. anytime you have to write or think of what to say you rely on your writing skills. if making a funnel you rely on those. if planning how to execute you can look at alex hormozi and use the billion dollar council. place each council in the right department. use their opinion toward your own. you need to program yourself that when you make things you should prioritize design as much as functionality."*

---

## The core rule

**Design and function are NOT sequential — they are parallel.** Every build/draft/plan must load BOTH the functional skill AND the relevant design/voice/strategy skill BEFORE writing a single line. Then keep them in equal weight throughout.

The default failure mode: ship function first, treat design as polish. That produces ugly software, generic copy, unstrategic plans. Function-first is engineering thinking — appropriate for backends, wrong for anything humans touch.

**The fix:** parallel skill loading at task start + visible 🧠 SKILLS LOADED line that includes BOTH dimensions, not just the functional one.

---

## Council ↔ Department mapping

When the task fires, consult these by domain. Don't just defer — integrate their lens with my own thinking.

### Offer design / pricing / value stacking
- **Alex Hormozi** — value equation, irresistible offers, guarantee design
- **Dan Kennedy** — premium pricing, "why charge less?" lens
- **Mike Michalowicz** — profit first, take profit BEFORE expenses
- **Internal:** Kai (offer design agent)

### Marketing strategy / positioning / brand
- **Russell Brunson** — value ladder, hook-story-offer, Soap Opera sequences
- **Seth Godin** — remarkable vs fitting in, tribes, purple cow
- **Gary Vaynerchuk** — Jab-Jab-Jab-Right-Hook (give 99x before asking once)
- **Internal:** Mark (marketing agent)

### Sales / closing / objection handling
- **Jordan Belfort** — certainty triad (product/me/company on 1-10 scale)
- **Grant Cardone** — 10× rule, follow up persistently
- **Internal:** Sam (sales agent), high-ticket-closer.md skill

### Copy / writing / messaging tone
- **Russell Brunson** — Soap Opera Sequences for email
- **Seth Godin** — remarkable language, no buzzwords
- **Lex (internal copy agent)** — must be loaded for ALL writing tasks
- Banned-word list lives in Renée's profile (no canonical/schema/atomic/scaffold/etc.)

### Visual design / UI / layout / cinematic builds
- **Allan (internal creative director)** — must be loaded for all visual work
- **UI/UX Pro Max skill** (161 styles, 161 palettes, 57 fonts, 99 UX guidelines)
- **Don Norman** — affordances, signifiers, design of everyday things
- **Dieter Rams** — 10 principles (less but better, useful, honest, unobtrusive)
- For scroll/3D/cinematic: scroll-effect-website-builder.md + animation-mastery.md + premium-3d-website-production.md

### Compliance / legal / regulatory
- **Connor (compliance agent)** — FSRA/CASL/PIPEDA/CRTC/MBLAA expert
- **Lindsay (legal agent)** — contracts, T&C, IP
- Skills: fsra-mortgage-advertising-compliance.md, easy-deploy-legal-disclaimer.md

### Execution planning / strategy / pivots
- **Charlie Munger** — invert: what would guarantee failure? avoid that.
- **Gary Vee** — long game patience, audience first
- **Tony Robbins** — state management, leverage
- **Internal:** Jordan (COO), Brian (strategy)

### Mortgage / FSRA / lender work
- **Morgan (mortgage assistant agent)** — Canadian mortgage qualification, LTV rules
- **Ryan (research agent)** — pulls authoritative sources (FSRA / CMHC / Bank of Canada / CMBA / lenders)
- **Connor** — compliance overlay
- Skills: morgan-mortgage.md, mortgage-sales-writing.md, lead-lifecycle-architecture.md

### Funnel building / landing pages / lead capture
- **Russell Brunson** — value ladder + funnel hacker mindset
- **Internal:** funnel-building-master/process.md (per-step playbook)
- **Allan** — visual design pass
- **Lex** — copy pass

### Voice AI / phone agents / call flows
- **Vick (voice AI agent)** — voice agent expertise
- **Lex** — conversational copy
- **Connor** — compliance disclosure language
- Skills: elevenlabs-tts-setup.md

### Email / SMS campaigns / sequences
- **Eve (email agent)** — deliverability + sequence design
- **Lex** — copy pass
- **Russell Brunson** — Soap Opera sequence pattern
- Skills: cold-outreach-sequences.md, email-campaigns-apollo-instantly.md, message-tone.md

---

## Parallel-skills firing protocol

When ANY task starts, before drafting:

1. **CLASSIFY** the task across dimensions:
   - Is there a FUNCTIONAL skill needed? (engineering / API / data)
   - Is there a DESIGN dimension? (visual / spatial / interaction)
   - Is there a WRITING dimension? (copy / voice / messaging)
   - Is there a STRATEGY dimension? (positioning / offer / pricing)
   - Is there a COMPLIANCE dimension? (regulatory / legal)

2. **LOAD all matching skills + agents** in PARALLEL (not sequentially):
   - Use Read tool with multiple files in one batch
   - Surface them in the visible 🧠 SKILLS LOADED line

3. **CONSULT council members** by department:
   - For each dimension, name the 1-2 council members whose lens applies
   - Add their first question to my plan (e.g., "Hormozi would ask: how is this offer so good people feel stupid saying no?")

4. **WRITE the 🎯 BOARD CONSULTED line** with which lenses are active

5. **DRAFT** with all dimensions in equal weight — not function first then polish

---

## Mandatory visible artifact

Every substantive build/draft response must open with BOTH lines, populated:

```
🧠 SKILLS LOADED: [function skill] + [design skill if visual] + [writing skill if copy] + [strategy skill if positioning] + [agent files]
🎯 BOARD CONSULTED: [council member by department] — [their first question applied to this task]
```

Empty lines on a triggered task = Hawk fails the response. Skipping = same failure mode as shipping ugly function-first work.

---

## Worked failure (the lesson)

**2026-05-13 Brain Graph build:** I treated "build a 3D knowledge graph" as a pure engineering task.
- Loaded: none (I'd already done planning)
- Council: none consulted
- Result: shipped default 3d-force-graph config — solid spheres, default colors, default physics, no bloom, no glow
- Renée's response: "you have design skills. are you using them?"
- Honest answer: no, I wasn't

**What I should have done:**
- 🧠 SKILLS LOADED: ui-ux-pro-max.md + animation-mastery.md + allan.md (visual design lead)
- 🎯 BOARD CONSULTED: Don Norman ("does the interaction afford rotation?") + Dieter Rams ("is this honest and unobtrusive?")
- Result: bloom-enabled sprite-based glowing nodes from v1, not v2 after pushback

The structural fix is THIS rule: parallel loading is mandatory. Function-first defaults are now banned.

---

## Cross-references

- Parent gate: `~/.claude/CLAUDE.md` PRE-FLIGHT SKILL-LOADING GATE
- Skills directory: `/XpertVault/06-skills/`
- Agents: `/XpertVault/04-agents/`
- Renée's profile: `/01-renee/profile.md`
- Process sibling: `visual-project-tracking.md`, `brain-graph-maintenance.md`

---

## Enforcement

Cross-instance:
- Claude Code: this memory rule auto-loads
- Console task-bus references this when execution involves visual/copy work
- Mobile: same rule, just respond more concisely
- Future autonomous runners: parallel skill loading is part of the work definition, not optional

**Renée's directive:** *"you need to program yourself that when you make things you should prioritize design as much as functionality."* — this rule is the program.
