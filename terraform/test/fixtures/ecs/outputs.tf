output "cluster_name" {
  value = module.ecs.cluster_name
}

output "cluster_arn" {
  value = module.ecs.cluster_arn
}

output "service_name" {
  value = module.ecs.service_name
}

output "task_definition_arn" {
  value = module.ecs.task_definition_arn
}

output "task_execution_role_arn" {
  value = module.ecs.task_execution_role_arn
}

output "task_role_arn" {
  value = module.ecs.task_role_arn
}
