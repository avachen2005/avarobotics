# Feature Specification: K8s API Deployment

**Feature Branch**: `005-k8s-api-deploy`
**Created**: 2026-02-01
**Status**: Draft
**Input**: User description: "我要用 k8s 把 api 部署到線上"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Deploy API to Production (Priority: P1)

運維人員可以將 API 服務部署到 Kubernetes 叢集，使服務可透過網際網路存取。部署後，外部用戶可以呼叫 API 端點。

**Why this priority**: 這是核心功能，沒有部署就無法讓用戶使用 API 服務。

**Independent Test**: 執行部署命令後，透過公開 URL 呼叫 Health Check 端點，驗證服務正常運作。

**Acceptance Scenarios**:

1. **Given** API 容器映像已建立, **When** 執行部署命令, **Then** 服務在 Kubernetes 叢集中啟動
2. **Given** 服務已部署到叢集, **When** 透過公開 URL 存取 API, **Then** 收到正確的回應
3. **Given** 服務正在運行, **When** 部署新版本, **Then** 服務無停機時間更新 (rolling update)

---

### User Story 2 - Service Health Monitoring (Priority: P2)

運維人員可以監控已部署服務的健康狀態，當服務異常時自動重啟。

**Why this priority**: 確保服務穩定性和可用性。

**Independent Test**: 模擬服務故障，驗證 Kubernetes 自動重啟容器。

**Acceptance Scenarios**:

1. **Given** 服務已部署, **When** Health Check 失敗, **Then** Kubernetes 自動重啟容器
2. **Given** 服務健康, **When** 查詢服務狀態, **Then** 顯示所有 Pod 都處於 Ready 狀態

---

### User Story 3 - Service Scaling (Priority: P3)

運維人員可以根據負載調整服務副本數量。

**Why this priority**: 處理流量變化，但非初始部署必需。

**Independent Test**: 修改副本數量，驗證 Pod 數量相應變化。

**Acceptance Scenarios**:

1. **Given** 服務運行中, **When** 增加副本數量, **Then** 新 Pod 啟動並接受流量
2. **Given** 多個副本運行中, **When** 減少副本數量, **Then** 多餘 Pod 優雅終止

---

### Edge Cases

- 容器映像拉取失敗時，部署應如何處理？（預期：顯示錯誤訊息，不影響現有服務）
- 叢集資源不足時，新 Pod 無法調度？（預期：Pod 處於 Pending 狀態，顯示原因）
- 滾動更新過程中新版本不健康？（預期：自動回滾到上一個版本）

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系統必須提供將 API 服務部署到 Kubernetes 叢集的能力
- **FR-002**: 部署的服務必須可透過公開 URL 存取
- **FR-003**: 系統必須支援服務的滾動更新，確保零停機部署
- **FR-004**: 系統必須配置 Health Check，使 Kubernetes 可監控服務狀態
- **FR-005**: 系統必須支援服務副本的水平擴展
- **FR-006**: 系統必須配置資源限制（CPU、記憶體）以確保叢集穩定

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 部署完成後 5 分鐘內服務可透過公開 URL 存取
- **SC-002**: 滾動更新期間服務可用性達 100%（無請求失敗）
- **SC-003**: 服務異常時，容器在 60 秒內自動重啟
- **SC-004**: 服務可擴展至至少 3 個副本

## Assumptions

- 使用現有的 Kubernetes 叢集（EKS on AWS）
- API 容器映像將推送至容器註冊中心（ECR）
- 使用 LoadBalancer 類型的 Service 暴露服務
- 初始部署副本數為 2，確保高可用性
- 使用 `/health` 端點作為 liveness 和 readiness probe

## Out of Scope

- Kubernetes 叢集本身的建立和管理
- CI/CD pipeline 的建立（手動部署）
- 自動擴縮容（HPA）配置
- Ingress 和 TLS 證書配置（第一版使用 LoadBalancer）
- 日誌收集和監控告警系統
