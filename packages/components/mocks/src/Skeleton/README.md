# Skeleton Mock

## Vitest

```typescript
vi.mock('@synerise/ds-skeleton', async () => {
  const { skeletonMockFactory } = await import('@synerise/ds-mocks');
  return { ...skeletonMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockSkeleton();
```

## Available test IDs

- `ds-skeleton` (default)
- `ds-checkbox-skeleton` — CheckboxSkeleton component
- `ds-dropdown-skeleton` — DropdownSkeleton component
- `ds-ordered-list-skeleton` — OrderedListSkeleton component
- `ds-skeleton-avatar` — SkeletonAvatar component
- Custom via `data-testid` prop
