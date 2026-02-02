# Implementation Plan: K8s API Deployment

**Branch**: `005-k8s-api-deploy` | **Date**: 2026-02-01 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-k8s-api-deploy/spec.md`

## Summary

建立 Kubernetes 部署配置，將 Go API 服務部署到 EKS 叢集。包含 Dockerfile、Deployment、Service、健康檢查探針配置，實現零停機滾動更新和自動故障恢復。

## Technical Context

**Language/Version**: YAML (Kubernetes manifests), Dockerfile
**Primary Dependencies**: kubectl, Docker, AWS ECR
**Storage**: N/A
**Testing**: kubectl apply --dry-run, manual verification
**Target Platform**: Amazon EKS (Kubernetes 1.28+)
**Project Type**: Infrastructure/Deployment configuration
**Performance Goals**: 服務啟動時間 < 30 秒
**Constraints**: 使用 LoadBalancer Service 類型
**Scale/Scope**: 初始 2 副本，可擴展至 3+

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

遵循 k8s/CLAUDE.md 定義的標準：

- [x] 使用原生 Kubernetes manifests（簡單部署，不需 Helm）
- [x] 遵循命名規範：`api-deployment`, `api-svc`
- [x] 設定資源 requests 和 limits
- [x] 定義 liveness/readiness probes
- [x] 容器以 non-root 用戶運行

## Project Structure

### Documentation (this feature)

```text
specs/005-k8s-api-deploy/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (minimal)
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── k8s-manifests.md # Kubernetes manifest specifications
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
api/
├── Dockerfile           # Container build definition (new)
└── .dockerignore        # Docker build exclusions (new)

k8s/
└── manifests/
    └── api/
        ├── namespace.yaml      # Namespace definition
        ├── deployment.yaml     # Deployment configuration
        └── service.yaml        # Service (LoadBalancer)
```

**Structure Decision**: 使用 k8s/manifests/ 目錄存放原生 Kubernetes manifests，遵循 k8s/CLAUDE.md 的目錄結構。由於這是簡單的單服務部署，不需要 Helm 或 Kustomize。

## Complexity Tracking

無違規項目 - 使用標準 Kubernetes 部署模式。
