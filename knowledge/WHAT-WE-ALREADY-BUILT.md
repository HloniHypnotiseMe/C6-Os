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
- EXECUTABLE: Smart Reputation.
- PROVIDER_REQUIRED: Smart Ads.
- PROVIDER_REQUIRED / remaining provider evidence: Smart Inbox.
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


## Repository Nugget Discovery — Second Wave — 2026-10-02
- GSD Core active source discovered: the registered get-shit-done fork redirects to Open GSD/GSD Core. Its integration checker and goal-backward verifier are directly relevant to C6's evidence-first execution model.
- OpenViking source contains durable typed agent experience/trajectory memory, context assembly, bounded background subagents, remote skills and sandbox-aware workspace handling.
- n8n source contains repository-grade migration/workflow/security review rules, typed AI evaluation infrastructure and telemetry registry patterns.
- Goose source contains replayable operation-state semantics, context compaction contracts and scoped MCP memory.
- Agency-Agents contains zero-trust agent identity/delegation, evidence-collector methodology and delivery/data-consolidation specialist patterns.
- Documenso contains constant-time webhook verification and evidence-rich document signing workflow patterns.
- listmonk contains provider bounce/complaint normalization, role/permission and delivery event patterns.
- These are source-level reusable nuggets, not proof that C6 has deployed them.

## 2026-10-02 — transcribe-anything capability discovery
- Registered speech-to-text, diarization, forced alignment, transcription job API, realtime streaming, media ingestion, artifact generation and transcription observability capabilities from HloniHypnotiseMe/transcribe-anything.
- Source inspection found a self-hosted FastAPI daemon, bounded queue, authenticated HTTP/WebSocket surfaces, health/readiness, metrics, webhooks, token redaction, multiple isolated transcription backends and extensive tests.
- This is a capability source, not a deployment decision. C6 must own tenant identity, entitlement/quota, durable job authority and business evidence.


### Smart WhatsApp — Whatomate execution provider wave
- Smart WhatsApp outbound execution is now routed through the existing C6-registered HloniHypnotiseMe/whatomate provider rather than duplicating direct Cloud API sending in the C6 application.
- C6 remains authoritative for tenant identity, active entitlement, capacity reservation/completion and customer evidence. Whatomate is the provider-facing execution layer.
- The integration fails closed when provider configuration is missing or no provider message ID is returned; capacity completes only after provider acceptance evidence.
- C6 website PR #55 merged as c3f0709122973dfaec46a90c00f152112adeace3; corrected C6 Build Verification run 36997089780 passed both backend and frontend builds.
- Production status remains separate: Whatomate must be deployed/configured on the target infrastructure, Meta/WhatsApp credentials must be present, and a real outbound WhatsApp send must be evidenced before calling the capability LIVE.
- Whatomate's broader source capabilities remain reusable provider nuggets; they are not automatically C6 customer-facing claims until separately connected to a C6 execution contract and evidence path.

## 2026-10-02 — GitAgent capability discovery
- Registered GitAgent as a source-level reusable agent-execution provider.
- Captured git-native agent definitions, repository memory/context, declarative tools, skills, lifecycle hooks, plugins, MCP client, sub-agent discovery, local Git-backed sessions, compliance/audit, scheduling, OpenTelemetry and skill-learning mechanisms.
- Status is EXISTS/CANDIDATE COMPONENT SOURCE, not LIVE deployment.
- C6-Os remains the authority/governance layer; GitAgent-derived memory, Git writes, credentials, scheduling and consequential tool execution require C6 authorization/evidence boundaries.


### Whatomate production integration — deployment-ready, not LIVE
- The canonical C6 unified self-hosted deployment now provisions Whatomate as the Smart WhatsApp provider runtime with dedicated PostgreSQL and Redis persistence, Caddy HTTPS routing at whatsapp.c6group.co.za, and C6 backend provider configuration.
- Whatomate production image is pinned to immutable multi-platform digest `sha256:8091fd13661bc51d5e14e7fbf25a4792e781b85e10b715172bf22aa87ed1e669`.
- Deployment script generates the production Whatomate config from VPS-only secrets and refuses unpinned Whatomate images or missing provider configuration.
- Production-stack validation run `37001711593` passed after the runtime wiring fix.
- Status: DEPLOYMENT-READY / NOT LIVE. Contabo VPS provisioning/access, real Whatomate API key, Meta/WhatsApp account configuration, DNS/HTTPS and real outbound message evidence remain external production gates.


