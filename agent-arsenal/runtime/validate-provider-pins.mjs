#!/usr/bin/env node
/**
 * Production provider reproducibility gate.
 * Only explicitly production-active provider bindings require an immutable pin.
 * Catalogued/reference providers are not treated as production deployments.
 */
import fs from "node:fs";
const input=process.argv[2] ?? "agent-arsenal/registry/providers.yaml";
const raw=fs.readFileSync(input,"utf8");
const blocks=raw.split(/^\s{2}- id: /m).slice(1);
const failures=[];
const active=[];
for(const block of blocks){
  const id=block.split("\n",1)[0].trim();
  const runtime=(block.match(/\n    runtime:\s*([^\n]+)/)||[])[1]?.trim();
  const pin=(block.match(/\n    pin:\s*([^\n]+)/)||[])[1]?.trim();
  const status=(block.match(/\n    registry_status:\s*([^\n]+)/)||[])[1]?.trim();
  const productionActive=(block.match(/\n    production_active:\s*([^\n]+)/)||[])[1]?.trim()==="true";
  if(status==="registered" && productionActive) {
    active.push(id);
    if(!pin || pin==="null") failures.push(id);
  }
}
console.log(JSON.stringify({
  status:failures.length?"REJECTED":"READY",
  productionActiveProviders:active,
  unPinnedProductionProviders:failures
},null,2));
process.exit(failures.length?1:0);
