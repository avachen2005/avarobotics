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

variable "log_retention_days" {
  type    = number
  default = 7
}

variable "create_api_log_group" {
  type    = bool
  default = true
}

variable "create_vpc_flow_logs" {
  type    = bool
  default = false
}

variable "tags" {
  type    = map(string)
  default = {}
}
