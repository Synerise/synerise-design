# Divider Mock

## Vitest

```typescript
vi.mock('@synerise/ds-divider', async () => {
  const { dividerMockFactory } = await import('@synerise/ds-mocks');
  return { ...dividerMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockDivider();
```

## Available test IDs

- `ds-divider` (default)
- Custom via `data-testid` prop
