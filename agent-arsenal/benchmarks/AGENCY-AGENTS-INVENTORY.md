# Agency Agents Inventory & Triage Gate

## Snapshot

Source: `msitarzewski/agency-agents`  
Ref: `main`  
Source commit: `053ddbbf392a1688fc7043d81529f47ef2cf86c8`  
Extraction date: 2026-09-23

**18 divisions / 279 agent definitions**

This corrects the earlier working assumption of “230+”. The current inspected upstream tree contains **279** source agent definitions across the 18 divisions declared by `divisions.json`.

## Division counts

| Division | Agents | Initial review priority |
|---|---:|---|
| academic | 6 | LOW |
| design | 10 | HIGH |
| engineering | 64 | HIGH |
| finance | 5 | HIGH |
| game-development | 21 | LOW |
| gis | 13 | MEDIUM |
| healthcare | 3 | LOW |
| marketing | 36 | HIGH |
| paid-media | 7 | MEDIUM |
| product | 5 | HIGH |
| project-management | 7 | HIGH |
| research | 1 | HIGH |
| sales | 9 | HIGH |
| security | 12 | HIGH |
| spatial-computing | 6 | LOW |
| specialized | 59 | HIGH |
| support | 6 | HIGH |
| testing | 9 | HIGH |

## What has been completed

1. Enumerated every source agent from the declared 18 divisions.
2. Captured the exact upstream blob SHA for every definition.
3. Stored the immutable source commit used for the extraction.
4. Added an explicit triage state rather than pretending every agent has already been semantically reviewed.
5. Added a review-priority signal to drive the next pass.

Machine-readable inventory:

`agent-arsenal/benchmarks/agency-agents-inventory.json`

## Triage contract

Every definition must ultimately become one of:

- **REUSE** — C6 already has sufficient capability.
- **ADAPT** — upstream pattern is useful but must be C6-wrapped/governed.
- **NEW** — C6 genuinely lacks the capability.
- **DUPLICATE** — capability exists elsewhere in C6 under another identity.
- **OUT-OF-SCOPE** — not relevant to the current C6 operating domain.
- **RESEARCH** — insufficient evidence for a safe classification.

And separately:

- **SKILL** — reusable capability/process.
- **AGENT** — specialist execution identity.
- **WORKFLOW** — orchestration of existing skills/agents.
- **TEAM** — multiple specialists with handoffs.

These are deliberately separate decisions. An upstream “agent” does not automatically become a C6 agent.

## Review order

The next semantic pass starts with HIGH-priority divisions:

1. Engineering
2. Specialized
3. Marketing
4. Security
5. Design
6. Product
7. Project Management
8. Research
9. Sales
10. Finance
11. Support
12. Testing

Then MEDIUM:

- GIS
- Paid Media

LOW divisions are retained in the inventory but do not get implementation priority unless a C6 product/workflow requires them.

## Anti-copy rule

Do **not** copy the 279 definitions into C6.

For each useful definition:

`Agency Agent → capability → existing C6 skill/agent/provider → reuse/adapt/new decision → workflow → evidence`

Only the necessary capability is admitted into C6.

## Verification rule

A classification is not considered production-ready until the source definition has been inspected and the resulting C6 mapping has:

- mission/use case;
- required skills;
- workflow;
- deliverables;
- success criteria;
- permissions/risk;
- evidence requirements;
- provider provenance;
- routing metadata;
- duplication check;
- C6 domain relevance.

**Current state: inventory COMPLETE; semantic triage IN PROGRESS.**
