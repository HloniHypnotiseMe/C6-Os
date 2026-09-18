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
  const n = `${repo.name} ${repo.description ?? ''} `.toLowerCase();
  const rules = [
    ['reverse_engineering', /ghidra|ida.?pro|idassist|reverse.?engineer|binary.?analy|disassem|debugger|frida|radare/],
    ['security_networking', /wifi.*audit|airgorah|curl.?impersonate|security.*camera|clearcam|iroh|wifi.*secur/],
    ['osint_investigation', /sherlock|maigret|seasearch|open.?source.?web.?scanner|web.?scanner|investigat/],
    ['dev_tools', /\beditor\b|nushell|helix|text.?editor|git.?chain|build.?your.?own|codenomad|devildev|terminal.?file|browsr|transmute|file.?convert|website.?clon|cloner.?template/i],
    ['web_frontend', /react|next\.?js|vue|svelte|fluentui|shadcn|component.?kit|tldraw|excalidraw|capacitor|website.?builder|web.?to.?app/],
    ['game_engine', /\bgame\b|game.?engine|athena.?crisis|botw|emulator|procedural.?engine|world.?editor/],
    ['file_sharing_sync', /file.?sync|send.?files|airdrop|localsend|polyuploader|telegram.?drive|twake|anytype|timelinize/],
    ['security_offensive', /redteam|red-team|penetration|pentest|exploit|ddos|wifi.*duck|keystroke.*inject|osint|sn1per|strix|mhddos|antihunter|ghost-osint|netryx|searchphone|dork/],
    ['hardware_robotics', /robot|mocap|motion.*capture|drone|arduino|esp32|raspberry|flight.*log|dronelog|ducky|picking.*robot|colota|grid.?mobile|stereo|rppg/],
    ['media_servers', /jellyfin|emby|plex|media.*server|qbit|transmission|sonarr|radarr|karaoke|jcorp-nomad/],
    ['marketing_growth', /marketing|seo|growth|launch.*platform|lead.*gen|outreach|semrush|ahrefs|posthog|postiz|oransim|causal.*digital/],
    ['maps_geo', /\bmap\b|geo|osm|openstreetmap|leaflet|kepler|city2graph|navigation|routing/],
    ['productivity_office', /\bwms\b|warehouse|jira|linear|monday|clickup|\bplane\b|project.*manage|dashboard|dashy|vcard.*portfolio/],
    ['agent_routing', /router|route|optillm/],
    ['coding_agents', /codex|openhands|aider|nanocoder|task-master|claude|kilocode|orca/],
    ['memory_rag', /memory|rag|viking|qdrant|mem0|context-hub|anything-llm|acontext|supermemory|supavec/],
    ['mcp_and_tools', /\bmcp\b/],
    ['llm_inference', /ollama|localai|transformers|nanogpt|kobold|llama|mlx|picolm|kimi-k3|gpt4all|on.?device|gallery|llama.?macos/],
    ['browser_web', /browser|scrap|crawl|crawly|stagehand|archivebox|yt-dlp|autoscraper|free-tube/],
    ['music_generation', /music|suno|demucs|stem.?extract|spotify|tunee|antra|audio.?separat|source.?separat/],
    ['audiobooks_podcasts', /audiobook|podcast|video.?download|yt.?dlp|vidgee|vidbee/],
    ['voice_audio', /\bvoice\b|speech|whisper|tts|pipecat|chatterbox|voice.?clon|audiobook|dictat|transcrib|talker/i],
    ['image_video_content', /video|image|comfy|fooocus|moneyprinter|paperclip|manim|creator|montage|try.?on|sadtalker|studio|face|deepface|stereo|depth|vision|toonz|animation/],
    ['communications', /mail|email|whatsapp|sms|telegram|messag/],
    ['crm_productivity', /crm|twenty|nocodb|calendar|cal\.|appflowy|penpot|documenso/],
    ['payments_finance', /pay|payment|finance|trading|stock|banking|hedge|position.*sizer|pokie|budget|money/],
    ['security_observability', /prowler|crowdsec|uptime|hyperdx|watchtower|adguard|portracker|otel/],
    ['deployment_infrastructure', /deploy|coolify|cloudflare|contabo|tailscale|server|infra|tun2socks|lazyssh|firezone|dns|aws.?emulator|ministack|floci|localstack/],
    ['data_geo_documents', /graph|analytics|pdf|document|surya|thoth|formulator|tabularis|surrealdb/],
    ['learning_reference', /awesome|awesome-|skill|roadmap|book|learning|course|interview|handbook|algorithms|art.?of.?command|designer.skills|agent.skills/],
    ['orchestration', /agent|orchestrat|langgraph|crewai|metagpt|prefect|activepieces|n8n|huginn|autogen/],
  ];
  return rules.find(([, pattern]) => pattern.test(n))?.[0] ?? 'specialist_or_reference';
}

function sourceType(repo) {
  if (repo.fork && repo.parent?.full_name) return 'FORK';
  if (repo.full_name.toLowerCase().startsWith('hlonihypnotiseme/')) return 'C6_NATIVE';
  return 'THIRD_PARTY';
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
    classification: repo.fork ? 'forked_upstream' : 'profile_repository',
    source_type: sourceType(repo),
    repository_id: repo.full_name,
    discovery_source: 'github_authenticated_inventory',
    upstream_url: repo.parent?.html_url ?? null,
    upstream_owner: repo.parent?.owner?.login ?? null,
    upstream_repository: repo.parent?.full_name ?? null,
    duplicate_key: repo.name.toLowerCase(),
    update_signal: repo.pushed_at ? 'updated' : 'unknown',
    maintenance_signal: repo.archived ? 'archived' : (repo.pushed_at ? 'active_signal' : 'unknown'),
    evidence_type: 'github_metadata',
    evidence_timestamp: new Date().toISOString(),
    maturity: repo.archived ? 'UNKNOWN' : 'UNKNOWN',
    status: repo.archived ? 'IGNORE' : 'DISCOVERED',
    local_presence: 'UNKNOWN',
    local_path: null,
    version_pin: null,
    dependencies: [],
    c6_relevance: 'UNKNOWN',
    customer_relevance: 'UNKNOWN',
    internal_usage: 'UNKNOWN',
    composable_with: [],
    revenue_hunter_relevance: 'UNKNOWN',
    adapter: null,
    health: 'UNKNOWN',
    evidence: ['github_metadata'],
    notes: 'Inventory discovery does not establish installation, health, authorization, or production readiness.'
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
