# CLAUDE PRODUCT MAP — Xpert Web Solutions
### Last updated: April 12, 2026
### Review and update this file monthly. Claude is shipping fast.

---

## THE FULL CLAUDE PRODUCT SUITE (as of April 2026)

---

### 1. CLAUDE.AI — Browser / Console
**What it is:** Web-based Claude. Chat interface at claude.ai.
**What it can do:**
- Full conversation with Claude models
- Projects: upload docs, set system context, 200K token context window per project
- MCP tools configured = can execute actions in external platforms (GHL, etc.)
- Computer Use (Pro + Max plans): Claude can open apps, navigate browser, fill forms on your actual machine
- Persistent memory across sessions (rolled out to all users March 2026)
- Skills: deploy, discover, and manage integrations

**Renée uses this for:** GHL build work (Console + MCP clicking inside GHL)

---

### 2. CLAUDE CODE — CLI Tool (this tool)
**What it is:** Terminal-based Claude. Runs in your shell. Understands your file system.
**What it can do:**
- Read, write, and edit files directly
- Run bash commands and API calls
- Manage git, run builds, deploy to Vercel
- MCP integrations (Playwright, Google Calendar, etc.)
- Auto Memory: persistent project knowledge (the vault system we use)
- Remote Control (Feb 2026): monitor and control a Claude Code session from a browser or phone
- Scheduled Tasks (Feb 2026): set up recurring automated workflows
- Parallel Agents (Feb 2026): spin up multiple Claude Code instances working simultaneously on different parts of a build
- Skills system: specialized skill files (gill.md, norm.md, etc.)

**Renée uses this for:** Vault, memory, file management, code builds, React/Vercel, API scripts

**NEW — worth exploring for Renée:**
- **Remote Control**: Renée can check in on a Claude Code build from her phone while it's running
- **Scheduled Tasks**: set Claude Code to run recurring tasks (session summaries, daily briefings, etc.) automatically
- **Parallel Agents**: run ABC Company build AND Command Center fixes simultaneously

---

### 3. CLAUDE MANAGED AGENTS — Cloud Infrastructure (NEW — April 8, 2026)
**What it is:** Anthropic hosts and runs your AI agents in the cloud. No local machine needed.
**What it can do:**
- Long-running autonomous agent sessions (hours at a time)
- Secure sandboxed code execution
- Session persistence through disconnections
- Tool orchestration + multi-agent coordination
- Built-in prompt caching + performance optimization
- Runs when your computer is OFF

**Pricing:** $0.08/agent runtime hour + standard Claude model costs

**Renée currently uses MyClaw/OpenClaw for always-on agents.** Managed Agents is a direct alternative or complement. Compare costs when first client onboards.

**Why this matters for Renée:**
- Could replace MyClaw for always-on client agents
- Clients' AI agents could run on Managed Agents infrastructure instead of needing a separate server
- This is the infrastructure that makes the SaaS product viable at scale

---

### 4. CLAUDE COWORK — Desktop App (GA April 2026)
**What it is:** Claude as a collaborative work partner in a desktop app (macOS + Windows).
**What it can do:**
- Computer Use: Claude opens apps, browses web, fills forms on your screen
- Works as a live work partner alongside you
- Enterprise: role-based access, group spend limits, usage analytics, SCIM provisioning
- Zoom connector: meeting summaries + action items
- OpenTelemetry support for audit trails

**Available on:** macOS and Windows, all paid plans

**Why this matters for Renée:**
- Computer Use means Claude can navigate GHL without MCP setup — just by seeing the screen
- Could be faster for one-off tasks than setting up MCP
- If she brings Aaron or staff in, enterprise controls become relevant

---

### 5. CLAUDE API — Developer Access
**What it is:** Direct API access to Claude models.
**Models (April 2026):**
- Claude Opus 4.6: 1M token context window, 14.5-hour task completion window — most powerful
- Claude Sonnet 4.6: balanced speed + power (what Claude Code uses)
- Claude Haiku 4.5: fast, cheap, lightweight tasks

**Renée uses this for:** AI agent brains (Claude API key in .env.local + Vercel)

---

## WHAT RENÉE SHOULD EXPLORE NEXT

| Feature | Product | Why it matters | Priority |
|---------|---------|----------------|----------|
| Managed Agents | Claude API | Could replace MyClaw — always-on client agents on Anthropic infrastructure | HIGH — evaluate when first client onboards |
| Parallel Agents | Claude Code | Run multiple builds simultaneously — ABC + Command Center at same time | MEDIUM — use when builds overlap |
| Scheduled Tasks | Claude Code | Automate daily briefing, session summaries, recurring GHL checks | MEDIUM |
| Remote Control | Claude Code | Monitor builds from phone during her 10:30–3pm window | LOW — nice to have |
| Computer Use | Cowork / Console | GHL work without MCP setup — Claude sees and clicks the screen | MEDIUM — test vs current MCP approach |

---

## DEFERRED DECISIONS TRIGGERED BY THIS RESEARCH

- [ ] Compare Managed Agents ($0.08/hr) vs MyClaw pricing when first client onboards — decide which infrastructure to use for client agents
- [ ] Test Computer Use (Cowork) vs MCP Console for GHL work — see which is faster/more reliable

---

*Sources: Anthropic docs, release notes, and product pages — April 2026*
