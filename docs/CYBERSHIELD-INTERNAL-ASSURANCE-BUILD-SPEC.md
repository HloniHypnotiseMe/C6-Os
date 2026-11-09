# C6 CyberShield — Internal Assurance Build Specification

**Status:** IMPLEMENTATION SPECIFICATION — NOT A LIVE MONITORING SERVICE  
**Owner:** C6 CyberShield / C6-Os Agent Arsenal  
**Primary implementation surfaces:** C6-Os governance and orchestration; C6 Group application scanner and control centre; C6 SaaS Core identity, policy and evidence; VPS observability stack.  
**Upstream agent source:** `HloniHypnotiseMe/agency-agents` (MIT-licensed upstream snapshot; use selected agents, do not fork or duplicate the whole roster).

## 1. Decision

CyberShield has two connected but separately authorised operating modes:

1. **C6 Internal Assurance** — continuously assesses C6-owned repositories, CI, applications, domains and infrastructure.
2. **CyberShield Customer Security** — customer-facing security assessment of explicitly authorised customer assets.

They share reusable detection and evidence components, but never share authority implicitly. Internal access does not grant customer access; customer consent does not grant access to C6 infrastructure. Internal assurance is the first delivery target. Customer scanning remains disabled until canonical tenant identity, isolated workers, egress enforcement, durable evidence, privacy review and launch approval are proven.

CyberShield is the assurance control plane and evidence aggregator, not a replacement for GitHub Actions, test frameworks, host monitoring, the C6 identity plane or the Agent Arsenal. It invokes approved tools and registered capabilities, records their evidence, and evaluates release gates.

## 2. Reuse the Agency Agents — do not invent a second roster

The public Agency Agents repository contains more than 230 specialist agents and supports multiple coding tools. C6 must select and govern a small role-based team from the existing source files. Agent definitions are specialist instructions/personas; they are **not** proof that a scanner, CI runner, SIEM, monitor or remediation executor is installed or operational.

### Initial CyberShield team

| Role in CyberShield | Existing Agency agent | Source path | Responsibility |
|---|---|---|---|
| Security design authority | Security Architect | `security/security-architect.md` | Threat model, trust boundaries, control requirements, risk acceptance recommendation |
| Application security | Application Security Engineer | `security/security-appsec-engineer.md` | SAST/DAST policy, code review, dependency and application findings |
| Submission guard | Senior SecOps Engineer | `security/security-senior-secops.md` | Secret and sensitive-data checks, auth/session/header/CORS/rate-limit review |
| Credential response | Secrets & Credential Hygiene Engineer | `security/security-secrets-credential-engineer.md` | Secret exposure triage, revoke/rotate plan, prevention and leak-response evidence |
| Release certification | Reality Checker | `testing/testing-reality-checker.md` | Independent evidence review; defaults to NEEDS WORK; cannot self-approve own implementation |
| API and contract tests | API Tester | `testing/testing-api-tester.md` | API, authz, integration, negative-path and contract test plans/results |
| Browser regression | Test Automation Engineer | `testing/testing-test-automation-engineer.md` | Deterministic Playwright/Cypress journeys, trace artifacts, flake control |
| Reliability and SLOs | SRE | `engineering/engineering-sre.md` | SLIs/SLOs, alert thresholds, observability, incident and recovery drills |
| CI/CD and deployment | DevOps Automator | `engineering/engineering-devops-automator.md` | CI gates, deployment automation, rollback and monitoring wiring |
| Host operations | Infrastructure Maintainer | `support/support-infrastructure-maintainer.md` | VPS, containers, capacity, backups, restore and host health |

Optional specialists are selected per work item, not permanently activated: Threat Detection Engineer, Incident Responder, Cloud Security Architect, Compliance Auditor, Privacy Engineer, Database Reliability Engineer, Performance Benchmarker, Evidence Collector and Test Results Analyzer.

**Provenance:** agent names and paths above were checked against the current `main` README and fetched agent source files on 2026-11-09. Before invoking any role, pin the exact upstream commit and record the file hash/version used. The upstream roster can change.

### Orchestration rules

