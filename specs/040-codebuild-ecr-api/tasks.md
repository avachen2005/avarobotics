# Tasks: AWS CodeBuild Docker Build and ECR Push for API

Implement Dockerfile, Terraform codebuild module (ECR + CodeBuild + IAM/OIDC), dev environment integration, and Terratest coverage.

## Table of Contents

- [Phase 1: Setup](#phase-1-setup-shared-infrastructure)
- [Phase 2: User Story 1 - Dockerfile](#phase-2-user-story-1---dockerfile-for-go-api-priority-p1--mvp)
- [Phase 3: User Story 2 - ECR and CodeBuild](#phase-3-user-story-2---ecr-repository-and-codebuild-project-priority-p1)
- [Phase 4: User Story 3 - IAM Roles](#phase-4-user-story-3---iam-roles-for-secure-build-pipeline-priority-p1)
- [Phase 5: User Story 4 - Image Tagging](#phase-5-user-story-4---image-tagging-strategy-priority-p2)
- [Phase 6: Polish](#phase-6-polish--cross-cutting-concerns)
- [Dependencies & Execution Order](#dependencies--execution-order)
- [Implementation Strategy](#implementation-strategy)

---

**Input**: Design documents from `/specs/040-codebuild-ecr-api/`
**Prerequisites**: plan.md (required), spec.md (required), research.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the Terraform module skeleton and directory structure

- [x] T001 Create codebuild module directory structure: `terraform/modules/codebuild/main.tf`, `variables.tf`, `outputs.tf`, `policies/`
- [x] T002 [P] Create codebuild module `terraform/modules/codebuild/variables.tf` with inputs: environment, project_name, github_repo, ecr_repo_name, codebuild_compute_type, tags
- [x] T003 [P] Create empty `terraform/modules/codebuild/outputs.tf` with placeholder outputs for ecr_repository_url, codebuild_project_name, codebuild_service_role_arn, github_oidc_role_arn

---

## Phase 2: User Story 1 - Dockerfile for Go API (Priority: P1) 🎯 MVP

**Goal**: A multi-stage Dockerfile that produces a minimal scratch-based container image for the Go API

**Independent Test**: Run `docker build -f api/Dockerfile .` and verify `docker run -p 8080:8080 <image>` responds to `curl localhost:8080/health` with HTTP 200

### Implementation for User Story 1

- [x] T004 [US1] Create multi-stage Dockerfile in `api/Dockerfile` — Stage 1: `golang:1.22-alpine` builder with `CGO_ENABLED=0 go build -o /api ./cmd/server`; Stage 2: `scratch` base, copy binary, EXPOSE 8080, ENTRYPOINT ["/api"]
- [x] T005 [US1] Add `.dockerignore` in `api/.dockerignore` to exclude `.git`, `*_test.go`, `README.md`, and other non-build files
- [x] T006 [US1] Verify Docker build locally: `docker build -f api/Dockerfile .` succeeds and `docker run -p 8080:8080 <image>` responds to `/health`

**Checkpoint**: Dockerfile builds and produces a working container image

---

## Phase 3: User Story 2 - ECR Repository and CodeBuild Project (Priority: P1)

**Goal**: Terraform-managed ECR repository and CodeBuild project with inline buildspec

**Independent Test**: Run `terraform plan` on the codebuild module fixture and verify ECR + CodeBuild resources are planned

### Implementation for User Story 2

- [x] T007 [US2] Add `aws_ecr_repository` resource in `terraform/modules/codebuild/main.tf` with tag mutability enabled and encryption
- [x] T008 [US2] Add `aws_codebuild_project` resource in `terraform/modules/codebuild/main.tf` with privileged Docker environment, inline buildspec (ECR login, docker build, tag commit SHA + latest, push), and environment variables for ECR_REPO_URL
- [x] T009 [US2] Add ECR and CodeBuild outputs in `terraform/modules/codebuild/outputs.tf`: ecr_repository_url, ecr_repository_arn, codebuild_project_name, codebuild_project_arn
- [x] T010 [US2] Add codebuild module call in `terraform/environments/dev/main.tf` following existing module composition pattern
- [x] T011 [US2] Add codebuild-related outputs in `terraform/environments/dev/outputs.tf`

**Checkpoint**: `terraform plan` shows ECR repository and CodeBuild project to be created

---

## Phase 4: User Story 3 - IAM Roles for Secure Build Pipeline (Priority: P1)

**Goal**: Least-privilege IAM roles for CodeBuild service and GitHub Actions OIDC

**Independent Test**: `terraform plan` shows correct IAM roles, policies, and trust policies; OIDC trust restricts to `repo:avachen2005/avarobotics:ref:refs/heads/main`

### Implementation for User Story 3

- [x] T012 [P] [US3] Create ECR push policy JSON in `terraform/modules/codebuild/policies/codebuild-ecr-push.json` with GetAuthorizationToken, BatchCheckLayerAvailability, PutImage, InitiateLayerUpload, UploadLayerPart, CompleteLayerUpload
- [x] T013 [P] [US3] Create CodeBuild trigger policy JSON in `terraform/modules/codebuild/policies/codebuild-trigger.json` with codebuild:StartBuild only
- [x] T014 [US3] Add CodeBuild service IAM role in `terraform/modules/codebuild/main.tf` — trust policy for `codebuild.amazonaws.com`, attach ECR push policy
- [x] T015 [US3] Add CloudWatch Logs policy for CodeBuild service role in `terraform/modules/codebuild/main.tf` — CreateLogGroup, CreateLogStream, PutLogEvents for build logs
- [x] T016 [US3] Add GitHub Actions OIDC provider (`aws_iam_openid_connect_provider`) in `terraform/modules/codebuild/main.tf` for `token.actions.githubusercontent.com`
- [x] T017 [US3] Add GitHub Actions OIDC role in `terraform/modules/codebuild/main.tf` — trust policy restricted to `repo:avachen2005/avarobotics:ref:refs/heads/main`, attach CodeBuild trigger policy
- [x] T018 [US3] Add IAM role ARN outputs in `terraform/modules/codebuild/outputs.tf`: codebuild_service_role_arn, github_oidc_role_arn, oidc_provider_arn

**Checkpoint**: `terraform plan` shows all IAM resources with correct trust policies and least-privilege permissions

---

## Phase 5: User Story 4 - Image Tagging Strategy (Priority: P2)

**Goal**: Container images tagged with commit SHA for traceability and `latest` for convenience

**Independent Test**: Verify the buildspec in `terraform/modules/codebuild/main.tf` contains both `$CODEBUILD_RESOLVED_SOURCE_VERSION` tag and `latest` tag in the post_build phase

### Implementation for User Story 4

- [x] T019 [US4] Verify inline buildspec in `terraform/modules/codebuild/main.tf` tags images with both `$CODEBUILD_RESOLVED_SOURCE_VERSION` (commit SHA) and `latest`, and only pushes in post_build phase (ensuring failed builds don't push)

**Checkpoint**: Buildspec correctly implements dual-tagging and fail-safe push strategy

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Terratest coverage, validation, and documentation

- [x] T020 [P] Create Terratest fixture in `terraform/test/fixtures/codebuild/main.tf`, `variables.tf`, `outputs.tf` wrapping the codebuild module with provider block
- [x] T021 [P] Add `CodebuildVars()` function in `terraform/test/helpers/helpers.go` returning test variables for the codebuild module
- [x] T022 Update `terraform/test/validate_test.go` to include "codebuild" in the modules list for TestTerraformValidateAllModules
- [x] T023 Create plan-only test in `terraform/test/codebuild_test.go` using `terraform.InitAndPlan()` with CodebuildVars()
- [x] T024 Run `terraform fmt -recursive` on `terraform/modules/codebuild/` and `terraform/environments/dev/`
- [x] T025 Run `cd terraform/test && make test-validate` to verify all modules pass validation including codebuild
- [x] T026 Mark all tasks complete in this file

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **User Story 1 (Phase 2)**: No dependencies — can start in parallel with Phase 1
- **User Story 2 (Phase 3)**: Depends on Phase 1 (module skeleton)
- **User Story 3 (Phase 4)**: Depends on Phase 3 (CodeBuild project must exist for IAM role references)
- **User Story 4 (Phase 5)**: Depends on Phase 3 (buildspec is part of CodeBuild resource)
- **Polish (Phase 6)**: Depends on Phases 1-5

### User Story Dependencies

- **US1 (Dockerfile)**: Independent — no Terraform dependencies
- **US2 (ECR + CodeBuild)**: Depends on Phase 1 module skeleton
- **US3 (IAM/OIDC)**: Depends on US2 (references CodeBuild project ARN in policies)
- **US4 (Tagging)**: Integrated into US2 buildspec — verify only

### Parallel Opportunities

- T002 + T003 can run in parallel (different files in module skeleton)
- T004 + T005 can run in parallel (Dockerfile + dockerignore)
- T012 + T013 can run in parallel (different JSON policy files)
- T020 + T021 can run in parallel (different test files)
- US1 (Dockerfile) can run in parallel with Phase 1 (Setup)

---

## Parallel Example: User Story 3

```bash
# Launch policy JSON files together:
Task: "Create ECR push policy in terraform/modules/codebuild/policies/codebuild-ecr-push.json"
Task: "Create CodeBuild trigger policy in terraform/modules/codebuild/policies/codebuild-trigger.json"

# Then sequentially:
Task: "Add CodeBuild service IAM role in main.tf"
Task: "Add GitHub OIDC provider and role in main.tf"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (module skeleton)
2. Complete Phase 2: User Story 1 (Dockerfile)
3. **STOP and VALIDATE**: `docker build` + `docker run` + `curl /health`
4. Dockerfile is usable independently for local development

### Incremental Delivery

1. Phase 1 + Phase 2 → Dockerfile works locally (MVP)
2. Add Phase 3 → ECR + CodeBuild provisioned via Terraform
3. Add Phase 4 → IAM roles secure the pipeline
4. Add Phase 5 → Verify tagging strategy
5. Add Phase 6 → Terratest coverage + validation

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- US4 (Image Tagging) is a verification task since tagging is implemented as part of US2's buildspec
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
