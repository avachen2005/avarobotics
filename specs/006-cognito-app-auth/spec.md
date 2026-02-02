# Feature Specification: App Cognito Authentication

**Feature Branch**: `006-cognito-app-auth`
**Created**: 2026-02-02
**Status**: Draft
**Input**: User description: "app 需要用 gmail 登入 cognito access token refresh token id token refresh token to get access token and every api need to access user info with access token, need to get a list of user activities with access token"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Gmail Login via Cognito (Priority: P1)

As a mobile app user, I want to sign in using my Gmail account so that I can securely access the app without creating a separate account.

**Why this priority**: Authentication is the foundation for all other features. Without login, users cannot access any protected functionality or their personal data.

**Independent Test**: Can be fully tested by completing a Google OAuth flow on the mobile app and receiving valid tokens. Delivers immediate value by enabling secure access to the app.

**Acceptance Scenarios**:

1. **Given** a user with a valid Gmail account opens the app, **When** they tap "Sign in with Google" and complete Google authentication, **Then** they receive access token, refresh token, and ID token, and are redirected to the app's home screen.

2. **Given** a user cancels the Google sign-in flow, **When** they return to the app, **Then** they remain on the login screen with no error and can retry.

3. **Given** a user has previously signed in, **When** they open the app again, **Then** the app uses stored tokens to automatically sign them in without requiring manual authentication.

---

### User Story 2 - Token Refresh (Priority: P1)

As a mobile app user, I want my session to remain active by automatically refreshing my access token so that I don't have to repeatedly sign in.

**Why this priority**: Token refresh is critical for user experience. Without it, users would be logged out frequently, causing frustration and potential data loss.

**Independent Test**: Can be tested by waiting for access token expiration and verifying that the app automatically obtains a new access token using the refresh token without user intervention.

**Acceptance Scenarios**:

1. **Given** a user's access token has expired but refresh token is still valid, **When** the app makes an API request, **Then** the app automatically obtains a new access token using the refresh token and retries the request seamlessly.

2. **Given** a user's refresh token has expired, **When** the app attempts to refresh the access token, **Then** the user is redirected to the login screen with a message indicating they need to sign in again.

---

### User Story 3 - Get Current User Info (Priority: P1)

As a mobile app user, I want to view my profile information so that I can confirm I'm signed in with the correct account.

**Why this priority**: Essential for user identity confirmation and personalization. Users need to know which account they're using.

**Independent Test**: Can be tested by calling the user info API endpoint with a valid access token and verifying the returned user data matches the signed-in account.

**Acceptance Scenarios**:

1. **Given** a user is signed in with a valid access token, **When** they access their profile, **Then** they see their email, name, and profile picture from their Google account.

2. **Given** a user has an invalid or expired access token, **When** they try to access their profile, **Then** the app attempts token refresh or redirects to login if refresh fails.

---

### User Story 4 - View Yoga Activities (Priority: P2)

As a mobile app user, I want to see a list of my yoga activities so that I can track my yoga practice history and progress.

**Why this priority**: Yoga activity tracking provides core value for a yoga app but depends on authentication being in place first. It's the first feature that demonstrates the usefulness of the authenticated session.

**Independent Test**: Can be tested by calling the activities API endpoint with a valid access token and verifying a list of yoga activities is returned and displayed.

**Acceptance Scenarios**:

1. **Given** a user is signed in with a valid access token, **When** they navigate to the activities section, **Then** they see a chronologically sorted list of their yoga activities (sessions, exercises).

2. **Given** a user has no yoga activities yet, **When** they view the activities section, **Then** they see an empty state message encouraging them to start their first yoga session.

3. **Given** a user has many yoga activities, **When** they scroll through the list, **Then** activities are loaded incrementally (paginated) to maintain app performance.

---

### User Story 5 - Sign Out (Priority: P2)

As a mobile app user, I want to sign out of my account so that I can secure my session or switch to a different account.

**Why this priority**: Important for security and multi-user scenarios, but secondary to core authentication flow.

