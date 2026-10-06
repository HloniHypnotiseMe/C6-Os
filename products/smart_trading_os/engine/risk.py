from dataclasses import dataclass
from enum import Enum
class Gate(str,Enum): ALLOW="ALLOW"; BLOCK="BLOCK"; REVIEW="REVIEW"
@dataclass(frozen=True)
class RiskPolicy:
    max_risk_pct:float=1.0; require_stop_loss:bool=True; max_open_positions:int=3
def evaluate(*,risk_pct:float,stop_loss:bool,open_positions:int,execution_enabled:bool,account_id:str,ai_gate:Gate,policy:RiskPolicy=RiskPolicy())->Gate:
    if not execution_enabled or not account_id:return Gate.BLOCK
    if risk_pct<=0 or risk_pct>policy.max_risk_pct:return Gate.BLOCK
    if policy.require_stop_loss and not stop_loss:return Gate.BLOCK
    if open_positions>=policy.max_open_positions:return Gate.BLOCK
    if ai_gate in (Gate.BLOCK,Gate.REVIEW):return ai_gate
    return Gate.ALLOW
