import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { loadRepositoryRegistry, loadDepartmentsYAML } from "../mcp-server/lib.mjs";

const registry = await loadRepositoryRegistry();
const departments = await loadDepartmentsYAML();

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
