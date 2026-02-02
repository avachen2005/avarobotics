# Contract: Logging Module

**Module Path**: `terraform/modules/logging`

## Purpose

Provisions CloudWatch Log Groups and configures log retention policies for application and infrastructure logs.

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

variable "log_retention_days" {
  description = "Number of days to retain logs in CloudWatch"
  type        = number
  default     = 7
  validation {
    condition = contains([1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1096, 1827, 2192, 2557, 2922, 3288, 3653, 0], var.log_retention_days)
    error_message = "Log retention must be a valid CloudWatch retention value."
  }
}

variable "create_api_log_group" {
  description = "Create log group for API application logs"
  type        = bool
  default     = true
}

variable "create_vpc_flow_logs" {
  description = "Create VPC Flow Logs (optional for dev)"
  type        = bool
  default     = false
}

variable "vpc_id" {
  description = "VPC ID for flow logs (required if create_vpc_flow_logs is true)"
  type        = string
  default     = ""
}

variable "enable_log_export_to_s3" {
  description = "Enable automatic export of logs to S3"
  type        = bool
  default     = false
}

variable "log_export_bucket_arn" {
  description = "S3 bucket ARN for log export"
  type        = string
  default     = ""
}

variable "tags" {
  description = "Additional tags for resources"
  type        = map(string)
  default     = {}
}
```

## Outputs

```hcl
output "api_log_group_name" {
  description = "Name of the API CloudWatch Log Group"
  value       = var.create_api_log_group ? aws_cloudwatch_log_group.api[0].name : null
}

output "api_log_group_arn" {
  description = "ARN of the API CloudWatch Log Group"
  value       = var.create_api_log_group ? aws_cloudwatch_log_group.api[0].arn : null
}

output "vpc_flow_log_group_name" {
  description = "Name of the VPC Flow Log Group"
  value       = var.create_vpc_flow_logs ? aws_cloudwatch_log_group.vpc_flow[0].name : null
}

output "vpc_flow_log_group_arn" {
  description = "ARN of the VPC Flow Log Group"
  value       = var.create_vpc_flow_logs ? aws_cloudwatch_log_group.vpc_flow[0].arn : null
}
```

## Usage Example

```hcl
module "logging" {
  source = "../../modules/logging"

  environment        = "dev"
  project_name       = "avarobotics"
  log_retention_days = 7

  create_api_log_group  = true
  create_vpc_flow_logs  = false  # Optional for dev

  enable_log_export_to_s3 = false  # Manual export for dev

  tags = {
    Owner = "platform-team"
  }
}
```

## Log Groups Structure

```
/avarobotics/
├── dev/
│   ├── api              # Application logs
│   └── vpc-flow         # VPC Flow logs (optional)
├── staging/
│   ├── api
│   └── vpc-flow
└── prod/
    ├── api
    └── vpc-flow
```

## CloudWatch Log Insights Queries

### Sample Queries (for quickstart.md)

**Error Count by Hour**:
```
fields @timestamp, @message
| filter @message like /ERROR/
| stats count(*) as error_count by bin(1h)
```

**Request Latency P95**:
```
fields @timestamp, latency
| stats pct(latency, 95) as p95_latency by bin(5m)
```

**Top Error Messages**:
```
fields @message
| filter @message like /ERROR/
| stats count(*) by @message
| sort count desc
| limit 10
```

## Dependencies

- `networking` module (optional, for VPC Flow Logs)
- `storage` module (optional, for S3 log export)

## Dependents

- None (outputs used by application deployment)
