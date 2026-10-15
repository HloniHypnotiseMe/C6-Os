# C6 Content & Growth Engine — Wave 0 Repository Forensics

**Date:** 2026-10-14  
**Status:** SOURCE-REVIEWED / DESIGN-GAPS-RECORDED / NO PRODUCTION CLAIM  
**Purpose:** Reverse-engineer the desired universal content-to-revenue system from the existing C6 architecture before implementing more code.

## Executive decision

Do not create a separate blog platform, newsletter platform, SMTP runtime, CRM, or one-off C6-only content generator. Compose the existing website content model, approved content-draft workflow, C6-Os departments/evidence governance, C6 Mail Services campaign boundary, Revenue Hunter, CRM, commercial catalogue, and RemotePay where a real payment flow is required.

The desired reusable capability is a **tenant-scoped Content & Growth Engine**. The website blog is one publishing surface; newsletter, social distribution, sales enablement and product education are other outputs from a shared governed content asset. C6 is customer #1; client reuse is a design requirement, not permission to share client data or credentials.

## Repository snapshot and evidence

The following are source-level findings, not proof of a live end-to-end runtime.

### 1. C6 Group website — existing publishing and draft foundation

Repository: `HloniHypnotiseMe/C6-Group-Final-Website`  
Inspected default-branch tree SHA: `139c770439ce8eb890cd02aefefa6c1140af7b25`

Relevant paths:
- `app/src/pages/Blog.tsx`
- `app/src/pages/BlogPost.tsx`
- `app/src/data/blogPosts.ts`
- `app/src/content/blog-calendar.json`
- `app/src/content/blog/001-how-ai-is-transforming-south-african-smes.json`
- `app/src/content/blog/002-five-ways-to-use-ai-for-better-customer-engagement.json`
- `app/src/content/blog/003-popia-compliance-what-your-business-needs-to-know.json`
- `app/src/content/blog/004-the-future-of-digital-payments-in-south-africa.json`
- `scripts/validate-blog-calendar.mjs`
- `scripts/validate-blog-content.mjs`
- `scripts/validate-content-pipeline.mjs`
- `n8n-workflows/content/content-generation.json`
- `n8n-workflows/content/README.md`
- `n8n-workflows/content/schema.sql`
- `n8n-workflows/email/nurture-sequence.json`

What exists:
- Public blog index and article page render the current blog data.
- Article rendering already supports related service links with label, description, CTA label and href.
- A blog calendar and content validation scripts exist.
- The n8n content-generation export is **inactive**. It validates a topic ID, reads an approved calendar, asks configured content/SEO agents for a draft/review, assembles an article in the existing blog schema, and returns a draft.
- Its README explicitly says the workflow does not write a content file, open a PR, merge, publish or send newsletters. Contract tests validate workflow code; they do not prove a live n8n/orchestrator run.
- Existing workflow safety notes require human review and call out client isolation.
- A separate nurture workflow contains direct email-send nodes. This is a second sending path that must be assessed and either routed through C6 Mail Services or explicitly isolated/decommissioned before claiming a single mail authority. Do not activate it as-is for marketing/newsletter sending.

### 2. C6-Os — organisational routing and claim governance

Repository: `HloniHypnotiseMe/C6-Os`  
Inspected default-branch tree SHA: `11a1c4e23f6eeff6f5f98b183564edc7a9c81439`

Relevant paths:
- `agent-arsenal/registry/departments.yaml`
- `agent-arsenal/registry/claim-evidence-contract.yaml`
- `agent-arsenal/registry/c6-product-capabilities.yaml`
- `agent-arsenal/registry/capabilities.yaml`
- `agent-arsenal/workforce/c6-group/content-manager.md`
- `agent-arsenal/governance/C6-COMPANY-OPERATING-MODEL.yaml`
- `agent-arsenal/governance/C6-PRODUCT-COMPANY-ROLE-CONTRACT.yaml`

