"""Compatibility interface for the canonical Smart Trading OS risk engine.

Keep the request-oriented contract used by the original risk-gate tests while
delegating every decision to the canonical engine implementation.
"""
from dataclasses import dataclass

from products.smart_trading_os.engine.risk import Gate, RiskPolicy, evaluate as evaluate_engine


@dataclass(frozen=True)
class TradeRequest:
    symbol: str
    risk_pct: float
    stop_loss: bool
    open_positions: int
    execution_enabled: bool
    account_id: str
    ai_gate: Gate


def evaluate(request: TradeRequest, policy: RiskPolicy = RiskPolicy()) -> Gate:
    return evaluate_engine(
        risk_pct=request.risk_pct,
        stop_loss=request.stop_loss,
        open_positions=request.open_positions,
        execution_enabled=request.execution_enabled,
        account_id=request.account_id,
        ai_gate=request.ai_gate,
        policy=policy,
    )
