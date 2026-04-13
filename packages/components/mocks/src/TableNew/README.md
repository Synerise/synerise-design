# TableNew Mock

Mock for `@synerise/ds-table-new` component.

## Vitest

```typescript
vi.mock('@synerise/ds-table-new', async () => {
  const { tableNewMockFactory } = await import('@synerise/ds-mocks');
  return { ...tableNewMockFactory() };
});
```

## Jest

```typescript
import { jest as tableNewMocks } from '@synerise/ds-mocks/TableNew';
tableNewMocks.mockTableNew();
```

## Available test IDs

- `ds-table-new` (default, Table component)
- `ds-virtual-table` (VirtualTable component)
- Custom via `data-testid` prop

## Named exports

- `VirtualTable` - virtual table component
- `TableCell` - `{}` (deprecated namespace)
