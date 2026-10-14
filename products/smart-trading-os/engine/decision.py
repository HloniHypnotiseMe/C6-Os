from math import isfinite

from .contracts import Signal
from .risk import Gate, RiskPolicy, TradeRequest, evaluate


def decide(
    signal: Signal,
    *,
    account_id: str,
    execution_enabled: bool,
    risk_pct: float,
    stop_loss: bool,
    open_positions: int,
    ai_gate: Gate,
    policy: RiskPolicy = RiskPolicy(),
) -> Gate:
    # Upstream ratings may be categorical and provide no calibrated confidence.
    # Missing/invalid/low confidence must never become execution permission.
    try:
        confidence = float(signal.confidence)
    except (TypeError, ValueError):
        return Gate.REVIEW
    if not isfinite(confidence) or not 0.0 <= confidence <= 1.0:
        return Gate.REVIEW
    if confidence < policy.min_signal_confidence:
        return Gate.REVIEW
    if signal.action == "HOLD":
        return Gate.REVIEW
    return evaluate(
        TradeRequest(
            signal.symbol,
            risk_pct,
            stop_loss,
            open_positions,
            execution_enabled,
            account_id,
            ai_gate,
        ),
        policy,
    )
