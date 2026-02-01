# Ava Robotics

Multi-platform robotics control system with cloud infrastructure and mobile clients.

## Architecture

```
┌─────────────┐     ┌─────────────┐
│   iOS App   │     │ Android App │
└──────┬──────┘     └──────┬──────┘
       │                   │
       └─────────┬─────────┘
                 │
         ┌───────▼───────┐
         │    Go API     │
         │  (Kubernetes) │
         └───────┬───────┘
                 │
         ┌───────▼───────┐
         │  Terraform    │
         │ Infrastructure│
         └───────────────┘
```

## Components

| Directory | Description | Tech Stack |
|-----------|-------------|------------|
| `api/` | Backend API service | Go, REST |
| `android/` | Android mobile app | Kotlin, Jetpack Compose |
| `ios/` | iOS mobile app | Swift, SwiftUI |
| `k8s/` | Kubernetes deployments | Helm, Kustomize |
| `terraform/` | Infrastructure as Code | Terraform |

## Getting Started

### Prerequisites

- Go 1.22+
- Terraform 1.5+
- kubectl
- Android Studio (for Android development)
- Xcode 15+ (for iOS development)

### Development

```bash
# API
cd api && go run ./cmd/server

# Terraform
cd terraform/environments/dev && terraform init && terraform plan

# Kubernetes
kubectl apply -k k8s/overlays/dev
```

## Documentation

Each component has its own `CLAUDE.md` with conventions and guidelines.

## License

Proprietary - All rights reserved
