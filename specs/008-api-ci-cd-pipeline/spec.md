# Feature Specification: API CI/CD Pipeline

GitHub Actions workflows for API quality checks and AWS CodeBuild trigger.

## Table of Contents

- [User Scenarios & Testing](#user-scenarios--testing-mandatory)
- [Requirements](#requirements-mandatory)
- [Success Criteria](#success-criteria-mandatory)
- [Clarifications](#clarifications)

---

**Feature Branch**: `008-api-ci-cd-pipeline`
**Created**: 2026-02-07
**Status**: Draft
**Input**: User description: "我要在每次 api 有更新的時候都要跑 unit test & lint before pr is created，pr 進去後就跑一個新的 ecr 放到 aws 上面"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Pre-PR Quality Gate (Priority: P1)

As a developer, when I create or update a pull request that changes API code, the system automatically runs unit tests and lint checks so that code quality issues are caught before review.

**Why this priority**: Without automated quality checks, broken code or style violations can be merged into the main branch. This is the foundation that must be in place before any deployment automation.

**Independent Test**: Can be fully tested by opening a PR with API changes and verifying that unit tests and lint run automatically and report results on the PR.

**Acceptance Scenarios**:

1. **Given** a developer creates a PR that modifies files under `api/`, **When** the PR is opened, **Then** the pipeline automatically runs Go unit tests and reports pass/fail status on the PR.
2. **Given** a developer creates a PR that modifies files under `api/`, **When** the PR is opened, **Then** the pipeline automatically runs a Go linter and reports pass/fail status on the PR.
3. **Given** a developer creates a PR that only modifies files outside `api/` (e.g., `terraform/`, `ios/`), **When** the PR is opened, **Then** the API quality checks do not run.
4. **Given** unit tests or lint checks fail, **When** the developer views the PR, **Then** the PR shows a failing check status with details about what failed.
5. **Given** a developer pushes new commits to an existing PR, **When** the push is received, **Then** the quality checks run again on the updated code.

---

### User Story 2 - Post-Merge CodeBuild Trigger (Priority: P2)

As a developer, when a PR is merged into the main branch that changes API code, GitHub Actions triggers an AWS CodeBuild project to build and deploy the container image. The Docker build and ECR push are handled by CodeBuild (separate ticket).

**Why this priority**: Automated build triggering ensures every merged change gets packaged. Depends on US1 because only quality-checked code should be built. Depends on the CodeBuild project being set up (separate ticket).

**Independent Test**: Can be tested by merging a PR into main and verifying that GitHub Actions successfully triggers the CodeBuild project via OIDC authentication.

**Acceptance Scenarios**:

1. **Given** a PR that modifies files under `api/` is merged into main, **When** the merge completes, **Then** GitHub Actions authenticates to AWS via OIDC and triggers the designated CodeBuild project.
2. **Given** a PR is merged that only modifies files outside `api/`, **When** the merge completes, **Then** no CodeBuild project is triggered.
3. **Given** the OIDC authentication or CodeBuild trigger fails, **When** the developer views the workflow run, **Then** the failure details are visible in the GitHub Actions log.
4. **Given** the CodeBuild project does not yet exist (dependency not yet completed), **When** the trigger workflow runs, **Then** it fails gracefully with a clear error message.

---

### User Story 3 - Pipeline Visibility (Priority: P3)

As a developer, I can see the status of CI/CD runs directly from the GitHub PR and repository so that I know whether the pipeline is passing or failing without navigating elsewhere.

**Why this priority**: Visibility is important for developer experience but the pipeline functions without it.

**Independent Test**: Can be tested by checking that GitHub shows status checks on PRs and that workflow runs are visible in the Actions tab.

**Acceptance Scenarios**:

1. **Given** a pipeline run completes, **When** the developer views the PR, **Then** check status (pass/fail) is visible on the PR page.
2. **Given** a pipeline run fails, **When** the developer clicks on the failed check, **Then** they can see the specific error output (test failures or lint errors).

---

### Edge Cases

- What happens when the `go.sum` file is out of sync? The pipeline should fail with a clear error during dependency resolution.
- What happens when a PR modifies both `api/` and non-API files? The API quality checks should still run.
- What happens when OIDC authentication to AWS fails? The workflow should fail with a clear error indicating the authentication issue.
- What happens when multiple PRs merge in quick succession? Each merge should trigger its own independent pipeline run.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST run Go unit tests on every PR that modifies files under the `api/` directory.
- **FR-002**: System MUST run a Go linter on every PR that modifies files under the `api/` directory.
- **FR-003**: System MUST only trigger API pipeline steps when files under `api/` are changed (path filtering).
- **FR-004**: System MUST block PR merge when unit tests or lint checks fail (required status checks).
- **FR-005**: System MUST trigger an AWS CodeBuild project via OIDC when a PR merges to main with `api/` changes.
- **FR-006**: System MUST authenticate to AWS using OIDC federation (no static credentials stored in GitHub).
- **FR-007**: System MUST provide visible feedback (pass/fail status) on the GitHub PR for all checks.
- **FR-008**: System MUST re-run quality checks when new commits are pushed to an open PR.

### Key Entities

- **PR Workflow**: The GitHub Actions workflow that runs unit tests and lint on pull requests.
- **Deploy Trigger Workflow**: The GitHub Actions workflow that triggers CodeBuild on merge to main.
- **OIDC IAM Role**: The AWS IAM role assumed by GitHub Actions via OIDC, with permission to trigger CodeBuild only.

### Dependencies

- **AWS CodeBuild project** (separate ticket): Responsible for Docker build, image tagging (commit SHA + `latest`), and ECR push. This spec only triggers that project.

### Assumptions

- The repository uses GitHub as its hosting platform (GitHub Actions for CI/CD).
- GitHub Actions authenticates to AWS via OIDC federation — no static access keys.
- The OIDC IAM role only has `codebuild:StartBuild` permission (least privilege).
- The Go API is the only service that needs CI/CD in this iteration (other platforms like iOS/Android are out of scope).
- A golangci-lint configuration does not yet exist and will need to be created.
- The AWS CodeBuild project, ECR repository, Dockerfile, and CodeBuild service role are handled by a separate ticket.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Every PR that modifies API code has automated test and lint results visible within 5 minutes of PR creation or update.
- **SC-002**: No code with failing tests or lint errors can be merged into the main branch.
- **SC-003**: On merge to main with API changes, CodeBuild is triggered within 2 minutes.
- **SC-004**: Developers can identify the cause of a pipeline failure within 1 minute of viewing the failed run.

## Clarifications

### Session 2026-02-07

- Q: How should GitHub Actions authenticate to AWS for the CodeBuild trigger? → A: OIDC federation (GitHub Actions assumes an IAM role, no stored secrets).
- Q: Should Docker build and ECR push happen on GitHub runners or AWS CodeBuild? → A: AWS CodeBuild (separate ticket). GitHub Actions only triggers the build.
