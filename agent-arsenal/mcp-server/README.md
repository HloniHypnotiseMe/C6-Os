# c6-arsenal-mcp

MCP server exposing the C6 Agent Arsenal.

## Tools

| Tool | Purpose |
|---|---|
| `resolve_capability` | Resolve a capability to a provider via `resolver/resolve.py` |
| `list_capabilities` | All 25 capabilities with providers + adapters |
| `get_provider` | Full metadata for one provider |
| `find_repository` | Search 474+ registered repos by name |
| `list_repositories_by_category` | All repos in a category |
| `arsenal_stats` | Summary counts |

## Requirements

- Node >= 20
- Python 3.10+ (`python` must be on PATH)
- `npm install` run once in this directory

## Install

```bash
cd agent-arsenal/mcp-server
npm install

## Client config

Add to your MCP client:

    {
      "mcpServers": {
        "c6-arsenal": {
          "command": "node",
          "args": ["/absolute/path/C6-Os/agent-arsenal/mcp-server/server.mjs"]
        }
      }
    }

## Run manually

    node agent-arsenal/mcp-server/server.mjs
