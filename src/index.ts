import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as fs from 'fs';
import { evaluateDiffCoverage } from './diff_coverage.js';
import { writeGuardrailReport } from './json_reporter.js';

async function run(): Promise<void> {
  try {
    core.info('🚀 Starting 01builds AI Guardrails Evaluation...');

    const honoDir = core.getInput('hono-dir') || '.';
    const viteDir = core.getInput('vite-dir') || '.';
    const minCoverage = parseInt(core.getInput('min-coverage') || '80', 10);

    core.info(`📂 Hono Directory: ${honoDir}`);
    core.info(`📂 Vite Directory: ${viteDir}`);
    core.info(`🎯 Minimum Coverage Required: ${minCoverage}%`);

    // Evaluate differential test coverage
    const coverageResult = evaluateDiffCoverage('coverage/lcov.info', minCoverage);

    writeGuardrailReport({
      timestamp: new Date().toISOString(),
      status: coverageResult.passed ? 'PASSED' : 'FAILED',
      errors: coverageResult.passed
        ? []
        : [
            {
              category: 'TEST_COVERAGE',
              severity: 'HIGH',
              message: `Differential coverage ${coverageResult.coveragePercentage}% is below required ${minCoverage}%`
            }
          ]
    });

    if (!coverageResult.passed) {
      core.setFailed(`🚨 Guardrail Check Failed: Coverage below ${minCoverage}%`);
    } else {
      core.info('✅ All Guardrail Checks Passed Cleanly!');
    }
  } catch (error: any) {
    core.setFailed(`❌ Unhandled Guardrail Error: ${error.message}`);
  }
}

run();
