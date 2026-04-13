# Factors Mock

Mock for `@synerise/ds-factors` component.

## Vitest

```typescript
vi.mock('@synerise/ds-factors', async () => {
  const { factorsMockFactory } = await import('@synerise/ds-mocks');
  return { ...factorsMockFactory() };
});
```

## Jest

```typescript
import { jest as factorsMocks } from '@synerise/ds-mocks/Factors';
factorsMocks.mockFactors();
```

## Available test IDs

- `ds-factors` (default)
- Custom via `data-testid` prop

## Named exports

- `factorTypes` - `{}`
- `ALL_FACTOR_TYPES` - `[]`
