# C6 Smart Trading OS

**Visual start page:** [Open START-HERE.html](START-HERE.html) for the architecture map, implementation status, evidence boundaries, remaining gaps and source links. The page is a status/navigation view, not proof of live trading.

Standalone C6 trading product governed by C6-Os and connected to C6Group.AiOS through explicit contracts.

## Operating rule

The product is both a trading system and an operating company. It owns trading intelligence, validation, risk, execution, customer operations, growth, sales, marketing, finance/profitability and business development within bounded authority.

## Runtime states

- RESEARCH
- BACKTEST
- PAPER
- SHADOW
- LIVE_PENDING_APPROVAL
- LIVE
- HALTED

A state transition requires evidence and an audit record. LIVE is never inferred from code presence.

## Hard boundary

AI may propose or veto. Hard risk controls always win. No broker/exchange order is permitted unless account permission, instrument permission, risk limits, execution health and entitlement/authority checks all pass.

## Initial venue targets

- Deriv: Volatility 75 and Volatility 100
- MT5: XAUUSD and NAS100
- Binance/CCXT: crypto venues where explicitly configured

Provider credentials are runtime secrets and never belong in Git.

## Commercial products

The core Control Centre stays clean. Commercial capabilities are packaged separately:

- Signal API
- Challenge/Prop-Firm Robot
- MT5 EA
- Deriv engine
- Strategy Lab
- Analytics
- Enterprise intelligence

## Evidence ladder

EXISTS -> WORKS -> VERIFIED -> LIVE

No product claim may skip a rung.
