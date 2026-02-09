# Button Mock

## Vitest

```typescript
vi.mock('@synerise/ds-button', async () => {
  const { buttonMockFactory } = await import('@synerise/ds-mocks');
  return { ...buttonMockFactory() };
});

screen.getByTestId('ds-button');
```

## Jest

```typescript
import { jest as buttonMocks } from '@synerise/ds-mocks/Button';

buttonMocks.mockButton();

screen.getByTestId('ds-button');
```

## Custom data-testid

```tsx
<Button data-testid="submit-btn">Submit</Button>

screen.getByTestId('submit-btn');
```
