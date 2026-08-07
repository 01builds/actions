import { describe, it, expect } from 'vitest';
import { evaluateDiffCoverage } from './diff_coverage.js';

describe('Diff Coverage Engine', () => {
  it('should pass cleanly when no lcov coverage file is present', () => {
    const report = evaluateDiffCoverage('nonexistent/lcov.info', 80);
    expect(report.passed).toBe(true);
    expect(report.coveragePercentage).toBe(100);
  });
});
