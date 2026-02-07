# API Documentation: Health Check

Health check endpoint to verify the API service is running.

## Table of Contents

- [Endpoint](#endpoint)
- [Hostname](#hostname)
- [Headers](#headers)
- [Parameters](#parameters)
- [Request](#request)
- [Response](#response)
- [Error Codes](#error-codes)

---

## Endpoint

| Field        | Value                    |
|--------------|--------------------------|
| Method       | `GET`                    |
| Path         | `/health`                |
| Auth         | None                     |
| Content-Type | `application/json`       |

## Hostname

| Environment | URL                        |
|-------------|----------------------------|
| Local       | `http://localhost:8080`    |
| Production  | TBD (pending deployment)   |

## Headers

| Header         | Required | Value              | Description          |
|----------------|----------|--------------------|----------------------|
| Accept         | No       | `application/json` | Response format hint |

No authentication headers required.

## Parameters

No query parameters or path parameters.

## Request

```bash
curl -s http://localhost:8080/health
```

## Response

### Success (200 OK)

```json
{}
```

| Field | Type   | Description |
|-------|--------|-------------|
| (none) | object | Empty JSON object indicating service is healthy |

**Headers**:

| Header         | Value              |
|----------------|--------------------|
| Content-Type   | `application/json` |

### Method Not Allowed (405)

Returned when using any method other than GET.

```bash
curl -s -X POST http://localhost:8080/health
# Returns: 405 Method Not Allowed
```

## Error Codes

| HTTP Status | Condition               | Response Body          |
|-------------|-------------------------|------------------------|
| 200         | Service is healthy      | `{}`                   |
| 405         | Non-GET method used     | `Method Not Allowed\n` |
