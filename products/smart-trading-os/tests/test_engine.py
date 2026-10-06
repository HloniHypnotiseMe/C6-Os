import sys
from pathlib import Path
from decimal import Decimal

PRODUCT_DIR = Path(__file__).parents[1]
sys.path.insert(0, str(PRODUCT_DIR))

from engine.contracts import OrderRequest, Signal
from engine.decision import decide
from engine.paper import PaperExecutionAdapter
from engine.risk import Gate

def test_paper_requires_stop_loss():
    result = PaperExecutionAdapter("paper-1").submit(
        OrderRequest("paper-1", "XAUUSD", "BUY", Decimal(".1"), None, "o1")
    )
    assert result.status == "REJECTED" and result.reason == "STOP_LOSS_REQUIRED"

def test_paper_fills():
    broker = PaperExecutionAdapter("paper-1")
    result = broker.submit(
        OrderRequest("paper-1", "XAUUSD", "BUY", Decimal(".1"), Decimal("2350"), "o2")
    )
    assert result.status == "FILLED" and broker.account("paper-1").open_positions == 1

def test_hard_risk_wins():
    signal = Signal("s1", "XAUUSD", "BUY", .9, "test", ("evidence",))
    assert decide(signal, account_id="paper-1", execution_enabled=True, risk_pct=2,
                  stop_loss=True, open_positions=0, ai_gate=Gate.ALLOW) == Gate.BLOCK

def test_ai_veto():
    signal = Signal("s2", "XAUUSD", "BUY", .9, "test", ("evidence",))
    assert decide(signal, account_id="paper-1", execution_enabled=True, risk_pct=.5,
                  stop_loss=True, open_positions=0, ai_gate=Gate.BLOCK) == Gate.BLOCK
