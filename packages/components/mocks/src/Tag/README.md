# Tag Mock

## Vitest

```typescript
vi.mock('@synerise/ds-tag', async () => {
  const { tagMockFactory } = await import('@synerise/ds-mocks');
  return { ...tagMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockTag();
```

## Available test IDs

- `ds-tag` (default)
- `ds-tag-remove` (remove button, when removable)
- Custom via `data-testid` prop