- The C6 Agent Arsenal remains the authority for capability resolution, provider selection, risk classification, permissions, approvals and audit evidence.
- Map each Agency role to an existing C6 capability/provider/skill/workflow before creating a new agent record.
- Use the smallest sufficient execution layer: skill for a reusable procedure; agent for specialist judgment; workflow for ordered repeatable work; team only where independent roles are required.
- Do not install all 230+ agents into every runtime. Select a bounded subset appropriate to that runtime and its agent-count limits.
- Agency agent text can recommend commands; it cannot grant itself shell, repository, network, production, customer-data or remediation permissions.
- A separate tool runner executes scanners and tests. Agents analyse outputs and propose/route actions. Tool execution is attributable, scoped, time-bounded and evidence-producing.
- Independent certification is assigned to Reality Checker after implementers and tool runners finish. It must not rely solely on another agent's summary.

## 3. Capability architecture

### A. Repository and software supply-chain assurance

Required checks, selected according to repository language and risk:

- Secret detection on changed files and repository history where authorised; never print secret values into logs, reports, PR comments or chat.
- SAST and secure-code rules; dependency/SBOM and vulnerability audit; licence policy where configured.
- IaC, Dockerfile, Compose, workflow and configuration scanning.
- Build, unit, integration, API contract, migration, frontend and browser E2E tests.
- Branch protection / required checks / workflow provenance and artifact retention.
- Changed-file risk mapping and test selection, with a full scheduled sweep to catch drift.

Use the existing GitHub Actions and repository-native toolchains first. Do not introduce a parallel CI platform merely to duplicate checks. Record scanner name/version, ruleset, target commit, start/end time, exit status, finding IDs and immutable artifact references.

### B. Application and domain assurance

- Reuse C6 Group CyberShield passive scanner implementation in PR #79; do not create a second scanner.
- Reuse the existing DNS-control challenge, exact-domain scope and one-time authorisation design.
- Keep scanning passive-only: no exploit attempts, brute force, credential attacks, crawling, arbitrary ports or destructive tests.
- Enforce public-address checks, DNS pinning, no redirects, bounded response handling and hard deadlines at both application and network egress layers.
- Internal checks may assess C6-owned endpoints only after asset inventory and ownership/authority are recorded.
- Customer scan execution stays disabled until the customer launch gates in section 8 are met.

### C. Infrastructure and service observability

Monitor the canonical VPS and services using existing host/container/system sources before adding dependencies:

- Host: CPU, memory, disk/inodes, load, network, filesystem and reboot state.
- Containers: desired/running state, restart loops, health checks, resource pressure and image provenance.
- Public services: DNS resolution, TLS validity/expiry, HTTP readiness, latency and availability.
- Data services: PostgreSQL reachability, connection saturation, backup freshness and restore-test evidence; Redis health where deployed.
- Mail and payment boundaries: provider connectivity and authenticated synthetic checks that do not send unsolicited messages or move money.
- Security posture: firewall/SSH exposure, unexpected listeners, privileged containers, stale packages and certificate/config drift.

Do not expose PostgreSQL, Redis, Docker socket, internal dashboards or control-plane endpoints publicly for monitoring convenience. Use least-privilege read-only collectors and private authenticated transport.

### D. Incident, remediation and verification

Every alert becomes a tracked finding with:
- stable ID, source, target, exact commit/asset, first/last seen;
- severity and confidence, affected boundary, exploitability/impact rationale;
- evidence references and scanner/test version;
- owner, status, due date, remediation recommendation and approval requirement;
- remediation commit/change reference and independent retest evidence.

Permitted states: `OPEN`, `TRIAGED`, `APPROVAL_REQUIRED`, `IN_PROGRESS`, `FIXED_UNVERIFIED`, `VERIFIED_FIXED`, `ACCEPTED_RISK`, `FALSE_POSITIVE`, `REOPENED`.

Removing a finding from source is not sufficient for a secret leak: the credential owner must revoke/rotate at the provider, check usage, and verify the old credential no longer works. The secret value must never be copied into the finding.

## 4. Control-plane boundaries

- **C6-Os / Agent Arsenal:** capability catalogue, provider resolution, agent selection, policy, risk classification and workflow orchestration.
- **C6 Group:** CyberShield application APIs, internal assurance product surface, scan adapters and Control Centre presentation.
- **C6 SaaS Core:** canonical identity, tenant membership, scoped authorisation, policy decisions and evidence contracts. Do not route customer evidence through unverified generic APIs.
- **GitHub Actions:** repository-native execution of build, test, SAST, secret, dependency and release checks.
- **VPS observability:** host/container/service telemetry and alert delivery.
- **RemotePay:** only the existing authoritative payment boundary if/when CyberShield packages are commercially activated; monitoring must never mutate payment state.

