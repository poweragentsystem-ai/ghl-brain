// SamplePage.jsx — public marketing demo of a deployed Assistlet system.
// Jarvis-style voice orb: tap-to-talk with idle/listening/thinking states,
// animated starfield + nebula backdrop, live activity panel, floating KPI cards.
// Standalone — no API wiring; mic toggle is fully simulated for the demo.

import { useState, useEffect, useRef, useCallback } from "react";

const ACCENT = "#2DD4A8";
const BG = "#0A0B0F";

const activityData = {
  "RECENT CALLS": [
    { text: "Lead inquiry — Booking confirmed", time: "3m ago", dot: "#2DD4A8" },
    { text: "Follow-up — Appointment set", time: "18m ago", dot: "#2DD4A8" },
    { text: "Support call — Resolved", time: "1h ago", dot: "#6366F1" },
  ],
  "ACTIVE TASKS": [
    { text: "Send onboarding sequence", time: "Pending", dot: "#F59E0B" },
    { text: "Follow up with 3 leads", time: "Due today", dot: "#F59E0B" },
  ],
  "DRAFTS": [
    { text: "New client welcome message", time: "Draft", dot: "#4B5563" },
  ],
};

const floatingCards = [
  { title: "Calls Today", value: "14", sub: "↑ 3 from yesterday", color: "#2DD4A8", delay: "0s" },
  { title: "Bookings", value: "6", sub: "2 pending confirmation", color: "#818CF8", delay: "1.8s" },
];

