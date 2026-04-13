# ListItem Mock

Mock for `@synerise/ds-list-item` package including ListItem, HoverTooltip, GroupItem, ListWrapper, useListContext, and ListContextProvider.

## Vitest

```typescript
vi.mock('@synerise/ds-list-item', async () => {
  const { listItemMockFactory } = await import('@synerise/ds-mocks');
  return { ...listItemMockFactory() };
});

// Query elements
screen.getByTestId('ds-list-item-component');
screen.getByTestId('ds-hover-tooltip');
screen.getByTestId('ds-group-item');
screen.getByTestId('ds-list-wrapper');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/ListItem';

jestMocks.mockListItem();

// Query elements
screen.getByTestId('ds-list-item-component');
screen.getByTestId('ds-hover-tooltip');
screen.getByTestId('ds-group-item');
screen.getByTestId('ds-list-wrapper');
```

## Mocked Components

### ListItem (default export)
- Renders div with `data-testid="ds-list-item-component"`
- Uses `-component` suffix to avoid clash with List.Item
- Supports `children`, `className`, `onClick`, `disabled`

### HoverTooltip (named export)
- Renders div with `data-testid="ds-hover-tooltip"`
- Supports `children`

### GroupItem (named export)
- Renders div with `data-testid="ds-group-item"`
- Supports `children`

### ListWrapper (named export)
- Renders div with `data-testid="ds-list-wrapper"`
- Supports `children`

### useListContext (named export)
- Returns empty object `{}`

### ListContextProvider (named export)
- Renders fragment wrapping children

## Available Test IDs

- `ds-list-item-component` - Main list item container
- `ds-hover-tooltip` - Hover tooltip
- `ds-group-item` - Group item
- `ds-list-wrapper` - List wrapper
