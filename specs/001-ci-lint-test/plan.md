# Implementation Plan: CI/CD Pipeline with Lint and Test

建立 GitHub Actions workflow，在每次 PR 時自動執行 Go lint/test、Terraform validate/fmt、Web type check/build，並設定 branch protection。

## Table of Contents

- [Summary](#summary)
- [Technical Context](#technical-context)
- [Constitution Check](#constitution-check)
- [Project Structure](#project-structure)
- [Complexity Tracking](#complexity-tracking)

---

**Branch**: `001-ci-lint-test` | **Date**: 2026-02-07 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-ci-lint-test/spec.md`

## Summary

建立一個 GitHub Actions CI workflow，涵蓋三個組件的自動化檢查：
1. **Go API** — `golangci-lint` + `go test ./...`
2. **Terraform** — 重用 Terratest `make test-validate`（validate + fmt check）
3. **Web** — `tsc --noEmit` + `npm run build`

使用 `dorny/paths-filter` 做 path-based 觸發，搭配 wrapper job pattern 解決 required status checks 與 skipped jobs 的衝突。所有 CI 結果在 PR 頁面可見，且必須全部通過才能 merge。

## Technical Context

**Language/Version**: YAML (GitHub Actions), Go 1.22 (API), TypeScript 5.9 (Web), HCL (Terraform)
**Primary Dependencies**: `dorny/paths-filter@v3`, `golangci/golangci-lint-action@v7`, `hashicorp/setup-terraform@v3`, `actions/setup-go@v5`, `actions/setup-node@v4`
**Storage**: N/A
**Testing**: Manual verification via PR creation（workflow 本身就是 CI infra，不需要 unit test）
**Target Platform**: GitHub Actions runners (ubuntu-latest)
**Project Type**: CI/CD infrastructure（跨 monorepo 的多組件 pipeline）
**Performance Goals**: 所有 CI 檢查在 5 分鐘內完成
**Constraints**: 不使用 AWS credentials（只跑 Terraform validate，不跑 plan）
**Scale/Scope**: 3 個 CI jobs + 3 個 status wrapper jobs + 1 個 path filter job = 7 jobs total

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution 尚未自訂（使用空白模板），無特定 gates 需要驗證。此功能是基礎建設，不涉及 application code 或 data model，符合專案慣例。

**Pre-Phase 0**: PASS（無 gates）
**Post-Phase 1**: PASS（無 violations）

## Project Structure

### Documentation (this feature)

```text
specs/001-ci-lint-test/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0: technology decisions
├── quickstart.md        # Phase 1: verification guide
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

Note: 此功能不包含 API endpoints，不需要 `data-model.md`、`contracts/` 或 `api-docs/`。

### Source Code (repository root)

```text
.github/
└── workflows/
    └── ci.yml                    # 主要 CI workflow（新建）

.golangci.yml                     # golangci-lint 配置（新建，repo root）
```

**Structure Decision**: 單一 workflow 檔案 `ci.yml` 包含所有 jobs，因為三個組件的 CI 邏輯相關且共享 path filter 結果。`golangci-lint` 配置放在 repo root（golangci-lint 預設搜尋路徑）。

### Workflow Architecture

```text
ci.yml workflow:

┌─────────────┐
│   changes    │  dorny/paths-filter — 偵測 api/, terraform/, web/ 變更
└──────┬───────┘
       │ outputs: api, terraform, web
       ▼
┌──────────────┐  ┌──────────────────┐  ┌───────────────┐
│  go-lint     │  │ terraform-validate│  │  web-check    │
│  (if api)    │  │ (if terraform)   │  │  (if web)     │
├──────────────┤  ├──────────────────┤  ├───────────────┤
│  go-test     │  │                  │  │ tsc --noEmit  │
│  (if api)    │  │ make test-       │  │ npm run build │
│              │  │   validate       │  │               │
└──────┬───────┘  └────────┬─────────┘  └───────┬───────┘
       │                   │                    │
       ▼                   ▼                    ▼
┌──────────────┐  ┌──────────────────┐  ┌───────────────┐
│   Go CI      │  │  Terraform CI    │  │   Web CI      │
│ (if: always) │  │  (if: always)    │  │  (if: always) │
│  ← required  │  │   ← required     │  │  ← required   │
└──────────────┘  └──────────────────┘  └───────────────┘
  status check      status check          status check
```

**Required status checks** (設定在 branch protection):
- `Go CI`
- `Terraform CI`
- `Web CI`

## Complexity Tracking

> No violations — constitution is blank template, no gates to violate.

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| Single workflow file | `ci.yml` 包含所有 jobs | 三個組件共享 path filter，拆分反而增加複雜度 |
| Wrapper job pattern | 每個組件一個 status job | 解決 path filter + required checks 衝突的標準做法 |
| Reuse Terratest | `make test-validate` | 不重複已有的測試邏輯 |
