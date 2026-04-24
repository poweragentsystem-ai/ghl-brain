# Message Tone Skill — All Client-Facing Communication

## THE RULE
Every SMS, email, voice AI script, and chat message must sound like a real human typed it. Not a system. Not a corporation. A person.

## THE TEST
Read it out loud. If it sounds like something a call center robot would say, rewrite it. If it sounds like a text you'd send to a client you respect, it's good.

## WRONG (robotic, corporate, automated)
- "Hello {{contact.first_name}}, We haven't heard back from you."
- "Would you like us to remove you from our list? Please reply YES to unsubscribe or NO to stay connected."
- "Dear valued customer, we would like to inform you that..."
- "This is a reminder that your appointment is scheduled for..."
- "Please be advised that your application has been received."
- "We appreciate your business and look forward to serving you."
- "If you have any questions, please do not hesitate to reach out."

## RIGHT (human, warm, casual-professional)
- "Hey {{contact.first_name}} — been a while! Still looking for help or has the timing changed? Either way no worries 😊"
- "Hey {{contact.first_name}} — quick reminder, we're chatting tomorrow at {{appointment.time}}. Looking forward to it!"
- "Hey {{contact.first_name}} — your application came through, nice! I'll start reviewing and reach out if I need anything from you."
- "Hey {{contact.first_name}} — haven't connected in a bit. Still thinking things over? No worries if now's not the time, just say the word and I'll stop bugging you 😄"
- "Hey {{contact.first_name}} — just wanted to say thanks for trusting us with this. If you have a sec, a quick Google review would mean the world: {{custom_values.google_review_link}}"

## FORMATTING RULES
- Never start with "Hello" — use "Hey" or just the first name
- Never use "Dear", "valued customer", "We would like to inform you", "Please be advised"
- Never ask "reply YES/NO" — that's a robot menu. Use natural language: "just let me know" or "say the word"
- Keep SMS under 160 characters when possible, max 2-3 sentences
- Keep emails scannable — short paragraphs, one idea per paragraph, clear CTA button
- Use emojis sparingly but naturally — 1-2 max per message (😊 👋 😄 🎉)
- Sign off with {{custom_values.user_first_name}} not "The Team" or "Management"

## OPT-OUT / UNSUBSCRIBE
- **Emails:** CASL requires unsubscribe link in footer — use GHL's built-in unsubscribe footer
- **SMS:** No legal requirement for explicit opt-out in every message (Canada). If someone replies "stop" or "not interested", the Not Interested agent catches it and sets DND.
- **Natural opt-out phrasing:** "just say the word and I'll stop bugging you" or "totally fine if now's not the time" — NOT "reply YES to unsubscribe or NO to stay connected"

## VOICE AI SCRIPTS
Same rules apply to spoken words:
- Short sentences (max 2 per turn)
- Conversational, not scripted
- Use contractions: "I'm", "we're", "you'll" — not "I am", "we are", "you will"
- Match the caller's energy — if they're casual, be casual. If they're formal, be slightly more polished but never stiff.
- Pause after questions — give them time to answer
- Never read a paragraph at them

## WHEN THIS SKILL APPLIES
- Every SMS template in every workflow
- Every email template and email body
- Every voice AI prompt and script
- Every chat bot response
- Every snippet
- Every notification to the lead/client

This is not optional. Robotic messages kill conversion and make the business look like a spam operation. Human messages build trust and get replies.
