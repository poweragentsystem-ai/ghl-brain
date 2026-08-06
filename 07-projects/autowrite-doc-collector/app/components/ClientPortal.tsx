"use client";

// The client-side portal: consent → one-question-per-screen wizard → dynamic
// checklist with uploads. Design rules: mobile-first, one primary action per
// screen, progress always visible, friendly plain language, never a dead end.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Note = { audience: string; tone: string; text: string };
type Req = {
  key: string;
  label: string;
  category: string;
  howToGet: string;
  parts?: string[];
  containsSin?: boolean;
};
type Doc = { id: string; reqKey: string; part: string | null; status: string; reason: string | null; uploadedAt: string };

interface PortalState {
  clientName: string;
  status: string;
  consentAt: string | null;
  answers: any;
  requirements: Req[];
  notes: Note[];
  docs: Doc[];
}

type StepId =
  | "goal" | "homeowner" | "numbers" | "timeline" | "exitPlan" | "reverse"
  | "employment" | "money" | "purchase" | "coApplicant" | "idType" | "review";

export default function ClientPortal({ token }: { token: string }) {
  const [state, setState] = useState<PortalState | null>(null);
  const [phase, setPhase] = useState<"loading" | "consent" | "wizard" | "checklist">("loading");
  const [answers, setAnswers] = useState<any>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);

  const api = useCallback(
    (body?: any) =>
      fetch(`/api/portal/${token}`, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : undefined).then(
        (r) => r.json(),
      ),
    [token],
  );

  const refresh = useCallback(async () => {
    const s = await api();
    if (s.error) {
      setError("This link isn't valid — check with your mortgage agent for a fresh one.");
      return;
    }
    setState(s);
    if (!s.consentAt) setPhase("consent");
    else if (s.requirements?.length) {
      setNotes(s.notes ?? []);
      setPhase("checklist");
    } else setPhase("wizard");
  }, [api]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // ---- dynamic step list (recomputed as answers change) ----
  const steps: StepId[] = useMemo(() => {
    const s: StepId[] = ["goal"];
    if (answers.goal === "unsure") return [...s, "idType", "review"];
    s.push("homeowner");
    if (answers.isHomeowner) s.push("numbers");
    if (answers.goal === "equity" || answers.goal === "purchase") s.push("timeline");
    const privateDeal =
      (answers.goal === "equity" && answers.timeline === "days") ||
      (answers.goal === "purchase" && answers.timeline === "days" && (answers.downPaymentPct ?? 0) >= 20);
    if (privateDeal) s.push("exitPlan");
    if (answers.goal === "equity" && answers.isHomeowner) s.push("reverse");
    s.push("employment", "money");
    if (answers.goal === "purchase") s.push("purchase");
    s.push("coApplicant", "idType", "review");
    return s;
  }, [answers]);

  const step = steps[Math.min(stepIndex, steps.length - 1)];
  const progress = phase === "checklist" ? 100 : Math.round((stepIndex / steps.length) * 100);

  const set = (k: string, v: any) => setAnswers((a: any) => ({ ...a, [k]: v }));
  const next = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const back = () => setStepIndex((i) => Math.max(i - 1, 0));
  const pick = (k: string, v: any) => {
    set(k, v);
    setTimeout(next, 150); // brief visual confirmation, then advance
  };

  const submitAnswers = async () => {
    const res = await api({ action: "answers", answers });
    if (res.ok) {
      setNotes(res.notes ?? []);
      await refresh();
      setPhase("checklist");
    }
  };

  if (error) return <Shell progress={0}><p className="card text-lg">{error}</p></Shell>;
  if (!state || phase === "loading") return <Shell progress={0}><p className="text-navy/50">Loading…</p></Shell>;

  if (phase === "consent") {
    return (
      <Shell progress={0}>
        <h1 className="text-2xl font-bold">Hi {state.clientName.split(" ")[0]} 👋</h1>
        <p className="mt-3 text-lg text-navy/80">
          Your mortgage agent uses Autowrite to collect your documents securely — no email attachments, no chasing.
        </p>
        <div className="card mt-6 space-y-3 text-navy/80">
          <p className="font-semibold text-navy">Before we start, the plain-English version of our privacy promise:</p>
          <ul className="list-disc space-y-2 pl-5 text-[15px]">
            <li>We only ask for documents your situation actually needs.</li>
            <li><strong>We never ask for your SIN.</strong> If it appears on a document (like a T4), we automatically hide it from view.</li>
            <li>Documents are encrypted and stored in Canada, visible only to you and your agent.</li>
            <li>Our secure AI reading service checks each document so you find out right away if a retake is needed.</li>
            <li>You can ask for your documents to be deleted any time before your application is submitted.</li>
          </ul>
          <p className="text-sm">
            Full details: <a className="underline" href="/privacy" target="_blank">privacy policy</a>.
          </p>
        </div>
        <button
          className="btn-primary mt-6"
          onClick={async () => {
            await api({ action: "consent" });
            setPhase("wizard");
          }}
        >
          I agree — let's go
        </button>
      </Shell>
    );
  }

  if (phase === "wizard") {
    return (
      <Shell progress={progress} stepLabel={`Step ${stepIndex + 1} of ${steps.length}`}>
        {step === "goal" && (
          <Q title="What brings you here today?">
            <Choice onClick={() => pick("goal", "purchase")} label="I'm buying a home" />
            <Choice onClick={() => pick("goal", "equity")} label="I want to access my home's equity" sub="Refinance, HELOC, second mortgage…" />
            <Choice onClick={() => pick("goal", "renewal")} label="My mortgage is up for renewal" />
            <Choice onClick={() => pick("goal", "unsure")} label="I'm not sure yet" sub="No stress — we'll figure it out together" />
          </Q>
        )}

        {step === "homeowner" && (
          <Q title="Do you currently own a home?">
            <Choice onClick={() => pick("isHomeowner", true)} label="Yes, I'm a homeowner" />
            <Choice onClick={() => pick("isHomeowner", false)} label="Not yet" />
          </Q>
        )}

        {step === "numbers" && (
          <Q title="A few quick numbers" sub="Best guesses are totally fine.">
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-navy/70">Property address</span>
              <input className="input" placeholder="e.g. 123 Main St, Mississauga" value={answers.propertyAddress ?? ""} onChange={(e) => set("propertyAddress", e.target.value)} />
            </label>
            <Num label="What's your home roughly worth?" value={answers.propertyValue} onChange={(v) => set("propertyValue", v)} placeholder="e.g. 800,000" />
            <Num label="What's left on your mortgage?" value={answers.mortgageBalance} onChange={(v) => set("mortgageBalance", v)} placeholder="e.g. 350,000" />
            {answers.goal === "equity" && (
              <Num label="How much are you hoping to access?" value={answers.cashNeeded} onChange={(v) => set("cashNeeded", v)} placeholder="e.g. 50,000" />
            )}
            <button className="btn-primary mt-2" onClick={next} disabled={!answers.propertyValue}>Continue</button>
          </Q>
        )}

        {step === "money" && (
          <Q title="Your money picture" sub="Rough numbers help us match you to the right options. Nothing here disqualifies you.">
            <Num label="Household income per year (before tax)" value={answers.annualIncome} onChange={(v) => set("annualIncome", v)} placeholder="e.g. 95,000" />
            <Num label="Monthly debt payments (cards, car, loans)" value={answers.monthlyDebts} onChange={(v) => set("monthlyDebts", v)} placeholder="e.g. 600 — put 0 if none" />
            <p className="mt-1 text-sm font-semibold text-navy/70">Any bankruptcy or consumer proposal in the last 7 years?</p>
            <Choice onClick={() => pick("hadBankruptcy", false)} label="No" active={answers.hadBankruptcy === false} />
            <Choice onClick={() => pick("hadBankruptcy", true)} label="Yes" sub="Good to know upfront — there are lenders for this" active={answers.hadBankruptcy === true} />
          </Q>
        )}

        {step === "timeline" && (
          <Q title="When do you need this done?">
            <Choice onClick={() => pick("timeline", "days")} label="Within days — it's urgent" />
            <Choice onClick={() => pick("timeline", "weeks")} label="In the next few weeks" />
            <Choice onClick={() => pick("timeline", "months")} label="No rush — a month or more" />
          </Q>
        )}

        {step === "exitPlan" && (
          <Q title="Fast funding it is. What's the plan afterwards?" sub="Short-term financing always has a next step — good to plan it now.">
            <Choice onClick={() => pick("exitPlan", "refinance")} label="Refinance into a regular mortgage" />
            <Choice onClick={() => pick("exitPlan", "sell")} label="Sell the property" />
            <Choice onClick={() => pick("exitPlan", "cash")} label="Pay it off with money coming in" />
            <Choice onClick={() => pick("exitPlan", "other")} label="Something else / not sure" />
          </Q>
        )}

        {step === "reverse" && (
          <Q title="One more — are you 55 or older?" sub="It unlocks an extra option for accessing equity.">
            <Choice
              onClick={() => { set("age", 60); set("interestedInReverse", true); setTimeout(next, 150); }}
              label="Yes, 55+"
            />
            <Choice
              onClick={() => { set("age", 45); set("interestedInReverse", true); setTimeout(next, 150); }}
              label="Not yet"
              sub="You can still move forward — we'll route you the refinance way"
            />
          </Q>
        )}

        {step === "employment" && (
          <Q title="How does your income come in?">
            <Choice onClick={() => pick("employment", "employed")} label="I'm employed" sub="Salary or hourly" />
            <Choice onClick={() => pick("employment", "self_employed")} label="I'm self-employed" sub="Business owner, contractor, freelance" />
            <Choice onClick={() => pick("employment", "retired")} label="I'm retired" />
            <Choice onClick={() => pick("employment", "not_working")} label="I'm between jobs right now" sub="That's okay — there are still options" />
          </Q>
        )}

        {step === "purchase" && (
          <Q title="About the purchase">
            <Num label="Purchase price (or budget)" value={answers.purchasePrice} onChange={(v) => set("purchasePrice", v)} placeholder="e.g. 650,000" />
            <Num label="Down payment (%)" value={answers.downPaymentPct} onChange={(v) => set("downPaymentPct", v)} placeholder="e.g. 10" />
            <p className="mt-1 text-sm font-semibold text-navy/70">Where's the down payment coming from?</p>
            <Choice onClick={() => pick("downPaymentSource", "savings")} label="My savings or investments" active={answers.downPaymentSource === "savings"} />
            <Choice onClick={() => pick("downPaymentSource", "gift")} label="A gift from family" active={answers.downPaymentSource === "gift"} />
            <Choice onClick={() => pick("downPaymentSource", "rrsp_hbp")} label="My RRSP (Home Buyers' Plan)" active={answers.downPaymentSource === "rrsp_hbp"} />
            <Choice onClick={() => pick("downPaymentSource", "sale_of_home")} label="Selling my current home" active={answers.downPaymentSource === "sale_of_home"} />
          </Q>
        )}

        {step === "coApplicant" && (
          <Q title="Is anyone applying with you?">
            <Choice onClick={() => pick("hasCoApplicant", false)} label="Just me" />
            <Choice onClick={() => pick("hasCoApplicant", true)} label="Yes — a partner or co-signer" sub="They'll need their own ID and income documents" />
          </Q>
        )}

        {step === "idType" && (
          <Q title="Which photo ID will you use?">
            <Choice onClick={() => pick("primaryIdType", "drivers_licence")} label="Driver's licence" sub="We'll need the front AND the back" />
            <Choice onClick={() => pick("primaryIdType", "passport")} label="Passport" sub="Just the picture page" />
          </Q>
        )}

        {step === "review" && (
          <Q title="Last one — in your own words" sub="What are you looking for, and why now? Totally optional, but it helps your agent help you.">
            <textarea
              className="input min-h-[110px]"
              placeholder="e.g. We want to consolidate two credit cards and redo the kitchen before winter…"
              value={answers.clientNote ?? ""}
              onChange={(e) => set("clientNote", e.target.value)}
            />
            <button className="btn-primary" onClick={submitAnswers}>Show my checklist</button>
          </Q>
        )}

        {stepIndex > 0 && (
          <button className="mt-6 text-sm font-medium text-navy/50 underline" onClick={back}>← Go back</button>
        )}
      </Shell>
    );
  }

  // ---- checklist ----
  return <Checklist token={token} state={state} notes={notes} onChange={refresh} />;
}

