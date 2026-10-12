"""Fail-closed parser for local-model trade advice.

The model is advisory only. This module never grants execution authority;
the deterministic hard-risk gate remains the final authority.
"""
from dataclasses import dataclass
from enum import Enum
import json
from typing import Any


class Gate(str, Enum):
    ALLOW = "ALLOW"
    BLOCK = "BLOCK"
    REVIEW = "REVIEW"


@dataclass(frozen=True)
class AIReview:
    decision: Gate
    reason: str
    model: str = "unknown"


def parse_review(raw: str, *, model: str = "unknown") -> AIReview:
    """Accept exactly one JSON object with decision and reason; fail closed."""
    try:
        value: Any = json.loads(raw)
        if not isinstance(value, dict):
            raise ValueError("response must be an object")
        decision = value.get("decision")
        reason = value.get("reason")
        if decision not in {item.value for item in Gate}:
            raise ValueError("decision must be ALLOW, BLOCK or REVIEW")
        if not isinstance(reason, str) or not reason.strip():
            raise ValueError("reason is required")
        return AIReview(Gate(decision), reason.strip()[:1000], model)
    except (json.JSONDecodeError, ValueError, TypeError):
        return AIReview(Gate.REVIEW, "Invalid or ambiguous AI response; fail closed.", model)


def ollama_payload(prompt: str, model: str = "qwen3:4b") -> dict[str, Any]:
    """Return request payload; caller owns authenticated/local HTTP transport."""
    return {
        "model": model,
        "stream": False,
        "format": "json",
        "options": {"temperature": 0},
        "messages": [
            {"role": "system", "content": (
                'Return JSON only: {"decision":"ALLOW|BLOCK|REVIEW","reason":"..."}; '
                "You are advisory only. Never override hard risk controls."
            )},
            {"role": "user", "content": prompt},
        ],
    }
