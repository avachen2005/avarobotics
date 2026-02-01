# Data Model: AWS API Infrastructure

**Feature**: 001-aws-api-infra
**Date**: 2026-02-01

## Resource Dependency Graph

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              VPC                                         │
│                         (10.0.0.0/16)                                   │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
            ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
            │   Internet  │ │   Public    │ │   Route     │
            │   Gateway   │ │   Subnet    │ │   Table     │
            └─────────────┘ └─────────────┘ └─────────────┘
                    │              │              │
                    └──────────────┼──────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
            ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
            │  Network    │ │  Security   │ │  Security   │
            │    ACL      │ │  Group ALB  │ │  Group App  │
            └─────────────┘ └─────────────┘ └─────────────┘
                                   │
                                   ▼
                           ┌─────────────┐
                           │     ALB     │
                           │  (public)   │
                           └─────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
            ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
            │  Listener   │ │  Listener   │ │   Target    │
            │   (HTTP)    │ │  (HTTPS)*   │ │   Group     │
            └─────────────┘ └─────────────┘ └─────────────┘
                                                  │
                                                  ▼
                                          ┌─────────────┐
                                          │   Health    │
                                          │   Check     │
                                          └─────────────┘

            * HTTPS listener for staging/prod only

Independent Resources (no VPC dependency):
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   S3 Bucket     │  │  CloudWatch     │  │   S3 Bucket     │
│   (assets)      │  │  Log Group      │  │  (ALB logs)     │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

## Entity Definitions

### VPC
| Attribute | Type | Value | Notes |
|-----------|------|-------|-------|
| cidr_block | string | 10.0.0.0/16 | 65,536 IPs |
| enable_dns_hostnames | bool | true | Required for ALB |
| enable_dns_support | bool | true | Default |
| tags.Name | string | {env}-avarobotics-vpc | |

### Public Subnet
| Attribute | Type | Value | Notes |
|-----------|------|-------|-------|
| vpc_id | ref | VPC.id | Parent VPC |
| cidr_block | string | 10.0.1.0/24 | 256 IPs |
| availability_zone | string | ap-northeast-1a | Single AZ for dev |
| map_public_ip_on_launch | bool | true | Public subnet |
| tags.Name | string | {env}-avarobotics-public-1a | |

### Internet Gateway
| Attribute | Type | Value | Notes |
|-----------|------|-------|-------|
| vpc_id | ref | VPC.id | Attached to VPC |
| tags.Name | string | {env}-avarobotics-igw | |

### Route Table
| Attribute | Type | Value | Notes |
|-----------|------|-------|-------|
| vpc_id | ref | VPC.id | Parent VPC |
| route.cidr_block | string | 0.0.0.0/0 | All internet traffic |
| route.gateway_id | ref | IGW.id | Via Internet Gateway |
| tags.Name | string | {env}-avarobotics-public-rt | |

### Security Group (ALB)
| Attribute | Type | Value | Notes |
|-----------|------|-------|-------|
| name | string | {env}-avarobotics-alb-sg | |
| vpc_id | ref | VPC.id | Parent VPC |
| ingress.port | int | 80 | HTTP |
| ingress.port | int | 443 | HTTPS (future) |
| ingress.cidr | string | 0.0.0.0/0 | Public access |
| egress.port | int | 0 | All outbound |
| egress.cidr | string | 0.0.0.0/0 | All destinations |

### Security Group (App)
| Attribute | Type | Value | Notes |
|-----------|------|-------|-------|
| name | string | {env}-avarobotics-app-sg | |
| vpc_id | ref | VPC.id | Parent VPC |
| ingress.port | int | 8080 | App port |
| ingress.source | ref | SG-ALB.id | From ALB only |
| egress.port | int | 443 | HTTPS for AWS APIs |
| egress.cidr | string | 0.0.0.0/0 | All destinations |

### Network ACL
| Attribute | Type | Value | Notes |
|-----------|------|-------|-------|
| vpc_id | ref | VPC.id | Parent VPC |
| subnet_ids | list | [PublicSubnet.id] | Associated subnets |
| ingress_rules | list | See below | Inbound rules |
| egress_rules | list | See below | Outbound rules |

