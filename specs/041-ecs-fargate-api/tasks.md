# Tasks: ECS Fargate Deployment for Go API

Implement Terraform ECS module (cluster, task definition, service, IAM roles, auto-scaling), dev environment integration, and Terratest coverage.

## Table of Contents

- [Phase 1: Setup](#phase-1-setup-module-skeleton)
- [Phase 2: User Story 2 - IAM Roles](#phase-2-user-story-2---iam-roles-for-ecs-task-execution-priority-p1)
- [Phase 3: User Story 1 - ECS Fargate Service](#phase-3-user-story-1---run-api-container-on-ecs-fargate-priority-p1--mvp)
- [Phase 4: User Story 3 - Rolling Deployment](#phase-4-user-story-3---deploy-updated-container-image-priority-p2)
- [Phase 5: User Story 4 - Auto-Scaling](#phase-5-user-story-4---auto-scaling-based-on-load-priority-p3)
- [Phase 6: Polish](#phase-6-polish--cross-cutting-concerns)
- [Dependencies & Execution Order](#dependencies--execution-order)
- [Implementation Strategy](#implementation-strategy)

---

**Input**: Design documents from `/specs/041-ecs-fargate-api/`
**Prerequisites**: plan.md (required), spec.md (required), research.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story. US2 (IAM) is implemented before US1 because ECS tasks cannot start without execution roles.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Phase 1: Setup (Module Skeleton)

**Purpose**: Create the Terraform ECS module directory structure and input/output definitions

- [x] T001 Create ECS module directory structure: `terraform/modules/ecs/main.tf`, `variables.tf`, `outputs.tf`, `policies/`
- [x] T002 [P] Create ECS module `terraform/modules/ecs/variables.tf` with inputs: environment, project_name, ecr_repository_url, target_group_arn, subnet_ids, security_group_ids, container_port (default 8080), task_cpu (default 256), task_memory (default 512), desired_count (default 1), min_capacity (default 1), max_capacity (default 4), cpu_target_value (default 70), log_group_name, tags
- [x] T003 [P] Create empty `terraform/modules/ecs/outputs.tf` with placeholder outputs for cluster_name, service_name, task_definition_arn, task_execution_role_arn, task_role_arn

---

## Phase 2: User Story 2 - IAM Roles for ECS Task Execution (Priority: P1)

**Goal**: Least-privilege IAM roles for ECS task execution (ECR pull + CloudWatch Logs) and task runtime (empty)

**Independent Test**: `terraform plan` shows task execution role with only ECR pull and CloudWatch Logs permissions, task role with no attached policies

### Implementation for User Story 2

- [x] T004 [P] [US2] Create ECR pull + CloudWatch Logs policy JSON in `terraform/modules/ecs/policies/ecs-task-execution.json` with ecr:GetAuthorizationToken, ecr:BatchGetImage, ecr:GetDownloadUrlForLayer, logs:CreateLogStream, logs:PutLogEvents
- [x] T005 [US2] Add task execution IAM role in `terraform/modules/ecs/main.tf` — trust policy for `ecs-tasks.amazonaws.com`, attach execution policy from JSON file
- [x] T006 [US2] Add task IAM role in `terraform/modules/ecs/main.tf` — trust policy for `ecs-tasks.amazonaws.com`, no additional policies (least privilege)

**Checkpoint**: IAM roles defined with correct trust policies and permissions

---

## Phase 3: User Story 1 - Run API Container on ECS Fargate (Priority: P1) 🎯 MVP

**Goal**: ECS cluster, task definition, and service running the Go API container behind the existing ALB

**Independent Test**: `terraform plan` shows ECS cluster, task definition (256 CPU / 512 MB, awsvpc, port 8080, awslogs), and service (Fargate, public subnets, ALB target group)

### Implementation for User Story 1

- [x] T007 [US1] Add `aws_ecs_cluster` resource in `terraform/modules/ecs/main.tf` with Container Insights enabled
- [x] T008 [US1] Add `aws_ecs_task_definition` resource in `terraform/modules/ecs/main.tf` — family `{env}-{project}-api`, awsvpc network mode, FARGATE compatibility, CPU/memory from variables, container definition with ECR image URL, port 8080, PORT=8080 env var, awslogs log driver pointing to log_group_name
- [x] T009 [US1] Add `aws_ecs_service` resource in `terraform/modules/ecs/main.tf` — Fargate launch type, desired count, network configuration (public subnets, app security group, assign_public_ip=true), load balancer (target group ARN, container port 8080), health_check_grace_period_seconds=60
- [x] T010 [US1] Add ECS outputs in `terraform/modules/ecs/outputs.tf`: cluster_name, cluster_arn, service_name, task_definition_arn, task_execution_role_arn, task_role_arn
- [x] T011 [US1] Add ECS module call in `terraform/environments/dev/main.tf` passing ecr_repository_url from codebuild, target_group_arn from loadbalancing, subnet_ids from networking, security_group_ids from security, log_group_name from logging
- [x] T012 [US1] Add ECS-related outputs in `terraform/environments/dev/outputs.tf`: ecs_cluster_name, ecs_service_name

**Checkpoint**: `terraform plan` shows full ECS stack (cluster + task definition + service) connected to existing ALB, networking, and security

---

## Phase 4: User Story 3 - Deploy Updated Container Image (Priority: P2)

**Goal**: Rolling deployment configuration for zero-downtime updates

**Independent Test**: Verify ECS service resource has deployment_minimum_healthy_percent=100 and deployment_maximum_percent=200

### Implementation for User Story 3

- [x] T013 [US3] Configure rolling deployment on `aws_ecs_service` in `terraform/modules/ecs/main.tf` — deployment_minimum_healthy_percent=100, deployment_maximum_percent=200 (verify these are set in the service resource from T009)

**Checkpoint**: Service deployment config enables zero-downtime rolling updates

---

## Phase 5: User Story 4 - Auto-Scaling Based on Load (Priority: P3)

**Goal**: CPU-based auto-scaling for the ECS service (min 1, max 4 tasks)

**Independent Test**: `terraform plan` shows appautoscaling_target and appautoscaling_policy resources with correct CPU target tracking

### Implementation for User Story 4

- [x] T014 [US4] Add `aws_appautoscaling_target` resource in `terraform/modules/ecs/main.tf` — service namespace "ecs", scalable dimension "ecs:service:DesiredCount", min_capacity and max_capacity from variables
- [x] T015 [US4] Add `aws_appautoscaling_policy` resource in `terraform/modules/ecs/main.tf` — target tracking on ECSServiceAverageCPUUtilization, target_value from variable (default 70), scale_in_cooldown=300, scale_out_cooldown=60

**Checkpoint**: Auto-scaling configured with CPU target tracking policy

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Terratest coverage, validation, and formatting

- [x] T016 [P] Create Terratest fixture in `terraform/test/fixtures/ecs/main.tf`, `variables.tf`, `outputs.tf` wrapping the ECS module with provider block
- [x] T017 [P] Add `EcsVars()` function in `terraform/test/helpers/helpers.go` returning test variables for the ECS module (placeholder IDs for ecr_repository_url, target_group_arn, subnet_ids, security_group_ids, log_group_name)
- [x] T018 Update `terraform/test/validate_test.go` to include "ecs" in the modules list for TestTerraformValidateAllModules
- [x] T019 Create plan-only test in `terraform/test/ecs_test.go` using `terraform.InitAndPlan()` with EcsVars()
- [x] T020 Run `terraform fmt -recursive` on `terraform/modules/ecs/` and `terraform/environments/dev/`
- [x] T021 Run `cd terraform/test && make test-validate` to verify all modules pass validation including ecs
- [x] T022 Mark all tasks complete in this file

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **User Story 2 (Phase 2)**: Depends on Phase 1 (module skeleton must exist for IAM resources)
- **User Story 1 (Phase 3)**: Depends on Phase 2 (ECS service references task execution role)
- **User Story 3 (Phase 4)**: Depends on Phase 3 (rolling deployment is a property of the ECS service)
- **User Story 4 (Phase 5)**: Depends on Phase 3 (auto-scaling targets the ECS service)
- **Polish (Phase 6)**: Depends on Phases 1-5

### User Story Dependencies

- **US2 (IAM Roles)**: Depends only on Phase 1 — implemented first because ECS cannot start without execution role
- **US1 (ECS Fargate)**: Depends on US2 — references task execution role ARN in task definition
- **US3 (Rolling Deploy)**: Part of US1's service resource — verification task
- **US4 (Auto-Scaling)**: Independent of US1 service details — only needs service name and cluster name

### Parallel Opportunities

- T002 + T003 can run in parallel (different files in module skeleton)
- T004 can run in parallel with T005/T006 (policy JSON vs main.tf IAM resources, but T005 references T004's file)
- T016 + T017 can run in parallel (different test files)
- Phase 4 + Phase 5 could theoretically run in parallel (different resource types in main.tf)

---

## Implementation Strategy

### MVP First (Phase 1 + 2 + 3)

1. Complete Phase 1: Setup (module skeleton)
2. Complete Phase 2: US2 (IAM roles — required for ECS to function)
3. Complete Phase 3: US1 (ECS cluster, task definition, service)
4. **STOP and VALIDATE**: `terraform plan` shows all core resources
5. The API is deployable and reachable via ALB

### Incremental Delivery

1. Phase 1 + Phase 2 + Phase 3 → Core ECS deployment (MVP)
2. Add Phase 4 → Rolling deployment config verified
3. Add Phase 5 → Auto-scaling configured
4. Add Phase 6 → Terratest coverage + validation

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- US2 (IAM) is implemented before US1 because the task definition references the execution role ARN
- US3 (Rolling Deploy) is a verification task — the deployment config is set in US1's service resource (T009)
- T013 may be a no-op if T009 already includes deployment percentages — verify and mark complete
- All placeholder IDs in Terratest fixtures use the same pattern as existing modules (e.g., `vpc-00000000000000000`)
