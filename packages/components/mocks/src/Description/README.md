# Description Mock

Mock for `@synerise/ds-description` package including Description, DescriptionRow, and DescriptionCopyable.

## Vitest

```typescript
vi.mock('@synerise/ds-description', async () => {
  const { descriptionMockFactory } = await import('@synerise/ds-mocks');
  return { ...descriptionMockFactory() };
});

// Query elements
screen.getByTestId('ds-description-component');
screen.getByTestId('ds-description-row');
screen.getByTestId('ds-description-row-label');
screen.getByTestId('ds-description-row-value');
screen.getByTestId('ds-description-copyable');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Description';

jestMocks.mockDescription();

// Query elements
screen.getByTestId('ds-description-component');
screen.getByTestId('ds-description-row');
screen.getByTestId('ds-description-copyable');
```

## Mocked Components

### Description (default export)
- Renders div with `data-testid="ds-description-component"`
- Uses `-component` suffix to avoid clash with Typography Description
- Supports `children`, `rows`, `className`

### DescriptionRow (named export)
- Renders div with `data-testid="ds-description-row"`
- Supports `label`, `value`, `children`

### DescriptionCopyable (named export)
- Renders div with `data-testid="ds-description-copyable"`
- Supports `value`, `children`

## Available Test IDs

- `ds-description-component` - Main container
- `ds-description-row` - Description row
- `ds-description-row-label` - Row label
- `ds-description-row-value` - Row value
- `ds-description-copyable` - Copyable description
