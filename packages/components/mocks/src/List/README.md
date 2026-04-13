# List Mock

Mock for `@synerise/ds-list` package including List, List.Item, List.ItemWrapper, and List.Divider.

## Vitest

```typescript
vi.mock('@synerise/ds-list', async () => {
  const { listMockFactory } = await import('@synerise/ds-mocks');
  return { ...listMockFactory() };
});

// Query elements
screen.getByTestId('ds-list');
screen.getByTestId('ds-list-item');
screen.getByTestId('ds-list-item-icon');
screen.getByTestId('ds-list-item-text');
screen.getByTestId('ds-list-item-wrapper');
screen.getByTestId('ds-list-divider');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/List';

jestMocks.mockList();

// Query elements
screen.getByTestId('ds-list');
screen.getByTestId('ds-list-item');
```

## Mocked Components

### List (default export)
- Renders div with `data-testid="ds-list"`
- Supports `className`, `dataSource`
- Has static sub-components via `Object.assign`: `List.Item`, `List.ItemWrapper`, `List.Divider`

### List.Item
- Renders div with `data-testid="ds-list-item"`
- Supports `text`, `icon`, `onClick`, `disabled`

### List.ItemWrapper
- Renders div with `data-testid="ds-list-item-wrapper"`

### List.Divider
- Renders hr with `data-testid="ds-list-divider"`

## Available Test IDs

- `ds-list` - Main list container
- `ds-list-item` - List item
- `ds-list-item-icon` - List item icon
- `ds-list-item-text` - List item text
- `ds-list-item-wrapper` - List item wrapper
- `ds-list-divider` - List divider
