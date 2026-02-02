# Research: App Cognito Authentication

**Branch**: `006-cognito-app-auth` | **Date**: 2026-02-02

## Research Topics

### 1. Go JWT Validation for Cognito Tokens

**Decision**: Use `github.com/golang-jwt/jwt/v5` with JWKS fetching

**Rationale**:
- Industry standard JWT library for Go
- Supports RS256 algorithm used by Cognito
- Built-in claims validation (exp, iss, aud)
- Active maintenance and security updates

**Alternatives Considered**:
- `github.com/lestrrat-go/jwx`: More features but heavier dependency
- Manual validation: Error-prone, not recommended for production

**Implementation Notes**:
- Fetch JWKS from `https://cognito-idp.{region}.amazonaws.com/{userPoolId}/.well-known/jwks.json`
- Cache JWKS with TTL (1 hour recommended)
- Validate: issuer, audience (client_id), expiration, token_use (access)

### 2. Cognito Token Types and Usage

**Decision**: Validate Access Token for API authentication

**Rationale**:
- Access Token: Contains OAuth scopes, designed for API authorization
- ID Token: Contains user identity claims, used for frontend user display
- Refresh Token: Server-side only, never sent to API

**Token Flow**:
```
Mobile App:
1. User clicks "Sign in with Google"
2. Cognito Hosted UI handles OAuth
3. App receives: access_token, id_token, refresh_token
4. App stores all tokens securely
5. API calls: Authorization: Bearer {access_token}
6. When expired: Use refresh_token to get new access_token
```

**Alternatives Considered**:
- Validate ID Token: Contains user info but not designed for API auth
- Custom tokens: Adds complexity, Cognito handles this well

### 3. Mobile Token Storage

**Decision**: Platform-specific secure storage

**iOS (Keychain)**:
- Use Keychain Services API
- Store tokens with `kSecAttrAccessibleWhenUnlockedThisDeviceOnly`
- AWS Amplify handles this automatically if used

**Android (EncryptedSharedPreferences)**:
- Use AndroidX Security library
- Backed by Android Keystore
- Automatic encryption/decryption

**Rationale**:
- Platform-recommended secure storage
- Survives app restarts
- Protected by device authentication

**Alternatives Considered**:
- UserDefaults/SharedPreferences: Not secure, tokens visible
- File storage: Requires manual encryption
- In-memory only: Lost on app restart

### 4. Token Refresh Strategy

**Decision**: Proactive refresh with retry queue

**Strategy**:
1. Check token expiration before each API call
2. If < 5 minutes remaining, refresh proactively
3. If expired during call, queue requests, refresh, retry all
4. If refresh fails (refresh token expired), redirect to login

**Rationale**:
- Minimizes user-visible auth failures
- Handles race conditions (multiple simultaneous requests)
- Cognito refresh endpoint: POST to token endpoint with grant_type=refresh_token

**Alternatives Considered**:
- Reactive only: Causes visible failures on first expired request
- Background timer: Battery/resource concerns on mobile

### 5. API Endpoint Design

**Decision**: RESTful endpoints with standard patterns

**Endpoints**:
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /health | No | Health check (existing) |
| GET | /api/v1/me | Yes | Get current user profile |
| GET | /api/v1/activities | Yes | List yoga activities (paginated) |

**Rationale**:
- `/api/v1` prefix for versioning
- `/me` convention for current user (no ID in URL)
- Standard pagination with `?page=1&limit=20`

**Alternatives Considered**:
- `/users/me`: More RESTful but longer
- GraphQL: Overkill for simple queries

### 6. Error Response Format

**Decision**: Consistent JSON error format

**Format**:
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Access token is invalid or expired"
  }
}
```

**HTTP Status Codes**:
- 401 Unauthorized: Invalid/expired token
- 403 Forbidden: Valid token but insufficient permissions
- 400 Bad Request: Malformed request
- 500 Internal Server Error: Server-side failure

**Rationale**:
- Machine-readable error codes
- Human-readable messages
- Consistent structure across all endpoints

### 7. Activity Data Model

**Decision**: Simple structure for MVP, extensible for future

**Schema**:
```
Activity:
  - id: UUID (primary key)
  - user_id: String (Cognito sub)
  - type: String (e.g., "yoga_session", "meditation")
  - title: String
  - description: String (optional)
  - duration_minutes: Integer
  - created_at: Timestamp
  - updated_at: Timestamp
```

**Rationale**:
- user_id links to Cognito sub (no local user table needed)
- Type field allows future activity types
- Duration in minutes for simplicity

**Note**: This feature only reads activities. Creation is a future feature.

### 8. Pagination Strategy

**Decision**: Cursor-based pagination with limit

**Request**: `GET /api/v1/activities?limit=20&cursor=abc123`

**Response**:
```json
{
  "data": [...],
  "pagination": {
    "next_cursor": "xyz789",
    "has_more": true
  }
}
```

**Rationale**:
- Cursor-based avoids offset issues with changing data
- Cursor is opaque (encoded timestamp or ID)
- Simpler for infinite scroll on mobile

**Alternatives Considered**:
- Offset/limit: Issues with concurrent inserts/deletes
- Page numbers: Same issues as offset

## Summary

All technical decisions made. No NEEDS CLARIFICATION items remaining.

| Area | Decision |
|------|----------|
| JWT Library | github.com/golang-jwt/jwt/v5 |
| Token Validated | Access Token |
| iOS Storage | Keychain |
| Android Storage | EncryptedSharedPreferences |
| Refresh Strategy | Proactive with retry queue |
| API Style | REST with /api/v1 prefix |
| Pagination | Cursor-based |
