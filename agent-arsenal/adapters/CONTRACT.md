# C6 Capability Adapter Contract v1

An adapter is the boundary between a C6 agent and a provider implementation.

## Required operations

```text
discover() -> provider metadata
health() -> health status
capabilities() -> supported capability IDs
execute(input, context) -> result
verify(result) -> verification
shutdown() -> clean termination
```

## Required metadata

```yaml
provider: <provider-id>
capability: <capability-id>
version: <immutable pin or development marker>
runtime: <runtime-id>
risk: <risk class>
permissions: []
```

## Adapter principles

- Normalize provider-specific interfaces.
- Do not leak secrets into logs or registry files.
- Reject missing permissions before execution.
- Fail closed when required dependencies are unavailable.
- Return structured results suitable for verification and memory storage.
- Keep business logic in C6 workflows, not inside provider-specific glue.
