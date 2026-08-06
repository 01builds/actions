import * as fs from 'fs';

export interface GuardrailError {
  category: 'LINT' | 'TYPECHECK' | 'TEST_COVERAGE' | 'SECURITY_ALLOWLIST' | 'LLM_REVIEW';
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  file?: string;
  line?: number;
  message: string;
}

export interface GuardrailReport {
  timestamp: string;
  status: 'PASSED' | 'FAILED';
  errors: GuardrailError[];
}

export function writeGuardrailReport(report: GuardrailReport, outputPath: string = 'guardrail-report.json'): void {
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`Guardrail report generated at: ${outputPath}`);
}
