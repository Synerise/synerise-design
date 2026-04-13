# Insight Mock

## Vitest

```typescript
vi.mock('@synerise/ds-insight', async () => {
  const { insightMockFactory } = await import('@synerise/ds-mocks');
  return { ...insightMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockInsight();
```

## Available test IDs

- `ds-insight` (default)
- Custom via `data-testid` prop
