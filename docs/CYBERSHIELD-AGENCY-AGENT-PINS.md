# CyberShield Agency Agent Source Pins

**Inspected:** 2026-11-09  
**Repository:** https://github.com/HloniHypnotiseMe/agency-agents  
**Branch inspected:** `main`  
**Purpose:** Pin the exact agent-file contents used by the C6 CyberShield Internal Assurance design. These are Git blob SHAs, not a claim that agents are installed or executing.

| CyberShield role | Source path | Git blob SHA |
|---|---|---|
| Security Architect | `security/security-architect.md` | `0dbc227249d53ff75e282a32d982e8de5e666f0c` |
| Application Security Engineer | `security/security-appsec-engineer.md` | `e5f82dc0ad7c164d03e156cf4696f5570273453e` |
| Senior SecOps Engineer | `security/security-senior-secops.md` | `cd66610e133d71795f8832f0d379f505471a1f0a` |
| Secrets & Credential Hygiene Engineer | `security/security-secrets-credential-engineer.md` | `63a0a6fe7b551e501f09a3283b8b87680b01a9b0` |
| Reality Checker | `testing/testing-reality-checker.md` | `e534cfbd20d3115d5265387f19db7d3b25649421` |
| API Tester | `testing/testing-api-tester.md` | `1ea5e50cba0bc36a9a8ec8bfd9ca997d9e450a5c` |
| Test Automation Engineer | `testing/testing-test-automation-engineer.md` | `571f8e3ab9d678e56edcfb6d9d95f31c65ef98ca` |
| SRE | `engineering/engineering-sre.md` | `592c7ab92f0fa5f56da735e65eba4c7c40231568` |
| DevOps Automator | `engineering/engineering-devops-automator.md` | `a9e7cac04c8e78e812d230aae9f9f676b20413ac` |
| Infrastructure Maintainer | `support/support-infrastructure-maintainer.md` | `5e38a198351f22a977cd01bc2605ed431e8f2f8b` |

The Agency roster README blob inspected was `ef21203aee8915e54bed99ca090e50a3def79cac`.

## Use policy

- Re-fetch each source file and compare its blob SHA before a later agent-runtime integration.
- If a SHA changes, review the diff and update this pin record deliberately; do not silently float to upstream `main`.
- Keep the original Agency agent source intact. C6-specific execution permissions, tool access, evidence requirements and approval gates belong in C6 policy/workflows, not in upstream agent prompts.
- A prompt or agent file is not an executable monitor, scanner, test runner, credential manager or deployment permission.
- No claim is made that these agents have been installed, loaded into OpenCode, or invoked by a production runtime.
