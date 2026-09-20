import assert from "node:assert/strict";
import { suggestCapabilities, suggestCapabilityById } from "./suggest.mjs";

const positive = await suggestCapabilities("run browser automation on a web interface");
assert.notEqual(positive.status, "none");
assert.equal(positive.executes, false);
assert.equal(positive.authorization_required, true);
assert.ok(positive.candidates.length >= 1 && positive.candidates.length <= 3);
assert.equal(positive.candidates[0].capability, "browser_automation");

const unknown = await suggestCapabilities("make breakfast and translate this sentence");
assert.equal(unknown.status, "none");
assert.equal(unknown.suggestion, null);
assert.equal(unknown.executes, false);

const explicit = await suggestCapabilityById("agent_memory");
assert.equal(explicit.status, "explicit_selection");
assert.equal(explicit.suggestion.capability, "agent_memory");
assert.equal(explicit.executes, false);

const unavailable = await suggestCapabilityById("does_not_exist");
assert.equal(unavailable.status, "unavailable");
assert.equal(unavailable.suggestion, null);

const empty = await suggestCapabilities("");
assert.equal(empty.status, "invalid");

console.log("C6 Capability Router tests: PASS");
