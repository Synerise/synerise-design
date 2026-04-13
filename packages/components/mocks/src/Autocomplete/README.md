# Autocomplete Mock

Mock for `@synerise/ds-autocomplete` package.

## Vitest

```typescript
vi.mock('@synerise/ds-autocomplete', async () => {
  const { autocompleteMockFactory } = await import('@synerise/ds-mocks');
  return { ...autocompleteMockFactory() };
});

// Query elements
screen.getByTestId('ds-autocomplete');
screen.getByTestId('ds-autocomplete-input');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Autocomplete';

jestMocks.mockAutocomplete();

// Query elements
screen.getByTestId('ds-autocomplete');
screen.getByTestId('ds-autocomplete-input');
```

## Mocked Components

### Autocomplete (default export)
- Renders div with `data-testid="ds-autocomplete"`
- Contains an input element for value/onChange interaction
- Supports `value`, `onChange`, `placeholder`, `className`

## Available Test IDs

- `ds-autocomplete` - Main container
- `ds-autocomplete-input` - Input element
