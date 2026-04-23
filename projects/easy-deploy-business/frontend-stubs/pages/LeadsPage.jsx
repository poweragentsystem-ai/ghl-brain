// LeadsPage.jsx — Lead Finder + Business Deep Dive (post-Ulio-recon update).
// Search Canada + USA businesses. Scorecards with review-signal mining.
// Click a lead → Business Deep Dive panel → "Deploy system" launches Orb pre-filled.

import React, { useState } from 'react';

export default function LeadsPage() {
  const [filters, setFilters] = useState({
    niche: '', city: '', country: 'Canada', radius_km: 25,
    min_rating: 0, only_has_phone_issues: false, only_below_4_rating: false,
  });
  const [results, setResults] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(false);

  async function search() {
    setLoading(true);
    // TODO: POST /api/find-leads with filters
    // Backend: Google Places Nearby Search + GBP Details + review-signal scraping
    // Returns: { place_id, name, niche, address, phone, website, rating, review_count,
    //   score, size_score, review_health_score, opportunity_score,
    //   tags: ['phone_issues', 'below_4_rating', 'high_volume', 'service_issues'],
    //   review_snippets: [{author, date, text, sentiment}],
    //   deep_dive: { owner, email, direct_line, hours, est_revenue, photos_count,
    //                domain_age, tech_stack, social_presence, competitor_density }
    // }
    setLoading(false);
  }

  function deployForLead(lead) {
    // Create Orb session pre-filled with lead data, redirect to /orb?session_id=...
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-[#E5E7EB] p-6">
      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#C9A84C] to-[#38BDF8] bg-clip-text text-transparent">
        Find Your Next Client
      </h1>
      <p className="text-gray-400 mb-6">Each lead scored on business size, review health, and opportunity signals.</p>

      {/* Filters */}
      <div className="bg-[#1a2332] rounded-xl p-4 grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        <input className="bg-[#0c1626] px-3 py-2 rounded-lg" placeholder="Niche (plumbing, dental, mortgage...)"
          value={filters.niche} onChange={e => setFilters({...filters, niche: e.target.value})} />
        <input className="bg-[#0c1626] px-3 py-2 rounded-lg" placeholder="City"
          value={filters.city} onChange={e => setFilters({...filters, city: e.target.value})} />
        <select className="bg-[#0c1626] px-3 py-2 rounded-lg"
          value={filters.country} onChange={e => setFilters({...filters, country: e.target.value})}>
          <option>Canada</option><option>USA</option>
        </select>
        <input type="number" className="bg-[#0c1626] px-3 py-2 rounded-lg" placeholder="Radius km"
          value={filters.radius_km} onChange={e => setFilters({...filters, radius_km: parseInt(e.target.value)})} />
        <button className="bg-[#38BDF8] text-[#0A1628] font-bold rounded-lg"
          onClick={search} disabled={loading}>
          {loading ? 'Searching...' : 'Find Leads'}
        </button>
      </div>

      {/* Quick filter chips */}
      <div className="flex flex-wrap gap-2 mb-6 text-xs">
        <Chip active={filters.only_has_phone_issues}
          onClick={() => setFilters({...filters, only_has_phone_issues: !filters.only_has_phone_issues})}>
          📞 Phone issues in reviews
        </Chip>
        <Chip active={filters.only_below_4_rating}
          onClick={() => setFilters({...filters, only_below_4_rating: !filters.only_below_4_rating})}>
          ⭐ Below 4.0 rating
        </Chip>
        <Chip>🔥 High volume</Chip>
        <Chip>🚫 No website</Chip>
        <Chip>💸 Paid ads detected</Chip>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LEFT — results list (2/3 width) */}
        <div className="lg:col-span-2 space-y-3">
          {results.map(lead => (
            <LeadCard key={lead.place_id} lead={lead} onClick={() => setSelectedLead(lead)} />
          ))}
          {results.length === 0 && !loading && (
            <div className="bg-[#1a2332] rounded-xl p-6 text-center text-gray-500">
              Search to find scored leads in your area.
            </div>
          )}
        </div>

        {/* RIGHT — Business Deep Dive (1/3 width) */}
        <div className="lg:col-span-1">
          {selectedLead ? (
            <DeepDivePanel lead={selectedLead} onDeploy={() => deployForLead(selectedLead)} />
          ) : (
            <div className="bg-[#1a2332] rounded-xl p-6 text-center text-gray-500 sticky top-6">
              Pick a lead to see the full profile
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Chip({ children, active, onClick }) {
  return (
    <button onClick={onClick}
      className={`px-3 py-1 rounded-full border ${
        active ? 'bg-[#C9A84C] text-[#0A1628] border-[#C9A84C]' : 'bg-[#1a2332] border-gray-700 text-gray-400'
      }`}>{children}</button>
  );
}

function LeadCard({ lead, onClick }) {
  const scoreColor = lead.score >= 75 ? 'text-green-400' : lead.score >= 50 ? 'text-yellow-400' : 'text-gray-500';
  return (
    <div className="bg-[#1a2332] rounded-xl p-4 cursor-pointer hover:bg-[#22304a] transition" onClick={onClick}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="font-bold text-lg">{lead.name}</div>
          <div className="text-sm text-gray-400">{lead.niche} · {lead.address}</div>
          <div className="text-sm text-gray-400">⭐ {lead.rating} ({lead.review_count}) · {lead.phone}</div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${scoreColor}`}>{lead.score}</div>
          <div className="text-xs text-gray-500">Score</div>
        </div>
      </div>
      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-3">
        {lead.tags?.map(t => (
          <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-[#0A1628] border border-[#38BDF8]/30 text-[#38BDF8]">
            {t.replace(/_/g, ' ')}
          </span>
        ))}
      </div>
    </div>
  );
}

function DeepDivePanel({ lead, onDeploy }) {
  return (
    <div className="bg-[#1a2332] rounded-xl p-5 sticky top-6 space-y-4">
      {/* Header */}
      <div>
        <div className="text-xs text-[#C9A84C] uppercase tracking-wider">Business Deep Dive</div>
        <div className="text-xl font-bold mt-1">{lead.name}</div>
        <div className="text-sm text-gray-400">{lead.niche}</div>
      </div>

      {/* Score + bars */}
      <div className="bg-[#0c1626] rounded-lg p-3 space-y-2">
        <div className="flex justify-between text-xs">
          <span>Business Size</span><span>{lead.size_score}%</span>
        </div>
        <Bar pct={lead.size_score} color="#38BDF8" />
        <div className="flex justify-between text-xs">
          <span>Review Health</span><span className={lead.review_health_score < 50 ? 'text-yellow-400' : ''}>{lead.review_health_score}%</span>
        </div>
        <Bar pct={lead.review_health_score} color={lead.review_health_score < 50 ? '#EAB308' : '#9DE02E'} />
        <div className="flex justify-between text-xs">
          <span>Opportunity</span><span>{lead.opportunity_score}%</span>
        </div>
        <Bar pct={lead.opportunity_score} color="#C9A84C" />
      </div>

      {/* Enriched data points */}
      <div className="space-y-1 text-sm">
        <EnrichedRow label="Owner" value={lead.deep_dive?.owner} />
        <EnrichedRow label="Email" value={lead.deep_dive?.email} />
        <EnrichedRow label="Direct Line" value={lead.deep_dive?.direct_line} />
        <EnrichedRow label="Website" value={lead.website} />
        <EnrichedRow label="Hours" value={lead.deep_dive?.hours} />
        <EnrichedRow label="Est. Revenue" value={lead.deep_dive?.est_revenue} />
        <EnrichedRow label="Tech stack" value={lead.deep_dive?.tech_stack?.join(', ')} />
        <EnrichedRow label="Competitor density" value={lead.deep_dive?.competitor_density} />
      </div>

      {/* Phone-issue reviews */}
      {lead.review_snippets?.length > 0 && (
        <div className="bg-[#0c1626] rounded-lg p-3">
          <div className="text-xs font-bold text-[#C9A84C] uppercase mb-2">Phone Issues Mentioned</div>
          <div className="space-y-2 text-sm italic text-gray-300">
            {lead.review_snippets.slice(0, 3).map((r, i) => (
              <div key={i}>"{r.text}" <span className="not-italic text-xs text-gray-500">— {r.author}, {r.date}</span></div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="space-y-2">
        <button onClick={onDeploy} className="w-full bg-[#C9A84C] text-[#0A1628] font-bold py-3 rounded-lg">
          Deploy System for This Business
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-[#1a2332] border border-gray-700 text-sm py-2 rounded-lg">📞 Call Now</button>
          <button className="bg-[#1a2332] border border-gray-700 text-sm py-2 rounded-lg">🌐 Visit Website</button>
        </div>
      </div>
    </div>
  );
}

function Bar({ pct, color }) {
  return (
    <div className="h-1.5 bg-[#0a0f18] rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

function EnrichedRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-3">
      <span className="text-gray-500 shrink-0">{label}</span>
      <span className="truncate text-right">{value}</span>
    </div>
  );
}
