# ManageableList Mocks

Mock for `@synerise/ds-manageable-list` package including ManageableList, ContentItem, FilterItem, SimpleItem, and AddItem.

## Vitest

```typescript
vi.mock('@synerise/ds-manageable-list', async () => {
  const { manageableListMockFactory } = await import('@synerise/ds-mocks');
  return { ...manageableListMockFactory() };
});

// Query elements
screen.getByTestId('ds-manageable-list');
screen.getByTestId('ds-manageable-list-item-0');
screen.getByTestId('ds-manageable-list-content-item');
screen.getByTestId('ds-manageable-list-filter-item');
screen.getByTestId('ds-manageable-list-simple-item');
screen.getByTestId('ds-manageable-list-add-item');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/ManageableList';

jestMocks.mockManageableList();

// Query elements
screen.getByTestId('ds-manageable-list');
screen.getByTestId('ds-manageable-list-add-item');
```

## Mocked Components

### ManageableList (default export)
- `ManageableList` - renders div with items and children. Items are rendered as divs with `item-{index}` test IDs.

### Named exports
- `ContentItem` - renders div with item name
- `FilterItem` - renders div with item name
- `SimpleItem` - renders div with item name
- `AddItem` - renders button that calls onItemAdd on click

## Available Test IDs

- `ds-manageable-list` - Main container
- `ds-manageable-list-item-{index}` - Individual item rendered by ManageableList
- `ds-manageable-list-content-item` - ContentItem container
- `ds-manageable-list-filter-item` - FilterItem container
- `ds-manageable-list-simple-item` - SimpleItem container
- `ds-manageable-list-add-item` - AddItem button
