# C6 Repository Nugget Register

Purpose: preserve source-level discoveries that are easy to miss when a repository is represented only by a provider/category entry.

Rule: a repository is a container of capabilities, not one capability. These entries are source-evidenced discoveries; they are not approval to deploy the source repository wholesale.

## 2026-10-02 — Whatomate

Repository: `HloniHypnotiseMe/whatomate`

Status: **SOURCE-INSPECTED / CANDIDATE COMPONENT SOURCE**

README and repository tree establish a self-hostable WhatsApp Business Platform with:
- multi-tenant organizations with isolated data/configuration;
- granular resource/action permissions and custom roles;
- WhatsApp Cloud API integration;
- real-time chat/WebSocket support;
- Meta-approved template management;
- bulk campaigns with retry support;
- keyword chatbot automation;
- branching conversation flows;
- AI-powered responses via OpenAI, Anthropic and Google;
- canned responses and dynamic placeholders;
- voice calling/IVR, transfers, hold music and call recording;
- analytics;
- API/webhook surfaces;
- audit-log surfaces;
- background queue/worker implementation;
- E2E coverage for chatbot, flows, campaigns, permissions, webhooks, templates and analytics.

Important source paths inspected from the repository tree:
- `internal/handlers/chatbot.go`
- `internal/handlers/chatbot_graph_runner.go`
- `internal/handlers/chatbot_processor.go`
- `internal/handlers/agent_transfers.go`
- `internal/handlers/webhook.go`
- `internal/handlers/webhook_dispatch.go`
- `internal/handlers/webhooks.go`
- `internal/audit/audit.go`
- `internal/queue/queue.go`
- `internal/queue/pubsub.go`
- `internal/worker/worker.go`
- `pkg/whatsapp/message.go`
- `pkg/whatsapp/template.go`
- `pkg/whatsapp/flow.go`
- `pkg/whatsapp/webhook.go`
- `frontend/e2e/tests/chatbot/*`
- `frontend/e2e/tests/campaigns/*`
- `frontend/e2e/tests/settings/permissions.spec.ts`
- `frontend/e2e/tests/settings/webhooks.spec.ts`
- `frontend/e2e/tests/settings/audit-logs.spec.ts`

C6 fit:
- **ADAPT / COMPOSE** for Smart WhatsApp and Smart Inbox capability work where a specific Whatomate component is smaller or more complete than a new implementation.
- Do **not** replace the C6 tenant/evidence/payment authority with Whatomate.
- Do **not** copy the whole application merely to obtain WhatsApp features.
- Provider credentials and authoritative commercial/entitlement state remain behind C6 boundaries.

Nuggets requiring targeted follow-up before reuse:
- exact Meta webhook verification and signature handling in source;
- outbound message retry/idempotency behaviour;
- queue durability/recovery;
- AI context storage and provider abstraction;
- agent transfer/team routing;
- campaign rate limits and retry semantics;
- audit event schema and retention.

## 2026-10-02 — LobeHub

Repository: `HloniHypnotiseMe/lobehub`

Status: **SOURCE-INSPECTED / HIGH-VALUE RESEARCH SOURCE**

The fork contains substantially more than the headline "agent workspace" capability. Source/package inspection identified:
- heterogeneous agent runtime and agent gateway machinery;
- MCP integration;
- agent spawn/working-directory and transcript handling;
- context-engine pipeline;
- model runtime/provider abstraction with OpenAI, Anthropic, Google, Azure, Bedrock, Hugging Face, Ollama and Replicate support;
- tool runtime;
- memory/user-memory components;
- agent builder and agent management tools;
- agent groups and group management;
- task/scheduling/project/workspace surfaces;
- knowledge-base tooling;
- browser/web tools;
- Python interpreter and sandbox tooling;
- verification and acceptance tooling;
- self-iteration and skill-maintainer tooling;
- observability/OpenTelemetry and LLM tracing;
- internal `.agents/acceptance` and `.agents/chaos` test/operational infrastructure.

Source evidence inspected includes:
- `packages/model-runtime/package.json`
- `packages/tool-runtime/package.json`
- `packages/heterogeneous-agents/package.json`
- `packages/context-engine/package.json`
- `.agents/acceptance/*`
- `.agents/chaos/*`
- `.agents/scripts/check/*`

C6 fit:
- **ADAPT / COMPOSE / RESEARCH** for the Agent Company execution layer.
- Potentially valuable mechanisms include agent gateway, heterogeneous-agent spawning, context pipelines, transcript/provenance handling, model/provider abstraction, group coordination, acceptance/chaos testing, verification, self-iteration controls and observability.
- C6-Os remains the authority/governance layer. LobeHub-derived runtime mechanisms must not become an independent financial, entitlement, customer-data or production-control plane.

## Registry gap discovered

Before this sweep:
- `repository-registry.yaml` listed `whatomate` and `lobehub`.
- `providers.yaml` did **not** contain provider entries for either.
- `capabilities.yaml` did **not** map their source-level capabilities.

