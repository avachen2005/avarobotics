# API: List User's Yoga Activities

## Endpoint

| Property | Value |
|----------|-------|
| **Method** | GET |
| **Path** | `/api/v1/activities` |
| **Authentication** | Required (Bearer Token) |
| **Content-Type** | application/json |

## Hostname

| Environment | URL |
|-------------|-----|
| Local | `http://localhost:8080` |
| Production | `https://api.yogaapp.example.com` |

## Headers

| Header | Required | Description | Example |
|--------|----------|-------------|---------|
| Authorization | Yes | Cognito Access Token | `Bearer eyJhbGciOiJSUzI1NiIs...` |
| Content-Type | No | Response format | `application/json` |

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| limit | integer | No | 20 | Number of activities to return (1-100) |
| cursor | string | No | - | Pagination cursor from previous response |

## Request

### First Page

```bash
curl -X GET "http://localhost:8080/api/v1/activities?limit=20" \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Subsequent Pages

```bash
curl -X GET "http://localhost:8080/api/v1/activities?limit=20&cursor=eyJjcmVhdGVkX2F0IjoiMjAyNi0wMi0wMVQxMjowMDowMFoifQ" \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Response

### Success (200 OK) - With Activities

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "user_id": "google_123456789",
      "type": "yoga_session",
      "title": "Morning Yoga Flow",
      "description": "30 minutes of sun salutations and stretching",
      "duration_minutes": 30,
      "created_at": "2026-02-02T08:00:00Z",
      "updated_at": "2026-02-02T08:00:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "user_id": "google_123456789",
      "type": "meditation",
      "title": "Evening Meditation",
      "description": null,
      "duration_minutes": 15,
      "created_at": "2026-02-01T20:00:00Z",
      "updated_at": "2026-02-01T20:00:00Z"
    }
  ],
  "pagination": {
    "next_cursor": "eyJjcmVhdGVkX2F0IjoiMjAyNi0wMi0wMVQxMjowMDowMFoifQ",
    "has_more": true
  }
}
```

### Success (200 OK) - Empty List

```json
{
  "data": [],
  "pagination": {
    "next_cursor": null,
    "has_more": false
  }
}
```

### Response Fields

#### Activity Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string (UUID) | Yes | Unique activity identifier |
| user_id | string | Yes | Owner's Cognito sub |
| type | string | Yes | Activity type (e.g., "yoga_session", "meditation") |
| title | string | Yes | Activity title (max 200 chars) |
| description | string | No | Optional detailed description (max 2000 chars) |
| duration_minutes | integer | Yes | Duration in minutes (>= 0) |
| created_at | string (ISO 8601) | Yes | Creation timestamp |
| updated_at | string (ISO 8601) | Yes | Last update timestamp |

#### Pagination Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| next_cursor | string | No | Cursor for next page (null if no more pages) |
| has_more | boolean | Yes | Whether more pages are available |

### Error (401 Unauthorized)

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Access token is invalid or expired"
  }
}
```

### Error (400 Bad Request)

```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Invalid limit parameter: must be between 1 and 100"
  }
}
```

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| UNAUTHORIZED | 401 | Token missing, invalid, or expired |
| BAD_REQUEST | 400 | Invalid query parameters |
| INTERNAL_ERROR | 500 | Server-side error |

## Pagination

- Uses cursor-based pagination (not offset-based)
- Cursor is opaque - do not parse or construct manually
- Activities are sorted by `created_at` descending (newest first)
- Pass `next_cursor` from previous response to get next page
- When `has_more` is false, no more pages available

## Implementation Notes

- Only returns activities owned by the authenticated user (user_id = JWT sub)
- Cursor encodes the `created_at` of the last item for efficient pagination
- Empty response (no activities) returns 200 with empty data array
- Activity creation is NOT part of this endpoint (future feature)
