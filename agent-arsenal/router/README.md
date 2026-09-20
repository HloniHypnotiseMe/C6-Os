# C6 Capability Router

The Capability Router is the task-to-capability discovery layer above the existing Agent Arsenal resolver.

It extracts the useful control pattern from skill-suggester systems without making C6 dependent on a remote judgment API:

1. Inspect the governed capability catalogue.
2. Build a bounded shortlist (maximum three).
3. Return **none** when no local capability matches.
4. Keep recommendation separate from authorization and execution.
5. Send the selected capability through the existing resolver for risk, runtime, permission, provider, and adapter checks.

## Contract

`suggestCapabilities(task)` is deliberately **local-only**. Its fit value is a candidate-ranking signal, not calibrated confidence or semantic proof.

`suggestCapabilityById(id)` handles explicit selection deterministically and performs no inference.

The router never installs, activates, executes, grants permissions, or silently substitutes a provider.

## C6 flow

```text
Task
  ↓
Capability Router
  ↓
0–3 bounded candidates / NONE
  ↓
Review + evidence
  ↓
Agent Arsenal Resolver
  ↓
Risk + permissions + runtime + provider
  ↓
Adapter
  ↓
Execute
  ↓
Verify
```

This keeps the existing C6 Agent Arsenal as the source of truth. The router does not create a second registry.

## Why this shape

The upstream skill-suggester pattern is useful for bounded candidate selection, explicit none/uncertain outcomes, candidate re-checking, and—most importantly—the separation of recommendation from execution.

C6 already has the governed capability/provider registry and resolver, so adding another skill-management system would duplicate the architecture. The C6-native abstraction is therefore **capability**, which covers agents, tools, providers and C6-owned skills.

A future C6 AI judge may replace the local ranking step behind the same contract. If that happens, its output must remain advisory until the existing resolver and policy checks succeed.

## Status semantics

- `local_candidate`: a bounded local ranking produced a strong candidate; this is not calibrated semantic confidence.
- `local_only`: candidates exist, but the local lexical signal is weak.
- `none`: no candidate matched within the governed catalogue.
- `explicit_selection`: the caller named a known capability; no inference was used.
- `unavailable`: named capability is not registered.
- `invalid`: malformed task input.

No status grants execution authority.
