"""Hard risk boundary for C6 Smart Trading OS.

AI recommendations cannot override this gate.
"""

from dataclasses import dataclass
from enum import Enum


class Gate(str, Enum):
    ALLOW = "ALLOW"
    BLOCK = "BLOCK"
    REVIEW = "REVIEW"


@dataclass(frozen=True)
class RiskPolicy:
    max_risk_pct: float = 1.0
    require_stop_loss: bool = True
    max_open_positions: int = 3


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
    """Return the only decision the execution layer is permitted to consume."""
    if not request.execution_enabled or not request.account_id:
        return Gate.BLOCK

    if request.risk_pct <= 0 or request.risk_pct > policy.max_risk_pct:
        return Gate.BLOCK

    if policy.require_stop_loss and not request.stop_loss:
        return Gate.BLOCK

    if request.open_positions >= policy.max_open_positions:
        return Gate.BLOCK

    # AI can veto/review, but can never bypass hard controls.
    if request.ai_gate in (Gate.BLOCK, Gate.REVIEW):
        return request.ai_gate

    return Gate.ALLOW
