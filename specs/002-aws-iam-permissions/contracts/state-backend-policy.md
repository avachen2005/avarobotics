# Contract: Terraform State Backend Policy

**Policy Name**: `TerraformStateBackendPolicy`

## Purpose

Provides minimum permissions required for Terraform to manage state in S3 with DynamoDB locking.

## Policy Document

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3StateAccess",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::avarobotics-terraform-state/*"
    },
    {
      "Sid": "S3StateBucketList",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetBucketVersioning"
      ],
      "Resource": "arn:aws:s3:::avarobotics-terraform-state"
    },
    {
      "Sid": "DynamoDBStateLock",
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:DeleteItem"
      ],
      "Resource": "arn:aws:dynamodb:ap-northeast-1:*:table/terraform-state-lock"
    }
  ]
}
```

## Permissions Breakdown

### S3 Permissions

| Action | Purpose | Resource |
|--------|---------|----------|
| `s3:GetObject` | Read state file | Bucket objects |
| `s3:PutObject` | Write state file | Bucket objects |
| `s3:DeleteObject` | Clean up old state (versioning) | Bucket objects |
| `s3:ListBucket` | List workspace states | Bucket |
| `s3:GetBucketVersioning` | Check versioning status | Bucket |

### DynamoDB Permissions

| Action | Purpose | Resource |
|--------|---------|----------|
| `dynamodb:GetItem` | Check lock status | Lock table |
| `dynamodb:PutItem` | Acquire lock | Lock table |
| `dynamodb:DeleteItem` | Release lock | Lock table |

## Resource Constraints

- S3 bucket: `avarobotics-terraform-state`
- S3 objects: `avarobotics-terraform-state/*`
- DynamoDB table: `terraform-state-lock` (ap-northeast-1)

## Security Considerations

1. **Resource-specific**: Permissions limited to specific bucket and table
2. **No wildcard**: No `*` in resource ARNs
3. **Minimal actions**: Only actions required for Terraform state operations
4. **No bucket management**: Cannot create/delete the state bucket itself

## Testing

```bash
# Test S3 read
aws s3 ls s3://avarobotics-terraform-state/

# Test S3 write
echo "test" | aws s3 cp - s3://avarobotics-terraform-state/test.txt
aws s3 rm s3://avarobotics-terraform-state/test.txt

# Test DynamoDB
aws dynamodb get-item \
  --table-name terraform-state-lock \
  --key '{"LockID": {"S": "test"}}'
```
