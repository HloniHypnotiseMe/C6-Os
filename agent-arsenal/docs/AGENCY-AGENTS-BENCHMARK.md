# Agency Agents Benchmark

## Purpose

Benchmark the C6 Agent Arsenal against `msitarzewski/agency-agents` without copying the upstream project wholesale.

The benchmark is a capability-gap exercise:

1. discover reusable specialist capabilities;
2. identify overlap with C6 agents and skills;
3. identify missing capabilities;
4. preserve C6 governance, evidence, routing and reuse rules;
5. reuse upstream concepts where the MIT license permits and where they improve C6;
6. avoid duplicating an existing C6 capability.

## Verified upstream baseline

Repository: `msitarzewski/agency-agents`
Branch inspected: `main`

The upstream repository currently exposes:

- 18 agent divisions in `divisions.json`;
- agent definitions organised by division;
- `tools.json` describing multi-tool rendering/install contracts;
- conversion/install support for multiple agent runtimes;
- an explicit agent contract centred on specialisation, deliverables and success metrics.

The 18 divisions currently listed are:

- academic
- design
- engineering
- finance
- game-development
- gis
- healthcare
- marketing
- paid-media
- product
- project-management
- research
- sales
- security
- spatial-computing
- specialized
- support
- testing

## C6 baseline

C6-Os already has a stronger system-level foundation than a simple agent catalogue:

- `registry/agents.yaml` — known C6 agent families and sources;
- `registry/capabilities.yaml` — capability-to-provider resolution;
- `registry/providers.yaml` — provider metadata;
- `registry/resources.yaml` — wider arsenal classification;
- `registry/runtimes.yaml` — runtime constraints;
- `registry/tools.yaml` — reusable tools/infrastructure;
- `manifests/catalog.yaml` — high-level machine-resolution catalogue;
- `router/` — capability/agent suggestion logic;
- `skills/` — reusable skill layer;
- `workflows/` — workflow layer;
- evidence contracts and decision-pattern registries;
- adapters and MCP-server integration;
- tests around the resolver/router.

The C6 Arsenal explicitly treats itself as a catalogue rather than a code warehouse and requires agents to resolve existing capabilities before implementing new ones.

## Architectural conclusion

Agency Agents and C6 should not be treated as competing lists.

Use this model:

```
C6 START HERE
    |
    +--> GOVERNANCE / SOP
    |
    +--> CAPABILITY RESOLUTION
    |       |
    |       +--> SKILL
    |       +--> PROVIDER / REPO
    |       +--> EXISTING AGENT
    |
    +--> SPECIALIST AGENT
    |
    +--> TEAM / WORKFLOW
    |
    +--> EXECUTION
    |
    +--> VERIFICATION / EVIDENCE
    |
    +--> WIN / LEARNING
```

### Skill

A reusable capability or procedure.

Examples:

- repository-forensics
- API-contract-testing
- Docker deployment
- DNS verification
- payment-webhook verification
- email-deliverability
- database migration
- SEO audit

### Agent

A specialist execution identity that combines one or more skills, follows a defined workflow, produces deliverables, and has measurable success criteria.

### Provider

The repository, service, library, integration, or existing implementation that supplies a capability.

### Workflow

The ordered execution path that combines agents and skills.

### Evidence

The proof required before C6 marks the work complete.

## Benchmark dimensions

Every Agency Agents capability should be classified as one of:

- REUSE — existing C6 capability is sufficient.
- ADAPT — useful upstream pattern should be wrapped/adapted.
- NEW — C6 genuinely lacks the capability.
- DUPLICATE — apparent capability already exists under another C6 family/name.
- OUT-OF-SCOPE — not relevant to C6's current operating domain.
- RESEARCH — needs deeper inspection before classification.

Each candidate is evaluated against:

1. mission clarity
2. trigger/use case
3. skills required
4. workflow quality
5. deliverables
6. success metrics
7. permissions
8. evidence requirements
9. provider/repo dependencies
10. routing metadata
11. runtime compatibility
12. C6 product/domain relevance
13. duplication risk
14. maintenance burden

## C6 additions required from this benchmark

The benchmark should not result in blindly importing all upstream agents.

The expected C6 upgrade is:

- a canonical specialist-agent schema;
- skill-to-agent relationships;
- agent-to-workflow relationships;
- capability aliases;
- routing/selection metadata;
- permissions and risk metadata;
- evidence contracts;
- provider provenance;
- agent lifecycle/versioning;
- performance/verification history;
- C6-specific specialists;
- cross-agent handoff contracts.

## Priority specialist families

The first implementation wave should cover capabilities repeatedly needed across C6 work:

### Engineering
- repository forensics
- software architecture
- backend engineering
- frontend engineering
- API engineering
- database engineering
- DevOps/deployment
- infrastructure/self-hosting
- integration engineering
- developer tooling

### Quality
- QA
- test automation
- E2E testing
- regression testing
- release verification
- production verification
- evidence auditing

### Security
- application security
- dependency/security auditing
- secrets auditing
- identity/access
- infrastructure security
- threat modelling

### Product/design
- product architecture
- UX research
- UX architecture
- UI design
- design-system governance
- conversion/experience auditing

### Growth/sales
- market research
- SEO/AEO/GEO
- content
- growth experiments
- lead research
- outreach
- sales qualification
- proposals
- pipeline analysis

### C6-native
- C6 Arsenal Librarian
- C6 Repository Forensics
- C6 Stack Reuse
- C6 Deployment Gatekeeper
- C6 Evidence Auditor
- C6 Win Ledger
- C6 Product Lifecycle
- C6 Customer-1 Acceptance
- Revenue Hunter
- RemotePay Specialist
- C6 Mail Infrastructure
- C6 Hosting/Domains
- Commodity Connect Specialist
- DieselConnect Specialist

These are capability families, not a commitment to create one agent per line item. A capability may be implemented as a skill, an agent, or a workflow depending on reuse and routing needs.

## Rule

Before creating a new C6 specialist:

```
START HERE
  -> search C6 Arsenal
  -> resolve capability
  -> inspect provider
  -> inspect existing agent/skill
  -> benchmark upstream Agency Agents
  -> reuse/adapt if sufficient
  -> create only the missing layer
  -> test
  -> verify
  -> register
```

This is the anti-reinvention gate.
