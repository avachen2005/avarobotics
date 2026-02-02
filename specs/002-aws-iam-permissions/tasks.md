# Tasks: AWS IAM Permissions

**Input**: Design documents from `/specs/002-aws-iam-permissions/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Terraform modules**: `terraform/modules/iam/`
- **Environment configuration**: `terraform/environments/dev/`
- **Policy documents**: `terraform/modules/iam/policies/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create IAM module directory structure

- [x] T001 Create IAM module directory structure at `terraform/modules/iam/`
- [x] T002 [P] Create `terraform/modules/iam/policies/` directory for policy JSON files
- [x] T003 [P] Create base `terraform/modules/iam/variables.tf` with input variables per contracts/iam-role.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core module configuration that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create `terraform/modules/iam/main.tf` with AWS provider configuration
- [x] T005 [P] Create `terraform/modules/iam/outputs.tf` with output definitions per contracts/iam-role.md

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Assume Role for Terraform Deployment (Priority: P1) 🎯 MVP

**Goal**: DevOps 工程師可以透過 `avarobotics_local` assume `TerraformDeployRole`

**Independent Test**: 執行 `aws sts assume-role` 命令成功取得臨時憑證

### Implementation for User Story 1

- [x] T006 [US1] Create Trust Policy allowing `avarobotics_local` to assume role in `terraform/modules/iam/main.tf`
- [x] T007 [US1] Create `aws_iam_role.terraform_deploy` resource with 4-hour session duration in `terraform/modules/iam/main.tf`
- [x] T008 [US1] Add Name and Project tags to IAM Role resource

**Checkpoint**: At this point, User Story 1 should be fully functional - role can be assumed

---

## Phase 4: User Story 2 - Terraform State Backend Access (Priority: P1)

**Goal**: Assume 的 Role 具有 S3 和 DynamoDB state backend 權限

**Independent Test**: 執行 `terraform init` 成功連接到 S3 backend

### Implementation for User Story 2

- [x] T009 [US2] Create State Backend Policy JSON at `terraform/modules/iam/policies/state-backend.json` per contracts/state-backend-policy.md
- [x] T010 [US2] Create `aws_iam_policy.state_backend` resource in `terraform/modules/iam/main.tf`
- [x] T011 [US2] Attach State Backend Policy to TerraformDeployRole using `aws_iam_role_policy_attachment`

**Checkpoint**: At this point, role can access Terraform state backend (S3 + DynamoDB)

---

## Phase 5: User Story 3 - Infrastructure Deployment Permissions (Priority: P1)

**Goal**: Assume 的 Role 具有 VPC, ALB, S3, CloudWatch 等基礎設施部署權限

**Independent Test**: 執行 `terraform apply` 在 001-aws-api-infra 成功建立資源

### Implementation for User Story 3

- [x] T012 [US3] Create Infrastructure Policy JSON at `terraform/modules/iam/policies/infrastructure.json` per contracts/infrastructure-policy.md
- [x] T013 [US3] Create `aws_iam_policy.infrastructure` resource in `terraform/modules/iam/main.tf`
- [x] T014 [US3] Attach Infrastructure Policy to TerraformDeployRole using `aws_iam_role_policy_attachment`

**Checkpoint**: At this point, role has all permissions needed for infrastructure deployment

---

## Phase 6: User Story 4 - Policy Separation by Function (Priority: P2)

**Goal**: 權限按功能職責分離，方便管理和審計

**Independent Test**: 透過 IAM Console 確認 Policy 分離正確

### Implementation for User Story 4

- [x] T015 [US4] Verify policy separation in `terraform/modules/iam/main.tf` - State Backend Policy only contains S3/DynamoDB permissions
- [x] T016 [US4] Verify policy separation in `terraform/modules/iam/main.tf` - Infrastructure Policy only contains VPC/ALB/S3/CloudWatch/IAM permissions
- [x] T017 [US4] Add descriptive descriptions to both Policy resources for audit clarity

**Checkpoint**: Policy separation verified and documented

---

## Phase 7: Integration with Environment

**Purpose**: Integrate IAM module with dev environment

- [x] T018 Add IAM module reference to `terraform/environments/dev/main.tf`
- [x] T019 Configure `allowed_users` variable with `avarobotics_local` ARN
- [x] T020 [P] Add IAM module outputs to environment outputs in `terraform/environments/dev/outputs.tf`

**Checkpoint**: IAM module integrated with dev environment

---

## Phase 8: Polish & Validation

**Purpose**: Validation and documentation

- [x] T021 Run `terraform validate` on IAM module
- [x] T022 Run `terraform plan` to preview IAM resource creation
- [x] T023 Run `terraform apply -target=module.iam` to deploy IAM resources
- [x] T024 [P] Test assume role: `aws sts assume-role --role-arn <ROLE_ARN> --role-session-name test`
- [x] T025 [P] Update quickstart.md with actual Role ARN after deployment
- [x] T026 Verify all success criteria from spec.md are met

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - US1 (Role creation) must complete before US2-US4
  - US2 and US3 can proceed in parallel after US1
  - US4 depends on US2 and US3 being complete
- **Integration (Phase 7)**: Depends on US1-US3 completion
- **Polish (Phase 8)**: Depends on Integration completion

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Depends on US1 (Role must exist to attach policy)
- **User Story 3 (P1)**: Depends on US1 (Role must exist to attach policy)
- **User Story 4 (P2)**: Depends on US2 and US3 (Policies must exist to verify separation)

### Within Each User Story

- Policy JSON file before Policy resource
- Policy resource before Policy attachment
- Core implementation before verification

### Parallel Opportunities

- T002 and T003 can run in parallel (different files)
- T005 can run in parallel with T004 (different files)
- T009-T011 (US2) and T012-T014 (US3) can run in parallel after US1 completes
- T024 and T025 can run in parallel (independent validation tasks)

---

## Implementation Strategy

### MVP First (User Stories 1-3)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (Role creation)
4. **VALIDATE**: Test assume role works
5. Complete Phase 4: User Story 2 (State Backend Policy)
6. Complete Phase 5: User Story 3 (Infrastructure Policy)
7. **VALIDATE**: Test terraform init and plan
8. Complete Phase 7: Integration
9. Complete Phase 8: Polish & Deploy

### Validation Commands

```bash
# After Phase 3 (US1) - Test role assumption
aws sts assume-role \
  --role-arn "arn:aws:iam::ACCOUNT_ID:role/TerraformDeployRole" \
  --role-session-name "test-session"

# After Phase 7 - Test terraform with assumed role
AWS_PROFILE=terraform-deploy terraform init
AWS_PROFILE=terraform-deploy terraform plan

# After Phase 8 - Full validation
AWS_PROFILE=terraform-deploy terraform apply
```

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- All policies follow contracts/ specifications
- Use terraform -target for incremental deployment
- Verify IAM changes carefully before applying
- Total tasks: 26
