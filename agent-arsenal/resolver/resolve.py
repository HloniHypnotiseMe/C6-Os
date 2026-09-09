#!/usr/bin/env python3
"""C6 Agent Arsenal Resolver v0.2.

Stdlib-only resolver. It converts a capability request into a deterministic
provider selection plus runtime, permissions, risk and adapter contract.

Usage:
  python agent-arsenal/resolver/resolve.py browser_automation
  python agent-arsenal/resolver/resolve.py browser_automation --max-risk controlled
  python agent-arsenal/resolver/resolve.py sandbox_execution --permission sandbox
  python agent-arsenal/resolver/resolve.py browser_automation --all
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "registry" / "resolution-index.json"

RISK_ORDER = {"low": 0, "controlled": 1, "high": 2}


def load_index() -> dict:
    with INDEX.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def resolve(
    capability: str,
    *,
    max_risk: str = "high",
    runtime: str | None = None,
    permissions: list[str] | None = None,
    all_matches: bool = False,
) -> dict:
    data = load_index()
    caps = data.get("capabilities", {})
    providers = data.get("providers", {})

    if capability not in caps:
        raise KeyError(f"Unknown capability: {capability}")
    if max_risk not in RISK_ORDER:
        raise ValueError(f"Unknown risk ceiling: {max_risk}")

    record = caps[capability]
    requested_permissions = set(permissions or [])
    matches = []

    for provider_id in record.get("providers", []):
        provider = providers.get(provider_id)
        if not provider:
            continue
        if RISK_ORDER[provider.get("risk", "high")] > RISK_ORDER[max_risk]:
            continue
        if runtime and provider.get("runtime") != runtime:
            continue
        if not requested_permissions.issubset(set(provider.get("permissions", []))):
            continue

        matches.append({
            "provider": provider_id,
            "risk": provider["risk"],
            "permissions": provider.get("permissions", []),
            "runtime": provider.get("runtime"),
            "registry_status": provider.get("status"),
            "adapter": record.get("adapter"),
            "adapter_status": "contract_only",
        })

    if not matches:
        raise LookupError(f"No provider satisfies request for capability: {capability}")

    result = {
        "schema_version": data["schema_version"],
        "status": "resolved",
        "capability": capability,
        "selection": matches if all_matches else matches[0],
        "resolution_policy": "registry order + risk ceiling + runtime + permission constraints",
    }
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description="Resolve a C6 Agent Arsenal capability.")
    parser.add_argument("capability")
    parser.add_argument("--max-risk", choices=tuple(RISK_ORDER), default="high")
    parser.add_argument("--runtime")
    parser.add_argument("--permission", action="append", default=[])
    parser.add_argument("--all", action="store_true", dest="all_matches")
    args = parser.parse_args()

    try:
        result = resolve(
            args.capability,
            max_risk=args.max_risk,
            runtime=args.runtime,
            permissions=args.permission,
            all_matches=args.all_matches,
        )
    except (KeyError, ValueError, LookupError) as exc:
        print(json.dumps({"status": "unresolved", "error": str(exc)}))
        return 2

    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
