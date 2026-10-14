import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from engine.contracts import Signal
from engine.decision import decide
from engine.risk import Gate, RiskPolicy


def _signal(confidence):
    return Signal("s1", "XAUUSD", "BUY", confidence, "research", ("evidence://test",))


def _decide(signal):
    return decide(
        signal, account_id="paper-account", execution_enabled=True,
        risk_pct=0.5, stop_loss=True, open_positions=0, ai_gate=Gate.ALLOW,
    )


def test_low_confidence_signal_requires_review():
    assert _decide(_signal(0.49)) is Gate.REVIEW


def test_confidence_at_threshold_can_reach_hard_risk_gate():
    assert _decide(_signal(0.5)) is Gate.ALLOW


def test_invalid_or_non_finite_confidence_fails_closed():
    assert _decide(_signal(float("nan"))) is Gate.REVIEW
    assert _decide(_signal(float("inf"))) is Gate.REVIEW
    assert _decide(_signal(1.01)) is Gate.REVIEW


def test_confidence_threshold_is_configurable_and_validated():
    policy = RiskPolicy(min_signal_confidence=0.7)
    assert decide(
        _signal(0.6), account_id="paper-account", execution_enabled=True,
        risk_pct=0.5, stop_loss=True, open_positions=0, ai_gate=Gate.ALLOW,
        policy=policy,
    ) is Gate.REVIEW
    try:
        RiskPolicy(min_signal_confidence=1.1)
    except ValueError:
        pass
    else:
        raise AssertionError("invalid confidence threshold must be rejected")
