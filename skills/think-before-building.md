# Think Before Building — Mandatory Pre-Execution Skill

## THIS SKILL RUNS BEFORE EVERY TASK. NO EXCEPTIONS.

---

## STEP 1: RESEARCH — What already exists?

Before writing a single line, creating a single node, or building a single workflow:

- [ ] List everything that already exists related to this task
- [ ] Open each item and understand what it does
- [ ] Determine: is it working? Is it close? Is it broken? Is it missing pieces?
- [ ] If it's working → **LEAVE IT ALONE** and say "this is already done"
- [ ] If it needs a small fix → name the specific fix, don't rebuild
- [ ] If it doesn't exist → mark as MISSING, this is what you'll build

**Ask yourself:** "If I were a hired professional being paid $200/hr for this task, would I rebuild something that's already working? No. I'd check it, confirm it works, and move on to what's actually missing."

---

## STEP 2: UNDERSTAND WHY — What's the goal?

- What does the user actually want to achieve?
- Why do they want it? What problem does it solve?
- Who is the end user / client / lead? What's their experience?
- What does the RESULT look like when this is done perfectly?

---

## STEP 3: REVERSE-ENGINEER — Work backwards from the result

Start at the perfect end state. Work backwards:
1. What's the final step? (e.g., client is onboarded and happy)
2. What triggers that? (e.g., deal closed, payment received)
3. What comes before that? (e.g., approval from lender)
4. Keep going backwards until you reach CURRENT STATE

The gap between current state and the first backwards step = what needs to be built.

---

## STEP 4: PLAN — Anticipate every scenario

Before executing:
- [ ] List every positive path (happy flow)
- [ ] List every negative path (no-show, not interested, dropped call, ghosting, not qualified, spam)
- [ ] For each path, confirm: is it already handled? If not, plan the solution.
- [ ] State clearly: "I will ADD [X], FIX [Y], and NOT TOUCH [Z]"

---

## STEP 5: EXECUTE — Build only the gaps

- Build what's MISSING
- Fix what's BROKEN (with the smallest effective change)
- Add what's REQUESTED (in the exact spots requested, not everywhere)
- **Never rebuild working things**
- **Never duplicate existing automations**
- If unsure whether to rebuild or fix → default to FIX

---

## STEP 6: VERIFY — Walk every path

- Test the happy path end-to-end
- Test every negative path
- Confirm existing working items still work (didn't break them)
- Report: what existed, what you added, what you fixed, what you left alone

---

## PROFESSIONAL BASICS — NEVER NEED TO BE ASKED FOR THESE
The following are common sense. If any skill or build is missing these, it's a failure:
- All messages sound human, not robotic (see message-tone.md)
- All UI is mobile-friendly (most users are on phones)
- All public assets have compliance footers (FSRA, CASL, PIPEDA as applicable)
- All content uses custom values — zero hardcoded personal info
- All forms are short and not overwhelming
- All follow-ups are spaced naturally — not spammy
- All opt-outs are respected immediately
- All voice AI sounds conversational, not scripted
- All emails are scannable with one clear CTA

If Renée has to ask for any of these, the skill that should have included it needs updating immediately.

## TRIAGE BEFORE BATCH OPERATIONS — MANDATORY

Before editing, fixing, or updating multiple items:
1. **List everything** that would be affected
2. **Mark KEEP vs DELETE** on each one
3. **Delete the junk FIRST**
4. **THEN fix/edit only what survived**
5. Never fix something you're about to erase — that's wasted time and tokens

Amy (Budget) and Axel (Actuator) both flag this. If either one stays silent when a batch edit is about to include items being deleted, that's a failure.

## HARDCODED PERSONAL INFO CHECK — MANDATORY ON EVERY BUILD

Before declaring anything done, search ALL prompts, templates, scripts, and node configs for:
- Owner name (Renée, Renee, etc.) → must be {{custom_values.owner_name}}
- Company name (EquityMax, Power Agent, etc.) → must be {{custom_values.company_name}}
- Brokerage name → must be {{custom_values.brokerage_name}}
- Phone numbers → must be {{location.phone}}
- Email addresses → must be {{location.email}}
- Website URLs → must be {{custom_values.website_url}}
- City/region (GTA, Toronto, etc.) → must be {{custom_values.service_area}}
- Licence numbers → must be {{custom_values.licence_number}}

If ANY personal info is hardcoded, REPLACE it with the correct custom value. DO NOT DELETE the item. A working prompt with a wrong name needs a 5-second edit, not deletion and rebuild.

**DELETE vs EDIT decision:**
- Has hardcoded personal info but otherwise works → EDIT (replace with customs)
- Is a duplicate built by mistake → DELETE
- Is broken beyond repair → DELETE
- Is unused and serves no purpose → DELETE
- If unsure → ASK before deleting. Default to EDIT.

## RED FLAGS THAT MEAN YOU SKIPPED THIS PROCESS

- You DELETED something that just needed an edit (find-and-replace hardcoded names)
- You built something that already existed
- You rebuilt a workflow instead of adding to it
- You couldn't explain WHY each step exists
- You didn't mention what was already done
- You didn't walk the lead journey before declaring done
- Renée had to tell you something already existed
- You spent 30 minutes building when 2 minutes of review would have shown it was done

---

## APPLIES TO

Everything. GHL, n8n, code, React builds, landing pages, email templates, voice AI scripts, design work, research, proposals — EVERYTHING starts with research, reverse-engineering, and planning. No exceptions.
