# Flag Mock

## Vitest

```typescript
vi.mock('@synerise/ds-flag', async () => {
  const { flagMockFactory } = await import('@synerise/ds-mocks');
  return { ...flagMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockFlag();
```

## Available test IDs

- `ds-flag` (default)
- Custom via `data-testid` prop
