#!/usr/bin/env python3
"""C6 Revenue Research adapter v0.2.

Invokes an installed MetaGPT Researcher through its documented CLI. The
adapter does not install dependencies or fabricate credentials; the caller
must provide a working MetaGPT environment and any required search-provider
configuration.
"""

from __future__ import annotations

import argparse
import json
import os
import shutil
import subprocess
from typing import Any

ADAPTER = "c6-revenue-research"
CAPABILITY = "research"
PROVIDER = "metagpt"


def prepare(request: dict[str, Any]) -> dict[str, Any]:
    required = ("objective", "market", "customer_type")
    missing = [key for key in required if not str(request.get(key, "")).strip()]
    if missing:
        return {"status": "failed", "error": "missing required fields", "missing": missing}
    return {
        "status": "ready",
        "adapter": ADAPTER,
        "capability": CAPABILITY,
        "provider": PROVIDER,
        "objective": str(request["objective"]).strip(),
        "market": str(request["market"]).strip(),
        "customer_type": str(request["customer_type"]).strip(),
        "constraints": request.get("constraints", []),
        "evidence_required": bool(request.get("evidence_required", True)),
        "max_risk": request.get("max_risk", "controlled"),
    }


def build_research_question(request: dict[str, Any]) -> str:
    constraints = request.get("constraints", [])
    constraint_text = "; ".join(str(item) for item in constraints) or "Use evidence-backed findings and clearly mark uncertainty."
    return (
        f"Commercial research objective: {request['objective']}\n"
        f"Market: {request['market']}\n"
        f"Customer type: {request['customer_type']}\n"
        f"Constraints: {constraint_text}\n"
        "Return source-backed findings, relevant prospects or market opportunities, "
        "and concrete commercial actions. Do not fabricate facts."
    )


def invoke_metagpt(request: dict[str, Any], *, timeout: int = 900) -> dict[str, Any]:
    prepared = prepare(request)
    if prepared.get("status") != "ready":
        return prepared

    python_executable = os.environ.get("C6_METAGPT_PYTHON") or shutil.which("python3") or shutil.which("python")
    if not python_executable:
        return {
            **prepared,
            "status": "failed",
            "execution_status": "provider_unavailable",
            "error": "No Python executable found for MetaGPT invocation.",
        }

    question = build_research_question(request)
    command = [python_executable, "-m", "metagpt.roles.researcher", question]
    try:
        completed = subprocess.run(
            command,
            capture_output=True,
            text=True,
            timeout=timeout,
            check=False,
        )
    except subprocess.TimeoutExpired as exc:
        return {
            **prepared,
            "status": "failed",
            "execution_status": "timeout",
            "error": f"MetaGPT researcher exceeded {timeout}s.",
            "stdout": exc.stdout or "",
            "stderr": exc.stderr or "",
        }
    except OSError as exc:
        return {
            **prepared,
            "status": "failed",
            "execution_status": "provider_unavailable",
            "error": str(exc),
        }

    result = {
        **prepared,
        "status": "executed" if completed.returncode == 0 else "failed",
        "execution_status": "completed" if completed.returncode == 0 else "provider_error",
        "return_code": completed.returncode,
        "question": question,
        "evidence": [],
        "findings": [completed.stdout.strip()] if completed.stdout.strip() else [],
        "commercial_actions": [],
        "verification": {
            "provider": PROVIDER,
            "command": command,
            "return_code": completed.returncode,
            "stderr": completed.stderr.strip(),
        },
    }
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description="Run C6 revenue research through MetaGPT.")
    parser.add_argument("request", help="JSON request file")
    parser.add_argument("--timeout", type=int, default=900)
    args = parser.parse_args()

    with open(args.request, "r", encoding="utf-8") as handle:
        request = json.load(handle)
    result = invoke_metagpt(request, timeout=args.timeout)
    print(json.dumps(result, indent=2))
    return 0 if result.get("status") == "executed" else 2


if __name__ == "__main__":
    raise SystemExit(main())
