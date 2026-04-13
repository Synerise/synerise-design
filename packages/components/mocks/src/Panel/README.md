# Panel Mock

## Vitest

```typescript
vi.mock('@synerise/ds-panel', async () => {
  const { panelMockFactory } = await import('@synerise/ds-mocks');
  return { ...panelMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockPanel();
```

## Available test IDs

- `ds-panel` (default)
- Custom via `data-testid` prop
