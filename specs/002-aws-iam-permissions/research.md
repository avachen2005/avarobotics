# Research: AWS IAM Permissions

**Feature**: 002-aws-iam-permissions
**Date**: 2026-02-01

## Research Topics

### 1. AWS IAM Assume Role Best Practices

**Decision**: 使用 User → Role → Policy 架構，Role 透過 Trust Policy 限制只有指定 User 可以 assume。

**Rationale**:
- 臨時憑證比長期憑證更安全（自動過期）
- Role 可以集中管理權限，易於審計
- Trust Policy 提供精細的存取控制
- 符合 AWS Well-Architected Framework 安全支柱

**Alternatives Considered**:
- 直接將 Policy 附加到 User：不符合最佳實踐，難以管理多個 User
- 使用 IAM Group：適合多 User 場景，但目前只有單一 User
- 使用 AWS SSO：過於複雜，適合企業級多帳戶場景

### 2. Terraform State Backend Minimum Permissions

**Decision**: 建立專用的 State Backend Policy，包含以下權限：

**S3 權限**:
- `s3:GetObject` - 讀取 state 檔案
- `s3:PutObject` - 寫入 state 檔案
- `s3:DeleteObject` - 清理舊版本（如果啟用）
- `s3:ListBucket` - 列出 bucket 內容（workspace 支援）
- `s3:GetBucketVersioning` - 檢查版本控制狀態

**DynamoDB 權限**:
- `dynamodb:GetItem` - 讀取 lock 狀態
- `dynamodb:PutItem` - 建立 lock
- `dynamodb:DeleteItem` - 釋放 lock

**Rationale**:
- 這是 Terraform S3 backend 正常運作所需的最小權限集
- 參考 Terraform 官方文檔和 AWS 最佳實踐
- 限制資源為特定的 bucket 和 table

**Alternatives Considered**:
- 使用 S3 Full Access：權限過大，違反最小權限原則
- 不使用 DynamoDB lock：可能導致 state 損壞（多人同時操作時）

### 3. Infrastructure Deployment Minimum Permissions

**Decision**: 建立 Infrastructure Policy，涵蓋 001-aws-api-infra 所需的所有服務：

**VPC 相關**:
- `ec2:CreateVpc`, `ec2:DeleteVpc`, `ec2:DescribeVpcs`
- `ec2:CreateSubnet`, `ec2:DeleteSubnet`, `ec2:DescribeSubnets`
- `ec2:CreateInternetGateway`, `ec2:DeleteInternetGateway`, `ec2:AttachInternetGateway`, `ec2:DetachInternetGateway`
- `ec2:CreateRouteTable`, `ec2:DeleteRouteTable`, `ec2:CreateRoute`, `ec2:DeleteRoute`
- `ec2:AssociateRouteTable`, `ec2:DisassociateRouteTable`
- `ec2:CreateSecurityGroup`, `ec2:DeleteSecurityGroup`, `ec2:AuthorizeSecurityGroupIngress`, `ec2:RevokeSecurityGroupIngress`
- `ec2:CreateNetworkAcl`, `ec2:DeleteNetworkAcl`, `ec2:CreateNetworkAclEntry`, `ec2:DeleteNetworkAclEntry`
- `ec2:CreateTags`, `ec2:DeleteTags`, `ec2:DescribeTags`

**ALB 相關**:
- `elasticloadbalancing:CreateLoadBalancer`, `elasticloadbalancing:DeleteLoadBalancer`
- `elasticloadbalancing:CreateTargetGroup`, `elasticloadbalancing:DeleteTargetGroup`
- `elasticloadbalancing:CreateListener`, `elasticloadbalancing:DeleteListener`
- `elasticloadbalancing:ModifyLoadBalancerAttributes`
- `elasticloadbalancing:AddTags`, `elasticloadbalancing:DescribeTags`
- `elasticloadbalancing:Describe*` (各種 describe 操作)

**S3 相關** (應用程式 buckets):
- `s3:CreateBucket`, `s3:DeleteBucket`
- `s3:PutBucketVersioning`, `s3:GetBucketVersioning`
- `s3:PutBucketEncryption`, `s3:GetBucketEncryption`
- `s3:PutBucketPublicAccessBlock`, `s3:GetBucketPublicAccessBlock`
- `s3:PutLifecycleConfiguration`, `s3:GetLifecycleConfiguration`
- `s3:PutBucketPolicy`, `s3:GetBucketPolicy`, `s3:DeleteBucketPolicy`

**CloudWatch 相關**:
- `logs:CreateLogGroup`, `logs:DeleteLogGroup`
- `logs:PutRetentionPolicy`
- `logs:TagLogGroup`, `logs:ListTagsLogGroup`

**IAM 相關** (有限):
- `iam:CreateRole`, `iam:DeleteRole` (僅用於 VPC Flow Logs 的 service role)
- `iam:PutRolePolicy`, `iam:DeleteRolePolicy`
- `iam:PassRole` (將 role 傳遞給 AWS 服務)

**Rationale**:
- 涵蓋 001-aws-api-infra 中所有 Terraform 資源所需的權限
- 遵循最小權限原則，只給予必要的操作
- IAM 權限特別限制，避免權限提升風險

**Alternatives Considered**:
- 使用 AWS Managed Policy (如 PowerUserAccess)：權限過大
- 為每個服務建立獨立 Policy：過於碎片化，管理困難

### 4. Trust Policy 設計

**Decision**: Trust Policy 只允許 `avarobotics_local` 這個特定 IAM User assume role。

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::ACCOUNT_ID:user/avarobotics_local"
      },
      "Action": "sts:AssumeRole",
      "Condition": {}
    }
  ]
}
```

**Rationale**:
- 精確控制誰可以 assume 這個 role
- 不需要 MFA condition（開發環境優先便利性）
- 可以未來擴展加入其他 User 或 Role

**Alternatives Considered**:
- 允許整個帳戶：權限過大
- 要求 MFA：增加操作複雜度，不適合開發環境
- 使用 External ID：主要用於跨帳戶場景

### 5. Session Duration 設定

**Decision**: 設定 max session duration 為 4 小時 (14400 秒)。

**Rationale**:
- 大多數 Terraform 部署可在 4 小時內完成
- 平衡安全性和便利性
- 比 AWS 預設的 1 小時更適合 IaC 工作流程

**Alternatives Considered**:
- 1 小時：可能需要頻繁重新 assume
- 12 小時：安全性較差
- 15 分鐘：過於頻繁的重新認證

## Summary

| Topic | Decision | Key Rationale |
|-------|----------|---------------|
| Architecture | User → Role → Policy | AWS 最佳實踐、易於管理 |
| State Backend | 專用 Policy (S3 + DynamoDB) | 最小權限、Terraform 必需 |
| Infrastructure | 綜合 Policy | 涵蓋 001 所有資源、職責分離 |
| Trust Policy | 限制單一 User | 精確控制、無 MFA |
| Session Duration | 4 小時 | 平衡安全和便利 |
