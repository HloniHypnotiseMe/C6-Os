#!/usr/bin/env node
/**
 * C6 material-claim gate.
 * A claim may be customer-safe only when it has a capability and an evidence reference.
 * This is a structural gate; runtime evidence must still be real and authoritative.
 */
import fs from "node:fs";

const input = process.argv[2] ?? "claims.json";
if (!fs.existsSync(input)) {
  console.error(JSON.stringify({status:"ERROR", code:"INPUT_NOT_FOUND", input}));
  process.exit(2);
}
const data = JSON.parse(fs.readFileSync(input, "utf8"));
const claims = Array.isArray(data) ? data : data.claims;
if (!Array.isArray(claims)) {
  console.error(JSON.stringify({status:"ERROR", code:"CLAIMS_ARRAY_REQUIRED"}));
  process.exit(2);
}
const failures = [];
for (const [i, claim] of claims.entries()) {
  const id = claim?.claim_id ?? `claim-${i+1}`;
  if (!claim?.claim_id || !claim?.capability_id || !claim?.evidence_ref) {
    failures.push({claim_id:id, missing:[
      !claim?.claim_id && "claim_id",
      !claim?.capability_id && "capability_id",
      !claim?.evidence_ref && "evidence_ref"
    ].filter(Boolean)});
  }
}
const result = {status: failures.length ? "REJECTED" : "READY", claims:claims.length, failures};
console.log(JSON.stringify(result, null, 2));
process.exit(failures.length ? 1 : 0);
