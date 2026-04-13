# EmptyStates Mock

## Vitest

```typescript
vi.mock('@synerise/ds-empty-states', async () => {
  const { emptyStatesMockFactory } = await import('@synerise/ds-mocks');
  return { ...emptyStatesMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockEmptyStates();
```

## Available test IDs

- `ds-empty-states` (default)
- `ds-empty-states-icon` — icon slot
- `ds-empty-states-label` — label text
- `ds-empty-states-text` — description text
- `ds-empty-states-button` — action button
