import { describe, it, expect } from 'vitest';
import { evaluateDiffCoverage } from './diff_coverage.js';

describe('Diff Coverage Engine', () => {
  it('should handle missing coverage file gracefully', () => {
    const report = evaluateDiffCoverage('nonexistent/lcov.info', 80);
    expect(report.passed).toBe(false);
    expect(report.coveragePercentage).toBe(0);
  });
});
