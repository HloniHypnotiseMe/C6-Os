# C6 Agent Arsenal v0.3

The Agent Arsenal is the C6 resource-discovery and specialist-routing layer.

## START HERE

Before any C6 build, read the repository-root `START-HERE.md`. It is the canonical operating gate.

## Agent contract

Every C6 agent should follow this sequence before building or installing anything:

1. Read `START-HERE.md` and repository-local instructions.
2. Resolve the requested capability in `registry/capabilities.yaml`.
3. Inspect provider risk, permissions, runtime, local presence, and pin status.
4. Search for an existing C6 skill, specialist, workflow, or provider before creating anything.
5. Prefer the smallest sufficient existing capability.
6. If adapting an upstream specialist, preserve provenance and extract only the necessary behavior.
7. Execute with the minimum permissions required.
8. Verify the result against an explicit evidence contract.
9. Register reusable knowledge and update the Win Ledger where applicable.

## Canonical registries

- `registry/providers.yaml` — repositories and provider metadata.
- `registry/capabilities.yaml` — capability-to-provider resolution.
- `registry/agents.yaml` — known C6 agent families and agent resources.
- `registry/specialist-agents.yaml` — C6 specialist-agent contracts.
- `registry/resources.yaml` — classification of the wider local arsenal.
- `registry/runtimes.yaml` — execution environments and constraints.
- `registry/tools.yaml` — reusable tools and infrastructure services.
- `manifests/catalog.yaml` — high-level domain manifest for machine resolution.

## Skills and workflows

- `skills/` — C6-owned reusable operating procedures.
- `workflows/` — outcome-oriented execution workflows.
- `benchmarks/` — upstream capability research and semantic triage.

## Important distinction

The Arsenal is a catalogue, not a source-code warehouse. Upstream repositories remain upstream. C6 should pull, pin, wrap, test, and use them without silently forking or copying them into this repository.

## Evidence rule

**EXISTS is not WORKS. WORKS is not VERIFIED. VERIFIED is not LIVE.**

Production/customer-facing claims require evidence appropriate to the claim.

## Registry confidence

Inventory-derived local presence is marked explicitly. Anything not verified is marked unknown or candidate. The Arsenal does not convert an inventory observation into a false health or production claim.
