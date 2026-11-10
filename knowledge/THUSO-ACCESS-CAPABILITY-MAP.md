# THUSO ACCESS — C6 CAPABILITY MAP

**Product:** Thuso Access  
**Purpose:** Independent, bank-neutral financial-access and beneficiary-protection platform for SASSA beneficiaries.  
**Relationship:** Not SASSA, a bank, card issuer, payment switch, or government service. No endorsement or affiliation is implied.  
**Status:** DEDICATED PRIVATE REPOSITORY CREATED; FOUNDATION IMPORTED. No live bank integration, biometric authentication, WhatsApp integration, or production deployment is claimed.

## 1. Product repository and source provenance

- Standalone product repository: `HloniHypnotiseMe/thuso-access` (private; created 10 November 2026).
- Source/staging repository: `HloniHypnotiseMe/banking`.
- Source branch: `feat/sassa-access-foundation`.
- Source PR: https://github.com/HloniHypnotiseMe/banking/pull/1 (draft; not merged).
- The source is an MIT-licensed Next.js 14 / React 18 / TypeScript banking dashboard fork.
- The first foundation wave added five files only: implementation plan, security/integration boundaries, provider adapter contract, provider-neutral banking types, and synthetic ZAR demo data. It did not alter or remove the existing source files.
- The standalone repository was created by the repository owner and verified through GitHub. The first five foundation files were copied into it with brand text updated from SASSA ACCESS to Thuso Access. The source PR remains open as provenance; it is not the product's primary repository.

## 2. Capability decisions

### Reuse / compose from C6

| Source | Capability selected | Intended Thuso use | Boundary / status |
|---|---|---|---|
| `C6-Os` | Agent Arsenal, repository discovery, evidence-first build protocol | Capability resolution, build governance, evidence and reusable knowledge | Governance capability; not beneficiary runtime |
| `c6-saas-core` | Multi-tenant SaaS, identity/access, authorization patterns, audit, kill-switch concepts | Candidate shared identity and control-plane integration | Reuse only after endpoint-level review. README explicitly documents multiple evidence, audit, evaluation and runtime endpoints disabled (HTTP 503) pending authenticated tenant authorization |
| `C6-Mail-Services` | Central transactional mail API, signed event patterns | Security alerts, account notifications, operational email | Reuse API boundary; do not create a parallel mail sender. Its README says message contents/mailbox passwords are not stored. Production runtime and secrets still require verification |
| `whatomate` | Multi-tenant WhatsApp, granular roles, realtime chat, templates, conversation flows, human transfer, webhooks, queues/workers, audit and analytics | Guided lost-card support, beneficiary service enquiries, safe human escalation, approved notifications | Provider-facing communications only. C6/product backend owns beneficiary identity, consent, case authority and evidence. Not integrated into Thuso yet |
| C6 self-hosted deployment estate | Docker, PostgreSQL, Redis, Caddy, VPS deployment patterns | Product hosting, durable records, queue/cache and HTTPS ingress | Reuse patterns; verify exact production topology, secrets, backups, restore and health before LIVE |
| RemotePay | No beneficiary financial capability selected | None in MVP | Deliberately excluded: this product must not move grant funds, collect funds, or imply authority over beneficiary bank accounts |

### Reuse from the banking source repository

- Dashboard shell, responsive navigation and account/transaction presentation patterns.
- Existing account/transaction domain concepts as design references only.
- Provider-neutral TypeScript contracts added in the foundation branch.
- Clearly labelled synthetic ZAR demo records.

These are source patterns, not proof of live bank connectivity or verified balances.

## 3. Capabilities deliberately left behind

| Source capability / assumption | Decision | Why |
|---|---|---|
| Plaid sandbox / US institution aggregation | REJECT for South African live use | US-specific provider, country and account assumptions; no verified South African coverage contract |
| Dwolla customer/funding-source/transfer flow | REJECT for MVP | US-specific money movement and USD assumptions; Thuso is not a payment switch |
| SSN collection and US address/state/postal fields | REMOVE from product design | Not appropriate for South African beneficiary identity; never relabel SSN as SA ID |
| Hard-coded Plaid sandbox tokens/sample credentials | EXCLUDE and rotate/revoke if active | Secrets/test tokens must not enter product code or production |
| Browser/client-held provider access tokens | REJECT | Provider credentials and sensitive bank access must remain server-side behind least-privilege secret boundaries |
| US-dollar/en-US formatting | ADAPT | Display ZAR and locale-appropriate dates/numbers without implying a particular bank |
| Existing transfer/payment UX | DISABLE | No grant transfer, payout, debit order, payment initiation or fund movement in MVP |
| Banking source Appwrite/Plaid/Dwolla auth/data model | DO NOT inherit by default | Requires a fresh South African identity, consent, tenant, security and provider-boundary design |

## 4. Biometrics and authentication decision

Source-level discovery found:

- `HloniHypnotiseMe/facex`: Apache-2.0 repository describing a browser/WebAssembly face pipeline including detection, recognition and passive anti-spoofing. This is a candidate technology source, not a validated beneficiary identity service.
- `HloniHypnotiseMe/FaceSDK-documentation`: Luxand FaceSDK documentation describes face matching and liveness. It is a commercial SDK; documentation does not grant a deployment licence. Vendor licensing and terms must be confirmed.

