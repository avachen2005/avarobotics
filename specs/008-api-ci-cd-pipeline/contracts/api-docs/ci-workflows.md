# CI/CD Workflow Contracts

Defines the GitHub Actions workflow interfaces for the API CI/CD pipeline.

## Table of Contents

- [PR Workflow: api-ci.yml](#pr-workflow-api-ciyml)
- [Deploy Workflow: api-deploy.yml](#deploy-workflow-api-deployyml)

---

## PR Workflow: api-ci.yml

### Trigger

| Event | Filter | Condition |
|-------|--------|-----------|
| `pull_request` | `paths: ['api/**']` | Any PR that modifies `api/` files |

### Jobs

#### test

| Step | Action | Config |
|------|--------|--------|
| Checkout | `actions/checkout@v4` | — |
| Setup Go | `actions/setup-go@v5` | `go-version: '1.22'`, `cache-dependency-path: api/go.sum` |
| Run tests | `go test -v -race -coverprofile=coverage.out ./...` | `working-directory: ./api` |

#### lint

| Step | Action | Config |
|------|--------|--------|
| Checkout | `actions/checkout@v4` | — |
| Setup Go | `actions/setup-go@v5` | `go-version: '1.22'`, `cache-dependency-path: api/go.sum` |
| golangci-lint | `golangci/golangci-lint-action@v4` | `version: latest`, `working-directory: api`, `only-new-issues: true` |

### Output

| Check | Condition | Result |
|-------|-----------|--------|
| `test` | All tests pass | PR status: green |
| `test` | Any test fails | PR status: red + failure details |
| `lint` | No lint issues | PR status: green |
| `lint` | Lint issues found | PR status: red + inline annotations |

---

## Deploy Workflow: api-deploy.yml

### Trigger

| Event | Filter | Condition |
|-------|--------|-----------|
| `push` | `branches: [main]`, `paths: ['api/**']` | Merge to main that modifies `api/` files |

### Permissions

| Permission | Value | Purpose |
|------------|-------|---------|
| `id-token` | `write` | OIDC token generation |
| `contents` | `read` | Repository checkout |

### Jobs

#### trigger-build

| Step | Action | Config |
|------|--------|--------|
| Checkout | `actions/checkout@v4` | — |
| AWS Credentials | `aws-actions/configure-aws-credentials@v4` | `role-to-assume: GitHubActionsCIRole`, `aws-region: us-east-1` |
| Trigger CodeBuild | `aws-actions/aws-codebuild-run-build@v1` | `project-name: avarobotics-api-build` |

### Environment Variables Passed to CodeBuild

| Variable | Value | Purpose |
|----------|-------|---------|
| `GIT_COMMIT_SHA` | `${{ github.sha }}` | Commit traceability |
| `IMAGE_TAG` | `${{ github.sha }}` | ECR image tag |

### Error Scenarios

| Scenario | Behavior |
|----------|----------|
| OIDC auth failure | Job fails with authentication error in logs |
| CodeBuild project not found | Job fails with "project not found" error |
| CodeBuild build failure | Job fails with streamed CodeBuild logs |
