# EditableItemsList Mock

## Vitest

```typescript
vi.mock('@synerise/ds-editable-items-list', async () => {
  const { editableItemsListMockFactory } = await import('@synerise/ds-mocks');
  return { ...editableItemsListMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockEditableItemsList();
```

## Available test IDs

- `ds-editable-items-list` (default)
- Custom via `data-testid` prop
