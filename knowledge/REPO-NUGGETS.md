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

## Required follow-up

1. Register Whatomate and LobeHub as detailed providers with candidate/controlled status, risk and permissions.
2. Add capability mappings for the source-level nuggets that are useful to C6.
3. During future work, use this register as a starting point but re-inspect source when the capability or version changes.
4. Do not promote candidate nuggets to WORKS/VERIFIED/LIVE without C6-side implementation and evidence.
