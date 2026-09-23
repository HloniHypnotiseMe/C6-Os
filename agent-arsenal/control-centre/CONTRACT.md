# C6 Company Control Centre Contract

## Purpose

The Control Centre is the operational view of C6 companies and their digital workforces.

It must expose evidence-backed state, not invented health figures.

## Primary entities

- companies
- products
- functions
- workers
- teams
- providers
- workflows
- executions
- exceptions
- evidence
- wins

## Execution status

queued | running | waiting_approval | blocked | failed | escalated | completed

## Evidence status

missing | captured | verified | failed

## Claim ladder

EXISTS -> WORKS -> VERIFIED -> LIVE

The UI MUST never promote a claim beyond the available evidence.

## Required operational views

1. Company overview
2. Workforce and role assignments
3. Team/workflow execution
4. Provider bindings and permissions
5. Exceptions and human approvals
6. Evidence and claim status
7. Win ledger
8. Audit trail

## Runtime rule

The Control Centre is a control plane. It may request authorized execution, but production mutation remains governed by the worker/provider permission and approval contracts.

No synthetic uptime, success, transaction, payment, delivery or customer outcome figures are allowed.
