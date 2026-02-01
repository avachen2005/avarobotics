# -----------------------------------------------------------------------------
# IAM Module Outputs
# Module: terraform/modules/iam
# Purpose: Export IAM resource identifiers for use by other modules
# -----------------------------------------------------------------------------

output "role_arn" {
  description = "ARN of the IAM role"
  value       = aws_iam_role.terraform_deploy.arn
}

output "role_name" {
  description = "Name of the IAM role"
  value       = aws_iam_role.terraform_deploy.name
}

output "state_backend_policy_arn" {
  description = "ARN of the state backend policy"
  value       = aws_iam_policy.state_backend.arn
}

output "infrastructure_policy_arn" {
  description = "ARN of the infrastructure policy"
  value       = aws_iam_policy.infrastructure.arn
}