**Independent Test**: Can be tested by tapping sign out and verifying all tokens are cleared and user is returned to login screen.

**Acceptance Scenarios**:

1. **Given** a user is signed in, **When** they tap "Sign Out", **Then** all tokens are cleared from local storage and they are returned to the login screen.

2. **Given** a user has signed out, **When** they try to access any protected feature, **Then** they are required to sign in again.

---

### Edge Cases

- What happens when the device has no internet connection during login?
  - App displays a clear error message and allows retry when connection is restored.
- What happens when Google OAuth returns an error?
  - App displays user-friendly error message with option to retry or contact support.
- What happens when tokens are corrupted in local storage?
  - App clears corrupted tokens and redirects user to login.
- What happens when the user revokes app access from Google account settings?
  - Next API call fails, app clears local tokens and redirects to login with explanation.
- What happens when multiple API requests are made simultaneously with an expired token?
  - Only one refresh request is made; other requests wait and retry with new token.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to sign in using their Gmail account via Google OAuth through AWS Cognito.
- **FR-002**: System MUST return access token, refresh token, and ID token upon successful authentication.
- **FR-003**: Mobile app MUST securely store tokens in platform-appropriate secure storage (Keychain for iOS, Keystore for Android).
- **FR-004**: System MUST allow the app to exchange a valid refresh token for a new access token.
- **FR-005**: All protected API endpoints MUST require a valid access token in the Authorization header.
- **FR-006**: API MUST validate the access token against Cognito before processing any protected request.
- **FR-007**: API MUST provide an endpoint to retrieve the current user's profile information (email, name, picture).
- **FR-008**: API MUST provide an endpoint to retrieve a paginated list of user's yoga activities.
- **FR-009**: System MUST allow users to sign out, clearing all local tokens.
- **FR-010**: System MUST handle token expiration gracefully by automatically refreshing when possible.
- **FR-011**: System MUST return appropriate error responses when authentication fails (401 Unauthorized).
- **FR-012**: API MUST log authentication failures for security monitoring (minimal logging approach).

### Key Entities

- **User**: Represents an authenticated user with attributes: unique ID (sub), email, name, profile picture URL. Sourced from Google account via Cognito.
- **Token Set**: Collection of authentication tokens: access token (short-lived, used for API calls), refresh token (long-lived, used to obtain new access tokens), ID token (contains user identity claims).
- **Activity**: Represents a yoga activity/session performed by the user with attributes: activity ID, user ID, activity type (e.g., yoga session, specific pose/exercise), description, duration, timestamp. Belongs to a single user. This is a yoga app - activities are yoga-related, not login/profile events.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete Gmail sign-in flow in under 30 seconds from tapping "Sign in" to reaching the home screen.
- **SC-002**: Token refresh occurs automatically without user awareness in 99% of cases.
- **SC-003**: User profile information loads within 2 seconds of request.
- **SC-004**: Activity list loads within 3 seconds with pagination support for lists over 20 items.
- **SC-005**: System correctly rejects 100% of requests with invalid or expired access tokens.
- **SC-006**: App handles network errors gracefully with clear user feedback in all authentication scenarios.

## Clarifications

### Session 2026-02-02

- Q: What types of activities does the Activity entity represent? → A: Yoga activities (sessions, exercises) - this is a yoga app. Login/profile APIs are separate from activity tracking.
- Q: What should be logged for security and debugging? → A: Minimal logging - only authentication failures.

## Assumptions

- AWS Cognito User Pool with Google Identity Provider is already configured (existing infrastructure from 003-cognito-gmail-login).
- Mobile apps (iOS and Android) will use official AWS Amplify SDK or equivalent for Cognito integration.
- Activity data will be created by other features; this spec only covers retrieving activities.
- Access token validity is 1 hour (as configured in existing Cognito setup).
- Refresh token validity follows existing Cognito configuration.
- The Go API server already exists with a health check endpoint (from 004-health-check-api).
