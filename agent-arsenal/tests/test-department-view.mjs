import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parse } from "yaml";

const registry = parse(await readFile(new URL("../universal/repository-registry.yaml", import.meta.url), "utf8"));
const departments = parse(await readFile(new URL("../registry/departments.yaml", import.meta.url), "utf8"));

const categories = Object.keys(registry.capabilities || {});
const departmentIds = Object.keys(departments.departments || {});
const mapped = Object.keys(departments.category_map || {});

assert.equal(departmentIds.length, 7, "human presentation layer must contain exactly 7 departments");
assert.equal(categories.length, 37, "universal registry category count changed; review taxonomy before updating the department view");
assert.deepEqual([...categories].sort(), [...mapped].sort(), "every universal category must have a department mapping");

for (const [category, ids] of Object.entries(departments.category_map || {})) {
  assert.ok(Array.isArray(ids) && ids.length > 0, `category has no department mapping: ${category}`);
  for (const id of ids) assert.ok(departments.departments[id], `unknown department ${id} mapped from ${category}`);
}

console.log("Department view checks passed: 37 machine categories mapped across 7 human departments");
