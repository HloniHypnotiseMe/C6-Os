# Jev Decision Routing Integration

Status: **ADOPTED AS A CONTROLLED CAPABILITY; LIVE VERIFICATION PENDING**

## Boundary

TypeSafe Jev is a judgement provider behind the C6 Agent Arsenal.

It is not:
- the C6 control plane;
- an authorization service;
- an orchestration replacement;
- a payment/mail/platform truth source;
- proof that an agent or route is operational.

## Route contract

The host agent supplies explicit candidates. Jev can recommend:
- reuse an existing C6 capability;
- extract the smallest sufficient component;
- use a specialist;
- build new code;
- request human review.

The host/router remains responsible for availability, permissions, risk, authorization, execution, verification, and evidence.

## Required mode progression

1. Offline deterministic tests.
2. Live TypeSafe API probe.
3. Shadow mode on representative C6 work.
4. Review false positives/false negatives.
5. Narrow active mode only where evidence supports it.
6. Keep a kill switch and fail-open behaviour.

## Current TypeSafe facts

The current official quickstart documents:
- `typesafe-sdk`;
- Python >= 3.10;
- `TYPESAFE_API_KEY`;
- `jev-latest`;
- `POST https://api.typesafe.ai/v1/systemone`;
- typed `Choice`, `Score`, and `Noul` questions.

See the Agent-OS Jev decision-gate document for the implementation contract.

## Evidence required before production activation

- exact skill/runtime version or immutable pin;
- successful live Jev response;
- typed response parsed by the C6 adapter;
- router interpretation;
- shadow decision log;
- real task outcome;
- governance override test;
- no secrets in repository;
- reproducible test command and result.
