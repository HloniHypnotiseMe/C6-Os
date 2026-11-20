import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { resolve, join } from "node:path";
import { tmpdir } from "node:os";
import { copyFile, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";

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

assert.equal(missing.code, 3);
assert.match(missing.stderr, /target_repo_missing_start_here/);

const malformedRepo = await mkdtemp(join(tmpdir(), "c6-build-entry-invalid-yaml-"));
try {
  await mkdir(join(malformedRepo, "knowledge"), { recursive: true });
  for (const file of [
    "START-HERE.md",
    "knowledge/WHAT-WE-ALREADY-BUILT.md",
    "knowledge/LESSONS-LEARNED.md",
    "knowledge/DECISIONS.md"
  ]) {
    await copyFile(resolve(file), join(malformedRepo, file));
  }
  await writeFile(
    join(malformedRepo, "knowledge/ALREADY-BUILT.yaml"),
    'schema_version: "1.0"\nentries:\n  - id: broken\n    status: [unterminated\n'

  );

  const invalid = await exec(process.execPath, [
    script,
    "--capability",
    "repository_drift_forensics",
    "--repo",
    malformedRepo
  ]).catch(error => error);

  assert.equal(invalid.code, 4);
  assert.match(invalid.stderr, /prior_build_memory_invalid/);
} finally {
  await rm(malformedRepo, { recursive: true, force: true });
}

console.log("C6 Build Entry tests: PASS");
