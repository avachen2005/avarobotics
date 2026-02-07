# Feature Specification: API README Documentation

Create a comprehensive README.md for the API directory that serves as the single source of truth for developers, including test coverage, all API endpoints, and query samples.

## Table of Contents

- [User Scenarios & Testing](#user-scenarios--testing-mandatory)
- [Requirements](#requirements-mandatory)
- [Success Criteria](#success-criteria-mandatory)

---

**Feature Branch**: `009-api-readme`
**Created**: 2026-02-07
**Status**: Draft
**Input**: User description: "api/ 要有 README.md 並且要有 test coverage 還有所有 api path 跟 query sample"
**Related Issue**: [#44](https://github.com/avachen2005/avarobotics/issues/44)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View API Endpoints and Query Samples (Priority: P1) 🎯 MVP

A developer joining the team or integrating with the API opens `api/README.md` and can immediately see every available endpoint — its HTTP method, path, description, request/response format, and a ready-to-use curl command they can copy-paste to test it.

**Why this priority**: This is the core value — developers need to know what endpoints exist and how to call them without reading source code.

**Independent Test**: Open `api/README.md` and verify every currently implemented endpoint is listed with method, path, description, and a working curl example.

**Acceptance Scenarios**:

1. **Given** a developer opens `api/README.md`, **When** they look at the API endpoints section, **Then** they see a table listing every endpoint with HTTP method, path, and description
2. **Given** a developer wants to test an endpoint, **When** they find the endpoint in the README, **Then** they see a curl command example they can copy-paste and run
3. **Given** a new endpoint is added to the API, **When** the PR is reviewed, **Then** the README must also include the new endpoint's documentation

---

### User Story 2 - View Test Coverage (Priority: P2)

A developer or reviewer opens `api/README.md` and can see the current test coverage status for the API, including how to run tests and generate coverage reports locally.

**Why this priority**: Test coverage gives confidence in code quality but is secondary to knowing what the API can do.

**Independent Test**: Open `api/README.md` and verify test coverage information is present, and the documented commands to run tests and generate coverage work correctly.

**Acceptance Scenarios**:

1. **Given** a developer opens `api/README.md`, **When** they look at the testing section, **Then** they see the current test coverage percentage
2. **Given** a developer wants to run tests locally, **When** they follow the README instructions, **Then** they can run tests and generate a coverage report

---

### User Story 3 - Quick Start and Project Overview (Priority: P3)

A developer new to the project opens `api/README.md` and can quickly understand the project structure, prerequisites, and how to run the API locally.

**Why this priority**: Onboarding information is important but developers can usually figure this out from the code. Having it documented saves time.

**Independent Test**: A developer with Go installed can follow the README to start the API server locally within 2 minutes.

**Acceptance Scenarios**:

1. **Given** a developer opens `api/README.md`, **When** they look at the quick start section, **Then** they see prerequisites (Go version) and commands to build and run the server
2. **Given** a developer follows the quick start instructions, **When** they run the documented commands, **Then** the API server starts successfully on the documented port

---

### Edge Cases

- What happens when a new endpoint is added but the README is not updated? The PR review checklist should catch this.
- What happens when test coverage changes? Coverage should be re-measured and updated as part of the PR process.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: README MUST list all API endpoints in a table with HTTP method, path, and description
- **FR-002**: README MUST include a curl command example for each endpoint showing request and expected response
- **FR-003**: README MUST display the current test coverage percentage
- **FR-004**: README MUST include instructions to run tests and generate coverage reports locally
- **FR-005**: README MUST include quick start instructions: prerequisites, build command, and run command
- **FR-006**: README MUST document the default port and how to configure it via environment variable
- **FR-007**: README MUST include project directory structure overview

### Assumptions

- Test coverage is measured using Go's built-in coverage tooling
- The README documents the current state of the API at time of writing (1 endpoint: `GET /health`)
- ECR information will be added when the CodeBuild pipeline (issue #46) is implemented — a placeholder section will be included
- Developers have Go 1.22+ installed as a prerequisite

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Every implemented API endpoint is documented in the README with method, path, description, and curl example
- **SC-002**: A new developer can start the API server locally by following only the README instructions
- **SC-003**: Test coverage percentage is documented and matches actual coverage when tests are run
- **SC-004**: README is the single source of truth — no other document is needed to understand and use the API
