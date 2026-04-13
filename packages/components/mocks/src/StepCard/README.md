# StepCard Mock

## Vitest

```typescript
vi.mock('@synerise/ds-step-card', async () => {
  const { stepCardMockFactory } = await import('@synerise/ds-mocks');
  return { ...stepCardMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockStepCard();
```

## Available test IDs

- `ds-step-card` (default)
- Custom via `data-testid` prop
