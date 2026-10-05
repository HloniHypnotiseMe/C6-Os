# C6 Quality, Verification & Assurance

## Purpose

C6 requires an independent verification function that tests what the system actually does rather than trusting implementation claims, task summaries, or builder assertions.

This is a business function in the C6 operating model, not a new authority plane and not a second engineering organization.

## Operating rule

`BUILD → TEST → SECURITY → VERIFY → EVIDENCE → REGISTER → RELEASE`

A builder may implement a capability. The verification function determines whether the available evidence supports `WORKS` or `VERIFIED`.

`CLOSED` structural controls must never be promoted to `LIVE` without direct runtime evidence.

## Scope

1. Functional correctness and acceptance criteria.
2. API contracts, authentication, negative paths, idempotency and compatibility.
3. Integration and end-to-end behaviour.
4. Security: threat modelling, authz/authn, tenant isolation, secrets, dependency risk and authorized security testing.
5. Regression detection after changes.
6. Data integrity, migrations, state transitions, backup and restore verification.
7. Economic correctness: payment boundaries, status monotonicity, pricing/evidence and provider results.
8. Agent safety: permissions, forbidden actions, approval gates, handoffs and evidence.
9. Performance baselines and regression detection.
10. Failure, recovery and chaos scenarios where authorized.
11. Production-readiness checks and reality checks.
12. Evidence capture and explicit tested/untested scope.

## Independence

Engineering owns implementation. Quality, Verification & Assurance owns verification status.

A passing build/test result is evidence of the tested scope only. It does not establish production readiness unless the production environment and required external dependencies were tested.

## Risk boundary

Security testing must be explicitly authorized. Production mutation, destructive testing, real-money actions and other consequential operations require the applicable C6 permissions and approval gates.

## Test outcome states

- `PASS`: test executed and acceptance condition met.
- `FAIL`: test executed and acceptance condition not met.
- `BLOCKED_EXTERNAL`: test cannot execute because a required external system, credential, provider or production environment is unavailable.
- `UNTESTED`: the scope has not yet been exercised.
- `VERIFIED`: sufficient reproducible evidence exists for the stated scope.
- `LIVE`: production runtime evidence exists for the stated scope.

## Minimum release evidence

Every material release should retain:

- scope and acceptance criteria;
- test commands/cases and environment;
- result and failure output where applicable;
- security scope/results;
- integration evidence;
- known limitations and blocked external gates;
- evidence references;
- responsible verifier;
- release decision.

## Reusable capability resolution

Use existing C6 capabilities before building new tooling: `evidence_based_qa`, `production_reality_check`, `application_security`, `security_architecture`, `authorized_security_testing`, `api_testing`, `performance_verification`, `e2e_test_automation`, `integration_verification`, `goal_backward_verification`, `evidence_collection`, `agent_verification`, and `agent_chaos_testing` where their declared scope fits.

The function is therefore a governed orchestration/admission layer over existing capabilities, not a duplicate test platform.
