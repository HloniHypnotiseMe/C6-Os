import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../START-HERE.md", import.meta.url);
const startHere = await readFile(root, "utf8");

assert.match(startHere, /^# C6 START HERE$/m);
assert.match(startHere, /## 2\. Inspect before building/);
assert.match(startHere, /## 3\. Resolve capability/);
assert.match(startHere, /## 4\. Benchmark external\/open-source specialists/);
assert.match(startHere, /## 5\. Select the execution layer/);
assert.match(startHere, /## 7\. Verify/);
assert.match(startHere, /## 11. Definition of done/);
assert.match(startHere, /CAPABILITY RESOLVED/);
assert.match(startHere, /EVIDENCE CAPTURED/);

for (const path of [
  "../registry/capabilities.yaml",
  "../registry/providers.yaml",
  "../registry/agents.yaml",
  "../registry/resources.yaml",
  "../registry/specialist-agents.yaml",
]) {
  const url = new URL(path, import.meta.url);
  const content = await readFile(url, "utf8");
  assert.ok(content.trim().length > 0, `START HERE dependency is empty: ${path}`);
}

console.log("START HERE gate checks passed");
