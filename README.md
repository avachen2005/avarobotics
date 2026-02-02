# Ava Robotics

A multi-platform robotics project with infrastructure, backend API, and mobile clients.

## Table of Contents

- [Overview](#overview)
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
