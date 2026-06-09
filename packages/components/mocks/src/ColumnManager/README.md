# ColumnManager Mock

Mock for `@synerise/ds-column-manager` package.

## Vitest

```typescript
vi.mock('@synerise/ds-column-manager', async () => {
  const { columnManagerMockFactory } = await import('@synerise/ds-mocks');
  return { ...columnManagerMockFactory() };
});

// Query elements
screen.getByTestId('ds-column-manager');
screen.getByTestId('ds-column-manager-apply');
screen.getByTestId('ds-column-manager-cancel');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/ColumnManager';

jestMocks.mockColumnManager();

// Query elements
screen.getByTestId('ds-column-manager');
screen.getByTestId('ds-column-manager-apply');
screen.getByTestId('ds-column-manager-cancel');
```

## Mocked Components

### ColumnManager (default export)
- Renders div with `data-testid="ds-column-manager"`
- Returns null when `visible` is `false`
- Renders Apply button when `onApply` is provided — clicks call `onApply(columns)`
- Renders Cancel button when `hide` is provided — clicks call `hide()`
- Supports `children`, `visible`, `columns`, `onApply`, `hide`, `draggable`, `className`

## Available Test IDs

- `ds-column-manager` - Main container
- `ds-column-manager-apply` - Apply button
- `ds-column-manager-cancel` - Cancel button
