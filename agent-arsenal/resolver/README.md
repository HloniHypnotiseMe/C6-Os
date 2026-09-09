# C6 Arsenal Resolver v0.2

The resolver is the runtime discovery gate between a C6 agent and the Agent Arsenal.

## Prime directive

> Before building or installing a capability, resolve it through the C6 Agent Arsenal.

## Input

A capability ID, optionally constrained by:

- maximum risk
- runtime
- required permissions

## Output

The resolver returns machine-readable JSON containing:

- resolved capability
- selected provider
- provider risk
- granted/required permissions
- runtime
- registry status
- C6 adapter contract
- adapter status

## Examples

```bash
python agent-arsenal/resolver/resolve.py browser_automation
python agent-arsenal/resolver/resolve.py browser_automation --max-risk controlled
python agent-arsenal/resolver/resolve.py sandbox_execution --permission sandbox
python agent-arsenal/resolver/resolve.py financial_research --max-risk high --all
```

## Important status rule

`adapter_status: contract_only` means the provider has been mapped to a C6 adapter contract, but the adapter implementation has **not** been claimed as operational yet.

This prevents the registry from pretending that cataloguing equals deployment.

## Runtime dependency

The resolver uses only the Python standard library. No Docker, third-party Python package, or external service is required to perform resolution.

## Data source

`registry/resolution-index.json` is the runtime index derived from the human-readable capability/provider registries. The YAML registries remain the authoritative descriptive records and must be reconciled when registry data changes.
