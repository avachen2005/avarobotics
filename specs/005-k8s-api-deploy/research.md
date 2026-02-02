# Research: K8s API Deployment

**Feature**: 005-k8s-api-deploy
**Date**: 2026-02-01

## Research Summary

研究 Kubernetes 部署最佳實踐，決定容器構建策略、部署配置和服務暴露方式。

---

## Decision 1: Container Build Strategy

**Decision**: 使用多階段 Dockerfile 構建

**Rationale**:
- 最小化最終映像大小
- 分離構建環境和運行環境
- Go 可編譯為靜態二進制文件，運行時不需 Go 環境

**Final Dockerfile Pattern**:
```dockerfile
# Build stage
FROM golang:1.22-alpine AS builder
# ... build steps

# Runtime stage
FROM alpine:3.19
# ... minimal runtime
```

**Alternatives Considered**:
- 單階段構建 - 映像過大 (>1GB)
- Distroless 基礎映像 - 更安全但除錯困難
- Scratch 映像 - 過於精簡，缺少基本工具

---

## Decision 2: Deployment Strategy

**Decision**: 使用 RollingUpdate 策略，配置 maxUnavailable=0, maxSurge=1

**Rationale**:
- 確保零停機更新（至少保持原有副本數可用）
- maxSurge=1 限制額外資源使用
- 配合健康檢查確保新版本正常後才終止舊版本

**Configuration**:
```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 0
    maxSurge: 1
```

**Alternatives Considered**:
- Recreate - 會導致服務中斷
- Blue-Green - 需要雙倍資源，複雜度高
- Canary - 需要額外的流量管理工具

---

## Decision 3: Health Check Configuration

**Decision**: 配置 liveness 和 readiness probes，使用 `/health` 端點

**Rationale**:
- Readiness probe: 確保 Pod 準備好接收流量
- Liveness probe: 檢測服務是否存活，失敗時重啟

**Configuration**:
```yaml
readinessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 10

livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 15
  periodSeconds: 20
```

**Timing Decisions**:
- readiness initialDelay: 5s - Go 服務啟動快
- liveness initialDelay: 15s - 給予足夠時間初始化
- liveness period: 20s - 避免過於頻繁的檢查

---

## Decision 4: Service Exposure

**Decision**: 使用 LoadBalancer 類型的 Service

**Rationale**:
- 在 AWS EKS 上自動創建 ELB
- 直接暴露服務到公網，無需額外配置
- 簡單直接，符合第一版需求

**Alternatives Considered**:
- NodePort - 需要額外的負載均衡器
- Ingress + ClusterIP - 更靈活但配置複雜，需要 TLS 證書
- 後續可升級到 Ingress 以支援多服務和 TLS

---

## Decision 5: Resource Limits

**Decision**: 設定保守的資源限制

**Configuration**:
```yaml
resources:
  requests:
    cpu: "100m"
    memory: "128Mi"
  limits:
    cpu: "500m"
    memory: "256Mi"
```

**Rationale**:
- Health Check API 是輕量級服務
- requests 確保調度和 QoS
- limits 防止資源爭用

---

## Decision 6: Namespace Strategy

**Decision**: 使用專用 namespace `ava-api`

**Rationale**:
- 遵循 k8s/CLAUDE.md 命名規範
- 資源隔離
- 便於權限管理

---

## Technical Notes

### ECR Repository

需要先創建 ECR repository：
```bash
aws ecr create-repository --repository-name avarobotics/api
```

### Image Tagging Strategy

使用 Git SHA 作為標籤，確保可追溯性：
```bash
docker tag api:latest <account>.dkr.ecr.<region>.amazonaws.com/avarobotics/api:$(git rev-parse --short HEAD)
```

### Security Context

容器以 non-root 用戶運行：
```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  readOnlyRootFilesystem: true
```
