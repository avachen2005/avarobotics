# Tasks: API CI/CD Pipeline

GitHub Actions workflows for Go API quality checks (test + lint) on PRs, and OIDC-based CodeBuild trigger on merge to main.

## Table of Contents

- [Phase 1: Setup](#phase-1-setup-shared-infrastructure)
- [Phase 2: Foundational](#phase-2-foundational-blocking-prerequisites)
- [Phase 3: User Story 1](#phase-3-user-story-1---pre-pr-quality-gate-priority-p1--mvp)
- [Phase 4: User Story 2](#phase-4-user-story-2---post-merge-codebuild-trigger-priority-p2)
- [Phase 5: User Story 3](#phase-5-user-story-3---pipeline-visibility-priority-p3)
- [Phase 6: Polish](#phase-6-polish--cross-cutting-concerns)
- [Dependencies & Execution Order](#dependencies--execution-order)
- [Implementation Strategy](#implementation-strategy)

---

**Input**: Design documents from `/specs/008-api-ci-cd-pipeline/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create directory structure and shared configuration files

- [x] T001 Create `.github/workflows/` directory at repository root
- [x] T002 [P] Create golangci-lint configuration in `api/.golangci.yml` with linters: errcheck, gosimple, govet, ineffassign, staticcheck, unused, gofmt, goimports (timeout: 5m, go: 1.22)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: No blocking foundational tasks required — US1 and US2 operate on separate files and can proceed after Setup

**⚠️ NOTE**: US2 requires Terraform IAM resources, but those are created within the US2 phase since they are not shared by other stories.

**Checkpoint**: Setup complete — user story implementation can begin

---

## Phase 3: User Story 1 - Pre-PR Quality Gate (Priority: P1) 🎯 MVP

**Goal**: Automatically run Go unit tests and golangci-lint on every PR that modifies `api/` files, reporting pass/fail on the PR.

**Independent Test**: Open a PR that modifies a file under `api/` and verify that test and lint jobs run automatically and report status on the PR.

### Implementation for User Story 1

- [x] T003 [US1] Create PR workflow in `.github/workflows/api-ci.yml` with:
  - Trigger: `pull_request` with `paths: ['api/**']`
  - `test` job: `actions/checkout@v4` → `actions/setup-go@v5` (go 1.22, cache-dependency-path: api/go.sum) → `go test -v -race -coverprofile=coverage.out ./...` (working-directory: ./api)
  - `lint` job: `actions/checkout@v4` → `actions/setup-go@v5` → `golangci/golangci-lint-action@v4` (version: latest, working-directory: api, only-new-issues: true, args: --timeout=5m)
  - Both jobs run in parallel on `ubuntu-latest`

**Checkpoint**: At this point, PRs touching `api/` files will automatically run test + lint and report status. This is the MVP.

---

## Phase 4: User Story 2 - Post-Merge CodeBuild Trigger (Priority: P2)

**Goal**: On merge to main with `api/` changes, authenticate to AWS via OIDC and trigger CodeBuild to build the container image.

**Independent Test**: Merge a PR to main that modifies `api/` files and verify that GitHub Actions authenticates via OIDC and triggers the CodeBuild project.

### Implementation for User Story 2

- [x] T004 [P] [US2] Create Terraform OIDC module directory and main config in `terraform/modules/github-actions-oidc/main.tf` with:
  - `aws_iam_openid_connect_provider` for `token.actions.githubusercontent.com`
  - `aws_iam_role` `GitHubActionsCIRole` with trust policy restricted to `repo:avachen2005/avarobotics:ref:refs/heads/main`
  - `aws_iam_policy` `CodeBuildTriggerPolicy` with `codebuild:StartBuild`, `codebuild:BatchGetBuilds`, `logs:GetLogEvents`
  - `aws_iam_role_policy_attachment` linking role to policy
- [x] T005 [P] [US2] Create Terraform variables in `terraform/modules/github-actions-oidc/variables.tf` (repo name, AWS region, CodeBuild project ARN) and outputs in `terraform/modules/github-actions-oidc/outputs.tf` (role ARN, OIDC provider ARN)
- [x] T006 [US2] Create deploy trigger workflow in `.github/workflows/api-deploy.yml` with:
  - Trigger: `push` to `main` with `paths: ['api/**']`
  - Permissions: `id-token: write`, `contents: read`
  - `trigger-build` job: `actions/checkout@v4` → `aws-actions/configure-aws-credentials@v4` (role-to-assume, aws-region) → `aws-actions/aws-codebuild-run-build@v1` (project-name: avarobotics-api-build, env vars: GIT_COMMIT_SHA, IMAGE_TAG from github.sha)

**Checkpoint**: Merges to main with API changes now trigger CodeBuild via OIDC. Both US1 and US2 are functional.

---

## Phase 5: User Story 3 - Pipeline Visibility (Priority: P3)

**Goal**: Developers can see CI/CD status directly on PRs and access failure details from the GitHub UI.

**Independent Test**: Check that GitHub shows status checks on PRs and that clicking a failed check shows specific error output.

### Implementation for User Story 3

- [x] T007 [US3] Configure branch protection rules for `main` branch via `gh` CLI: enable "Require status checks to pass before merging" and add `test` and `lint` as required checks

**Checkpoint**: All user stories complete — PRs show pass/fail status, failing checks block merge, and merged code triggers CodeBuild.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validation and documentation

- [ ] T008 Validate PR workflow by opening a test PR that modifies an `api/` file and verify test + lint jobs run (per quickstart.md)
- [ ] T009 Validate path filtering by opening a test PR that only modifies a non-`api/` file (e.g., `terraform/`) and verify API CI workflow does NOT trigger
- [x] T010 Validate deploy workflow by verifying `.github/workflows/api-deploy.yml` syntax is valid (note: full end-to-end test requires CodeBuild project from ticket #46)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **User Story 1 (Phase 3)**: Depends on T001 (directory) and T002 (lint config)
- **User Story 2 (Phase 4)**: Depends on T001 (directory). T004/T005 (Terraform) are independent of T003
- **User Story 3 (Phase 5)**: Depends on US1 completion (T003) — needs `test` and `lint` job names to exist
- **Polish (Phase 6)**: Depends on US1 and US2 completion

### User Story Dependencies

- **User Story 1 (P1)**: Independent — only needs Setup
- **User Story 2 (P2)**: Independent — only needs Setup. Can run in parallel with US1
- **User Story 3 (P3)**: Depends on US1 — references job names from api-ci.yml

### External Dependencies

- **Ticket #46** (AWS CodeBuild): US2 deploy workflow will trigger CodeBuild, but CodeBuild project must exist for end-to-end validation. The workflow can be created and syntax-validated without it.

### Parallel Opportunities

- T001 and T002 can run in parallel (Setup phase)
- T003 (US1) and T004+T005 (US2 Terraform) can run in parallel after Setup
- T004 and T005 can run in parallel (different files in same Terraform module)

---

## Parallel Example: After Setup

```bash
# Launch US1 and US2 Terraform in parallel:
Task: "T003 [US1] Create PR workflow in .github/workflows/api-ci.yml"
Task: "T004 [P] [US2] Create Terraform OIDC module in terraform/modules/github-actions-oidc/main.tf"
Task: "T005 [P] [US2] Create Terraform variables and outputs"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001, T002)
2. Complete Phase 3: User Story 1 (T003)
3. **STOP and VALIDATE**: Open a test PR to verify test + lint run
4. This alone delivers value — every API PR gets automated quality checks

### Incremental Delivery

1. Setup (T001, T002) → Directory and lint config ready
2. Add User Story 1 (T003) → PRs get test + lint → **MVP!**
3. Add User Story 2 (T004-T006) → Merges trigger CodeBuild
4. Add User Story 3 (T007) → Branch protection enforced
5. Polish (T008-T010) → Validate everything works end-to-end

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently testable after implementation
- Commit after each task or logical group
- US2 end-to-end validation requires CodeBuild project from ticket #46
- All Terraform resources follow existing naming conventions and User → Role → Policy pattern
