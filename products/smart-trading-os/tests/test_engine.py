import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).parents[3]))
from decimal import Decimal
from products.smart_trading_os.engine.contracts import OrderRequest, Signal
from products.smart_trading_os.engine.decision import decide
from products.smart_trading_os.engine.paper import PaperExecutionAdapter
from products.smart_trading_os.engine.risk import Gate
def test_paper_requires_stop_loss():
    r=PaperExecutionAdapter("paper-1").submit(OrderRequest("paper-1","XAUUSD","BUY",Decimal(".1"),None,"o1"))
    assert r.status=="REJECTED" and r.reason=="STOP_LOSS_REQUIRED"
def test_paper_fills():
    b=PaperExecutionAdapter("paper-1")
    r=b.submit(OrderRequest("paper-1","XAUUSD","BUY",Decimal(".1"),Decimal("2350"),"o2"))
    assert r.status=="FILLED" and b.account("paper-1").open_positions==1
def test_hard_risk_wins():
    s=Signal("s1","XAUUSD","BUY",.9,"test",("candle:test",))
    assert decide(s,account_id="paper-1",execution_enabled=True,risk_pct=2,stop_loss=True,open_positions=0,ai_gate=Gate.ALLOW)==Gate.BLOCK
def test_ai_veto():
    s=Signal("s2","XAUUSD","BUY",.9,"test",("candle:test",))
    assert decide(s,account_id="paper-1",execution_enabled=True,risk_pct=.5,stop_loss=True,open_positions=0,ai_gate=Gate.BLOCK)==Gate.BLOCK
