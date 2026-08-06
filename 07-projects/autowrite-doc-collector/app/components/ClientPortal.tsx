"use client";

// Client portal: consent → product-first wizard → checklist with uploads.
// Also serves: agent-filled intake (?as=agent), returning-client welcome-back,
// and co-applicant portals with privacy-by-default document separation.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Note = { audience: string; tone: string; text: string };
type Req = { key: string; label: string; category: string; howToGet: string; parts?: string[]; perApplicant?: boolean };
type Slot = { reqKey: string; part: string | null; applicantId: string; applicantName: string | null; status: string; reason: string | null };
type ApplicantInfo = { id: string; name: string; mode: "self" | "delegated"; shareWithPrimary: boolean };

interface PortalState {
  clientName: string;
  viewer: { type: "primary" | "applicant"; name: string; shareWithPrimary: boolean | null };
  status: string;
  consentAt: string | null;
  intakeDone: boolean;
  requirements: Req[];
  notes: Note[];
  slots: Slot[];
  applicants: ApplicantInfo[];
  privateSummaries: Array<{ id: string; name: string; total: number; done: number }>;
}

type StepId =
  | "goal" | "homeowner" | "numbers" | "reverseAge" | "timeline" | "exitPlan"
  | "employment" | "money" | "purchase" | "coApplicant" | "idType" | "review";

