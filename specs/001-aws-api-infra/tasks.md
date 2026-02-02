# Tasks: AWS API Infrastructure

**Input**: Design documents from `/specs/001-aws-api-infra/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

```
terraform/
├── environments/dev/    # Environment-specific configuration
├── modules/             # Reusable Terraform modules
└── shared/              # Common configurations
```

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, state backend, and common configurations

- [x] T001 Create Terraform project directory structure per plan.md in terraform/
- [x] T002 Create shared tagging configuration in terraform/shared/tags.tf
- [x] T003 Create S3 bucket for Terraform state backend (manual or bootstrap script)
- [x] T004 Create DynamoDB table for state locking (manual or bootstrap script)
- [x] T005 Create dev environment backend configuration in terraform/environments/dev/backend.tf

**Verification**:
```bash
# Verify directory structure
ls -la terraform/environments/dev/
ls -la terraform/modules/
ls -la terraform/shared/

# Verify state backend exists
aws s3 ls s3://avarobotics-terraform-state
aws dynamodb describe-table --table-name terraform-state-lock
```

---

## Phase 2: Foundational (Networking Module)

**Purpose**: VPC and networking infrastructure - MUST be complete before security, loadbalancing, or logging

**⚠️ CRITICAL**: User stories depend on networking module outputs (vpc_id, subnet_ids)

- [x] T006 Create networking module variables in terraform/modules/networking/variables.tf
- [x] T007 Create networking module outputs in terraform/modules/networking/outputs.tf
- [x] T008 Implement VPC resource in terraform/modules/networking/main.tf
- [x] T009 Implement public subnet resource in terraform/modules/networking/main.tf
- [x] T010 Implement Internet Gateway resource in terraform/modules/networking/main.tf
- [x] T011 Implement route table and routes in terraform/modules/networking/main.tf
- [x] T012 Implement route table association in terraform/modules/networking/main.tf

**Verification**:
```bash
cd terraform/modules/networking
terraform init
terraform validate

# Test module in isolation
terraform plan -var="environment=dev" -var="project_name=avarobotics"
```

**Checkpoint**: Networking module ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Deploy API Service to AWS (Priority: P1) 🎯 MVP

**Goal**: Provision ALB and Target Group so external clients can access the API through the load balancer

**Independent Test**: Deploy infrastructure, get ALB DNS, curl should return 503 (no targets yet)

### Implementation for User Story 1

- [x] T013 [P] [US1] Create loadbalancing module variables in terraform/modules/loadbalancing/variables.tf
- [x] T014 [P] [US1] Create loadbalancing module outputs in terraform/modules/loadbalancing/outputs.tf
- [x] T015 [US1] Implement ALB resource in terraform/modules/loadbalancing/main.tf
- [x] T016 [US1] Implement HTTP listener in terraform/modules/loadbalancing/main.tf
- [x] T017 [US1] Implement Target Group with health check in terraform/modules/loadbalancing/main.tf
- [x] T018 [US1] Create dev environment main.tf with networking + loadbalancing modules in terraform/environments/dev/main.tf
- [x] T019 [US1] Create dev environment variables in terraform/environments/dev/variables.tf
- [x] T020 [US1] Create dev environment outputs in terraform/environments/dev/outputs.tf
- [x] T021 [US1] Create dev environment tfvars in terraform/environments/dev/terraform.tfvars

**Verification**:
```bash
cd terraform/environments/dev
terraform init
terraform validate
terraform plan

