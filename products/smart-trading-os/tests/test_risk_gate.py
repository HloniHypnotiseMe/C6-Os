from products.smart_trading_os.core.risk_gate import Gate, RiskPolicy, TradeRequest, evaluate


def base(**overrides):
    data = dict(
        symbol="XAUUSD",
        risk_pct=0.5,
        stop_loss=True,
        open_positions=0,
        execution_enabled=True,
        account_id="paper-account",
        ai_gate=Gate.ALLOW,
    )
    data.update(overrides)
    return TradeRequest(**data)


def test_allows_valid_request():
    assert evaluate(base()) == Gate.ALLOW


def test_hard_risk_blocks_excessive_risk():
    assert evaluate(base(risk_pct=1.01)) == Gate.BLOCK


def test_hard_risk_requires_stop_loss():
    assert evaluate(base(stop_loss=False)) == Gate.BLOCK


def test_execution_requires_explicit_authority():
    assert evaluate(base(execution_enabled=False)) == Gate.BLOCK


def test_ai_veto_is_respected():
    assert evaluate(base(ai_gate=Gate.BLOCK)) == Gate.BLOCK


def test_ai_review_cannot_be_promoted_to_allow():
    assert evaluate(base(ai_gate=Gate.REVIEW)) == Gate.REVIEW
