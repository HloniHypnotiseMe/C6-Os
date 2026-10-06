# Provider adapter boundary
External venues implement engine/contracts.py.
Planned: Deriv, MetaTrader 5, Binance/CCXT.
Credentials, endpoints and live permissions are runtime configuration only.
Code existence is not LIVE evidence. Adapters require contract tests, demo/sandbox execution, restart/retry/idempotency tests, real-provider evidence and production health checks.
