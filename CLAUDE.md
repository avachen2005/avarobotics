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

## Documentation Standards

All Markdown files must include:
1. **One-line summary** - Brief description at the top after the title
2. **Table of Contents** - Linked menu to navigate sections
3. **Horizontal separator** - Use `---` after ToC before main content

Example structure:
```markdown
# Document Title

One-line summary of the document's purpose.

## Table of Contents

- [Section 1](#section-1)
- [Section 2](#section-2)
- [Section 3](#section-3)

---

## Section 1
...
```

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
- YAML (Kubernetes manifests), Dockerfile + kubectl, Docker, AWS ECR (005-k8s-api-deploy)
- Go 1.22+ + github.com/golang-jwt/jwt/v5 (JWT validation), Swift 5.9+ (iOS), Kotlin 1.9+ (Android) (006-cognito-app-auth)
- Keychain (iOS), EncryptedSharedPreferences (Android), Cognito Access Token (006-cognito-app-auth)
- YAML (GitHub Actions), Go 1.22 (API), TypeScript 5.9 (Web), HCL (Terraform) + `dorny/paths-filter@v3`, `golangci/golangci-lint-action@v7`, `hashicorp/setup-terraform@v3`, `actions/setup-go@v5`, `actions/setup-node@v4` (001-ci-lint-test)
- YAML (GitHub Actions workflows), HCL (Terraform for IAM), Go 1.22 (golangci-lint config) + `actions/checkout@v4`, `actions/setup-go@v5`, `golangci/golangci-lint-action@v4`, `aws-actions/configure-aws-credentials@v4`, `aws-actions/aws-codebuild-run-build@v1` (008-api-ci-cd-pipeline)
- Go 1.22 (API), HCL (Terraform >= 1.5.0) + AWS Provider ~> 5.0, Docker (multi-stage build) (040-codebuild-ecr-api)
- ECR (container images), CloudWatch Logs (build logs) (040-codebuild-ecr-api)

## GitHub Issue Workflow (實作時必須遵循)

當實作 speckit 的 tasks 時，必須遵循以下流程：

### 核心原則

1. **每個 Issue 都有自己的 PR** - 一對一關係
2. **每個 PR 必須可獨立運作** - 不依賴未合併的其他 PR
3. **PR 不超過 500 行** - 超過時拆分成多個 PR
4. **使用 GitHub 的 "Create branch" 功能** - 從 Issue 的 Development section 建立分支

### 開始實作時

1. 在 Issue 的 Development section 點擊 "Create a branch"
   - Branch 名稱格式: `<issue-number>-<short-description>`
   - 例如: `17-setup-phase-1`
2. 切換到新建立的分支
3. 將 Issue 狀態改為 `In Progress`
4. 在 Issue 上 comment: "開始實作"

```bash
# 切換到 Issue 建立的分支
git fetch origin
git checkout <issue-number>-<short-description>
```

### 實作過程中 - Comment 規範 (必須遵循!)

每個實作步驟都要在 Issue 上留下 comment，包含：

1. **做了什麼** - 具體的改動描述
2. **為什麼這樣做** - 技術決策的原因
3. **相關檔案** - file path 或 code snippet

Comment 範例：
```markdown
### T001: Add JWT dependency

**做了什麼**:
新增 `github.com/golang-jwt/jwt/v5` 到 go.mod

**為什麼**:
選擇這個 library 因為：
- 是 Go 社群最廣泛使用的 JWT library
- 支援 RS256 (Cognito 使用的演算法)
- 有完整的 claims 驗證功能

**檔案**: `api/go.mod`
```

### 實作完成後

1. 確認所有 tasks 都完成
2. 執行驗證步驟並記錄結果到 comment
3. 建立 PR (使用下方指令)
4. 將 Issue 狀態改為 `In Review`
5. 將 Issue assign 給 `ava`

### PR 規範

| 規則 | 說明 |
|------|------|
| Title 格式 | `[#<ISSUE_NO>] <short description>` |
| Body | 連結到 Issue: `Closes #<ISSUE_NO>` |
| 行數限制 | 不超過 500 行 |
| 獨立性 | 每個 PR 必須可獨立運作、編譯、測試 |

**超過 500 行時**:
1. 拆分成多個 PR
2. 每個 PR 都連結到同一個 Issue
3. PR title 加上 part 編號: `[#17] Setup Phase 1 - Part 1/3`
4. 確保每個 part 都可獨立運作

### GitHub CLI 指令

```bash
# Comment on issue (實作過程中使用)
gh issue comment <NUMBER> --repo avachen2005/avarobotics --body "$(cat <<'EOF'
### T001: Task 名稱

**做了什麼**: 描述改動

**為什麼**: 解釋原因

**檔案**: `path/to/file.go`
EOF
)"

# Assign issue
gh issue edit <NUMBER> --repo avachen2005/avarobotics --add-assignee avachen2005

# Create PR linking issue
gh pr create --title "[#<NUMBER>] PR 標題" --body "$(cat <<'EOF'
## Summary
簡述這個 PR 做了什麼

## Changes
- 改動 1
- 改動 2

## Testing
如何測試這個 PR

Closes #<NUMBER>
EOF
)"
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
- 008-api-ci-cd-pipeline: Added YAML (GitHub Actions workflows), HCL (Terraform for IAM), Go 1.22 (golangci-lint config) + `actions/checkout@v4`, `actions/setup-go@v5`, `golangci/golangci-lint-action@v4`, `aws-actions/configure-aws-credentials@v4`, `aws-actions/aws-codebuild-run-build@v1`
- 040-codebuild-ecr-api: Added Go 1.22 (API), HCL (Terraform >= 1.5.0) + AWS Provider ~> 5.0, Docker (multi-stage build)
- 001-ci-lint-test: Added YAML (GitHub Actions), Go 1.22 (API), TypeScript 5.9 (Web), HCL (Terraform) + `dorny/paths-filter@v3`, `golangci/golangci-lint-action@v7`, `hashicorp/setup-terraform@v3`, `actions/setup-go@v5`, `actions/setup-node@v4`
- 006-cognito-app-auth: Added Go JWT validation (golang-jwt/jwt/v5), Swift 5.9+ (iOS), Kotlin 1.9+ (Android), secure token storage
