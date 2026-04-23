# Easy Deploy — Frontend Page Stubs

Minimal React page scaffolds for the 8 required pages. Each stub defines:
- Component structure
- Data fetching plan (which API endpoint it calls)
- Layout sketch (what UI elements go where)
- TODO list for the build phase

**Stack:** React + Vite + Tailwind + Framer Motion + React Three Fiber (for Orb 3D)
**Theme:** navy (#0A1628) + gold (#C9A84C) — matches Xpert brand
**Mobile-first:** all pages must work at 320px width

## The 9 pages (post-Ulio-recon)

| Stub | Path | Purpose |
|---|---|---|
| `OrbPage.jsx` | `/orb` | Orb chat — interview the lead, build their system |
| `LeadsPage.jsx` | `/leads` | Lead Finder + Business Deep Dive with review-signal tags |
| `EmployeesPage.jsx` | `/employees` | AI Employees — bot library, per-bot enable/configure |
| `SamplePage.jsx` | `/sample` | Sample — public marketing demo of a deployed system |
| `PricingPage.jsx` | `/pricing` | Sliding-scale pricing + LIVE PROFITABILITY CALC |
| `ProposalPage.jsx` | `/proposal/:id` | AI proposal, editable before send |
| `PaymentPage.jsx` | `/pay/:proposalId` | Stripe checkout + e-sign + T&Cs (5 mandatory checkboxes) |
| `SettingsPage.jsx` | `/settings` | Account / billing / branding / integrations / team seats |
| `VoiceSettingsPage.jsx` | `/settings/voice` | Voice AI config + simulated-call stress test |
| `ContentLibraryPage.jsx` | `/library` | **9th page — creator/affiliate growth engine** 20% lifetime recurring. Niche-specific kits. |

## Navigation
Public pages: Sample, Pricing, Orb (entry point) — no login needed
Authenticated pages: Leads, Employees, Proposal (view), Payment, Settings, Voice Settings

## Build order (when we get to it)
1. OrbPage (the conversion engine)
2. PricingPage + ProposalPage + PaymentPage (the money path)
3. LeadsPage (the Lead Finder — MVP does GBP API search)
4. EmployeesPage + SettingsPage + VoiceSettingsPage (post-onboard config)
5. SamplePage (marketing polish)
