from dataclasses import dataclass
from datetime import datetime
from decimal import Decimal
from typing import Literal, Protocol, Sequence
Side = Literal["BUY", "SELL"]
@dataclass(frozen=True)
class Candle:
    venue: str; symbol: str; timeframe: str; timestamp: datetime
    open: Decimal; high: Decimal; low: Decimal; close: Decimal; volume: Decimal
@dataclass(frozen=True)
class Quote:
    venue: str; symbol: str; timestamp: datetime; bid: Decimal; ask: Decimal
@dataclass(frozen=True)
class Signal:
    signal_id: str; symbol: str; action: Literal["BUY","SELL","HOLD"]
    confidence: float; rationale: str; evidence: tuple[str, ...]
@dataclass(frozen=True)
class AccountSnapshot:
    account_id: str; equity: Decimal; balance: Decimal; open_positions: int
@dataclass(frozen=True)
class OrderRequest:
    account_id: str; symbol: str; side: Side; quantity: Decimal
    stop_loss: Decimal | None; client_order_id: str
@dataclass(frozen=True)
class OrderResult:
    accepted: bool; status: Literal["FILLED","REJECTED"]; client_order_id: str
    provider_order_id: str | None; reason: str
class MarketDataAdapter(Protocol):
    venue: str
    def latest_quote(self, symbol: str) -> Quote: ...
    def candles(self, symbol: str, timeframe: str, limit: int) -> Sequence[Candle]: ...
class ExecutionAdapter(Protocol):
    venue: str
    def account(self, account_id: str) -> AccountSnapshot: ...
    def submit(self, order: OrderRequest) -> OrderResult: ...
    def health(self) -> bool: ...
