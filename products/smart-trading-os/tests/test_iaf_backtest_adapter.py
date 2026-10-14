import sys
from pathlib import Path
from types import SimpleNamespace

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from integrations.iaf_backtest_adapter import run_framework_backtest


class FakeResults:
    def __init__(self):
        self.df = SimpleNamespace(
            empty=False,
            iloc=SimpleNamespace(__getitem__=lambda i: SimpleNamespace(to_dict=lambda: {"return_pct": 3.2, "trades": 4})),
        )
    def load_backtests(self, workers):
        assert workers == 1
        return ["bundle"]


class FakeApp:
    def add_market(self, **kwargs):
        self.market = kwargs
    def run_backtest(self, **kwargs):
        self.run = kwargs
        return FakeResults()


class FakeReport:
    def __init__(self, *, backtests):
        self.backtests = backtests
    def save(self, path):
        Path(path).write_text("<html>report</html>", encoding="utf-8")


def test_adapter_runs_paper_only_and_marks_unverified_slippage_incomplete(tmp_path):
    app = FakeApp()
    record = run_framework_backtest(
        run_id="test-1", strategy=SimpleNamespace(strategy_id="demo-v1"),
        study=object(), market="TEST", trading_symbol="USD",
        initial_balance=1000, fee_percentage=0.1,
        started_at="2026-10-14T10:00:00Z", ended_at="2026-10-14T10:01:00Z",
        artifact_directory=str(tmp_path), app_factory=lambda: app,
        report_factory=FakeReport,
    )
    assert app.market["paper_trading"] is True
    assert record["status"] == "INCOMPLETE"
    assert record["metrics"]["return_pct"] == 3.2
    assert Path(record["artifacts"][0]).exists()


def test_adapter_rejects_invalid_engine(tmp_path):
    try:
        run_framework_backtest(
            run_id="test", strategy=object(), study=object(), market="TEST",
            trading_symbol="USD", initial_balance=1000, fee_percentage=0.1,
            started_at="2026-10-14T10:00:00Z", ended_at="2026-10-14T10:01:00Z",
            artifact_directory=str(tmp_path), engine="live",
            app_factory=lambda: FakeApp(), report_factory=FakeReport,
        )
    except ValueError as exc:
        assert "engine" in str(exc)
    else:
        raise AssertionError("unknown engine must be rejected")
