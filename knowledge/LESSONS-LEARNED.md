# C6 — LESSONS LEARNED

## 1. Never build before searching the estate
A repository may already contain the required capability even when it is not a named provider. Search the universal catalogue, evidence and existing product systems.

## 2. START-HERE is a gate, not the catalogue
START-HERE tells agents how to work. Arsenal tells them what exists. Both are required.

## 3. Discoverability is broader than provider registration
Available, selected, authorized and production-ready are different states.

## 4. Reuse the smallest sufficient component
Prefer a skill, workflow, module, adapter or pattern over copying a whole repository.

## 5. Evidence beats assumptions
EXISTS != WORKS != VERIFIED != LIVE.

A green build does not prove production routing. A repository does not prove installation. A test does not automatically prove an external integration.

## 6. Record failed approaches
Rejected, failed, replaced or unsuitable approaches must be recorded so future agents do not repeat the investigation.

## 7. Preserve provenance
Extracted capabilities retain source repository, component, licence/provenance, rationale, dependencies, adaptation, tests and proof.

## 8. Products are companies
For ongoing business work, define the business function, worker/agent, systems, permissions, workflow, evidence, exception path and measurable win before adding an agent.

## 9. Close the learning loop
Every material build should end with CAPTURE -> PROVE -> REGISTER -> ESCALATE.

## Anti-patterns
- Creating a service without checking existing C6 infrastructure.
- Treating a fork as automatically authoritative.
- Treating inventory presence as proof of functionality.
- Copying an entire upstream repository for one capability.
- Adding an agent where a skill/workflow already solves the job.
- Claiming done from compilation alone.
- Leaving important architectural decisions only in chat history.

## Reverse Engineering

Treat organisational departments as a presentation/operating layer, not a replacement for the Universal Arsenal taxonomy. Precise resolver categories must remain intact while humans receive simpler department labels. Existing specialist repositories must be inspected and registered by capability, provenance, permissions, risk, and verification status before reuse.


## Smart Solutions execution lesson

A marketplace entry is not an executable product. During the Smart Solutions waves, several catalogue entries initially appeared executable because package/public routes existed, but those routes did not consume standalone SolutionPurchase capacity. The correct fix was to audit the actual execution boundary and mark unsupported standalone routes NOT_IMPLEMENTED until a real entitlement-aware path exists.

Payment-link creation is also not proof of payment execution. Smart Income creates a real payment link without consuming solution capacity, then consumes one unit only after the authoritative payment service reports PAID. Customer messaging follows the same rule: reserve first, complete only after the mail provider returns a real message identifier.


## Smart Funnel lesson

Public product execution cannot trust a browser-supplied tenant/user identifier. Smart Funnel ownership is bound server-side to a persisted funnel record and a hashed bearer token created only for an authenticated owner with an active entitlement. Public submissions resolve ownership from that token, then use the normal entitlement reservation path. This preserves tenant isolation while allowing an unauthenticated prospect to submit a lead.


## Smart Inbox provider-boundary lesson

A partial omnichannel implementation must not be promoted to a full commercial execution claim. Smart Inbox now has a real entitlement-aware tenant core and real outbound email/WhatsApp provider actions, but inbound email, Facebook Messenger and Instagram DM adapters plus tenant routing remain provider gaps. The correct state is `PROVIDER_REQUIRED` until those surfaces are connected and verified.



## C6 STUDIO lesson
The first proposed architecture overstated two provider capabilities. MusicGen is a text-to-music generator; isolated stems must not be implied merely by running separate prompts. XTTS-v2 is multilingual speech/voice cloning; it must not be presented as a singing synthesizer. Provider boundaries must reflect what the actual model proves.


## 2026-10-02 — Keep provider rules outside the strategy

Challenge programmes can differ and change. Keep provider constraints in versioned profiles and expose any unverified rule as a gap; do not treat a configured profile as proof of compliance.


## Smart Inbox inbound lesson — 2026-10-02
A normalized provider ingress is the reusable boundary: provider-specific authentication and payload parsing belong in C6-Mail-Services, while tenant ownership and entitlement enforcement remain in C6-Group-Final-Website. This prevents provider secrets from entering the customer-facing application and keeps all channels on one tenant-routing/evidence path.

WhatsApp webhook implementation now proves code-level normalization and signature handling, but it does not prove a live WhatsApp delivery until a real Meta webhook is registered and a real message reaches the production ingress.


## 2026-10-02 — Registry headline is not capability discovery
A universal repository registry can prove that a repository is known, but it cannot prove that agents have discovered the reusable implementation nuggets inside it. The failure mode is especially dangerous for large forks: one headline provider label can hide dozens of mature sub-capabilities.

