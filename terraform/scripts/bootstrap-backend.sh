#!/bin/bash
# Bootstrap script to create Terraform state backend resources
# Run this ONCE before initializing Terraform
#
# Prerequisites:
# - AWS CLI configured with appropriate credentials
# - Permissions to create S3 buckets and DynamoDB tables

set -e

BUCKET_NAME="avarobotics-terraform-state"
DYNAMODB_TABLE="terraform-state-lock"
REGION="ap-northeast-1"

echo "=== Terraform State Backend Bootstrap ==="
echo "Region: $REGION"
echo "S3 Bucket: $BUCKET_NAME"
echo "DynamoDB Table: $DYNAMODB_TABLE"
echo ""

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &>/dev/null; then
    echo "ERROR: AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

echo "AWS Account: $(aws sts get-caller-identity --query Account --output text)"
echo ""

# Create S3 bucket
echo "Creating S3 bucket for Terraform state..."
if aws s3api head-bucket --bucket "$BUCKET_NAME" 2>/dev/null; then
    echo "  Bucket already exists: $BUCKET_NAME"
else
    aws s3api create-bucket \
        --bucket "$BUCKET_NAME" \
        --region "$REGION" \
        --create-bucket-configuration LocationConstraint="$REGION"
    echo "  Created bucket: $BUCKET_NAME"
fi

# Enable versioning
echo "Enabling versioning on S3 bucket..."
aws s3api put-bucket-versioning \
    --bucket "$BUCKET_NAME" \
    --versioning-configuration Status=Enabled
echo "  Versioning enabled"

# Enable server-side encryption
echo "Enabling server-side encryption..."
aws s3api put-bucket-encryption \
    --bucket "$BUCKET_NAME" \
    --server-side-encryption-configuration '{
        "Rules": [{
            "ApplyServerSideEncryptionByDefault": {
                "SSEAlgorithm": "AES256"
            }
        }]
    }'
echo "  Encryption enabled (AES256)"

# Block public access
echo "Blocking public access..."
aws s3api put-public-access-block \
    --bucket "$BUCKET_NAME" \
    --public-access-block-configuration '{
        "BlockPublicAcls": true,
        "IgnorePublicAcls": true,
        "BlockPublicPolicy": true,
        "RestrictPublicBuckets": true
    }'
echo "  Public access blocked"

# Create DynamoDB table for state locking
echo ""
echo "Creating DynamoDB table for state locking..."
if aws dynamodb describe-table --table-name "$DYNAMODB_TABLE" --region "$REGION" &>/dev/null; then
    echo "  Table already exists: $DYNAMODB_TABLE"
else
    aws dynamodb create-table \
        --table-name "$DYNAMODB_TABLE" \
        --attribute-definitions AttributeName=LockID,AttributeType=S \
        --key-schema AttributeName=LockID,KeyType=HASH \
        --billing-mode PAY_PER_REQUEST \
        --region "$REGION"
    echo "  Created table: $DYNAMODB_TABLE"

    echo "  Waiting for table to be active..."
    aws dynamodb wait table-exists --table-name "$DYNAMODB_TABLE" --region "$REGION"
    echo "  Table is active"
fi

echo ""
echo "=== Bootstrap Complete ==="
echo ""
echo "You can now initialize Terraform with:"
echo "  cd terraform/environments/dev"
echo "  terraform init"
