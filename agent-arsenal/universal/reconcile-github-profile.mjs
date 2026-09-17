#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';

const token = process.env.GITHUB_TOKEN;
const owner = process.env.GITHUB_OWNER ?? 'HloniHypnotiseMe';
const registryPath = process.env.C6_REGISTRY ?? 'agent-arsenal/universal/repository-registry.yaml';
const outputPath = process.env.C6_INVENTORY ?? 'agent-arsenal/universal/inventory-snapshot.json';
const diffPath = process.env.C6_DIFF ?? 'agent-arsenal/universal/capability-diff.json';

if (!token) {
  console.error('GITHUB_TOKEN is required.');
  process.exit(1);
}

async function github(path) {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'c6-agent-arsenal-reconciler'
    }
  });
  if (!response.ok) throw new Error(`GitHub ${response.status}: ${await response.text()}`);
  return response.json();
}

async function listRepos() {
  const repos = [];
  for (let page = 1; ; page += 1) {
    const batch = await github(`/user/repos?per_page=100&page=${page}&affiliation=owner,collaborator,organization_member&sort=updated`);
    repos.push(...batch);
    if (batch.length < 100) return repos;
  }
}

function category(repo) {
  const n = repo.name.toLowerCase();
  const rules = [
    ['orchestration', /agent|orchestrat|langgraph|crewai|metagpt|openclaw|prefect|activepieces|huginn|n8n/],
    ['agent_routing', /router|route|optillm/],
    ['coding_agents', /codex|openhands|aider|nanocoder|task-master|claude/],
    ['mcp_and_tools', /mcp/],
    ['memory_rag', /memory|rag|viking|qdrant|mem0|context-hub|anything-llm/],
    ['llm_inference', /ollama|localai|transformers|nanogpt|kobold/],
    ['browser_web', /browser|scrap|crawl|crawly|stagehand|archivebox|yt-dlp|autoscraper/],
    ['voice_audio', /voice|speech|whisper|tts|audio|pipecat/],
    ['image_video_content', /video|image|comfy|fooocus|moneyprinter|paperclip|manim|creator/],
    ['communications', /mail|email|whatsapp|sms|telegram|messag/],
    ['crm_productivity', /crm|twenty|nocodb|calendar|cal\.|appflowy|penpot|documenso/],
    ['payments_finance', /pay|payment|finance|trading|stock/],
    ['security_observability', /security|prowler|crowdsec|uptime|hyperdx|watchtower|adguard/],
    ['deployment_infrastructure', /deploy|coolify|cloudflare|contabo|tailscale|server|infra/],
    ['data_geo_documents', /geo|graph|analytics|pdf|document|surya/],
    ['learning_reference', /skill|roadmap|book|learning|course/]
  ];
  return rules.find(([, pattern]) => pattern.test(n))?.[0] ?? 'specialist_or_reference';
}

function simplify(repo) {
  return {
    name: repo.name,
    full_name: repo.full_name,
    private: repo.private,
    fork: repo.fork,
    archived: repo.archived,
    default_branch: repo.default_branch,
    description: repo.description ?? '',
    html_url: repo.html_url,
    updated_at: repo.updated_at,
    pushed_at: repo.pushed_at,
    license: repo.license?.spdx_id ?? null,
    parent: repo.parent?.full_name ?? null,
    category: category(repo),
    classification: repo.fork ? 'forked_upstream' : 'profile_repository'
  };
}

function registryNames(text) {
  return new Set([...text.matchAll(/^\s*-\s+([^#\n]+)$/gm)].map(m => m[1].trim().replace(/^['"]|['"]$/g, '')));
}

const repos = (await listRepos()).map(simplify);
const forks = repos.filter(r => r.fork);
const previous = await readFile(outputPath, 'utf8').then(JSON.parse).catch(() => ({ repositories: [] }));
const registry = await readFile(registryPath, 'utf8');
const known = registryNames(registry);
const previousByName = new Map((previous.repositories ?? []).map(r => [r.full_name, r]));

const snapshot = {
  schema_version: '1.0',
  registry_id: 'c6-universal-agent-arsenal',
  generated_at: new Date().toISOString(),
  owner,
  source: 'GitHub authenticated repository inventory',
  counts: { repositories: repos.length, forks: forks.length, private: repos.filter(r => r.private).length },
  repositories: repos.sort((a, b) => a.name.localeCompare(b.name))
};

const diff = {
  schema_version: '1.0',
  generated_at: snapshot.generated_at,
  source: snapshot.source,
  new_repositories: repos.filter(r => !previousByName.has(r.full_name)),
  changed_repositories: repos.filter(r => {
    const old = previousByName.get(r.full_name);
    return old && (old.pushed_at !== r.pushed_at || old.archived !== r.archived || old.default_branch !== r.default_branch || old.license !== r.license || old.description !== r.description);
  }),
  removed_repositories: (previous.repositories ?? []).filter(old => !repos.some(r => r.full_name === old.full_name)),
  fork_candidates_not_in_registry: forks.filter(r => !known.has(r.name) && !known.has(r.full_name)),
  note: 'This reconciler proposes inventory/categorization changes only. It does not install, activate, grant permissions, or change the canonical registry automatically.'
};

await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);
await writeFile(diffPath, `${JSON.stringify(diff, null, 2)}\n`);
console.log(JSON.stringify({ counts: snapshot.counts, new: diff.new_repositories.length, changed: diff.changed_repositories.length, removed: diff.removed_repositories.length, unregistered_forks: diff.fork_candidates_not_in_registry.length }, null, 2));