# After apply:
terraform apply
ALB_DNS=$(terraform output -raw alb_dns_name)
curl -I http://$ALB_DNS  # Should return 503 (no healthy targets)
```

**Checkpoint**: ALB is publicly accessible, ready for targets

---

## Phase 4: User Story 2 - Secure Network Access (Priority: P1)

**Goal**: Add Security Groups and Network ACLs to control traffic to infrastructure

**Independent Test**: Verify ALB only accepts traffic on ports 80/443, other ports blocked

### Implementation for User Story 2

- [x] T022 [P] [US2] Create security module variables in terraform/modules/security/variables.tf
- [x] T023 [P] [US2] Create security module outputs in terraform/modules/security/outputs.tf
- [x] T024 [US2] Implement ALB Security Group in terraform/modules/security/main.tf
- [x] T025 [US2] Implement App Security Group in terraform/modules/security/main.tf
- [x] T026 [US2] Implement Network ACL with rules in terraform/modules/security/main.tf
- [x] T027 [US2] Update dev main.tf to include security module in terraform/environments/dev/main.tf
- [x] T028 [US2] Update loadbalancing module to use security group from security module

**Verification**:
```bash
cd terraform/environments/dev
terraform plan
terraform apply

# Test security - should succeed on port 80
curl -I http://$ALB_DNS

# Test security - should fail/timeout on other ports (use nc or telnet)
nc -zv $ALB_DNS 22  # Should fail
nc -zv $ALB_DNS 3306  # Should fail
```

**Checkpoint**: Network security controls in place

---

## Phase 5: User Story 3 - Static Asset Storage (Priority: P2)

**Goal**: Provision S3 bucket for storing static assets with versioning and security

**Independent Test**: Upload and download a test file using AWS CLI

### Implementation for User Story 3

- [x] T029 [P] [US3] Create storage module variables in terraform/modules/storage/variables.tf
- [x] T030 [P] [US3] Create storage module outputs in terraform/modules/storage/outputs.tf
- [x] T031 [US3] Implement assets S3 bucket with versioning in terraform/modules/storage/main.tf
- [x] T032 [US3] Implement S3 bucket public access block in terraform/modules/storage/main.tf
- [x] T033 [US3] Implement S3 bucket encryption in terraform/modules/storage/main.tf
- [x] T034 [US3] Implement S3 lifecycle rules in terraform/modules/storage/main.tf
- [x] T035 [US3] Update dev main.tf to include storage module in terraform/environments/dev/main.tf

**Verification**:
```bash
cd terraform/environments/dev
terraform plan
terraform apply

# Get bucket name
BUCKET=$(terraform output -raw assets_bucket_id)

# Test upload
echo "test content" > /tmp/test.txt
aws s3 cp /tmp/test.txt s3://$BUCKET/test.txt

# Test download
aws s3 cp s3://$BUCKET/test.txt /tmp/test-download.txt
cat /tmp/test-download.txt

# Verify public access blocked
curl https://$BUCKET.s3.ap-northeast-1.amazonaws.com/test.txt  # Should fail
```

**Checkpoint**: S3 storage ready for application use

---

## Phase 6: User Story 4 - Centralized Logging (Priority: P2)

**Goal**: Set up CloudWatch Log Groups and ALB access logs for monitoring

**Independent Test**: Verify CloudWatch Log Group exists and ALB logs appear in S3

### Implementation for User Story 4

- [x] T036 [P] [US4] Create logging module variables in terraform/modules/logging/variables.tf
- [x] T037 [P] [US4] Create logging module outputs in terraform/modules/logging/outputs.tf
- [x] T038 [US4] Implement CloudWatch Log Group in terraform/modules/logging/main.tf
- [x] T039 [US4] Implement ALB logs S3 bucket in terraform/modules/storage/main.tf
- [x] T040 [US4] Implement ALB logs bucket policy in terraform/modules/storage/main.tf
- [x] T041 [US4] Update dev main.tf to include logging module in terraform/environments/dev/main.tf
- [x] T042 [US4] Update loadbalancing module to enable ALB access logs in terraform/modules/loadbalancing/main.tf

**Verification**:
```bash
cd terraform/environments/dev
terraform plan
terraform apply

# Verify CloudWatch Log Group
aws logs describe-log-groups --log-group-name-prefix /avarobotics/dev

# Generate some traffic to ALB
curl http://$ALB_DNS

