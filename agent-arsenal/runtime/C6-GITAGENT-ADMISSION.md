# C6 GitAgent Admission Contract

Contract: C6-GITAGENT-ADMISSION/v1

Purpose: admit GitAgent-style repository agents into the C6 workforce without allowing the agent repository to become an independent authority plane.

## Required identity
- agent.yaml
- SOUL.md
- RULES.md
- DUTIES.md

## Required execution declarations
The manifest must declare:
- agent name/version;
- risk level;
- permissions;
- capability;
- human-approval boundary;
- evidence contract;
- provenance/source;
- lifecycle status.

## Required safety boundary
GitAgent mechanisms may provide identity/rules, skills/tools/plugins, memory/context, MCP, sessions, scheduling, learning, telemetry and audit.

They do not grant C6 tenant authority, payment authority, entitlement authority, production credentials, unrestricted GitHub mutation, production infrastructure mutation, or legal/human authority.

Those permissions must be resolved by C6 policy and the appropriate control plane.

## Admission states
- REJECTED — required contract or safety declaration missing.
- READY — structurally valid but not yet execution-verified.
- WORKS — execution demonstrated.
- VERIFIED — evidence captured.
- LIVE — production runtime verified.

EXISTS is never sufficient for admission to production.

## Evidence
An admitted agent must be traceable to:
agent -> capability -> permission -> action -> evidence -> outcome

The admission tool is a structural gate; it does not claim runtime or production proof.