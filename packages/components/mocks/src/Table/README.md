# Table Mock

Mock for `@synerise/ds-table` component.

## Vitest

```typescript
// Full mock with table structure
vi.mock('@synerise/ds-table', async () => {
  const { tableMockFactory } = await import('@synerise/ds-mocks');
  return { ...tableMockFactory() };
});

// Minimal mock (renders null)
vi.mock('@synerise/ds-table', async () => {
  const { tableMinimalMockFactory } = await import('@synerise/ds-mocks');
  return { ...tableMinimalMockFactory() };
});

// Usage in tests
screen.getByTestId('ds-table');
screen.getByTestId('ds-table-row-0');
screen.getByTestId('ds-table-cell-0-0');
```

## Jest

```typescript
import { jest as tableMocks } from '@synerise/ds-mocks/Table';

// Full mock with table structure
tableMocks.mockTable();

// Minimal mock (renders null)
tableMocks.mockTableMinimal();

// Usage in tests
screen.getByTestId('ds-table');
screen.getByTestId('ds-table-row-0');
screen.getByTestId('ds-table-cell-0-0');
```

## Available test IDs

- `ds-table` - main table container
- `ds-table-title` - table title (if provided)
- `ds-table-loading` - loading indicator
- `ds-table-header` - header row
- `ds-table-header-{dataIndex}` - header cell
- `ds-table-row-{index}` - table row
- `ds-table-cell-{rowIndex}-{colIndex}` - table cell
- `ds-table-checkbox-{rowIndex}` - row selection checkbox
