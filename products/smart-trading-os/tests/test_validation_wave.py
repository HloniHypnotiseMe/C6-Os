import json
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from engine.ai_gate import Gate, parse_review, ollama_payload
from integrations.tradingagents_bridge import to_c6_signal

def test_ai_review_valid_json():
    result = parse_review(json.dumps({"decision":"ALLOW","reason":"Within policy"}), model="qwen3:4b")
    assert result.decision is Gate.ALLOW
    assert result.model == "qwen3:4b"

def test_ai_review_fails_closed():
    assert parse_review("ALLOW").decision is Gate.REVIEW
    assert parse_review('{"decision":"YOLO","reason":"unsafe"}').decision is Gate.REVIEW
    assert parse_review('{"decision":"ALLOW","reason":"ok"} trailing').decision is Gate.REVIEW

def test_ollama_payload_requests_json_and_zero_temperature():
    payload = ollama_payload("review signal")
    assert payload["model"] == "qwen3:4b"
    assert payload["format"] == "json"
    assert payload["options"]["temperature"] == 0

def test_signal_bridge_normalizes_invalid_values():
    signal = to_c6_signal({"action":"buy","confidence":2,"reasoning":"trend"}, signal_id="s1", symbol="XAUUSD", evidence=("research://run/1",))
    assert signal.action == "BUY"
    assert signal.confidence == 0.0
    assert signal.rationale == "trend"
    assert signal.evidence == ("research://run/1",)

def test_unknown_signal_action_becomes_hold():
    signal = to_c6_signal({"action":"unknown","confidence":"bad"}, signal_id="s2", symbol="V75", evidence=())
    assert signal.action == "HOLD"
    assert signal.confidence == 0.0
