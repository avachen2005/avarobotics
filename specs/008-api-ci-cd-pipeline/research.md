# Research: API CI/CD Pipeline

Research findings for the GitHub Actions CI/CD pipeline implementation.

## Table of Contents

- [GitHub Actions Go CI Workflow](#github-actions-go-ci-workflow)
- [GitHub Actions OIDC with AWS](#github-actions-oidc-with-aws)
- [golangci-lint in CI](#golangci-lint-in-ci)
- [CodeBuild Trigger from GitHub Actions](#codebuild-trigger-from-github-actions)

---

## GitHub Actions Go CI Workflow

**Decision**: Use GitHub Actions built-in `paths` filter with separate parallel jobs for test and lint.

**Rationale**:
- Built-in `paths: ['api/**']` is the simplest path filtering — no extra actions needed
- Separate jobs for test and lint run in parallel, reducing total CI time
- `actions/setup-go@v5` provides Go module caching via `cache-dependency-path`

**Alternatives considered**:
- `dorny/paths-filter` action: More powerful but overkill for single-directory filtering
- Single job with sequential steps: Simpler but slower

## GitHub Actions OIDC with AWS

**Decision**: Use `aws-actions/configure-aws-credentials@v4` with OIDC to assume an IAM role. No static credentials.

**Rationale**:
- Short-lived credentials (1 hour default) — no secrets to leak or rotate
- Trust policy restricts to specific repo via `token.actions.githubusercontent.com:sub` condition
- Follows existing IAM User → Role → Policy architecture
- AWS officially supports and recommends this approach

**Key implementation details**:
- Workflow needs `permissions: id-token: write`
- AWS needs IAM OIDC provider for `token.actions.githubusercontent.com`
- Trust policy condition: `repo:avachen2005/avarobotics:ref:refs/heads/main`

**Alternatives considered**:
- Static access keys in GitHub secrets: Security risk, rotation overhead
- Self-hosted runners with instance profiles: Infrastructure maintenance overhead

## golangci-lint in CI

**Decision**: Use official `golangci/golangci-lint-action@v4` GitHub Action.

**Rationale**:
- Built-in caching for golangci-lint and Go build caches
- PR annotations (inline comments at error locations)
- `only-new-issues: true` shows only issues introduced in the PR diff
- Auto-detects `.golangci.yml` config file

**Alternatives considered**:
- Direct `go install` + run: No caching, no GitHub annotations
- `reviewdog/action-golangci-lint`: Extra dependency, slower

## CodeBuild Trigger from GitHub Actions

**Decision**: Use `aws-actions/aws-codebuild-run-build@v1` for synchronous build trigger with log streaming.

**Rationale**:
- Waits for build completion and streams logs to GitHub Actions
- Job fails automatically if CodeBuild fails — no manual polling
- Pass environment variables (commit SHA, image tag) via `env-vars-for-codebuild`

**Required IAM permissions for OIDC role**:
- `codebuild:StartBuild` — trigger the build
- `codebuild:BatchGetBuilds` — poll for build status (used by the action)
- `logs:GetLogEvents` — stream build logs

**Alternatives considered**:
- `aws codebuild start-build` CLI: Async, no log streaming, need manual polling
- CodeBuild webhooks (direct GitHub → CodeBuild): Less flexible, can't run tests first
- CodePipeline: More infrastructure overhead, higher cost
