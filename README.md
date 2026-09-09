# C6-Os

## C6 Agent Operating System

C6-Os is the control plane for the C6 agent ecosystem. It does **not** vendor or fork the upstream projects that power the ecosystem. Instead, it provides a governed discovery layer, adapters, policies, workflows, and machine-readable manifests.

### Prime directive

> **BEFORE BUILDING ANYTHING, CONSULT THE C6 AGENT ARSENAL.**

The Agent Arsenal is the resource-discovery layer of C6-Os. Agents should resolve capabilities first, then activate the smallest suitable provider or internal resource.

```text
Objective
   ↓
Consult Agent Arsenal
   ↓
Resolve capability
   ↓
Check risk / permissions / runtime
   ↓
Select provider + adapter
   ↓
Execute
   ↓
Verify
   ↓
Store result / memory
   ↓
Business outcome
```

## Repository map

```text
C6-Os/
├── README.md
└── agent-arsenal/
    ├── README.md
    ├── registry/
    │   ├── agents.yaml
    │   ├── capabilities.yaml
    │   ├── providers.yaml
    │   ├── resources.yaml
    │   ├── runtimes.yaml
    │   └── tools.yaml
    ├── manifests/
    │   └── catalog.yaml
    ├── policies/
    │   ├── permissions.yaml
    │   ├── security.yaml
    │   └── upstream-policy.md
    ├── adapters/
    │   └── CONTRACT.md
    ├── skills/
    ├── workflows/
    ├── docs/
    │   ├── architecture.md
    │   └── discovery-protocol.md
    └── VERSION
```

## Design rules

1. Registry before implementation.
2. Capability before provider.
3. Existing capability before new code.
4. Upstream source remains protected and externally owned unless explicitly classified as C6 internal.
5. Production dependencies must be pinned before production activation.
6. Credentials and secrets never belong in the registry.
7. Permissions are explicit, minimal, and auditable.
8. High-risk or destructive operations require approval.
9. Provider-specific behavior lives behind a C6 adapter.
10. Every execution should produce a verifiable outcome.

## Status semantics

`registered` means the resource is catalogued. It does **not** mean it is installed, healthy, or production-ready.

`local_presence: confirmed` means the September 2026 C6 workspace inventory showed a local instance. It is not a claim that the instance is currently running.

`pin: null` means the exact production commit/tag has not yet been verified and pinned. The registry deliberately refuses to invent version information.

## Operating destination

C6-Os exists to make the C6 ecosystem composable: agents discover proven capabilities, orchestrators select them, adapters normalize them, and workflows turn them into customer outcomes and revenue.
