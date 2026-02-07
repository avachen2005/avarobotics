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

module "loadbalancing" {
  source = "../../../modules/loadbalancing"

  environment        = var.environment
  project_name       = var.project_name
  vpc_id             = var.vpc_id
  public_subnet_ids  = var.public_subnet_ids
  security_group_ids = var.security_group_ids
  enable_https       = var.enable_https
  target_port        = var.target_port
  health_check_path  = var.health_check_path
  enable_access_logs = var.enable_access_logs
  tags               = var.tags
}
