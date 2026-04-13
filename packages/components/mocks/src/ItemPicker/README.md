# ItemPicker Mocks

Mock for `@synerise/ds-item-picker` package including `ItemPicker`, `ItemPickerNew`, `ItemPickerLegacy`, `ItemPickerList`, `ItemPickerTrigger`, and `findSectionById`.

## Vitest

```typescript
vi.mock('@synerise/ds-item-picker', async () => {
  const { itemPickerMockFactory } = await import('@synerise/ds-mocks');
  return { ...itemPickerMockFactory() };
});

// Query elements
screen.getByTestId('ds-item-picker');
screen.getByTestId('ds-item-picker-new');
screen.getByTestId('ds-item-picker-legacy');
screen.getByTestId('ds-item-picker-list');
screen.getByTestId('ds-item-picker-trigger');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/ItemPicker';

jestMocks.mockItemPicker();

// Query elements
screen.getByTestId('ds-item-picker');
screen.getByTestId('ds-item-picker-new');
```

## Mocked Components

### ItemPicker (default export)
- `ItemPicker` - div container with children support

### Named Exports
- `ItemPickerNew` - div container with children support
- `ItemPickerLegacy` - div container with children support
- `ItemPickerList` - div container accepting dataSource
- `ItemPickerTrigger` - div container with children support
- `findSectionById` - mock function returning undefined

## Available Test IDs

- `ds-item-picker` - Main ItemPicker container
- `ds-item-picker-new` - ItemPickerNew container
- `ds-item-picker-legacy` - ItemPickerLegacy container
- `ds-item-picker-list` - ItemPickerList container
- `ds-item-picker-trigger` - ItemPickerTrigger container
