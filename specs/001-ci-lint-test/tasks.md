# Tasks: CI/CD Pipeline with Lint and Test

建立 GitHub Actions CI workflow，涵蓋 Go lint/test、Terraform validate/fmt、Web type check/build，並設定 branch protection。

## Table of Contents

- [Phase 1: Setup](#phase-1-setup-shared-infrastructure)
- [Phase 2: Foundational](#phase-2-foundational-workflow-skeleton--path-filter)
- [Phase 3: User Story 1](#phase-3-user-story-1---go-api-lint--test-priority-p1--mvp)
- [Phase 4: User Story 2](#phase-4-user-story-2---terraform-validate--format-check-priority-p1)
- [Phase 5: User Story 3](#phase-5-user-story-3---web-frontend-type-check--build-priority-p2)
- [Phase 6: User Story 4](#phase-6-user-story-4---pr-merge-gate-priority-p2)
- [Phase 7: Polish](#phase-7-polish--cross-cutting-concerns)
- [Dependencies & Execution Order](#dependencies--execution-order)
- [Implementation Strategy](#implementation-strategy)

---

**Input**: Design documents from `/specs/001-ci-lint-test/`
**Prerequisites**: plan.md (required), spec.md (required), research.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 建立目錄結構和配置檔案

- [x] T001 Create `.github/workflows/` directory structure
- [x] T002 [P] Create `.golangci.yml` with default linter configuration at repo root

---

## Phase 2: Foundational (Workflow Skeleton & Path Filter)

**Purpose**: 建立 CI workflow 的骨架，包含 path filter 和 trigger 設定。所有 user story 都依賴這個基礎。

**⚠️ CRITICAL**: 所有 user story 的 jobs 都建立在這個骨架之上

- [x] T003 Create `.github/workflows/ci.yml` with workflow triggers (`on: push` to non-main branches + `pull_request`) and `changes` job using `dorny/paths-filter@v3` with three filter outputs: `api` (`api/**`), `terraform` (`terraform/**`), `web` (`web/**`)

**Checkpoint**: Workflow 骨架就緒 — push 到任何 branch 會觸發 `changes` job 並偵測路徑變更

---

## Phase 3: User Story 1 - Go API Lint & Test (Priority: P1) 🎯 MVP

**Goal**: 開發者 push Go API 程式碼時，CI 自動執行 golangci-lint 和 go test

**Independent Test**: 建立 PR 修改 `api/` 目錄，確認 Go lint + test job 觸發並通過

### Implementation for User Story 1

- [x] T004 [US1] Add `go-lint` job to `.github/workflows/ci.yml` — depends on `changes` job, runs `if: needs.changes.outputs.api == 'true'`, uses `actions/setup-go@v5` (Go 1.22) + `golangci/golangci-lint-action@v7` with `working-directory: api`
- [x] T005 [US1] Add `go-test` job to `.github/workflows/ci.yml` — depends on `changes` job, runs `if: needs.changes.outputs.api == 'true'`, uses `actions/setup-go@v5` (Go 1.22), runs `go test -v ./...` in `api/` directory
- [x] T006 [US1] Add `go-ci-status` wrapper job (name: `Go CI`) to `.github/workflows/ci.yml` — depends on `[changes, go-lint, go-test]`, uses `if: always()`, exits 0 if api not changed OR both jobs succeeded, exits 1 if either failed

**Checkpoint**: Push 到 `api/` 的變更會觸發 Go lint + test，`Go CI` status check 正確回報結果

---

## Phase 4: User Story 2 - Terraform Validate & Format Check (Priority: P1)

**Goal**: 開發者 push Terraform 程式碼時，CI 自動重用 Terratest `make test-validate` 驗證所有 modules

**Independent Test**: 建立 PR 修改 `terraform/` 目錄，確認 Terraform validate + fmt job 觸發並通過

### Implementation for User Story 2

- [x] T007 [US2] Add `terraform-validate` job to `.github/workflows/ci.yml` — depends on `changes` job, runs `if: needs.changes.outputs.terraform == 'true'`, uses `actions/setup-go@v5` (Go 1.22) + `hashicorp/setup-terraform@v3`, runs `cd terraform/test && make test-validate`
- [x] T008 [US2] Add `terraform-ci-status` wrapper job (name: `Terraform CI`) to `.github/workflows/ci.yml` — depends on `[changes, terraform-validate]`, uses `if: always()`, exits 0 if terraform not changed OR job succeeded, exits 1 if failed

**Checkpoint**: Push 到 `terraform/` 的變更會觸發 Terraform validate + fmt，`Terraform CI` status check 正確回報結果

---

## Phase 5: User Story 3 - Web Frontend Type Check & Build (Priority: P2)

**Goal**: 開發者 push Web 前端程式碼時，CI 自動執行 TypeScript type check 和 build 驗證

**Independent Test**: 建立 PR 修改 `web/` 目錄，確認 Web type check + build job 觸發並通過

### Implementation for User Story 3

- [x] T009 [US3] Add `web-check` job to `.github/workflows/ci.yml` — depends on `changes` job, runs `if: needs.changes.outputs.web == 'true'`, uses `actions/setup-node@v4` (Node LTS, cache: npm, cache-dependency-path: `web/package-lock.json`), runs `npm ci`, `npx tsc --noEmit`, `npm run build` all in `web/` directory
- [x] T010 [US3] Add `web-ci-status` wrapper job (name: `Web CI`) to `.github/workflows/ci.yml` — depends on `[changes, web-check]`, uses `if: always()`, exits 0 if web not changed OR job succeeded, exits 1 if failed

**Checkpoint**: Push 到 `web/` 的變更會觸發 TypeScript check + build，`Web CI` status check 正確回報結果

---

## Phase 6: User Story 4 - PR Merge Gate (Priority: P2)

**Goal**: 設定 branch protection rules，確保所有 CI 檢查通過才能 merge PR

**Independent Test**: 建立一個刻意失敗的 PR，確認 merge 按鈕被禁用

### Implementation for User Story 4

- [x] T011 [US4] Set branch protection rules on `main` branch via `gh api repos/avachen2005/avarobotics/branches/main/protection` — configure required status checks: `Go CI`, `Terraform CI`, `Web CI` with `strict: true`

**Checkpoint**: 未通過 CI 的 PR 無法被 merge

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 驗證跨組件行為和邊界情況

- [x] T012 Verify path filter skip behavior — push a docs-only change (e.g., `README.md`), confirm all three status checks pass as skipped
- [x] T013 Verify parallel execution — push a change touching `api/`, `terraform/`, and `web/` simultaneously, confirm all three real jobs run in parallel
- [x] T014 Fix any existing Go lint issues found by golangci-lint in `api/` directory (if CI fails on first run)
- [x] T015 Run quickstart.md validation steps from `specs/001-ci-lint-test/quickstart.md`
- [x] T016 Update `README.md` with CI pipeline documentation — add CI/CD section describing workflow architecture (path filter → conditional jobs → wrapper status checks), required checks (`Go CI`, `Terraform CI`, `Web CI`), and how to verify CI status on PRs

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Phase 2
- **User Story 2 (Phase 4)**: Depends on Phase 2 — can run in parallel with US1
- **User Story 3 (Phase 5)**: Depends on Phase 2 — can run in parallel with US1/US2
- **User Story 4 (Phase 6)**: Depends on Phases 3-5 (needs workflow jobs to exist before setting protection rules)
- **Polish (Phase 7)**: Depends on all user stories complete

### User Story Dependencies

- **US1 (Go CI)**: Independent — only needs foundational workflow skeleton
- **US2 (Terraform CI)**: Independent — only needs foundational workflow skeleton
- **US3 (Web CI)**: Independent — only needs foundational workflow skeleton
- **US4 (Branch Protection)**: Depends on US1+US2+US3 — wrapper job names must exist first

### Parallel Opportunities

- T001 and T002 can run in parallel (different files)
- T004 and T005 can run in parallel (different jobs in same file, but logically independent)
- US1, US2, US3 implementation phases can run in parallel (adding jobs to same workflow file, but independent sections)
- T012 and T013 can run in parallel (independent verification)

---

## Parallel Example: User Stories 1-3

```bash
# After Phase 2 (foundational) is complete, these can be implemented in parallel:

# US1: Go CI jobs
Task: "Add go-lint job to .github/workflows/ci.yml"
Task: "Add go-test job to .github/workflows/ci.yml"
Task: "Add go-ci-status wrapper job to .github/workflows/ci.yml"

# US2: Terraform CI jobs (parallel with US1)
Task: "Add terraform-validate job to .github/workflows/ci.yml"
Task: "Add terraform-ci-status wrapper job to .github/workflows/ci.yml"

# US3: Web CI jobs (parallel with US1/US2)
Task: "Add web-check job to .github/workflows/ci.yml"
Task: "Add web-ci-status wrapper job to .github/workflows/ci.yml"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T002)
2. Complete Phase 2: Foundational (T003)
3. Complete Phase 3: User Story 1 — Go CI (T004-T006)
4. **STOP and VALIDATE**: Push a PR changing `api/`, verify `Go CI` check works
5. This alone provides value — Go lint + test on every PR

### Incremental Delivery

1. Setup + Foundational → Workflow skeleton ready
2. Add US1 (Go CI) → Test independently → First CI check working (MVP!)
3. Add US2 (Terraform CI) → Test independently → Terraform coverage added
4. Add US3 (Web CI) → Test independently → Full pipeline coverage
5. Add US4 (Branch Protection) → Merge gate enforced
6. Polish → Verify edge cases

### Single Developer Strategy

Since all jobs are added to the same `ci.yml` file, the practical approach is:

1. T001-T003: Setup + skeleton
2. T004-T006: Add Go jobs + push to verify
3. T007-T008: Add Terraform jobs + push to verify
4. T009-T010: Add Web jobs + push to verify
5. T011: Set branch protection
6. T012-T015: Polish and verify edge cases

---

## Notes

- All CI jobs are added to a single file `.github/workflows/ci.yml`
- `.golangci.yml` is the only other new file
- Each task that modifies `ci.yml` adds a discrete section (job) — no conflicts between US tasks
- Wrapper jobs follow identical pattern — only the job names and dependency references differ
- Verification requires pushing to remote and creating a PR (local-only testing not possible for GitHub Actions)
