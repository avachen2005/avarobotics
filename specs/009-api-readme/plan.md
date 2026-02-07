# Implementation Plan: API README Documentation

Create `api/README.md` as the single source of truth for developers — documenting all endpoints with curl samples, test coverage, quick start, and project structure.

## Table of Contents

- [Summary](#summary)
- [Technical Context](#technical-context)
- [Constitution Check](#constitution-check)
- [Project Structure](#project-structure)

---

**Branch**: `009-api-readme` | **Date**: 2026-02-07 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/009-api-readme/spec.md`

## Summary

This is a documentation-only feature. The deliverable is a single file: `api/README.md`. No code changes are required. The README will document the current API state:

- **1 endpoint**: `GET /health` → 200 `{}`
- **Test coverage**: handler package 100%, total 13.6%
- **Server config**: port 8080 (configurable via `PORT` env var), graceful shutdown
- **Tech stack**: Go 1.22+, standard library only

## Technical Context

**Language/Version**: Markdown (documentation only)
**Primary Dependencies**: None — this is a docs-only feature
**Storage**: N/A
**Testing**: Manual verification — README content matches actual API behavior
**Target Platform**: GitHub repository (rendered by GitHub markdown)
**Project Type**: Documentation
**Performance Goals**: N/A
**Constraints**: Must follow CLAUDE.md documentation standards (one-line summary, ToC, horizontal separator)
**Scale/Scope**: Single file (`api/README.md`), ~100-150 lines

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution is not yet configured for this project (blank template). No gates to evaluate.

**Pre-design**: PASS (no violations)
**Post-design**: PASS (no violations)

## Project Structure

### Documentation (this feature)

```text
specs/009-api-readme/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (minimal — docs feature)
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── api-docs/
│       └── health.md    # GET /health endpoint documentation
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
api/
├── README.md            # ← NEW: The deliverable of this feature
├── cmd/
│   └── server/
│       └── main.go      # Server entry point (port 8080, graceful shutdown)
├── internal/
│   └── handler/
│       ├── health.go        # GET /health handler
│       └── health_test.go   # 4 tests, 100% handler coverage
├── .golangci.yml        # Linter configuration
└── go.mod               # Module: github.com/avarobotics/api (Go 1.22)
```

**Structure Decision**: No new directories needed. Single file `api/README.md` added to existing structure.
