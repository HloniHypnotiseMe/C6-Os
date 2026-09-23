# C6 Governed Workforce Learning

Execution -> Result -> Evidence -> Win/Failure -> Learning -> Proposed Change -> Review -> Registered Version

## Rules

- Learning is evidence-derived.
- Agents cannot silently rewrite their own permissions.
- Production behaviour changes require the same authorization gates as normal implementation.
- A failed execution becomes a learning candidate, not automatic policy.
- Repeated verified wins may improve routing priority only through registered changes.
- Human approval remains mandatory for configured high-risk policy changes.

## Learning record

A learning record contains:

- source execution;
- result;
- evidence;
- failure/win classification;
- observed pattern;
- proposed skill/workflow/routing change;
- affected capability;
- risk;
- approval;
- verification result;
- resulting version.

## Closed loop

CAPTURE -> PROVE -> REGISTER -> ESCALATE

The loop must never become:

EXECUTE -> SELF-MODIFY -> CLAIM SUCCESS
