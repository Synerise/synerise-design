# AppMenu Mocks

Mock for `@synerise/ds-app-menu` package including AppMenu component, useMenu, and useSubMenu hooks.

## Vitest

```typescript
vi.mock('@synerise/ds-app-menu', async () => {
  const { appMenuMockFactory } = await import('@synerise/ds-mocks');
  return { ...appMenuMockFactory() };
});

// Query elements
screen.getByTestId('ds-app-menu');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/AppMenu';

jestMocks.mockAppMenu();

// Query elements
screen.getByTestId('ds-app-menu');
```

## Mocked Components

### AppMenu (default export)
- `AppMenu` - renders div with children and className

### Hooks (named exports)
- `useMenu` - returns `{ isOpen: false, toggle: vi.fn(), close: vi.fn(), open: vi.fn() }`
- `useSubMenu` - returns `{ isOpen: false, toggle: vi.fn(), close: vi.fn(), open: vi.fn() }`

## Available Test IDs

- `ds-app-menu` - Main container
