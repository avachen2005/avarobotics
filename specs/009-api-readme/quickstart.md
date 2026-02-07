# Quickstart: API README Documentation

Quick guide for implementing the API README feature.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Implementation Steps](#implementation-steps)
- [Validation](#validation)

---

## Prerequisites

- Access to the repository
- Go 1.22+ installed (to verify test coverage and run API locally)

## Implementation Steps

1. Create `api/README.md` with sections:
   - One-line summary + Table of Contents (per CLAUDE.md standard)
   - Quick Start (prerequisites, build, run)
   - API Endpoints table with curl examples
   - Testing & Coverage (commands + current percentage)
   - Project Structure
   - Deployment (placeholder for ECR, pending #46)

2. Run `go test -coverprofile=coverage.out ./...` in `api/` to get current coverage
3. Run `go tool cover -func=coverage.out` to get per-function breakdown
4. Document the actual numbers in the README

## Validation

1. **Endpoints match**: Every route in `cmd/server/main.go` is listed in the README
2. **Curl works**: Copy-paste each curl command from the README and verify it works against `go run ./cmd/server/`
3. **Coverage matches**: Run `go test -cover ./...` and verify the README percentage matches
4. **Quick start works**: Follow the README instructions from scratch and verify the server starts
