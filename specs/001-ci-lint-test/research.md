# Research: CI/CD Pipeline with Lint and Test

Phase 0 研究成果，解決所有技術決策。

## Table of Contents

- [Path Filter + Required Checks](#path-filter--required-checks)
- [Go Linting Action](#go-linting-action)
- [Terraform Validation in CI](#terraform-validation-in-ci)
- [Node.js Build in CI](#nodejs-build-in-ci)
- [Branch Protection Rules](#branch-protection-rules)

---

## Path Filter + Required Checks

**Decision**: 使用 `dorny/paths-filter@v3` + wrapper job pattern

**Rationale**: GitHub Actions 原生的 path filter（`on.push.paths`）會讓整個 workflow 不觸發，無法滿足 required status checks。社群標準做法是：
1. 一個 `changes` job 用 `dorny/paths-filter` 偵測哪些目錄有變更
2. 實際 job 用 `if: needs.changes.outputs.xxx == 'true'` 條件執行
3. 每個 job 有一個 wrapper status job，用 `if: always()` 確保一定執行
4. 將 wrapper job 設為 required status check（不是實際 job）

**Alternatives considered**:
- `on.push.paths` — 整個 workflow 不觸發時 required checks 永遠 pending
- `actions/paths-filter` — 非官方，`dorny/paths-filter` 更成熟且廣泛使用

## Go Linting Action

**Decision**: `golangci/golangci-lint-action@v7` + `actions/setup-go@v5` (Go 1.22)

**Rationale**: 官方 golangci-lint GitHub Action，內建 cache，支援 working-directory 參數。Go 1.22 與 `api/go.mod` 一致。

**Alternatives considered**:
- 手動安裝 golangci-lint — 需要額外步驟管理版本和 cache
- `reviewdog` — 功能強大但對純 lint 來說 overkill

## Terraform Validation in CI

**Decision**: 使用現有的 Terratest `make test-validate`，搭配 `actions/setup-go@v5` + `hashicorp/setup-terraform@v3`

**Rationale**: Issue #39 已建立完整的 Terratest 框架，`make test-validate` 會跑 `terraform validate` + `terraform fmt -check` 覆蓋所有 7 個 modules。直接在 CI 重用而非重寫。需要 Go 來跑 Terratest，也需要 Terraform CLI。

**Alternatives considered**:
- 直接在 workflow 中跑 `terraform fmt -check -recursive` — 可行但不如 Terratest 覆蓋完整（Terratest 會 init 每個 module 再 validate）
- `tflint` — 額外的 lint 工具，目前沒有 config，未來可加入

## Node.js Build in CI

**Decision**: `actions/setup-node@v4` + npm cache + `tsc --noEmit` + `npm run build`

**Rationale**: Web 專案使用 npm（有 `package-lock.json`），TypeScript 5.9，Vite 6.3。`tsc --noEmit` 做 type check（tsconfig 已設定 `noEmit: true`、`strict: true`），`npm run build` 做 Vite build 驗證。

**Alternatives considered**:
- pnpm — package.json 有 pnpm override 但實際用 npm（有 package-lock.json）
- 只跑 `npm run build` — build 不一定能捕捉到所有 type error（Vite 跳過 type check）

## Branch Protection Rules

**Decision**: 透過 `gh api` 設定 required status checks

**Rationale**: 使用 `gh api repos/{owner}/{repo}/branches/main/protection` PUT endpoint，將三個 wrapper job name 設為 required checks：`Go CI`、`Terraform CI`、`Web CI`。

**Alternatives considered**:
- GitHub Web UI 手動設定 — 不可重現，不適合 IaC 理念
- Terraform `github_branch_protection` resource — 增加 Terraform 複雜度，目前用 CLI 更簡單
