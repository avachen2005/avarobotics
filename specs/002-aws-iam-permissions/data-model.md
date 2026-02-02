# Data Model: AWS IAM Permissions

**Feature**: 002-aws-iam-permissions
**Date**: 2026-02-01

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        AWS Account (528564297750)                    │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ contains
                                    ▼
┌─────────────────────┐      ┌─────────────────────┐
│    IAM User         │      │    IAM Role         │
│ avarobotics_local   │─────▶│ TerraformDeployRole │
│                     │assume│                     │
│ (已存在，不由此     │      │ - Trust Policy      │
│  spec 管理)         │      │ - Max Session: 4hr  │
└─────────────────────┘      └──────────┬──────────┘
                                        │
                                        │ has attached
                              ┌─────────┴─────────┐
                              ▼                   ▼
                 ┌────────────────────┐  ┌────────────────────┐
                 │ IAM Policy         │  │ IAM Policy         │
                 │ TerraformState     │  │ TerraformInfra     │
                 │ BackendPolicy      │  │ structurePolicy    │
                 │                    │  │                    │
                 │ - S3 permissions   │  │ - EC2/VPC perms    │
                 │ - DynamoDB perms   │  │ - ELB perms        │
                 │                    │  │ - S3 perms         │
                 │                    │  │ - CloudWatch perms │
                 │                    │  │ - IAM (limited)    │
                 └────────────────────┘  └────────────────────┘
                           │                       │
                           │ grants access to      │ grants access to
                           ▼                       ▼
                 ┌────────────────────┐  ┌────────────────────┐
                 │ AWS Resources      │  │ AWS Resources      │
                 │                    │  │                    │
                 │ - S3: avarobotics- │  │ - VPC, Subnets     │
                 │   terraform-state  │  │ - Internet Gateway │
                 │ - DynamoDB:        │  │ - Route Tables     │
                 │   terraform-state- │  │ - Security Groups  │
                 │   lock             │  │ - Network ACLs     │
                 │                    │  │ - ALB, Target Group│
                 │                    │  │ - S3 (app buckets) │
                 │                    │  │ - CloudWatch Logs  │
                 └────────────────────┘  └────────────────────┘
```

## Entities

### IAM Role: TerraformDeployRole

| Attribute | Value | Description |
|-----------|-------|-------------|
| Name | `TerraformDeployRole` | Role 名稱 |
| Path | `/` | IAM path |
| MaxSessionDuration | `14400` | 4 小時（秒） |
| AssumeRolePolicyDocument | Trust Policy | 見下方 |
| Tags | Name, Project, ManagedBy | 標準 tags |

### Trust Policy (Assume Role Policy)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAssumeRole",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::${ACCOUNT_ID}:user/avarobotics_local"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

### IAM Policy: TerraformStateBackendPolicy

| Attribute | Value | Description |
|-----------|-------|-------------|
| Name | `TerraformStateBackendPolicy` | Policy 名稱 |
| Path | `/` | IAM path |
| Description | S3 and DynamoDB permissions for Terraform state | 描述 |

**Permissions Summary**:
- S3: GetObject, PutObject, DeleteObject, ListBucket (on specific bucket)
- DynamoDB: GetItem, PutItem, DeleteItem (on specific table)

### IAM Policy: TerraformInfrastructurePolicy

| Attribute | Value | Description |
|-----------|-------|-------------|
| Name | `TerraformInfrastructurePolicy` | Policy 名稱 |
| Path | `/` | IAM path |
| Description | Permissions for deploying AWS infrastructure | 描述 |

**Permissions Summary**:
- EC2: VPC, Subnet, IGW, Route Table, Security Group, Network ACL operations
- ELB: Load Balancer, Target Group, Listener operations
- S3: Bucket creation and configuration
- CloudWatch Logs: Log Group operations
- IAM: Limited role operations for service-linked roles

## Resource Dependencies

```
┌──────────────────────────────────────────────────────────────┐
│                    Deployment Order                           │
└──────────────────────────────────────────────────────────────┘

Step 1: Create Policies (可並行)
    ├── TerraformStateBackendPolicy
    └── TerraformInfrastructurePolicy

Step 2: Create Role (依賴 Policies)
    └── TerraformDeployRole
        ├── Trust Policy (inline)
        ├── Attach: TerraformStateBackendPolicy
        └── Attach: TerraformInfrastructurePolicy

Step 3: Verification
    └── User assumes role and tests permissions
```

## Naming Conventions

| Resource Type | Naming Pattern | Example |
|---------------|----------------|---------|
| IAM Role | `{Purpose}Role` | `TerraformDeployRole` |
| IAM Policy | `{Purpose}Policy` | `TerraformStateBackendPolicy` |
| Tags | `{Project}-{Environment}-{Resource}` | `avarobotics-dev-terraform-role` |

## State Transitions

### Role Assumption Flow

```
┌─────────────┐     sts:AssumeRole     ┌─────────────────┐
│ IAM User    │ ───────────────────▶  │ STS Service     │
│ credentials │                        │                 │
└─────────────┘                        └────────┬────────┘
                                                │
                                                │ Returns temporary
                                                │ credentials
                                                ▼
                                       ┌─────────────────┐
                                       │ Temporary       │
                                       │ Credentials     │
                                       │ - AccessKeyId   │
                                       │ - SecretKey     │
                                       │ - SessionToken  │
                                       │ - Expiration    │
                                       └────────┬────────┘
                                                │
                                                │ Used to call
                                                │ AWS APIs
                                                ▼
                                       ┌─────────────────┐
                                       │ AWS Services    │
                                       │ (with Role's    │
                                       │  permissions)   │
                                       └─────────────────┘
```

## Validation Rules

| Rule | Description | Enforcement |
|------|-------------|-------------|
| Unique Role Name | Role name must be unique within account | AWS enforced |
| Unique Policy Name | Policy name must be unique within account | AWS enforced |
| Valid Principal | Trust policy principal must be valid IAM entity | AWS enforced |
| Session Duration | Must be between 900 and 43200 seconds | AWS enforced |
| Policy Size | Each policy document max 6,144 characters | AWS enforced |
