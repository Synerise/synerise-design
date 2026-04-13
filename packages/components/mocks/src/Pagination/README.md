# Pagination Mock

## Vitest

```typescript
vi.mock('@synerise/ds-pagination', async () => {
  const { paginationMockFactory } = await import('@synerise/ds-mocks');
  return { ...paginationMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockPagination();
```

## Available test IDs

- `ds-pagination` (default)
- `ds-pagination-prev` — previous page button
- `ds-pagination-next` — next page button
- Custom via `data-testid` prop
