import sys
from pathlib import Path
import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from integrations.backtest_evidence import build_validation_evidence


def _record(**overrides):
    values = dict(
        run_id="bt-001", mode="BACKTEST", strategy_id="baseline-v1",
        data_source="historical://dataset-001",
        started_at="2026-10-14T10:00:00Z", ended_at="2026-10-14T10:01:00Z",
        metrics={"return_pct": 1.2, "trades": 15},
        artifacts=["artifact://bt-001/report.json"],
        fees_included=True, slippage_included=True, status="PASS",
    )
    values.update(overrides)
    return build_validation_evidence(**values)


def test_complete_costed_run_can_be_passed_through():
    record = _record()
    assert record["status"] == "PASS"
    assert record["cost_model"]["fees_included"] is True
    assert record["cost_model"]["slippage_included"] is True


def test_pass_is_downgraded_when_costs_or_artifacts_are_missing():
    assert _record(fees_included=False)["status"] == "INCOMPLETE"
    assert _record(slippage_included=False)["status"] == "INCOMPLETE"
    assert _record(artifacts=[])["status"] == "INCOMPLETE"


def test_timestamps_must_be_timezone_aware_and_ordered():
    with pytest.raises(ValueError):
        _record(started_at="2026-10-14T10:00:00")
    with pytest.raises(ValueError):
        _record(ended_at="2026-10-14T09:59:00Z")


def test_metrics_must_be_finite_scalars():
    with pytest.raises(ValueError):
        _record(metrics={"sharpe": float("nan")})
    with pytest.raises(ValueError):
        _record(metrics={"nested": {"value": 1}})
