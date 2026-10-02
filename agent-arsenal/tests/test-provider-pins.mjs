import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
const script="agent-arsenal/runtime/validate-provider-pins.mjs";
const out=execFileSync(process.execPath,[script],{encoding:"utf8"});
const result=JSON.parse(out);
assert.equal(result.status,"REJECTED");
assert.ok(result.unPinnedProductionProviders.length>0);
console.log("provider pin gate: PASS (correctly identifies unpinned registered VPS providers)");
