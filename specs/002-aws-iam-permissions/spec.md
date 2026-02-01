# Feature Specification: AWS IAM Permissions

**Feature Branch**: `002-aws-iam-permissions`
**Created**: 2026-02-01
**Status**: Draft
**Input**: User description: "建立 AWS IAM 權限管理，遵循 User → Role → Policy 架構。包含：1) Terraform State Backend 權限 (S3 + DynamoDB)，2) Infrastructure 部署權限 (VPC, ALB, S3, CloudWatch 等)，3) 讓現有 IAM User (avarobotics_local) 可以 assume 這些 Role。目標是讓 001-aws-api-infra 可以順利執行 terraform apply。"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Assume Role for Terraform Deployment (Priority: P1) 🎯 MVP

DevOps 工程師需要透過現有的 IAM User (`avarobotics_local`) assume 一個具有適當權限的 Role，才能執行 Terraform 部署。這是最基本的需求，沒有這個功能就無法進行任何基礎設施部署。

**Why this priority**: 這是所有其他功能的前提。沒有 assume role 的能力，所有 Terraform 操作都無法執行。

**Independent Test**: 可以透過執行 `aws sts assume-role` 命令來獨立測試，成功取得臨時憑證即表示功能正常。

**Acceptance Scenarios**:

1. **Given** IAM User `avarobotics_local` 已存在，**When** 執行 assume role 命令，**Then** 成功取得臨時憑證（Access Key, Secret Key, Session Token）
2. **Given** 使用臨時憑證，**When** 執行 AWS API 操作，**Then** 操作根據 Role 的權限被允許或拒絕

---

### User Story 2 - Terraform State Backend Access (Priority: P1)

DevOps 工程師需要有權限存取 Terraform State Backend（S3 bucket 和 DynamoDB table），才能初始化和管理 Terraform state。

**Why this priority**: 與 US1 同等重要，是執行任何 Terraform 操作的前提。

**Independent Test**: 可以透過執行 `terraform init` 來測試，成功連接到 S3 backend 即表示權限正確。

**Acceptance Scenarios**:

1. **Given** 已 assume 正確的 Role，**When** 執行 `terraform init`，**Then** 成功連接到 S3 state backend
2. **Given** 已 assume 正確的 Role，**When** 執行 `terraform apply`，**Then** state 可以被讀取和寫入
3. **Given** 已 assume 正確的 Role，**When** 多人同時操作，**Then** DynamoDB lock 機制正常運作

---

### User Story 3 - Infrastructure Deployment Permissions (Priority: P1)

DevOps 工程師需要有權限建立和管理 AWS 基礎設施資源（VPC, Subnets, ALB, S3, CloudWatch 等），才能部署 001-aws-api-infra 定義的資源。

**Why this priority**: 這是執行 `terraform apply` 的核心需求。

**Independent Test**: 可以透過執行 `terraform apply` 在 001-aws-api-infra 專案來測試，成功建立所有資源即表示權限正確。

**Acceptance Scenarios**:

1. **Given** 已 assume 正確的 Role，**When** 執行 `terraform apply` 建立 VPC，**Then** VPC 成功建立
2. **Given** 已 assume 正確的 Role，**When** 執行 `terraform apply` 建立 ALB，**Then** ALB 成功建立
3. **Given** 已 assume 正確的 Role，**When** 執行 `terraform apply` 建立 S3 bucket，**Then** S3 bucket 成功建立
4. **Given** 已 assume 正確的 Role，**When** 執行 `terraform destroy`，**Then** 所有資源成功刪除

---

### User Story 4 - Policy Separation by Function (Priority: P2)

權限需要按照功能職責分離成不同的 Policy，方便管理和審計。每個 Policy 負責一個特定的功能領域。

**Why this priority**: 這是最佳實踐，但不影響基本功能。可以在 MVP 之後優化。

**Independent Test**: 可以透過檢視 IAM Console 確認 Policy 分離是否正確，以及透過 IAM Policy Simulator 測試權限範圍。

**Acceptance Scenarios**:

1. **Given** State Backend Policy 存在，**When** 檢視其權限，**Then** 只包含 S3 和 DynamoDB 相關權限
2. **Given** Infrastructure Policy 存在，**When** 檢視其權限，**Then** 只包含 VPC, ALB, CloudWatch 等相關權限
3. **Given** 一個 Policy 被修改，**When** 其他 Policy 不變，**Then** 各 Policy 的權限範圍獨立不受影響

---

### Edge Cases

- 當 IAM User 嘗試 assume 一個不允許的 Role 時，應返回明確的錯誤訊息
- 當臨時憑證過期時，系統應提示重新 assume role
- 當 Policy 權限不足時，Terraform 應顯示明確的權限錯誤
- 當 S3 state bucket 不存在時，應有適當的錯誤處理

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系統 MUST 提供一個可以被 `avarobotics_local` assume 的 IAM Role
- **FR-002**: 系統 MUST 建立 Terraform State Backend Policy，包含 S3 讀寫和 DynamoDB 鎖定權限
- **FR-003**: 系統 MUST 建立 Infrastructure Deployment Policy，包含 VPC、EC2、ELB、S3、CloudWatch、IAM（有限）等權限
- **FR-004**: 系統 MUST 遵循最小權限原則，不使用 `*` 萬用字元（除非絕對必要且有明確理由）
- **FR-005**: 系統 MUST 使用 User → Role → Policy 架構，不直接將 Policy 附加到 User
- **FR-006**: 系統 MUST 為所有資源設定適當的 Name tag 以便識別
- **FR-007**: Role 的 trust policy MUST 只允許指定的 IAM User assume

### Key Entities

- **IAM Policy**: 定義具體權限的文件，分為 State Backend Policy 和 Infrastructure Policy
- **IAM Role**: 可被 assume 的身份，附加一個或多個 Policy
- **IAM User**: 現有的 `avarobotics_local` 用戶，透過 assume role 獲取權限
- **Trust Policy**: 定義誰可以 assume 這個 Role 的規則

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `avarobotics_local` 可以成功 assume `TerraformDeployRole` 並取得臨時憑證
- **SC-002**: 使用臨時憑證執行 `terraform init` 在 001-aws-api-infra 專案成功完成
- **SC-003**: 使用臨時憑證執行 `terraform apply` 成功建立所有基礎設施資源
- **SC-004**: 使用臨時憑證執行 `terraform destroy` 成功刪除所有資源
- **SC-005**: 所有 Policy 遵循最小權限原則，通過 IAM Access Analyzer 審核無過度權限警告

## Clarifications

### Session 2026-02-01

- Q: 臨時憑證 Session Duration 應設定多長？ → A: 4 小時
- Q: 是否要求 MFA 才能 Assume Role？ → A: 不需要 MFA（開發環境優先便利性）

## Assumptions

- IAM User `avarobotics_local` 已存在且可正常使用
- Role session duration 設定為 4 小時 (14400 秒)
- 開發環境不要求 MFA 驗證（未來 staging/prod 可加強）
- AWS 帳戶已啟用必要的服務（IAM, S3, DynamoDB, VPC, EC2, ELB, CloudWatch）
- Terraform state backend 的 S3 bucket 名稱為 `avarobotics-terraform-state`
- Terraform state lock 的 DynamoDB table 名稱為 `terraform-state-lock`
- 部署目標區域為 `ap-northeast-1`

## Dependencies

- 001-aws-api-infra: 此 spec 的目的是讓 001-aws-api-infra 可以順利執行
