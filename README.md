# Ava Robotics

A multi-platform robotics project with infrastructure, backend API, and mobile clients.

## Table of Contents

- [Overview](#overview)
- [CI/CD Pipeline](#cicd-pipeline)
- [Test Coverage](#test-coverage)
- [Repository Structure](#repository-structure)
- [Directory Details](#directory-details)
- [Getting Started](#getting-started)

---

## Overview

Ava Robotics is a multi-platform robotics solution that combines cloud infrastructure, backend services, and mobile applications to deliver a comprehensive robotics platform. The project encompasses:

- **Infrastructure**: AWS cloud resources managed through Terraform and Kubernetes deployments
- **Backend**: Go-based API services handling business logic and data processing
- **Mobile**: Native applications for both Android (Kotlin) and iOS (Swift)
- **Web**: React-based frontend for browser access

## CI/CD Pipeline

Every push to a non-main branch and every pull request triggers the CI pipeline (`.github/workflows/ci.yml`). The pipeline uses path-based filtering to only run relevant checks.

### How It Works

1. **Path detection** — `dorny/paths-filter` identifies which directories (`api/`, `terraform/`, `web/`) have changes
2. **Conditional jobs** — Only the relevant lint/test jobs run based on detected changes
3. **Status wrappers** — Each component has a wrapper job that always reports a result, enabling required status checks without blocking unrelated PRs

### Checks

| Status Check | Triggers When | What It Runs |
|--------------|---------------|--------------|
| `Go CI` | `api/` changes | `golangci-lint` + `go test ./...` |
| `Terraform CI` | `terraform/` changes | `make test-validate` (terraform validate + fmt check) |
| `Web CI` | `web/` changes | `tsc --noEmit` + `npm run build` |

All three status checks are **required** to merge a PR. If a component has no changes, its status check passes automatically (skipped).

## Test Coverage

### Go API

| Type | Command | Description |
|------|---------|-------------|
| Lint | `golangci-lint run` | Static analysis via golangci-lint v2 |
| Unit | `go test ./...` | All Go unit tests |

### Terraform (Terratest)

See [terraform/README.md](terraform/README.md#test-coverage) for the full module coverage matrix.

### Web Frontend

| Type | Command | Description |
|------|---------|-------------|
| Type check | `npx tsc --noEmit` | TypeScript type validation |
| Build | `npm run build` | Production build verification |

## Repository Structure

```text
avarobotics/
├── terraform/       # Infrastructure as Code (AWS)
├── k8s/             # Kubernetes manifests and Helm charts
├── api/             # Go backend API service
├── android/         # Android mobile application
├── ios/             # iOS mobile application
├── web/             # Web frontend application
├── specs/           # Feature specifications and design docs
├── guidelines/      # Project guidelines and conventions
└── src/             # Shared source components
```

## Directory Details

| Directory | Purpose | Technologies |
|-----------|---------|--------------|
| `terraform/` | Infrastructure as Code for AWS cloud resources | Terraform, HCL |
| `k8s/` | Kubernetes manifests and Helm charts | YAML, Helm |
| `api/` | Go backend API service | Go 1.22+ |
| `android/` | Android mobile application | Kotlin, Jetpack Compose |
| `ios/` | iOS mobile application | Swift, SwiftUI |
| `web/` | Web frontend application | TypeScript, React, Vite |
| `specs/` | Feature specifications and design docs | Markdown |
| `guidelines/` | Project guidelines and conventions | Markdown |
| `src/` | Shared source components | TypeScript |

## Getting Started

Each component directory contains a `CLAUDE.md` file with detailed conventions, setup instructions, and development guidelines specific to that component:

- [Terraform conventions](terraform/CLAUDE.md) - Infrastructure setup and Terraform best practices
- [Kubernetes conventions](k8s/CLAUDE.md) - Deployment manifests and Helm chart guidelines
- [API conventions](api/CLAUDE.md) - Go backend development standards
- [Android conventions](android/CLAUDE.md) - Kotlin and Compose development patterns
- [iOS conventions](ios/CLAUDE.md) - Swift and SwiftUI development patterns

For project-wide guidelines and coding standards, see [guidelines/](guidelines/).
