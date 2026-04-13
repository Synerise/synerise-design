# ItemsRoll Mock

## Vitest

```typescript
vi.mock('@synerise/ds-items-roll', async () => {
  const { itemsRollMockFactory } = await import('@synerise/ds-mocks');
  return { ...itemsRollMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockItemsRoll();
```

## Available test IDs

- `ds-items-roll` (default)
- Custom via `data-testid` prop
