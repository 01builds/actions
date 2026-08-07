# 01builds Actions

Reusable GitHub Actions and Workflows for continuous integration and delivery pipelines.

---

## Features

- **Static Analysis**: TypeScript (`tsc --noEmit`), ESLint, and Vitest suite execution.
- **Hono & Cloudflare Worker Verification**: Worker type validation, D1 database migration execution, and Wrangler bundle verification.
- **Vite & React Web Verification**: Component typechecks, Vitest execution, and production bundle generation.
- **Differential Coverage Enforcement**: Verifies test coverage on newly introduced code lines.
- **Structured Findings**: Outputs JSON error reports (`quality-gate-report.json`) for automated code analysis tools.
- **Cloudflare Continuous Delivery**: Reusable workflow to apply database migrations and deploy Workers.

---

## Usage

Add `.github/workflows/verify.yml` to your repository:

```yaml
name: Pull Request Verification

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  verify:
    uses: 01builds/actions/.github/workflows/verify.yml@main
    with:
      api-directory: '.'
      web-directory: '.'
```

---

## Component Actions

| Action | Description |
| :--- | :--- |
| `01builds/actions/.github/actions/security-compliance` | Audits modified file extensions and scans for credential leaks. |
| `01builds/actions/.github/actions/verify-hono` | Typechecks, tests, and validates Hono API & Cloudflare Worker code. |
| `01builds/actions/.github/actions/verify-vite-react` | Typechecks, tests, and builds Vite + React frontend code. |
| `01builds/actions/.github/actions/code-review` | Evaluates pull request diffs and generates structured JSON finding reports. |

---

## Reusable Workflows

| Workflow | Description |
| :--- | :--- |
| `.github/workflows/verify.yml` | Reusable pull request verification pipeline. |
| `.github/workflows/deploy.yml` | Reusable Cloudflare deployment pipeline for Workers and D1 databases. |

---

## License

[MIT](LICENSE)
