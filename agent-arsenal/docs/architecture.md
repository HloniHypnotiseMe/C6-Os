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

The registry is the map. The Capability Router is the bounded task-to-capability discovery layer. The Resolver is the authorization-aware provider selection layer. Adapters are the interface. Providers are replaceable implementations. C6 workflows own the business outcome.

## Discovery vs selection vs execution

```text
TASK
  ↓
CAPABILITY ROUTER
  ↓
0–3 candidates / NONE
  ↓
REVIEW
  ↓
ARSENAL RESOLVER
  ↓
risk + permissions + runtime + provider
  ↓
ADAPTER
  ↓
EXECUTE
  ↓
VERIFY
```

The router never executes, installs, activates, grants permissions, or silently substitutes a capability. Its local fit signal is a ranking aid, not calibrated confidence. A future C6 AI judge may improve candidate selection behind the same contract without bypassing the resolver.