**MVP decision:** do not centrally collect or store face images, fingerprint data, facial embeddings or biometric templates. Prefer platform-native biometric unlock through passkeys/WebAuthn where supported; biometric matching remains on the user's device and the service receives cryptographic authentication proof, not raw biometric data. Offer accessible non-biometric recovery paths. Do not make biometric availability a condition of receiving support or accessing grant information.

FaceX and Luxand are **NOT INTEGRATED**. Any later biometric proof-of-concept requires a separate privacy impact assessment, POPIA/legal review, security threat model, independent bias/accuracy/liveness testing, licensing review, informed consent and a human fallback.

## 5. First-release product boundaries

Priorities agreed:
1. Account visibility across beneficiaries' banks.
2. Lost/stolen-card protection and guided assistance.

Account visibility:
- Live balances/transactions require a verified South African bank/provider agreement, documented API contract, explicit informed consent, revocation, secure token storage, freshness timestamps, reconciliation and source attribution.
- Until a bank/provider integration is verified, show synthetic demo data only with a persistent DEMO label, or securely imported statements with provenance and clear date range. Never imply a demo balance is real.
- No bank PIN, online banking password, CVV or OTP collection.

Lost-card support:
- Provide verified issuer-specific contact routes and a guided checklist.
- A case may be recorded and tracked, but the platform must never claim a card is blocked, frozen or replaced unless the issuer/provider returns authoritative confirmation.
- Do not store full card numbers, CVVs, PINs or OTPs.
- Human escalation and accessible alternatives are required.

## 6. Security, privacy and regulatory gates

- South African POPIA advice and a product-specific privacy impact assessment before processing personal/financial information.
- Determine applicable FSCA, National Payment System, bank-partner and consumer-protection obligations with qualified South African counsel/regulatory specialists before live bank-data or financial services.
- Consent must be purpose-specific, revocable and recorded; minimise fields and retention.
- Encrypt in transit and at rest; separate secrets from app data; enforce tenant isolation and least privilege.
- Strong authentication, session/device controls, rate limits, abuse monitoring, tamper-evident audit and breach response.
- Provider contracts, data-processing agreements, security review, sandbox/UAT, incident contacts and operational SLAs.
- No SASSA branding, official affiliation or endorsement claims without written authorisation.

## 7. Capability status — no inflation

| Capability | Status |
|---|---|
| Product scope, security boundaries, provider-neutral types, synthetic ZAR demo data | EXISTS in source branch |
| Dashboard/account presentation source patterns | EXISTS in source repo |
| Thuso-specific dashboard implementation | NOT BUILT |
| Whatomate Thuso adapter and WhatsApp case workflow | NOT BUILT / PROVIDER CANDIDATE |
| C6 Mail Services Thuso integration | NOT BUILT / API CANDIDATE |
| C6 SaaS Core production identity/authorization integration | NOT VERIFIED for this product |
| South African live bank aggregation | NOT AVAILABLE / PARTNER REQUIRED |
| Issuer-confirmed card blocking/replacement | NOT AVAILABLE / ISSUER REQUIRED |
| Passkey/WebAuthn authentication | NOT BUILT |
| FaceX/Luxand biometric integration | DELIBERATELY NOT USED |
| Production deployment and runtime | NOT BUILT / NOT LIVE |
| Build/tests for source foundation | NOT RUN in recorded foundation wave |

## 8. Next execution sequence

1. Preserve source PR #1 and MIT attribution while using the standalone Thuso Access repository as the product home.
2. Continue importing only audited UI components; do not copy Plaid/Dwolla/SSN/US money-movement paths.
3. Establish South African beneficiary identity, consent, passkey and recovery flows.
4. Build accessible account overview and clearly marked demo/statement-import states.
5. Build lost-card guided support, verified issuer directory and auditable case workflow.
6. Add Whatomate adapter and C6 Mail notifications behind server-side consent, authorization and evidence controls.
7. Add bank-provider adapters only after partner API documentation and agreements exist.
8. Run unit, integration, accessibility, security, dependency, build and deployment checks. Record exact evidence.
9. Update C6-Os and Agent-OS memory before marking each wave complete.

## 9. Repository extraction record

SOURCE REPO: `HloniHypnotiseMe/banking`  
SOURCE COMPONENT: Next.js banking dashboard and five-file SASSA ACCESS foundation branch  
CAPABILITY TAKEN: dashboard/account presentation patterns, provider-neutral contracts and synthetic ZAR demo records  
WHY IT IS NEEDED: accelerate a bank-neutral South African beneficiary experience without inheriting US provider assumptions  
DEPENDENCIES TAKEN: none approved for extraction yet; dependency closure must be reviewed in the standalone repo  
LICENCE: MIT source repository; retain licence and notices  
C6 ADAPTATION: South African product boundaries, provider-neutral interfaces, demo-only records, security/privacy controls  
FILES IMPORTED: README.md, START-HERE.md, docs/IMPLEMENTATION-PLAN.md, docs/SECURITY-AND-INTEGRATION-BOUNDARIES.md, docs/PROVIDER-ADAPTER-CONTRACT.md, lib/providers/banking/types.ts, lib/providers/banking/demo-data.ts  
FILES DELIBERATELY NOT IMPORTED: Plaid/Dwolla live paths, US SSN/address forms, hard-coded sandbox tokens, USD transfers  
TEST / PROOF: destination repo existence verified; seven product foundation files created on main and commit SHAs recorded; no build/tests run  
