# GHL Update Check — the self-refreshing GHL knowledge engine

> **Purpose:** GHL ships AI features faster than Claude's training data updates. This skill is the repeatable procedure that pulls what's new, diffs it against what `gill.md` already knows, updates the skill files, writes a plain-English brief for Renée + a Console handoff, and stamps the "last checked" date. Run it on the session-start staleness gate (>14 days) or any time Renée says "check GHL updates."
>
> Origin: `feedback_stay_current_on_ghl` memory + Renée's 2026-06-10 request to keep GHL skills auto-current.

---

## When this runs
1. **Session-start staleness gate** — `session-start.md` Step 7.5 checks `~/.claude/state/ghl-last-checked.md`. If `last_checked` is >14 days ago, run this skill before responding (silent unless something material changed, then surface it).
2. **On demand** — Renée says "check GHL updates / refresh GHL skills / what's new in GHL."
3. **Before any non-trivial GHL build** — quick version: just re-read the baseline below and spot-check the one feature you're about to use.

---

## The procedure (8 steps)

### 1. Read the baseline
Open `~/.claude/state/ghl-last-checked.md` — it holds `last_checked` + the known-feature baseline list. This is what we already know, so we only act on deltas.

### 2. Pull the sources (WebSearch + WebFetch, in parallel)
- GHL official changelog: `https://ideas.gohighlevel.com/changelog`
- GHL AI page: `https://www.gohighlevel.com/ai`
- GHL support / help docs for any feature named in the changelog
- WebSearch: `GoHighLevel changelog new features <current month year>` and `GoHighLevel AI Agent Studio / Voice AI / Conversation AI <year> update`
- Community signal (only if a release is ambiguous): r/gohighlevel, GHL Facebook group threads
Prefer **help.gohighlevel.com support docs and ideas.gohighlevel.com/changelog** as authoritative; treat third-party blogs as leads to verify, not facts. Cite source URLs in the brief.

### 3. Diff against baseline
For each feature found: is it in the baseline list? If NO → it's a delta. If YES but changed (new config option, model bump, renamed) → it's a delta. Ignore unchanged items.

### 4. Classify each delta for relevance to us
Tag each: **🟢 USE NOW** (relevant to EquityMax mortgage / snapshot / AI Consulting), **🟡 WATCH** (useful later), **⚪ IGNORE** (not our use case). Run it through the operator lens: USEFUL / EASIEST path / works FOR Renée.

### 5. Update the skill files (MIGRATION DISCIPLINE — additive only)
- `claude-skills/gill.md` → update/extend the `## 2026 AI FEATURES` section. ADD new facts; if a fact changed, keep the old note with a strikethrough/“was” marker so we never silently drop knowledge.
- If an architecture pattern changed (e.g. new agent node type, new trigger) → also update the relevant section of `gill.md` and any affected agent prompt in `XpertVault/06-skills/`.
- Never remove a known fact without noting why.

### 6. Write the outputs
- **Plain-English brief for Renée** → `XpertVault/12-daily/ghl-updates/<YYYY-MM-DD>-ghl-update-brief.md` — what's new, what it means for us, ideas, what I changed. Conversational voice, no jargon.
- **Console handoff** (only if a delta needs Console/UI action) → `Desktop/New — Pending Prompts/paste-to-console-ghl-<topic>.html` + log it in `PROMPT-TRACKER.md`. Console can't read Claude's head — the doc must be self-contained: what the feature is, where it lives in the GHL UI, exact steps, and the test to confirm it worked.

### 7. Stamp the state file
Rewrite `~/.claude/state/ghl-last-checked.md`: bump `last_checked` to today, append any new features to the baseline list, note the brief filename.

### 8. Surface to Renée
If anything is 🟢 USE NOW, lead the next response with a 2-3 line summary + link to the brief. If nothing material changed, one line: "GHL check done — nothing new worth acting on since <date>." Never bury a material change.

---

## Guardrails
- ❌ Don't quote model names / prompt-char budgets / token limits without a current source — they change.
- ❌ Don't assume a feature works like it did at training cutoff.
- ✅ Flag knowledge cutoff in any GHL artifact: "Based on GHL features verified <date> — if your panel shows new options, screenshot it."
- ✅ Where a third-party blog and an official doc conflict, the official doc wins; if only a blog has it, mark it "unverified — confirm in panel."
- ✅ Amy cost note: a full run is ~3 searches + 2-4 fetches + writes (~$0.10-0.30). Cheap. Don't skip it to save pennies.

## Cross-references
- `gill.md` — the GHL skill this keeps current (`## 2026 AI FEATURES` section)
- memory `feedback_stay_current_on_ghl` — the rule this operationalizes
- memory `feedback_event_driven_over_cron` — why this is a session-start gate, not a polling cron
- `session-start.md` Step 7.5 — the staleness gate that fires this
