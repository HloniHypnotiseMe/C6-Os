from collections import defaultdict
from decimal import Decimal
from .contracts import AccountSnapshot, OrderRequest, OrderResult
class PaperExecutionAdapter:
    venue="paper"
    def __init__(self, account_id: str, starting_balance: Decimal=Decimal("10000")):
        self.account_id=account_id; self.balance=starting_balance
        self._positions=defaultdict(Decimal); self._sequence=0
    def health(self): return True
    def account(self, account_id: str):
        if account_id != self.account_id: return AccountSnapshot(account_id,Decimal("0"),Decimal("0"),0)
        return AccountSnapshot(account_id,self.balance,self.balance,sum(1 for q in self._positions.values() if q != 0))
    def submit(self, order: OrderRequest):
        if order.account_id != self.account_id: return OrderResult(False,"REJECTED",order.client_order_id,None,"ACCOUNT_MISMATCH")
        if order.quantity <= 0: return OrderResult(False,"REJECTED",order.client_order_id,None,"INVALID_QUANTITY")
        if order.stop_loss is None: return OrderResult(False,"REJECTED",order.client_order_id,None,"STOP_LOSS_REQUIRED")
        signed=order.quantity if order.side=="BUY" else -order.quantity
        self._positions[order.symbol]+=signed; self._sequence+=1
        return OrderResult(True,"FILLED",order.client_order_id,f"PAPER-{self._sequence:08d}","PAPER_FILL")
