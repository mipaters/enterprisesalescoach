# Enterprise Sales Coach

**Read the deal. Find the gap. Coach the next move.**

Enterprise Sales Coach (internal demo name: Deal Dynamics Coach) is a polished, interactive concept demonstration for complex enterprise sales pursuits. It assembles synthetic opportunity evidence, diagnoses deal health, maps the buying group, recommends an explainable next move, prepares the seller, converts coaching into accountable action, and measures simulated progression.

> This repository uses synthetic data only. It has no live CRM, Microsoft 365, email, meeting, customer, or employee integrations.

## Business problem

Complex opportunities often stall because technical activity is mistaken for buying progress. Relevant evidence is fragmented across opportunity records, conversations, stakeholder relationships, commitments, commercial work, and seller assumptions. The application helps sellers and managers answer:

- Why is this deal stalled?
- Which evidence is missing or conflicting?
- Who in the buying group is not engaged?
- What single next move will most reduce uncertainty?
- What customer-owned commitment should come next?
- How should the team prepare and coordinate?

The experience uses opportunity-level and aggregated team information only. It does not rank or score employees.

## Target users

- Enterprise sellers and pursuit leaders
- Frontline sales managers and sales leadership
- Solution architects, industry advisors, commercial teams, executive sponsors, and customer success teams
- Revenue operations, sales operations, and responsible AI governance teams

## Five agent roles

1. **Sales Coach Supervisor Agent** — orchestrates specialist analysis, applies authority rules, and produces the final recommendation.
2. **Deal Health Agent** — evaluates eight transparent dimensions and separates evidence from inference.
3. **Stakeholder Mapping Agent** — finds buying-group coverage gaps, champions, and potential blockers.
4. **Coaching Agent** — recommends one best next move and defines the desired customer commitment.
5. **Meeting Prep Agent** — creates an executive narrative, questions, objections, talk tracks, and meeting ask.

All agents are simulated. They recommend and prepare; authorized sellers and managers decide.

## Primary scenario

The central scenario is the fictional **Northstar Telecom Transformation**, a simulated $28.5M opportunity for Northstar Communications. Technical engagement is strong, but executive sponsorship is weak, the economic buyer is not engaged, procurement has not started, the value case is only partial, and the decision process is unconfirmed.

The recommendation is to secure an executive value-alignment meeting with the COO before investing in additional technical validation.

## Application sections

- Executive Sales Dashboard
- Opportunity Portfolio with 15 stable synthetic opportunities
- Deal Command Centre and animated five-agent analysis
- Transparent Deal Health framework
- Interactive Stakeholder Map
- Manager and seller Coaching Workspace
- Editable Meeting Preparation brief
- Cross-functional Action Plan
- Aggregated Sales Outcomes
- Interactive Value and ROI scenarios
- Proposed Microsoft Architecture
- Governance, controls, and audit record

## Executive Demo Walkthrough

Select **Executive Demo** in the persistent header. The full-screen experience supports:

- Tile overview and direct access to any step
- Previous and Next navigation
- Auto Play and Pause
- Restart
- Return to Tiles
- Exit Walkthrough
- Automatic focus of the application route related to each step

For the primary journey, start at the Deal Command Centre, run the five-agent analysis, inspect Deal Health and Stakeholder Map, accept or modify the coaching recommendation, edit the meeting brief, complete actions, update simulated progress, and inspect the audit record.

## Local installation

Requirements: Node.js 20 or later and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

Create a production build:

```bash
npm run build
```

Preview that build:

```bash
npm run preview
```

No API keys, secrets, backend, authentication provider, or paid third-party service is required.

## Repository structure

```text
.
├── src/
│   ├── App.tsx        # Routes, reusable UI, pages, and synchronized interactions
│   ├── data.ts        # Stable synthetic opportunity, agent, stakeholder, and governance data
│   ├── index.css      # Tailwind layers and application styles
│   ├── main.tsx       # React entry point
│   └── types.ts       # Strongly typed domain model
├── staticwebapp.config.json
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## Azure Static Web Apps deployment

1. Push the repository to GitHub.
2. In Azure, create a Static Web App and connect the GitHub repository and deployment branch.
3. Select the React/Vite build preset or configure:
   - App location: `/`
   - API location: leave empty
   - Output location: `dist`
   - Build command: `npm run build`
4. Save the generated GitHub Actions workflow.
5. The included `staticwebapp.config.json` rewrites direct route navigation to `index.html` and adds baseline response headers.

The production application remains a static client application until explicitly integrated with authorized enterprise services.

## Proposed architecture summary

The architecture page presents a conceptual Microsoft foundation:

- **Experience:** Microsoft 365 Copilot, Teams, Outlook, Dynamics 365 Sales, seller workspace, and Power BI
- **Orchestration:** Microsoft Foundry, Azure OpenAI, supervisor and specialist agents, evaluation, observability, and human approval
- **Intelligence:** Azure Machine Learning, health and risk models, evidence extraction, recommendation ranking, and model monitoring
- **Data:** Microsoft Fabric, OneLake, Data Factory, Real-Time Intelligence, semantic models, and Azure AI Search
- **Integration:** Azure API Management, Functions, Logic Apps, Event Hubs, Microsoft Graph where approved, and secure CRM APIs
- **Governance:** Microsoft Entra ID, managed identities, RBAC, Microsoft Purview, Key Vault, Defender for Cloud, Azure Monitor, audit, retention, and data-residency controls

These integrations are proposed only and do not currently exist.

## Governance principles

- Agents recommend; sellers and managers decide.
- No autonomous CRM changes or customer communications.
- Every recommendation includes evidence, confidence, and missing information.
- Inference is not presented as customer fact.
- Low-confidence and material actions require human review.
- Sellers can accept, modify, defer, or reject recommendations.
- Actions and overrides are auditable.
- Opportunity scores are not used to evaluate employee performance.
- Employee ranking and public leaderboards are prohibited.
- Protected characteristics must not influence recommendations.
- Financial projections and forecasts remain visibly illustrative.

## Synthetic-data disclaimer

Concept demonstration using synthetic account, opportunity, stakeholder, activity, conversation, product, competitor, financial, and CRM data. Deal scores, recommendations, forecasts, financial values, stakeholder assessments, and business outcomes are illustrative and do not represent actual customers, sellers, opportunities, systems, or commitments.

## Production integration requirements

A production implementation would require enterprise authorization, identity and access design, source-system contracts, data classification, customer-data handling controls, retention and residency policies, grounding and evaluation design, model-risk review, observability, human-approval workflows, security testing, accessibility validation, operational support, and measurable outcome governance.

## Recommended next steps

1. Validate the opportunity-health dimensions and coaching playbook with sellers, managers, and governance stakeholders.
2. Define a minimum authorized evidence set and explicit source-system boundaries.
3. Pilot read-only diagnosis and meeting preparation before any write-back capability.
4. Establish offline agent and recommendation evaluation.
5. Measure customer commitments, stage progression, sales velocity, forecast confidence, and seller-administration impact using an approved experimental design.
