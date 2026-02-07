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
  default = "terratest-avarobotics"
}

variable "force_destroy" {
  type    = bool
  default = true
}

variable "create_assets_bucket" {
  type    = bool
  default = true
}

variable "assets_versioning_enabled" {
  type    = bool
  default = true
}

variable "assets_lifecycle_glacier_days" {
  type    = number
  default = 0
}

variable "create_logs_bucket" {
  type    = bool
  default = true
}

variable "logs_retention_days" {
  type    = number
  default = 7
}

variable "tags" {
  type    = map(string)
  default = {}
}
