# Estimation Mock

## Vitest

```typescript
vi.mock('@synerise/ds-estimation', async () => {
  const { estimationMockFactory } = await import('@synerise/ds-mocks');
  return { ...estimationMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockEstimation();
```

## Available test IDs

- `ds-estimation` (default)
- Custom via `data-testid` prop
