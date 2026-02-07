# Research: API README Documentation

Research findings for the API README feature.

## Table of Contents

- [README Structure](#readme-structure)
- [Test Coverage Data](#test-coverage-data)
- [API Endpoint Inventory](#api-endpoint-inventory)

---

## README Structure

**Decision**: Follow the CLAUDE.md documentation standard (one-line summary, ToC, horizontal separator) and include sections for: Quick Start, API Endpoints, Test Coverage, Project Structure, and Deployment (placeholder).

**Rationale**: Consistent with existing project documentation standards. Sections ordered by developer priority — endpoints first, then testing, then onboarding.

**Alternatives considered**:
- OpenAPI-generated docs: Overkill for 1 endpoint, adds tooling dependency
- Wiki-based docs: Not co-located with code, gets stale faster
- Godoc only: Doesn't provide curl samples or quick start

## Test Coverage Data

**Decision**: Document coverage by package with actual measured percentages.

**Current measurements** (2026-02-07):

| Package | Coverage | Tests |
|---------|----------|-------|
| `internal/handler` | 100.0% | 4 tests (3 unit + 1 table-driven with 3 sub-tests) |
| `cmd/server` | 0.0% | No tests (server bootstrap, not unit-testable) |
| **Total** | **13.6%** | **4 test functions** |

**Rationale**: Go's built-in `go test -coverprofile` is the standard tool. Total percentage is low because `cmd/server/main.go` bootstrap code isn't tested, but all handler logic is 100% covered.

## API Endpoint Inventory

**Decision**: Document all endpoints from `cmd/server/main.go` route registration.

**Current endpoints** (2026-02-07):

| Method | Path | Handler | Response | Status |
|--------|------|---------|----------|--------|
| GET | `/health` | `handler.HealthHandler` | 200 `{}` | Implemented |

**Server configuration**:
- Default port: 8080
- Port override: `PORT` environment variable
- Timeouts: Read 10s, Write 10s, Idle 60s
- Graceful shutdown: 30-second timeout on SIGINT/SIGTERM
