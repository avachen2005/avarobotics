# Quickstart: ECS Fargate Deployment for Go API

Step-by-step guide to deploy the Go API on ECS Fargate and verify it's running.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Build and Push Image](#build-and-push-image)
- [Deploy Infrastructure](#deploy-infrastructure)
- [Verify](#verify)
- [Update Deployment](#update-deployment)

---

## Prerequisites

- AWS CLI configured with credentials
- Terraform >= 1.5.0
- Docker (for local builds)
- ECR repository already provisioned (from 040-codebuild-ecr-api)

## Build and Push Image

```bash
# Build the image locally
docker build -f api/Dockerfile api/ -t avarobotics-api:local

# Authenticate to ECR
aws ecr get-login-password --region ap-northeast-1 | \
  docker login --username AWS --password-stdin <account-id>.dkr.ecr.ap-northeast-1.amazonaws.com

# Tag and push
docker tag avarobotics-api:local <account-id>.dkr.ecr.ap-northeast-1.amazonaws.com/dev-avarobotics-api:latest
docker push <account-id>.dkr.ecr.ap-northeast-1.amazonaws.com/dev-avarobotics-api:latest
```

## Deploy Infrastructure

```bash
cd terraform/environments/dev

# Review what will be created
terraform plan

# Apply (creates ECS cluster, task definition, service, IAM roles, auto-scaling)
terraform apply
```

## Verify

```bash
# Get ALB DNS name
ALB_DNS=$(terraform output -raw alb_dns_name)

# Test the API
curl http://$ALB_DNS/health
# Expected: {} with HTTP 200

# Check ECS service status
aws ecs describe-services \
  --cluster dev-avarobotics-cluster \
  --services dev-avarobotics-api-service \
  --region ap-northeast-1 \
  --query 'services[0].{status:status,running:runningCount,desired:desiredCount}'

# Check container logs
aws logs tail /ecs/dev-avarobotics-api --region ap-northeast-1 --since 5m
```

## Update Deployment

```bash
# After pushing a new image to ECR, force a new deployment
aws ecs update-service \
  --cluster dev-avarobotics-cluster \
  --service dev-avarobotics-api-service \
  --force-new-deployment \
  --region ap-northeast-1

# Or via Terraform (if task definition changed)
terraform apply
```
