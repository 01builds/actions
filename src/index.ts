import * as core from '@actions/core';
import { evaluateDiffCoverage } from './diff_coverage.js';
import { writeGuardrailReport } from './json_reporter.js';

async function run(): Promise<void> {
  try {
    core.info('Starting quality gate verification...');

    const apiDir = core.getInput('api-directory') || core.getInput('hono-dir') || '.';
    const webDir = core.getInput('web-directory') || core.getInput('vite-dir') || '.';
    const threshold = parseInt(core.getInput('coverage-threshold') || core.getInput('min-coverage') || '80', 10);

    core.info(`API Directory: ${apiDir}`);
    core.info(`Web Directory: ${webDir}`);
    core.info(`Coverage Threshold: ${threshold}%`);

    const coverageResult = evaluateDiffCoverage('coverage/lcov.info', threshold);

    writeGuardrailReport({
      timestamp: new Date().toISOString(),
      status: coverageResult.passed ? 'PASSED' : 'FAILED',
      errors: coverageResult.passed
        ? []
        : [
            {
              category: 'TEST_COVERAGE',
              severity: 'HIGH',
              message: `Differential coverage ${coverageResult.coveragePercentage}% is below required ${threshold}%`
            }
          ]
    });

    if (!coverageResult.passed) {
      core.setFailed(`Quality gate failed: Differential coverage below ${threshold}%`);
    } else {
      core.info('Quality gate verification completed successfully.');
    }
  } catch (error: any) {
    core.setFailed(`Verification error: ${error.message}`);
  }
}

run();
