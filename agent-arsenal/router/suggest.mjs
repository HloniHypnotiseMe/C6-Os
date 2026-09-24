import { loadCapabilitiesYAML, loadResolutionIndex, loadRepositoryRegistry, loadInventorySnapshot } from "../mcp-server/lib.mjs";

const STOP = new Set([
  "a","an","and","are","as","at","be","before","by","for","from","how","i","in","is",
  "it","me","my","of","on","or","please","the","this","to","use","we","with","you"
]);

function tokens(value) {
  return new Set(
    String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, " ")
      .split(/\s+/)
      .filter((x) => x.length >= 3 && !STOP.has(x))
  );
}

function scoreTask(taskTokens, capability) {
  const idTokens = tokens(capability.id);
  const purposeTokens = tokens(capability.purpose);
  const all = new Set([...idTokens, ...purposeTokens]);
  let overlap = 0;
  for (const token of taskTokens) if (all.has(token)) overlap += 1;

  const taskText = [...taskTokens].join(" ");
  const purposeText = [...purposeTokens].join(" ");
  const phraseBoost = purposeText.length > 0 && (
    purposeText.split(" ").filter((word) => taskText.includes(word)).length >= 2 ? 0.1 : 0
  );

  const raw = taskTokens.size ? overlap / Math.min(taskTokens.size, 8) : 0;
  return Math.min(1, raw + phraseBoost);
}


function scoreCatalog(taskTokens, name, category, description = "") {
  const hay = tokens([name, category, description].join(" "));
  let overlap = 0;
  for (const token of taskTokens) if (hay.has(token)) overlap += 1;
  return taskTokens.size ? overlap / Math.min(taskTokens.size, 8) : 0;
}

async function catalogCandidates(task, maxCandidates = 8) {
  const [registry, snapshot] = await Promise.all([loadRepositoryRegistry(), loadInventorySnapshot()]);
  const byName = new Map((snapshot.repositories || []).map(r => [String(r.name).toLowerCase(), r]));
  const out = [];
  for (const [category, names] of Object.entries(registry.capabilities || {})) {
    for (const name of names || []) {
      const meta = byName.get(String(name).toLowerCase()) || {};
      const fit = scoreCatalog(tokens(task), name, category, meta.description || "");
      if (fit > 0) out.push({
        repository: name,
        category,
        fit: Number(fit.toFixed(3)),
        description: meta.description || null,
        source: meta.full_name || ("HloniHypnotiseMe/" + name)
      });
    }
  }
  return out.sort((a,b)=>b.fit-a.fit || a.repository.localeCompare(b.repository)).slice(0, maxCandidates);
}

export async function suggestCapabilities(task, { maxCandidates = 3, allow = [] } = {}) {
  const request = String(task || "").trim();
  if (!request) {
    return { status: "invalid", reason: "task_required", suggestion: null, candidates: [] };
  }
  if (request.length > 12000) {
    return { status: "invalid", reason: "task_too_long", suggestion: null, candidates: [] };
  }

  const [capRegistry, index] = await Promise.all([
    loadCapabilitiesYAML(),
    loadResolutionIndex(),
  ]);
  const capabilities = capRegistry.capabilities || [];
  const allowed = allow.length
    ? capabilities.filter((c) => allow.includes(c.id))
    : capabilities;

  const taskTokens = tokens(request);
  const candidates = allowed
    .map((capability) => {
      const fit = scoreTask(taskTokens, capability);
      const indexed = index.capabilities?.[capability.id] || {};
      return {
        capability: capability.id,
        purpose: capability.purpose,
        fit: Number(fit.toFixed(3)),
        providers: indexed.providers || capability.providers || [],
        adapter: indexed.adapter || null,
      };
    })
    .filter((candidate) => candidate.fit > 0)
    .sort((a, b) => b.fit - a.fit || a.capability.localeCompare(b.capability))
    .slice(0, Math.max(1, Math.min(3, maxCandidates)));

  if (!candidates.length) {
    return {
      status: "none",
      reason: "no_local_candidate",
      suggestion: null,
      candidates: [],
      authorization_required: false,
      executes: false,
    };
  }

  const top = candidates[0];
  const status = top.fit >= 0.5 ? "local_candidate" : "local_only";
  return {
    status,
    reason: "bounded_local_candidate_shortlist",
    suggestion: top,
    candidates,
    authorization_required: true,
    executes: false,
    semantic_judgement: false,
    next_step: "Review the capability, then call resolve_capability with explicit runtime/risk/permission constraints before execution.",
  };
}

export async function suggestCapabilityById(capabilityId) {
  const [capRegistry, index] = await Promise.all([
    loadCapabilitiesYAML(),
    loadResolutionIndex(),
  ]);
  const capability = (capRegistry.capabilities || []).find((item) => item.id === capabilityId);
  if (!capability) {
    return { status: "unavailable", reason: "unknown_capability", suggestion: null, candidates: [] };
  }
  const indexed = index.capabilities?.[capability.id] || {};
  return {
    status: "explicit_selection",
    reason: "user_or_host_named_capability",
    suggestion: {
      capability: capability.id,
      purpose: capability.purpose,
      providers: indexed.providers || capability.providers || [],
      adapter: indexed.adapter || null,
    },
    candidates: [],
    authorization_required: true,
    executes: false,
  };
}
