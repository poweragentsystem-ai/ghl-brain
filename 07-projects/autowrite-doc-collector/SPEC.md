# autowrite.ca — Mortgage Document Collector & AI Underwriter

*Living spec. Source of truth for the build. Captured from Renée's intel drop (`msh0e4rmgyjv`, 2026-08-06) + follow-up intake logic (2026-08-06). Update as decisions are made. NOTHING here is final product rule until Renée / Morgan (Mortgage) confirms — see "⚠️ Confirm-before-hardcode" flags.*

---

## 1. Vision (one line)

A secure portal where a mortgage professional sends a client a link, the client uploads their documents, and the app **collects, stores, reads, quality-checks, and reviews** them — acting as a built-in document collector + underwriter so the agent never chases paper.

**Positioning:** per-seat SaaS that plugs in for *any* agent working anywhere. Must be friendly to **Velocity, Scarlett, Finmo** and others over time.

---

## 2. Core principle — NEVER DEAD-END A DEAL (non-hardcode rule)

This is the #1 design law for the intake engine and echoes Renée's standing HARDCODE-PREVENTION rule.

The engine must think like a real mortgage pro, not a rigid form. It must **never hardcode a deal to "won't go through"** based on a single answer. Instead it asks for the *alternative* documents that could make the deal work.

Worked examples Renée gave:
- **Unemployed homeowner** → still has access to home equity. Do NOT dead-end on "no job." Ask for other income docs — CPP, OAS, pension, investment income, etc. — and keep the deal alive.
- **Too young for a reverse mortgage** → do NOT stop them. Prompt: "you can still move forward" and route them down the **refinance** path instead.

Rule of thumb: every "no" branch must offer a "here's the other way" branch.

---

## 3. Dynamic Document Requirements Engine (the heart of the app)

The client answers a short set of questions (the same ones a mortgage pro would ask), and the app **auto-populates the exact document checklist** for their situation. Documents are never a fixed list — they're computed from answers.

### Situation → document set (examples given)
| Client selects... | Auto-populate |
|---|---|
| **Self-employed** | Self-employment income docs (NOAs, T1s, master business licence, articles/letter of incorporation, etc.) |
| **Existing homeowner** | Homeowner/property docs (equity take-out path) |
| **Employed** (T4 income) | T4s, NOAs, paystubs, employment letter *(⚠️ confirm exact set)* |
| **Unemployed homeowner** | Alternative income docs (CPP / OAS / pension / investment income) — never dead-end |

The engine decides the doc set the way a mortgage professional would: from employment type, ownership status, deal type, timeline, and exit plan.

---

## 4. Canadian mortgage product knowledge (must be pro-level)

The engine must understand Canadian mortgage products well enough to classify the deal and ask the right follow-ups.

### Private mortgage — definition (Renée's)
A deal is **private** when any of these are true:
- **Homeowner** with **under 80% LTV** (equity take-out), OR
- **Purchase** with **over 20% down payment** AND needs a **quick close**, OR
- Client **needs the funding in days** → obviously private.

### Private mortgage — mandatory intake question: EXIT PLAN
Every private deal must ask the client's exit plan (client-facing, on the main page):
- **Sell**, or
- **Refinance**, or
- **Pay off with cash**, or
- Other.

### Reverse mortgage age gate → refinance fallback
- If the client is **not of age for a reverse mortgage**, do NOT stop them.
- Prompt: they can still move forward → take them down the **refinance** path instead.
- *(⚠️ Confirm minimum reverse age — my understanding is 55 for CHIP/HomeEquity Bank; validate before hardcoding.)*

*(⚠️ Confirm-before-hardcode: the 80% LTV line, 20%-down line, and reverse age all need Morgan/Renée sign-off against current lender rules — see `project_canadian_mortgage_ltv_rules.md` in the brain, which already notes 80% ceilings.)*

---

## 5. Document knowledge base

The engine must recognize and correctly handle these document types. Each gets a **short, light description of how to obtain it** — NOT word-heavy.

Documents explicitly named:
- **NOA** — Notice of Assessment *(from CRA My Account)*
- **T4** — employment income slip *(from employer / CRA)*
- **Master business licence** — proof of registered business *(from provincial registry)*
- **Incorporation letter / articles of incorporation** — proof the business is incorporated

*(More to be added: paystubs, employment letter, T1 General, mortgage statement, property tax bill, home insurance, void cheque, etc. — TBD with Renée/Morgan.)*

