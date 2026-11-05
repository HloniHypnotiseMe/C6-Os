# Revenue Hunter — OpenOut capability sweep — 2026-10-05

## Objective
Extend the existing C6 Revenue Hunter acquisition/audit engine with only the missing capabilities found in:

- `HloniHypnotiseMe/OpenOutLearn`
- `HloniHypnotiseMe/OpenOutNews`
- `HloniHypnotiseMe/OpenOutSend`
- `HloniHypnotiseMe/OpenOutFind`
- `HloniHypnotiseMe/OpenOutreach`

No repository is imported wholesale. C6 remains the authority for tenant identity, evidence, entitlements, payment boundaries, customer data and production execution.

## Source-level nuggets

### OpenOutLearn
**Source:** `openoutlearn/qualifier.py`, `openoutlearn/embeddings.py`, README/tests.

**Capability:** active-learning qualification using an explore/exploit acquisition policy over labelled candidates.

**What it actually does:** uses labelled examples to choose between exploitation of learned fit and exploration of uncertain candidates. The upstream implementation uses Gaussian-process regression and BALD over text embeddings.

**C6 fit:** high. Revenue Hunter already needs qualification that improves from observed accepted/rejected leads.

**Action:** ADAPT. C6 Revenue Hunter now has an explicit active-learning queue boundary. The current C6 implementation uses provider-neutral fit/uncertainty signals; it does not claim to ship sklearn GP/BALD unless a dedicated model provider is later admitted.

### OpenOutNews
**Source:** `openoutnews/dedup.py`, `openoutnews/ml/qualifier.py`, `openoutnews/fetch.py`, README/tests.

**Capability:** trigger/news candidate collection, engagement-aware ranking and syndicated/near-duplicate collapse before qualification.

**What it actually does:** fetches fresh topic candidates, removes duplicate coverage using similarity/event grouping, then ranks candidates through the same qualification-learning family.

**C6 fit:** useful as a Revenue Hunter trigger-signal layer: company news, launches, hiring, funding or other events can become reasons to contact a prospect rather than merely another lead field.

**Action:** ADAPT. C6 Revenue Hunter now exposes trigger-signal collapse; external news discovery remains a provider boundary.

### OpenOutFind
**Source:** `openoutfind/discovery.py`, `openoutfind/contacts/service.py`, CRM/admin models and README.

**Capability:** provider-backed lead discovery from an ICP, qualification with a written reason, candidate deduplication, resumable lead storage, and confidence-gated paid contact enrichment.

**Important boundaries:** discovery is separated from enrichment; email resolution is a paid/enrichment step; a qualified lead can exist without an email; exports carry a human-readable reason; opt-outs/rejections are excluded; the upstream shared contact hub is best-effort and jurisdiction-gated.

**C6 fit:** very high. These are the missing Revenue Hunter mechanics between audit/diagnosis and outreach.

**Action:** ADAPT/COMPOSE. C6 Revenue Hunter now accepts provider-supplied candidates, deduplicates them, qualifies them against an ICP, and creates an enrichment plan only for high-confidence qualified leads. A licensed discovery/enrichment provider is still required for real external lead data.

### OpenOutSend
**Source:** `cold_outreach/send_pass.py`, `cold_outreach/core/sending_window.py`, lead/email models and README.

**Capability:** guarded outreach execution: suppression checked before sending, replies answered before cold volume, weekday/time window, daily cap, spacing, follow-ups and terminal unresponsive state.

**C6 fit:** high, but the provider/runtime must remain under the C6 mail boundary.

**Action:** ADAPT. C6 Revenue Hunter now creates an owner-approved outreach plan with suppression, reply priority, weekday 08:00–20:00 guard and daily cold-send cap. It does not silently send mail. Actual delivery remains behind C6 Mail and explicit owner approval.

### OpenOutreach
**Source:** `openoutreach/__main__.py`, `openoutreach/wizard.py`, package composition and README.

**Capability:** orchestration of find → qualify → enrichment gate → write → send, with one explicit operator boundary and resumable child-program contracts.

**C6 fit:** very high as the Revenue Hunter orchestration model.

**Action:** ADAPT/COMPOSE. C6 keeps its existing audit/diagnosis as the front door and now has explicit qualification, enrichment planning, trigger-signal and outreach-planning stages. No separate duplicate product/orchestrator is created.

## C6 implementation result

Repository: `HloniHypnotiseMe/C6-Group-Final-Website`

New service:
- `c6group-backend/src/services/revenueHunterEngine.ts`

Extended route:
- `c6group-backend/src/routes/revenueHunter.ts`

New test:
- `c6group-backend/src/services/__tests__/revenueHunterEngine.test.ts`

Implemented capabilities:
1. candidate deduplication;
2. evidence-backed ICP qualification with human-readable reasons;
3. explore/exploit qualification queue;
4. confidence-gated enrichment planning;
5. trigger/news duplicate collapse;
6. guarded outreach planning;
7. explicit capability-status boundary.

