# UnorderedList Mock

## Vitest

```typescript
vi.mock('@synerise/ds-unordered-list', async () => {
  const { unorderedListMockFactory } = await import('@synerise/ds-mocks');
  return { ...unorderedListMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockUnorderedList();
```

## Available test IDs

- `ds-unordered-list` (default)
- Custom via `data-testid` prop
