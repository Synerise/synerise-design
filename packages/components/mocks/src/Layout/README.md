# Layout Mock

Mock for `@synerise/ds-layout` package including Layout and Page.

## Vitest

```typescript
vi.mock('@synerise/ds-layout', async () => {
  const { layoutMockFactory } = await import('@synerise/ds-mocks');
  return { ...layoutMockFactory() };
});

// Query elements
screen.getByTestId('ds-layout');
screen.getByTestId('ds-page');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Layout';

jestMocks.mockLayout();

// Query elements
screen.getByTestId('ds-layout');
screen.getByTestId('ds-page');
```

## Mocked Components

### Layout (default export)
- Renders div with `data-testid="ds-layout"`
- Supports `children`, `className`

### Page (named export)
- Renders div with `data-testid="ds-page"`
- Supports `children`, `className`

## Available Test IDs

- `ds-layout` - Main layout container
- `ds-page` - Page container
