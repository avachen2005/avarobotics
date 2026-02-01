# Research: Health Check API

**Feature**: 004-health-check-api
**Date**: 2026-02-01

## Research Summary

由於這是一個簡單的 Health Check API，技術決策相對直接。以下記錄研究結果和決策。

---

## Decision 1: Health Check 端點路徑

**Decision**: 使用 `/health`

**Rationale**:
- 業界常見的標準路徑
- Kubernetes liveness/readiness probe 預設支援
- 簡短易記

**Alternatives Considered**:
- `/healthz` - Kubernetes 風格，但 "z" 後綴較不直觀
- `/health/live` - 適合區分 liveness 和 readiness，但目前需求不需要
- `/api/health` - 有版本前綴，但 health check 通常不需要版本化

---

## Decision 2: 回應格式

**Decision**: JSON 格式，包含 `status` 欄位

```json
{
  "status": "ok"
}
```

**Rationale**:
- 簡單明確
- 可擴展（未來可加入更多欄位如 timestamp、version）
- 符合 spec 需求「回應內容包含表示健康狀態的資訊」

**Alternatives Considered**:
- 純文字 "OK" - 不符合 JSON 格式需求
- 複雜結構 `{"healthy": true, "checks": [...]}` - 過度設計，不在 scope 內

---

## Decision 3: HTTP Router

**Decision**: 使用 Go 標準庫 `net/http`

**Rationale**:
- 無外部依賴
- 對於單一端點足夠
- 符合「最小化依賴」原則

**Alternatives Considered**:
- chi - 功能豐富但對單一端點過度
- gorilla/mux - 已停止維護
- gin - 需要額外依賴

---

## Decision 4: 錯誤方法處理

**Decision**: 非 GET 請求回應 405 Method Not Allowed

**Rationale**:
- HTTP 標準行為
- 清楚指示客戶端使用正確方法

---

## Technical Notes

### Go 1.22+ 特性

Go 1.22 引入了改進的 `net/http` router，支援方法和路徑模式：

```go
http.HandleFunc("GET /health", handler)
```

這讓我們可以不需要在 handler 內部檢查方法。

### Content-Type Header

回應需設置 `Content-Type: application/json` 以符合 JSON 格式要求。
