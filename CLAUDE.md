# CLAUDE.md — React Frontend (Synerise)

## Project Standards
- React 18+ with TypeScript, monorepo (Lerna/Yarn Workspaces or Turborepo)
- Micro-frontend SPA pattern — independent apps with own Redux stores
- Ant Design as base UI library, styled-components for custom styling
- Functional components with hooks for all new code

## Code Quality
- ESLint + Prettier (120 char lines, single quotes, 2-space indent)
- Relative imports only — no path aliases
- Named exports preferred, PascalCase components, camelCase utilities
- TypeScript `strict: true`, no `any` — use `unknown` + type guards

## Components & State
- Redux Toolkit (`createSlice`) for new code, Redux Saga for side effects
- RSAA middleware for API calls (REQUEST/SUCCESS/FAILURE lifecycle)
- Keep local state in `useState`/`useReducer`, lift to Redux only when shared
- styled-components with design system tokens — no hardcoded values

## Testing
- Vitest (preferred) or Jest with jsdom, React Testing Library
- Co-located tests: `*.test.tsx` next to source
- MSW for API mocking in integration tests
- 80% minimum coverage on business logic and shared components

## API & Auth
- Cookie-based auth with XSRF-TOKEN, CASL permission system
- `PermissionRoute` for route access, `Can` for UI-level permissions
- OpenAPI-generated clients for newer services
- Environment-based endpoint resolution (`REACT_APP_API_*`)

## Security
- No secrets in code — use environment variables
- Validate all user inputs, sanitize rendered content (XSS prevention)
- CSRF protection via XSRF-TOKEN cookie

## Build & Deploy
- Webpack via react-app-rewired, environment-specific `.env` files
- **NEVER push directly to `master`** — always use a feature branch + merge request
- Branches: `<type>/JiraTaskId` (e.g. `feature/REKO-1885`, `fix/ADMIN-4321`)
- Commits: `<type>(JiraTaskId): <description>` — JiraTaskId required when linked to Jira task
- Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`, `ci`, `build`, `style`, `revert`
- Squash on merge to master — Semantic Release auto-versions from squash message
- Version bumps: `fix`/`perf`/`revert`/etc = PATCH, `feat` = MINOR, `BREAKING CHANGE:` footer = MAJOR
- Tags: `vMAJOR.MINOR.PATCH`, CHANGELOG.md auto-generated (fix, feat, perf, revert)
- CI: lint -> build -> test -> security -> integration -> deploy

## Team: DS
<!-- Add 3-8 bullet points summarizing key team rules -->
