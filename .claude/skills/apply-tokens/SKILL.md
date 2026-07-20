---
name: apply-tokens
description: Apply design tokens (colors, shadows, opacity) to a specific component — replaces theme.palette, hardcoded hex/rgba, box-shadow, and opacity values with CSS custom properties from ds-tokens. Updates TOKENISATION_STATUS.md.
---

## Overview

Migrate a component from hardcoded `theme.palette[...]` lookups, hex/rgba colors, box-shadow values,
and opacity to CSS custom properties from `@synerise/ds-tokens` (`packages/tokens/`). **Phase 1 covers
colors, shadows, and opacity only** — spacing/dimension tokens are not yet in the CSS build, so leave
them alone.

### Granularity rule (the one thing that matters)

Tokens come in layers. Pick the **most specific layer that exists**, and never go below semantic:

```
component HAS module tokens?  → var(--ds-<component>-...)        (module / component layer)
otherwise                     → var(--ds-color-* | --ds-shadows-shadow-N | --ds-opacity-*)   (semantic layer)
NEVER                         → var(--ds-color-grey-700) etc.    (primitive layer — do not use directly)
NEVER                         → author a new --ds-<component>-*   (module tokens are owned upstream)
```

**Module tokens are authored in the upstream design-tokens repo and arrive here via the token sync —
this repo is consume-only.** Do **not** add tokens to `modules/base.json` / `modules/colors-only.json`
and do **not** run the token build to invent new component tokens. If a component needs a module token
that doesn't exist, fall back to the semantic layer and record the gap as a design-tokens follow-up.

Module tokens are thin aliases over semantic anyway (e.g. `--ds-card-select-bg-default` →
`var(--ds-color-background-base-default)`), so a semantic fallback is always a valid, on-system choice.

> **Always verify the live token set at run time — it changes.** Tokens are synced from upstream, so a
> component's token names, structure, and resolved values evolve between runs. Token names recorded in a
> previous migration, in a per-component status file, or anywhere else in this skill are **examples, not
> ground truth** — they may have been renamed, removed, or re-pointed. For every run, re-derive the set
> from `packages/tokens/tokens/modules/base.json` and confirm the actual CSS vars **and their resolved
> values** in `packages/tokens/dist/css/light.css` before mapping. (Real example: card-select's tokens
> were renamed `border-*` → `border-color-*`, the `border-error` token was dropped, and `shadow-*` /
> `check-*` tokens were added — all after the first status file was written.)

## Arguments

The skill takes one argument: the component name (e.g., `card-select`, `broadcast-bar`, `badge`). This
corresponds to the package at `packages/components/<name>/`.

## Workflow

### Step 1 — Determine which layer this component uses

Read the **top-level keys** of `packages/tokens/tokens/modules/base.json`. That list IS the authoritative
set of components that have module tokens (~28 today). Token Studio uses kebab-case names that may differ
from the package name, e.g. `status-pill` (package `status`), `popcornfirm` (package `popconfirm`),
`progressbar` (package `progress-bar`), `description-line` (package `description`), `ai-chat` + `app-menu`
(package `app-menu`), `page` + `page-header` (package `page-header`), and `form` (spans
`form`/`input`/`checkbox`/`radio`/`switch`/`select`).

- **Match found → module layer.** Extract all of that component's tokens grouped by `$type`
  (`color`, `boxShadow`/`shadow`, `opacity`) and confirm each is emitted in `dist/css/light.css`
  (`grep -- '--ds-<component>-' packages/tokens/dist/css/light.css`). These are the tokens you map onto.
- **No match → semantic layer.** The component maps directly to semantic tokens. This is expected for
  most components — it is not a blocker and requires no token authoring.

### Step 2 — Confirm the tokens are in the build (verify only — never author)

For a module-layer component, confirm its CSS vars already exist in `dist/css/light.css`. They should,
since tokens are synced from upstream.

- If every value you need maps to an **existing** token (module or semantic), proceed.
- If a needed **module** token is genuinely missing from the build, do **not** add it. Use the matching
  **semantic** token instead and note the missing-module-token in the report as a design-tokens
  follow-up. Never edit `colors-only.json` or run `config/build-tokens.mjs` from this skill.

### Step 3 — Audit current usage

