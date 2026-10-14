# C6 START HERE

This is the first document an agent should consult before beginning C6 work.

**Smart Trading OS visual entry page:** [`products/smart-trading-os/START-HERE.html`](products/smart-trading-os/START-HERE.html). The HTML page is a navigation/status view; this Markdown file remains the canonical governance and execution contract.

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

## 3A. Repository Nugget Sweep — mandatory, not optional

The Arsenal registry is an index. It is **not** a substitute for inspecting the repositories themselves. A repository can contain valuable capabilities that are invisible at provider/category level.

For every material build, perform a **source-level nugget sweep** on the target repository and the most relevant registered providers before deciding what to build.

Inspect, where present:
- README and product documentation;
- package/module manifests and dependency graphs;
- `docs/`, examples, demos and configuration;
- source entry points, adapters, handlers, services and workers;
- tests, E2E tests, fixtures and test helpers;
- migrations, schemas and data models;
- API/webhook contracts;
- queues, retry, timeout, idempotency and background workers;
- auth, roles, permissions and audit logging;
- CI/CD workflows and operational scripts;
- `.agents/`, agent instructions, acceptance/chaos tests and internal developer tooling;
- feature flags, experimental paths and legacy compatibility layers.

Search by the **job/capability**, not only by repository name. Search terms should include synonyms, implementation names, API routes, event names, data models, provider names and likely failure-path terms.

For each useful nugget capture:
- `REPO`
- `PATH / COMPONENT`
- `CAPABILITY`
- `WHAT IT ACTUALLY DOES`
- `INTEGRATION POINT`
- `DEPENDENCIES`
- `PERMISSIONS / RISK`
- `VERIFICATION EVIDENCE`
- `C6 FIT`
- `ACTION: REUSE / ADAPT / COMPOSE / REGISTER / REJECT / RESEARCH`

**Do not stop at the README. Do not stop at a package manifest. Do not assume a registered provider exposes only the capability named in the registry.**

A provider may contain several independent reusable nuggets. Conversely, a README claim may have no implementation evidence. Source evidence wins.

### Nugget triangulation rule

When a useful capability is discovered in one repository:
1. search C6-Os registries for it;
2. search the C6 estate for an existing implementation;
3. inspect the candidate source component;
4. compare with at least one relevant alternative when the capability is material;
5. choose the smallest sufficient component;
6. register the durable discovery so the next agent does not rediscover it.

**Example:** a WhatsApp provider is not merely "WhatsApp". Its nuggets may include multi-tenancy, role/permission isolation, templates, campaigns, chatbot flows, AI contexts, WebSocket chat, agent transfer, audit logs, queues/workers, webhook management, E2E fixtures and analytics. Only the needed nuggets should be extracted.

**Failure mode this gate prevents:** `registry says provider exists -> agent uses only the headline capability -> hidden reusable implementation remains undiscovered -> C6 rebuilds it elsewhere`.
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

Current verified standalone execution wave status is maintained in C6-Os knowledge, not only in chat. The latest application waves made Smart Income, Smart Retention, Smart Funnel executable and routed Smart WhatsApp outbound execution through the C6-registered Whatomate provider. Smart Inbox now has a verified tenant execution core plus inbound provider adapters for BillionMail email, WhatsApp Cloud, Facebook Messenger and Instagram DM, but remains PROVIDER_REQUIRED until live credentials, external webhook registration and real received-message evidence are proven. Smart Reputation and Smart Ads remain NOT_IMPLEMENTED. Remaining gaps must be resolved by capability evidence, not by changing labels.

## 15. Wave completion and memory-update gate

Every material build wave must finish with all four actions:
1. BUILT — implementation merged or otherwise recorded.
2. PROVEN — tests/build/runtime evidence captured at the level actually available.
3. REGISTERED — reusable capability and current status added to knowledge/WHAT-WE-ALREADY-BUILT.md and knowledge/ALREADY-BUILT.yaml.
4. LESSON/DECISION — any new anti-pattern, boundary, provider dependency, or durable architecture decision added to knowledge/LESSONS-LEARNED.md or knowledge/DECISIONS.md.

If the implementation repository and C6-Os disagree, reconcile the C6-Os memory rather than allowing agents to work from stale chat context.

A wave is not memory-complete until C6-Os has been updated.

## GitAgent execution layer — mandatory admission boundary

When a GitAgent-style repository is used as an agent execution source, treat it as an execution artifact, not an authority plane.

Before admission, run:

```bash
node agent-arsenal/runtime/admit-gitagent.mjs /path/to/agent-repo
```

The bundle must declare identity, rules, duties, runtime/risk, C6 capability, permissions, evidence contract and provenance. GitAgent mechanisms such as memory, tools, plugins, MCP, scheduling, Git sessions and learning may be reused, but they never grant tenant, entitlement, payment, production-credential or unrestricted infrastructure authority. Those remain C6-governed.

Admission status is structural only: READY is not WORKS, VERIFIED or LIVE. Runtime evidence must still be captured through the normal C6 evidence ladder.


## 16. Final 19-gap control gate

Before declaring C6 production-ready, reconcile `agent-arsenal/registry/final-gap-registry.yaml`.

Structural controls now include:
- `agent-arsenal/runtime/validate-claim-evidence.mjs`
- `agent-arsenal/runtime/validate-provider-pins.mjs`

These controls prevent silent claim/evidence drift and identify registered production VPS providers without immutable pins.

The final gap register distinguishes:
- CLOSED = repository/control-plane work complete;
- BLOCKED_EXTERNAL = requires real provider/account/runtime evidence;
- PARTIAL = implementation exists but production contract remains incomplete;
- NOT_IMPLEMENTED = capability has not been built and must not be sold as executable.

**Never promote a CLOSED structural control to LIVE without direct production evidence.**
