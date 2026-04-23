// ProposalPage.jsx — AI-generated proposal, EDITABLE before send.
// Loads proposal HTML from /api/generate-proposal. User can edit any section,
// regenerate a section with AI, or send as-is.

import React, { useState, useEffect } from 'react';

export default function ProposalPage({ proposalId }) {
  const [sections, setSections] = useState({
    greeting: '', problem_mirror: '', solution_fit: '',
    what_they_get: '', investment: '', timeline: '', next_steps: '', legal: ''
  });
  const [recipient, setRecipient] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    // TODO: GET /api/proposal/:id → populate sections + recipient
    setLoading(false);
  }, [proposalId]);

  async function regenerateSection(key) {
    // TODO: POST /api/regenerate-section { proposal_id, section: key }
    // Replace sections[key] with new text
  }

  async function sendProposal() {
    setSending(true);
    // TODO: POST /api/proposal/:id/send { edited_sections: sections, recipient }
    // Backend: render PDF, email to recipient with Sign&Pay CTA via Gmail MCP or SendGrid
    setSending(false);
  }

  if (loading) return <div className="min-h-screen bg-[#0A1628] text-gray-400 p-6">Loading proposal...</div>;

  return (
    <div className="min-h-screen bg-[#0A1628] text-[#E5E7EB] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C9A84C] to-[#38BDF8] bg-clip-text text-transparent">
            Proposal (editable)
          </h1>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#1a2332] rounded-lg text-sm">Preview PDF</button>
            <button
              onClick={sendProposal}
              disabled={sending || !recipient.email}
              className="px-4 py-2 bg-[#C9A84C] text-[#0A1628] font-bold rounded-lg disabled:opacity-50"
            >
              {sending ? 'Sending...' : 'Send Proposal'}
            </button>
          </div>
        </div>

        {/* Recipient */}
        <div className="bg-[#1a2332] rounded-xl p-4 mb-6 grid grid-cols-2 gap-3">
          <input className="bg-[#0c1626] px-3 py-2 rounded-lg" placeholder="Recipient name"
            value={recipient.name} onChange={e => setRecipient({...recipient, name: e.target.value})} />
          <input className="bg-[#0c1626] px-3 py-2 rounded-lg" placeholder="Recipient email"
            value={recipient.email} onChange={e => setRecipient({...recipient, email: e.target.value})} />
        </div>

        {/* Editable sections */}
        {Object.entries(sections).map(([key, value]) => (
          <div key={key} className="bg-[#1a2332] rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold capitalize text-[#C9A84C]">{key.replace(/_/g, ' ')}</h2>
              <button onClick={() => regenerateSection(key)} className="text-xs text-[#38BDF8]">
                ⟲ Regenerate
              </button>
            </div>
            <textarea
              className="bg-[#0c1626] w-full rounded-lg px-3 py-2 min-h-24"
              value={value}
              onChange={e => setSections({...sections, [key]: e.target.value})}
            />
          </div>
        ))}

        {/* Stripe payment + e-sign links baked into the email — generated on send */}
        <div className="text-xs text-gray-500 mt-6">
          On send, we generate a Stripe payment link + e-sign request + email to {recipient.email || '[recipient]'}.
        </div>
      </div>
    </div>
  );
}
