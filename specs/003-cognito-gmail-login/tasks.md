# Tasks: Cognito Gmail Login

**Input**: Design documents from `/specs/003-cognito-gmail-login/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Infrastructure**: `terraform/modules/`, `terraform/environments/dev/`
- **Web Frontend**: `web/src/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and web frontend structure

- [x] T001 Create web source directory structure at `web/src/`
- [x] T002 [P] Create `web/src/auth/` directory for authentication module
- [x] T003 [P] Create `web/src/pages/` directory for page components
- [x] T004 [P] Create `web/src/components/` directory for shared components
- [x] T005 Add AWS Amplify dependencies to `web/package.json` (@aws-amplify/auth, @aws-amplify/core)
- [x] T006 [P] Add React Router dependency to `web/package.json` (react-router-dom)
- [x] T007 Update `web/index.html` with root div for React mounting

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: AWS Infrastructure that MUST be complete before ANY frontend work can begin

**⚠️ CRITICAL**: No frontend implementation can begin until Cognito is deployed

### IAM Policy Update

- [x] T008 Create Cognito IAM policy at `terraform/modules/iam/policies/cognito.json` per contracts/iam-cognito-policy.md
- [x] T009 Add `aws_iam_policy.cognito` resource to `terraform/modules/iam/main.tf`
- [x] T010 Add `aws_iam_role_policy_attachment.cognito` to attach policy to TerraformDeployRole
- [x] T011 [P] Add `cognito_policy_arn` output to `terraform/modules/iam/outputs.tf`

### Cognito Terraform Module

- [x] T012 Create Cognito module directory at `terraform/modules/cognito/`
- [x] T013 Create `terraform/modules/cognito/variables.tf` per contracts/cognito-terraform.md
- [x] T014 [P] Create `terraform/modules/cognito/outputs.tf` per contracts/cognito-terraform.md
- [x] T015 Create `terraform/modules/cognito/main.tf` with User Pool resource
- [x] T016 Add User Pool Client resource to `terraform/modules/cognito/main.tf`
- [x] T017 Add User Pool Domain resource to `terraform/modules/cognito/main.tf`
- [x] T018 Add Google Identity Provider resource to `terraform/modules/cognito/main.tf`

### Environment Integration

- [x] T019 Add `google_client_id` and `google_client_secret` variables to `terraform/environments/dev/variables.tf`
- [x] T020 Add Cognito module reference to `terraform/environments/dev/main.tf`
- [x] T021 [P] Add Cognito outputs to `terraform/environments/dev/outputs.tf`
- [x] T022 Run `terraform validate` on Cognito module
- [ ] T023 Run `terraform plan` to preview Cognito resource creation
- [ ] T024 Run `terraform apply -target=module.iam` to deploy updated IAM policy
- [ ] T025 Run `terraform apply -target=module.cognito` to deploy Cognito resources

**Checkpoint**: Infrastructure ready - frontend implementation can now begin

---

## Phase 3: User Story 1 - Gmail Sign-In (Priority: P1) 🎯 MVP

**Goal**: Users can sign in using their Gmail account via Google OAuth

**Independent Test**: Click "Sign in with Google" button, complete Google auth, verify redirect to Dashboard

### Implementation for User Story 1

- [x] T026 [US1] Create Cognito configuration at `web/src/auth/cognito.ts` with Amplify.configure()
- [x] T027 [US1] Create environment variables file `web/.env.local.example` with VITE_COGNITO_* variables
- [x] T028 [US1] Create AuthUser interface and AuthContext in `web/src/auth/AuthProvider.tsx`
- [x] T029 [US1] Implement signInWithGoogle function in AuthProvider using Amplify.Auth.federatedSignIn
- [x] T030 [US1] Create `web/src/components/GoogleSignInButton.tsx` component
- [x] T031 [US1] Create `web/src/pages/LoginPage.tsx` with Google sign-in button
- [x] T032 [US1] Create basic `web/src/App.tsx` with BrowserRouter and routes
- [x] T033 [US1] Create `web/src/main.tsx` entry point that initializes Cognito and renders App
- [x] T034 [US1] Add OAuth callback handling in AuthProvider for post-authentication redirect

**Checkpoint**: At this point, User Story 1 should be fully functional - users can sign in with Google

---

## Phase 4: User Story 2 - Session Management (Priority: P1)

**Goal**: User sessions persist across browser sessions until explicit logout

**Independent Test**: Login, close browser, reopen, verify still logged in; click Sign Out, verify redirected to login

### Implementation for User Story 2

