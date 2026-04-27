# EqM Cold-Contact Re-Engagement — 64 contacts ready to fire

**Created 2026-04-27 by Jordan/Claude Code while Renée slept.**
**Goal:** Wake up to a one-button send that re-engages 64 cold contacts who came in before the auto-tag workflow was wired.

**Why it works:**
- They already opted in (form submission) — CASL compliant
- They've gone untouched — soft, human re-engagement performs best on cold-but-warm leads
- Even 5% reply = 3 conversations = 1 deal possible

**Hormozi take:** "The fortune is in the follow-up, but they have to feel it's from a person. Make the script feel like it could only have been written by Renée at 11 PM on a Tuesday because she remembered them."

**Belfort take:** "Don't pitch. Ask where they're at. The pitch comes after they answer."

---

## SMS — Re-Engagement (159 chars, single segment)

```
Hey {{contact.first_name}}, Renée from EquityMax. Wanted to circle back — a lot's changed in mortgage rates lately. Where are you at? Even a quick reply helps.
```

**Why this:**
- First name (personal)
- Owns the gap ("circle back")
- Reason ("rates changed") — gives them permission to engage
- Soft ask ("even a quick reply") — low commitment

---

## EMAIL — Re-Engagement

**Subject:** Quick check-in, {{contact.first_name}}

**Body:**

Hi {{contact.first_name}},

It's Renée from EquityMax. I noticed you reached out a while back and we never got a proper conversation going. That one's on me.

A lot's changed in the rate landscape since you first looked, and we've been helping clients in similar spots:

- Locking in fixed terms before more rate movement
- Pulling equity for renovations or debt consolidation
- Figuring out what their actual options look like before deciding

If any of that's still on your mind — or your situation's shifted — just reply with where you're at. No script, no pitch. I'll point you in the direction that makes the most sense for your file.

If now's not the time, no problem — hang onto my number for when it is.

Renée Ross
Mortgage Agent Level 2 · Licence #13063
Ontario Lending Solutions
{{custom_values.user_phone}} · renee.ross@gmail.com

---

## Send Strategy

**Pace:** 10/day for 7 days = full burn-down.
- Day 1: highest engagement (most recent intake or those with phone numbers verified)
- Day 2-7: rest by random shuffle

**Touch sequence per contact:**
1. SMS (immediate)
2. If no reply by day 2 → Email
3. If no reply by day 4 → SMS rebound: "Hey {{first_name}}, didn't want this to fall through the cracks — should I close your file or you still looking?"
4. If no reply by day 6 → Tag as `nurture-from-cold` and move to long-term nurture

**Compliance:**
- All contacts are CASL-compliant (opted in via form)
- Include unsubscribe link in email (GHL auto-adds)
- SMS reply-stop is auto-handled by GHL

---

## Expected outcomes

| Metric | Conservative | Optimistic |
|---|---|---|
| Reply rate | 8% (5 replies) | 15% (10 replies) |
| Booked calls | 3 | 6 |
| Pre-qualified | 1-2 | 3-4 |
| Closed deals (90 days) | 0-1 | 1-2 |

**Even one closed deal at $4-8K commission = $4-8K MTD that doesn't currently exist.**

---

## Action — what Renée does in the morning

1. Open Command Center → check Console queue for the wired workflow (Console task being pushed now)
2. OR: open EqM directly → Conversations → Email Templates → "EqM Re-Engagement v1" should be saved → fire to a Smart List of "untagged contacts created before 2026-04-01"
3. Watch replies for first 24 hours
4. ANY reply → drop into Pre-Qualifier flow

If everything works, by Wednesday afternoon you have your first qualified conversation in the EqM pipeline this month.
