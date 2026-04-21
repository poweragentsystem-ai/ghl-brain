# Multi-Partner Assignment System — Future Build
### Noted 2026-04-21 per Renée. Do NOT build yet — finish base mortgage snapshot first, then layer this on.

---

## The problem
Mortgage professional may have 4+ partners (real estate agent, lawyer, financial advisor, builder, etc.). Current snapshot assumes 1 partner. We need:
1. Each partner has their own profile (niche, services, contact info, calendar link)
2. Lead assignment — when a partner-referred lead comes in or gets routed, it's assigned to ONE specific partner
3. Assigned partner + mortgage professional see the lead. Other partners DO NOT see it.
4. Messaging auto-populates with assigned partner's niche + services for grammatically-correct templates across all partner types.

---

## Architecture (borrowed from ABC Company generic snapshot)

**Per-partner custom values (4 partners max for v1 — extend later):**

For each partner N (1–4):
- `partner_N_name`
- `partner_N_niche` (e.g., "real estate", "legal", "financial planning", "construction")
- `partner_N_service_1` through `partner_N_service_5` (e.g., "buying a property", "selling a property", "refinance", "divorce", "estate planning")
- `partner_N_email`
- `partner_N_phone`
- `partner_N_calendar_link`
- `partner_N_landing_page_url`
- `partner_N_active` (boolean — turn partner on/off without deleting their config)

**Per-partner tags:**
- `partner-1-assigned`, `partner-2-assigned`, `partner-3-assigned`, `partner-4-assigned`
- `partner-1-lead`, `partner-2-lead`, etc. (lead type)

**Workflows filter by partner tag** — partner 2's workflow only fires on contacts tagged `partner-2-assigned`. Partner 2 cannot see partner 1's leads.

---

## Lead assignment logic

When a partner-referred lead enters:
1. Lead form includes a hidden field `assigned_partner_id` OR the landing page URL carries a partner slug (`/real-estate-buyer?partner=1`)
2. On submit, workflow adds `partner-N-assigned` tag matching the referring partner
3. All subsequent automations key off the tagged partner — messaging pulls `{{partner_1_niche}}` + `{{partner_1_service_N}}`

**If no partner is assigned yet** (lead came in generically):
- Round-robin across active partners
- OR mortgage professional manually assigns via dropdown in contact detail view
- Tagged with appropriate partner-N tag once assigned

---

## Grammatical template magic

Same sentence, different data:

| Partner niche | Service | Output |
|---|---|---|
| Real estate | Selling a property | "Do you still need help **selling your property**? We're Toronto's choice for **real estate**." |
| Legal | Divorce | "Do you still need help with your **divorce**? We're Toronto's choice for **legal** services." |
| Financial planning | Retirement planning | "Do you still need help with your **retirement planning**? We're Toronto's choice for **financial planning**." |
| Construction | New custom builds | "Do you still need help with your **new custom build**? We're Toronto's choice for **construction**." |

Template: `Do you still need help {{assigned_partner.service}}? We're {{company_city}}'s choice for {{assigned_partner.niche}}.`

---

## UI requirements

Mortgage professional's onboarding flow (when deploying the snapshot):
1. Fills in Partner 1 block (if they have one) — name, niche, services (up to 5), contact, calendar link
2. Can repeat for Partner 2, 3, 4
3. Can leave partner slots empty — workflows skip empty-slot logic

Partner-specific landing pages (later phase):
- `/partner/{{partner_slug}}` route auto-generates a branded landing page for each partner
- Form submissions on that page auto-assign `partner-N-assigned` tag

---

## Privacy separation

Ensure partner 2's workflows NEVER fire on partner 1's leads:
- Every partner-workflow step has a FILTER: tag contains `partner-N-assigned`
- Partner notification emails only go to the assigned partner's `{{partner_N_email}}` — never broadcast to all partners
- Reporting dashboards filter per-partner

---

## Dependencies before this build

1. Base mortgage snapshot complete + exported + sellable ✅ TO DO FIRST
2. At least one real user deploys the snapshot + uses Partner 1 flow — confirms UX works at single-partner depth
3. THEN layer multi-partner (partners 2, 3, 4) on top as v2 feature

**Estimated effort when we build:** ~8-12 hours (new custom values + tags + workflow filters + UI in onboarding form). Minor update to existing workflows to use `{{assigned_partner.*}}` indirection.

---

## Open questions to resolve before building

- Do we hard-cap at 4 partners or allow arbitrary? 4 is enough for v2, unlimited is v3.
- How does the mortgage pro change which partner is assigned to a lead mid-flow? Dropdown in contact detail? Workflow step?
- Can a lead be reassigned between partners? When and why?
- Reporting: mortgage pro dashboard view shows leads assigned to each partner separately. Partner sees their own dashboard (separate GHL user account?) or get emailed reports?

These get resolved after base snapshot ships and the first real user tells us what they actually need.
