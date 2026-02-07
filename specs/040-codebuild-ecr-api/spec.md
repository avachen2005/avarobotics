# Feature Specification: AWS CodeBuild Docker Build and ECR Push for API

Automated container image build pipeline using AWS CodeBuild to build the Go API Docker image and push it to ECR, triggered by GitHub Actions via OIDC.

## Table of Contents

- [User Scenarios & Testing](#user-scenarios--testing-mandatory)
- [Requirements](#requirements-mandatory)
- [Success Criteria](#success-criteria-mandatory)

---

**Feature Branch**: `040-codebuild-ecr-api`
**Created**: 2026-02-07
**Status**: Draft
**Input**: GitHub Issue #46 — AWS CodeBuild: Docker build and ECR push for API

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Dockerfile for Go API (Priority: P1)

A developer needs a Dockerfile that produces a minimal, production-ready container image for the Go API. The image should use multi-stage builds to keep the final image small and secure, with a statically compiled Go binary running on a minimal base.

**Why this priority**: Without a working Dockerfile, nothing else in this feature can function. This is the foundational artifact.

**Independent Test**: Can be tested locally by running `docker build` in the `api/` directory and verifying the resulting image starts and responds to health checks.

**Acceptance Scenarios**:

1. **Given** the Go API source code in `api/`, **When** a developer runs `docker build -f api/Dockerfile .`, **Then** the build completes successfully and produces a container image
2. **Given** a built container image, **When** the container is started, **Then** it serves the API on the configured port and responds to `/health` with HTTP 200
3. **Given** the Dockerfile uses multi-stage builds, **When** the final image is inspected, **Then** it contains only the compiled binary and no build tools, source code, or intermediate artifacts

---

### User Story 2 - ECR Repository and CodeBuild Project (Priority: P1)

An operations team member needs an ECR repository to store API container images and a CodeBuild project configured to build the Docker image and push it to ECR. All infrastructure is managed via Terraform following existing module conventions.

**Why this priority**: The ECR repository and CodeBuild project are the core infrastructure that enable automated builds. Without them, images have nowhere to be stored and no automated build mechanism exists.

**Independent Test**: Can be tested by running `terraform plan` on the new infrastructure and verifying the CodeBuild project can be triggered manually to build and push an image.

**Acceptance Scenarios**:

1. **Given** the Terraform configuration is applied, **When** the infrastructure is provisioned, **Then** an ECR repository exists for the API container images
2. **Given** the CodeBuild project exists, **When** a build is triggered, **Then** it builds the Docker image from `api/Dockerfile` and pushes it to ECR
3. **Given** a successful build, **When** the image is pushed to ECR, **Then** it is tagged with both the commit SHA and `latest`
4. **Given** a build failure (e.g., compilation error), **When** the build process encounters an error, **Then** no image is pushed to ECR

---

### User Story 3 - IAM Roles for Secure Build Pipeline (Priority: P1)

A security-conscious team needs proper IAM roles following the User → Role → Policy pattern: a CodeBuild service role with ECR push permissions only, and a GitHub Actions OIDC role with CodeBuild trigger permission only. Each role follows least-privilege principles.

**Why this priority**: IAM roles are required for both CodeBuild to push images and GitHub Actions to trigger builds. Without them, the build pipeline cannot operate securely.

**Independent Test**: Can be tested by verifying Terraform plan shows correct IAM resources and trust policies, and by confirming the OIDC trust policy restricts to the correct repository and branch.

**Acceptance Scenarios**:

1. **Given** the Terraform configuration is applied, **When** the CodeBuild service role is created, **Then** it has only the permissions needed to push images to ECR (no additional permissions)
2. **Given** the GitHub Actions OIDC provider is registered, **When** a GitHub Actions workflow assumes the OIDC role, **Then** it can only trigger CodeBuild builds (no other AWS actions)
3. **Given** the OIDC role trust policy, **When** a request comes from a non-main branch or a different repository, **Then** the assume-role request is denied
4. **Given** the IAM structure, **When** all roles and policies are reviewed, **Then** they follow the project's User → Role → Policy convention with least-privilege permissions

---

### User Story 4 - Image Tagging Strategy (Priority: P2)

A deployment engineer needs container images tagged with the commit SHA for traceability and `latest` for convenience. This enables both precise rollback to specific commits and easy access to the most recent build.

**Why this priority**: Tagging is important for traceability but builds on top of the core build infrastructure.

**Independent Test**: Can be tested by triggering a build and verifying the resulting ECR image has both the commit SHA tag and the `latest` tag.

**Acceptance Scenarios**:

1. **Given** a successful CodeBuild run for a specific commit, **When** the image is pushed to ECR, **Then** it is tagged with both the full commit SHA and `latest`
2. **Given** a subsequent successful build for a newer commit, **When** the image is pushed, **Then** the `latest` tag moves to the new image while the previous commit tag remains

---

### Edge Cases

- What happens when the Docker build fails due to a compilation error? No image should be pushed to ECR.
- What happens when the OIDC token is from a fork or non-main branch? The assume-role request should be denied by the trust policy.
- What happens when CodeBuild is triggered but the Dockerfile doesn't exist? The build should fail gracefully with a clear error.
- What happens during concurrent builds from rapid successive commits? Each build should produce correctly tagged images without conflicts.
- What happens when ECR repository doesn't exist yet (first deploy)? Terraform should create it before CodeBuild can be used.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST include a multi-stage Dockerfile in `api/` that produces a minimal container image with only the statically compiled Go binary
- **FR-002**: The system MUST provision an ECR repository via Terraform to store API container images
- **FR-003**: The system MUST provision a CodeBuild project via Terraform with a buildspec that builds the Docker image and pushes it to ECR
- **FR-004**: The system MUST create a CodeBuild service role with only ECR push permissions (GetAuthorizationToken, BatchCheckLayerAvailability, PutImage, InitiateLayerUpload, UploadLayerPart, CompleteLayerUpload)
- **FR-005**: The system MUST register an OIDC provider for `token.actions.githubusercontent.com`
- **FR-006**: The system MUST create a GitHub Actions OIDC role with only `codebuild:StartBuild` permission
- **FR-007**: The OIDC role trust policy MUST restrict access to `repo:avachen2005/avarobotics:ref:refs/heads/main` only
- **FR-008**: Successfully built images MUST be tagged with both the Git commit SHA and `latest`
- **FR-009**: Failed builds MUST NOT push any image to ECR
- **FR-010**: All infrastructure MUST be managed via Terraform following existing naming conventions

### Key Entities

- **ECR Repository**: Container image registry for the Go API, storing tagged images
- **CodeBuild Project**: Managed build service that executes the Docker build and ECR push via a buildspec
- **CodeBuild Service Role**: IAM role assumed by CodeBuild with ECR push-only permissions
- **GitHub OIDC Provider**: Identity provider enabling GitHub Actions to assume AWS roles without long-lived credentials
- **GitHub OIDC Role**: IAM role assumed by GitHub Actions workflows, restricted to triggering CodeBuild builds

### Assumptions

- The Go API in `api/` is buildable with `go build` and requires no external runtime dependencies beyond the binary itself
- The ECR repository will be in the same AWS region as other project infrastructure (`ap-northeast-1`)
- Image lifecycle/cleanup policies are out of scope for this feature (can be added later)
- The GitHub Actions workflow that triggers CodeBuild is part of a separate feature (008-api-ci-cd-pipeline) and is not included in this scope

### Dependencies

- **Depends on**: Issue #44 (API README — for documenting ECR location)
- **Blocks**: 008-api-ci-cd-pipeline US2 (CodeBuild trigger workflow needs this project to exist)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A Docker image can be built from the API source code and started successfully, responding to health checks within 10 seconds of container start
- **SC-002**: The CodeBuild project completes a successful build-and-push cycle within 5 minutes
- **SC-003**: Built images appear in ECR with correct commit SHA and `latest` tags after each successful build
- **SC-004**: The OIDC role can only be assumed from the specified GitHub repository and branch — all other assume-role attempts are denied
- **SC-005**: Each IAM role has only the minimum permissions required for its function — no wildcard actions or resources beyond what is specified
- **SC-006**: All infrastructure resources can be provisioned and destroyed cleanly via Terraform
