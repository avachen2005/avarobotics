# Data Model: Health Check API

**Feature**: 004-health-check-api
**Date**: 2026-02-01

## Overview

Health Check API 是無狀態的端點，不涉及持久化資料。此文件記錄 API 回應的資料結構。

## Entities

### HealthResponse

Health Check 端點的回應結構。

| Field  | Type   | Required | Description          |
|--------|--------|----------|----------------------|
| status | string | Yes      | 健康狀態：`"ok"` 表示服務正常 |

**Constraints**:
- `status` 值固定為 `"ok"`（當服務健康時）

**Example**:
```json
{
  "status": "ok"
}
```

## Relationships

無 - 此功能不涉及資料關聯。

## State Transitions

無 - 此功能無狀態轉換。
