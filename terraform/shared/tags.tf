# Common tagging strategy for all resources
# Usage: merge(local.common_tags, { Name = "resource-name" })

locals {
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
    Repository  = "avachen2005/avarobotics"
  }
}

variable "project_name" {
  description = "Project name for resource tagging"
  type        = string
  default     = "avarobotics"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}
