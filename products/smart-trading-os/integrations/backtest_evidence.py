"""Build fail-closed, schema-shaped evidence records for validation runs."""
from __future__ import annotations

import math
from datetime import datetime
from typing import Any

VALID_MODES = {"BACKTEST", "WALK_FORWARD", "OUT_OF_SAMPLE", "PAPER", "SHADOW", "DEMO"}
VALID_STATUSES = {"PASS", "FAIL", "INCOMPLETE", "NOT_RUN"}
SCALAR_TYPES = (str, int, float, bool, type(None))


def _aware_datetime(value: str, field: str) -> datetime:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{field} must be a non-empty ISO-8601 date-time")
    try:
        parsed = datetime.fromisoformat(value.strip().replace("Z", "+00:00"))
    except ValueError as exc:
        raise ValueError(f"{field} must be an ISO-8601 date-time") from exc
    if parsed.tzinfo is None or parsed.utcoffset() is None:
        raise ValueError(f"{field} must include a timezone")
    return parsed


def build_validation_evidence(
    *,
    run_id: str,
    mode: str,
    strategy_id: str,
    data_source: str,
    started_at: str,
    ended_at: str,
    metrics: dict[str, Any],
    artifacts: list[str] | tuple[str, ...],
    fees_included: bool,
    slippage_included: bool,
    status: str,
    limitations: list[str] | tuple[str, ...] = (),
    strategy_version: str | None = None,
    cost_notes: str = "",
) -> dict[str, Any]:
    """Create a JSON-schema-shaped evidence record and downgrade unsupported PASS.

    This function does not run a backtest. It prevents callers from claiming
    PASS when fee/slippage accounting or reproducible artifact references are
    missing. Upstream framework results still require independent validation.
    """
    required = {"run_id": run_id, "strategy_id": strategy_id, "data_source": data_source}
    for field, value in required.items():
        if not isinstance(value, str) or not value.strip():
            raise ValueError(f"{field} is required")
    if mode not in VALID_MODES:
        raise ValueError(f"mode must be one of {sorted(VALID_MODES)}")
    if status not in VALID_STATUSES:
        raise ValueError(f"status must be one of {sorted(VALID_STATUSES)}")
    if not isinstance(fees_included, bool) or not isinstance(slippage_included, bool):
        raise ValueError("fees_included and slippage_included must be booleans")
    start = _aware_datetime(started_at, "started_at")
    end = _aware_datetime(ended_at, "ended_at")
    if end < start:
        raise ValueError("ended_at cannot be before started_at")
    if not isinstance(metrics, dict):
        raise ValueError("metrics must be an object")
    for key, value in metrics.items():
        if not isinstance(key, str) or not key.strip():
            raise ValueError("metric names must be non-empty strings")
        if not isinstance(value, SCALAR_TYPES):
            raise ValueError(f"metric {key!r} must be a scalar")
        if isinstance(value, float) and not math.isfinite(value):
            raise ValueError(f"metric {key!r} must be finite")
    if not isinstance(artifacts, (list, tuple)) or any(
        not isinstance(item, str) or not item.strip() for item in artifacts
    ):
        raise ValueError("artifacts must be a list of non-empty evidence references")
    if not isinstance(limitations, (list, tuple)) or any(
        not isinstance(item, str) or not item.strip() for item in limitations
    ):
        raise ValueError("limitations must be a list of non-empty strings")

    final_status = status
    final_limitations = list(limitations)
    if status == "PASS" and (not fees_included or not slippage_included or not artifacts):
        final_status = "INCOMPLETE"
        final_limitations.append(
            "PASS downgraded: fee and slippage accounting plus reproducible artifact references are required."
        )

    record = {
        "run_id": run_id.strip(),
        "mode": mode,
        "strategy_id": strategy_id.strip(),
        "data_source": data_source.strip(),
        "cost_model": {
            "fees_included": fees_included,
            "slippage_included": slippage_included,
            "notes": cost_notes,
        },
        "started_at": start.isoformat(),
        "ended_at": end.isoformat(),
        "metrics": metrics,
        "artifacts": list(artifacts),
        "limitations": final_limitations,
        "status": final_status,
    }
    if strategy_version is not None:
        if not isinstance(strategy_version, str):
            raise ValueError("strategy_version must be a string when supplied")
        record["strategy_version"] = strategy_version
    return record
