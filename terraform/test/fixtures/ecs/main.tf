terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      ManagedBy   = "terratest"
    }
  }
}

module "ecs" {
  source = "../../../modules/ecs"

  environment        = var.environment
  project_name       = var.project_name
  ecr_repository_url = var.ecr_repository_url
  target_group_arn   = var.target_group_arn
  subnet_ids         = var.subnet_ids
  security_group_ids = var.security_group_ids
  container_port     = var.container_port
  task_cpu           = var.task_cpu
  task_memory        = var.task_memory
  desired_count      = var.desired_count
  min_capacity       = var.min_capacity
  max_capacity       = var.max_capacity
  cpu_target_value   = var.cpu_target_value
  log_group_name     = var.log_group_name
  tags               = var.tags
}
