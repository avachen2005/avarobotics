# Quickstart: Cognito Gmail Login

**Feature**: 003-cognito-gmail-login
**Environment**: dev (ap-northeast-1)

## Prerequisites

1. **AWS CLI** configured with `terraform-deploy` profile (via assume role)
2. **Terraform** >= 1.5.0 installed
3. **Node.js** >= 18.x and pnpm installed
4. **Google Cloud Console** access for OAuth credentials

## Quick Setup

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create or select a project
3. Navigate to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth client ID**
5. Select **Web application**
6. Add authorized redirect URI:
   ```
   https://dev-avarobotics.auth.ap-northeast-1.amazoncognito.com/oauth2/idpresponse
   ```
7. Save the **Client ID** and **Client Secret**

### 2. Deploy Cognito Infrastructure

```bash
cd terraform/environments/dev

# Set Google credentials (don't commit these!)
export TF_VAR_google_client_id="your-google-client-id"
export TF_VAR_google_client_secret="your-google-client-secret"

# Initialize and apply
AWS_PROFILE=terraform-deploy terraform init
AWS_PROFILE=terraform-deploy terraform apply -target=module.cognito
```

### 3. Get Cognito Outputs

```bash
# After successful apply
AWS_PROFILE=terraform-deploy terraform output cognito_user_pool_id
AWS_PROFILE=terraform-deploy terraform output cognito_client_id
AWS_PROFILE=terraform-deploy terraform output cognito_domain
```

### 4. Configure Web Application

Create `web/.env.local`:
```bash
VITE_COGNITO_USER_POOL_ID=ap-northeast-1_xxxxx
VITE_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_COGNITO_DOMAIN=dev-avarobotics
VITE_COGNITO_REGION=ap-northeast-1
VITE_REDIRECT_URI=http://localhost:5173
```

### 5. Install Dependencies and Run

```bash
cd web

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### 6. Test Login Flow

1. Open http://localhost:5173
2. You should be redirected to login page
3. Click "Sign in with Google"
4. Complete Google authentication
5. You should be redirected to Dashboard

## Verification Steps

### After Infrastructure Deployment

```bash
# 1. Verify user pool exists
aws cognito-idp describe-user-pool \
  --user-pool-id <USER_POOL_ID> \
  --profile terraform-deploy

# 2. Verify Google provider configured
aws cognito-idp describe-identity-provider \
  --user-pool-id <USER_POOL_ID> \
  --provider-name Google \
  --profile terraform-deploy

# 3. Test hosted UI is accessible
curl -I "https://dev-avarobotics.auth.ap-northeast-1.amazoncognito.com/login"
```

### After Frontend Setup

```bash
# 1. Check environment variables loaded
grep VITE_ web/.env.local

# 2. Verify Amplify configuration
pnpm dev  # Check console for Amplify init logs

# 3. Test auth flow in browser
# Open DevTools > Network tab
# Click "Sign in with Google"
# Verify redirect to Cognito hosted UI
```

## Common Operations

### View User Pool Users

```bash
aws cognito-idp list-users \
  --user-pool-id <USER_POOL_ID> \
  --profile terraform-deploy
```

### Check User Details

```bash
aws cognito-idp admin-get-user \
  --user-pool-id <USER_POOL_ID> \
  --username <USERNAME> \
  --profile terraform-deploy
```

### Disable a User

```bash
aws cognito-idp admin-disable-user \
  --user-pool-id <USER_POOL_ID> \
  --username <USERNAME> \
  --profile terraform-deploy
```

## Troubleshooting

### "Redirect URI mismatch" Error

**Cause**: Callback URL in Cognito doesn't match the app's redirect URI.

**Solution**:
1. Check `callback_urls` in Terraform matches your app URL
2. Verify Google OAuth credentials have the correct redirect URI
3. For local dev, ensure `http://localhost:5173` is in both

### "Invalid client" Error

**Cause**: Client ID mismatch or client doesn't exist.

**Solution**:
1. Verify `VITE_COGNITO_CLIENT_ID` matches Terraform output
2. Re-run `terraform output cognito_client_id`

### Session Not Persisting

**Cause**: Token storage issue or CORS problem.

**Solution**:
1. Check browser localStorage for Cognito tokens
2. Verify no CSP headers blocking localStorage
3. Check browser console for errors

### Google Login Shows "App Not Verified"

**Cause**: OAuth consent screen in development mode.

**Solution** (for production):
1. Complete Google's app verification process
2. Submit for OAuth verification in Google Cloud Console

**For development**: Click "Advanced" > "Go to [app name] (unsafe)"

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_COGNITO_USER_POOL_ID` | Cognito User Pool ID | `ap-northeast-1_AbCdEf123` |
| `VITE_COGNITO_CLIENT_ID` | Web App Client ID | `1abc2def3ghi4jkl5mno6pqr` |
| `VITE_COGNITO_DOMAIN` | Hosted UI domain prefix | `dev-avarobotics` |
| `VITE_COGNITO_REGION` | AWS Region | `ap-northeast-1` |
| `VITE_REDIRECT_URI` | OAuth callback URL | `http://localhost:5173` |

## Next Steps

1. Deploy IAM policy update with `terraform apply -target=module.iam`
2. Deploy Cognito resources with `terraform apply -target=module.cognito`
3. Set up Google OAuth credentials
4. Configure and run web application
5. Test complete login flow
