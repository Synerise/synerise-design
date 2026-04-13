# Checkbox Mock

Mock for `@synerise/ds-checkbox` package including `Checkbox`, `Checkbox.Group`, and utility functions.

## Vitest

```typescript
vi.mock('@synerise/ds-checkbox', async () => {
  const { checkboxMockFactory } = await import('@synerise/ds-mocks');
  return { ...checkboxMockFactory() };
});

// Query elements
screen.getByTestId('ds-checkbox');
screen.getByTestId('ds-checkbox-group');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Checkbox';

jestMocks.mockCheckbox();

// Query elements
screen.getByTestId('ds-checkbox');
screen.getByTestId('ds-checkbox-group');
```

## Mocked Components

### Checkbox (default export)
- `Checkbox` - renders checkbox with label, description, and error text
- `Checkbox.Group` - renders checkbox group with options support

### Utility Functions (named exports)
- `isTristateCheckbox` - returns `false`
- `nextCheckedValues` - returns toggled checked/indeterminate tuple
- `checkedValue` - returns checked value or undefined if indeterminate

## Available Test IDs

### Checkbox
- `ds-checkbox` - Main container
- `ds-checkbox-description` - Description element
- `ds-checkbox-error` - Error text element

### Checkbox.Group
- `ds-checkbox-group` - Group container
- `ds-checkbox-group-option-{index}` - Individual option label
