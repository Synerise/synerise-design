# OrderedList Mock

## Vitest

```typescript
vi.mock('@synerise/ds-ordered-list', async () => {
  const { orderedListMockFactory } = await import('@synerise/ds-mocks');
  return { ...orderedListMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockOrderedList();
```

## Available test IDs

- `ds-ordered-list` (default)
- Custom via `data-testid` prop
