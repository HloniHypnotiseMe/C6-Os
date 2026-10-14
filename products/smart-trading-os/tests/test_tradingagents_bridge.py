import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from integrations.tradingagents_bridge import to_c6_signal


def _signal(rating):
    return to_c6_signal(
        {"signal": rating, "reasoning": "upstream research"},
        signal_id="ta-1", symbol="V75", evidence=("tradingagents://run/1",),
    )


def test_tradingagents_five_tier_ratings_map_explicitly():
    assert _signal("Buy").action == "BUY"
    assert _signal("Overweight").action == "BUY"
    assert _signal("Hold").action == "HOLD"
    assert _signal("Underweight").action == "SELL"
    assert _signal("Sell").action == "SELL"


def test_unrecognized_rating_stays_hold_and_confidence_is_not_invented():
    signal = _signal("uncertain")
    assert signal.action == "HOLD"
    assert signal.confidence == 0.0
