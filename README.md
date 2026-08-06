# 01builds / Actions

Enterprise-grade GitHub Actions and Guardrail Workflows designed for **AI Automated Development** (ZoBuilder) and modern web applications.

---

## Features

- **Strict Static Analysis**: Enforces TypeScript (`tsc --noEmit`), ESLint, and Vitest suite execution.
- **Hono + Cloudflare Worker Protection**: Validates Cloudflare Worker types, D1 database migrations, and Wrangler deployment settings.
- **Vite + React Guardrails**: Validates component builds and frontend assets.
- **Differential Coverage Gate**: Demands 100% test coverage on newly added code lines.
- **AI Self-Healing Output**: Produces structured JSON (`guardrail-report.json`) on failure so AI agents can parse and auto-fix PRs.
- **Cloudflare Continuous Deployment**: Reusable workflow to execute D1 migrations and Wrangler deployments automatically on merge.

---

## Quick Start Integration

Add `.github/workflows/guardrails.yml` in your template repository (such as `cloudflare-native-template`):

```yaml
name: Guardrails

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  guardrails:
    uses: 01builds/actions/.github/workflows/reusable-guardrails.yml@v1
    with:
      hono-dir: '.'
      vite-dir: '.'
    secrets:
      GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

---

## Component Actions

| Action | Description |
| :--- | :--- |
| `01builds/actions/.github/actions/security-audit` | Audits modified file extensions against allowlist and scans for secret leaks. |
| `01builds/actions/.github/actions/hono-cloudflare` | Lints, typechecks, tests, and verifies Hono API & Cloudflare Worker code. |
| `01builds/actions/.github/actions/vite-react` | Lints, typechecks, tests, and builds Vite + React frontend code. |
| `01builds/actions/.github/actions/ai-review` | Performs AI code review against PR diffs and generates structured JSON output. |

---

## Reusable Workflows

| Workflow | Description |
| :--- | :--- |
| `.github/workflows/reusable-guardrails.yml` | Reusable master PR check pipeline. |
| `.github/workflows/reusable-deploy.yml` | Reusable Cloudflare deployment pipeline for D1 database and Worker code. |

---

## License

[MIT](LICENSE)
