# Confirmation Mocks

Mock for `@synerise/ds-confirmation` package including Confirmation and Prompt.

## Vitest

```typescript
vi.mock('@synerise/ds-confirmation', async () => {
  const { confirmationMockFactory } = await import('@synerise/ds-mocks');
  return { ...confirmationMockFactory() };
});

// Query elements
screen.getByTestId('ds-confirmation');
screen.getByTestId('ds-confirmation-title');
screen.getByTestId('ds-confirmation-description');
screen.getByTestId('ds-confirmation-ok');
screen.getByTestId('ds-confirmation-cancel');
screen.getByTestId('ds-prompt');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Confirmation';

jestMocks.mockConfirmation();

// Query elements
screen.getByTestId('ds-confirmation');
screen.getByTestId('ds-confirmation-ok');
screen.getByTestId('ds-confirmation-cancel');
```

## Mocked Components

### Confirmation (default export)
- Renders title and description
- Renders OK button with `texts.mainButtonLabel` or `okText`
- Renders Cancel button with `texts.secondaryButtonLabel` or `cancelText`
- Supports `batchActionItems` array
- Supports `mainButtonProps` spread on OK button

### Prompt (named export)
- Renders title, description, and children

## Available Test IDs

### Confirmation
- `ds-confirmation` - Main container
- `ds-confirmation-title` - Title element
- `ds-confirmation-description` - Description element
- `ds-confirmation-ok` - OK button
- `ds-confirmation-cancel` - Cancel button
- `ds-confirmation-batch-action-{index}` - Batch action button

### Prompt
- `ds-prompt` - Main container
- `ds-prompt-title` - Title element
- `ds-prompt-description` - Description element
