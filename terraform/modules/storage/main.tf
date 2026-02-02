# Storage Module
# Creates S3 buckets for assets and ALB logs

locals {
  name_prefix = "${var.environment}-${var.project_name}"

  common_tags = merge(var.tags, {
    Module      = "storage"
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "terraform"
  })

  # ALB log delivery account ID for ap-northeast-1 (Tokyo)
  # See: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/enable-access-logging.html
  elb_account_id = "582318560864"
}

# Get current AWS account ID
data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

# =============================================================================
# Assets Bucket
# =============================================================================

resource "aws_s3_bucket" "assets" {
  count = var.create_assets_bucket ? 1 : 0

  bucket        = "${local.name_prefix}-assets-${data.aws_caller_identity.current.account_id}"
  force_destroy = var.force_destroy

  tags = merge(local.common_tags, {
    Name = "${local.name_prefix}-assets"
    Type = "assets"
  })
}

# Assets Bucket Versioning
resource "aws_s3_bucket_versioning" "assets" {
  count = var.create_assets_bucket ? 1 : 0

  bucket = aws_s3_bucket.assets[0].id
  versioning_configuration {
    status = var.assets_versioning_enabled ? "Enabled" : "Disabled"
  }
}

# Assets Bucket Encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "assets" {
  count = var.create_assets_bucket ? 1 : 0

  bucket = aws_s3_bucket.assets[0].id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
    bucket_key_enabled = true
  }
}

# Assets Bucket Public Access Block
resource "aws_s3_bucket_public_access_block" "assets" {
  count = var.create_assets_bucket ? 1 : 0

  bucket = aws_s3_bucket.assets[0].id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Assets Bucket Lifecycle Rules
resource "aws_s3_bucket_lifecycle_configuration" "assets" {
  count = var.create_assets_bucket && var.assets_lifecycle_glacier_days > 0 ? 1 : 0

  bucket = aws_s3_bucket.assets[0].id

  rule {
    id     = "transition-to-glacier"
    status = "Enabled"

    filter {} # Apply to all objects

    transition {
      days          = var.assets_lifecycle_glacier_days
      storage_class = "GLACIER"
    }

    noncurrent_version_transition {
      noncurrent_days = var.assets_lifecycle_glacier_days
      storage_class   = "GLACIER"
    }
  }
}

# =============================================================================
# ALB Logs Bucket
# =============================================================================

resource "aws_s3_bucket" "alb_logs" {
  count = var.create_logs_bucket ? 1 : 0

  bucket        = "${local.name_prefix}-alb-logs-${data.aws_caller_identity.current.account_id}"
  force_destroy = var.force_destroy

  tags = merge(local.common_tags, {
    Name = "${local.name_prefix}-alb-logs"
    Type = "logs"
  })
}

# ALB Logs Bucket Encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "alb_logs" {
  count = var.create_logs_bucket ? 1 : 0

  bucket = aws_s3_bucket.alb_logs[0].id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
    bucket_key_enabled = true
  }
}

# ALB Logs Bucket Public Access Block
resource "aws_s3_bucket_public_access_block" "alb_logs" {
  count = var.create_logs_bucket ? 1 : 0

  bucket = aws_s3_bucket.alb_logs[0].id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# ALB Logs Bucket Policy - Allow ELB to write logs
resource "aws_s3_bucket_policy" "alb_logs" {
  count = var.create_logs_bucket ? 1 : 0

  bucket = aws_s3_bucket.alb_logs[0].id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowELBRootAccount"
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::${local.elb_account_id}:root"
        }
        Action   = "s3:PutObject"
        Resource = "${aws_s3_bucket.alb_logs[0].arn}/*"
      },
      {
        Sid    = "AllowELBLogDelivery"
        Effect = "Allow"
        Principal = {
          Service = "delivery.logs.amazonaws.com"
        }
        Action   = "s3:PutObject"
        Resource = "${aws_s3_bucket.alb_logs[0].arn}/*"
        Condition = {
          StringEquals = {
            "s3:x-amz-acl" = "bucket-owner-full-control"
          }
        }
      },
      {
        Sid    = "AllowELBLogDeliveryAclCheck"
        Effect = "Allow"
        Principal = {
          Service = "delivery.logs.amazonaws.com"
        }
        Action   = "s3:GetBucketAcl"
        Resource = aws_s3_bucket.alb_logs[0].arn
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.alb_logs]
}

# ALB Logs Bucket Lifecycle Rules
resource "aws_s3_bucket_lifecycle_configuration" "alb_logs" {
  count = var.create_logs_bucket && var.logs_retention_days > 0 ? 1 : 0

  bucket = aws_s3_bucket.alb_logs[0].id

  rule {
    id     = "expire-old-logs"
    status = "Enabled"

    filter {} # Apply to all objects

    expiration {
      days = var.logs_retention_days
    }
  }
}
