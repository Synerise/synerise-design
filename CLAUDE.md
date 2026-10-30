# CLAUDE.md — Synerise Design System

## Project Overview
- Component library / design system — publishes `@synerise/ds-*` packages to npm
- React 18.3 + TypeScript 7, monorepo via **pnpm workspaces + Lerna** (`"npmClient": "pnpm"`)
- TypeScript runs side by side: `tsc` (each package's `types` script) is the native TS 7 compiler
  (`@typescript/native`), while the `typescript` package name is aliased to `@typescript/typescript6`,
  because TS 7.0 ships no compiler API and vite-plugin-dts, Storybook docgen, madge and Code Connect
  still import one. A package that pulls in a `typescript` peer must list that alias itself (see
  ds-avatar/flag/icon); otherwise pnpm links an older `tsc` into its `.bin`, which shadows TS 7
- styled-components for all styling; **antd has been fully removed** (see `docs/adr/0001-remove-antd-dependency.md`) — never reintroduce it, biome bans the import
- Functional components with hooks for all new code

## Code Quality
- **Biome** for lint + format + import order (80 char lines, single quotes, 2-space indent).
  `pnpm lint` / `pnpm lint:fix` / `pnpm format` / `pnpm check` — `pnpm lint:ci` is the CI gate.
  Suppress a rule with `// biome-ignore lint/<group>/<rule>: <reason>` (the reason is mandatory)
- Custom lint rules are GritQL plugins in `config/biome/plugins/`, registered in `biome.json` and
  tested against `config/biome/__fixtures__/` by `pnpm check:biome-plugins` (CI `install` job).
  `no-random-jsx-key` rejects a `key` built from `uuid()`/`Math.random()`/`Date.now()` and similar
  (STOR-2365); suppress with `// biome-ignore lint/plugin/no-random-jsx-key: <reason>`
- Never call `crypto.randomUUID()` (or any `crypto` API) directly in a component package — use
  `generateUuid()` from `@synerise/ds-utils`. The DS is published publicly, and `crypto.randomUUID`
  only exists in secure contexts, so it is `undefined` for any consumer served over plain http
- **knip** keeps every `package.json` in sync with its imports (`pnpm build && pnpm knip`; `pnpm knip:ci`
  gates CI after the build). A runtime import must be declared in the package's **own** manifest — the
  root one does not count — and anything the published `d.ts` imports belongs in `dependencies`, not
  `devDependencies`. A false positive goes in `knip.config.ts` with a comment explaining why (see `CONTRIBUTING.md`)
- Relative imports only — no path aliases
- Named exports preferred, PascalCase components, camelCase utilities
- TypeScript `strict: true`, no `any` — use `unknown` + type guards

## Components
- styled-components with design system tokens — no hardcoded values
- Keep local state in `useState`/`useReducer`
- No Redux — this is a UI component library, not an app

## Testing
- **Vitest** in every package (`vitest run`), jsdom environment, React Testing Library
- Co-located tests: `*.test.tsx` next to source
- 80% minimum coverage on business logic and shared components
- Test config lives **only** in the `test` block of the root `vite.config.base.ts`. Per-package
  `vitest.*.config.*` files are rejected by `pnpm check:no-package-test-config` in CI — they replace the
  base `test`/`resolve` blocks instead of merging, silently dropping `setupFiles` and the source resolution
- `pnpm check:token-references` (after `pnpm build`, and in the CI build job) fails when a `var(--ds-*)` or `theme.tokens['--ds-*']` in component or Storybook source names a custom property missing from either theme, unless the file — or its own package, or a workspace package it depends on — declares it. jsdom cannot resolve `var()`, so a spec that only checks a token string appears in the CSS cannot catch a typo; this does. Its parsing and resolution rules live in `scripts/token-references.mjs`, specced by `pnpm test:scripts` (Vitest over `scripts/**/__specs__`, chained into `pnpm test:ci`)
- Specs assert behaviour, not token data: never compare against a resolved token value, and never assert that two themes' values differ — stub `@synerise/ds-tokens/light`/`dark` with marker maps instead. A spec that only restates which token a static style uses duplicates Chromatic; keep token assertions for choices (state, type mapping, fallback, override)
- Specs resolve `@synerise/*` imports from the sibling package's **`src/`**, not its built `dist/`, so a
  cross-package change is visible without rebuilding the dependency (`dsTestSourceRedirectPlugin`)
- Prerequisite: the generated sources (`pnpm run generate` — core theme variables, icon/flag/avatar SVGR
  output). The root `postinstall` does this; a fresh **git worktree** or `--ignore-scripts` install does not,
  and the test run fails fast naming the command
- Stories: read `packages/storybook/README.md` before adding or changing one — it says which stories
  Chromatic snapshots (`NO_SNAPSHOT`), and `play` functions run in CI via `pnpm test-storybook`
- `DS_TEST_FROM_SOURCE=0` sends **bare** imports back to `dist` for one run; deep `@synerise/ds-x/dist/...`
  imports always resolve from source (the `exports` map cannot resolve them). `DS_TEST_RESOLVE_DEBUG=1`
  logs every redirect

## Build & Deploy
- Component packages built with **Vite** (shared config in `vite.config.base.ts`, per-package `vite.config.ts`)
- Output: individual ESM files (1:1 src→dist mapping via `preserveModules`), not bundled
- TypeScript declarations generated by `vite-plugin-dts`
- Storybook uses **Vite** via `@storybook/react-vite`
- Package manager: **pnpm 11.26.0**, pinned exactly in `engines`, `packageManager` and the CI install
  step. Settings live in `pnpm-workspace.yaml`; pnpm 11 reads only auth and registry keys from `.npmrc`
- **NEVER push directly to `master`** — always use a feature branch + merge request
- Branches: `<type>/<short-description>` (e.g. `feature/ai-icon`, `fix/toast-animation`)
- Commits: `<type>: <description>`
- Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`, `ci`, `build`, `style`, `revert`
- Squash on merge to master — Semantic Release auto-versions from squash message
- Version bumps: `fix`/`perf`/`revert`/etc = PATCH, `feat` = MINOR, `BREAKING CHANGE:` footer = MAJOR
- Tags: `vMAJOR.MINOR.PATCH`, CHANGELOG.md auto-generated (fix, feat, perf, revert)
- CI: lint -> build -> test -> security -> integration -> deploy

## Team: DS

## Available Components
All packages live under `packages/components/<name>` and are published as `@synerise/ds-<name>`.

`action-area` · `app-menu` · `autocomplete` · `avatar` · `avatar-group` · `badge` · `banner` · `block` · `broadcast-bar` · `button` · `button-group` · `card` · `card-select` · `card-tabs` · `cascader` · `checkbox` · `checkbox-tristate` · `code-area` · `code-snippet` · `collector` · `color-picker` · `column-manager` · `completed-within` · `condition` · `confirmation` · `context-selector` · `copy-icon` · `core` · `cruds` · `data-format` · `date-picker` · `date-range-picker` · `description` · `design-system` · `divider` · `drawer` · `dropdown` · `editable-items-list` · `emoji-picker` · `empty-states` · `estimation` · `factors` · `field-set` · `file-uploader` · `filter` · `flag` · `flex-box` · `footer` · `form` · `form-field` · `format-picker` · `grid` · `icon` · `icon-picker` · `information-card` · `inline-alert` · `inline-edit` · `input` · `input-number` · `insight` · `item-filter` · `item-picker` · `items-roll` · `layout` · `list` · `list-item` · `loader` · `logic` · `manageable-list` · `mapping` · `metric-card` · `mocks` · `modal` · `navbar` · `operators` · `ordered-list` · `page-header` · `pagination` · `panel` · `panels-resizer` · `popconfirm` · `popover` · `progress-bar` · `radio` · `result` · `scrollbar` · `search` · `search-bar` · `section-message` · `select` · `short-cuts` · `sidebar` · `sidebar-object` · `skeleton` · `slider` · `sortable` · `status` · `step-card` · `stepper` · `subject` · `subtle-form` · `switch` · `table-new` · `tabs` · `tag` · `tags` · `time-picker` · `toast` · `toolbar` · `tooltip` · `tray` · `typography` · `unordered-list` · `utils` · `wizard`
