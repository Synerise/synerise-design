# Form Mocks

Mock for `@synerise/ds-form` package including `Form`, `Form.FieldSet`, and `EditableList`.

## Vitest

```typescript
vi.mock('@synerise/ds-form', async () => {
  const { formMockFactory } = await import('@synerise/ds-mocks');
  return { ...formMockFactory() };
});

// Query elements
screen.getByTestId('ds-editable-list');
screen.getByTestId('ds-editable-list-add');
screen.getByTestId('ds-editable-list-row-0');
screen.getByTestId('ds-fieldset');
screen.getByTestId('ds-fieldset-heading');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Form';

jestMocks.mockForm();

// Query elements
screen.getByTestId('ds-editable-list');
screen.getByTestId('ds-editable-list-add');
screen.getByTestId('ds-editable-list-row-0');
screen.getByTestId('ds-fieldset');
```

## Mocked Components

### Form (default export)
- `Form` - renders null (class component mock)
- `Form.FieldSet` - renders fieldset with heading and description

### EditableList (named export)
- Supports `renderLeftColumn`, `renderRightColumn`, `renderActions`
- Supports `addButtonConfig` for add button
- Supports `onClickDelete` handler

## Available Test IDs

### EditableList
- `ds-editable-list` - Main container
- `ds-editable-list-header` - Header with column names
- `ds-editable-list-rows` - Rows container
- `ds-editable-list-row-{index}` - Individual row
- `ds-editable-list-delete-{index}` - Delete button for row
- `ds-editable-list-add` - Add button

### FieldSet
- `ds-fieldset` - Main container
- `ds-fieldset-heading` - Heading element
- `ds-fieldset-description` - Description element
