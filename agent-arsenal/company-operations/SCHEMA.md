# C6 Company Operating Model

## Purpose

A Company Operating Model (COM) is the machine-readable blueprint for a product that is intended to operate like a company.

It maps:

PRODUCT -> COMPANY -> BUSINESS FUNCTION -> CAPABILITY -> SKILL / AGENT / WORKFLOW / TEAM -> PROVIDER / SYSTEM -> EVIDENCE -> WIN

## Required top-level contract

Every model MUST contain:

- `schema_version`
- `company.id`
- `company.product`
- `company.outcome`
- `functions[]`
- `exceptions[]`
- `wins[]`

Each function MUST define:

- `id`
- `name`
- `mission`
- `triggers`
- `inputs`
- `outputs`
- `owner`
- `execution`
- `systems`
- `workflow`
- `evidence`
- `success`

Execution MUST identify the smallest sufficient C6 layer:

`human | skill | agent | workflow | team | provider`

Material actions MUST declare:

- permissions;
- approval boundary;
- evidence contract.

Exceptions MUST declare a condition, handoff and owner.

Wins MUST declare a metric and evidence.

## Design rules

1. Existing C6 capabilities are resolved before a new agent is created.
2. Upstream repositories are benchmarked and only necessary behaviour is adapted.
3. Agents are workers with jobs, not decorative product features.
4. Financial, legal, security, safety and other configured high-risk actions retain human approval boundaries.
5. A model describes intended operating structure; it does not prove runtime execution.
6. Runtime claims require the C6 evidence ladder: EXISTS -> WORKS -> VERIFIED -> LIVE.

## Admission gate

A model is admitted only when:

CAPABILITY RESOLVED
+ FUNCTIONS MAPPED
+ EXECUTION LAYERS DECLARED
+ PERMISSIONS DECLARED
+ EVIDENCE CONTRACTS DECLARED
+ EXCEPTIONS DECLARED
+ WINS DECLARED
+ VALIDATION PASSED
+ REGISTERED
