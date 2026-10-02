import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {execFileSync} from "node:child_process";

const root=fs.mkdtempSync(path.join(os.tmpdir(),"c6-claim-gate-"));
const good=path.join(root,"good.json");
const bad=path.join(root,"bad.json");
fs.writeFileSync(good,JSON.stringify({claims:[{claim_id:"c1",capability_id:"cap1",evidence_ref:"ev1"}]}));
fs.writeFileSync(bad,JSON.stringify({claims:[{claim_id:"c1",capability_id:"cap1"}]}));
const script=path.resolve("agent-arsenal/runtime/validate-claim-evidence.mjs");
const ok=execFileSync(process.execPath,[script,good],{encoding:"utf8"});
assert.match(ok,/READY/);
assert.throws(()=>execFileSync(process.execPath,[script,bad],{encoding:"utf8",stdio:"pipe"}));
console.log("claim evidence gate: PASS");
