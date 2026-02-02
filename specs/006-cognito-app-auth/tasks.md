# Tasks: App Cognito Authentication

**Input**: Design documents from `/specs/006-cognito-app-auth/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are NOT explicitly requested in the spec. Test tasks are omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **API**: `api/` - Go backend
- **iOS**: `ios/YogaApp/` - Swift iOS app
- **Android**: `android/app/src/main/java/.../yogaapp/` - Kotlin Android app

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependencies

- [ ] T001 Add JWT dependency to api/go.mod: `github.com/golang-jwt/jwt/v5`
- [ ] T002 [P] Create api/internal/middleware/ directory
- [ ] T003 [P] Create api/internal/service/ directory
- [ ] T004 [P] Create api/internal/model/ directory
- [ ] T005 [P] Initialize iOS project structure in ios/YogaApp/ with Xcode
- [ ] T006 [P] Initialize Android project structure in android/ with Android Studio
- [ ] T007 [P] Add AWS Amplify SDK to iOS project (via SPM or CocoaPods)
- [ ] T008 [P] Add AWS Amplify SDK to Android project (via Gradle)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### API Foundation

- [ ] T009 Create User model in api/internal/model/user.go with sub, email, name, picture fields
- [ ] T010 Create ErrorResponse model in api/internal/model/error.go with code and message fields
- [ ] T011 Implement JWKS fetcher service in api/internal/service/cognito.go with caching (1 hour TTL)
- [ ] T012 Implement JWT validation middleware in api/internal/middleware/auth.go using cognito service
- [ ] T013 Add auth failure logging in middleware (minimal: log failures only per spec FR-012)
- [ ] T014 Register protected route group in api/cmd/server/main.go with auth middleware

### iOS Foundation

- [ ] T015 Create AWSConfig.swift in ios/YogaApp/Core/Config/ with Cognito region, userPoolId, clientId
- [ ] T016 Create TokenManager.swift in ios/YogaApp/Features/Auth/ with Keychain storage
- [ ] T017 Create APIClient.swift in ios/YogaApp/Core/Network/ with Authorization header injection
- [ ] T018 Create AuthState enum in ios/YogaApp/Features/Auth/ (anonymous, authenticated, refreshing, expired)

### Android Foundation

- [ ] T019 Create aws_config.xml in android/app/src/main/res/values/ with Cognito settings
- [ ] T020 Create TokenManager.kt in android/.../yogaapp/auth/ with EncryptedSharedPreferences storage
- [ ] T021 Create ApiClient.kt in android/.../yogaapp/core/network/ with Authorization header injection
- [ ] T022 Create AuthState sealed class in android/.../yogaapp/auth/ (Anonymous, Authenticated, Refreshing, Expired)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Gmail Login via Cognito (Priority: P1) 🎯 MVP

**Goal**: Users can sign in using Gmail account via Google OAuth through Cognito

**Independent Test**: Complete Google OAuth flow on mobile app, receive valid tokens, redirect to home screen

### API (US1 supports login indirectly via token validation)

_No additional API tasks - login is handled by Cognito + mobile apps_

### iOS Implementation

- [ ] T023 [US1] Create AuthService.swift in ios/YogaApp/Features/Auth/ with signInWithGoogle() method using Amplify
- [ ] T024 [US1] Create LoginView.swift in ios/YogaApp/Features/Auth/ with "Sign in with Google" button
- [ ] T025 [US1] Implement OAuth callback handling in AuthService.swift for redirect back to app
- [ ] T026 [US1] Store tokens in TokenManager after successful login in AuthService.swift
- [ ] T027 [US1] Create HomeView.swift in ios/YogaApp/Features/Home/ as post-login destination
- [ ] T028 [US1] Implement auto-login on app launch in AuthService.swift using stored tokens
- [ ] T029 [US1] Add login error handling and user feedback in LoginView.swift

### Android Implementation

- [ ] T030 [P] [US1] Create AuthService.kt in android/.../yogaapp/auth/ with signInWithGoogle() method using Amplify
- [ ] T031 [P] [US1] Create LoginActivity.kt in android/.../yogaapp/auth/ with "Sign in with Google" button
- [ ] T032 [US1] Implement OAuth callback handling in AuthService.kt for redirect back to app
- [ ] T033 [US1] Store tokens in TokenManager after successful login in AuthService.kt
- [ ] T034 [US1] Create HomeActivity.kt in android/.../yogaapp/home/ as post-login destination
- [ ] T035 [US1] Implement auto-login on app launch in AuthService.kt using stored tokens
- [ ] T036 [US1] Add login error handling and user feedback in LoginActivity.kt

**Checkpoint**: User Story 1 complete - Users can login with Gmail on both iOS and Android

---

## Phase 4: User Story 2 - Token Refresh (Priority: P1)

**Goal**: Session remains active by automatically refreshing access token

**Independent Test**: Wait for token expiration, verify automatic refresh without user intervention

### iOS Implementation

- [ ] T037 [US2] Add token expiration checking in TokenManager.swift (check if < 5 min remaining)
- [ ] T038 [US2] Implement refreshToken() method in AuthService.swift using Cognito refresh endpoint
- [ ] T039 [US2] Add automatic refresh logic to APIClient.swift before API calls
- [ ] T040 [US2] Implement request queue in APIClient.swift to wait during refresh
- [ ] T041 [US2] Handle refresh failure (expired refresh token) by redirecting to login in AuthService.swift

### Android Implementation

- [ ] T042 [P] [US2] Add token expiration checking in TokenManager.kt (check if < 5 min remaining)
- [ ] T043 [P] [US2] Implement refreshToken() method in AuthService.kt using Cognito refresh endpoint
- [ ] T044 [US2] Add automatic refresh logic to ApiClient.kt before API calls
- [ ] T045 [US2] Implement request queue in ApiClient.kt to wait during refresh
- [ ] T046 [US2] Handle refresh failure (expired refresh token) by redirecting to login in AuthService.kt

**Checkpoint**: User Story 2 complete - Token refresh works automatically on both platforms

---

## Phase 5: User Story 3 - Get Current User Info (Priority: P1)

**Goal**: Users can view their profile information from the API

**Independent Test**: Call /api/v1/me with valid token, verify user data returned

### API Implementation

- [ ] T047 [US3] Create MeHandler in api/internal/handler/me.go returning UserResponse from JWT claims
- [ ] T048 [US3] Register GET /api/v1/me route in api/cmd/server/main.go with auth middleware

### iOS Implementation

- [ ] T049 [P] [US3] Create UserProfile model in ios/YogaApp/Features/Profile/Models/UserProfile.swift
- [ ] T050 [US3] Add fetchCurrentUser() method in APIClient.swift calling GET /api/v1/me
- [ ] T051 [US3] Create ProfileView.swift in ios/YogaApp/Features/Profile/ displaying email, name, picture
- [ ] T052 [US3] Handle API errors and token refresh in ProfileView.swift

### Android Implementation

- [ ] T053 [P] [US3] Create UserProfile data class in android/.../yogaapp/profile/models/UserProfile.kt
- [ ] T054 [US3] Add fetchCurrentUser() method in ApiClient.kt calling GET /api/v1/me
- [ ] T055 [US3] Create ProfileActivity.kt in android/.../yogaapp/profile/ displaying email, name, picture
- [ ] T056 [US3] Handle API errors and token refresh in ProfileActivity.kt

**Checkpoint**: User Story 3 complete - Profile endpoint works and displays on both platforms

---

## Phase 6: User Story 4 - View Yoga Activities (Priority: P2)

**Goal**: Users can see a paginated list of their yoga activities

**Independent Test**: Call /api/v1/activities with valid token, verify activity list with pagination

### API Implementation

- [ ] T057 [US4] Create Activity model in api/internal/model/activity.go with all fields from data-model.md
- [ ] T058 [US4] Create Pagination model in api/internal/model/pagination.go with next_cursor, has_more
- [ ] T059 [US4] Create ActivitiesResponse model in api/internal/model/activity.go with data and pagination
- [ ] T060 [US4] Create ActivitiesHandler in api/internal/handler/activities.go with cursor-based pagination
- [ ] T061 [US4] Register GET /api/v1/activities route in api/cmd/server/main.go with auth middleware
- [ ] T062 [US4] Add mock activity data for testing (temporary until database integration)

### iOS Implementation

- [ ] T063 [P] [US4] Create Activity model in ios/YogaApp/Features/Activities/Models/Activity.swift
- [ ] T064 [P] [US4] Create Pagination model in ios/YogaApp/Features/Activities/Models/Pagination.swift
- [ ] T065 [US4] Add fetchActivities(cursor:limit:) method in APIClient.swift calling GET /api/v1/activities
- [ ] T066 [US4] Create ActivitiesView.swift in ios/YogaApp/Features/Activities/ with activity list
- [ ] T067 [US4] Implement infinite scroll pagination in ActivitiesView.swift
- [ ] T068 [US4] Add empty state message in ActivitiesView.swift when no activities

### Android Implementation

- [ ] T069 [P] [US4] Create Activity data class in android/.../yogaapp/activities/models/Activity.kt
- [ ] T070 [P] [US4] Create Pagination data class in android/.../yogaapp/activities/models/Pagination.kt
- [ ] T071 [US4] Add fetchActivities(cursor:limit:) method in ApiClient.kt calling GET /api/v1/activities
- [ ] T072 [US4] Create ActivitiesActivity.kt in android/.../yogaapp/activities/ with RecyclerView list
- [ ] T073 [US4] Implement infinite scroll pagination in ActivitiesActivity.kt
- [ ] T074 [US4] Add empty state message in ActivitiesActivity.kt when no activities

**Checkpoint**: User Story 4 complete - Activities endpoint works with pagination on both platforms

---

## Phase 7: User Story 5 - Sign Out (Priority: P2)

**Goal**: Users can sign out, clearing all tokens

**Independent Test**: Tap sign out, verify tokens cleared, user returned to login screen

### iOS Implementation

- [ ] T075 [US5] Add signOut() method in AuthService.swift clearing tokens from TokenManager
- [ ] T076 [US5] Add sign out button to ProfileView.swift or HomeView.swift
- [ ] T077 [US5] Navigate to LoginView after sign out in AuthService.swift

### Android Implementation

- [ ] T078 [P] [US5] Add signOut() method in AuthService.kt clearing tokens from TokenManager
- [ ] T079 [P] [US5] Add sign out button to ProfileActivity.kt or HomeActivity.kt
- [ ] T080 [US5] Navigate to LoginActivity after sign out in AuthService.kt

**Checkpoint**: User Story 5 complete - Sign out works on both platforms

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T081 [P] Add network connectivity error handling in ios/YogaApp/Core/Network/APIClient.swift
- [ ] T082 [P] Add network connectivity error handling in android/.../yogaapp/core/network/ApiClient.kt
- [ ] T083 [P] Handle corrupted token scenario in ios TokenManager.swift (clear and redirect to login)
- [ ] T084 [P] Handle corrupted token scenario in android TokenManager.kt (clear and redirect to login)
- [ ] T085 Run quickstart.md validation on API server
- [ ] T086 Run quickstart.md validation on iOS app
- [ ] T087 Run quickstart.md validation on Android app

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

| Story | Priority | Depends On | Can Start After |
|-------|----------|------------|-----------------|
| US1 - Gmail Login | P1 | Foundational | Phase 2 |
| US2 - Token Refresh | P1 | US1 (tokens must exist) | Phase 3 |
| US3 - User Info | P1 | Foundational + API auth | Phase 2 |
| US4 - Activities | P2 | US3 (API pattern established) | Phase 5 |
| US5 - Sign Out | P2 | US1 (must be logged in) | Phase 3 |

### Within Each User Story

1. API tasks before mobile tasks (endpoints must exist)
2. Models before services
3. Services before UI
4. Core implementation before error handling

### Parallel Opportunities

**Phase 1 (Setup)**:
- T002, T003, T004 can run in parallel (create directories)
- T005, T006 can run in parallel (iOS and Android project init)
- T007, T008 can run in parallel (SDK setup)

**Phase 2 (Foundational)**:
- iOS tasks (T015-T018) and Android tasks (T019-T022) can run in parallel

**User Stories**:
- iOS and Android implementation can always run in parallel within each story
- US3 API tasks can start immediately after Phase 2
- US5 can run in parallel with US4 (no dependencies between them)

---

## Parallel Example: User Story 3

```bash
# API (must complete first):
Task: "Create MeHandler in api/internal/handler/me.go"
Task: "Register GET /api/v1/me route"

