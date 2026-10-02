# C6 — WHAT WE ALREADY BUILT

Mandatory pre-build reference. Determine whether C6 already has the capability, implementation pattern, infrastructure, workflow, or lesson required before creating anything new.

## Core systems
- C6-Os — Agent Arsenal, capability registry, repository inventory, resolver/router, reconciliation and evidence enrichment.
- Agent-OS — autonomous AI OS / JARVIS owner interface.
- C6 SaaS Core — shared multi-tenant SaaS foundation.
- C6 deployment/control-room utilities.

## Project execution
- Get Shit Done (GSD) — controlled fork registered for project execution, context engineering, spec-driven development, development workflow and verification patterns.
- C6 START-HERE / BUILD ENTRY — mandatory inspect, resolve, benchmark, select, authorize, implement, test, verify, capture, register cycle.
- Universal repository catalogue — categorised estate including repositories not currently selected as providers.

## Communications and infrastructure
- C6 Mail Services — central transactional mail/event API.
- BillionMail — self-hosted mail server runtime.
- Mailflare — inbox/mail platform.
- Listmonk — email marketing/list capability.
- n8n — workflow automation.
- Cloudflare edge/DNS patterns.
- Existing deployment and self-hosting patterns.

## Payments
- RemotePay — payment gateway/application capability.
- Standard Bank / SimplyBlu integration patterns.
- Evidence-gated payment lifecycle and state-transition patterns.

## Products
- C6 Group website — public website, lead capture, audits/reports and package marketplace.
- Ubernie — business directory and Business-in-a-Box.
- Revenue Hunter — acquisition/audit engine.
- Commodity Connect — commodity transaction workflow and evidence chain.
- DieselConnect — RFQ through supplier quotes, payment verification, dispatch, POD and release lifecycle.
- Domains Manager — domain/DNS/hosting/email control plane.
- RemotePay Holdings — tax, secretarial, compliance and governance product source.
- C6 Creator Suite.
- C6 AIOS.

## Reusable engineering capabilities
- Repository drift forensics.
- Workflow architecture recovery.
- Evidence-based QA.
- Production reality checks.
- API contract engineering.
- Database reliability.
- Application/security architecture.
- API, E2E and performance verification.

## Infrastructure doctrine
- Prefer self-hosted/open-source infrastructure where practical.
- Do not introduce paid SaaS or hosting merely because a new project uses it.
- Inspect the existing C6 stack before selecting a new provider.
- Existing mail, workflow, database, deployment, DNS and payment infrastructure must be considered before creating replacements.

## Required use
1. Search this file.
2. Search capabilities.yaml and providers.yaml.
3. Search the universal repository registry.
4. Check repository evidence.
5. Inspect the actual source component.
6. Reuse/adapt/compose the smallest sufficient capability.
7. Add newly verified reusable knowledge here.

This is an index, not authorization to use every listed system.

## Reverse Engineering Department

C6 now exposes Reverse Engineering as a first-class human department view over the precise Universal Arsenal taxonomy. The machine taxonomy remains unchanged at 37 categories. Registered C6-owned reverse-engineering resources include Ghidra, reverse-skill, and IDAssist. The department covers binary/executable analysis, malware analysis, protocol/network reverse engineering, application/API reverse engineering, firmware/embedded analysis, decompilation/disassembly, authorized vulnerability research, and digital-forensics reverse-engineering support. Reuse is capability-level; wholesale repository copying is prohibited.


## C6 Smart Solutions — entitlement-aware execution

The C6 Group website now has a 15-solution Smart Solutions catalogue with package/standalone separation, RemotePay-backed purchase flows, solution purchase types (BASE/TOP_UP), execution contracts, entitlement checks, capacity reservations and customer evidence patterns.

Current standalone execution state after the latest merged application wave:
- EXECUTABLE: Smart Books, Smart Calendar, Smart Income, Smart CRM, Smart WhatsApp, Smart SEO & GEO, Smart SECRETARIAT, Smart Retention, Smart Socials, Smart Analytics.
- EXECUTABLE: Smart Funnel.
- PROVIDER_REQUIRED / remaining capability work: Smart Inbox.
- NOT_IMPLEMENTED / remaining capability work: Smart Reputation, Smart Ads.
- Revenue Hunter remains a custom/public acquisition capability rather than a normal standalone capacity-metered solution.

Important implementation boundary: standalone execution must consume the exact active SolutionPurchase capacity and only complete consumption after the authoritative provider/system accepts the operation. Reservations have expiry handling and execution evidence. A green CI build does not establish LIVE production status; the Contabo deployment and external provider/runtime checks remain separate production gates.


