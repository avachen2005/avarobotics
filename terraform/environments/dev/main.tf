# Dev Environment Main Configuration
# Provisions networking and load balancing infrastructure

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
      ManagedBy   = "terraform"
      Repository  = "avachen2005/avarobotics"
    }
  }
}

# =============================================================================
# Data Sources
# =============================================================================

data "aws_caller_identity" "current" {}

# =============================================================================
# IAM Module
# =============================================================================

module "iam" {
  source = "../../modules/iam"

  environment  = var.environment
  project_name = var.project_name
  role_name    = "TerraformDeployRole"

  allowed_users = [
    "arn:aws:iam::${data.aws_caller_identity.current.account_id}:user/avarobotics_local"
  ]

  max_session_duration  = 14400 # 4 hours
  state_bucket_name     = "avarobotics-terraform-state"
  state_lock_table_name = "terraform-state-lock"

  tags = var.additional_tags
}

# =============================================================================
# Networking Module
# =============================================================================

module "networking" {
  source = "../../modules/networking"

  environment         = var.environment
  project_name        = var.project_name
  vpc_cidr            = var.vpc_cidr
  public_subnet_cidrs = var.public_subnet_cidrs
  availability_zones  = var.availability_zones

  tags = var.additional_tags
}

# =============================================================================
# Security Module
# =============================================================================

module "security" {
  source = "../../modules/security"

  environment       = var.environment
  project_name      = var.project_name
  vpc_id            = module.networking.vpc_id
  public_subnet_ids = module.networking.public_subnet_ids
  alb_ingress_ports = [80] # HTTP only for dev
  app_port          = var.target_port

  tags = var.additional_tags
}

# =============================================================================
# Storage Module
# =============================================================================

module "storage" {
  source = "../../modules/storage"

  environment   = var.environment
  project_name  = var.project_name
  force_destroy = true # Dev only - allow easy cleanup

  create_assets_bucket          = true
  assets_versioning_enabled     = true
  assets_lifecycle_glacier_days = 0 # Disable for dev

  create_logs_bucket  = true
  logs_retention_days = 7 # Shorter for dev

  tags = var.additional_tags
}

# =============================================================================
# Logging Module
# =============================================================================

module "logging" {
  source = "../../modules/logging"

  environment        = var.environment
  project_name       = var.project_name
  log_retention_days = 7 # Shorter retention for dev

  create_api_log_group = true
  create_vpc_flow_logs = false # Optional for dev

  tags = var.additional_tags
}

# =============================================================================
# Load Balancing Module
# =============================================================================

module "loadbalancing" {
  source = "../../modules/loadbalancing"

  environment        = var.environment
  project_name       = var.project_name
  vpc_id             = module.networking.vpc_id
  public_subnet_ids  = module.networking.public_subnet_ids
  security_group_ids = [module.security.alb_security_group_id]

  enable_https      = false # Dev environment - no HTTPS
  target_port       = var.target_port
  health_check_path = var.health_check_path

  enable_deletion_protection = false # Dev environment - allow deletion
  enable_access_logs         = true
  access_logs_bucket         = module.storage.alb_logs_bucket_id

  tags = var.additional_tags
}

# =============================================================================
# CodeBuild Module
# =============================================================================

module "codebuild" {
  source = "../../modules/codebuild"

  environment      = var.environment
  project_name     = var.project_name
  github_repo      = "https://github.com/avachen2005/avarobotics.git"
  github_repo_name = "avachen2005/avarobotics"
  ecr_repo_name    = "${var.project_name}-api"

  tags = var.additional_tags
}

# =============================================================================
# Cognito Module
# =============================================================================

module "cognito" {
  source = "../../modules/cognito"

  environment          = var.environment
  project_name         = var.project_name
  domain_prefix        = "${var.environment}-${var.project_name}"
  google_client_id     = var.google_client_id
  google_client_secret = var.google_client_secret

  callback_urls = [
    "http://localhost:5173"
  ]

  logout_urls = [
    "http://localhost:5173/login"
  ]

  refresh_token_validity_days = 3650 # 10 years - sessions persist until logout

  tags = var.additional_tags
}
