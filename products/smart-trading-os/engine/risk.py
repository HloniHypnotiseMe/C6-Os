from dataclasses import dataclass
from enum import Enum
class Gate(str, Enum):
    ALLOW="ALLOW"; BLOCK="BLOCK"; REVIEW="REVIEW"
@dataclass(frozen=True)
class RiskPolicy:
    max_risk_pct: float=1.0
    require_stop_loss: bool=True
    max_open_positions: int=3
    min_signal_confidence: float=0.5

    def __post_init__(self):
        if not 0.0 <= self.min_signal_confidence <= 1.0:
            raise ValueError("min_signal_confidence must be between 0 and 1")
@dataclass(frozen=True)
class TradeRequest:
    symbol: str; risk_pct: float; stop_loss: bool; open_positions: int
    execution_enabled: bool; account_id: str; ai_gate: Gate
def evaluate(request: TradeRequest, policy: RiskPolicy=RiskPolicy()) -> Gate:
    if not request.execution_enabled or not request.account_id: return Gate.BLOCK
    if request.risk_pct <= 0 or request.risk_pct > policy.max_risk_pct: return Gate.BLOCK
    if policy.require_stop_loss and not request.stop_loss: return Gate.BLOCK
    if request.open_positions >= policy.max_open_positions: return Gate.BLOCK
    if request.ai_gate in (Gate.BLOCK, Gate.REVIEW): return request.ai_gate
    return Gate.ALLOW
