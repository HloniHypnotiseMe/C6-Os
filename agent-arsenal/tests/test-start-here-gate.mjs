import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../START-HERE.md", import.meta.url);
const startHere = await readFile(root, "utf8");

assert.match(startHere, /^# C6 START HERE$/m);
assert.match(startHere, /## (?:3\. )?Inspect before building/);
assert.match(startHere, /## (?:4\. )?Resolve capability/);
assert.match(startHere, /## (?:5\. )?Benchmark external\/open-source specialists/);
assert.match(startHere, /## (?:6\. )?Select the execution layer/);
assert.match(startHere, /## (?:8\. )?Verify/);
assert.match(startHere, /## (?:12\. )?Definition of done/);
assert.match(startHere, /CAPABILITY RESOLVED/);
assert.match(startHere, /EVIDENCE CAPTURED/);

for (const path of [
  "../registry/capabilities.yaml",
  "../registry/providers.yaml",
  "../registry/agents.yaml",
  "../registry/resources.yaml",
  "../registry/specialist-agents.yaml",
  "../registry/departments.yaml",
]) {
  const url = new URL(path, import.meta.url);
  const content = await readFile(url, "utf8");
  assert.ok(content.trim().length > 0, `START HERE dependency is empty: ${path}`);
}

console.log("START HERE gate checks passed");
