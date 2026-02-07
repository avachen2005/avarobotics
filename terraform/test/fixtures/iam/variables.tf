variable "aws_region" {
  type    = string
  default = "ap-northeast-1"
}

variable "environment" {
  type    = string
  default = "dev"
}

variable "project_name" {
  type    = string
  default = "avarobotics"
}

variable "role_name" {
  type    = string
  default = "TerraformDeployRole"
}

variable "allowed_users" {
  type    = list(string)
  default = ["arn:aws:iam::123456789012:user/test_user"]
}

variable "max_session_duration" {
  type    = number
  default = 14400
}

variable "state_bucket_name" {
  type    = string
  default = "avarobotics-terraform-state"
}

variable "state_lock_table_name" {
  type    = string
  default = "terraform-state-lock"
}

variable "tags" {
  type    = map(string)
  default = {}
}
