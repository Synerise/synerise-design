# Footer Mock

## Vitest

```typescript
vi.mock('@synerise/ds-footer', async () => {
  const { footerMockFactory } = await import('@synerise/ds-mocks');
  return { ...footerMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockFooter();
```

## Available test IDs

- `ds-footer` (default)
- Custom via `data-testid` prop
