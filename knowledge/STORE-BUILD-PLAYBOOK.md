# Reusable Store Build Playbook

**Purpose:** Build the next small-business storefront from a proven C6 pattern instead of rediscovering architecture, operations and launch checks. This is a reusable blueprint, not a claim that every store needs every feature.

**Source case:** Wear Your Art (WYA), November 2026. WYA supplied real implementation and production-test lessons. Keep the business-specific values in the target store's own configuration; never copy WYA credentials, customer data, catalogue, prices or branding.

## 1. Start with the business contract (one-page intake)

Capture only decisions that change the build:
- Store name, domain, legal/business owner and operational admins.
- Product types, approved catalogue source, variants, SKU rules, prices and tax treatment.
- Stock authority: opening quantities, who can adjust stock, low-stock behaviour and physical reconciliation owner.
- Fulfilment: pickup locations, courier/carrier, delivery pricing, tracking and delivery exceptions.
- Payment method and authority: provider/manual reconciliation, proof required, refund/chargeback handling. Do not imply online payment is live unless a real payment has been accepted and reconciled.
- Customer support, returns/refunds, privacy/POPIA, terms and required customer communications.
- Launch scope: what is enabled now, what is explicitly disabled, and who approves launch.

Unknown values remain UNKNOWN; do not invent them or block the whole build for optional features.

## 2. Reuse audit before coding

Follow C6 START-HERE. Inspect the C6 estate and the target repo:
- Reuse C6 VPS, DNS/Cloudflare, Caddy, Docker, PostgreSQL, auth, mail, payment and workflow services where they fit.
- Inspect source, migrations, tests, deployment scripts and operational docs—not just README or registry labels.
- Select the smallest sufficient storefront, admin, inventory, payment and fulfilment components.
- Record REUSE / ADAPT / NEW / OUT-OF-SCOPE with source paths and proof.
- Do not create a second payment, mail, identity or deployment authority without a documented reason.

## 3. Canonical catalogue and inventory

Create one versioned, reviewable product manifest before importing:
- approved product/design IDs and image paths;
- product category and publication state;
- variants (size/colour/etc.), unique SKU, price and active flag;
- opening stock and source/evidence for each quantity;
- explicit exclusions and review-required items.

Generate the customer gallery, SKU register and import payload from that manifest. Validate counts and duplicates before import. Make imports idempotent: rerunning must not duplicate SKUs, opening stock or stock movements. Verify imported totals against the manifest and physically reconcile stock with the stock owner before accepting paid orders.

## 4. Build the minimum complete store

Implement only the agreed launch scope:
- public catalogue and product detail;
- cart and customer checkout;
- pickup/delivery selection with required address/tracking fields;
- order confirmation and customer reference;
- admin dashboard with role-scoped order, stock and payment operations;
- clear disabled/not-yet-available states for unfinished features.

Use a feature flag to keep public order intake OFF until launch approval. Do not expose hidden or incomplete products as purchasable.

## 5. Business invariants (must be enforced server-side)

- Order creation validates active SKU, price and available stock; reserve/decrement stock atomically.
- Idempotency prevents duplicate orders on retries/double-clicks.
- Order status transitions are explicit and invalid transitions fail closed.
- Cancellation restores stock exactly once; repeat cancellation cannot double-restock.
- A cancelled order cannot receive a new payment record or payment verification.
- Pending payment must be rejected before cancellation; verified payment requires refund handling before cancellation.
- Payment evidence notes are not proof of settlement. Only the authoritative provider/bank reconciliation can establish paid/settled.
- Paxi dispatch requires a tracking reference; pickup completion has its own valid path.
- Every material stock, order, payment and refund action is audited with actor and reason.
- UI actions must mirror backend eligibility; never show an action the API will reject for the current record state.

## 6. Verification ladder

Run the smallest complete suite, then expand only for real gaps:
1. Static checks/build and unit tests.
2. API contract tests for catalogue, stock, order, status, cancellation, payment, refund and roles.
3. Database-backed concurrency/idempotency tests (not silently skipped).
4. Browser E2E: product -> cart -> checkout -> confirmation -> admin visibility.
5. Fulfilment E2E: pickup and courier/tracking branches.
6. Payment E2E with a safe provider sandbox/test payment; never claim paid from a manual note.
7. Negative tests: cancelled order payment, duplicate submit, insufficient stock, invalid transition, unauthorized role, duplicate webhook and provider failure.
8. Production smoke tests and external confirmation.