What exists:
- Departments are operating/presentation views over the universal category taxonomy; Marketing, Social Media, Designers, Developers, Finance, Small Business and Legal/Ops can contribute to a content task.
- A C6 Group AI Content Manager is already registered under Marketing. Its instructions require product/evidence inspection, content plans around customer problems, reusable assets, n8n for approved publishing, and evidence registration for material claims.
- Claim → Evidence has statuses `exists`, `works`, `verified`, `live`, `gap`; it explicitly says EXISTS is not WORKS, WORKS is not VERIFIED, VERIFIED is not LIVE.
- Customer-facing claims must resolve to product/capability records and an evidence reference. Missing evidence is a gap, not an invitation to invent proof.

Implication: add a **content workflow/capability and department-routing policy**, not a new department. Marketing is normally accountable; supporting departments are selected by content type, subject risk and evidence ownership. The content manager is an existing workforce capability to reuse.

### 3. C6 Mail Services — campaign/provider boundary exists, but newsletter governance is not proven

Repository: `HloniHypnotiseMe/C6-Mail-Services`  
Inspected default-branch tree SHA: `c5a98556076ac559fe0f1e9b5b20e4ee1b67f74d`

Relevant paths:
- `api/v1/marketing.py`
- `models/campaign.py`
- `providers/billionmail.py`
- `providers/mailflare.py`
- `services/mail.py`
- `services/events.py`
- `tests/test_mail.py`

What exists at source level:
- Marketing API functions create campaigns, send campaigns and retrieve campaign stats through a BillionMail provider.
- Campaign models define draft/scheduled/sending/completed/paused/failed states.
- BillionMail adapter exposes campaign, subscriber and stats operations and an inbound IMAP-to-Smart-Inbox forwarding path.
- Mailflare provider adapter is present.

Gaps to prove before newsletter production:
- tenant ownership and tenant-safe campaign/list/template access;
- consent provenance and audience eligibility at send time;
- unsubscribe processing and global/tenant/product suppression enforcement;
- idempotency and duplicate-send protection;
- approval/audit trail and schedule/time-zone behavior;
- provider response/webhook reconciliation and bounce/complaint handling;
- test coverage for campaign lifecycle and authorization;
- real provider credentials, delivery, event receipt and mailbox evidence.

A campaign API is not proof of compliant newsletter capability or successful delivery. C6 Mail Services remains the intended delivery authority; do not add a second SMTP path.

### 4. Creator Suite — repository exists, content surface not confirmed

Repository: `HloniHypnotiseMe/C6-Creator-Suite`  
Repository metadata confirms a private repository with default branch `main`; the current tree returned no matching blog/content/newsletter paths under the inspected filename filter. This is **not** proof that no such code exists; its tree needs a dedicated full inspection if it becomes the chosen publishing surface.

Decision: the existing C6 Group website is the first proving surface because its blog and draft pipeline are directly discoverable in the current repo. Do not assume the Creator Suite is the canonical blog host without additional evidence.

### 5. Revenue and commercial connections

- C6 Group backend contains a Revenue Hunter route/engine and C6 Mail adapter; earlier source review established that outbound execution is deliberately bounded by C6 Mail and explicit approval.
- The website contains a commercial offer engine and customer evidence/outcome services.
- Before implementing CTA attribution, inspect the authoritative commercial catalogue and CRM schemas and establish stable IDs. Do not hard-code prices into article bodies or invent an analytics store.
- RemotePay should only be attached where the actual customer journey needs payment. A CTA click, lead, checkout, payment confirmation and settlement are distinct events.

## Target architecture

```text
Tenant / Brand
  └── Product or Service
       └── Audience + customer problem + approved evidence
            └── Content opportunity / brief
                 └── C6-Os department router
                      ├── Marketing / Content Manager (accountable)
                      ├── SEO / Research (as needed)
                      ├── Product / Developers (technical accuracy)
                      ├── Designers / Social Media (format and distribution)
                      ├── Finance or Legal/Ops (risk-triggered review)
                      └── Customer-facing owner approval
                           └── Canonical Content Asset
                                ├── Website article
                                ├── Newsletter edition
                                ├── Social adaptations
                                ├── Sales enablement
                                └── Product/service CTA
                                     └── Lead / CRM / Revenue Hunter
                                          └── Outcome evidence
                                               └── Next content opportunity
```

