# Cascader Mocks

Mock for `@synerise/ds-cascader` package including `Cascader` and `Breadcrumb`.

## Vitest

```typescript
vi.mock('@synerise/ds-cascader', async () => {
  const { cascaderMockFactory } = await import('@synerise/ds-mocks');
  return { ...cascaderMockFactory() };
});

// Query elements
screen.getByTestId('ds-cascader');
screen.getByTestId('ds-cascader-breadcrumb');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Cascader';

jestMocks.mockCascader();

// Query elements
screen.getByTestId('ds-cascader');
screen.getByTestId('ds-cascader-breadcrumb');
```

## Mocked Components

### Cascader (default export)
- `Cascader` - div container with children, rootCategory, path, and onPathChange support

### Named Exports
- `Breadcrumb` - div container with path and children support

## Available Test IDs

- `ds-cascader` - Main Cascader container
- `ds-cascader-breadcrumb` - Breadcrumb container
