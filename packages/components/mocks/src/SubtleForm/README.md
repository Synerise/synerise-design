# SubtleForm Mocks

Mock for `@synerise/ds-subtle-form` package including `SubtleForm` and its compound sub-components.

## Vitest

```typescript
vi.mock('@synerise/ds-subtle-form', async () => {
  const { subtleFormMockFactory } = await import('@synerise/ds-mocks');
  return { ...subtleFormMockFactory() };
});

// Query elements
screen.getByTestId('ds-subtle-form-textarea');
screen.getByTestId('ds-subtle-form-input');
screen.getByTestId('ds-subtle-form-select');
screen.getByTestId('ds-subtle-form-date-picker');
screen.getByTestId('ds-subtle-form-field');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/SubtleForm';

jestMocks.mockSubtleForm();

// Query elements
screen.getByTestId('ds-subtle-form-textarea');
screen.getByTestId('ds-subtle-form-input');
```

## Mocked Components

### SubtleForm (default export, compound component)
- `SubtleForm` - renders null (matches real component behavior)
- `SubtleForm.TextArea` - div for textarea sub-component
- `SubtleForm.Input` - div for input sub-component
- `SubtleForm.Select` - div for select sub-component
- `SubtleForm.DatePicker` - div for date picker sub-component
- `SubtleForm.Field` - div for field wrapper with label support

## Available Test IDs

- `ds-subtle-form-textarea` - TextArea container
- `ds-subtle-form-input` - Input container
- `ds-subtle-form-select` - Select container
- `ds-subtle-form-date-picker` - DatePicker container
- `ds-subtle-form-field` - Field container
