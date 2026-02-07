# Quickstart: CI/CD Pipeline Verification

驗證 CI/CD pipeline 是否正確運作的步驟指南。

## Table of Contents

- [Prerequisites](#prerequisites)
- [Verification Steps](#verification-steps)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

- GitHub repository: `avachen2005/avarobotics`
- `gh` CLI 已安裝且已登入
- Repository admin 權限（設定 branch protection）

## Verification Steps

### 1. 驗證 Workflow 檔案存在

```bash
# 確認 workflow 檔案已建立
ls -la .github/workflows/ci.yml

# 確認 golangci-lint 配置已建立
ls -la .golangci.yml
```

### 2. 驗證 Go CI Job

```bash
# 建立測試 branch
git checkout -b test/ci-go-check

# 修改一個 Go 檔案觸發 CI
echo "" >> api/cmd/server/main.go
git add api/cmd/server/main.go
git commit -m "test: trigger Go CI"
git push -u origin test/ci-go-check

# 建立 PR 並觀察 CI 結果
gh pr create --title "Test: Go CI" --body "Testing Go lint + test pipeline"

# 等待並檢查結果
gh pr checks
```

預期結果：`Go CI` check 顯示為 passed。

### 3. 驗證 Terraform CI Job

```bash
# 在同一個 branch 或新 branch 修改 Terraform 檔案
echo "" >> terraform/modules/networking/variables.tf
git add terraform/modules/networking/variables.tf
git commit -m "test: trigger Terraform CI"
git push
```

預期結果：`Terraform CI` check 顯示為 passed。

### 4. 驗證 Web CI Job

```bash
# 修改 Web 檔案
echo "" >> web/src/main.tsx
git add web/src/main.tsx
git commit -m "test: trigger Web CI"
git push
```

預期結果：`Web CI` check 顯示為 passed。

### 5. 驗證 Path Filter（跳過不相關 jobs）

```bash
# 只修改 README（不應觸發任何實際 lint/test）
echo "" >> README.md
git add README.md
git commit -m "test: should skip all CI jobs"
git push
```

預期結果：三個 status check 都顯示為 passed（skipped）。

### 6. 驗證 Branch Protection

```bash
# 確認 required status checks 已設定
gh api repos/avachen2005/avarobotics/branches/main/protection \
  --jq '.required_status_checks.checks[].context'
```

預期輸出：
```
Go CI
Terraform CI
Web CI
```

### 7. 清理測試 PR

```bash
gh pr close --delete-branch
git checkout main
git pull
```

## Troubleshooting

| 問題 | 可能原因 | 解決方式 |
|------|---------|---------|
| CI 沒有觸發 | Workflow 檔案語法錯誤 | 檢查 Actions tab 的 workflow errors |
| Required check 永遠 pending | Wrapper job name 與 protection rule 不一致 | 確認 `name:` 欄位和 protection rule 完全一致 |
| Go lint 失敗 | 現有程式碼有 lint issues | 先 fix lint issues 或在 `.golangci.yml` 調整規則 |
| Terraform validate 失敗 | Module 有語法錯誤 | 在本地跑 `cd terraform/test && make test-validate` 確認 |
| npm ci 失敗 | package-lock.json 過期 | 在本地跑 `cd web && npm install` 更新 lock file |
