# API: Health Check

## Endpoint

| Property | Value |
|----------|-------|
| **Method** | GET |
| **Path** | `/health` |
| **Authentication** | Not Required |
| **Content-Type** | application/json |

## Hostname

| Environment | URL |
|-------------|-----|
| Local | `http://localhost:8080` |
| Production | `https://api.yogaapp.example.com` |

## Headers

_No required headers_

## Parameters

_No query parameters_

## Request

```bash
curl -X GET "http://localhost:8080/health"
```

## Response

### Success (200 OK)

```json
{
  "status": "ok"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| status | string | Yes | Server health status ("ok" when healthy) |

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| INTERNAL_ERROR | 500 | Server is unhealthy |

## Implementation Notes

- This endpoint is used by load balancers and container orchestration (Kubernetes) for health checks
- No authentication required - must be publicly accessible
- Should return quickly (< 100ms)
- Already implemented in `api/internal/handler/health.go`