No new shared database or alternate identity service is introduced without a source-level gap analysis and an approved architecture decision.

## 5. Evidence contract

Every check emits a versioned record with at least:

```json
{
  "schema_version": "1.0",
  "check_id": "stable-check-id",
  "check_type": "secret|sast|dependency|test|api|e2e|tls|uptime|host|backup|restore",
  "target": {"repository": "owner/repo", "commit": "full-sha"},
  "tool": {"name": "tool-name", "version": "pinned-version", "ruleset": "ruleset-id"},
  "started_at": "RFC3339 timestamp",
  "completed_at": "RFC3339 timestamp",
  "status": "PASS|FAIL|WARN|SKIPPED|ERROR",
  "findings": [],
  "artifact_refs": [],
  "runner_identity": "authenticated-service-identity",
  "policy_version": "policy-id"
}
```

This is a contract example, not an implemented API schema. Production records must be validated, access-controlled, tenant/asset scoped, integrity protected and retained under an approved schedule. Never include secret values, raw credentials, unnecessary personal data or unrestricted logs.

Evidence must be reproducible from the referenced target commit and tool/ruleset version. A green summary without source artifacts, logs or signed/provider-backed evidence is not a PASS.

## 6. Release gate model

A release candidate is evaluated across these independent gates:

1. **Source integrity:** exact commit, clean provenance, protected branch and required workflow checks.
2. **Security:** no unaccepted Critical/High findings; secrets gate clean; authz/tenant boundary tests pass; scanner exceptions are explicit and expiring.
3. **Quality:** required unit/integration/API/contract/migration/frontend/E2E suites pass; flaky/skipped tests are visible, not silently green.
4. **Operations:** health/readiness, resource thresholds, TLS/DNS, backup freshness and restore evidence meet service policy.
5. **Change safety:** migration review, backup/restore plan, deployment plan, rollback plan and blast-radius assessment.
6. **Independent certification:** Reality Checker reviews raw evidence and returns PASS / NEEDS WORK / BLOCKED with reasons.
7. **Human release authority:** designated owner explicitly approves production changes. Agents cannot approve their own production deployment, secret revocation, firewall change, destructive migration or customer-facing scan.

Any missing, stale, skipped, failed or unverifiable mandatory check blocks release. A warning is not silently promoted to pass.

## 7. Alert severity and response

- **Critical:** active compromise, exposed live credential, unauthorised data access, public internal control-plane/data port, confirmed exploitable critical vulnerability. Immediate human escalation; contain only through pre-approved safe controls.
- **High:** material auth/tenant isolation failure, exploitable high vulnerability, backup/restore failure for critical data, sustained production outage. Blocks release and pages owner.
- **Medium:** degraded SLO, expiring certificate, moderate vulnerability, missing coverage or backup freshness approaching policy. Ticket and deadline.
- **Low:** hygiene, non-blocking drift or improvement.
- **Unknown:** insufficient evidence; never a pass.

Notification routing must be tested end-to-end. Do not claim monitoring is operational merely because an alert rule or workflow file exists.

## 8. Ordered implementation waves

### Wave 0 — Inventory and agent activation contract
- Inventory repositories, domains, VPS services, production endpoints, CI workflows, data stores, backups and owners.
- Inspect the exact Agency agent files; pin upstream revision and record hashes.
- Map each selected agent to existing Arsenal capability/provider/skill/workflow and risk policy.
- Record tool availability and execution location. Distinguish installed, configured, executed and verified.

**Acceptance:** complete inventory with owners and unknowns; no duplicate agents; each role has a bounded job and permissions.

### Wave 1 — Repository release assurance (first executable delivery)
- Add/reconcile required GitHub Actions checks on the target C6 repositories.
- Run secret scanning without leaking values, dependency/SBOM audit, SAST, IaC/config checks, unit/integration tests, type/build checks and migration validation.
- Add an evidence bundle keyed to exact commit and workflow run.
- Use Security Architect/AppSec/Senior SecOps to interpret findings; Reality Checker independently certifies.

**Acceptance:** a controlled test PR proves every required check runs, blocks on a seeded non-secret test fixture or safe mock finding, produces redacted artifacts, and returns to green after remediation. No live secret is seeded.