### Smart Funnel execution — verified build wave
- Standalone Smart Funnel is now EXECUTABLE in C6-Group-Final-Website.
- Authenticated customers with an active Smart Funnel entitlement can create tenant-owned public funnels with bearer tokens whose hashes are persisted; public lead submissions resolve to the owning tenant rather than trusting a browser-supplied user ID.
- Lead submission reserves Smart Funnel capacity against an active SolutionPurchase and completes only after real C6 Mail notification/confirmation succeeds; execution evidence includes message IDs and execution ID.
- Existing `lead.created` event integration is attempted as part of the funnel path; production provider/runtime success remains a separate LIVE gate.
- PR #51 merged with build verification green; merge SHA `dd009b014d42f3af364df7041918ebe4b62fb9ed`.


### Smart Inbox execution core — verified build wave
- Smart Inbox core is now merged in C6-Group-Final-Website with tenant-owned inboxes, conversation ownership, entitlement-aware capacity reservation, real C6 Mail email sending, real WhatsApp Cloud API sending, and execution evidence.
- The standalone Smart Inbox contract remains `PROVIDER_REQUIRED`, not `EXECUTABLE`: the commercial claim also includes inbound email plus Facebook Messenger and Instagram DMs, and those provider adapters/tenant routing are not yet connected and proven.
- PR #52 merged with C6 Build Verification green; merge SHA `bfbc1af194c360260bd6b650d508988c456b3e91`.


## C6 STUDIO — AI music workstation foundation
- C6 STUDIO build surface added under c6-studio/ in C6-Creator-Suite on branch c6-studio-build.
- Includes browser DAW timeline/mixer UI, FastAPI orchestration API, Ollama/Qwen arrangement boundary, MusicGen role-pass provider boundary, FFmpeg mix/export, Docker deployment, and n8n compose workflow.
- Existing C6 Creator Suite remains untouched on main; implementation is isolated behind draft PR #2.
- Status: EXISTS / BUILT. Runtime verification is not yet promoted to WORKS because GitHub Actions returned no workflow runs and this execution environment cannot reach GitHub for local clone/test execution.
- Important capability boundary: MusicGen is treated as separate role passes, not native isolated multitrack stems. XTTS-v2 is treated as TTS/voice generation, not singing. Ardour remains an adapter boundary rather than a simulated headless runtime.
- Next verification: run the GitHub workflow or execute the compose stack on the target VPS, then capture health, provider, generation, mix/export and failure-path evidence.


## C6 Prop Challenge Trading Products

- **C6 Challenge Sentinel** — MT5 EA product under `C6Group.AiOS/products/trading/prop-challenge/c6-challenge-sentinel`.
- Product-plane workload; not a permanent Mission Control module.
- Uses deterministic challenge risk controls plus configurable provider profiles.
- Current status: **EXISTS / BETA**. Backtest, forward-demo and live evidence are not yet verified.


### Smart Inbox inbound provider wave — verified build
- Smart Inbox inbound routing now has provider adapters for BillionMail IMAP email, WhatsApp Cloud, Facebook Messenger and Instagram DM.
- All provider adapters normalize into the same authenticated C6 Smart Inbox tenant ingress; inbound tenant ownership is resolved from the configured destination identifier.
- WhatsApp Cloud webhook verification uses the Meta application signature boundary and normalizes inbound text messages with the provider message ID.
- C6-Mail-Services WhatsApp adapter PR #9 merged with CI run 36988334305 successful; C6 website contract reconciliation PR #54 merged with build verification run 36988340571 successful.
- Smart Inbox remains PROVIDER_REQUIRED because live Meta/BillionMail credentials, external webhook registration and real received-message evidence are not yet proven on the production VPS.


## Repository Nugget Discovery — 2026-10-02
- Added mandatory source-level nugget sweep to START-HERE.md.
- Added knowledge/REPO-NUGGETS.md as durable source-level discovery memory.
- Whatomate is now registered as a detailed WhatsApp platform provider. Its inspected source contains reusable nuggets for multi-tenancy, granular permissions, realtime chat, templates, campaigns, chatbot/branching flows, agent transfer, audit logs, webhooks, queues/workers and E2E verification.
- LobeHub is now registered as a detailed agent-runtime provider. Its inspected source contains heterogeneous-agent runtime/gateway, context pipeline, model/tool runtime, MCP, agent groups, acceptance/chaos tooling, self-iteration and observability mechanisms.
- These are candidate reusable components, not claims that C6 has deployed them. C6 authority, tenant, entitlement, payment and evidence boundaries remain authoritative.
