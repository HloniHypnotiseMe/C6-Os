# C6 Revenue Research Adapter Contract v0.1

Status: contract_only

## Purpose

Turn a resolved C6 research capability into a structured commercial-intelligence request. This contract is the first revenue-path adapter: it does not claim that an external research provider is already wired into production.

## Flow

1. Agent states a revenue objective.
2. Arsenal Resolver selects a research provider.
3. Adapter validates the request contract.
4. Provider execution occurs only when an implementation is installed and authorized.
5. Result is verified and converted into an actionable commercial next step.

## Input

```json
{
  "objective": "string",
  "market": "string",
  "customer_type": "string",
  "constraints": [],
  "evidence_required": true,
  "max_risk": "controlled"
}
```

## Output

```json
{
  "status": "validated|ready|executed|failed",
  "objective": "string",
  "provider": "string",
  "adapter": "c6-revenue-research",
  "evidence": [],
  "findings": [],
  "commercial_actions": [],
  "verification": {}
}
```

## Non-negotiable rule

`contract_only` is not execution. No provider is represented as operational until a concrete adapter implementation, authorization path, and verification test exist.

## Commercial destination

The adapter exists to shorten the path:

`business objective -> evidence -> offer -> action -> cheque`
