# Contract: Security Module

**Module Path**: `terraform/modules/security`

## Purpose

Provisions Security Groups and Network ACLs for controlling traffic to infrastructure resources.

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
  description = "ID of the VPC to create security resources in"
  type        = string
}

variable "public_subnet_ids" {
  description = "List of public subnet IDs for Network ACL association"
  type        = list(string)
}

variable "alb_ingress_ports" {
  description = "List of ports to allow inbound on ALB"
  type        = list(number)
  default     = [80, 443]
}

variable "app_port" {
  description = "Application port for traffic from ALB"
  type        = number
  default     = 8080
}

variable "allowed_cidr_blocks" {
  description = "CIDR blocks allowed to access ALB"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "tags" {
  description = "Additional tags for resources"
  type        = map(string)
  default     = {}
}
```

## Outputs

```hcl
output "alb_security_group_id" {
  description = "ID of the ALB security group"
  value       = aws_security_group.alb.id
}

output "app_security_group_id" {
  description = "ID of the application security group"
  value       = aws_security_group.app.id
}

output "network_acl_id" {
  description = "ID of the Network ACL"
  value       = aws_network_acl.public.id
}
```

## Usage Example

```hcl
module "security" {
  source = "../../modules/security"

  environment       = "dev"
  project_name      = "avarobotics"
  vpc_id            = module.networking.vpc_id
  public_subnet_ids = module.networking.public_subnet_ids
  alb_ingress_ports = [80]  # HTTP only for dev
  app_port          = 8080

  tags = {
    Owner = "platform-team"
  }
}
```

## Security Group Rules

### ALB Security Group

| Direction | Port | Protocol | Source/Dest | Description |
|-----------|------|----------|-------------|-------------|
| Ingress | 80 | TCP | 0.0.0.0/0 | HTTP |
| Ingress | 443 | TCP | 0.0.0.0/0 | HTTPS |
| Egress | All | All | 0.0.0.0/0 | All outbound |

### App Security Group

| Direction | Port | Protocol | Source/Dest | Description |
|-----------|------|----------|-------------|-------------|
| Ingress | 8080 | TCP | ALB SG | From ALB only |
| Egress | 443 | TCP | 0.0.0.0/0 | HTTPS for AWS APIs |

## Dependencies

- `networking` module (provides `vpc_id`, `public_subnet_ids`)

## Dependents

- `loadbalancing` module (requires `alb_security_group_id`)