export default function AssistletAI() {
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState("idle");
  const [panelOpen, setPanelOpen] = useState(true);
  const [greeting, setGreeting] = useState("");
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 220 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.1 + 0.15,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.4 + 0.15,
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.012;
      stars.forEach((s) => {
        const a = 0.25 + 0.65 * Math.abs(Math.sin(s.phase + t * s.speed));
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

  const toggleMic = useCallback(() => {
    clearTimeout(timerRef.current);
    if (!listening) {
      setListening(true);
      setStatus("listening");
      timerRef.current = setTimeout(() => setStatus("processing"), 3200);
      timerRef.current = setTimeout(() => { setListening(false); setStatus("idle"); }, 5500);
    } else {
      setListening(false);
      setStatus("idle");
    }
  }, [listening]);

  const statusColor = { idle: "#374151", listening: "#2DD4A8", processing: "#818CF8" }[status];
  const statusLabel = { idle: "STANDBY", listening: "LISTENING", processing: "THINKING" }[status];

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", background: BG, overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nebula { position: absolute; border-radius: 50%; pointer-events: none; animation: nebDrift ease-in-out infinite; }
        @keyframes nebDrift { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(25px,-18px) scale(1.04)} 66%{transform:translate(-15px,22px) scale(0.96)} }
        @keyframes orbIdle {
          0%,100%{box-shadow:0 0 50px 15px rgba(45,212,168,0.07),0 0 110px 35px rgba(45,212,168,0.05),0 0 180px 70px rgba(45,212,168,0.03),inset 0 0 35px rgba(45,212,168,0.12)}
          50%{box-shadow:0 0 70px 25px rgba(45,212,168,0.14),0 0 150px 55px rgba(45,212,168,0.09),0 0 240px 90px rgba(45,212,168,0.05),inset 0 0 55px rgba(45,212,168,0.22)}
        }
        @keyframes orbListen {
          0%,100%{box-shadow:0 0 90px 35px rgba(45,212,168,0.25),0 0 180px 70px rgba(45,212,168,0.15),0 0 300px 120px rgba(45,212,168,0.08),inset 0 0 70px rgba(45,212,168,0.38);transform:scale(1.02)}
          50%{box-shadow:0 0 130px 55px rgba(45,212,168,0.36),0 0 250px 100px rgba(45,212,168,0.22),0 0 400px 160px rgba(45,212,168,0.11),inset 0 0 95px rgba(45,212,168,0.52);transform:scale(1.07)}
        }
        @keyframes orbProcess {
          0%,100%{box-shadow:0 0 90px 35px rgba(129,140,248,0.25),0 0 180px 70px rgba(129,140,248,0.15),0 0 300px 120px rgba(129,140,248,0.08),inset 0 0 70px rgba(129,140,248,0.32)}
          50%{box-shadow:0 0 130px 55px rgba(129,140,248,0.34),0 0 250px 100px rgba(129,140,248,0.22),0 0 400px 160px rgba(129,140,248,0.11),inset 0 0 95px rgba(129,140,248,0.48)}
        }
        @keyframes ringPulse { 0%{transform:translate(-50%,-50%) scale(1);opacity:.7} 100%{transform:translate(-50%,-50%) scale(2.5);opacity:0} }
        @keyframes dotBlink { 0%,100%{opacity:1} 50%{opacity:0.25} }
        @keyframes cardFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes slideRight { from{transform:translateX(16px);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes fadeUp { from{transform:translateY(14px);opacity:0} to{transform:translateY(0);opacity:1} }
        .orb{animation:orbIdle 4s ease-in-out infinite;cursor:pointer;transition:background 0.6s ease}
        .orb.listening{animation:orbListen 1.4s ease-in-out infinite}
        .orb.processing{animation:orbProcess 1s ease-in-out infinite}
        .act-item{animation:slideRight 0.3s cubic-bezier(0.16,1,0.3,1) both}
        .float-card{animation:cardFloat 4s ease-in-out infinite}
        .fade-up{animation:fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both}
        button{cursor:pointer;border:none;outline:none}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:rgba(45,212,168,0.25);border-radius:2px}
      `}</style>

      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />

      {[
        { w:520, h:520, bg:"radial-gradient(circle,#2DD4A8,transparent)", top:"5%", left:"12%", dur:"24s", op:0.09 },
        { w:420, h:420, bg:"radial-gradient(circle,#6366F1,transparent)", top:"35%", right:"8%", dur:"31s", op:0.08 },
        { w:360, h:360, bg:"radial-gradient(circle,#3B82F6,transparent)", bottom:"15%", left:"20%", dur:"27s", op:0.07 },
      ].map((n, i) => (
        <div key={i} className="nebula" style={{ width:n.w, height:n.h, background:n.bg, top:n.top, left:n.left, right:n.right, bottom:n.bottom, filter:"blur(72px)", opacity:n.op, animationDuration:n.dur }} />
      ))}

      {/* HEADER */}
      <div style={{ position:"fixed", top:0, left:0, right:0, height:56, zIndex:60, background:"rgba(10,11,15,0.7)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", borderBottom:"1px solid rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:17, color:"#fff", letterSpacing:"0.1em" }}>ASSISTLET</span>
          <div style={{ width:5, height:5, borderRadius:"50%", background:"#2DD4A8", boxShadow:"0 0 8px #2DD4A8" }} />
          <span style={{ fontSize:10, color:"rgba(255,255,255,0.35)", fontWeight:600, letterSpacing:"0.2em" }}>AI</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          {["⊹","◎"].map((icon, i) => (
            <button key={i} style={{ width:32, height:32, borderRadius:8, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.45)", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center" }}>{icon}</button>
          ))}
          <button onClick={() => setPanelOpen(p=>!p)} style={{ width:32, height:32, borderRadius:8, background:panelOpen?"rgba(45,212,168,0.08)":"rgba(255,255,255,0.04)", border:`1px solid ${panelOpen?"rgba(45,212,168,0.2)":"rgba(255,255,255,0.07)"}`, color:panelOpen?"#2DD4A8":"rgba(255,255,255,0.45)", fontSize:13, display:"flex", alignItems:"center", justifyContent:"center" }}>☰</button>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginLeft:6, padding:"4px 10px", borderRadius:20, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:statusColor, boxShadow:status!=="idle"?`0 0 7px ${statusColor}`:"none", animation:status!=="idle"?"dotBlink 1s ease-in-out infinite":"none" }} />
            <span style={{ fontSize:9, color:"rgba(255,255,255,0.4)", fontWeight:600, letterSpacing:"0.15em" }}>{statusLabel}</span>
          </div>
        </div>
      </div>

      {/* FLOATING CARDS */}
      {floatingCards.map((card, i) => (
        <div key={i} className="float-card fade-up" style={{ position:"absolute", top:`${42+i*18}%`, left:`${6+i*2}%`, width:200, background:"rgba(18,20,28,0.82)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", borderRadius:14, border:"1px solid rgba(255,255,255,0.06)", borderTop:`2px solid ${card.color}`, padding:"14px 16px", zIndex:25, animationDelay:card.delay }}>
          <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:7, fontWeight:600 }}>{card.title}</div>
          <div style={{ fontSize:30, fontWeight:700, color:"#fff", lineHeight:1, fontFamily:"'Syne',sans-serif" }}>{card.value}</div>
          <div style={{ fontSize:11, color:card.color, marginTop:5, fontWeight:500 }}>{card.sub}</div>
        </div>
      ))}

      {/* CENTER ORB */}
      <div style={{ position:"absolute", top:"50%", left:panelOpen?"calc(50% - 120px)":"50%", transform:"translate(-50%,-50%)", zIndex:20, display:"flex", flexDirection:"column", alignItems:"center", gap:22, transition:"left 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
        <div className="fade-up" style={{ textAlign:"center", animationDelay:"0.2s" }}>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:600 }}>{greeting}</div>
          <div style={{ fontSize:22, color:"#fff", fontWeight:300, marginTop:5 }}>How can I help you today?</div>
        </div>

        <div style={{ position:"relative", width:180, height:180 }}>
          {listening && [0,0.45,0.9].map((d, i) => (
            <div key={i} style={{ position:"absolute", top:"50%", left:"50%", width:180, height:180, borderRadius:"50%", border:`1px solid rgba(45,212,168,${0.55-i*0.15})`, animation:`ringPulse 1.8s cubic-bezier(0.16,1,0.3,1) ${d}s infinite`, pointerEvents:"none" }} />
          ))}
          <div
            className={`orb${listening?" listening":""}${status==="processing"?" processing":""}`}
            onClick={toggleMic}
            style={{ width:180, height:180, borderRadius:"50%", background:status==="processing"?"radial-gradient(circle at 38% 34%, rgba(180,185,255,0.95) 0%, #818CF8 22%, rgba(60,70,200,0.88) 58%, rgba(18,18,60,0.95) 100%)":"radial-gradient(circle at 38% 34%, rgba(100,255,220,0.95) 0%, #2DD4A8 22%, rgba(20,150,110,0.88) 58%, rgba(8,48,40,0.95) 100%)" }}
          />
        </div>

        <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.22em", color:listening?"#2DD4A8":"rgba(255,255,255,0.22)", textTransform:"uppercase", transition:"color 0.3s", textAlign:"center" }}>
          {status==="idle"?`TAP ORB · SAY "HEY ASSISTLET"`:status==="listening"?"LISTENING — TAP TO STOP":"PROCESSING YOUR REQUEST..."}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={{ position:"fixed", top:56, right:0, bottom:0, width:panelOpen?258:0, background:"rgba(10,11,15,0.78)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", borderLeft:panelOpen?"1px solid rgba(255,255,255,0.05)":"none", zIndex:50, overflow:"hidden", transition:"width 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ padding:"18px 14px", height:"100%", overflowY:"auto" }}>
          {Object.entries(activityData).map(([section, items], si) => (
            <div key={section} style={{ marginBottom:22 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:9 }}>
                <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", color:"rgba(255,255,255,0.28)", textTransform:"uppercase" }}>{section}</span>
                <span style={{ fontSize:10, fontWeight:700, color:"#2DD4A8" }}>{items.length}</span>
              </div>
              {items.map((item, i) => (
                <div key={i} className="act-item" style={{ padding:"9px 11px", borderRadius:10, marginBottom:5, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)", display:"flex", alignItems:"flex-start", gap:9, animationDelay:`${(si*3+i)*0.06}s`, cursor:"pointer" }}>
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

      {/* BOTTOM MIC BAR */}
      <div style={{ position:"fixed", bottom:0, left:0, right:panelOpen?258:0, height:110, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10, zIndex:40, pointerEvents:"none", transition:"right 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
        {listening && (
          <div style={{ position:"absolute", bottom:30, left:"50%", width:64, height:64, borderRadius:"50%", border:"2px solid #2DD4A8", animation:"ringPulse 1.4s cubic-bezier(0.16,1,0.3,1) infinite", pointerEvents:"none" }} />
        )}
        <button onClick={toggleMic} style={{ pointerEvents:"all", width:64, height:64, borderRadius:"50%", background:listening?"rgba(45,212,168,0.1)":"#13151C", border:`1.5px solid ${listening?"#2DD4A8":"rgba(255,255,255,0.09)"}`, boxShadow:listening?"0 0 26px rgba(45,212,168,0.45),0 0 60px rgba(45,212,168,0.15)":"0 4px 24px rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.3s ease" }}>
          {listening ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="5" y="5" width="12" height="12" rx="2" fill="#2DD4A8"/></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="8" y="2" width="6" height="11" rx="3" fill="white" opacity="0.9"/>
              <path d="M4 11C4 15.4183 7.13401 19 11 19C14.866 19 18 15.4183 18 11" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.9"/>
              <line x1="11" y1="19" x2="11" y2="22" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.9"/>
              <line x1="7" y1="22" x2="15" y2="22" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.9"/>
            </svg>
          )}
        </button>
        <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.18em", color:"rgba(255,255,255,0.2)", textTransform:"uppercase", pointerEvents:"none" }}>
          {listening?"SAY YOUR COMMAND":`TAP OR SAY "HEY ASSISTLET"`}
        </div>
      </div>
    </div>
  );
}
