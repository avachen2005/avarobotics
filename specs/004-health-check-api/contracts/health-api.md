# API Contract: Health Check

**Feature**: 004-health-check-api
**Version**: 1.0.0

## Endpoint

### GET /health

檢查 API 服務的健康狀態。

**Request**

- Method: `GET`
- Path: `/health`
- Headers: 無特殊要求
- Body: 無

**Response**

| Status Code | Description | Body |
|-------------|-------------|------|
| 200 OK | 服務正常運作 | `HealthResponse` |
| 405 Method Not Allowed | 使用非 GET 方法 | 無 |

**HealthResponse Schema**

```json
{
  "status": "ok"
}
```

| Field  | Type   | Description |
|--------|--------|-------------|
| status | string | 固定值 `"ok"` 表示服務健康 |

**Example**

Request:
```http
GET /health HTTP/1.1
Host: api.example.com
```

Response:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "ok"
}
```

## OpenAPI Specification

```yaml
openapi: 3.0.3
info:
  title: Health Check API
  version: 1.0.0
paths:
  /health:
    get:
      summary: Check service health
      description: Returns the health status of the API service
      operationId: getHealth
      responses:
        '200':
          description: Service is healthy
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HealthResponse'
        '405':
          description: Method not allowed
components:
  schemas:
    HealthResponse:
      type: object
      required:
        - status
      properties:
        status:
          type: string
          enum: [ok]
          description: Health status indicator
          example: ok
```

## Test Scenarios

### TC-001: Successful health check

**Given** 服務正常運作
**When** 發送 GET /health
**Then** 回應 HTTP 200 和 `{"status": "ok"}`

### TC-002: Invalid method

**Given** 服務正常運作
**When** 發送 POST /health
**Then** 回應 HTTP 405 Method Not Allowed

### TC-003: Response content type

**Given** 服務正常運作
**When** 發送 GET /health
**Then** 回應 Content-Type 為 `application/json`
