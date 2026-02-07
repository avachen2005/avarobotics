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

variable "vpc_cidr" {
  type    = string
  default = "10.99.0.0/16"
}

variable "public_subnet_cidrs" {
  type    = list(string)
  default = ["10.99.1.0/24", "10.99.2.0/24"]
}

variable "availability_zones" {
  type    = list(string)
  default = ["ap-northeast-1a", "ap-northeast-1c"]
}

variable "tags" {
  type    = map(string)
  default = {}
}
