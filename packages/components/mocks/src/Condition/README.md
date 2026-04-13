# Condition Mock

## Vitest

```typescript
vi.mock('@synerise/ds-condition', async () => {
  const { conditionMockFactory } = await import('@synerise/ds-mocks');
  return { ...conditionMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockCondition();
```

## Available test IDs

- `ds-condition` (default)
- Custom via `data-testid` prop
