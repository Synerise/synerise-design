# Status Mock

## Vitest

```typescript
vi.mock('@synerise/ds-status', async () => {
  const { statusMockFactory } = await import('@synerise/ds-mocks');
  return { ...statusMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockStatus();
```

## Available test IDs

- `ds-status` (default)
- Custom via `data-testid` prop
