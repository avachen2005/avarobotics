# Implementation Plan: AWS CodeBuild Docker Build and ECR Push for API

Create a Dockerfile for the Go API, provision ECR repository and CodeBuild project via Terraform, and set up GitHub Actions OIDC for secure build triggering.

## Table of Contents

- [Summary](#summary)
- [Technical Context](#technical-context)
- [Constitution Check](#constitution-check)
- [Project Structure](#project-structure)
- [Complexity Tracking](#complexity-tracking)

---

**Branch**: `040-codebuild-ecr-api` | **Date**: 2026-02-07 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/040-codebuild-ecr-api/spec.md`

## Summary

Create a complete container build pipeline for the Go API: a multi-stage Dockerfile producing a minimal `scratch`-based image, a new Terraform `codebuild` module provisioning ECR repository + CodeBuild project + IAM roles, and GitHub Actions OIDC provider for secure cross-account triggering. All following existing Terraform module patterns and IAM conventions.

## Technical Context

**Language/Version**: Go 1.22 (API), HCL (Terraform >= 1.5.0)
**Primary Dependencies**: AWS Provider ~> 5.0, Docker (multi-stage build)
**Storage**: ECR (container images), CloudWatch Logs (build logs)
**Testing**: Terratest (validate + plan for new module), Docker build verification
**Target Platform**: AWS (ap-northeast-1), GitHub Actions OIDC
**Project Type**: Infrastructure (Terraform module) + Dockerfile
**Performance Goals**: Build completes within 5 minutes, image < 20MB
**Constraints**: Least-privilege IAM, OIDC restricted to main branch only
**Scale/Scope**: 1 new Terraform module, 1 Dockerfile, 1 buildspec, updates to dev environment

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution is not yet configured for this project (template placeholders only). No gates to evaluate.

**Post-design re-check**: N/A — no constitution constraints defined.

## Project Structure

### Documentation (this feature)

```text
specs/040-codebuild-ecr-api/
├── plan.md              # This file
├── research.md          # Phase 0 output — technical decisions
├── quickstart.md        # Phase 1 output — deployment guide
├── spec.md              # Feature specification
└── checklists/
    └── requirements.md  # Specification quality checklist
```

### Source Code (repository root)

```text
api/
└── Dockerfile                          # Multi-stage: Go builder → scratch

terraform/
├── modules/
│   └── codebuild/                      # NEW MODULE
│       ├── main.tf                     # ECR repo, CodeBuild project, IAM roles, OIDC provider
│       ├── variables.tf                # Module inputs
│       ├── outputs.tf                  # ECR URL, CodeBuild project name, role ARNs
│       └── policies/
│           ├── codebuild-ecr-push.json # ECR push permissions for CodeBuild service role
│           └── codebuild-trigger.json  # codebuild:StartBuild for GitHub OIDC role
├── environments/
│   └── dev/
│       ├── main.tf                     # Add codebuild module call
│       ├── variables.tf                # Add github_repo variable (if needed)
│       └── outputs.tf                  # Add ECR and CodeBuild outputs
└── test/
    ├── fixtures/
    │   └── codebuild/                  # NEW FIXTURE
    │       ├── main.tf
    │       ├── variables.tf
    │       └── outputs.tf
    ├── helpers/helpers.go              # Add CodebuildVars()
    ├── codebuild_test.go               # Plan-only test
    └── validate_test.go                # Update module list to include "codebuild"
```

**Structure Decision**: Follows existing `terraform/modules/<name>/` pattern with `main.tf`, `variables.tf`, `outputs.tf`, and `policies/` directory for IAM JSON files. The Dockerfile lives in `api/` alongside the Go code it builds. Terratest fixture follows the established pattern in `terraform/test/fixtures/`.

### Key Implementation Details

#### Dockerfile (`api/Dockerfile`)

- **Stage 1 (builder)**: `golang:1.22-alpine`, copies source, runs `CGO_ENABLED=0 go build -o /api ./cmd/server`
- **Stage 2 (final)**: `scratch`, copies binary only, exposes port 8080, entrypoint `/api`

#### Terraform Module (`terraform/modules/codebuild/`)

Resources to create:
- `aws_ecr_repository` — image storage, tag mutability enabled
- `aws_codebuild_project` — Docker build environment, inline buildspec
- `aws_iam_role` (CodeBuild service) — trust policy for `codebuild.amazonaws.com`
- `aws_iam_policy` (ECR push) — GetAuthorizationToken, BatchCheckLayerAvailability, PutImage, InitiateLayerUpload, UploadLayerPart, CompleteLayerUpload
- `aws_iam_openid_connect_provider` — GitHub Actions OIDC
- `aws_iam_role` (GitHub OIDC) — trust policy for `token.actions.githubusercontent.com`, restricted to `repo:avachen2005/avarobotics:ref:refs/heads/main`
- `aws_iam_policy` (CodeBuild trigger) — `codebuild:StartBuild` only

#### Buildspec (inline in Terraform)

```yaml
version: 0.2
phases:
  pre_build:
    commands:
      - aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $ECR_REPO_URL
  build:
    commands:
      - docker build -f api/Dockerfile -t $ECR_REPO_URL:$CODEBUILD_RESOLVED_SOURCE_VERSION .
      - docker tag $ECR_REPO_URL:$CODEBUILD_RESOLVED_SOURCE_VERSION $ECR_REPO_URL:latest
  post_build:
    commands:
      - docker push $ECR_REPO_URL:$CODEBUILD_RESOLVED_SOURCE_VERSION
      - docker push $ECR_REPO_URL:latest
```

## Complexity Tracking

No constitution violations to justify — no constitution constraints are defined.
