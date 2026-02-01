# Contract: IAM Role Module

**Module Path**: `terraform/modules/iam`

## Purpose

Provisions IAM Role with Trust Policy and attached Policies for Terraform deployment, following User → Role → Policy architecture.

## Input Variables

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

variable "role_name" {
  description = "Name of the IAM role"
  type        = string
  default     = "TerraformDeployRole"
}

variable "allowed_users" {
  description = "List of IAM user ARNs allowed to assume this role"
  type        = list(string)
}

variable "max_session_duration" {
  description = "Maximum session duration in seconds (900-43200)"
  type        = number
  default     = 14400  # 4 hours
}

variable "state_bucket_name" {
  description = "S3 bucket name for Terraform state"
  type        = string
  default     = "avarobotics-terraform-state"
}

variable "state_lock_table_name" {
  description = "DynamoDB table name for state locking"
  type        = string
  default     = "terraform-state-lock"
}

variable "tags" {
  description = "Additional tags for resources"
  type        = map(string)
  default     = {}
}
```

## Outputs

```hcl
output "role_arn" {
  description = "ARN of the IAM role"
  value       = aws_iam_role.terraform_deploy.arn
}

output "role_name" {
  description = "Name of the IAM role"
  value       = aws_iam_role.terraform_deploy.name
}

output "state_backend_policy_arn" {
  description = "ARN of the state backend policy"
  value       = aws_iam_policy.state_backend.arn
}

output "infrastructure_policy_arn" {
  description = "ARN of the infrastructure policy"
  value       = aws_iam_policy.infrastructure.arn
}
```

## Usage Example

```hcl
data "aws_caller_identity" "current" {}

module "iam" {
  source = "../../modules/iam"

  environment  = "dev"
  project_name = "avarobotics"
  role_name    = "TerraformDeployRole"

  allowed_users = [
    "arn:aws:iam::${data.aws_caller_identity.current.account_id}:user/avarobotics_local"
  ]

  max_session_duration  = 14400  # 4 hours
  state_bucket_name     = "avarobotics-terraform-state"
  state_lock_table_name = "terraform-state-lock"

  tags = {
    Owner = "platform-team"
  }
}
```

## Trust Policy Structure

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAssumeRole",
      "Effect": "Allow",
      "Principal": {
        "AWS": ["arn:aws:iam::ACCOUNT_ID:user/avarobotics_local"]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

## Dependencies

- None (standalone module)

## Dependents

- `terraform/environments/dev/main.tf` (uses role for deployment)
- `001-aws-api-infra` (requires this role's permissions)

## Assume Role Command

```bash
# Assume role and get temporary credentials
aws sts assume-role \
  --role-arn "arn:aws:iam::ACCOUNT_ID:role/TerraformDeployRole" \
  --role-session-name "terraform-session" \
  --duration-seconds 14400

# Or use AWS CLI profile with role
# ~/.aws/config
[profile terraform-deploy]
role_arn = arn:aws:iam::ACCOUNT_ID:role/TerraformDeployRole
source_profile = default
```