**ACL Rules**:
| Rule # | Type | Port | CIDR | Action |
|--------|------|------|------|--------|
| 100 | ingress | 80 | 0.0.0.0/0 | allow |
| 110 | ingress | 443 | 0.0.0.0/0 | allow |
| 120 | ingress | 1024-65535 | 0.0.0.0/0 | allow (ephemeral) |
| 100 | egress | 80 | 0.0.0.0/0 | allow |
| 110 | egress | 443 | 0.0.0.0/0 | allow |
| 120 | egress | 1024-65535 | 0.0.0.0/0 | allow (ephemeral) |
| * | both | all | 0.0.0.0/0 | deny (implicit) |

### Application Load Balancer
| Attribute | Type | Value | Notes |
|-----------|------|-------|-------|
| name | string | {env}-avarobotics-alb | |
| internal | bool | false | Public-facing |
| load_balancer_type | string | application | Layer 7 |
| security_groups | list | [SG-ALB.id] | ALB security group |
| subnets | list | [PublicSubnet.id] | Public subnets |
| enable_deletion_protection | bool | false | Dev only |

### ALB Listener (HTTP)
| Attribute | Type | Value | Notes |
|-----------|------|-------|-------|
| load_balancer_arn | ref | ALB.arn | Parent ALB |
| port | int | 80 | HTTP |
| protocol | string | HTTP | |
| default_action.type | string | forward | Route to TG |
| default_action.target_group_arn | ref | TG.arn | Target group |

### Target Group
| Attribute | Type | Value | Notes |
|-----------|------|-------|-------|
| name | string | {env}-avarobotics-tg | |
| port | int | 8080 | App port |
| protocol | string | HTTP | |
| vpc_id | ref | VPC.id | Parent VPC |
| target_type | string | ip | For EKS/Fargate |
| health_check.path | string | /health | Health endpoint |
| health_check.interval | int | 30 | Seconds |
| health_check.timeout | int | 5 | Seconds |
| health_check.healthy_threshold | int | 2 | Checks |
| health_check.unhealthy_threshold | int | 3 | Checks |

### S3 Bucket (Assets)
| Attribute | Type | Value | Notes |
|-----------|------|-------|-------|
| bucket | string | {env}-avarobotics-assets-{random} | Globally unique |
| versioning.enabled | bool | true | Protection |
| server_side_encryption | string | AES256 | SSE-S3 |
| public_access_block | bool | true | All blocked |
| lifecycle_rule | object | Archive after 90 days | Optional |

### S3 Bucket (ALB Logs)
| Attribute | Type | Value | Notes |
|-----------|------|-------|-------|
| bucket | string | {env}-avarobotics-alb-logs-{random} | Globally unique |
| versioning.enabled | bool | false | Logs don't need versioning |
| lifecycle_rule.expiration | int | 30 | Days |
| policy | string | ALB log delivery policy | Required for ALB |

### CloudWatch Log Group
| Attribute | Type | Value | Notes |
|-----------|------|-------|-------|
| name | string | /avarobotics/{env}/api | Log group path |
| retention_in_days | int | 7 | Short-term retention |
| tags.Name | string | {env}-avarobotics-logs | |

## State Transitions

### ALB Target Health States

```
┌─────────┐     register      ┌─────────┐
│ unused  │ ─────────────────▶│ initial │
└─────────┘                   └─────────┘
                                   │
                         health check pass
                                   ▼
                              ┌─────────┐
              ◀───────────────│ healthy │
        health check fail     └─────────┘
              │                    │
              ▼                    │
         ┌─────────┐               │
         │unhealthy│───────────────┘
         └─────────┘   health check pass
              │
              │ deregister
              ▼
         ┌─────────┐
         │ draining│
         └─────────┘
              │
              │ drain complete
              ▼
         ┌─────────┐
         │ unused  │
         └─────────┘
```

## Validation Rules

| Entity | Rule | Error Message |
|--------|------|---------------|
| VPC CIDR | Must be /16 to /28 | Invalid CIDR block size |
| Subnet CIDR | Must be within VPC CIDR | Subnet CIDR outside VPC range |
| S3 bucket name | 3-63 chars, lowercase, no underscores | Invalid bucket name |
| SG rule | Port 0-65535 | Invalid port number |
| ACL rule number | 1-32766 | Invalid rule number |
| Health check path | Must start with / | Invalid health check path |
