# Terraform Backend Configuration for Dev Environment
#
# State Backend:
# - S3 Bucket: avarobotics-terraform-state
# - DynamoDB Table: terraform-state-lock

terraform {
  backend "s3" {
    bucket         = "avarobotics-terraform-state"
    key            = "dev/api-infra/terraform.tfstate"
    region         = "ap-northeast-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}
