# C6 Agent Arsenal Architecture

```text
                    C6 GITHUB
               ┌──────────────────┐
               │ C6 AGENT ARSENAL │
               │ Resource Registry│
               │ Capability Map   │
               │ Agent Registry   │
               │ Tool Registry    │
               │ Policies         │
               │ Workflows        │
               └────────┬─────────┘
                        │
                  Git / API / HTTPS
                        │
                        ▼
                 ┌─────────────┐
                 │ C6 VPS      │
                 │ JARVIS      │
                 │ C6 Agents   │
                 │ Orchestrator│
                 │ Runtimes    │
                 │ Sandboxes   │
                 └──────┬──────┘
                        │
                  CUSTOMER OUTCOME
                        │
                        ▼
                     REVENUE
```

## Dependency boundary

```text
UPSTREAM
   │
   │ READ / PULL / PIN VERSION
   ▼
C6 RESOURCE REGISTRY
   │
   ▼
C6 ADAPTER / WRAPPER
   │
   ▼
C6 AGENT
```

The registry is the map. Adapters are the interface. Providers are replaceable implementations. C6 workflows own the business outcome.
