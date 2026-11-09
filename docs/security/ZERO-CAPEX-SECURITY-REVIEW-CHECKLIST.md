# C6 Zero-CAPEX Security Review Checklist

Status: IN PROGRESS. This is an internal verification aid, not an independent audit or security certification.

## Rules

- Test only an isolated staging environment and assets the company controls.
- Use disposable test accounts, synthetic records and non-production credentials.
- Never paste passwords, API tokens, JWTs, MFA seeds, recovery codes, private keys or customer data into GitHub issues, chat or scan reports.
- Do not run brute force, exploit payloads, destructive tests, arbitrary-port scans or scans against third-party systems.
- Capture the repository, exact commit SHA, environment, date/time, expected result, actual result and redacted evidence for every test.
- A green automated scan is not proof that a system is secure. Triage every finding and record false positives with a reason.

## Automated review — engineering team

- [ ] Gitleaks Git-history scan completed; findings reviewed and any exposed credentials revoked/rotated.
- [ ] Semgrep security-audit scan completed; Critical/High findings triaged.
- [ ] Trivy filesystem scan completed; Critical/High dependency, secret and misconfiguration findings triaged.
- [ ] Reports retained as private GitHub Actions artifacts.
- [ ] Dependency findings checked against the actual lockfile and reachable runtime paths.
- [ ] Each accepted finding has an owner, severity, evidence, fix commit and retest result.
- [ ] Exact commit SHA and workflow run URL recorded.
- [ ] No automated result described as an independent penetration test.

## Human checklist A — canonical identity, tenant isolation, recovery and MFA

Use two separate test tenants (Tenant A and Tenant B), with one owner/admin and one ordinary member in each. Use synthetic records only.

- [ ] Tenant A member can access only Tenant A resources.
- [ ] Tenant A cannot read, update or delete Tenant B evidence by changing an ID or tenant identifier.
- [ ] Ordinary member cannot perform owner/admin-only actions.
- [ ] Disabled user, disabled tenant, expired session and revoked session are denied.
- [ ] Logout invalidates the session; replaying the old token is denied.
- [ ] Login and recovery abuse controls return bounded 429 responses without revealing whether an account exists.
- [ ] Password reset token expires, works once only, and revokes existing sessions after successful reset.
- [ ] Password reset does not return raw tokens in API responses or logs.
- [ ] MFA enrollment requires the intended enrollment flow; password-only login cannot bypass mandatory MFA.
- [ ] An accepted TOTP cannot be replayed in the same time-step.
- [ ] Each recovery code works once only; a second use is rejected.
- [ ] MFA key is held outside source control and backed up/rotated under an approved custody procedure.
- [ ] Invitation token expires, can be revoked/rotated, and cannot be accepted twice.
- [ ] Invitation delivery and recipient identity are confirmed through the approved out-of-band process.

Record: test tenant IDs (non-sensitive), test case, expected/actual status, UTC timestamp and redacted screenshot or response.

## Human checklist B — C6 CyberShield authorization boundary

Use only a domain controlled by C6 or the user and a DNS record deliberately created for this test.

- [ ] A challenge for the exact domain succeeds only after the correct TXT record is published.
- [ ] Wrong TXT value, expired challenge and rotated old challenge are rejected.
- [ ] A different domain or unauthorized subdomain cannot reuse the proof.
- [ ] Revoking domain authorization invalidates outstanding scan authorizations.
- [ ] Scan authorization is explicit, purpose-bound, short-lived and consumable only once.
- [ ] Missing entitlement blocks authorization.
- [ ] The current API continues to report worker unavailable; no customer scan is attempted.
- [ ] No redirects, crawling, arbitrary ports, authentication attempts or exploit tests are performed.
- [ ] No scan is run until an isolated worker and independently enforced egress controls exist.

## Human checklist C — Agent-OS local server

Run only on the intended test machine.

- [ ] Local loopback access to the intended endpoint behaves as documented.
- [ ] The service does not listen on a public or LAN interface.
- [ ] A connection attempt from a second machine on the LAN is refused.
- [ ] Responses do not emit wildcard CORS (Access-Control-Allow-Origin: *).
- [ ] No remote exposure is enabled before canonical C6 identity integration and review.

## Human checklist D — staging and operational controls

- [ ] Staging is isolated from production databases, queues, mail and payment providers.
- [ ] Database backup completed and restore successfully rehearsed.
- [ ] Secrets are stored outside repositories and access is limited.
- [ ] MFA encryption key and JWT signing key are distinct; custody and rotation owners are recorded.
- [ ] Firewall exposes only explicitly required ports.
- [ ] Logs redact credentials, tokens, recovery codes and personal data.
- [ ] Alerts exist for repeated authentication failures, privilege changes and security-control failures.
- [ ] Rollback procedure has been rehearsed.

## Finding record template

For each finding record:

- ID:
- Repository / PR:
- Exact commit SHA:
- Environment:
- Component / endpoint:
- Severity: Critical / High / Medium / Low / Informational
- Evidence (redacted):
- Reproduction steps:
- Expected result:
- Actual result:
- Impact:
- Recommended correction:
- Owner:
- Fix commit:
- Retest result:
- Status: Open / Accepted risk / Fixed awaiting retest / Closed

## Release decision

- [ ] No unresolved Critical findings.
- [ ] High findings fixed or explicitly accepted in writing by the accountable owner with compensating controls and expiry date.
- [ ] Identity and tenant-isolation human tests passed.
- [ ] Staging backup/restore and rollback evidence exists.
- [ ] CyberShield worker, queue, quotas, kill switch and egress isolation independently verified before any customer scan feature is enabled.
- [ ] Independent reviewer has examined the exact release commit and issued a written report, or the release explicitly remains without independent assurance.

**Do not mark this programme complete solely because the automated workflows pass.**
