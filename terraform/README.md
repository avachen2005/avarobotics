# Terraform Infrastructure

AWS infrastructure provisioned with Terraform for Ava Robotics API.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Bootstrap](#bootstrap-first-time-setup)
- [Usage](#usage)
- [Modules](#modules)
- [Outputs](#outputs)
- [Test Coverage](#test-coverage)
- [Development Notes](#development-notes)
- [Related Documentation](#related-documentation)

---

## Prerequisites

- Terraform >= 1.5.0
- AWS CLI configured with appropriate credentials
- S3 bucket and DynamoDB table for Terraform state (see Bootstrap section)

## Project Structure

```
terraform/
├── environments/
│   └── dev/                    # Dev environment configuration
│       ├── main.tf             # Module composition
│       ├── variables.tf        # Input variables
│       ├── outputs.tf          # Output values
│       ├── terraform.tfvars    # Variable values
│       └── backend.tf          # S3 backend configuration
│
├── modules/
│   ├── networking/             # VPC, Subnets, IGW, Route Tables
│   ├── security/               # Security Groups, Network ACLs
│   ├── loadbalancing/          # ALB, Target Group, Listeners
│   ├── storage/                # S3 buckets for assets and logs
│   └── logging/                # CloudWatch Log Groups
│
├── shared/
│   └── tags.tf                 # Common tagging strategy
│
└── scripts/
    └── bootstrap-backend.sh    # Create S3/DynamoDB for state
```

## Bootstrap (First Time Setup)

Before running Terraform, create the state backend:

```bash
cd terraform/scripts
chmod +x bootstrap-backend.sh
./bootstrap-backend.sh
```

This creates:
- S3 bucket: `avarobotics-terraform-state`
- DynamoDB table: `terraform-state-lock`

## Usage

### Initialize

```bash
cd terraform/environments/dev
terraform init
```

### Plan

```bash
terraform plan
```

### Apply

```bash
terraform apply
```

### Destroy

```bash
terraform destroy
```

## Modules

### Networking

Creates VPC infrastructure:
- VPC with DNS support
- Public subnets across AZs
- Internet Gateway
- Route tables

### Security

Network security controls:
- ALB Security Group (HTTP/HTTPS inbound)
- App Security Group (traffic from ALB only)
- Network ACL with explicit rules

### Load Balancing

Application Load Balancer:
- ALB in public subnets
- HTTP listener (port 80)
- Target group with health checks
- Optional HTTPS listener

### Storage

S3 buckets:
- Assets bucket (versioned, encrypted)
- ALB logs bucket (with retention policy)

### Logging

CloudWatch logging:
- API application log group
- Optional VPC flow logs

## Outputs

After applying, key outputs include:
- `alb_dns_name` - ALB DNS for accessing the API
- `target_group_arn` - For registering compute targets
- `api_log_group_name` - CloudWatch log group for application

## Test Coverage

Tests live in `test/` using [Terratest](https://terratest.gruntwork.io/). See [test/README.md](test/README.md) for full details.

| Module | Validate | Format | Plan | Integration |
|--------|----------|--------|------|-------------|
| networking | Yes | Yes | Yes | Yes |
| security | Yes | Yes | Yes | No |
| storage | Yes | Yes | Yes | No |
| logging | Yes | Yes | Yes | Yes |
| loadbalancing | Yes | Yes | Yes | No |
| iam | Yes | Yes | Yes | No |
| cognito | Yes | Yes | No | No |

```bash
cd terraform/test

make test-validate      # No AWS creds needed
make test-plan          # Needs AWS creds, free
make test-integration   # Deploys real resources
```

## Development Notes

- All modules are validated with `terraform validate`
- Format code with `terraform fmt -recursive`
- State is stored in S3 with DynamoDB locking
- Dev environment uses `force_destroy = true` for easy cleanup

## Related Documentation

- [Spec](../specs/001-aws-api-infra/spec.md)
- [Plan](../specs/001-aws-api-infra/plan.md)
- [Tasks](../specs/001-aws-api-infra/tasks.md)
