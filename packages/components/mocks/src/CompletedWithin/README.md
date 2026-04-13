# CompletedWithin Mock

Mock for `@synerise/ds-completed-within` component.

## Vitest

```typescript
vi.mock('@synerise/ds-completed-within', async () => {
  const { completedWithinMockFactory } = await import('@synerise/ds-mocks');
  return { ...completedWithinMockFactory() };
});
```

## Jest

```typescript
import { jest as completedWithinMocks } from '@synerise/ds-mocks/CompletedWithin';
completedWithinMocks.mockCompletedWithin();
```

## Available test IDs

- `ds-completed-within` (default)
- Custom via `data-testid` prop
