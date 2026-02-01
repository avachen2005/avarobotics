# Ava Robotics

## Project Overview
Multi-platform robotics project with infrastructure, backend API, and mobile clients.

## Repository Structure
- `terraform/` - Infrastructure as Code (AWS/GCP)
- `k8s/` - Kubernetes manifests and Helm charts
- `api/` - Go backend API
- `android/` - Android mobile app (Kotlin/Compose)
- `ios/` - iOS mobile app (Swift/SwiftUI)

## General Conventions
- Use conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- All PRs require passing CI checks
- Keep secrets out of version control - use environment variables or secret managers

## Code Review Standards
- Changes should be focused and atomic
- Include tests for new functionality
- Update documentation when behavior changes

## AWS IAM 權限規範 (必須遵循)

所有 AWS 權限設定必須遵循 **User → Role → Policy** 架構：

```
IAM Policy (定義具體權限)
       ↓
IAM Role (附加一個或多個 Policy)
       ↓
IAM User (透過 assume role 獲取權限)
```

### 規範要點

1. **永遠不要直接給 User 權限** - User 只能透過 assume role 獲取權限
2. **Policy 要職責分離** - 每個 Policy 負責一個功能領域
3. **使用最小權限原則** - 只給需要的權限，不要用 `*`
4. **Role 要有明確用途** - 命名要清楚表達用途，如 `TerraformDeployRole`

### 命名規範

| 類型 | 格式 | 範例 |
|------|------|------|
| Policy | `{功能}Policy` | `TerraformStatePolicy`, `EC2ReadOnlyPolicy` |
| Role | `{用途}Role` | `TerraformDeployRole`, `LambdaExecutionRole` |
| User | `{人員/服務}_local` 或 `{人員/服務}_ci` | `avarobotics_local`, `github_ci` |

### 常見 Policy 分類

- **State Backend**: S3 + DynamoDB 權限 (Terraform state)
- **Infrastructure**: VPC, EC2, ALB, S3, CloudWatch 等
- **CI/CD**: ECR push, ECS deploy 等
- **Read Only**: 只讀權限，用於監控和審計

## Active Technologies
- Terraform >= 1.5.0 (HCL) + AWS Provider ~> 5.0, Random Provider ~> 3.0 (001-aws-api-infra)
- S3 (Terraform state) + S3 (application assets/logs) (001-aws-api-infra)
- N/A (IAM 是 AWS 全域服務) (002-aws-iam-permissions)
- TypeScript 5.x (Frontend), HCL (Terraform) + React 18.3, Vite 6.x, AWS Amplify (Cognito SDK), Tailwind CSS 4.x (003-cognito-gmail-login)
- AWS Cognito User Pool (user data), Browser localStorage/cookies (session tokens) (003-cognito-gmail-login)
- Go 1.22+ + net/http (標準庫) (004-health-check-api)

## GitHub Issue Workflow (實作時必須遵循)

當實作 speckit 的 tasks 時，必須遵循以下流程：

### 開始實作時
1. 將 Issue 狀態改為 `In Progress`
2. 在 Issue 上 comment: "開始實作"

### 實作過程中
- 每完成一個 task，在 Issue 上 comment 說明做了什麼
- 附上相關的 code snippet 或 file path
- 使用 `gh issue comment` 指令

### 實作完成後
1. 確認所有 tasks 都完成
2. 執行驗證步驟並記錄結果
3. 將 Issue 狀態改為 `In Review`
4. 將 Issue assign 給 `ava`
5. 在 Issue 上 comment: "實作完成，請 review"

### PR 規範
- PR title 包含 Issue 編號: `[#123] 實作描述`
- PR body 連結到對應的 Issue: `Closes #123`
- 每個 PR 不超過 500 行

### GitHub CLI 指令
```bash
# Comment on issue
gh issue comment <NUMBER> --repo avachen2005/avarobotics --body "內容"

# Assign issue
gh issue edit <NUMBER> --repo avachen2005/avarobotics --add-assignee avachen2005

# Create PR linking issue
gh pr create --title "[#123] PR 標題" --body "Closes #123"
```

### Project Board
- URL: https://github.com/users/avachen2005/projects/4/views/1
- Project ID: `PVT_kwHOAHxvcs4BN-ak`
- Status Field ID: `PVTSSF_lAHOAHxvcs4BN-akzg80D_s`

### Status 更新指令 (實作時必用!)
```bash
# Status Options:
# - Backlog: f75ad846
# - Ready: 61e4505c
# - In progress: 47fc9ee4
# - In review: df73e18b
# - Done: 98236657

# 更新 Issue 狀態
gh project item-edit \
  --project-id PVT_kwHOAHxvcs4BN-ak \
  --id <ITEM_ID> \
  --field-id PVTSSF_lAHOAHxvcs4BN-akzg80D_s \
  --single-select-option-id <STATUS_OPTION_ID>

# 取得 Issue 的 Item ID
gh project item-list 4 --owner avachen2005 --format json | jq '.items[] | select(.content.number == <ISSUE_NUMBER>) | .id'
```

### 001-aws-api-infra Issue Item IDs
| Issue | Title | Item ID |
|-------|-------|---------|
| #2 | Phase 1: Setup | PVTI_lAHOAHxvcs4BN-akzgknO8Q |
| #3 | Phase 2: Networking | PVTI_lAHOAHxvcs4BN-akzgknO9Y |
| #4 | US1: ALB | PVTI_lAHOAHxvcs4BN-akzgknPAM |
| #5 | US2: Security | PVTI_lAHOAHxvcs4BN-akzgknPBY |
| #6 | US3: Storage | PVTI_lAHOAHxvcs4BN-akzgknPC8 |
| #7 | US4: Logging | PVTI_lAHOAHxvcs4BN-akzgknPDw |
| #8 | Phase 7: Polish | PVTI_lAHOAHxvcs4BN-akzgknPFE |

## Recent Changes
- 004-health-check-api: Added Go 1.22+ + net/http (標準庫)
- 003-cognito-gmail-login: Added TypeScript 5.x (Frontend), HCL (Terraform) + React 18.3, Vite 6.x, AWS Amplify (Cognito SDK), Tailwind CSS 4.x
- 002-aws-iam-permissions: Added Terraform >= 1.5.0 (HCL) + AWS Provider ~> 5.0
