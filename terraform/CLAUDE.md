# Terraform Infrastructure

## Conventions
- Use Terraform >= 1.5
- Follow [terraform-best-practices.com](https://www.terraform-best-practices.com/) guidelines
- Use `terraform fmt` before committing

## Module Structure
```
terraform/
├── modules/           # Reusable modules
├── environments/      # Environment-specific configs
│   ├── dev/
│   ├── staging/
│   └── prod/
└── global/           # Shared resources (IAM, DNS)
```

## Naming Conventions
- Resources: `<project>-<environment>-<resource>` (e.g., `ava-prod-api-cluster`)
- Variables: snake_case
- Outputs: snake_case, descriptive names

## State Management
- Use remote state (S3/GCS) with state locking
- Separate state files per environment
- Never commit `.tfstate` files

## Security
- Use `sensitive = true` for secrets in outputs
- Prefer IAM roles over access keys
- Enable encryption at rest for all storage resources

## Validation
- Run `terraform validate` before applying
- Use `terraform plan` output for PR reviews
- Consider using `tfsec` or `checkov` for security scanning
