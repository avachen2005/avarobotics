# Implementation Plan: Cognito Gmail Login

**Branch**: `003-cognito-gmail-login` | **Date**: 2026-02-01 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-cognito-gmail-login/spec.md`

## Summary

Implement Gmail OAuth authentication using AWS Cognito for the Ava Robotics web application. Users will authenticate via Google, with Cognito managing user pools and session tokens. The React frontend will handle the OAuth flow and maintain persistent sessions until explicit logout.

## Technical Context

**Language/Version**: TypeScript 5.x (Frontend), HCL (Terraform)
**Primary Dependencies**: React 18.3, Vite 6.x, AWS Amplify (Cognito SDK), Tailwind CSS 4.x
**Storage**: AWS Cognito User Pool (user data), Browser localStorage/cookies (session tokens)
**Testing**: Vitest (unit), Playwright (E2E)
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: Web application (frontend + infrastructure)
**Performance Goals**: Login completion < 30 seconds, Sign-out < 2 seconds
**Constraints**: No server-side backend for auth (Cognito handles it), sessions persist until logout
**Scale/Scope**: Consumer app, any Google account allowed

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| AWS IAM User → Role → Policy | ✅ Pass | Cognito resources managed via TerraformDeployRole |
| Minimum privilege | ✅ Pass | Cognito policy will be scoped to specific resources |
| Policy separation | ✅ Pass | New CognitoPolicy separate from Infrastructure/State policies |
| Conventional commits | ✅ Pass | Will follow feat:/fix:/docs: convention |

## Project Structure

### Documentation (this feature)

```text
specs/003-cognito-gmail-login/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
# Infrastructure (Terraform)
terraform/
├── modules/
│   ├── cognito/                    # NEW: Cognito User Pool module
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   └── iam/
│       └── policies/
│           └── cognito.json        # NEW: Cognito permissions policy
└── environments/
    └── dev/
        └── main.tf                 # Add cognito module reference

# Web Frontend (React)
web/
├── src/                            # NEW: Create source directory
│   ├── main.tsx                    # App entry point
│   ├── App.tsx                     # Root component with auth routing
│   ├── auth/                       # Authentication module
│   │   ├── AuthProvider.tsx        # Auth context provider
│   │   ├── AuthGuard.tsx           # Protected route wrapper
│   │   ├── useAuth.ts              # Auth hook
│   │   └── cognito.ts              # Cognito configuration
│   ├── pages/
│   │   ├── LoginPage.tsx           # Login page with Google button
│   │   └── DashboardPage.tsx       # Protected dashboard
│   └── components/
│       ├── GoogleSignInButton.tsx  # Google sign-in button
│       └── UserProfile.tsx         # User avatar/name display
├── index.html                      # Update with root div
└── package.json                    # Add AWS Amplify dependency
```

**Structure Decision**: Web application pattern - frontend React app with AWS Cognito as serverless backend. No custom API server needed for authentication.

## Complexity Tracking

No violations - straightforward OAuth integration using managed services.
