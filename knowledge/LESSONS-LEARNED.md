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
