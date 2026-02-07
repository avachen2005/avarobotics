# CodeBuild Module
# Provisions ECR repository, CodeBuild project, and IAM roles for container builds

locals {
  name_prefix = "${var.environment}-${var.project_name}"

  common_tags = merge(var.tags, {
    Module      = "codebuild"
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "terraform"
  })
}

data "aws_region" "current" {}
data "aws_caller_identity" "current" {}

# =============================================================================
# ECR Repository
# =============================================================================

resource "aws_ecr_repository" "api" {
  name                 = "${var.environment}-${var.ecr_repo_name}"
  image_tag_mutability = "MUTABLE"

  encryption_configuration {
    encryption_type = "AES256"
  }

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = merge(local.common_tags, {
    Name = "${local.name_prefix}-ecr"
  })
}

# =============================================================================
# CodeBuild Project
# =============================================================================

resource "aws_codebuild_project" "api" {
  name         = "${local.name_prefix}-api-build"
  description  = "Build and push Docker image for ${var.project_name} API"
  service_role = aws_iam_role.codebuild_service.arn

  artifacts {
    type = "NO_ARTIFACTS"
  }

  environment {
    compute_type                = var.codebuild_compute_type
    image                       = "aws/codebuild/amazonlinux2-x86_64-standard:5.0"
    type                        = "LINUX_CONTAINER"
    privileged_mode             = true
    image_pull_credentials_type = "CODEBUILD"

    environment_variable {
      name  = "ECR_REPO_URL"
      value = aws_ecr_repository.api.repository_url
    }

    environment_variable {
      name  = "AWS_DEFAULT_REGION"
      value = data.aws_region.current.name
    }
  }

  source {
    type            = "GITHUB"
    location        = var.github_repo
    git_clone_depth = 1
    buildspec       = <<-BUILDSPEC
      version: 0.2
      phases:
        pre_build:
          commands:
            - aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $ECR_REPO_URL
        build:
          commands:
            - docker build -f api/Dockerfile -t $ECR_REPO_URL:$CODEBUILD_RESOLVED_SOURCE_VERSION api/
            - docker tag $ECR_REPO_URL:$CODEBUILD_RESOLVED_SOURCE_VERSION $ECR_REPO_URL:latest
        post_build:
          commands:
            - docker push $ECR_REPO_URL:$CODEBUILD_RESOLVED_SOURCE_VERSION
            - docker push $ECR_REPO_URL:latest
    BUILDSPEC
  }

  logs_config {
    cloudwatch_logs {
      group_name  = "/codebuild/${local.name_prefix}-api-build"
      stream_name = "build"
    }
  }

  tags = merge(local.common_tags, {
    Name = "${local.name_prefix}-api-build"
  })
}

# =============================================================================
# CodeBuild Service IAM Role
# =============================================================================

resource "aws_iam_role" "codebuild_service" {
  name = "${local.name_prefix}-codebuild-service-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "codebuild.amazonaws.com"
        }
      }
    ]
  })

  tags = merge(local.common_tags, {
    Name = "${local.name_prefix}-codebuild-service-role"
  })
}

# ECR Push Policy for CodeBuild Service Role
resource "aws_iam_role_policy" "codebuild_ecr_push" {
  name   = "${local.name_prefix}-codebuild-ecr-push"
  role   = aws_iam_role.codebuild_service.id
  policy = file("${path.module}/policies/codebuild-ecr-push.json")
}

# CloudWatch Logs Policy for CodeBuild Service Role
resource "aws_iam_role_policy" "codebuild_logs" {
  name = "${local.name_prefix}-codebuild-logs"
  role = aws_iam_role.codebuild_service.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = [
          "arn:aws:logs:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:log-group:/codebuild/${local.name_prefix}-api-build",
          "arn:aws:logs:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:log-group:/codebuild/${local.name_prefix}-api-build:*"
        ]
      }
    ]
  })
}

# =============================================================================
# GitHub Actions OIDC Provider
# =============================================================================

resource "aws_iam_openid_connect_provider" "github_actions" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = ["sts.amazonaws.com"]

  thumbprint_list = ["ffffffffffffffffffffffffffffffffffffffff"]

  tags = merge(local.common_tags, {
    Name = "${local.name_prefix}-github-oidc"
  })
}

# =============================================================================
# GitHub Actions OIDC Role
# =============================================================================

resource "aws_iam_role" "github_actions" {
  name = "${local.name_prefix}-github-actions-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRoleWithWebIdentity"
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github_actions.arn
        }
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_repo_name}:ref:refs/heads/main"
          }
        }
      }
    ]
  })

  tags = merge(local.common_tags, {
    Name = "${local.name_prefix}-github-actions-role"
  })
}

# CodeBuild Trigger Policy for GitHub Actions OIDC Role
resource "aws_iam_role_policy" "github_actions_codebuild" {
  name   = "${local.name_prefix}-codebuild-trigger"
  role   = aws_iam_role.github_actions.id
  policy = file("${path.module}/policies/codebuild-trigger.json")
}
