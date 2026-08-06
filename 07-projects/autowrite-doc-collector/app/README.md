# autowrite — Mortgage documents, without the chase

Secure document-collection portal for mortgage professionals. Client answers ~8 friendly
questions → the rules engine computes their exact document checklist → uploads are
AI-read, quality-checked and SIN-masked → the agent watches a glanceable dashboard and
one-taps nudges instead of chasing paper.

**Basically:** send a client one link; the app does what a great document collector does.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000  (agent password: change-me)
npm test           # 24 rules-engine + SIN-masking tests
```

Zero config needed for the demo: local JSON store, simulated AI reader (filename steers
outcomes: `blurry-*` → retake, `wrongdoc-*` → wrong type, `old-*` → outdated, `edited-*`
→ agent review), nudges logged not sent.

## Architecture (all keys server-side; browser only ever calls our /api routes)

- `lib/rules/` — **the brain.** Declarative doc catalogue + evaluator. Design law #1:
  never dead-end a deal — every failed gate emits the alternative path (unemployed
  homeowner → CPP/pension docs; under-55 reverse → refinance). 24 tests enforce this.
- `lib/ai/reader.ts` — classify → quality-gate (blur/pages/expiry/staleness) → extract →
  scrub. Claude vision when `ANTHROPIC_API_KEY` is set; deterministic simulator otherwise.
- `lib/sin.ts` — the PIPEDA answer: we never ASK for a SIN; docs that carry one (T4/NOA)
  get Luhn-verified detection + masking; the raw number is never stored or logged.
- `lib/store.ts` — DemoStore (local) / SupabaseStore (production, REST) behind one interface.
- `app/c/[token]` — client portal (consent → wizard → checklist). `app/dashboard` — agent.
- `app/api/cron/digest` — every-3-days nudge cadence (per mortgage-workflow-playbook).

## Going live (Renée's switches — ~20 min total)

1. **Supabase** (Canadian data residency): create project → region **ca-central-1 (Montreal)**.
   SQL editor → run:
   ```sql
   create table aw_files  (id text primary key, data jsonb not null);
   create table aw_docs   (id text primary key, file_id text not null, data jsonb not null);
   create table aw_events (id bigint generated always as identity primary key, file_id text, data jsonb not null);
   ```
   Storage → new **private** bucket `client-docs`. Copy URL + service-role key.
2. **Vercel**: import this folder as project `autowrite` → set env vars from `.env.example`
   (strong `AGENT_PASSWORD`, random `AUTH_SECRET`, Supabase trio, `ANTHROPIC_API_KEY`,
   optionally `RESEND_API_KEY` + `CRON_SECRET`). Keep `APP_ENV=test` until OLS sign-off,
   then `APP_ENV=production` enables real client email.
3. **Domain**: point autowrite.ca at the Vercel project.
4. **Compliance gate before ANY real client**: OLS principal-broker review (standing rule).

## Safety rails baked in

- Non-production mail is force-routed to `TEST_CONTACT_EMAIL` (Renée's test contact) — the
  app cannot email a real client until `APP_ENV=production` is deliberately set.
- Rate limits on auth/portal/upload; security headers; 15 MB / image-or-PDF upload gate.
- Every view/action lands in a per-file audit trail.
- Flag language is neutral ("review suggested") — the app never calls a document fraud;
  the agent judges.
