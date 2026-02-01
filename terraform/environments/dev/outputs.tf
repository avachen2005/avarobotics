# Dev Environment Outputs

# IAM Outputs
output "iam_role_arn" {
  description = "ARN of the TerraformDeployRole"
  value       = module.iam.role_arn
}

output "iam_role_name" {
  description = "Name of the TerraformDeployRole"
  value       = module.iam.role_name
}

output "iam_state_backend_policy_arn" {
  description = "ARN of the State Backend Policy"
  value       = module.iam.state_backend_policy_arn
}

output "iam_infrastructure_policy_arn" {
  description = "ARN of the Infrastructure Policy"
  value       = module.iam.infrastructure_policy_arn
}

# Networking Outputs
output "vpc_id" {
  description = "ID of the VPC"
  value       = module.networking.vpc_id
}

output "vpc_cidr" {
  description = "CIDR block of the VPC"
  value       = module.networking.vpc_cidr
}

output "public_subnet_ids" {
  description = "List of public subnet IDs"
  value       = module.networking.public_subnet_ids
}

# Security Outputs
output "alb_security_group_id" {
  description = "ID of the ALB security group"
  value       = module.security.alb_security_group_id
}

output "app_security_group_id" {
  description = "ID of the application security group"
  value       = module.security.app_security_group_id
}

# Storage Outputs
output "assets_bucket_id" {
  description = "ID of the assets S3 bucket"
  value       = module.storage.assets_bucket_id
}

output "alb_logs_bucket_id" {
  description = "ID of the ALB logs S3 bucket"
  value       = module.storage.alb_logs_bucket_id
}

# Logging Outputs
output "api_log_group_name" {
  description = "Name of the API CloudWatch Log Group"
  value       = module.logging.api_log_group_name
}

output "api_log_group_arn" {
  description = "ARN of the API CloudWatch Log Group"
  value       = module.logging.api_log_group_arn
}

# Load Balancing Outputs
output "alb_dns_name" {
  description = "DNS name of the ALB"
  value       = module.loadbalancing.alb_dns_name
}

output "alb_arn" {
  description = "ARN of the ALB"
  value       = module.loadbalancing.alb_arn
}

output "alb_zone_id" {
  description = "Zone ID of the ALB (for Route53)"
  value       = module.loadbalancing.alb_zone_id
}

output "target_group_arn" {
  description = "ARN of the target group"
  value       = module.loadbalancing.target_group_arn
}
