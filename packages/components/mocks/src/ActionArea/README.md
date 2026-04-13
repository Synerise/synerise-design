# ActionArea Mock

## Vitest

```typescript
vi.mock('@synerise/ds-action-area', async () => {
  const { actionAreaMockFactory } = await import('@synerise/ds-mocks');
  return { ...actionAreaMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockActionArea();
```

## Available test IDs

- `ds-action-area` (default)
- Custom via `data-testid` prop
