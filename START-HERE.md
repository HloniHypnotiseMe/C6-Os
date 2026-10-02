# C6 START HERE

This is the first document an agent should consult before beginning C6 work.

## Final gap controls

Before declaring a material build complete, read:

- `agent-arsenal/registry/final-gap-registry.yaml` — current 19-gap closure matrix and external/runtime gates.
- `docs/FINAL-GAP-CLOSURE-2026-10-02.md` — final-mile closure rules.
- `agent-arsenal/runtime/validate-claim-evidence.mjs` — structural customer-claim gate.
- `agent-arsenal/runtime/validate-provider-pins.mjs` — production provider reproducibility gate.

The lifecycle remains:

EXISTS -> WORKS -> VERIFIED -> LIVE

UNKNOWN, SKIPPED, HUMAN and PROVIDER_REQUIRED are not PASS states.

## 1. Understand the task

Determine objective, repository/product, requested capability, expected deliverable, and evidence required to call the work complete.

## 2. Check what C6 has already built

Before designing or implementing anything, read:
- `knowledge/WHAT-WE-ALREADY-BUILT.md`
- `knowledge/ALREADY-BUILT.yaml`
- `knowledge/LESSONS-LEARNED.md`
- `knowledge/DECISIONS.md`

Search the C6 estate before rebuilding anything.

## 3. Inspect before building

Read the relevant C6 Arsenal registries, skills, workflows, manifests, source, tests, migrations, API/webhook contracts, auth, permissions, CI/CD and operational tooling. Perform a source-level nugget sweep on the target and relevant providers.

## 4. Resolve capability

Use the Arsenal resolver/router and prefer existing confirmed capabilities.

## 5. Select the execution layer

Use the smallest sufficient layer: SKILL, AGENT, WORKFLOW, TEAM or PROVIDER.

## 6. Execute with minimum permissions

Follow provider/runtime risk and permission metadata. Human approvals remain mandatory for configured consequential actions.

## 7. Verify

Require the evidence appropriate to the claim: tests, builds, deployment checks, endpoint checks, logs, external confirmation, and source evidence. Do not convert code presence into runtime proof.

## 8. Register

Update the appropriate registry and build-memory files after every material wave.

## 9. Continuous Gap Intelligence

Map every material claim or capability as:

CLAIM -> CAPABILITY -> AUTHORITY -> DEPENDENCIES -> EXECUTION -> EVIDENCE -> FAILURE/RECOVERY -> SECURITY -> OWNER -> OBSERVABILITY -> LIFECYCLE

Check runtime connectivity, claims vs evidence, legacy paths, payment/data boundaries, webhook security/idempotency, tenant isolation, failure/retry/duplicate/out-of-order paths, secrets, customer fulfilment, monitoring, backup/restore, manual steps, external registrations and architecture contradictions.

Report BUILT / PROVEN / MISSING / OVERLOOKED / BLOCKED / NEXT WIN.

## 10. Products operate like companies

Map business outcome, customer journey, functions/jobs, responsible human/agent, systems/providers, permissions, workflows, evidence, exceptions and measurable wins. Agents are workers, not decoration.

## 11. Commercial execution

Customer-safe execution requires:

CLAIM -> CATALOGUE -> EXECUTION CONTRACT -> ENTITLEMENT -> CAPACITY -> REAL PROVIDER/SYSTEM ACTION -> COMPLETION -> CUSTOMER EVIDENCE

Payment links are not payment proof. Provider presence is not provider execution proof. Catalogue presence is not capability proof.

## 12. GitAgent admission boundary

GitAgent is an execution layer, never the C6 authority plane. Admit only bundles declaring identity, risk, capability, permissions, evidence contract and provenance. C6 retains tenant, entitlement, payment, production-credential and consequential-action authority.

## 13. Definition of done

DONE = CAPABILITY RESOLVED + IMPLEMENTATION COMPLETE + VERIFICATION PASSED + EVIDENCE CAPTURED + REUSABLE KNOWLEDGE REGISTERED.

A repository/control-plane closure does not equal LIVE. LIVE requires direct production evidence from the authoritative runtime/provider.