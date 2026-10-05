import assert from 'node:assert/strict';
import fs from 'node:fs';

const workforce = fs.readFileSync('agent-arsenal/registry/workforce.yaml', 'utf8');
const functionRegistry = fs.readFileSync('agent-arsenal/registry/quality-assurance.yaml', 'utf8');
const matrix = fs.readFileSync('agent-arsenal/quality/TEST-MATRIX.yaml', 'utf8');
const charter = fs.readFileSync('agent-arsenal/quality/QUALITY-ASSURANCE-CHARTER.md', 'utf8');

for (const marker of [
  'id: quality_assurance',
  'id: c6_quality_assurance',
  'independence: "verification_is_separate_from_implementation"',
]) assert.ok(workforce.includes(marker), `missing workforce marker: ${marker}`);

for (const marker of [
  'id: quality_verification_assurance',
  'independence_from: engineering',
  'evidence_required: true',
  'approval_required_for_consequential: true',
]) assert.ok(functionRegistry.includes(marker), `missing function marker: ${marker}`);

for (const suite of ['functional:', 'api:', 'integration:', 'security:', 'regression:', 'data:', 'economic:', 'agent:', 'performance:', 'resilience:', 'production_readiness:']) {
  assert.ok(matrix.includes(`  ${suite}`), `missing test suite: ${suite}`);
}

for (const rule of ['BUILD → TEST → SECURITY → VERIFY → EVIDENCE → REGISTER → RELEASE', 'Engineering owns implementation. Quality, Verification & Assurance owns verification status.', '`BLOCKED_EXTERNAL`', '`LIVE`']) {
  assert.ok(charter.includes(rule), `missing assurance rule: ${rule}`);
}

console.log('QUALITY_ASSURANCE_REGISTRY_PASS');
