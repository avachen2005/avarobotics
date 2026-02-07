# Research: ECS Fargate Deployment for Go API

Research findings for resolving technical decisions in the implementation plan.

## Table of Contents

- [Module Structure](#module-structure)
- [Fargate Networking](#fargate-networking)
- [Task Definition Configuration](#task-definition-configuration)
- [IAM Pattern](#iam-pattern)
- [Auto-Scaling Strategy](#auto-scaling-strategy)
- [Integration with Existing Modules](#integration-with-existing-modules)

---

## Module Structure

**Decision**: Create a new `ecs` module separate from the existing `codebuild` module.

**Rationale**: ECS (compute) and CodeBuild (build pipeline) serve different purposes and have different lifecycles. The ECS module consumes ECR URL as an input but is independently deployable. Following the existing pattern where each module owns one concern.

**Alternatives considered**:
- Adding ECS resources to the `codebuild` module — rejected because build and run are separate concerns; you might want to rebuild without redeploying, or redeploy without rebuilding
- Creating a monolithic `api-infra` module — rejected because it would violate the project's module-per-concern pattern

## Fargate Networking

**Decision**: Run Fargate tasks in public subnets with `assign_public_ip = true`.

**Rationale**: The existing VPC only has public subnets (no private subnets or NAT gateway). Fargate tasks need internet access to pull images from ECR. Public IP assignment is the simplest path given the current networking setup. The app security group already restricts inbound to ALB-only traffic on port 8080, so public IP does not expose the container directly.

**Alternatives considered**:
- VPC endpoints for ECR — adds cost and complexity (3 endpoints needed: ecr.api, ecr.dkr, s3), not justified for dev
- Private subnets + NAT gateway — requires networking module changes, adds cost (~$32/month for NAT), out of scope
- Public subnets with public IP (chosen) — works with existing infrastructure, no additional cost

## Task Definition Configuration

**Decision**: 256 CPU units / 512 MB memory for dev environment, configurable via variables.

**Rationale**: The Go API is a simple HTTP server (~6.5 MB binary, minimal memory footprint). 256 CPU / 512 MB is the smallest Fargate configuration and costs ~$9.50/month for 1 task running 24/7. The values are configurable so production can use larger sizes.

**Alternatives considered**:
- 512 CPU / 1024 MB — overkill for a health-check API, doubles cost
- 256 CPU / 256 MB — not a valid Fargate combination (minimum memory for 256 CPU is 512 MB)

## IAM Pattern

**Decision**: Two IAM roles following the project's User → Role → Policy pattern:
1. **Task Execution Role** — assumed by ECS agent, permissions for ECR pull + CloudWatch Logs
2. **Task Role** — assumed by the running container, empty for now (least privilege)

**Rationale**: ECS requires two separate roles. The execution role is used by the ECS agent to set up the task (pull image, create log streams). The task role is used by the application code. Since the Go API currently makes no AWS API calls, the task role has no attached policies.

**Alternatives considered**:
- Using the AWS managed `AmazonECSTaskExecutionRolePolicy` — rejected because it includes SSM and Secrets Manager permissions we don't need
- Custom JSON policy file (chosen) — follows the existing `policies/` directory pattern and grants only needed permissions

## Auto-Scaling Strategy

**Decision**: Target tracking on CPU utilization at 70%, min 1 / max 4 tasks.

**Rationale**: CPU-based scaling is the simplest and most common pattern for API workloads. 70% target gives headroom for burst traffic. Min 1 ensures the API is always available. Max 4 limits cost for dev environment. All values are configurable.

**Alternatives considered**:
- Request count-based scaling (ALBRequestCountPerTarget) — more precise but requires tuning the target value
- Memory-based scaling — Go has low, predictable memory usage; CPU is the better signal
- No auto-scaling — rejected because the spec requires it (FR-009, US4)

## Integration with Existing Modules

**Decision**: The ECS module takes outputs from 4 existing modules as inputs.

| Input | Source Module | Source Output |
|-------|--------------|---------------|
| `ecr_repository_url` | codebuild | `ecr_repository_url` |
| `target_group_arn` | loadbalancing | `target_group_arn` |
| `subnet_ids` | networking | `public_subnet_ids` |
| `security_group_ids` | security | `app_security_group_id` |

**Rationale**: This follows the existing composition pattern in `terraform/environments/dev/main.tf` where modules pass outputs to dependent modules (e.g., security gets `vpc_id` from networking). The ECS module doesn't need to know about the underlying VPC or ALB details — it just needs the IDs.
