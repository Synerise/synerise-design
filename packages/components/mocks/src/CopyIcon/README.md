# CopyIcon Mock

## Vitest

```typescript
vi.mock('@synerise/ds-copy-icon', async () => {
  const { copyIconMockFactory } = await import('@synerise/ds-mocks');
  return { ...copyIconMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockCopyIcon();
```

## Available test IDs

- `ds-copy-icon` (default)
- Custom via `data-testid` prop
