# Workflow Discovery Skill

## Purpose
Recover the real workflow encoded by code, configuration, integrations, state transitions, and operational boundaries.

## Procedure
1. Identify the business or technical outcome.
2. Inspect orchestration configs, routes, handlers, jobs, webhooks, persistence, and external integrations.
3. Map states, transitions, inputs, outputs, failure paths, and ownership boundaries.
4. Separate implemented behavior from intended behavior.
5. Define handoff contracts and evidence required at each critical transition.

## Outputs
- workflow specification
- state matrix
- transition map
- failure-path map
- handoff contract

## Non-goals
Do not invent missing states or claim an unverified transition works.