# Then iOS and Android in parallel:
Task: "Create UserProfile model (iOS)"  |  Task: "Create UserProfile data class (Android)"
Task: "Add fetchCurrentUser (iOS)"      |  Task: "Add fetchCurrentUser (Android)"
Task: "Create ProfileView (iOS)"        |  Task: "Create ProfileActivity (Android)"
```

---

## Implementation Strategy

### MVP First (User Story 1 + 3 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: US1 - Gmail Login
4. Complete Phase 5: US3 - User Info (API + mobile)
5. **STOP and VALIDATE**: Login → see profile info
6. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. US1 (Login) → Can authenticate (MVP-1)
3. US3 (User Info) → Can see profile (MVP-2)
4. US2 (Token Refresh) → Session persists smoothly
5. US4 (Activities) → Core yoga feature
6. US5 (Sign Out) → Complete auth flow
7. Polish → Production ready

### Platform Parallel Strategy

With 2+ developers:
1. Complete API tasks together
2. Split: Developer A on iOS, Developer B on Android
3. Each platform implements all user stories independently
4. Sync at checkpoints to ensure API compatibility

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- API endpoints MUST be implemented before mobile calls them
- iOS and Android can always be developed in parallel
- Commit after each task or logical group
- Stop at any checkpoint to validate independently
