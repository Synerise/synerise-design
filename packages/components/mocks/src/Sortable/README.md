# Sortable Mock

Mock for `@synerise/ds-sortable` component.

## Vitest

```typescript
vi.mock('@synerise/ds-sortable', async () => {
  const { sortableMockFactory } = await import('@synerise/ds-mocks');
  return { ...sortableMockFactory() };
});
```

## Jest

```typescript
import { jest as sortableMocks } from '@synerise/ds-mocks/Sortable';
sortableMocks.mockSortable();
```

## Available test IDs

- `ds-sortable` (default)
- `ds-sortable-container` (SortableContainer)
- Custom via `data-testid` prop

## Named exports

- `SortableContainer` - container component
- `useSortable` - hook returning `{ attributes, listeners, setNodeRef, transform, transition }`
- `arrayMove` - utility function (returns array unchanged)
- `CSS` - empty object
