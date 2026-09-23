# Agency Agents Semantic Triage — Wave 1

The first semantic pass has now moved six directly relevant upstream definitions out of the generic inventory state.

| Upstream pattern | C6 decision | C6 layer |
|---|---|---|
| Code Reviewer | ADAPT | Agent |
| Backend Architect | ADAPT | Agent |
| DevOps Automator | ADAPT | Agent |
| Codebase Archaeologist | NEW | Agent |
| Workflow Architect | NEW | Agent |
| Evidence Collector | ADAPT | Agent |

## Why this matters

The benchmark is already proving the intended model:

- some upstream capabilities are **missing C6 specialist identities**;
- some are **already represented by C6 infrastructure and should be adapted**, not rebuilt;
- none should be copied wholesale;
- skills, providers, workflows and evidence remain separate layers.

## First C6 specialist candidates

The six candidates imply these reusable capability/skill areas:

- code review
- backend architecture
- deployment automation
- repository drift forensics
- workflow architecture
- evidence-based QA

They will be admitted only after their C6 skills, routing, permissions, workflow and evidence contracts are wired.

## Source integrity

All six classifications reference the upstream `main` commit:

`053ddbbf392a1688fc7043d81529f47ef2cf86c8`

The complete 279-agent inventory remains authoritative for the unreviewed population.

Machine-readable decisions:

`agent-arsenal/benchmarks/agency-agents-triage-wave-1.yaml`
