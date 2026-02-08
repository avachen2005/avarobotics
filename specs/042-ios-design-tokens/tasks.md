# Tasks: iOS Design Tokens

Implement a compile-time-safe SwiftUI design token system mirroring the web app's design language.

## Table of Contents

- [Phase 1: Setup](#phase-1-setup-shared-infrastructure)
- [Phase 2: Foundational](#phase-2-foundational-blocking-prerequisites)
- [Phase 3: User Story 1 — Brand Colors](#phase-3-user-story-1--brand-colors-priority-p1--mvp)
- [Phase 4: User Story 2 — Typography](#phase-4-user-story-2--typography-priority-p1)
- [Phase 5: User Story 3 — Spacing](#phase-5-user-story-3--spacing-priority-p2)
- [Phase 6: User Story 4 — Shapes & Shadows](#phase-6-user-story-4--shapes--shadows-priority-p2)
- [Phase 7: User Story 5 — Gradients](#phase-7-user-story-5--gradients-priority-p3)
- [Phase 8: User Story 6 — Component Tokens](#phase-8-user-story-6--component-tokens-priority-p3)
- [Phase 9: Polish](#phase-9-polish--cross-cutting-concerns)
- [Dependencies & Execution Order](#dependencies--execution-order)
- [Implementation Strategy](#implementation-strategy)

---

**Input**: Design documents from `/specs/042-ios-design-tokens/`
**Prerequisites**: plan.md (required), spec.md (required), data-model.md, research.md, quickstart.md

**Tests**: Tests are included — the spec requires XCTest unit tests to validate token values match web hex/pt values (SC-001, SC-002).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the DesignSystem directory structure and shared utilities

- [ ] T001 Create DesignSystem directory structure: `ios/AvaRobotics/DesignSystem/Tokens/`, `ios/AvaRobotics/DesignSystem/Components/`, `ios/AvaRobotics/DesignSystem/Extensions/`, and test directory `ios/AvaRoboticsTests/DesignSystem/`
- [ ] T002 Implement Color hex initializer extension in `ios/AvaRobotics/DesignSystem/Extensions/Color+Hex.swift` — `Color.init(hex: String)` that parses 6-digit and 8-digit hex strings (with or without `#` prefix) into SwiftUI Color using sRGB color space
- [ ] T003 Create View extension file with `.typography()` and `.tokenShadow()` convenience methods (stubs) in `ios/AvaRobotics/DesignSystem/Extensions/View+DesignSystem.swift`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Opacity tokens are used by shadows and component tokens — must be available first

**⚠️ CRITICAL**: OpacityToken is referenced by ShadowToken and Component styles

- [ ] T004 Implement OpacityToken enum with static Double properties (opacity5 through opacity100 matching web scale: 0.05, 0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 1.00) in `ios/AvaRobotics/DesignSystem/Tokens/OpacityToken.swift`

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 — Brand Colors (Priority: P1) 🎯 MVP

**Goal**: Define all color palettes (primary, accent, secondary, neutral, semantic, status) with every shade matching web hex values exactly

**Independent Test**: Create unit tests that resolve each Color to UIColor, extract RGBA components, convert to hex string, and assert against spec values

### Tests for User Story 1

- [ ] T005 [P] [US1] Write ColorTokenTests in `ios/AvaRoboticsTests/DesignSystem/ColorTokenTests.swift` — test every color in Primary (10 shades: p50–p900), Accent (8 shades: a50–a700), Secondary (7 shades: s50–s600), Neutral (10 shades: n50–n900), Semantic (white, black), and Status (success, warning, error, info) by resolving `Color` → `UIColor` → RGBA → hex string and asserting against data-model.md hex values. Include a `hexString(from: Color) -> String` test helper.

### Implementation for User Story 1

- [ ] T006 [US1] Implement ColorToken enum with nested enums for each palette in `ios/AvaRobotics/DesignSystem/Tokens/ColorToken.swift`:
  - `ColorToken.Primary` with static Color properties: p50 (#f5f3ff), p100 (#ede9fe), p200 (#ddd6fe), p300 (#c4b5fd), p400 (#a78bfa), p500 (#8b5cf6), p600 (#7c3aed), p700 (#6d28d9), p800 (#5b21b6), p900 (#4c1d95)
  - `ColorToken.Accent` with static Color properties: a50 (#fdf4ff), a100 (#fae8ff), a200 (#f5d0fe), a300 (#f0abfc), a400 (#e879f9), a500 (#d946ef), a600 (#c026d3), a700 (#a21caf)
  - `ColorToken.Secondary` with static Color properties: s50 (#ecfeff), s100 (#cffafe), s200 (#a5f3fc), s300 (#67e8f9), s400 (#22d3ee), s500 (#06b6d4), s600 (#0891b2)
  - `ColorToken.Neutral` with static Color properties: n50 (#f8fafc), n100 (#f1f5f9), n200 (#e2e8f0), n300 (#cbd5e1), n400 (#94a3b8), n500 (#64748b), n600 (#475569), n700 (#334155), n800 (#1e293b), n900 (#0f172a)
  - `ColorToken.Semantic` with static Color properties: white (#ffffff), black (#000000)
  - `ColorToken.Status` with static Color properties: success (#22c55e), warning (#f59e0b), error (#ef4444), info (#3b82f6)
  - All colors use `Color(hex:)` initializer from T002

**Checkpoint**: Color tokens complete — all 41 color values match web spec, verified by unit tests

---

## Phase 4: User Story 2 — Typography (Priority: P1)

**Goal**: Define 18 typography presets with font size, weight, line spacing, tracking, and Dynamic Type support via `@ScaledMetric`

**Independent Test**: Unit test verifying each preset's size, weight mapping, lineSpacing, tracking, and relativeTo values

### Tests for User Story 2

- [ ] T007 [P] [US2] Write TypographyTokenTests in `ios/AvaRoboticsTests/DesignSystem/TypographyTokenTests.swift` — test all 18 presets (display1, display2, heading1–3, bodyLarge, bodyRegular, bodyMedium, bodySemibold, bodySmall, bodySmallMedium, caption, captionMedium, buttonLarge, buttonMedium, buttonSmall, label, input) verifying: size matches data-model.md pt value, weight matches specified weight, lineSpacing matches specified value, tracking matches specified value, relativeTo maps to correct Font.TextStyle. Also test that sizes are descending within categories (display > heading > body > caption).

### Implementation for User Story 2

- [ ] T008 [US2] Implement TypographyToken enum with cases for all 18 presets in `ios/AvaRobotics/DesignSystem/Tokens/TypographyToken.swift`:
  - Enum cases: display1, display2, heading1, heading2, heading3, bodyLarge, bodyRegular, bodyMedium, bodySemibold, bodySmall, bodySmallMedium, caption, captionMedium, buttonLarge, buttonMedium, buttonSmall, label, input
  - Computed properties: `size` (CGFloat), `weight` (Font.Weight), `lineSpacing` (CGFloat), `tracking` (CGFloat), `relativeTo` (Font.TextStyle) — values per data-model.md typography table
  - Computed `font` property returning `Font.system(size:weight:design:)` with `.default` design
- [ ] T009 [US2] Implement TypographyModifier ViewModifier in `ios/AvaRobotics/DesignSystem/Tokens/TypographyToken.swift` (same file, below the enum):
  - Uses `@ScaledMetric(wrappedValue:relativeTo:)` initialized from `token.size` and `token.relativeTo`
  - Applies `.font(.system(size: scaledSize, weight: token.weight, design: .default))`, `.lineSpacing(token.lineSpacing)`, `.tracking(token.tracking)`
- [ ] T010 [US2] Update View+DesignSystem extension in `ios/AvaRobotics/DesignSystem/Extensions/View+DesignSystem.swift` — replace `.typography()` stub with real implementation: `func typography(_ token: TypographyToken) -> some View` that applies `TypographyModifier(token)`

**Checkpoint**: Typography tokens complete — all 18 presets match web spec, Dynamic Type scales proportionally

---

## Phase 5: User Story 3 — Spacing (Priority: P2)

**Goal**: Define 7-level spacing scale (xs through xxxl) matching web values

**Independent Test**: Unit test asserting each spacing token's CGFloat value

### Tests for User Story 3

- [ ] T011 [P] [US3] Write SpacingTokenTests in `ios/AvaRoboticsTests/DesignSystem/SpacingTokenTests.swift` — test all 7 values: xs==4, sm==8, md==16, lg==24, xl==32, xxl==48, xxxl==64. Also test monotonically increasing order.

### Implementation for User Story 3

- [ ] T012 [US3] Implement SpacingToken enum with static CGFloat properties in `ios/AvaRobotics/DesignSystem/Tokens/SpacingToken.swift`: xs=4, sm=8, md=16, lg=24, xl=32, xxl=48, xxxl=64

**Checkpoint**: Spacing tokens complete — all 7 values match web spec

---

## Phase 6: User Story 4 — Shapes & Shadows (Priority: P2)

**Goal**: Define border radius tokens (8 levels), border width tokens (2 levels), shadow tokens (5 standard + 3 glow effects)

**Independent Test**: Unit tests asserting corner radius values, border width values, shadow radius/offset/color configurations

### Tests for User Story 4

- [ ] T013 [P] [US4] Write ShapeTokenTests in `ios/AvaRoboticsTests/DesignSystem/ShapeTokenTests.swift` — test CornerRadius values: none==0, sm==6, md==8, lg==12, xl==16, xxl==24, xxxl==28, full==9999. Test BorderWidth values: thin==1, regular==2. Test monotonically increasing for corner radius scale.
- [ ] T014 [P] [US4] Write ShadowTokenTests in `ios/AvaRoboticsTests/DesignSystem/ShadowTokenTests.swift` — test all 5 standard shadows (sm, md, lg, xl, xxl) for correct x, y, blur radius, and color opacity values per data-model.md. Test all 3 glow effects (glowPurple, glowPink, glowCyan) for blur==30, x==0, y==0, and correct color/opacity. Test shadow radius is monotonically increasing across sm→md→lg→xl→xxl.

### Implementation for User Story 4

- [ ] T015 [P] [US4] Implement ShapeToken enum with nested enums in `ios/AvaRobotics/DesignSystem/Tokens/ShapeToken.swift`:
  - `ShapeToken.CornerRadius` with static CGFloat properties: none=0, sm=6, md=8, lg=12, xl=16, xxl=24, xxxl=28, full=9999
  - `ShapeToken.BorderWidth` with static CGFloat properties: thin=1, regular=2
- [ ] T016 [US4] Implement ShadowToken enum with cases and computed properties in `ios/AvaRobotics/DesignSystem/Tokens/ShadowToken.swift`:
  - Cases: sm, md, lg, xl, xxl, glowPurple, glowPink, glowCyan
  - Computed properties: `radius` (CGFloat), `x` (CGFloat), `y` (CGFloat), `color` (Color) — values per data-model.md shadow tables
  - Implement ShadowModifier ViewModifier that applies `content.shadow(color:radius:x:y:)`
- [ ] T017 [US4] Update View+DesignSystem extension in `ios/AvaRobotics/DesignSystem/Extensions/View+DesignSystem.swift` — replace `.tokenShadow()` stub with real implementation: `func tokenShadow(_ token: ShadowToken) -> some View` that applies `ShadowModifier(token:)`

**Checkpoint**: Shape and shadow tokens complete — all border radii, shadows, and glow effects match web spec

---

## Phase 7: User Story 5 — Gradients (Priority: P3)

**Goal**: Define 6 gradient presets as LinearGradient values matching web gradient definitions

**Independent Test**: Unit tests verifying gradient color stops match spec hex values

### Tests for User Story 5

- [ ] T018 [P] [US5] Write GradientTokenTests in `ios/AvaRoboticsTests/DesignSystem/GradientTokenTests.swift` — test all 6 gradients (primary, accent, secondary, neon, tech, background) by verifying the `stops` property returns 3 Color values matching the data-model.md hex values for each gradient. Use the same `hexString(from:)` helper pattern as ColorTokenTests.

### Implementation for User Story 5

- [ ] T019 [US5] Implement GradientToken enum with static LinearGradient properties in `ios/AvaRobotics/DesignSystem/Tokens/GradientToken.swift`:
  - Static properties: primary, accent, secondary, neon, tech, background
  - Each returns a `LinearGradient` with `startPoint: .topLeading, endPoint: .bottomTrailing` and 3 color stops per data-model.md gradient table
  - Also expose a `stops` computed property returning `[Color]` for testability
  - Color stops reference `ColorToken` values where possible, or use `Color(hex:)` for stops not in the palette

**Checkpoint**: Gradient tokens complete — all 6 gradients match web spec direction and color stops

---

## Phase 8: User Story 6 — Component Tokens (Priority: P3)

**Goal**: Implement button styles (primary, secondary, outline), card modifier, and text field style composing primitive tokens

**Independent Test**: Verify component styles compile and compose correct primitive token references

**Prerequisites**: Requires US1 (colors), US2 (typography), US3 (spacing), US4 (shapes/shadows), US5 (gradients)

### Implementation for User Story 6

- [ ] T020 [US6] Implement ButtonStyles in `ios/AvaRobotics/DesignSystem/Components/ButtonStyles.swift`:
  - `BrandPrimaryButtonStyle: ButtonStyle` — primary gradient background, white text, buttonMedium typography, full corner radius, md shadow, lg horizontal / md vertical padding. Pressed state reduces opacity to 0.8.
  - `BrandSecondaryButtonStyle: ButtonStyle` — accent gradient background, same text/radius/shadow/padding as primary
  - `BrandOutlineButtonStyle: ButtonStyle` — transparent background, 2pt primary-500 border, primary-500 text, buttonMedium typography, full corner radius, lg horizontal / md vertical padding. Pressed state reduces opacity to 0.6.
  - Convenience extensions on `ButtonStyle`: `static var brandPrimary`, `static var brandSecondary`, `static var brandOutline`
- [ ] T021 [P] [US6] Implement CardModifier in `ios/AvaRobotics/DesignSystem/Components/CardModifier.swift`:
  - `CardPadding` enum with cases: small (SpacingToken.md), medium (SpacingToken.lg), large (SpacingToken.xl)
  - `CardModifier: ViewModifier` — white background, xxl corner radius (24pt), lg shadow, configurable padding (default: medium)
  - View extension: `func cardStyle(padding: CardPadding = .medium) -> some View`
- [ ] T022 [P] [US6] Implement BrandedTextFieldStyle in `ios/AvaRobotics/DesignSystem/Components/TextFieldStyles.swift`:
  - `BrandedTextFieldStyle: TextFieldStyle` — input typography, 12pt vertical / md horizontal padding, lg corner radius (12pt), regular border width (2pt), neutral-200 default border, primary-500 focus border (using `@FocusState`), error state support via environment or parameter
  - Convenience extension: `static var branded`

**Checkpoint**: Component tokens complete — buttons, cards, and text fields compose primitive tokens correctly

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Verify cross-story integration, compile-time safety, and documentation

- [ ] T023 Verify compile-time safety by attempting to reference a non-existent token (e.g., `ColorToken.Primary.p999`) and confirming it produces a compile error — document verification in a comment on the implementation issue
- [ ] T024 Verify Dynamic Type support by changing the iOS Simulator's text size setting (Settings → Accessibility → Display & Text Size → Larger Text) and confirming typography tokens scale proportionally — document verification in a comment on the implementation issue
- [ ] T025 Run all unit tests (ColorTokenTests, TypographyTokenTests, SpacingTokenTests, ShapeTokenTests, ShadowTokenTests, GradientTokenTests) and confirm 100% pass rate — document test results in a comment on the implementation issue

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup (T001–T003) completion
- **US1 Colors (Phase 3)**: Depends on Phase 1 (needs Color+Hex.swift from T002)
- **US2 Typography (Phase 4)**: Depends on Phase 1 (needs View+DesignSystem.swift from T003)
- **US3 Spacing (Phase 5)**: Depends on Phase 1 only
- **US4 Shapes & Shadows (Phase 6)**: Depends on Phase 1 (needs View+DesignSystem.swift from T003) and Phase 2 (OpacityToken for shadow colors)
- **US5 Gradients (Phase 7)**: Depends on Phase 3 (references ColorToken values)
- **US6 Components (Phase 8)**: Depends on US1, US2, US3, US4, US5 (composes all primitive tokens)
- **Polish (Phase 9)**: Depends on all user stories being complete

### User Story Dependencies

```text
Phase 1 (Setup)
    ↓
Phase 2 (Foundational: OpacityToken)
    ↓
┌───────────────────────────────────────────┐
│  US1 (Colors) ──→ US5 (Gradients)        │  US2 (Typography)
│                                           │
│  US3 (Spacing)   US4 (Shapes & Shadows)  │
└───────────────────────────────────────────┘
         ↓              ↓              ↓
         └──── US6 (Components) ──────┘
                        ↓
                  Phase 9 (Polish)
```

- US1, US2, US3 can run in **parallel** after Phase 2
- US4 can run in **parallel** with US1, US2, US3 (after Phase 2)
- US5 depends on US1 (color references)
- US6 depends on all other user stories (US1–US5)

### Parallel Opportunities

Within each story, test tasks marked [P] can run in parallel with each other. Implementation tasks within different stories can run in parallel when they have no dependency.

**Maximum parallelism** (after Phase 2):
- Stream A: US1 (Colors) → US5 (Gradients)
- Stream B: US2 (Typography)
- Stream C: US3 (Spacing) + US4 (Shapes & Shadows)
- Then: US6 (Components) after all streams complete

---

## Parallel Example: After Phase 2

```text
# These can all start simultaneously:
Stream A: T005 (ColorTokenTests) + T006 (ColorToken.swift)
Stream B: T007 (TypographyTokenTests) + T008-T010 (TypographyToken)
Stream C: T011 (SpacingTokenTests) + T012 (SpacingToken.swift)
Stream D: T013-T014 (Shape/ShadowTests) + T015-T017 (Shape/Shadow impl)

# After Stream A completes:
Stream A continues: T018 (GradientTokenTests) + T019 (GradientToken.swift)

# After all streams complete:
T020-T022 (Component tokens)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T003)
2. Complete Phase 2: Foundational (T004)
3. Complete Phase 3: User Story 1 — Colors (T005–T006)
4. **STOP and VALIDATE**: Run ColorTokenTests, verify all 41 colors match web hex values
5. Deploy/demo: developers can start using `ColorToken.Primary.p500` etc.

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (Colors) → Test → **MVP!** Developers have color tokens
3. Add US2 (Typography) → Test → Developers have `.typography()` modifier
4. Add US3 (Spacing) + US4 (Shapes) → Test → Full layout token set
5. Add US5 (Gradients) → Test → Gradient backgrounds available
6. Add US6 (Components) → Test → `.buttonStyle(.brandPrimary)`, `.cardStyle()` available
7. Polish → Full validation and documentation

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All color hex values come from `figma-design-tokens.json` / `DESIGN_SPEC.md` (authoritative sources)
- px values from web map 1:1 to pt values on iOS
