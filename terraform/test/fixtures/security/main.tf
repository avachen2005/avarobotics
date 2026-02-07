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

module "security" {
  source = "../../../modules/security"

  environment       = var.environment
  project_name      = var.project_name
  vpc_id            = var.vpc_id
  public_subnet_ids = var.public_subnet_ids
  alb_ingress_ports = var.alb_ingress_ports
  app_port          = var.app_port
  tags              = var.tags
}
