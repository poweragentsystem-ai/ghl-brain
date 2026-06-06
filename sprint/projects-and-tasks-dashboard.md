# Projects & Tasks Dashboard

**Last refreshed:** 2026-04-29 (mid-day after solo work block)
**Source:** Console queue (30+ pending) + Command Center todo (#27-#52 pending)
**Use until:** Command Center Stitch redesign ships (replaces this view)

## 🆕 Shipped this work block (while Renée was in GHL)

1. **OLS lender form 5/10 → 7/10** — 4 missing dimensions live: town population (Nominatim+KV cache), property condition (5 levels), construction phase (5 stages), raw land. 4 live tests passed. Composite gets to 9/10 the moment Microsoft Graph wire activates.
2. **Microsoft Graph / Outlook skeleton LIVE** — `/api/outlook?action=status` reports state, `/api/outlook-callback` handles OAuth, `/api/outlook` runs the Graph query. Bridge-poll Mon-Fri tries Graph first, falls back to Console queue. Once Renée drops 3 vault entries + clicks consent URL, all 5 duplicate Morgan tasks die.
3. **Agency naming gate 1-3 done** — DNS-batch tool (re-runnable). 79 names checked. 5 finalists clear all 3 TLDs: Aidently, Aidemix, Attainio, Aigentlet, Taskeek. Console task `t_moju28dfm8kp` pushed for USPTO + CIPO + Google active-business gates.
4. **Stitch 12th screen pushed** — Console task `t_mojsf82furl2` for Marketing & Pipeline Mobile.
5. **Gary V TikTok Shop intel** — added to billion-dollar-board-applied.md. Deferred until $5K MRR + AI video pipeline operational.

Tasks are bucketed by project. Each task shows ID + priority + one-line summary. Click an ID against `https://xpert-command-center.vercel.app/api/console-queue?id=<ID>` to read the full body.

---

## 🏦 1. EquityMax — Mortgage Live Account (TOP PRIORITY)

The going-live mortgage sub. Most urgent because real leads will hit this.

| ID | Priority | Task |
|---|---|---|
| `t_moda6mqw5xdm` | 🔴 urgent | **MEGA TASK** — Finish EqM mortgage account stage-by-stage per 12-stage lifecycle blueprint. Consolidates 7 sub-tasks. |
| `t_mod060yxyv52` | 🔴 urgent | Pre-Qualifier #9 + #11 final split — move #9 → Partner folder, scrub #11 of personal info, copy #9 to ABC. |
| `t_mod79ja1g2wj` | 🔴 urgent | Tag schema update — kill `mortgage-lead`, use intent-specific tags. |
| `t_moepzmrvlilm` | 🔴 urgent | Fix EqM daily cold email workflow. |
| `t_moetiqqq8k8y` | 🔴 urgent | Niche words = niche tokens drill (no hardcoded "mortgage" / "EquityMax"). |
| `t_mof2mdjrw3lr` | 🔴 urgent | Fix 2 issues GHL AI agent diagnosed before ad launch. |
| `t_mod5c2sovlzg` | 🟡 high | Phase 2 — Partner full-stack build (4 folders + 2 workflows + 3 email templates). |
| `t_mod70nvoo6dt` | 🟡 high | Mine + generalize EqM rebuttals → master rebuttal library. |
| `t_mod9y13nj7ud` | 🟡 high | Find + modernize legacy product-to-tag workflow. |
| `t_mof256fsm9ps` | 🟡 high | Hardcoded-email sweep + tag-deletion orphan check. |
| `t_mogrb88dqmvq` | 🔴 urgent | Cold-contact re-engagement workflow — 64 untagged contacts. |
| `t_mogurioeb7m5` | 🟡 high | Tokenize all Conversational AI FAQs (strip personal info, gender-neutral). |
| #29 | pending | Update HELOC + Private Mortgage flows — under-50k path for homeowners with equity. |
| #45 | pending | 9 manual GHL items for Canadian Mortgage Snapshot (Onboarding workflow, Voice AI booking, OAuth, etc). |

**Total: 14 tasks**

---

## 🔧 2. ABC + EquityMax — Cross-Sub Hard Rules

Meta-rules applying to BOTH subs.

| ID | Priority | Task |
|---|---|---|
| `t_moep6kc3kcue` | 🔴 urgent | NEW HARD RULES — no hardcoded personal info anywhere. |
| `t_moernlelpv8f` | 🔴 urgent | Boy Scout rule — fix hardcoded info on every visit. |
| `t_moevubcayrpv` | 🔴 urgent | Checkpoint discipline meta-rule. |
| `t_mod5jp4dhh98` | 🔴 urgent | Tone audit supplement (mortgage-sales-writing.md is mandatory). |
| `t_mod5cpd63fbr` | 🟡 high | Human tone audit — every SMS / email / agent greeting in both subs. |
| `t_mod9ndhmdmfz` | 🟡 high | Platform audit vs 12-stage lifecycle blueprint. |
| `t_moeqes87bq69` | 🟡 high | Hardcoded-info sweep — every template + agent + workflow body. |
| `t_mof0uxcehiy5` | 🟡 high | Wire meeting_type conditional logic into appointment emails. |
| #31 | pending | Platform audit — map current EqM + ABC against 12-stage blueprint (CC duplicate). |

**Total: 9 tasks**

---

## 📨 3. Morgan (Mortgage Assistant) — Outlook Lender Scrape

Multiple iterations of the same scrape (the Outlook problem).

| ID | Priority | Task |
|---|---|---|
| `t_moi89pi2mwf6` | 🔴 urgent | Morgan v4 — Outlook lender scrape, expanded criteria template. |
| `t_moi7wff8c9ff` | 🔴 urgent | Morgan v3 — exact extraction template. |
| `t_moi7iwj2yys5` | 🔴 urgent | Morgan v2 — comprehensive lender DB rebuild from real sources. |
| `t_moi7eypdf61n` | 🔴 urgent | Morgan urgent — find under-$50K HELOC lender from emails. |
| `t_mogv99863mja` | 🟡 high | Morgan: scrape Outlook lender emails — rate sheets, conditions, under-$50k HELOC. |

**Note:** The 5 Morgan tasks are duplicates / iterations. Once Microsoft Graph is wired (plan in `projects/outlook-graph-integration/plan.md`), all 5 collapse into one cron. **Renée action needed:** register Azure AD app + add `MS_GRAPH_TENANT_ID` / `MS_GRAPH_CLIENT_ID` / `MS_GRAPH_CLIENT_SECRET` to vault.

**Total: 5 tasks (will collapse to 1 after Graph wire)**

---

## 🎬 4. Skool / AI Video Bootcamp Scrape (URGENT — sub canceled)

Renée canceled Skool subscription. Capture before access expires.

| ID | Priority | Task |
|---|---|---|
| `t_mojrwi84s21n` | 🔴 urgent | **AIVB v5 — DEADLINE BEFORE SUB CANCELS.** Soak up everything before lockout. |
| `t_mogqd9ou1faw` | 🔴 urgent | Skool extraction — Cliff Notes + Klient Engine + AI Video Bootcamp + Just Build It Jarvis demo. |
| `t_mogtqlws6h66` | 🟡 high | Skool refined scope (Cliff Notes done; AI Video Bootcamp + Just Build It priority). |
| `t_moj70wuh0b0l` | 🟡 high | AIVB extraction via Renée's logged-in Skool session. |

**Total: 4 tasks**

---

## 🎨 5. Command Center — Stitch Capture → Rebuild

| ID | Priority | Task |
|---|---|---|
| `t_mojsf82furl2` | 🟡 high | **JUST PUSHED.** Capture 12th Stitch screen — `9a3d718f94ab454d9fc6a57d80023aa3` Marketing & Pipeline (Mobile). |
| `t_mojntamovs4v` | ✅ done | Stitch precision fetch — 11 screens (Console completed batch 1 + 2). |
| (post-capture) | queued | Extract design system from screenshots → write `design-system.md` → rebuild Command Center against Renée's actual designs. |

**Total: 1 active + 1 post-capture step**

---

## 🌐 6. Assistlet.ai Website

| ID | Priority | Task |
|---|---|---|
| #44 | pending | Buy assistlet.ai domain + point at Vercel + set up hello@assistlet.ai email. |
| #51 | pending | Approach G hero rebuild — motionsites + Claude Design + Whisk video, cinematic upgrade. |
| #52 | pending | Mortgage Commercial website redesign — apply saved hero spec with original copy + own Whisk video. |

**Brand-validation gate:** still pending Renée's pick from naming finalists (Praime / Aidyn / Aidently / Aidento / Aidemix / Attainio / Raiseup / Aigentlet / Taskeek). All cleared .com + .ai + USPTO + CIPO.

**Total: 3 tasks (blocked on Renée: domain purchase + name decision)**

---

## 📦 7. Snapshots — USA + General Business

| ID | Priority | Task |
|---|---|---|
| #46 | pending | USA Mortgage Snapshot — clone Canadian, swap CASL/FSRA → TCPA/state-licensing. |
| #47 | pending | General Business Snapshot — clone Canadian, simplify to 6-stage pipeline. |
| #50 | pending | Find 100 validated agency names (.com / .ai / USPTO / CIPO / Google active-business). |

**Total: 3 tasks**

---

## 💼 8. Easy Deploy SaaS Platform

| ID | Priority | Task |
|---|---|---|
| #27 | pending | Orb visual upgrade — port hero orb from poweragentsystem.ca with talk-reactive shapes. |
| (built) | ready | Pricing engine, ORB interview, sliding pricing, proposal generator — needs first paying subscriber to validate. |

**Blocker:** brand name + domain decision (rolls up to Assistlet bucket).

**Total: 1 active task**

---

## 🏛️ 9. OLS Lender Match Tool

| ID | Priority | Task |
|---|---|---|
| #49 | pending | Resume OLS lender form to 9/10. Read build plan first. Already deployed at `/lender-match.html`. |

**Total: 1 task**

---

## 📧 10. Cold Email Infrastructure

| ID | Priority | Task |
|---|---|---|
| #39 | pending | Add cold email sending domains so the cold-email machine can actually send. |
| #40 | pending | Apollo $49/mo upgrade — trigger when first cold-email booking confirmed. |

**Total: 2 tasks (#40 is gated on #39)**

---

## 🧠 11. Internal Brain / Agent Infrastructure

| ID | Priority | Task |
|---|---|---|
| #41 | pending | Wire auto-append to Jordan learning brain — never let it go stale. |
| #32 | pending | Build Amy's Console usage monitor — pre-emptive burnout warnings. |

**Total: 2 tasks**

---

## 📊 Quick counts

| Bucket | Count | Hottest item |
|---|---|---|
| EquityMax going-live | 14 | `t_moda6mqw5xdm` MEGA |
| ABC + EqM cross-sub rules | 9 | Hard rules + tone |
| Morgan Outlook scrape | 5 | Collapses on Graph wire |
| Skool / AIVB | 4 | Sub canceled — DEADLINE |
| Stitch capture | 1 | 12th screen pushed |
| Assistlet website | 3 | Blocked on name + domain |
| USA + General snapshots | 3 | After EqM ships |
| Easy Deploy | 1 | Blocked on brand |
| OLS lender form | 1 | Resume to 9/10 |
| Cold email infra | 2 | #39 unblocks #40 |
| Internal brain | 2 | Compounding |
| **TOTAL PENDING** | **45** | |

---

## What I see when I zoom out

1. **The mountain is EquityMax going-live (14 tasks).** Until that ships there's no real revenue test.
2. **The Outlook scrape is bleeding tokens** — 5 duplicate tasks because we kept hand-rolling iterations. Microsoft Graph wire kills all 5 in one shot. **3 vault entries from Renée → unblocks everything.**
3. **The Skool deadline is now.** AIVB v5 is the most time-sensitive thing on the board.
4. **Brand name decision blocks 4 buckets** — Assistlet website + Easy Deploy + USA Snapshot + General Snapshot all need the rename to settle.
5. **Stitch redesign coming through cleanly** — 11 screens captured, 12th in flight. Once Console finishes #12 I extract the design system and the rebuild starts.

---

*Auto-refreshed when console queue + command-center todos change. Renée: when you want a fresh snapshot, ask "show me the projects view" and I rebuild this.*
