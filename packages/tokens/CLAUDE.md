# Tokens (`@synerise/ds-tokens`)

> Design tokens for the Synerise Design System — sourced from Token Studio, processed by Style Dictionary v4 into CSS custom properties.

## Package structure

```
tokens/                         — Token Studio JSON sources (mirrored from the design-tokens repo)
  primitives/core.json          — raw color palettes, typography, spacing, radii, shadows
  semantic/Light.json           — light theme semantic mappings
  semantic/Dark.json            — dark theme semantic mappings
  semantic/custom-color/*.json  — 12 brand color theme files
  semantic/ordered/order-N.json — 21 categorical "ordered" colour slots (base + hover per slot)
  semantic/dimensions.json      — phase-2: size/border/opacity (repo-local; not yet upstream)
  semantic/spacing.json         — phase-2: inset/stack/inline spacing (repo-local; not yet upstream)
  modules/base.json             — component-level token definitions (full set; build derives the color subset)
  surface/base.json             — elevation/surface tokens
  $metadata.json                — token set ordering
  $themes.json                  — theme configuration with Figma references
config/
  build-tokens.mjs              — Style Dictionary v4 build script
scripts/
  sync-tokens.sh                — mirrors latest JSON from the design-tokens GitLab repo
src/
  index.ts                      — placeholder (real exports are generated in dist/)
dist/
  css/light.css                 — CSS custom properties for light theme (:root selector)
  css/dark.css                  — CSS custom properties for dark theme ([data-ds-theme="dark"])
  js/light.js                   — exports { cssText, tokens } (light: var-declarations string + resolved map)
  js/dark.js                    — exports { cssText, tokens } (dark)
  js/index.js                   — re-exports { cssText, tokens } from light.js
  js/names.js                   — categorical catalogue (customColors/customColorNames + orderedBase/orderedHover)
  json/light.json               — flat, fully-resolved token map (build source for the js `tokens` export)
  json/dark.json                — flat, fully-resolved token map (dark)
```

## Token architecture

Three-tier CSS custom property chain:

```
Component tokens (most specific):
  --ds-section-message-variant-success-bg
    → references semantic token

Semantic tokens (theme-aware):
  --ds-color-background-success-subtle
    → references primitive token

Primitive tokens (raw values):
  --ds-color-green-50: #f9ffed
```

Swapping semantic tier (light.css → dark.css) switches the entire theme without touching component code.

## Build pipeline

```bash
pnpm build                    # runs: node config/build-tokens.mjs
```

1. Registers Token Studio preprocessor via `@tokens-studio/sd-transforms`
2. Processes token JSON files through Style Dictionary v4
3. Outputs CSS files with `outputReferences: true` (preserves var() chain)
4. Generates JS modules exporting both the CSS string (`cssText`) and a flat, fully-resolved token map (`tokens`)
5. Currently filters to **color tokens only** — spacing, typography, etc. deferred

### Token filtering (derived, not hand-maintained)

