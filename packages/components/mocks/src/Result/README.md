# Result Mock

## Vitest

```typescript
vi.mock('@synerise/ds-result', async () => {
  const { resultMockFactory } = await import('@synerise/ds-mocks');
  return { ...resultMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockResult();
```

## Available test IDs

- `ds-result` (default)
- `ds-result-title` — title slot
- `ds-result-description` — description slot
- Custom via `data-testid` prop
