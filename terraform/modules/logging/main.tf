# Logging Module
# Creates CloudWatch Log Groups for application and VPC flow logs

locals {
  name_prefix = "${var.environment}-${var.project_name}"
  log_prefix  = "/${var.project_name}/${var.environment}"

  common_tags = merge(var.tags, {
    Module      = "logging"
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "terraform"
  })
}

# =============================================================================
# API Application Log Group
# =============================================================================

resource "aws_cloudwatch_log_group" "api" {
  count = var.create_api_log_group ? 1 : 0

  name              = "${local.log_prefix}/api"
  retention_in_days = var.log_retention_days

  tags = merge(local.common_tags, {
    Name = "${local.name_prefix}-api-logs"
    Type = "application"
  })
}

# =============================================================================
# VPC Flow Logs (Optional)
# =============================================================================

resource "aws_cloudwatch_log_group" "vpc_flow" {
  count = var.create_vpc_flow_logs ? 1 : 0

  name              = "${local.log_prefix}/vpc-flow"
  retention_in_days = var.log_retention_days

  tags = merge(local.common_tags, {
    Name = "${local.name_prefix}-vpc-flow-logs"
    Type = "vpc-flow"
  })
}

# IAM Role for VPC Flow Logs
resource "aws_iam_role" "vpc_flow_logs" {
  count = var.create_vpc_flow_logs ? 1 : 0

  name = "${local.name_prefix}-vpc-flow-logs-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "vpc-flow-logs.amazonaws.com"
        }
      }
    ]
  })

  tags = merge(local.common_tags, {
    Name = "${local.name_prefix}-vpc-flow-logs-role"
  })
}

# IAM Policy for VPC Flow Logs
resource "aws_iam_role_policy" "vpc_flow_logs" {
  count = var.create_vpc_flow_logs ? 1 : 0

  name = "${local.name_prefix}-vpc-flow-logs-policy"
  role = aws_iam_role.vpc_flow_logs[0].id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "logs:DescribeLogGroups",
          "logs:DescribeLogStreams"
        ]
        Effect   = "Allow"
        Resource = "*"
      }
    ]
  })
}

# VPC Flow Log
resource "aws_flow_log" "main" {
  count = var.create_vpc_flow_logs ? 1 : 0

  iam_role_arn    = aws_iam_role.vpc_flow_logs[0].arn
  log_destination = aws_cloudwatch_log_group.vpc_flow[0].arn
  traffic_type    = "ALL"
  vpc_id          = var.vpc_id

  tags = merge(local.common_tags, {
    Name = "${local.name_prefix}-vpc-flow-log"
  })
}
