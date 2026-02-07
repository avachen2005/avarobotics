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

variable "ecr_repository_url" {
  type    = string
  default = "123456789012.dkr.ecr.ap-northeast-1.amazonaws.com/dev-avarobotics-api"
}

variable "target_group_arn" {
  type    = string
  default = "arn:aws:elasticloadbalancing:ap-northeast-1:123456789012:targetgroup/dev-avarobotics-tg/0000000000000000"
}

variable "subnet_ids" {
  type    = list(string)
  default = ["subnet-00000000000000001", "subnet-00000000000000002"]
}

variable "security_group_ids" {
  type    = list(string)
  default = ["sg-00000000000000001"]
}

variable "container_port" {
  type    = number
  default = 8080
}

variable "task_cpu" {
  type    = number
  default = 256
}

variable "task_memory" {
  type    = number
  default = 512
}

variable "desired_count" {
  type    = number
  default = 1
}

variable "min_capacity" {
  type    = number
  default = 1
}

variable "max_capacity" {
  type    = number
  default = 4
}

variable "cpu_target_value" {
  type    = number
  default = 70
}

variable "log_group_name" {
  type    = string
  default = "/ecs/dev-avarobotics-api"
}

variable "tags" {
  type    = map(string)
  default = {}
}
