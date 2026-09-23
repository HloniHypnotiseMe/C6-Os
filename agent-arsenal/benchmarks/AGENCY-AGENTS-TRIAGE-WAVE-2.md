# Agency Agents — Wave 2 Semantic Triage

**Scope:** Engineering + Security + Testing  
**Upstream:** `msitarzewski/agency-agents` at `053ddbbf392a1688fc7043d81529f47ef2cf86c8`

Wave 2 is a semantic comparison, not a copy operation. Each selected definition was inspected and compared against the current C6 Arsenal.

## Results

| Upstream specialist | C6 decision | C6 layer |
|---|---|---|
| API Platform Engineer | ADAPT | Agent |
| Codebase Onboarding Engineer | ADAPT | Agent |
| Database Reliability Engineer | ADAPT | Agent |
| Developer Tooling Engineer | ADAPT | Agent |
| Software Architect | ADAPT | Agent |
| AI-Generated Code Auditor | NEW | Agent |
| AppSec Engineer | NEW | Agent |
| Security Architect | ADAPT | Agent |
| Penetration Tester | ADAPT | Agent |
| Senior SecOps | ADAPT | Agent |
| API Tester | ADAPT | Agent |
| Performance Benchmarker | NEW | Agent |
| Reality Checker | ADAPT | Agent |
| Test Automation Engineer | ADAPT | Agent |

## Important findings

1. **Repository forensics remains the C6 foundation.** The Codebase Onboarding definition adds useful execution-tracing behavior but should not create a second repository-forensics identity.
2. **Security is a genuine capability gap.** Generic code review must not be treated as AppSec or security certification.
3. **Performance verification is distinct from analytics.** Measuring business behavior is not the same as proving technical performance.
4. **Reality checking belongs inside the evidence system.** The useful upstream behavior is claim-to-implementation cross-checking; C6 does not inherit upstream scoring language.
5. **Penetration testing is high-risk.** It requires explicit authorization and target scoping.
6. **API contract engineering and API testing should be separate specialists.** One defines/guards the contract; the other verifies the implementation.

## Wave 2 admission rule

`START HERE → Arsenal resolution → smallest sufficient specialist → permission gate → execution → evidence → verification → registration`

No specialist becomes executable merely because its upstream definition exists.
