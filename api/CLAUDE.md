# Go API

## Conventions
- Go 1.22+
- Follow [Effective Go](https://go.dev/doc/effective_go) and [Go Code Review Comments](https://go.dev/wiki/CodeReviewComments)
- Use `gofmt` and `golangci-lint` before committing

## Project Layout
Follow [golang-standards/project-layout](https://github.com/golang-standards/project-layout):
```
api/
├── cmd/              # Main applications
│   └── server/       # API server entry point
├── internal/         # Private application code
│   ├── handler/      # HTTP handlers
│   ├── service/      # Business logic
│   ├── repository/   # Data access
│   └── model/        # Domain models
├── pkg/              # Public library code
├── config/           # Configuration files
└── migrations/       # Database migrations
```

## Error Handling
- Always handle errors explicitly
- Wrap errors with context: `fmt.Errorf("failed to create user: %w", err)`
- Use custom error types for domain errors
- Return appropriate HTTP status codes

## Naming Conventions
- Packages: lowercase, single word preferred
- Interfaces: `-er` suffix when describing behavior (e.g., `Reader`, `UserService`)
- Avoid stuttering: `user.User` not `user.UserStruct`

## Testing
- Table-driven tests for multiple cases
- Use `_test.go` suffix
- Mock interfaces, not implementations
- Run: `go test ./...`

## API Design
- RESTful endpoints with consistent naming
- Use middleware for cross-cutting concerns (auth, logging, CORS)
- Version APIs: `/api/v1/...`
- Return JSON with consistent error format
