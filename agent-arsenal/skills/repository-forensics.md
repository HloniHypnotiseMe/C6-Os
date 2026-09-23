# Repository Forensics Skill

## Purpose
Establish a fact-grounded model of an unfamiliar repository before implementation.

## Procedure
1. Read START HERE and repository-local instructions.
2. Inventory manifests, runtimes, entry points, deployment files, tests, and relevant docs.
3. Trace the requested behavior through concrete files and imports/calls.
4. Record exact file paths, symbols, commands, and evidence.
5. Identify drift, duplicates, dead paths, missing wiring, and mismatches only where directly observed.
6. Return findings with cited repository evidence.

## Outputs
- repository map
- execution/data-flow trace
- dependency/runtime map
- finding registry
- evidence references

## Non-goals
Do not redesign or modify the repository unless a downstream workflow explicitly authorizes implementation.
