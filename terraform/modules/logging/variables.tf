# Logging Module Variables

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
    condition     = contains([1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1096, 1827, 2192, 2557, 2922, 3288, 3653, 0], var.log_retention_days)
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
