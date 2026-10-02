#!/usr/bin/env node
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { parse: parseYAML } = require("yaml");
const root = resolve(process.argv[2] || process.cwd());
async function exists(path) { try { await access(path); return true; } catch { return false; } }
async function loadYaml(path) { return parseYAML(await readFile(path, "utf8")); }
const requiredFiles = ["agent.yaml", "SOUL.md", "RULES.md", "DUTIES.md"];
const missing = [];
for (const file of requiredFiles) if (!(await exists(resolve(root, file)))) missing.push(file);
if (missing.length) { console.log(JSON.stringify({status:"REJECTED",reason:"required_agent_contract_missing",root,missing}, null, 2)); process.exit(2); }
let manifest;
try { manifest = await loadYaml(resolve(root, "agent.yaml")); } catch (error) { console.log(JSON.stringify({status:"REJECTED",reason:"invalid_agent_manifest",error:String(error)}, null, 2)); process.exit(3); }
const required = [["name",manifest.name],["version",manifest.version],["description",manifest.description],["risk_level",manifest.compliance?.risk_level],["human_in_the_loop",manifest.compliance?.human_in_the_loop],["tools",manifest.tools],["runtime",manifest.runtime]];
const missingFields = required.filter(([,value]) => value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)).map(([name]) => name);
const hasC6EvidenceContract = Boolean(manifest.c6?.capability && manifest.c6?.permissions && manifest.c6?.evidence_contract && manifest.c6?.provenance);
const forbiddenProductionShortcuts = [];
if (manifest.c6?.payment_authority === true) forbiddenProductionShortcuts.push("payment_authority");
if (manifest.c6?.tenant_authority === true) forbiddenProductionShortcuts.push("tenant_authority");
if (manifest.c6?.production_credentials === true) forbiddenProductionShortcuts.push("production_credentials");
if (manifest.c6?.unrestricted_infrastructure === true) forbiddenProductionShortcuts.push("unrestricted_infrastructure");
if (missingFields.length || !hasC6EvidenceContract || forbiddenProductionShortcuts.length) { console.log(JSON.stringify({status:"REJECTED",reason:"c6_admission_contract_failed",root,missing_fields:missingFields,missing_c6_contract:!hasC6EvidenceContract,forbidden_production_shortcuts:forbiddenProductionShortcuts}, null, 2)); process.exit(4); }
console.log(JSON.stringify({status:"READY",contract:"C6-GITAGENT-ADMISSION/v1",agent:{name:manifest.name,version:manifest.version},c6:{capability:manifest.c6.capability,permissions:manifest.c6.permissions,evidence_contract:manifest.c6.evidence_contract,provenance:manifest.c6.provenance},rule:"C6 remains the authority plane; this gate proves structure, not runtime."}, null, 2));