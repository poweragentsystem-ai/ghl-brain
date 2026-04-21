# ACTIVE SPRINT — Build Spec
### Current sprint goal lives here. Replace when sprint changes. Archive old specs in /archive/.

---

## SPRINT: Command Center Live + API Connection
**Started:** April 2026
**Status:** IN PROGRESS

---

## GOAL
Get the Command Center dashboard fully live on Vercel with Jordan's AI chat working end-to-end.

---

## DONE
- [x] Command Center v82 built and patched (8 bug fixes)
- [x] Deployed to Vercel: xpert-command-center.vercel.app
- [x] ANTHROPIC_API_KEY set in Vercel production environment
- [x] All 21 Managed Agents updated via API with Active Intelligence directive
- [x] Agent IDs wired into dashboard (agentId on all 23 agents)
- [x] Vault modal: stateful, add/copy/mask, localStorage persistence
- [x] Sparklines on metrics cards
- [x] Activity feed clickable → opens agent modal
- [x] View on Platform button in agent modal

---

## IN PROGRESS
- [ ] Fix scroll blank bug — page goes white when scrolling below the fold
- [ ] Wire Jordan's API chat on the live Vercel URL (needs Express API server or Vercel serverless function)

---

## NEXT
- [ ] Connect live calendar via MCP
- [ ] Test full Jordan conversation end-to-end on live URL
- [ ] Deploy Vercel serverless function for /api/jordan (replace Express proxy)
- [ ] ABC Company GHL snapshot — API method

---

## KNOWN ISSUES
- Scroll blank: grid/sticky sidebar layout causing content to be hidden below fold. Multiple approaches tried. Root cause still under investigation.
- Jordan API on Vercel: the current /api/jordan route works locally with Express but Vercel needs a serverless function in /api/jordan.js — already exists but needs the Express server removed from the equation.

---

*When this sprint is complete, move this file to /archive/ and create a new active-build-spec.md*
