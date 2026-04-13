# Filter Mock

Mock for `@synerise/ds-filter` component.

## Vitest

```typescript
vi.mock('@synerise/ds-filter', async () => {
  const { filterMockFactory } = await import('@synerise/ds-mocks');
  return { ...filterMockFactory() };
});
```

## Jest

```typescript
import { jest as filterMocks } from '@synerise/ds-mocks/Filter';
filterMocks.mockFilter();
```

## Available test IDs

- `ds-filter` (default)
- Custom via `data-testid` prop
