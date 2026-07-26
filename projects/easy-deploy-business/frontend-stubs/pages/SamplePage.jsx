// SamplePage.jsx — Assistlet public demo, command-center UI.
// Glass panel with KPI grid + workday arc + 24h activity trend + week outlook,
// live toast notifications, mode-switching dock, animated voice orb.
// Standalone — no API wiring; all interactions are simulated for the demo.

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const BG = "#08090D";
const ACCENT = "#2DD4A8";
const WARM = "#FB923C";
const COOL = "#818CF8";
const BLUE = "#38BDF8";

// ---- static demo data ---------------------------------------------------

const kpis = [
  { key: "calls",    label: "Calls today",   value: 14,   delta: "+3 vs yesterday", color: ACCENT, icon: "◉" },
  { key: "bookings", label: "Bookings",      value: 6,    delta: "60% of target",   color: WARM,   icon: "◆" },
  { key: "reply",    label: "Reply rate",    value: 92,   suffix: "%", delta: "excellent",  color: ACCENT, icon: "↗" },
  { key: "convert",  label: "Conversion",    value: 43,   suffix: "%", delta: "+8pt WoW",   color: BLUE,   icon: "△" },
  { key: "avg",      label: "Avg response",  value: 1.2,  suffix: "min", delta: "faster than 90%", color: ACCENT, icon: "◔" },
  { key: "uptime",   label: "Uptime",        value: 100,  suffix: "%", delta: "24h clean",  color: ACCENT, icon: "●" },
];

// call volume per hour, 0..23
const trend24 = [1,0,0,0,0,0,1,2,4,7,9,11,10,8,6,5,7,9,6,3,2,1,1,0];

const week = [
  { day: "MON", calls: 14, bookings: 6, pct: 60 },
  { day: "TUE", calls: 11, bookings: 5, pct: 50 },
  { day: "WED", calls: 16, bookings: 8, pct: 80 },
  { day: "THU", calls: 9,  bookings: 3, pct: 30 },
  { day: "FRI", calls: 12, bookings: 7, pct: 70 },
];

const activityData = {
  "RECENT CALLS": [
    { text: "Sarah Chen — Booked Tuesday 2:00pm",    time: "3m ago",  dot: ACCENT },
    { text: "Mike Rodriguez — Follow-up scheduled",  time: "18m ago", dot: ACCENT },
    { text: "Support · Priya S. — Resolved",         time: "1h ago",  dot: COOL },
    { text: "Lead qualify — Passed to closer",       time: "2h ago",  dot: ACCENT },
  ],
  "ACTIVE TASKS": [
    { text: "Send onboarding to 3 new signups",      time: "In 15m",    dot: WARM },
    { text: "Follow up: warm leads (5)",             time: "Due today", dot: WARM },
  ],
  "DRAFTS": [
    { text: "Welcome sequence · client kickoff",     time: "Ready to review", dot: "#4B5563" },
  ],
};

const modes = [
  { key: "live",   label: "Live",   desc: "answering + booking",   color: ACCENT },
  { key: "focus",  label: "Focus",  desc: "priority leads only",   color: WARM   },
  { key: "silent", label: "Silent", desc: "log, don't answer",     color: "#6B7280" },
  { key: "away",   label: "Away",   desc: "voicemail + text back", color: COOL   },
];

