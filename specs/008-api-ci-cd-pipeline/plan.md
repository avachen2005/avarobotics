# Implementation Plan: API CI/CD Pipeline

GitHub Actions workflows for Go API quality checks (test + lint) on PRs and AWS CodeBuild trigger on merge to main via OIDC.

## Table of Contents

- [Summary](#summary)
- [Technical Context](#technical-context)
- [Constitution Check](#constitution-check)
- [Project Structure](#project-structure)
- [Complexity Tracking](#complexity-tracking)

---

**Branch**: `008-api-ci-cd-pipeline` | **Date**: 2026-02-07 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/008-api-ci-cd-pipeline/spec.md`

## Summary

Implement two GitHub Actions workflows for the Go API: (1) a PR quality gate that runs unit tests and golangci-lint in parallel, and (2) a deploy trigger that authenticates to AWS via OIDC and triggers an AWS CodeBuild project on merge to main. Both workflows use path filtering to only run when `api/` files change. The IAM OIDC provider and role are set up via Terraform following the existing User → Role → Policy pattern.

## Technical Context

**Language/Version**: YAML (GitHub Actions workflows), HCL (Terraform for IAM), Go 1.22 (golangci-lint config)
**Primary Dependencies**: `actions/checkout@v4`, `actions/setup-go@v5`, `golangci/golangci-lint-action@v4`, `aws-actions/configure-aws-credentials@v4`, `aws-actions/aws-codebuild-run-build@v1`
**Storage**: N/A
**Testing**: GitHub Actions workflow validation via test PR; golangci-lint config validation via local run
**Target Platform**: GitHub Actions runners (ubuntu-latest), AWS IAM (global)
**Project Type**: CI/CD configuration (no application code)
**Performance Goals**: PR checks complete within 5 minutes (SC-001); CodeBuild triggered within 2 minutes of merge (SC-003)
**Constraints**: OIDC role restricted to `repo:avachen2005/avarobotics:ref:refs/heads/main` for deploy trigger
**Scale/Scope**: Single API service, ~2 workflow files, ~1 Terraform module

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution is not yet configured (template placeholders only). No gates to enforce. Proceeding.

**Post-design re-check**: No violations. The implementation is straightforward CI/CD configuration with no architectural complexity concerns.

## Project Structure

### Documentation (this feature)

```text
specs/008-api-ci-cd-pipeline/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0: technology research
├── data-model.md        # Phase 1: entity definitions
├── quickstart.md        # Phase 1: setup guide
├── contracts/
│   └── api-docs/
│       └── ci-workflows.md  # Workflow interface contracts
└── tasks.md             # Phase 2 output (via /speckit.tasks)
```

### Source Code (repository root)

```text
.github/
└── workflows/
    ├── api-ci.yml           # PR quality gate (test + lint)
    └── api-deploy.yml       # Post-merge CodeBuild trigger

api/
└── .golangci.yml            # golangci-lint configuration

terraform/
└── modules/
    └── github-actions-oidc/  # IAM OIDC provider + role + policy
        ├── main.tf
        ├── variables.tf
        └── outputs.tf
```

**Structure Decision**: CI/CD configuration files live at repo root (`.github/workflows/`). Linter config lives with the Go API (`api/.golangci.yml`). IAM resources follow existing Terraform module pattern under `terraform/modules/`.

## Complexity Tracking

No complexity violations. The implementation consists of:
- 2 YAML workflow files (declarative config, no custom logic)
- 1 YAML linter config
- 1 Terraform module (3 resources: OIDC provider, role, policy)
- GitHub branch protection settings (manual or via `gh` CLI)
