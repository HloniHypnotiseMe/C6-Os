import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parse as parseYAML } from "yaml";
import { resolve } from "node:path";

const workforce = parseYAML(await readFile(resolve("agent-arsenal/registry/workforce.yaml"), "utf8"));
const teams = parseYAML(await readFile(resolve("agent-arsenal/registry/teams.yaml"), "utf8"));

assert.equal(workforce.registry, "c6-workforce");
assert.ok(workforce.roles.length >= 1);
assert.ok(workforce.workers.length >= 1);
for (const worker of workforce.workers) {
  assert.ok(worker.id && worker.role && worker.layer && worker.capability && worker.status);
}
assert.equal(teams.registry, "c6-teams");
assert.ok(teams.teams.length >= 1);
for (const team of teams.teams) {
  assert.ok(team.id && team.mission && team.members.length > 0 && team.capability);
  assert.ok(team.approval_boundary);
}
console.log("Workforce and team registry tests: PASS");
