# MetricCard Mock

## Vitest

```typescript
vi.mock('@synerise/ds-metric-card', async () => {
  const { metricCardMockFactory } = await import('@synerise/ds-mocks');
  return { ...metricCardMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockMetricCard();
```

## Available test IDs

- `ds-metric-card` (default)
- Custom via `data-testid` prop
