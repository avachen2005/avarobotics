# Ava Robotics

## Project Overview
Multi-platform robotics project with infrastructure, backend API, and mobile clients.

## Repository Structure
- `terraform/` - Infrastructure as Code (AWS/GCP)
- `k8s/` - Kubernetes manifests and Helm charts
- `api/` - Go backend API
- `android/` - Android mobile app (Kotlin/Compose)
- `ios/` - iOS mobile app (Swift/SwiftUI)

## General Conventions
- Use conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- All PRs require passing CI checks
- Keep secrets out of version control - use environment variables or secret managers

## Code Review Standards
- Changes should be focused and atomic
- Include tests for new functionality
- Update documentation when behavior changes
