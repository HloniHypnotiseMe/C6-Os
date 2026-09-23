import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { resolve } from "node:path";

const exec = promisify(execFile);
const script = resolve("agent-arsenal/workflows/c6-build-entry.mjs");

const { stdout } = await exec(process.execPath, [
  script,
  "--capability",
  "repository_drift_forensics",
  "--repo",
  process.cwd(),
  "--risk",
  "low",
  "--permissions",
  "filesystem_read"
]);

const result = JSON.parse(stdout);
assert.equal(result.status, "READY_FOR_AUTHORIZATION");
assert.equal(result.gate.start_here, "PASS");
assert.equal(result.gate.capability_resolution, "PASS");
assert.equal(result.gate.execution, "NOT_EXECUTED");
assert.equal(result.authorization.required, true);
assert.ok(result.required_sequence.includes("MAP_COMPANY_OPERATING_MODEL"));
assert.ok(result.required_sequence.includes("BENCHMARK"));
assert.ok(result.required_sequence.includes("CAPTURE_EVIDENCE"));
assert.ok(result.forbidden.includes("blind_upstream_copy"));

const missing = await exec(process.execPath, [
  script,
  "--task",
  "inspect repository before building",
  "--repo",
  "/definitely/not/a/c6/repository"
]).catch(error => error);

assert.equal(missing.status, 3);
assert.match(missing.stderr, /target_repo_missing_start_here/);

console.log("C6 Build Entry tests: PASS");
