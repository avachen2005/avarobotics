# Quickstart: API CI/CD Pipeline

How to set up and verify the API CI/CD pipeline.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Steps](#setup-steps)
- [Verification](#verification)

---

## Prerequisites

- GitHub repository: `avachen2005/avarobotics`
- AWS account with permissions to create IAM resources
- Terraform installed (for IAM OIDC setup)

## Setup Steps

### 1. Create golangci-lint config

Create `api/.golangci.yml` with the linter configuration.

### 2. Create PR workflow

Create `.github/workflows/api-ci.yml` with test and lint jobs triggered on `pull_request` with `paths: ['api/**']`.

### 3. Create deploy trigger workflow

Create `.github/workflows/api-deploy.yml` with OIDC auth and CodeBuild trigger on `push` to `main` with `paths: ['api/**']`.

### 4. Set up AWS IAM OIDC (Terraform)

- Register GitHub OIDC provider in AWS
- Create `GitHubActionsCIRole` with trust policy for the repository
- Attach `CodeBuildTriggerPolicy` with `codebuild:StartBuild`, `codebuild:BatchGetBuilds`, `logs:GetLogEvents`

### 5. Configure required status checks

In GitHub repo settings → Branches → Branch protection rules for `main`:
- Enable "Require status checks to pass before merging"
- Add `test` and `lint` as required checks

## Verification

### Test the PR workflow

```bash
# Create a test branch and modify an API file
git checkout -b test/ci-pipeline
echo "// test" >> api/internal/handler/health.go
git add api/internal/handler/health.go
git commit -m "test: verify CI pipeline"
git push -u origin test/ci-pipeline

# Open a PR — GitHub Actions should run test + lint jobs
gh pr create --title "Test CI pipeline" --body "Testing CI workflow"

# Verify: check GitHub Actions tab for running workflows
# Clean up after verification
```

### Test the deploy trigger

```bash
# Merge a PR to main that touches api/ files
# Verify: GitHub Actions triggers CodeBuild
# Verify: CodeBuild logs stream to GitHub Actions
```

### Test path filtering

```bash
# Create a PR that only modifies non-api files
# Verify: API CI workflow does NOT trigger
```
