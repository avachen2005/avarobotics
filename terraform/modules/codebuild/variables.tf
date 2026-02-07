# CodeBuild Module Variables

variable "environment" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "avarobotics"
}

variable "github_repo" {
  description = "GitHub repository URL (e.g., https://github.com/avachen2005/avarobotics.git)"
  type        = string
}

variable "github_repo_name" {
  description = "GitHub repository name in owner/repo format (e.g., avachen2005/avarobotics)"
  type        = string
}

variable "ecr_repo_name" {
  description = "Name for the ECR repository"
  type        = string
}

variable "codebuild_compute_type" {
  description = "CodeBuild compute type (e.g., BUILD_GENERAL1_SMALL)"
  type        = string
  default     = "BUILD_GENERAL1_SMALL"
}

variable "tags" {
  description = "Additional tags for resources"
  type        = map(string)
  default     = {}
}
