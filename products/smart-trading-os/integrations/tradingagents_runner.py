"""Lazy runtime boundary for the upstream C6-registered TradingAgents source.

This wrapper returns research proposals only. It does not authorize orders.
Callers must supply explicit runtime configuration and evidence references.
"""
from __future__ import annotations

from typing import Any, Callable

ALLOWED_RATINGS = {"BUY", "OVERWEIGHT", "HOLD", "UNDERWEIGHT", "SELL", "REVIEW"}


def run_tradingagents_research(
    ticker: str,
    trade_date: str,
    *,
    config: dict[str, Any],
    asset_type: str = "stock",
    selected_analysts: tuple[str, ...] = ("market", "social", "news", "fundamentals"),
    graph_factory: Callable[..., Any] | None = None,
) -> dict[str, Any]:
    """Invoke TradingAgentsGraph.propagate and normalize its rating envelope.

    The upstream package is imported only when this function is called so the
    core C6 contracts and unit tests remain dependency-light. A runtime owner
    must pin/install the upstream repository and provide an explicit config
    (including its chosen LLM/data providers) from runtime configuration.
    """
    if not isinstance(ticker, str) or not ticker.strip():
        raise ValueError("ticker is required")
    if not isinstance(trade_date, str) or not trade_date.strip():
        raise ValueError("trade_date is required")
    if not isinstance(config, dict) or not config:
        raise ValueError("explicit TradingAgents runtime config is required")
    if asset_type not in {"stock", "crypto"}:
        raise ValueError("asset_type must be stock or crypto")

    if graph_factory is None:
        try:
            from tradingagents.graph.trading_graph import TradingAgentsGraph
        except ImportError as exc:
            raise RuntimeError(
                "TradingAgents is not installed; research runtime is unavailable."
            ) from exc
        graph_factory = TradingAgentsGraph

    graph = graph_factory(selected_analysts=selected_analysts, config=config)
    result = graph.propagate(ticker.strip(), trade_date.strip(), asset_type=asset_type)
    if not isinstance(result, tuple) or len(result) != 2:
        return {
            "ticker": ticker.strip(),
            "trade_date": trade_date.strip(),
            "asset_type": asset_type,
            "signal": "REVIEW",
            "rationale": "Unexpected TradingAgents result envelope; fail closed.",
            "final_state": None,
        }

    final_state, rating = result
    normalized = str(rating).strip().upper().replace("-", "_").replace(" ", "_")
    if normalized not in ALLOWED_RATINGS:
        normalized = "REVIEW"
    return {
        "ticker": ticker.strip(),
        "trade_date": trade_date.strip(),
        "asset_type": asset_type,
        "signal": normalized,
        "rationale": f"TradingAgents research rating: {normalized}",
        "final_state": final_state,
    }
