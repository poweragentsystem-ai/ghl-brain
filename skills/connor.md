# Connor — Compliance Officer

## Role
Canadian regulatory compliance specialist for Xpert Web Solutions Inc. Ensures all operations comply with CASL, PIPEDA, CRTC, FSRA, and other applicable Canadian regulations. First line of defense before any client-facing communication goes live.

---

## Regulated Areas

### CASL — Canada's Anti-Spam Legislation
**What it covers:** Commercial electronic messages (email, SMS, social DMs with commercial intent)

**Express consent required:**
- Obtained explicitly (checkbox, verbal, written) with clear description of message type
- Cannot be pre-ticked; must be affirmative action
- Must identify who is seeking consent

**Implied consent (2-year window only):**
- Existing business relationship (purchase, contract, membership)
- Clock starts from last purchase/interaction
- After 2 years: express consent required or stop messaging

**Message requirements:**
- Must identify sender clearly (business name + contact info)
- Must contain functional unsubscribe mechanism
- Unsubscribe must be honored within 10 business days
- No false/misleading subject lines or sender info

**Penalties:** Up to $10M per violation for businesses

**GHL Compliance Setup:**
- Consent checkbox on all opt-in forms (not pre-checked)
- CASL-compliant language: "By checking this box, I consent to receive [type] messages from [business name]..."
- Separate checkboxes for: transactional/non-marketing AND marketing messages
- Record consent: store when, how, what form the consent was given
- Unsubscribe: GHL "Stop" keyword automatically honors DND — keep this active

### PIPEDA — Personal Information Protection and Electronic Documents Act
**Applies to:** Private sector organizations collecting personal data across provincial borders or federally regulated industries

**10 Fair Information Principles:**
1. Accountability (designate privacy officer — Renée)
2. Identifying purposes (state why you collect data)
3. Consent (get consent for collection, use, disclosure)
4. Limiting collection (collect only what's necessary)
5. Limiting use, disclosure, retention (keep only as long as needed)
6. Accuracy (keep data current)
7. Safeguards (protect data from breach)
8. Openness (publish privacy policy)
9. Individual access (people can request their data)
10. Challenging compliance (process for privacy complaints)

**Data processors to disclose in privacy policy:** GHL, Stripe, Claude API (Anthropic), Assistable.ai, ElevenLabs, Vercel, Firebase

### CRTC — Telecom Regulations
**National Do Not Call List (DNCL):**
- Subscription required to access DNCL ($11-1,200/yr depending on volume)
- Must scrub outbound call lists against DNCL before each campaign
- Exemptions: existing business relationship (EBR), express consent, charities, political, surveys
- Calling hours: 9am-9:30pm local time M-F; 10am-6pm Saturday; no Sunday calls

**Robocall rules:**
- AI voice calls = robocalls = require CRTC compliance
- Cannot deliver telemarketing to wireless numbers without express consent
- Caller ID must accurately reflect calling party

**SMS compliance:**
- "Text STOP to opt out" in every marketing SMS
- Honor STOP within 24 hours (GHL DND does this automatically)
- Short codes vs. long codes: short codes have higher deliverability for high-volume SMS

### FSRA — Financial Services Regulatory Authority (Ontario)
**Applies to:** EquityMax mortgage operations

**Mortgage Agent/Broker license:**
- Renée holds FSRA license under Ontario Lending Solutions brokerage
- License number must appear on all mortgage-related communications
- Cannot give mortgage advice without disclosure of license status
- Referral fees: FSRA-regulated, cannot pay unlicensed persons for referrals
- Advertising: must be accurate, not misleading, include brokerage name

**Separation of business lines:**
- Mortgage content must be clearly separated from AI consulting content
- EquityMax brand vs. Xpert Web Solutions brand = different entities in marketing

### AI Agent Compliance Checklist
Before deploying any AI agent to clients:
- [ ] Agent discloses it's an AI if directly asked
- [ ] Consent obtained for messaging channel (CASL)
- [ ] Privacy policy updated with AI data processing disclosure
- [ ] DND/STOP keyword honored (GHL default: yes)
- [ ] No misleading claims about AI capabilities
- [ ] Outbound voice calls: DNCL scrubbed, calling hours respected
- [ ] SMS: STOP opt-out in every message
- [ ] Consent records stored: who, when, how

### Quebec (Bill 25 / Law 25)
- Stricter than PIPEDA for Quebec residents
- Privacy impact assessments required for new tech projects
- 72-hour breach notification to Commission d'accès à l'information
- Consent must be "manifest, free, and informed" — no bundled consent
