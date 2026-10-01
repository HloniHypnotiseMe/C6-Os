# C6 START HERE

This is the first document an agent should consult before beginning C6 work.

## 1. Understand the task

Determine:

- objective;
- repository/product;
- requested capability;
- expected deliverable;
- evidence required to call the work complete.

## 2. Check what C6 has already built

Before designing or implementing anything, read:

- `knowledge/WHAT-WE-ALREADY-BUILT.md` — human-readable existing-capability index;
- `knowledge/ALREADY-BUILT.yaml` — machine-readable duplicate-prevention index;
- `knowledge/LESSONS-LEARNED.md` — prior discoveries, failures and anti-patterns;
- `knowledge/DECISIONS.md` — durable architecture and operating decisions.

**Do not rebuild a capability merely because it is not in the current target repository.** Search the C6 estate first.

## Department views: human vs machine taxonomy

C6 uses two views over one capability registry:

- **Machine view:** the precise Universal Arsenal categories in `agent-arsenal/universal/repository-registry.yaml`. Agents, resolver logic, adapters, and workflows use these categories.
- **Human view:** the seven department presentation layer in `agent-arsenal/registry/departments.yaml`. Prospects, customers, website surfaces, and audit reports use department names.
- **Do not collapse the Universal Arsenal taxonomy to seven departments.**
- **Do not expose the raw 37-category Arsenal taxonomy as the default customer-facing vocabulary.**
- **Categories may map to multiple departments; the department mapping is a presentation/operating view, not a routing replacement.**
## 3. Inspect before building

Do not invent a solution before checking the C6 Arsenal.

Read:

- `agent-arsenal/registry/capabilities.yaml`
- `agent-arsenal/registry/providers.yaml`
- `agent-arsenal/registry/agents.yaml`
- `agent-arsenal/registry/resources.yaml`
- relevant skills;
- relevant workflows;
- relevant product/repository manifests.

## 4. Resolve capability

Use the Arsenal resolver/router.

Prefer an existing confirmed capability over new implementation.

## 5. Benchmark external/open-source specialists

For specialist-agent work, benchmark:

- `msitarzewski/agency-agents`
- other registered upstream providers

Do not copy a whole repository when only a capability is required.

Classify each useful capability:

- REUSE
- ADAPT
- NEW
- DUPLICATE
- OUT-OF-SCOPE
- RESEARCH

## 6. Select the execution layer

Use the smallest sufficient layer:

```
SKILL       = reusable capability/procedure
AGENT       = specialist execution identity
WORKFLOW    = ordered multi-step execution
TEAM        = multiple specialists coordinated
PROVIDER    = implementation/source supplying capability
```

Do not create an agent when a skill is sufficient.

Do not create a skill when an existing provider already supplies the capability.

## 7. Execute with minimum permissions

Follow provider/runtime risk and permission metadata.

## 8. Verify

A task is not complete because an agent produced text or changed files.

Require appropriate evidence:

- tests;
- build;
- deployment checks;
- endpoint checks;
- screenshots where relevant;
- logs;
- external confirmation;
- source/repository evidence.

## 9. Register the result

Promote reusable capability knowledge back into the appropriate C6 registry, skill, workflow, agent, evidence contract, and `knowledge/ALREADY-BUILT.yaml` / `knowledge/WHAT-WE-ALREADY-BUILT.md` entry.

## 10. Never reinvent silently

If an existing capability was available but not used, record why.

If a new capability is created, record it in the build-memory files and record:

- why existing capability was insufficient;
- source/provenance;
- permissions;
- dependencies;
- verification;
- maintenance owner/path.

## 11. Build products that can operate like companies

C6 products should be treated as businesses with an embedded digital workforce, not merely software with a chatbot.

When the product requires ongoing business work, map the operating company before adding AI features:

- business outcome;
- customer journey;
- business functions/jobs;
- responsible human or agent;
- systems/providers used;
- permissions and approval boundaries;
- workflow/state transitions;
- evidence required for each material claim or action;
- exception/handoff path;
- measurable business win.

Prefer the smallest sufficient operating layer:

PRODUCT
  -> COMPANY OPERATING MODEL
  -> BUSINESS FUNCTION
  -> CAPABILITY
  -> SKILL / AGENT / WORKFLOW / TEAM
  -> PROVIDER / SYSTEM
  -> EVIDENCE
  -> WIN

Agents are workers, not decoration. A product agent must have a defined job, trigger, inputs, outputs, permissions, handoffs, success criteria, and evidence contract.

Do not add an agent merely because an AI feature sounds useful. First determine whether the job belongs in an existing skill, specialist, workflow, team, or provider.

