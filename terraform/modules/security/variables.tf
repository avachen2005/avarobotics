# Security Module Variables

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
