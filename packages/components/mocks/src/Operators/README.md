# Operators Mock

Mock for `@synerise/ds-operators` component.

## Vitest

```typescript
vi.mock('@synerise/ds-operators', async () => {
  const { operatorsMockFactory } = await import('@synerise/ds-mocks');
  return { ...operatorsMockFactory() };
});
```

## Jest

```typescript
import { jest as operatorsMocks } from '@synerise/ds-mocks/Operators';
operatorsMocks.mockOperators();
```

## Available test IDs

- `ds-operators` (default)
- Custom via `data-testid` prop
