# Grid Mock

Mock for `@synerise/ds-grid` package including Grid and Grid.Item.

## Vitest

```typescript
vi.mock('@synerise/ds-grid', async () => {
  const { gridMockFactory } = await import('@synerise/ds-mocks');
  return { ...gridMockFactory() };
});

// Query elements
screen.getByTestId('ds-grid');
screen.getByTestId('ds-grid-item');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Grid';

jestMocks.mockGrid();

// Query elements
screen.getByTestId('ds-grid');
screen.getByTestId('ds-grid-item');
```

## Mocked Components

### Grid (default export)
- Renders div with `data-testid="ds-grid"`
- Supports `className`, `columns`
- Has static `Grid.Item` sub-component via `Object.assign`

### Grid.Item
- Renders div with `data-testid="ds-grid-item"`
- Supports `span`

## Available Test IDs

- `ds-grid` - Main grid container
- `ds-grid-item` - Grid item
