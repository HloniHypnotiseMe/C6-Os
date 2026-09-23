# Evidence-Based QA Skill

## Purpose
Verify implemented behavior against explicit claims and acceptance criteria using reproducible evidence.

## Procedure
1. Resolve the claim or acceptance criterion.
2. Identify the smallest test that can prove or disprove it.
3. Run deterministic checks, including browser/API/runtime checks where applicable.
4. Capture results and artifacts.
5. Cross-check claims against implementation and evidence.
6. Report PASS, FAIL, or GAP without upgrading status beyond the evidence.

## Outputs
- test results
- screenshots/traces where applicable
- runtime checks
- claim-evidence records
- verification summary

## Non-goals
Do not certify production readiness from repository existence, green build alone, or screenshots alone.
