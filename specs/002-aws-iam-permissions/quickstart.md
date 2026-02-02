# Quickstart: AWS IAM Permissions

**Feature**: 002-aws-iam-permissions
**Environment**: dev (ap-northeast-1)

## Prerequisites

1. **AWS CLI** configured with `avarobotics_local` credentials
2. **Terraform** >= 1.5.0 installed
3. **IAM User** `avarobotics_local` already exists in AWS account

## Quick Setup

### 1. Deploy IAM Resources

```bash
cd terraform/environments/dev

# Initialize (if not already done)
terraform init

# Apply only IAM module first
terraform apply -target=module.iam
```

### 2. Configure AWS CLI Profile for Role

Add to `~/.aws/config`:

```ini
[profile terraform-deploy]
role_arn = arn:aws:iam::528564297750:role/TerraformDeployRole
source_profile = default
duration_seconds = 14400
```

Replace `528564297750` with your AWS account ID.

### 3. Test Role Assumption

```bash
# Method 1: Using AWS CLI profile
AWS_PROFILE=terraform-deploy aws sts get-caller-identity

# Method 2: Manual assume role
aws sts assume-role \
  --role-arn "arn:aws:iam::528564297750:role/TerraformDeployRole" \
  --role-session-name "test-session" \
  --duration-seconds 14400
```

Expected output:
```json
{
  "UserId": "AROAXXXXXXXXX:test-session",
  "Account": "528564297750",
  "Arn": "arn:aws:sts::528564297750:assumed-role/TerraformDeployRole/test-session"
}
```

### 4. Use Role for Terraform

```bash
# Set profile for Terraform
export AWS_PROFILE=terraform-deploy

# Or use environment variables from assume-role output
export AWS_ACCESS_KEY_ID="..."
export AWS_SECRET_ACCESS_KEY="..."
export AWS_SESSION_TOKEN="..."

# Run Terraform
cd terraform/environments/dev
terraform init
terraform plan
terraform apply
```

## Verification Steps

### After Deployment

```bash
# 1. Verify role exists
aws iam get-role --role-name TerraformDeployRole

# 2. Verify policies attached
aws iam list-attached-role-policies --role-name TerraformDeployRole

# 3. Test state backend access (with assumed role)
AWS_PROFILE=terraform-deploy aws s3 ls s3://avarobotics-terraform-state/

# 4. Test DynamoDB lock access
AWS_PROFILE=terraform-deploy aws dynamodb describe-table --table-name terraform-state-lock

# 5. Test VPC permissions
AWS_PROFILE=terraform-deploy aws ec2 describe-vpcs
```

### Terraform Validation

```bash
# Validate configuration
terraform validate

# Plan with assumed role
AWS_PROFILE=terraform-deploy terraform plan
```

## Common Operations

### Refresh Credentials

Session credentials expire after 4 hours. To refresh:

```bash
# Re-assume the role
aws sts assume-role \
  --role-arn "arn:aws:iam::528564297750:role/TerraformDeployRole" \
  --role-session-name "terraform-session" \
  --duration-seconds 14400
```

### Check Remaining Session Time

```bash
# Get session expiration
aws sts get-caller-identity
# Note: Doesn't show expiration, but if it fails, session expired
```

### Troubleshooting Permission Errors

```bash
# Simulate policy to check permissions
aws iam simulate-principal-policy \
  --policy-source-arn "arn:aws:iam::528564297750:role/TerraformDeployRole" \
  --action-names "ec2:CreateVpc" "s3:CreateBucket"
```

## Outputs Reference

| Output | Description | Example |
|--------|-------------|---------|
| `role_arn` | IAM Role ARN | arn:aws:iam::528564297750:role/TerraformDeployRole |
| `role_name` | IAM Role name | TerraformDeployRole |
| `state_backend_policy_arn` | State policy ARN | arn:aws:iam::528564297750:policy/TerraformStateBackendPolicy |
| `infrastructure_policy_arn` | Infra policy ARN | arn:aws:iam::528564297750:policy/TerraformInfrastructurePolicy |

## Troubleshooting

### Cannot Assume Role

**Cause**: Trust policy doesn't allow your user.
**Solution**: Verify `avarobotics_local` is in the trust policy principal.

```bash
aws iam get-role --role-name TerraformDeployRole --query 'Role.AssumeRolePolicyDocument'
```

### Access Denied on Specific Action

**Cause**: Policy doesn't include required permission.
**Solution**: Check which policy is missing the action:

```bash
# List policy document
aws iam get-policy-version \
  --policy-arn "arn:aws:iam::528564297750:policy/TerraformInfrastructurePolicy" \
  --version-id v1
```

### Session Expired

**Cause**: 4-hour session duration exceeded.
**Solution**: Re-assume the role to get new credentials.

## Next Steps

1. Deploy IAM module with `terraform apply -target=module.iam`
2. Configure AWS CLI profile
3. Test role assumption
4. Deploy 001-aws-api-infra with assumed role
