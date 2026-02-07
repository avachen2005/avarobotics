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

module "iam" {
  source = "../../../modules/iam"

  environment           = var.environment
  project_name          = var.project_name
  role_name             = var.role_name
  allowed_users         = var.allowed_users
  max_session_duration  = var.max_session_duration
  state_bucket_name     = var.state_bucket_name
  state_lock_table_name = var.state_lock_table_name
  tags                  = var.tags
}
