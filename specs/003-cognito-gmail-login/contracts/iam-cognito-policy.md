# Contract: IAM Cognito Policy

**Feature**: 003-cognito-gmail-login
**Type**: IAM Policy Document

## Policy: TerraformCognitoPolicy

**File**: `terraform/modules/iam/policies/cognito.json`

### Policy Document

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
        "cognito-idp:ListUserPools",
        "cognito-idp:GetUserPoolMfaConfig",
        "cognito-idp:SetUserPoolMfaConfig"
      ],
      "Resource": "*"
    },
    {
      "Sid": "CognitoUserPoolClientManagement",
      "Effect": "Allow",
      "Action": [
        "cognito-idp:CreateUserPoolClient",
        "cognito-idp:DeleteUserPoolClient",
        "cognito-idp:DescribeUserPoolClient",
        "cognito-idp:UpdateUserPoolClient",
        "cognito-idp:ListUserPoolClients"
      ],
      "Resource": "*"
    },
    {
      "Sid": "CognitoUserPoolDomainManagement",
      "Effect": "Allow",
      "Action": [
        "cognito-idp:CreateUserPoolDomain",
        "cognito-idp:DeleteUserPoolDomain",
        "cognito-idp:DescribeUserPoolDomain",
        "cognito-idp:UpdateUserPoolDomain"
      ],
      "Resource": "*"
    },
    {
      "Sid": "CognitoIdentityProviderManagement",
      "Effect": "Allow",
      "Action": [
        "cognito-idp:CreateIdentityProvider",
        "cognito-idp:DeleteIdentityProvider",
        "cognito-idp:DescribeIdentityProvider",
        "cognito-idp:UpdateIdentityProvider",
        "cognito-idp:ListIdentityProviders"
      ],
      "Resource": "*"
    },
    {
      "Sid": "CognitoTagging",
      "Effect": "Allow",
      "Action": [
        "cognito-idp:TagResource",
        "cognito-idp:UntagResource",
        "cognito-idp:ListTagsForResource"
      ],
      "Resource": "*"
    }
  ]
}
```

### Integration with IAM Module

**File**: `terraform/modules/iam/main.tf`

```hcl
# Add new policy resource
resource "aws_iam_policy" "cognito" {
  name        = "TerraformCognitoPolicy"
  description = "Permissions for Terraform to manage Cognito resources"
  policy      = file("${path.module}/policies/cognito.json")

  tags = var.tags
}

# Attach to TerraformDeployRole
resource "aws_iam_role_policy_attachment" "cognito" {
  role       = aws_iam_role.terraform_deploy.name
  policy_arn = aws_iam_policy.cognito.arn
}
```

**File**: `terraform/modules/iam/outputs.tf`

```hcl
# Add output for new policy
output "cognito_policy_arn" {
  description = "ARN of the Cognito Policy"
  value       = aws_iam_policy.cognito.arn
}
```

### Permissions Breakdown

| Action | Purpose |
|--------|---------|
| `CreateUserPool` | Create new Cognito user pool |
| `DeleteUserPool` | Remove user pool (terraform destroy) |
| `DescribeUserPool` | Read user pool configuration |
| `UpdateUserPool` | Modify user pool settings |
| `CreateUserPoolClient` | Create web app client |
| `CreateUserPoolDomain` | Set up hosted UI domain |
| `CreateIdentityProvider` | Configure Google OAuth |
| `TagResource` | Apply tags to Cognito resources |

### Validation

```bash
# Test policy allows required actions
aws iam simulate-principal-policy \
  --policy-source-arn "arn:aws:iam::528564297750:role/TerraformDeployRole" \
  --action-names \
    "cognito-idp:CreateUserPool" \
    "cognito-idp:CreateUserPoolClient" \
    "cognito-idp:CreateIdentityProvider"
```

### Security Notes

- Resource constraint uses `*` because Cognito user pool ARNs are not known at policy creation time
- This is standard AWS practice for Cognito management
- Policy only grants management actions, not runtime actions (no `AdminCreateUser`, etc.)
