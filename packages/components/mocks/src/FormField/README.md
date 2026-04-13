# FormField Mocks

Mock for `@synerise/ds-form-field` package including FormField, FormFieldLabel, ContentAboveElement, and ContentBelowElement.

## Vitest

```typescript
vi.mock('@synerise/ds-form-field', async () => {
  const { formFieldMockFactory } = await import('@synerise/ds-mocks');
  return { ...formFieldMockFactory() };
});

// Query elements
screen.getByTestId('ds-form-field');
screen.getByTestId('ds-form-field-label');
screen.getByTestId('ds-form-field-error');
screen.getByTestId('ds-content-above');
screen.getByTestId('ds-content-below');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/FormField';

jestMocks.mockFormField();

// Query elements
screen.getByTestId('ds-form-field');
screen.getByTestId('ds-form-field-label');
screen.getByTestId('ds-form-field-error');
screen.getByTestId('ds-content-above');
screen.getByTestId('ds-content-below');
```

## Mocked Components

### FormField (default export)
- `FormField` - renders div with label, description, tooltip, error text, and children

### FormFieldLabel (named export)
- `FormFieldLabel` - renders label element with htmlFor support

### ContentAboveElement (named export)
- `ContentAboveElement` - renders div wrapper for content above

### ContentBelowElement (named export)
- `ContentBelowElement` - renders div wrapper for content below

## Available Test IDs

### FormField
- `ds-form-field` - Main container
- `ds-form-field-label` - Label element (within FormField)
- `ds-form-field-tooltip` - Tooltip element
- `ds-form-field-description` - Description element
- `ds-form-field-error` - Error text element

### FormFieldLabel
- `ds-form-field-label` - Label element

### ContentAboveElement
- `ds-content-above` - Content above container

### ContentBelowElement
- `ds-content-below` - Content below container
