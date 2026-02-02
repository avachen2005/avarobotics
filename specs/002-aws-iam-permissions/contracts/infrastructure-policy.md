# Contract: Terraform Infrastructure Policy

**Policy Name**: `TerraformInfrastructurePolicy`

## Purpose

Provides permissions required to deploy AWS infrastructure defined in 001-aws-api-infra, including VPC, ALB, S3, and CloudWatch resources.

## Policy Document

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VPCManagement",
      "Effect": "Allow",
      "Action": [
        "ec2:CreateVpc",
        "ec2:DeleteVpc",
        "ec2:DescribeVpcs",
        "ec2:ModifyVpcAttribute",
        "ec2:CreateSubnet",
        "ec2:DeleteSubnet",
        "ec2:DescribeSubnets",
        "ec2:ModifySubnetAttribute",
        "ec2:CreateInternetGateway",
        "ec2:DeleteInternetGateway",
        "ec2:DescribeInternetGateways",
        "ec2:AttachInternetGateway",
        "ec2:DetachInternetGateway",
        "ec2:CreateRouteTable",
        "ec2:DeleteRouteTable",
        "ec2:DescribeRouteTables",
        "ec2:CreateRoute",
        "ec2:DeleteRoute",
        "ec2:AssociateRouteTable",
        "ec2:DisassociateRouteTable",
        "ec2:DescribeAvailabilityZones",
        "ec2:DescribeAccountAttributes"
      ],
      "Resource": "*"
    },
    {
      "Sid": "SecurityGroupManagement",
      "Effect": "Allow",
      "Action": [
        "ec2:CreateSecurityGroup",
        "ec2:DeleteSecurityGroup",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeSecurityGroupRules",
        "ec2:AuthorizeSecurityGroupIngress",
        "ec2:RevokeSecurityGroupIngress",
        "ec2:AuthorizeSecurityGroupEgress",
        "ec2:RevokeSecurityGroupEgress",
        "ec2:ModifySecurityGroupRules"
      ],
      "Resource": "*"
    },
    {
      "Sid": "NetworkACLManagement",
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkAcl",
        "ec2:DeleteNetworkAcl",
        "ec2:DescribeNetworkAcls",
        "ec2:CreateNetworkAclEntry",
        "ec2:DeleteNetworkAclEntry",
        "ec2:ReplaceNetworkAclEntry",
        "ec2:ReplaceNetworkAclAssociation"
      ],
      "Resource": "*"
    },
    {
      "Sid": "EC2Tagging",
      "Effect": "Allow",
      "Action": [
        "ec2:CreateTags",
        "ec2:DeleteTags",
        "ec2:DescribeTags"
      ],
      "Resource": "*"
    },
    {
      "Sid": "LoadBalancerManagement",
      "Effect": "Allow",
      "Action": [
        "elasticloadbalancing:CreateLoadBalancer",
        "elasticloadbalancing:DeleteLoadBalancer",
        "elasticloadbalancing:DescribeLoadBalancers",
        "elasticloadbalancing:DescribeLoadBalancerAttributes",
        "elasticloadbalancing:ModifyLoadBalancerAttributes",
        "elasticloadbalancing:CreateTargetGroup",
        "elasticloadbalancing:DeleteTargetGroup",
        "elasticloadbalancing:DescribeTargetGroups",
        "elasticloadbalancing:DescribeTargetGroupAttributes",
        "elasticloadbalancing:ModifyTargetGroupAttributes",
        "elasticloadbalancing:CreateListener",
        "elasticloadbalancing:DeleteListener",
        "elasticloadbalancing:DescribeListeners",
        "elasticloadbalancing:ModifyListener",
        "elasticloadbalancing:AddTags",
        "elasticloadbalancing:RemoveTags",
        "elasticloadbalancing:DescribeTags",
        "elasticloadbalancing:SetSecurityGroups",
        "elasticloadbalancing:DescribeTargetHealth"
      ],
      "Resource": "*"
    },
    {
      "Sid": "S3BucketManagement",
      "Effect": "Allow",
      "Action": [
        "s3:CreateBucket",
        "s3:DeleteBucket",
        "s3:ListBucket",
        "s3:GetBucketLocation",
        "s3:GetBucketVersioning",
        "s3:PutBucketVersioning",
        "s3:GetBucketEncryption",
        "s3:PutBucketEncryption",
        "s3:GetBucketPublicAccessBlock",
        "s3:PutBucketPublicAccessBlock",
        "s3:GetLifecycleConfiguration",
        "s3:PutLifecycleConfiguration",
        "s3:GetBucketPolicy",
        "s3:PutBucketPolicy",
        "s3:DeleteBucketPolicy",
        "s3:GetBucketTagging",
        "s3:PutBucketTagging",
        "s3:GetBucketAcl",
        "s3:PutBucketAcl",
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::*-avarobotics-*",
        "arn:aws:s3:::*-avarobotics-*/*"
      ]
    },
    {
      "Sid": "CloudWatchLogsManagement",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:DeleteLogGroup",
        "logs:DescribeLogGroups",
        "logs:PutRetentionPolicy",
        "logs:TagLogGroup",
        "logs:UntagLogGroup",
        "logs:ListTagsLogGroup"
      ],
      "Resource": "arn:aws:logs:ap-northeast-1:*:log-group:/avarobotics/*"
    },
    {
      "Sid": "IAMRoleForServices",
      "Effect": "Allow",
      "Action": [
        "iam:CreateRole",
        "iam:DeleteRole",
        "iam:GetRole",
        "iam:ListRolePolicies",
        "iam:ListAttachedRolePolicies",
        "iam:PutRolePolicy",
        "iam:DeleteRolePolicy",
        "iam:GetRolePolicy",
        "iam:TagRole",
        "iam:UntagRole",
        "iam:ListRoleTags"
      ],
      "Resource": "arn:aws:iam::*:role/*-avarobotics-*"
    },
    {
      "Sid": "IAMPassRole",
      "Effect": "Allow",
      "Action": "iam:PassRole",
      "Resource": "arn:aws:iam::*:role/*-avarobotics-*",
      "Condition": {
        "StringEquals": {
          "iam:PassedToService": [
            "vpc-flow-logs.amazonaws.com"
          ]
        }
      }
    },
    {
      "Sid": "EC2FlowLogs",
      "Effect": "Allow",
      "Action": [
        "ec2:CreateFlowLogs",
        "ec2:DeleteFlowLogs",
        "ec2:DescribeFlowLogs"
      ],
      "Resource": "*"
    }
  ]
}
```

## Permissions Breakdown

### EC2/VPC Permissions

| Category | Actions | Resource Constraint |
|----------|---------|---------------------|
| VPC | Create, Delete, Describe, Modify | `*` (regional) |
| Subnet | Create, Delete, Describe, Modify | `*` (VPC-scoped) |
| Internet Gateway | Create, Delete, Attach, Detach | `*` (VPC-scoped) |
| Route Table | Create, Delete, Associate | `*` (VPC-scoped) |
| Security Group | Full CRUD + Rules | `*` (VPC-scoped) |
| Network ACL | Full CRUD + Entries | `*` (VPC-scoped) |
| Tags | Create, Delete, Describe | `*` |

### ELB Permissions

| Category | Actions | Resource Constraint |
|----------|---------|---------------------|
| Load Balancer | Full lifecycle | `*` |
| Target Group | Full lifecycle | `*` |
| Listener | Full lifecycle | `*` |

### S3 Permissions

| Category | Actions | Resource Constraint |
|----------|---------|---------------------|
| Bucket Operations | Create, Delete, Configure | `*-avarobotics-*` |
| Object Operations | Read, Write, Delete | `*-avarobotics-*/*` |

### CloudWatch Permissions

| Category | Actions | Resource Constraint |
|----------|---------|---------------------|
| Log Groups | Full lifecycle | `/avarobotics/*` |

### IAM Permissions (Limited)

| Category | Actions | Resource Constraint |
|----------|---------|---------------------|
| Role Operations | Create, Delete for service roles | `*-avarobotics-*` |
| PassRole | For VPC Flow Logs only | Condition on service |

## Security Considerations

1. **Resource naming constraints**: S3 and IAM limited to `*-avarobotics-*` pattern
2. **CloudWatch scope**: Limited to `/avarobotics/*` log groups
3. **IAM PassRole**: Restricted to VPC Flow Logs service only
4. **No IAM policy creation**: Cannot create arbitrary IAM policies
5. **Regional EC2**: Actions are region-scoped by AWS

## Testing

```bash
# Test VPC creation
aws ec2 describe-vpcs

# Test ALB permissions
aws elbv2 describe-load-balancers

# Test S3 bucket creation
aws s3 mb s3://test-avarobotics-test --region ap-northeast-1
aws s3 rb s3://test-avarobotics-test

# Test CloudWatch
aws logs describe-log-groups --log-group-name-prefix /avarobotics/
```
