# Contract: Networking Module

**Module Path**: `terraform/modules/networking`

## Purpose

Provisions VPC, public subnets, Internet Gateway, and route tables for the API infrastructure.

## Input Variables

```hcl
variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "avarobotics"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
  validation {
    condition     = can(cidrhost(var.vpc_cidr, 0))
    error_message = "VPC CIDR must be a valid IPv4 CIDR block."
  }
}

variable "public_subnet_cidrs" {
  description = "List of CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.1.0/24"]
}

variable "availability_zones" {
  description = "List of availability zones for subnets"
  type        = list(string)
  default     = ["ap-northeast-1a"]
}

variable "tags" {
  description = "Additional tags for resources"
  type        = map(string)
  default     = {}
}
```

## Outputs

```hcl
output "vpc_id" {
  description = "ID of the created VPC"
  value       = aws_vpc.main.id
}

output "vpc_cidr" {
  description = "CIDR block of the VPC"
  value       = aws_vpc.main.cidr_block
}

output "public_subnet_ids" {
  description = "List of public subnet IDs"
  value       = aws_subnet.public[*].id
}

output "public_subnet_cidrs" {
  description = "List of public subnet CIDR blocks"
  value       = aws_subnet.public[*].cidr_block
}

output "internet_gateway_id" {
  description = "ID of the Internet Gateway"
  value       = aws_internet_gateway.main.id
}

output "public_route_table_id" {
  description = "ID of the public route table"
  value       = aws_route_table.public.id
}
```

## Usage Example

```hcl
module "networking" {
  source = "../../modules/networking"

  environment         = "dev"
  project_name        = "avarobotics"
  vpc_cidr            = "10.0.0.0/16"
  public_subnet_cidrs = ["10.0.1.0/24"]
  availability_zones  = ["ap-northeast-1a"]

  tags = {
    Owner = "platform-team"
  }
}
```

## Dependencies

- None (root module)

## Dependents

- `security` module (requires `vpc_id`)
- `loadbalancing` module (requires `vpc_id`, `public_subnet_ids`)
