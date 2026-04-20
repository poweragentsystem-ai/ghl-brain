# CONSOLE 3 — EMAIL QUALITY + RECRUITMENT FORM
### Paste this entire message into a third fresh Browser Claude (Console) session.
### Runs in parallel with Console 1 and Console 2.

---

You are working on **both ABC Company** (`AKbAtRra4m908e2w2Kbo`) **and EquityMax** (`OBmMdqdnPLZvVyHloFly`). Do ABC first (safer), then EquityMax.

## CONTEXT — READ FIRST (in this order)
1. `XpertVault/sprint/master-build-status.md` — current sprint state
2. `XpertVault/sprint/ghl-master-list.md` — **the live list of all custom fields, custom values, and tags in ABC and EquityMax**. Use existing tokens in your email rewrites. Do not invent new tokens without checking this file first.

**Rule:** If you add or modify a custom field / value / tag during this session, append to the change log at the bottom of `ghl-master-list.md` with format: `- YYYY-MM-DD · Console-3 · ADDED <type>: <name> (<key>) — <reason>`

Renée's rule: all email/SMS copy must sound like a real human. No corporate language, no "Hello [Name]," no "Reply YES/NO," no "please be advised." Use contractions. Short.

## YOUR JOB — 3 PHASES

### PHASE 1 — HUMANIZE ABC EMAIL TEMPLATES

In ABC Company → Marketing → Emails → Templates:

1. Open each template. Read it out loud. Does it sound like a real person who happens to be professional, or like a corporate auto-responder? If the latter, rewrite.

2. **Tone rules** (what makes copy sound human):
   - No "Hello [Name]," — use "Hey {{contact.first_name}}," or skip greeting
   - No "Please be advised" / "We are pleased to inform" / "Kindly note" — just say it
   - Use contractions (it's, we're, you'll)
   - Subject lines: 5 words max, curiosity-driven, lowercase is fine
   - Body: 3–4 short paragraphs max, one clear CTA

3. **Reply CTAs** — these are GOOD when conversational, BAD when robotic:
   - ✅ GOOD (real person writing):
     - "Just reply back with the days that work best for you and we'll find a time."
     - "Reply to this email if you'd like the full breakdown."
     - "Reply 'GUIDE' and I'll send over the first-time buyer checklist."
     - "Reply with your mortgage amount and I'll check rates for you."
   - ❌ BAD (robot/auto-system vibe):
     - "Reply YES to confirm or NO to cancel."
     - "Please respond with Y or N."
     - "Text KEYWORD to opt in."

   The rule: reply CTAs that sound like a human asking a real question = keep/add them. Reply CTAs that sound like a bot menu = rewrite.

4. **Unsubscribe rules** (CASL compliance — Canadian Anti-Spam Law):

   | Email type | Unsubscribe required? | Prominence |
   |---|---|---|
   | Marketing / nurture / promotional (with or without images) | YES | Prominent footer link — clearly visible, clickable |
   | Conversational nurture (plain-text follow-up asking them to book/reply) | YES | Simple footer link is fine — "Don't want these? Unsubscribe." |
   | Appointment confirmation / reminder | Not strictly required (transactional) — but include subtle link as safety |
   | Document request after application | Not strictly required (transactional) — safe to omit |
   | Funded/closing confirmation | Not strictly required (transactional) |
   | Internal notifications to Renée / team | Never required |

   **Footer template for marketing/nurture emails (required):**
   ```
   {{custom_values.company_name}} | {{custom_values.business_address}}
   Don't want these emails? {{unsubscribe_url}}
   ```

   **Footer for transactional emails (minimal, optional):**
   ```
   {{custom_values.company_name}} | {{custom_values.business_phone}}
   ```

5. Swap any hardcoded "Renée", "EquityMax", "Power Agent", "GTA" → `{{custom_values.*}}` tokens.

6. **Image templates vs plain-text** — decide per purpose:
   - Marketing broadcast, rate announcements, big offers, newsletters → use HTML image template, prominent unsubscribe footer
   - Personal-style nurture, booking follow-up, objection handling → plain-text only, looks like it was typed by a human, subtle unsubscribe link

   Don't wrap plain-text conversational emails in a big-image brand header — it kills the "real human" feel. Save the visual template for actual marketing.

### PHASE 2 — DELETE US MORTGAGE EMAILS

There are ~10 US mortgage email templates in ABC. Delete them all — this is a Canadian snapshot. Keep only the 4 generic templates.

### PHASE 3 — WIRE RECRUITMENT FORM IN ABC

Recruitment custom fields should already exist (Claude Code is creating them via API). Your job: wire them into the Recruitment flow.

**Build a new form or update existing Recruitment Application Form (`2lfmQLwa71SOpmqVoxyW`) with these fields in this order:**

1. First Name (maps to `recruitment_first_name`)
2. Last Name (maps to `recruitment_last_name`)
3. Email (maps to `recruitment_email`)
4. Phone (maps to `recruitment_phone`)
5. City (maps to `recruitment_city`)
6. **How much experience do you have?** — DROPDOWN (maps to `recruitment_experience_level`) — options: No experience / Less than 1 year / 1-3 years / 3-5 years / 5+ years
7. **When can you start?** — DROPDOWN (maps to `recruitment_availability`) — options: Immediately / Within 2 weeks / Within 1 month / 1-3 months / Just exploring
8. Why do you want to work with us? — SHORT TEXT (maps to `recruitment_why_join`)
9. LinkedIn URL or resume link — SHORT TEXT (maps to `recruitment_linkedin_or_resume`)

Connect form submission → trigger existing Recruitment workflow. Lead gets tagged `recruitment-lead` + moved to Recruitment Pipeline stage 1.

### PHASE 4 — REPEAT EMAIL HUMANIZATION FOR EQUITYMAX

Same process in EquityMax account. Focus on the most-used templates first (welcome, booking confirmation, document request, renewal reminder).

### SUCCESS CRITERIA

- Every ABC email reads like a human wrote it (not AI, not corporate)
- US mortgage emails deleted
- Recruitment form wired with 9 fields (5 contact + 2 dropdown + 2 short answer)
- EquityMax core emails humanized
- Zero hardcoded personal/brand info in any template

### WHEN DONE

Append to `XpertVault/sprint/master-build-status.md`:
```
- [YYYY-MM-DD HH:MM | Console-3] Emails humanized (ABC + EqM core). Recruitment form wired. US mortgage emails deleted.
```
