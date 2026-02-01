# Quickstart: Health Check API

**Feature**: 004-health-check-api

## Prerequisites

- Go 1.22+
- curl 或其他 HTTP 客戶端（用於測試）

## Setup

1. 進入 API 目錄：
   ```bash
   cd api
   ```

2. 初始化 Go module（如果尚未存在）：
   ```bash
   go mod init github.com/avarobotics/api
   ```

3. 下載依賴：
   ```bash
   go mod tidy
   ```

## Running the Server

啟動 API server：
```bash
go run cmd/server/main.go
```

預設監聽 `http://localhost:8080`

## Testing the Health Endpoint

### 使用 curl

```bash
# 成功的 health check
curl -i http://localhost:8080/health

# 預期回應：
# HTTP/1.1 200 OK
# Content-Type: application/json
#
# {"status":"ok"}
```

### 測試錯誤方法

```bash
# 使用 POST 方法（應該回傳 405）
curl -i -X POST http://localhost:8080/health

# 預期回應：
# HTTP/1.1 405 Method Not Allowed
```

## Running Tests

執行單元測試：
```bash
cd api
go test ./...
```

執行特定 handler 測試：
```bash
go test ./internal/handler/...
```

帶詳細輸出：
```bash
go test -v ./internal/handler/...
```

## Integration Test Scenario

### 驗證完整流程

1. **啟動服務**
   ```bash
   go run cmd/server/main.go &
   SERVER_PID=$!
   sleep 2  # 等待服務啟動
   ```

2. **執行 health check**
   ```bash
   RESPONSE=$(curl -s http://localhost:8080/health)
   echo $RESPONSE
   # 預期：{"status":"ok"}
   ```

3. **驗證回應**
   ```bash
   STATUS=$(echo $RESPONSE | jq -r '.status')
   if [ "$STATUS" = "ok" ]; then
     echo "✓ Health check passed"
   else
     echo "✗ Health check failed"
     exit 1
   fi
   ```

4. **清理**
   ```bash
   kill $SERVER_PID
   ```

## Kubernetes Probe Configuration

若部署到 Kubernetes，可配置 liveness probe：

```yaml
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: api
    livenessProbe:
      httpGet:
        path: /health
        port: 8080
      initialDelaySeconds: 3
      periodSeconds: 10
    readinessProbe:
      httpGet:
        path: /health
        port: 8080
      initialDelaySeconds: 3
      periodSeconds: 5
```

## Troubleshooting

### 服務無法啟動

檢查 port 是否被佔用：
```bash
lsof -i :8080
```

### Health check 回傳錯誤

1. 確認服務已啟動：`ps aux | grep server`
2. 檢查服務日誌
3. 確認網路連接：`curl -v http://localhost:8080/health`
