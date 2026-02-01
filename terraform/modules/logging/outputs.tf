# Logging Module Outputs

output "api_log_group_name" {
  description = "Name of the API CloudWatch Log Group"
  value       = var.create_api_log_group ? aws_cloudwatch_log_group.api[0].name : null
}

output "api_log_group_arn" {
  description = "ARN of the API CloudWatch Log Group"
  value       = var.create_api_log_group ? aws_cloudwatch_log_group.api[0].arn : null
}

output "vpc_flow_log_group_name" {
  description = "Name of the VPC Flow Log Group"
  value       = var.create_vpc_flow_logs ? aws_cloudwatch_log_group.vpc_flow[0].name : null
}

output "vpc_flow_log_group_arn" {
  description = "ARN of the VPC Flow Log Group"
  value       = var.create_vpc_flow_logs ? aws_cloudwatch_log_group.vpc_flow[0].arn : null
}
