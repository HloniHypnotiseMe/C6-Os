# C6 CyberShield — Security Capability Register

**Audit date:** 2026-11-02  
**Scope:** connected GitHub repositories under `HloniHypnotiseMe` plus the currently surfaced C6 VPS/deployment context.  
**Method:** repository inventory, source-file inspection and targeted code search. This is not a full line-by-line penetration test or live infrastructure audit.

## Status key

- **EXISTS:** source/configuration is present.
- **WORKS:** execution has been demonstrated.
- **VERIFIED:** reproducible test/runtime evidence supports the claim.
- **LIVE:** production runtime and routing have been directly checked.
- **GAP:** no supporting implementation/evidence was found in the inspected scope.
- **RISK:** an inspected implementation has a security weakness or unsafe assumption.

## Findings

| System | Observed capability | Evidence | Status / limitation |
|---|---|---|---|
| C6 Group backend | Helmet, CORS, JSON body limit, global express-rate-limit, health/readiness endpoints | `C6-Group-Final-Website/c6group-backend/src/server.ts` | EXISTS. Global limit is 1,000 requests / 15 minutes; not a tailored abuse policy. Runtime status not revalidated in this audit. |
| C6 Group backend | JWT verification, active-user lookup, role authorization | `c6group-backend/src/middleware/auth.ts` | EXISTS. Prior inspected version includes a development-only fallback secret for non-production. Production requires `JWT_SECRET`. Must review refresh-token rotation, revocation and cookie/token handling separately. |
| C6 Group AI catalogue | Security Scanner and SSL Checker entries | `app/src/data/aiTools.ts` | EXISTS as catalogue entries only. No scanning engine was found behind these entries in the inspected routes. |
| C6 Group seed data | Security Audit Helper description | `c6group-backend/prisma/seed.ts` | EXISTS as seeded metadata only. Not proof of an executing audit service. |
| RemotePay | Fraud alert workflow checks high-value pending transactions every 15 minutes, calls an orchestrator and emails an administrator | `RemotePay-/n8n-workflows/fraud/fraud-alert.json` | EXISTS. Workflow JSON alone does not prove it is imported, enabled, connected or effective. It is not a general fraud detection platform. |
| RemotePay | Production security gate explicitly lists auth, authorization, rate limits, audit logs, secret management, environment separation, monitoring and recovery | `RemotePay-/docs/REMOTE_PAY_PRODUCTION_VERIFICATION_GATE.md` | EXISTS as a documented gate. The document says these items remain required before live-money launch. |
| Agent-OS | Authentication/permissions/session stub | `Agent-OS/security/auth.py` | RISK. `authenticate()` ignores the supplied token and returns true when the user ID exists. Session IDs use integer seconds and in-memory storage. Do not use for production auth. |
| C6 deployment | BillionMail env template contains `FAIL2BAN_INIT=y` | C6 deployment configuration inspected previously | EXISTS as configuration intent. Does not prove Fail2ban is active or correctly protecting the host. |
| C6 Mail Services | API key option, internal-only Compose network design, secrets supplied at runtime | `C6-Mail-Services/README.md` | EXISTS as documented architecture. Runtime and auth enforcement need direct verification. |
| MzansiEdgeTunnel | Encrypted tunnelling/proxy project | Repository exists in GitHub inventory | EXISTS as a project. No product-grade security control or independent cryptographic review established by this audit. |
| C6-Os | Security capabilities already registered: application security, security architecture, authorised security testing and security operations | `agent-arsenal/registry/capabilities.yaml` | EXISTS as capability catalogue entries. They are not proof of an installed scanner or operating security team. |

## Important repository discovery

The C6-Os Agent Arsenal already registers these capabilities:

- `application_security`
- `security_architecture`
- `authorized_security_testing`
- `security_operations`
- `ai_generated_code_security)
- `malware_analysis`
- `vulnerability_research_reverse`

The registry is a capability catalogue. The inspected provider list does not establish a ready-to-run commercial website vulnerability scanner. Do not create duplicate capabilities merely to give the product a new name.

The Agent-OS README describes a production-grade autonomous OS, but its current security authentication module is explicitly a stub. The README's maturity claims must not be treated as security evidence.

## Confirmed gaps from this inspection

1. No functioning C6-owned passive domain/TLS/HTTP security scanner was located.
2. No evidence of a verified vulnerability scanning engine in C6 Group's Security Scanner catalogue entry.
3. No evidence of a production endpoint detection/response agent.
4. No evidence of a C6-operated SIEM/SOC with tested alert triage and incident response.
5. No evidence that the RemotePay fraud workflow is active in production.
6. Agent-OS's authentication stub is unsafe for production use.
7. Internal VPS security needs a fresh, evidence-based baseline and recurring verification.

## Immediate remediation priorities

1. Review Agent-OS auth stub; either replace it with a tested signed-token verifier and secure session design or keep the module disabled.
2. Inspect C6 backend auth, rate limiting, CORS, webhook signatures, error handling, audit logs, dependency health and secret exposure.
3. Verify actual UFW, Docker port publishing, SSH policy, unattended upgrades, backups and restore procedure on the Contabo VPS.
4. Verify Caddy/BillionMail/C6 Mail Services routing and service isolation before enabling public services.
5. Establish an owned asset inventory and baseline evidence.
6. Build the passive website/domain assessment MVP only after the scanner's SSRF/authorization threat model is implemented and tested.

## Explicit exclusions

This audit did not execute vulnerability scans against public targets, test customer systems, inspect every repository file, inspect all transitive dependencies, or independently verify the production state of every service. It must not be represented as a penetration test, compliance audit or security certification.


### C6 SaaS Core source-of-truth correction

The private C6-owned repository `HloniHypnotiseMe/c6-saas-core` exists and is accessible by direct repository URL. The connected installed-repository search did not return it. Current main HEAD observed: `82f40406797fa0d4f3b11c95420d89a2fc4b4c38`. The C6-Os registry records stale pin `02679b209e58e7be2d9b79665fd4cfd6e8a2286d`. Its README/source expose tenant context, runtime authorization/kill-switch, audit and evidence contracts; source-level presence is not proof of deployed runtime or complete tenant isolation. CyberShield must integrate after reviewing these guarantees and must not duplicate the shared controls.


### C6 SaaS Core identity and evidence boundary — security blocker

Follow-up source inspection found that the existing C6 SaaS Core code is not yet a complete customer identity or tenant-isolation system:

- `app/models/tenant.py` contains a Tenant model, but `app/models/user.py` is empty.
- `app/api/auth.py`, `app/api/tenants.py`, and `app/multi_tenant.py` are empty; the auth/tenant routers are not mounted in `app/main.py`.
- Tenant context is a manually set `ContextVar`; inspected code does not bind it to a verified user/tenant membership.
- `/api/v1/evidence` create/read routes have no authentication or tenant-scoped authorization dependency.
- `/api/v1/runtime/authorize` checks a shared `X-C6-Control-Key`, but the caller supplies tenant_id, actor_id, action and allowed_actions. It is an internal control-plane gate, not proof of a user's identity or tenant membership.

**Blocker:** Do not store customer evidence or expose CyberShield scans through C6 SaaS Core until issue [#28](https://github.com/HloniHypnotiseMe/c6-saas-core/issues/28) is resolved and cross-tenant isolation is verified. Reuse the canonical control plane once secured; do not build a parallel auth/tenant/evidence system in C6 Group.
