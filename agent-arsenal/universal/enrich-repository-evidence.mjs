#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";

const OWNER = process.env.GITHUB_OWNER || "HloniHypnotiseMe";
const TOKEN = process.env.GITHUB_TOKEN;
const INVENTORY = "agent-arsenal/universal/inventory-snapshot.json";
const OUTPUT = "agent-arsenal/universal/repository-evidence.json";
const CONCURRENCY = Number(process.env.GSD_EVIDENCE_CONCURRENCY || 8);

if (!TOKEN) throw new Error("GITHUB_TOKEN is required");

const inventory = JSON.parse(await readFile(INVENTORY, "utf8"));
const repos = inventory.repositories || [];
const rules = [
  ["project_execution", /project|planning|roadmap|task|workflow|spec.driven|development workflow|project management/i],
  ["context_engineering", /context engineering|context management|memory layer|long.context|prompt context/i],
  ["spec_driven_development", /spec.driven|specification|requirements|prd|design document/i],
  ["verification_workflow", /verification|verify|testing|tests|quality assurance|qa|validation/i],
  ["workflow_automation", /workflow automation|automation|orchestration|pipeline|n8n|activepieces/i],
  ["repository_intelligence", /repository|repo analysis|codebase|code intelligence|software archaeology/i],
  ["agent_orchestration", /multi.agent|agent orchestration|agent framework|agents|autonomous agent/i],
  ["browser_automation", /browser automation|web automation|headless browser|playwright|puppeteer/i],
  ["web_scraping", /web scraping|scraper|crawler|crawl4ai|scrapy/i],
  ["email", /email|mail server|smtp|imap/i],
  ["payments", /payment|payments|paygate|banking|fintech/i],
  ["crm", /crm|customer relationship|sales pipeline/i],
  ["deployment_infrastructure", /docker|kubernetes|deployment|infrastructure|hosting|server|vps/i],
  ["security", /security|authentication|authorization|vulnerability|pentest|firewall/i],
  ["documents", /document|pdf|signing|ocr/i],
  ["media", /image|video|audio|music|photo/i],
  ["data", /database|postgres|sqlite|analytics|data pipeline|vector database/i],
  ["marketing_growth", /seo|marketing|lead generation|growth|social media/i]
];

async function api(path) {
  const res = await fetch("https://api.github.com" + path, {
    headers: {
      Authorization: "Bearer " + TOKEN,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "c6-agent-arsenal"
    }
  });
  if (!res.ok) throw new Error(res.status + " " + path + " " + await res.text());
  return res.json();
}

function textFromContent(item) {
  if (!item?.content) return "";
  return Buffer.from(item.content.replace(/\n/g, ""), "base64").toString("utf8");
}

async function inspect(repo) {
  const base = "/repos/" + repo.full_name;
  const root = await api(base + "/contents");
  const names = new Set((root || []).map(x => x.name));
  const candidates = ["README.md","README","README.txt","package.json","pyproject.toml","Cargo.toml","go.mod","Dockerfile"];
  const evidence = {};
  for (const name of candidates) {
    if (!names.has(name)) continue;
    try {
      const item = await api(base + "/contents/" + encodeURIComponent(name));
      const raw = textFromContent(item);
      if (name.toLowerCase().startsWith("readme")) evidence.readme_excerpt = raw.slice(0, 12000);
      else if (name === "package.json") {
        try {
          const p = JSON.parse(raw);
          evidence.package = { name:p.name||null, description:p.description||null, scripts:Object.keys(p.scripts||{}), dependencies:Object.keys(p.dependencies||{}).slice(0,80) };
        } catch { evidence.package = { parse_error:true }; }
      } else evidence.project_markers = [...(evidence.project_markers||[]), name];
    } catch {}
  }
  const corpus = [repo.name, repo.description || "", evidence.readme_excerpt || "", JSON.stringify(evidence.package||{})].join("\n");
  const detected_capabilities = rules.filter(([,re]) => re.test(corpus)).map(([id]) => id);
  return {
    repository: repo.name,
    full_name: repo.full_name,
    category: repo.category || null,
    source_type: repo.source_type || null,
    license: repo.license || null,
    updated_at: repo.updated_at || null,
    archived: !!repo.archived,
    evidence_source: ["github_repository_metadata", ...(evidence.readme_excerpt ? ["github_readme"] : []), ...(evidence.package ? ["github_package_json"] : [])],
    detected_capabilities,
    evidence
  };
}

const out = new Array(repos.length);
let cursor = 0;
async function worker() {
  while (true) {
    const i = cursor++;
    if (i >= repos.length) return;
    try { out[i] = await inspect(repos[i]); }
    catch (err) {
      out[i] = { repository:repos[i].name, full_name:repos[i].full_name, category:repos[i].category||null, evidence_source:["github_repository_metadata"], detected_capabilities:[], error:String(err.message||err) };
    }
  }
}
await Promise.all(Array.from({length:Math.min(CONCURRENCY,repos.length)}, worker));
const result = {
  schema_version:"1.0",
  generated_at:new Date().toISOString(),
  owner:OWNER,
  inventory_generated_at:inventory.generated_at || null,
  purpose:"Evidence-backed repository capability hints. Hints are discovery inputs, not authorization or production-readiness claims.",
  repositories:out
};
await writeFile(OUTPUT, JSON.stringify(result,null,2)+"\n");
console.log("Wrote", OUTPUT, "for", out.length, "repositories");
