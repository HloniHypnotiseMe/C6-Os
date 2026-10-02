import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
const exec = promisify(execFile);
const script = resolve("agent-arsenal/runtime/admit-gitagent.mjs");
const root = await mkdtemp(join(tmpdir(), "c6-gitagent-"));
try {
  for (const file of ["SOUL.md","RULES.md","DUTIES.md"]) await writeFile(join(root,file),"# test\n");
  await writeFile(join(root,"agent.yaml"), ["name: test-agent","version: 1.0.0","description: C6 admission fixture","tools: [read]","runtime:","  max_turns: 5","compliance:","  risk_level: medium","  human_in_the_loop: true","c6:","  capability: evidence_based_qa","  permissions: [filesystem_read]","  evidence_contract: claim_evidence","  provenance: test-fixture"].join("\n"));
  const { stdout } = await exec(process.execPath,[script,root]);
  const result = JSON.parse(stdout);
  assert.equal(result.status,"READY");
  assert.equal(result.contract,"C6-GITAGENT-ADMISSION/v1");
  assert.equal(result.c6.capability,"evidence_based_qa");
} finally { await rm(root,{recursive:true,force:true}); }
console.log("GitAgent admission tests: PASS");