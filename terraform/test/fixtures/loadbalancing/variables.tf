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

variable "vpc_id" {
  type    = string
  default = "vpc-00000000000000000"
}

variable "public_subnet_ids" {
  type    = list(string)
  default = ["subnet-00000000000000001", "subnet-00000000000000002"]
}

variable "security_group_ids" {
  type    = list(string)
  default = ["sg-00000000000000001"]
}

variable "enable_https" {
  type    = bool
  default = false
}

variable "target_port" {
  type    = number
  default = 8080
}

variable "health_check_path" {
  type    = string
  default = "/health"
}

variable "enable_access_logs" {
  type    = bool
  default = false
}

variable "tags" {
  type    = map(string)
  default = {}
}
