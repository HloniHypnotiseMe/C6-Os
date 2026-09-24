#!/usr/bin/env node
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { suggestCapabilities, suggestCapabilityById } from "../router/suggest.mjs";

const args = process.argv.slice(2);
const get = (name, fallback = null) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};
const task = get("--task");
const repo = get("--repo", process.cwd());
const explicitCapability = get("--capability");
const risk = get("--risk", "low");
const permissions = (get("--permissions", "") || "").split(",").map(x => x.trim()).filter(Boolean);

if (!task && !explicitCapability) {
  console.error("C6 BUILD ENTRY: --task or --capability is required");
  process.exit(2);
}

async function readable(path) {
  try { await access(path); return true; } catch { return false; }
}

async function inspectRepo(root) {
  const checks = ["START-HERE.md","README.md","package.json","pyproject.toml","requirements.txt","Dockerfile","docker-compose.yml","compose.yml",".github/workflows"];
  const found = [];
  for (const item of checks) if (await readable(resolve(root, item))) found.push(item);
  return found;
}

const startHere = resolve(repo, "START-HERE.md");
const osRoot = resolve(repo);
const knowledgeFiles = [
  "knowledge/WHAT-WE-ALREADY-BUILT.md",
  "knowledge/ALREADY-BUILT.yaml",
  "knowledge/LESSONS-LEARNED.md",
  "knowledge/DECISIONS.md"
];
if (!(await readable(startHere))) {
  console.error(JSON.stringify({status:"BLOCKED",reason:"target_repo_missing_start_here",repo,required:"START-HERE.md"}, null, 2));
  process.exit(3);
}

const startText = await readFile(startHere, "utf8");
const knowledgeStatus = {};
for (const file of knowledgeFiles) knowledgeStatus[file] = await readable(resolve(osRoot, file));
for (const required of ["Inspect before building","Resolve capability","Benchmark external/open-source specialists","Verify","Definition of done"]) {
  if (!startText.includes(required)) {
    console.error(JSON.stringify({status:"BLOCKED",reason:"start_here_gate_failed",missing:required}, null, 2));
    process.exit(4);
  }
}

if (Object.values(knowledgeStatus).some((present) => !present)) {
  console.error(JSON.stringify({status:"BLOCKED",reason:"prior_build_memory_missing",knowledge:knowledgeStatus}, null, 2));
  process.exit(4);
}

const selection = explicitCapability ? await suggestCapabilityById(explicitCapability) : await suggestCapabilities(task);
if (!selection.suggestion) {
  console.log(JSON.stringify({status:"GAP",stage:"CAPABILITY_RESOLUTION",task,repo,suggestion:null,next:"Register or resolve the missing capability before implementation."}, null, 2));
  process.exit(5);
}

const plan = {
  status:"READY_FOR_AUTHORIZATION",
  contract:"C6-BUILD-ENTRY/v1",
  task:task || null,
  repository:resolve(repo),
  gate:{start_here:"PASS",prior_build_memory:"PASS",capability_resolution:"PASS",execution:"NOT_EXECUTED"},
  capability:{
    id:selection.suggestion.capability,
    purpose:selection.suggestion.purpose,
    providers:selection.suggestion.providers || [],
    adapter:selection.suggestion.adapter || null
  },
  repository_candidates:selection.repository_candidates || [],
  repository_inspection:{observed_markers:await inspectRepo(repo),note:"Repository markers establish existence only; runtime health and production state require separate verification."},
  prior_build_memory:{files:knowledgeStatus,required_sequence:"Search prior builds, lessons and decisions before implementation.",duplicate_prevention:"Do not rebuild an existing capability without recording why reuse/adaptation was insufficient."},
  authorization:{required:true,risk,requested_permissions:permissions},
  required_sequence:["INSPECT","MAP_COMPANY_OPERATING_MODEL","RESOLVE","BENCHMARK","SELECT_SMALLEST_LAYER","AUTHORIZE","IMPLEMENT","TEST","VERIFY","CAPTURE_EVIDENCE","REGISTER_KNOWLEDGE","RECORD_WIN"],
  forbidden:["blind_upstream_copy","unapproved_production_mutation","claiming_live_from_repo_existence","claiming_verified_from_build_only","inventing_missing_evidence"]
};
console.log(JSON.stringify(plan, null, 2));
