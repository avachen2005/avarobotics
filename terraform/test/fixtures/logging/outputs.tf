output "api_log_group_name" {
  value = module.logging.api_log_group_name
}

output "api_log_group_arn" {
  value = module.logging.api_log_group_arn
}

output "vpc_flow_log_group_name" {
  value = module.logging.vpc_flow_log_group_name
}

output "vpc_flow_log_group_arn" {
  value = module.logging.vpc_flow_log_group_arn
}
