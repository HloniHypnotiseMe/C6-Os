# C6 Agent Discovery Protocol

## Runtime resolution

When an agent receives an objective:

1. Translate the objective into one or more capability IDs.
2. Search `registry/capabilities.yaml`.
3. Resolve candidate providers in `registry/providers.yaml`.
4. Prefer confirmed local resources when they satisfy the need.
5. Check risk, required permissions, runtime, and pin status.
6. Select or build the smallest suitable C6 adapter.
7. Execute with scoped permissions.
8. Verify the output against the objective.
9. Persist useful context or results through the memory capability.
10. Emit an execution record suitable for audit and future optimization.

## Example

Objective: collect public competitor pricing.

```text
objective
  -> web_scraping
  -> Scrapling
  -> network + filesystem_write
  -> C6 scraper adapter
  -> collect
  -> verify source freshness / completeness
  -> store structured result
```

Objective: execute untrusted code.

```text
objective
  -> sandbox_execution
  -> OpenSandbox
  -> restricted sandbox
  -> execute
  -> verify
  -> destroy sandbox
```

## Failure behavior

If no registered capability satisfies the objective, the agent must report the gap before inventing a large implementation. A new capability may then be proposed, evaluated, and added through a controlled registry change.