Read all source files in the component package (`packages/components/<name>/src/`), excluding tests and
stories. Catalogue every tokenisable reference:

**3a. Colors — `theme.palette[...]` lookups.** Find every `theme.palette['...']` / `props.theme.palette[...]`
(including local helpers that wrap it). Record file:line, the palette key (`'grey-700'`, `'green-050'`),
the context (styled component / util), and whether the key is **static** or **dynamic/computed**
(e.g. `` `${color}-600` ``, `customColor`).

**3b. Colors — hardcoded hex / rgba** in styled-component template literals. Record each. (Ignore `.svg`
files and SVG color attributes — those are not tokenisable in Phase 1.)

**3c. Shadows — `box-shadow`.** Record the full value and whether it matches a primitive shadow token:
- `--ds-shadows-shadow-1`: `0 4px 12px 0 rgba(35,41,54,0.04)` — raised surfaces
- `--ds-shadows-shadow-2`: `0 16px 32px 0 rgba(35,41,54,0.10)` — floating / overlay
- `--ds-shadows-shadow-3`: `0 60px 80px 0 rgba(35,41,54,0.11)` — deep elevation
- `--ds-shadows-shadow-4`: `0 60px 80px 0 rgba(35,41,54,0.20)` — highest elevation

Note: an **outline-style** `box-shadow: 0 0 0 Npx <color>` is a focus/border ring, not elevation — only
its **color** is tokenisable (map to a border token), keep the geometry. A module-layer component may also
have a dedicated `shadow` token in `base.json`.

**3d. Opacity — `opacity:`.** Match against semantic opacity tokens:
- `--ds-opacity-disabled`: `0.4` — disabled state
- `--ds-opacity-muted`: `0.2` — muted / subtle
A module-layer component may have its own `opacity` token (e.g. `buttons.disabled.opacity`).

**3e. Less files.** List any `.less` files and note they are **deferred** (antd theming decision pending) —
report, do not migrate.

**3f. Static `theme` imports.** Flag every `import { theme } from '@synerise/ds-core'` (the **default/static**
theme object) used in `.ts`/`.tsx` for `theme.palette[...]` lookups — typically inline `<Icon color={theme.palette[...]}>`
props. This is distinct from styled-components' `props.theme.palette[...]`, which is already provider-aware and
must NOT be flagged. The static object ignores `ThemeProvider` overrides, so it should never remain:
  - When the lookup is being tokenised to a `var(--ds-...)` anyway, the static import usually becomes unused —
    **remove it** (prefer this; the icon/element takes the token directly, no theme access needed).
  - Where a `theme.palette` usage must **stay on palette** (no matching token / dynamic value), convert it to the
    **`useTheme()` hook** instead of the static import.
  Either way, no file should be left importing the static `theme` for a palette lookup. Record each occurrence
  (file:line) and its resolution (removed vs `useTheme`).

### Step 4 — Build the mapping (module-where-defined, else semantic)

For each value from Step 3, pick its token following the granularity rule:

```
Color:  theme.palette['green-050']
  module-layer comp → var(--ds-<comp>-variant-success-bg)   (if such a token exists)
  else              → var(--ds-color-background-success-subtle)   (semantic)

Shadow: box-shadow: 0 16px 32px 0 rgba(35,41,54,0.10)
  module-layer comp → var(--ds-<comp>-shadow)               (if defined)
  else              → var(--ds-shadows-shadow-2)            (semantic)

Opacity: opacity: 0.4
  module-layer comp → var(--ds-<comp>-disabled-opacity)     (if defined)
  else              → var(--ds-opacity-disabled)            (semantic)
```

Common semantic color targets (use these, not primitives):
- text: `--ds-color-text-base-default` (grey-800), `-muted` (grey-600), `-subtle`, `-disabled`; plus
  `-brand`/`-danger`/`-success`/`-warning`/`-onsolid-*` families.
- background: `--ds-color-background-base-{default|subtle|muted|strong}` (+`hover`), and
  `-brand`/`-danger`/`-success`/`-warning`/`-neutral`/`-custom`/`-translucent-*` families.
- border: `--ds-color-border-base-{default|strong|subtle|disabled}`, `-brand`/`-danger`/`-success`/… .
- icon: `--ds-color-icon-base-{default|muted|subtle|disabled}`, `-brand`/`-danger`/`-success`/`-onsolid-*` .

