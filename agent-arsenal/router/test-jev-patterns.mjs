import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";

const file = path.resolve(process.cwd(), "agent-arsenal/registry/jev-patterns.yaml");
const source = await fs.readFile(file, "utf8");

const requiredSections = [
  "promotion_ladder:",
  "evidence_requirements:",
  "decision_categories:",
  "patterns:",
  "bounded_candidate_selection",
  "typed_verification_gate",
  "bounded_scoring_for_ranking",
  "contrastive_evaluation",
  "evidence_backed_promotion",
  "confidence_as_signal_not_authority",
];

for (const section of requiredSections) {
  assert.ok(source.includes(section), "missing Jev pattern section: " + section);
}

assert.ok(source.includes("generated_scaffold_only: false"));
assert.ok(source.includes("Confidence is never permission") || source.includes("confidence is never permission"));
console.log("C6 Jev pattern registry tests: PASS");
