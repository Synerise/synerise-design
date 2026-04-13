# CardTabs Mock

Mock for `@synerise/ds-card-tabs` package including CardTabs, CardTab, prefixType, CardDot, and CardTabsStyles.

## Vitest

```typescript
vi.mock('@synerise/ds-card-tabs', async () => {
  const { cardTabsMockFactory } = await import('@synerise/ds-mocks');
  return { ...cardTabsMockFactory() };
});

// Query elements
screen.getByTestId('ds-card-tabs');
screen.getByTestId('ds-card-tab');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/CardTabs';

jestMocks.mockCardTabs();

// Query elements
screen.getByTestId('ds-card-tabs');
screen.getByTestId('ds-card-tab');
```

## Mocked Components

### CardTabs (default export)
- Renders div with `data-testid="ds-card-tabs"`
- Supports `children`, `className`

### CardTab (named export)
- Renders div with `data-testid="ds-card-tab"`
- Supports `children`, `name`, `active`

### Other Exports
- `prefixType` - Empty object mock
- `CardDot` - vi.fn returning null
- `CardTabsStyles` - Empty object mock

## Available Test IDs

- `ds-card-tabs` - Main container
- `ds-card-tab` - Individual card tab