- [x] T035 [US2] Create `web/src/auth/useAuth.ts` hook that consumes AuthContext
- [x] T036 [US2] Implement session restoration in AuthProvider using Amplify.Auth.currentAuthenticatedUser
- [x] T037 [US2] Implement signOut function in AuthProvider using Amplify.Auth.signOut
- [x] T038 [US2] Create `web/src/auth/AuthGuard.tsx` protected route wrapper component
- [x] T039 [US2] Create `web/src/pages/DashboardPage.tsx` with Sign Out button
- [x] T040 [US2] Update `web/src/App.tsx` to wrap Dashboard route with AuthGuard
- [x] T041 [US2] Add redirect to login page for unauthenticated users in AuthGuard

**Checkpoint**: At this point, sessions persist and users can sign out

---

## Phase 5: User Story 3 - User Profile Access (Priority: P2)

**Goal**: Display user's name and profile picture from Google account

**Independent Test**: Login, verify name and profile picture appear in Dashboard/navigation

### Implementation for User Story 3

- [x] T042 [US3] Create `web/src/components/UserProfile.tsx` component showing name and avatar
- [x] T043 [US3] Update AuthProvider to extract name and picture from Cognito ID token
- [x] T044 [US3] Update `web/src/pages/DashboardPage.tsx` to display UserProfile component
- [x] T045 [US3] Add fallback handling when profile picture is not available

**Checkpoint**: User profile information is displayed after login

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Error handling, loading states, and validation

- [x] T046 Add loading spinner component for auth state resolution
- [x] T047 Add error message display for authentication failures in LoginPage
- [x] T048 [P] Add error boundary component for auth errors
- [x] T049 Handle token refresh failures with graceful redirect to login
- [x] T050 [P] Create `web/.env.local.example` documentation with all required variables
- [ ] T051 Run quickstart.md validation steps to verify complete flow
- [ ] T052 Test complete login/logout flow in browser

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all frontend work
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion (Cognito must be deployed)
  - US1 and US2 are both P1, but US2 depends on US1 (need login before testing session)
  - US3 (P2) can start after US1 but enhances the Dashboard from US2
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Depends on US1 (need working login to test session management)
- **User Story 3 (P2)**: Depends on US1 (need user data), integrates with US2 (Dashboard page)

### Within Each Phase

- IAM policy before Cognito module (Cognito needs deploy permissions)
- Cognito User Pool before Client before Domain before Identity Provider
- cognito.ts config before AuthProvider (needs configuration)
- AuthProvider before pages (pages consume auth context)
- LoginPage before AuthGuard (need login to test protection)

### Parallel Opportunities

- T002, T003, T004 can run in parallel (different directories)
- T005, T006 can run in parallel (same file but different dependencies)
- T011, T014 can run in parallel (different output files)
- T019, T020, T021 can run in parallel (different files)

---

## Parallel Example: Phase 1 Setup

```bash
# Launch directory creation in parallel:
Task: "Create web/src/auth/ directory"
Task: "Create web/src/pages/ directory"
Task: "Create web/src/components/ directory"
```

## Parallel Example: Phase 2 Foundational

```bash
# After User Pool is created, these can run in parallel:
Task: "Add cognito_policy_arn output to terraform/modules/iam/outputs.tf"
Task: "Create terraform/modules/cognito/outputs.tf"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (deploy Cognito)
3. Complete Phase 3: User Story 1 (Gmail Sign-In)
4. **STOP and VALIDATE**: Test Google login works end-to-end
5. Deploy/demo if ready - users can now sign in!

### Incremental Delivery

1. Complete Setup + Foundational → Infrastructure ready
2. Add User Story 1 → Test login → Deploy (MVP!)
3. Add User Story 2 → Test session persistence + logout → Deploy
4. Add User Story 3 → Test profile display → Deploy
5. Add Polish → Final validation → Production ready

### Validation Commands

```bash
# After Phase 2 (Foundational) - Test Cognito deployment
aws cognito-idp describe-user-pool --user-pool-id <USER_POOL_ID> --profile terraform-deploy

# After Phase 3 (US1) - Test login flow
cd web && pnpm dev  # Open http://localhost:5173, click Sign in with Google

# After Phase 4 (US2) - Test session persistence
# Login, close browser, reopen, verify still logged in
# Click Sign Out, verify redirected to login

# After Phase 5 (US3) - Test profile display
# Login, verify name and picture appear in Dashboard
```

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Terraform infrastructure MUST be deployed before any frontend work
- Google OAuth credentials must be created in Google Cloud Console before Cognito deployment
- Environment variables (VITE_COGNITO_*) must be set before frontend testing
- Total tasks: 52
