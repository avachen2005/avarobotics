# Data Model: K8s API Deployment

**Feature**: 005-k8s-api-deploy
**Date**: 2026-02-01

## Overview

此功能涉及 Kubernetes 資源配置，無應用層數據模型。以下記錄 Kubernetes 資源之間的關係。

## Kubernetes Resources

### Namespace

| Field | Value | Description |
|-------|-------|-------------|
| name | ava-api | API 服務專用 namespace |

### Deployment

| Field | Value | Description |
|-------|-------|-------------|
| name | api-deployment | 部署名稱 |
| namespace | ava-api | 所屬 namespace |
| replicas | 2 | 初始副本數 |
| image | avarobotics/api | 容器映像名稱 |
| port | 8080 | 服務端口 |

### Service

| Field | Value | Description |
|-------|-------|-------------|
| name | api-svc | Service 名稱 |
| namespace | ava-api | 所屬 namespace |
| type | LoadBalancer | 服務類型 |
| port | 80 | 外部端口 |
| targetPort | 8080 | 容器端口 |

## Resource Relationships

```
Namespace: ava-api
    │
    ├── Deployment: api-deployment
    │       │
    │       └── Pod (replicas: 2)
    │               │
    │               └── Container: api
    │                       - image: avarobotics/api
    │                       - port: 8080
    │
    └── Service: api-svc (LoadBalancer)
            │
            └── selector: app=api
                    │
                    └── routes to → Pod (port 8080)
```

## State Transitions

### Pod Lifecycle

```
Pending → Running → Succeeded/Failed
            ↓
    (liveness fail)
            ↓
       Restarting
```

### Deployment Update

```
Current Version (v1)
        ↓
  Rolling Update Start
        ↓
  New Pod Created (v2)
        ↓
  Readiness Check Pass
        ↓
  Old Pod Terminated
        ↓
New Version Active (v2)
```
