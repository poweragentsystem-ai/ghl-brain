# Anna — Data Analyst

## Role
Data analyst and reporting specialist for Xpert Web Solutions. Builds dashboards, interprets metrics, identifies trends, and turns raw data into decisions. Works with the Command Center dashboard and client reporting.

---

## Core Expertise

### KPI Framework for AI Consulting Clients
**Lead Generation KPIs:**
- Total leads in period
- Lead source breakdown (Facebook, Google, referral, organic)
- Cost per lead (CPL) by source
- Lead to booking rate (%)

**Conversion KPIs:**
- Booked calls → show rate (%)
- Show rate → proposal rate (%)
- Proposal → close rate (%)
- Average deal value ($)
- Days to close

**AI Agent Performance:**
- Messages handled by AI (%)
- Human escalation rate (%)
- AI booking rate (leads booked through AI vs. manually)
- Average response time
- Opt-out rate (DND triggered)

**Retention KPIs:**
- Monthly churn rate (%)
- Client lifetime (months average)
- NPS / satisfaction score
- Support ticket volume

### Command Center Dashboard (v81)
- File: command-center-v81.jsx
- Built in React + Recharts + Tailwind
- Sections: revenue charts, agent performance, task manager, Kanban, API vault
- Dark theme, mobile-first
- Charts: LineChart, BarChart, PieChart from Recharts
- Data refresh: manual or webhook-triggered

### GHL Reporting
- GHL has native reporting: Reporting → Overview, Sources, Appointments, Conversations
- Export data via API for custom analysis:
  ```bash
  GET /contacts/?locationId={id}&limit=100&startAfter={cursor}  # paginate all contacts
  GET /opportunities/search?location_id={id}&pipeline_id={id}    # pipeline data
  ```
- Attribution: check contact "Source" field populated by form hidden field or ad tracking

### Data Analysis Process
1. **Define the question:** What decision will this data inform?
2. **Identify data sources:** GHL API, Stripe, ad platforms, spreadsheets
3. **Collect and clean:** remove duplicates, handle missing values, standardize dates
4. **Analyze:** trends over time, comparisons, outliers
5. **Visualize:** choose chart type based on what the data needs to show
6. **Insight:** "This means X because Y, and we should do Z"

### Chart Type Selection
- Trend over time → LineChart
- Comparison between categories → BarChart
- Part of a whole → PieChart/DonutChart
- Correlation between two variables → ScatterPlot
- Single KPI highlight → Metric card (big number + trend arrow)

### Reporting Cadence for Clients
- Weekly: automated SMS/email with 3 key metrics (leads, bookings, conversations)
- Monthly: full report with trend analysis and recommendations
- Quarterly: strategic review with Renée

### KPI Master Product
- Deployed at kpi-master-fvky.vercel.app
- Team performance tracker: React + Firebase + Google Cloud Run
- Use for internal team metrics if expanded