---

## 6. Identity documents

The engine must know acceptable IDs and the **exact capture requirement** for each:

| ID type | What we capture |
|---|---|
| **Driver's licence** | **Front AND back** copies (if they choose this one) |
| **Credit card** | Required as a second piece of ID *(⚠️ confirm: which side / what we mask)* |
| **Passport** | **Picture page only** |

*(This aligns with two-piece ID / FINTRAC-style verification. ⚠️ Confirm the full acceptable-ID list and any masking rules for the credit card.)*

---

## 7. Client-side experience notes

- Questions live on the **main client-facing page** — the app asks, the client answers, docs auto-populate.
- Descriptions of how to get each doc: present but **light, not word-heavy**.
- Visual, glanceable status so anyone (incl. a brand-new licensee) can see what's done / missing / incorrect (colours + notes) — carried over from the original vision.

---

## 8. Open questions / gaps I'm flagging (pro lens)

Things a mortgage pro would also ask that aren't yet specified — to complete the logic tree:
1. **Deal type up front** — purchase / refinance / renewal / equity take-out / private? This is the top branch that drives everything.
2. **Property use** — owner-occupied / rental / second home? (Changes doc set + lender.)
3. **Down payment source** (purchase) — savings / gift / borrowed? (Gift letters, 90-day history.)
4. **Number of applicants / co-signers** — each needs their own ID + income docs.
5. **Credit consent** — do we pull/soft-check, or just collect? (Compliance.)
6. **Subject property details** — address, value estimate, existing mortgage balance (for LTV math).
7. **Which fields feed the actual application** — define the extraction schema per doc.
8. **Timeline capture** — "need funds in days" is the private trigger; make it an explicit question.

---

## 9. Status

- [x] Intel note read + captured
- [x] Intake logic (this doc) captured
- [x] Product rules validated (wowa.ca + `skills/morgan-mortgage.md`): reverse 55+ (CHIP ≤55% LTV, $250k min home), refi 80%/practical 75%, self-employed 2yr NOAs + T1/T2125 + licence/incorporation, FTB 5/10/20 tiers
- [x] MVP scope locked + **v1 BUILT: `app/`** — rules engine (24 tests green), client wizard + checklist + uploads, AI reader w/ SIN masking, agent dashboard, nudges, PIPEDA consent/privacy + FSRA footer. E2E-verified with screenshots; ledger: `app/test_result.md`
- [x] Stack + compliance model: Next.js/Vercel + Supabase ca-central-1 (Canadian residency); SIN answer = never collect + auto-mask from documents (OPC-grounded)
- [ ] Renée's go-live switches (~20 min, see `app/README.md`): Supabase project, Vercel env keys, autowrite.ca domain, OLS principal-broker review
- [x] **v1.1 (2026-08-06): the underwriter layer.** Cross-doc rules (employment letter <1yr tenure → auto-adds 2-year history docs; name-variant heads-up, neutral wording). Client "what/why" note + agent back-end notes. GDS/TDS panel (39/44 prime, 50/55 B-side colour verdicts, indicative). Ranked lender-fit panel: best-rate ties green-badged BEST, promos/broker incentives gold-highlighted, non-fits listed with reasons, FSRA indicative footer, lender names agent-only. Export = Velocity-API-IN-shaped JSON (no SIN possible). 40 unit tests + live E2E.
- [ ] **Rate-sheet ingestion** (the live numbers): lender rules seeded indicative; wire weekly ingest from Renée's Outlook lender emails via `skills/lender-matching-ols.md` Paths A (browser cookies, ship-today) / B (forward-rule alias) / C (scoped API key later). Cron diffs sheets + alerts on tightened criteria.
- [ ] **Integrations (researched, real paths):** Velocity = official **API IN** (request key inside Velocity: Add-Ons → Velocity API → Request API Key → add domain) → POST our export payload. Finmo = Lendesk partner API, same payload adapted. Scarlett = PIN-gated, no unattended API → export package for fast manual entry + doc upload (Morgan's auto-folder convention).
- [ ] Phase 2: employer real-company checks, multi-applicant portal UI, GHL/SMS nudges when account unlocked, appraisal coordination step, condo status certificate + rental/property-use branch.
- [ ] **Phase 3 — commercial deals:** parked until residential is mastered (Renée). Renée has a commercial-broker webinar template to seed the commercial doc engine — collect it when she's ready.
