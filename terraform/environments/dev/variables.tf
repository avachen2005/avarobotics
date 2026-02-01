# Dev Environment Variables

variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "ap-northeast-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "avarobotics"
}

# Networking
variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "List of CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "availability_zones" {
  description = "List of availability zones for subnets"
  type        = list(string)
  default     = ["ap-northeast-1a", "ap-northeast-1c"]
}

# Load Balancing
variable "target_port" {
  description = "Port the targets receive traffic on"
  type        = number
  default     = 8080
}

variable "health_check_path" {
  description = "Path for health check"
  type        = string
  default     = "/health"
}

# Tags
variable "additional_tags" {
  description = "Additional tags for resources"
  type        = map(string)
  default     = {}
}