// ------------------------------------------------------------------ pieces

function Shell({ children, progress, stepLabel }: { children: React.ReactNode; progress: number; stepLabel?: string }) {
  return (
    <main className="mx-auto max-w-md px-5 py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-navy/50">
          <span className="uppercase tracking-widest text-teal">Autowrite</span>
          {stepLabel && <span>{stepLabel}</span>}
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-navy/10">
          <div className="h-full rounded-full bg-teal transition-all duration-500" style={{ width: `${Math.max(progress, 4)}%` }} />
        </div>
      </div>
      {children}
    </main>
  );
}

function Q({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div>
      <h1 className="text-2xl font-bold leading-snug">{title}</h1>
      {sub && <p className="mt-2 text-navy/60">{sub}</p>}
      <div className="mt-6 space-y-3">{children}</div>
    </div>
  );
}

function Choice({ label, sub, onClick, active }: { label: string; sub?: string; onClick: () => void; active?: boolean }) {
  return (
    <button className={`btn-choice ${active ? "btn-choice-active" : ""}`} onClick={onClick} type="button">
      <span className="block">{label}</span>
      {sub && <span className="mt-0.5 block text-sm font-normal text-navy/55">{sub}</span>}
    </button>
  );
}

function Num({ label, value, onChange, placeholder }: { label: string; value?: number; onChange: (v: number | undefined) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-navy/70">{label}</span>
      <input
        className="input"
        inputMode="numeric"
        placeholder={placeholder}
        value={value != null ? value.toLocaleString("en-CA") : ""}
        onChange={(e) => {
          const n = Number(e.target.value.replace(/[^0-9.]/g, ""));
          onChange(Number.isFinite(n) && n > 0 ? n : undefined);
        }}
      />
    </label>
  );
}

