# Quickstart: AWS CodeBuild Docker Build and ECR Push for API

Step-by-step guide to deploy the CodeBuild + ECR infrastructure and build the API container image.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Build Docker Image Locally](#build-docker-image-locally)
- [Deploy Infrastructure](#deploy-infrastructure)
- [Trigger a Build](#trigger-a-build)
- [Verify](#verify)

---

## Prerequisites

- AWS CLI configured with credentials
- Terraform >= 1.5.0
- Docker (for local builds)
- Go 1.22+ (for local development)

## Build Docker Image Locally

```bash
# From repo root
docker build -f api/Dockerfile -t avarobotics-api:local .

# Test it
docker run -p 8080:8080 avarobotics-api:local
curl http://localhost:8080/health
# Expected: {} with HTTP 200
```

## Deploy Infrastructure

```bash
cd terraform/environments/dev

# Review what will be created
terraform plan

# Apply (creates ECR repo, CodeBuild project, IAM roles, OIDC provider)
terraform apply
```

## Trigger a Build

```bash
# Manually trigger CodeBuild (for testing)
aws codebuild start-build \
  --project-name dev-avarobotics-api-build \
  --source-version main

# In production, GitHub Actions triggers this via OIDC
```

## Verify

```bash
# Check ECR for images
aws ecr list-images \
  --repository-name dev-avarobotics-api \
  --region ap-northeast-1

# Pull and test the image
aws ecr get-login-password --region ap-northeast-1 | \
  docker login --username AWS --password-stdin <account-id>.dkr.ecr.ap-northeast-1.amazonaws.com

docker pull <account-id>.dkr.ecr.ap-northeast-1.amazonaws.com/dev-avarobotics-api:latest
docker run -p 8080:8080 <account-id>.dkr.ecr.ap-northeast-1.amazonaws.com/dev-avarobotics-api:latest
curl http://localhost:8080/health
```
