// ContentLibraryPage.jsx — 9th page added post-Ulio-recon.
// Growth engine for creator/affiliate partners. Ready-made assets they remix + share.
// 20% lifetime recurring commission (beats Ulio's 17%). Niche-specific kits.

import React, { useState } from 'react';

const KITS = [
  { niche: 'generic', name: 'Generic / All-Purpose', asset_count: 25 },
  { niche: 'mortgage', name: 'Mortgage — Canadian', asset_count: 18 },
  { niche: 'mortgage_us', name: 'Mortgage — USA', asset_count: 15 },
  { niche: 'dental', name: 'Dental', asset_count: 20 },
  { niche: 'hvac', name: 'HVAC + Plumbing', asset_count: 18 },
  { niche: 'realtor', name: 'Real Estate', asset_count: 22 },
  { niche: 'trades', name: 'Trades (Roofing, Landscaping, Electric)', asset_count: 16 },
  { niche: 'consultants', name: 'Consultants + Coaches', asset_count: 14 },
  { niche: 'medspa', name: 'Medspa + Aesthetics', asset_count: 12 },
  { niche: 'gym', name: 'Gyms + Fitness', asset_count: 12 },
  { niche: 'legal', name: 'Legal (careful — jurisdiction checks)', asset_count: 10 },
];

const ASSET_TYPES = [
  { id: 'demo_video', label: 'Demo videos (MP4)' },
  { id: 'reel_script', label: 'IG/TikTok reel scripts' },
  { id: 'swipe_file', label: 'Email + DM swipe files' },
  { id: 'carousel', label: 'Carousel PSDs + Canva templates' },
  { id: 'roi_calc', label: 'ROI calculator (Excel + web)' },
  { id: 'comparison_doc', label: 'Easy Deploy vs Ulio comparison' },
  { id: 'podcast_points', label: 'Podcast talking points (PDF)' },
  { id: 'webinar', label: 'Webinar recording (training)' },
  { id: 'setup_screen_recording', label: 'Setup walkthroughs' },
  { id: 'story_pack', label: 'Story templates pack (ZIP)' },
  { id: 'client_testimonial', label: 'Client testimonial videos' },
  { id: 'case_study', label: 'Case studies (PDF)' },
];

export default function ContentLibraryPage() {
  const [selectedKit, setSelectedKit] = useState('generic');
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen bg-[#0A1628] text-[#E5E7EB] p-6">
      {/* Header + Commission banner */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C9A84C] to-[#38BDF8] bg-clip-text text-transparent">
          Content Library
        </h1>
        <p className="text-gray-400 mt-2">Remix + share. Earn 20% lifetime recurring on every referral. Founder's lock-in for first 100 creators: 25% lifetime.</p>
      </div>

      {/* Commission dashboard at top */}
      <div className="bg-gradient-to-r from-[#C9A84C]/20 to-[#38BDF8]/20 border border-[#C9A84C]/30 rounded-xl p-5 mb-8 flex flex-wrap gap-6 items-center justify-between">
        <div>
          <div className="text-sm text-gray-400">Your lifetime commission</div>
          <div className="text-3xl font-bold">20%</div>
          <div className="text-xs text-gray-500">recurring, forever, as long as referral stays active</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Your referrals this month</div>
          <div className="text-3xl font-bold">—</div>
          {/* TODO: wire /api/creator/stats */}
        </div>
        <div>
          <div className="text-sm text-gray-400">Your recurring MRR</div>
          <div className="text-3xl font-bold">$—</div>
        </div>
        <div className="flex gap-2">
          <button className="bg-[#C9A84C] text-[#0A1628] font-bold px-4 py-2 rounded-lg">Get my referral link</button>
          <button className="bg-[#1a2332] border border-gray-700 px-4 py-2 rounded-lg text-sm">Payout settings</button>
        </div>
      </div>

      {/* Niche kit selector */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-3">Pick a niche kit</h2>
        <div className="flex flex-wrap gap-2">
          {KITS.map(k => (
            <button
              key={k.niche}
              onClick={() => setSelectedKit(k.niche)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedKit === k.niche
                  ? 'bg-[#38BDF8] text-[#0A1628]'
                  : 'bg-[#1a2332] text-gray-300 hover:bg-[#22304a]'
              }`}
            >
              {k.name} <span className="text-xs opacity-70">({k.asset_count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter by asset type */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`text-xs px-3 py-1 rounded-full ${filter === 'all' ? 'bg-[#C9A84C] text-[#0A1628]' : 'bg-[#1a2332] text-gray-400'}`}
        >All</button>
        {ASSET_TYPES.map(t => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            className={`text-xs px-3 py-1 rounded-full ${filter === t.id ? 'bg-[#C9A84C] text-[#0A1628]' : 'bg-[#1a2332] text-gray-400'}`}
          >{t.label}</button>
        ))}
      </div>

      {/* Asset grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* TODO: fetch /api/creator/assets?kit={selectedKit}&type={filter} → render AssetCard per item */}
        {/* Each AssetCard: thumbnail, title, type badge, file size, Download button, Copy link, Remix in Canva */}
        <div className="bg-[#1a2332] rounded-xl p-4 text-center text-gray-500 col-span-full">
          [Asset cards load here — wire /api/creator/assets]
        </div>
      </div>

      {/* Inner Circle callout */}
      <div className="mt-12 bg-[#1a2332] rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold">Inner Circle</h3>
        <p className="text-gray-400 mt-2">1-on-1 coaching · Active creator community · Proven playbooks · Done-for-you campaign support</p>
        <button className="mt-4 bg-[#38BDF8] text-[#0A1628] font-bold px-6 py-3 rounded-lg">Apply to join</button>
      </div>
    </div>
  );
}
