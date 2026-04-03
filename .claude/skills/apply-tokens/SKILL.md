---
name: apply-tokens
description: Apply design tokens (colors, shadows, opacity) to a specific component — replaces theme.palette, hardcoded hex/rgba, box-shadow, and opacity values with CSS custom properties from ds-tokens. Updates TOKENISATION_STATUS.md.
---

## Overview

Migrate a component from hardcoded `theme.palette[...]` lookups, hex/rgba colors, box-shadow values, and opacity to CSS custom properties generated from the Token Studio design tokens in `packages/tokens/`.

After migration, update `TOKENISATION_STATUS.md` at the repo root with the results.

## Arguments

The skill takes one argument: the component name (e.g., `toast`, `inline-alert`, `badge`). This corresponds to the package at `packages/components/<name>/`.

## Workflow

### Step 1 — Discover component tokens

Read `packages/tokens/tokens/modules/base.json` and find the top-level key that matches the component name.

- Token Studio uses kebab-case names that may differ from the package name (e.g., `section-message`, `broadcast-bar`, `status-pill`, `inline-alert`, `popcornfirm`)
- If no exact match is found, search for partial matches and report. The component may not have tokens defined yet.
- Extract **all** tokens for that component, grouped by type:
  - `$type: "color"` — color tokens
  - `$type: "boxShadow"` or `$type: "shadow"` — shadow tokens (Token Studio uses `boxShadow`, sd-transforms normalises to `shadow`)
  - `$type: "opacity"` — opacity tokens
- List each token with its `$type` and `$value` (reference)

**If the component has no tokens in modules/base.json**: check if the component's values map to existing **semantic** tokens (e.g., `--ds-color-background-success-subtle`, `--ds-shadows-shadow-2`, `--ds-opacity-disabled`). If so, the component can use semantic tokens directly. If not, report that tokens need to be defined in Token Studio first and stop.

### Step 2 — Ensure tokens are in the build

Check if the component's tokens are already included in `packages/tokens/tokens/modules/colors-only.json`.

**Note:** Despite the filename, `colors-only.json` includes color, boxShadow, and opacity tokens. The build filter (`config/build-tokens.mjs`) accepts types: `color`, `boxShadow`, `shadow`, and `opacity`. Tokens referencing undefined paths (broken refs in Token Studio) must be excluded.

- If the component's tokens are not in `colors-only.json`, extract them from `modules/base.json` (filtering to the included types, excluding tokens with known broken references like `outline.color.focus.secondary`, `outline.color.focus.primary`, `color.text.disabled.default`) and add them
- Rebuild tokens: `cd packages/tokens && node config/build-tokens.mjs`
- Verify the new CSS vars appear in `dist/css/light.css` (grep for `--ds-<component-name>`)

### Step 3 — Audit current usage

Read all source files in the component package (`packages/components/<name>/src/`). Catalogue every tokenisable reference:

**3a. Colors — `theme.palette[...]` lookups**

Find all occurrences of `theme.palette['...']` or `props.theme.palette[...]`. For each, record:
- File and line number
- The palette key (e.g., `'green-050'`, `'grey-700'`)
- The context (which styled component or utility function)
- Whether it's a static key or a dynamic/computed key (e.g., `` `${color}-600` ``)

**3b. Colors — Hardcoded hex and rgba values**

Search for hex color literals (`#[0-9a-fA-F]{3,8}`) and `rgb()`/`rgba()` values in styled-component template literals. Record each occurrence.

**3c. Shadows — `box-shadow` values**

Search for `box-shadow` in styled-component CSS. Record the full value and whether it matches a primitive shadow token (`--ds-shadows-shadow-1` through `--ds-shadows-shadow-4`):
- Shadow 1: `0 4px 12px 0 rgba(35,41,54,0.04)` — raised surfaces
- Shadow 2: `0 16px 32px 0 rgba(35,41,54,0.10)` — floating/overlay
- Shadow 3: `0 60px 80px 0 rgba(35,41,54,0.11)` — deep elevation
- Shadow 4: `0 60px 80px 0 rgba(35,41,54,0.20)` — highest elevation

Also check if the component has a `shadow` token in `modules/base.json` (component-level shadow).

**3d. Opacity**

Search for `opacity:` in styled-component CSS. Check if the value matches a semantic opacity token:
- `--ds-opacity-disabled`: `0.4` — disabled state
- `--ds-opacity-muted`: `0.2` — muted/subtle elements

Also check if the component has an `opacity` token in `modules/base.json` (e.g., `buttons.disabled.opacity`).

**3e. Less files**

Check if the component has any `.less` files. If so, list them and note that they use Less variables — these should be reported but **not** migrated (deferred until the antd decision is made).

### Step 4 — Build the mapping

For each value found in Step 3, determine the corresponding token:

**4a. Component-level tokens** (preferred)

Map palette keys / shadow values / opacity values to component tokens from Step 1. Trace the reference chain:

```
Color: theme.palette['green-050']
  → primitive: --ds-color-green-50 (#f9ffed)
  → semantic: --ds-color-background-success-subtle
  → component: --ds-<component>-variant-success-bg

Shadow: box-shadow: 0 16px 32px 0 rgba(35,41,54,0.12)
  → primitive: --ds-shadows-shadow-2
  → component: --ds-<component>-shadow (if defined)

Opacity: opacity: 0.4
  → semantic: --ds-opacity-disabled
  → component: --ds-<component>-disabled-opacity (if defined)
```