**No token at any allowed level → unmapped.** Keep as-is and report:
- Decorative values (gradients, transparent stops, semi-transparent overlays like `rgba(255,255,255,0.2)`).
- Dynamic / user-override patterns (`customColor`, computed palette keys) — keep `theme.palette`.
- `theme.variable('@…')` antd Less variables (border-radius, antd box-shadows) — keep, unless the value
  provably equals a `--ds-shadows-shadow-N`.

### Step 5 — Verify equivalence

Resolve each chosen token's full chain to its final value and compare to the current value:

| Usage | Current value | Token | Token resolves to | Match? |
|---|---|---|---|---|
| success bg | `green-050` (#f9ffed) | `--ds-<comp>-variant-success-bg` | #f9ffed | Yes |
| container shadow | `0 16px 32px …` | `--ds-shadows-shadow-2` | `0 16px 32px 0 #2329361a` | Yes |
| disabled opacity | `0.4` | `--ds-opacity-disabled` | `0.4` | Yes |
| header text | `grey-700` (#57616d) | `--ds-color-text-base-default` | #384350 | **No — darker** |

**Pause on any mismatch and report it to the user for sign-off before applying.** A mismatch is usually
the design team's intended value, but it is a visible change — confirm it.

### Step 6 — Apply the migration (after sign-off)

**6a.** If the component has a color/util helper, update it to return CSS-var strings. Mirror
`section-message/src/SectionMessage.utils.tsx`: a `TYPE_TO_TOKEN_VARIANT` map + functions returning
`` `var(--ds-<comp>-variant-${variant}-...)` ``. If all branches map to tokens, the `theme` parameter
can be dropped.

**6b.** In styled components: replace `theme.palette[...]` with `var(--ds-...)`; replace elevation
`box-shadow` with `var(--ds-shadows-shadow-N)`; for outline-style `box-shadow`, swap only the color;
replace `opacity` with the opacity token. Keep dynamic/override palette lookups.

**6b-svg. Colour icons via inheritance, not direct fill/stroke.** DS icons render with
`fill="currentColor"` and `color: inherit`, so an icon takes its colour from the CSS `color` of its
parent (or the `<Icon color=...>` prop, which sets `color` on the SVG). **Drop any direct
`svg { fill: ... }` / `stroke: ...` CSS rules** in favour of setting `color` on the parent and letting
the icon inherit. If you find such rules while migrating a component, convert them; if converting is
out of scope, record them in the report as a CSS-cleanup follow-up.

**6c.** Pass any props the styled components now need to choose a token (e.g. a `type`/`variant` prop).

**6d. Do NOT change:** the public API (props/types/exports); `.less` files; `customColor`/computed
palette overrides; colors in tests/stories; decorative values; deferred antd `theme.variable`.

### Step 7 — Build and test

```
cd packages/components/<name> && pnpm build && pnpm test
```

If a test asserts a resolved hex/shadow value that is now `var(--ds-...)`, update it to assert the
attribute / class / styled output — **never weaken a test just to make it pass.**

### Step 8 — Update TOKENISATION_STATUS.md

Update `TOKENISATION_STATUS.md` at the repo root.

**8a. Summary table.** Update the component's status columns: Colors `:white_check_mark:` when all
type-driven palette lookups are replaced (`:construction:` if partial), Shadows / Opacity
`:white_check_mark:` / `:heavy_minus_sign:`, Spacing stays `:x:`. If the component was in the
"without module-level tokens" table but uses semantic tokens, that's fine — record it migrated; it does
not need to move tables (table membership = whether module tokens exist, which is unchanged).

**8b. Detailed report.** Add/update a section under "Detailed Reports" in the section-message/toast
format: package, variants, layer used (module vs semantic), Colors/Shadows/Opacity status, Spacing
(deferred), a **Visual diffs** table, and an **Unmapped values** table.

### Step 9 — Report to user

Summarise: counts migrated (module-level vs semantic), shadows, opacity; visual diffs (old → new); any
missing-module-token gaps flagged for the design-tokens repo; unmapped values with file:line + reason;
`.less` files left deferred; files modified; and confirm `TOKENISATION_STATUS.md` was updated.