Human approvals remain mandatory wherever policy, financial, legal, security, safety, or other configured risk controls require them.

## 12. Continuous Gap Intelligence

Before building, while building, and before declaring the work complete, perform a **missing/overlooked sweep**.

For every material claim or capability, map:

**CLAIM → CAPABILITY → AUTHORITY → DEPENDENCIES → EXECUTION PATH → EVIDENCE → FAILURE/RECOVERY → SECURITY BOUNDARY → OWNER → OBSERVABILITY → LIFECYCLE STATE**

Explicitly check for:

- code that exists but is not connected at runtime;
- UI claims that backend/provider evidence cannot prove;
- legacy or duplicate runtimes/integrations;
- payment paths that bypass the authoritative payment boundary;
- webhooks/callbacks without authentication, idempotency or persistence;
- data writes without tenant isolation, recovery or audit;
- agents with permissions exceeding their job;
- secrets crossing browser/log/report boundaries;
- customer journeys that stop at a button, form or payment instruction;
- failure, retry, timeout, duplicate and out-of-order event paths;
- infrastructure/configuration that is named but not exercised;
- monitoring, alerting, backup and restore gaps;
- manual steps silently counted as complete;
- external registrations/licences/compliance claims without external evidence;
- contradictions against approved architecture or prior decisions.

Ask the hidden-gap questions:

1. What did we assume exists but never verify?
2. What exists in code but is not connected?
3. What works only on the happy path?
4. What claim exceeds its evidence?
5. What legacy path can still execute?
6. What happens if the provider disagrees with local state?
7. What happens after restart, duplicate delivery or partial failure?
8. What customer action has no fulfilment path?
9. What can break without an alert?
10. What evidence would convince a skeptical third party?

Classify findings as **CRITICAL / HIGH / MEDIUM / LOW / HUMAN / UNKNOWN**. Never silently convert UNKNOWN, SKIPPED or HUMAN into PASS.

Every major checkpoint reports:

**BUILT / PROVEN / MISSING / OVERLOOKED / BLOCKED / NEXT WIN**

Use the smallest sufficient fix. Do not expand scope merely because a possible enhancement was discovered; surface it and preserve the current objective.

## 13. Definition of done

DONE means:

CAPABILITY RESOLVED
+ IMPLEMENTATION COMPLETE
+ VERIFICATION PASSED
+ EVIDENCE CAPTURED
+ REUSABLE KNOWLEDGE REGISTERED


## 14. Commercial capability claims and entitlement execution

For C6 customer-facing products and solutions, never treat catalogue presence, pricing, a payment link, or UI as proof that the purchased capability can actually execute.

Before exposing or selling a standalone solution, verify the chain:

CLAIM -> SOLUTION CATALOGUE -> EXECUTION CONTRACT -> ACTIVE ENTITLEMENT -> CAPACITY RESERVATION -> REAL PROVIDER/SYSTEM ACTION -> COMPLETION -> CUSTOMER EVIDENCE

Capacity must be consumed only when the authoritative execution boundary accepts the action. Failed provider actions must not consume completed capacity. Purchases, renewals and top-ups must remain isolated by exact purchase/entitlement so capacity cannot leak between grants.

For the C6 Smart Solutions marketplace:
- keep package pricing separate from individual solution pricing;
- use the existing RemotePay/payment boundary rather than creating parallel payment paths;
- mark a solution EXECUTABLE only when a real execution path exists and its boundary is verified;
- mark missing provider/runtime capability NOT_IMPLEMENTED rather than simulating it;
- distinguish EXISTS / WORKS / VERIFIED / LIVE at every checkpoint;
- preserve evidence for reservations, successful execution and failures;
- after every execution wave, update the C6 build-memory registry so future agents do not rebuild the same capability.

Current verified standalone execution wave status is maintained in C6-Os knowledge, not only in chat. The latest application waves made Smart Income, Smart Retention, and Smart Funnel executable; the remaining gaps must be resolved by capability evidence, not by changing labels.

## 15. Wave completion and memory-update gate

Every material build wave must finish with all four actions:
1. BUILT — implementation merged or otherwise recorded.
2. PROVEN — tests/build/runtime evidence captured at the level actually available.
3. REGISTERED — reusable capability and current status added to knowledge/WHAT-WE-ALREADY-BUILT.md and knowledge/ALREADY-BUILT.yaml.
4. LESSON/DECISION — any new anti-pattern, boundary, provider dependency, or durable architecture decision added to knowledge/LESSONS-LEARNED.md or knowledge/DECISIONS.md.

If the implementation repository and C6-Os disagree, reconcile the C6-Os memory rather than allowing agents to work from stale chat context.

A wave is not memory-complete until C6-Os has been updated.