## Canonical Content Asset — proposed contract, not yet implemented

Required identity and tenancy:
- `content_id`, `tenant_id`, `brand_id`, `website_id`
- stable `product_id` and/or `service_id`
- `owner_department`, `supporting_departments[]`, `responsible_agent_id`

Editorial intent:
- `content_type` (guide, FAQ, tutorial, case study, comparison, experiment, product update, newsletter edition, etc.)
- `topic`, `customer_problem`, `audience_segment`, `search_intent`, `campaign_id`
- `source_refs[]`, `claim_refs[]`, `evidence_refs[]`
- `status`, `created_at`, `updated_at`, `reviewed_by`, `approved_by`, `approved_at`

Distribution:
- `canonical_url`, `channel_variants[]`, `scheduled_at`, `published_at`
- `related_content_ids[]`, `cta_refs[]`, `measurement_refs[]`

Rules:
- Every asset belongs to exactly one tenant and brand context unless a separately approved shared asset is explicitly modelled.
- Product/service references resolve to an authoritative catalogue; current offer and price are resolved at render/send time, not copied into static articles.
- Claims have evidence status; unsupported measurable results, testimonials, integrations, prices and guarantees block publication or are rewritten as clearly labelled hypotheses/questions.
- A draft can be generated automatically; public publishing and promotional sends remain gated by policy and authorization.
- Channel variants derive from the same approved source asset and retain traceability to it.

## Newsletter and consent invariants

Before any production newsletter send:
1. Store subscriber identity with tenant/brand/list scope and consent source, timestamp, purpose and status.
2. Validate audience membership and consent immediately before send, not only when the list was first created.
3. Enforce unsubscribe and suppression at the authoritative C6 Mail boundary; honour unsubscribe promptly and propagate the event to relevant tenant/product audiences.
4. Keep operational/service messages distinct from marketing newsletters and promotional nurture.
5. Require approval, an auditable campaign/version snapshot, idempotency and a defined send window.
6. Record provider acceptance separately from delivery, bounce, complaint, open, click, reply and unsubscribe events. Do not treat opens as reliable proof of interest.
7. Keep tenant credentials, subscribers, content and performance data isolated. A client must never be able to choose another tenant, repository, audience, list, credential or CTA catalogue by submitting arbitrary IDs.

## Gap register (current source evidence)

| ID | Gap / risk | Priority | Evidence needed to close |
|---|---|---|---|
| G0-01 | Canonical content schema not established across article, newsletter and other variants | P0 | Approved schema and validation tests; stable IDs |
| G0-02 | Tenant/brand/product ownership contract not proven end-to-end | P0 | Authorization tests and cross-tenant negative tests |
| G0-03 | Newsletter consent/unsubscribe/suppression gate not demonstrated at send boundary | P0 | Source implementation + tests proving allowed and blocked recipients |
| G0-04 | Existing nurture workflow uses direct email-send nodes rather than established C6 Mail adapter | P0 | Inventory all send paths; migrate or disable non-authoritative marketing paths; tests |
| G0-05 | Content workflow is inactive and only returns a draft; live runtime unproven | P1 | Private n8n/orchestrator execution evidence and error-path tests |
| G0-06 | Article-to-product/service relationship is based on approved route strings, not yet a universal stable catalogue contract | P1 | Catalogue IDs, route resolution and unknown/stale CTA tests |
| G0-07 | Blog publication mechanism is a code/content data workflow; no proven safe content-store publishing API | P1 | Decide Git-backed PR publication vs database/CMS; prove rollback/versioning |
| G0-08 | Campaign API/provider adapter lifecycle and authorization are not proven by the inspected test inventory | P1 | Campaign lifecycle, auth, idempotency and provider-mock tests |
| G0-09 | Content performance → CTA → lead → opportunity → customer attribution is not proven as a connected chain | P1 | Correlation IDs/events and end-to-end tests |
| G0-10 | Pricing slider/CTA proposal has no verified binding to authoritative offer/payment contract | P1 | Offer resolver, entitlement/quote contract and payment tests |
| G0-11 | Existing blog calendar/content schemas and the proposed universal asset schema may drift | P1 | Mapping/adapter plus contract tests; migrate only after compatibility is proven |
| G0-12 | Client deployment/reuse and data retention/export boundaries need an explicit tenant lifecycle | P1 | Tenant onboarding/offboarding, access, deletion/export and retention contract |

