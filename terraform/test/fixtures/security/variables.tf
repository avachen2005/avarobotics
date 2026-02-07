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

variable "alb_ingress_ports" {
  type    = list(number)
  default = [80]
}

variable "app_port" {
  type    = number
  default = 8080
}

variable "tags" {
  type    = map(string)
  default = {}
}
