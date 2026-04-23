// OrbPage.jsx — the entry page. A 3D Orb on the left, chat on the right (desktop) or chat below (mobile).
// Calls POST /api/orb for every user message. Streams Claude responses.
// Side panel fills in live as Orb learns (bot list, pricing preview).

import React, { useState, useEffect, useRef } from 'react';
// TODO: import { Canvas } from '@react-three/fiber';
// TODO: import { OrbScene } from '../components/OrbScene';
// TODO: import { ChatBubble } from '../components/ChatBubble';
// TODO: import { LiveBuildPreview } from '../components/LiveBuildPreview';

export default function OrbPage() {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);    // {role, content}
  const [sessionState, setSessionState] = useState({});
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const endRef = useRef(null);

  // TODO: on mount, create session_id (uuid), POST initial hello to /api/orb, get first Orb message

  async function sendMessage() {
    if (!input.trim() || isStreaming) return;
    const userMsg = { role: 'user', content: input };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setIsStreaming(true);

    // TODO: fetch POST /api/orb with {session_id, user_message, chat_history}
    // Stream response via SSE or readable stream
    // Update messages as deltas arrive
    // Update sessionState on state_update events
    // Set isStreaming=false on done

    setIsStreaming(false);
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-[#E5E7EB] flex flex-col lg:flex-row">
      {/* LEFT — 3D Orb */}
      <div className="lg:w-1/2 h-[50vh] lg:h-screen flex items-center justify-center">
        {/* TODO: <Canvas><OrbScene speaking={isStreaming} /></Canvas> */}
        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#38BDF8] animate-pulse" />
      </div>

      {/* RIGHT — Chat + Live Preview */}
      <div className="lg:w-1/2 flex flex-col h-[50vh] lg:h-screen">
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={m.role === 'user' ? 'text-right' : ''}>
              <div className={`inline-block max-w-[85%] px-4 py-3 rounded-2xl ${
                m.role === 'user'
                  ? 'bg-[#C9A84C] text-[#0A1628]'
                  : 'bg-[#1a2332] text-[#E5E7EB]'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {isStreaming && <div className="text-gray-400 text-sm">Orb is thinking...</div>}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex gap-2">
            <input
              className="flex-1 bg-[#1a2332] rounded-xl px-4 py-3 outline-none"
              placeholder="Type your answer..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              disabled={isStreaming}
            />
            <button
              className="px-6 py-3 bg-[#38BDF8] text-[#0A1628] font-bold rounded-xl disabled:opacity-50"
              onClick={sendMessage}
              disabled={isStreaming}
            >Send</button>
          </div>
        </div>

        {/* Live Build Preview — shown at bottom as Orb learns */}
        {Object.keys(sessionState).length > 0 && (
          <div className="bg-[#0c1626] border-t border-gray-800 p-4 text-xs">
            {/* TODO: <LiveBuildPreview state={sessionState} /> */}
            <pre>{JSON.stringify(sessionState, null, 2).slice(0, 400)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
