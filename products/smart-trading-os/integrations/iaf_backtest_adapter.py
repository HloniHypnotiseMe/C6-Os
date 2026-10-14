"""Optional, paper-only adapter for the inspected Investing Algorithm Framework API."""
from __future__ import annotations

import math
from pathlib import Path
from typing import Any, Callable

from .backtest_evidence import build_validation_evidence


def run_framework_backtest(*, run_id: str, strategy: Any, study: Any, market: str,
                           trading_symbol: str, initial_balance: float,
                           fee_percentage: float, started_at: str, ended_at: str,
                           artifact_directory: str = "artifacts/backtests",
                           engine: str = "vector", slippage_included: bool = False,
                           app_factory: Callable[[], Any] | None = None,
                           report_factory: Callable[..., Any] | None = None) -> dict[str, Any]:
    """Run a research backtest only. It never submits orders to a live account.

    Strategy and Study are supplied by the caller. Slippage defaults to
    unverified, so the evidence builder will not allow a PASS claim.
    """
    if not market or not trading_symbol:
        raise ValueError("market and trading_symbol are required")
    if not math.isfinite(float(initial_balance)) or initial_balance <= 0:
        raise ValueError("initial_balance must be finite and positive")
    if not math.isfinite(float(fee_percentage)) or not 0 <= fee_percentage <= 100:
        raise ValueError("fee_percentage must be between 0 and 100")
    if engine not in {"vector", "event"}:
        raise ValueError("engine must be vector or event")

    try:
        from investing_algorithm_framework import (
            BacktestEngine, BacktestReport, BacktestRunConfiguration, create_app
        )
    except ImportError as exc:
        if app_factory is None or report_factory is None:
            raise RuntimeError("Investing Algorithm Framework is not installed; no run occurred.") from exc
        BacktestEngine = None
        BacktestRunConfiguration = None
    app_factory = app_factory or create_app
    report_factory = report_factory or BacktestReport
    engine_value = (BacktestEngine.VECTOR if engine == "vector" else BacktestEngine.EVENT_DRIVEN) if BacktestEngine else engine
    config_factory = BacktestRunConfiguration if BacktestRunConfiguration else lambda **kwargs: kwargs

    out = Path(artifact_directory) / run_id
    out.mkdir(parents=True, exist_ok=True)
    app = app_factory()
    app.add_market(market=market, trading_symbol=trading_symbol,
                   initial_balance=initial_balance, fee_percentage=fee_percentage,
                   paper_trading=True)
    results = app.run_backtest(
        strategy=strategy, study=study,
        run_configuration=config_factory(
            backtest_storage_directory=str(out / "bundles"),
            use_checkpoints=True, show_progress=False),
    )
    loaded = results.load_backtests(workers=1)
    report_path = out / "backtest-report.html"
    report_factory(backtests=loaded).save(str(report_path))

    metrics = {}
    frame = getattr(results, "df", None)
    if frame is not None and not getattr(frame, "empty", True):
        try:
            for key, value in frame.iloc[-1].to_dict().items():
                if hasattr(value, "item"):
                    value = value.item()
                if isinstance(value, (str, int, float, bool)) or value is None:
                    if not isinstance(value, float) or math.isfinite(value):
                        metrics[str(key)] = value
        except (AttributeError, IndexError, TypeError, ValueError):
            metrics = {}

    limitations = [
        "Backtest output is not independent proof of strategy validity.",
        "Historical data quality, split integrity and leakage require separate review.",
    ]
    if not slippage_included:
        limitations.append("Slippage inclusion is unverified; evidence cannot be PASS.")
    return build_validation_evidence(
        run_id=run_id, mode="BACKTEST",
        strategy_id=str(getattr(strategy, "strategy_id", getattr(strategy, "algorithm_id", type(strategy).__name__))),
        data_source="investing-algorithm-framework",
        started_at=started_at, ended_at=ended_at, metrics=metrics,
        artifacts=[str(report_path), str(out / "bundles")],
        fees_included=True, slippage_included=slippage_included,
        status="INCOMPLETE" if not slippage_included else "PASS",
        limitations=limitations,
        cost_notes=f"fee_percentage={fee_percentage}; paper-only research run",
    )
