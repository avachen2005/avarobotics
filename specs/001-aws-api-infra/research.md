# Research: AWS API Infrastructure

**Feature**: 001-aws-api-infra
**Date**: 2026-02-01

## Terraform State Management

### Decision: S3 Backend with DynamoDB Locking

**Rationale**:
- S3 provides durable, versioned state storage
- DynamoDB enables state locking to prevent concurrent modifications
- Native AWS integration, no additional services needed
- Cost-effective (S3 storage + DynamoDB on-demand)

**Alternatives Considered**:
| Alternative | Why Rejected |
|-------------|--------------|
| Local state | Not suitable for team collaboration, no locking |
| Terraform Cloud | Additional service/cost, overkill for dev environment |
| GitLab/GitHub state | Vendor lock-in, less mature than S3 |

**Implementation**:
```hcl
terraform {
  backend "s3" {
    bucket         = "avarobotics-terraform-state"
    key            = "dev/api-infra/terraform.tfstate"
    region         = "ap-northeast-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}
```

## Module Structure Pattern

### Decision: Feature-based Modules

**Rationale**:
- Each module handles one logical concern (networking, security, etc.)
- Clear input/output contracts between modules
- Easier to test and maintain independently
- Supports PR size limits (each module can be a separate PR)

**Alternatives Considered**:
| Alternative | Why Rejected |
|-------------|--------------|
| Monolithic single file | Hard to maintain, violates PR size limit |
| Resource-per-file | Too granular, increases complexity |
| Terragrunt | Additional tooling overhead for simple use case |

## AWS Provider Configuration

### Decision: AWS Provider ~> 5.0 with Explicit Region

**Rationale**:
- Version 5.x is current stable with latest features
- Explicit region prevents accidental cross-region deployments
- Default tags applied at provider level for consistency

**Implementation**:
```hcl
provider "aws" {
  region = "ap-northeast-1"

  default_tags {
    tags = {
      Environment = var.environment
      Project     = "avarobotics-api"
      ManagedBy   = "terraform"
    }
  }
}
```

## VPC CIDR Strategy

### Decision: 10.0.0.0/16 with /24 Subnets

**Rationale**:
- /16 provides 65,536 IPs, sufficient for growth
- /24 subnets (256 IPs each) balance between granularity and simplicity
- Non-overlapping with common corporate networks
- Standard pattern for AWS VPCs

**CIDR Allocation**:
| Subnet | CIDR | Purpose |
|--------|------|---------|
| Public Subnet 1 | 10.0.1.0/24 | ALB, public resources (AZ-a) |
| Public Subnet 2 | 10.0.2.0/24 | ALB, public resources (AZ-c) - future |
| Reserved | 10.0.10.0/24 - 10.0.99.0/24 | Future private subnets |

## Security Group Strategy

### Decision: Layered Security Groups

**Rationale**:
- Separate SGs for ALB and application instances
- Principle of least privilege
- Easy to audit and modify independently

**Security Groups**:
| SG Name | Inbound | Outbound | Attached To |
|---------|---------|----------|-------------|
| alb-sg | 80, 443 from 0.0.0.0/0 | All to VPC | ALB |
| app-sg | App port from alb-sg only | 443 to 0.0.0.0/0 (AWS APIs) | App instances |

## ALB Configuration

### Decision: Application Load Balancer with HTTP Listener (Dev)

**Rationale**:
- Layer 7 load balancing supports path-based routing
- HTTP only for dev (no SSL certificate cost)
- Target group with health checks for reliability
- HTTPS to be added for staging/prod

**Alternatives Considered**:
| Alternative | Why Rejected |
|-------------|--------------|
| NLB | Layer 4 only, no path routing |
| Classic LB | Deprecated, less features |
| API Gateway | Overkill for simple load balancing |

## S3 Bucket Configuration

### Decision: Private Bucket with Versioning

**Rationale**:
- Block all public access by default (security)
- Versioning protects against accidental deletion
- Server-side encryption (SSE-S3) for data at rest
- Lifecycle rules for cost optimization

**Configuration**:
- Public access: Blocked
- Versioning: Enabled
- Encryption: SSE-S3
- Lifecycle: Archive to Glacier after 90 days (optional)

## CloudWatch Logging Strategy

### Decision: CloudWatch Logs with S3 Archive

**Rationale**:
- Native AWS integration
- Real-time log streaming and search
- Cost-effective with log retention policies
- S3 export for long-term storage

**Retention Policy**:
| Log Type | CloudWatch Retention | S3 Archive |
|----------|---------------------|------------|
| Application logs | 7 days | After 7 days |
| ALB access logs | Direct to S3 | 30 days |
| VPC Flow logs | 7 days (optional) | - |

## Naming Convention

### Decision: {env}-{project}-{resource}

**Rationale**:
- Environment prefix enables filtering in AWS Console
- Project name groups related resources
- Resource type suffix for clarity

**Examples**:
- VPC: `dev-avarobotics-vpc`
- ALB: `dev-avarobotics-alb`
- S3: `dev-avarobotics-assets` (globally unique)
- SG: `dev-avarobotics-alb-sg`

## Tagging Strategy

### Decision: Mandatory Tags via Provider Default

**Required Tags**:
| Tag | Value | Purpose |
|-----|-------|---------|
| Environment | dev/staging/prod | Cost allocation, filtering |
| Project | avarobotics-api | Resource grouping |
| ManagedBy | terraform | Identify IaC-managed resources |
| Owner | (optional) | Team ownership |

## Authentication Strategy

### Decision: AWS CLI Profile / Environment Variables

**Rationale**:
- No credentials stored in code
- Supports both local dev (profile) and CI/CD (env vars)
- IAM role assumption for production

**Local Development**:
```bash
export AWS_PROFILE=avarobotics-dev
terraform plan
```

**CI/CD**:
```yaml
env:
  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```
