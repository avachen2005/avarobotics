# Speckit Workflow

## Overview

Speckit 是一套功能規格到實作的工作流程，確保每個功能都有清晰的規格、計畫、任務和驗證方式。

## 工作流程

```
┌─────────────────────────────────────────────────────────────────┐
│  1. /speckit.specify                                            │
│     輸入: 功能描述 (自然語言)                                      │
│     輸出: spec.md + checklists/requirements.md                  │
│     建立: 新的 feature branch (###-feature-name)                 │
└─────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│  2. /speckit.clarify (可選)                                      │
│     輸入: spec.md                                                │
│     輸出: 更新後的 spec.md                                        │
│     用途: 釐清不明確的需求，回答 [NEEDS CLARIFICATION] 問題         │
└─────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│  3. /speckit.plan                                               │
│     輸入: spec.md                                                │
│     輸出: plan.md                                                │
│     內容: 技術設計、架構決策、實作策略                              │
└─────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│  4. /speckit.tasks                                              │
│     輸入: spec.md + plan.md                                      │
│     輸出: tasks.md                                               │
│     內容: 可執行的任務清單，含依賴順序和驗證方式                     │
└─────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│  5. /speckit.taskstoissues                                      │
│     輸入: tasks.md                                               │
│     輸出: GitHub Issues                                          │
│     用途: 將任務轉成 GitHub Issues 並加入 Project Board            │
└─────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│  6. /speckit.implement                                          │
│     輸入: tasks.md                                               │
│     輸出: 實際程式碼                                              │
│     用途: 依序執行任務，產生 PR                                    │
└─────────────────────────────────────────────────────────────────┘
```

## 其他指令

| 指令 | 用途 |
|------|------|
| `/speckit.analyze` | 分析 spec/plan/tasks 的一致性和品質 |
| `/speckit.checklist` | 為功能產生自訂檢查清單 |
| `/speckit.constitution` | 建立或更新專案原則 |

## 目錄結構

```
specs/
└── ###-feature-name/           # 每個功能一個目錄
    ├── README.md               # 功能摘要
    ├── spec.md                 # 功能規格 (WHAT)
    ├── plan.md                 # 實作計畫 (HOW)
    ├── tasks.md                # 任務清單
    └── checklists/
        └── requirements.md     # 品質檢查清單
```

## 開發流程限制

本專案的開發流程有以下限制：

| 限制 | 說明 |
|------|------|
| **PR 行數** | 每個 PR 不超過 500 行 |
| **驗證方式** | 每個 PR 必須包含驗證步驟 |
| **User Story → Issue** | 每個 User Story 對應一個 GitHub Issue |

## 文件層級

```
spec.md     → WHAT (做什麼、為什麼) → 給 Stakeholder 看
plan.md     → HOW (怎麼做)         → 給 Tech Lead 看
tasks.md    → DO (執行步驟)        → 給 Developer 看
```

## 實作流程 (Implementation Workflow)

當執行 `/speckit.implement` 時，必須遵循以下流程：

### Issue 狀態流程

```
Todo → In Progress → In Review → Done
```

### 每個 Issue 的實作步驟

1. **開始實作前**
   - 將 Issue 狀態改為 `In Progress`
   - 在 Issue 上 comment: "開始實作"

2. **實作過程中**
   - 每完成一個 task，在 Issue 上 comment 說明做了什麼
   - 附上相關的 code snippet 或 file path
   - 格式範例：
     ```markdown
     ✅ T001 完成

     建立了以下檔案：
     - `terraform/environments/dev/backend.tf`
     - `terraform/shared/tags.tf`

     驗證結果：
     ```bash
     terraform validate
     Success! The configuration is valid.
     ```
     ```

3. **實作完成後**
   - 確認所有 tasks 都完成並打勾
   - 執行驗證步驟並記錄結果
   - 將 Issue 狀態改為 `In Review`
   - 將 Issue assign 給 reviewer (`ava`)
   - 在 Issue 上 comment: "實作完成，請 review"

4. **建立 PR**
   - PR title 包含 Issue 編號: `[#123] 實作描述`
   - PR body 連結到對應的 Issue: `Closes #123`
   - 確保 PR 不超過 500 行

### GitHub CLI 指令參考

```bash
# 更新 Issue 狀態 (需要先取得 project item ID)
gh project item-edit --project-id <PROJECT_ID> --id <ITEM_ID> --field-id <STATUS_FIELD_ID> --single-select-option-id <STATUS_OPTION_ID>

# 在 Issue 上 comment
gh issue comment <ISSUE_NUMBER> --repo <OWNER>/<REPO> --body "comment 內容"

# Assign Issue
gh issue edit <ISSUE_NUMBER> --repo <OWNER>/<REPO> --add-assignee <USERNAME>

# 建立 PR 並連結 Issue
gh pr create --title "[#123] PR 標題" --body "Closes #123"
```

### Reviewer (ava) 負責的部分

- 確認 Issue 上的所有 tasks 都完成
- 確認驗證步驟都通過
- Review PR code
- Approve 後將 Issue 狀態改為 `Done`
- Merge PR

## Project Board

- URL: https://github.com/users/avachen2005/projects/4/views/1
- 所有 Feature Issues 都會加到這個 board
- 使用 Status 欄位追蹤進度

## Quick Start

```bash
# 1. 建立新功能規格
/speckit.specify 我要建立一個用戶登入功能

# 2. (可選) 釐清需求
/speckit.clarify

# 3. 產生實作計畫
/speckit.plan

# 4. 產生任務清單
/speckit.tasks

# 5. 建立 GitHub Issues
/speckit.taskstoissues

# 6. 開始實作
/speckit.implement
```
