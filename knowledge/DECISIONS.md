# C6 — DECISIONS

Durable decisions that should influence future builds.

## Architecture
- C6-Os is the control plane/catalogue for reusable capabilities and repository discovery.
- START-HERE is the mandatory entry point for C6 work.
- The universal repository catalogue exposes the full available estate as selectable options; provider registration is a separate trust/authorization decision.
- Prefer the smallest sufficient capability.
- C6-owned repositories are the primary internal source of truth.
- Controlled forks require inspection before extraction or replacement.

## Infrastructure
- Prefer self-hosted/open-source infrastructure where practical.
- Do not introduce paid hosting/SaaS by default.
- Inspect existing C6 mail, workflow, database, payment, DNS and deployment infrastructure before adding a replacement.

## Verification
- Use EXISTS -> WORKS -> VERIFIED -> LIVE.
- Customer-facing and production claims require corresponding evidence.
- Do not infer production health from repository presence or build success.

## Knowledge
- Important build knowledge must leave chat and enter C6-Os.
- New reusable capabilities are registered after verification.
- Failed, rejected and replaced approaches are recorded to prevent repeat work.

## Department Views Do Not Replace the Universal Taxonomy

C6 uses two views over one registry: the Universal Arsenal's 37 precise categories remain the machine source for agents, resolver and adapters; a smaller department taxonomy is the human-facing presentation layer for prospects, customers and audit reports. Departments may map many-to-many onto categories. Customer surfaces should not expose raw internal category identifiers unless explicitly required.


## Commercial execution boundary
- Individual Smart Solutions remain separate from C6 package pricing; packages are the operating relationship while standalone solutions are capacity-metered marketplace purchases/top-ups.
- A standalone solution may be labelled EXECUTABLE only when its execution contract, entitlement boundary, provider/system action and evidence path are implemented.
- RemotePay remains the authoritative payment boundary for C6 solution purchases and payment-linked execution; do not introduce parallel payment paths.
- Production deployment evidence remains distinct from repository/CI evidence. Contabo provisioning, DNS/HTTPS, secrets, persistence and external provider checks must be proven before claiming LIVE.
- C6-Os build memory must be updated at the end of every material wave so future agents do not rely on stale chat context.


## Smart Funnel ownership boundary
- Public Smart Funnel traffic must be bound to a server-created tenant funnel token; never accept a client-supplied user ID as proof of ownership.
- Funnel capacity remains governed by SolutionPurchase entitlement reservation/completion, even though the public visitor is unauthenticated.


## Smart Inbox provider boundary
- Smart Inbox may expose and meter real tenant-owned outbound email/WhatsApp execution without implying full omnichannel coverage.
- The standalone Smart Inbox contract remains `PROVIDER_REQUIRED` until inbound email, Facebook Messenger and Instagram DM adapters and tenant routing are connected and verified.
- Provider gaps must be closed at the execution boundary; changing catalogue status alone is prohibited.


## C6 STUDIO
- Preserve the existing C6 Creator Suite main surface; develop C6 STUDIO in an isolated product subtree/branch until runtime verification is complete.
- Keep generation providers server-side. Browser clients must not hold provider API credentials.
- Treat provider availability as a separate state from implementation existence.
- Use FFmpeg as the initial verified mix/export boundary; add Ardour only through a tested adapter/session contract.


## 2026-10-02 — Trading products are workloads, not Control Centre modules

C6 trading EAs/robots are independently versioned products. The Control Centre manages catalogue, entitlement, deployment, health, evidence, suspension and kill-switch state. The execution workload stays outside the permanent control-plane UI.

## 2026-10-02 — Provider rules use versioned profiles

Challenge-provider rules are represented as versioned profiles rather than assumptions embedded in the trading strategy. A profile becomes deployable only after the exact programme and current provider terms are verified.


## 2026-10-02 — Smart Inbox normalized provider ingress
- Smart Inbox provider adapters terminate at C6-Mail-Services and forward a normalized event to the C6 website ingress; customer tenants never receive provider secrets.
- WhatsApp Cloud, Facebook Messenger and Instagram webhook events use the Meta application signature boundary before forwarding.
- Tenant routing is resolved from the provider-owned destination identifier (mailbox, WhatsApp phone-number ID, Facebook Page ID or Instagram account ID), then the active Smart Inbox entitlement is checked before persistence.
- Provider implementation is not production proof: live credentials, external webhook registration and received-message evidence remain separate gates.


## 2026-10-02 — Smart WhatsApp uses Whatomate as the provider execution layer
- Use the existing C6-registered HloniHypnotiseMe/whatomate implementation for Smart WhatsApp outbound execution instead of maintaining a duplicate direct WhatsApp provider path in the C6 application.
- C6 remains authoritative for tenant identity, entitlement, capacity, payment boundary and customer evidence. Whatomate is an execution/provider dependency, not the commercial authority.
- Only provider-accepted sends with a returned provider message identifier complete Smart WhatsApp capacity. Missing provider configuration or missing provider evidence fails closed.
- Whatomate's additional capabilities remain source-level reusable nuggets until each is separately connected, entitled and evidenced in C6.


## 2026-10-02 — Whatomate is part of the canonical C6 production runtime
- Whatomate is deployed as a self-hosted provider runtime inside the canonical C6 unified stack, with dedicated PostgreSQL/Redis persistence and Caddy HTTPS ingress.
- Smart WhatsApp C6 authority remains separate from provider runtime: C6 owns customer identity, entitlement, metering and evidence; Whatomate owns WhatsApp execution and Meta-facing webhook handling.
- Production images must be pinned by immutable digest; mutable `latest` tags are not acceptable for the production release.


## 2026-11-10 — Thuso Access product boundaries

- Product identity is **Thuso Access**; intended standalone repository is `HloniHypnotiseMe/thuso-access`. The repository is not created yet; `HloniHypnotiseMe/banking` remains source/staging only.
- Product serves SASSA beneficiaries across banks but is independent and must not imply SASSA, bank or issuer affiliation.
- First release prioritises both account visibility and lost/stolen-card assistance.
- No funds movement, no bank PIN/password/CVV/OTP collection, and no claim of card blocking/replacement without authoritative issuer confirmation.
- Reuse Whatomate for WhatsApp communication/human handoff and C6 Mail Services for transactional notifications only after tenant authorization, consent and runtime verification.
- Reuse C6 SaaS Core only through verified endpoints; its README currently documents evidence/audit/evaluation/runtime endpoints disabled pending tenant authorization.
- Prefer device-native passkeys/WebAuthn with local biometric unlock. Do not centrally store biometric templates or raw face/fingerprint data in MVP. FaceX/Luxand are not integrated; Luxand requires commercial licensing.
- Live bank account aggregation remains provider/partner-required. Demo data is synthetic and must be labelled.
