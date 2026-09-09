#!/usr/bin/env python3
"""Deterministic tests for the C6 revenue research adapter."""

from adapter import build_research_question, prepare


def test_prepare_selects_metagpt():
    result = prepare({
        "objective": "Find qualified C6 sales opportunities",
        "market": "South Africa",
        "customer_type": "SMEs",
    })
    assert result["status"] == "ready"
    assert result["provider"] == "metagpt"
    assert result["adapter"] == "c6-revenue-research"


def test_question_contains_commercial_context():
    question = build_research_question({
        "objective": "Find 10 qualified sales conversations",
        "market": "South Africa",
        "customer_type": "SMEs",
        "constraints": ["Do not fabricate facts"],
    })
    assert "South Africa" in question
    assert "SMEs" in question
    assert "Do not fabricate facts" in question


def test_missing_fields_fail():
    result = prepare({"objective": "Find prospects"})
    assert result["status"] == "failed"
    assert "market" in result["missing"]
    assert "customer_type" in result["missing"]
