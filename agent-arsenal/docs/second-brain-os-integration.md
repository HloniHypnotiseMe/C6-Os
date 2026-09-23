# C6 Second Brain OS — Capability Extraction & Integration Record

Status: **ADOPTED AS A CONTROLLED KNOWLEDGE-MEMORY PROVIDER; INTEGRATION BUILD PENDING**

Date: 2026-09-23

## Target Win

Give C6 a durable, source-grounded knowledge layer that records decisions, lessons, project outputs, evidence relationships, and reusable knowledge without duplicating the C6 Agent Arsenal or Command Centre.

## Source

- C6 fork: https://github.com/HloniHypnotiseMe/second-brain-os
- Upstream: https://github.com/undefined-ui/second-brain-os
- Reviewed upstream commit: `ca92af9cea7815b5897f98733a7974ba80638c91`
- Licence: MIT
- Current fork status: controlled fork; no local-runtime presence has been verified by this record.

## Architectural decision

Second Brain OS is **not** the C6 control plane and is **not** a replacement for C6-Os, Agent-OS, the Agent Arsenal, C6 SaaS Core, or the Command Centre.

It is a candidate **knowledge-memory provider** behind the existing C6 capability-resolution layer.

### Separation of concerns

| Layer | Authority |
|---|---|
| START HERE | C6 build protocol and operating rules |
| C6-Os / Agent Arsenal | capability discovery, provider governance, extraction policy |
| Agent-OS | agent runtime/control where applicable |
| C6 SaaS Core | authorization, evidence, audit, evaluation, tenant/platform controls |
| Second Brain OS | durable knowledge capture, linking, retrieval, decision memory, graph analysis |
| Command Centre | human/operator control and operational visibility |
| Product repositories | product execution |
| Evidence systems | proof of actual outcomes |

## Extracted capabilities

### KEEP / ADAPT

1. **Two-layer knowledge model**
   - Knowledge layer: durable concepts, sources, entities, synthesis.
   - Project layer: active execution pipeline.
   - Projects consume knowledge and feed validated outputs back into knowledge.

2. **Ingestion workflow**
   - Raw material enters a controlled inbox/raw area.
   - Agent extracts useful knowledge.
   - Existing knowledge is updated rather than endlessly duplicated.

3. **Linked knowledge / graph**
   - Relationships are first-class.
   - Typed links and graph health are measurable.
   - Graph analysis is useful for discovering hubs, bridges, orphans and clusters.

4. **Source-grounded retrieval**
   - Answers should identify the knowledge source used.
   - General model knowledge must not silently masquerade as C6 memory.

5. **Maintenance**
   - Linting, orphan detection, stale knowledge review, metrics and privacy checks.

6. **Narrow-write agent model**
   - Ingestor writes.
   - Linker has constrained write access.
   - Research/review/graph analysis remain read-only by default.

7. **Plain-file portability**
   - Markdown/wikilinks remain the durable storage representation.
   - Obsidian is a viewer/editor, not C6's authority.

### DO NOT IMPORT WHOLE

- All 72 slash commands.
- All 18 skills.
- All six subagents.
- Entire vault template.
- Obsidian-specific operational assumptions.
- External SaaS dependencies.
- A second orchestration/control plane.

Those remain upstream reference material until a specific C6 capability contract requires an extraction.

## C6 adaptation

C6 must add a thin boundary around the provider:

```
C6 Agent / Workflow
        |
        v
C6 Arsenal capability resolver
        |
        v
knowledge_capture / knowledge_retrieval / decision_memory / knowledge_graph
        |
        v
Second Brain provider
        |
        v
Markdown knowledge store
        |
        +--> provenance
        +--> evidence links
        +--> decisions
        +--> project outputs
        +--> reusable lessons
```

The provider must never bypass C6 authorization, evidence, audit or risk controls.

## First C6 use cases

1. **Decision memory**
   Store architectural decisions with date, status, rationale, affected repositories and evidence.

2. **Repository/build memory**
   Store what was learned from forensic audits and what future agents must not repeat.

3. **Agent handoff memory**
   Convert completed work into concise reusable context.

4. **Evidence-linked knowledge**
   Link claims and lessons to the evidence that proves them.

5. **Arsenal learning**
   Record useful capability discoveries without turning the Arsenal into a code warehouse.

6. **Project learning loop**
   `Inputs -> Process -> Outputs -> Feedback -> durable knowledge`.

## Safety / governance

- No credentials or secrets in the knowledge store.
- No production claim is inferred from a note alone.
- Memory status must preserve the C6 distinction: `EXISTS -> WORKS -> VERIFIED -> LIVE`.
- Destructive or high-risk writes require the normal C6 authorization path.
- Sensitive material must pass privacy/secrets checks before ingestion.
- Every extracted component must retain provenance and licence information.

## Extraction record

SOURCE REPO: `HloniHypnotiseMe/second-brain-os`

SOURCE COMPONENTS:
- two-layer knowledge/project model
- ingest/query/link/maintenance concepts
- graph analysis
- narrow-write agent roles
- dependency-free vault health/graph scripts

CAPABILITY TAKEN:
- knowledge capture
- knowledge retrieval
- decision memory
- knowledge graph

WHY NEEDED:
- durable organisational memory across C6 builds and products

DEPENDENCIES TAKEN:
- None yet. This phase registers the provider and architecture only.

LICENCE:
- MIT

C6 ADAPTATION:
- provider behind C6 Agent Arsenal
- governed by START HERE and C6 evidence/authorization contracts

FILES IMPORTED:
- None from upstream into C6-Os in this phase.

FILES DELIBERATELY NOT IMPORTED:
- complete skills tree
- command tree
- subagent tree
- vault template
- Obsidian configuration

TEST / PROOF:
- upstream repository structure and source documents inspected
- C6-Os registry inspected
- Agent-OS START-HERE inspected
- provider registered at reviewed upstream commit
- runtime installation is not claimed

## Next implementation gates

1. Define C6 knowledge schema and frontmatter.
2. Define provenance/evidence links.
3. Define read/write API or file boundary.
4. Build minimal ingest/query/link/health components.
5. Add deterministic tests.
6. Connect one C6 workflow first.
7. Verify retrieval against real C6 decisions/evidence.
8. Only then expand to wider C6 memory ingestion.

## Target Win / Proof / Next Win

**Target Win:** C6 can permanently retain and retrieve verified organisational knowledge.

**Proof:** Provider is registered and the architecture explicitly prevents it from becoming a duplicate control plane.

**Next Win:** Implement the smallest working C6 knowledge-memory slice and prove it with real decision/evidence records.
