# Contract: Kubernetes Manifests

**Feature**: 005-k8s-api-deploy
**Version**: 1.0.0

## Namespace

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: ava-api
  labels:
    app.kubernetes.io/name: api
    app.kubernetes.io/part-of: avarobotics
```

## Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
  namespace: ava-api
  labels:
    app: api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: api
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 0
      maxSurge: 1
  template:
    metadata:
      labels:
        app: api
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
      containers:
      - name: api
        image: <ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/avarobotics/api:latest
        ports:
        - containerPort: 8080
          protocol: TCP
        env:
        - name: PORT
          value: "8080"
        resources:
          requests:
            cpu: "100m"
            memory: "128Mi"
          limits:
            cpu: "500m"
            memory: "256Mi"
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10
          timeoutSeconds: 3
          failureThreshold: 3
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 15
          periodSeconds: 20
          timeoutSeconds: 3
          failureThreshold: 3
        securityContext:
          readOnlyRootFilesystem: true
          allowPrivilegeEscalation: false
```

## Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: api-svc
  namespace: ava-api
  labels:
    app: api
spec:
  type: LoadBalancer
  selector:
    app: api
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
```

## Dockerfile

```dockerfile
# Build stage
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Copy go mod files
COPY go.mod ./
RUN go mod download

# Copy source code
COPY . .

# Build binary
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o server ./cmd/server

# Runtime stage
FROM alpine:3.19

# Add non-root user
RUN adduser -D -u 1000 appuser

WORKDIR /app

# Copy binary from builder
COPY --from=builder /app/server .

# Change ownership
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8080

# Run
CMD ["./server"]
```

## .dockerignore

```
# Git
.git
.gitignore

# IDE
.idea/
.vscode/
*.iml

# Build artifacts
*.exe
*.test
*.out

# Specs and docs
specs/
*.md
!README.md

# Test files
*_test.go

# Local files
.env*
*.local
```

## Validation Tests

### TC-001: Manifest Syntax Validation

```bash
kubectl apply --dry-run=client -f k8s/manifests/api/
# Expected: No errors
```

### TC-002: Deployment Creates Pods

```bash
kubectl apply -f k8s/manifests/api/
kubectl wait --for=condition=available deployment/api-deployment -n ava-api --timeout=120s
# Expected: deployment.apps/api-deployment condition met
```

### TC-003: Service Gets External IP

```bash
kubectl get svc api-svc -n ava-api -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'
# Expected: ELB hostname returned
```

### TC-004: Health Check Works

```bash
EXTERNAL_URL=$(kubectl get svc api-svc -n ava-api -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
curl -s http://$EXTERNAL_URL/health
# Expected: {"status":"ok"}
```

### TC-005: Rolling Update

```bash
kubectl set image deployment/api-deployment api=<new-image> -n ava-api
kubectl rollout status deployment/api-deployment -n ava-api
# Expected: deployment "api-deployment" successfully rolled out
```

### TC-006: Scale Up

```bash
kubectl scale deployment/api-deployment --replicas=3 -n ava-api
kubectl get pods -n ava-api -l app=api
# Expected: 3 pods running
```
