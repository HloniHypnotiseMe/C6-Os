# C6 Build Entry Workflow

Contract: C6-BUILD-ENTRY/v1

This is the operational entry point for a new C6 build/change. It turns the root START HERE SOP into a machine-checkable, authorization-gated workflow.

## Invocation

~~~bash
node /path/to/C6-Os/agent-arsenal/workflows/c6-build-entry.mjs --task "describe the objective"
~~~

For an explicit capability:

~~~bash
node /path/to/C6-Os/agent-arsenal/workflows/c6-build-entry.mjs --capability repository_drift_forensics --task "audit repository before changes"
~~~

Optional controls:

~~~bash
--repo /path/to/repository
--risk low|controlled|high
--permissions filesystem_read,network
~~~

## What it does

1. Requires the target repository's START-HERE.md.
2. Validates the mandatory C6 operating sequence.
3. Maps the product as a business/company operating model when ongoing business work is involved.
4. Resolves the smallest local capability candidate.
4. Uses the existing C6 capability router.
5. Records visible repository markers without treating them as runtime proof.
6. Produces a machine-readable plan.
7. Stops at READY_FOR_AUTHORIZATION.

It does not silently execute code, mutate production, grant permissions, or claim verification.

## Execution contract

~~~text
START HERE
  -> INSPECT
  -> MAP COMPANY OPERATING MODEL (when applicable)
  -> RESOLVE
  -> BENCHMARK
  -> SELECT SMALLEST LAYER
  -> AUTHORIZE
  -> IMPLEMENT
  -> TEST
  -> VERIFY
  -> CAPTURE EVIDENCE
  -> REGISTER KNOWLEDGE
  -> RECORD WIN
~~~

## Evidence rule

EXISTS != WORKS != VERIFIED != LIVE.

A green build is not production proof. A repository endpoint is not a live endpoint. A screenshot is not runtime verification. Customer-facing claims require an evidence reference.

## Reuse rule

Upstream projects are benchmarked and consumed through the Arsenal. Extract only the necessary behavior. Do not wholesale-copy an upstream repository into a C6 product when a smaller skill, adapter, specialist, provider, or workflow is sufficient.

## Authorization rule

The build-entry workflow is deliberately non-executing. A resolved capability never grants permissions by itself. Runtime permissions must be explicitly supplied by the authorized execution layer.

## Definition of done

A build entry is complete only when:

CAPABILITY RESOLVED + IMPLEMENTATION COMPLETE + TESTS PASSED + VERIFICATION COMPLETE + EVIDENCE CAPTURED + KNOWLEDGE REGISTERED

The entry workflow itself is complete when it returns READY_FOR_AUTHORIZATION with the required sequence and evidence rules intact.
