"""Local Ollama transport for advisory-only Smart Trading OS reviews.

This module calls the local Ollama HTTP API. It never submits an order and
fails closed to REVIEW for transport, response, or configuration failures.
"""
from __future__ import annotations

import ipaddress
import json
from urllib.error import URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen

from .ai_gate import AIReview, Gate, ollama_payload, parse_review


def _is_loopback(base_url: str) -> bool:
    try:
        parsed = urlparse(base_url)
        if parsed.scheme != "http" or not parsed.hostname:
            return False
        if parsed.username or parsed.password:
            return False
        hostname = parsed.hostname.lower()
        if hostname == "localhost":
            return True
        return ipaddress.ip_address(hostname).is_loopback
    except (ValueError, TypeError):
        return False


def review_with_ollama(
    prompt: str,
    *,
    model: str = "qwen3:4b",
    base_url: str = "http://127.0.0.1:11434",
    timeout_seconds: float = 8.0,
) -> AIReview:
    """Request a structured local-model review; failures always return REVIEW.

    Only loopback HTTP endpoints are accepted by default to prevent sending
    prompts to an unintended remote service. Configure network access outside
    this client only after an explicit security review.
    """
    if not isinstance(prompt, str) or not prompt.strip():
        return AIReview(Gate.REVIEW, "Empty prompt; fail closed.", model)
    if not isinstance(model, str) or not model.strip():
        return AIReview(Gate.REVIEW, "Invalid model configuration; fail closed.", "unknown")
    if not _is_loopback(base_url):
        return AIReview(Gate.REVIEW, "Ollama endpoint must be local loopback HTTP; fail closed.", model)
    if not isinstance(timeout_seconds, (int, float)) or timeout_seconds <= 0:
        return AIReview(Gate.REVIEW, "Invalid timeout configuration; fail closed.", model)

    url = base_url.rstrip("/") + "/api/chat"
    request = Request(
        url,
        data=json.dumps(ollama_payload(prompt, model)).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urlopen(request, timeout=float(timeout_seconds)) as response:
            raw = response.read(1_048_577)
        if len(raw) > 1_048_576:
            return AIReview(Gate.REVIEW, "Ollama response exceeded size limit; fail closed.", model)
        envelope = json.loads(raw.decode("utf-8"))
        message = envelope.get("message") if isinstance(envelope, dict) else None
        content = message.get("content") if isinstance(message, dict) else None
        if not isinstance(content, str):
            return AIReview(Gate.REVIEW, "Malformed Ollama response envelope; fail closed.", model)
        return parse_review(content, model=model)
    except (OSError, URLError, ValueError, TypeError):
        return AIReview(Gate.REVIEW, "Ollama unavailable or response invalid; fail closed.", model)
