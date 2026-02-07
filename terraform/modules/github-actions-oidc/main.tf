# -----------------------------------------------------------------------------
# GitHub Actions OIDC Module - Main Configuration
# Module: terraform/modules/github-actions-oidc
# Purpose: Provisions IAM OIDC provider and role for GitHub Actions to
#          authenticate to AWS and trigger CodeBuild, following
#          User → Role → Policy architecture
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
      Project   = var.project_name
      ManagedBy = "terraform"
      Module    = "github-actions-oidc"
    },
    var.tags
  )
}

# -----------------------------------------------------------------------------
# IAM OIDC Provider - GitHub Actions
# Registers GitHub as a trusted identity provider in this AWS account
# -----------------------------------------------------------------------------

resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]

  tags = merge(local.common_tags, {
    Name = "GitHubOIDCProvider"
  })
}

# -----------------------------------------------------------------------------
# IAM Role - GitHubActionsCIRole
# Assumed by GitHub Actions via OIDC federation
# Trust policy restricts to specific repository and branch
# -----------------------------------------------------------------------------

resource "aws_iam_role" "github_actions_ci" {
  name = "GitHubActionsCIRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowGitHubOIDC"
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_repo}:ref:refs/heads/main"
          }
        }
      }
    ]
  })

  tags = merge(local.common_tags, {
    Name = "GitHubActionsCIRole"
  })
}

# -----------------------------------------------------------------------------
# IAM Policy - CodeBuild Trigger
# Least privilege: only start builds and read logs
# -----------------------------------------------------------------------------

resource "aws_iam_policy" "codebuild_trigger" {
  name        = "CodeBuildTriggerPolicy"
  description = "Allows GitHub Actions to trigger CodeBuild builds and read build logs"
  path        = "/"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCodeBuildTrigger"
        Effect = "Allow"
        Action = [
          "codebuild:StartBuild",
          "codebuild:BatchGetBuilds"
        ]
        Resource = var.codebuild_project_arn
      },
      {
        Sid    = "AllowCodeBuildLogs"
        Effect = "Allow"
        Action = [
          "logs:GetLogEvents"
        ]
        Resource = "arn:aws:logs:${local.region}:${local.account_id}:log-group:/aws/codebuild/*:*"
      }
    ]
  })

  tags = merge(local.common_tags, {
    Name = "CodeBuildTriggerPolicy"
  })
}

# -----------------------------------------------------------------------------
# Role-Policy Attachment
# -----------------------------------------------------------------------------

resource "aws_iam_role_policy_attachment" "codebuild_trigger" {
  role       = aws_iam_role.github_actions_ci.name
  policy_arn = aws_iam_policy.codebuild_trigger.arn
}
