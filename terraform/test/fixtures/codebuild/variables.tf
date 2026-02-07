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

variable "github_repo" {
  type    = string
  default = "https://github.com/avachen2005/avarobotics.git"
}

variable "github_repo_name" {
  type    = string
  default = "avachen2005/avarobotics"
}

variable "ecr_repo_name" {
  type    = string
  default = "avarobotics-api"
}

variable "codebuild_compute_type" {
  type    = string
  default = "BUILD_GENERAL1_SMALL"
}

variable "tags" {
  type    = map(string)
  default = {}
}
