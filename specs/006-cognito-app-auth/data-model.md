# Data Model: App Cognito Authentication

**Branch**: `006-cognito-app-auth` | **Date**: 2026-02-02

## Entities

### User (from Cognito JWT)

Not persisted locally - extracted from validated JWT access token.

| Field | Type | Source | Description |
|-------|------|--------|-------------|
| sub | string | JWT claim | Unique user identifier from Cognito |
| email | string | JWT claim | User's email address |
| name | string | JWT claim (optional) | Display name from Google |
| picture | string | JWT claim (optional) | Profile picture URL from Google |

**Notes**:
- User data is not stored in the API database
- All user attributes come from the JWT token claims
- `sub` is the primary identifier for linking to other entities

### Activity

Persisted in database. Represents yoga sessions/exercises.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Unique activity identifier |
| user_id | string | NOT NULL, INDEX | Cognito `sub` of the owner |
| type | string | NOT NULL | Activity type (e.g., "yoga_session", "meditation") |
| title | string | NOT NULL, max 200 | Activity title |
| description | string | NULL, max 2000 | Optional detailed description |
| duration_minutes | integer | NOT NULL, >= 0 | Duration in minutes |
| created_at | timestamp | NOT NULL, DEFAULT now() | Creation timestamp |
| updated_at | timestamp | NOT NULL, DEFAULT now() | Last update timestamp |

**Indexes**:
- `idx_activity_user_id`: On `user_id` for user's activities lookup
- `idx_activity_user_created`: On `(user_id, created_at DESC)` for paginated listing

**Notes**:
- This feature only reads activities (list endpoint)
- Activity creation will be a separate future feature
- No foreign key to a users table (user_id references Cognito sub directly)

### Token Set (Mobile Only)

Stored securely on device. Not part of API data model.

| Field | Type | Storage | Description |
|-------|------|---------|-------------|
| access_token | string | Keychain/Keystore | JWT for API authentication |
| refresh_token | string | Keychain/Keystore | Token to refresh access_token |
| id_token | string | Keychain/Keystore | JWT with user identity claims |
| expires_at | timestamp | Keychain/Keystore | Access token expiration time |

**Notes**:
- iOS: Stored in Keychain with `kSecAttrAccessibleWhenUnlockedThisDeviceOnly`
- Android: Stored in EncryptedSharedPreferences backed by Keystore

## Relationships

```
┌─────────────────┐
│  Cognito User   │
│  (external)     │
│                 │
│  sub (PK)       │
│  email          │
│  name           │
│  picture        │
└────────┬────────┘
         │
         │ 1:N (user_id = sub)
         │
         ▼
┌─────────────────┐
│    Activity     │
│                 │
│  id (PK)        │
│  user_id (FK)   │
│  type           │
│  title          │
│  duration       │
│  created_at     │
└─────────────────┘
```

## State Transitions

### User Authentication State (Mobile)

```
┌─────────────┐
│  Anonymous  │
└──────┬──────┘
       │ Login with Google
       ▼
┌─────────────┐
│Authenticated│◄────────────────┐
└──────┬──────┘                 │
       │                        │ Token Refresh
       │ Access Token Expired   │ (automatic)
       ▼                        │
┌─────────────┐                 │
│  Refreshing │─────────────────┘
└──────┬──────┘
       │ Refresh Token Expired
       ▼
┌─────────────┐
│   Expired   │
└──────┬──────┘
       │ Re-login Required
       ▼
┌─────────────┐
│  Anonymous  │
└─────────────┘
```

## Validation Rules

### Activity

| Field | Rule |
|-------|------|
| id | Valid UUID v4 |
| user_id | Non-empty string, matches Cognito sub format |
| type | Non-empty string, alphanumeric with underscores |
| title | 1-200 characters |
| description | 0-2000 characters (optional) |
| duration_minutes | Integer >= 0 |
| created_at | Valid timestamp, not in future |
| updated_at | Valid timestamp, >= created_at |

### JWT Access Token

| Claim | Validation |
|-------|------------|
| iss | Must match `https://cognito-idp.{region}.amazonaws.com/{userPoolId}` |
| aud | Must match Cognito App Client ID |
| token_use | Must be "access" |
| exp | Must be in the future |
| sub | Must be non-empty string |