Always prefer the component-level token if one exists. Fall back to semantic/primitive tokens if the value is not covered by component tokens.

**4b. Semantic/primitive tokens** (fallback)

If no component-level token exists, check `dist/css/light.css` for a matching token. Common mappings:
- `grey-700` for text → `--ds-color-text-base-default` (grey-800) or `--ds-color-text-base-muted` (grey-600). **Flag as visual diff.**
- `grey-700` for icons → `--ds-color-icon-base-default` (grey-600). **Flag.**
- `blue-600` for interactive → `--ds-color-background-brand-solid`
- `rgba(35,41,54,0.12)` shadow → `--ds-shadows-shadow-2`
- `opacity: 0.4` on disabled → `--ds-opacity-disabled`

**4c. No token available**

If a value has no matching token at any level, add it to the "unmapped" report:
- Decorative values (gradients, transparent stops) — keep hardcoded
- Dynamic/user-override patterns (`customColor`, computed keys) — keep `theme.palette`
- Values that need a new token in Token Studio — flag for design team

### Step 5 — Verify equivalence

For each mapping, resolve the full token chain to the final value. Compare against the current value.

Present a table:

| Usage | Current value | Token | Token resolves to | Match? |
|---|---|---|---|---|
| success bg | `green-050` (#f9ffed) | `--ds-<comp>-variant-success-bg` | #f9ffed | Yes |
| container shadow | `0 16px 32px ...` | `--ds-shadows-shadow-2` | `0 16px 32px 0 #2329361a` | Yes |
| disabled opacity | `0.4` | `--ds-<comp>-disabled-opacity` | `0.4` | Yes |
| header text | `grey-700` (#57616d) | `--ds-color-text-base-default` | #384350 | **No — darker** |

**For any mismatches**: pause and report them to the user before proceeding. Ask for confirmation.

### Step 6 — Apply the migration

After user confirms the mapping:

**6a. Update utility/color functions**

If the component has helper functions for colors, update them to return CSS var strings. If all types map to tokens, the `theme` parameter can be removed entirely. Follow the pattern in `section-message/src/SectionMessage.utils.tsx`.

**6b. Update styled components**

- Replace `theme.palette[...]` with `var(--ds-...)` for mapped colors
- Replace hardcoded `box-shadow` values with `var(--ds-shadows-shadow-N)` or component shadow tokens
- Replace hardcoded `opacity` values with `var(--ds-opacity-disabled)` or component opacity tokens
- For dynamic/user-override patterns (`customColor`, computed palette keys) — keep `theme.palette`

**6c. Pass required props**

If styled components need additional props to determine which token to use (e.g., `type` prop), update the component JSX to pass them.

**6d. Do not change**

- The component's public API (props, types, exports)
- Less files (deferred)
- `customColor` / `customColorIcon` / dynamic palette overrides
- Colors in test files or story files
- Decorative values without token equivalents (gradients, transparent stops)

### Step 7 — Build and test

1. Build the component: `cd packages/components/<name> && pnpm build`
2. Run tests: `pnpm test`
3. If tests fail due to changed values (e.g., assertions checking resolved hex/shadow values that are now `var(--ds-...)`), update the tests to check attributes or class names instead.

### Step 8 — Update TOKENISATION_STATUS.md

Update `TOKENISATION_STATUS.md` at the repo root:

**8a. Update the summary table**

Find the component's row in the "Components with module-level tokens defined" table and update the status columns:
- Colors: `:white_check_mark:` if all palette lookups for type-driven colors are replaced, `:construction:` if partial
- Shadows: `:white_check_mark:` if all box-shadows tokenised, `:heavy_minus_sign:` if component has none
- Opacity: `:white_check_mark:` if all opacity values tokenised, `:heavy_minus_sign:` if component has none
- Spacing: leave as `:x:` (dimension tokens not yet in CSS output)
- Diffs: update count

If the component is currently in the "without module-level tokens" table, move it to the "with module-level tokens" table.

**8b. Add or update the detailed report section**

Add a section under "Detailed Reports" following the format used by section-message/toast/broadcast-bar:

```markdown
### <component-name>

**Package:** `packages/components/<name>/`
**Token variants:** <list variants and count>
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: Complete
<description of what was migrated>

#### Shadows — :white_check_mark: Complete / :heavy_minus_sign: N/A
<description>

#### Opacity — :white_check_mark: Complete / :heavy_minus_sign: N/A
<description>

#### Spacing — :x: Not started
<what Token Studio defines vs what's hardcoded>

#### Visual diffs
| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|

#### Unmapped values
| Usage | Value | Location | Reason |
|-------|-------|----------|--------|
```

### Step 9 — Report to user

Present a summary:

**Migrated:**
- N color lookups → CSS custom properties (N component-level, M semantic)
- N box-shadow values → shadow tokens
- N opacity values → opacity tokens

**Visual diffs** (if any):
- List each value that changed with old → new

**Unmapped** (if any):
- List values with no token, with file:line and reason

**Less files** (if any):
- List files not migrated, with count of color references

**Files modified:**
- List all changed files

**Status file updated:**
- Confirm TOKENISATION_STATUS.md was updated
