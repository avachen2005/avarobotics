output "alb_id" {
  value = module.loadbalancing.alb_id
}

output "alb_arn" {
  value = module.loadbalancing.alb_arn
}

output "alb_dns_name" {
  value = module.loadbalancing.alb_dns_name
}

output "target_group_arn" {
  value = module.loadbalancing.target_group_arn
}

output "target_group_name" {
  value = module.loadbalancing.target_group_name
}

output "http_listener_arn" {
  value = module.loadbalancing.http_listener_arn
}
