import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const require = createRequire(resolve("agent-arsenal/mcp-server/package.json"));
const { parse: parseYAML } = require("yaml");
const schema = parseYAML(await readFile(resolve("agent-arsenal/registry/company-operating-model.yaml"), "utf8"));
assert.equal(schema.schema_version, "0.1");
assert.deepEqual(schema.execution_layers, ["human","skill","agent","workflow","team","provider"]);

for (const file of [
  "company-operations/examples/c6-group.yaml",
  "company-operations/examples/remotepay.yaml",
  "company-operations/examples/diesel-connect.yaml"
]) {
  const model = parseYAML(await readFile(resolve("agent-arsenal", file), "utf8"));
  assert.equal(model.schema_version, "0.1", file);
  assert.ok(model.company?.id, file);
  assert.ok(model.company?.product, file);
  assert.ok(model.company?.outcome, file);
  assert.ok(Array.isArray(model.functions) && model.functions.length > 0, file);
  for (const fn of model.functions) {
    assert.ok(fn.id && fn.name && fn.mission && fn.owner, `${file}: function identity`);
    assert.ok(Array.isArray(fn.triggers), `${file}: triggers`);
    assert.ok(Array.isArray(fn.inputs), `${file}: inputs`);
    assert.ok(Array.isArray(fn.outputs), `${file}: outputs`);
    assert.ok(fn.execution?.layer && schema.execution_layers.includes(fn.execution.layer), `${file}: execution layer`);
    assert.ok(fn.execution?.capability, `${file}: capability`);
    assert.ok(Array.isArray(fn.execution?.permissions), `${file}: permissions`);
    assert.ok(fn.execution?.approval !== undefined, `${file}: approval`);
    assert.ok(fn.workflow, `${file}: workflow`);
    assert.ok(Array.isArray(fn.evidence), `${file}: evidence`);
    assert.ok(Array.isArray(fn.success), `${file}: success`);
  }
  for (const item of model.exceptions || []) assert.ok(item.condition && item.handoff && item.owner, `${file}: exception`);
  for (const item of model.wins || []) assert.ok(item.metric && item.evidence, `${file}: win`);
}
console.log("Company Operating Model tests: PASS");
