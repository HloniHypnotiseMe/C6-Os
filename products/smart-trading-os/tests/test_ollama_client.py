import io
import json
import sys
from pathlib import Path
from unittest.mock import patch
from urllib.error import URLError

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from engine.ai_gate import Gate
from engine.ollama_client import review_with_ollama


def _response(content):
    envelope = {"message": {"content": content}}
    return io.BytesIO(json.dumps(envelope).encode("utf-8"))


def test_local_ollama_client_parses_valid_review_and_sends_safe_payload():
    raw = json.dumps({"decision": "ALLOW", "reason": "Within policy"})
    with patch("engine.ollama_client.urlopen", return_value=_response(raw)) as call:
        result = review_with_ollama("review the proposed signal")
    assert result.decision is Gate.ALLOW
    assert result.model == "qwen3:4b"
    request = call.call_args.args[0]
    payload = json.loads(request.data.decode("utf-8"))
    assert request.full_url == "http://127.0.0.1:11434/api/chat"
    assert payload["model"] == "qwen3:4b"
    assert payload["stream"] is False
    assert payload["format"] == "json"
    assert payload["options"]["temperature"] == 0


def test_local_ollama_client_fails_closed_on_transport_error():
    with patch("engine.ollama_client.urlopen", side_effect=URLError("offline")):
        result = review_with_ollama("review this")
    assert result.decision is Gate.REVIEW


def test_local_ollama_client_fails_closed_on_malformed_envelope():
    with patch("engine.ollama_client.urlopen", return_value=io.BytesIO(b'{"unexpected":true}')):
        result = review_with_ollama("review this")
    assert result.decision is Gate.REVIEW


def test_local_ollama_client_rejects_remote_endpoint_without_network_call():
    with patch("engine.ollama_client.urlopen") as call:
        result = review_with_ollama("review this", base_url="https://example.com")
    assert result.decision is Gate.REVIEW
    call.assert_not_called()


def test_local_ollama_client_rejects_empty_prompt():
    with patch("engine.ollama_client.urlopen") as call:
        result = review_with_ollama("   ")
    assert result.decision is Gate.REVIEW
    call.assert_not_called()
