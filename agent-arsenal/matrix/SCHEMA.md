# C6 Problem-Solution Matrix Schema v0.1

Machine truth lives in `problem-solution-matrix.yaml`. Every row must connect an observable business problem to an executable C6 capability.

Required fields:
- pain_id
- pain
- evidence_required
- impact_category
- ai_can_fix
- capability
- provider
- adapter
- adapter_status
- package
- confidence
- gap
- evidence_source
- evidence_strength
- evidence_date
- evidence_population
- validation_status
- success_role
- success_intervention

Allowed adapter_status: live | contract_only | missing
Allowed confidence: low | medium | high
Allowed validation_status: research_supported | partially_supported | hypothesis | validated_business_evidence

Governance:
1. Never claim a business has a pain without business-specific evidence.
2. Market research supports what to inspect, not what a specific business suffers.
3. A package may only sell a capability when provider + adapter + execution are verified.
4. contract_only and missing capabilities are not production promises.
5. Every finding must be traceable to evidence.
