# 001 - AWS API Infrastructure

## Overview

AWS 基礎設施建置，支援 API service 部署，包含網路、負載平衡、儲存和日誌系統。

## Status

| Item | Status |
|------|--------|
| Spec | Done |
| Plan | Done |
| Tasks | Done |
| Implementation | Done |

### Implementation Summary

All phases completed and ready for review:

| Phase | Issue | Status |
|-------|-------|--------|
| Phase 1: Setup | [#2](https://github.com/avachen2005/avarobotics/issues/2) | In Review |
| Phase 2: Networking | [#3](https://github.com/avachen2005/avarobotics/issues/3) | In Review |
| Phase 3: US1 (ALB) | [#4](https://github.com/avachen2005/avarobotics/issues/4) | In Review |
| Phase 4: US2 (Security) | [#5](https://github.com/avachen2005/avarobotics/issues/5) | In Review |
| Phase 5: US3 (Storage) | [#6](https://github.com/avachen2005/avarobotics/issues/6) | In Review |
| Phase 6: US4 (Logging) | [#7](https://github.com/avachen2005/avarobotics/issues/7) | In Review |
| Phase 7: Polish | [#8](https://github.com/avachen2005/avarobotics/issues/8) | In Review |

## User Stories

| ID | Story | Priority | Description |
|----|-------|----------|-------------|
| US-1 | Deploy API Service | P1 | VPC + ALB + Target Group 讓 API 可被外部存取 |
| US-2 | Secure Network Access | P1 | Security Group + Network ACL 網路安全控制 |
| US-3 | Static Asset Storage | P2 | S3 bucket 儲存靜態資源和設定檔 |
| US-4 | Centralized Logging | P2 | CloudWatch + Fluent Bit 集中式日誌收集 |

## Infrastructure Components

```
┌─────────────────────────────────────────────────────────────────┐
│                            VPC                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Public Subnets (Multi-AZ)             │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │    │
│  │  │   ALB       │  │   ALB       │  │   ALB       │      │    │
│  │  │  (AZ-a)     │  │  (AZ-b)     │  │  (AZ-c)     │      │    │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘      │    │
│  │         └────────────────┼────────────────┘             │    │
│  │                          ↓                              │    │
│  │               ┌─────────────────────┐                   │    │
│  │               │    Target Group     │                   │    │
│  │               │   (API Instances)   │                   │    │
│  │               └─────────────────────┘                   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│  Security: SG + Network ACL  │                                   │
└──────────────────────────────┼───────────────────────────────────┘
                               │
            ┌──────────────────┼──────────────────┐
            ↓                  ↓                  ↓
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │     S3       │  │  CloudWatch  │  │   Internet   │
    │   Bucket     │  │    Logs      │  │   Gateway    │
    └──────────────┘  └──────────────┘  └──────────────┘
```

## Development Constraints

- **PR Size**: Max 500 lines per PR
- **Verification**: Each PR must include verification steps
- **IaC**: All infrastructure managed via Terraform

## Files

| File | Description |
|------|-------------|
| [spec.md](./spec.md) | Feature specification |
| [plan.md](./plan.md) | Implementation plan |
| [tasks.md](./tasks.md) | Task breakdown |
| [research.md](./research.md) | Technical research |
| [data-model.md](./data-model.md) | Resource relationships |
| [quickstart.md](./quickstart.md) | Deployment guide |
| [contracts/](./contracts/) | Module interfaces |
| [checklists/requirements.md](./checklists/requirements.md) | Quality checklist |

## Quick Links

- Branch: `001-aws-api-infra`
- Project Board: [GitHub Project](https://github.com/users/avachen2005/projects/4/views/1)

## Next Steps

1. Review and merge all pending PRs
2. Run `terraform apply` to deploy infrastructure
3. Deploy API application to target group
4. Configure DNS (Route 53) to point to ALB
