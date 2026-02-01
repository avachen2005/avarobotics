# Security Module Outputs

output "alb_security_group_id" {
  description = "ID of the ALB security group"
  value       = aws_security_group.alb.id
}

output "app_security_group_id" {
  description = "ID of the application security group"
  value       = aws_security_group.app.id
}

output "network_acl_id" {
  description = "ID of the Network ACL"
  value       = aws_network_acl.public.id
}
