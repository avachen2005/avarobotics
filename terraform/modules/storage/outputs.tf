# Storage Module Outputs

output "assets_bucket_id" {
  description = "ID of the assets S3 bucket"
  value       = var.create_assets_bucket ? aws_s3_bucket.assets[0].id : null
}

output "assets_bucket_arn" {
  description = "ARN of the assets S3 bucket"
  value       = var.create_assets_bucket ? aws_s3_bucket.assets[0].arn : null
}

output "assets_bucket_domain_name" {
  description = "Domain name of the assets bucket"
  value       = var.create_assets_bucket ? aws_s3_bucket.assets[0].bucket_domain_name : null
}

output "alb_logs_bucket_id" {
  description = "ID of the ALB logs S3 bucket"
  value       = var.create_logs_bucket ? aws_s3_bucket.alb_logs[0].id : null
}

output "alb_logs_bucket_arn" {
  description = "ARN of the ALB logs S3 bucket"
  value       = var.create_logs_bucket ? aws_s3_bucket.alb_logs[0].arn : null
}
