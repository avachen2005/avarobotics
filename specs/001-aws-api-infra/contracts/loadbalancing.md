# Contract: Load Balancing Module

**Module Path**: `terraform/modules/loadbalancing`

## Purpose

Provisions Application Load Balancer, listeners, and target group for routing traffic to API instances.

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

variable "vpc_id" {
  description = "ID of the VPC"
  type        = string
}

variable "public_subnet_ids" {
  description = "List of public subnet IDs for ALB"
  type        = list(string)
}

variable "security_group_ids" {
  description = "List of security group IDs for ALB"
  type        = list(string)
}

variable "enable_https" {
  description = "Enable HTTPS listener (requires certificate_arn)"
  type        = bool
  default     = false
}

variable "certificate_arn" {
  description = "ARN of ACM certificate for HTTPS"
  type        = string
  default     = ""
}

variable "target_port" {
  description = "Port the targets receive traffic on"
  type        = number
  default     = 8080
}

variable "target_type" {
  description = "Type of target (instance, ip, lambda)"
  type        = string
  default     = "ip"
}

variable "health_check_path" {
  description = "Path for health check"
  type        = string
  default     = "/health"
}

variable "health_check_interval" {
  description = "Health check interval in seconds"
  type        = number
  default     = 30
}

variable "health_check_timeout" {
  description = "Health check timeout in seconds"
  type        = number
  default     = 5
}

variable "healthy_threshold" {
  description = "Number of consecutive successes required"
  type        = number
  default     = 2
}

variable "unhealthy_threshold" {
  description = "Number of consecutive failures required"
  type        = number
  default     = 3
}

variable "enable_deletion_protection" {
  description = "Enable deletion protection for ALB"
  type        = bool
  default     = false
}

variable "enable_access_logs" {
  description = "Enable ALB access logs"
  type        = bool
  default     = true
}

variable "access_logs_bucket" {
  description = "S3 bucket for ALB access logs"
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
output "alb_id" {
  description = "ID of the ALB"
  value       = aws_lb.main.id
}

output "alb_arn" {
  description = "ARN of the ALB"
  value       = aws_lb.main.arn
}

output "alb_dns_name" {
  description = "DNS name of the ALB"
  value       = aws_lb.main.dns_name
}

output "alb_zone_id" {
  description = "Zone ID of the ALB (for Route53)"
  value       = aws_lb.main.zone_id
}

output "target_group_arn" {
  description = "ARN of the target group"
  value       = aws_lb_target_group.main.arn
}

output "target_group_name" {
  description = "Name of the target group"
  value       = aws_lb_target_group.main.name
}

output "http_listener_arn" {
  description = "ARN of the HTTP listener"
  value       = aws_lb_listener.http.arn
}

output "https_listener_arn" {
  description = "ARN of the HTTPS listener (if enabled)"
  value       = var.enable_https ? aws_lb_listener.https[0].arn : null
}
```

## Usage Example

```hcl
module "loadbalancing" {
  source = "../../modules/loadbalancing"

  environment        = "dev"
  project_name       = "avarobotics"
  vpc_id             = module.networking.vpc_id
  public_subnet_ids  = module.networking.public_subnet_ids
  security_group_ids = [module.security.alb_security_group_id]

  enable_https      = false  # Dev only
  target_port       = 8080
  health_check_path = "/health"

  enable_access_logs = true
  access_logs_bucket = module.storage.alb_logs_bucket_id

  tags = {
    Owner = "platform-team"
  }
}
```

## Dependencies

- `networking` module (provides `vpc_id`, `public_subnet_ids`)
- `security` module (provides `alb_security_group_id`)
- `storage` module (provides `alb_logs_bucket_id` if access logs enabled)

## Dependents

- None (outputs used by compute layer in future)
