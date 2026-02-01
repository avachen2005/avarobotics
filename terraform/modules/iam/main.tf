# -----------------------------------------------------------------------------
# IAM Module - Main Configuration
# Module: terraform/modules/iam
# Purpose: Provisions IAM Role with Trust Policy and attached Policies for
#          Terraform deployment, following User → Role → Policy architecture
# -----------------------------------------------------------------------------

# -----------------------------------------------------------------------------
# Data Sources
# -----------------------------------------------------------------------------

data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

# -----------------------------------------------------------------------------
# Local Values
# -----------------------------------------------------------------------------

locals {
  account_id = data.aws_caller_identity.current.account_id
  region     = data.aws_region.current.name

  common_tags = merge(
    {
      Name        = var.role_name
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "terraform"
      Module      = "iam"
    },
    var.tags
  )
}

# -----------------------------------------------------------------------------
# IAM Role - TerraformDeployRole
# -----------------------------------------------------------------------------

resource "aws_iam_role" "terraform_deploy" {
  name                 = var.role_name
  max_session_duration = var.max_session_duration

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowAssumeRole"
        Effect = "Allow"
        Principal = {
          AWS = var.allowed_users
        }
        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = local.common_tags
}

# -----------------------------------------------------------------------------
# IAM Policy - Terraform State Backend
# Provides permissions for S3 state storage and DynamoDB locking
# -----------------------------------------------------------------------------

resource "aws_iam_policy" "state_backend" {
  name        = "TerraformStateBackendPolicy"
  description = "Provides minimum permissions required for Terraform to manage state in S3 with DynamoDB locking"
  path        = "/"

  policy = file("${path.module}/policies/state-backend.json")

  tags = merge(local.common_tags, {
    Name = "TerraformStateBackendPolicy"
  })
}

resource "aws_iam_role_policy_attachment" "state_backend" {
  role       = aws_iam_role.terraform_deploy.name
  policy_arn = aws_iam_policy.state_backend.arn
}

# -----------------------------------------------------------------------------
# IAM Policy - Infrastructure Deployment
# Provides permissions for VPC, ALB, S3, CloudWatch, IAM (limited)
# -----------------------------------------------------------------------------

resource "aws_iam_policy" "infrastructure" {
  name        = "TerraformInfrastructurePolicy"
  description = "Provides permissions required to deploy AWS infrastructure including VPC, ALB, S3, and CloudWatch resources"
  path        = "/"

  policy = file("${path.module}/policies/infrastructure.json")

  tags = merge(local.common_tags, {
    Name = "TerraformInfrastructurePolicy"
  })
}

resource "aws_iam_role_policy_attachment" "infrastructure" {
  role       = aws_iam_role.terraform_deploy.name
  policy_arn = aws_iam_policy.infrastructure.arn
}

# -----------------------------------------------------------------------------
# IAM Policy - Cognito Management
# Provides permissions for Cognito User Pool and Identity Provider management
# -----------------------------------------------------------------------------

resource "aws_iam_policy" "cognito" {
  name        = "TerraformCognitoPolicy"
  description = "Permissions for Terraform to manage Cognito resources"
  path        = "/"

  policy = file("${path.module}/policies/cognito.json")

  tags = merge(local.common_tags, {
    Name = "TerraformCognitoPolicy"
  })
}

resource "aws_iam_role_policy_attachment" "cognito" {
  role       = aws_iam_role.terraform_deploy.name
  policy_arn = aws_iam_policy.cognito.arn
}
