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

module "storage" {
  source = "../../../modules/storage"

  environment                   = var.environment
  project_name                  = var.project_name
  force_destroy                 = var.force_destroy
  create_assets_bucket          = var.create_assets_bucket
  assets_versioning_enabled     = var.assets_versioning_enabled
  assets_lifecycle_glacier_days = var.assets_lifecycle_glacier_days
  create_logs_bucket            = var.create_logs_bucket
  logs_retention_days           = var.logs_retention_days
  tags                          = var.tags
}
