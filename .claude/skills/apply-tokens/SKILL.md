---
name: apply-tokens
description: Apply color design tokens to a specific component — replaces theme.palette and hardcoded hex values with CSS custom properties from ds-tokens
---

## Overview

Migrate a component from hardcoded `theme.palette[...]` color lookups and hex values to CSS custom properties generated from the Token Studio design tokens in `packages/tokens/`.

## Arguments

The skill takes one argument: the component name (e.g., `toast`, `inline-alert`, `badge`). This corresponds to the package at `packages/components/<name>/`.

## Workflow

### Step 1 — Discover component tokens

Read `packages/tokens/tokens/modules/base.json` and find the top-level key that matches the component name.

- Token Studio uses kebab-case names that may differ from the package name (e.g., `section-message`, `broadcast-bar`, `status-pill`, `inline-alert`)
- If no exact match is found, search for partial matches and report. The component may not have tokens defined yet.
- Extract all **color** tokens (`$type: "color"`) for that component. List them with their reference values.

**If the component has no tokens in modules/base.json**: check if the component's colors map to existing **semantic** tokens (e.g., `--ds-color-background-success-subtle`, `--ds-color-text-base-default`). If so, the component can use semantic tokens directly. If not, report that tokens need to be defined in Token Studio first and stop.

### Step 2 — Ensure tokens are in the build

Check if the component's color tokens are already included in `packages/tokens/tokens/modules/colors-only.json`.

- If not, extract the color-only tokens for this component from `modules/base.json` and add them to `colors-only.json`
- Rebuild tokens: run `cd packages/tokens && node config/build-tokens.mjs`
- Verify the new CSS vars appear in `dist/css/light.css` (grep for `--ds-<component-name>`)

### Step 3 — Audit current color usage

Read all source files in the component package (`packages/components/<name>/src/`). Catalogue every color reference:

**3a. `theme.palette[...]` lookups**

Find all occurrences of `theme.palette['...']` or `props.theme.palette[...]` in `.tsx` and `.ts` files. For each, record:
- File and line number
- The palette key (e.g., `'green-050'`, `'grey-700'`)
- The context (which styled component or utility function)
- Whether it's a static key or a dynamic/computed key (e.g., `` `${color}-600` ``)

**3b. Hardcoded hex values**

Search for hex color literals (`#[0-9a-fA-F]{3,8}`) and `rgb()`/`rgba()` values in styled-component template literals. Record each occurrence.

**3c. Less files**

Check if the component has any `.less` files. If so, list them and note that they use Less variables (`@blue-600`) — these should be reported but **not** migrated (deferred until the antd decision is made).

### Step 4 — Build the mapping

For each color found in Step 3, determine the corresponding token:

**4a. Component-level tokens** (preferred)

Map palette keys to component tokens from Step 1. The palette key naming convention is `{color}-{shade}` (e.g., `green-050`), and the Token Studio primitive is `color.{color}.{shade}` (e.g., `color.green.50`). Trace the reference chain:

```
theme.palette['green-050']
  → primitive: --ds-color-green-50 (#f9ffed)
  → semantic: --ds-color-background-success-subtle (references green-50)
  → component: --ds-<component>-variant-success-bg (references the semantic)
```

Always prefer the component-level token if one exists. Fall back to semantic tokens if the color is used in a way not covered by component tokens (e.g., close button icon color using `--ds-color-icon-base-default`).

**4b. Semantic tokens** (fallback)

If no component-level token exists for a color usage, check `dist/css/light.css` for a semantic token whose resolved value matches. Common mappings:
- `grey-700` for text → `--ds-color-text-base-default` (resolves to grey-800) or `--ds-color-text-base-muted` (grey-600). **Flag this as a potential visual diff.**
- `grey-700` for icons → `--ds-color-icon-base-default` (grey-600). **Flag.**
- `blue-600` for interactive elements → `--ds-color-background-brand-solid`

**4c. No token available**

If a color has no matching token at any level, add it to the "unmapped colors" report. These indicate either:
- Colors that are unique to this component and need component-level tokens defined in Token Studio
- Colors that are hardcoded incorrectly and should be using a semantic token
- Colors that are part of a `customColor` / dynamic override pattern and should keep using `theme.palette`

### Step 5 — Verify color equivalence

For each mapping from Step 4, resolve the full token chain to the final hex value using the light theme CSS output. Compare against the current palette value.

Present a table:

| Usage | Current value | Token | Token resolves to | Match? |
|---|---|---|---|---|
| success bg | `green-050` (#f9ffed) | `--ds-<comp>-variant-success-bg` | #f9ffed | Yes |
| header text | `grey-700` (#57616d) | `--ds-color-text-base-default` | #384350 (grey-800) | **No — darker** |

**For any mismatches**: pause and report them to the user before proceeding. Ask for confirmation that the token values (which represent the design team's intent) should be used, or if the current values should be preserved.

### Step 6 — Apply the migration

After user confirms the mapping:

**6a. Update utility/color functions**

If the component has color utility functions (like `getColorBackground`, `getColorBorder`), update them to return CSS var strings for mapped types and keep `theme.palette` fallback for unmapped types. Follow the pattern established in `section-message/src/SectionMessage.utils.tsx`:

```tsx
const variant = TYPE_TO_TOKEN_VARIANT[type];
if (variant) {
  return `var(--ds-<component>-variant-${variant}-bg)`;
}
// Fallback for types without tokens
return theme.palette[`${color}-050`];
```

**6b. Update styled components**

Replace direct `theme.palette[...]` references with `var(--ds-...)` for colors that have tokens. For colors used via `customColor` or dynamic prop-based palette lookups, keep the existing `theme.palette` pattern (these are user overrides, not token-driven).

**6c. Pass required props**

If styled components need additional props to determine which token to use (e.g., `type` prop for text color), update the component JSX to pass them.

**6d. Do not change**

- The component's public API (props, types, exports)
- Less files (deferred)
- `customColor` / `customColorIcon` / dynamic palette overrides
- Colors in test files or story files

### Step 7 — Build and test

1. Build the component: `cd packages/components/<name> && pnpm build`
2. Run tests: `pnpm test`
3. If tests fail due to changed color values (e.g., snapshot tests checking for hex values that are now `var(--ds-...)`), update the tests.

### Step 8 — Report

Present a summary:

**Migrated colors:**
- N palette lookups replaced with CSS custom properties
- N using component-level tokens, M using semantic tokens

**Visual diffs** (if any):
- List each color that changed with old → new values

**Unmapped colors** (if any):
- List colors that have no token equivalent, with file:line references
- Suggest whether they need a new token in Token Studio or should use a semantic token

**Less files** (if any):
- List Less files that were not migrated, with count of color references

**Files modified:**
- List all changed files
