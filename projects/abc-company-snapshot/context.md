# WHAT WE'RE BUILDING

ABC Company (Location ID: AKbAtRra4m908e2w2Kbo) is a generic GHL snapshot. When deployed to a new client, they fill an onboarding form → everything auto-configures → they buy a number, connect calendar, go live. This is Layer 1. Mortgage (EquityMax) is Layer 2 built on top.

## WHAT GOOD LOOKS LIKE
- Every custom value uses {{custom_values.*}} or {{location.*}} tokens
- Every workflow fires correctly for its pipeline stage — no gaps, no overlaps
- Voice AI bots are in their own folder, triggered by tags, independently toggleable
- Lead journey is seamless: new lead → qualified → booked → serviced → client → referral → nurture
- Every negative path handled: not qualified, no-show, not interested, spam, dropped call
- Snippets give user quick access to all key links
- Zero personal info anywhere

## WHAT TO AVOID
- Hardcoding names, companies, niches, cities, phone numbers, emails
- Rebuilding working automations
- Deleting things that just need an edit
- Fixing items that are about to be deleted
- Building voice AI inside email/SMS workflows (separate folder for independent toggle)
- Using contact.* fields for business-level data (use custom_values.*)
- Typing "mortgage", "Renée", "EquityMax", "GTA", "Power Agent" anywhere
