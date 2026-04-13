# ShortCuts Mock

## Vitest

```typescript
vi.mock('@synerise/ds-short-cuts', async () => {
  const { shortCutsMockFactory } = await import('@synerise/ds-mocks');
  return { ...shortCutsMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockShortCuts();
```

## Available test IDs

- `ds-short-cuts` (default)
- Custom via `data-testid` prop