### Smart Reputation + Smart Ads — execution wave — 2026-10-02
- Smart Reputation execution is now implemented and merged in C6-Group-Final-Website: entitlement-aware review-request execution through the existing C6 Mail boundary, with capacity completed only after a real provider message ID is returned.
- Smart Ads execution is now implemented and merged: entitlement-aware Meta Marketing API campaign-creation boundary, explicit objective mapping, and campaigns created PAUSED rather than claiming live advertising or performance.
- Contract regression coverage was added for both capability states.
- Smart Reputation is now EXECUTABLE at repository level; Smart Ads is PROVIDER_REQUIRED until real Meta credentials/account/page configuration and a real paused-campaign creation are evidenced.
- Both remain separate from LIVE production status; Contabo deployment, provider configuration and external evidence are still required.
- PR #56 merged; merge SHA `beb6cf3154f861bcf0023904f7c5d8efc2b34d2b`.


### Smart Reputation + Smart Ads — execution wave — 2026-10-02
- Smart Reputation execution is implemented and merged: entitlement-aware review-request execution through C6 Mail, with capacity completed only after a real provider message ID.
- Smart Ads execution is implemented and merged: entitlement-aware Meta Marketing API campaign-creation boundary, with campaigns created PAUSED.
- Contract regression coverage was added for both capability states.
- Smart Reputation is EXECUTABLE at repository level; Smart Ads is PROVIDER_REQUIRED until real Meta credentials/account/page configuration and real paused-campaign evidence exist.
- Neither is LIVE until external runtime evidence exists.
- PR #56 merged; merge SHA `beb6cf3154f861bcf0023904f7c5d8efc2b34d2b`.


## 2026-10-05 — Revenue Hunter OpenOut capability wave

Five OpenOut repositories were source-swept specifically for Revenue Hunter gaps rather than imported wholesale:
- `OpenOutLearn` — active-learning explore/exploit qualification.
- `OpenOutNews` — trigger/news candidate ranking and duplicate/syndication collapse.
- `OpenOutFind` — provider-backed discovery, ICP qualification with reasons, candidate deduplication and confidence-gated enrichment.
- `OpenOutSend` — suppression-first sending, reply priority, sending window, daily cap, pacing and follow-up controls.
- `OpenOutreach` — orchestration of find → qualify → enrichment → write → send with explicit operator boundaries.

C6 implementation added to `C6-Group-Final-Website`:
- `c6group-backend/src/services/revenueHunterEngine.ts`
- `c6group-backend/src/services/__tests__/revenueHunterEngine.test.ts`
- `c6group-backend/src/routes/revenueHunter.ts`

Revenue Hunter now has executable repository-level capability for candidate deduplication, evidence-backed ICP qualification, explore/exploit queue selection, confidence-gated enrichment planning, trigger-signal collapse and owner-approved outreach planning. External discovery/enrichment and actual mail delivery remain provider/runtime boundaries.

Durable source record: `knowledge/REVENUE-HUNTER-OPENOUT-NUGGETS-2026-10-05.md`.

Latest application commits:
- capability engine: `04abd33fbfa7df04fa0480ca2bf3cef4f16a1fd1`
- route wiring: `581b94ae203953aa01b98cfd11a2e5fe6e38140f`
- tests: `46e3cc61aeae75a75e904adf412b74237bba5695`

Evidence state at capture: BUILT / SOURCE-VERIFIED / CI-UNCONFIRMED. The GitHub connector reported no workflow runs for the latest test commit, so this wave is not falsely marked green or LIVE.


## 2026-10-05 — Revenue Hunter send hardening

- Revenue Hunter outreach delivery is now explicitly bound to the existing C6 Mail service; the C6 Mail contract requires `C6_MAIL_SERVICE_URL` and `C6_MAIL_SERVICE_KEY`, calls `/api/v1/mail/send`, and requires a returned message ID as delivery evidence.
- `/outreach-send` now requires explicit `ownerApproved: true` and a per-message `idempotencyKey`.
- Each approved send first creates a durable deterministic reservation in the existing PostgreSQL-backed `WebhookEvent` store. A repeated idempotency key is therefore refused before another provider send is attempted, preventing retry-driven duplicate outreach.
- The reservation is updated with the authoritative C6 Mail message ID on success. If the provider call fails, the reservation records the failed attempt and error rather than silently permitting an unsafe duplicate retry.
- No SMTP credentials or second mail system were added to Revenue Hunter.

Application hardening commit: `d6fd893714be38dbce2a00e70e3591146ad1ee78`.

