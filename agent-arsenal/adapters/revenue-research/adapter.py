#!/usr/bin/env python3
"""C6 Revenue Research adapter v0.1.

Contract-first adapter. It validates and normalizes a commercial research
request; it deliberately does not invoke an external provider yet.
"""

from __future__ import annotations

import json
import sys
from typing import Any

ADAPTER = "c6-revenue-research"
CAPABILITY = "research"


def prepare(request: dict[str, Any]) -> dict[str, Any]:
    required = ("objective", "market", "customer_type")
    missing = [key for key in required if not str(request.get(key, "")).strip()]
    if missing:
        return {"status": "failed", "error": "missing required fields", "missing": missing}

    return {
        "status": "ready",
        "adapter": ADAPTER,
        "capability": CAPABILITY,
        "objective": str(request["objective"]).strip(),
        "market": str(request["market"]).strip(),
        "customer_type": str(request["customer_type"]).strip(),
        "constraints": request.get("constraints", []),
        "evidence_required": bool(request.get("evidence_required", True)),
        "max_risk": request.get("max_risk", "controlled"),
        "execution_status": "not_implemented",
        "next_gate": "provider_invocation",
    }


def main() -> int:
    payload = json.load(sys.stdin)
    print(json.dumps(prepare(payload), indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
