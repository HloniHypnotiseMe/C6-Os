# Agent Arsenal reconciliation policy

The canonical universal repository registry lives in `agent-arsenal/universal/repository-registry.yaml`.

## Reconciliation contract

1. Read the canonical registry before selecting or adding a capability.
2. Enumerate repositories available to the authenticated C6 GitHub account.
3. Identify forks from GitHub's `fork` and `parent` metadata.
4. Normalize repository metadata: visibility, archive state, default branch, description, update/push timestamps, license, parent, and inferred capability category.
5. Compare the current inventory with the previous snapshot.
6. Emit new, changed, removed, and unregistered-fork candidates.
7. Treat category inference as a proposal requiring review.
8. Never install, activate, grant permissions, expose secrets, or change provider selection as a side effect of reconciliation.
9. Production selection still requires license, maintenance, dependency/security, runtime, data-handling, health, version/pin, rollback, and permission review.

## Outputs

- `inventory-snapshot.json`: machine-readable current repository inventory.
- `capability-diff.json`: machine-readable reconciliation result for orchestrators and review tooling.

The workflow may refresh these files automatically. The canonical capability registry remains governed data; discovery does not equal approval.