# Wait a few minutes, then check ALB logs bucket
LOGS_BUCKET=$(terraform output -raw alb_logs_bucket_id)
aws s3 ls s3://$LOGS_BUCKET --recursive
```

**Checkpoint**: Logging infrastructure ready

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, validation, and cleanup

- [x] T043 [P] Add README.md to terraform/ with usage instructions
- [x] T044 [P] Add .gitignore for Terraform files (*.tfstate, .terraform/)
- [x] T045 Run terraform fmt -recursive to format all files
- [x] T046 Run terraform validate on all modules
- [x] T047 Run quickstart.md validation - verify all steps work
- [x] T048 Update specs/001-aws-api-infra/README.md with final status

**Verification**:
```bash
# Format check
terraform fmt -check -recursive terraform/

# Validate all modules
for module in terraform/modules/*/; do
  echo "Validating $module"
  cd $module && terraform init && terraform validate && cd -
done

# Full destroy and recreate test
cd terraform/environments/dev
terraform destroy -auto-approve
terraform apply -auto-approve
```

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
     │
     ▼
Phase 2 (Foundational/Networking) ─── BLOCKS ALL USER STORIES
     │
     ├──────────────────────────────────────┐
     ▼                                      ▼
Phase 3 (US1: ALB)              Phase 5 (US3: S3) ──────┐
     │                                                   │
     ▼                                                   ▼
Phase 4 (US2: Security)         Phase 6 (US4: Logging) ─┘
     │                                      │
     └──────────────┬───────────────────────┘
                    ▼
            Phase 7 (Polish)
```

### User Story Dependencies

| Story | Depends On | Can Parallel With |
|-------|------------|-------------------|
| US1 (ALB) | Phase 2 Networking | US3 (S3) |
| US2 (Security) | US1 (modifies ALB config) | - |
| US3 (S3) | Phase 2 Networking | US1 (ALB), US4 partial |
| US4 (Logging) | US3 (needs logs bucket) | US1 after T039 |

### Task-Level Parallel Opportunities

**Within Phase 1**:
- T001-T005 are sequential (directory → config → backend)

**Within Phase 2**:
- T006, T007 can run in parallel (variables, outputs)
- T008-T012 are sequential (VPC → subnet → IGW → routes)

**Within User Stories**:
- Variables (T0XX) and Outputs (T0XX) can run in parallel
- Main.tf implementations are sequential within each module

---

## Parallel Example: User Story 1 + User Story 3

```bash
# After Phase 2 (Networking) completes, these can run in parallel:

# Developer A: User Story 1 (ALB)
Task: T013 "Create loadbalancing module variables"
Task: T014 "Create loadbalancing module outputs"
# Then sequential: T015-T021

# Developer B: User Story 3 (S3)
Task: T029 "Create storage module variables"
Task: T030 "Create storage module outputs"
# Then sequential: T031-T035
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (~30 min)
2. Complete Phase 2: Networking (~45 min)
3. Complete Phase 3: User Story 1 - ALB (~1 hour)
4. **STOP and VALIDATE**: ALB is publicly accessible
5. You now have working infrastructure for API deployment!

### Incremental Delivery

| Increment | Stories Included | Cumulative Value |
|-----------|------------------|------------------|
| MVP | US1 | API can be load-balanced |
| +Security | US1 + US2 | Production-ready security |
| +Storage | US1 + US2 + US3 | Can store assets |
| +Logging | US1 + US2 + US3 + US4 | Full observability |

### PR Strategy (500 line limit)

| PR | Tasks | Est. Lines | Description |
|----|-------|------------|-------------|
| PR1 | T001-T005 | ~50 | Setup and backend |
| PR2 | T006-T012 | ~150 | Networking module |
| PR3 | T013-T021 | ~200 | Loadbalancing + dev env |
| PR4 | T022-T028 | ~150 | Security module |
| PR5 | T029-T035 | ~120 | Storage module |
| PR6 | T036-T042 | ~100 | Logging module |
| PR7 | T043-T048 | ~50 | Polish and docs |

---

## Notes

- All tasks include file paths for clarity
- Each task maps to a specific user story for traceability
- Verification steps provided for each phase checkpoint
- PR sizes estimated to stay under 500 line limit
- No test tasks included (IaC validation via terraform validate/plan)
- Each user story can be independently verified after completion
