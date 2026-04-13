# FieldSet Mock

## Vitest

```typescript
vi.mock('@synerise/ds-field-set', async () => {
  const { fieldSetMockFactory } = await import('@synerise/ds-mocks');
  return { ...fieldSetMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockFieldSet();
```

## Available test IDs

- `ds-field-set` (default)
- Custom via `data-testid` prop
