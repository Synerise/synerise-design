# Design Token Integration Plan — Section-Message Pilot

## Context

The design system currently defines colors in Less files (`core/src/style/colors.less`), converts them to a JS palette object at build time, and components consume them via `theme.palette['green-050']` in styled-components. There is no semantic token layer — components hardcode the mapping from variant to primitive color (e.g., `positive → green-050`).

Token Studio now maintains a comprehensive token set (primitives, semantic, component-level) in a [separate repository](https://github.com/piotrzarebski2/design-tokens/tree/main/tokens). We need to ingest these tokens and make them available as **CSS custom properties** throughout the DS. Section-message is the pilot component.

---

## Phase 0: Token Infrastructure (`ds-tokens` package)

### 0.1 Create `packages/tokens/` package

```
packages/tokens/
├── package.json                    # @synerise/ds-tokens
├── tokens/                         # Copied from Token Studio repo
│   ├── primitives/core.json
│   ├── semantic/Light.json
│   ├── semantic/Dark.json
│   ├── semantic/custom-color/*.json
│   ├── modules/base.json
│   ├── surface/base.json
│   ├── $metadata.json
│   └── $themes.json
├── config/
│   └── style-dictionary.config.ts  # Style Dictionary v4 configuration
├── src/
│   └── index.ts                    # Re-exports generated types
├── dist/
│   ├── css/
│   │   ├── primitives.css          # --ds-color-blue-600: #0b68ff
│   │   ├── semantic-light.css      # --ds-color-bg-success-subtle: var(--ds-color-green-050)
│   │   ├── semantic-dark.css       # --ds-color-bg-success-subtle: var(--ds-color-dark-green-900)
│   │   ├── modules.css             # --ds-section-message-success-bg: var(--ds-color-bg-success-subtle)
│   │   └── surfaces.css            # --ds-surface-raised-bg: ...
│   └── ts/
│       ├── tokens.ts               # Flat map of all token names (for type safety)
│       └── types.ts                # Union type of all valid CSS var names
└── scripts/
    └── sync-tokens.sh              # Fetches latest JSON from Token Studio repo
```

### 0.2 Style Dictionary v4 configuration

- **Input**: Token Studio JSON files in `tokens/`
- **Token Studio preprocessor**: Use `@tokens-studio/sd-transforms` for Token Studio format support (resolves `{references}`, handles `$type`/`$value`)
- **Output transforms**:
  - `css/variables` → CSS custom properties files (preserving reference chain via `var()`)
  - `typescript/es6-declarations` → TypeScript type definitions for all token names
- **Naming convention**: `--ds-{category}-{path}` with kebab-case
  - Primitives: `--ds-color-green-050`, `--ds-spacing-16`, `--ds-radius-xs`
  - Semantic: `--ds-color-bg-success-subtle`, `--ds-color-text-base-default`
  - Component: `--ds-section-message-success-bg`, `--ds-section-message-success-icon`
- **File splitting**: Separate CSS files per token tier to support selective loading and theme switching

### 0.3 Build script

```json
// packages/tokens/package.json
{
  "name": "@synerise/ds-tokens",
  "scripts": {
    "build": "style-dictionary build --config config/style-dictionary.config.ts",
    "sync": "./scripts/sync-tokens.sh"
  },
  "devDependencies": {
    "style-dictionary": "^4.0.0",
    "@tokens-studio/sd-transforms": "^1.0.0"
  }
}
```

Build order in CI: `build:tokens` → `build:core` → `build:components`

---

## Phase 1: Inject CSS Variables via DSProvider

### 1.1 Update `ds-core` to depend on `ds-tokens`

Add `@synerise/ds-tokens` as a dependency of `@synerise/ds-core`.

### 1.2 Create a `GlobalTokenStyles` component

**File**: `packages/components/core/src/js/DSProvider/ThemeProvider/GlobalTokenStyles.ts`

```tsx
import { createGlobalStyle } from 'styled-components';

// Import the generated CSS files as strings (via Vite raw import or inline)
import primitives from '@synerise/ds-tokens/dist/css/primitives.css?raw';
import semanticLight from '@synerise/ds-tokens/dist/css/semantic-light.css?raw';
import modules from '@synerise/ds-tokens/dist/css/modules.css?raw';

export const GlobalTokenStyles = createGlobalStyle`
  :root {
    ${primitives}
    ${semanticLight}
    ${modules}
  }
`;
```

### 1.3 Mount in ThemeProvider

**File**: `packages/components/core/src/js/DSProvider/ThemeProvider/ThemeProvider.tsx`

Add `<GlobalTokenStyles />` as a sibling to children inside the styled-components ThemeProvider. This makes all CSS custom properties available to every component rendered within DSProvider.

### 1.4 Backward compatibility

- `theme.palette` remains untouched — all existing components continue to work
- `theme.variables` remains untouched
- CSS vars are additive — they sit on `:root` and don't interfere with anything
- Consuming apps that only use a subset of components still get CSS vars on `:root` (minimal perf impact — CSS vars are cheap)
- Consuming apps don't need to change anything

---

## Phase 2: Migrate Section-Message to CSS Custom Properties

### 2.1 Update `SectionMessage.utils.tsx`

Replace the hardcoded palette lookups with CSS var references for the 4 standard variants. Keep palette fallback for the 3 extra types (supply, service, entity).

```tsx
// Mapping from SectionType to token variant name
const TYPE_TO_TOKEN_VARIANT: Partial<Record<SectionType, string>> = {
  positive: 'success',
  negative: 'danger', // or 'error' — verify against modules/base.json
  notice: 'warning',
  neutral: 'info',
};

export const getColorBackground = (type: SectionType, theme: ThemePropsVars): string => {
  const variant = TYPE_TO_TOKEN_VARIANT[type];
  if (variant) {
    return `var(--ds-section-message-${variant}-bg)`;
  }
  // Fallback for supply/service/entity
  const PALETTE_MAP: Record<string, string> = {
    supply: 'violet-050', service: 'purple-050', entity: 'cyan-050',
  };
  return theme.palette[PALETTE_MAP[type] ?? 'grey-050'];
};

// Same pattern for getColorBorder, getColorIconAndBorderTop
```

### 2.2 Update `SectionMessage.styles.tsx`

- Replace hardcoded `grey-700` references with `var(--ds-color-text-base-default)` or `var(--ds-color-text-base-muted)` as appropriate
- Replace hardcoded dimensions (border-radius, padding, font-size) with CSS var equivalents where tokens exist:
  - `border-radius: var(--ds-section-message-border-radius, 3px)` (fallback preserves current value)
  - Padding, gap, border-width similarly
- The `customColor` / `customColorIcon` props continue to use palette lookups (they're user overrides, not token-driven)

### 2.3 Verify token-to-visual mapping

Cross-reference the Token Studio values with current hardcoded values:

| Property | Current | Token Studio | Match? |
|----------|---------|-------------|--------|
| Success bg | `green-050` | `{color.background.success.subtle}` → green-050 | Yes |
| Success border | `green-200` | `{color.border.success.strong}` → green-200 | Yes |
| Success icon | `green-600` | `{color.icon.success.default}` → green-600 | Yes |
| Header text | `grey-700` | `{color.text.base.default}` → grey-900 | **Differs** |
| Description | `grey-700` | `{color.text.base.muted}` → grey-600 | **Differs** |
| Border radius | 3px | 3px (in modules) | Yes |
| Top border | 2px | 2px | Yes |

> **Action needed**: Confirm with design team whether `grey-700` → `grey-900` (header) and `grey-700` → `grey-600` (description) are intentional design updates or bugs in the token definition. Proceed with token values (they represent the design intent) but flag during review.

### 2.4 No public API changes

- `SectionMessageProps` remains identical
- `SectionType` and `CustomColorType` remain identical
- Visual output matches current (for the 4 mapped types, token values align with existing palette values for light mode)

---

## Phase 3: Testing & Verification

### 3.1 Update existing tests

- Tests use `renderWithProvider` which wraps in DSProvider → CSS vars will be injected
- Existing snapshot tests may need updating if CSS values change from resolved hex to `var(--ds-...)`
- Add a test that verifies the correct CSS var is applied for each type

### 3.2 Storybook verification

- Verify all 7 section-message variants render correctly in Storybook
- Add a Storybook decorator or story that demonstrates dark mode (swapping the semantic CSS)

### 3.3 Build verification

```bash
cd packages/tokens && pnpm build          # Generates CSS + TS
cd packages/components/core && pnpm build  # Includes GlobalTokenStyles
cd packages/components/section-message && pnpm build && pnpm test
```

---

## Antd Migration Impact Analysis

### Current state
- 27+ component packages have `.less` files for antd v4 style overrides
- These Less files use Less variables (`@blue-600`), not the JS theme
- Section-message has **no Less files** — clean candidate for pilot

### Tokenization impact per migration path

| Antd decision | Impact on tokenization |
|--------------|----------------------|
| **Stay on v4** | CSS vars work as a bridge — Less files can use `var(--ds-...)` directly. Less compiler passes CSS vars through unchanged. Gradual adoption possible. |
| **Upgrade to v5/v6** | antd v5 has its own `ConfigProvider` token system. DS CSS vars can be mapped to antd v5 tokens via `theme: { token: { colorPrimary: 'var(--ds-color-bg-brand-solid)' } }`. Two token systems coexist during transition. |
| **Remove antd** | Cleanest path. Replace Less files with styled-components consuming CSS vars. No bridging needed. |

### Recommendation
- Migrate styled-components-only components first (section-message, toast, badge, divider, etc.)
- Defer Less-heavy components (table, pagination, drawer, sidebar) until the antd decision is made
- CSS custom properties as the consumption mechanism future-proofs all three paths

---

## Future: Granular Component Tokens

The architecture already supports the planned evolution. Today:

```
--ds-section-message-success-icon → var(--ds-color-icon-success-default) → var(--ds-color-green-600) → #54cb0b
```

Future: the design team can change `modules/base.json` to give section-message its own color:

```
--ds-section-message-success-icon → var(--ds-color-section-message-icon-success) → #custom-value
```

Components already reference the component-level var (`--ds-section-message-*`), so this change is transparent to code.

---

## Critical Files to Modify

| File | Change |
|------|--------|
| `packages/tokens/` (new) | New package with Token Studio JSON, Style Dictionary config, build scripts |
| `packages/components/core/package.json` | Add `@synerise/ds-tokens` dependency |
| `packages/components/core/src/js/DSProvider/ThemeProvider/ThemeProvider.tsx` | Mount `GlobalTokenStyles` |
| `packages/components/core/src/js/DSProvider/ThemeProvider/GlobalTokenStyles.ts` (new) | CSS vars injection via createGlobalStyle |
| `packages/components/section-message/src/SectionMessage.utils.tsx` | Token-first lookups with palette fallback |
| `packages/components/section-message/src/SectionMessage.styles.tsx` | Replace hardcoded greys + dimensions with CSS vars |
| `packages/components/section-message/package.json` | No changes needed (consumes tokens via CSS vars on :root) |

## Dependencies to Install

| Package | Where | Purpose |
|---------|-------|---------|
| `style-dictionary@^4` | `packages/tokens` devDep | Token build pipeline |
| `@tokens-studio/sd-transforms@^1` | `packages/tokens` devDep | Token Studio format support |