New Revenue Hunter endpoints:
- `GET /api/v1/revenue-hunter/capabilities`
- `POST /api/v1/revenue-hunter/qualify` — authenticated
- `POST /api/v1/revenue-hunter/enrichment-plan` — authenticated
- `POST /api/v1/revenue-hunter/signals/collapse` — authenticated
- `POST /api/v1/revenue-hunter/outreach-plan` — authenticated

## Current status

- Existing URL-only business audit: EXECUTABLE.
- Qualification: EXECUTABLE.
- Active-learning queue: EXECUTABLE using provider-neutral fit/uncertainty signals.
- Trigger-signal collapse: EXECUTABLE.
- Outreach planning: EXECUTABLE.
- External lead discovery: PROVIDER_REQUIRED.
- Paid contact enrichment: PROVIDER_REQUIRED.
- Actual outbound delivery: PROVIDER_REQUIRED / C6 Mail + explicit owner approval.

## Claims deliberately NOT made

- No claim that C6 has deployed OpenOutFind wholesale.
- No claim that C6 has deployed BetterContact or another lead-data provider.
- No claim that C6 currently runs the upstream GP/BALD model implementation.
- No autonomous cold-email claim.
- No claim that trigger/news discovery is LIVE.

## Evidence / next verification

The application changes are committed, but the GitHub connector reported no workflow runs for the latest test commit at capture time. Therefore this wave is **BUILT / SOURCE-VERIFIED / CI-UNCONFIRMED**, not falsely marked green.

Next win: run the C6 backend build/test workflow and, once the production provider is selected/configured, prove real discovery → qualification → enrichment → owner-approved C6 Mail delivery with evidence at each boundary.


## Standalone `ai-outreach-agent(1).zip` forensic review — 2026-10-06

**Source:** local ZIP snapshot reviewed from the supplied 30-chunk source inventory/code excerpts. The ZIP is a standalone Python/Click/SQLAlchemy/SQLite/Streamlit outreach agent and is not C6-native.

### Decision: REJECT as a standalone C6 implementation; do not vendor or fork it into C6-Os.

The ZIP overlaps heavily with capabilities already represented by the OpenOut family and already adapted into C6 Revenue Hunter:

- ICP research / qualification -> existing C6 Revenue Hunter qualification boundary.
- Lead discovery / dedup / enrichment -> existing Revenue Hunter discovery/enrichment boundary; provider remains explicit.
- Email generation -> OpenOutSend/C6 outreach planning boundary.
- SMTP sending / pacing / warmup / suppression -> C6 Mail boundary and existing OpenOutSend-derived guards.
- Reply handling / opt-out / follow-up -> existing C6 outreach planning and mail boundary.
- Dashboard / SQLite state -> not sufficient reason to introduce a second C6 runtime.

### Paid/external dependencies found in the ZIP

OpenAI, Anthropic, Hunter.io, Apollo.io, Google Maps API, optional Playwright browser automation, Cal.com and Gmail SMTP/IMAP are implementation dependencies in the standalone design.

**C6 replacement rule:** these must not become C6 authority boundaries merely because the ZIP names them. C6-owned boundaries remain the authority for mail, tenant identity, evidence, payment and production execution. External lead discovery/enrichment remains PROVIDER_REQUIRED until a provider is actually admitted and verified.

### Defects / gaps confirmed from the supplied source

**Confirmed defects/gaps**
1. Follow-up scheduler passes `in_reply_to_id` to an `Email` model whose field is `in_reply_to`.
2. Dashboard Replies page references `reply.from_name`, absent from the Reply model.
3. Google Maps Playwright scraping is DOM-fragile.
4. Reply/config validation does not validate the IMAP credentials specifically.
5. The test suite is mostly unit/model parsing coverage; it does not prove real SMTP, IMAP, provider discovery, browser scraping, or end-to-end pipeline execution.
6. The standalone SQLite/runtime model conflicts with the C6 PostgreSQL/central-boundary architecture.
7. The ZIP's compliance checklist is not production evidence; controls are asserted but not externally/runtime verified.

**Reviewed items that are not defects**
- The CSV variable naming noted in the supplied issue list is internally consistent.
- `force` is accepted by `MailSender.send_email`, so that item is not a defect.
- The IMAP `SINCE %d-%b-%Y` date format is valid.

### Reuse conclusion

**Do not import code from the ZIP.** Its useful concepts are already captured by the C6/OpenOut capability sweep. The smallest sufficient action is to retain the ZIP as a rejected reference artifact and continue through C6 Revenue Hunter + C6 Mail rather than creating another outreach runtime.

Status: **EXISTS (reference) / SOURCE-REVIEWED / REJECTED FOR DUPLICATE RUNTIME / NO CODE IMPORTED**.
