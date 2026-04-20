# CONSOLE RULES — READ BEFORE EVERY GHL SESSION

## OLD INTEGRATIONS — ALREADY HANDLED, DO NOT ASK ABOUT AGAIN
These have been identified, discussed, and resolved. Do NOT flag them as security issues or ask Renée about them:

| Platform | Status | Resolution |
|---|---|---|
| CloserX (closerx.ai) | REMOVED | Was old voice AI. SSO code removed from App Marketplace. If any scripts remain, delete silently. |
| Centrefy | NOT FOUND | Searched all locations, zero references found. |
| Assistable.ai | ACTIVE | Current voice AI platform. Keep. |

If you see CloserX or Centrefy code anywhere: DELETE IT SILENTLY. Do not stop work. Do not ask Renée. It's old junk. Move on.

## CUSTOM VALUES — CORRECT TOKEN NAMES
- {{custom_values.user_first_name}} — NOT owner_name
- {{custom_values.user_full_name}} — NOT owner_full_name
- {{custom_values.niche}} — NOT industry
- {{custom_values.ai_agent_name}} — bot name
- {{custom_values.company_name}} — business name
- {{custom_values.user_job_title}} — job title
- {{custom_values.website}} — website URL
- {{custom_values.service_area}} — city/region
- {{custom_values.my_calendar}} — booking link

## HARDCODED INFO RULE
NEVER type a specific name, company, niche, city, phone, or email. Always use custom values. If you find hardcoded text: EDIT it to use the custom value. Do NOT delete the item.

## BUILD RULES
- AI Studio → Build with AI for agents. Automation → Build using AI for workflows. Never build manually.
- Audit BEFORE building. List what exists, mark KEEP/NEEDS FIX/MISSING.
- Voice AI bots go in "Voice AI Bots" folder — separate from email/SMS agents.
- Email + SMS fire first, Voice AI calls 5 MINUTES LATER.
- Do NOT ask questions. Make judgment calls. If stuck, move to next task.

## DO NOT TOUCH
- "General Business Automation" folder (10 published agents) — working, leave alone
- Any published workflow unless specifically told to edit it

## MESSAGE TONE — MANDATORY FOR ALL SMS AND EMAIL

Every message must sound like a real person typed it on their phone. Not a corporate system.

WRONG:
- "Hello {{contact.first_name}}, We haven't heard back from you. Would you like us to remove you from our list? Please reply YES to unsubscribe or NO to stay connected."
- "Dear valued customer, we would like to inform you..."
- "This is a reminder that your appointment is scheduled for..."

RIGHT:
- "Hey {{contact.first_name}} — been a while! Just wanted to check if you're still looking for help or if the timing isn't right. Totally fine either way, just let me know 👋"
- "Hey {{contact.first_name}} — quick reminder, we're chatting tomorrow at {{appointment.time}}. Looking forward to it!"
- "Hey {{contact.first_name}} — haven't connected in a bit. Still thinking things over? No worries if now's not the time, just say the word and I'll stop bugging you 😄"

RULES:
- Never start with "Hello" — use "Hey" or just the name
- Never say "We haven't heard back from you" — sounds automated
- Never say "reply YES/NO" — that's a robot menu
- Never use "Dear", "We would like to inform you", "Please be advised", "valued customer"
- Write like you're texting a friend you respect — short, warm, zero pressure
- Keep under 2-3 sentences
- Use emojis sparingly but naturally (😊 👋 😄)
- Opt-out = "just say the word and I'll stop bugging you" (Not Interested agent handles the rest)
- CASL requires unsubscribe in emails (footer link) but NOT in every SMS

## TEST CONTACT ONLY
4168784622 / renee.ross@gmail.com — NEVER contact real leads
