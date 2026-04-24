# Daily Brief — Spec & Delivery Plan

**Schedule:** 7:00 AM Toronto, every day
**Delivery:** (1) Command Center widget, (2) Email to renee.ross@gmail.com
**Tone:** MyClaw vibe — punchy, benefit-focused, scannable, short sentences, no walls of text, emojis only if they add clarity
**Authored by:** Jordan (COO) — pulls from all agents

---

## SECTION STRUCTURE (MyClaw-inspired)

**1. Rate Watch (Morgan — Mortgage Assistant)**
- BoC overnight rate + any change since yesterday
- Best 5-yr fixed insured / uninsured
- 5-yr variable
- Next BoC announcement countdown

**2. Mortgage Pipeline (Morgan — Mortgage Assistant)**
- New leads in GHL (last 24h) — count + names
- Leads cold >48h (names, what they need)
- Applications waiting on documents (client + missing items)
- Revenue MTD vs $20k target

**3. Inbox Highlights (Morgan — Mortgage Assistant)**
- Lender rate updates received overnight
- Cheryl Dieken messages flagged for learning
- Anything alarming or compliance-sensitive from overnight

**4. Today's Agenda (Jordan — COO)**
- Scheduled calls + which agent is prepping
- Critical tasks in progress
- Overdue items

**5. Opportunity Watch (Scout — Intel + Mark — Marketing)**
- Any competitor / market moves overnight
- Lead gen signals (new wholesaling group activity, etc.)

**6. AI & Industry News (filtered)**
- 2–3 items max
- Each item: headline + one sentence on how it applies to Xpert / Renée

**7. Revenue Snapshot (Amy — Accountant)**
- MTD revenue across all lines: Mortgage, AI Consulting, SaaS, REI DealFlow subscription cut
- Expenses flagged over threshold
- Cost monitor: yesterday's AI spend

**8. Deferred Decisions Firing Today (Riley — Deferred Decision Tracker)**
- Any condition-based reminders that triggered

**9. One Thing Today**
- The single highest-leverage action Renée should prioritize — one sentence, no alternatives

---

## TONE RULES

- Short sentences. Never run-on.
- Benefit-focused ("Rates held — good news for refi leads") not status-dump ("Rate: 2.25%")
- No generic AI-speak ("As of today's briefing...")
- Assume Renée is skimming on her phone at 7am
- Total length: target 400 words. Hard cap 600.
- Use bold for key numbers, not color
- Subject line format: `☀️ Daily Brief — Apr 14 — 3 new leads, 2 cold, BoC holds 2.25%`

---

## TOOL CHOICE — IMPORTANT

**CronCreate (in-session) is the WRONG tool here.** It only runs while Claude Code session is active and auto-expires after 7 days. Renée needs the brief even when her laptop is off.

**Right tool: `schedule` skill (remote scheduled agent).** Fires server-side at 7am regardless of whether her laptop is on. Runs the brief-generation prompt + sends email via Microsoft 365 MCP + writes to Command Center backend.

**Dependencies before we can turn it on:**
1. Microsoft 365 MCP authenticated (for sending email from renee.ross@ontariolendingsolutions.com OR pulling inbox data and sending via poweragentsystem@gmail.com)
2. Decision: which email ADDRESS sends it, and which address receives it?
3. Command Center widget spec — where in command-center-v81.jsx does the brief render? New tab? Top-of-screen banner? Daily log panel?
4. GHL API access confirmed (already in place per memory)
5. wowa.ca + Bank of Canada scrape path decided (WebFetch works but can be brittle — may want a small n8n workflow that hits reliable endpoints daily)

---

## EXECUTION PLAN (AFTER RENÉE APPROVES)

1. Complete MS365 auth (Renée runs /mcp)
2. Renée confirms send/receive email addresses + Command Center placement
3. Build the brief generator as a single Claude prompt template
4. Wire it into `schedule` skill with 7:00 AM Toronto cron (suggest `3 7 * * *` — offset 3 min to avoid the :00 API-pileup issue)
5. Test fire it manually for a week, tune output
6. Go live

---

## SAMPLE OUTPUT (MOCK)

> **☀️ Daily Brief — Apr 14 — 3 new leads, 2 cold, BoC holds 2.25%**
>
> **Rates today**
> BoC held at **2.25%**. Prime stuck at 4.45%. Best 5-yr fixed insured: **3.84%**. Variable tracking lower at 3.30%. Next BoC decision: April 29.
>
> **Mortgage pipeline**
> 3 new leads overnight — Sarah T (Toronto refi), Marcus L (Hamilton HELOC), James R (first-time buyer Vaughan). Two leads went cold — Priya S (8 days no contact) and David M (6 days, docs pending). Revenue MTD: $4,200 of $20k target.
>
> **Inbox**
> 2 lender rate updates (Home Trust, Equitable). Cheryl flagged a file structure she wants changed — worth reading. Nothing compliance-sensitive overnight.
>
> **Today's agenda**
> 11:15 call with Aaron (real estate). 2:00 partnership discovery — Scout prepped the brief. Overdue: wholesaling ad to Fitzroy (4 days).
>
> **News that matters**
> BMO raised qualifying rates for uninsured conventional — worth reminding renewals in 2026 to lock soon. OSFI consulting on MUP tightening — Morgan watching.
>
> **One thing today**
> Call Priya before 10am. She was hot 8 days ago and we've lost her to the competition if we wait.
