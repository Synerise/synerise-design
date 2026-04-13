# InlineAlert Mock

## Vitest

```typescript
vi.mock('@synerise/ds-inline-alert', async () => {
  const { inlineAlertMockFactory } = await import('@synerise/ds-mocks');
  return { ...inlineAlertMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockInlineAlert();
```

## Available test IDs

- `ds-inline-alert` (default)
- Custom via `data-testid` prop