// ------------------------------------------------------------------ checklist

const STATUS_META: Record<string, { chip: string; cls: string }> = {
  verified: { chip: "✓ Looks great", cls: "bg-teal-soft text-teal" },
  accepted: { chip: "✓ Accepted", cls: "bg-teal-soft text-teal" },
  processing: { chip: "Checking…", cls: "bg-amber-soft text-navy/70" },
  needs_review: { chip: "With your agent", cls: "bg-amber-soft text-navy/70" },
  needs_reupload: { chip: "Needs a retake", cls: "bg-coral-soft text-coral" },
  rejected: { chip: "Needs a retake", cls: "bg-coral-soft text-coral" },
  missing: { chip: "To upload", cls: "bg-navy/5 text-navy/60" },
};

function Checklist({ token, state, notes, onChange }: { token: string; state: PortalState; notes: Note[]; onChange: () => Promise<void> }) {
  const slots = useMemo(() => {
    const out: Array<{ req: Req; part: string | null }> = [];
    for (const req of state.requirements) {
      if (req.parts?.length) req.parts.forEach((p) => out.push({ req, part: p }));
      else out.push({ req, part: null });
    }
    return out;
  }, [state.requirements]);

  const docFor = (key: string, part: string | null) => {
    const matches = state.docs
      .filter((d) => d.reqKey === key && (part ? d.part === part : true))
      .sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1));
    return matches[0] ?? null;
  };

  const done = slots.filter((s) => {
    const d = docFor(s.req.key, s.part);
    return d && ["verified", "accepted", "processing", "needs_review"].includes(d.status);
  }).length;
  const pct = slots.length ? Math.round((done / slots.length) * 100) : 0;

  const grouped = useMemo(() => {
    const order = ["identity", "income", "property", "deal", "other"];
    const names: Record<string, string> = {
      identity: "Your ID", income: "Income", property: "Your home", deal: "The deal", other: "Banking",
    };
    return order
      .map((cat) => ({ cat, name: names[cat], items: slots.filter((s) => s.req.category === cat) }))
      .filter((g) => g.items.length);
  }, [slots]);

  return (
    <main className="mx-auto max-w-md px-5 py-6 pb-16">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-teal">Autowrite</span>
        <span className="text-xs font-semibold text-navy/50">{done} of {slots.length} in</span>
      </div>

      <h1 className="mt-4 text-2xl font-bold">Your document checklist</h1>
      <p className="mt-1 text-navy/60">Built for your exact situation — nothing extra.</p>

      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-navy/10">
        <div
          className={`h-full rounded-full transition-all duration-700 ${pct === 100 ? "bg-teal" : "bg-teal/80"}`}
          style={{ width: `${Math.max(pct, 3)}%` }}
        />
      </div>
      <p className="mt-1 text-right text-sm font-bold text-teal">{pct}%</p>

      {notes.map((n, i) => (
        <div key={i} className={`card mt-3 text-[15px] ${n.tone === "good_news" ? "border-teal/40 bg-teal-soft" : ""}`}>
          {n.tone === "good_news" ? "💡 " : ""}{n.text}
        </div>
      ))}

      {pct === 100 && (
        <div className="card mt-3 border-teal/40 bg-teal-soft text-[15px]">
          🎉 That's everything — your agent takes it from here. We'll ping you only if something needs a retake.
        </div>
      )}

      {grouped.map((g) => (
        <section key={g.cat} className="mt-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-navy/50">{g.name}</h2>
          <div className="space-y-3">
            {g.items.map((s) => (
              <UploadCard
                key={`${s.req.key}-${s.part ?? "single"}`}
                token={token}
                req={s.req}
                part={s.part}
                doc={docFor(s.req.key, s.part)}
                onDone={onChange}
              />
            ))}
          </div>
        </section>
      ))}

      <p className="mt-8 text-center text-xs text-navy/40">
        Documents are encrypted, stored in Canada, and SINs are automatically hidden. <a href="/privacy" className="underline">Privacy</a>
      </p>
    </main>
  );
}

