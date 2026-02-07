# Research: AWS CodeBuild Docker Build and ECR Push for API

Research findings for resolving technical decisions in the implementation plan.

## Table of Contents

- [Terraform Module Structure](#terraform-module-structure)
- [Dockerfile Strategy](#dockerfile-strategy)
- [CodeBuild Configuration](#codebuild-configuration)
- [IAM and OIDC Pattern](#iam-and-oidc-pattern)
- [ECR Configuration](#ecr-configuration)

---

## Terraform Module Structure

**Decision**: Create a single new Terraform module `codebuild` that provisions ECR repository, CodeBuild project, and associated IAM roles.

**Rationale**: The existing module pattern (`terraform/modules/<name>/`) uses `main.tf`, `variables.tf`, `outputs.tf` with optional `policies/` directory for IAM JSON. Bundling ECR + CodeBuild + IAM into one module keeps the build pipeline cohesive — they are always deployed together and have no independent use.

**Alternatives considered**:
- Separate `ecr` and `codebuild` modules — rejected because ECR has no standalone use case in this project; it exists solely for CodeBuild output
- Adding to existing `iam` module — rejected because CodeBuild IAM roles are specific to the build pipeline, not general infrastructure

## Dockerfile Strategy

**Decision**: Multi-stage Dockerfile with Go builder stage and `scratch` final stage.

**Rationale**: The Go API at `api/cmd/server/main.go` is a simple HTTP server with no CGO dependencies. A statically compiled binary (`CGO_ENABLED=0`) on `scratch` produces the smallest possible image (~10-15MB). The API reads `PORT` env var (default 8080) and has a `/health` endpoint.

**Alternatives considered**:
- `distroless` base — adds ~2MB for debugging tools but unnecessary for a simple Go binary
- `alpine` base — adds shell and package manager (~5MB), useful for debugging but increases attack surface
- `scratch` chosen for minimal size and attack surface

## CodeBuild Configuration

**Decision**: Use `aws/codebuild/amazonlinux-aarch64-standard:3.0` (or x86 equivalent) with privileged mode for Docker-in-Docker, inline buildspec in Terraform.

**Rationale**: CodeBuild needs privileged mode to run Docker builds. Inline buildspec in Terraform keeps the build definition versioned with infrastructure. The buildspec will: log in to ECR, build the Docker image, tag with commit SHA + latest, and push.

**Alternatives considered**:
- Separate `buildspec.yml` file in repo — rejected because it separates build definition from infrastructure; inline keeps it atomic
- Using `CODEBUILD_RESOLVED_SOURCE_VERSION` for commit SHA — this is the standard CodeBuild env var for the source version

## IAM and OIDC Pattern

**Decision**: Two new IAM roles following the project's User → Role → Policy pattern:
1. `CodeBuildServiceRole` — assumed by CodeBuild, with ECR push policy
2. `GitHubActionsOIDCRole` — assumed by GitHub via OIDC, with CodeBuild trigger policy

**Rationale**: The existing IAM module uses JSON policy files in `policies/` directory attached via `aws_iam_role_policy_attachment`. The new module follows the same pattern but is self-contained (not added to the existing IAM module) since these roles are specific to the build pipeline.

**OIDC Provider**: Register `token.actions.githubusercontent.com` with thumbprint. Trust policy restricts to `repo:avachen2005/avarobotics:ref:refs/heads/main`.

**Alternatives considered**:
- Adding roles to existing `iam` module — rejected because it would bloat the general-purpose IAM module with build-specific concerns
- Using long-lived AWS credentials in GitHub secrets — rejected because OIDC is the recommended pattern (no secret rotation needed)

## ECR Configuration

**Decision**: Single ECR repository with image tag immutability disabled (to allow `latest` tag updates).

**Rationale**: The spec requires both commit SHA tags (immutable by nature) and a `latest` tag that moves with each build. Tag immutability must be disabled to support the `latest` tag pattern.

**Alternatives considered**:
- Tag immutability enabled — rejected because it prevents updating the `latest` tag
- Lifecycle policy for image cleanup — deferred (noted as out of scope in spec assumptions)