The mandatory fix is source-level nugget mining: inspect docs, manifests, source, tests, E2E fixtures, migrations, operational scripts, agent instructions, acceptance/chaos tests, queues/workers, webhooks, permissions and failure paths. Capture the smallest useful component with provenance and evidence in knowledge/REPO-NUGGETS.md.

The Whatomate inspection demonstrated why this matters: "WhatsApp" hides multi-tenancy, permission matrices, realtime chat, campaigns, branching chatbot flows, agent transfers, audit logs, queues/workers, webhooks and extensive E2E coverage. LobeHub similarly contains agent gateway, heterogeneous agents, context pipelines, runtime abstraction, acceptance/chaos infrastructure and observability beyond its headline workspace description.


## 2026-10-02 — Second-wave repository sweep lesson
The first nugget sweep fixed the registry blindness, but a single provider can still hide critical execution patterns in agents, review rules, tests and operational tooling. The second sweep confirmed that the highest-value nuggets are often not headline product features: GSD's adversarial verification, OpenViking's typed experience memory, n8n's migration/security gates and typed AI evals, Goose's replayable operation notes, Agency-Agents' zero-trust delegation model, Documenso's constant-time webhook verification and listmonk's bounce normalization are all reusable patterns.

Future C6 discovery must therefore inspect not only product source but also the repository's internal engineering system: agent instructions, review rules, test harnesses, failure/recovery code and operational controls.

## 2026-10-02 — transcribe-anything capability discovery
- Registered speech-to-text, diarization, forced alignment, transcription job API, realtime streaming, media ingestion, artifact generation and transcription observability capabilities from HloniHypnotiseMe/transcribe-anything.
- Source inspection found a self-hosted FastAPI daemon, bounded queue, authenticated HTTP/WebSocket surfaces, health/readiness, metrics, webhooks, token redaction, multiple isolated transcription backends and extensive tests.
- This is a capability source, not a deployment decision. C6 must own tenant identity, entitlement/quota, durable job authority and business evidence.


## 2026-10-02 — Do not duplicate an existing WhatsApp provider
The Smart WhatsApp wave initially used a direct Cloud API path even though C6-Os had already registered and source-inspected Whatomate. The corrected pattern is to reuse the existing provider at the execution boundary: C6 owns identity, entitlement, metering and evidence; Whatomate owns provider-facing WhatsApp execution. Repository source discovery must happen before adding a parallel provider integration.

A provider integration is still not production proof. The merged adapter and green CI establish repository/build evidence only; deployment, credentials, external Meta configuration and a real accepted message remain separate LIVE gates.

## 2026-10-02 — GitAgent capability discovery lesson
GitAgent demonstrates that an agent can be packaged as a version-controlled operating environment rather than only as runtime code: identity, rules, memory, tools, skills, hooks and plugins can travel with the repository. This is directly relevant to C6's START-HERE and Agent Company model.

The reusable lesson is not to install GitAgent wholesale. Mine its execution contracts:
- versioned agent identity/rules/memory;
- declarative tools and composable skills;
- lifecycle allow/block/modify hooks;
- plugin extension points;
- MCP discovery and namespacing;
- repository-local resumable sessions;
- compliance/audit and telemetry;
- scheduled execution;
- outcome-based skill learning.

C6 must retain authority over tenant identity, permissions, entitlements, payments, production evidence and consequential actions. Git-backed memory or Git commits are execution artifacts unless C6 explicitly promotes them to authoritative evidence.


## 2026-10-02 — Provider integration must include its production runtime
The Whatomate adapter was correctly merged, but the real production capability also requires the provider runtime itself to be part of the canonical deployment. The unified deployment now provisions Whatomate, its database/Redis persistence, HTTPS routing and secret-backed configuration. This closes the code-to-runtime gap while preserving the separate LIVE gates for VPS access, Meta configuration and real message evidence.


## 2026-10-13 — Workflow contract tests are not runtime proof
The C6 content pipeline now has green CI coverage for exported-workflow contracts and the frontend/backend builds. That proves the tested repository contracts only. It does not prove the private n8n workflow is imported, credentials are valid, the orchestrator is reachable, the named agents are registered, or an end-to-end draft was generated. Keep the workflow inactive until those checks are evidenced.

Do not add automated GitHub writes to a draft-generation workflow without a separate approval boundary, deterministic duplicate protection, strict repository/path allowlists, least-privilege credentials, schema validation and human merge review. Newsletter delivery is a separate capability with consent, unsubscribe, suppression, delivery and audit requirements.
