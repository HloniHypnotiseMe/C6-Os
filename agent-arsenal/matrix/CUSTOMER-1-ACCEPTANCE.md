# C6 Customer #1 Acceptance Gates

## Purpose

C6 must use its own commercial system before external GTM volume is released.

The acceptance loop is:

```
C6
 ↓
AUDIT
 ↓
REPORT
 ↓
RECOMMENDED PACKAGE
 ↓
ACTIVATE
 ↓
EXECUTE
 ↓
MEASURE
 ↓
RE-AUDIT
```

## Gate 1 — Public Audit

- [ ] Anonymous visitor can submit an audit.
- [ ] Email, company name and industry are captured.
- [ ] Website URL is optional.
- [ ] Request is rate-limited.
- [ ] No synthetic report is returned after an execution failure.
- [ ] Audit submission is persisted with provenance.

## Gate 2 — Evidence-Led Report

Every material finding must identify its evidence basis.

The report must distinguish:

- supplied business facts
- observed public evidence
- derived analysis
- hypotheses / missing evidence

No invented revenue gap, search volume, conversion improvement, ROI, market statistic or business fact.

The report remains useful even if the business never buys C6.

## Gate 3 — Commercial Recommendation

The report must resolve to exactly one of:

- Explorer — R0
- Foundation — from R4,995/month
- Accelerator — from R9,995/month
- Domination — from R24,995/month
- Bespoke — custom

The recommendation must be traceable to diagnosed problems and required capabilities.

A capability may not be sold as live when its adapter is missing or only contract-level.

## Gate 4 — Activation

For a self-serve package:

1. package is resolved from the shared commercial contract;
2. expected price is resolved server-side;
3. payment is created through RemotePay;
4. successful payment changes the subscription to active;
5. activation records the selected package and capabilities.

Bespoke requires a human/custom-quote path.

## Gate 5 — Execution

For every capability claimed in the Customer #1 package:

- provider exists in the registry;
- adapter exists;
- adapter status is verified;
- required credentials/runtime are available;
- execution produces an auditable result.

Operating rule:

> If C6 can safely do it, C6 does it. If owner decision is required, C6 recommends it. If regulated/human authority is required, C6 escalates it.

## Gate 6 — Success Measurement

The Success layer records:

- what C6 found;
- what C6 recommended;
- what C6 executed;
- what required owner action;
- completion status;
- measurable before/after evidence;
- next recommended action.

Dashboard availability:

- Explorer: audit/report experience, no persistent full dashboard.
- Foundation+: persistent business dashboard.
- Domination: full C6 Command Dashboard.
- Bespoke: custom dashboard.

## Gate 7 — Re-Audit

C6 is re-audited after activation.

Acceptance requires evidence that the system can compare:

- original diagnosis;
- activated capabilities;
- executed interventions;
- current evidence;
- remaining problems;
- next recommended actions.

## External GTM Release Gate

The 1,000-lead free-audit campaign must not be released until Gates 1–7 pass for C6 Customer #1, except where a documented dependency is explicitly marked as external and is not being represented as live.

Campaign funnel metrics:

```
discovered
→ contactable
→ contacted
→ delivered
→ opened
→ replied
→ qualified
→ meeting
→ proposal
→ won
→ revenue
```

Do not assume conversion rates. Measure them.
