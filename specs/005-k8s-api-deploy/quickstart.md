# Quickstart: K8s API Deployment

**Feature**: 005-k8s-api-deploy

## Prerequisites

- Docker installed and running
- kubectl configured with EKS cluster access
- AWS CLI configured with ECR permissions
- Go 1.22+ (for local testing)

## Setup

### 1. Configure AWS ECR

```bash
# Get ECR login credentials
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.ap-northeast-1.amazonaws.com

# Create repository (if not exists)
aws ecr create-repository --repository-name avarobotics/api --region ap-northeast-1
```

### 2. Build and Push Container Image

```bash
cd api

# Build image
docker build -t avarobotics/api:latest .

# Tag for ECR
docker tag avarobotics/api:latest <ACCOUNT_ID>.dkr.ecr.ap-northeast-1.amazonaws.com/avarobotics/api:latest

# Push to ECR
docker push <ACCOUNT_ID>.dkr.ecr.ap-northeast-1.amazonaws.com/avarobotics/api:latest
```

### 3. Deploy to Kubernetes

```bash
# Apply manifests
kubectl apply -f k8s/manifests/api/

# Wait for deployment
kubectl wait --for=condition=available deployment/api-deployment -n ava-api --timeout=120s

# Check pods
kubectl get pods -n ava-api
```

### 4. Verify Deployment

```bash
# Get external URL
EXTERNAL_URL=$(kubectl get svc api-svc -n ava-api -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
echo "API URL: http://$EXTERNAL_URL"

# Test health endpoint (may take a few minutes for ELB to be ready)
curl -i http://$EXTERNAL_URL/health
# Expected: HTTP 200, {"status":"ok"}
```

## Common Operations

### View Logs

```bash
# All pods
kubectl logs -l app=api -n ava-api

# Specific pod
kubectl logs <pod-name> -n ava-api --tail=100
```

### Scale Deployment

```bash
# Scale to 3 replicas
kubectl scale deployment/api-deployment --replicas=3 -n ava-api

# Verify
kubectl get pods -n ava-api
```

### Update Deployment

```bash
# Build and push new image with tag
docker build -t avarobotics/api:v2 .
docker tag avarobotics/api:v2 <ACCOUNT_ID>.dkr.ecr.ap-northeast-1.amazonaws.com/avarobotics/api:v2
docker push <ACCOUNT_ID>.dkr.ecr.ap-northeast-1.amazonaws.com/avarobotics/api:v2

# Update deployment
kubectl set image deployment/api-deployment api=<ACCOUNT_ID>.dkr.ecr.ap-northeast-1.amazonaws.com/avarobotics/api:v2 -n ava-api

# Watch rollout
kubectl rollout status deployment/api-deployment -n ava-api
```

### Rollback

```bash
# View rollout history
kubectl rollout history deployment/api-deployment -n ava-api

# Rollback to previous version
kubectl rollout undo deployment/api-deployment -n ava-api
```

## Troubleshooting

### Pod Not Starting

```bash
# Check pod status
kubectl describe pod <pod-name> -n ava-api

# Common issues:
# - ImagePullBackOff: Check ECR permissions and image name
# - CrashLoopBackOff: Check container logs
# - Pending: Check node resources
```

### Health Check Failing

```bash
# Check readiness/liveness probe status
kubectl describe pod <pod-name> -n ava-api | grep -A 10 "Conditions"

# Exec into pod to debug
kubectl exec -it <pod-name> -n ava-api -- /bin/sh
wget -qO- http://localhost:8080/health
```

### LoadBalancer No External IP

```bash
# Check service events
kubectl describe svc api-svc -n ava-api

# Verify AWS Load Balancer Controller is running (if using ALB)
kubectl get pods -n kube-system | grep aws-load-balancer
```

## Cleanup

```bash
# Delete all resources
kubectl delete -f k8s/manifests/api/

# Or delete namespace (removes everything in it)
kubectl delete namespace ava-api
```