### Wave 2 — API and browser test army
- Map critical user and money journeys across C6 Group, RemotePay, Whatomate and Wear Your Art.
- Add API authn/authz, tenant isolation, idempotency, webhook replay, timeout/retry, migration and negative-path tests.
- Add deterministic E2E for login, customer journey, checkout/payment test mode, campaign consent/suppression and operational admin.
- Store traces/screenshots/logs with the run and exact commit.

**Acceptance:** critical paths have named coverage, repeatable test data, no secrets in artifacts and stable repeat runs. Coverage percentage alone is not an acceptance criterion.

### Wave 3 — VPS and service watchtower
- Confirm actual deployed stack and service inventory before selecting collectors.
- Add authenticated host/container/service checks and TLS/DNS/HTTP probes.
- Verify alert delivery using controlled test alerts.
- Add backup freshness monitoring and a scheduled restore rehearsal with isolated restore target.

**Acceptance:** measured telemetry, tested alert delivery, and a successful restore with recorded duration, integrity checks and owner sign-off.

### Wave 4 — Internal CyberShield dashboard and finding lifecycle
- Connect evidence records to the authorised internal identity and C6 Control Centre.
- Add finding deduplication, ownership, triage, status, SLA, remediation links, retest and audit history.
- Show last successful run, stale data, skipped checks and coverage gaps prominently.

**Acceptance:** a real finding flows from detection through remediation to independent verified closure; dashboard never infers live state from static configuration.

### Wave 5 — Customer product readiness (separate release)
Requires all of: canonical SaaS Core identity and tenant isolation; independently reviewed worker isolation and network egress enforcement; durable queue, quotas, cancellation and global kill switch; secured evidence/report lifecycle; domain authority/consent policy; privacy/POPIA retention and deletion review; incident/support ownership; independent security review; staging deployment, migration and restore proof. Until then customer scan execution remains unavailable.

## 9. Initial target estate and priority order

Start with C6's own critical boundaries and existing evidence, not a broad scan of everything:

1. C6-Os Agent Arsenal policy/router and CyberShield foundation.
2. C6 Group application, authentication, payments/webhooks and CyberShield PR #79 scanner path.
3. C6 SaaS Core identity, tenant and evidence APIs.
4. RemotePay payment/webhook boundary.
5. Whatomate integration and consent/suppression path.
6. Wear Your Art public web/API deployment.
7. VPS host, Caddy, Docker, PostgreSQL, Redis, mail and backup/restore paths — only components confirmed present.

The exact active production inventory must be established before probing or declaring coverage.

## 10. Non-negotiable safety rules

- Read-only by default. Active security validation only on verified owned assets, explicit scope, isolated egress, bounded deadlines and recorded approval.
- No credential stuffing, brute force, exploit execution, destructive tests, arbitrary ports or third-party scans.
- No automatic secret revocation, production deployment, firewall/SSH modification, data deletion, destructive migration or payment action.
- No customer evidence until canonical identity and tenant authorisation are independently verified.
- No secret values in chat, tickets, CI logs, screenshots or evidence payloads.
- No agent is trusted solely because its prompt says it is a specialist. Tool output, source, permissions and test evidence decide.
- Never claim LIVE, MONITORED, SECURE, VERIFIED or PRODUCTION-READY without current runtime evidence.

## 11. Definition of done

**Internal Assurance v1 is DONE only when** the repository release gate, critical API/E2E suite, VPS/service telemetry, tested alerts, backup/restore evidence, finding lifecycle and independent release certification are all running against the actual C6 estate with evidence tied to exact versions.

**CyberShield Customer Security is a separate launch and cannot inherit Internal Assurance approval.**

## 12. Source references inspected for this specification

- Agency Agents repository: https://github.com/HloniHypnotiseMe/agency-agents
- Agent roster: `README.md` on `main` (Testing and Security divisions inspected 2026-11-09).
- Selected source files: the ten paths listed in section 2; source contents inspected 2026-11-09.
- C6-Os mandatory build protocol: `START-HERE.md` on the CyberShield foundation branch.
- C6 CyberShield governance: PR #25, `build/c6-cybershield-foundation-20261102`.
- C6 Group passive scanner: PR #79. Its PR evidence explicitly says no execution route, worker, queue, egress firewall, durable report store or production deployment is yet established.
