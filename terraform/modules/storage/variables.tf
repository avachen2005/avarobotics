# Storage Module Variables

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
