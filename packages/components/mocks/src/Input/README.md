# Input Mock

## Vitest

```typescript
vi.mock('@synerise/ds-input', async () => {
  const { inputMockFactory } = await import('@synerise/ds-mocks');
  return { ...inputMockFactory() };
});

screen.getByTestId('ds-input');
screen.getByTestId('ds-textarea');
```

## Jest

```typescript
import { jest as inputMocks } from '@synerise/ds-mocks/Input';

inputMocks.mockInput();

screen.getByTestId('ds-input');
screen.getByTestId('ds-textarea');
```
