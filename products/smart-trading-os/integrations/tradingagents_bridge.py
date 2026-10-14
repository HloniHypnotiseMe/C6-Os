"""Small, dependency-free boundary for adapting TradingAgents output into C6.

This does not import or pretend to run TradingAgents. A caller must run the
upstream workflow and pass its actual output plus source evidence here.
"""
from typing import Any
from engine.contracts import Signal


def to_c6_signal(
    result: dict[str, Any], *, signal_id: str, symbol: str,
    evidence: tuple[str, ...],
) -> Signal:
    action = str(result.get("action", result.get("signal", "HOLD"))).upper()
    if action not in {"BUY", "SELL", "HOLD"}:
        action = "HOLD"
    try:
        confidence = float(result.get("confidence", 0.0))
    except (TypeError, ValueError):
        confidence = 0.0
    if not 0.0 <= confidence <= 1.0:
        confidence = 0.0
    rationale = result.get("rationale", result.get("reasoning", ""))
    if not isinstance(rationale, str):
        rationale = ""
    return Signal(
        signal_id=signal_id,
        symbol=symbol,
        action=action,
        confidence=confidence,
        rationale=rationale[:4000],
        evidence=tuple(str(item)[:500] for item in evidence if str(item).strip()),
    )
