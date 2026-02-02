# -----------------------------------------------------------------------------
# IAM Module Variables
# Module: terraform/modules/iam
# Purpose: Input variables for IAM Role and Policy provisioning
# -----------------------------------------------------------------------------

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
  default     = 14400 # 4 hours
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
