# C6 CyberShield — MVP Implementation Plan

## Target

Deliver a safe, evidence-backed passive website/domain security assessment as the first paid C6 CyberShield product, after establishing an internal security baseline.

## System boundary

- **Product experience:** C6 Group website/account and report UI.
- **Existing backend candidate:** `C6-Group-Final-Website/c6group-backend`; inspect current branch and architecture before implementation.
- **Scanner engine:** isolated, least-privilege worker/service. Do not execute customer-supplied code or run arbitrary shell commands in the API process.
- **Control plane:** C6 SaaS Core exists as a private C6-owned repository. Direct repository access confirmed its current `main` HEAD as `82f40406797fa0d4f3b11c95420d89a2fc4b4c38`; the connected installed-repository search omitted it, and the C6-Os registry pin (`02679b209e58e7be2d9b79665fd4cfd6e8a2286d`) is stale. Its README and source expose tenant context, runtime authorization/kill-switch, audit and evidence contracts. Do not duplicate these controls. Before product integration, inspect the current authentication and tenant-isolation guarantees, update the C6-Os repository pin, and verify the control-plane integration in staging.
- **Automation:** C6-controlled n8n only for notifications and scheduled jobs; scan authorization and findings remain in the application database.
- **Mail:** C6 Mail Services owns outbound mail.
- **Payments:** RemotePay owns payment state and settlement. Do not activate checkout until product entitlements and refund/chargeback handling are specified.

## MVP scan workflow

1. Customer signs in and submits a fully qualified domain.
2. Application normalizes the domain and rejects IP literals, local names and malformed input.
3. Customer proves control using a random, single-use DNS TXT challenge (preferred) or an HTML file challenge.
4. Verification record binds tenant, normalized domain, challenge hash, expiry, verification method and evidence timestamp.
5. Customer accepts explicit scan scope and authorisation terms.
6. API creates a queued scan job; it does not perform network requests inline.
7. Isolated worker resolves the target and validates every A/AAAA result against IPv4/IPv6 special-use ranges.
8. Worker performs bounded passive checks only:
   - DNS A/AAAA/CNAME/NS/MX/TXT observations.
   - SPF and DMARC syntax/posture checks.
   - TLS certificate validity, hostname, chain and expiry.
   - HTTPS availability and HTTP-to-HTTPS redirect.
   - Selected response security headers.
   - Cookie flags only when observed in the HTTP response.
9. Worker stores raw evidence, normalized findings, check version, timestamps, duration and limitations.
10. Report is generated from stored evidence; a report is immutable and versioned.
11. Customer can request a retest. Previous reports remain available for comparison.

## Mandatory scanner safety controls

- Domain ownership proof required before scan.
- Every DNS lookup and redirect is revalidated.
- Deny loopback, private, link-local, multicast, reserved, unspecified and metadata IP ranges for IPv4 and IPv6.
- Defend against DNS rebinding by binding the validated resolution to the outbound connection where technically supported; do not validate one resolution and then allow the HTTP client to resolve again unchecked.
- Restrict schemes to HTTP/HTTPS and ports to 80/443 for MVP.
- Redirect count <= 3; redirect destination must remain in the verified domain boundary unless separately verified.
- Connection timeout <= 5 seconds; total request timeout <= 10 seconds per check.
- Response body cap <= 1 MiB; do not download or execute page assets.
- Per-host and per-tenant concurrency limits; global worker concurrency cap.
- Retry policy bounded; no aggressive retries.
- No port scanning, exploit payloads, brute force, authentication bypass, crawling, file downloads or POST/PUT/DELETE requests.
- Egress firewall denies private/internal ranges independently of application validation.
- No worker access to Docker socket, cloud metadata, internal databases or deployment credentials.
- Structured audit event for every verification, scope change, scan start, scan completion, report access and cancellation.
- Kill switch to stop new scans and terminate queued work.

## Data model candidates

- `tenant_assets`: tenant, normalized domain, verification state, ownership evidence reference, created/verified/expiry timestamps.
- `domain_challenges`: asset, challenge hash, method, expiry, consumed timestamp.
- `scan_authorizations`: tenant, asset, scope, terms version, actor, accepted timestamp.
- `scan_jobs`: asset, tenant, status, requested by, scope snapshot, worker version, queued/started/finished timestamps.
- `scan_observations`: scan, check ID/version, target, raw evidence JSON, observed timestamp.
- `findings`: scan, stable finding key, severity, confidence, evidence reference, remediation, status.
- `reports`: scan, immutable report JSON, generated timestamp, report version.
- `audit_events`: actor, tenant, action, resource, timestamp, correlation ID, outcome.

Use the existing database and migration conventions only after confirming the actual current backend source of truth. Avoid introducing a second tenant/identity system.

## Test gates

### Domain verification
- Valid DNS TXT challenge passes.
- Wrong token, expired token, replayed token and wrong tenant fail.
- Domain ownership revoked/expired blocks new scans.
- IDN/punycode and trailing-dot normalization tests.

### SSRF / network boundary
- IPv4 loopback/private/link-local/multicast/reserved/metadata denied.
- IPv6 loopback/ULA/link-local/multicast/unspecified/mapped-private denied.
- Mixed public/private DNS answer denied.
- DNS rebinding and resolution changes denied.
- Redirect to private IP, localhost, metadata endpoint or unverified domain denied.
- Unsupported schemes, ports and IP literals denied.

### Abuse resistance
- Timeouts, response cap, redirect cap and concurrency cap enforced.
- Per-tenant quotas and global kill switch tested.
- Cancellation and worker crash recovery tested.
- No credentials, cookies or sensitive page contents stored unnecessarily.

### Findings/report
- Fixture-based DNS/TLS/header checks deterministic.
- Missing evidence produces UNKNOWN, not PASS.
- Every finding cites observation evidence.
- Severity and confidence are distinct fields.
- Report states scope, version, timestamp and limitations.
- No score is described as a certification.

### Integration
- Tenant isolation, authz, audit, job queue and report access tests.
- Mail notifications go through C6 Mail Services.
- Payment entitlement checks consume verified RemotePay state only.
- CI build/tests pass; staging smoke test passes before any production launch.

## Launch gates

- Internal C6 asset baseline completed and high-risk findings triaged.
- Threat model reviewed.
- External security review of SSRF and scanner isolation.
- Dependency versions pinned and vulnerability policy defined.
- Data retention and deletion policy approved.
- POPIA privacy notice, operator terms, authorisation and acceptable-use terms reviewed by qualified counsel.
- Incident response and support ownership defined.
- Staging verification and rollback evidence attached.

## Work sequence

1. Complete internal VPS and application baseline.
2. Reconcile the stale C6 SaaS Core registry pin, inspect its current auth/tenant guarantees, and verify the control-plane integration contract in staging.
3. Inspect the current C6 Group backend and existing business audit/report patterns.
4. Implement domain verification and scan-job authorization.
5. Implement isolated passive scanner checks with SSRF protections.
6. Implement evidence store and report renderer.
7. Integrate customer UI and notifications.
8. Add entitlements and RemotePay checkout after security and legal gates.
9. Run independent security review and staging tests.
10. Launch limited paid pilot only after all gates pass.

## Release rule

No production customer scan or paid security claim is enabled by this plan. The MVP remains NOT LIVE until the launch gates above have evidence.
