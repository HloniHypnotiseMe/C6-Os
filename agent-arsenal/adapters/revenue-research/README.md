# C6 Revenue Research Adapter

This adapter contract is deliberately narrow: it connects Arsenal resolution to commercial research without pretending provider execution is already deployed.

## First supported capability

`research`

## Candidate providers

- context_hub
- openviking
- metagpt
- hf_agents
- openmaic

The resolver remains the authority for provider selection and constraints.

## Activation gate

Before this becomes `operational`, C6 must add:

- provider invocation implementation
- authorization/credential handling
- evidence capture
- verification test
- failure handling
- audit record

Until then the adapter remains `contract_only`.
