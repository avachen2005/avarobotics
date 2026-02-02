# Data Model: Cognito Gmail Login

**Feature**: 003-cognito-gmail-login
**Date**: 2026-02-01

## Entities

### User (Cognito User Pool)

Represents an authenticated person in the system. Managed by AWS Cognito User Pool.

| Attribute | Type | Description | Source |
|-----------|------|-------------|--------|
| sub | string (UUID) | Unique user identifier | Cognito (auto-generated) |
| email | string | User's email address | Google OAuth |
| email_verified | boolean | Email verification status | Google OAuth (always true) |
| name | string | Display name | Google OAuth |
| picture | string (URL) | Profile picture URL | Google OAuth |
| identities | json | Linked identity providers | Cognito |
| created_at | timestamp | Account creation time | Cognito (custom attribute) |
| updated_at | timestamp | Last profile update | Cognito (custom attribute) |

**Identity Rules**:
- `sub` is the primary identifier (immutable)
- `email` is unique within the user pool
- Users are identified by Google's `sub` claim via federation

**Lifecycle**:
```
[Not Exists] ---(first Google sign-in)---> [Active]
[Active] ---(sign out)---> [Active] (session ends, user remains)
[Active] ---(admin disable)---> [Disabled]
```

### Session (Client-side)

Represents an active authentication session. Managed by Amplify SDK in browser storage.

| Attribute | Type | Description | Storage |
|-----------|------|-------------|---------|
| accessToken | JWT | Short-lived access token (1 hour) | localStorage |
| idToken | JWT | User identity claims | localStorage |
| refreshToken | string | Long-lived refresh token (10 years) | localStorage |
| clockDrift | number | Time sync offset | localStorage |

**Lifecycle**:
```
[No Session] ---(successful login)---> [Active]
[Active] ---(access token expires)---> [Refreshing] ---(refresh success)---> [Active]
[Active] ---(sign out)---> [No Session]
[Refreshing] ---(refresh fails)---> [No Session] (redirect to login)
```

## Relationships

```
┌─────────────────────┐
│    Google Account   │
│  (Identity Provider)│
└──────────┬──────────┘
           │ federates to
           ▼
┌─────────────────────┐
│   Cognito User      │
│   (User Pool)       │
│                     │
│  sub: uuid          │
│  email: string      │
│  name: string       │
│  picture: url       │
└──────────┬──────────┘
           │ creates
           ▼
┌─────────────────────┐
│   Session           │
│   (Browser)         │
│                     │
│  accessToken: jwt   │
│  idToken: jwt       │
│  refreshToken: str  │
└─────────────────────┘
```

## Validation Rules

| Entity | Field | Rule |
|--------|-------|------|
| User | email | Must be valid email format |
| User | email | Must be unique in user pool |
| User | name | Optional, max 256 characters |
| User | picture | Optional, must be valid URL if present |
| Session | accessToken | Must be valid JWT, not expired |
| Session | refreshToken | Must be valid, not revoked |

## Cognito User Pool Schema

Standard attributes (from Google):
- `email` (required, mutable)
- `name` (optional, mutable)
- `picture` (optional, mutable)

Custom attributes:
- `custom:created_at` (immutable, set on first sign-in)
- `custom:updated_at` (mutable, updated on each sign-in)

## Token Claims

### ID Token (from Cognito)

```json
{
  "sub": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "email": "user@gmail.com",
  "email_verified": true,
  "name": "John Doe",
  "picture": "https://lh3.googleusercontent.com/...",
  "cognito:username": "google_123456789",
  "iss": "https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_xxxxx",
  "aud": "client-id",
  "token_use": "id",
  "auth_time": 1706745600,
  "exp": 1706749200,
  "iat": 1706745600
}
```

### Access Token (from Cognito)

```json
{
  "sub": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "cognito:groups": [],
  "iss": "https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_xxxxx",
  "client_id": "client-id",
  "token_use": "access",
  "scope": "openid email profile",
  "auth_time": 1706745600,
  "exp": 1706749200,
  "iat": 1706745600,
  "username": "google_123456789"
}
```
