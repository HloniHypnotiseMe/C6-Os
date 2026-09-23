#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parse as parseYAML } from "yaml";
import { resolve } from "node:path";

const root = resolve("agent-arsenal");
const schema = parseYAML(await readFile(resolve(root, "registry/company-operating-model.yaml"), "utf8"));
const required = {
  company: schema.required_company_fields,
  function: schema.required_function_fields,
  execution: schema.required_execution_fields,
  exception: schema.required_exception_fields,
  win: schema.required_win_fields
};

for (const file of [
  "company-operations/examples/c6-group.yaml",
  "company-operations/examples/remotepay.yaml",
  "company-operations/examples/diesel-connect.yaml"
]) {
  const model = parseYAML(await readFile(resolve(root, file), "utf8"));
  assert.equal(model.schema_version, schema.schema_version, file);
  for (const field of required.company) assert.ok(model.company?.[field] !== undefined, `${file}: missing company.${field}`);
  assert.ok(Array.isArray(model.functions) && model.functions.length > 0, `${file}: functions required`);
  for (const fn of model.functions) {
    for (const field of required.function) assert.ok(fn[field] !== undefined, `${file}: function ${fn.id} missing ${field}`);
    for (const field of required.execution) assert.ok(fn.execution?.[field] !== undefined, `${file}: function ${fn.id} missing execution.${field}`);
    assert.ok(schema.execution_layers.includes(fn.execution.layer), `${file}: invalid execution layer ${fn.execution.layer}`);
  }
  for (const item of model.exceptions || []) for (const field of required.exception) assert.ok(item[field] !== undefined, `${file}: exception missing ${field}`);
  for (const item of model.wins || []) for (const field of required.win) assert.ok(item[field] !== undefined, `${file}: win missing ${field}`);
}
console.log("Company Operating Model tests: PASS");
