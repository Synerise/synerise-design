# Tokens (`@synerise/ds-tokens`)

> Design tokens for the Synerise Design System — sourced from Token Studio, processed by Style Dictionary v4 into CSS custom properties.

## Package structure

```
tokens/                         — Token Studio JSON sources (synced from external repo)
  primitives/core.json          — raw color palettes, typography, spacing, radii, shadows
  semantic/Light.json           — light theme semantic mappings
  semantic/Dark.json            — dark theme semantic mappings
  semantic/custom-color/*.json  — 12 brand color theme files
  modules/base.json             — component-level token definitions (full set)
  modules/colors-only.json      — color-only subset extracted from base.json (used by build)
  surface/base.json             — elevation/surface tokens
  $metadata.json                — token set ordering
  $themes.json                  — theme configuration with Figma references
config/
  build-tokens.mjs              — Style Dictionary v4 build script
scripts/
  sync-tokens.sh                — fetches latest JSON from Token Studio GitHub repo
src/
  index.ts                      — placeholder (real exports are generated in dist/)
dist/
  css/light.css                 — CSS custom properties for light theme (:root selector)
  css/dark.css                  — CSS custom properties for dark theme ([data-ds-theme="dark"])
  js/light.js                   — exports cssText string (light theme var declarations)
  js/dark.js                    — exports cssText string (dark theme var declarations)
  js/index.js                   — re-exports light.js as default
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
4. Generates JS modules exporting CSS as string constants
5. Currently filters to **color tokens only** — spacing, typography, etc. deferred

### Token filtering

`modules/base.json` contains all component tokens (776 total, many non-color types with unresolved references to spacing/border/opacity primitives). The build uses `modules/colors-only.json` — a color-only extract (section-message: 24 tokens) — to avoid reference errors.

When adding a new component's tokens, re-run the filter or extend `colors-only.json`.

## How tokens are consumed

1. `@synerise/ds-core` depends on this package
2. `GlobalTokenStyles` (in ds-core's ThemeProvider) imports `cssText` from `@synerise/ds-tokens`
3. Injects all CSS vars on `:root` via `createGlobalStyle`
4. Components use `var(--ds-section-message-variant-success-bg)` in styled-components

## Syncing tokens from Token Studio

```bash
pnpm sync                     # runs: bash scripts/sync-tokens.sh
```

Pulls latest JSON from https://github.com/piotrzarebski2/design-tokens/tree/main/tokens. After syncing, rebuild with `pnpm build`.

## Naming convention

CSS var names follow `--ds-{path}` with kebab-case path segments:

| Tier | Pattern | Example |
|------|---------|---------|
| Primitive | `--ds-color-{family}-{shade}` | `--ds-color-green-50` |
| Semantic | `--ds-color-{category}-{variant}-{intensity}` | `--ds-color-background-success-subtle` |
| Component | `--ds-{component}-{property-path}` | `--ds-section-message-variant-success-bg` |

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
- Custom color files (`semantic/custom-color/*.json`) all define the same `color.custom.*` tokens. Only one should be included per theme build — currently `blue.json` is used as default.
- The `$themes.json` file defines Token Studio theme permutations including Figma variable references. The build script does not use `permutateThemes` — it manually specifies token set composition per theme for control over which sets are included.
