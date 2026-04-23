// LeadsPage.jsx — Lead Finder. Search Canada + USA businesses by niche, city, radius.
// Shows scorecards (GBP rating, review count, est. revenue, recent activity signals).
// Click a lead → "Deploy system for this business" → launches the Orb pre-filled with their data.

import React, { useState } from 'react';

export default function LeadsPage() {
  const [filters, setFilters] = useState({
    niche: '', city: '', country: 'Canada', radius_km: 25,
    min_rating: 0, max_reviews: 10000, only_no_website: false,
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    setLoading(true);
    // TODO: POST /api/find-leads with filters
    // Backend uses Google Places Nearby Search + GBP details
    // Returns array of { place_id, name, rating, user_ratings_total, address,
    //   website, phone, types, opportunity_score, notes }
    setLoading(false);
  }

  function deployForLead(lead) {
    // TODO: create Orb session pre-filled with lead's data, redirect to /orb?session_id=...
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-[#E5E7EB] p-6">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#C9A84C] to-[#38BDF8] bg-clip-text text-transparent">
        Find Leads
      </h1>

      {/* Filters */}
      <div className="bg-[#1a2332] rounded-xl p-4 grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <input
          className="bg-[#0c1626] px-3 py-2 rounded-lg"
          placeholder="Niche (plumbing, dental...)"
          value={filters.niche}
          onChange={e => setFilters({...filters, niche: e.target.value})}
        />
        <input
          className="bg-[#0c1626] px-3 py-2 rounded-lg"
          placeholder="City"
          value={filters.city}
          onChange={e => setFilters({...filters, city: e.target.value})}
        />
        <select
          className="bg-[#0c1626] px-3 py-2 rounded-lg"
          value={filters.country}
          onChange={e => setFilters({...filters, country: e.target.value})}
        >
          <option>Canada</option>
          <option>USA</option>
        </select>
        <button
          className="bg-[#38BDF8] text-[#0A1628] font-bold rounded-lg"
          onClick={search}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {results.map(lead => (
          <div key={lead.place_id} className="bg-[#1a2332] rounded-xl p-4 flex justify-between items-center">
            <div>
              <div className="font-bold text-lg">{lead.name}</div>
              <div className="text-sm text-gray-400">
                {lead.types?.[0]} · {lead.address} · ⭐ {lead.rating} ({lead.user_ratings_total})
              </div>
              <div className="text-xs text-[#C9A84C] mt-1">
                Opportunity score: {lead.opportunity_score}/100 · {lead.notes}
              </div>
            </div>
            <button
              onClick={() => deployForLead(lead)}
              className="bg-[#C9A84C] text-[#0A1628] font-bold px-4 py-2 rounded-lg"
            >
              Deploy System
            </button>
          </div>
        ))}
      </div>

      {/* TODO: pagination, saved searches, bulk-deploy */}
    </div>
  );
}
