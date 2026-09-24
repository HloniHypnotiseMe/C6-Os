# C6 — DECISIONS

Durable decisions that should influence future builds.

## Architecture
- C6-Os is the control plane/catalogue for reusable capabilities and repository discovery.
- START-HERE is the mandatory entry point for C6 work.
- The universal repository catalogue exposes the full available estate as selectable options; provider registration is a separate trust/authorization decision.
- Prefer the smallest sufficient capability.
- C6-owned repositories are the primary internal source of truth.
- Controlled forks require inspection before extraction or replacement.

## Infrastructure
- Prefer self-hosted/open-source infrastructure where practical.
- Do not introduce paid hosting/SaaS by default.
- Inspect existing C6 mail, workflow, database, payment, DNS and deployment infrastructure before adding a replacement.

## Verification
- Use EXISTS -> WORKS -> VERIFIED -> LIVE.
- Customer-facing and production claims require corresponding evidence.
- Do not infer production health from repository presence or build success.

## Knowledge
- Important build knowledge must leave chat and enter C6-Os.
- New reusable capabilities are registered after verification.
- Failed, rejected and replaced approaches are recorded to prevent repeat work.