Evidence state: SOURCE-VERIFIED / CI-UNCONFIRMED / NOT LIVE. GitHub reported no workflow run or status checks for this commit at capture time.


## 2026-10-05 — Revenue Hunter verification hardening
- Revenue Hunter send-path hardening remains source-verified: owner approval is mandatory, C6 Mail is the sole delivery boundary, provider message IDs are required, and durable idempotency reservations are persisted in `WebhookEvent`.
- Verification gap closed: the C6 Build Verification workflow now runs backend lint, Jest tests, and TypeScript build rather than build-only. Workflow change commit: `33c227e652e667cfbbcbdcc1331333f20e13ac35`.
- C6 Mail delivery contract now has explicit unit coverage for central API routing, required provider message ID, and fail-closed missing configuration. Test commit: `a3082778b6379024532d86aa2af6f01cd3159300`.
- CI must still be treated as unconfirmed until GitHub reports a successful run for these commits. Production remains NOT LIVE until VPS/runtime/provider evidence exists.

- CI gate correction: removed the non-existent/unconfigured backend ESLint gate from `c6-build.yml`; the workflow now executes the actual Jest suite and TypeScript build. Commit: `16ddfa214cb4ff52384f770c11eefebcaa4b8fc2`.


## 2026-10-13 — C6 content draft pipeline verification

- Repository: `HloniHypnotiseMe/C6-Group-Final-Website`; workflow export: `n8n-workflows/content/content-generation.json`.
- The workflow is intentionally inactive. Its repository-defined path validates a `c6-NNN` topic ID, loads the approved blog calendar, selects only queued topics and approved service routes, calls `content_writer` and `seo_analyst` through `POST http://orchestrator:7000/run`, validates the article structure, and returns a draft proposal for human review.
- Fixed escaped-regex defects and strengthened contract tests in merged PR #69: https://github.com/HloniHypnotiseMe/C6-Group-Final-Website/pull/69.
- Main verification commit: `f95b951492bbb3cd85aae52ddbe4b91e55723478`.
- GitHub Actions run `38364278079` completed successfully: all six jobs passed, including `n8n-workflows`, `content-pipeline`, `blog-calendar`, `frontend`, `blog-content`, and `backend`: https://github.com/HloniHypnotiseMe/C6-Group-Final-Website/actions/runs/38364278079.
- Evidence level: repository contracts and CI VERIFIED. This does **not** prove a live n8n instance, orchestrator reachability, credentials, draft generation against runtime agents, PR creation, publication, or newsletter delivery.
- Activation blockers: private n8n import/configuration, webhook Header Auth, repository-scoped read-only GitHub credential, network reachability to the orchestrator, confirmation that both agents are registered and return the expected `response` field, and safe runtime test evidence.
- Next: validate runtime prerequisites; only then implement a separately gated, duplicate-safe, least-privilege GitHub PR stage. Keep human review/merge and newsletter consent/suppression/delivery controls separate.


## C6 CyberShield — passive domain assessment (2026-11-02)

- Product foundation: [C6-Os PR #25](https://github.com/HloniHypnotiseMe/C6-Os/pull/25) (open; feature branch only).
- First isolated scanner engine: [C6 Group PR #79](https://github.com/HloniHypnotiseMe/C6-Group-Final-Website/pull/79) (open; feature branch only), file `c6group-backend/src/services/cyberShieldPassiveScanner.ts`.
- CI evidence: [run 41450748773](https://github.com/HloniHypnotiseMe/C6-Group-Final-Website/actions/runs/41450748773) passed all 7 jobs; backend 17 suites / 86 tests and TypeScript build passed.
- Engine scope: bare FQDN validation, all-answer public IPv4/IPv6 checks, pinned-IP HTTPS HEAD probe, selected security headers and TLS certificate metadata, no redirects/crawling, 8-second wall-clock deadline.
- Status: EXISTS / CI-VERIFIED CODE. Not merged, not deployed, no real network scan or customer scan performed. No public route is mounted.
- Remaining scanner work: domain ownership TXT proof, explicit authorization/scope, isolated worker and egress enforcement, full DNS/SPF/DMARC, HTTP redirect and cookie checks, quotas/kill switch, reports and evidence.
- **Customer integration blocker:** C6 SaaS Core identity/tenant/evidence authorization is incomplete. See [c6-saas-core issue #28](https://github.com/HloniHypnotiseMe/c6-saas-core/issues/28). Do not use its current evidence routes for customer data or expose customer scans until authentication and cross-tenant isolation are verified.
