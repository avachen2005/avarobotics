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

module "codebuild" {
  source = "../../../modules/codebuild"

  environment            = var.environment
  project_name           = var.project_name
  github_repo            = var.github_repo
  github_repo_name       = var.github_repo_name
  ecr_repo_name          = var.ecr_repo_name
  codebuild_compute_type = var.codebuild_compute_type
  tags                   = var.tags
}
