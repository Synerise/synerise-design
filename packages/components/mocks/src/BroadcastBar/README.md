# BroadcastBar Mock

## Vitest

```typescript
vi.mock('@synerise/ds-broadcast-bar', async () => {
  const { broadcastBarMockFactory } = await import('@synerise/ds-mocks');
  return { ...broadcastBarMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockBroadcastBar();
```

## Available test IDs

- `ds-broadcast-bar` (default)
- Custom via `data-testid` prop
