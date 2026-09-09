# C6 Agent Arsenal v0.1

The Agent Arsenal is the C6 resource-discovery layer.

## Agent contract

Every C6 agent should follow this sequence before building or installing anything:

1. Read `registry/capabilities.yaml`.
2. Resolve the requested capability to one or more providers.
3. Read provider risk, permissions, runtime, local presence, and pin status.
4. Prefer an existing confirmed capability over writing a new implementation.
5. Use a C6 adapter when provider-specific behavior must be exposed to an agent.
6. Execute with the minimum permissions required.
7. Verify the result.
8. Record useful execution knowledge in the appropriate memory system.

## Canonical registries

- `registry/providers.yaml` — repositories and provider metadata.
- `registry/capabilities.yaml` — capability-to-provider resolution.
- `registry/agents.yaml` — known C6 agent families and agent resources.
- `registry/resources.yaml` — classification of the wider local arsenal.
- `registry/runtimes.yaml` — execution environments and constraints.
- `registry/tools.yaml` — reusable tools and infrastructure services.
- `manifests/catalog.yaml` — high-level domain manifest for machine resolution.

## Important distinction

The Arsenal is a catalogue, not a source-code warehouse. Upstream repositories remain upstream. C6 should pull, pin, wrap, test, and use them without silently forking or copying them into this repository.

## Registry confidence

Inventory-derived local presence is marked explicitly. Anything not verified is marked unknown or candidate. The Arsenal does not convert an inventory observation into a false health or production claim.
