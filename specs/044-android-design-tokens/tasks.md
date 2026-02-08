# Tasks: Android Design Token System

Implement a Kotlin/Compose design token system mirroring the web's `figma-design-tokens.json`, organized as MaterialTheme extensions with CompositionLocal custom tokens.

## Table of Contents

- [Phase 1: Setup](#phase-1-setup-shared-infrastructure)
- [Phase 2: Foundational](#phase-2-foundational-blocking-prerequisites)
- [Phase 3: User Story 1 - Color Tokens](#phase-3-user-story-1---color-tokens-priority-p1--mvp)
- [Phase 4: User Story 2 - Typography](#phase-4-user-story-2---typography-priority-p1)
- [Phase 5: User Story 3 - Spacing and Shapes](#phase-5-user-story-3---spacing-and-shapes-priority-p2)
- [Phase 6: User Story 4 - Shadows and Elevation](#phase-6-user-story-4---shadows-and-elevation-priority-p2)
- [Phase 7: User Story 5 - Gradients](#phase-7-user-story-5---gradients-priority-p3)
- [Phase 8: User Story 6 - Debug Catalog](#phase-8-user-story-6---debug-catalog-priority-p3)
- [Phase 9: Polish](#phase-9-polish--cross-cutting-concerns)
- [Dependencies & Execution Order](#dependencies--execution-order)
- [Implementation Strategy](#implementation-strategy)

---

**Input**: Design documents from `/specs/044-android-design-tokens/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: Not explicitly requested in the feature specification. Test tasks are omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Bootstrap the Android Gradle project and create the directory structure

- [x] T001 Create Android project Gradle wrapper, `android/settings.gradle.kts` with project name `avarobotics`, and `android/gradle.properties` with Compose compiler and AndroidX flags
- [x] T002 Create version catalog `android/gradle/libs.versions.toml` with Kotlin 1.9+, Compose BOM 2025.08.00+, Material 3, Hilt, JUnit, and ktlint versions
- [x] T003 Create project-level `android/build.gradle.kts` with Kotlin, Compose, and Hilt plugins configured from version catalog
- [x] T004 Create app-level `android/app/build.gradle.kts` with minSdk 28, targetSdk 35, Compose enabled, build types (debug/release), and all dependencies from version catalog
- [x] T005 Create `android/app/src/main/AndroidManifest.xml` with `com.avarobotics` package and minimal application entry
- [x] T006 Create directory structure for `android/app/src/main/java/com/avarobotics/ui/theme/`, `android/app/src/debug/java/com/avarobotics/ui/catalog/sections/`, and `android/app/src/release/java/com/avarobotics/ui/catalog/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create the AppTheme composable and theme object that all user stories will extend

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Create `android/app/src/main/java/com/avarobotics/ui/theme/Theme.kt` with initial `AppTheme` composable wrapping `MaterialTheme` and an `AppTheme` object exposing `colors`, `typography`, `spacing`, and `shapes` via `@Composable` getters using CompositionLocal. Start with placeholder `staticCompositionLocalOf` declarations for `LocalExtendedColors`, `LocalSpacing`, `LocalAppShapes`, and `LocalElevations` with empty defaults. Each will be populated in its user story phase.

**Checkpoint**: Foundation ready - AppTheme shell exists, user story implementation can begin

---

## Phase 3: User Story 1 - Color Tokens (Priority: P1) MVP

**Goal**: Provide all raw palette colors and semantic color aliases matching `figma-design-tokens.json`

**Independent Test**: Create a Compose preview rendering all color swatches; visually compare against web palette

### Implementation for User Story 1

- [x] T008 [P] [US1] Create `android/app/src/main/java/com/avarobotics/ui/theme/Color.kt` with all raw palette colors as `Color` constants: Primary50-900 (10), Accent50-700 (8), Secondary50-600 (7), Neutral50-900 (10), White, Black, Error. Total 38 colors. Each value must exactly match the hex from `figma-design-tokens.json` (see data-model.md Color Palette section).
- [x] T009 [P] [US1] Create `android/app/src/main/java/com/avarobotics/ui/theme/Opacity.kt` with an `AppOpacity` object containing 12 `Float` constants (Opacity0=0.0f through Opacity100=1.0f) matching data-model.md Opacity Tokens section.
- [x] T010 [US1] Create `android/app/src/main/java/com/avarobotics/ui/theme/ExtendedColors.kt` with: (a) `@Immutable data class ExtendedColors` containing 18 semantic color properties (background, onBackground, surface, onSurface, surfaceVariant, onSurfaceVariant, primary, onPrimary, primaryContainer, onPrimaryContainer, secondary, onSecondary, accent, onAccent, outline, outlineVariant, error, onError) all typed as `Color`; (b) a `LightExtendedColors` instance mapping each semantic name to its raw palette value per data-model.md Semantic Colors table; (c) `LocalExtendedColors = staticCompositionLocalOf { LightExtendedColors }`.
- [x] T011 [US1] Update `android/app/src/main/java/com/avarobotics/ui/theme/Theme.kt` to provide `LocalExtendedColors` via `CompositionLocalProvider` inside `AppTheme`, and expose `AppTheme.colors` returning `LocalExtendedColors.current`. Also configure `MaterialTheme` `colorScheme` to use `lightColorScheme()` with primary=Primary500, secondary=Secondary400, error=Error, background=Neutral50, surface=White, and their `on` counterparts.

**Checkpoint**: All 38 palette colors + 18 semantic aliases available. Developers can use `AppColors.Primary500` or `AppTheme.colors.background`.

---

## Phase 4: User Story 2 - Typography (Priority: P1)

**Goal**: Provide all 18 typography presets as Compose `TextStyle` definitions

**Independent Test**: Render a typography specimen screen showing all 18 presets; verify sizes/weights match data-model.md

### Implementation for User Story 2

- [x] T012 [US2] Create `android/app/src/main/java/com/avarobotics/ui/theme/Type.kt` with: (a) `@Immutable data class AppTypographyTokens` containing 18 `TextStyle` properties (display1, display2, heading1-3, bodyLarge, bodyRegular, bodyMedium, bodySemibold, bodySmall, bodySmallMedium, caption, captionMedium, buttonLarge, buttonMedium, buttonSmall, label, input); (b) a default instance using `fontFamily = FontFamily.Default` (Roboto on Android), with each preset's fontSize (sp), fontWeight, lineHeight (multiplier × fontSize), and letterSpacing (sp) matching data-model.md Typography Presets table exactly; (c) `LocalAppTypography = staticCompositionLocalOf { AppTypographyTokens(...) }`.
- [x] T013 [US2] Update `android/app/src/main/java/com/avarobotics/ui/theme/Theme.kt` to provide `LocalAppTypography` via `CompositionLocalProvider` inside `AppTheme`, and expose `AppTheme.typography` returning `LocalAppTypography.current`. Also map the relevant presets to Material's `Typography` object (displayLarge=display1, headlineLarge=heading1, bodyLarge=bodyRegular, labelLarge=buttonMedium, etc.) for Material component compatibility.

**Checkpoint**: All 18 typography presets available via `AppTheme.typography.heading1`, `AppTheme.typography.bodyRegular`, etc.

---

## Phase 5: User Story 3 - Spacing and Shapes (Priority: P2)

**Goal**: Provide the 7-step spacing scale and 8 border radius tokens

**Independent Test**: Build a sample card using spacing and shape tokens; verify dimensions match web equivalents

### Implementation for User Story 3

- [x] T014 [P] [US3] Create `android/app/src/main/java/com/avarobotics/ui/theme/Spacing.kt` with: (a) `@Immutable data class SpacingTokens` containing 7 `Dp` properties (xs=4.dp, sm=8.dp, md=16.dp, lg=24.dp, xl=32.dp, xxl=48.dp, xxxl=64.dp); (b) a default instance; (c) `LocalSpacing = staticCompositionLocalOf { SpacingTokens() }`.
- [x] T015 [P] [US3] Create `android/app/src/main/java/com/avarobotics/ui/theme/Shape.kt` with: (a) `@Immutable data class AppShapeTokens` containing 8 `Dp` properties (none=0.dp, small=6.dp, medium=8.dp, large=12.dp, extraLarge=16.dp, xxl=24.dp, xxxl=28.dp, full=50 percent represented as a special value or `CircleShape` reference); (b) a default instance; (c) `LocalAppShapes = staticCompositionLocalOf { AppShapeTokens() }`. Also configure Material's `Shapes` object mapping to extraSmall=small, small=medium, medium=large, large=extraLarge, extraLarge=xxl.
- [x] T016 [US3] Update `android/app/src/main/java/com/avarobotics/ui/theme/Theme.kt` to provide `LocalSpacing` and `LocalAppShapes` via `CompositionLocalProvider`, and expose `AppTheme.spacing` and `AppTheme.shapes` returning their respective `.current` values. Pass the Material `Shapes` to `MaterialTheme(shapes = ...)`.

**Checkpoint**: Spacing and shapes available via `AppTheme.spacing.md` (16.dp) and `AppTheme.shapes.xxl` (24.dp).

---

## Phase 6: User Story 4 - Shadows and Elevation (Priority: P2)

**Goal**: Provide 5 standard shadow levels and 3 glow effect tokens compatible with `Modifier.dropShadow()`

**Independent Test**: Render cards at each elevation level and glow effect; compare against web shadows

### Implementation for User Story 4

- [x] T017 [US4] Create `android/app/src/main/java/com/avarobotics/ui/theme/Elevation.kt` with: (a) an `AppElevation` object containing shadow token definitions for sm, md, lg, xl, xxl (using `Shadow` class with offset `DpOffset`, radius `Dp`, spread `Dp`, and color with alpha per data-model.md Shadow Tokens table); (b) glow effect tokens glowPurple, glowPink, glowCyan (blur=30.dp, spread=0.dp, offset=zero, color with 50% alpha per data-model.md Glow Effects table); (c) `LocalElevations` if theme-switching is needed, or expose directly as object properties since these don't vary by theme.
- [x] T018 [US4] Update `android/app/src/main/java/com/avarobotics/ui/theme/Theme.kt` to provide elevation tokens if using CompositionLocal, or ensure `AppElevation` is accessible as a top-level object alongside the theme.

**Checkpoint**: Shadow and glow tokens available via `AppElevation.lg` and `AppElevation.glowPurple` for use with `Modifier.dropShadow()`.

---

## Phase 7: User Story 5 - Gradients (Priority: P3)

**Goal**: Provide 4 gradient `Brush` presets matching web gradient specifications

**Independent Test**: Render buttons with each gradient; compare color stops and angle against web screenshots

### Implementation for User Story 5

- [x] T019 [US5] Create `android/app/src/main/java/com/avarobotics/ui/theme/Gradient.kt` with an `AppGradients` object containing 4 `Brush` properties: (a) `primary` = `Brush.linearGradient` from Primary500 (0%) → Primary700 (50%) → Primary800 (100%) at 135 degrees; (b) `accent` = Accent400 → Accent500 → Accent600; (c) `secondary` = Secondary400 → Secondary500 → Secondary600; (d) `neon` = Primary500 → Accent500 → Secondary400. Use `start = Offset.Zero` and `end = Offset(Float.POSITIVE_INFINITY, Float.POSITIVE_INFINITY)` for 135-degree angle, with explicit `colorStops` at 0f, 0.5f, and 1f per data-model.md Gradient Tokens table.

**Checkpoint**: Gradients available via `AppGradients.primary` for use with `Modifier.background(brush = ...)`.

---

## Phase 8: User Story 6 - Debug Catalog (Priority: P3)

**Goal**: Provide a debug-only catalog screen displaying all design tokens, excluded from release builds

**Independent Test**: Launch debug build, navigate to catalog, verify all token categories displayed. Verify release build excludes catalog code.

### Implementation for User Story 6

- [x] T020 [US6] Create `android/app/src/main/java/com/avarobotics/ui/theme/ComponentTokens.kt` with an `AppComponentTokens` object containing: (a) `Button` sub-object with padding sizes (small 8×16.dp, medium 16×24.dp, large 12×32.dp), radiusFull, outline border width (2.dp) and color (Primary500); (b) `Card` sub-object with padding sizes (small 16.dp, medium 24.dp, large 32.dp), radius (24.dp/xxl), background (White), shadow (lg); (c) `Input` sub-object with padding (12×16.dp), radius (12.dp/large), borderWidth (2.dp), borderDefault (Neutral200), borderFocus (Primary500), borderError (Error). All values per data-model.md Component Tokens section.
- [x] T021 [P] [US6] Create `android/app/src/debug/java/com/avarobotics/ui/catalog/sections/ColorSection.kt` composable displaying all color palettes (primary, accent, secondary, neutral, basic) as labeled swatches in a grid, showing hex values alongside each color.
- [x] T022 [P] [US6] Create `android/app/src/debug/java/com/avarobotics/ui/catalog/sections/TypographySection.kt` composable rendering all 18 typography presets as sample text with preset name and size labels.
- [x] T023 [P] [US6] Create `android/app/src/debug/java/com/avarobotics/ui/catalog/sections/SpacingSection.kt` composable visualizing the 7 spacing values as labeled bars of proportional width.
- [x] T024 [P] [US6] Create `android/app/src/debug/java/com/avarobotics/ui/catalog/sections/ShapeSection.kt` composable showing sample boxes at each of the 8 border radius values with labels.
- [x] T025 [P] [US6] Create `android/app/src/debug/java/com/avarobotics/ui/catalog/sections/ShadowSection.kt` composable rendering cards at each of the 5 shadow levels plus 3 glow effects with labels.
- [x] T026 [P] [US6] Create `android/app/src/debug/java/com/avarobotics/ui/catalog/sections/GradientSection.kt` composable rendering the 4 gradient presets on sample surfaces with labels.
- [x] T027 [US6] Create `android/app/src/debug/java/com/avarobotics/ui/catalog/DesignTokenCatalog.kt` composable as a scrollable screen that composes all section composables (ColorSection, TypographySection, SpacingSection, ShapeSection, ShadowSection, GradientSection) with section headers and dividers. Include component token examples (button variants, card, input) using values from `AppComponentTokens`.
- [x] T028 [US6] Create `android/app/src/release/java/com/avarobotics/ui/catalog/DesignTokenCatalog.kt` as a no-op stub (empty composable or marker interface) ensuring the catalog is excluded from release builds.

**Checkpoint**: Debug catalog screen renders all token categories. Release builds exclude catalog code entirely.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and cleanup across all stories

- [x] T029 Verify all 38 palette color hex values in `Color.kt` match `figma-design-tokens.json` exactly by cross-referencing each value
- [x] T030 Verify all 18 typography preset values in `Type.kt` match `figma-design-tokens.json` exactly (font sizes, weights, line heights, letter spacing)
- [x] T031 Run quickstart.md examples mentally against the implemented API to confirm all code snippets are valid and match the actual object/property names
- [x] T032 Ensure the project compiles successfully with `./gradlew assembleDebug` from `android/` directory

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion - BLOCKS all user stories
- **US1 Colors (Phase 3)**: Depends on Phase 2. BLOCKS US6 (catalog needs colors)
- **US2 Typography (Phase 4)**: Depends on Phase 2. Can run in parallel with US1
- **US3 Spacing/Shapes (Phase 5)**: Depends on Phase 2. Can run in parallel with US1, US2
- **US4 Shadows (Phase 6)**: Depends on Phase 2. Can run in parallel with US1-US3
- **US5 Gradients (Phase 7)**: Depends on US1 (references color constants). Can run in parallel with US2-US4
- **US6 Catalog (Phase 8)**: Depends on US1-US5 (displays all tokens). Must be last user story phase
- **Polish (Phase 9)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (Colors)**: After Phase 2 only. No other story dependencies.
- **US2 (Typography)**: After Phase 2 only. No other story dependencies.
- **US3 (Spacing/Shapes)**: After Phase 2 only. No other story dependencies.
- **US4 (Shadows)**: After Phase 2 only. No other story dependencies.
- **US5 (Gradients)**: After US1 (references `AppColors` constants for gradient stops).
- **US6 (Catalog)**: After US1-US5 (catalog displays all token categories).

### Within Each User Story

- Token definition files before Theme.kt updates
- Theme.kt integration after token files are complete
- Files marked [P] within a story can be created in parallel

### Parallel Opportunities

- **Phase 1**: T001-T006 are sequential (Gradle project must build in order)
- **Phase 3-6**: US1, US2, US3, US4 can all run in parallel after Phase 2
- **Phase 7**: US5 can run in parallel with US2-US4 (but needs US1 complete)
- **Phase 8**: T021-T026 catalog sections can all run in parallel
- **Within US1**: T008 and T009 can run in parallel (different files)
- **Within US3**: T014 and T015 can run in parallel (different files)

---

## Parallel Example: User Stories 1-4 After Foundational

```text
# After Phase 2 (Foundational) completes, launch all four in parallel:

Stream 1 (US1 - Colors):
  T008 → T009 → T010 → T011

Stream 2 (US2 - Typography):
  T012 → T013

Stream 3 (US3 - Spacing/Shapes):
  T014 + T015 (parallel) → T016

Stream 4 (US4 - Shadows):
  T017 → T018
```

## Parallel Example: Catalog Sections (US6)

```text
# After all token stories complete, launch catalog sections in parallel:

T020 (ComponentTokens) first, then:
  T021 (ColorSection)
  T022 (TypographySection)
  T023 (SpacingSection)
  T024 (ShapeSection)
  T025 (ShadowSection)
  T026 (GradientSection)
All parallel → T027 (main catalog) → T028 (release stub)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T006)
2. Complete Phase 2: Foundational (T007)
3. Complete Phase 3: US1 Colors (T008-T011)
4. **STOP and VALIDATE**: All 38 colors + 18 semantic aliases available and compile
5. Developers can start building screens with correct brand colors

### Incremental Delivery

1. Setup + Foundational → Compose project builds
2. US1 (Colors) → Brand colors available (MVP!)
3. US2 (Typography) → Text styles available
4. US3 (Spacing/Shapes) → Layout tokens available
5. US4 (Shadows) → Elevation effects available
6. US5 (Gradients) → Gradient brushes available
7. US6 (Catalog) → Visual reference for all tokens
8. Each story adds value independently without breaking previous stories

### Parallel Team Strategy

With multiple developers after Phase 2:
- Developer A: US1 (Colors) → US5 (Gradients, needs colors)
- Developer B: US2 (Typography) + US3 (Spacing/Shapes)
- Developer C: US4 (Shadows) → US6 (Catalog, needs all tokens)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All hex values must exactly match `figma-design-tokens.json` - cross-reference during implementation
- The `android/` project must be bootstrapped from scratch (no existing Gradle config)