## Build sequence — reverse-engineered from the desired live outcome

### Wave 0 — Forensics and contract (this record)
Inventory existing implementations and evidence. Identify the real authority for each state. No feature implementation until duplicate systems and safety gates are clear.

### Wave 1 — Canonical contracts and fail-closed tests
- Define the Content Asset schema and mappings to existing blog JSON.
- Define tenant/brand/product/service/department/evidence/CTA references.
- Add schema and invalid-reference tests; ensure tenant identity comes from authenticated context, never arbitrary request payload.
- Define lifecycle state machine and idempotency keys for content generation, publication and campaign creation.

### Wave 2 — Department routing and editorial workflow
- Reuse Marketing/Content Manager and department registry.
- Add routing rules and risk-triggered reviewer requirements.
- Draft → evidence/claim validation → SEO review → department review → owner approval.
- Keep external workflow inactive until runtime and credential gates pass.

### Wave 3 — Website publishing and product graph
- Use the current C6 blog as the first surface.
- Connect article assets to stable product/service catalogue IDs and approved offer references.
- Generate related articles/service links from explicit relationships; test missing and stale destinations.
- Publish through versioned, reviewable change with rollback; no silent autonomous deploys.

### Wave 4 — Newsletter integration through C6 Mail Services
- Reuse existing campaign/provider boundary.
- Add/verify consent, unsubscribe, suppression, tenant authorization, approval, idempotency, send scheduling and event reconciliation.
- Convert an approved content asset into a newsletter variant; send only to an eligible audience.
- Prove provider and mailbox evidence before claiming live delivery.

### Wave 5 — CTA, CRM and Revenue Hunter attribution
- Stable CTA/product/offer references and campaign/content correlation IDs.
- Capture CTA click, lead creation, qualification, opportunity, payment and customer outcome as distinct events.
- Join only through authorized, tenant-scoped identifiers; no sensitive subscriber/lead data in public URLs.

### Wave 6 — Measurement and learning
- Reconcile website and mail events with CRM/outcome evidence.
- Prioritize future topics from actual questions, content gaps and measured outcomes.
- Treat opens/clicks as signals, not proof of revenue causation.

### Wave 7 — Client productization
- Tenant-safe onboarding for brand, website, catalogue, audience, consent, evidence, departments, policies and channels.
- Separate tenant credentials and reviewer/approval policies.
- Prove cross-tenant isolation, export/deletion, and auditability before offering broadly.

## Acceptance tests required before calling this production-ready

- Content schema accepts a valid article/newsletter variant and rejects missing IDs, invalid statuses and unsupported CTA references.
- Cross-tenant read/write, publish, audience selection, campaign send and metrics requests are denied.
- Unsupported numerical claims, fake testimonials, stale prices and unapproved product claims cannot pass the publication gate.
- Article links resolve only to active approved product/service destinations.
- Repeated workflow calls do not create duplicate content versions, campaigns or sends.
- Unsubscribed, unconsented, bounced, complained and suppressed recipients are blocked at send time.
- Failed provider send can be safely retried without duplicate campaign delivery; provider acceptance is recorded distinctly from delivery.
- Owner approval is required for public content and promotional send where configured.
- Content-to-CTA-to-lead correlation survives newsletter/social variants without leaking personal data.
- CI validates contracts; live deployment/provider status is separately evidenced.

