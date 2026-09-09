# C6 Upstream Protection Policy

## Rule

C6 consumes upstream projects; it does not silently absorb them.

### Allowed

- Read upstream source and documentation.
- Pull a known release, tag, or commit.
- Pin a production dependency to an immutable revision.
- Build a thin C6 adapter or wrapper.
- Maintain C6-specific configuration outside the upstream repository.
- Record provenance, license, risk, and permission requirements.

### Not allowed by default

- Copying entire upstream repositories into C6-Os.
- Untracked modifications to upstream source.
- Automatic production upgrades.
- Embedding credentials in provider definitions.
- Calling a provider directly when a governed C6 adapter is required.
- Treating a local mirror as the canonical source.

## Promotion gate

A provider may move from `registered` to production only after its exact version/commit, runtime requirements, permissions, security posture, and verification procedure are recorded.

## Ownership

Repositories under `HloniHypnotiseMe` are classified as C6 internal unless explicitly marked otherwise. External repositories remain upstream dependencies.
