#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import {
  loadResolutionIndex,
  loadProvidersYAML,
  loadCapabilitiesYAML,
  invokeResolver,
  findRepositoriesByName,
  listRepositoriesByCategory,
  arsenalStats,
} from './lib.mjs';

const TOOLS = [
  {
    name: 'resolve_capability',
    description:
      'Resolve a capability ID to a provider using the C6 Arsenal resolver. ' +
      'Returns provider, risk, permissions, runtime, registry status, and adapter contract. ' +
      'Use this BEFORE building or installing any capability.',
    inputSchema: {
      type: 'object',
      properties: {
        capability: {
          type: 'string',
          description: 'Capability ID (e.g. "browser_automation", "agent_memory").',
        },
        max_risk: {
          type: 'string',
          enum: ['low', 'controlled', 'high'],
          description: 'Risk ceiling. Defaults to "high".',
        },
        runtime: {
          type: 'string',
          description: 'Optional runtime filter (e.g. "vps", "sandbox").',
        },
        permissions: {
          type: 'array',
          items: { type: 'string' },
          description: 'Required permissions that the provider must support.',
        },
        all: {
          type: 'boolean',
          description: 'If true, return all matching providers instead of the first.',
        },
      },
      required: ['capability'],
    },
  },
  {
    name: 'list_capabilities',
    description: 'List all registered C6 capabilities with their mapped providers and adapters.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_provider',
    description: 'Fetch full metadata for a single provider from the C6 provider registry.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Provider ID (e.g. "n8n", "openviking").' },
      },
      required: ['id'],
    },
  },
  {
    name: 'find_repository',
    description:
      'Search the C6 repository registry (474+ forks) by name. Returns matching repos and their capability category.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Partial or full repository name.' },
      },
      required: ['query'],
    },
  },
  {
    name: 'list_repositories_by_category',
    description: 'List all repositories registered under a capability category.',
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string', description: 'Category key (e.g. "memory_rag", "voice_audio").' },
      },
      required: ['category'],
    },
  },
  {
    name: 'arsenal_stats',
    description:
      'Summarize the C6 Agent Arsenal: counts of capabilities, providers, repository categories, and total repositories.',
    inputSchema: { type: 'object', properties: {} },
  },
];

function textResult(obj) {
  return { content: [{ type: 'text', text: JSON.stringify(obj, null, 2) }] };
}

function errorResult(message) {
  return { content: [{ type: 'text', text: JSON.stringify({ status: 'error', error: message }) }], isError: true };
}

const server = new Server(
  { name: 'c6-arsenal-mcp', version: '0.1.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args = {} } = request.params;
  try {
    switch (name) {
      case 'resolve_capability':
        return textResult(await invokeResolver(args.capability, {
          maxRisk: args.max_risk,
          runtime: args.runtime,
          permissions: args.permissions,
          all: args.all,
        }));

      case 'list_capabilities': {
        const index = await loadResolutionIndex();
        return textResult(index.capabilities || {});
      }

      case 'get_provider': {
        const [providers, index] = await Promise.all([
          loadProvidersYAML(),
          loadResolutionIndex(),
        ]);
        const fromYAML = (providers.providers || []).find((p) => p.id === args.id);
        const fromIndex = index.providers?.[args.id];
        if (!fromYAML && !fromIndex) return errorResult(`Unknown provider: ${args.id}`);
        return textResult({ yaml: fromYAML ?? null, index: fromIndex ?? null });
      }

      case 'find_repository': {
        const hits = await findRepositoriesByName(args.query);
        return textResult({ query: args.query, matches: hits, count: hits.length });
      }

      case 'list_repositories_by_category': {
        const result = await listRepositoriesByCategory(args.category);
        if (result.repositories === null) return errorResult(`Unknown category: ${args.category}`);
        return textResult(result);
      }

      case 'arsenal_stats':
        return textResult(await arsenalStats());

      default:
        return errorResult(`Unknown tool: ${name}`);
    }
  } catch (err) {
    return errorResult(err.message);
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
