# Data Model: API CI/CD Pipeline

Entity definitions for the CI/CD pipeline configuration.

## Table of Contents

- [PR Workflow](#pr-workflow)
- [Deploy Trigger Workflow](#deploy-trigger-workflow)
- [OIDC IAM Role](#oidc-iam-role)
- [golangci-lint Config](#golangci-lint-config)

---

## PR Workflow

GitHub Actions workflow triggered on pull requests.

| Attribute | Value |
|-----------|-------|
| File | `.github/workflows/api-ci.yml` |
| Trigger | `pull_request` with `paths: ['api/**']` |
| Jobs | `test` (parallel), `lint` (parallel) |
| Runner | `ubuntu-latest` |
| Go version | `1.22` |

### State Transitions

```
PR opened/updated → Workflow triggered → Jobs run in parallel
  ├── test job: checkout → setup-go → go test → report
  └── lint job: checkout → setup-go → golangci-lint → report
       ↓
  All pass → PR mergeable
  Any fail → PR blocked
```

## Deploy Trigger Workflow

GitHub Actions workflow triggered on merge to main.

| Attribute | Value |
|-----------|-------|
| File | `.github/workflows/api-deploy.yml` |
| Trigger | `push` to `main` with `paths: ['api/**']` |
| Jobs | `trigger-build` |
| Auth | OIDC → `GitHubActionsCIRole` |
| Action | `aws-actions/aws-codebuild-run-build@v1` |

### State Transitions

```
PR merged to main → Workflow triggered → OIDC auth → Trigger CodeBuild
  ├── Auth success + Build started → Stream logs → Report status
  ├── Auth failure → Fail with error details
  └── CodeBuild failure → Fail with build logs
```

### Environment Variables Passed to CodeBuild

| Variable | Source | Purpose |
|----------|--------|---------|
| `GIT_COMMIT_SHA` | `github.sha` | Image tag for traceability |
| `IMAGE_TAG` | `github.sha` | ECR image tag |

## OIDC IAM Role

IAM resources for GitHub Actions authentication.

| Resource | Name | Purpose |
|----------|------|---------|
| OIDC Provider | `GitHubOIDCProvider` | Trusts `token.actions.githubusercontent.com` |
| IAM Role | `GitHubActionsCIRole` | Assumed by GitHub Actions via OIDC |
| IAM Policy | `CodeBuildTriggerPolicy` | `codebuild:StartBuild`, `codebuild:BatchGetBuilds`, `logs:GetLogEvents` |

### Trust Policy Conditions

| Condition | Value | Purpose |
|-----------|-------|---------|
| `aud` | `sts.amazonaws.com` | Standard audience for AWS |
| `sub` | `repo:avachen2005/avarobotics:ref:refs/heads/main` | Restrict to main branch only |

## golangci-lint Config

Linter configuration for the Go API.

| Attribute | Value |
|-----------|-------|
| File | `api/.golangci.yml` |
| Linters | errcheck, gosimple, govet, ineffassign, staticcheck, unused, gofmt, goimports |
| Timeout | 5 minutes |
| Go version | 1.22 |
