# -----------------------------------------------------------------------------
# GitHub Actions OIDC Module - Variables
# -----------------------------------------------------------------------------

variable "github_repo" {
  description = "GitHub repository in format owner/repo (e.g., avachen2005/avarobotics)"
  type        = string
}

variable "codebuild_project_arn" {
  description = "ARN of the CodeBuild project that GitHub Actions is allowed to trigger"
  type        = string
}

variable "project_name" {
  description = "Project name for resource tagging"
  type        = string
  default     = "avarobotics"
}

variable "tags" {
  description = "Additional tags to apply to all resources"
  type        = map(string)
  default     = {}
}
