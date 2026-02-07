# Ava Robotics API

Go HTTP API service for the Ava Robotics platform, built with Go 1.22+ and the standard library.

## Table of Contents

- [Quick Start](#quick-start)
- [API Endpoints](#api-endpoints)
- [Testing & Coverage](#testing--coverage)
- [Project Structure](#project-structure)
- [Deployment](#deployment)

---

## Quick Start

### Prerequisites

- [Go 1.22+](https://go.dev/dl/)

### Build & Run

```bash
# Run directly
go run ./cmd/server/

# Or build and run
go build -o server ./cmd/server/
./server
```

The server starts on port **8080** by default. Override with the `PORT` environment variable:

```bash
PORT=3000 go run ./cmd/server/
```

### Verify

```bash
curl -s http://localhost:8080/health
# Expected: {}
```

## API Endpoints

| Method | Path      | Description                        | Response |
|--------|-----------|------------------------------------|----------|
| GET    | `/health` | Health check — returns empty JSON  | 200 `{}` |

### Query Samples

#### GET /health

Check if the API service is running.

**Request:**

```bash
curl -s http://localhost:8080/health
```

**Response** (200 OK):

```json
{}
```

**Headers:**

| Header         | Value              |
|----------------|--------------------|
| Content-Type   | `application/json` |

**Error — Method Not Allowed** (405):

```bash
curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:8080/health
# Returns: 405
```

> For full endpoint documentation, see [specs/009-api-readme/contracts/api-docs/health.md](../specs/009-api-readme/contracts/api-docs/health.md).

## Testing & Coverage

### Current Coverage

| Package            | Coverage | Tests |
|--------------------|----------|-------|
| `internal/handler` | 100.0%   | 4     |
| `cmd/server`       | 0.0%     | 0     |
| **Total**          | **13.6%** | **4** |

> `cmd/server` contains only the `main()` bootstrap function which is not unit-testable.

### Run Tests

```bash
# Run all tests
go test -v ./...

# Run with race detection
go test -v -race ./...
```

### Generate Coverage Report

```bash
# Generate coverage profile
go test -coverprofile=coverage.out ./...

# View coverage by function
go tool cover -func=coverage.out

# Open HTML coverage report in browser
go tool cover -html=coverage.out
```

## Project Structure

```
api/
├── cmd/
│   └── server/
│       └── main.go              # Server entry point, route registration, graceful shutdown
├── internal/
│   └── handler/
│       ├── health.go            # GET /health handler
│       └── health_test.go       # Handler unit tests (4 tests)
├── .golangci.yml                # Linter configuration (golangci-lint v2)
├── go.mod                       # Go module: github.com/avarobotics/api
└── README.md                    # This file
```

## Deployment

> ECR repository and container image details will be documented here after the CodeBuild pipeline is set up. See [issue #46](https://github.com/avachen2005/avarobotics/issues/46) for progress.
