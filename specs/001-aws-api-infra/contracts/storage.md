# Contract: Storage Module

**Module Path**: `terraform/modules/storage`

## Purpose

Provisions S3 buckets for application assets and ALB access logs with appropriate security and lifecycle configurations.

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

variable "create_assets_bucket" {
  description = "Create S3 bucket for application assets"
  type        = bool
  default     = true
}

variable "create_logs_bucket" {
  description = "Create S3 bucket for ALB access logs"
  type        = bool
  default     = true
}

variable "assets_versioning_enabled" {
  description = "Enable versioning for assets bucket"
  type        = bool
  default     = true
}

variable "assets_lifecycle_glacier_days" {
  description = "Days before transitioning assets to Glacier (0 to disable)"
  type        = number
  default     = 90
}

variable "logs_retention_days" {
  description = "Days to retain ALB logs before deletion"
  type        = number
  default     = 30
}

variable "force_destroy" {
  description = "Allow bucket destruction even with objects (dev only)"
  type        = bool
  default     = false
}

variable "tags" {
  description = "Additional tags for resources"
  type        = map(string)
  default     = {}
}
```

## Outputs

```hcl
output "assets_bucket_id" {
  description = "ID of the assets S3 bucket"
  value       = var.create_assets_bucket ? aws_s3_bucket.assets[0].id : null
}

output "assets_bucket_arn" {
  description = "ARN of the assets S3 bucket"
  value       = var.create_assets_bucket ? aws_s3_bucket.assets[0].arn : null
}

output "assets_bucket_domain_name" {
  description = "Domain name of the assets bucket"
  value       = var.create_assets_bucket ? aws_s3_bucket.assets[0].bucket_domain_name : null
}

output "alb_logs_bucket_id" {
  description = "ID of the ALB logs S3 bucket"
  value       = var.create_logs_bucket ? aws_s3_bucket.alb_logs[0].id : null
}

output "alb_logs_bucket_arn" {
  description = "ARN of the ALB logs S3 bucket"
  value       = var.create_logs_bucket ? aws_s3_bucket.alb_logs[0].arn : null
}
```

## Usage Example

```hcl
module "storage" {
  source = "../../modules/storage"

  environment   = "dev"
  project_name  = "avarobotics"
  force_destroy = true  # Dev only - allow easy cleanup

  create_assets_bucket          = true
  assets_versioning_enabled     = true
  assets_lifecycle_glacier_days = 0  # Disable for dev

  create_logs_bucket   = true
  logs_retention_days  = 7  # Shorter for dev

  tags = {
    Owner = "platform-team"
  }
}
```

## S3 Bucket Configurations

### Assets Bucket

| Setting | Value | Notes |
|---------|-------|-------|
| Versioning | Enabled | Protect against accidental deletion |
| Encryption | SSE-S3 (AES256) | Data at rest |
| Public Access | All blocked | Security |
| Lifecycle | Glacier after 90 days | Cost optimization (prod) |

### ALB Logs Bucket

| Setting | Value | Notes |
|---------|-------|-------|
| Versioning | Disabled | Logs don't need versioning |
| Encryption | SSE-S3 (AES256) | Data at rest |
| Public Access | All blocked | Security |
| Lifecycle | Delete after 30 days | Cost control |
| Bucket Policy | ALB log delivery | Required for ALB logging |

## Dependencies

- None (independent module)

## Dependents

- `loadbalancing` module (optional, for ALB access logs)
- `logging` module (for log archive destination)
