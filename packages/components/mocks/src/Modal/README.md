# Modal Mock

## Vitest

```typescript
vi.mock('@synerise/ds-modal', async () => {
  const { modalMockFactory } = await import('@synerise/ds-mocks');
  return { ...modalMockFactory() };
});

screen.getByTestId('ds-modal');
screen.getByTestId('ds-modal-title');
screen.getByTestId('ds-modal-close');
screen.getByTestId('ds-modal-ok');
screen.getByTestId('ds-modal-cancel');
```

## Jest

```typescript
import { jest as modalMocks } from '@synerise/ds-mocks/Modal';

modalMocks.mockModal();

screen.getByTestId('ds-modal');
```

## Available test IDs

- `{testId}` - modal container
- `{testId}-header` - header section
- `{testId}-title` - title element
- `{testId}-close` - close button
- `{testId}-body` - content area
- `{testId}-footer` - footer section
- `{testId}-ok` - OK button
- `{testId}-cancel` - Cancel button
