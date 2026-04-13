# Badge Mock

## Vitest

```typescript
vi.mock('@synerise/ds-badge', async () => {
  const { badgeMockFactory } = await import('@synerise/ds-mocks');
  return { ...badgeMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockBadge();
```

## Available test IDs

- `ds-badge` (default)
- Custom via `data-testid` prop
