# Smart Trading OS — upstream integration map

**Audit date:** 2026-10-14  
**Authority:** C6-Os contracts and policies remain authoritative. Upstream repositories are capability sources, not competing control planes.

## TradingAgents — research proposal layer

- **Repository:** [HloniHypnotiseMe/TradingAgents](https://github.com/HloniHypnotiseMe/TradingAgents)
- **Inspected source pin:** `be952b8eccb49720509af544c6675233bc1f10d0`
- **License:** Apache-2.0 (source `LICENSE` inspected).
- **Version discrepancy to reconcile before install:** current `pyproject.toml` declares `0.4.0`, while the pinned main commit message is a merge from `v0.4.2`. The immutable commit SHA, not the version label, is the source pin until that discrepancy is resolved.
- **Source-level API inspected:** `TradingAgentsGraph(selected_analysts=..., config=...)`; `propagate(ticker, trade_date, asset_type="stock"|"crypto")` returns `(final_state, rating)`. The rating is a five-tier value (Buy, Overweight, Hold, Underweight, Sell) or `REVIEW` when it cannot parse a rating.
- **C6 adapter:** `integrations/tradingagents_runner.py` lazily invokes that public class and requires explicit runtime config. `integrations/tradingagents_bridge.py` maps five-tier ratings into C6's BUY/SELL/HOLD contract. Unknown ratings remain HOLD/REVIEW; confidence is never invented.
- **Boundary:** output is a research proposal only. It cannot submit orders or override the C6 risk gate. The upstream package, model provider, data sources, credentials and a real end-to-end research run are not yet verified.

## Investing Algorithm Framework — validation/backtest candidate

- **Repository:** [HloniHypnotiseMe/investing-algorithm-framework](https://github.com/HloniHypnotiseMe/investing-algorithm-framework)
- **Inspected source pin:** `e5c7bcb9c182316d833c95d678bc63fd0f7a4cf0`
- **Inspected package metadata:** `9.0.0a17` alpha; Apache-2.0 license.
- **Useful source nuggets:** vector and event-driven backtest engines; study/backtest windows including holdout and walk-forward/time-OOS patterns; configurable market `fee_percentage`; performance reports and portable Open Backtest Format; CCXT is a declared dependency.
- **Source-level example inspected:** `examples/simple_app.py` selects `BacktestEngine.VECTOR` or `EVENT_DRIVEN`, configures `fee_percentage`, declares a study/window, runs the backtest and writes an HTML report.
- **C6 adapter added:** `integrations/iaf_backtest_adapter.py` calls the inspected `create_app` / `add_market(fee_percentage=...)` / `run_backtest` / `load_backtests` / `BacktestReport.save` flow, with paper mode forced on. It writes a report and maps available scalar metrics to the C6 evidence record.
- **Still unverified:** the optional alpha package is not installed or run in this environment; no real dataset/backtest output exists yet. Slippage is unverified by default and the adapter therefore marks the run INCOMPLETE. Pin/install the immutable SHA in an isolated environment, prove fee/slippage treatment, and validate data split integrity before any PASS claim.

## Capability-to-C6 contract

| Capability | Owner / boundary | Current status |
|---|---|---|
| Governance, evidence, execution authority | C6-Os | Canonical |
| Existing Mission Control/dashboard/runtime | C6Group.AiOS | Reuse; do not duplicate |
| Research agents and rating proposal | TradingAgents via C6 adapter | Adapter code + fake-graph tests; real runtime not verified |
| Backtesting / walk-forward / OOS | Investing Algorithm Framework via future adapter | Source audited; integration not implemented |
| Local AI veto | Ollama/Qwen client | Loopback-only client + mocked tests; local model runtime not verified |
| Hard risk and signal confidence | C6 deterministic engine | Confidence threshold implemented; repository CI currently unable to provide test evidence |
| Broker/exchange execution | C6 venue adapters | Deriv, MT5 and Binance/CCXT adapters remain open |

## Next implementation sequence

1. Resolve TradingAgents package-version discrepancy and pin/install the exact SHA with explicit model/data configuration.
2. Run a controlled research smoke test and retain source state, rating, timestamps, provider/model identity and run evidence.
3. Integrate the pinned Investing Algorithm Framework in an isolated test environment; map each result into `contracts/validation-evidence.schema.json`.
4. Use real historical data with fees and slippage, walk-forward splits and untouched out-of-sample windows; record limitations and artifacts.
5. Keep execution disabled until normalized signals pass confidence, deterministic risk, account/instrument permission, execution-health and human-approval gates.
6. Run CI and the full repository suite after GitHub-hosted jobs can start and report steps; current runs terminate before any step executes.

No upstream source was copied into C6 by this audit. Adapters and contracts preserve replaceability and keep C6's control plane authoritative.
