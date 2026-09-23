# Specialist Agent Schema

## Purpose

C6 specialist agents are governed execution identities, not prompt files.

An agent is admitted to the Arsenal only when its capability is justified by recurring work and its execution can be routed, permissioned, verified, and maintained.

## Canonical record

```yaml
schema_version: "1.0"

id: <stable-agent-id>
name: <human-readable-name>
status: proposed | active | deprecated | retired

mission:
  purpose: <one sentence>
  non_goals: []

triggers:
  capabilities: []
  task_patterns: []
  aliases: []

skills:
  required: []
  optional: []

workflow:
  entry: <workflow-id>
  steps: []
  handoffs: []

deliverables:
  required: []
  optional: []

success:
  criteria: []
  verification: []

permissions:
  risk: low | controlled | high | critical
  required: []
  forbidden: []

evidence:
  required: []
  contract: <evidence-contract-id>

providers:
  preferred: []
  alternatives: []

routing:
  priority: 0
  domains: []
  products: []
  exclusions: []

provenance:
  source_type: c6-native | adapted | upstream-reference
  source_repository: null
  source_path: null
  source_commit: null
  license: null

lifecycle:
  owner: <team-or-agent-id>
  version: "0.1.0"
  created: <date>
  reviewed: <date>
  review_after: <date>

performance:
  executions: 0
  verified_successes: 0
  verified_failures: 0
  last_verified: null
```

## Separation of concerns

### Skill

A reusable capability or procedure. A skill should exist independently when multiple agents or workflows need the same procedure.

### Agent

A specialist execution identity that combines skills, applies a mission and constraints, produces deliverables, and must satisfy evidence requirements.

### Workflow

The ordered execution path. Do not hide orchestration inside an agent prompt when it should be reusable by other agents.

### Provider

The implementation source for a capability. Provider provenance is mandatory for adapted or upstream-derived capabilities.

### Evidence

The proof that allows C6 to mark a result complete. A claim of completion is not evidence.

## Admission gate

1. START HERE compliance.
2. Capability resolution.
3. Existing C6 skill/agent/provider search.
4. Duplication check.
5. Upstream benchmark where relevant.
6. Permission/risk review.
7. Evidence-contract selection.
8. Routing metadata.
9. Test/verification plan.
10. Provenance and maintenance owner.

## Upstream mapping rule

Agency Agents provides useful specialist definitions, but its agent identity is not imported automatically.

Mapping:

`upstream agent → capability → C6 skill/agent/workflow → provider → evidence`

If the capability already exists, reuse it.

If only the workflow/prompt pattern is useful, adapt the pattern without creating another agent.

If C6 genuinely lacks the capability, create the smallest missing layer.

## Initial verified upstream patterns

The first inspected definitions demonstrate three patterns directly relevant to C6:

- **Codebase Archaeologist** — reference pattern for multi-session repository drift/forensics.
- **Workflow Architect** — reference pattern for explicit workflow trees, failure paths, recovery and handoff contracts.
- **Evidence Collector** — reference pattern for evidence-first QA and reality checking.

These are benchmark references. They are not copied into C6.

## Definition of done

An agent is not active merely because its definition exists.

`CAPABILITY RESOLVED + ROUTABLE + PERMISSIONED + EXECUTABLE + VERIFIED + EVIDENCE CAPTURED + REGISTERED`
