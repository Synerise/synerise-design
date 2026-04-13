# Loader Mock

## Vitest

```typescript
vi.mock('@synerise/ds-loader', async () => {
  const { loaderMockFactory } = await import('@synerise/ds-mocks');
  return { ...loaderMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockLoader();
```

## Available test IDs

- `ds-loader` (default)
- Custom via `data-testid` prop
