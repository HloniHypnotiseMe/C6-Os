#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { parse as parseYAML } from "yaml";
import { resolve } from "node:path";

const modelPath = process.argv[2];
if (!modelPath) {
  console.error("Usage: node company-operating-model-to-team.mjs <model.yaml>");
  process.exit(2);
}

const model = parseYAML(await readFile(resolve(modelPath), "utf8"));
const team = {
  status: "BLUEPRINT",
  company: model.company,
  functions: (model.functions || []).map(fn => ({
    id: fn.id,
    name: fn.name,
    owner: fn.owner,
    execution: fn.execution,
    workflow: fn.workflow,
    evidence: fn.evidence,
    success: fn.success
  })),
  exceptions: model.exceptions || [],
  wins: model.wins || [],
  note: "Blueprint only. This command does not execute agents, mutate production, or claim runtime status."
};
console.log(JSON.stringify(team, null, 2));
