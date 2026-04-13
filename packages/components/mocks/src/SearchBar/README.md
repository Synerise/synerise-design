# SearchBar Mock

## Vitest

```typescript
vi.mock('@synerise/ds-search-bar', async () => {
  const { searchBarMockFactory } = await import('@synerise/ds-mocks');
  return { ...searchBarMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockSearchBar();
```

## Available test IDs

- `ds-search-bar` (default)
- `ds-search-bar-input` — search input
- `ds-search-bar-clear` — clear button (shown when value is non-empty)
- Custom via `data-testid` prop
