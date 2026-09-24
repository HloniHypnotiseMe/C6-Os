#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';

const registryPath = process.env.C6_REGISTRY ?? 'agent-arsenal/universal/repository-registry.yaml';
const inventoryPath = process.env.C6_INVENTORY ?? 'agent-arsenal/universal/inventory-snapshot.json';

const registry = await readFile(registryPath, 'utf8');
const inventory = JSON.parse(await readFile(inventoryPath, 'utf8'));
const repos = inventory.repositories ?? [];

const grouped = new Map();
for (const repo of repos) {
  if (!repo?.name || !repo.category) continue;
  if (!grouped.has(repo.category)) grouped.set(repo.category, []);
  grouped.get(repo.category).push(repo.name);
}

function blockRange(text, category) {
  const marker = '  ' + category + ':\n';
  const start = text.indexOf(marker);
  if (start < 0) return null;
  const bodyStart = start + marker.length;
  const next = text.slice(bodyStart).search(/^  [A-Za-z0-9_]+:\n/m);
  const end = next < 0 ? text.length : bodyStart + next;
  return { start, end };
}

function quote(name) {
  return /^[A-Za-z0-9_.-]+$/.test(name) ? name : JSON.stringify(name);
}

let out = registry;
const additions = [];
for (const [category, names] of grouped) {
  const range = blockRange(out, category);
  if (!range) continue;
  const section = out.slice(range.start, range.end);
  const existing = new Set(
    [...section.matchAll(/^    - (.+)$/gm)]
      .map(m => m[1].trim().replace(/^['"]|['"]$/g, ''))
  );
  const missing = [...new Set(names)]
    .filter(n => !existing.has(n))
    .sort((a,b) => a.localeCompare(b));
  if (!missing.length) continue;
  const insertion = missing.map(n => '    - ' + quote(n)).join('\n') + '\n';
  out = out.slice(0, range.end) + insertion + out.slice(range.end);
  additions.push({ category, count: missing.length, repositories: missing });
}

const date = new Date().toISOString().slice(0, 10);
out = out.replace(/^last_reconciled:.*$/m, 'last_reconciled: "' + date + '"');
await writeFile(registryPath, out.endsWith('\n') ? out : out + '\n');

console.log(JSON.stringify({
  status: 'reconciled',
  inventory_repositories: repos.length,
  categories_considered: grouped.size,
  additions
}, null, 2));
