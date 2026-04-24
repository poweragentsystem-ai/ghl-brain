# TECH STACK — Xpert Web Solutions Inc.
**Status: STUB — Renée to add API keys, account URLs, and login details**

---

## PLATFORMS

| Platform | Purpose | URL / Account | Notes |
|----------|---------|---------------|-------|
| GHL (GoHighLevel) | CRM, AI Studio, sub-accounts | poweragentsystem.ca | If GHL can do it natively, use GHL — no n8n |
| n8n | Cross-platform automations | poweragentsystem.app.n8n.cloud | Only when GHL can't handle alone |
| Claude API (Anthropic) | AI brain for all agents | platform.claude.com | Key in .env.local |
| MyClaw / OpenClaw | Always-on hosted agents | — | Agents that must run when computer is off |
| ElevenLabs | Voice AI engine | elevenlabs.io — account ACTIVE | API key: sk_cb344c804b615ed7104a232bb8cb276eeb2e0e7800223427 — Pay per use. Plan upgrade when first client onboards. GHL native voice is default in snapshot for now. |
| Stripe | Payments | — | sk_live in vault |
| Vercel | Frontend deployments | vercel.com → power-agent-systems-projects | xpert-command-center.vercel.app live |
| Google Cloud Run | KPI Master backend | — | — |
| Firebase | KPI Master data | — | — |
| GitHub | Code repos | poweragentsystem-ai org | Connected to Vercel |

---

## FRONTEND STACK

| Tool | Version | Used for |
|------|---------|---------|
| React | 18 | All dashboards and UIs |
| Vite | 6 | Build tool |
| Lucide React | latest | Icons |
| Framer Motion | latest | Animations |
| Tailwind CSS | — | Utility styling |
| Recharts | — | Charts / KPI displays |

---

## CLAUDE TOOL CAPABILITIES — KNOW THE DIFFERENCE

| Tool | What it can do | Best used for |
|------|---------------|---------------|
| **Claude Console (claude.ai)** | Executes via MCP — clicks inside GHL UI, builds workflows, fills forms, interacts with browser directly. Also makes API calls via MCP tools. | GHL UI work: building agents, publishing workflows, form building, anything that needs browser interaction |
| **Claude Code (CLI)** | Executes code, runs API calls via Bash, reads/writes files, manages the vault, runs scripts. | File work, vault updates, code builds, React/Vercel, bulk API operations, anything requiring file system access |

**MCP is set up on Console** — it is actively executing inside GHL while Claude Code manages files and memory.
These two tools work together, they are not interchangeable.

---

## KEY ACCOUNTS (fill in)

- **GHL Agency API key:** pit-6ec8... (full key in vault)
- **Anthropic API key:** sk-ant-api03... (in .env.local and Vercel env)
- **ElevenLabs:** not set — add when first client onboards
- **Stripe:** sk_live... (in vault)
- **Google Cal MCP:** gcal.mcp.claude.com connected

---

*[STUB — add full credentials and account details here. Keep this file in the vault, not in GitHub.]*
