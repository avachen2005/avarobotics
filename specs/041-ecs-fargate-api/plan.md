# Implementation Plan: ECS Fargate Deployment for Go API

Create an ECS Fargate service to run the Go API container from ECR, integrated with existing ALB, networking, and security infrastructure.

## Table of Contents

- [Summary](#summary)
- [Technical Context](#technical-context)
- [Constitution Check](#constitution-check)
- [Project Structure](#project-structure)
- [Complexity Tracking](#complexity-tracking)

---

**Branch**: `041-ecs-fargate-api` | **Date**: 2026-02-07 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/041-ecs-fargate-api/spec.md`

## Summary

Create a new Terraform `ecs` module that provisions an ECS Fargate cluster, task definition, and service to run the Go API container from ECR. The service connects to the existing ALB target group, uses existing security groups and subnets, and includes auto-scaling. IAM roles follow the project's User → Role → Policy pattern with least-privilege permissions for ECR pull and CloudWatch logs.

## Technical Context

**Language/Version**: HCL (Terraform >= 1.5.0)
**Primary Dependencies**: AWS Provider ~> 5.0 (ECS, IAM, Application Auto Scaling)
**Storage**: ECR (container images, from codebuild module), CloudWatch Logs (container logs)
**Testing**: Terratest (validate + plan for new module)
**Target Platform**: AWS (ap-northeast-1), ECS Fargate
**Project Type**: Infrastructure (Terraform module)
**Performance Goals**: API responds to `/health` within 30 seconds of service creation; rolling deployments with zero downtime
**Constraints**: Least-privilege IAM; 256 CPU / 512 MB memory for dev; public subnets with public IP for ECR access
**Scale/Scope**: 1 new Terraform module, 1-4 Fargate tasks (auto-scaling), updates to dev environment

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution is not yet configured for this project (template placeholders only). No gates to evaluate.

**Post-design re-check**: N/A — no constitution constraints defined.

## Project Structure

### Documentation (this feature)

```text
specs/041-ecs-fargate-api/
├── plan.md              # This file
├── research.md          # Phase 0 output — technical decisions
├── quickstart.md        # Phase 1 output — deployment guide
├── spec.md              # Feature specification
└── checklists/
    └── requirements.md  # Specification quality checklist
```

### Source Code (repository root)

```text
terraform/
├── modules/
│   └── ecs/                            # NEW MODULE
│       ├── main.tf                    # ECS cluster, task definition, service, auto-scaling
│       ├── variables.tf               # Module inputs
│       ├── outputs.tf                 # Cluster name, service name, task definition ARN
│       └── policies/
│           └── ecs-task-execution.json # ECR pull + CloudWatch Logs permissions
├── environments/
│   └── dev/
│       ├── main.tf                    # Add ecs module call
│       └── outputs.tf                 # Add ECS outputs
└── test/
    ├── fixtures/
    │   └── ecs/                        # NEW FIXTURE
    │       ├── main.tf
    │       ├── variables.tf
    │       └── outputs.tf
    ├── helpers/helpers.go             # Add EcsVars()
    ├── ecs_test.go                    # Plan-only test
    └── validate_test.go               # Update module list to include "ecs"
```

**Structure Decision**: Follows existing `terraform/modules/<name>/` pattern with `main.tf`, `variables.tf`, `outputs.tf`, and `policies/` directory for IAM JSON. The module consumes outputs from `codebuild` (ECR URL), `networking` (VPC, subnets), `security` (app security group), and `loadbalancing` (target group ARN).

### Key Implementation Details

#### ECS Cluster

- Simple Fargate-only cluster, no EC2 capacity providers
- Container Insights enabled for monitoring

#### Task Definition

- Family: `{env}-{project}-api`
- Network mode: `awsvpc` (required for Fargate)
- Requires compatibilities: `FARGATE`
- CPU: 256, Memory: 512 (configurable via variables)
- Container definition: image from ECR, port 8080, awslogs log driver
- Environment variable: `PORT=8080`

#### ECS Service

- Launch type: `FARGATE`
- Desired count: 1 (configurable)
- Network configuration: public subnets, app security group, assign public IP
- Load balancer: existing target group ARN, container port 8080
- Deployment: minimum healthy 100%, maximum 200%
- Health check grace period: 60 seconds

#### IAM Roles

- **Task Execution Role**: trust policy for `ecs-tasks.amazonaws.com`, policy for ECR pull + CloudWatch Logs
- **Task Role**: trust policy for `ecs-tasks.amazonaws.com`, no additional policies (least privilege — add as needed)

#### Auto-Scaling

- Target: ECS service
- Min capacity: 1, Max capacity: 4 (configurable)
- Policy: Target tracking on `ECSServiceAverageCPUUtilization` at 70%
- Scale-in cooldown: 300s, Scale-out cooldown: 60s

## Complexity Tracking

No constitution violations to justify — no constitution constraints are defined.