Report BUILT / PROVEN / MISSING / OVERLOOKED / BLOCKED / NEXT WIN. Mark skipped, manual and unknown checks honestly.

## 7. Safe production release

- Confirm clean source revision and repeatable deployment procedure.
- Back up database and verify an isolated restore before relying on it.
- Keep secrets out of terminal output, logs, screenshots, shell history and Git. Never paste full `docker compose config` output where it expands secrets.
- Restrict database/cache ports to localhost/private network; expose only required public ports.
- Verify DNS, TLS, health/readiness, persistent volumes, log rotation, monitoring and alert path.
- Keep public order intake disabled during deployment and smoke tests.
- Enable intake only after owner approval; run one controlled test order with no real payment, verify admin visibility and cancellation/restock, then disable intake again if launch is not approved.
- Record rollback revision and exact rollback steps.

## 8. Owner handover and daily operations

Generate the handover from current evidence, not an old template copied forward:
- live URLs and named owner/admin roles;
- product/variant/stock counts and physical reconciliation status;
- actual payment state and reconciliation procedure;
- pickup/courier costs, tracking and fulfilment responsibilities;
- customer policies/support contacts;
- what is LIVE, what is merely BUILT/WORKS/VERIFIED, and all blockers;
- backup/restore, monitoring, incident and rollback instructions;
- daily orders, payment settlement, refunds, stock adjustments and fulfilment checklist.

Owner signs acceptance only after a real walkthrough and open issues are acknowledged.

## 9. WYA lessons to carry into every next store

- **Find the canonical instructions first.** WYA-specific files were not in the VPS path assumed during the handover; the governing C6 START-HERE was in GitHub C6-Os. Search the repository and its tree before asking the operator to hunt manually.
- **Keep handover current.** The old WYA handover contradicted the actual catalogue, inventory, online order and payment state. Generate handover from verified runtime facts and mark stale documents.
- **Test the UI and API together.** Backend correctly rejected payment creation for a cancelled order, but the dashboard still displayed “Record payment”. Add state-aware UI actions and a browser regression test for cancelled orders.
- **Treat stock imports as financial controls.** WYA required 564 active SKUs and 5,640 units; the manifest/import process and post-import database totals prevented silent catalogue/stock drift. Physical stock still needs human reconciliation.
- **Do not call a skipped test a pass.** WYA's PostgreSQL concurrency test was skipped without a dedicated test DB. Every store template must provision an isolated DB test target or retain that gate as BLOCKED.
- **Test a real customer journey safely.** WYA's controlled pickup order proved public order creation, dashboard visibility, cancellation and stock restoration; no payment was taken and intake was turned back OFF. Repeat this controlled pattern per store.
- **Separate payment record from settlement.** A manual payment entry is pending reconciliation, not evidence of money received. Keep verification/refund and provider confirmation as explicit controls.
- **Protect secrets during operations.** A configuration inspection exposed credentials in terminal output; rotate exposed secrets and avoid commands that print resolved secrets. Keep backups containing old secrets root-only and never restore them blindly.
- **Do not imply courier/payment automation.** A configured Paxi field or payment button is not proof of end-to-end carrier/payment integration. Require real external evidence.
- **Prefer one command at a time for operator runbooks.** Keep commands short, read-only first, and avoid fragile multiline shell blocks that can corrupt an interactive terminal.

## 10. Reusable project acceptance record

For each new store, copy this section into its project handover and fill it with evidence:

| Gate | Status | Evidence / owner |
|---|---|---|
| Business contract approved | UNKNOWN | |
| C6 reuse/source audit complete | UNKNOWN | |
| Catalogue manifest approved | UNKNOWN | |
| SKU/stock import reconciled | UNKNOWN | |
| Public checkout E2E | UNKNOWN | |
| Admin roles and order lifecycle | UNKNOWN | |
| Cancellation/restock idempotency | UNKNOWN | |
| Payment/refund/settlement evidence | UNKNOWN | |
| Pickup and courier paths | UNKNOWN | |
| Security/secrets/ports review | UNKNOWN | |
| Backup and isolated restore | UNKNOWN | |
| Monitoring/rollback | UNKNOWN | |
| Policies and customer support | UNKNOWN | |
| Owner walkthrough/sign-off | UNKNOWN | |
| C6 knowledge registered | UNKNOWN | |

**Definition of done:** implementation + appropriate tests + production evidence + owner handover + reusable knowledge registered. A storefront that loads is not, by itself, a launched store.
