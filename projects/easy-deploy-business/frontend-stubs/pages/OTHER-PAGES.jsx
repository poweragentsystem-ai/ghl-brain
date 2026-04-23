// SamplePage.jsx + PricingPage.jsx + PaymentPage.jsx + SettingsPage.jsx — stubs
// Combined in one file to keep the stub set compact. Split when build starts.

// ===== SamplePage.jsx =====
// Public marketing page. Shows a live demo of what a deployed client's dashboard looks like.
// Pre-populated with fake data so a visitor can click around. CTA: "Get yours →" → /orb

export function SamplePage() {
  return (
    <div className="min-h-screen bg-[#0A1628] text-[#E5E7EB] p-6">
      <h1 className="text-3xl font-bold">See what you get</h1>
      <p className="text-gray-400 mt-2 mb-6">This is a real system, with fake data. Click around.</p>
      {/* TODO: iframe or embedded demo of a deployed dashboard with mock data */}
      {/* TODO: CTA button → /orb */}
      <button className="mt-6 px-8 py-4 bg-[#C9A84C] text-[#0A1628] font-bold rounded-xl text-lg">
        Get yours in 5 minutes →
      </button>
    </div>
  );
}

// ===== PricingPage.jsx =====
// Sliding-scale pricing. Calls POST /api/calculate-pricing live as sliders move.

import React, { useState, useEffect } from 'react';

export function PricingPage({ sessionId }) {
  const [minutesTier, setMinutesTier] = useState(1000);
  const [setupComplexity, setSetupComplexity] = useState(3);  // 1-5
  const [addons, setAddons] = useState({});
  const [annual, setAnnual] = useState(false);
  const [pricing, setPricing] = useState(null);

  useEffect(() => {
    // TODO: debounced POST /api/calculate-pricing → setPricing
  }, [minutesTier, setupComplexity, addons, annual]);

  return (
    <div className="min-h-screen bg-[#0A1628] text-[#E5E7EB] p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Your pricing</h1>
      <p className="text-gray-400 mb-8">Tune to your situation. Price updates live.</p>

      {/* Minutes tier slider */}
      <div className="bg-[#1a2332] rounded-xl p-4 mb-4">
        <label className="block mb-2 font-bold">Minutes included: {minutesTier}/month</label>
        <input type="range" min={0} max={4} step={1}
          value={[500, 1000, 2500, 4000, 7000].indexOf(minutesTier)}
          onChange={e => setMinutesTier([500, 1000, 2500, 4000, 7000][parseInt(e.target.value)])}
          className="w-full" />
      </div>

      {/* Setup complexity slider */}
      <div className="bg-[#1a2332] rounded-xl p-4 mb-4">
        <label className="block mb-2 font-bold">Setup complexity: {['Simple','Standard','Balanced','Advanced','Complex'][setupComplexity-1]}</label>
        <input type="range" min={1} max={5} step={1} value={setupComplexity}
          onChange={e => setSetupComplexity(parseInt(e.target.value))} className="w-full" />
      </div>

      {/* Addons */}
      <div className="bg-[#1a2332] rounded-xl p-4 mb-4">
        <h2 className="font-bold mb-2">Add-ons</h2>
        {['cold_email','extra_bot','white_label','premium_research'].map(a => (
          <label key={a} className="block mb-1">
            <input type="checkbox" checked={!!addons[a]} onChange={() => setAddons({...addons, [a]: !addons[a]})} />
            <span className="ml-2 capitalize">{a.replace(/_/g, ' ')}</span>
          </label>
        ))}
      </div>

      {/* Annual toggle */}
      <label className="block mb-4">
        <input type="checkbox" checked={annual} onChange={() => setAnnual(!annual)} />
        <span className="ml-2">Annual billing (2 months free)</span>
      </label>

      {/* Price preview */}
      {pricing && (
        <div className="bg-[#C9A84C] text-[#0A1628] rounded-xl p-6 text-center">
          <div className="text-sm">{pricing.tier_name} tier</div>
          <div className="text-4xl font-bold mt-2">${pricing.monthly}/mo</div>
          <div className="text-sm mt-1">+ ${pricing.setup_fee} setup</div>
          {pricing.recommendation_reason && (
            <div className="text-xs mt-3 opacity-75">{pricing.recommendation_reason}</div>
          )}
        </div>
      )}

      <button className="w-full mt-6 py-4 bg-[#38BDF8] text-[#0A1628] font-bold rounded-xl text-lg">
        Generate my proposal →
      </button>
    </div>
  );
}

// ===== PaymentPage.jsx =====
// Final checkout. Stripe embedded + e-sign + T&Cs acceptance.

export function PaymentPage({ proposalId }) {
  const [accepted, setAccepted] = useState({ terms: false, privacy: false, compliance: false, indemnity: false, disclaimer: false });
  const allAccepted = Object.values(accepted).every(Boolean);

  return (
    <div className="min-h-screen bg-[#0A1628] text-[#E5E7EB] p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Almost there</h1>

      {/* 5 mandatory checkboxes per legal skill */}
      <div className="bg-[#1a2332] rounded-xl p-4 mb-6 space-y-3 text-sm">
        {[
          ['terms', 'I agree to the Terms & Conditions'],
          ['privacy', 'I agree to the Privacy Policy'],
          ['compliance', 'I understand I am solely responsible for CASL/TCPA/GDPR compliance in my jurisdiction'],
          ['indemnity', 'I agree to the indemnity clause (§4 of the contract)'],
          ['disclaimer', 'I acknowledge: no revenue/lead/outcome guarantees are provided'],
        ].map(([k, label]) => (
          <label key={k} className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={accepted[k]} onChange={() => setAccepted({...accepted, [k]: !accepted[k]})} className="mt-1" />
            <span>{label}</span>
          </label>
        ))}
      </div>

      {/* Stripe embedded checkout */}
      {/* TODO: <StripeCheckoutEmbed clientSecret={...} /> */}
      <button disabled={!allAccepted} className="w-full py-4 bg-[#C9A84C] text-[#0A1628] font-bold rounded-xl text-lg disabled:opacity-40">
        Sign & Pay
      </button>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Your account deploys automatically after payment. ~2 minutes.
      </p>
    </div>
  );
}

// ===== SettingsPage.jsx =====
// Account / billing / branding / integrations / team.

export function SettingsPage() {
  // TODO: full settings — account info, billing (link to Stripe customer portal),
  // branding (logo upload + color pickers), integrations (GHL connection status,
  // Stripe connection, Gmail connection), team (invite + roles).
  return (
    <div className="min-h-screen bg-[#0A1628] text-[#E5E7EB] p-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {['Account','Billing','Branding','Integrations','Team','Voice Settings →'].map(s => (
          <a key={s} className="block bg-[#1a2332] rounded-xl p-4 hover:bg-[#22304a]">{s}</a>
        ))}
      </div>
    </div>
  );
}
