import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from integrations.tradingagents_runner import run_tradingagents_research


class FakeGraph:
    def __init__(self, *, selected_analysts, config):
        self.selected_analysts = selected_analysts
        self.config = config
        self.calls = []

    def propagate(self, ticker, trade_date, *, asset_type):
        self.calls.append((ticker, trade_date, asset_type))
        return ({"summary": "research complete"}, "Overweight")


def test_runner_invokes_upstream_contract_and_returns_research_proposal():
    created = {}

    def factory(**kwargs):
        created.update(kwargs)
        return FakeGraph(**kwargs)

    result = run_tradingagents_research(
        "AAPL", "2026-10-14", config={"llm_provider": "ollama"},
        graph_factory=factory,
    )
    assert created["config"] == {"llm_provider": "ollama"}
    assert result["ticker"] == "AAPL"
    assert result["signal"] == "OVERWEIGHT"
    assert result["final_state"] == {"summary": "research complete"}


def test_runner_fails_closed_on_unknown_upstream_rating():
    class UnknownGraph:
        def __init__(self, **kwargs): pass
        def propagate(self, *args, **kwargs): return ({}, "MAYBE")

    result = run_tradingagents_research(
        "V75", "2026-10-14", config={"llm_provider": "ollama"},
        asset_type="crypto", graph_factory=UnknownGraph,
    )
    assert result["signal"] == "REVIEW"


def test_runner_requires_explicit_runtime_config():
    try:
        run_tradingagents_research("AAPL", "2026-10-14", config={})
    except ValueError as exc:
        assert "config" in str(exc)
    else:
        raise AssertionError("empty config should be rejected")
