# Quickstart: AWS API Infrastructure

**Feature**: 001-aws-api-infra
**Environment**: dev (ap-northeast-1)

## Prerequisites

1. **AWS CLI** configured with appropriate credentials
2. **Terraform** >= 1.5.0 installed
3. **AWS Account** with permissions to create VPC, ALB, S3, CloudWatch resources

## Quick Setup

### 1. Configure AWS Credentials

```bash
# Option A: AWS CLI Profile (recommended for local dev)
aws configure --profile avarobotics-dev
export AWS_PROFILE=avarobotics-dev

# Option B: Environment Variables
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_REGION="ap-northeast-1"
```

### 2. Create Terraform State Backend (One-time Setup)

```bash
# Create S3 bucket for state
aws s3 mb s3://avarobotics-terraform-state --region ap-northeast-1

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket avarobotics-terraform-state \
  --versioning-configuration Status=Enabled

# Create DynamoDB table for locking
aws dynamodb create-table \
  --table-name terraform-state-lock \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region ap-northeast-1
```

### 3. Initialize and Deploy

```bash
cd terraform/environments/dev

# Initialize Terraform
terraform init

# Review changes
terraform plan

# Apply infrastructure
terraform apply
```

## Verification Steps

### After Deployment

```bash
# 1. Get ALB DNS name
terraform output alb_dns_name

# 2. Test ALB is responding (will return 503 until targets registered)
curl -I http://$(terraform output -raw alb_dns_name)

# 3. Verify VPC created
aws ec2 describe-vpcs --filters "Name=tag:Name,Values=dev-avarobotics-vpc"

# 4. Verify S3 buckets created
aws s3 ls | grep avarobotics

# 5. Verify CloudWatch Log Group
aws logs describe-log-groups --log-group-name-prefix /avarobotics/dev
```

### Terraform Validation

```bash
# Validate configuration
terraform validate

# Format check
terraform fmt -check -recursive

# Security scan (if checkov installed)
checkov -d .
```

## Common Operations

### View Current State

```bash
terraform show
```

### Destroy Infrastructure

```bash
# For dev environment only
terraform destroy
```

### Update Infrastructure

```bash
# After modifying .tf files
terraform plan
terraform apply
```

## Outputs Reference

| Output | Description | Example |
|--------|-------------|---------|
| `vpc_id` | VPC ID | vpc-0123456789abcdef0 |
| `public_subnet_ids` | Public subnet IDs | ["subnet-abc123"] |
| `alb_dns_name` | ALB public DNS | dev-avarobotics-alb-123.ap-northeast-1.elb.amazonaws.com |
| `alb_arn` | ALB ARN | arn:aws:elasticloadbalancing:... |
| `target_group_arn` | Target Group ARN | arn:aws:elasticloadbalancing:... |
| `assets_bucket_id` | Assets S3 bucket | dev-avarobotics-assets-abc123 |
| `api_log_group_name` | CloudWatch Log Group | /avarobotics/dev/api |

## Troubleshooting

### ALB Returns 503

**Cause**: No healthy targets registered in target group.
**Solution**: This is expected until you deploy the API application to the target group.

### Terraform State Lock Error

**Cause**: Previous terraform command didn't release lock.
**Solution**:
```bash
terraform force-unlock <LOCK_ID>
```

### Permission Denied

**Cause**: AWS credentials don't have required permissions.
**Solution**: Ensure IAM user/role has permissions for VPC, EC2, ELB, S3, CloudWatch, DynamoDB.

### S3 Bucket Name Already Exists

**Cause**: S3 bucket names are globally unique.
**Solution**: The module uses random suffix. If still conflicts, modify the random seed.

## Cost Estimate (Dev Environment)

| Resource | Estimated Monthly Cost |
|----------|----------------------|
| ALB | ~$16 (base) + LCU |
| S3 (assets) | ~$0.023/GB |
| S3 (logs) | ~$0.023/GB |
| CloudWatch Logs | ~$0.50/GB ingested |
| NAT Gateway | $0 (not used in dev) |

**Total (minimal usage)**: ~$20-30/month

## Next Steps

1. Deploy API application to target group
2. Configure DNS (Route 53) to point to ALB
3. Add HTTPS listener with ACM certificate (for staging/prod)
4. Set up CI/CD pipeline for Terraform