This is a concrete START-HERE failure mode: the universal inventory knew the repositories existed, but the detailed provider/capability layer did not force or preserve their internal nuggets.

## Follow-up status

1. **DONE** — Whatomate and LobeHub registered as detailed providers with risk/permission metadata.
2. **DONE** — source-level capabilities mapped in capabilities.yaml.
3. **ONGOING** — re-inspect source when capability or version changes; this register is a memory aid, not a substitute for source inspection.
4. **ACTIVE RULE** — candidate nuggets remain EXISTS/CANDIDATE until C6-side implementation and evidence promote them to WORKS/VERIFIED/LIVE.


## 2026-10-02 — Second-wave source sweep

### GSD Core
The registered C6 fork GET-SHIT-DONE is an archived redirect. Active source is Open GSD's GSD Core.

Source-level nuggets:
- adversarial assumptions analysis;
- project/codebase/domain research roles;
- integration checker that treats cross-phase wiring as broken until traced;
- goal-backward verifier that distrusts summaries and verifies actual code;
- documentation verification;
- security auditor;
- debugging/session management;
- MemPalace ship-time curation with idempotent diary/KG/tunnel handling;
- explicit test matrices, audit commands and workflow/phase state machinery.

C6 action: **ADAPT / COMPOSE**. GSD Core should be treated as the active source for the existing project-execution capability. Its adversarial verifier/integration-checker patterns are particularly valuable for C6's repository forensics and production-reality checks.

### OpenViking
Source-level inspection exposed a deeper agent context stack:
- virtual-filesystem context database for knowledge, memory and skills;
- typed memory categories including events, entities, preferences, cases, experiences and trajectories;
- experience-memory retrieval for subtasks;
- background subagent manager with concurrency limit and isolated focused prompts;
- sandbox-aware workspace identity;
- context builder combining bootstrap files, memory and skills;
- remote skill loading;
- cron/background execution and outcome evaluation in the bot layer;
- dedicated security tests for gateway/API keys, traversal, sandbox access and restart behaviour.

C6 action: **ADAPT / COMPOSE**. The strongest fit is durable agent experience/trajectory memory, bounded context assembly, subagent execution controls and memory-aware task continuation.

### n8n
Source-level inspection exposed reusable engineering-control nuggets beyond workflow automation:
- repository-native agent review rules for DB migration safety, workflow safety, endpoint protection and credential handling;
- workflow required-check gates and least-privilege permissions;
- path-filter coverage checks;
- credential scope enforcement and secret non-disclosure rules;
- instance AI evaluation cases with schema validation, real-build calibration and durable evaluation suites;
- telemetry registry with typed event schemas, duplicate-event prevention and additive property evolution.

C6 action: **ADAPT / COMPOSE**. These patterns should strengthen C6 CI/review gates, AI evaluation, telemetry and production workflow safety. Do not import n8n's proprietary/fair-code product layer merely to obtain these patterns.

### Goose
Source-level inspection exposed:
- operation/state-machine abstraction with persisted operation notes so replayed pipelines reach the same conclusion;
- explicit yielded/applied/not-applicable operation results;
- conversation turn/error helpers;
- context compaction as a reusable caller-owned input/output contract;
- structured summaries and token estimation;
- MCP memory extension with local-vs-global scope, categories/tags and path validation.

C6 action: **ADAPT / COMPOSE / RESEARCH** for agent state/replay semantics, context compaction and scoped memory. C6 should retain its own authority and evidence semantics.

### Agency-Agents
Source-level inspection exposed useful specialist definitions and testing patterns:
- Agentic Identity & Trust Architect: zero-trust agent identity, scoped delegation, credential lifecycle, tamper-evident evidence and fail-closed authorization;
- Evidence Collector: screenshot + assertion/trace evidence distinction, reproducible issue reporting and explicit untested coverage;
- Data Consolidation Agent: freshness, aggregation and staleness-aware reporting patterns;
- Report Distribution Agent: recipient/territory isolation, per-recipient delivery logging and retry/continue-on-failure behaviour;
- engineering/security/testing specialist agents and installer/orchestration test scripts.

C6 action: **ADAPT / REGISTER** as specialist-agent knowledge and acceptance criteria, not wholesale agent runtime.

### Documenso
Source-level inspection exposed:
- webhook secret verification using constant-time comparison;
- explicit reject/log/do-not-process behaviour on verification failure;
- signing workflow state model;
- signer/approver/viewer/assistant/CC roles;
- parallel vs sequential signing;
- identity verification options;
- sealed completed PDF + audit trail.

C6 action: **ADAPT / RESEARCH** for document-signing workflows, webhook verification and evidence/audit semantics. External provider verification remains required.

### listmonk
Source-level inspection exposed:
- role/permission model;
- event broadcast mechanism;
- bounce/complaint webhook normalization;
- constant-time Basic Auth verification for a provider webhook;
- provider-specific bounce classification and campaign metadata capture.

C6 action: **ADAPT / COMPOSE** for outbound email operations, delivery/bounce handling and webhook evidence patterns; BillionMail remains C6's mail server boundary.
