# InputNumber Mock

## Vitest

```typescript
vi.mock('@synerise/ds-input-number', async () => {
  const { inputNumberMockFactory } = await import('@synerise/ds-mocks');
  return { ...inputNumberMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockInputNumber();
```

## Available test IDs

- `ds-input-number` (default)
- Custom via `data-testid` prop
