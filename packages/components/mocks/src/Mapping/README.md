# Mapping Mock

Mock for `@synerise/ds-mapping` component.

## Vitest

```typescript
vi.mock('@synerise/ds-mapping', async () => {
  const { mappingMockFactory } = await import('@synerise/ds-mocks');
  return { ...mappingMockFactory() };
});
```

## Jest

```typescript
import { jest as mappingMocks } from '@synerise/ds-mocks/Mapping';
mappingMocks.mockMapping();
```

## Available test IDs

- `ds-mapping` (default)
- Custom via `data-testid` prop
