# Tasks: Project README Documentation

**Input**: Design documents from `/specs/007-readme-docs/`
**Prerequisites**: plan.md (required), spec.md (required), research.md

**Tests**: Not applicable - this is a documentation-only feature with manual validation.

**Organization**: Tasks are grouped by user story to enable incremental validation at each checkpoint.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Target file**: `/README.md` at repository root

---

## Phase 1: Setup

**Purpose**: Create the README.md file with basic structure

- [x] T001 Create README.md file at repository root `/README.md` with project title "Ava Robotics"

---

## Phase 2: Foundational

**Purpose**: Establish the document structure that all user stories will build upon

- [x] T002 Add document structure with section headings: Overview, Repository Structure, Directory Details, Getting Started in `/README.md`

**Checkpoint**: Document skeleton ready - content implementation can begin

---

## Phase 3: User Story 1 - New Developer Onboarding (Priority: P1) 🎯 MVP

**Goal**: Enable new developers to quickly understand project structure and locate components

**Independent Test**: A developer unfamiliar with the project can open the README and within 30 seconds identify where any specific component (API, mobile, infrastructure) is located

### Implementation for User Story 1

- [x] T003 [US1] Add project overview paragraph explaining Ava Robotics as a multi-platform robotics project in `/README.md`
- [x] T004 [US1] Add ASCII tree folder structure showing all 9 top-level directories in `/README.md`
- [x] T005 [US1] Add description for `terraform/` directory - Infrastructure as Code (AWS) in `/README.md`
- [x] T006 [US1] Add description for `k8s/` directory - Kubernetes manifests and Helm charts in `/README.md`
- [x] T007 [US1] Add description for `api/` directory - Go backend API service in `/README.md`
- [x] T008 [US1] Add description for `android/` directory - Android mobile application in `/README.md`
- [x] T009 [US1] Add description for `ios/` directory - iOS mobile application in `/README.md`
- [x] T010 [US1] Add description for `web/` directory - Web frontend application in `/README.md`
- [x] T011 [US1] Add description for `specs/` directory - Feature specifications and design docs in `/README.md`
- [x] T012 [US1] Add description for `guidelines/` directory - Project guidelines and conventions in `/README.md`
- [x] T013 [US1] Add description for `src/` directory - Shared source components in `/README.md`

**Checkpoint**: User Story 1 complete - new developers can now navigate the codebase using the README

---

## Phase 4: User Story 2 - Quick Reference for Existing Team Members (Priority: P2)

**Goal**: Provide technology stack information for each directory for quick reference

**Independent Test**: A team member can identify which technologies are used in any directory without opening subdirectory files

### Implementation for User Story 2

- [x] T014 [US2] Create Directory Details table with columns: Directory, Purpose, Technologies in `/README.md`
- [x] T015 [US2] Add technology details for infrastructure directories (terraform: Terraform/HCL, k8s: YAML/Helm) in `/README.md`
- [x] T016 [US2] Add technology details for backend (api: Go 1.22+) in `/README.md`
- [x] T017 [US2] Add technology details for mobile (android: Kotlin/Jetpack Compose, ios: Swift/SwiftUI) in `/README.md`
- [x] T018 [US2] Add technology details for frontend (web: TypeScript/React/Vite, src: TypeScript) in `/README.md`
- [x] T019 [US2] Add technology details for documentation directories (specs: Markdown, guidelines: Markdown) in `/README.md`

**Checkpoint**: User Story 2 complete - team members have complete technology reference

---

## Phase 5: User Story 3 - External Stakeholder Overview (Priority: P3)

**Goal**: Provide high-level context for non-technical stakeholders

**Independent Test**: A project manager or designer can summarize what the project does and its main components after reading the README

### Implementation for User Story 3

- [x] T020 [US3] Enhance project overview to explain business context (robotics platform with backend, mobile, and infrastructure) in `/README.md`
- [x] T021 [US3] Add "Getting Started" section with references to subdirectory CLAUDE.md files for detailed conventions in `/README.md`

**Checkpoint**: User Story 3 complete - all audiences can understand the project

---

## Phase 6: Polish & Validation

**Purpose**: Final quality checks and formatting

- [x] T022 Verify all 9 directories are documented (100% coverage per SC-002) in `/README.md`
- [x] T023 Verify each description is 1-2 sentences (conciseness per SC-003) in `/README.md`
- [x] T024 Test README rendering in GitHub preview (SC-004) for `/README.md`
- [x] T025 Final formatting cleanup: consistent spacing, aligned tables, proper code blocks in `/README.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - creates the file
- **Foundational (Phase 2)**: Depends on Setup - establishes document structure
- **User Stories (Phase 3-5)**: All depend on Foundational phase
  - User stories MUST be completed sequentially (same file)
  - Each story adds to the same document
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Foundational - Provides folder structure and basic descriptions
- **User Story 2 (P2)**: Depends on US1 completion - Adds technology details to existing descriptions
- **User Story 3 (P3)**: Depends on US2 completion - Enhances overview for stakeholders

### Within Each User Story

- Tasks T003-T013 (US1) are sequential (building same file section)
- Tasks T014-T019 (US2) are sequential (building same table)
- Tasks T020-T021 (US3) are sequential (enhancing same sections)

### Parallel Opportunities

- **None within this feature** - all tasks modify the same file
- This feature should be completed by a single implementer

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001)
2. Complete Phase 2: Foundational (T002)
3. Complete Phase 3: User Story 1 (T003-T013)
4. **STOP and VALIDATE**: New developers can navigate the codebase
5. Deploy/merge if ready - provides immediate value

### Full Feature Delivery

1. Complete MVP (User Stories 1)
2. Add User Story 2 (T014-T019) → Technology reference complete
3. Add User Story 3 (T020-T021) → Stakeholder overview complete
4. Complete Polish (T022-T025) → Quality validated
5. Final merge

---

## Summary

| Phase | Task Count | Description | Status |
|-------|------------|-------------|--------|
| Setup | 1 | Create file | ✅ Complete |
| Foundational | 1 | Document structure | ✅ Complete |
| US1 (P1) | 11 | Folder structure + descriptions | ✅ Complete |
| US2 (P2) | 6 | Technology details table | ✅ Complete |
| US3 (P3) | 2 | Stakeholder overview | ✅ Complete |
| Polish | 4 | Validation + cleanup | ✅ Complete |
| **Total** | **25** | | **✅ All Complete** |

---

## Notes

- All tasks modify `/README.md` - no parallel execution within this feature
- Manual validation required (no automated tests)
- Can stop at any checkpoint for incremental value
- Commit after each phase or logical group of tasks