## Decisions locked by this forensic pass

1. Reuse existing C6 website blog and draft pipeline as the first proving surface.
2. Reuse C6-Os departments and the registered Content Manager; do not add a new department.
3. C6 Mail Services is the only intended newsletter delivery authority.
4. The canonical content asset and tenant/CTA relationships are proposed contracts until implemented and tested.
5. Keep automated generation, public publishing and promotional sending as separate permissions and gates.
6. No fabricated case studies, performance figures, customer stories, prices or capability claims.
7. C6 is the first tenant; client support must use the same system with strict isolation.
8. This document proves source inspection and architectural decisions only; it does not claim that live n8n, newsletter delivery, CRM attribution or production client isolation works.


## Wave 0 follow-up verification — 2026-10-15

This follow-up inspected the actual workflow JSON, SQL schema, campaign routes/provider adapter, mail API authorization and current PR workflow status. These details refine the initial gap register.

### Confirmed implementation gaps

**Content persistence is not a canonical asset store.** The website's `n8n-workflows/content/schema.sql` defines `content_usage` and `content_generations`, both keyed by `business_id`; it does not define the proposed tenant/brand/product/service/evidence/distribution contract. The content workflow assembles a draft in memory and returns it. Its README explicitly says it does not persist a content file, open a PR, merge or publish. Therefore the SQL archive must not be mistaken for the canonical content registry.

**Marketing campaign endpoints have no visible authorization dependency.** In `C6-Mail-Services/api/v1/marketing.py`, the create, send and stats routes inject the BillionMail provider but do not depend on the `authorize` guard used by `api/v1/mail.py`. The handlers accept caller-supplied `template_id`, `list_ids` and `campaign_id`, then pass them directly to the provider. The inspected `Campaign` and `Subscriber` Pydantic models do not themselves enforce tenant ownership or consent. This is a production-blocking authorization/isolation gap unless a separately verified upstream boundary protects these routes; none was established by this source inspection. Do not expose or use these routes for client campaigns until the boundary and negative tests are proven.

**Consent/unsubscribe/suppression is not implemented in the inspected send path.** The campaign send endpoint directly calls `provider.send_campaign(campaign_id)`; no recipient eligibility check, consent record lookup, unsubscribe/suppression gate, approval check or idempotency key is visible in that route. The provider adapter includes `add_subscriber`, but the inspected call only sends email/name to a list and does not carry consent provenance. No results were returned for targeted source search on unsubscribe/suppression/consent, so the accurate statement is that these controls were not found/proven in the inspected repository paths—not that no implementation could exist anywhere.

**A second direct-SMTP path exists in the codebase.** The C6 website's `n8n-workflows/email/nurture-sequence.json` contains two `n8n-nodes-base.emailSend` nodes after generating promotional copy. It does not call C6 Mail Services in this export, and the shown workflow does not establish consent, unsubscribe, suppression, owner approval or tenant binding. The content README already says the draft workflow is inactive; this is a distinct workflow and its activation state/runtime must be checked independently. Keep it disabled for promotional use until it is migrated behind the governed mail boundary or formally retired.

**Mail API authorization is configuration-sensitive.** `api/v1/mail.py` returns 503 if `MAIL_API_KEY` is absent and 401 for a bad key when configured. However, `C6-Mail-Services/README.md` describes `MAIL_API_KEY` as optional. Production deployment must require the key or establish a verified private-network service-auth boundary; a healthy SMTP configuration alone does not establish safe public exposure.

### Existing blog mapping and current verification boundary

- `app/src/data/blogPosts.ts` loads JSON content and exposes only entries with `status === "published"`; the article's service links remain route-shaped (`href`) rather than stable product/service IDs.
- The approved calendar contains eight queued C6 topics, with source facts and allowed service routes. This is a useful seed backlog, not evidence that an automated publishing schedule is running.
- `scripts/validate-content-pipeline.mjs` exercises exported workflow node code and schema contracts; it explicitly asserts that the workflow is inactive. This is valuable contract coverage but not a live n8n/orchestrator execution or newsletter delivery test.
- The inspected C6 Mail Services tests cover mail API-key behavior, provider mocking and inbound webhook normalization; they do not cover marketing-route authorization, campaign tenant isolation, consent, unsubscribe, suppression, approval, idempotency or campaign delivery lifecycle.

