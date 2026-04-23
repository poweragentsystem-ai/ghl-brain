// EmployeesPage.jsx — AI Employees library. The 9 core bots + niche-specific.
// Each bot card: name, description, channel (voice/sms/email/chat), enabled toggle, config button.

import React from 'react';

const CORE_BOTS = [
  { id: 'inbound_reception', name: 'Inbound Reception', channel: 'voice', desc: 'Answers inbound calls 24/7, routes by intent, books if qualified' },
  { id: 'outbound_new_lead', name: 'Outbound New Lead', channel: 'voice+sms', desc: 'Cold/warm outbound pre-qualify within 5 min of form submit' },
  { id: 'booking_reminder', name: 'Booking Reminder', channel: 'sms+email', desc: '24h + 1h appointment reminders' },
  { id: 'no_show_rebook', name: 'No-Show Rebook', channel: 'sms+voice', desc: 'Triggers 1h after missed appt, tries to rebook before nurturing' },
  { id: 'thank_you', name: 'Thank You', channel: 'sms+email', desc: 'Post-close gratitude + next-step hand-off' },
  { id: 'follow_up', name: 'Follow Up', channel: 'sms+email', desc: 'General multi-touch follow-up for leads gone quiet' },
  { id: 'referral_request', name: 'Referral Request', channel: 'sms+email', desc: 'After positive outcome, triggers referral ask with tracking' },
  { id: 'high_ticket_setter', name: 'High-Ticket Setter', channel: 'voice+sms+email', desc: '$1K+ cold outreach to decision-makers' },
  { id: 'high_ticket_closer', name: 'High-Ticket Closer', channel: 'voice', desc: '$1K+ discovery + close call handler' },
];

const NICHE_BOTS = {
  mortgage: [
    { id: 'application_reminder', name: 'Application Reminder', desc: 'Mortgage app chase' },
    { id: 'document_chaser', name: 'Document Chaser', desc: 'Collects missing client docs' },
    { id: 'renewal_countdown', name: 'Renewal Countdown', desc: '120/90/60/30/14-day renewal sequence' },
  ],
  dental: [
    { id: 'recall_reminder', name: '6-Month Recall', desc: 'Automated recare scheduling' },
    { id: 'treatment_plan_followup', name: 'Treatment Plan Follow-up', desc: 'Post-consult treatment acceptance' },
  ],
  realtor: [
    { id: 'listing_alert', name: 'Listing Alert', desc: 'New matching listings to buyer leads' },
    { id: 'open_house_followup', name: 'Open House Follow-up', desc: 'Post-open-house nurture' },
  ],
};

export default function EmployeesPage({ clientNiche }) {
  const [bots, setBots] = React.useState({});   // id → enabled
  const nicheBots = NICHE_BOTS[clientNiche] || [];

  function toggle(id) {
    // TODO: PUT /api/client/:id/bots with enabled flag
    setBots({ ...bots, [id]: !bots[id] });
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-[#E5E7EB] p-6">
      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#C9A84C] to-[#38BDF8] bg-clip-text text-transparent">
        Your AI Employees
      </h1>
      <p className="text-gray-400 mb-6">Enable / disable + configure each bot. Tone + scripts are pre-tuned for your niche ({clientNiche || 'generic'}).</p>

      <h2 className="text-xl font-bold mb-3 text-[#C9A84C]">Core (9)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {CORE_BOTS.map(bot => (
          <BotCard key={bot.id} bot={bot} enabled={bots[bot.id]} onToggle={() => toggle(bot.id)} />
        ))}
      </div>

      {nicheBots.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-3 text-[#C9A84C]">Niche Specific — {clientNiche}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nicheBots.map(bot => (
              <BotCard key={bot.id} bot={{...bot, channel: 'mixed'}} enabled={bots[bot.id]} onToggle={() => toggle(bot.id)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function BotCard({ bot, enabled, onToggle }) {
  return (
    <div className="bg-[#1a2332] rounded-xl p-4 flex justify-between items-start">
      <div className="flex-1">
        <div className="font-bold">{bot.name}</div>
        <div className="text-xs text-[#38BDF8] mt-1">{bot.channel}</div>
        <div className="text-sm text-gray-400 mt-2">{bot.desc}</div>
        {/* TODO: <button className="text-xs mt-2 text-[#C9A84C]">Configure →</button> */}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={!!enabled} onChange={onToggle} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-700 peer-checked:bg-[#38BDF8] rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
      </label>
    </div>
  );
}
