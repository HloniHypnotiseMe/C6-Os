# C6 Decision Log

## DEC-2026-09-23-001 — DieselConnect backend platform

**Date:** 2026-09-23  
**Status:** ACCEPTED / EXECUTING  
**Scope:** DieselConnect backend, auth, Postgres, Edge Functions/API, evidence storage.

### Decision

DieselConnect will use the **C6-owned, self-hosted Supabase fork** (`HloniHypnotiseMe/supabase`) as its backend platform rather than a hosted Supabase project, a second custom C6 backend rewrite, or PocketBase / AWS / another BaaS.

The fork is deployed on C6-controlled infrastructure. DieselConnect keeps its existing Supabase-native domain model, migrations, RLS policies and Edge Functions, while the runtime moves under C6 control.

### Why

- The C6 organisation actually has a fork of Supabase; this was verified in GitHub as a fork of `supabase/supabase`.
- The fork contains the self-hosted Docker deployment stack.
- The fork includes PostgreSQL, Auth/API/Realtime/Storage components and production deployment options.
- The fork includes a RustFS-backed storage composition, giving DieselConnect a self-hosted S3-compatible evidence-storage path without requiring AWS.
- DieselConnect is already structurally built around Supabase Auth, Postgres, RLS, migrations, Storage and Edge Functions. Keeping those boundaries avoids an unnecessary rewrite.
- RemotePay remains the financial boundary and system of record for payment-provider interaction.
- C6 infrastructure remains the hosting/control plane. No Render, Railway, Vercel, AWS or hosted Supabase dependency is introduced.
- PocketBase in the old DieselConnect lean compose file is legacy infrastructure and is not part of the target architecture.

### Target

DieselConnect PWA -> C6-hosted Supabase fork -> Auth / Postgres / Edge Functions -> RemotePay + evidence storage -> RustFS.

### Important boundary

The use of Supabase here means **our self-hosted fork**, not Supabase Cloud.

The AWS-style environment variable names present in the RustFS integration are S3 API compatibility names; they do not mean AWS infrastructure is being added.

### Required hardening before production

- Explicitly require `payment_status = paid` in the escrow-release gate.
- Preserve RLS and verified buyer/supplier authorization semantics.
- Run DieselConnect migrations against the C6-hosted Postgres instance.
- Deploy Edge Functions under the C6-controlled Supabase runtime.
- Configure private evidence storage and verify POD/SANS-COA evidence paths.
- Prove RemotePay webhook/reconciliation behaviour end-to-end.
- Keep Standard Bank controlled-funds integration unimplemented until an approved API/product contract exists.
- Retire the legacy PocketBase/Postgres duplicate compose path once the new runtime is live and verified.
- Establish backup/restore and operational health checks before production sign-off.

### Evidence

- C6 fork: `HloniHypnotiseMe/supabase` — verified GitHub fork of `supabase/supabase`.
- Fork Docker deployment: `docker/docker-compose.yml`.
- Fork storage option: `docker/docker-compose.rustfs.yml`.
- DieselConnect current backend: `backend/supabase/` with migrations and Edge Functions.
- DieselConnect current frontend client: `frontend/src/lib/supabase.ts`.
- DieselConnect legacy lean compose: `infra/docker-compose.lean.yml`.

### Outcome

**Decision made:** keep the existing DieselConnect Supabase architecture, but move the platform under C6 ownership/control using the forked self-hosted stack. This is a re-homing decision, not a greenfield backend rewrite.