`modules/base.json` contains all component tokens (many non-color types, and some color/shadow
tokens with references to primitives that don't exist yet — e.g. `outline.*`, `shadow.level.*`).
`build-tokens.mjs` derives the buildable color/opacity/shadow subset **at build time**:

1. `filterByType` keeps only `color` / `boxShadow` / `shadow` / `opacity` leaves.
2. `pruneUnresolvable` iteratively drops any leaf whose `{reference}` targets a path absent from the
   loaded token sets, until the set is stable (handles cascades).

This replaces the old hand-maintained `modules/colors-only.json` — adding a new component's tokens
upstream needs **no** manual extraction. Tokens whose reference targets appear upstream later
(e.g. once `outline.*` / `shadow.level.*` primitives are added) are picked up automatically. The
build logs how many tokens were pruned, and asserts the output contains `--ds-color-` vars. See
`SYNC_AUTOMATION.md` for the end-to-end sync flow.

## How tokens are consumed

1. `@synerise/ds-core` depends on this package
2. `GlobalTokenStyles` (in ds-core's ThemeProvider) imports `cssText` from `@synerise/ds-tokens`
3. Injects all CSS vars on `:root` via `createGlobalStyle`
4. Components use `var(--ds-section-message-variant-success-bg)` in styled-components

### Accessing token values in JS

Each theme module (`@synerise/ds-tokens`, `/dark`) exports two things:

- **`cssText`** — the raw `--ds-*: value;` declarations, for `createGlobalStyle` injection (unchanged).
- **`tokens`** — a flat, **fully-resolved** map keyed by the full CSS var name:

```ts
import { tokens } from '@synerise/ds-tokens';           // light (default)
import { tokens as darkTokens } from '@synerise/ds-tokens/dark';

tokens['--ds-color-text-base-default']; // '#384350'  (resolved, not a var() reference)
tokens['--ds-shadows-shadow-2'];        // '0 16px 32px 0 #2329361a'
tokens['--ds-opacity-disabled'];        // '0.4'
```

Use `tokens` for **non-CSS consumers** that need a concrete value — canvas, charting libs, Monaco theming
(e.g. `code-area`) — where `var()` can't be used. It is a **static, build-time** snapshot per theme.

For **runtime, theme-aware** resolution (respects `data-ds-theme` and any `ThemeProvider` override), read the
live CSS variable instead: `getComputedStyle(el).getPropertyValue('--ds-…').trim()`. For ordinary styling,
still prefer passing `var(--ds-…)` strings and letting the browser resolve them.

## Syncing tokens

```bash
pnpm sync                     # runs: bash scripts/sync-tokens.sh [branch]  (default: main)
```

Mirrors the latest JSON from the **design-tokens GitLab repo** (`Frontend/design-tokens@main`) into
`tokens/`, preserving the repo-local phase-2 files (`semantic/dimensions.json`,
`semantic/spacing.json`). After syncing, rebuild with `pnpm build`.

In CI this is fully automated: a token merge in design-tokens triggers a sync that opens a
Chromatic-reviewed MR here. See **`SYNC_AUTOMATION.md`** for the flow and one-time setup.

## Naming convention

CSS var names follow `--ds-{path}` with kebab-case path segments:

| Tier | Pattern | Example |
|------|---------|---------|
| Primitive | `--ds-color-{family}-{shade}` | `--ds-color-green-50` |
| Semantic | `--ds-color-{category}-{variant}-{intensity}` | `--ds-color-background-success-subtle` |
| Component | `--ds-{component}-{property-path}` | `--ds-section-message-variant-success-bg` |

## Categorical colour sets (`custom-color` + `ordered`)

Two categorical colour sets are emitted with the same two-tier, per-theme pattern (see
`build-tokens.mjs` → `loadCustomColorFamilies`/`customSemanticTier` and
`loadOrderedSlots`/`orderedSemanticTier`):

| Set | Driver | SET tier (ramp) | Flipping SEMANTIC tier (components use) | Manifest export |
|-----|--------|-----------------|------------------------------------------|-----------------|
| **custom-color** | user picks a hue from the palette | `--ds-color-custom-<family>-<shade>` (+ `-dark-`) | `--ds-color-background-custom-<family>-<shade>` | `customColors[family][shade]`, `customColorNames` |
| **ordered** | system colour queue (card-tabs, slider) | `--ds-color-ordered-<N>-base\|hover` (+ `-dark-`) | `--ds-color-background-ordered-<N>-base\|hover` | `orderedBase[i]`, `orderedHover[i]` (i = slot−1) |

- **`ordered`** = 21 slots (`tokens/semantic/ordered/order-1.json` … `order-21.json`), 7 hues ×
  3 shade-blocks (`blue, green, yellow, purple, cyan, orange, violet`; blocks 600→700→500),
  each a `base` + `hover` pair. `hover` is an **explicit token** (base − 100), so consumers read
  it rather than computing a lighter shade from a colour name. A singular default
  (`--ds-color-ordered-base|hover` → slot 1) is also emitted so the upstream singular semantic
  tokens (`--ds-color-background-ordered-base|hover`, `--ds-color-text-ordered-base`) and the
  card-tabs module tokens that chain through them resolve.
- **Flip**: the SEMANTIC tier references the light SET group in `light.css` and the dark SET
  group in `dark.css`, so a single manifest of `var(--ds-color-background-…)` strings works in
  both themes — dark comes for free with the `data-ds-theme` swap.
- **Consumption**: components pick a colour by **var-name selection in JS** — there is **no
  `[data-ds-*]` scoping** for categorical colour. e.g. avatar: `customColors[family][hue]`;
  card-tabs/slider: `orderedBase[i % 21]` / `orderedHover[i % 21]`, dropped straight into a
  styled-component. Import from the manifest:

```ts
import { customColors, customColorNames, orderedBase, orderedHover } from '@synerise/ds-tokens/names';
orderedBase[0];  // 'var(--ds-color-background-ordered-1-base)'
```

## Dark mode / theme switching

Both `light.css` and `dark.css` are generated and available as separate exports (`@synerise/ds-tokens/light`, `@synerise/ds-tokens/dark`). Each exports a `cssText` string containing the CSS variable declarations for that theme.

**Current state**: `GlobalTokenStyles` in ds-core always injects the light theme. Dark mode is not yet wired into DSProvider at runtime.

**Planned approach for consuming apps**: Extend DSProvider with a `mode` prop (`'light' | 'dark'`). The consuming app owns the user preference (localStorage, system preference, user settings API, etc.) and passes it down:

```tsx
// Consuming app manages the preference
const [mode, setMode] = useState(() =>
  localStorage.getItem('ds-theme') ?? 'light'
);

<DSProvider mode={mode}>
  <ThemeToggle onChange={setMode} />
  <App />
</DSProvider>
```

Under the hood, `GlobalTokenStyles` would switch the injected CSS based on `mode`:

```tsx
import { cssText as lightCss } from '@synerise/ds-tokens/light';
import { cssText as darkCss } from '@synerise/ds-tokens/dark';

const GlobalTokenStyles = createGlobalStyle<{ mode: 'light' | 'dark' }>`
  :root {
    ${(props) => (props.mode === 'dark' ? darkCss : lightCss)}
  }
`;
```

DSProvider stays stateless — it receives the mode, it doesn't own it. This keeps the design system decoupled from any particular state management approach.

**Storybook**: Theme switching is available via a toolbar dropdown ("Theme") that manually injects the selected theme's CSS and sets `data-ds-theme` on the document root.

## Current scope

- **Included**: Color tokens only (primitives, semantic light/dark, section-message component tokens)
- **Deferred**: Spacing, typography, border, shadow, opacity tokens (require additional primitives in Token Studio)
- **Dark mode**: CSS is generated, Storybook toggle exists, DSProvider `mode` prop not yet implemented

## Key dependencies

- `style-dictionary` v4 — token build engine
- `@tokens-studio/sd-transforms` — Token Studio format preprocessor

## Implementation notes

- The `dist/` directory is listed in `.gitignore` (root-level `dist` rule). CI builds it via the `build_packages` job and passes it as an artifact.
- `dist/js/*.js` files use ESM `export` syntax. The root Jest config transforms `@synerise/*` packages via `@swc/jest`, so `.js` extension (not `.mjs`) is required for test compatibility.
- Custom color files (`semantic/custom-color/*.json`) each define the same `color.custom.*` key path; the build namespaces them by filename into per-family SET tokens (`color.custom.<family>.*`). The legacy single-active `color.custom.*` (from `blue.json` as default) is left untouched — distinct paths, distinct var names. See "Categorical colour sets" above.
- Ordered files (`semantic/ordered/order-N.json`) similarly reuse the same `color.ordered.base|hover` key path; the build namespaces them by slot number into `color.ordered.<N>.*`.
- The `$themes.json` file defines Token Studio theme permutations including Figma variable references. The build script does not use `permutateThemes` — it manually specifies token set composition per theme for control over which sets are included.
