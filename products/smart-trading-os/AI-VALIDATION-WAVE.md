# Smart Trading OS AI validation wave

- Strict Ollama/Qwen JSON gate: ALLOW, BLOCK, REVIEW; malformed output fails closed.
- TradingAgents output normalization boundary; upstream runtime is not claimed connected.
- Backtest/walk-forward/out-of-sample evidence manifest with explicit fee and slippage fields.
- Provider runtime, credentials, historical data, test execution, VPS deployment and LIVE evidence remain outstanding gates.
- Hard risk controls and explicit execution authority remain authoritative.


## 2026-10-14 — visual start page and release truth
- Added `products/smart-trading-os/START-HERE.html` as a self-contained visual guide linked from the canonical C6-Os `START-HERE.md` and product README.
- The page labels code/contract work separately from runtime proof and explicitly lists venue adapters, Ollama runtime, TradingAgents runtime, backtesting, operations hardening, dashboard integration, Contabo/Cloudflare deployment and approval gates as open.
- Post-merge GitHub Actions runs for Smart Trading OS and C6 QA Certification failed on `main` commit `11a1c4e23f6eeff6f5f98b183564edc7a9c81439` even though PR checks passed. Treat this as an unresolved regression until the failing steps are identified and a clean main run is captured.
- No broker, demo, VPS or LIVE status is claimed.
