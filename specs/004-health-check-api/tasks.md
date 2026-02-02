# Tasks: Health Check API

**Input**: Design documents from `/specs/004-health-check-api/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1)
- Include exact file paths in descriptions

## Path Conventions

- **API Backend**: `api/` at repository root
- Structure follows golang-standards/project-layout per plan.md

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Initialize Go project structure and dependencies

- [x] T001 Create Go module at `api/go.mod` with module name `github.com/avarobotics/api`
- [x] T002 Create `api/cmd/server/` directory for server entry point
- [x] T003 [P] Create `api/internal/handler/` directory for HTTP handlers

---

## Phase 2: Foundational (Server Infrastructure)

**Purpose**: Basic HTTP server that MUST be complete before user story implementation

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create HTTP server entry point at `api/cmd/server/main.go` with basic routing
- [x] T005 Configure server to listen on configurable port (default 8080)
- [x] T006 Add graceful shutdown support in `api/cmd/server/main.go`

**Checkpoint**: Server can start and accept HTTP requests

---

## Phase 3: User Story 1 - Basic Health Check (Priority: P1) 🎯 MVP

**Goal**: 運維人員或監控系統可以呼叫 Health Check 端點來驗證 API 服務是否正常運作

**Independent Test**: 發送 GET /health，驗證收到 HTTP 200 和 `{"status": "ok"}`

### Implementation for User Story 1

- [x] T007 [US1] Create HealthResponse struct in `api/internal/handler/health.go`
- [x] T008 [US1] Implement HealthHandler function in `api/internal/handler/health.go`
- [x] T009 [US1] Set Content-Type header to `application/json` in handler
- [x] T010 [US1] Register `/health` route in `api/cmd/server/main.go`
- [x] T011 [US1] Create unit tests in `api/internal/handler/health_test.go`

**Checkpoint**: Health Check API is fully functional - `GET /health` returns `{"status": "ok"}` with HTTP 200

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Improvements and validation

- [x] T012 [P] Add method validation (return 405 for non-GET requests) in `api/internal/handler/health.go`
- [x] T013 Run `go test ./...` to verify all tests pass
- [x] T014 Run quickstart.md validation steps to verify complete flow
- [x] T015 [P] Update `api/CLAUDE.md` if needed with new patterns

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS user story
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion
- **Polish (Phase 4)**: Depends on User Story 1 being complete

### Within Each Phase

- T001 must complete before T002, T003
- T004 must complete before T005, T006
- T007, T008 must complete before T009
- T010 must complete before T011

### Parallel Opportunities

- T002, T003 can run in parallel (different directories)
- T012, T015 can run in parallel (different files)

---

## Parallel Example: Phase 1 Setup

```bash
# Launch directory creation in parallel:
Task: "Create api/cmd/server/ directory"
Task: "Create api/internal/handler/ directory"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (create basic server)
3. Complete Phase 3: User Story 1 (health check endpoint)
4. **STOP and VALIDATE**: Test with `curl http://localhost:8080/health`
5. Deploy if ready

### Validation Commands

```bash
# After Phase 2 (Foundational) - Verify server starts
cd api && go run cmd/server/main.go &
curl -i http://localhost:8080/  # Should return 404 or empty

# After Phase 3 (User Story 1) - Test health check
curl -i http://localhost:8080/health
# Expected: HTTP 200, {"status": "ok"}

# Run all tests
cd api && go test -v ./...
```

---

## Notes

- [P] tasks = different files, no dependencies
- [US1] label maps task to User Story 1 (Basic Health Check)
- This is a simple single-story feature with minimal dependencies
- Total tasks: 15
