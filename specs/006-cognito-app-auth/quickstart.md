# Quickstart: App Cognito Authentication

**Branch**: `006-cognito-app-auth` | **Date**: 2026-02-02

## Prerequisites

### Environment Variables

```bash
# API Server
export COGNITO_REGION="ap-northeast-1"           # Your AWS region
export COGNITO_USER_POOL_ID="ap-northeast-1_xxx" # From Terraform output
export COGNITO_CLIENT_ID="xxxxxxxxxxxxxxxxxx"    # From Terraform output
export PORT="8080"                               # API port (default: 8080)

# Mobile Apps (configured in app)
# - Same COGNITO_REGION, COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID
# - COGNITO_DOMAIN: your-domain.auth.{region}.amazoncognito.com
```

### Tools Required

- Go 1.22+
- Xcode 15+ (for iOS)
- Android Studio Hedgehog+ (for Android)
- AWS CLI (for Cognito setup verification)

## API Server

### 1. Install Dependencies

```bash
cd api
go mod tidy
```

### 2. Run Server

```bash
go run ./cmd/server
```

### 3. Test Health Endpoint

```bash
curl http://localhost:8080/health
# {"status":"ok"}
```

### 4. Test Protected Endpoint (requires valid Cognito token)

```bash
# Get a token from Cognito first (see Mobile section)
TOKEN="your-access-token"

curl -H "Authorization: Bearer $TOKEN" http://localhost:8080/api/v1/me
# {"sub":"google_123","email":"user@gmail.com","name":"User Name"}
```

## iOS App

### 1. Open Project

```bash
cd ios
open YogaApp.xcodeproj
```

### 2. Configure Cognito

Edit `YogaApp/Config/AWSConfig.swift`:
```swift
struct AWSConfig {
    static let region = "ap-northeast-1"
    static let userPoolId = "ap-northeast-1_xxx"
    static let clientId = "xxxxxxxxxxxxxxxxxx"
    static let domain = "your-domain.auth.ap-northeast-1.amazoncognito.com"
}
```

### 3. Run on Simulator

Select iPhone 15 simulator and press ⌘R

### 4. Test Login Flow

1. Tap "Sign in with Google"
2. Complete Google authentication in browser
3. Verify redirect back to app
4. Check profile screen shows user info

## Android App

### 1. Open Project

```bash
cd android
# Open with Android Studio
```

### 2. Configure Cognito

Edit `app/src/main/res/values/aws_config.xml`:
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="cognito_region">ap-northeast-1</string>
    <string name="cognito_user_pool_id">ap-northeast-1_xxx</string>
    <string name="cognito_client_id">xxxxxxxxxxxxxxxxxx</string>
    <string name="cognito_domain">your-domain.auth.ap-northeast-1.amazoncognito.com</string>
</resources>
```

### 3. Run on Emulator

Select Pixel 7 API 34 emulator and press ▶️

### 4. Test Login Flow

1. Tap "Sign in with Google"
2. Complete Google authentication in Chrome
3. Verify redirect back to app
4. Check profile screen shows user info

## Verification Checklist

### API

- [ ] `GET /health` returns `{"status":"ok"}`
- [ ] `GET /api/v1/me` without token returns 401
- [ ] `GET /api/v1/me` with valid token returns user info
- [ ] `GET /api/v1/activities` returns paginated list (or empty list)
- [ ] Invalid token returns 401 with error message

### Mobile (iOS & Android)

- [ ] Login button visible on launch
- [ ] Google sign-in flow completes
- [ ] Tokens stored securely (verify no plain text in logs)
- [ ] Profile screen shows email and name
- [ ] Activities screen loads (may be empty)
- [ ] Sign out clears tokens and returns to login
- [ ] App restart with valid tokens auto-authenticates
- [ ] Token refresh works when access token expires

## Troubleshooting

### "Invalid token" error

1. Check COGNITO_USER_POOL_ID and COGNITO_CLIENT_ID match
2. Verify token hasn't expired (access tokens last 1 hour)
3. Check API server logs for specific validation error

### Mobile app doesn't redirect after login

1. Verify callback URLs in Cognito console include your app's scheme
2. iOS: Check URL scheme in Info.plist
3. Android: Check intent filter in AndroidManifest.xml

### JWKS fetch fails

1. Check COGNITO_REGION is correct
2. Verify network connectivity to AWS
3. Check for firewall blocking *.amazonaws.com

## API Endpoints Reference

| Method | Path | Auth | Response |
|--------|------|------|----------|
| GET | /health | No | `{"status":"ok"}` |
| GET | /api/v1/me | Yes | User profile JSON |
| GET | /api/v1/activities | Yes | Paginated activities |

See [contracts/openapi.yaml](./contracts/openapi.yaml) for full API specification.
