# Terraform Tests

Automated testing for Terraform modules using [Terratest](https://terratest.gruntwork.io/).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Test Tiers](#test-tiers)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Directory Structure](#directory-structure)

---

## Prerequisites

- Go 1.22+
- Terraform >= 1.5.0
- AWS credentials (for plan and integration tests)

## Test Tiers

| Tier | Command | AWS Creds | Creates Resources | Description |
|------|---------|-----------|-------------------|-------------|
| Validate | `make test-validate` | No | No | `terraform validate` + `terraform fmt -check` |
| Plan | `make test-plan` | Yes | No | `terraform init` + `terraform plan` |
| Integration | `make test-integration` | Yes | Yes | Full deploy/destroy cycle |

## Running Tests

```bash
cd terraform/test

# Install dependencies
go mod download

# Run validate + plan (default CI target)
make test

# Run only static validation (no AWS creds needed)
make test-validate

# Run plan-only tests (needs AWS creds)
make test-plan

# Run integration tests (creates real AWS resources)
make test-integration
```

## Test Coverage

| Module | Validate | Format | Plan | Integration |
|--------|----------|--------|------|-------------|
| networking | Yes | Yes | Yes | Yes |
| security | Yes | Yes | Yes | No |
| storage | Yes | Yes | Yes | No |
| logging | Yes | Yes | Yes | Yes |
| loadbalancing | Yes | Yes | Yes | No |
| iam | Yes | Yes | Yes | No |
| cognito | Yes | Yes | No | No |

## Directory Structure

```
terraform/test/
├── Makefile                          # Test targets
├── README.md                         # This file
├── go.mod                            # Go module definition
├── go.sum                            # Dependency checksums
├── helpers/
│   └── helpers.go                    # Shared constants and variable builders
├── fixtures/                         # Thin wrappers around real modules
│   ├── networking/
│   ├── security/
│   ├── storage/
│   ├── logging/
│   ├── loadbalancing/
│   └── iam/
├── validate_test.go                  # terraform validate + fmt checks
├── networking_test.go                # Plan-only test
├── security_test.go                  # Plan-only test
├── storage_test.go                   # Plan-only test
├── logging_test.go                   # Plan-only test
├── loadbalancing_test.go             # Plan-only test
├── iam_test.go                       # Plan-only test
├── networking_integration_test.go    # Deploy/destroy (build tag: integration)
└── logging_integration_test.go       # Deploy/destroy (build tag: integration)
```