function UploadCard({ token, req, part, doc, onDone }: { token: string; req: Req; part: string | null; doc: Doc | null; onDone: () => Promise<void> }) {
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const status = doc?.status ?? "missing";
  const meta = STATUS_META[status] ?? STATUS_META.missing;
  const needsAction = status === "missing" || status === "needs_reupload" || status === "rejected";

  const upload = async (f: File) => {
    setBusy(true);
    setLocalError(null);
    const fd = new FormData();
    fd.set("reqKey", req.key);
    if (part) fd.set("part", part);
    fd.set("file", f);
    try {
      const res = await fetch(`/api/portal/${token}/upload`, { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) setLocalError(json.error ?? "Upload failed — try again.");
      await onDone();
    } catch {
      setLocalError("Connection hiccup — try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold leading-snug">
            {req.label}
            {part ? <span className="text-navy/50"> — {part}</span> : null}
          </p>
          <p className="mt-1 text-sm text-navy/55">{req.howToGet}</p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${meta.cls}`}>
          {busy ? "Uploading…" : meta.chip}
        </span>
      </div>

      {doc?.reason && (status === "needs_reupload" || status === "rejected") && (
        <p className="mt-3 rounded-lg bg-coral-soft px-3 py-2 text-sm text-navy/80">{doc.reason}</p>
      )}
      {localError && <p className="mt-3 text-sm font-medium text-coral">{localError}</p>}

      {(needsAction || status === "processing") && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,application/pdf"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.currentTarget.value = "";
            }}
          />
          {needsAction && (
            <button
              type="button"
              disabled={busy}
              onClick={() => inputRef.current?.click()}
              className="mt-3 w-full rounded-xl2 border-2 border-dashed border-teal/50 bg-teal-soft/50 px-4 py-3 text-sm font-semibold text-teal transition active:scale-[0.99]"
            >
              {status === "missing" ? "📷 Take a photo or choose a file" : "↻ Upload a better copy"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
