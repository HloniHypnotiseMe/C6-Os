import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const registry = await readFile(new URL("../registry/specialist-agents.yaml", import.meta.url), "utf8");
const capabilities = await readFile(new URL("../registry/capabilities.yaml", import.meta.url), "utf8");
const security = await readFile(new URL("../policies/security.yaml", import.meta.url), "utf8");
const index = JSON.parse(await readFile(new URL("../registry/resolution-index.json", import.meta.url), "utf8"));

for (const id of [
  "c6_repository_drift_forensics",
  "c6_workflow_architect",
  "c6_evidence_qa",
]) {
  assert.match(registry, new RegExp("^  - id: " + id + "$", "m"));
}

for (const id of [
  "repository_drift_forensics",
  "workflow_architecture",
  "evidence_based_qa",
  "production_reality_check",
]) {
  assert.match(capabilities, new RegExp("id: " + id));
  assert.ok(index.capabilities[id], "missing resolution index entry: " + id);
  assert.deepEqual(index.capabilities[id].providers, ["c6_os"]);
}

assert.match(registry, /risk: low/);
assert.match(registry, /risk: controlled/);
assert.match(registry, /claim_evidence/);


assert.match(security, /high_risk_capabilities:.*vulnerability_research_reverse/);
const vulnerabilityResearchPolicy = security.match(
  /^    vulnerability_research_reverse:\n((?:      - .*\n)+)/m,
);
assert.ok(vulnerabilityResearchPolicy, "vulnerability research must have capability-specific security gates");
for (const requirement of [
  "verified_asset_ownership_or_written_authorization",
  "explicit_scope_and_allowed_methods",
  "isolated_execution_and_egress_controls",
  "hard_timeouts_and_audit_evidence",
  "human_approval_for_active_validation",
]) {
  assert.ok(
    vulnerabilityResearchPolicy[1].includes(requirement),
    "vulnerability research policy is missing: " + requirement,
  );
}

console.log("specialist registry checks passed");
