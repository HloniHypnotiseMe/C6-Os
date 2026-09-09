import json
from pathlib import Path
import sys

RESOLVER_DIR = Path(__file__).resolve().parents[1] / "resolver"
sys.path.insert(0, str(RESOLVER_DIR))

from resolve import resolve  # noqa: E402


def test_browser_resolution():
    result = resolve("browser_automation")
    assert result["status"] == "resolved"
    assert result["selection"]["provider"] == "headlessx"
    assert result["selection"]["adapter"] == "c6-browser"
    assert result["selection"]["adapter_status"] == "contract_only"


def test_risk_ceiling_filters_high_risk_provider():
    try:
        resolve("browser_automation", max_risk="controlled")
    except LookupError:
        return
    raise AssertionError("high-risk browser providers must not bypass the risk ceiling")


def test_permission_constraint():
    result = resolve("sandbox_execution", permissions=["sandbox"])
    assert result["selection"]["provider"] == "opensandbox"
    assert "sandbox" in result["selection"]["permissions"]


def test_unknown_capability_is_rejected():
    try:
        resolve("does_not_exist")
    except KeyError:
        return
    raise AssertionError("unknown capability must be rejected")


def test_index_is_valid_json():
    index = Path(__file__).resolve().parents[1] / "registry" / "resolution-index.json"
    with index.open("r", encoding="utf-8") as handle:
        data = json.load(handle)
    assert data["schema_version"] == "0.2"
    assert "browser_automation" in data["capabilities"]