export default function ClientPortal({ token, asAgent = false }: { token: string; asAgent?: boolean }) {
  const [state, setState] = useState<PortalState | null>(null);
  const [phase, setPhase] = useState<"loading" | "consent" | "wizard" | "checklist" | "agentDone" | "waitIntake">("loading");
  const [answers, setAnswers] = useState<any>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const api = useCallback(
    (body?: any) =>
      fetch(`/api/portal/${token}`, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : undefined).then(
        (r) => r.json(),
      ),
    [token],
  );

  const refresh = useCallback(async () => {
    const s: PortalState & { error?: string } = await api();
    if (s.error) {
      setError("This link isn't valid — check with your mortgage agent for a fresh one.");
      return;
    }
    setState(s);
    if (asAgent) {
      setPhase(s.intakeDone ? "agentDone" : "wizard");
      return;
    }
    if (s.viewer.type === "applicant") {
      setPhase(s.intakeDone ? "checklist" : "waitIntake");
      return;
    }
    if (!s.consentAt) setPhase("consent");
    else if (s.intakeDone) setPhase("checklist");
    else setPhase("wizard");
  }, [api, asAgent]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // ---- dynamic steps, driven by the start-screen product choice ----
  const steps: StepId[] = useMemo(() => {
    const s: StepId[] = ["goal"];
    const pc = answers.productChoice;
    if (!pc) return s;
    if (pc === "other") return [...s, "employment", "idType", "review"];
    s.push("homeowner");
    if (answers.isHomeowner) s.push("numbers");
    if (pc === "reverse") s.push("reverseAge");
    if (pc === "purchase" || pc === "refinance") s.push("timeline");
    const isPrivate = pc === "private" || answers.timeline === "days";
    if (isPrivate) s.push("exitPlan");
    if (!(pc === "reverse" && (answers.age ?? 0) >= 55)) s.push("employment", "money");
    if (pc === "purchase") s.push("purchase");
    s.push("coApplicant", "idType", "review");
    return s;
  }, [answers]);

  const step = steps[Math.min(stepIndex, steps.length - 1)];
  const progress = Math.round((stepIndex / steps.length) * 100);

  const set = (k: string, v: any) => setAnswers((a: any) => ({ ...a, [k]: v }));
  const next = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const back = () => setStepIndex((i) => Math.max(i - 1, 0));
  const pick = (k: string, v: any) => {
    set(k, v);
    setTimeout(next, 150);
  };
  const pickProduct = (pc: string, goal: string, extra?: Record<string, any>) => {
    setAnswers((a: any) => ({ ...a, productChoice: pc, goal, ...(extra ?? {}) }));
    setTimeout(next, 150);
  };

  const submitAnswers = async () => {
    const payload = { ...answers, completedBy: asAgent ? "agent" : "client" };
    const res = await api({ action: "answers", answers: payload });
    if (res.ok) {
      await refresh();
      setPhase(asAgent ? "agentDone" : "checklist");
    }
  };

  if (error) return <Shell progress={0}><p className="card text-lg">{error}</p></Shell>;
  if (!state || phase === "loading") return <Shell progress={0}><p className="text-navy/50">Loading…</p></Shell>;

  if (phase === "waitIntake") {
    return (
      <Shell progress={0}>
        <h1 className="text-2xl font-bold">Hi {state.viewer.name.split(" ")[0]} 👋</h1>
        <p className="mt-3 text-lg text-navy/80">
          You've been added as a co-applicant on {state.clientName}'s mortgage file. As soon as the
          main application details are in, your personal document checklist appears right here.
        </p>
        <p className="mt-3 text-navy/60">Bookmark this link — it's yours alone.</p>
      </Shell>
    );
  }

  if (phase === "agentDone") {
    return (
      <Shell progress={100}>
        <h1 className="text-2xl font-bold">Intake saved ✓</h1>
        <p className="mt-3 text-lg text-navy/80">
          The checklist is built. When {state.clientName.split(" ")[0]} opens their link, they'll
          confirm consent and go straight to uploading — the app handles the chasing from here.
        </p>
        <a href="/dashboard" className="btn-primary mt-6">Back to dashboard</a>
      </Shell>
    );
  }

  if (phase === "consent") {
    return (
      <Shell progress={0}>
        <h1 className="text-2xl font-bold">Hi {state.clientName.split(" ")[0]} 👋</h1>
        <p className="mt-3 text-lg text-navy/80">
          {state.intakeDone
            ? "Your mortgage agent has set everything up — one quick agreement and you can start uploading."
            : "Your mortgage agent uses Autowrite to collect your documents securely — no email attachments, no chasing."}
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
            await refresh();
          }}
        >
          I agree — let's go
        </button>
      </Shell>
    );
  }

  if (phase === "wizard") {
    return (
      <Shell progress={progress} stepLabel={answers.productChoice ? `Step ${stepIndex + 1} of ${steps.length}` : "Step 1"}>
        {asAgent && (
          <p className="mb-4 rounded-lg bg-amber-soft px-3 py-2 text-sm font-semibold text-navy/70">
            Agent mode — you're filling this in for {state.clientName}.
          </p>
        )}

        {step === "goal" && (
          <Q title={asAgent ? "What's the deal?" : "What are we doing for you?"}>
            <Choice onClick={() => pickProduct("purchase", "purchase")} label="Buying a home" />
            <Choice onClick={() => pickProduct("refinance", "equity", { isHomeowner: true })} label="Refinance" sub="Better rate, or use your home's equity" />
            <Choice onClick={() => pickProduct("renewal", "renewal")} label="Renewal" sub="Your mortgage term is ending" />
            <Choice onClick={() => pickProduct("reverse", "equity", { isHomeowner: true, interestedInReverse: true })} label="Reverse mortgage" sub="55+ · turn equity into income, stay in your home" />
            <Choice onClick={() => pickProduct("private", "equity", { timeline: "days" })} label="Private / fast funding" sub="Speed matters more than rate" />
            <Choice onClick={() => pickProduct("other", "unsure")} label="Something else / not sure" sub="No stress — we'll figure it out together" />
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

        {step === "reverseAge" && (
          <Q title="Are you 55 or older?" sub="Reverse mortgages are for homeowners 55+.">
            <Choice onClick={() => pick("age", 60)} label="Yes, 55+" />
            <Choice onClick={() => pick("age", 45)} label="Not yet" sub="You can still move forward — we'll set you up the refinance way" />
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

        {step === "employment" && (
          <Q title="How does your income come in?">
            <Choice onClick={() => pick("employment", "employed")} label="Employed" sub="Salary or hourly" />
            <Choice onClick={() => pick("employment", "self_employed")} label="Self-employed" sub="Business owner, contractor, freelance" />
            <Choice onClick={() => pick("employment", "retired")} label="Retired" />
            <Choice onClick={() => pick("employment", "not_working")} label="Between jobs right now" sub="That's okay — there are still options" />
          </Q>
        )}

        {step === "money" && (
          <Q title="Your money picture" sub="Rough numbers help us match the right options. Nothing here disqualifies you.">
            <Num label="Household income per year (before tax)" value={answers.annualIncome} onChange={(v) => set("annualIncome", v)} placeholder="e.g. 95,000" />
            <Num label="Monthly debt payments (cards, car, loans)" value={answers.monthlyDebts} onChange={(v) => set("monthlyDebts", v)} placeholder="e.g. 600 — put 0 if none" />
            <p className="mt-1 text-sm font-semibold text-navy/70">Any bankruptcy or consumer proposal in the last 7 years?</p>
            <Choice onClick={() => pick("hadBankruptcy", false)} label="No" active={answers.hadBankruptcy === false} />
            <Choice onClick={() => pick("hadBankruptcy", true)} label="Yes" sub="Good to know upfront — there are lenders for this" active={answers.hadBankruptcy === true} />
          </Q>
        )}

        {step === "purchase" && (
          <Q title="About the purchase">
            <Num label="Purchase price (or budget)" value={answers.purchasePrice} onChange={(v) => set("purchasePrice", v)} placeholder="e.g. 650,000" />
            <Num label="Down payment (%)" value={answers.downPaymentPct} onChange={(v) => set("downPaymentPct", v)} placeholder="e.g. 10" />
            <p className="mt-1 text-sm font-semibold text-navy/70">Where's the down payment coming from?</p>
            <Choice onClick={() => pick("downPaymentSource", "savings")} label="Savings or investments" active={answers.downPaymentSource === "savings"} />
            <Choice onClick={() => pick("downPaymentSource", "gift")} label="A gift from family" active={answers.downPaymentSource === "gift"} />
            <Choice onClick={() => pick("downPaymentSource", "rrsp_hbp")} label="RRSP (Home Buyers' Plan)" active={answers.downPaymentSource === "rrsp_hbp"} />
            <Choice onClick={() => pick("downPaymentSource", "sale_of_home")} label="Selling the current home" active={answers.downPaymentSource === "sale_of_home"} />
          </Q>
        )}

        {step === "coApplicant" && (
          <Q title="Is anyone applying with you?" sub="You can also add them later from your checklist.">
            <Choice onClick={() => pick("hasCoApplicant", false)} label="Just me" />
            <Choice onClick={() => pick("hasCoApplicant", true)} label="Yes — a partner or co-signer" sub="They'll get their own private link, or you can upload for them" />
          </Q>
        )}

        {step === "idType" && (
          <Q title="Which photo ID will be used?">
            <Choice onClick={() => pick("primaryIdType", "drivers_licence")} label="Driver's licence" sub="We'll need the front AND the back" />
            <Choice onClick={() => pick("primaryIdType", "passport")} label="Passport" sub="Just the picture page" />
          </Q>
        )}

        {step === "review" && (
          <Q
            title={asAgent ? "Anything the file should know?" : "Last one — in your own words"}
            sub={asAgent ? "Optional context — becomes part of the file." : "What are you looking for, and why now? Optional, but it helps your agent help you."}
          >
            <textarea
              className="input min-h-[110px]"
              placeholder="e.g. We want to consolidate two credit cards and redo the kitchen before winter…"
              value={answers.clientNote ?? ""}
              onChange={(e) => set("clientNote", e.target.value)}
            />
            <button className="btn-primary" onClick={submitAnswers}>
              {asAgent ? "Save intake — build the checklist" : "Show my checklist"}
            </button>
          </Q>
        )}

        {stepIndex > 0 && (
          <button className="mt-6 text-sm font-medium text-navy/50 underline" onClick={back}>← Go back</button>
        )}
      </Shell>
    );
  }

  return <Checklist token={token} state={state} onChange={refresh} api={api} />;
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

function Checklist({ token, state, onChange, api }: { token: string; state: PortalState; onChange: () => Promise<void>; api: (b?: any) => Promise<any> }) {
  const reqByKey = useMemo(() => Object.fromEntries(state.requirements.map((r) => [r.key, r])), [state.requirements]);
  const isApplicantViewer = state.viewer.type === "applicant";

  const ownId = isApplicantViewer ? state.slots.find((s) => s.applicantName)?.applicantId ?? "" : "primary";
  const ownSlots = state.slots.filter((s) => (isApplicantViewer ? s.applicantId !== "primary" : s.applicantId === "primary"));
  const helperGroups = useMemo(() => {
    if (isApplicantViewer) return [];
    const others = state.slots.filter((s) => s.applicantId !== "primary");
    const byId = new Map<string, { name: string; slots: Slot[] }>();
    for (const s of others) {
      if (!byId.has(s.applicantId)) byId.set(s.applicantId, { name: s.applicantName ?? "Co-applicant", slots: [] });
      byId.get(s.applicantId)!.slots.push(s);
    }
    return Array.from(byId.entries()).map(([id, v]) => ({ id, ...v }));
  }, [state.slots, isApplicantViewer]);

  const allVisible = state.slots;
  const done = allVisible.filter((s) => ["verified", "accepted", "processing", "needs_review"].includes(s.status)).length;
  const pct = allVisible.length ? Math.round((done / allVisible.length) * 100) : 0;
  const returning = allVisible.some((s) => s.status !== "missing");
  const firstName = state.viewer.name.split(" ")[0];

  const grouped = (slots: Slot[]) => {
    const order = ["identity", "income", "property", "deal", "other"];
    const names: Record<string, string> = { identity: "ID", income: "Income", property: "The home", deal: "The deal", other: "Banking" };
    return order
      .map((cat) => ({ cat, name: names[cat], items: slots.filter((s) => reqByKey[s.reqKey]?.category === cat) }))
      .filter((g) => g.items.length);
  };

  return (
    <main className="mx-auto max-w-md px-5 py-6 pb-16">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-teal">Autowrite</span>
        <span className="text-xs font-semibold text-navy/50">{done} of {allVisible.length} in</span>
      </div>

      <h1 className="mt-4 text-2xl font-bold">
        {returning ? `Welcome back, ${firstName} 👋` : isApplicantViewer ? `Hi ${firstName} 👋` : "Your document checklist"}
      </h1>
      <p className="mt-1 text-navy/60">
        {returning
          ? "Pick up right where you left off — here's where things stand."
          : isApplicantViewer
            ? `Your part of ${state.clientName}'s application — private to you.`
            : "Built for your exact situation — nothing extra."}
      </p>

      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-navy/10">
        <div className={`h-full rounded-full transition-all duration-700 ${pct === 100 ? "bg-teal" : "bg-teal/80"}`} style={{ width: `${Math.max(pct, 3)}%` }} />
      </div>
      <p className="mt-1 text-right text-sm font-bold text-teal">{pct}%</p>

      {state.notes.map((n, i) => (
        <div key={i} className={`card mt-3 text-[15px] ${n.tone === "good_news" ? "border-teal/40 bg-teal-soft" : ""}`}>
          {n.tone === "good_news" ? "💡 " : ""}{n.text}
        </div>
      ))}

      {pct === 100 && (
        <div className="card mt-3 border-teal/40 bg-teal-soft text-[15px]">
          🎉 That's everything — your agent takes it from here. We'll ping you only if something needs a retake.
        </div>
      )}

      {grouped(ownSlots).map((g) => (
        <section key={g.cat} className="mt-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-navy/50">{g.name}</h2>
          <div className="space-y-3">
            {g.items.map((s) => (
              <UploadCard key={`${s.reqKey}-${s.part ?? "s"}-${s.applicantId}`} token={token} slot={s} req={reqByKey[s.reqKey]} onDone={onChange} />
            ))}
          </div>
        </section>
      ))}

      {helperGroups.map((g) => (
        <section key={g.id} className="mt-8">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-navy/50">For {g.name}</h2>
          <div className="space-y-3">
            {g.slots.map((s) => (
              <UploadCard key={`${s.reqKey}-${s.part ?? "s"}-${s.applicantId}`} token={token} slot={s} req={reqByKey[s.reqKey]} onDone={onChange} />
            ))}
          </div>
        </section>
      ))}

      {!isApplicantViewer &&
        state.privateSummaries.map((ps) => (
          <section key={ps.id} className="mt-8">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-navy/50">{ps.name}'s documents</h2>
            <div className="card flex items-center justify-between">
              <div>
                <p className="font-semibold">🔒 Private to {ps.name.split(" ")[0]}</p>
                <p className="mt-1 text-sm text-navy/55">
                  They have their own secure link — we're chasing their documents directly. They can turn on sharing if they'd like your help.
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-navy/5 px-3 py-1 text-xs font-bold text-navy/60">{ps.done}/{ps.total} in</span>
            </div>
          </section>
        ))}

      {!isApplicantViewer && <AddApplicant api={api} onDone={onChange} existing={state.applicants} />}

      {isApplicantViewer && (
        <div className="card mt-8">
          <p className="font-semibold">Privacy</p>
          <p className="mt-1 text-sm text-navy/55">
            Your documents are private to you and the mortgage agent. Want {state.clientName.split(" ")[0]} to be able to see and upload for you?
          </p>
          <button
            className={`mt-3 w-full rounded-xl2 border-2 px-4 py-3 text-sm font-semibold transition ${
              state.viewer.shareWithPrimary ? "border-coral/40 bg-coral-soft text-coral" : "border-teal/40 bg-teal-soft text-teal"
            }`}
            onClick={async () => {
              await api({ action: "toggleShare", share: !state.viewer.shareWithPrimary });
              await onChange();
            }}
          >
            {state.viewer.shareWithPrimary ? "Turn sharing OFF — keep my documents private" : `Let ${state.clientName.split(" ")[0]} help with my documents`}
          </button>
        </div>
      )}

      <p className="mt-8 text-center text-xs text-navy/40">
        Documents are encrypted, stored in Canada, and SINs are automatically hidden. <a href="/privacy" className="underline">Privacy</a>
      </p>
    </main>
  );
}

function AddApplicant({ api, onDone, existing }: { api: (b?: any) => Promise<any>; onDone: () => Promise<any>; existing: ApplicantInfo[] }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<"self" | "delegated">("self");
  const [busy, setBusy] = useState(false);

  return (
    <section className="mt-8">
      {!open ? (
        <button className="w-full rounded-xl2 border-2 border-dashed border-navy/20 px-4 py-3 text-sm font-semibold text-navy/60 transition hover:border-teal hover:text-teal" onClick={() => setOpen(true)}>
          ＋ Add a co-applicant{existing.length ? ` (${existing.length} added)` : ""}
        </button>
      ) : (
        <div className="card space-y-3">
          <p className="font-semibold">Add a co-applicant</p>
          <input className="input" placeholder="Their full name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="input" type="email" placeholder="Their email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className={`btn-choice ${mode === "self" ? "btn-choice-active" : ""}`} onClick={() => setMode("self")}>
            <span className="block text-[15px]">They handle their own documents</span>
            <span className="mt-0.5 block text-sm font-normal text-navy/55">They get their own private link — we chase them, and their documents stay private unless they share.</span>
          </button>
          <button className={`btn-choice ${mode === "delegated" ? "btn-choice-active" : ""}`} onClick={() => setMode("delegated")}>
            <span className="block text-[15px]">I'll upload for them</span>
            <span className="mt-0.5 block text-sm font-normal text-navy/55">Their document slots appear in your checklist.</span>
          </button>
          <button
            className="btn-primary"
            disabled={busy || !name || !email.includes("@")}
            onClick={async () => {
              setBusy(true);
              await api({ action: "addApplicant", name, email, mode });
              setName(""); setEmail(""); setOpen(false); setBusy(false);
              await onDone();
            }}
          >
            Add {name.split(" ")[0] || "them"}
          </button>
        </div>
      )}
    </section>
  );
}

function UploadCard({ token, slot, req, onDone }: { token: string; slot: Slot; req?: Req; onDone: () => Promise<void> }) {
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  if (!req) return null;

  const meta = STATUS_META[slot.status] ?? STATUS_META.missing;
  const needsAction = slot.status === "missing" || slot.status === "needs_reupload" || slot.status === "rejected";

  const upload = async (f: File) => {
    setBusy(true);
    setLocalError(null);
    const fd = new FormData();
    fd.set("reqKey", slot.reqKey);
    fd.set("applicantId", slot.applicantId);
    if (slot.part) fd.set("part", slot.part);
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
            {slot.part ? <span className="text-navy/50"> — {slot.part}</span> : null}
          </p>
          <p className="mt-1 text-sm text-navy/55">{req.howToGet}</p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${meta.cls}`}>
          {busy ? "Uploading…" : meta.chip}
        </span>
      </div>

      {slot.reason && (slot.status === "needs_reupload" || slot.status === "rejected") && (
        <p className="mt-3 rounded-lg bg-coral-soft px-3 py-2 text-sm text-navy/80">{slot.reason}</p>
      )}
      {localError && <p className="mt-3 text-sm font-medium text-coral">{localError}</p>}

      {needsAction && (
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
          <button
            type="button"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            className="mt-3 w-full rounded-xl2 border-2 border-dashed border-teal/50 bg-teal-soft/50 px-4 py-3 text-sm font-semibold text-teal transition active:scale-[0.99]"
          >
            {slot.status === "missing" ? "📷 Take a photo or choose a file" : "↻ Upload a better copy"}
          </button>
        </>
      )}
    </div>
  );
}