export default function AssistletAI() {
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState("idle");        // idle | listening | processing
  const [mode, setMode] = useState("live");
  const [panelOpen, setPanelOpen] = useState(true);
  const [greeting, setGreeting] = useState("");
  const [toast, setToast] = useState(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
  }, []);

  // starfield
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 240 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.15,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.4 + 0.12,
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.011;
      stars.forEach((s) => {
        const a = 0.22 + 0.6 * Math.abs(Math.sin(s.phase + t * s.speed));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animRef.current); };
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const showToast = useCallback((text, tone = ACCENT) => {
    setToast({ text, tone });
    timers.current.push(setTimeout(() => setToast(null), 3800));
  }, []);

  const toggleMic = useCallback(() => {
    if (!listening) {
      setListening(true);
      setStatus("listening");
      timers.current.push(setTimeout(() => setStatus("processing"), 3200));
      timers.current.push(setTimeout(() => {
        setListening(false);
        setStatus("idle");
        showToast("Just booked Sarah Chen for Tuesday 2:00pm");
      }, 5500));
    } else {
      setListening(false);
      setStatus("idle");
    }
  }, [listening, showToast]);

  const pickMode = (m) => {
    setMode(m.key);
    showToast(`Switched to ${m.label} mode — ${m.desc}`, m.color);
  };

  const statusColor = { idle: "#374151", listening: ACCENT, processing: COOL }[status];
  const statusLabel = { idle: "STANDBY", listening: "LISTENING", processing: "THINKING" }[status];

  // workday arc — clamp to 9am..6pm window
  const now = useMemo(() => new Date(), []);
  const nowH = now.getHours() + now.getMinutes() / 60;
  const dayPct = Math.max(0, Math.min(1, (nowH - 9) / 9));

  // 24h trend polyline (viewBox 100x40)
  const trendPoints = useMemo(() => {
    const max = Math.max(...trend24);
    return trend24.map((v, i) => {
      const x = (i / 23) * 100;
      const y = 40 - (v / max) * 38 - 1;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(" ");
  }, []);

  const arcMarkerX = 20 + dayPct * 260;
  const arcMarkerY = 80 - Math.sin(dayPct * Math.PI) * 58;

  return (
    <div style={{ position: "relative", width: "100vw", minHeight: "100vh", background: BG, overflow: "hidden", fontFamily: "'DM Sans', sans-serif", color: "#E5E7EB" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nebula { position: absolute; border-radius: 50%; pointer-events: none; animation: nebDrift ease-in-out infinite; }
        @keyframes nebDrift { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-22px) scale(1.04)} 66%{transform:translate(-18px,26px) scale(0.96)} }
        @keyframes orbIdle    { 0%,100%{box-shadow:0 0 40px 12px rgba(45,212,168,0.10),0 0 90px 30px rgba(45,212,168,0.06),inset 0 0 30px rgba(45,212,168,0.15)} 50%{box-shadow:0 0 60px 22px rgba(45,212,168,0.18),0 0 130px 50px rgba(45,212,168,0.10),inset 0 0 50px rgba(45,212,168,0.28)} }
        @keyframes orbListen  { 0%,100%{box-shadow:0 0 80px 30px rgba(45,212,168,0.28),0 0 160px 60px rgba(45,212,168,0.16),inset 0 0 60px rgba(45,212,168,0.42);transform:scale(1.02)} 50%{box-shadow:0 0 120px 50px rgba(45,212,168,0.38),0 0 220px 90px rgba(45,212,168,0.22),inset 0 0 85px rgba(45,212,168,0.55);transform:scale(1.07)} }
        @keyframes orbProcess { 0%,100%{box-shadow:0 0 80px 30px rgba(129,140,248,0.28),0 0 160px 60px rgba(129,140,248,0.16),inset 0 0 60px rgba(129,140,248,0.35)} 50%{box-shadow:0 0 120px 50px rgba(129,140,248,0.38),0 0 220px 90px rgba(129,140,248,0.22),inset 0 0 85px rgba(129,140,248,0.5)} }
        @keyframes ringPulse  { 0%{transform:translate(-50%,-50%) scale(1);opacity:.7} 100%{transform:translate(-50%,-50%) scale(2.4);opacity:0} }
        @keyframes dotBlink   { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes slideDown  { from{transform:translate(-50%,-140%);opacity:0} to{transform:translate(-50%,0);opacity:1} }
        @keyframes fadeUp     { from{transform:translateY(14px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes slideR     { from{transform:translateX(14px);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes shine      { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        .orb            { animation: orbIdle 4s ease-in-out infinite; cursor: pointer; transition: background 0.6s ease; }
        .orb.listening  { animation: orbListen 1.4s ease-in-out infinite; }
        .orb.processing { animation: orbProcess 1s ease-in-out infinite; }
        .card    { background: rgba(18,20,28,0.78); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; transition: all .3s cubic-bezier(0.16,1,0.3,1); }
        .kpi     { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 12px 12px 10px; transition: all .25s ease; }
        .kpi:hover { background: rgba(255,255,255,0.045); border-color: rgba(45,212,168,0.22); transform: translateY(-1px); }
        .fade-up { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .slide-r { animation: slideR 0.35s cubic-bezier(0.16,1,0.3,1) both; }
        .toast   { animation: slideDown 0.45s cubic-bezier(0.16,1,0.3,1) both; }
        .bar     { position: relative; overflow: hidden; }
        .bar::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent); transform:translateX(-100%); animation: shine 3.5s ease-in-out infinite; }
        .mode-chip { transition: all .25s ease; }
        .mode-chip:hover { transform: translateY(-1px); }
        button { cursor: pointer; border: none; outline: none; font-family: inherit; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(45,212,168,0.25); border-radius: 2px; }
      `}</style>

      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />

      {[
        { w:560, h:560, bg:"radial-gradient(circle,#2DD4A8,transparent)", top:"3%",   left:"8%",  dur:"26s", op:0.09 },
        { w:440, h:440, bg:"radial-gradient(circle,#6366F1,transparent)", top:"38%",  right:"4%", dur:"31s", op:0.09 },
        { w:380, h:380, bg:"radial-gradient(circle,#FB923C,transparent)", bottom:"6%",left:"32%", dur:"27s", op:0.06 },
      ].map((n, i) => (
        <div key={i} className="nebula" style={{ width:n.w, height:n.h, background:n.bg, top:n.top, left:n.left, right:n.right, bottom:n.bottom, filter:"blur(78px)", opacity:n.op, animationDuration:n.dur }} />
      ))}

      {/* ============================== HEADER ============================== */}
      <div style={{ position:"fixed", top:0, left:0, right:0, height:56, zIndex:70, background:"rgba(8,9,13,0.72)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", borderBottom:"1px solid rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 22px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:9 }}>
            <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:17, color:"#fff", letterSpacing:"0.1em" }}>ASSISTLET</span>
            <div style={{ width:5, height:5, borderRadius:"50%", background:ACCENT, boxShadow:`0 0 8px ${ACCENT}` }} />
            <span style={{ fontSize:10, color:"rgba(255,255,255,0.35)", fontWeight:600, letterSpacing:"0.2em" }}>AI</span>
          </div>
          <div style={{ height:18, width:1, background:"rgba(255,255,255,0.08)" }} />
          <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:10, color:"rgba(255,255,255,0.4)", letterSpacing:"0.16em", fontWeight:600, textTransform:"uppercase" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:ACCENT, boxShadow:`0 0 6px ${ACCENT}`, animation:"dotBlink 2s ease-in-out infinite" }} />
            REAL-TIME · SYNCED
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:9 }}>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", letterSpacing:"0.15em", fontWeight:600, textTransform:"uppercase" }}>
              Today · <span style={{ color:"#fff" }}>6 / 10</span> bookings
            </div>
            <div style={{ width:110, height:5, borderRadius:3, background:"rgba(255,255,255,0.06)", overflow:"hidden" }}>
              <div className="bar" style={{ width:"60%", height:"100%", background:`linear-gradient(90deg,${ACCENT},${WARM})`, borderRadius:3 }} />
            </div>
            <div style={{ fontSize:10, color:ACCENT, fontWeight:700, fontFamily:"'JetBrains Mono',monospace" }}>60%</div>
          </div>
          <div style={{ height:18, width:1, background:"rgba(255,255,255,0.08)" }} />
          <button onClick={() => setPanelOpen(p => !p)} style={{ width:32, height:32, borderRadius:8, background:panelOpen?"rgba(45,212,168,0.08)":"rgba(255,255,255,0.04)", border:`1px solid ${panelOpen?"rgba(45,212,168,0.2)":"rgba(255,255,255,0.07)"}`, color:panelOpen?ACCENT:"rgba(255,255,255,0.45)", fontSize:13, display:"flex", alignItems:"center", justifyContent:"center" }}>☰</button>
          <div style={{ display:"flex", alignItems:"center", gap:6, padding:"4px 10px", borderRadius:20, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:statusColor, boxShadow:status!=="idle"?`0 0 7px ${statusColor}`:"none", animation:status!=="idle"?"dotBlink 1s ease-in-out infinite":"none" }} />
            <span style={{ fontSize:9, color:"rgba(255,255,255,0.4)", fontWeight:600, letterSpacing:"0.15em" }}>{statusLabel}</span>
          </div>
        </div>
      </div>

      {/* ============================== TOAST ============================== */}
      {toast && (
        <div className="toast" style={{ position:"fixed", top:70, left:"50%", zIndex:80, padding:"9px 16px", borderRadius:24, background:"rgba(18,20,28,0.92)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", border:`1px solid ${toast.tone}55`, boxShadow:`0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${toast.tone}22`, display:"flex", alignItems:"center", gap:9, fontSize:12, color:"#fff", fontWeight:500 }}>
          <div style={{ width:16, height:16, borderRadius:"50%", background:toast.tone, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:"#000", fontWeight:700 }}>✓</div>
          {toast.text}
        </div>
      )}

      {/* ============================ MAIN PANEL ============================ */}
      <div style={{ position:"relative", zIndex:20, maxWidth:1100, margin:"0 auto", padding:"88px 24px 140px 24px" }}>
        <div className="card fade-up" style={{ padding:28, display:"grid", gridTemplateColumns:"minmax(0,1.15fr) minmax(0,1fr)", gap:32 }}>

          {/* ---------- LEFT COLUMN ---------- */}
          <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
            {/* headline */}
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
              <div>
                <div style={{ fontSize:10, color:ACCENT, letterSpacing:"0.18em", fontWeight:700, textTransform:"uppercase" }}>Command Center</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, color:"#fff", marginTop:4 }}>{greeting}, Renée.</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:2 }}>Assistlet · Xpert Web Solutions</div>
              </div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", textAlign:"right", fontFamily:"'JetBrains Mono',monospace", lineHeight:1.5 }}>
                {now.toLocaleDateString(undefined, { weekday:"short", month:"short", day:"numeric" })}<br/>
                <span style={{ color:"rgba(255,255,255,0.6)" }}>{now.toLocaleTimeString(undefined, { hour:"2-digit", minute:"2-digit" })}</span>
              </div>
            </div>

            {/* orb + hero stat */}
            <div style={{ display:"flex", alignItems:"center", gap:22 }}>
              <div style={{ position:"relative", width:130, height:130, flexShrink:0 }}>
                {listening && [0, 0.45, 0.9].map((d, i) => (
                  <div key={i} style={{ position:"absolute", top:"50%", left:"50%", width:130, height:130, borderRadius:"50%", border:`1px solid rgba(45,212,168,${0.55 - i * 0.15})`, animation:`ringPulse 1.8s cubic-bezier(0.16,1,0.3,1) ${d}s infinite`, pointerEvents:"none" }} />
                ))}
                <div
                  className={`orb${listening ? " listening" : ""}${status === "processing" ? " processing" : ""}`}
                  onClick={toggleMic}
                  style={{ width:130, height:130, borderRadius:"50%", background: status === "processing"
                    ? "radial-gradient(circle at 38% 34%, rgba(180,185,255,0.95) 0%, #818CF8 22%, rgba(60,70,200,0.88) 58%, rgba(18,18,60,0.95) 100%)"
                    : "radial-gradient(circle at 38% 34%, rgba(100,255,220,0.95) 0%, #2DD4A8 22%, rgba(20,150,110,0.88) 58%, rgba(8,48,40,0.95) 100%)" }}
                />
              </div>
              <div style={{ minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:72, fontWeight:800, color:"#fff", lineHeight:0.9 }}>14</div>
                  <div style={{ fontSize:16, color:"rgba(255,255,255,0.5)", fontWeight:500 }}>calls</div>
                </div>
                <div style={{ fontSize:15, color:"#fff", fontWeight:500, marginTop:8 }}>
                  {status === "idle" ? "How can I help, Renée?" : status === "listening" ? "I'm listening…" : "Working on it…"}
                </div>
                <div style={{ display:"flex", gap:12, marginTop:10, fontSize:11, color:"rgba(255,255,255,0.5)", flexWrap:"wrap" }}>
                  <span>Bookings <span style={{ color:"#fff", fontWeight:600 }}>6</span></span>
                  <span style={{ color:"rgba(255,255,255,0.15)" }}>·</span>
                  <span>Avg reply <span style={{ color:"#fff", fontWeight:600 }}>1.2m</span></span>
                  <span style={{ color:"rgba(255,255,255,0.15)" }}>·</span>
                  <span>Uptime <span style={{ color:ACCENT, fontWeight:600 }}>100%</span></span>
                </div>
              </div>
            </div>

            {/* insight tip */}
            <div style={{ padding:"12px 14px", background:"rgba(45,212,168,0.05)", border:"1px solid rgba(45,212,168,0.15)", borderRadius:12, fontSize:12, color:"rgba(255,255,255,0.78)", lineHeight:1.55, display:"flex", gap:10 }}>
              <div style={{ color:ACCENT, flexShrink:0, marginTop:1 }}>◈</div>
              <div>Response times are <b style={{ color:"#fff" }}>32% faster</b> than last week. 3 warm leads haven't been re-contacted in 48h — recommend a follow-up sweep in the next hour.</div>
            </div>

            {/* KPI grid */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:10 }}>
              {kpis.map((k, i) => (
                <div key={k.key} className="kpi fade-up" style={{ animationDelay:`${0.05 * i}s` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:9, letterSpacing:"0.15em", color:"rgba(255,255,255,0.4)", fontWeight:700, textTransform:"uppercase" }}>
                    <span style={{ color:k.color }}>{k.icon}</span> {k.label}
                  </div>
                  <div style={{ display:"flex", alignItems:"baseline", gap:3, marginTop:6 }}>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:700, color:"#fff", lineHeight:1 }}>{k.value}</div>
                    {k.suffix && <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", fontWeight:500 }}>{k.suffix}</div>}
                  </div>
                  <div style={{ fontSize:10, color:k.color, marginTop:4, fontWeight:500 }}>{k.delta}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- RIGHT COLUMN ---------- */}
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>

            {/* WORKDAY ARC */}
            <div className="fade-up">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <span style={{ fontSize:9, letterSpacing:"0.2em", color:"rgba(255,255,255,0.35)", fontWeight:700, textTransform:"uppercase" }}>Workday Arc</span>
                <span style={{ fontSize:10, color:"rgba(255,255,255,0.4)" }}>9h day · <span style={{ color:ACCENT, fontFamily:"'JetBrains Mono',monospace" }}>{Math.round(dayPct*100)}%</span></span>
              </div>
              <svg viewBox="0 0 300 90" style={{ width:"100%", height:100, overflow:"visible" }}>
                <defs>
                  <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0"   stopColor={COOL} />
                    <stop offset="0.5" stopColor={ACCENT} />
                    <stop offset="1"   stopColor={WARM} />
                  </linearGradient>
                </defs>
                <path d="M 20 80 Q 150 -20 280 80" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="3 4" />
                <path d="M 20 80 Q 150 -20 280 80" fill="none" stroke="url(#arcGrad)" strokeWidth="2.5" pathLength="1" strokeDasharray={`${dayPct} 1`} strokeLinecap="round" />
                <circle cx={arcMarkerX} cy={arcMarkerY} r="6" fill={ACCENT} stroke={BG} strokeWidth="2">
                  <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
                </circle>
              </svg>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"rgba(255,255,255,0.4)", fontFamily:"'JetBrains Mono',monospace", marginTop:-4 }}>
                <div><div>09:00</div><div style={{ color:"rgba(255,255,255,0.55)", fontSize:9, marginTop:1, fontFamily:"'DM Sans',sans-serif" }}>day start</div></div>
                <div style={{ textAlign:"center" }}><div style={{ color:"#fff" }}>NOW</div><div style={{ color:ACCENT, fontSize:9, marginTop:1, fontFamily:"'DM Sans',sans-serif" }}>on track</div></div>
                <div style={{ textAlign:"right" }}><div>18:00</div><div style={{ color:"rgba(255,255,255,0.55)", fontSize:9, marginTop:1, fontFamily:"'DM Sans',sans-serif" }}>wrap-up</div></div>
              </div>
            </div>

            {/* 24-HR ACTIVITY TREND */}
            <div className="fade-up">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <span style={{ fontSize:9, letterSpacing:"0.2em", color:"rgba(255,255,255,0.35)", fontWeight:700, textTransform:"uppercase" }}>24-Hour Activity</span>
                <span style={{ fontSize:10, color:"rgba(255,255,255,0.4)" }}>Peak · <span style={{ color:"#fff" }}>11 calls @ 11am</span></span>
              </div>
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ width:"100%", height:80 }}>
                <defs>
                  <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={ACCENT} stopOpacity="0.35" />
                    <stop offset="1" stopColor={ACCENT} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon points={`0,40 ${trendPoints} 100,40`} fill="url(#trendFill)" />
                <polyline points={trendPoints} fill="none" stroke={ACCENT} strokeWidth="0.7" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </svg>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:9, color:"rgba(255,255,255,0.3)", fontFamily:"'JetBrains Mono',monospace" }}>
                {["00:00","06:00","12:00","18:00","24:00"].map(t => <span key={t}>{t}</span>)}
              </div>
            </div>

            {/* WEEK OUTLOOK */}
            <div className="fade-up">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <span style={{ fontSize:9, letterSpacing:"0.2em", color:"rgba(255,255,255,0.35)", fontWeight:700, textTransform:"uppercase" }}>Week Outlook</span>
                <span style={{ fontSize:10, color:"rgba(255,255,255,0.4)" }}>Target · <span style={{ color:"#fff" }}>10/day</span></span>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {week.map((d, i) => (
                  <div key={d.day} className="slide-r" style={{ display:"grid", gridTemplateColumns:"36px 1fr 42px 60px", alignItems:"center", gap:10, animationDelay:`${0.06 * i}s` }}>
                    <div style={{ fontSize:10, color: i === 0 ? "#fff" : "rgba(255,255,255,0.55)", fontWeight: i === 0 ? 700 : 500, letterSpacing:"0.1em" }}>{d.day}</div>
                    <div style={{ height:6, borderRadius:3, background:"rgba(255,255,255,0.05)", overflow:"hidden" }}>
                      <div className="bar" style={{ height:"100%", width:`${d.pct}%`, background:`linear-gradient(90deg,${COOL},${ACCENT},${WARM})`, borderRadius:3 }} />
                    </div>
                    <div style={{ fontSize:11, color:"#fff", fontWeight:600, textAlign:"right", fontFamily:"'JetBrains Mono',monospace" }}>{d.calls}</div>
                    <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", textAlign:"right" }}>{d.bookings} book</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================ RIGHT PANEL ============================ */}
      <div style={{ position:"fixed", top:56, right:0, bottom:0, width: panelOpen ? 258 : 0, background:"rgba(8,9,13,0.82)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", borderLeft: panelOpen ? "1px solid rgba(255,255,255,0.05)" : "none", zIndex:50, overflow:"hidden", transition:"width 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ padding:"18px 14px 140px 14px", height:"100%", overflowY:"auto" }}>
          {Object.entries(activityData).map(([section, items], si) => (
            <div key={section} style={{ marginBottom:22 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:9 }}>
                <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", color:"rgba(255,255,255,0.28)", textTransform:"uppercase" }}>{section}</span>
                <span style={{ fontSize:10, fontWeight:700, color:ACCENT }}>{items.length}</span>
              </div>
              {items.map((item, i) => (
                <div key={i} className="slide-r" style={{ padding:"9px 11px", borderRadius:10, marginBottom:5, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)", display:"flex", alignItems:"flex-start", gap:9, animationDelay:`${(si * 3 + i) * 0.06}s`, cursor:"pointer" }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:item.dot, marginTop:5, flexShrink:0, boxShadow:`0 0 5px ${item.dot}` }} />
                  <div>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.72)", lineHeight:1.45 }}>{item.text}</div>
                    <div style={{ fontSize:10, color:"rgba(255,255,255,0.28)", marginTop:3 }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============================ BOTTOM DOCK ============================ */}
      <div style={{ position:"fixed", bottom:22, left:0, right: panelOpen ? 258 : 0, zIndex:60, display:"flex", justifyContent:"center", padding:"0 20px", pointerEvents:"none", transition:"right 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
        <div className="card" style={{ pointerEvents:"all", padding:"10px 14px", display:"flex", alignItems:"center", gap:14, borderRadius:60, background:"rgba(8,9,13,0.9)" }}>
          {/* mode chips */}
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {modes.map(m => (
              <button key={m.key} className="mode-chip" onClick={() => pickMode(m)} style={{
                padding:"6px 12px", borderRadius:24, fontSize:11, fontWeight:600,
                background: mode === m.key ? `${m.color}22` : "rgba(255,255,255,0.03)",
                color: mode === m.key ? m.color : "rgba(255,255,255,0.55)",
                border: `1px solid ${mode === m.key ? m.color + "55" : "rgba(255,255,255,0.06)"}`,
                boxShadow: mode === m.key ? `0 0 14px ${m.color}33` : "none",
                display:"flex", alignItems:"center", gap:5
              }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:m.color, boxShadow: mode === m.key ? `0 0 5px ${m.color}` : "none" }} />
                {m.label}
              </button>
            ))}
          </div>
          <div style={{ height:20, width:1, background:"rgba(255,255,255,0.08)" }} />
          {/* circle actions */}
          <div style={{ display:"flex", gap:6 }}>
            {[
              { i:"◐", t:"mute" },
              { i:"↻", t:"refresh" },
              { i:"⚙", t:"settings" },
            ].map(b => (
              <button key={b.t} title={b.t} style={{ width:32, height:32, borderRadius:"50%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.55)", fontSize:13, display:"flex", alignItems:"center", justifyContent:"center" }}>{b.i}</button>
            ))}
          </div>
          <div style={{ height:20, width:1, background:"rgba(255,255,255,0.08)" }} />
          {/* mic */}
          <div style={{ position:"relative", width:44, height:44 }}>
            {listening && (
              <div style={{ position:"absolute", top:"50%", left:"50%", width:44, height:44, borderRadius:"50%", border:`2px solid ${ACCENT}`, animation:"ringPulse 1.4s cubic-bezier(0.16,1,0.3,1) infinite", pointerEvents:"none" }} />
            )}
            <button onClick={toggleMic} style={{
              width:44, height:44, borderRadius:"50%",
              background: listening ? `${ACCENT}22` : `linear-gradient(135deg, ${WARM}, ${ACCENT})`,
              border: `1.5px solid ${listening ? ACCENT : "rgba(255,255,255,0.15)"}`,
              boxShadow: listening ? `0 0 22px ${ACCENT}66` : `0 4px 18px rgba(0,0,0,0.5), 0 0 12px ${ACCENT}33`,
              display:"flex", alignItems:"center", justifyContent:"center", transition:"all .3s ease"
            }}>
              {listening ? (
                <svg width="16" height="16" viewBox="0 0 22 22" fill="none"><rect x="5" y="5" width="12" height="12" rx="2" fill={ACCENT}/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                  <rect x="8" y="2" width="6" height="11" rx="3" fill="white" opacity="0.95"/>
                  <path d="M4 11C4 15.4183 7.13401 19 11 19C14.866 19 18 15.4183 18 11" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.95"/>
                  <line x1="11" y1="19" x2="11" y2="22" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.95"/>
                  <line x1="7" y1="22" x2="15" y2="22" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.95"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
