# Smart Trading OS AI validation wave

- Strict Ollama/Qwen JSON gate: ALLOW, BLOCK, REVIEW; malformed output fails closed.
- TradingAgents output normalization plus a lazy runtime wrapper are present; the upstream package, model/data provider configuration and real research run are not yet verified.
- Backtest/walk-forward/out-of-sample evidence manifest with explicit fee and slippage fields.
- Provider runtime, credentials, historical data, test execution, VPS deployment and LIVE evidence remain outstanding gates.
- Hard risk controls and explicit execution authority remain authoritative.


## 2026-10-14 — visual start page and release truth
- Added `products/smart-trading-os/START-HERE.html` as a self-contained visual guide linked from the canonical C6-Os `START-HERE.md` and product README.
- The page labels code/contract work separately from runtime proof and explicitly lists venue adapters, Ollama runtime, TradingAgents runtime, backtesting, operations hardening, dashboard integration, Contabo/Cloudflare deployment and approval gates as open.
- Post-merge GitHub Actions runs for Smart Trading OS and C6 QA Certification failed on `main` commit `11a1c4e23f6eeff6f5f98b183564edc7a9c81439` even though PR checks passed. Treat this as an unresolved regression until the failing steps are identified and a clean main run is captured.
- No broker, demo, VPS or LIVE status is claimed.

- Added `engine/ollama_client.py`: real local HTTP transport to Ollama `/api/chat`, loopback-only endpoint guard, bounded response size, timeout, and fail-closed `REVIEW` handling. Added mocked transport tests for success, invalid envelope, network failure, remote endpoint rejection and empty prompt. These tests do not prove a live Ollama model is installed/reachable.


## 2026-10-14 — upstream source sweep and signal confidence
- Inspected the C6-owned TradingAgents repository source. The inspected `TradingAgentsGraph.propagate(ticker, trade_date, asset_type=...)` returns a `(final_state, rating)` pair; ratings are five-tier (Buy/Overweight/Hold/Underweight/Sell) or REVIEW. Added a lazy runner and explicit rating-to-C6 mapping; unknown ratings remain non-actionable.
- Source-audited Investing Algorithm Framework as the validation candidate. Its current metadata declares alpha `9.0.0a17`; source exposes vector/event backtest examples, fee percentage, windows and report bundles. The inspected main SHA is recorded in `INTEGRATION-MAP.md`; integration is not yet implemented.
- Added a default minimum signal confidence of 0.5 and fail-closed handling for missing, invalid, non-finite or out-of-range confidence. TradingAgents' categorical rating does not supply a numeric confidence, so the bridge does not fabricate one; the decision path returns REVIEW until a calibrated confidence is provided.
- Five isolated mocked Ollama client tests passed locally. GitHub Actions runs in this wave repeatedly failed before any steps started (`runner_id=0`, empty `steps`); therefore the full repository test suite remains UNVERIFIED, not failed by a demonstrated assertion.

- Added `integrations/backtest_evidence.py` to normalize validation run metadata into the C6 evidence contract. It rejects invalid timestamps/metrics and downgrades PASS to INCOMPLETE when fees, slippage or reproducible artifacts are absent. It is not a backtest engine and does not replace the pending Investing Algorithm Framework integration.

- Added `integrations/iaf_backtest_adapter.py` against the source-inspected framework example API. It forces paper mode, creates a report and emits C6 evidence; slippage defaults to unverified, keeping the run INCOMPLETE. This wrapper has not been exercised against the actual alpha package or real market data.
