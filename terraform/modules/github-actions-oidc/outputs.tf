# -----------------------------------------------------------------------------
# GitHub Actions OIDC Module - Outputs
# -----------------------------------------------------------------------------

output "role_arn" {
  description = "ARN of the GitHubActionsCIRole (use in GitHub Actions workflow)"
  value       = aws_iam_role.github_actions_ci.arn
}

output "oidc_provider_arn" {
  description = "ARN of the GitHub OIDC provider"
  value       = aws_iam_openid_connect_provider.github.arn
}
