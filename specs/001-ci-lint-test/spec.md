# Feature Specification: CI/CD Pipeline with Lint and Test

每次 push 或 PR 時自動執行 lint 和測試，確保程式碼品質在合併前通過檢查。

## Table of Contents

- [User Scenarios & Testing](#user-scenarios--testing-mandatory)
- [Requirements](#requirements-mandatory)
- [Success Criteria](#success-criteria-mandatory)

---

**Feature Branch**: `001-ci-lint-test`
**Created**: 2026-02-07
**Status**: Draft
**Input**: User description: "我要加上每一次 CI/CD 我都要跑過 lint 跟測試"

## Clarifications

### Session 2026-02-07

- Q: Path filters 與 required status checks 的衝突如何處理？（FR-006 path filter 會導致未觸發的 job 擋住 PR） → A: 使用 path filter + 條件跳過，讓未觸發的 job 回報 success（skipped 視為通過）。每個 job 只在對應目錄有變更時才真正執行。
- Q: CI runner 要跑在哪裡？ → A: GitHub-hosted runners（`ubuntu-latest`）。Repo 目前是 public（免費無限），未來改 private 後先用免費額度（2,000-3,000 分鐘/月），不夠再考慮 Fargate self-hosted runner。

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Go API Lint & Test on Every Push (Priority: P1)

開發者 push Go API 程式碼時，CI 自動執行 Go linting 和 unit tests，在 PR 頁面顯示通過或失敗的結果。

**Why this priority**: Go API 是目前唯一有可執行 test 的後端程式碼（`api/internal/handler/health_test.go`），是最能立即產生價值的 pipeline。

**Independent Test**: Push 一個包含 `api/` 變更的 commit，確認 GitHub Actions 自動觸發 Go lint + test job，結果顯示在 PR checks 中。

**Acceptance Scenarios**:

1. **Given** 開發者建立一個修改 `api/` 目錄的 PR，**When** PR 被建立或更新，**Then** CI 自動執行 Go lint 和 Go test，結果顯示在 PR checks 區域
2. **Given** Go 程式碼有 lint 錯誤（如未使用的變數），**When** CI 執行 lint 檢查，**Then** workflow 失敗並顯示具體的 lint 錯誤訊息
3. **Given** Go 測試有失敗的 test case，**When** CI 執行測試，**Then** workflow 失敗並顯示失敗的 test 名稱和錯誤訊息

---

### User Story 2 - Terraform Validate & Format Check on Every Push (Priority: P1)

開發者 push Terraform 程式碼時，CI 自動執行 Terraform validate 和 format check，確保所有 module 的配置正確且格式一致。

**Why this priority**: Terraform 已有完整的 Terratest 測試框架（Issue #39），CI 只需跑現有的 validate 測試，不需要 AWS credentials，成本為零。

**Independent Test**: Push 一個包含 `terraform/` 變更的 commit，確認 CI 自動觸發 Terraform validate + fmt 檢查。

**Acceptance Scenarios**:

1. **Given** 開發者建立一個修改 `terraform/` 目錄的 PR，**When** PR 被建立或更新，**Then** CI 自動執行 Terraform validate 和 format 檢查
2. **Given** Terraform 檔案格式不正確，**When** CI 執行 format check，**Then** workflow 失敗並提示開發者修正格式
3. **Given** Terraform module 有語法錯誤，**When** CI 執行 validate，**Then** workflow 失敗並顯示具體的驗證錯誤

---

### User Story 3 - Web Frontend Type Check & Build on Every Push (Priority: P2)

開發者 push Web 前端程式碼時，CI 自動執行 TypeScript type check 和 build 驗證，確保程式碼可正常編譯。

**Why this priority**: Web 專案目前沒有 test runner 設定，但 TypeScript strict mode 已啟用，type check 本身就是有效的靜態驗證。Build 驗證可以捕捉到 import 錯誤和打包問題。

**Independent Test**: Push 一個包含 `web/` 變更的 commit，確認 CI 自動觸發 TypeScript check + build。

**Acceptance Scenarios**:

1. **Given** 開發者建立一個修改 `web/` 目錄的 PR，**When** PR 被建立或更新，**Then** CI 自動執行 TypeScript type check 和 build 驗證
2. **Given** TypeScript 程式碼有型別錯誤，**When** CI 執行 type check，**Then** workflow 失敗並顯示型別錯誤位置

---

### User Story 4 - PR Merge Gate (Priority: P2)

所有 CI 檢查必須通過才能 merge PR，確保 main branch 的程式碼品質。

**Why this priority**: 沒有 merge gate 的 CI 只是資訊性的，無法真正防止壞程式碼進入 main branch。

**Independent Test**: 建立一個有失敗 lint 的 PR，確認 merge 按鈕被禁用。

**Acceptance Scenarios**:

1. **Given** PR 的所有 CI 檢查都通過，**When** 開發者查看 PR 頁面，**Then** merge 按鈕可用
2. **Given** PR 有任何一個 CI 檢查失敗，**When** 開發者查看 PR 頁面，**Then** merge 按鈕被禁用且顯示失敗的檢查項目

---

### Edge Cases

- 如果 PR 同時修改 `api/`、`terraform/`、`web/`，所有相關 job 應該平行執行
- 如果只修改文件檔案（如 `README.md`、`*.md`），不應觸發不相關的 lint/test jobs
- 如果 CI 環境安裝 dependency 失敗（如 npm install 或 go mod download），應有清楚的錯誤訊息
- lint 工具版本應在 CI 配置中鎖定，避免版本漂移導致本地與 CI 結果不一致
- 如果 PR 只改 `api/`，Terraform 和 Web 的 job 應被跳過且回報 success，不影響 merge

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系統 MUST 在每次 push 到非 main branch 和每個 PR 時自動觸發 CI pipeline
- **FR-002**: 系統 MUST 執行 Go linting 檢查 `api/` 目錄下的所有 Go 程式碼
- **FR-003**: 系統 MUST 執行 Go unit tests 檢查 `api/` 目錄下的所有測試
- **FR-004**: 系統 MUST 執行 Terraform validate 和 format check 檢查所有 Terraform modules
- **FR-005**: 系統 MUST 執行 TypeScript type check 和 build 驗證檢查 `web/` 目錄
- **FR-006**: 系統 MUST 使用 path filter，只在相關目錄有變更時才真正執行對應的 job；未觸發的 job MUST 回報 success（skipped 視為通過），不得阻擋 PR 合併
- **FR-007**: 系統 MUST 在 PR 頁面顯示每個 CI job 的通過/失敗狀態
- **FR-008**: 系統 MUST 將所有 CI 檢查設為 required status checks，阻擋未通過的 PR 合併；被 path filter 跳過的 job 不算失敗
- **FR-009**: 系統 MUST 在 CI 失敗時提供足夠的錯誤訊息讓開發者快速定位問題

### Assumptions

- Go linting 使用 `golangci-lint`，因為它是 Go 社群最廣泛使用的 lint 工具
- Terraform plan tests 不包含在 CI 中，因為需要 AWS credentials；只跑 validate + fmt（不需要 credentials）
- Web 目前沒有 test runner（無 Jest/Vitest 設定），因此只做 TypeScript type check 和 build 驗證
- Mobile（Android/iOS）目錄目前為空，不需要 CI job；未來有程式碼時再加入
- GitHub Actions 是 CI/CD 平台，因為專案已託管在 GitHub
- CI runner 使用 GitHub-hosted runners（`ubuntu-latest`），不需要自建 runner 基礎建設

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 每個 PR 在建立後 5 分鐘內完成所有 CI 檢查
- **SC-002**: CI 檢查失敗時，開發者能在 30 秒內從 PR 頁面找到失敗原因
- **SC-003**: 沒有通過所有 CI 檢查的 PR 無法被合併到 main branch
- **SC-004**: 只修改文件檔案的 PR 不會觸發不必要的 lint/test jobs
- **SC-005**: CI pipeline 覆蓋所有目前有程式碼的專案組件（Go API、Terraform modules、Web frontend）
