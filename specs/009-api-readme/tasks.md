# Tasks: API README Documentation

Create `api/README.md` with API endpoints, curl samples, test coverage, quick start, and project structure.

## Table of Contents

- [Phase 1: Setup](#phase-1-setup)
- [Phase 2: User Story 1](#phase-2-user-story-1---api-endpoints--query-samples-priority-p1--mvp)
- [Phase 3: User Story 2](#phase-3-user-story-2---test-coverage-priority-p2)
- [Phase 4: User Story 3](#phase-4-user-story-3---quick-start--project-overview-priority-p3)
- [Phase 5: Polish](#phase-5-polish--cross-cutting-concerns)
- [Dependencies & Execution Order](#dependencies--execution-order)
- [Implementation Strategy](#implementation-strategy)

---

**Input**: Design documents from `/specs/009-api-readme/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, contracts/api-docs/health.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup

**Purpose**: Create the README file with document structure (title, ToC, separator per CLAUDE.md standard)

- [x] T001 Create `api/README.md` with title "Ava Robotics API", one-line summary, Table of Contents linking to all sections (Quick Start, API Endpoints, Testing & Coverage, Project Structure, Deployment), and horizontal separator per CLAUDE.md documentation standard

---

## Phase 2: User Story 1 - API Endpoints & Query Samples (Priority: P1) 🎯 MVP

**Goal**: Every implemented endpoint is listed with method, path, description, and a copy-paste curl example.

**Independent Test**: Open `api/README.md` and verify the endpoints table lists `GET /health`, and the curl example returns `{}` when run against a local server.

### Implementation for User Story 1

- [x] T002 [US1] Add "API Endpoints" section to `api/README.md` with a table (columns: Method, Path, Description, Response) listing `GET /health` → 200 `{}`
- [x] T003 [US1] Add "Query Samples" subsection to `api/README.md` under API Endpoints with a curl command example for `GET /health` showing the full request and expected response, referencing `contracts/api-docs/health.md` for details

**Checkpoint**: At this point, developers can see all endpoints and test them with curl. This is the MVP.

---

## Phase 3: User Story 2 - Test Coverage (Priority: P2)

**Goal**: Developers can see current test coverage and know how to run tests locally.

**Independent Test**: Open `api/README.md`, verify coverage percentage is listed, then run the documented test commands in `api/` and confirm output matches.

### Implementation for User Story 2

- [x] T004 [US2] Run `go test -coverprofile=coverage.out ./...` and `go tool cover -func=coverage.out` in `api/` to measure current coverage, then add "Testing & Coverage" section to `api/README.md` with:
  - Current coverage table by package (handler: 100%, cmd/server: 0%, total: 13.6%)
  - Commands to run tests: `go test -v ./...`
  - Commands to generate coverage report: `go test -coverprofile=coverage.out ./...` and `go tool cover -func=coverage.out`

**Checkpoint**: At this point, developers can see test coverage and run tests locally.

---

## Phase 4: User Story 3 - Quick Start & Project Overview (Priority: P3)

**Goal**: A new developer can understand the project and run the API locally by following only the README.

**Independent Test**: Follow the README quick start instructions from scratch — the server should start on port 8080 and `curl localhost:8080/health` returns `{}`.

### Implementation for User Story 3

- [x] T005 [P] [US3] Add "Quick Start" section to `api/README.md` with: prerequisites (Go 1.22+), build command (`go build ./cmd/server/`), run command (`go run ./cmd/server/`), port configuration (`PORT` env var, default 8080), and verification curl command
- [x] T006 [P] [US3] Add "Project Structure" section to `api/README.md` with directory tree showing `cmd/server/`, `internal/handler/`, `.golangci.yml`, `go.mod` and brief descriptions of each
- [x] T007 [US3] Add "Deployment" placeholder section to `api/README.md` noting ECR info will be added after CodeBuild setup (issue #46)

**Checkpoint**: All user stories complete — README is the single source of truth for the API.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Validation and final checks

- [x] T008 Validate README by starting the API server (`go run ./cmd/server/` in `api/`), running each curl example from the README, and verifying the output matches the documented response
- [x] T009 Validate coverage by running the test commands from the README and confirming the percentage matches the documented value in `api/README.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **User Story 1 (Phase 2)**: Depends on T001 (README file exists)
- **User Story 2 (Phase 3)**: Depends on T001 (README file exists). Independent of US1
- **User Story 3 (Phase 4)**: Depends on T001 (README file exists). Independent of US1 and US2
- **Polish (Phase 5)**: Depends on all user stories complete

### User Story Dependencies

- **User Story 1 (P1)**: Independent — only needs Setup
- **User Story 2 (P2)**: Independent — only needs Setup
- **User Story 3 (P3)**: Independent — only needs Setup

### Parallel Opportunities

- T002 and T003 are sequential (T003 adds subsection under T002's section)
- T005, T006 can run in parallel (different sections of the README)
- US1, US2, US3 could be parallelized after Setup (different sections, no conflicts) but since they're all in one file, sequential is safer to avoid merge conflicts

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001)
2. Complete Phase 2: User Story 1 (T002, T003)
3. **STOP and VALIDATE**: Verify endpoints table and curl examples work
4. This alone delivers value — every developer can see API endpoints and test them

### Incremental Delivery

1. Setup (T001) → README file created
2. Add User Story 1 (T002-T003) → Endpoints + curl samples → **MVP!**
3. Add User Story 2 (T004) → Test coverage documented
4. Add User Story 3 (T005-T007) → Quick start + project structure + deployment placeholder
5. Polish (T008-T009) → Validate everything is accurate

---

## Notes

- [P] tasks = different sections, no dependencies
- [Story] label maps task to specific user story for traceability
- All tasks modify a single file (`api/README.md`) — execute sequentially to avoid conflicts
- Commit after each user story phase for clean history
- This is a docs-only feature — no code changes required
