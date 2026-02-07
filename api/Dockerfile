# Stage 1: Build
FROM golang:1.22-alpine AS builder

WORKDIR /src

# Copy go.mod first for better layer caching
COPY go.mod ./
RUN go mod download

# Copy source code
COPY . .

# Build static binary
RUN CGO_ENABLED=0 go build -o /api ./cmd/server

# Stage 2: Final
FROM scratch

COPY --from=builder /api /api

EXPOSE 8080

ENTRYPOINT ["/api"]
