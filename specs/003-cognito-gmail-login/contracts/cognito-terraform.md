# Contract: Cognito Terraform Module

**Feature**: 003-cognito-gmail-login
**Type**: Terraform Module Interface

## Module: `terraform/modules/cognito`

### Input Variables

```hcl
variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "avarobotics"
}

variable "google_client_id" {
  description = "Google OAuth Client ID"
  type        = string
  sensitive   = true
}

variable "google_client_secret" {
  description = "Google OAuth Client Secret"
  type        = string
  sensitive   = true
}

variable "callback_urls" {
  description = "Allowed OAuth callback URLs"
  type        = list(string)
  default     = ["http://localhost:5173"]
}

variable "logout_urls" {
  description = "Allowed logout redirect URLs"
  type        = list(string)
  default     = ["http://localhost:5173/login"]
}

variable "domain_prefix" {
  description = "Cognito domain prefix (must be globally unique)"
  type        = string
}

variable "refresh_token_validity_days" {
  description = "Refresh token validity in days"
  type        = number
  default     = 3650  # 10 years (max allowed)
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}
```

### Output Values

```hcl
output "user_pool_id" {
  description = "Cognito User Pool ID"
  value       = aws_cognito_user_pool.main.id
}

output "user_pool_arn" {
  description = "Cognito User Pool ARN"
  value       = aws_cognito_user_pool.main.arn
}

output "client_id" {
  description = "Cognito App Client ID"
  value       = aws_cognito_user_pool_client.web.id
}

output "domain" {
  description = "Cognito hosted UI domain"
  value       = aws_cognito_user_pool_domain.main.domain
}

output "hosted_ui_url" {
  description = "Full Cognito hosted UI URL"
  value       = "https://${aws_cognito_user_pool_domain.main.domain}.auth.${data.aws_region.current.name}.amazoncognito.com"
}
```

### Resources Created

| Resource | Name Pattern | Purpose |
|----------|--------------|---------|
| `aws_cognito_user_pool` | `{env}-{project}-users` | Main user pool |
| `aws_cognito_user_pool_client` | `{env}-{project}-web-client` | Web app client |
| `aws_cognito_user_pool_domain` | `{domain_prefix}` | Hosted UI domain |
| `aws_cognito_identity_provider` | `Google` | Google OAuth provider |

### User Pool Configuration

```hcl
# User Pool Settings
auto_verified_attributes = ["email"]
username_attributes      = ["email"]

# Password policy (not used for federated users, but required)
password_policy {
  minimum_length    = 8
  require_lowercase = true
  require_numbers   = true
  require_symbols   = false
  require_uppercase = true
}

# Schema (attributes from Google)
schema {
  name                = "email"
  attribute_data_type = "String"
  required            = true
  mutable             = true
}

schema {
  name                = "name"
  attribute_data_type = "String"
  required            = false
  mutable             = true
}

schema {
  name                = "picture"
  attribute_data_type = "String"
  required            = false
  mutable             = true
}
```

### App Client Configuration

```hcl
# Token validity
access_token_validity  = 1      # 1 hour
id_token_validity      = 1      # 1 hour
refresh_token_validity = var.refresh_token_validity_days

token_validity_units {
  access_token  = "hours"
  id_token      = "hours"
  refresh_token = "days"
}

# OAuth settings
allowed_oauth_flows                  = ["code"]
allowed_oauth_flows_user_pool_client = true
allowed_oauth_scopes                 = ["openid", "email", "profile"]
supported_identity_providers         = ["Google"]
callback_urls                        = var.callback_urls
logout_urls                          = var.logout_urls

# Security
generate_secret                      = false  # Public client (SPA)
prevent_user_existence_errors        = "ENABLED"
explicit_auth_flows                  = ["ALLOW_REFRESH_TOKEN_AUTH"]
```

### Google Identity Provider Configuration

```hcl
provider_name = "Google"
provider_type = "Google"

provider_details = {
  client_id        = var.google_client_id
  client_secret    = var.google_client_secret
  authorize_scopes = "openid email profile"
}

attribute_mapping = {
  email    = "email"
  name     = "name"
  picture  = "picture"
  username = "sub"
}
```

## Usage Example

```hcl
module "cognito" {
  source = "../../modules/cognito"

  environment          = var.environment
  project_name         = var.project_name
  domain_prefix        = "${var.environment}-avarobotics"
  google_client_id     = var.google_client_id
  google_client_secret = var.google_client_secret

  callback_urls = [
    "http://localhost:5173",
    "https://app.avarobotics.com"
  ]

  logout_urls = [
    "http://localhost:5173/login",
    "https://app.avarobotics.com/login"
  ]

  tags = local.common_tags
}
```

## Validation Tests

```bash
# After terraform apply
# 1. Verify user pool exists
aws cognito-idp describe-user-pool --user-pool-id <USER_POOL_ID>

# 2. Verify client exists
aws cognito-idp describe-user-pool-client \
  --user-pool-id <USER_POOL_ID> \
  --client-id <CLIENT_ID>

# 3. Verify Google provider configured
aws cognito-idp describe-identity-provider \
  --user-pool-id <USER_POOL_ID> \
  --provider-name Google

# 4. Verify domain accessible
curl -I https://<DOMAIN>.auth.<REGION>.amazoncognito.com/oauth2/authorize
```
