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
| Title 格式 (一般 Issue) | `[#<ISSUE_NO>] <short description>` |
| Title 格式 (Sub-Issue) | `[#<PARENT>][#<SUB>] <short description>` |
| Body | 連結到 Issue: `Closes #<ISSUE_NO>` |
| 行數限制 | 不超過 500 行 |
| 獨立性 | 每個 PR 必須可獨立運作、編譯、測試 |

**PR Title 範例**:
- 一般 Issue: `[#17] Setup Phase 1`
- Sub-Issue: `[#17][#25] API directory structure`

**超過 500 行時 - 建立 Sub-Issues**:

當預估 PR 會超過 500 行時，必須拆分成 sub-issues：

1. **建立 Sub-Issue**
   - Title 格式: `[#<PARENT_ISSUE>] Sub: <description>`
   - 例如: `[#17] Sub: API directory structure and dependencies`

2. **Sub-Issue 內容必須包含**:
   ```markdown
   ## Parent Issue
   Part of #17

   ## 這個 Sub-Issue 做什麼
   [清楚描述這個 sub-issue 的範圍和目標]

   ## Tasks
   - [ ] Task 1
   - [ ] Task 2

   ## Acceptance Criteria
   - [ ] Criteria 1: [具體可驗證的條件]
   - [ ] Criteria 2: [具體可驗證的條件]

   ## Dependencies
   - Depends on: #XX (如果有)
   - Blocks: #XX (如果有)
   ```

3. **每個 Sub-Issue 都用 Development section 建立分支**
   - 從 sub-issue 頁面的 Development section 點擊 "Create a branch"
   - Branch 命名會自動產生: `<sub-issue-number>-<description>`

4. **Sub-Issue 的 PR 規範**
   - PR title: `[#<PARENT_ISSUE>][#<SUB_ISSUE>] <description>`
   - 例如: `[#17][#25] API directory structure`
   - PR body 連結 sub-issue: `Closes #<SUB_ISSUE>`
   - 在 parent issue comment 更新進度

```bash
# 建立 Sub-Issue
gh issue create --repo avachen2005/avarobotics \
  --title "[#17] Sub: API directory structure" \
  --body "$(cat <<'EOF'
## Parent Issue
Part of #17

## 這個 Sub-Issue 做什麼
建立 API 的目錄結構和新增必要的 dependencies

## Tasks
- [ ] T001 Add JWT dependency to api/go.mod
- [ ] T002 Create api/internal/middleware/ directory
- [ ] T003 Create api/internal/service/ directory
- [ ] T004 Create api/internal/model/ directory

## Acceptance Criteria
- [ ] `go mod tidy` 執行成功
- [ ] 所有目錄結構已建立
- [ ] `go build ./...` 編譯成功

## Dependencies
- Depends on: None
- Blocks: #18 (Phase 2)
EOF
)"
```

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

# 在 Parent Issue 上更新 Sub-Issue 進度
gh issue comment <PARENT_NUMBER> --repo avachen2005/avarobotics --body "$(cat <<'EOF'
### Sub-Issue Progress Update

| Sub-Issue | Status | PR |
|-----------|--------|-----|
| #25 API structure | ✅ Merged | #30 |
| #26 iOS setup | 🔄 In Progress | #31 |
| #27 Android setup | ⏳ Pending | - |
EOF
)"

# Assign issue
gh issue edit <NUMBER> --repo avachen2005/avarobotics --add-assignee avachen2005

# Create PR for regular issue
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

# Create PR for sub-issue (includes parent issue number)
gh pr create --title "[#<PARENT>][#<SUB>] PR 標題" --body "$(cat <<'EOF'
## Summary
簡述這個 PR 做了什麼

## Parent Issue
Part of #<PARENT>

## Changes
- 改動 1
- 改動 2

## Testing
如何測試這個 PR

Closes #<SUB>
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
- 006-cognito-app-auth: Added Go JWT validation (golang-jwt/jwt/v5), Swift 5.9+ (iOS), Kotlin 1.9+ (Android), secure token storage
- 005-k8s-api-deploy: Added YAML (Kubernetes manifests), Dockerfile + kubectl, Docker, AWS ECR
- 004-health-check-api: Added Go 1.22+ + net/http (標準庫)
- 003-cognito-gmail-login: Added TypeScript 5.x (Frontend), HCL (Terraform) + React 18.3, Vite 6.x, AWS Amplify (Cognito SDK), Tailwind CSS 4.x
