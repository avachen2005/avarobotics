# Feature Specification: ECS Fargate Deployment for Go API

Deploy the Go API container to AWS using ECS Fargate, connecting it to the existing ALB and networking infrastructure for serverless container hosting.

## Table of Contents

- [User Scenarios & Testing](#user-scenarios--testing-mandatory)
- [Requirements](#requirements-mandatory)
- [Success Criteria](#success-criteria-mandatory)

---

**Feature Branch**: `041-ecs-fargate-api`
**Created**: 2026-02-07
**Status**: Draft
**Input**: User description: "ECS Fargate — serverless deployment for Go API"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Run API Container on ECS Fargate (Priority: P1)

As a developer, I want the Go API container image from ECR to run on ECS Fargate so that the API is accessible via the existing ALB without managing any servers.

**Why this priority**: This is the core functionality — without a running container, nothing else works. The API must be reachable from the internet through the ALB.

**Independent Test**: Deploy the ECS service, then `curl http://<ALB-DNS>/health` and verify HTTP 200 response.

**Acceptance Scenarios**:

1. **Given** a Docker image exists in ECR, **When** the ECS service is deployed via Terraform, **Then** the API container runs on Fargate and responds to health checks from the ALB target group
2. **Given** the ECS service is running, **When** a user sends a request to the ALB DNS name, **Then** the request is routed to the Fargate task and a response is returned
3. **Given** the ECS task is running, **When** the container crashes, **Then** ECS automatically replaces the task with a new healthy instance

---

### User Story 2 - IAM Roles for ECS Task Execution (Priority: P1)

As a platform engineer, I want least-privilege IAM roles for the ECS task so that the container can pull images from ECR and write logs to CloudWatch without excessive permissions.

**Why this priority**: Without proper IAM roles, the ECS task cannot start (cannot pull images or write logs). This is a prerequisite for US1 to work.

**Independent Test**: Verify via `terraform plan` that the task execution role has only ECR pull and CloudWatch Logs permissions, and the task role has no unnecessary permissions.

**Acceptance Scenarios**:

1. **Given** the ECS task execution role is configured, **When** ECS launches a task, **Then** it can pull the container image from ECR successfully
2. **Given** the ECS task execution role is configured, **When** the container writes logs, **Then** logs appear in CloudWatch under the designated log group
3. **Given** the task role is configured, **When** the container runs, **Then** it has only the permissions explicitly granted (least privilege)

---

### User Story 3 - Deploy Updated Container Image (Priority: P2)

As a developer, I want to deploy a new version of the API by updating the ECS service with a new container image tag so that I can release changes without downtime.

**Why this priority**: After the initial deployment works (US1), the team needs a way to push updates. Rolling updates ensure zero-downtime deployments.

**Independent Test**: Push a new image to ECR, update the ECS service, and verify the new version is serving traffic while the old version is gracefully drained.

**Acceptance Scenarios**:

1. **Given** a new container image is pushed to ECR, **When** the ECS service is updated (via Terraform or `aws ecs update-service`), **Then** ECS performs a rolling deployment replacing old tasks with new ones
2. **Given** a rolling deployment is in progress, **When** the new task passes health checks, **Then** the old task is drained and stopped
3. **Given** a new task fails health checks during deployment, **Then** ECS stops the rollout and the old tasks continue serving traffic

---

### User Story 4 - Auto-Scaling Based on Load (Priority: P3)

As a platform engineer, I want the ECS service to automatically scale the number of running tasks based on CPU utilization so that the API handles traffic spikes without manual intervention.

**Why this priority**: Scaling is important for production readiness but not required for initial deployment. The API should work first (US1), then scale.

**Independent Test**: Generate load against the ALB endpoint and verify that ECS scales up tasks when CPU exceeds the threshold, and scales back down when load decreases.

**Acceptance Scenarios**:

1. **Given** the auto-scaling policy is configured, **When** average CPU utilization exceeds the target threshold, **Then** ECS adds additional tasks (up to the maximum)
2. **Given** additional tasks are running, **When** CPU utilization drops below the threshold, **Then** ECS gradually removes tasks (down to the minimum)
3. **Given** the service is at minimum capacity, **When** load is normal, **Then** the minimum number of tasks continues running

---

### Edge Cases

- What happens when the ECR image is missing or corrupted? ECS should fail the task and retry, surfacing errors in CloudWatch logs.
- What happens when all Fargate tasks fail health checks? The ALB returns 503 to clients. ECS continues attempting to launch healthy tasks.
- What happens when the container exceeds its memory limit? ECS kills the task (OOM) and launches a replacement.
- What happens during a Terraform apply that changes the task definition? ECS performs a rolling deployment, maintaining availability.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provision an ECS cluster for hosting Fargate tasks
- **FR-002**: System MUST define an ECS task definition specifying the container image (from ECR), CPU allocation, memory allocation, port mappings, and log configuration
- **FR-003**: System MUST provision an ECS service that runs the desired number of tasks and registers them with the existing ALB target group
- **FR-004**: System MUST create a task execution IAM role with permissions to pull images from ECR (ecr:GetAuthorizationToken, ecr:BatchGetImage, ecr:GetDownloadUrlForLayer) and write logs to CloudWatch (logs:CreateLogStream, logs:PutLogEvents)
- **FR-005**: System MUST create a task IAM role following least-privilege principles (no permissions unless explicitly needed by the application)
- **FR-006**: System MUST configure the ECS service to use the existing application security group for network access control
- **FR-007**: System MUST run Fargate tasks in the existing VPC public subnets with a public IP assigned (for pulling images from ECR)
- **FR-008**: System MUST configure rolling deployment with minimum healthy percent of 100% and maximum percent of 200% for zero-downtime updates
- **FR-009**: System MUST configure auto-scaling with a minimum of 1 task, maximum of 4 tasks, and CPU-based target tracking policy
- **FR-010**: System MUST route container logs to CloudWatch Logs using the awslogs log driver

### Key Entities

- **ECS Cluster**: Logical grouping for Fargate tasks
- **Task Definition**: Blueprint for the container — image URL, CPU, memory, ports, environment variables, log configuration
- **ECS Service**: Manages desired task count, rolling deployments, ALB integration, and auto-scaling
- **Task Execution Role**: IAM role assumed by ECS agent to pull images and write logs
- **Task Role**: IAM role assumed by the running container for application-level AWS access
- **Auto-Scaling Target & Policy**: Configures dynamic scaling of the ECS service based on CloudWatch metrics

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: API is reachable via ALB DNS at `/health` and returns HTTP 200 within 30 seconds of ECS service creation
- **SC-002**: Container logs appear in CloudWatch within 1 minute of task startup
- **SC-003**: When a task is killed, ECS replaces it and the API resumes responding within 2 minutes
- **SC-004**: Rolling deployment completes with zero failed requests to the `/health` endpoint
- **SC-005**: Under sustained CPU load exceeding the target threshold, ECS scales from 1 to 2+ tasks within 5 minutes
- **SC-006**: Terraform plan shows all ECS resources (cluster, task definition, service, IAM roles, auto-scaling) without errors

## Assumptions

- The existing ALB target group (target_type = "ip") is compatible with Fargate tasks — verified in loadbalancing module
- The existing app security group allows inbound from ALB on port 8080 and outbound HTTPS — verified in security module
- Public subnets with internet gateway are available for Fargate tasks to pull ECR images — verified in networking module
- The Go API container requires minimal resources (256 CPU units / 512 MB memory) for dev environment
- No secrets or environment variables beyond PORT are needed for the API at this stage
- The `latest` tag from ECR is used for initial deployment; commit SHA tags are used for production deployments