### CI evidence recorded 2026-10-15

GitHub reported a completed **failed** C6 QA Certification Run for C6-Os commit `ec3d690c08fc8c8c531e971cbc75d25a80b5c992` (run ID `38589924130`, run number 48). The available run-job response only exposes the `certification` job as failed and provides no step details/log URL, so the failure cause cannot responsibly be inferred. This run is not a pass, and it does not establish that the documentation change caused the failure. Investigate the failed certification job before treating the branch as green.

### Updated release gates

1. Add authorization to every marketing campaign route, derive tenant identity from authenticated context, and verify template/list/campaign ownership before provider calls.
2. Make consent provenance, unsubscribe and suppression enforceable at the send boundary, with fail-closed tests for both permitted and blocked recipients.
3. Require campaign approval and idempotent send/retry semantics; reconcile provider events without conflating accepted with delivered.
4. Resolve the mail API README/config mismatch and prove the actual network/auth boundary in production configuration.
5. Replace route-only service links with a compatibility mapping to authoritative product/service IDs before cross-tenant reuse.
6. Inspect/fix the failed C6-Os certification run with its actual job logs; do not claim CI green until a new successful run is visible.
7. Keep all newsletter sending and the direct-send nurture workflow inactive until these gates are verified.


## Wave 1 safety mitigation started — 2026-10-15

A separate implementation PR has been opened in `HloniHypnotiseMe/C6-Mail-Services`:

- PR #10: https://github.com/HloniHypnotiseMe/C6-Mail-Services/pull/10
- Branch: `fix/marketing-campaigns-fail-closed-2026-10-15`
- Latest commit at time of recording: `24f4a23e125ba6d22a5638ccb90f7722ac14c777`

Changes in that PR:
- All three marketing campaign routes (create, send, stats) now require the configured `X-C6-Mail-Key`; absent configuration returns 503 and a wrong/missing key returns 401.
- Even after successful authentication, all three campaign routes return 503 until tenant ownership, recipient consent, unsubscribe/suppression, approval and idempotent-send controls are implemented. No BillionMail provider call is made by these endpoints.
- Added tests for missing configuration, invalid/missing authentication and authenticated-but-disabled behavior.
- Updated deployment documentation to describe the required API key and intentional campaign block.

This is a **containment fix**, not the completed newsletter implementation: it prevents use of the currently ungoverned campaign endpoints rather than pretending the missing consent/tenant model already exists. It does not migrate the separate website n8n nurture workflow, whose direct-send nodes still require a separate inventory/disable-or-migrate decision.

Verification status: source and test changes were fetched back from the feature branch for inspection. No workflow run was returned for the latest commit in the queried PR-triggered workflow list; therefore the tests have **not** been claimed as executed or passing. PR #10 was open at creation and must remain unmerged until its diff, CI/test results, and compatibility effects are reviewed. Keep marketing sends disabled meanwhile.


Follow-up CI update (2026-10-15, after PR #10 creation): C6 Mail Services CI run #73 for head commit `24f4a23e125ba6d22a5638ccb90f7722ac14c777` completed with conclusion **failure**; the `test` job failed. The job-log endpoint returned a missing-blob error, so the failing step and cause are not available through this retrieval path. Do not mark the patch as passing or merge it based on this evidence. PR #10 remains an open review item: https://github.com/HloniHypnotiseMe/C6-Mail-Services/pull/10. Next action is to obtain the actual Actions failure output or run the repository's documented CI command (`pip install -r requirements.txt`, `python -m compileall .`, `PYTHONPATH=. pytest -q`) in a working checkout, fix the specific failure, and verify a successful run before merge.
