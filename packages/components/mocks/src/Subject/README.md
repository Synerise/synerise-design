# Subject Mock

## Vitest

```typescript
vi.mock('@synerise/ds-subject', async () => {
  const { subjectMockFactory } = await import('@synerise/ds-mocks');
  return { ...subjectMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockSubject();
```

## Available test IDs

- `ds-subject` (default)
- Custom via `data-testid` prop
