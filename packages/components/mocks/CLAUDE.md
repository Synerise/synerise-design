# Mocks (`@synerise/ds-mocks`)

> Standardized Vitest and Jest mock factories for all `@synerise/ds-*` component packages. Eliminates ad-hoc manual `vi.mock()` / `jest.mock()` boilerplate in consumer test files.

## Package structure

```
src/
  {ComponentName}/
    vi.tsx          — Vitest factory functions (exported from main barrel)
    jest.tsx        — Jest mock functions (exported via jest barrel)
    index.ts        — re-exports from vi.tsx
    README.md       — per-component usage docs
  index.ts          — main barrel: re-exports all vi.tsx + `export * as jest`
  jest.ts           — Jest barrel: re-exports all jest.tsx
```

111 component directories, each following the identical 4-file pattern.

## How it works

### Vitest pattern (factory functions)

Factories return a module-shaped object compatible with `vi.mock()`:

```typescript
// Consumer test file
vi.mock('@synerise/ds-button', async () => {
  const { buttonMockFactory } = await import('@synerise/ds-mocks');
  return { ...buttonMockFactory() };
});
```

- `{component}MockFactory()` — full mock: renders HTML with `data-testid`, forwards key props
- `{component}MinimalMockFactory()` — returns `null` for all exports

Factories use `vi.fn()` to wrap components, enabling `toHaveBeenCalledWith()` assertions.

### Jest pattern (wrapper functions)

Functions call `jest.mock()` internally:

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockButton();       // full mock
dsMocks.mockButtonMinimal(); // null mock
```

### Barrel exports

| Entry | What it exports |
|-------|----------------|
| `@synerise/ds-mocks` (default) | All `*MockFactory` + `*MinimalMockFactory` + `Mock*Props` types from every component's `vi.tsx` |
| `@synerise/ds-mocks` → `jest` namespace | All `mock*` + `mock*Minimal` functions from every component's `jest.tsx` |

### tsconfig exclusions

`jest.tsx` files are excluded from TypeScript compilation (`tsconfig.json` → `exclude`). They use `jest.fn()`/`jest.mock()` globals that are not available in the Vitest-oriented build. The Jest barrel (`jest.ts`) is compiled but its re-exports resolve at consumer build time.

## Mock complexity tiers

| Tier | Pattern | Example |
|------|---------|---------|
| **Simple** | `{ default: vi.fn(component) }` | Badge, Loader, Divider |
| **Compound** | `Object.assign(vi.fn(component), { SubComponent: vi.fn(...) })` | Menu (6 statics), Drawer (6 statics), Form (FieldSet + EditableList) |
| **Named exports** | `{ default: ..., NamedExport: vi.fn(...) }` | FlexBox (Flex + Box, no default), Typography (7 named), Search (5 sub-components) |
| **Imperative** | Static methods + standalone functions | Toast (showToast, dismissToast + Toast.success/error/info/warning) |

## Naming conventions

| Item | Convention | Example |
|------|-----------|---------|
| Directory | PascalCase of component concept | `FlexBox/`, `DateRangePicker/`, `TableNew/` |
| Vitest factory | `{camelCase}MockFactory` | `buttonMockFactory`, `dateRangePickerMockFactory` |
| Vitest minimal | `{camelCase}MinimalMockFactory` | `buttonMinimalMockFactory` |
| Jest mock | `mock{PascalCase}` | `mockButton`, `mockDateRangePicker` |
| Jest minimal | `mock{PascalCase}Minimal` | `mockButtonMinimal` |
| Props type | `Mock{PascalCase}Props` | `MockButtonProps`, `MockTableProps` |
| Default test ID | `ds-{kebab-case}` | `ds-button`, `ds-date-range-picker` |
| Sub-component test ID | `{parentTestId}-{sub}` | `ds-modal-title`, `ds-menu-item` |

## Adding a new mock

1. Create `src/{ComponentName}/` with 4 files matching the pattern of an existing mock at the same complexity tier
2. Add `export * from './{ComponentName}'` to `src/index.ts`
3. Add `export * from './{ComponentName}/jest'` to `src/jest.ts`
4. Add `@synerise/ds-{name}` to `peerDependencies` in `package.json` (if not already present)
5. Build: `pnpm --filter @synerise/ds-mocks build`

No `package.json` peerDependency changes are needed for existing components — all 118 `@synerise/ds-*` packages are already declared.

## Build

- **Bundler:** Vite (shared config from `vite.config.base.ts`)
- **Output:** individual ESM files per component (preserveModules), not bundled
- **DTS:** `vite-plugin-dts` generates declarations; `vi` global type errors are expected and non-blocking (from `vitest/globals` ambient types not visible to the DTS compiler)
- **Build command:** `pnpm --filter @synerise/ds-mocks build`

## Key dependencies

| Dependency | Role |
|-----------|------|
| `vitest` (devDep) | Provides `vi` global types for factory functions |
| All `@synerise/ds-*` (peerDeps) | Type imports for `Mock*Props` types |
| `react` (peerDep) | JSX rendering in mock components |

## Implementation notes

- **`vi` is a global** — factory functions reference `vi.fn()` without importing it. This requires `globals: true` in the consumer's Vitest config. The `global.d.ts` at repo root imports `vitest/globals` for type support.
- **Scrollbar is vitest-only** — the original `Scrollbar` mock has no `jest.tsx` file and is excluded from `src/jest.ts`. All newer mocks include both.
- **No `__esModule` in vitest factories** — Vitest handles ESM natively. Jest mocks include `__esModule: true`.
- **`data-testid` passthrough** — every mock accepts `data-testid` as a prop. If the component under test passes it, the mock uses it; otherwise falls back to the `ds-{name}` default.
- **Compound components use `Object.assign`** — static sub-components (e.g., `Menu.Item`, `Drawer.DrawerHeader`) are attached via `Object.assign(vi.fn(main), { Sub: vi.fn(sub) })`.
- **Type imports from package roots** — mocks import types from `@synerise/ds-{name}` (package root), not deep paths. When the root doesn't export a needed type, a simplified inline type is defined in the mock.
