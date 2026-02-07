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

module "logging" {
  source = "../../../modules/logging"

  environment          = var.environment
  project_name         = var.project_name
  log_retention_days   = var.log_retention_days
  create_api_log_group = var.create_api_log_group
  create_vpc_flow_logs = var.create_vpc_flow_logs
  tags                 = var.tags
}
