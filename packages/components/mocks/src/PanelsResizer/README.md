# PanelsResizer Mock

## Vitest

```typescript
vi.mock('@synerise/ds-panels-resizer', async () => {
  const { panelsResizerMockFactory } = await import('@synerise/ds-mocks');
  return { ...panelsResizerMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockPanelsResizer();
```

## Available test IDs

- `ds-panels-resizer` (default)
- Custom via `data-testid` prop
