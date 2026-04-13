# ItemFilter Mock

Mock for `@synerise/ds-item-filter` component.

## Vitest

```typescript
vi.mock('@synerise/ds-item-filter', async () => {
  const { itemFilterMockFactory } = await import('@synerise/ds-mocks');
  return { ...itemFilterMockFactory() };
});
```

## Jest

```typescript
import { jest as itemFilterMocks } from '@synerise/ds-mocks/ItemFilter';
itemFilterMocks.mockItemFilter();
```

## Available test IDs

- `ds-item-filter` (default)
- Custom via `data-testid` prop
