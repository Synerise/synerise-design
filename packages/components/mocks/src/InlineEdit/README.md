# InlineEdit Mocks

Mock for `@synerise/ds-inline-edit` package including InlineEdit and InlineSelect.

## Vitest

```typescript
vi.mock('@synerise/ds-inline-edit', async () => {
  const { inlineEditMockFactory } = await import('@synerise/ds-mocks');
  return { ...inlineEditMockFactory() };
});

// Query elements
screen.getByTestId('ds-inline-edit');
screen.getByTestId('ds-inline-select');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/InlineEdit';

jestMocks.mockInlineEdit();

// Query elements
screen.getByTestId('ds-inline-edit');
screen.getByTestId('ds-inline-select');
```

## Mocked Components

### InlineEdit (default export)
- `InlineEdit` - renders div containing the `input` prop

### InlineSelect (named export)
- `InlineSelect` - renders div with children and placeholder

## Available Test IDs

### InlineEdit
- `ds-inline-edit` - Main container (renders `input` prop inside)

### InlineSelect
- `ds-inline-select` - Select container
