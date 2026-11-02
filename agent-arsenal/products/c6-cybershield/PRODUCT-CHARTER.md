# C6 CyberShield — Product Charter

**Status:** proposed product / foundation work in progress  
**Business owner:** C6 Group  
**Product line:** Cybersecurity and managed security services  
**First commercial product:** C6 Website & Domain Security Assessment  
**Source of truth:** this charter plus the C6 capability/evidence registries  
**Production status:** NOT LIVE

## 1. Mission

Protect C6-controlled infrastructure first, then offer evidence-backed website and domain security assessments to South African businesses.

The product must convert technical findings into understandable, prioritised remediation actions. It must not sell fear, invent vulnerabilities, or present a superficial score as a security certification.

## 2. Initial customer outcome

A customer submits a domain they own or are authorised to assess. C6 verifies control of that domain, performs a bounded, non-destructive external assessment, and produces a dated report containing:

- DNS and domain configuration observations.
- TLS certificate validity, expiry, protocol and chain observations.
- HTTPS redirect behaviour.
- HTTP security-header observations.
- Publicly observable mail-authentication posture (SPF, DKIM selector(s) supplied or discovered within defined limits, DMARC).
- Publicly reachable service observations only where explicitly included and safely rate-limited.
- Finding severity, evidence, affected asset, confidence, business impact, and recommended remediation.
- Assessment timestamp, scanner version, scope, limitations and retest history.

A report describes the tested surface and time. It is not a guarantee that a site is secure, a penetration test, a compliance certification, or proof that no vulnerabilities exist.

## 3. Product phases

### Phase 0 — Internal security baseline

Protect C6-owned systems before commercial launch. Establish an asset inventory, owner, exposure, access boundary, backup/restore evidence, patch status, monitoring, incident contact and evidence record for each system. Start with the Contabo VPS, Caddy, BillionMail, C6 Mail Services, C6 Group, RemotePay and domain/DNS control.

### Phase 1 — Website & Domain Security Assessment (MVP)

Deliver a verified domain-ownership workflow and safe passive assessment. MVP checks are DNS, TLS, HTTPS, response headers, redirect configuration and mail-authentication records. Findings are reproducible and evidence-backed. No exploit attempts, brute force, credential attacks, destructive tests or broad network scans.

### Phase 2 — Scheduled monitoring

Customer-authorised scheduled reassessment, change detection, certificate/DNS expiry alerts, finding lifecycle, notifications and audit history.

### Phase 3 — Managed vulnerability workflow

Add authenticated scanning only for explicitly authorised assets and separately approved scope. Use established, pinned scanners behind isolated workers, with per-tenant quotas and approval gates.

### Phase 4 — Managed detection / response partnerships

Only after staffing, 24/7 escalation, incident handling, legal terms, telemetry retention, response SLAs and tested operating procedures exist. Do not market a SOC/MDR service before then.

## 4. Customer and internal trust boundaries

- Tenant data, assets, scan jobs, reports and credentials must be isolated.
- Domain ownership must be proven before any scan is queued.
- Customer authorisation and scope must be recorded, versioned and auditable.
- Scanner workers must not access C6 control-plane secrets or internal networks.
- The public API must never accept arbitrary URLs/IPs without strict validation.
- Every redirect and DNS resolution must be revalidated to prevent SSRF and DNS-rebinding paths.
- Deny loopback, private, link-local, multicast, reserved and cloud metadata destinations for IPv4 and IPv6.
- Apply strict timeouts, response-size limits, concurrency limits, per-tenant quotas and global circuit breakers.
- No scanning of third-party assets without documented authority.
- Secrets are runtime-injected and never stored in Git or returned in reports.

## 5. Commercial model — hypotheses, not approved pricing

Potential tiers to validate with customers:

- **Snapshot:** one-off domain assessment and report.
- **Monitor:** scheduled reassessments, change alerts and report history.
- **Business:** multiple domains, team access, remediation tracking and priority support.
- **Managed:** human-reviewed assessments and remediation coordination.

Pricing, service levels, retention periods and POPIA contractual terms remain undecided and must be validated before checkout is enabled. RemotePay remains the payment and settlement source of truth.

## 6. Non-goals for MVP

- Antivirus or endpoint detection.
- Exploit-based penetration testing.
- Credential stuffing, brute force or password spraying.
- Unbounded port scanning or internet-wide scanning.
- Malware detonation.
- 24/7 SOC/MDR claims.
- Compliance certification or a guarantee of security.
- Automated changes to customer DNS, websites or infrastructure.

## 7. Definition of done

The MVP is not complete until:

1. Domain ownership verification is tested, including expired/revoked verification.
2. SSRF and DNS-rebinding protections are tested for IPv4 and IPv6.
3. Scope, authorisation and tenant isolation tests pass.
4. Passive checks have deterministic fixtures and integration tests.
5. Findings contain raw evidence and reproducible timestamps.
6. Rate limits, quotas, timeouts and response-size caps are enforced.
7. Reports clearly state limitations and do not overclaim.
8. Security review and abuse-case review pass.
9. Deployment uses immutable dependency pins, health checks, least privilege and rollback.
10. Internal C6 systems are assessed before the public product is enabled.

## 8. Evidence semantics

- EXISTS: code/configuration is present.
- WORKS: a controlled test demonstrates execution.
- VERIFIED: test/runtime evidence supports the specific claim.
- LIVE: production routing and runtime have been directly verified.

This charter establishes product intent only. It does not claim any scanner or customer service is operational.
