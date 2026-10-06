from .contracts import Signal
from .risk import Gate, RiskPolicy, TradeRequest, evaluate
def decide(signal: Signal, *, account_id: str, execution_enabled: bool,
           risk_pct: float, stop_loss: bool, open_positions: int,
           ai_gate: Gate, policy: RiskPolicy=RiskPolicy()) -> Gate:
    if signal.action == "HOLD": return Gate.REVIEW
    return evaluate(TradeRequest(signal.symbol,risk_pct,stop_loss,open_positions,
                                 execution_enabled,account_id,ai_gate),policy)
