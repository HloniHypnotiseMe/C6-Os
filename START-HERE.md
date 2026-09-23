# C6 START HERE

This is the first document an agent should consult before beginning C6 work.

## 1. Understand the task

Determine:

- objective;
- repository/product;
- requested capability;
- expected deliverable;
- evidence required to call the work complete.

## 2. Inspect before building

Do not invent a solution before checking the C6 Arsenal.

Read:

- `agent-arsenal/registry/capabilities.yaml`
- `agent-arsenal/registry/providers.yaml`
- `agent-arsenal/registry/agents.yaml`
- `agent-arsenal/registry/resources.yaml`
- relevant skills;
- relevant workflows;
- relevant product/repository manifests.

## 3. Resolve capability

Use the Arsenal resolver/router.

Prefer an existing confirmed capability over new implementation.

## 4. Benchmark external/open-source specialists

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

## 5. Select the execution layer

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

## 6. Execute with minimum permissions

Follow provider/runtime risk and permission metadata.

## 7. Verify

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

## 8. Register the result

Promote reusable capability knowledge back into the appropriate C6 registry, skill, workflow, agent, or evidence contract.

## 9. Never reinvent silently

If an existing capability was available but not used, record why.

If a new capability is created, record:

- why existing capability was insufficient;
- source/provenance;
- permissions;
- dependencies;
- verification;
- maintenance owner/path.

## 10. Definition of done

DONE means:

```
CAPABILITY RESOLVED
+ IMPLEMENTATION COMPLETE
+ VERIFICATION PASSED
+ EVIDENCE CAPTURED
+ REUSABLE KNOWLEDGE REGISTERED
```
