# Research: Cognito Gmail Login

**Feature**: 003-cognito-gmail-login
**Date**: 2026-02-01

## Research Topics

### 1. AWS Cognito with Google OAuth Integration

**Decision**: Use AWS Cognito User Pool with Google as a federated identity provider

**Rationale**:
- Cognito handles OAuth flow complexity (token exchange, refresh, validation)
- Built-in user pool stores user profiles automatically
- Supports indefinite sessions via refresh tokens (aligns with spec requirement)
- Native integration with other AWS services
- No need to build/maintain custom auth server

**Alternatives Considered**:
- Direct Google OAuth (rejected: requires custom backend for token management)
- Auth0 (rejected: additional cost, more complexity for AWS-native project)
- Firebase Auth (rejected: not AWS-native, mixing cloud providers)

### 2. Frontend Authentication Library

**Decision**: AWS Amplify JavaScript SDK v6

**Rationale**:
- Official AWS SDK for Cognito integration in web apps
- Handles OAuth redirect flow automatically
- Built-in token storage and refresh
- React-friendly with hooks support
- Actively maintained, well-documented

**Alternatives Considered**:
- amazon-cognito-identity-js (rejected: lower-level, more boilerplate)
- Custom fetch-based implementation (rejected: unnecessary complexity)

### 3. Token Storage Strategy

**Decision**: Use Amplify's default storage (localStorage for tokens)

**Rationale**:
- Supports persistent sessions (survives browser restart)
- Amplify handles token refresh automatically
- Standard approach for SPAs
- XSS risk mitigated by not exposing tokens in JavaScript (Amplify manages internally)

**Alternatives Considered**:
- HTTP-only cookies (rejected: requires backend, adds complexity)
- sessionStorage (rejected: doesn't persist across browser sessions)
- Memory only (rejected: loses auth on page refresh)

### 4. Cognito Refresh Token Duration

**Decision**: Set refresh token expiration to maximum (3650 days / 10 years)

**Rationale**:
- Spec requires sessions to persist until explicit logout
- Cognito refresh tokens can be set up to 10 years
- Access tokens (1 hour) are refreshed automatically using refresh token
- User must explicitly sign out to end session

**Configuration**:
```hcl
token_validity_units {
  access_token  = "hours"
  id_token      = "hours"
  refresh_token = "days"
}

access_token_validity  = 1      # 1 hour
id_token_validity      = 1      # 1 hour
refresh_token_validity = 3650   # 10 years (max)
```

### 5. Google OAuth Scopes

**Decision**: Request `openid`, `email`, `profile` scopes

**Rationale**:
- `openid`: Required for OIDC authentication
- `email`: Get user's email address (FR-004)
- `profile`: Get display name and picture URL (FR-005)
- Minimal scopes following least-privilege principle

### 6. Terraform Cognito Module Structure

**Decision**: Create dedicated `terraform/modules/cognito/` module

**Rationale**:
- Follows existing module pattern (iam, networking, security, etc.)
- Separation of concerns
- Reusable across environments
- Consistent with CLAUDE.md conventions

**Resources Required**:
- `aws_cognito_user_pool` - Main user pool
- `aws_cognito_user_pool_client` - App client for web
- `aws_cognito_user_pool_domain` - Hosted UI domain
- `aws_cognito_identity_provider` - Google OAuth provider

### 7. IAM Permissions for Cognito

**Decision**: Create new `cognito.json` policy, attach to TerraformDeployRole

**Required Permissions**:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CognitoUserPoolManagement",
      "Effect": "Allow",
      "Action": [
        "cognito-idp:CreateUserPool",
        "cognito-idp:DeleteUserPool",
        "cognito-idp:DescribeUserPool",
        "cognito-idp:UpdateUserPool",
        "cognito-idp:CreateUserPoolClient",
        "cognito-idp:DeleteUserPoolClient",
        "cognito-idp:DescribeUserPoolClient",
        "cognito-idp:UpdateUserPoolClient",
        "cognito-idp:CreateUserPoolDomain",
        "cognito-idp:DeleteUserPoolDomain",
        "cognito-idp:DescribeUserPoolDomain",
        "cognito-idp:CreateIdentityProvider",
        "cognito-idp:DeleteIdentityProvider",
        "cognito-idp:DescribeIdentityProvider",
        "cognito-idp:UpdateIdentityProvider",
        "cognito-idp:TagResource",
        "cognito-idp:UntagResource",
        "cognito-idp:ListTagsForResource"
      ],
      "Resource": "*"
    }
  ]
}
```

### 8. Google OAuth App Configuration

**Decision**: Create Google OAuth 2.0 credentials in Google Cloud Console

**Setup Steps**:
1. Create project in Google Cloud Console (or use existing)
2. Enable Google+ API (for profile info)
3. Configure OAuth consent screen
4. Create OAuth 2.0 Client ID (Web application type)
5. Add authorized redirect URI from Cognito domain

**Callback URL Format**:
```
https://<cognito-domain>.auth.<region>.amazoncognito.com/oauth2/idpresponse
```

### 9. React Router Integration

**Decision**: Use React Router v6 with auth guard pattern

**Rationale**:
- Standard routing solution for React
- Supports protected route patterns
- Works well with Amplify auth state

**Pattern**:
```tsx
// AuthGuard wraps protected routes
<Route path="/dashboard" element={<AuthGuard><DashboardPage /></AuthGuard>} />
<Route path="/login" element={<LoginPage />} />
```

### 10. Environment Configuration

**Decision**: Use environment variables for Cognito configuration

**Variables**:
```
VITE_COGNITO_USER_POOL_ID=ap-northeast-1_xxxxx
VITE_COGNITO_CLIENT_ID=xxxxxxxxxx
VITE_COGNITO_DOMAIN=avarobotics-dev
VITE_COGNITO_REDIRECT_URI=http://localhost:5173
```

**Rationale**:
- Vite supports VITE_ prefixed env vars
- Keeps secrets out of code
- Different values per environment (dev/staging/prod)

## Open Questions (Resolved)

| Question | Resolution |
|----------|------------|
| Domain restriction? | No - any Google account allowed (clarified in spec) |
| Session duration? | Indefinite until logout (clarified in spec) |
| Post-login redirect? | Dashboard/Home page (clarified in spec) |
| Public pages? | None except login page (clarified in spec) |

## Dependencies

| Dependency | Version | Purpose |
|------------|---------|---------|
| @aws-amplify/auth | ^6.x | Cognito authentication |
| @aws-amplify/core | ^6.x | Amplify core utilities |
| react-router-dom | ^6.x | Client-side routing |
