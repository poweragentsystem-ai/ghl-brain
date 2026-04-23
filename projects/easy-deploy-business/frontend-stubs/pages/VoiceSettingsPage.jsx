// VoiceSettingsPage.jsx — dedicated voice AI config.
// Provider, voice selection, style, speed, disclosure language, caller ID.

import React, { useState } from 'react';

const PROVIDERS = [
  { id: 'ghl', name: 'GHL Native Voice AI', desc: 'Included. Good for MVP / low-volume.', badge: 'DEFAULT' },
  { id: 'assistable', name: 'Assistable.ai', desc: 'Premium voice quality. Pay-per-minute.', badge: 'RECOMMENDED' },
  { id: 'elevenlabs', name: 'ElevenLabs', desc: 'Ultra-realistic voice cloning.', badge: 'ENTERPRISE' },
];

const DEFAULT_DISCLOSURE = `Hey, just letting you know I'm an AI assistant calling on behalf of {{company_name}}. You're being recorded for quality. Is now an OK time to chat?`;

export default function VoiceSettingsPage() {
  const [provider, setProvider] = useState('ghl');
  const [voice, setVoice] = useState('');
  const [style, setStyle] = useState('friendly');
  const [speed, setSpeed] = useState(1.0);
  const [callerIdMode, setCallerIdMode] = useState('provisioned');  // or 'byo'
  const [byoNumber, setByoNumber] = useState('');
  const [disclosure, setDisclosure] = useState(DEFAULT_DISCLOSURE);
  const [voicemailDrop, setVoicemailDrop] = useState('');

  async function save() {
    // TODO: PUT /api/client/:id/voice-settings with all fields
    // If BYO number, kick off GHL Verified Caller ID verification flow
    // If provider=Assistable, verify API key set in integrations
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-[#E5E7EB] p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#C9A84C] to-[#38BDF8] bg-clip-text text-transparent">
        Voice AI Settings
      </h1>

      {/* Provider */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">Provider</h2>
        <div className="space-y-2">
          {PROVIDERS.map(p => (
            <label key={p.id} className={`block bg-[#1a2332] rounded-xl p-4 cursor-pointer border-2 ${provider === p.id ? 'border-[#38BDF8]' : 'border-transparent'}`}>
              <input type="radio" name="provider" value={p.id} checked={provider === p.id} onChange={() => setProvider(p.id)} className="sr-only" />
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold">{p.name}</div>
                  <div className="text-sm text-gray-400">{p.desc}</div>
                </div>
                <span className="text-xs bg-[#C9A84C] text-[#0A1628] px-2 py-1 rounded-full font-bold">{p.badge}</span>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Voice selection — provider-specific list */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">Voice</h2>
        <select className="bg-[#1a2332] w-full rounded-xl px-4 py-3" value={voice} onChange={e => setVoice(e.target.value)}>
          <option value="">-- Pick a voice --</option>
          {/* TODO: fetch voices for selected provider */}
        </select>
        <button className="text-xs mt-2 text-[#38BDF8]">▶ Preview</button>
      </section>

      {/* Style + speed */}
      <section className="mb-8 grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-bold mb-3">Style</h2>
          <select className="bg-[#1a2332] w-full rounded-xl px-4 py-3" value={style} onChange={e => setStyle(e.target.value)}>
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="energetic">Energetic</option>
          </select>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-3">Speed: {speed.toFixed(2)}x</h2>
          <input type="range" min="0.75" max="1.25" step="0.05" value={speed} onChange={e => setSpeed(parseFloat(e.target.value))} className="w-full" />
        </div>
      </section>

      {/* Caller ID */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">Caller ID</h2>
        <label className="flex items-start gap-3 mb-3 cursor-pointer">
          <input type="radio" checked={callerIdMode === 'provisioned'} onChange={() => setCallerIdMode('provisioned')} />
          <div>
            <div className="font-bold">Use the number we gave you</div>
            <div className="text-sm text-gray-400">Twilio-provisioned. Works immediately.</div>
          </div>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="radio" checked={callerIdMode === 'byo'} onChange={() => setCallerIdMode('byo')} />
          <div>
            <div className="font-bold">Show my own business number</div>
            <div className="text-sm text-gray-400">GHL Verified Caller ID. Requires 1-time verification (you get a text).</div>
          </div>
        </label>
        {callerIdMode === 'byo' && (
          <input
            className="mt-3 bg-[#1a2332] w-full rounded-xl px-4 py-3"
            placeholder="+1 416 555 0100"
            value={byoNumber}
            onChange={e => setByoNumber(e.target.value)}
          />
        )}
      </section>

      {/* AI Disclosure — CRTC / FTC */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">AI Disclosure Script</h2>
        <p className="text-sm text-gray-400 mb-2">Required in Canada + some US states when AI calls identify. We default to explicit disclosure for safety.</p>
        <textarea
          className="bg-[#1a2332] w-full rounded-xl px-4 py-3 min-h-24"
          value={disclosure}
          onChange={e => setDisclosure(e.target.value)}
        />
      </section>

      {/* Voicemail drop */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">Voicemail Drop Script</h2>
        <textarea
          className="bg-[#1a2332] w-full rounded-xl px-4 py-3 min-h-20"
          placeholder="Hi {{contact.first_name}}, this is {{ai_agent_name}} from {{company_name}}..."
          value={voicemailDrop}
          onChange={e => setVoicemailDrop(e.target.value)}
        />
      </section>

      <button onClick={save} className="w-full bg-[#38BDF8] text-[#0A1628] font-bold py-3 rounded-xl">
        Save Voice Settings
      </button>
    </div>
  );
}
