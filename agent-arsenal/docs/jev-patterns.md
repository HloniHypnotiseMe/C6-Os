# C6 Jev Decision Patterns

This is a reference layer, not a second runtime and not a dependency on Jev.

It extracts the useful part of the Jev ecosystem into C6-Os:

discover → evidence-check → classify → promote → make available to the Arsenal

## What this is for

The GitHub ecosystem is a capability supply chain. Jev research is useful when it reveals a decision pattern that can transfer into C6.

The registry therefore records patterns, not a giant copy of external project lists.

A promoted pattern must have:

- a public/citable source or inspected implementation;
- a concrete scenario;
- a typed decision shape;
- a runnable, traceable, or otherwise inspectable evidence chain;
- a clear C6 transfer rule.

## Promotion ladder

    Discussion lead
          ↓
    Evidence checked
          ↓
    Promotion test
          ↓
    Promoted
          ↓
    Retired / refreshed

Weak evidence stays a research lead. Discovery alone never promotes a capability.

## Separation of concerns

    Jev pattern reference
            ↓
    Capability design / evaluation
            ↓
    C6 Agent Arsenal
            ↓
    Capability Router
            ↓
    Arsenal Resolver
            ↓
    Policy / permissions / runtime
            ↓
    Execution

The Jev layer cannot:

- install a capability;
- grant permission;
- execute a provider;
- override policy;
- convert a confidence value into authorization.

## C6 rules

1. Code owns control flow and policy.
2. Typed judgment may inform bounded choices.
3. Evidence precedes promotion.
4. Unknown remains unknown.
5. Recommendation is not authorization.
6. Authorization is not execution.
7. A score is not calibrated probability unless independently demonstrated.
8. Repository presence is not production readiness.

## Current promoted patterns

See registry/jev-patterns.yaml.

The initial set is deliberately small. It covers candidate selection, verification gates, bounded ranking, contrastive evaluation, evidence-backed promotion, and advisory confidence.

This registry should grow only when a new pattern survives the evidence gate.
