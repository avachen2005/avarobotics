# Feature Specification: Cognito Gmail Login

**Feature Branch**: `003-cognito-gmail-login`
**Created**: 2026-02-01
**Status**: Draft
**Input**: User description: "Login API using AWS Cognito with Gmail OAuth - allow users to sign in using their Gmail accounts"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Gmail Sign-In (Priority: P1)

As a user, I want to sign in to the application using my Gmail account so that I don't need to create and remember a separate password.

**Why this priority**: This is the core feature - without Gmail sign-in, the feature has no value. It enables frictionless authentication for users who already have Google accounts.

**Independent Test**: Can be fully tested by clicking "Sign in with Google" button and completing Google's OAuth flow. Delivers immediate value by authenticating the user.

**Acceptance Scenarios**:

1. **Given** a user is on the login page, **When** they click "Sign in with Google", **Then** they are redirected to Google's authentication page
2. **Given** a user has completed Google authentication, **When** they authorize the application, **Then** they are redirected to the Dashboard/Home page and logged in
3. **Given** a user signs in with Gmail for the first time, **When** authentication succeeds, **Then** a new user account is automatically created
4. **Given** a user has previously signed in with Gmail, **When** they sign in again, **Then** they are recognized and logged into their existing account

---

### User Story 2 - Session Management (Priority: P1)

As a logged-in user, I want my session to persist so that I don't need to re-authenticate frequently during normal usage.

**Why this priority**: Essential for usability - users expect to stay logged in during active sessions without repeated authentication prompts.

**Independent Test**: Can be tested by logging in, closing the browser, reopening it, and verifying the session is still active.

**Acceptance Scenarios**:

1. **Given** a user is logged in, **When** they navigate between pages, **Then** they remain authenticated
2. **Given** a user is logged in, **When** they return after days/weeks, **Then** they remain authenticated without re-login
3. **Given** a user is logged in, **When** they click "Sign out", **Then** their session ends and they are redirected to the login page

---

### User Story 3 - User Profile Access (Priority: P2)

As a logged-in user, I want the application to display my name and profile picture from my Google account so that I can confirm I'm logged into the correct account.

**Why this priority**: Enhances user experience and provides visual confirmation of authentication, but not required for core functionality.

**Independent Test**: Can be tested by logging in and verifying that name and profile picture are displayed in the navigation area.

**Acceptance Scenarios**:

1. **Given** a user has signed in with Gmail, **When** the login completes, **Then** their display name from Google is shown in the application
2. **Given** a user has signed in with Gmail, **When** the login completes, **Then** their profile picture from Google is displayed (if available)

---

### Edge Cases

- What happens when Google authentication fails? User sees a friendly error message and can retry
- What happens when user denies permission to the application? User is returned to login page with explanation
- What happens when user's Google account is suspended? User cannot authenticate, sees appropriate error
- What happens during network interruption? User sees connection error, can retry when restored
- What happens if user revokes application access from Google? Next login attempt re-prompts for authorization

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST redirect users to Google's authentication when "Sign in with Google" is initiated
- **FR-002**: System MUST create a new user account when a user authenticates with Gmail for the first time
- **FR-003**: System MUST recognize returning users and log them into their existing account
- **FR-004**: System MUST retrieve and store user's email address from Google
- **FR-005**: System MUST retrieve user's display name and profile picture URL from Google
- **FR-006**: System MUST maintain user session state across page navigations
- **FR-007**: System MUST provide a sign-out function that ends the user session
- **FR-008**: System MUST display meaningful error messages when authentication fails
- **FR-009**: System MUST handle token refresh failures gracefully by prompting re-authentication
- **FR-010**: System MUST redirect unauthenticated users to login page when accessing protected resources
- **FR-011**: System MUST accept any valid Google account (no email domain restrictions)
- **FR-012**: System MUST redirect users to Dashboard/Home page after successful authentication
- **FR-013**: System MUST protect all application pages except the login page (no public content)

### Key Entities

- **User**: Represents an authenticated person in the system. Key attributes: unique identifier, email address, display name, profile picture URL, creation timestamp, last login timestamp
- **Session**: Represents an active authentication session. Key attributes: associated user, creation time, expiration time, validity status

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete the Gmail sign-in process in under 30 seconds (excluding Google's authentication time)
- **SC-002**: 95% of sign-in attempts complete successfully on the first try (excluding user-cancelled attempts)
- **SC-003**: User sessions persist indefinitely until explicit logout (no automatic expiration)
- **SC-004**: Sign-out completes in under 2 seconds and fully clears user session
- **SC-005**: New user account creation happens automatically within 5 seconds of first successful authentication

## Assumptions

- Users have valid Gmail/Google accounts
- Users have modern web browsers with JavaScript enabled
- The application will only support Gmail OAuth (no other identity providers initially)
- Google's OAuth service availability is outside our control
- Sessions persist indefinitely until user explicitly logs out
- User profile information (name, picture) from Google is optional - authentication works even if unavailable
- All application content is protected; only the login page is publicly accessible

## Out of Scope

- Email/password authentication (Gmail OAuth only)
- Other OAuth providers (Facebook, Apple, etc.)
- Multi-factor authentication beyond Google's built-in MFA
- User profile editing within the application
- Account deletion or data export
- Admin user management interface

## Dependencies

- Existing web application (React + Vite project at `/web`)
- AWS infrastructure from 001-aws-api-infra
- IAM permissions from 002-aws-iam-permissions (need to extend for Cognito)

## Clarifications

### Session 2026-02-01

- Q: Should sign-in be restricted to specific email domains? → A: Any Google account (no domain restriction)
- Q: How long should user sessions remain valid? → A: Until explicit logout only (no expiration)
- Q: Where should users be redirected after login? → A: Dashboard/Home page (fixed destination)
- Q: What happens when unauthenticated user accesses protected page? → A: Redirect to login page
- Q: Are there public pages accessible without login? → A: No, entire app requires login (only login page is public)
