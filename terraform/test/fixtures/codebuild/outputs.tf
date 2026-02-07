output "ecr_repository_url" {
  value = module.codebuild.ecr_repository_url
}

output "ecr_repository_arn" {
  value = module.codebuild.ecr_repository_arn
}

output "codebuild_project_name" {
  value = module.codebuild.codebuild_project_name
}

output "codebuild_project_arn" {
  value = module.codebuild.codebuild_project_arn
}

output "codebuild_service_role_arn" {
  value = module.codebuild.codebuild_service_role_arn
}

output "github_oidc_role_arn" {
  value = module.codebuild.github_oidc_role_arn
}

output "oidc_provider_arn" {
  value = module.codebuild.oidc_provider_arn
}
