# Radio Mock

Mock for `@synerise/ds-radio` package including `Radio`, `Radio.Group`, and `Radio.Button`.

## Vitest

```typescript
vi.mock('@synerise/ds-radio', async () => {
  const { radioMockFactory } = await import('@synerise/ds-mocks');
  return { ...radioMockFactory() };
});

// Query elements
screen.getByTestId('ds-radio');
screen.getByTestId('ds-radio-group');
screen.getByTestId('ds-radio-button');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Radio';

jestMocks.mockRadio();

// Query elements
screen.getByTestId('ds-radio');
screen.getByTestId('ds-radio-group');
screen.getByTestId('ds-radio-button');
```

## Mocked Components

### Radio (default export)
- `Radio` - renders radio input with label and description
- `Radio.Group` - renders radio group with options support
- `Radio.Button` - renders a button-style radio option

## Available Test IDs

### Radio
- `ds-radio` - Main container
- `ds-radio-description` - Description element

### Radio.Group
- `ds-radio-group` - Group container
- `ds-radio-group-option-{index}` - Individual option label

### Radio.Button
- `ds-radio-button` - Button element
