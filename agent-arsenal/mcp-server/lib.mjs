import { readFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { parse as parseYAML } from 'yaml';

const execFileAsync = promisify(execFile);

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARSENAL_ROOT = resolve(__dirname, '..');
const REPO_ROOT = resolve(ARSENAL_ROOT, '..');

const PATHS = {
  resolutionIndex: resolve(ARSENAL_ROOT, 'registry', 'resolution-index.json'),
  providers: resolve(ARSENAL_ROOT, 'registry', 'providers.yaml'),
  capabilities: resolve(ARSENAL_ROOT, 'registry', 'capabilities.yaml'),
  repositoryRegistry: resolve(ARSENAL_ROOT, 'universal', 'repository-registry.yaml'),
  inventorySnapshot: resolve(ARSENAL_ROOT, 'universal', 'inventory-snapshot.json'),
  repositoryEvidence: resolve(ARSENAL_ROOT, 'universal', 'repository-evidence.json'),
  resolverScript: resolve(ARSENAL_ROOT, 'resolver', 'resolve.py'),
};

async function readJSON(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

async function readYAML(path) {
  return parseYAML(await readFile(path, 'utf8'));
}

export async function loadResolutionIndex() {
  return readJSON(PATHS.resolutionIndex);
}

export async function loadProvidersYAML() {
  return readYAML(PATHS.providers);
}

export async function loadCapabilitiesYAML() {
  return readYAML(PATHS.capabilities);
}

export async function loadRepositoryRegistry() {
  return readYAML(PATHS.repositoryRegistry);
}

export async function loadInventorySnapshot() {
  return readJSON(PATHS.inventorySnapshot);
}

export async function loadRepositoryEvidence() {
  return readJSON(PATHS.repositoryEvidence);
}

export async function invokeResolver(capability, opts = {}) {
  const args = [PATHS.resolverScript, capability];
  if (opts.maxRisk) args.push('--max-risk', opts.maxRisk);
  if (opts.runtime) args.push('--runtime', opts.runtime);
  if (Array.isArray(opts.permissions)) {
    for (const p of opts.permissions) args.push('--permission', p);
  }
  if (opts.all) args.push('--all');

  try {
    const { stdout } = await execFileAsync('python', args, {
      cwd: REPO_ROOT,
      timeout: 15_000,
    });
    return JSON.parse(stdout);
  } catch (err) {
    if (err.stdout) {
      try { return JSON.parse(err.stdout); } catch { /* fallthrough */ }
    }
    return {
      status: 'error',
      error: err.message,
      stderr: err.stderr?.toString?.() ?? null,
    };
  }
}

export async function findRepositoriesByName(query) {
  const reg = await loadRepositoryRegistry();
  const q = String(query || '').toLowerCase();
  const hits = [];
  for (const [category, items] of Object.entries(reg.capabilities || {})) {
    for (const name of items || []) {
      if (String(name).toLowerCase().includes(q)) {
        hits.push({ name, category });
      }
    }
  }
  return hits;
}

export async function listRepositoriesByCategory(category) {
  const reg = await loadRepositoryRegistry();
  return {
    category,
    repositories: reg.capabilities?.[category] ?? null,
  };
}

export async function arsenalStats() {
  const [index, reg, snap] = await Promise.all([
    loadResolutionIndex(),
    loadRepositoryRegistry(),
    loadInventorySnapshot(),
  ]);
  const categories = Object.keys(reg.capabilities || {});
  const repoCount = categories.reduce(
    (n, c) => n + (reg.capabilities[c]?.length || 0),
    0
  );
  return {
    schema_version: index.schema_version,
    capabilities: Object.keys(index.capabilities || {}).length,
    providers: Object.keys(index.providers || {}).length,
    repository_categories: categories.length,
    repositories: repoCount,
    inventory_repositories: snap.counts?.repositories ?? null,
    inventory_forks: snap.counts?.forks ?? null,
  };
}

export const PATHS_FOR_DEBUG = PATHS;
