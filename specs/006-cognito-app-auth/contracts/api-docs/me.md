# API: Get Current User Profile

## Endpoint

| Property | Value |
|----------|-------|
| **Method** | GET |
| **Path** | `/api/v1/me` |
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

_No query parameters_

## Request

```bash
curl -X GET "http://localhost:8080/api/v1/me" \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Response

### Success (200 OK)

```json
{
  "sub": "google_123456789",
  "email": "user@gmail.com",
  "name": "Ava Chen",
  "picture": "https://lh3.googleusercontent.com/a/ACg8ocK..."
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| sub | string | Yes | Unique user identifier from Cognito |
| email | string | Yes | User's email address |
| name | string | No | Display name from Google account |
| picture | string | No | Profile picture URL from Google |

### Error (401 Unauthorized)

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Access token is invalid or expired"
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| error.code | string | Machine-readable error code |
| error.message | string | Human-readable error message |

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| UNAUTHORIZED | 401 | Token missing, invalid, or expired |
| INTERNAL_ERROR | 500 | Server-side error |

## Implementation Notes

- User data is extracted from the validated JWT access token claims
- No database lookup required - all data comes from token
- Token validation uses Cognito JWKS (cached for 1 hour)
