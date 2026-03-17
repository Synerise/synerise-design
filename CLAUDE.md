# CLAUDE.md — Synerise Design System

## Project Overview
- Component library / design system — publishes `@synerise/ds-*` packages to npm
- React 18.3 + TypeScript 5.8, monorepo via **pnpm workspaces + Lerna** (`"npmClient": "pnpm"`)
- Ant Design 4.x as base UI library, styled-components for custom styling
- Functional components with hooks for all new code

## Code Quality
- ESLint + Prettier (120 char lines, single quotes, 2-space indent)
- Relative imports only — no path aliases
- Named exports preferred, PascalCase components, camelCase utilities
- TypeScript `strict: true`, no `any` — use `unknown` + type guards

## Components
- styled-components with design system tokens — no hardcoded values
- Keep local state in `useState`/`useReducer`
- No Redux — this is a UI component library, not an app

## Testing
- **Vitest** (primary, most packages) or Jest (older packages still being migrated)
- jsdom environment, React Testing Library
- Co-located tests: `*.test.tsx` next to source
- 80% minimum coverage on business logic and shared components

## Build & Deploy
- Component packages built with **Babel CLI** (`babel --root-mode upward src --out-dir dist`)
- Storybook uses **webpack 5** via `@storybook/react-webpack5`
- Package manager: **pnpm ^10** (`engines` enforced)
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

`action-area` · `alert` · `app-menu` · `autocomplete` · `avatar` · `avatar-group` · `badge` · `banner` · `block` · `broadcast-bar` · `button` · `button-group` · `card` · `card-select` · `card-tabs` · `cascader` · `checkbox` · `checkbox-tristate` · `code-area` · `code-snippet` · `collector` · `color-picker` · `column-manager` · `completed-within` · `condition` · `confirmation` · `context-selector` · `copy-icon` · `core` · `cruds` · `data-format` · `date-picker` · `date-range-picker` · `description` · `design-system` · `divider` · `drawer` · `dropdown` · `editable-items-list` · `emoji-picker` · `empty-states` · `estimation` · `factors` · `field-set` · `file-uploader` · `filter` · `flag` · `flex-box` · `footer` · `form` · `form-field` · `format-picker` · `grid` · `icon` · `icon-picker` · `information-card` · `inline-alert` · `inline-edit` · `input` · `input-number` · `insight` · `item-filter` · `item-picker` · `items-roll` · `layout` · `list` · `list-item` · `loader` · `logic` · `manageable-list` · `mapping` · `menu` · `metric-card` · `mocks` · `modal` · `navbar` · `operators` · `ordered-list` · `page-header` · `pagination` · `panel` · `panels-resizer` · `popconfirm` · `popover` · `progress-bar` · `radio` · `result` · `scrollbar` · `search` · `search-bar` · `section-message` · `select` · `short-cuts` · `sidebar` · `sidebar-object` · `skeleton` · `slider` · `sortable` · `status` · `step-card` · `stepper` · `subject` · `subtle-form` · `switch` · `table` · `table-new` · `tabs` · `tag` · `tags` · `time-picker` · `toast` · `toolbar` · `tooltip` · `tray` · `typography` · `unordered-list` · `utils` · `wizard`
