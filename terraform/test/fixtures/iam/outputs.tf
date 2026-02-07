output "role_arn" {
  value = module.iam.role_arn
}

output "role_name" {
  value = module.iam.role_name
}

output "state_backend_policy_arn" {
  value = module.iam.state_backend_policy_arn
}

output "infrastructure_policy_arn" {
  value = module.iam.infrastructure_policy_arn
}

output "cognito_policy_arn" {
  value = module.iam.cognito_policy_arn
}
